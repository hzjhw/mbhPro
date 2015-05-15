/**
 * @description main
 * @class main
 * @author yongjin<zjut_wyj@163.com> 2015/2/8
 */
App.addModule('ExhList', 'modules/exhlist/controllers/ExhList.js');
App.addModule('ExhDetail', 'modules/exhlist/controllers/ExhDetail.js');
App.addTemplate('template/exhdetail', function (require, exports, module) {
  module.exports = require('modules/exhlist/views/exhdetail.html');
});
App.addTemplate('template/exhlist', function (require, exports, module) {
  module.exports = require('modules/exhlist/views/exhlist.html');
});