/**
 * @description HomeBrand
 * @class HomeBrand
 * @author yongjin<zjut_wyj@163.com> 2015/2/28
 */
define('HomeBrand', ['App', 'template/home_brand', 'HandlebarsHelper'], function (require, exports, module) {
  var HomeBrand, App, template, HandlebarsHelper;

  App = require('App');
  template = require('template/home_brand');
  HandlebarsHelper = require('HandlebarsHelper');

  function bindBrandDetail(dom) {
    $('.merchant-content-ul li img', dom).click(function () {
      App.setBackPage('home');
      App.addLoading();
      App.load('brand_detail', {
        id: $(this).parents('li').attr('data-id')
      });
    });

    /*收藏*/
    $('.merchant-content-ul li .collection', dom).click(function(){
      if(App.isLogin()){
        var factid = $(this).parents('li').attr('data-id');
        App.query('/userinfo/saveBrand/'+factid,{
          success:function(data){
            if(data.msg === 'success'){
              var cntVal = '成功收藏该企业!';
              App.showMsg('收藏成功',cntVal);
            }else if(data.msg === 'noproid'){
              var cntVal = '无法找到企业相关信息!';
              App.showMsg('收藏错误', cntVal);
            }else if(data.msg === 'hasCollect'){
              var cntVal = '您已收藏过该企业,不能重复搜藏!';
              App.showMsg('重复收藏', cntVal);
            }
          }
        })
      }
      else
      {
        var cntVal = '收藏品牌需要账号登录!现在就登录吗?';
        App.showConfirm('未登录', cntVal, null, function () {
          App.load('login_dealers');
        });
      }
    });
    //意向合作
    $('.merchant-content-ul li .intention', dom).click(function(){
      if(App.isLogin()){
        var factid = $(this).parents('li').attr('data-id');
        App.query('/cmp/hasCoped/'+factid,{
          success:function(data){
            if(data.msg === 'hasCoped'){
              var cntVal = '您与该厂家已有合作!现在查看合作进展情况吗？';
              App.showConfirm("已有合作",cntVal,null,function(){
                App.load("favorite_cooprate");
              })
            }
            else{
              App.load("brand_cooperate",{factid:factid});
            }
          }
        })
      }
      else{
        var cntVal = '登录看最牛招商政策';
        App.showConfirm('未登录', cntVal, null, function () {
          App.load('login_dealers');
        });
      }
    });

  }

  HomeBrand = function (page, context) {
    setTimeout(function(){
      debug('【Module】: Call HomeBrand');
      App.query('/index', {
        cache: true,
        data:{ brandPS:16,fangdaoPS:12,fanghuoPS:8,feibiaoPS:8,buxiugangPS:4,
          mumenPS:8,shengtaiPS:8,gangmuPS:8,lvhejinPS:4,gangzhiPS:4},
        success: function (result) {
          $(page).find('#merchants-show').empty();
          App.render({ render: '#merchants-show', handlebars: HandlebarsHelper, page: page, template: template, data: {
            title: '品牌展示馆',
            list: result.brandList.list
          }, callback: bindBrandDetail});
          App.render({ render: '#merchants-show',handlebars: HandlebarsHelper, page: page, template: template, data: {
            title: '防盗门馆',
            list: result.fangdaoList.list
          }, callback: bindBrandDetail});
          App.render({ render: '#merchants-show',handlebars: HandlebarsHelper, page: page, template: template, data: {
            title: '防火门馆',
            list: result.fanghuoList.list
          }, callback: bindBrandDetail});
          App.render({ render: '#merchants-show',handlebars: HandlebarsHelper, page: page, template: template, data: {
            title: '非标门馆',
            list: result.feibiaoList.list
          }, callback: bindBrandDetail});
          App.render({ render: '#merchants-show',handlebars: HandlebarsHelper, page: page, template: template, data: {
            title: '木门馆',
            list: result.mumenList.list
          }, callback: bindBrandDetail});
          App.render({ render: '#merchants-show',handlebars: HandlebarsHelper, page: page, template: template, data: {
            title: '生态木门/强化门馆',
            list: result.shengtaiList.list
          }, callback: bindBrandDetail});
          App.render({ render: '#merchants-show',handlebars: HandlebarsHelper, page: page, template: template, data: {
            title: '钢木门馆',
            list: result.gangmuList.list
          }, callback: bindBrandDetail});
          App.render({ render: '#merchants-show',handlebars: HandlebarsHelper, page: page, template: template, data: {
            title: '不锈钢门馆',
            list: result.buxiugangList.list
          }, callback: bindBrandDetail});
          App.render({ render: '#merchants-show',handlebars: HandlebarsHelper, page: page, template: template, data: {
            title: '铝合金门馆',
            list: result.lvhejinList.list
          }, callback: bindBrandDetail});
          App.render({ render: '#merchants-show',handlebars: HandlebarsHelper, page: page, template: template, data: {
            title: '钢质室内门馆',
            list: result.gangzhiList.list
          }, callback: bindBrandDetail});
          App.initLazyLoad(page);
        }
      });
    }, 0);
  };

  module.exports = HomeBrand;
});