/**
 * @description BrandCooperate
 * @class BrandCooperate
 * @author yongjin<zjut_wyj@163.com> 2015/3/6
 */
define('BrandCooperate', ['App', 'HandlebarsHelper', 'template/brand_cooperate'], function (require, exports, module) {
  var BrandCooperate, App, HandlebarsHelper, template;

  App = require('App');
  HandlebarsHelper = require('HandlebarsHelper');
  template = require('template/brand_cooperate');

  BrandCooperate = function (page, facid,vchphone,vchid) {
    var data = {'vchphone':vchphone,'vchid':vchid};
    var tpl = HandlebarsHelper.compile(template);
    $(page).html(tpl(data));
    $(page).find("#phoneNum").on('keyup',function(){
      $("#vouchers",$(page)).val('无');
      if($(this).val().length == 11 )
      {
        var phoneNum = $(page).find('#phoneNum').val();
        //查询结果
        App.query('/cmp/qrVch', {
          data: {
            'fact_id': facid,
            'phoneNum': phoneNum
          },
          success: function (result) {
            if(result.msg === 'copped'){
              var cntVal = '已经与该厂家合作过了!';
              App.showMsg('已合作', cntVal);
            }else if(result.msg === 'nocop'){
              var vch = result.vchid;
              if(vch == '')
                vch ="无";
              $("#vouchers",$(page)).val(vch);
            }
          }
        })
      }
    });

    $(page).find('#confirm').click(function(){
      var nameVal  = $(page).find('#name').val();
      var address  = $(page).find('#address').val();
      var isoem    = $(page).find('#isoem').val();
      var year_sum = $(page).find('#year_sum').val();
      var vouchers = $(page).find('#vouchers').val();
      var vouchMsg = $(page).find('#vouchMsg').val();
      var phoneNum = $(page).find('#phoneNum').val();
      var reg = /^(1[3|5|8])[\d]{9}$/;
      if($.trim(phoneNum) =='')
      {
        var cntVal = '手机号不能为空！';
        App.showMsg('手机号为空', cntVal);
        return;
      }
      if (!reg.test(phoneNum)) {
        var cntVal = '电话号码格式错误!';
        App.showMsg('格式错误', cntVal);
        return;
      }
      if($.trim(nameVal) == '')
      {
        var cntVal = '真实姓名不能为空!';
        App.showMsg('姓名为空', cntVal);
        return;
      }
      if($.trim(vouchMsg) == '')
      {
        var cntVal = '留言内容不能为空!';
        App.showMsg('内容为空', cntVal);
        return;
      }
      if($.trim(facid) == '')
      {
        var cntVal = '无效的厂家信息!';
        App.showMsg('厂家信息错误', cntVal);
        return;
      }

      App.query('/cmp/fixCoop',{
        data:{
          'contact_name': nameVal,
          'isoem': isoem,
          'year_sum': year_sum,
          'address': address,
          'vchid': vouchers,
          'content': vouchMsg,
          'fact_id': facid,
          'phone':phoneNum
        },
        success:function(result){
          var cntVal = '成功发送合作信息,敬请关注厂家回复!';
          if(result.msg == 'success'){
            localStorage[App.CNT_NAME] = nameVal;
            App.showMsg('合作成功', cntVal);
            App.load('brand_detail',{id:facid});
          }else if(result.msg =='nofact'){
            cntVal = '未知厂家信息';
            App.showMsg('未知厂家', cntVal);
          }else if(result.msg =='nologin'){
            cntVal = '等太久了,合作超时!';
            App.showMsg('合作超时', cntVal);
            App.load('home');
          }else if (result.msg == 'erUpdate'){
            cntVal = '由于网络等因素,造成合作失败!请重新合作';
            App.showMsg('合作失败', cntVal);
          }else if (result.msg == 'erSave'){
            cntVal = '由于网络等因素,造成无法合作!请重新合作';
            App.showMsg('合作错误', cntVal);
          }else if (result.msg == 'erMember'){
            cntVal = '由于网络等因素,你的信息无法存储!';
            App.showMsg('资料无法存储', cntVal);
          }else if (result.msg == 'hasCoped'){
            cntVal = '您与该厂家已有合作!';
            App.showMsg('已有合作', cntVal);
          }else{
            cntVal = '由于网络等因素,信息无法提交!';
            App.showMsg('信息无法识别', cntVal);
          }
          App.back();
        }
      })
    });
    $(page).find('#myvch').click(function(){
      App.load('favorite_vouch');
    });
    $(page).find('#mycoop').click(function(){
      App.load('favorite_cooprate');
    });
    $(page).find('.btn-back').click(function () {
      //App.load('brand_detail',{id:facid});
      App.back();
    });

  };

  module.exports = BrandCooperate;
});