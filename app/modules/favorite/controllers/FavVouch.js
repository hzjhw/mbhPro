/**
 * @description FavoriteCtrl
 * @class FavoriteCtrl
 * @author yongjin<zjut_wyj@163.com> 2015/2/8
 */
define('FavVouch', ['App','template/favVouch','HandlebarsHelper'], function (require, exports, module) {
  var FavVouch, App, template,HandlebarsHelper;

  App = require('App');
  HandlebarsHelper = require('HandlebarsHelper');
  template = require('template/favVouch');

  FavVouch = function (page) {
    var tpl = HandlebarsHelper.compile(template);
    App.query('/userinfo/userVch', {
      success: function (result) {
        $(page).html(tpl(result));
        seajs.use(['IncludeBtm'], function (IncludeBtm) {
          new IncludeBtm(page, '.footer_mes');
        });
        $(page).find('#getVch').click(function(){
          App.query('/userinfo/createVchs',{
            success:function(result){
              if(result.msg === 'success'){
                App.showMsg('成功领取','您成功领取了'+result.leftVch+"张抵金券!");
              }else if(result.msg === 'nologin'){
                App.showConfirm('未登录','您还未登录,现在就登录吗？',null,function () {
                  App.load('login_dealers');
                })
              }else if(result.msg === 'noinfo'){
                App.showConfirm('资料未完善','资料未完善,【姓名、地址、我的需求】必填。现在就完善吗？',null,function () {
                  App.load('favorite_info');
                });
              }else if (result.msg === 'over'){
                App.showMsg('超额','您已经有3张或以上的代金券了!');
                $(this).unbind();
              }
            }
          })
        });

        $(page).find('#viewvch').click(function(){
          App.load('favorite_money');
        });
        $(page).find('.btn-back').click(function () {
          App.back();
        });
      }
    });
  };
  module.exports = FavVouch;
});