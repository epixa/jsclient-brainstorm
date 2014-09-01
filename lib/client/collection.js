'use strict';

var CollectionDefinition = function(client, name, config) {
  typeof config === 'object' || (config = {});

  Object.defineProperty(this, 'name', { value: name });
  Object.defineProperty(this, 'client', { value: client });
  Object.defineProperty(this, 'model', { value: config.model });
  Object.defineProperty(this, 'Collection', {
    value: createCollectionConstructor(this)
  });
};

function createCollectionConstructor(definition) {
  var Collection = function(models) {
    typeof models === 'object' || (models = []);
    models.forEach(function(model) {
      if (definition.model) {
        var Model = definition.client.model(definition.model);
        model = new Model(model);
      }
      this.push(model);
    }.bind(this));
  };
  Collection.prototype = Object.create(CollectionPrototype);
  return Collection;
}

var CollectionPrototype = Object.create([]);
CollectionPrototype.$load = NOT_IMPLEMENTED;
CollectionPrototype.$reload = NOT_IMPLEMENTED;
CollectionPrototype.$create = NOT_IMPLEMENTED;

function NOT_IMPLEMENTED() {
  throw new Error('Not yet implemented');
}

module.exports = CollectionDefinition;
