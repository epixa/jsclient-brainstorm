'use strict';

var ApiClient = require('../../index');
module.exports = new ApiClient();

require('./actions/create-item');
require('./actions/destroy-item');

require('./collections/items');
require('./collections/lists');

require('./models/item');
require('./models/list');
require('./models/user');
