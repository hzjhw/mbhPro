/**
 * @description main
 * @class main
 * @author yongjin<zjut_wyj@163.com> 2015/2/8
 */
App.addModule('Voucher', 'modules/voucher/controllers/Voucher.js');
App.addModule('VchChoice', 'modules/voucher/controllers/VchChoice.js');
App.addModule('VchBrandType', 'modules/voucher/controllers/VchBrandType.js');
App.addModule('VchFacList', 'modules/voucher/controllers/VchFacList.js');

App.addTemplate('template/vch_faclist', function (require, exports, module) {
  module.exports = require('modules/voucher/views/vch_faclist.html');
});
App.addTemplate('template/vch_brandtype', function (require, exports, module) {
  module.exports = require('modules/voucher/views/vch_brandtype.html');
});
App.addTemplate('template/vch_choice', function (require, exports, module) {
  module.exports = require('modules/voucher/views/vch_choice.html');
});
App.addTemplate('template/vch_index', function (require, exports, module) {
  module.exports = require('modules/voucher/views/vch_index.html');
});