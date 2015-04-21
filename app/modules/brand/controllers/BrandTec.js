/**
 * @description BrandTec
 * @class BrandTec
 * @author yongjin<zjut_wyj@163.com> 2015/2/8
 */
define('BrandTec', ['App', 'template/brand_tec', 'HandlebarsHelper'], function (require, exports, module) {
  var BrandTec, App, template, HandlebarsHelper;
  App = require('App');
  HandlebarsHelper = require('HandlebarsHelper');
  template = require('template/brand_tec');

  BrandTec = function (page, id, context) {
    setTimeout(function () {
      debug('【Module】: Call BrandTec');
      var tpl = HandlebarsHelper.compile(template);
      App.query('/cmp/factgood/' + id, {
        cache: true,
        success: function (result) {
          console.log(result.facPhone);
          $(page).html(tpl(result));
          if(!result.header) result.header={};
          //App.trigger('initBrandCommon', page, context);
          seajs.use(['IncludeHeader'], function (IncludeHeader) {
            result.header.id = id;
            result.header.icon = 4;
            result.header.hide = false;
            new IncludeHeader(page, '#include_header', result.header);
          });
          /*seajs.use(['IncludeDetailBottom'], function (IncludeDetailBottom) {
            new IncludeDetailBottom(page, '.bottombar-ul', {
              isLogin: App.isLogin(),
              facPhone: result.facPhone
            });
          });*/
          // 底部导航
         /* $(page).find('.bottombar-ul li').click(function () {
            App.load($(this).attr('data-target'));
          });*/
          $(page).find('.lan').click(function(){
            $(this).parents('.x').eq(0).find('.detailed_general').css({
              height: 'auto'
            });
            $(this).remove();
          });
          page.facPhone = result.facPhone;
          $(page).find('.go-back').click(function () {
            App.back(App.getBackPage());
          });
        }
      });
    }, 0);
  };


  module.exports = BrandTec;
});