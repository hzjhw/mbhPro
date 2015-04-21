/**
 * @description Login
 * @class Login
 * @author yongjin<zjut_wyj@163.com> 2015/2/8
 */
define('Ice5Ctrl', ['App', 'template/ice5'], function (require, exports, module) {
  var Ice5Ctrl, App, template;

  App = require('App');
  template = require('template/ice5');

  Ice5Ctrl = function (page, ctx) {
    debug('【Module】: Call Ice5');
    $(page).html(template);
    $(page).find('.brand .imgs').click(function(){
      var factid = $(this).parent(".brand").attr("data-factid");
      App.load('brand_detail',{id:factid});
    });
    $(page).find('.brand .detailed .yx').click(function(){
      if(!App.isLogin())
      {
        var cntVal = '登录看最牛招商政策';
        App.showConfirm('未登录', cntVal, null, function () {
          //App.setBackPage('brand_detail');
          App.load('login_dealers');
        });
        return;
      }
      else
      {
        var factid = $(this).parent().parent('.brand').attr('data-factid');
        //alert(factid);
        App.query('/cmp/hasCoped/'+factid,{
          success:function(data){
            if(data.msg === 'hasCoped')
            {
              var cntVal = '您与该厂家已有合作!现在查看合作进展情况吗？';
              App.showConfirm("已有合作",cntVal,null,function(){
                App.load("favorite_cooprate");
              })
            }
            else
            {
              App.load('brand_cooperate',{factid:factid});
            }
          }
        })
      }
    });
    $(page).find('#first').click(function () {
      var url =encodeURIComponent("http://331.11door.com/ent/lottery/detail.jsp");
      window.location.href ='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx50258f41b8aa6b1c&redirect_uri='+url+'&response_type=code&scope=snsapi_base&state=0#wechat_redirect';
    });
    $(page).find('.btn-back').click(function () {
      App.back();
    });
  };

  module.exports = Ice5Ctrl;
});