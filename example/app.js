!
  function(e, t) {
    function n(e) {
      return function(t) {
        return {}.toString.call(t) == "[object " + e + "]"

      }

    }

    function r() {
      return E++

    }

    function i(e) {
      return e.match(_)[0]

    }

    function o(e) {
      for (e = e.replace(C, "/"), e = e.replace(q, "$1/"); e.match(L);) e = e.replace(L, "/");
      return e

    }

    function a(e) {
      var t = e.length - 1,
        n = e.charAt(t);
      return "#" === n ? e.substring(0, t) : ".js" === e.substring(t - 2) || e.indexOf("?") > 0 || "/" === n ? e: e + ".js"

    }

    function s(e) {
      var t = w.alias;
      return t && b(t[e]) ? t[e] : e

    }

    function c(e) {
      var t,
        n = w.paths;
      return n && (t = e.match(j)) && b(n[t[1]]) && (e = n[t[1]] + t[2]),
        e

    }

    function u(e) {
      var t = w.vars;
      return t && e.indexOf("{") > -1 && (e = e.replace(B,
        function(e, n) {
          return b(t[n]) ? t[n] : e

        })),
        e

    }

    function f(e) {
      var t = w.map,
        n = e;
      if (t) for (var r = 0, i = t.length; i > r; r++) {
        var o = t[r];
        if (n = $(o) ? o(e) || e: e.replace(o[0], o[1]), n !== e) break

      }
      return n

    }

    function p(e, t) {
      var n,
        r = e.charAt(0);
      if (D.test(e)) n = e;
      else if ("." === r) n = o((t ? i(t) : w.cwd) + e);
      else if ("/" === r) {
        var a = w.cwd.match(H);
        n = a ? a[0] + e.substring(1) : e

      } else n = w.base + e;
      return 0 === n.indexOf("//") && (n = location.protocol + n),
        n

    }

    function l(e, t) {
      if (!e) return "";
      e = s(e),
        e = c(e),
        e = u(e),
        e = a(e);
      var n = p(e, t);
      return n = f(n)

    }

    function d(e) {
      return e.hasAttribute ? e.src: e.getAttribute("src", 4)

    }

    function h(e, t, n) {
      var r = O.createElement("script");
      if (n) {
        var i = $(n) ? n(e) : n;
        i && (r.charset = i)

      }
      g(r, t, e),
        r.async = !0,
        r.src = e,
        G = r,
        F ? z.insertBefore(r, F) : z.appendChild(r),
        G = null

    }

    function g(e, t, n) {
      function r() {
        e.onload = e.onerror = e.onreadystatechange = null,
          w.debug || z.removeChild(e),
          e = null,
          t()

      }

      var i = "onload" in e;
      i ? (e.onload = r, e.onerror = function() {
        T("error", {
          uri: n,
          node: e

        }),
          r()

      }) : e.onreadystatechange = function() {
        / loaded | complete / .test(e.readyState) && r()

      }

    }

    function v() {
      if (G) return G;
      if (X && "interactive" === X.readyState) return X;
      for (var e = z.getElementsByTagName("script"), t = e.length - 1; t >= 0; t--) {
        var n = e[t];
        if ("interactive" === n.readyState) return X = n

      }

    }

    function m(e) {
      var t = [];
      return e.replace(V, "").replace(M,
        function(e, n, r) {
          r && t.push(r)

        }),
        t

    }

    function y(e, t) {
      this.uri = e,
        this.dependencies = t || [],
        this.exports = null,
        this.status = 0,
        this._waitings = {},
        this._remain = 0

    }

    if (!e.seajs) {
      var A = e.seajs = {
          version: "2.3.0"

        },
        w = A.data = {},
        x = n("Object"),
        b = n("String"),
        S = Array.isArray || n("Array"),
        $ = n("Function"),
        E = 0,
        k = w.events = {};
      A.on = function(e, t) {
        var n = k[e] || (k[e] = []);
        return n.push(t),
          A

      },
        A.off = function(e, t) {
          if (!e && !t) return k = w.events = {},
            A;
          var n = k[e];
          if (n) if (t) for (var r = n.length - 1; r >= 0; r--) n[r] === t && n.splice(r, 1);
          else delete k[e];
          return A

        };
      var T = A.emit = function(e, t) {
          var n = k[e];
          if (n) {
            n = n.slice();
            for (var r = 0, i = n.length; i > r; r++) n[r](t)

          }
          return A

        },
        _ = /[^?#]*\//,
        O = document,
        P = location.href && 0 !== location.href.indexOf("about:") ? i(location.href) : "",
        U = O.scripts,
        N = O.getElementById("seajsnode") || U[U.length - 1],
        I = i(d(N) || P);
      A.resolve = l;
      var G,
        X,
        z = O.head || O.getElementsByTagName("head")[0] || O.documentElement,
        F = z.getElementsByTagName("base")[0];
      A.request = h;
      var R,
        M = /"(?:\\"|[^"])*"|'(?:\\'|[^'])*'|\/\*[\S\s]*?\*\/|\/(?:\\\/|[^\/\r\n])+\/(?=[^\/])|\/\/.*|\.\s*require|(?:^|[^$])\brequire\s*\(\s*(["'])(.+?)\1\s*\)/g,
        V = /\\\\/g,
        J = A.cache = {},
        K = {},
        Q = {},
        W = {},
        Y = y.STATUS = {
          FETCHING: 1,
          SAVED: 2,
          LOADING: 3,
          LOADED: 4,
          EXECUTING: 5,
          EXECUTED: 6
        };
      y.prototype.resolve = function() {
        for (var e = this, t = e.dependencies, n = [], r = 0, i = t.length; i > r; r++) n[r] = y.resolve(t[r], e.uri);
        return n

      },
        y.prototype.load = function() {
          var e = this;
          if (! (e.status >= Y.LOADING)) {
            e.status = Y.LOADING;
            var n = e.resolve();
            T("load", n);
            for (var r, i = e._remain = n.length, o = 0; i > o; o++) r = y.get(n[o]),
                r.status < Y.LOADED ? r._waitings[e.uri] = (r._waitings[e.uri] || 0) + 1: e._remain--;
            if (0 === e._remain) return e.onload(),
              t;
            var a = {};
            for (o = 0; i > o; o++) r = J[n[o]],
                r.status < Y.FETCHING ? r.fetch(a) : r.status === Y.SAVED && r.load();
            for (var s in a) a.hasOwnProperty(s) && a[s]()

          }

        },
        y.prototype.onload = function() {
          var e = this;
          e.status = Y.LOADED,
            e.callback && e.callback();
          var t,
            n,
            r = e._waitings;
          for (t in r) r.hasOwnProperty(t) && (n = J[t], n._remain -= r[t], 0 === n._remain && n.onload());
          delete e._waitings,
            delete e._remain

        },
        y.prototype.fetch = function(e) {
          function n() {
            A.request(a.requestUri, a.onRequest, a.charset)

          }

          function r() {
            delete K[s],
              Q[s] = !0,
              R && (y.save(o, R), R = null);
            var e,
              t = W[s];
            for (delete W[s]; e = t.shift();) e.load()

          }

          var i = this,
            o = i.uri;
          i.status = Y.FETCHING;
          var a = {
            uri: o
          };
          T("fetch", a);
          var s = a.requestUri || o;
          return ! s || Q[s] ? (i.load(), t) : K[s] ? (W[s].push(i), t) : (K[s] = !0, W[s] = [i], T("request", a = {
            uri: o,
            requestUri: s,
            onRequest: r,
            charset: w.charset
          }), a.requested || (e ? e[a.requestUri] = n: n()), t)

        },
        y.prototype.exec = function() {
          function e(t) {
            return y.get(e.resolve(t)).exec()

          }

          var n = this;
          if (n.status >= Y.EXECUTING) return n.exports;
          n.status = Y.EXECUTING;
          var i = n.uri;
          e.resolve = function(e) {
            return y.resolve(e, i)

          },
            e.async = function(t, n) {
              return y.use(t, n, i + "_async_" + r()),
                e

            };
          var o = n.factory,
            a = $(o) ? o(e, n.exports = {},
              n) : o;
          return a === t && (a = n.exports),
            delete n.factory,
            n.exports = a,
            n.status = Y.EXECUTED,
            T("exec", n),
            a

        },
        y.resolve = function(e, t) {
          var n = {
            id: e,
            refUri: t
          };
          return T("resolve", n),
            n.uri || A.resolve(n.id, t)

        },
        y.define = function(e, n, r) {
          var i = arguments.length;
          1 === i ? (r = e, e = t) : 2 === i && (r = n, S(e) ? (n = e, e = t) : n = t),
            !S(n) && $(r) && (n = m("" + r));
          var o = {
            id: e,
            uri: y.resolve(e),
            deps: n,
            factory: r
          };
          if (!o.uri && O.attachEvent) {
            var a = v();
            a && (o.uri = a.src)

          }
          T("define", o),
            o.uri ? y.save(o.uri, o) : R = o

        },
        y.save = function(e, t) {
          var n = y.get(e);
          n.status < Y.SAVED && (n.id = t.id || e, n.dependencies = t.deps || [], n.factory = t.factory, n.status = Y.SAVED, T("save", n))

        },
        y.get = function(e, t) {
          return J[e] || (J[e] = new y(e, t))

        },
        y.use = function(t, n, r) {
          var i = y.get(r, S(t) ? t: [t]);
          i.callback = function() {
            for (var t = [], r = i.resolve(), o = 0, a = r.length; a > o; o++) t[o] = J[r[o]].exec();
            n && n.apply(e, t),
              delete i.callback

          },
            i.load()

        },
        A.use = function(e, t) {
          return y.use(e, t, w.cwd + "_use_" + r()),
            A

        },
        y.define.cmd = {},
        e.define = y.define,
        A.Module = y,
        w.fetchedList = Q,
        w.cid = r,
        A.require = function(e) {
          var t = y.get(y.resolve(e));
          return t.status < Y.EXECUTING && (t.onload(), t.exec()),
            t.exports

        },
        w.base = I,
        w.dir = I,
        w.cwd = P,
        w.charset = "utf-8",
        A.config = function(e) {
          for (var t in e) {
            var n = e[t],
              r = w[t];
            if (r && x(r)) for (var i in n) r[i] = n[i];
            else S(r) ? n = r.concat(n) : "base" === t && ("/" !== n.slice( - 1) && (n += "/"), n = p(n)),
              w[t] = n

          }
          return T("config", e),
            A

        }

    }

  } (this),
  function() {
    function e(e) {
      s[e.name] = e

    }

    function t(e) {
      return e && s.hasOwnProperty(e)

    }

    function n(e) {
      for (var n in s) if (t(n)) {
        var r = "," + s[n].ext.join(",") + ",";
        if (r.indexOf("," + e + ",") > -1) return n

      }

    }

    function r(e, t) {
      var n = a.XMLHttpRequest ? new a.XMLHttpRequest: new a.ActiveXObject("Microsoft.XMLHTTP");
      return n.open("GET", e, !0),
        n.onreadystatechange = function() {
          if (4 === n.readyState) {
            if (n.status > 399 && n.status < 600) throw new Error("Could not load: " + e + ", status = " + n.status);
            t(n.responseText)

          }

        },
        n.send(null)

    }

    function i(e) {
      e && /\S/.test(e) && (a.execScript ||
        function(e) {
          (a.eval || eval).call(a, e)

        })(e)

    }

    function o(e) {
      return e.replace(/(["\\])/g, "\\$1").replace(/[\f]/g, "\\f").replace(/[\b]/g, "\\b").replace(/[\n]/g, "\\n").replace(/[\t]/g, "\\t").replace(/[\r]/g, "\\r").replace(/[\u2028]/g, "\\u2028").replace(/[\u2029]/g, "\\u2029")

    }

    var a = window,
      s = {},
      c = {};
    e({
      name: "text",
      ext: [".tpl", ".html"],
      exec: function(e, t) {
        i('define("' + e + '#", [], "' + o(t) + '")')

      }
    }),
      e({
        name: "json",
        ext: [".json"],
        exec: function(e, t) {
          i('define("' + e + '#", [], ' + t + ")")

        }
      }),
      e({
        name: "handlebars",
        ext: [".handlebars"],
        exec: function(e, t) {
          var n = ['define("' + e + '#", ["handlebars"], function(require, exports, module) {', '  var source = "' + o(t) + '"', '  var Handlebars = require("handlebars")["default"]', "  module.exports = function(data, options) {", "    options || (options = {})", "    options.helpers || (options.helpers = {})", "    for (var key in Handlebars.helpers) {", "      options.helpers[key] = options.helpers[key] || Handlebars.helpers[key]", "    }", "    return Handlebars.compile(source)(data, options)", "  }", "})"].join("\n");
          i(n)

        }
      }),
      seajs.on("resolve",
        function(e) {
          var r = e.id;
          if (!r) return "";
          var i,
            o;
          (o = r.match(/^(\w+)!(.+)$/)) && t(o[1]) ? (i = o[1], r = o[2]) : (o = r.match(/[^?]+(\.\w+)(?:\?|#|$)/)) && (i = n(o[1])),
            i && -1 === r.indexOf("#") && (r += "#");
          var a = seajs.resolve(r, e.refUri);
          i && (c[a] = i),
            e.uri = a

        }),
      seajs.on("request",
        function(e) {
          var t = c[e.uri];
          t && (r(e.requestUri,
            function(n) {
              s[t].exec(e.uri, n),
                e.onRequest()

            }), e.requested = !0)

        }),
      define("seajs/seajs-text/1.1.1/seajs-text-debug", [], {})

  } ();
var Application = function(e) {
  this.options = e,
    this.initialize.apply(this, arguments)

};
Application.prototype = {
  initialize: function() {
    this.modules = {},
      this.status = {},
      this.templates = {},
      this.cache = {},
      this.topics = {},
      this.subUid = -1

  },
  addModule: function(e, t) {
    e in this.modules && console.log("已存在的模块：" + e),
      this.modules[e] = t

  },
  getModules: function() {
    return this.modules

  },
  addStatus: function(e, t) {
    this.status[e] = t

  },
  getStatus: function(e) {
    return this.status[e]

  },
  getAllStatus: function() {
    return this.status

  },
  addTemplate: function(e, t) {
    e in this.templates && console.log("已存在的模板：" + e),
      this.templates[e] = t

  },
  getTemplates: function() {
    return this.templates

  },
  render: function(e) {
    e = Application.extend({
        empty: !1
      },
      e);
    var t = $(e.render, $(e.page || "body")),
      n = e.handlebars.compile(e.template || t.html());
    e.empty && t.empty();
    var r = $(n(e.data));
    e.callback && e.callback.call(null, r),
      t.append(r)

  },
  addHash: function(e) {
    localStorage._currentHash = e,
      window.location.hash = e

  },
  getCurrentHash: function() {
    return localStorage._currentHash

  },
  setBackPage: function(e) {
    localStorage.backPage = e

  },
  getBackPage: function() {
    var e = localStorage.backPage,
      t = e;
    return "false" === e && (t = App._Stack.getBefore() ? App._Stack.getBefore()[0] : "home"),
      localStorage.backPage = !1,
      t

  },
  hasBackPage: function() {
    return localStorage.backPage

  },
  addLoading: function() {
    return window.$loading && window.$loading.remove(),
      window.$loading = $('<div class="loading"></div>'),
      $("body").append(window.$loading),
      window.$loading

  },
  getLoading: function() {
    return $("")

  },
  removeLoading: function() {
    window.$loading ? window.$loading.remove() : $(".loading").remove()

  },
  trigger: function(e, t) {
    var n = this;
    return this.topics[e] ? (setTimeout(function() {
        for (var r = n.topics[e], i = r ? r.length: 0; i--;) r[i].func(e, t)

      },
      0), !0) : !1

  },
  on: function(e, t) {
    this.topics[e] || (this.topics[e] = []);
    var n = (++this.subUid).toString();
    return this.topics[e].push({
      token: n,
      func: t
    }),
      n

  },
  off: function(e) {
    for (var t in this.topics) if (this.topics[t]) for (var n = 0, r = this.topics[t].length; r > n; n++) if (this.topics[t][n].token === e) return this.topics[t].splice(n, 1),
      e;
    return ! 1

  },
  initLoad: function(e, t, n) {
    e && (App.addLoading(), t.page && App.addHash("#/" + t.page), $(e).on("appForward",
      function() {
        setTimeout(function() {
            App.removeLoading()

          },
          500),
          t.appForward && t.appForward.call(n, e)

      }), $(e).on("appLayout",
      function() {
        t.appLayout && t.appLayout.call(n, e)

      }), $(e).on("appShow",
      function() {
        console.log("【Stack】Stack size: " + App._Stack.size()),
          t.appShow && t.appShow.call(n, e)

      }), $(e).on("appReady",
      function() {
        App.removeLoading(),
          App.initPage(e),
          App.off("queryEvent"),
          App.on("queryEvent",
            function() {
              App.initPage(e)

            }),
          t.appReady && t.appReady.call(n, e)

      }), $(e).on("appBeforeBack",
      function() {
        t.appBeforeBack && t.appBeforeBack.call(n, e)

      }), $(e).on("appBack",
      function() {
        t.appBack && t.appBack.call(n, e)

      }), $(e).on("appHide",
      function() {
        App.removeLoading(),
          t.appHide && t.appHide.call(n, e)

      }), $(e).on("appDestroy",
      function() {
        App.removeLoading(),
          t.appDestroy && t.appDestroy.call(n, e)

      }), t && t.transition && n && (n.transition = t.transition))

  },
  initContent: function(e, t) {
    $(e).find(".app-content").height($(window).height() - (t || 0)),
      $(e).on("appShow",
        function() {
          $(e).find(".app-content").height($(window).height() - (t || 0))

        })

  },
  initLazyLoad: function(e) {
    seajs.use(["LazyLoad"],
      function() {
        var t = $(".app-content", $(e));
        $(".lazy", $(t)).lazyload({
          container: t,
          effect: "fadeIn"
        })

      })

  },
  initPage: function(e) {
    setTimeout(function() {
        App._Pages.fixContent(e)

      },
      0),
      setTimeout(function() {
          App._Pages.fixContent(e)

        },
        50),
      setTimeout(function() {
          App._Pages.fixContent(e)

        },
        100),
      setTimeout(function() {
          App._Pages.fixContent(e)

        },
        300),
      setTimeout(function() {
          App._Scroll.setup(e)

        },
        0),
      setTimeout(function() {
          App._Scroll.setup(e)

        },
        100),
      setTimeout(function() {
          App._Scroll.setup(e)

        },
        1e3),
      setTimeout(function() {
          App._Scroll.setup(e)

        },
        3e3),
      setTimeout(function() {
          App.initClick(e)

        },
        300),
      setTimeout(function() {
          var t = $(e).find(".app-content");
          if (t.height() > $(window).height()) {
            var n = $(e).find(".app-topbar");
            App.initContent(e, n.size() > 0 ? n.eq(0).height() : 0)

          }

        },
        5e3)

  },
  addCache: function(e, t) {
    this.cache[e] = t

  },
  getCache: function(e) {
    return this.cache[e]

  }
},
  Application.version = "00111114",
  Application.each = function(e, t) {
    var n,
      r;
    if (null == e) return e;
    if (e.length === +e.length) for (n = 0, r = e.length; r > n && t(e[n], n, e) !== !1; n++);
    else {
      var i = Object.keys(e);
      for (n = 0, r = i.length; r > n && t(e[i[n]], i[n], e, n) !== !1; n++);

    }
    return e

  },
  Application.extend = function(e) {
    return "undefined" == typeof e ? e: (Array.prototype.slice.call(arguments, 1).forEach(function(t) {
      for (var n in t) e[n] = t[n]

    }), e)

  },
  Application.getValue = function(e, t) {
    function n(e, t) {
      return Application.each(t,
        function(r) {
          return r in e ? 1 !== t.length ? (t.shift(), n(e[r], t), !1) : void(i = e[r]) : !1

        }),
        i

    }

    var r,
      i;
    return arguments.length < 2 || "string" != typeof t ? void console.error("参数不能少于2个， 且path为字符串") : (r = t.split("."), n(e, r))

  },
  Application.url = window.location.href,
  Application.fromCharCode = function(e) {
    try {
      return String.fromCharCode(e)

    } catch(t) {
    }

  },
  function() {
    var e,
      t;
    !
      function(n, r) {
        function i(e) {
          return function(t) {
            return {}.toString.call(t) == "[object " + e + "]"

          }

        }

        function o() {
        }

        var a = i("Function"),
          s = {};
        o.prototype.exec = function() {
          function e(e) {
            return o.get(e).exec()

          }

          var t = this;
          if (this.execed) return t.exports;
          this.execed = !0;
          var n = t.factory,
            i = a(n) ? n(e, t.exports = {},
              t) : n;
          return i === r && (i = t.exports),
            delete t.factory,
            t.exports = i,
            i

        },
          e = function(e, t, n) {
            var r = {
              id: e,
              deps: t,
              factory: n
            };
            o.save(r)

          },
          o.save = function(e) {
            var t = o.get(e.id);
            t.id = e.id,
              t.dependencies = e.deps,
              t.factory = e.factory

          },
          o.get = function(e) {
            return s[e] || (s[e] = new o)

          },
          t = function(e) {
            var t = o.get(e);
            return t.execed || t.exec(),
              t.exports

          }

      } (this)

  } ();
var CONST = {
  HOST: "http://m.331.11door.com",
  API: "http://m.331.11door.com",
  DOMAIN: "http://m.331.11door.com",
  PIC_URL: "http://331.11door.com",
  SEP: "/",
  PIC_NONE: "upload/u/u4/user02/picture/2014/12/20/11efc2a1-27b1-4ba3-be8e-8f91dc1f256c.jpg",
  DELIVERY_URL: "http://api.ickd.cn/?id=108377&secret=1d323e291b7778da812664d0386f7b11&type=json&ord=desc&encode=utf8&ver=2",
  ENTER_KEY: 13,
  COLLAPSE_SPEED: 50,
  ENTER_KEY: 13,
  SUBMIT_TIP: '提交中...<span style="color:orange;font-size: 12px;">[提交后无反馈信息?请检查每个标签页中是否有红色错误提示]</span>'
};
window.CONST = CONST,
  "undefined" == typeof App && (App = new Application(CONST), window.App = App),
  App.addStatus("useStatus", [
    {
      text: "待审核",
      value: "03",
      html: '<span class="h">等待厂家审核</span>'
    },
    {
      text: "未通过",
      value: "02",
      html: '<span class="h">审核未通过</span>'
    },
    {
      text: "已通过",
      value: "01",
      html: '<span class="l">已审核通过</span>'
    }
  ]),
  App.addStatus("resultStatus", [
    {
      text: "待审核",
      value: "03",
      html: "<span>厂家未审核</span>"
    },
    {
      text: "未通过",
      value: "02",
      html: "<span>审核未通过</span>"
    },
    {
      text: "已通过",
      value: "01",
      html: '<span class="yes">厂家审核通过</span>'
    }
  ]),
  CONST.LIB_FORDER = "lib",
  CONST.DEBUG_SEAJS = !0,
  CONST.DEBUG_CONSOLE = !0,
  CONST.APP_VERSION = "201503650",
  App.addModule("BrandList", "modules/brand/controllers/BrandList.js"),
  App.addModule("BrandDetail", "modules/brand/controllers/BrandDetail.js"),
  App.addModule("BrandInfo", "modules/brand/controllers/BrandInfo.js"),
  App.addModule("BrandProduct", "modules/brand/controllers/BrandProduct.js"),
  App.addModule("BrandTec", "modules/brand/controllers/BrandTec.js"),
  App.addModule("BrandBlank", "modules/brand/controllers/BrandBlank.js"),
  App.addModule("IncludeMessage", "modules/brand/controllers/IncludeMessage.js"),
  App.addModule("IncludeHeader", "modules/brand/controllers/IncludeHeader.js"),
  App.addModule("IncludeListBottom", "modules/brand/controllers/IncludeListBottom.js"),
  App.addModule("BrandUnique", "modules/brand/controllers/BrandUnique.js"),
  App.addTemplate("template/brand_detail",
    function(require, exports, module) {
      module.exports = require("modules/brand/views/brand_detail.html")

    }),
  App.addTemplate("template/brand_list",
    function(require, exports, module) {
      module.exports = require("modules/brand/views/brand_list.html")

    }),
  App.addTemplate("template/brand_info",
    function(require, exports, module) {
      module.exports = require("modules/brand/views/brand_info.html")

    }),
  App.addTemplate("template/brand_product",
    function(require, exports, module) {
      module.exports = require("modules/brand/views/brand_product.html")

    }),
  App.addTemplate("template/brand_tec",
    function(require, exports, module) {
      module.exports = require("modules/brand/views/brand_tec.html")

    }),
  App.addTemplate("template/brand_blank",
    function(require, exports, module) {
      module.exports = require("modules/brand/views/brand_blank.html")

    }),
  App.addTemplate("template/include_message",
    function(require, exports, module) {
      module.exports = require("modules/brand/views/include_message.html")

    }),
  App.addTemplate("template/include_header",
    function(require, exports, module) {
      module.exports = require("modules/brand/views/include_header.html")

    }),
  App.addModule("BrandUnique", "modules/brand/controllers/BrandUnique.js"),
  App.addTemplate("template/include_message",
    function(require, exports, module) {
      module.exports = require("modules/brand/views/include_message.html")

    }),
  App.addTemplate("template/brand_unique",
    function(require, exports, module) {
      module.exports = require("modules/brand/views/brand_unique.html")

    }),
  App.addTemplate("template/include_list_bottom",
    function(require, exports, module) {
      module.exports = require("modules/brand/views/include_list_bottom.html")

    }),
  App.addTemplate("template/includeBtm",
    function(require, exports, module) {
      module.exports = require("modules/favorite/views/include_bottom.html")

    }),
  App.addTemplate("template/favBrand",
    function(require, exports, module) {
      module.exports = require("modules/favorite/views/favorite_brand.html")

    }),
  App.addTemplate("template/favPro",
    function(require, exports, module) {
      module.exports = require("modules/favorite/views/favorite_product.html")

    }),
  App.addTemplate("template/favInfo",
    function(require, exports, module) {
      module.exports = require("modules/favorite/views/favorite_info.html")

    }),
  App.addTemplate("template/favCooprate",
    function(require, exports, module) {
      module.exports = require("modules/favorite/views/favorite_cooprate.html")

    }),
  App.addTemplate("template/favMoney",
    function(require, exports, module) {
      module.exports = require("modules/favorite/views/favorite_money.html")

    }),
  App.addTemplate("template/favMessage",
    function(require, exports, module) {
      module.exports = require("modules/favorite/views/favorite_message.html")

    }),
  App.addTemplate("template/incl",
    function(require, exports, module) {
      module.exports = require("modules/favorite/views/favorite_message.html")

    }),
  App.addModule("IncludeBtm", "modules/favorite/controllers/IncludeBtm.js"),
  App.addModule("FavBrand", "modules/favorite/controllers/FavBrand.js"),
  App.addModule("FavPro", "modules/favorite/controllers/FavPro.js"),
  App.addModule("FavInfo", "modules/favorite/controllers/FavInfo.js"),
  App.addModule("FavMessage", "modules/favorite/controllers/FavMessage.js"),
  App.addModule("FavMoney", "modules/favorite/controllers/FavMoney.js"),
  App.addModule("FavCooprate", "modules/favorite/controllers/FavCooprate.js"),
  App.addModule("Login", "modules/login/controllers/Login.js"),
  App.addTemplate("template/login",
    function(require, exports, module) {
      module.exports = require("modules/login/views/login.html")

    }),
  App.addTemplate("template/dealers",
    function(require, exports, module) {
      module.exports = require("modules/login/views/dealers.html")

    }),
  App.addModule("Dealers", "modules/login/controllers/Dealers.js"),
  App.addModule("ProductList", "modules/product/controllers/ProductList.js"),
  App.addTemplate("template/product_list",
    function(require, exports, module) {
      module.exports = require("modules/product/views/product_list.html")

    }),
  App.addModule("ProductDetail", "modules/product/controllers/ProductDetail.js"),
  App.addTemplate("template/product_detail",
    function(require, exports, module) {
      module.exports = require("modules/product/views/product_detail.html")

    }),
  App.addModule("ProductSearch", "modules/product/controllers/ProductSearch.js"),
  App.addTemplate("template/product_search",
    function(require, exports, module) {
      module.exports = require("modules/product/views/product_search.html")

    }),
  App.addModule("Register", "modules/register/controllers/Register.js"),
  App.addTemplate("template/register",
    function(require, exports, module) {
      module.exports = require("modules/register/views/register.html")

    }),
  App.addModule("CategoryCtrl", "modules/category/controllers/CategoryCtrl.js"),
  App.addTemplate("template/category",
    function(require, exports, module) {
      module.exports = require("modules/category/views/category.html")

    }),
  App.addModule("SearchIndex", "modules/search/controllers/SearchIndex.js"),
  App.addTemplate("template/search_index",
    function(require, exports, module) {
      module.exports = require("modules/search/views/search_index.html")

    }),
  App.addModule("HomeBrand", "modules/home/controllers/HomeBrand.js"),
  App.addTemplate("template/home_brand",
    function(require, exports, module) {
      module.exports = require("modules/home/views/home_brand.html")

    }),
  seajs.config({
    base: CONST.HOST,
    alias: Application.extend({
        Zepto: "vendor/zepto/zepto.min.js",
        App: "lib/app.js",
        jquery: "vendor/jquery/jquery-1.10.2.js",
        handlebars: "vendor/handlebars/handlebars-min.js",
        HandlebarsHelper: "scripts/helper/HandlebarsHelper.js",
        Est: "vendor/Est/Est.min.js",
        dialog: "vendor/artDialog_v6/dialog.js",
        "dialog-plus": "vendor/artDialog_v6/dialog-plus.js",
        LazyLoad: "vendor/lazyload/lazyload.js"
      },
      App.getModules()),
    paths: {},
    vars: {
      locale: "zh-cn"
    },
    map: [
      [/lib\/(.*).js/, CONST.LIB_FORDER + "/$1.js"],
      [/^(.*\.(?:css|js|html))(.*)$/i, "$1?" + CONST.APP_VERSION]
    ],
    debug: "undefined" == typeof CONST.DEBUG_SEAJS ? !1: CONST.DEBUG_SEAJS,
    charset: "utf-8"
  }),
  Application.each(App.getTemplates(),
    function(value, key) {
      define(key, value)

    }),
  window.debug = function(str, options) {
    var opts,
      msg;
    if (CONST.DEBUG_CONSOLE) try {
      opts = Application.extend({
          type: "console"
        },
        options),
        msg = "function" == typeof str ? str() : str,
        msg && msg.length > 0 && ("error" === opts.type ? console.error(msg) : "alert" === opts.type ? alert(msg) : console.log(msg))

    } catch(e) {
    }

  },
  App.LOGIN_CHANGE = !1,
  App.CELL_PHONE = "cell_phone",
  App.scroll = function(a, o) {
    debug("【Util】App.scroll:" + a);
    var t = parseInt(document.body.scrollTop),
      e = 0,
      n = 5;
    a = parseInt(a),
      o /= n;
    var i = setInterval(function() {
        e++,
          document.body.scrollTop = (a - t) / o * e + t,
          e >= o && clearInterval(i)

      },
      n)

  },
  App.showMsg = function(a, o) {
    seajs.use(["dialog"],
      function(t) {
        window.dialog = t({
          title: a,
          content: o,
          width: $(window).width() - 280,
          button: [
            {
              value: "确定"
            }
          ]
        }).showModal()

      })

  },
  App.showConfirm = function(a, o, t, e) {
    seajs.use(["dialog"],
      function(n) {
        window.dialog = n({
          title: a,
          content: o,
          width: $(window).width() - 280,
          button: [
            {
              value: "确定",
              callback: e,
              autofocus: !0
            },
            {
              value: "取消"
            }
          ]
        }).showModal(t)

      })

  },
  App.show330 = function(a, o) {
    seajs.use(["dialog"],
      function(t) {
        window.dialog && window.dialog.close().remove(),
          window.dialog = t({
            id: "330dialog",
            title: "我的330",
            align: "bottom right",
            width: $(window).width() - 280,
            fixed: !1,
            content: $(".container-my", $(a)).html(),
            onshow: function() {
              var a = this;
              setTimeout(function() {
                  $(".ul-my li").click(function(o) {
                    return o.preventDefault(),
                      a.close(),
                      App.load($(this).attr("data-target")),
                      !1

                  })

                },
                100)

            }
          }),
          o && o.call(this, window.dialog)

      })

  },
  App.initTopScroll = function(a) {
    debug("【Util】App.initTopScroll:");
    var o = $(".app-content", $(a)),
      t = $("#app-index-logo", $(a)),
      e = ($(".app-search", $(a)), !1);
    $(".app-content", $(a)).get(0) && $(".app-content", $(a)).get(0).addEventListener("scroll",
      function() {
        var a = o.scrollTop();
        a > 0 && !e ? (e = !0, t.addClass("index-logo-hide")) : 0 === a && e && (e = !1, t.removeClass("index-logo-hide"))

      })

  },
  seajs.use(["App"],
    function(a) {
      var o = $("#Loading");
      a.Loading = o.clone(),
        o.remove(),
        a.controller("home",
          function(o) {
            debug("【Controller】pageLoad: home"),
              a._Stack.destroy(),
              a.initLoad(o, {
                  transition: "fade",
                  page: "home",
                  appShow: function(o) {
                    a.removeLoading(),
                      a.initTopScroll(o),
                      a._Stack.destroy(),
                      a._CustomStack.length = 0;
                    var t = localStorage[a.CELL_PHONE];
                    $(o).find(".app-top-login").html("" !== t ? "<div class='sj'>手机号:" + t + "</div><div class='app-btn btn-out' style='float:right;margin-right:30px;color:#fff;'>退出</div> ": ' <div class="app-button btn-register"  style="-webkit-tap-highlight-color: rgba(255, 255, 255, 0);">注册</div><div class="app-button btn-login" style="-webkit-tap-highlight-color: rgba(255, 255, 255, 0);">登录</div>'),
                      $(o).find(".btn-register").off().on("click",
                        function() {
                          a.load("register_dealers")

                        }),
                      $(o).find(".btn-login").off().on("click",
                        function() {
                          a.load("login_dealers")

                        }),
                      $(o).find(".btn-out").off().on("click",
                        function() {
                          a.query("/loginout", {
                            success: function(o) {
                              "success" == o.msg && (localStorage[a.CELL_PHONE] = "", a.LOGIN_CHANGE = !1, a.back("home"))

                            }
                          })

                        })

                  }
                },
                this);
            try {
              $(o).find('[data-target="inputs"]').attr("data-target", null).stickyClick(function(o) {
                a.pick("inputs",
                  function(a) {
                    console.log(JSON.stringify(a)),
                      o()

                  })

              })

            } catch(t) {
            }
            $(o).find(".btn-my").click(function(t) {
              t.preventDefault(),
                setTimeout(function() {
                    window.myDialog || (a.show330(o), window.myDialog = !0)

                  },
                  0);
              var e = $(this).find(".span-my").get(0);
              return a.query("/userinfo", {
                success: function(t) {
                  if ("nologin" == t.msg) {
                    var n = '<span style="font-size: 20px"> 对不起,您还未登录!现在就登录吗?</span>';
                    a.showConfirm("未登录", n, e,
                      function() {
                        a.load("login_dealers")

                      })

                  } else a.show330(o,
                    function(a) {
                      a.showModal(e)

                    })

                }
              }),
                !1

            }),
              $(o).find(".cate-ul li").click(function() {
                return a.addLoading(),
                    0 === $(this).attr("data-id").length ? void a.load("brand_unique") : void a.load("brand_list", {
                  id: $(this).attr("data-id"),
                  title: $(this).attr("data-title"),
                  banner: $(this).attr("data-banner")
                })

              }),
              seajs.use(["HomeBrand"],
                function(t) {
                  console.log("HomeBrand"),
                    a.HomeBrand = new t(o)

                })

          }),
        a.controller("brand_list",
          function(o) {
            debug("【Controller】pageLoad: brand_list");
            var t = this;
            a.initLoad(o, {
                transition: "slide-left",
                page: "brand_list",
                appShow: function(o) {
                  seajs.use(["IncludeListBottom"],
                    function(t) {
                      new t(o, ".buttombar-ul", {
                        isLogin: a.LOGIN_CHANGE
                      })

                    })

                }
              },
              this),
              console.log("brandlist:" + a.LOGIN_CHANGE),
              t.args.id || (t.args.id = localStorage.brand_list_args_id),
              t.args.title || (t.args.title = localStorage.brand_list_args_title),
              t.args.banner || (t.args.banner = localStorage.brand_list_args_banner),
              localStorage.brand_list_args_id = t.args.id,
              localStorage.brand_list_args_title = t.args.title,
              localStorage.brand_list_args_banner = t.args.banner,
              seajs.use(["BrandList"],
                function(e) {
                  a.BrandList = new e(o, t.args.id, t.args.title, t.args.banner, t.args.area)

                })

          }),
        a.controller("brand_detail",
          function(o) {
            debug("【Controller】pageLoad: brand_detail");
            var t = this;
            t.args.id || (t.args.id = localStorage.brand_detail_args_id),
              localStorage.brand_detail_args_id = t.args.id,
              a.initLoad(o, {
                  transition: "fade",
                  page: "brand_detail",
                  appReady: function(a) {
                    seajs.use("IncludeMessage",
                      function(o) {
                        new o(a, ".message", {
                          id: t.args.id
                        })

                      })

                  }
                },
                t),
              seajs.use(["BrandDetail"],
                function(e) {
                  a.BrandDetail = new e(o, t.args.id, t)

                })

          }),
        a.controller("brand_info",
          function(o) {
            debug("【Controller】pageLoad: brand_info");
            var t = this;
            a._Stack.pop(),
              t.args.id || (t.args.id = localStorage.brand_info_args_id),
              localStorage.brand_info_args_id = t.args.id,
              a.initLoad(o, {
                  transition: "fade",
                  page: "brand_info",
                  appReady: function(a) {
                    seajs.use("IncludeMessage",
                      function(o) {
                        new o(a, ".message", {
                          id: t.args.id
                        })

                      })

                  }
                },
                t),
              seajs.use(["BrandInfo"],
                function(e) {
                  a.BrandInfo = new e(o, t.args.id, t)

                })

          }),
        a.controller("brand_product",
          function(o) {
            debug("【Controller】pageLoad: brand_info");
            var t = this;
            a._Stack.pop(),
              a.initLoad(o, {
                  transition: "fade",
                  page: "brand_product"
                },
                t),
              t.args.id || (t.args.id = localStorage.brand_product_args_id),
              localStorage.brand_product_args_id = t.args.id,
              seajs.use(["BrandProduct"],
                function(e) {
                  a.BrandProduct = new e(o, t.args.id, t)

                })

          }),
        a.controller("brand_tec",
          function(o) {
            debug("【Controller】pageLoad: brand_tec");
            var t = this;
            a._Stack.pop(),
              t.args.id || (t.args.id = localStorage.brand_tec_args_id),
              localStorage.brand_tec_args_id = t.args.id,
              a.initLoad(o, {
                  transition: "fade",
                  page: "brand_tec",
                  appReady: function(a) {
                    seajs.use("IncludeMessage",
                      function(o) {
                        new o(a, ".message", {
                          id: t.args.id
                        })

                      })

                  }
                },
                t),
              seajs.use(["BrandTec"],
                function(e) {
                  a.BrandTec = new e(o, t.args.id, t)

                })

          }),
        a.controller("brand_blank",
          function(o) {
            debug("【Controller】pageLoad: brand_blank");
            var t = this;
            a._Stack.pop(),
              t.args.id || (t.args.id = localStorage.brand_blank_args_id),
              localStorage.brand_blank_args_id = t.args.id,
              a.initLoad(o, {
                  transition: "fade",
                  page: "brand_blank",
                  appReady: function(a) {
                    seajs.use("IncludeMessage",
                      function(o) {
                        new o(a, ".message", {
                          id: t.args.id
                        })

                      })

                  }
                },
                t),
              seajs.use(["BrandBlank"],
                function(e) {
                  a.BrandBlank = new e(o, t.args.id, t)

                })

          }),
        a.controller("brand_unique",
          function(o) {
            debug("【Controller】pageLoad: brand_unique");
            var t = this;
            a.initLoad(o, {
                transition: "fade",
                page: "brand_unique"
              },
              t),
              seajs.use(["BrandUnique"],
                function(e) {
                  a.BrandUnique = new e(o, t)

                })

          }),
        a.controller("category",
          function(o) {
            debug("【Controller】pageLoad: category"),
              a.initLoad(o, {
                  transition: "slideon-down",
                  page: "category"
                },
                this),
              seajs.use(["CategoryCtrl"],
                function(t) {
                  a.CategoryCtrl = new t(o, this)

                })

          }),
        a.controller("favorite_product",
          function(o) {
            debug("【Controller】pageLoad: favorite_product"),
              a.initLoad(o, {
                  transition: "slide-left",
                  page: "favorite_product"
                },
                this),
              seajs.use(["FavPro"],
                function(t) {
                  a.FavPro = new t(o)

                })

          }),
        a.controller("favorite_brand",
          function(o) {
            debug("【Controller】pageLoad: favorite_brand"),
              a.initLoad(o, {
                  transition: "slide-left",
                  page: "favorite_brand"
                },
                this),
              seajs.use(["FavBrand"],
                function(t) {
                  a.FavBrand = new t(o)

                })

          }),
        a.controller("favorite_money",
          function(o) {
            debug("【Controller】pageLoad: favorite_money"),
              a.initLoad(o, {
                  transition: "slide-left",
                  page: "favorite_money"
                },
                this),
              seajs.use(["FavMoney"],
                function(t) {
                  a.FavMoney = new t(o)

                })

          }),
        a.controller("favorite_cooprate",
          function(o) {
            debug("【Controller】pageLoad: favorite_cooprate"),
              a.initLoad(o, {
                  transition: "slide-left",
                  page: "favorite_cooprate"
                },
                this),
              seajs.use(["FavCooprate"],
                function(t) {
                  a.FavCooprate = new t(o)

                })

          }),
        a.controller("favorite_message",
          function(o) {
            debug("【Controller】pageLoad: favorite_message"),
              a.initLoad(o, {
                  transition: "slide-left",
                  page: "favorite_message"
                },
                this),
              seajs.use(["FavMessage"],
                function(t) {
                  a.FavMessage = new t(o)

                })

          }),
        a.controller("login_dealers",
          function(o) {
            debug("【Controller】pageLoad: login_dealers");
            var t = this;
            a.initLoad(o, {
                transition: "slide-left",
                page: "login_dealers"
              },
              t),
              seajs.use(["Login"],
                function(e) {
                  a.Login = new e(o, t)

                })

          }),
        a.controller("favorite_info",
          function(o) {
            debug("【Controller】pageLoad: favorite_info"),
              a.initLoad(o, {
                  transition: "slide-left",
                  page: "favorite_info"
                },
                this),
              seajs.use(["FavInfo"],
                function(t) {
                  a.FavInfo = new t(o)

                })

          }),
        a.controller("product_list",
          function(o) {
            debug("【Controller】pageLoad: product_list");
            var t = this;
            t.args.id || (t.args.id = localStorage.product_list_args_id),
              localStorage.product_list_args_id = t.args.id,
              (t.args.price || t.args.cat) && (localStorage.product_list_args_id = null),
              a.initLoad(o, {
                  transition: "fade",
                  page: "product_list",
                  appReady: function(a) {
                    "undefined" == typeof t.args.price && seajs.use("IncludeMessage",
                      function(o) {
                        new o(a, ".message", {
                          id: t.args.id
                        })

                      })

                  }
                },
                t),
              seajs.use(["ProductList"],
                function(e) {
                  a.ProductList = new e(o, t.args.id, t.args.price, t.args.cat, t.args.keywords, t)

                })

          }),
        a.controller("product_detail",
          function(o) {
            debug("【Controller】pageLoad: product_detail");
            var t = this;
            a.initLoad(o, {
                transition: "fade",
                page: "product_detail"
              },
              t),
              t.args.id || (t.args.id = localStorage.product_detail_args_id),
              t.args.id || (t.args.proid = localStorage.product_detail_args_proid),
              localStorage.product_detail_args_id = t.args.id,
              localStorage.product_detail_args_proid = t.args.proid,
              seajs.use(["ProductDetail"],
                function(e) {
                  a.ProductDetail = new e(o, t.args.id, t.args.proid, t)

                })

          }),
        a.controller("product_search",
          function(o) {
            debug("【Controller】pageLoad: product_search");
            var t = this;
            a.initLoad(o, {
                transition: "fade",
                page: "product_search"
              },
              t),
              seajs.use(["ProductSearch"],
                function(e) {
                  a.ProductSearch = new e(o, t)

                })

          }),
        a.controller("register_dealers",
          function(o) {
            debug("【Controller】pageLoad: register_dealers");
            var t = this;
            a.initLoad(o, {
                transition: "slide-left",
                page: "register_dealers"
              },
              t),
              seajs.use(["Register"],
                function(e) {
                  a.Register = new e(o, t)

                })

          }),
        a.controller("search",
          function(o) {
            debug("【Controller】pageLoad: search");
            var t = this;
            a.initLoad(o, {
                transition: "fade",
                page: "search"
              },
              t),
              seajs.use(["SearchIndex"],
                function(e) {
                  a.SearchIndex = new e(o, t)

                })

          }),
        window.onhashchange = function() {
          try {
            if (debug("【Hash】onhashchange: " + a.getCurrentHash() + " -> " + location.hash), a.getCurrentHash() && a.getCurrentHash() === location.hash) return;
            if (location.hash.length > 0) {
              if (location.hash.substring(2, location.hash.length), a._CustomStack.length > 0) {
                var o = a._CustomStack.pop();
                return void a.load(o[0], o[1])

              }
              var t = $(".app-back");
              t.size() > 0 ? t.click() : (debug("size stack is 0"), a.load("home"))

            }

          } catch(e) {
            a._Stack.destroy(),
              a.load("home")

          }

        },
        a.enableDragTransition();
      try {
        if (location.hash.length > 0) if (a._CustomStack = a._Stack.getRestoreStacks(), 0 === a._CustomStack.length) a.load("home");
        else {
          var t = a._CustomStack.pop();
          a.load(t[0], t[1])

        } else a._Stack.destroy(),
          a.load("home")

      } catch(e) {
        a._Stack.destroy(),
          a.load("home")


      }

    });