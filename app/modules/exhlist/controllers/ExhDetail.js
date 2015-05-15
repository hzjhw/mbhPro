/**
 * @description ExhDetail
 * @class ExhDetail
 * @author yongjin<zjut_wyj@163.com> 2015/2/8
 */
define('ExhDetail', ['App', 'template/exhdetail','HandlebarsHelper'], function (require, exports, module) {
  var ExhDetail, App, template,HandlebarsHelper;

  App = require('App');
  HandlebarsHelper = require('HandlebarsHelper');

  ExhDetail = function (page, id) {
      debug('【Module】: Call ExhDetail');
      App.query('/exh/detail/'+id,{
        success:function(data){
         template = require('template/exhdetail');
         var tpl = HandlebarsHelper.compile(template);
         $(page).html(tpl(data));

          $(page).find('.category-close').click(function () {
            App.back();
          });
        }
      })
  };

  module.exports = ExhDetail;
});