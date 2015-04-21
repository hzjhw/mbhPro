/**
 * @description BrandUnique
 * @class BrandUnique
 * @author yongjin<zjut_wyj@163.com> 2015/2/9
 */
define('BrandUnique', ['App', 'template/brand_unique', 'HandlebarsHelper'], function (require, exports, module) {
  var BrandUnique, App, template, HandlebarsHelper;

  App = require('App');
  HandlebarsHelper = require('HandlebarsHelper');

  function loadBrand(page, render, id, template) {
    // 列表
    debug('loadBrand');
    var $loading = $(page).find('.loading'),
      $list = $(page).find(render),
      item = template,
      totalPage = null,
      pageNumber = 1,
      i = 1;
    $loading.remove();
    $(page).find(render).empty();
    item = HandlebarsHelper.compile(item);
    App.infiniteScroll($list, { loading: $loading }, function (callback) {
      if (totalPage && (pageNumber > totalPage)) return null;
      App.query('/product/feature/' + id, {
        cache: true,
        data: {
          pageSize: 10,
          pageNumber: pageNumber
        },
        success: function (result) {
          totalPage = result.productList.totalPage;
          var list = [];
          for (var j = 0; j < result.productList.list.length; j++) {
            var $node = $(item(result.productList.list[j]));
            $node.click(function () {
              App.setBackPage('brand_unique');
              App.addHash('#/product_detail?fact_id=' + $(this).attr('cust-id') + '&pro_id=' + $(this).attr('data-id'));
              App.load('product_detail', {
                fact_id: $(this).attr('cust-id'),
                pro_id: $(this).attr('data-id')
              });
            });
            list.push($node);
          }
          i += 10;
          pageNumber += 1;
          callback(list);
          page.scroll.refresh();
        }
      });
    });
  }

  BrandUnique = function (page, context) {
    setTimeout(function () {
      debug('【Module】: Call BrandUnique');
      template = require('template/brand_unique');
      $(page).html(template);
      $(page).find('.go-back').click(function () {
        App.back(App.getBackPage());
      });
      $(page).find('.btn-category').click(function () {
        App.load('category');
      });
      $(page).find('.bottombar-ul li').click(function () {
        App.load($(this).attr('data-target'));
      });
      var cate_temp = HandlebarsHelper.compile($(page).find('.mer-unique-ul').html());
      var tpl = $(page).find('.mer-unique-right-ul').html();
      App.query('/product/price', {
        cache: true,
        success: function (result) {
          $(page).find('.mer-unique-ul').html(cate_temp({list: result.catList}));
          var $left = $(page).find('#merchant-unique-left');
          var $right = $(page).find('#merchant-unique-right-inner');
          $left.css({
            height: $(window).height() - 140,
            position: 'relative'
          });
          $right.css({
            height: $(window).height() - 160,
            position: 'relative'
          });
          new App._IScroll($left.get(0), {
            mouseWheel: true,
            vScrollbar: false,
            fadeScrollbars: true
          });
          page.scroll = new App._IScroll($right.get(0), {
            mouseWheel: true,
            scrollbars: false
          });
          //Scrollable($(page).find('.mer-unique-ul'), false);
          $(page).find('.mer-unique-ul li').click(function () {
            $(this).addClass('current').siblings().removeClass('current');
            loadBrand(page, '.mer-unique-right-ul', $(this).attr('data-id'), tpl);
          });
          loadBrand(page, '.mer-unique-right-ul', result.catList[0].cat_id, tpl);
        }
      });
    }, 0);
  };

  module.exports = BrandUnique;
});