/**
 * Created by Administrator on 2015/2/9.
 */
define('IncludeListBottom', ['App', 'template/include_list_bottom', 'HandlebarsHelper'], function (require, exports, module) {
  var IncludeListBottom, App, template, HandlebarsHelper;

  App = require('App');
  HandlebarsHelper = require('HandlebarsHelper');
  template=require('template/include_list_bottom');

  IncludeListBottom = function (page, render,data) {
    var renderObj =$(page).find(render);
    renderObj.html(HandlebarsHelper.compile(template));
    App.initBrandListBottom(renderObj, data)
  };
  module.exports = IncludeListBottom;
});