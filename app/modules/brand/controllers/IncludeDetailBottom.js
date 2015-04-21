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
      try{
            if(!App.isLogin())
            {
              var cntVal = '登陆后即可提交，轻松搞定，厂家第一时间与您联系！';
              App.showConfirm('未登录', cntVal, null, function () {
                $('.app-bottombar',$(page)).removeClass('brand-bottom-auto-show');
                //App.setBackPage('brand_detail');
                App.load('login_dealers');
              });
              return;
            }
            else
            {
              var factid = $(this).attr('data-factid');
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
      }catch(e){
        console.log(e);
      }
      return false;
    });
  }

  module.exports = IncludeDetailBottom;
});