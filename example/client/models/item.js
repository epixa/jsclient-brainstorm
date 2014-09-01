'use strict';

var client = require('../example');

var Item = client.model('item')

.attribute('id')
.attribute('name')
.attribute('description')
.hasOne('parent', { nullable: true })
.hasOne('user', { alias_of: 'user_id' });

Item.prototype.$save = function() {
  return client.action('create-item')({
    name: this.name,
    description: this.description
  });
};

Item.prototype.$destroy = function() {
  return client.action('destroy-item')(this.id);
};

module.exports = Item;
