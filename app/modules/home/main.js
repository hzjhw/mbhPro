/**
 * @description main
 * @class main
 * @author yongjin<zjut_wyj@163.com> 2015/2/28
 */
App.addModule('HomeBrand', 'modules/home/controllers/HomeBrand.js');

App.addTemplate('template/home_brand', function(require, exports, module){
  module.exports = require('modules/home/views/home_brand.html');
});