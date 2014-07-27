'use strict';

var client = require('../example');

var User = client.model('user')

.attribute('id')
.attribute('name')
.attribute('email')
.hasMany('lists')
.hasMany('items');

module.exports = User;
