/**
 * @description ProductBrandDetail
 * @class ProductBrandDetail
 * @author yongjin<zjut_wyj@163.com> 2015/3/6
 */
define('ProductBrandDetail', ['App', 'template/product_brand_detail', 'HandlebarsHelper'], function (require, exports, module) {
  var ProductBrandDetail, App, template, HandlebarsHelper;

  App = require('App');
  template = require('template/product_brand_detail');
  HandlebarsHelper = require('HandlebarsHelper');

  ProductBrandDetail = function (page, id, render) {
    var tpl = HandlebarsHelper.compile(template);
    var id = id;
    /*品牌详情*/
    App.query('/cmp/factinfo/' + id, {
      cache: true,
      success: function (data) {
        try{
          $(page).find(render).html(tpl(data.factInfo));
          $(page).find('.company .name, .company .factory_logo').click(function(){
            localStorage['brand_fact_id'] = id;
            App.addHash('#/brand_detail?fact_id=' + id);
            App.load('brand_detail', {
              id:id,
              fact_id: id
            });
          });
        }catch(e){
        }
      }
    });
  }

  module.exports = ProductBrandDetail;
});