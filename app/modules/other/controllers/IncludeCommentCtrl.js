/**
 * @description BrandUnique
 * @class BrandUnique
 * @author yongjin<zjut_wyj@163.com> 2015/2/9
 */
define('IncludeCommentCtrl', ['App', 'template/include_comment', 'HandlebarsHelper'], function (require, exports, module) {
  var IncludeCommentCtrl, App, template, HandlebarsHelper;

  App = require('App');
  HandlebarsHelper = require('HandlebarsHelper');
  template = require('template/include_comment');

  IncludeCommentCtrl = function (page, render,proid) {
    setTimeout(function () {
      debug('【Module】: Call comment');

      $(page).find(render).html(template);
      seajs.use(['IncludeCmtlist'], function (IncludeCmtlist) {
        new IncludeCmtlist(page,'.cmtlist',proid);
      });

      $(page).find('#commentSub').click(function(){
        var cntVal = $('#cmtMsg',$(page)).val();
        var codeVal = $('#codeVal',$(page)).val();

        if($.trim(cntVal) === '')
        {
          App.showMsg('内容为空','评论内容不能为空！');
          return;
        }

        App.query('/product/comment',{
          data:{'captcha':codeVal,'comment.content':cntVal,'comment.pro_id':proid},
          success:function(result){
            if(result.msg === 'ercode'){
              App.showMsg('错误','验证码错误！')
            }else if(result.msg === 'success'){
              App.showMsg('评论成功','成功评论！');
              $('#cmtMsg',$(page)).val('');
              $('#codeVal',$(page)).val('');
              seajs.use(['IncludeCmtlist'], function (IncludeCmtlist) {
                new IncludeCmtlist(page,'.cmtlist',proid);
              });
              $(page).find('#chgcode').attr('src','/product/chgCode?' + new Date().getTime());
            }else if(result.msg === 'noporid'){
              App.showMsg('错误','无相关产品信息')
            }
          }
        });
      });

    }, 0);
  };

  module.exports = IncludeCommentCtrl;
});