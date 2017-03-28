require('./modules/module1');
require('./modules/module2');

require.ensure('./modules/module3', function(require){

  require('./modules/module3');

})
