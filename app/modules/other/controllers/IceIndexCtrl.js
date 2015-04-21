/**
 * @description Login
 * @class Login
 * @author yongjin<zjut_wyj@163.com> 2015/2/8
 */
define('IceIndexCtrl', ['App', 'template/ice_index'], function (require, exports, module) {
  var IceIndexCtrl, App, template;

  App = require('App');
  template = require('template/ice_index');

  IceIndexCtrl = function (page, ctx) {
    debug('【Module】: Call Ice8');
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
    $("#nowtitle").text('一线品牌最震撼招商政策，绝无仅有，全年最低折扣！');
    $(page).find('.app-logo').click(function(){
      App.back('home');
    });
    $(page).find('.detailed li').click(function(){
      var ids = $(this).attr('data-id');
      App.load(ids,ctx);
    });
    $(page).find('.btn-back').click(function () {
      App.back();
    });
  };

  module.exports = IceIndexCtrl;
});