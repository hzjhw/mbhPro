/**
 * @description ProductSearch
 * @class ProductSearch
 * @author yongjin<zjut_wyj@163.com> 2015/2/8
 */
define('ProductComment', ['App', 'template/product_comment', 'HandlebarsHelper'], function (require, exports, module) {
  var ProductComment, App, template, HandlebarsHelper;

  App = require('App');
  HandlebarsHelper = require('HandlebarsHelper');
  template = require('template/product_comment');

  ProductComment = function (page, id, proid, ctx) {
    setTimeout(function () {
      debug('【Module】: Call ProductComment');
      var tpl = HandlebarsHelper.compile(template);

      App.query('/cmp/proDetail/' + id, {
        cache: true,
        data: {proid: proid},
        success: function (result) {
          $(page).html(tpl(result));
          seajs.use(['IncludeCommentCtrl'],function(IncludeCommentCtrl){
            new IncludeCommentCtrl(page,'.comment',proid);
          });
          // 返回按钮
          $(page).find('.category-close').click(function () {
            App.back();
          });
          // tag选项
          var $sub = $(page).find('.cate-item-sub');
          $(page).find('.cate-item').each(function (index) {
            $(this).click(function () {
              var isBrandDetail = $(this).hasClass('brand-detail');
              /*var isBrandBase = $(this).hasClass('brand-base');
              if(isBrandBase){
                //基本信息
                seajs.use(['IncludeCommentCtrl'],function(IncludeCommentCtrl){
                  new IncludeCommentCtrl(page,'.product-other',proid);
                })
              }*/
              if (isBrandDetail) {
                // 品牌详情
                $(this).removeClass('brand-detail');
                seajs.use(['ProductBrandDetail', 'IncludeMessage'], function (ProductBrandDetail, IncludeMessage) {
                  new ProductBrandDetail(page, result.proDetail.cust_id, '.product-brand-detail');
                  new IncludeMessage(page, '.message', {
                    id: result.proDetail.cust_id
                  });
                });
              }
              $(this).addClass('current').siblings('.cate-item').removeClass('current');
              $sub.eq(index).addClass('cate-cur').siblings().removeClass('cate-cur');
            });
          });
        }
      });
    }, 0);
  };

  module.exports = ProductComment;
});