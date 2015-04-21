/**
 * @description BrandProduct
 * @class BrandProduct
 * @author yongjin<zjut_wyj@163.com> 2015/2/8
 */
define('BrandProduct', ['App', 'template/brand_product'], function (require, exports, module) {
  var BrandProduct, App, template;

  App = require('App');
  template = require('template/brand_product');

  BrandProduct = function (page, id, context) {
    setTimeout(function () {
      debug('【Module】: Call BrandProduct');
      $(page).html(template);
      $(page).find('.btn-back').click(function () {
        App.back(App.getBackPage());
      });
      seajs.use(['IncludeHeader'], function (IncludeHeader) {
        data.header.id = id;
        data.header.icon = 3;
        data.header.hide = false;
        new IncludeHeader(page, '#include_header', data.header);
      });
      // 底部导航
      $(page).find('.bottombar-ul li').click(function () {
        App.load($(this).attr('data-target'));
      });
    }, 0);
  };

  module.exports = BrandProduct;
});