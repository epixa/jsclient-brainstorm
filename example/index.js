'use strict';

var client = require('./client/example');

var item = new (client.model('item'))();
item.name = 'blah';
item.user = 123;
item.$save(); // request {...}

console.log(item.user); // [Function]
console.log(item.$associations.user.original); // 123
console.log(item.user()); // {id: null, name: null, email: null, ...}

var list = new (client.model('list'))();
list.$save(); // save list {...}

console.log(list.items); // [Function]
console.log(list.items()); // {}

var items = new (client.collection('items'))();
items.$load(); // load items

console.log(items.length); // 0
items.push(item);
console.log(items.length); // 1
items.forEach(function(item) {
  console.log(item.name); // blah
});

try {
  items.$reload(); // expected to error since $reload() is not implemented
} catch (e) {
  console.log('expected error:', e);
}
