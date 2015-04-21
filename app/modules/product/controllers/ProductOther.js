/**
 * @description ProductSearch
 * @class ProductSearch
 * @author yongjin<zjut_wyj@163.com> 2015/2/8
 */
define('ProductOther', ['App', 'template/product_other', 'HandlebarsHelper'], function (require, exports, module) {
  var ProductOther, App, template, HandlebarsHelper;

  App = require('App');
  HandlebarsHelper = require('HandlebarsHelper');
  template = require('template/product_other');

  ProductOther = function (page, rend, factid, curid) {
    debug('【Module】: Call ProductOther');
    setTimeout(function () {
      var tpl = HandlebarsHelper.compile(template);
      App.query('/cmp/others', {
        cache: true,
        data: {factid: factid, curid: curid, rcmPS: 5},
        success: function (result) {
          $(page).find(rend).html(tpl(result));
          $(page).find('td img').click(function () {
            App.addHash('#product_detail?pro_id=' + $(this).attr('pro-id') + '&fact_id=' + $(this).attr('fact-id'));
            App._Stack.pop(); // 清除最后一个
            App.load('product_detail', {
              fact_id: $(this).attr('fact-id'),
              pro_id: $(this).attr('pro-id')
            });
          });
          var speed = 10;
          var demo = document.getElementById('demo');
          var marquePic1 = document.getElementById('marquePic1');
          if (demo && marquePic1) {
            marquePic2.innerHTML = marquePic1.innerHTML;
            function Marquee() {
              if (demo.scrollLeft >= marquePic1.scrollWidth) {
                demo.scrollLeft = 0;
              } else {
                demo.scrollLeft++;
              }
            }

            var MyMar = setInterval(Marquee, speed);
            demo.onmouseover = function () {
              clearInterval(MyMar)
            };
            demo.onmouseout = function () {
              MyMar = setInterval(Marquee, speed)
            };
          }
        }
      });
    }, 0);

  };

  module.exports = ProductOther;
});