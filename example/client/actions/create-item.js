'use strict';

var client = require('../example');

var createItem = client.action('create-item')

.define(function(data) {
  return client.request({
    method: 'post',
    path: '/items',
    data: { item: data }
  });
});

module.exports = createItem;

// execute this later (in another module, for example) to override and use mock behavior
/*
client.action('create-item').define(function(data) {
  var item = client.mock.create('items', data, function(item) {
    item.id = 123;
  });

  return client.mock.response(201, { item: item }, {
    "Content-Type" => "application/json"
  });
});
*/
