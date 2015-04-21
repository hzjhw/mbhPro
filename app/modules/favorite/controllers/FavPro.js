/**
 * @description FavoriteCtrl
 * @class FavoriteCtrl
 * @author yongjin<zjut_wyj@163.com> 2015/2/8
 */
define('FavPro', ['App','template/favPro','HandlebarsHelper'], function (require, exports, module) {
  var FavPro, App, template,HandlebarsHelper;

  App = require('App');
  HandlebarsHelper = require('HandlebarsHelper');
  template = require('template/favPro');

  FavPro = function (page) {
    var tpl = HandlebarsHelper.compile(template);
    App.query('/userinfo/collectPro', {
      success: function (result) {
        $(page).html(tpl(result));
        seajs.use(['IncludeBtm'], function (IncludeBtm) {
          new IncludeBtm(page, '.footer_mes');
        });
          $(page).find('.product li a').on('click', function () {
             var id =  $(this).parents('li').attr('fact-id');
             var proid =  $(this).parents('li').attr('pro-id');
            App.load('product_detail', {
              id: id,
              proid: proid
            });
          });
        $(page).find('.delete').click(function(){
          var parentObj = $(this).parent();
          var collid = parentObj.attr('data-id');
          var name = parentObj.children('.h').text();
          name = name.substring(name.indexOf('：')+1,name.length);
          var cntVal = '删除'+name+'收藏吗?';
          App.showConfirm('删除收藏',cntVal,null,function () {
            App.query('/userinfo/collectDel',{
              data:{'collect.coll_id':collid},
              success:function(result){
                if(result.msg === 'success'){
                  App.load('favorite_product');
                 /* $('ul', $(page)).html('');
                  var $container2 = $('ul', $(page));
                  var template2 = $container2.html();
                  App.render({ render: 'ul', handlebars: HandlebarsHelper,page: page, template: template2, empty: true, data: {
                    list: result.list
                  }});*/
                }
              }
            })
          });
        });
        $(page).find('.btn-back').click(function () {
          App.back('home');
        });
      }
    });
  };
  module.exports = FavPro;
});