/**
 * @description main
 * @class main
 * @author yongjin<zjut_wyj@163.com> 2015/2/8
 */
App.addModule('CategoryCtrl', 'modules/category/controllers/CategoryCtrl.js');
App.addTemplate('template/category', function (require, exports, module) {
  module.exports = require('modules/category/views/category.html');
});