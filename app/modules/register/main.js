/**
 * @description main
 * @class main
 * @author yongjin<zjut_wyj@163.com> 2015/2/8
 */
App.addModule('Register', 'modules/register/controllers/Register.js');
App.addTemplate('template/register', function (require, exports, module) {
  module.exports = require('modules/register/views/register.html');
});