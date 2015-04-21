/**
 * @description BrandDetail
 * @class BrandDetail
 * @author yongjin<zjut_wyj@163.com> 2015/2/8
 */
define('BrandDetail', ['App', 'template/brand_detail', 'HandlebarsHelper'], function (require, exports, module) {
  var BrandDetail, App, template, HandlebarsHelper;

  App = require('App');
  HandlebarsHelper = require('HandlebarsHelper');
  template = require('template/brand_detail');

  BrandDetail = function (page, id, context) {
    setTimeout(function () {
      debug('【Module】: Call BrandDetail');
      if(id === 'null')
      {
        console.log('id为空值了!');
        App.load('home');
        return;
      }
      var tpl = HandlebarsHelper.compile(template);
      App.query('/cmp/' + id, {
        cache: true,
        success: function (result) {
          console.log(result.facPhone);
          if (!result.header) {
            result.header = {
              back_img: 'images/no-pic.jpg',
              header_img: 'images/no-pic.jpg',
              logo_img: 'images/no-pic.jpg'
            };
          }
          result.header.id = id;
          if (!result.inxImgs) result.inxImgs = [];
          $(page).html(tpl(result.inxImgs));
          //App.trigger('initBrandCommon', page, context);
          seajs.use(['IncludeHeader'], function (IncludeHeader) {
            result.header.icon = 1;
            result.header.hide = false;
            new IncludeHeader(page, '#include_header', result.header);
          });
          page.facPhone = result.facPhone;
          /*seajs.use(['IncludeDetailBottom'], function (IncludeDetailBottom) {
            new IncludeDetailBottom(page, '.bottombar-ul', {
              isLogin: App.isLogin(),
              facPhone: result.facPhone
            });
          });*/
          $(page).find("#imgtovch").click(function(){
            if(App.isLogin())
              App.load('brand_cooperate',{factid:id});
            else{
              var cntVal = '登录看最牛招商政策';
              App.showConfirm('未登录', cntVal, null, function () {
                App.setBackPage('brand_cooperate');
                App.load('login_dealers');
              });
            }
          });
          $(page).find('#first').click(function () {
            var url =encodeURIComponent("http://331.11door.com/ent/lottery/detail.jsp");
            window.location.href ='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx50258f41b8aa6b1c&redirect_uri='+url+'&response_type=code&scope=snsapi_base&state=0#wechat_redirect';
          });
          $(page).find('.go-back').click(function () {
            App.back('home');
          });
        }
      });
    }, 0);
  };

  module.exports = BrandDetail;
});