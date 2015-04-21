/**
 * @description FavoriteCtrl
 * @class FavoriteCtrl
 * @author yongjin<zjut_wyj@163.com> 2015/2/8
 */
define('IncludeBtm', ['template/includeBtm'], function (require, exports, module) {
  var IncludeBtm, template;

  template = require('template/includeBtm');

  IncludeBtm = function (page, render) {
    $(page).find(render).html(template);
    $(page).find('#info').click(function(){
      App.load('favorite_info');
    });
    $(page).find('#message').click(function(){
      App.load('favorite_message');
    });
    $(page).find('#procollect').click(function(){
      App.load('favorite_product');
    });
    $(page).find('#brandcollect').click(function(){
      App.load('favorite_brand');
    });
    $(page).find('#coperation').click(function(){
      App.load('favorite_cooprate');
    });
    $(page).find('#money').click(function(){
      App.load('favorite_money');
    });
  };
  module.exports = IncludeBtm;
});