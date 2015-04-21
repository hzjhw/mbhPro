/**
 * @description FavoriteCtrl
 * @class FavoriteCtrl
 * @author yongjin<zjut_wyj@163.com> 2015/2/8
 */
define('FavFactMsg', ['App','template/favFactMsg','HandlebarsHelper'], function (require, exports, module) {
  var FavFactMsg, App, template,HandlebarsHelper;

  App = require('App');
  HandlebarsHelper = require('HandlebarsHelper');
  template = require('template/favFactMsg');

  FavFactMsg = function (page) {
    var tpl = HandlebarsHelper.compile(template);
    $(page).html(template);
    App.query('/userinfo/factMsg', {
      success: function (result) {
        $(page).html(tpl(result));
        seajs.use(['IncludeBtm'], function (IncludeBtm) {
          new IncludeBtm(page, '.footer_mes');
        });
        $(page).find('#tocoperate').click(function(){
          var factid = $(this).parent('.contact').attr('fact-id');
          if(!App.isLogin())
          {
            var cntVal = '对不起,合作前需登录!现在就登录吗?';
            App.showConfirm('未登录', cntVal, null, function () {
              //App.setBackPage('brand_detail');
              App.load('login_dealers');
            });
            return;
          }
          else
          {
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

        $(page).find('#lvmsg').click(function(){
          var factid = $(this).parent('.contact').attr('fact-id');
          App.load('brand_detail',{id:factid});
        });

        $(page).find('.btn-back').click(function() {
          App.back();
        });
      }
    });
  };
  module.exports = FavFactMsg;
});