'use strict';

var client = require('../example');

var Items = client.collection('items', {
  model: 'item'
});

Items.prototype.$load = function() {
  console.log('load items');
};

module.exports = Items;
