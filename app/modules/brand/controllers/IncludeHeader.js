/**
 * @description IncludeHeader
 * @class IncludeHeader
 * @author yongjin<zjut_wyj@163.com> 2015/2/8
 */
define('IncludeHeader', ['App', 'template/include_header', 'HandlebarsHelper'], function (require, exports, module) {
  var IncludeHeader, App, template, HandlebarsHelper;


  App = require('App');
  HandlebarsHelper = require('HandlebarsHelper');
  template = require('template/include_header');

  IncludeHeader = function (page, render, data) {
    setTimeout(function(){
      debug('【Module】: Call IncludeHeader');
      $("#nowtitle").text(data.web_title);
      if(data.id === '20399' || data.id == '944' || data.id == '20398')
      {
        data.header_img = null;
      }
      var tpl = HandlebarsHelper.compile(template);
      $(page).find(render).html(tpl(data || {
        logo_img: null
      }));
      $(page).find('.nav ul li').off('click').on('click', function () {
        if($(this).attr('data-url') === '')
        {
          if(!App.isLogin())
          {
            var cntVal = '登录看最牛招商政策';
            App.showConfirm('未登录', cntVal, null, function () {
              //App.setBackPage('brand_detail');
              App.load('login_dealers');
            });
            return;
          }
          else
          {
            var factid = $(this).attr('data-id');
            //alert(factid);
            App.query('/cmp/hasCoped/'+factid,{
              success:function(data){
                if(data.msg === 'hasCoped')
                {
                  var cntVal = '您与该厂家已有合作!现在查看合作进展情况吗？';
                  App.showConfirm("已有合作",cntVal,null,function(){
                    App.load("favorite_cooprate");
                  })
                }
                else
                {
                  App.load('brand_cooperate',{factid:factid});
                }
              }
            })
          }
        }
        else
        {
          App.load($(this).attr('data-url'), {
            id: $(this).attr('data-id')
          });
          return false;
        }
      });
      $(page).find('.logo').click(function(){
        App.back('home');
      });
      $(page).find("#factory .header .hall").on('click', function () {
        $(this).toggleClass("minus");
        $("#factory .prolist").toggleClass("show");
      });
      $(page).find('.prolist a').click(function () {
        if ($(this).attr('data-id').length === 0){
          App.load('brand_unique');
          return;
        }
        App.load('brand_list', {
          id: $(this).attr('data-id'),
          title: $(this).attr('data-title'),
          banner: $(this).attr('data-banner')
        });
      });
    }, 0);
  };
  module.exports = IncludeHeader;
});