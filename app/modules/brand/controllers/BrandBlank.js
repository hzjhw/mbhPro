/**
 * @description BrandBlank
 * @class BrandBlank
 * @author yongjin<zjut_wyj@163.com> 2015/2/8
 */
define('BrandBlank', ['App', 'template/brand_blank', 'HandlebarsHelper', 'Est'], function (require, exports, module) {
  var BrandBlank, App, template, HandlebarsHelper, Est;

  App = require('App');
  HandlebarsHelper = require('HandlebarsHelper');
  template = require('template/brand_blank');

  BrandBlank = function (page, id, context) {
    setTimeout(function () {
      debug('【Module】: Call BrandBlank');
      var tpl = HandlebarsHelper.compile(template);

      App.query('/cmp/blankarea/' + id, {
        cache: true,
        success: function (result) {
          console.log(result.facPhone);
          $(page).html(tpl(result));
          $(".blank_area", $(page)).hide();
          //App.trigger('initBrandCommon', page, context);
          seajs.use(['IncludeMessage', 'IncludeHeader'], function (IncludeMessage, IncludeHeader) {
            new IncludeMessage(page, '.message', {
              id: id
            });
            if (!result.header) result.header = {};
            result.header.id = id;
            result.header.icon = 5;
            result.header.hide = false;
            new IncludeHeader(page, '#include_header', result.header);
          });
          /*seajs.use(['IncludeDetailBottom'], function (IncludeDetailBottom) {
            new IncludeDetailBottom(page, '.bottombar-ul', {
              isLogin: App.isLogin(),
              facPhone: result.facPhone
            });
          });*/

          var blkContent = $(".blank_area_content", $(page));

          // 底部导航
         /* $(page).find('.bottombar-ul li').click(function () {
           App.load($(this).attr('data-target'));
           });*/
          page.facPhone = result.facPhone;
          $(page).find('.go-back').click(function () {
            App.back(App.getBackPage());
          });
          $(page).find('.province a').each(function () {

            $(this).click(function () {
              $("#curProv", $(page)).text($(this).text());
              $(this).addClass('current').siblings('a').removeClass('current');
              var curId = $(this).attr('data-id');
              App.query('/cmp/provAreas', {
                data: {upid: curId, factid: id},
                success: function (result) {
                  blkContent.empty();
                  Est = require('Est');
                  var filter = Est.filter(result.blkAreas, function (item) {
                    return item.up_area_id === '111111';
                  });

                  result.blkAreas = Est.bulidTreeNode(result.blkAreas, 'up_area_id', curId, {
                    categoryId: 'area_id',// 分类ＩＤ
                    belongId: 'up_area_id',// 父类ＩＤ
                    childTag: 'children', // 子分类集的字段名称
                    callback: function (item) {
                    }
                  });

                  var firstNode = "<p> <span class ='b ";
                  if (filter[0].is_city === '2') {
                    firstNode += "red'> ";
                  }
                  else {
                    firstNode += "'>";
                  }
                  //todo
                  var tpl2 = HandlebarsHelper.compile(firstNode + filter[0].area_name + '</span></p> {{#each list}}<p><span class="b {{#xif "this.is_city ==2"}}red{{/xif}}">{{area_name}}：</span>{{#each children}} <span class="{{#xif "this.is_city ==2"}}red{{/xif}}"> {{area_name}}</span>、{{/each}}</p>{{/each}}');

                  $(page).find('.blank_area_content').html(tpl2({
                    list: result.blkAreas
                  }));
                  $(".blank_area", $(page)).show();
                }
              });
            });
          });
        }
      });
    }, 0);
  };

  module.exports = BrandBlank;
});