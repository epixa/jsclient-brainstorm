'use strict';

var ActionDefinition = function(client, name) {
  Object.defineProperty(this, 'name', { value: name });
  Object.defineProperty(this, 'action', { value: createAction(this) });
  Object.defineProperty(this, 'fn', {
    writable: true,
    value: NOT_IMPLEMENTED
  });
};

function createAction(definition) {
  var action = function() {
    return definition.fn.apply(null, arguments);
  };

  action.define = function(fn) {
    definition.fn = fn;
    return action;
  };

  return action;
}

function NOT_IMPLEMENTED() {
  throw new Error('Not yet implemented');
}

module.exports = ActionDefinition;
