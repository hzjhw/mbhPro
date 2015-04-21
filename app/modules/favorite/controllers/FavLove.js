/**
 * @description FavoriteCtrl
 * @class FavoriteCtrl
 * @author yongjin<zjut_wyj@163.com> 2015/2/8
 */
define('FavLove', ['App','template/favLove','HandlebarsHelper'], function (require, exports, module) {
  var FavLove, App, template,HandlebarsHelper;

  App = require('App');
  HandlebarsHelper = require('HandlebarsHelper');
  template = require('template/favLove');

  FavLove = function (page) {
    var tpl = HandlebarsHelper.compile(template);
    App.query('/userinfo/loveList',{
      success:function(data){
        var newData={'allLoves':data.allLove,'myLoves':data.loveList};
        $(page).html(tpl(newData));
        $(page).find('li').click(function(){
          $(this).toggleClass('red');
        });
        $(page).find('#chglove').click(function(){
          var curLoves = '';
          $('li',$(page)).each(function(i){
            if($(this).hasClass('red'))
              curLoves +=$(this).attr('data-id')+',';
          });
          App.query('/userinfo/chgLove',{
            data:{myLoves:curLoves},
            success:function(result){
              if(result.msg === 'success'){
                var cntVal = '您的需求更新成功!';
                App.showMsg('修改成功', cntVal);
              }else if(result.msg === 'error'){
                var cntVal = '由于网络等因素,您的需求更新失败!';
                App.showMsg('修改失败', cntVal);
              }else if(result.msg === 'nologin'){
                var cntVal = '对不起,您还未登录!现在就登录吗?';
                App.showConfirm('未登录', cntVal, null, function () {
                  App.load('login_dealers');
                });
              }
            }
          })
        });
        $(page).find('.btn-back').click(function () {
          App.back();
        });
      }
    });
  };
  module.exports = FavLove;
});