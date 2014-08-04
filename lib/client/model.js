'use strict';

var ModelDefinition = function(client, name) {
  Object.defineProperty(this, 'name', { value: name });
  Object.defineProperty(this, 'client', { value: client });
  Object.defineProperty(this, 'properties', { value: [] });
  Object.defineProperty(this, 'associations', { value: [] });
  Object.defineProperty(this, 'Model', {
    value: createModelConstructor(this)
  });
};

function createModelConstructor(definition) {
  var Model = function() {
    Object.defineProperty(this, '$associations', { value: {} });

    definition.properties.forEach(function(property) {
      Object.defineProperty(this, property.name, {
        writable: true,
        enumerable: true,
        configurable: false,
        value: property.value
      });
    }, this);

    definition.associations.forEach(function(property) {
      var original = this[property.name];
      var proxyFn = proxy.bind(definition, property);
      Object.defineProperty(this, property.name, {
        enumerable: true,
        configurable: false,
        set: function(value) {
          this.$associations[property.name] = {
            original: value,
            proxy: proxyFn
          };
        },
        get: function() {
          return this.$associations[property.name].proxy;
        }
      });
      this[property.name] = original;
    }, this);
  };

  Model.prototype = Object.create(ModelPrototype);

  Model.attribute = attribute.bind(Model, definition.properties);
  Model.hasOne = hasOne.bind(Model, definition.associations);
  Model.hasMany = hasMany.bind(Model, definition.associations);

  return Model;
}

var ModelPrototype = {
  $load: NOT_IMPLEMENTED,
  $reload: NOT_IMPLEMENTED,
  $save: NOT_IMPLEMENTED,
  $destroy: NOT_IMPLEMENTED
};

function proxy(property) {
  var Model = this.client[property.type](property.name);
  var obj = new Model();
  //obj.$promise = this.client.action('get-' + property.name)(this.$associations[property.name].original);
  return obj;
}
function attribute(properties, property) {
  properties.push({ name: property, value: null });
  return this;
}
function hasOne(associations, property) {
  associations.push({ name: property, type: 'model' });
  return this;
}
function hasMany(associations, property) {
  associations.push({ name: property, type: 'collection' });
  return this;
}

function NOT_IMPLEMENTED() {
  throw new Error('Not yet implemented');
}

module.exports = ModelDefinition;
