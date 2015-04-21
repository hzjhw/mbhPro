/**
 * @description Register
 * @class Register
 * @author yongjin<zjut_wyj@163.com> 2015/2/8
 */
define('Register', ['App', 'template/register'], function (require, exports, module) {
  var Register, App, template;

  App = require('App');
  template = require('template/register');

  Register = function (page, ctx) {
    debug('【Module】: Call Register');
    $(page).html(template);
    $(page).find('.btn-back').click(function () {
      App.back();
    });
    $(page).find('#login').click(function () {
      App.setBackPage('home')
      App.load('login_dealers');
    });

    $(page).find('#forgetpwd').click(function(){
      App.load('forget_pwd');
    });

    $(page).find('#userRegister').click(function () {
      var $phoneNum = $("#phoneNum", $(page));
      var $passwd = $("#passwd", $(page));
      var $passwd1 = $("#cfmpasswd", $(page));

      var reg = /^(1[3|5|8])[\d]{9}$/;
      if ($.trim($phoneNum.val()) === '') {
        alert('手机号不能为空！');
        $phoneNum.focus();
        return;
      }
      if (!reg.test($phoneNum.val())) {
        alert("手机号码格式错误!");
        $phoneNum.focus();
        return;
      }
      if ($.trim($passwd.val()) === '') {
        alert("密码不能为空！");
        $passwd.focus();
        return;
      }

      if ($passwd.val() !== $passwd1.val()) {
        alert("两次密码输入不一致!");
        $passwd1.focus();
        return;
      }

      App.query('/register', {
        data: {
          phoneNum: $phoneNum.val(),
          passwd: $passwd.val()
        },
        success: function (data) {
          if (data.result == 'success') {
            alert("恭喜您，注册成功！");
            // 清空STACK栈
            App._Stack.destroy();
            localStorage[App.CELL_PHONE]=data.phoneNum;
            //localStorage[App.CNT_NAME]=data.cntName;
            App.load('home');
          }
          else {
            if (data.msg == 'exists') {
              if (window.confirm("该手机号已被注册,需要登录吗?")) {
                App.load("login_dealers");
              }
            }
            else
              alert("由于网络等因素，注册失败！请重新注册。");
          }
        }
      });

    });

  };

  module.exports = Register;
});