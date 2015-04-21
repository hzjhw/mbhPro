/**
 * @description FavoriteCtrl
 * @class FavoriteCtrl
 * @author yongjin<zjut_wyj@163.com> 2015/2/8
 */
define('FavInfo', ['App','template/favInfo','HandlebarsHelper'], function (require, exports, module) {
  var FavInfo, App, template,HandlebarsHelper;

  App = require('App');
  HandlebarsHelper = require('HandlebarsHelper');
  template = require('template/favInfo');

  FavInfo = function (page) {
    var tpl = HandlebarsHelper.compile(template);
    App.query('/userinfo', {
      success: function (result) {
        $(page).html(tpl(result.info));

        $(page).find('.btn-back').click(function () {
          App.back();
        });

        $(page).find('#update').click(function(){
          var name = $('#name',$(page)).val();
          var address = $('#address',$(page)).val();
          var isoem = $('#isoem',$(page)).val();
          var year_sum = $('#year_sum',$(page)).val();
          var cust_id = $('#cust_id',$(page)).val();
          if($.trim(name) === '')
          {
            alert('姓名不能为空!');
            return;
          }

          $.ajax({
            url:'/userinfo/update',
            type:'post',
            data:{
              'member.cust_id':cust_id,
              'member.contact_name':name,
              'member.address':address,
              'member.isoem':isoem,
              'member.year_sum':year_sum
            },
            success:function(data){
              if(data.msg == 'success')
              {
                var need = data.member.cust_stock;
                if(!need) {
                  App.showConfirm('修改成功', '是否继续完善您的需求资料？', null, function () {
                    App.load('favorite_love');
                  });
                }else{
                  App.showMsg('修改成功','成功修改资料');
                }
                localStorage[App.CNT_NAME] = name;
              }else if (data.msg == 'error')
              {
                App.showMsg('由于网络等因素,信息修改失败!');
              }
            }
          });
        });
      }
    });





  };
  module.exports = FavInfo;
});