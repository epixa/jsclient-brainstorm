'use strict';

var client = require('../example');

var destroyItem = client.action('destroy-item')

.define(function(data) {
  return client.request({
    method: 'delete',
    path: '/items/' + id
  });
});

module.exports = destroyItem;

// execute this later (in another module, for example) to override and use mock behavior
/*
client.action('destroy-item').define(function(data) {
  var found = client.mock.destroy('items', function(item) {
    return item.id === id;
  });

  return client.mock.response(found ? 204 : 404);
});
*/
