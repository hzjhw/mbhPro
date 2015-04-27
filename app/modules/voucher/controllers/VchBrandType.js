/**
 * @description VchBrandType
 * @class VchBrandType
 * @author yongjin<zjut_wyj@163.com> 2015/2/8
 */
define('VchBrandType', ['App', 'template/vch_brandtype','HandlebarsHelper'], function (require, exports, module) {
  var VchBrandType, App, HandlebarsHelper,template;

  App = require('App');
  template = require('template/vch_brandtype');
  HandlebarsHelper=require('HandlebarsHelper');

  VchBrandType = function (page,type){
    App.query('/vch/catlist',{
    success:function(result){
      var tpl = HandlebarsHelper.compile(template);
      result.type = type;
      $(page).html(tpl(result));
      $(page).find('li').click(function(){
        var catid = $(this).attr('data-id');
        App.load('vch_faclist',{catid:catid});
      });
      $(page).find('.btn-back').click(function () {
        App.back();
      });
      }
    });
  };

  module.exports = VchBrandType;
});