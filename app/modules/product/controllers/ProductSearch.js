/**
 * @description ProductSearch
 * @class ProductSearch
 * @author yongjin<zjut_wyj@163.com> 2015/2/8
 */
define('ProductSearch', ['App', 'template/product_search'], function (require, exports, module) {
  var ProductSearch, App, template;

  App = require('App');
  ProductSearch = function (page, ctx) {
    setTimeout(function(){
      debug('【Module】: Call ProductSearch');
      template = require('template/product_search');
      $(page).html(template);
      $(page).find('.go-back').click(function () {
        App.back('home', function () {
        });
      });
    }, 0);
  };

  module.exports = ProductSearch;
});