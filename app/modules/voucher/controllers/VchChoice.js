/**
 * @description VchChoice
 * @class VchChoice
 * @author yongjin<zjut_wyj@163.com> 2015/2/8
 */
define('VchChoice', ['App', 'template/vch_choice'], function (require, exports, module) {
  var VchChoice, App, template;

  App = require('App');
  template = require('template/vch_choice');

  VchChoice = function (page) {
    $(page).html(template);

    $(page).find("button").click(function(){
      var curType = $(this).attr("data-id");
      localStorage[App.VCH_CHOICE_TYPE] =curType;
      App.load('vch_brandtype',{type:curType});
    });

    $(page).find('.btn-back').click(function () {
      App.back();
    });
  };

  module.exports = VchChoice;
});