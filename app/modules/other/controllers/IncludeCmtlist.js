/**
 * @description BrandUnique
 * @class BrandUnique
 * @author yongjin<zjut_wyj@163.com> 2015/2/9
 */
define('IncludeCmtlist', ['App', 'template/include_cmtlist', 'HandlebarsHelper'], function (require, exports, module) {
  var IncludeCmtlist, App, template, HandlebarsHelper;

  App = require('App');
  HandlebarsHelper = require('HandlebarsHelper');
  template = require('template/include_cmtlist');

  IncludeCmtlist =function(page,render,proid){
    var tpl = HandlebarsHelper.compile(template);
    App.query('/product/cmtList/'+proid,{
      success:function(result){
        $(page).find(render).html(tpl(result));
      }
    })



  };
  module.exports = IncludeCmtlist;
});