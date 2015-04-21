/**
 * @description main
 * @class main
 * @author yongjin<zjut_wyj@163.com> 2015/2/8
 */
App.addModule('ProductList', 'modules/product/controllers/ProductList.js');
App.addTemplate('template/product_list', function (require, exports, module) {
  module.exports = require('modules/product/views/product_list.html');
});

App.addModule('ProductDetail', 'modules/product/controllers/ProductDetail.js');
App.addTemplate('template/product_detail', function (require, exports, module) {
  module.exports = require('modules/product/views/product_detail.html');
});
App.addModule('ProductComment', 'modules/product/controllers/ProductComment.js');
App.addTemplate('template/product_comment', function (require, exports, module) {
  module.exports = require('modules/product/views/product_comment.html');
});

App.addModule('ProductSearch', 'modules/product/controllers/ProductSearch.js');
App.addTemplate('template/product_search', function (require, exports, module) {
  module.exports = require('modules/product/views/product_search.html');
});
App.addTemplate('template/product_brand_detail', function (require, exports, module) {
  module.exports = require('modules/product/views/product_brand_detail.html');
});
App.addModule('ProductBrandDetail', 'modules/product/controllers/ProductBrandDetail.js');

App.addModule('ProductOther', 'modules/product/controllers/ProductOther.js');
App.addTemplate('template/product_other', function (require, exports, module) {
  module.exports = require('modules/product/views/product_other.html');
});