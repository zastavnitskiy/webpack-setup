const common = require('./modules/common1');
require.ensure('./modules/module4', function(require){
  require('./modules/module4');
})


exports = 'searchresults' + common;
