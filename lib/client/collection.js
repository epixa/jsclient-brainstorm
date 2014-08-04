'use strict';

var CollectionDefinition = function(client, name) {
  Object.defineProperty(this, 'name', { value: name });
  Object.defineProperty(this, 'Collection', {
    value: createCollectionConstructor()
  });
};

function createCollectionConstructor() {
  var Collection = function() {};
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
