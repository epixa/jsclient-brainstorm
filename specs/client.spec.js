'use strict';

var ApiClient = require('../lib/client');

describe('client', function() {
  var client;
  beforeEach(function() {
    client = new ApiClient();
  });

  describe('.request()', function() {
    // to be implemented
  });

  describe('.model()', function() {
    var Foo;
    beforeEach(function() {
      Foo = client.model('foo');
    });
    it('returns a model constructor for a given name', function() {
      expect(typeof Foo.attribute).toBe('function');
      expect(typeof Foo.hasOne).toBe('function');
      expect(typeof Foo.hasMany).toBe('function');
    });
    it('is idempotent', function() {
      expect(Foo).toBe(client.model('foo'));
    });
    it('caches model definition in .models', function() {
      expect(client.models.foo.Model).toBe(Foo);
    });
  });

  describe('.collection()', function() {
    var Foos;
    beforeEach(function() {
      Foos = client.collection('foos');
    });
    it('returns a collection constructor for a given name', function() {
      var foos = new Foos();
      expect(typeof foos.$load).toBe('function');
      expect(typeof foos.push).toBe('function');
    });
    it('is idempotent', function() {
      expect(Foos).toBe(client.collection('foos'));
    });
    it('caches collection definition in .collections', function() {
      expect(client.collections.foos.Collection).toBe(Foos);
    });
  });

  describe('.action()', function() {
    var doFoo;
    beforeEach(function() {
      doFoo = client.action('do-foo');
    });
    it('returns an action function for a given name', function() {
      expect(typeof doFoo.define).toBe('function');
    });
    it('is idempotent', function() {
      expect(doFoo).toBe(client.action('do-foo'));
    });
    it('caches action definition in .actions', function() {
      expect(client.actions['do-foo'].action).toBe(doFoo);
    });
  });
});
