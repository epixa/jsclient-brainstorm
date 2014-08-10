'use strict';

var ApiClient = require('../lib/client');

describe('client', function() {
  var client;
  beforeEach(function() {
    client = new ApiClient();
  });

  it('has models', function() {
    expect(client.models).toEqual({});
  });

  it('has collections', function() {
    expect(client.collections).toEqual({});
  });

  it('has actions', function() {
    expect(client.actions).toEqual({});
  });
});
