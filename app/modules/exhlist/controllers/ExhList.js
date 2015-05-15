/**
 * @description ExhList
 * @class ExhList
 * @author yongjin<zjut_wyj@163.com> 2015/2/8
 */
define('ExhList', ['App', 'template/exhlist','Est','HandlebarsHelper'], function (require, exports, module) {
  var ExhList, App, template,Est,HandlebarsHelper;

  App = require('App');
  Est = require('Est');
  HandlebarsHelper = require('HandlebarsHelper');

  ExhList = function (page, context) {
      debug('【Module】: Call ExhList');
      App.query('/exh',{
        success:function(data){
          template = require('template/exhlist');
          data.exhlist = Est.bulidTreeNode(data.exhlist, 'exhtype', '@', {
            categoryId: 'exhnum',// 分类ＩＤ
            belongId: 'exhtype',// 父类ＩＤ
            childTag: 'children', // 子分类集的字段名称
            callback: function (item) {
            }
          });
         var tpl = HandlebarsHelper.compile(template);
         $(page).html(tpl(data));

          $(page).find('.category-close').click(function () {
            App.back();
          });

          $(page).find('.cate-ul li').each(function () {
            $(this).click(function () {
              App.load('exh_detail', {
                id: $(this).attr('data-id')
              });
              return false;
            });
          });
        }
      })
  };

  module.exports = ExhList;
});