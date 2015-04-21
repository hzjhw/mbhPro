/**
 * @description BrandUnique
 * @class BrandUnique
 * @author yongjin<zjut_wyj@163.com> 2015/2/9
 */
define('CommentIndexCtrl', ['App', 'template/comment_index', 'HandlebarsHelper'], function (require, exports, module) {
  var CommentIndexCtrl, App, template, HandlebarsHelper;

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
              App.setBackPage('comment_index');
              App.addHash('#/product_comment?fact_id=' + $(this).attr('cust-id') + '&pro_id=' + $(this).attr('data-id'));
              App.load('product_comment', {
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

  CommentIndexCtrl = function (page, context) {
    setTimeout(function () {
      debug('【Module】: Call comment');
      template = require('template/comment_index');
      $(page).html(template);
      /*首页 开始*/
      try {
        $(page).find('[data-target="inputs"]')
          .attr('data-target', null)
          .stickyClick(function (unlock) {
            App.pick('inputs', function (params) {
              debug(JSON.stringify(params));
              unlock();
            });
          });
      } catch (e) {
      }

      // 我的330
      setTimeout(function () {
        if (!window.myDialog) {
          App.show330(page);
        }
      }, 0);

      $(page).find('.app-search').click(function(e){
        e.preventDefault();
        App.load('search');
      });
      $(page).find('.btn-menu').click(function(e){
        e.preventDefault();
        App.load('category');
      });

      $(page).find('.btn-my').click(function (e) {
        e.preventDefault();
        var $dom = $(this).find('.span-my').get(0);
        if (App.isLogin()) {
          App.show330(page, function (dialog) {
            dialog.showModal($dom)
          })
        }
        else {
          var cntVal = '请先登录';
          App.showConfirm('未登录', cntVal, $dom, function () {
            App.setBackPage('other_iceindex');
            App.load('login_dealers');
          });
        }
      });
      /*首页 结束*/
      $("#nowtitle").text('2015门业流行趋势抢先看，与行业大咖共同指点门业商业变幻！');
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

          $(page).find('.mer-unique-ul li').click(function () {
            $(this).addClass('current').siblings().removeClass('current');
            loadBrand(page, '.mer-unique-right-ul', $(this).attr('data-id'), tpl);
          });
          $(page).find('.btn-back').click(function(){
            App.back();
          });
          loadBrand(page, '.mer-unique-right-ul', 3376238744, tpl);
        }
      });
    }, 0);
  };

  module.exports = CommentIndexCtrl;
});