'use strict';

var client = require('../example');

var List = client.model('list')

.attribute('id')
.attribute('name')
.hasOne('user')
.hasMany('items');

List.prototype.$save = function() {
  console.log('save list', this);
};

module.exports = List;
