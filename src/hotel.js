var jquery = require('./vendor/jquery');
var common = require('./modules/common1');

exports = 'hotel' + common;
require.ensure('./modules/module3', function(require){
  require('./modules/module3');
})
