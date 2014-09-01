'use strict';

var client = require('./client/example');

var item = new (client.model('item'))({
  name: 'blah',
  user_id: 123
});
item.$save(); // request {...}

console.log(item.author); // [Function]
console.log(item.$associations.author.value); // 123
console.log(item.parent()); // null
console.log(item.author()); // {id: null, name: null, email: null, ...}

item.author = 234;
console.log(item.$associations.author.value); // 234
console.log(item.user_id); // 234

var list = new (client.model('list'))();
list.$save(); // save list {...}

console.log(list.items); // [Function]
try {
  console.log(list.items()); // expected to error since `items` is not nullable and does not yet have a value
} catch (e) {
  console.log('expected error:', e);
}

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
