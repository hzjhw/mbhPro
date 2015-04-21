/**
 * @description CategoryCtrl
 * @class CategoryCtrl
 * @author yongjin<zjut_wyj@163.com> 2015/2/8
 */
define('CategoryCtrl', ['App', 'template/category'], function (require, exports, module) {
  var CategoryCtrl, App, template;

  App = require('App');

  CategoryCtrl = function (page, context) {
    setTimeout(function(){
      debug('【Module】: Call CategoryCtrl');
      template = require('template/category');
      $(page).html(template);
      $(page).find('.category-close').click(function () {
        App.back();
      });
      $(page).find('.cate-item').each(function () {
        $(this).click(function () {
          $(this).addClass('current').siblings('.cate-item').removeClass('current');
          $(page).find('.cate-item-sub-' + $(this).index()).addClass('cate-cur').siblings().removeClass('cate-cur');
        });
      });
      $(page).find('.cate-ul li').each(function () {
        $(this).click(function () {
          var id = $(this).attr('data-id');
          if (id.length === 0) {
            App.load('brand_unique');
            return;
          }
          App.load('brand_list', {
            id: id,
            title: $(this).attr('data-title'),
            banner: $(this).attr('data-banner')
          });
          return false;
        });
      });
    }, 0);
  };

  module.exports = CategoryCtrl;
});