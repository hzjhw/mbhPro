/**
 * @description Voucher
 * @class Voucher
 * @author yongjin<zjut_wyj@163.com> 2015/2/8
 */
define('Voucher', ['App', 'template/vch_index', 'HandlebarsHelper'], function (require, exports, module) {
  var Voucher, App, template, HandlebarsHelper;

  App = require('App');
  HandlebarsHelper = require('HandlebarsHelper');
  template = require('template/vch_index');

  Voucher = function (page) {
    App.query('/vch',{
      success:function(data){
        var tpl = HandlebarsHelper.compile(template);
        $(page).html(tpl(data));

        $(page).find('#vchsub').click(function(){
          var phoneNum = $("#phoneNum", $(page)).val();
          var reg = /^(1[3|5|8])[\d]{9}$/;
          if ($.trim(phoneNum) === '') {
            alert("手机号码不能为空！");
            $("#phoneNum", $(page)).focus();
            return;
          }
          if (!reg.test(phoneNum)) {
            alert("电话号码格式错误!");
            $("#phoneNum", $(page)).focus();
            return;
          }
          localStorage[App.VCH_CUST_PHONE] = phoneNum;
          App.load('vch_choice');
        });
      }
    });

  };

  module.exports = Voucher;
});