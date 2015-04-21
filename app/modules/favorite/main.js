/**
 * @description main
 * @class main
 * @author yongjin<zjut_wyj@163.com> 2015/2/8
 */
App.addTemplate('template/includeBtm', function (require, exports, module) {
  module.exports = require('modules/favorite/views/include_bottom.html')
});
App.addTemplate('template/favBrand', function (require, exports, module) {
  module.exports = require('modules/favorite/views/favorite_brand.html');
});
App.addTemplate('template/favPro', function (require, exports, module) {
  module.exports = require('modules/favorite/views/favorite_product.html')
});
App.addTemplate('template/favInfo', function (require, exports, module) {
  module.exports = require('modules/favorite/views/favorite_info.html')
});
App.addTemplate('template/favCooprate', function (require, exports, module) {
  module.exports = require('modules/favorite/views/favorite_cooprate.html')
});
App.addTemplate('template/favMoney', function (require, exports, module) {
  module.exports = require('modules/favorite/views/favorite_money.html')
});
App.addTemplate('template/favMessage', function (require, exports, module) {
  module.exports = require('modules/favorite/views/favorite_message.html')
});
App.addTemplate('template/incl', function (require, exports, module) {
  module.exports = require('modules/favorite/views/favorite_message.html')
});
App.addTemplate('template/favFactMsg', function (require, exports, module) {
  module.exports = require('modules/favorite/views/favorite_factmsg.html')
});
App.addTemplate('template/favChgpwd', function (require, exports, module) {
  module.exports = require('modules/favorite/views/favorite_chgpwd.html')
});
App.addTemplate('template/favLove', function (require, exports, module) {
  module.exports = require('modules/favorite/views/favorite_love.html')
});
App.addTemplate('template/favVouch', function (require, exports, module) {
  module.exports = require('modules/favorite/views/favorite_vouch.html')
});
App.addModule('FavVouch', 'modules/favorite/controllers/FavVouch.js');
App.addModule('FavLove', 'modules/favorite/controllers/FavLove.js');
App.addModule('FavChgpwd', 'modules/favorite/controllers/FavChgpwd.js');
App.addModule('FavFactMsg', 'modules/favorite/controllers/FavFactMsg.js');
App.addModule('IncludeBtm', 'modules/favorite/controllers/IncludeBtm.js');
App.addModule('FavBrand', 'modules/favorite/controllers/FavBrand.js');
App.addModule('FavPro', 'modules/favorite/controllers/FavPro.js');
App.addModule('FavInfo', 'modules/favorite/controllers/FavInfo.js');
App.addModule('FavMessage', 'modules/favorite/controllers/FavMessage.js');
App.addModule('FavMoney', 'modules/favorite/controllers/FavMoney.js');
App.addModule('FavCooprate', 'modules/favorite/controllers/FavCooprate.js');