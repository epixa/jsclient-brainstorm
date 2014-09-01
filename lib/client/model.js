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
      var proxyFn = proxy.bind(definition, property);
      if (this[property.field] === undefined && property.nullable) {
        this[property.field] = null;
      }
      this.$associations[property.name] = {
        value: this[property.field],
        proxy: function() {
          var value = this.$associations[property.name].value;
          if (value === undefined) {
            throw new ReferenceError('Cannot proxy non-nullable association before it is set: ' + property.name);
          }
          return value === null ? null : proxyFn(value);
        }
      };
      Object.defineProperty(this, property.name, {
        enumerable: true,
        configurable: false,
        set: function(value) {
          if (value === undefined) {
            value = null;
          }
          if (value === null && !property.nullable) {
            throw new TypeError('Cannot set non-nullable association to null: ' + property.name);
          }
          this.$associations[property.name].value = value;
        },
        get: function() {
          return this.$associations[property.name].proxy;
        }
      });
      if (property.field !== property.name) {
        Object.defineProperty(this, property.field, {
          enumerable: false,
          configurable: false,
          set: function(value) {
            this[property.name] = value;
          },
          get: function() {
            return this.$associations[property.name].value;
          }
        });
      }
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
  var Model = this.client[property.type](property.resource);
  var obj = new Model();
  //obj.$promise = this.client.action('get-' + property.name)(this.$associations[property.name].value);
  return obj;
}
function attribute(properties, property) {
  properties.push({ name: property, value: null });
  return this;
}
function hasOne(associations, property, config) {
  associations.push(association('model', property, config));
  return this;
}
function hasMany(associations, property, config) {
  associations.push(association('collection', property, config));
  return this;
}
function association(type, name, config) {
  var association = typeof config === 'object' ? config : {};
  association.name = name;
  association.field = name;
  association.type = type;
  association.nullable || (association.nullable = false);
  if ('alias_of' in association) {
    association.field = association.alias_of;
    delete association.alias_of;
  }
  association.resource = association[type] || name;
  return association;
}

function NOT_IMPLEMENTED() {
  throw new Error('Not yet implemented');
}

module.exports = ModelDefinition;
