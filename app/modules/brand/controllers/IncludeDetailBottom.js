/**
 * @description IncludeDetailBottom
 * @class IncludeDetailBottom
 * @author yongjin<zjut_wyj@163.com> 2015/3/6
 */
define('IncludeDetailBottom', ['App', 'template/include_detail_bottom', 'HandlebarsHelper'], function (require, exports, module) {
  var IncludeDetailBottom,  App, template, HandlebarsHelper;
  App = require('App');
  HandlebarsHelper = require('HandlebarsHelper');
  template=require('template/include_detail_bottom');

  IncludeDetailBottom = function(page, render,data){
    debug('【Module】: Call IncludeDetailBottom');
    var renderObj =$(page).find(render);
    renderObj.html(HandlebarsHelper.compile(template)(data));
    App.initBrandAutoHide(page);
    window.stopCall = false;
    // 底部导航
    $(page).find('.bottombar-ul li.app-btn').off().on('click', function () {
      var factid = $(this).attr('data-factid');
      App.load('brand_cooperate',{factid:factid});
    });
  };

  module.exports = IncludeDetailBottom;
});