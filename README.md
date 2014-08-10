# Library for API Clients

Very much a work in progress.


### Constributing

To install package dependencies for development:

```
npm install
```

To run tests:

```
npm test
```

To contribute code, issue pull requests at https://github.com/epixa/jsclient/pulls


### Example API

An example "todo list" API client built with JSclient is available in the `example/` directory.


### Temporary placeholder for recommended api design

```javascript
var ApiClient = require('./lib/client');
var client = new ApiClient();


var Foo = client.model('foo');
// returns a specific model constructor
// if model constructor has not yet been created for that name, creates a blank one and returns it
// always returns the same model constructor for each name

Foo.attribute('baz');
Foo.hasOne('something');
Foo.hasMany('bars');

var foo = new Foo(); // goes through all registered attributes and associations and creates properties
foo.$load();     // loads model
foo.$reload();   // reloads model
foo.$save();     // saves model
foo.$destroy();  // deletes model
foo.baz;         // null by default instead of undefined
foo.something(); // client.model('something').$load(); return client.model('something');
foo.bars();      // client.collection('bars').$load(); return client.collection('bars');



var Foos = client.collection('foos');
// returns a specific collection constructor
// if collection constructor has not yet been created for that name, creates a blank one and returns it
// always returns the same collection constructor for each name

var foos = new Foos();
foos.$load();   // loads collection
foos.$reload(); // reloads collection
foos.$create(); // creates child resource and adds to collection
foos.forEach(); // all normal array functions
```
