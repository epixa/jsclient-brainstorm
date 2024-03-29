'use strict';

var ModelDefinition = require('./client/model');
var CollectionDefinition = require('./client/collection');
var ActionDefinition = require('./client/action');

var Client = function() {
  Object.defineProperty(this, 'models', { value: {} });
  Object.defineProperty(this, 'collections', { value: {} });
  Object.defineProperty(this, 'actions', { value: {} });
};

Client.prototype = {
  request: function(params) {
    console.log('request', params);
  },
  model: function(name) {
    if (!(name in this.models)) {
      this.models[name] = new ModelDefinition(this, name);
    }
    return this.models[name].Model;
  },
  collection: function(name, config) {
    if (!(name in this.collections)) {
      this.collections[name] = new CollectionDefinition(this, name, config);
    }
    return this.collections[name].Collection;
  },
  action: function(name) {
    if (!(name in this.actions)) {
      this.actions[name] = new ActionDefinition(this, name);
    }
    return this.actions[name].action;
  }
};

module.exports = Client;
