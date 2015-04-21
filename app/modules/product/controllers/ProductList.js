/**
 * @description ProductList
 * @class ProductList
 * @author yongjin<zjut_wyj@163.com> 2015/2/8
 */
define('ProductList', ['App', 'template/product_list', 'Est', 'HandlebarsHelper'], function (require, exports, module) {
  var ProductList, App, Est, template, HandlebarsHelper;

  App = require('App');
  HandlebarsHelper = require('HandlebarsHelper');
  function bindDetail(page, id) {
    $(page).find('.search-list-cont .glitzItem .btn-pro-detail').on('click', function () {
      App.setBackPage('product_list');
      if (id && id === 'null' || !id){
        id =  $(this).parents('.glitzItem').attr('data-id');
      }
      App.load('product_detail', {
        id: id,
        proid: $(this).parents('.glitzItem').attr('data-id')
      });
    });
  }

  function bindCollect(page) {
    $(page).find('.search-list-cont .price .collect').click(function () {
      var proid = $(this).parents('.glitzItem').attr('data-id');
      App.query("/userinfo/savePro/" + proid, {
        success: function (result) {
          if (result.msg == 'nologin') {
            cntVal = '收藏产品需要账号登录!现在就登录吗?';
            App.showConfirm('未登录', cntVal, null, function () {
              App.setBackPage('product_list')
              App.load('login_dealers');
            });
          }
          else if (result.msg == 'error') {
            cntVal = '由于网络等因素,收藏失败!';
            App.showMsg('收藏失败', cntVal);
          }
          else if (result.msg == 'success') {
            cntVal = '您成功收藏该产品';
            App.showMsg('收藏成功', cntVal);
          }
          else if (result.msg == 'noproid') {
            cntVal = '无法找到该产品详细信息';
            App.showMsg('收藏错误', cntVal);
          }
          else if (result.msg == 'hasCollect') {
            cntVal = '不能重复收藏该产品!';
            App.showMsg('重复收藏', cntVal);
          }
        }
      });
    });
  }

  ProductList = function (page, id, price, cat, keywords, ctx) {
    setTimeout(function () {
      debug('【Module】: Call ProductList');
      template = require('template/product_list');
      var tpl = HandlebarsHelper.compile(template);
      if (typeof id === 'undefined') return;
      var url = '/cmp/product/' + id;
      if (price || cat || keywords) {
        url = '/product/price/' + price + '-' + cat + (keywords ? ('-' + keywords) : '');
        $('.factory_logo .factory_banner .nav', $(page)).hide();

        $('#include_header', $(page)).hide();
      }

      App.query(url, {
        cache: true,
        data: {
          pageSize: 500
        },
        success: function (data) {
          console.log(data.facPhone);
          var colum = 'proList';
          var i = 0;
          // 判断选取的列表
          if (price) colum = 'productList';
          else if (cat) colum = 'catList';
          else if (keywords) colum = 'productList';
          else colum = 'proList';
          data.list = data[colum].list;
          // 构建厂家分类
          Est = require('Est');
          data.allCats = Est.bulidTreeNode(data.allCats, 'up_cat_id', 'root', {
            categoryId: 'cat_id',// 分类ＩＤ
            belongId: 'up_cat_id',// 父类ＩＤ
            childTag: 'children', // 子分类集的字段名称
            callback: function (item) {
            }
          });
          // Dom插入
          $(page).html(tpl(data));
          App.initLazyLoad(page);
          // 如果是搜索页面隐藏底部导航
          if (price || cat || keywords) {
            $(page).find('.app-bottombar-cover').remove();
            $(page).find('.hall').hide();
          }
          // 若不是搜索页面显示页头
          if (!price && !cat && !keywords) {
            seajs.use(['IncludeHeader'], function (IncludeHeader) {
              if (!data.header) data.header = {};
              data.header.id = id;
              data.header.icon = 3;
              data.header.hide = false;
              new IncludeHeader(page, '#include_header', data.header);
            });
            /*seajs.use(['IncludeDetailBottom'], function (IncludeDetailBottom) {
              new IncludeDetailBottom(page, '.bottombar-ul', {
                isLogin: App.isLogin(),
                facPhone: data.facPhone
              });
            });*/
            page.facPhone = data.facPhone;
          }
          // 返回按钮
          $(page).find('.go-back').click(function () {
            App.back();
          });
          // 列表显示样式选择
          $(page).find("#factory .search-list-title .icons-largest").click(function () {
            $(this).toggleClass("icons-larger");
            $("#factory .search-list-cont").toggleClass("larger-view");
          });
          // 进入产品详细页面事件绑定及收藏功能绑定
          bindDetail(page, id);
          bindCollect(page);
          // 筛选弹窗
          $(page).find('#factory .search-list-title .titlename').click(function () {
            var $target = $(this).get(0);
            App.addLoading();
            var $xiala = null;
            if (price && price !== 'all') {
              $xiala = $('.xiala', $(page));
            } else if (cat && cat !== 'all') {
              $xiala = $('.xiala-price', $(page));
            } else {
              $xiala = $('.xiala-cmp', $(page));
            }
            seajs.use(['dialog'], function (dialog) {
              window.search_dialog = dialog({
                id: 'search_dialog',
                skin: 'clickxiala',
                title: ' ',
                width: $(window).width() - 174,
                fixed: false,
                height: 300,
                content: $xiala.html(),
                onshow: function () {
                  var ctx = this;
                  App.removeLoading();

                  $('.fenlei01,.fenlei01 li').click(function () {
                    ctx.close().remove();
                    $(page).find('.search-list-title .name').text($(this).text());
                    var dataId = $(this).attr('data-id');
                    //TODO 搜索
                    App.addLoading();
                    seajs.use(['Est'], function (Est) {
                      i=0;
                      var _tempData = Est.cloneDeep(data);
                      if (price && price !== 'all') {
                        // 过滤分类
                        _tempData.list = Est.filter(_tempData.list, {cat_name: dataId});
                        if (dataId === 'all') _tempData = data;
                        $(page).find('.search-list-cont').empty();
                        $(page).find('.search-list-cont').append($(tpl(_tempData)).find('.search-list-cont').html());
                      } else if (cat && cat !== 'all') {
                        // 过滤价格
                        _tempData.list = Est.filter(_tempData.list, {price: dataId});
                        if (dataId === 'all') _tempData = data;
                        $(page).find('.search-list-cont').empty();
                        $(page).find('.search-list-cont').append($(tpl(_tempData)).find('.search-list-cont').html());
                      } else {
                        var filterObj = {};
                        if (dataId.indexOf('f') !== -1) {
                          filterObj = { cat_attr: dataId }
                        } else {
                          filterObj = { self_cat_id: dataId }
                        }
                        _tempData.list = Est.filter(_tempData.list, filterObj);
                        if (dataId === 'all') _tempData = data;
                        $(page).find('.search-list-cont').empty();
                        $(page).find('.search-list-cont').append($(tpl(_tempData)).find('.search-list-cont').html());
                      }
                      App.initLazyLoad(page);
                      App.removeLoading();
                      bindDetail(page, id);
                      bindCollect(page);
                    });
                  });
                  App.Scrollable($('.clickxiala .ui-dialog-content').get(0), false);
                }
              }).showModal($target);
            });
          });
          //样式切换
          var listCont = $(page).find('#factory .search-list-cont');
          $(page).find('.icons-list').click(function () {
            if (i === 3) i = 0;
            switch (i) {
              case 0:
                $(this).removeClass("icons-list").addClass("icons-larger");
                listCont.removeClass("list-view").addClass('larger-view');
                break;
              case 1:
                $(this).removeClass("icons-larger").addClass("icons-largest");
                listCont.removeClass("larger-view").addClass('largest-view');
                break;
              case 2:
                $(this).removeClass("icons-largest").addClass("icons-list");
                listCont.removeClass("largest-view").addClass('list-view');
                break;
            }
            i++;
          });
        }
      });
    }, 0);
  };

  module.exports = ProductList;
});