/**
 * @description main
 * @class main
 * @author yongjin<zjut_wyj@163.com> 2015/2/8
 */
App.addModule('BrandList', 'modules/brand/controllers/BrandList.js');
App.addModule('BrandDetail', 'modules/brand/controllers/BrandDetail.js');
App.addModule('BrandInfo', 'modules/brand/controllers/BrandInfo.js');
App.addModule('BrandTec', 'modules/brand/controllers/BrandTec.js');
App.addModule('BrandBlank', 'modules/brand/controllers/BrandBlank.js');

App.addModule('IncludeMessage', 'modules/brand/controllers/IncludeMessage.js');
App.addModule('IncludeHeader', 'modules/brand/controllers/IncludeHeader.js');
App.addModule('IncludeListBottom', 'modules/brand/controllers/IncludeListBottom.js');
App.addModule('IncludeDetailBottom', 'modules/brand/controllers/IncludeDetailBottom.js');
App.addModule('BrandUnique', 'modules/brand/controllers/BrandUnique.js');
App.addModule('BrandCooperate', 'modules/brand/controllers/BrandCooperate.js');

App.addTemplate('template/brand_cooperate', function (require, exports, module) {
  module.exports = require('modules/brand/views/brand_cooperate.html');
});
App.addTemplate('template/brand_detail', function (require, exports, module) {
  module.exports = require('modules/brand/views/brand_detail.html');
});
App.addTemplate('template/brand_list', function (require, exports, module) {
  module.exports = require('modules/brand/views/brand_list.html')
});
App.addTemplate('template/brand_info', function (require, exports, module) {
  module.exports = require('modules/brand/views/brand_info.html');
});
App.addTemplate('template/brand_tec', function (require, exports, module) {
  module.exports = require('modules/brand/views/brand_tec.html');
});
App.addTemplate('template/brand_blank', function (require, exports, module) {
  module.exports = require('modules/brand/views/brand_blank.html');
});
App.addTemplate('template/include_message', function (require, exports, module) {
  module.exports = require('modules/brand/views/include_message.html');
});
App.addTemplate('template/include_header', function (require, exports, module) {
  module.exports = require('modules/brand/views/include_header.html');
});
App.addTemplate('template/brand_unique', function (require, exports, module) {
  module.exports = require('modules/brand/views/brand_unique.html');
});
App.addTemplate('template/include_list_bottom', function (require, exports, module) {
  module.exports = require('modules/brand/views/include_list_bottom.html');
});
App.addTemplate('template/include_detail_bottom', function (require, exports, module) {
  module.exports = require('modules/brand/views/include_detail_bottom.html');
});