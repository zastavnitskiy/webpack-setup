var jquery = require('./vendor/jquery');
var common = require('./modules/common1');
var et = require('./modules/et');

exports = 'hotel' + common;
require.ensure('./modules/module3', function(require){
  require('./modules/module3');
})
