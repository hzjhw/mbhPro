/**
 * @description HandlebarsHelper模板引擎帮助类
 * @class HandlebarsHelper - 标签库
 * @author yongjin on 2014/11/11
 */

define('HandlebarsHelper', ['handlebars'], function (require, exports, module) {
  var Handlebars;

  Handlebars = require('handlebars');

  /**
   * 比较
   * @method [判断] - compare
   * @author wyj 2014-03-27
   * @example
   *      {{#compare ../page '!==' this}}danaiPageNum{{else}}active{{/compare}}
   */
  Handlebars.registerHelper('compare', function (v1, operator, v2, options) {
    if (arguments.length < 3)
      throw new Error("Handlerbars Helper 'compare' needs 2 parameters");
    try {
      switch (operator.toString()) {
        case '==':
          return (v1 == v2) ? options.fn(this) :
            options.inverse(this);
        case '!=':
          return (v1 != v2) ? options.fn(this) :
            options.inverse(this);
        case '===':
          return (v1 === v2) ? options.fn(this) :
            options.inverse(this);
        case '!==':
          return (v1 !== v2) ? options.fn(this) :
            options.inverse(this);
        case '<':
          return (v1 < v2) ? options.fn(this) :
            options.inverse(this);
        case '<=':
          return (v1 <= v2) ? options.fn(this) :
            options.inverse(this);
        case '>':
          return (v1 > v2) ? options.fn(this) :
            options.inverse(this);
        case '>=':
          return (v1 >= v2) ? options.fn(this) :
            options.inverse(this);
        case '&&':
          return (v1 && v2) ? options.fn(this) :
            options.inverse(this);
        case '||':
          return (v1 || v2) ? options.fn(this) :
            options.inverse(this);
        case 'indexOf':
          return (v1.indexOf(v2) > -1) ? options.fn(this) :
            options.inverse(this);
        default:
          return options.inverse(this);
      }
    } catch (e) {
      console.log('【Errow】: hbs.compare v1=' + v1 + ';v2=' + v2 + e);
    }
  });




  /**
   * 两数相加
   * @method [运算] - plus
   * @author wyj 2014-03-27
   * @example
   *      {{plus 1 2}} => 3
   */
  Handlebars.registerHelper('plus', function (num1, num2, opts) {
    return parseInt(num1, 10) + parseInt(num2, 10);
  });
  /**
   * 两数相减
   * @method [运算] - minus
   * @author wyj 2014-03-27
   * @example
   *        {{minus 10 5}} => 5
   */
  Handlebars.registerHelper('minus', function (num1, num2, opts) {
    return parseInt(num1, 10) - parseInt(num2, 10);
  });


  /**
   * 复杂条件
   * @method [判断] - xif
   * @author wyj 14.12.31
   * @example
   *       return Handlebars.helpers["x"].apply(this, [expression, options]) ? options.fn(this) : options.inverse(this);
   *
   */
  Handlebars.registerHelper("x", function (expression, options) {
    var fn = function () {
    }, result;
    try {
      fn = Function.apply(this,
        [ 'window', 'return ' + expression + ';' ]);
    } catch (e) {
      console.warn('[warning] {{x ' + expression + '}} is invalid javascript', e);
    }
    try {
      result = fn.bind(this)(window);
    } catch (e) {
      console.warn('[warning] {{x ' + expression + '}} runtime error', e);
    }
    return result;
  });

  /**
   * xif条件表达式
   * @method [判断] - xif
   * @author wyj 15.2.2
   * @example
   *    {{#xif "this.orderStatus != 'completed' && this.orderStatus != 'invalid' && this.paymentStatus == 'unpaid' &&
              this.shippingStatus == 'unshipped'"}}disabled{{/xif}}
   */
  Handlebars.registerHelper("xif", function (expression, options) {
    return Handlebars.helpers["x"].apply(this, [expression, options]) ? options.fn(this) : options.inverse(this);
  });

  /**
   * 所有状态
   * @method [状态] - status
   * @author wyj 15.1.7
   */
  Application.each(App.getAllStatus(), function (val, key) {
    Handlebars.registerHelper(key, function (str, options) {
      var result = '';
      if (options && options.length === 0) {
        return this[key];
      }
      Application.each(val, function (item) {
        if (item.value === str) {
          result = item.html.length === 0 ? item.text : item.html;
          return false;
        }
      });
      return result;
    });
  });

  /**
   * 返回整数
   * @method [数字] - parseInt
   * @author wxw 2014-12-16
   * @example
   *      {{parseInt 01}}
   */
  Handlebars.registerHelper('parseInt', function (result, options) {
    return parseInt(result, 10);
  });

  /**
   * 缩略ID值
   * @method id2
   * @author wyj
   */
  Handlebars.registerHelper('id2', function (id) {
    return id == null ? "" : id.replace(/^[^1-9]+/, "")
  });

  /**
   * 返回全局常量
   * @method [常量] - CONST
   * @author wyj 14.12.17
   * @example
   *        {{CONST 'HOST'}}
   */
  Handlebars.registerHelper('CONST', function (name, options) {
    return Application.getValue(CONST, name);
  });

  /**
   * 图片尺寸
   * @method [图片] - picUrl
   * @author wyj 2014-03-31
   * @example
   *      <img src="{{CONST 'PIC_URL'}}/{{picUrl picPath 6}}" width="52" height="52">
   */
  Handlebars.registerHelper('picUrl', function (src, number, opts) {
    var url = src;
    if (arguments.length < 3) return src || 'upload/no-pic.jpg';
    if (src == null || src.length == 0) return "";
    var url2 = url.substring(url.lastIndexOf(".") + 1, url.length);
    url = url.substring(0, url.lastIndexOf(".")) + "_" + number + "." + url2;
    return url ? url : '';
  });


  /**
   * 显示隐藏
   * @method show
   * @author wyj 15.2.1
   * @example
   *      <h3 {{{show "this.photos.display==='01'"}}}></h3>
   */
  Handlebars.registerHelper('show', function (expression, options) {
    return Handlebars.helpers["x"].apply(this, [expression, options]) ? " style='display:block;' " : " style='display:none;' ";
  });

  /**
   * 表单元素不可编辑
   * @method [表单] - disabled
   * @author wyj 15.2.1
   * @example
   *      <input type="text" {{disabled 'this.isDisabled'}} />
   */
  Handlebars.registerHelper('disabled', function (expression, options) {
    return Handlebars.helpers['x'].apply(this, [expression, options]) ? ' disabled=disabled ' : '';
  });


  /**
   * 判断checkbox是否选中
   * @method [表单] - checked
   * @author wyj 15.2.1
   * @example
   *        <input type="checked"  {{checked 'this.isChecked'}} />
   */
  Handlebars.registerHelper('checked', function (expression, options) {
    return Handlebars.helpers['x'].apply(this, [expression, options]) ? 'checked' : '';
  });

  /**
   * 编译url
   * @method [url] - encodeURLComponent
   * @author wyj 15.2.1
   * @example
   *      {{encodeURIComponent url}}
   */
  Handlebars.registerHelper('encodeURIComponent', function (val, options) {
    return encodeURIComponent(val);
  });

  /**
   * 解析JSON字符串
   * @method [JSON] - json
   * @example
   *      {{json 'invite.title'}}
   */
  Handlebars.registerHelper('json', function (path, options) {
    return Handlebars.helpers["getValue"].call(this, path);
  });
  /**
   * 打版本号
   * @method [版本] - version
   * @example
   *      http://www.jihui88.com?v={{version}}
   */
  Handlebars.registerHelper('version', function (options) {
    return new Date().getTime();
  });

  /**
   * 默认值
   * @method [字符] - $
   */
  Handlebars.registerHelper('$', function (value, safeValue) {
    var out = value || safeValue;
    return new Handlebars.SafeString(out);
  });

  module.exports = Handlebars;
});