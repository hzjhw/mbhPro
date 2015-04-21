/**
 * @description BrandInfo
 * @class BrandInfo
 * @author yongjin<zjut_wyj@163.com> 2015/2/8
 */
define('BrandInfo', ['App', 'template/brand_info', 'HandlebarsHelper'], function (require, exports, module) {
  var BrandInfo, App, template, HandlebarsHelper;

  App = require('App');
  HandlebarsHelper = require('HandlebarsHelper');
  template = require('template/brand_info');

  BrandInfo = function (page, id, context) {
    setTimeout(function () {
      debug('【Module】: Call BrandInfo');
      var tpl = HandlebarsHelper.compile(template);

      App.query('/cmp/factinfo/' + id, {
        cache: true,
        success: function (data) {
          console.log(data.facPhone);
          if (!data.factInfo) {
            data.factInfo = {};
          }
          if (!data.header) {
            data.header = {};
          }
          data.factInfo.id = id;
          data.factInfo.hide = false;
          $(page).html(tpl(data.factInfo));
          $(page).find('.icon').removeClass('current');
          $(page).find('.data').addClass('current');
          //App.trigger('initBrandCommon', page, context);
          seajs.use(['IncludeHeader'], function (IncludeHeader) {
            data.header.id = id;
            data.header.icon = 5;
            new IncludeHeader(page, '#include_header', data.header);
          });
         /* seajs.use(['IncludeDetailBottom'], function (IncludeDetailBottom) {
            new IncludeDetailBottom(page, '.bottombar-ul', {
              isLogin: App.isLogin(),
              facPhone: data.facPhone
            });
          });*/
         /* $(page).find(".title_general").click(function () {
            var pDiv = $(this).find('p').eq(1);
            var nextDiv = $(this).next();
            if ($(this).hasClass('clicked')) {
              pDiv.text('展开').removeClass('shut').addClass('open');
              nextDiv.show();
              $(this).removeClass('clicked');
            } else {
              pDiv.text('收起').removeClass('open').addClass('shut');
              nextDiv.hide();
              $(this).addClass('clicked');
            }
          });*/
          $(page).find('.lan').click(function(){
            $(this).parents('.x').eq(0).find('.detailed_general').css({
              height: 'auto'
            });
            $(this).remove();
          });
          $(page).find('.go-back').click(function () {
            App.back(App.getBackPage());
          });
          page.facPhone = data.facPhone;
          // 底部导航
          /*$(page).find('.bottombar-ul li').click(function () {
            App.load($(this).attr('data-target'));
          });*/
        }
      });
      $(page).find('.go-back').click(function () {
        App.back();
      });
    }, 0);
  };

  module.exports = BrandInfo;
});