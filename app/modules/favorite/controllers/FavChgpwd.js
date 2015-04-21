/**
 * @description FavoriteCtrl
 * @class FavoriteCtrl
 * @author yongjin<zjut_wyj@163.com> 2015/2/8
 */
define('FavChgpwd', ['App','template/favChgpwd'], function (require, exports, module) {
  var FavChgpwd, App, template;

  App = require('App');
  template = require('template/favChgpwd');

  FavChgpwd = function (page) {
    $(page).html(template);
    $(page).find('.btn-back').click(function () {
      App.back();
    });
    $(page).find('#chgpwd').click(function(){
      var oldpwd = $('#oldpwd',$(page)).val();
      var newpwd = $('#newpwd',$(page)).val();
      var cfmpwd = $('#cfmpwd',$(page)).val();
      if($.trim(oldpwd) === ''){
        var cntVal = '旧密码不能为空!';
        App.showMsg('密码为空', cntVal);
      }
      if($.trim(newpwd) === ''){
        var cntVal = '新密码不能为空!';
        App.showMsg('密码为空', cntVal);
      }
      if(newpwd !== cfmpwd){
        var cntVal = '新密码和确认密码不一致!';
        App.showMsg('密码不一致', cntVal);
      }
      App.query('/userinfo/chgpwd',{
        data:{oldpwd:oldpwd,newpwd:newpwd},
        success:function(result){
          if(result.msg === 'success'){
            var cntVal = '密码修改成功!';
            App.showMsg('修改成功', cntVal);
            App.back('home');
          }else if(result.msg === 'nopasswd'){
            var cntVal = '旧密码不正确!';
            App.showMsg('密码不正确', cntVal);
          }else if(result.msg === 'error'){
            var cntVal = '由于网络等因素,密码修改失败!';
            App.showMsg('修改失败', cntVal);
          }
        }
      });
    });

  };
  module.exports = FavChgpwd;
});