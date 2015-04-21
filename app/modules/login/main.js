/**
 * @description main
 * @class main
 * @author yongjin<zjut_wyj@163.com> 2015/2/8
 */
App.addModule('Login', 'modules/login/controllers/Login.js');
App.addTemplate('template/login', function (require, exports, module) {
  module.exports = require('modules/login/views/login.html');
});
App.addTemplate('template/dealers', function (require, exports, module) {
  module.exports = require('modules/login/views/dealers.html')
});
App.addModule('Dealers', 'modules/login/controllers/Dealers.js');

App.addModule('Forgetpwd', 'modules/login/controllers/Forgetpwd.js');
App.addTemplate('template/forgetpwd', function (require, exports, module) {
  module.exports = require('modules/login/views/forget_pwd.html');
});