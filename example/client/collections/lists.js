'use strict';

var client = require('../example');

var Lists = client.collection('lists', {
  model: 'list'
});

module.exports = Lists;
