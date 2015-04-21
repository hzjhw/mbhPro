/**
 * @description SearchIndex
 * @class SearchIndex
 * @author yongjin<zjut_wyj@163.com> 2015/2/28
 */
define('SearchIndex', ['App', 'template/search_index', 'HandlebarsHelper'], function (require, exports, module) {
  var SearchIndex, App, template, HandlebarsHelper;

  App = require('App');
  HandlebarsHelper = require('HandlebarsHelper');
  SearchIndex = function (page, context, data) {
    setTimeout(function () {
      debug('【Module】: Call SearchIndex');
      template = require('template/search_index');
      $(page).html(template);
      var $sub = $(page).find('.cate-item-sub');
      $(page).find('.cate-item').each(function (index) {
        $(this).click(function () {
          $(this).addClass('current').siblings('.cate-item').removeClass('current');
          $sub.eq(index).addClass('cate-cur').siblings().removeClass('cate-cur');
        });
      });
      $(page).find('.input-search');
      App.query('/product/price', {
        cache: true,
        success: function (result) {
          var $container = $('.search-price-ul', $(page));
          var template = $container.html();
          App.render({ render: '.search-price-ul',handlebars: HandlebarsHelper, page: page, template: template, empty: true, data: {
            list: result.priceList
          }});
          var $container2 = $('.search-pro-ul', $(page));
          var template2 = $container2.html();
          App.render({ render: '.search-pro-ul', handlebars: HandlebarsHelper,page: page, template: template2, empty: true, data: {
            list: result.catList
          }});

          $(page).find('.search-price-ul li').click(function(){
            App.load('product_list', {
              id: null,
              title: '产品搜索结果',
              price: $(this).attr('data-id'),
              cat: 'all',
              keywords: null
            });
          });
          $(page).find('.search-pro-ul li').click(function(){
            App.load('product_list', {
              id: null,
              title: '产品搜索结果',
              cat: $(this).attr('data-id'),
              price: 'all',
              keywords: null
            });
          });
        }
      });
      $(page).find('.category-close').click(function () {
        $(this).addClass('active');
        App.back(App.getBackPage());
      });
      $(page).find('.btn-search').click(function () {
        //App.setBackPage('search');
        var area = $.trim($(page).find('.input-search').val());
        if (area.length > 0) {
          App.load('brand_list', {
            id: null,
            title: '区域搜索结果',
            banner: 'banner',
            area: area
          });
        }
      });
    }, 0);
  };

  module.exports = SearchIndex;
});