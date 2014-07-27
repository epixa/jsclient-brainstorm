'use strict';

var ModelDefinition = function(name) {
  Object.defineProperty(this, 'name', { value: name });
  Object.defineProperty(this, 'properties', { value: [] });
  Object.defineProperty(this, 'Model', {
    value: createModelConstructor(this)
  });
};

function createModelConstructor(definition) {
  var Model = function() {
    definition.properties.forEach(function(property) {
      Object.defineProperty(this, property.name, {
        writable: true,
        enumerable: true,
        configurable: false,
        value: property.value
      });
    }, this);
  };

  Model.prototype = Object.create(ModelPrototype);

  Model.attribute = attribute.bind(Model, definition.properties);
  Model.hasOne = hasOne.bind(Model, definition.properties);
  Model.hasMany = hasMany.bind(Model, definition.properties);

  return Model;
}

var ModelPrototype = {
  $load: NOT_IMPLEMENTED,
  $reload: NOT_IMPLEMENTED,
  $save: NOT_IMPLEMENTED,
  $destroy: NOT_IMPLEMENTED
};

function attribute(properties, property) {
  properties.push({ name: property, value: null });
  return this;
}
function hasOne(properties, property) {
  properties.push({ name: property, value: NOT_IMPLEMENTED });
  return this;
}
function hasMany(properties, property) {
  properties.push({ name: property, value: NOT_IMPLEMENTED });
  return this;
}

function NOT_IMPLEMENTED() {
  throw new Error('Not yet implemented');
}

module.exports = ModelDefinition;
