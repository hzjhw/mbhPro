/**
 * @description ProductSearch
 * @class ProductSearch
 * @author yongjin<zjut_wyj@163.com> 2015/2/8
 */
define('ProductDetail', ['App', 'template/product_detail', 'HandlebarsHelper'], function (require, exports, module) {
  var ProductDetail, App, template, HandlebarsHelper;

  App = require('App');
  HandlebarsHelper = require('HandlebarsHelper');

  ProductDetail = function (page, id, proid, ctx) {
    setTimeout(function () {
      debug('【Module】: Call ProductDetail');
      template = require('template/product_detail');
      var tpl = HandlebarsHelper.compile(template);

      App.query('/cmp/proDetail/' + id, {
        cache: true,
        data: {proid: proid},
        success: function (result) {
          $(page).html(tpl(result));
          seajs.use(['ProductOther'],function(ProductOther){
            new ProductOther(page,'.product-other',id,proid);
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
              var isBrandBase = $(this).hasClass('brand-base');
              if(isBrandBase){
                //基本信息
                seajs.use(['ProductOther'],function(ProductOther){
                  new ProductOther(page,'.product-other',id,proid);
                })
              }
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
          // 产品收藏
          $(page).find('.sc').click(function () {
            App.query("/userinfo/savePro/" + proid, {
              success: function (result) {
                var cntVal = '收藏失误';
                if (result.msg == 'nologin') {
                  cntVal = '收藏产品需要账号登录!现在就登录吗?';
                  App.showConfirm('未登录', cntVal, null, function () {
                    App.setBackPage('product_detail')
                    App.load('login_dealers');
                  });
                }
                else if (result.msg == 'error') {
                  cntVal = '由于网络等因素,收藏失败!';
                  App.showMsg('收藏失败', cntVal);
                }
                else if (result.msg == 'success') {
                  cntVal = ' 您成功收藏该产品';
                  App.showMsg('收藏成功', cntVal);
                }
                else if (result.msg == 'noproid') {
                  cntVal = '无法找到该产品详细信息';
                  App.showMsg('收藏错误', cntVal);
                }
                else if (result.msg == 'hasCollect') {
                  cntVal = '不能重复收藏该产品!';
                  App.showMsg('重复收藏', cntVal);
                }
              }
            });
          })
        }
      });
    }, 0);
  };

  module.exports = ProductDetail;
});