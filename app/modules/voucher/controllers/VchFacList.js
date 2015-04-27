/**
 * @description VchFacList
 * @class VchFacList
 * @author yongjin<zjut_wyj@163.com> 2015/2/8
 */
define('VchFacList', ['App', 'template/vch_faclist','HandlebarsHelper'], function (require, exports, module) {
  var VchFacList, App, template,HandlebarsHelper;

  App = require('App');
  template = require('template/vch_faclist');
  HandlebarsHelper=require('HandlebarsHelper');

  VchFacList = function (page,catid) {
    App.query('/vch/facList/'+catid,{
      cache:true,
      success:function(data){
        var tpl = HandlebarsHelper.compile(template);
        data.phone=localStorage[App.VCH_CUST_PHONE];
        $(page).html(tpl(data));

        $(page).find('.btn-back').click(function () {
          App.back();
        });
      }
    })
  };
  module.exports = VchFacList;
});