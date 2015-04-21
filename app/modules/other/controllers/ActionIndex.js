/**
 * @description Login
 * @class Login
 * @author yongjin<zjut_wyj@163.com> 2015/2/8
 */
define('ActionIndex', ['App', 'template/action_index'], function (require, exports, module) {
  var ActionIndex, App, template;

  App = require('App');
  template = require('template/action_index');

  ActionIndex = function (page, ctx) {
    debug('【Module】: Call action_index');
    $(page).html(template);
    $('#nowtitle').text('看2015门业趋势ˇ2天1万个红包派送ˇ倒计时27小时…招商节你来了吗');
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

    $(page).find('.app-logo').click(function(){
      App.back('home');
    });
    $(page).find('.detailed li').click(function(){
      var ids = $(this).attr('data-id');
      if(ids ==='first')
      {
        var url =encodeURIComponent("http://331.11door.com/ent/lottery/detail.jsp");
        window.location.href ='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx50258f41b8aa6b1c&redirect_uri='+url+'&response_type=code&scope=snsapi_base&state=0#wechat_redirect';
        return;
      }

      if(ids.length > 0)
        App.load(ids,ctx);
    });
    $(page).find('.btn-back').click(function () {
      App.back();
    });
  };

  module.exports = ActionIndex;
});