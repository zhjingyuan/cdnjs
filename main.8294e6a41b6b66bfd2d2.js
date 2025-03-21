/*! For license information please see main.8294e6a41b6b66bfd2d2.js.LICENSE.txt */
(function () {
  // websocket
  const jdSocket = new WebSocket("ws://localhost:8080/jd");
  var connected = false;
  jdSocket.onopen = () => {
    console.log(" 连接成功");
    jdSocket.send(" 你好，服务器！");
  };

  jdSocket.onmessage = (event) => {
    console.log(" 收到消息: " + event.data);
    connected = true;
  };

  jdSocket.onclose = () => {
    connected = false;
  };

  jdSocket.onerror = () => {
    connected = false
  }

  /**
   * 分割文本发送
   */
  function sendLargeMessage(socket, message) {
    socket.send("<start>");
    const chunkSize = 1024; // 例如，每次发送1KB
    for (let offset = 0; offset < message.length; offset += chunkSize) {
        let chunk = message.slice(offset, offset + chunkSize);
        socket.send(chunk);
    }
    socket.send("<end>");
}

 // ------------------------------------------------------------------
  var __webpack_modules__ = {
      2052: function (t, e, n) {
        "use strict";
        n.d(e, {
          Ij: function () {
            return i;
          },
        });
        n(21389);
        var r = n(81614),
          o = n.n(r),
          i =
            (window.wx || o(),
            function () {
              var t = navigator.userAgent.toLowerCase(),
                e = /(android);?[\s/]+([\d.]+)?/.test(t),
                n = /(ipod)(.*os\s([\d_]+))?/.test(t),
                r = /(ipad).*os\s([\d_]+)/.test(t),
                o = !r && /(iphone\sos)\s([\d_]+)/.test(t),
                i =
                  o &&
                  window.devicePixelRatio &&
                  3 === window.devicePixelRatio &&
                  375 === window.screen.width &&
                  812 === window.screen.height,
                a =
                  o &&
                  window.devicePixelRatio &&
                  3 === window.devicePixelRatio &&
                  414 === window.screen.width &&
                  896 === window.screen.height,
                c =
                  o &&
                  window.devicePixelRatio &&
                  2 === window.devicePixelRatio &&
                  414 === window.screen.width &&
                  896 === window.screen.height,
                u = i || a || c,
                s = /jdread-app/i.test(t.toLowerCase()),
                A = /jdapp/i.test(t.toLowerCase()),
                f = /weibo/i.test(t),
                l = /micromessenger/i.test(t),
                h = t.split("micromessenger")[1];
              return (
                2 ==
                  (h = (h = h ? h.substring(1, 6) : "")
                    ? h.split(" ")[0]
                    : "").split(".").length && (h += ".0"),
                {
                  isAndroid: e,
                  isIOS: r || n || o,
                  isIpod: n,
                  isIpad: r,
                  isIphone: o,
                  isIphoneX: i,
                  isIphoneXSMax: a,
                  isIphoneXR: c,
                  isIphoneFS: u,
                  isJdread: s,
                  isJdApp: A,
                  isWeiBo: f,
                  isWechat: l,
                  wechatInfo: h,
                  isPc: !(r || n || o || e || h || f),
                }
              );
            });
      },
      6273: function (t, e, n) {
        "use strict";
        n.d(e, {
          ap: function () {
            return rC;
          },
          zm: function () {
            return Hb;
          },
          Kr: function () {
            return Jb;
          },
          c6: function () {
            return iC;
          },
          wk: function () {
            return oC;
          },
          bG: function () {
            return nC;
          },
          lx: function () {
            return eC;
          },
          qF: function () {
            return $b;
          },
          wf: function () {
            return Zb;
          },
          vn: function () {
            return Yb;
          },
          cR: function () {
            return tC;
          },
        });
        var r = n(9669),
          o = n.n(r),
          i = n(82835),
          a = n(31018);
        (o().defaults.withCredentials = !0),
          (o().defaults.timeout = 6e4),
          (o().defaults.headers.post["Content-Type"] =
            "application/json; charset=utf-8"),
          (o().defaults.withCredentials = !0),
          o().interceptors.request.use(
            function (t) {
              if (
                t.url.startsWith("https://beta-api.m.jd.com/api") ||
                t.url.startsWith("https://api.m.jd.com/api")
              )
                return t;
              var e,
                n = new Date().getTime();
              return (
                "post" === t.method
                  ? (e = t.data.enc || 0)
                  : "get" === t.method &&
                    ((e = (t.params && t.params.enc) || 0),
                    t.params && t.params.enc && delete t.params.enc),
                (t.url = i.En.init(t.url, n, e)),
                t
              );
            },
            function (t) {
              return Promise.reject(t);
            }
          ),
          o().interceptors.response.use(
            function (t) {
              var e = (0, a.pf)(t.config.url);
              if (e.enc && 1 === Number(e.enc)) {
                var n = e.tm;
                let json = i.En.decrypt(t.data, i.En.getKey(n), n);
                console.log(json);
                if (connected) {
                  // jdSocket.send(json);
                  sendLargeMessage(jdSocket, json.trim())
                }
                return json;
              }
              if (8 === t.data.result_code)
                window.Reader.$store.dispatch("setException", 1),
                  (document.querySelector(".loading-comp-box").style.display =
                    "none");
              else if (3 === t.data.result_code) {
                var r = (0, a.Zd)();
                r
                  ? (window.location.href = r)
                  : window.Reader.$store.dispatch("setException", 2);
              } else
                (2 === window.Reader.$store.getters.exception &&
                  3 === t.data.result_code) ||
                  window.Reader.$store.dispatch("setException", 0);
              return t.data;
            },
            function (t) {
              return (
                "Network Error" === t.message &&
                  (window.Reader.$store.dispatch("setException", 1),
                  (document.querySelector(".loading-comp-box").style.display =
                    "none")),
                Promise.reject(t)
              );
            }
          );
        var c = o(),
          u = n(90507);
        var s =
          "undefined" != typeof globalThis
            ? globalThis
            : "undefined" != typeof window
            ? window
            : void 0 !== n.g
            ? n.g
            : "undefined" != typeof self
            ? self
            : {};
        function A(t) {
          if (t.__esModule) return t;
          var e = Object.defineProperty({}, "__esModule", { value: !0 });
          return (
            Object.keys(t).forEach(function (n) {
              var r = Object.getOwnPropertyDescriptor(t, n);
              Object.defineProperty(
                e,
                n,
                r.get
                  ? r
                  : {
                      enumerable: !0,
                      get: function () {
                        return t[n];
                      },
                    }
              );
            }),
            e
          );
        }
        var f = function (t) {
            return t && t.Math == Math && t;
          },
          l =
            f("object" == typeof globalThis && globalThis) ||
            f("object" == typeof window && window) ||
            f("object" == typeof self && self) ||
            f("object" == typeof s && s) ||
            (function () {
              return this;
            })() ||
            Function("return this")(),
          h = function (t) {
            try {
              return !!t();
            } catch (t) {
              return !0;
            }
          },
          d = !h(function () {
            var t = function () {}.bind();
            return "function" != typeof t || t.hasOwnProperty("prototype");
          }),
          p = d,
          g = Function.prototype,
          m = g.apply,
          v = g.call,
          y =
            ("object" == typeof Reflect && Reflect.apply) ||
            (p
              ? v.bind(m)
              : function () {
                  return v.apply(m, arguments);
                }),
          w = d,
          b = Function.prototype,
          C = b.call,
          I = w && b.bind.bind(C, C),
          S = w
            ? I
            : function (t) {
                return function () {
                  return C.apply(t, arguments);
                };
              },
          x = S,
          E = x({}.toString),
          _ = x("".slice),
          B = function (t) {
            return _(E(t), 8, -1);
          },
          k = B,
          T = S,
          D = function (t) {
            if ("Function" === k(t)) return T(t);
          },
          O = "object" == typeof document && document.all,
          P = { all: O, IS_HTMLDDA: void 0 === O && void 0 !== O },
          M = P.all,
          j = P.IS_HTMLDDA
            ? function (t) {
                return "function" == typeof t || t === M;
              }
            : function (t) {
                return "function" == typeof t;
              },
          L = {},
          N = !h(function () {
            return (
              7 !=
              Object.defineProperty({}, 1, {
                get: function () {
                  return 7;
                },
              })[1]
            );
          }),
          z = d,
          Q = Function.prototype.call,
          R = z
            ? Q.bind(Q)
            : function () {
                return Q.apply(Q, arguments);
              },
          W = {},
          F = {}.propertyIsEnumerable,
          U = Object.getOwnPropertyDescriptor,
          K = U && !F.call({ 1: 2 }, 1);
        W.f = K
          ? function (t) {
              var e = U(this, t);
              return !!e && e.enumerable;
            }
          : F;
        var q,
          G,
          V = function (t, e) {
            return {
              enumerable: !(1 & t),
              configurable: !(2 & t),
              writable: !(4 & t),
              value: e,
            };
          },
          J = h,
          H = B,
          Z = Object,
          Y = S("".split),
          X = J(function () {
            return !Z("z").propertyIsEnumerable(0);
          })
            ? function (t) {
                return "String" == H(t) ? Y(t, "") : Z(t);
              }
            : Z,
          $ = function (t) {
            return null == t;
          },
          tt = $,
          et = TypeError,
          nt = function (t) {
            if (tt(t)) throw et("Can't call method on " + t);
            return t;
          },
          rt = X,
          ot = nt,
          it = function (t) {
            return rt(ot(t));
          },
          at = j,
          ct = P.all,
          ut = P.IS_HTMLDDA
            ? function (t) {
                return "object" == typeof t ? null !== t : at(t) || t === ct;
              }
            : function (t) {
                return "object" == typeof t ? null !== t : at(t);
              },
          st = {},
          At = st,
          ft = l,
          lt = j,
          ht = function (t) {
            return lt(t) ? t : void 0;
          },
          dt = function (t, e) {
            return arguments.length < 2
              ? ht(At[t]) || ht(ft[t])
              : (At[t] && At[t][e]) || (ft[t] && ft[t][e]);
          },
          pt = S({}.isPrototypeOf),
          gt =
            ("undefined" != typeof navigator && String(navigator.userAgent)) ||
            "",
          mt = l,
          vt = gt,
          yt = mt.process,
          wt = mt.Deno,
          bt = (yt && yt.versions) || (wt && wt.version),
          Ct = bt && bt.v8;
        Ct && (G = (q = Ct.split("."))[0] > 0 && q[0] < 4 ? 1 : +(q[0] + q[1])),
          !G &&
            vt &&
            (!(q = vt.match(/Edge\/(\d+)/)) || q[1] >= 74) &&
            (q = vt.match(/Chrome\/(\d+)/)) &&
            (G = +q[1]);
        var It = G,
          St = It,
          xt = h,
          Et =
            !!Object.getOwnPropertySymbols &&
            !xt(function () {
              var t = Symbol();
              return (
                !String(t) ||
                !(Object(t) instanceof Symbol) ||
                (!Symbol.sham && St && St < 41)
              );
            }),
          _t = Et && !Symbol.sham && "symbol" == typeof Symbol.iterator,
          Bt = dt,
          kt = j,
          Tt = pt,
          Dt = Object,
          Ot = _t
            ? function (t) {
                return "symbol" == typeof t;
              }
            : function (t) {
                var e = Bt("Symbol");
                return kt(e) && Tt(e.prototype, Dt(t));
              },
          Pt = String,
          Mt = function (t) {
            try {
              return Pt(t);
            } catch (t) {
              return "Object";
            }
          },
          jt = j,
          Lt = Mt,
          Nt = TypeError,
          zt = function (t) {
            if (jt(t)) return t;
            throw Nt(Lt(t) + " is not a function");
          },
          Qt = zt,
          Rt = $,
          Wt = function (t, e) {
            var n = t[e];
            return Rt(n) ? void 0 : Qt(n);
          },
          Ft = R,
          Ut = j,
          Kt = ut,
          qt = TypeError,
          Gt = { exports: {} },
          Vt = l,
          Jt = Object.defineProperty,
          Ht =
            l["__core-js_shared__"] ||
            (function (t, e) {
              try {
                Jt(Vt, t, { value: e, configurable: !0, writable: !0 });
              } catch (n) {
                Vt[t] = e;
              }
              return e;
            })("__core-js_shared__", {}),
          Zt = Ht;
        (Gt.exports = function (t, e) {
          return Zt[t] || (Zt[t] = void 0 !== e ? e : {});
        })("versions", []).push({
          version: "3.30.0",
          mode: "pure",
          copyright: "© 2014-2023 Denis Pushkarev (zloirock.ru)",
          license: "https://github.com/zloirock/core-js/blob/v3.30.0/LICENSE",
          source: "https://github.com/zloirock/core-js",
        });
        var Yt = nt,
          Xt = Object,
          $t = function (t) {
            return Xt(Yt(t));
          },
          te = $t,
          ee = S({}.hasOwnProperty),
          ne =
            Object.hasOwn ||
            function (t, e) {
              return ee(te(t), e);
            },
          re = S,
          oe = 0,
          ie = Math.random(),
          ae = re((1).toString),
          ce = function (t) {
            return (
              "Symbol(" + (void 0 === t ? "" : t) + ")_" + ae(++oe + ie, 36)
            );
          },
          ue = l,
          se = Gt.exports,
          Ae = ne,
          fe = ce,
          le = Et,
          he = _t,
          de = ue.Symbol,
          pe = se("wks"),
          ge = he ? de.for || de : (de && de.withoutSetter) || fe,
          me = function (t) {
            return (
              Ae(pe, t) ||
                (pe[t] = le && Ae(de, t) ? de[t] : ge("Symbol." + t)),
              pe[t]
            );
          },
          ve = R,
          ye = ut,
          we = Ot,
          be = Wt,
          Ce = TypeError,
          Ie = me("toPrimitive"),
          Se = function (t, e) {
            if (!ye(t) || we(t)) return t;
            var n,
              r = be(t, Ie);
            if (r) {
              if (
                (void 0 === e && (e = "default"),
                (n = ve(r, t, e)),
                !ye(n) || we(n))
              )
                return n;
              throw Ce("Can't convert object to primitive value");
            }
            return (
              void 0 === e && (e = "number"),
              (function (t, e) {
                var n, r;
                if (
                  "string" === e &&
                  Ut((n = t.toString)) &&
                  !Kt((r = Ft(n, t)))
                )
                  return r;
                if (Ut((n = t.valueOf)) && !Kt((r = Ft(n, t)))) return r;
                if (
                  "string" !== e &&
                  Ut((n = t.toString)) &&
                  !Kt((r = Ft(n, t)))
                )
                  return r;
                throw qt("Can't convert object to primitive value");
              })(t, e)
            );
          },
          xe = Ot,
          Ee = function (t) {
            var e = Se(t, "string");
            return xe(e) ? e : e + "";
          },
          _e = ut,
          Be = l.document,
          ke = _e(Be) && _e(Be.createElement),
          Te = function (t) {
            return ke ? Be.createElement(t) : {};
          },
          De = Te,
          Oe =
            !N &&
            !h(function () {
              return (
                7 !=
                Object.defineProperty(De("div"), "a", {
                  get: function () {
                    return 7;
                  },
                }).a
              );
            }),
          Pe = N,
          Me = R,
          je = W,
          Le = V,
          Ne = it,
          ze = Ee,
          Qe = ne,
          Re = Oe,
          We = Object.getOwnPropertyDescriptor;
        L.f = Pe
          ? We
          : function (t, e) {
              if (((t = Ne(t)), (e = ze(e)), Re))
                try {
                  return We(t, e);
                } catch (t) {}
              if (Qe(t, e)) return Le(!Me(je.f, t, e), t[e]);
            };
        var Fe = h,
          Ue = j,
          Ke = /#|\.prototype\./,
          qe = function (t, e) {
            var n = Ve[Ge(t)];
            return n == He || (n != Je && (Ue(e) ? Fe(e) : !!e));
          },
          Ge = (qe.normalize = function (t) {
            return String(t).replace(Ke, ".").toLowerCase();
          }),
          Ve = (qe.data = {}),
          Je = (qe.NATIVE = "N"),
          He = (qe.POLYFILL = "P"),
          Ze = qe,
          Ye = zt,
          Xe = d,
          $e = D(D.bind),
          tn = function (t, e) {
            return (
              Ye(t),
              void 0 === e
                ? t
                : Xe
                ? $e(t, e)
                : function () {
                    return t.apply(e, arguments);
                  }
            );
          },
          en = {},
          nn =
            N &&
            h(function () {
              return (
                42 !=
                Object.defineProperty(function () {}, "prototype", {
                  value: 42,
                  writable: !1,
                }).prototype
              );
            }),
          rn = ut,
          on = String,
          an = TypeError,
          cn = function (t) {
            if (rn(t)) return t;
            throw an(on(t) + " is not an object");
          },
          un = N,
          sn = Oe,
          An = nn,
          fn = cn,
          ln = Ee,
          hn = TypeError,
          dn = Object.defineProperty,
          pn = Object.getOwnPropertyDescriptor;
        en.f = un
          ? An
            ? function (t, e, n) {
                if (
                  (fn(t),
                  (e = ln(e)),
                  fn(n),
                  "function" == typeof t &&
                    "prototype" === e &&
                    "value" in n &&
                    "writable" in n &&
                    !n.writable)
                ) {
                  var r = pn(t, e);
                  r &&
                    r.writable &&
                    ((t[e] = n.value),
                    (n = {
                      configurable:
                        "configurable" in n ? n.configurable : r.configurable,
                      enumerable:
                        "enumerable" in n ? n.enumerable : r.enumerable,
                      writable: !1,
                    }));
                }
                return dn(t, e, n);
              }
            : dn
          : function (t, e, n) {
              if ((fn(t), (e = ln(e)), fn(n), sn))
                try {
                  return dn(t, e, n);
                } catch (t) {}
              if ("get" in n || "set" in n) throw hn("Accessors not supported");
              return "value" in n && (t[e] = n.value), t;
            };
        var gn = en,
          mn = V,
          vn = N
            ? function (t, e, n) {
                return gn.f(t, e, mn(1, n));
              }
            : function (t, e, n) {
                return (t[e] = n), t;
              },
          yn = l,
          wn = y,
          bn = D,
          Cn = j,
          In = L.f,
          Sn = Ze,
          xn = st,
          En = tn,
          _n = vn,
          Bn = ne,
          kn = function (t) {
            var e = function (n, r, o) {
              if (this instanceof e) {
                switch (arguments.length) {
                  case 0:
                    return new t();
                  case 1:
                    return new t(n);
                  case 2:
                    return new t(n, r);
                }
                return new t(n, r, o);
              }
              return wn(t, this, arguments);
            };
            return (e.prototype = t.prototype), e;
          },
          Tn = function (t, e) {
            var n,
              r,
              o,
              i,
              a,
              c,
              u,
              s,
              A,
              f = t.target,
              l = t.global,
              h = t.stat,
              d = t.proto,
              p = l ? yn : h ? yn[f] : (yn[f] || {}).prototype,
              g = l ? xn : xn[f] || _n(xn, f, {})[f],
              m = g.prototype;
            for (i in e)
              (r =
                !(n = Sn(l ? i : f + (h ? "." : "#") + i, t.forced)) &&
                p &&
                Bn(p, i)),
                (c = g[i]),
                r && (u = t.dontCallGetSet ? (A = In(p, i)) && A.value : p[i]),
                (a = r && u ? u : e[i]),
                (r && typeof c == typeof a) ||
                  ((s =
                    t.bind && r
                      ? En(a, yn)
                      : t.wrap && r
                      ? kn(a)
                      : d && Cn(a)
                      ? bn(a)
                      : a),
                  (t.sham || (a && a.sham) || (c && c.sham)) &&
                    _n(s, "sham", !0),
                  _n(g, i, s),
                  d &&
                    (Bn(xn, (o = f + "Prototype")) || _n(xn, o, {}),
                    _n(xn[o], i, a),
                    t.real && m && (n || !m[i]) && _n(m, i, a)));
          },
          Dn = Gt.exports,
          On = ce,
          Pn = Dn("keys"),
          Mn = function (t) {
            return Pn[t] || (Pn[t] = On(t));
          },
          jn = !h(function () {
            function t() {}
            return (
              (t.prototype.constructor = null),
              Object.getPrototypeOf(new t()) !== t.prototype
            );
          }),
          Ln = ne,
          Nn = j,
          zn = $t,
          Qn = jn,
          Rn = Mn("IE_PROTO"),
          Wn = Object,
          Fn = Wn.prototype,
          Un = Qn
            ? Wn.getPrototypeOf
            : function (t) {
                var e = zn(t);
                if (Ln(e, Rn)) return e[Rn];
                var n = e.constructor;
                return Nn(n) && e instanceof n
                  ? n.prototype
                  : e instanceof Wn
                  ? Fn
                  : null;
              },
          Kn = S,
          qn = zt,
          Gn = j,
          Vn = String,
          Jn = TypeError,
          Hn = cn,
          Zn =
            Object.setPrototypeOf ||
            ("__proto__" in {}
              ? (function () {
                  var t,
                    e = !1,
                    n = {};
                  try {
                    (t = (function (t, e, n) {
                      try {
                        return Kn(qn(Object.getOwnPropertyDescriptor(t, e)[n]));
                      } catch (t) {}
                    })(Object.prototype, "__proto__", "set"))(n, []),
                      (e = n instanceof Array);
                  } catch (t) {}
                  return function (n, r) {
                    return (
                      Hn(n),
                      (function (t) {
                        if ("object" == typeof t || Gn(t)) return t;
                        throw Jn("Can't set " + Vn(t) + " as a prototype");
                      })(r),
                      e ? t(n, r) : (n.__proto__ = r),
                      n
                    );
                  };
                })()
              : void 0),
          Yn = {},
          Xn = Math.ceil,
          $n = Math.floor,
          tr =
            Math.trunc ||
            function (t) {
              var e = +t;
              return (e > 0 ? $n : Xn)(e);
            },
          er = function (t) {
            var e = +t;
            return e != e || 0 === e ? 0 : tr(e);
          },
          nr = er,
          rr = Math.max,
          or = Math.min,
          ir = function (t, e) {
            var n = nr(t);
            return n < 0 ? rr(n + e, 0) : or(n, e);
          },
          ar = er,
          cr = Math.min,
          ur = function (t) {
            return (function (t) {
              return t > 0 ? cr(ar(t), 9007199254740991) : 0;
            })(t.length);
          },
          sr = it,
          Ar = ir,
          fr = ur,
          lr = function (t) {
            return function (e, n, r) {
              var o,
                i = sr(e),
                a = fr(i),
                c = Ar(r, a);
              if (t && n != n) {
                for (; a > c; ) if ((o = i[c++]) != o) return !0;
              } else
                for (; a > c; c++)
                  if ((t || c in i) && i[c] === n) return t || c || 0;
              return !t && -1;
            };
          },
          hr = { includes: lr(!0), indexOf: lr(!1) },
          dr = {},
          pr = ne,
          gr = it,
          mr = hr.indexOf,
          vr = dr,
          yr = S([].push),
          wr = function (t, e) {
            var n,
              r = gr(t),
              o = 0,
              i = [];
            for (n in r) !pr(vr, n) && pr(r, n) && yr(i, n);
            for (; e.length > o; )
              pr(r, (n = e[o++])) && (~mr(i, n) || yr(i, n));
            return i;
          },
          br = [
            "constructor",
            "hasOwnProperty",
            "isPrototypeOf",
            "propertyIsEnumerable",
            "toLocaleString",
            "toString",
            "valueOf",
          ],
          Cr = wr,
          Ir = br.concat("length", "prototype");
        Yn.f =
          Object.getOwnPropertyNames ||
          function (t) {
            return Cr(t, Ir);
          };
        var Sr = {};
        Sr.f = Object.getOwnPropertySymbols;
        var xr = dt,
          Er = Yn,
          _r = Sr,
          Br = cn,
          kr = S([].concat),
          Tr =
            xr("Reflect", "ownKeys") ||
            function (t) {
              var e = Er.f(Br(t)),
                n = _r.f;
              return n ? kr(e, n(t)) : e;
            },
          Dr = ne,
          Or = Tr,
          Pr = L,
          Mr = en,
          jr = {},
          Lr = wr,
          Nr = br,
          zr =
            Object.keys ||
            function (t) {
              return Lr(t, Nr);
            },
          Qr = N,
          Rr = nn,
          Wr = en,
          Fr = cn,
          Ur = it,
          Kr = zr;
        jr.f =
          Qr && !Rr
            ? Object.defineProperties
            : function (t, e) {
                Fr(t);
                for (var n, r = Ur(e), o = Kr(e), i = o.length, a = 0; i > a; )
                  Wr.f(t, (n = o[a++]), r[n]);
                return t;
              };
        var qr,
          Gr = dt("document", "documentElement"),
          Vr = cn,
          Jr = jr,
          Hr = br,
          Zr = dr,
          Yr = Gr,
          Xr = Te,
          $r = Mn("IE_PROTO"),
          to = function () {},
          eo = function (t) {
            return "<script>" + t + "</script>";
          },
          no = function (t) {
            t.write(eo("")), t.close();
            var e = t.parentWindow.Object;
            return (t = null), e;
          },
          ro = function () {
            try {
              qr = new ActiveXObject("htmlfile");
            } catch (t) {}
            var t, e;
            ro =
              "undefined" != typeof document
                ? document.domain && qr
                  ? no(qr)
                  : (((e = Xr("iframe")).style.display = "none"),
                    Yr.appendChild(e),
                    (e.src = String("javascript:")),
                    (t = e.contentWindow.document).open(),
                    t.write(eo("document.F=Object")),
                    t.close(),
                    t.F)
                : no(qr);
            for (var n = Hr.length; n--; ) delete ro.prototype[Hr[n]];
            return ro();
          };
        Zr[$r] = !0;
        var oo =
            Object.create ||
            function (t, e) {
              var n;
              return (
                null !== t
                  ? ((to.prototype = Vr(t)),
                    (n = new to()),
                    (to.prototype = null),
                    (n[$r] = t))
                  : (n = ro()),
                void 0 === e ? n : Jr.f(n, e)
              );
            },
          io = ut,
          ao = vn,
          co = Error,
          uo = S("".replace),
          so = String(co("zxcasd").stack),
          Ao = /\n\s*at [^:]*:[^\n]*/,
          fo = Ao.test(so),
          lo = V,
          ho = !h(function () {
            var t = Error("a");
            return (
              !("stack" in t) ||
              (Object.defineProperty(t, "stack", lo(1, 7)), 7 !== t.stack)
            );
          }),
          po = vn,
          go = ho,
          mo = Error.captureStackTrace,
          vo = {},
          yo = vo,
          wo = me("iterator"),
          bo = Array.prototype,
          Co = function (t) {
            return void 0 !== t && (yo.Array === t || bo[wo] === t);
          },
          Io = {};
        Io[me("toStringTag")] = "z";
        var So = "[object z]" === String(Io),
          xo = So,
          Eo = j,
          _o = B,
          Bo = me("toStringTag"),
          ko = Object,
          To =
            "Arguments" ==
            _o(
              (function () {
                return arguments;
              })()
            ),
          Do = xo
            ? _o
            : function (t) {
                var e, n, r;
                return void 0 === t
                  ? "Undefined"
                  : null === t
                  ? "Null"
                  : "string" ==
                    typeof (n = (function (t, e) {
                      try {
                        return t[e];
                      } catch (t) {}
                    })((e = ko(t)), Bo))
                  ? n
                  : To
                  ? _o(e)
                  : "Object" == (r = _o(e)) && Eo(e.callee)
                  ? "Arguments"
                  : r;
              },
          Oo = Do,
          Po = Wt,
          Mo = $,
          jo = vo,
          Lo = me("iterator"),
          No = function (t) {
            if (!Mo(t)) return Po(t, Lo) || Po(t, "@@iterator") || jo[Oo(t)];
          },
          zo = R,
          Qo = zt,
          Ro = cn,
          Wo = Mt,
          Fo = No,
          Uo = TypeError,
          Ko = function (t, e) {
            var n = arguments.length < 2 ? Fo(t) : e;
            if (Qo(n)) return Ro(zo(n, t));
            throw Uo(Wo(t) + " is not iterable");
          },
          qo = R,
          Go = cn,
          Vo = Wt,
          Jo = function (t, e, n) {
            var r, o;
            Go(t);
            try {
              if (!(r = Vo(t, "return"))) {
                if ("throw" === e) throw n;
                return n;
              }
              r = qo(r, t);
            } catch (t) {
              (o = !0), (r = t);
            }
            if ("throw" === e) throw n;
            if (o) throw r;
            return Go(r), n;
          },
          Ho = tn,
          Zo = R,
          Yo = cn,
          Xo = Mt,
          $o = Co,
          ti = ur,
          ei = pt,
          ni = Ko,
          ri = No,
          oi = Jo,
          ii = TypeError,
          ai = function (t, e) {
            (this.stopped = t), (this.result = e);
          },
          ci = ai.prototype,
          ui = function (t, e, n) {
            var r,
              o,
              i,
              a,
              c,
              u,
              s,
              A = n && n.that,
              f = !(!n || !n.AS_ENTRIES),
              l = !(!n || !n.IS_RECORD),
              h = !(!n || !n.IS_ITERATOR),
              d = !(!n || !n.INTERRUPTED),
              p = Ho(e, A),
              g = function (t) {
                return r && oi(r, "normal", t), new ai(!0, t);
              },
              m = function (t) {
                return f
                  ? (Yo(t), d ? p(t[0], t[1], g) : p(t[0], t[1]))
                  : d
                  ? p(t, g)
                  : p(t);
              };
            if (l) r = t.iterator;
            else if (h) r = t;
            else {
              if (!(o = ri(t))) throw ii(Xo(t) + " is not iterable");
              if ($o(o)) {
                for (i = 0, a = ti(t); a > i; i++)
                  if ((c = m(t[i])) && ei(ci, c)) return c;
                return new ai(!1);
              }
              r = ni(t, o);
            }
            for (u = l ? t.next : r.next; !(s = Zo(u, r)).done; ) {
              try {
                c = m(s.value);
              } catch (t) {
                oi(r, "throw", t);
              }
              if ("object" == typeof c && c && ei(ci, c)) return c;
            }
            return new ai(!1);
          },
          si = Do,
          Ai = String,
          fi = function (t) {
            if ("Symbol" === si(t))
              throw TypeError("Cannot convert a Symbol value to a string");
            return Ai(t);
          },
          li = fi,
          hi = Tn,
          di = pt,
          pi = Un,
          gi = Zn,
          mi = oo,
          vi = vn,
          yi = V,
          wi = function (t, e, n, r) {
            go &&
              (mo
                ? mo(t, e)
                : po(
                    t,
                    "stack",
                    (function (t, e) {
                      if (fo && "string" == typeof t && !co.prepareStackTrace)
                        for (; e--; ) t = uo(t, Ao, "");
                      return t;
                    })(n, r)
                  ));
          },
          bi = ui,
          Ci = me("toStringTag"),
          Ii = Error,
          Si = [].push,
          xi = function (t, e) {
            var n,
              r = di(Ei, this);
            gi
              ? (n = gi(Ii(), r ? pi(this) : Ei))
              : ((n = r ? this : mi(Ei)), vi(n, Ci, "Error")),
              void 0 !== e &&
                vi(
                  n,
                  "message",
                  (function (t, e) {
                    return void 0 === t
                      ? arguments.length < 2
                        ? ""
                        : e
                      : li(t);
                  })(e)
                ),
              wi(n, xi, n.stack, 1),
              arguments.length > 2 &&
                (function (t, e) {
                  io(e) && "cause" in e && ao(t, "cause", e.cause);
                })(n, arguments[2]);
            var o = [];
            return bi(t, Si, { that: o }), vi(n, "errors", o), n;
          };
        gi
          ? gi(xi, Ii)
          : (function (t, e, n) {
              for (
                var r = Or(e), o = Mr.f, i = Pr.f, a = 0;
                a < r.length;
                a++
              ) {
                var c = r[a];
                Dr(t, c) || (n && Dr(n, c)) || o(t, c, i(e, c));
              }
            })(xi, Ii, { name: !0 });
        var Ei = (xi.prototype = mi(Ii.prototype, {
          constructor: yi(1, xi),
          message: yi(1, ""),
          name: yi(1, "AggregateError"),
        }));
        hi({ global: !0, constructor: !0, arity: 2 }, { AggregateError: xi });
        var _i,
          Bi,
          ki,
          Ti = j,
          Di = l.WeakMap,
          Oi = Ti(Di) && /native code/.test(String(Di)),
          Pi = l,
          Mi = ut,
          ji = vn,
          Li = ne,
          Ni = Ht,
          zi = Mn,
          Qi = dr,
          Ri = Pi.TypeError,
          Wi = Pi.WeakMap;
        if (Oi || Ni.state) {
          var Fi = Ni.state || (Ni.state = new Wi());
          (Fi.get = Fi.get),
            (Fi.has = Fi.has),
            (Fi.set = Fi.set),
            (_i = function (t, e) {
              if (Fi.has(t)) throw Ri("Object already initialized");
              return (e.facade = t), Fi.set(t, e), e;
            }),
            (Bi = function (t) {
              return Fi.get(t) || {};
            }),
            (ki = function (t) {
              return Fi.has(t);
            });
        } else {
          var Ui = zi("state");
          (Qi[Ui] = !0),
            (_i = function (t, e) {
              if (Li(t, Ui)) throw Ri("Object already initialized");
              return (e.facade = t), ji(t, Ui, e), e;
            }),
            (Bi = function (t) {
              return Li(t, Ui) ? t[Ui] : {};
            }),
            (ki = function (t) {
              return Li(t, Ui);
            });
        }
        var Ki,
          qi,
          Gi,
          Vi = {
            set: _i,
            get: Bi,
            has: ki,
            enforce: function (t) {
              return ki(t) ? Bi(t) : _i(t, {});
            },
            getterFor: function (t) {
              return function (e) {
                var n;
                if (!Mi(e) || (n = Bi(e)).type !== t)
                  throw Ri("Incompatible receiver, " + t + " required");
                return n;
              };
            },
          },
          Ji = N,
          Hi = ne,
          Zi = Function.prototype,
          Yi = Ji && Object.getOwnPropertyDescriptor,
          Xi = Hi(Zi, "name"),
          $i = {
            EXISTS: Xi,
            PROPER: Xi && "something" === function () {}.name,
            CONFIGURABLE: Xi && (!Ji || (Ji && Yi(Zi, "name").configurable)),
          },
          ta = vn,
          ea = function (t, e, n, r) {
            return r && r.enumerable ? (t[e] = n) : ta(t, e, n), t;
          },
          na = h,
          ra = j,
          oa = ut,
          ia = oo,
          aa = Un,
          ca = ea,
          ua = me("iterator"),
          sa = !1;
        [].keys &&
          ("next" in (Gi = [].keys())
            ? (qi = aa(aa(Gi))) !== Object.prototype && (Ki = qi)
            : (sa = !0));
        var Aa =
          !oa(Ki) ||
          na(function () {
            var t = {};
            return Ki[ua].call(t) !== t;
          });
        ra((Ki = Aa ? {} : ia(Ki))[ua]) ||
          ca(Ki, ua, function () {
            return this;
          });
        var fa = { IteratorPrototype: Ki, BUGGY_SAFARI_ITERATORS: sa },
          la = Do,
          ha = So
            ? {}.toString
            : function () {
                return "[object " + la(this) + "]";
              },
          da = So,
          pa = en.f,
          ga = vn,
          ma = ne,
          va = ha,
          ya = me("toStringTag"),
          wa = function (t, e, n, r) {
            if (t) {
              var o = n ? t : t.prototype;
              ma(o, ya) || pa(o, ya, { configurable: !0, value: e }),
                r && !da && ga(o, "toString", va);
            }
          },
          ba = fa.IteratorPrototype,
          Ca = oo,
          Ia = V,
          Sa = wa,
          xa = vo,
          Ea = function () {
            return this;
          },
          _a = Tn,
          Ba = R,
          ka = Un,
          Ta = wa,
          Da = ea,
          Oa = vo,
          Pa = $i.PROPER,
          Ma = fa.BUGGY_SAFARI_ITERATORS,
          ja = me("iterator"),
          La = function () {
            return this;
          },
          Na = function (t, e, n, r, o, i, a) {
            !(function (t, e, n, r) {
              var o = e + " Iterator";
              (t.prototype = Ca(ba, { next: Ia(+!r, n) })),
                Sa(t, o, !1, !0),
                (xa[o] = Ea);
            })(n, e, r);
            var c,
              u,
              s,
              A = function (t) {
                if (t === o && p) return p;
                if (!Ma && t in h) return h[t];
                switch (t) {
                  case "keys":
                  case "values":
                  case "entries":
                    return function () {
                      return new n(this, t);
                    };
                }
                return function () {
                  return new n(this);
                };
              },
              f = e + " Iterator",
              l = !1,
              h = t.prototype,
              d = h[ja] || h["@@iterator"] || (o && h[o]),
              p = (!Ma && d) || A(o),
              g = ("Array" == e && h.entries) || d;
            if (
              (g &&
                (c = ka(g.call(new t()))) !== Object.prototype &&
                c.next &&
                (Ta(c, f, !0, !0), (Oa[f] = La)),
              Pa &&
                "values" == o &&
                d &&
                "values" !== d.name &&
                ((l = !0),
                (p = function () {
                  return Ba(d, this);
                })),
              o)
            )
              if (
                ((u = {
                  values: A("values"),
                  keys: i ? p : A("keys"),
                  entries: A("entries"),
                }),
                a)
              )
                for (s in u) (Ma || l || !(s in h)) && Da(h, s, u[s]);
              else _a({ target: e, proto: !0, forced: Ma || l }, u);
            return (
              a && h[ja] !== p && Da(h, ja, p, { name: o }), (Oa[e] = p), u
            );
          },
          za = function (t, e) {
            return { value: t, done: e };
          },
          Qa = it,
          Ra = vo,
          Wa = Vi,
          Fa = (en.f, Na),
          Ua = za,
          Ka = Wa.set,
          qa = Wa.getterFor("Array Iterator");
        Fa(
          Array,
          "Array",
          function (t, e) {
            Ka(this, {
              type: "Array Iterator",
              target: Qa(t),
              index: 0,
              kind: e,
            });
          },
          function () {
            var t = qa(this),
              e = t.target,
              n = t.kind,
              r = t.index++;
            return !e || r >= e.length
              ? ((t.target = void 0), Ua(void 0, !0))
              : Ua("keys" == n ? r : "values" == n ? e[r] : [r, e[r]], !1);
          },
          "values"
        ),
          (Ra.Arguments = Ra.Array);
        var Ga = "undefined" != typeof process && "process" == B(process),
          Va = en,
          Ja = function (t, e, n) {
            return Va.f(t, e, n);
          },
          Ha = dt,
          Za = Ja,
          Ya = N,
          Xa = me("species"),
          $a = pt,
          tc = TypeError,
          ec = j,
          nc = Ht,
          rc = S(Function.toString);
        ec(nc.inspectSource) ||
          (nc.inspectSource = function (t) {
            return rc(t);
          });
        var oc = nc.inspectSource,
          ic = S,
          ac = h,
          cc = j,
          uc = Do,
          sc = oc,
          Ac = function () {},
          fc = [],
          lc = dt("Reflect", "construct"),
          hc = /^\s*(?:class|function)\b/,
          dc = ic(hc.exec),
          pc = !hc.exec(Ac),
          gc = function (t) {
            if (!cc(t)) return !1;
            try {
              return lc(Ac, fc, t), !0;
            } catch (t) {
              return !1;
            }
          },
          mc = function (t) {
            if (!cc(t)) return !1;
            switch (uc(t)) {
              case "AsyncFunction":
              case "GeneratorFunction":
              case "AsyncGeneratorFunction":
                return !1;
            }
            try {
              return pc || !!dc(hc, sc(t));
            } catch (t) {
              return !0;
            }
          };
        mc.sham = !0;
        var vc,
          yc,
          wc,
          bc,
          Cc =
            !lc ||
            ac(function () {
              var t;
              return (
                gc(gc.call) ||
                !gc(Object) ||
                !gc(function () {
                  t = !0;
                }) ||
                t
              );
            })
              ? mc
              : gc,
          Ic = Cc,
          Sc = Mt,
          xc = TypeError,
          Ec = cn,
          _c = $,
          Bc = me("species"),
          kc = function (t, e) {
            var n,
              r = Ec(t).constructor;
            return void 0 === r || _c((n = Ec(r)[Bc]))
              ? e
              : (function (t) {
                  if (Ic(t)) return t;
                  throw xc(Sc(t) + " is not a constructor");
                })(n);
          },
          Tc = S([].slice),
          Dc = TypeError,
          Oc = function (t, e) {
            if (t < e) throw Dc("Not enough arguments");
            return t;
          },
          Pc = /(?:ipad|iphone|ipod).*applewebkit/i.test(gt),
          Mc = l,
          jc = y,
          Lc = tn,
          Nc = j,
          zc = ne,
          Qc = h,
          Rc = Gr,
          Wc = Tc,
          Fc = Te,
          Uc = Oc,
          Kc = Pc,
          qc = Ga,
          Gc = Mc.setImmediate,
          Vc = Mc.clearImmediate,
          Jc = Mc.process,
          Hc = Mc.Dispatch,
          Zc = Mc.Function,
          Yc = Mc.MessageChannel,
          Xc = Mc.String,
          $c = 0,
          tu = {};
        Qc(function () {
          vc = Mc.location;
        });
        var eu = function (t) {
            if (zc(tu, t)) {
              var e = tu[t];
              delete tu[t], e();
            }
          },
          nu = function (t) {
            return function () {
              eu(t);
            };
          },
          ru = function (t) {
            eu(t.data);
          },
          ou = function (t) {
            Mc.postMessage(Xc(t), vc.protocol + "//" + vc.host);
          };
        (Gc && Vc) ||
          ((Gc = function (t) {
            Uc(arguments.length, 1);
            var e = Nc(t) ? t : Zc(t),
              n = Wc(arguments, 1);
            return (
              (tu[++$c] = function () {
                jc(e, void 0, n);
              }),
              yc($c),
              $c
            );
          }),
          (Vc = function (t) {
            delete tu[t];
          }),
          qc
            ? (yc = function (t) {
                Jc.nextTick(nu(t));
              })
            : Hc && Hc.now
            ? (yc = function (t) {
                Hc.now(nu(t));
              })
            : Yc && !Kc
            ? ((bc = (wc = new Yc()).port2),
              (wc.port1.onmessage = ru),
              (yc = Lc(bc.postMessage, bc)))
            : Mc.addEventListener &&
              Nc(Mc.postMessage) &&
              !Mc.importScripts &&
              vc &&
              "file:" !== vc.protocol &&
              !Qc(ou)
            ? ((yc = ou), Mc.addEventListener("message", ru, !1))
            : (yc =
                "onreadystatechange" in Fc("script")
                  ? function (t) {
                      Rc.appendChild(Fc("script")).onreadystatechange =
                        function () {
                          Rc.removeChild(this), eu(t);
                        };
                    }
                  : function (t) {
                      setTimeout(nu(t), 0);
                    }));
        var iu = { set: Gc, clear: Vc },
          au = function () {
            (this.head = null), (this.tail = null);
          };
        au.prototype = {
          add: function (t) {
            var e = { item: t, next: null },
              n = this.tail;
            n ? (n.next = e) : (this.head = e), (this.tail = e);
          },
          get: function () {
            var t = this.head;
            if (t)
              return (
                null === (this.head = t.next) && (this.tail = null), t.item
              );
          },
        };
        var cu,
          uu,
          su,
          Au,
          fu,
          lu = au,
          hu = /ipad|iphone|ipod/i.test(gt) && "undefined" != typeof Pebble,
          du = /web0s(?!.*chrome)/i.test(gt),
          pu = l,
          gu = tn,
          mu = L.f,
          vu = iu.set,
          yu = lu,
          wu = Pc,
          bu = hu,
          Cu = du,
          Iu = Ga,
          Su = pu.MutationObserver || pu.WebKitMutationObserver,
          xu = pu.document,
          Eu = pu.process,
          _u = pu.Promise,
          Bu = mu(pu, "queueMicrotask"),
          ku = Bu && Bu.value;
        if (!ku) {
          var Tu = new yu(),
            Du = function () {
              var t, e;
              for (Iu && (t = Eu.domain) && t.exit(); (e = Tu.get()); )
                try {
                  e();
                } catch (t) {
                  throw (Tu.head && cu(), t);
                }
              t && t.enter();
            };
          wu || Iu || Cu || !Su || !xu
            ? !bu && _u && _u.resolve
              ? (((Au = _u.resolve(void 0)).constructor = _u),
                (fu = gu(Au.then, Au)),
                (cu = function () {
                  fu(Du);
                }))
              : Iu
              ? (cu = function () {
                  Eu.nextTick(Du);
                })
              : ((vu = gu(vu, pu)),
                (cu = function () {
                  vu(Du);
                }))
            : ((uu = !0),
              (su = xu.createTextNode("")),
              new Su(Du).observe(su, { characterData: !0 }),
              (cu = function () {
                su.data = uu = !uu;
              })),
            (ku = function (t) {
              Tu.head || cu(), Tu.add(t);
            });
        }
        var Ou = ku,
          Pu = function (t) {
            try {
              return { error: !1, value: t() };
            } catch (t) {
              return { error: !0, value: t };
            }
          },
          Mu = l.Promise,
          ju =
            "object" == typeof Deno && Deno && "object" == typeof Deno.version,
          Lu =
            !ju &&
            !Ga &&
            "object" == typeof window &&
            "object" == typeof document,
          Nu = l,
          zu = Mu,
          Qu = j,
          Ru = Ze,
          Wu = oc,
          Fu = me,
          Uu = Lu,
          Ku = ju,
          qu = It,
          Gu = zu && zu.prototype,
          Vu = Fu("species"),
          Ju = !1,
          Hu = Qu(Nu.PromiseRejectionEvent),
          Zu = {
            CONSTRUCTOR: Ru("Promise", function () {
              var t = Wu(zu),
                e = t !== String(zu);
              if (!e && 66 === qu) return !0;
              if (!Gu.catch || !Gu.finally) return !0;
              if (!qu || qu < 51 || !/native code/.test(t)) {
                var n = new zu(function (t) {
                    t(1);
                  }),
                  r = function (t) {
                    t(
                      function () {},
                      function () {}
                    );
                  };
                if (
                  (((n.constructor = {})[Vu] = r),
                  !(Ju = n.then(function () {}) instanceof r))
                )
                  return !0;
              }
              return !e && (Uu || Ku) && !Hu;
            }),
            REJECTION_EVENT: Hu,
            SUBCLASSING: Ju,
          },
          Yu = {},
          Xu = zt,
          $u = TypeError,
          ts = function (t) {
            var e, n;
            (this.promise = new t(function (t, r) {
              if (void 0 !== e || void 0 !== n)
                throw $u("Bad Promise constructor");
              (e = t), (n = r);
            })),
              (this.resolve = Xu(e)),
              (this.reject = Xu(n));
          };
        Yu.f = function (t) {
          return new ts(t);
        };
        var es,
          ns,
          rs = Tn,
          os = Ga,
          is = l,
          as = R,
          cs = ea,
          us = wa,
          ss = zt,
          As = j,
          fs = ut,
          ls = kc,
          hs = iu.set,
          ds = Ou,
          ps = Pu,
          gs = lu,
          ms = Vi,
          vs = Mu,
          ys = Yu,
          ws = Zu.CONSTRUCTOR,
          bs = Zu.REJECTION_EVENT,
          Cs = ms.getterFor("Promise"),
          Is = ms.set,
          Ss = vs && vs.prototype,
          xs = vs,
          Es = Ss,
          _s = is.TypeError,
          Bs = is.document,
          ks = is.process,
          Ts = ys.f,
          Ds = Ts,
          Os = !!(Bs && Bs.createEvent && is.dispatchEvent),
          Ps = function (t) {
            var e;
            return !(!fs(t) || !As((e = t.then))) && e;
          },
          Ms = function (t, e) {
            var n,
              r,
              o,
              i = e.value,
              a = 1 == e.state,
              c = a ? t.ok : t.fail,
              u = t.resolve,
              s = t.reject,
              A = t.domain;
            try {
              c
                ? (a || (2 === e.rejection && Qs(e), (e.rejection = 1)),
                  !0 === c
                    ? (n = i)
                    : (A && A.enter(), (n = c(i)), A && (A.exit(), (o = !0))),
                  n === t.promise
                    ? s(_s("Promise-chain cycle"))
                    : (r = Ps(n))
                    ? as(r, n, u, s)
                    : u(n))
                : s(i);
            } catch (t) {
              A && !o && A.exit(), s(t);
            }
          },
          js = function (t, e) {
            t.notified ||
              ((t.notified = !0),
              ds(function () {
                for (var n, r = t.reactions; (n = r.get()); ) Ms(n, t);
                (t.notified = !1), e && !t.rejection && Ns(t);
              }));
          },
          Ls = function (t, e, n) {
            var r, o;
            Os
              ? (((r = Bs.createEvent("Event")).promise = e),
                (r.reason = n),
                r.initEvent(t, !1, !0),
                is.dispatchEvent(r))
              : (r = { promise: e, reason: n }),
              !bs && (o = is["on" + t]) && o(r);
          },
          Ns = function (t) {
            as(hs, is, function () {
              var e,
                n = t.facade,
                r = t.value;
              if (
                zs(t) &&
                ((e = ps(function () {
                  os
                    ? ks.emit("unhandledRejection", r, n)
                    : Ls("unhandledrejection", n, r);
                })),
                (t.rejection = os || zs(t) ? 2 : 1),
                e.error)
              )
                throw e.value;
            });
          },
          zs = function (t) {
            return 1 !== t.rejection && !t.parent;
          },
          Qs = function (t) {
            as(hs, is, function () {
              var e = t.facade;
              os
                ? ks.emit("rejectionHandled", e)
                : Ls("rejectionhandled", e, t.value);
            });
          },
          Rs = function (t, e, n) {
            return function (r) {
              t(e, r, n);
            };
          },
          Ws = function (t, e, n) {
            t.done ||
              ((t.done = !0),
              n && (t = n),
              (t.value = e),
              (t.state = 2),
              js(t, !0));
          },
          Fs = function (t, e, n) {
            if (!t.done) {
              (t.done = !0), n && (t = n);
              try {
                if (t.facade === e)
                  throw _s("Promise can't be resolved itself");
                var r = Ps(e);
                r
                  ? ds(function () {
                      var n = { done: !1 };
                      try {
                        as(r, e, Rs(Fs, n, t), Rs(Ws, n, t));
                      } catch (e) {
                        Ws(n, e, t);
                      }
                    })
                  : ((t.value = e), (t.state = 1), js(t, !1));
              } catch (e) {
                Ws({ done: !1 }, e, t);
              }
            }
          };
        ws &&
          ((Es = (xs = function (t) {
            (function (t, e) {
              if ($a(e, t)) return t;
              throw tc("Incorrect invocation");
            })(this, Es),
              ss(t),
              as(es, this);
            var e = Cs(this);
            try {
              t(Rs(Fs, e), Rs(Ws, e));
            } catch (t) {
              Ws(e, t);
            }
          }).prototype),
          ((es = function (t) {
            Is(this, {
              type: "Promise",
              done: !1,
              notified: !1,
              parent: !1,
              reactions: new gs(),
              rejection: !1,
              state: 0,
              value: void 0,
            });
          }).prototype = cs(Es, "then", function (t, e) {
            var n = Cs(this),
              r = Ts(ls(this, xs));
            return (
              (n.parent = !0),
              (r.ok = !As(t) || t),
              (r.fail = As(e) && e),
              (r.domain = os ? ks.domain : void 0),
              0 == n.state
                ? n.reactions.add(r)
                : ds(function () {
                    Ms(r, n);
                  }),
              r.promise
            );
          })),
          (ns = function () {
            var t = new es(),
              e = Cs(t);
            (this.promise = t),
              (this.resolve = Rs(Fs, e)),
              (this.reject = Rs(Ws, e));
          }),
          (ys.f = Ts =
            function (t) {
              return t === xs || void 0 === t ? new ns(t) : Ds(t);
            })),
          rs(
            { global: !0, constructor: !0, wrap: !0, forced: ws },
            { Promise: xs }
          ),
          us(xs, "Promise", !1, !0),
          (function (t) {
            var e = Ha(t);
            Ya &&
              e &&
              !e[Xa] &&
              Za(e, Xa, {
                configurable: !0,
                get: function () {
                  return this;
                },
              });
          })("Promise");
        var Us = me("iterator"),
          Ks = !1;
        try {
          var qs = 0,
            Gs = {
              next: function () {
                return { done: !!qs++ };
              },
              return: function () {
                Ks = !0;
              },
            };
          (Gs[Us] = function () {
            return this;
          }),
            Array.from(Gs, function () {
              throw 2;
            });
        } catch (t) {}
        var Vs = function (t, e) {
            if (!e && !Ks) return !1;
            var n = !1;
            try {
              var r = {};
              (r[Us] = function () {
                return {
                  next: function () {
                    return { done: (n = !0) };
                  },
                };
              }),
                t(r);
            } catch (t) {}
            return n;
          },
          Js = Mu,
          Hs =
            Zu.CONSTRUCTOR ||
            !Vs(function (t) {
              Js.all(t).then(void 0, function () {});
            }),
          Zs = R,
          Ys = zt,
          Xs = Yu,
          $s = Pu,
          tA = ui;
        Tn(
          { target: "Promise", stat: !0, forced: Hs },
          {
            all: function (t) {
              var e = this,
                n = Xs.f(e),
                r = n.resolve,
                o = n.reject,
                i = $s(function () {
                  var n = Ys(e.resolve),
                    i = [],
                    a = 0,
                    c = 1;
                  tA(t, function (t) {
                    var u = a++,
                      s = !1;
                    c++,
                      Zs(n, e, t).then(function (t) {
                        s || ((s = !0), (i[u] = t), --c || r(i));
                      }, o);
                  }),
                    --c || r(i);
                });
              return i.error && o(i.value), n.promise;
            },
          }
        );
        var eA = Tn,
          nA = Zu.CONSTRUCTOR;
        Mu && Mu.prototype,
          eA(
            { target: "Promise", proto: !0, forced: nA, real: !0 },
            {
              catch: function (t) {
                return this.then(void 0, t);
              },
            }
          );
        var rA = R,
          oA = zt,
          iA = Yu,
          aA = Pu,
          cA = ui;
        Tn(
          { target: "Promise", stat: !0, forced: Hs },
          {
            race: function (t) {
              var e = this,
                n = iA.f(e),
                r = n.reject,
                o = aA(function () {
                  var o = oA(e.resolve);
                  cA(t, function (t) {
                    rA(o, e, t).then(n.resolve, r);
                  });
                });
              return o.error && r(o.value), n.promise;
            },
          }
        );
        var uA = R,
          sA = Yu;
        Tn(
          { target: "Promise", stat: !0, forced: Zu.CONSTRUCTOR },
          {
            reject: function (t) {
              var e = sA.f(this);
              return uA(e.reject, void 0, t), e.promise;
            },
          }
        );
        var AA = cn,
          fA = ut,
          lA = Yu,
          hA = function (t, e) {
            if ((AA(t), fA(e) && e.constructor === t)) return e;
            var n = lA.f(t);
            return (0, n.resolve)(e), n.promise;
          },
          dA = Tn,
          pA = Mu,
          gA = Zu.CONSTRUCTOR,
          mA = hA,
          vA = dt("Promise"),
          yA = !gA;
        dA(
          { target: "Promise", stat: !0, forced: !0 },
          {
            resolve: function (t) {
              return mA(yA && this === vA ? pA : this, t);
            },
          }
        );
        var wA = R,
          bA = zt,
          CA = Yu,
          IA = Pu,
          SA = ui;
        Tn(
          { target: "Promise", stat: !0, forced: Hs },
          {
            allSettled: function (t) {
              var e = this,
                n = CA.f(e),
                r = n.resolve,
                o = n.reject,
                i = IA(function () {
                  var n = bA(e.resolve),
                    o = [],
                    i = 0,
                    a = 1;
                  SA(t, function (t) {
                    var c = i++,
                      u = !1;
                    a++,
                      wA(n, e, t).then(
                        function (t) {
                          u ||
                            ((u = !0),
                            (o[c] = { status: "fulfilled", value: t }),
                            --a || r(o));
                        },
                        function (t) {
                          u ||
                            ((u = !0),
                            (o[c] = { status: "rejected", reason: t }),
                            --a || r(o));
                        }
                      );
                  }),
                    --a || r(o);
                });
              return i.error && o(i.value), n.promise;
            },
          }
        );
        var xA = R,
          EA = zt,
          _A = dt,
          BA = Yu,
          kA = Pu,
          TA = ui;
        Tn(
          { target: "Promise", stat: !0, forced: Hs },
          {
            any: function (t) {
              var e = this,
                n = _A("AggregateError"),
                r = BA.f(e),
                o = r.resolve,
                i = r.reject,
                a = kA(function () {
                  var r = EA(e.resolve),
                    a = [],
                    c = 0,
                    u = 1,
                    s = !1;
                  TA(t, function (t) {
                    var A = c++,
                      f = !1;
                    u++,
                      xA(r, e, t).then(
                        function (t) {
                          f || s || ((s = !0), o(t));
                        },
                        function (t) {
                          f ||
                            s ||
                            ((f = !0),
                            (a[A] = t),
                            --u || i(new n(a, "No one promise resolved")));
                        }
                      );
                  }),
                    --u || i(new n(a, "No one promise resolved"));
                });
              return a.error && i(a.value), r.promise;
            },
          }
        );
        var DA = Tn,
          OA = Mu,
          PA = h,
          MA = dt,
          jA = j,
          LA = kc,
          NA = hA,
          zA = OA && OA.prototype;
        DA(
          {
            target: "Promise",
            proto: !0,
            real: !0,
            forced:
              !!OA &&
              PA(function () {
                zA.finally.call({ then: function () {} }, function () {});
              }),
          },
          {
            finally: function (t) {
              var e = LA(this, MA("Promise")),
                n = jA(t);
              return this.then(
                n
                  ? function (n) {
                      return NA(e, t()).then(function () {
                        return n;
                      });
                    }
                  : t,
                n
                  ? function (n) {
                      return NA(e, t()).then(function () {
                        throw n;
                      });
                    }
                  : t
              );
            },
          }
        );
        var QA = S,
          RA = er,
          WA = fi,
          FA = nt,
          UA = QA("".charAt),
          KA = QA("".charCodeAt),
          qA = QA("".slice),
          GA = function (t) {
            return function (e, n) {
              var r,
                o,
                i = WA(FA(e)),
                a = RA(n),
                c = i.length;
              return a < 0 || a >= c
                ? t
                  ? ""
                  : void 0
                : (r = KA(i, a)) < 55296 ||
                  r > 56319 ||
                  a + 1 === c ||
                  (o = KA(i, a + 1)) < 56320 ||
                  o > 57343
                ? t
                  ? UA(i, a)
                  : r
                : t
                ? qA(i, a, a + 2)
                : o - 56320 + ((r - 55296) << 10) + 65536;
            };
          },
          VA = (GA(!1), GA(!0)),
          JA = fi,
          HA = Vi,
          ZA = Na,
          YA = za,
          XA = HA.set,
          $A = HA.getterFor("String Iterator");
        ZA(
          String,
          "String",
          function (t) {
            XA(this, { type: "String Iterator", string: JA(t), index: 0 });
          },
          function () {
            var t,
              e = $A(this),
              n = e.string,
              r = e.index;
            return r >= n.length
              ? YA(void 0, !0)
              : ((t = VA(n, r)), (e.index += t.length), YA(t, !1));
          }
        );
        var tf = st.Promise,
          ef = l,
          nf = Do,
          rf = vn,
          of = vo,
          af = me("toStringTag");
        for (var cf in {
          CSSRuleList: 0,
          CSSStyleDeclaration: 0,
          CSSValueList: 0,
          ClientRectList: 0,
          DOMRectList: 0,
          DOMStringList: 0,
          DOMTokenList: 1,
          DataTransferItemList: 0,
          FileList: 0,
          HTMLAllCollection: 0,
          HTMLCollection: 0,
          HTMLFormElement: 0,
          HTMLSelectElement: 0,
          MediaList: 0,
          MimeTypeArray: 0,
          NamedNodeMap: 0,
          NodeList: 1,
          PaintRequestList: 0,
          Plugin: 0,
          PluginArray: 0,
          SVGLengthList: 0,
          SVGNumberList: 0,
          SVGPathSegList: 0,
          SVGPointList: 0,
          SVGStringList: 0,
          SVGTransformList: 0,
          SourceBufferList: 0,
          StyleSheetList: 0,
          TextTrackCueList: 0,
          TextTrackList: 0,
          TouchList: 0,
        }) {
          var uf = ef[cf],
            sf = uf && uf.prototype;
          sf && nf(sf) !== af && rf(sf, af, cf), (of[cf] = of.Array);
        }
        var Af = tf,
          ff = Yu,
          lf = Pu;
        Tn(
          { target: "Promise", stat: !0, forced: !0 },
          {
            try: function (t) {
              var e = ff.f(this),
                n = lf(t);
              return (n.error ? e.reject : e.resolve)(n.value), e.promise;
            },
          }
        );
        var hf = Af;
        function df(t, e, n, r, o, i, a) {
          try {
            var c = t[i](a),
              u = c.value;
          } catch (t) {
            return void n(t);
          }
          c.done ? e(u) : hf.resolve(u).then(r, o);
        }
        function pf(t) {
          return function () {
            var e = this,
              n = arguments;
            return new hf(function (r, o) {
              var i = t.apply(e, n);
              function a(t) {
                df(i, r, o, a, c, "next", t);
              }
              function c(t) {
                df(i, r, o, a, c, "throw", t);
              }
              a(void 0);
            });
          };
        }
        function gf(t, e) {
          if (!(t instanceof e))
            throw new TypeError("Cannot call a class as a function");
        }
        var mf = { exports: {} },
          vf = Tn,
          yf = N,
          wf = en.f;
        vf(
          {
            target: "Object",
            stat: !0,
            forced: Object.defineProperty !== wf,
            sham: !yf,
          },
          { defineProperty: wf }
        );
        var bf = st.Object,
          Cf = (mf.exports = function (t, e, n) {
            return bf.defineProperty(t, e, n);
          });
        bf.defineProperty.sham && (Cf.sham = !0);
        var If = mf.exports,
          Sf = B,
          xf =
            Array.isArray ||
            function (t) {
              return "Array" == Sf(t);
            },
          Ef = TypeError,
          _f = function (t) {
            if (t > 9007199254740991)
              throw Ef("Maximum allowed index exceeded");
            return t;
          },
          Bf = Ee,
          kf = en,
          Tf = V,
          Df = function (t, e, n) {
            var r = Bf(e);
            r in t ? kf.f(t, r, Tf(0, n)) : (t[r] = n);
          },
          Of = xf,
          Pf = Cc,
          Mf = ut,
          jf = me("species"),
          Lf = Array,
          Nf = function (t, e) {
            return new ((function (t) {
              var e;
              return (
                Of(t) &&
                  ((e = t.constructor),
                  ((Pf(e) && (e === Lf || Of(e.prototype))) ||
                    (Mf(e) && null === (e = e[jf]))) &&
                    (e = void 0)),
                void 0 === e ? Lf : e
              );
            })(t))(0 === e ? 0 : e);
          },
          zf = h,
          Qf = It,
          Rf = me("species"),
          Wf = function (t) {
            return (
              Qf >= 51 ||
              !zf(function () {
                var e = [];
                return (
                  ((e.constructor = {})[Rf] = function () {
                    return { foo: 1 };
                  }),
                  1 !== e[t](Boolean).foo
                );
              })
            );
          },
          Ff = Tn,
          Uf = h,
          Kf = xf,
          qf = ut,
          Gf = $t,
          Vf = ur,
          Jf = _f,
          Hf = Df,
          Zf = Nf,
          Yf = Wf,
          Xf = It,
          $f = me("isConcatSpreadable"),
          tl =
            Xf >= 51 ||
            !Uf(function () {
              var t = [];
              return (t[$f] = !1), t.concat()[0] !== t;
            }),
          el = function (t) {
            if (!qf(t)) return !1;
            var e = t[$f];
            return void 0 !== e ? !!e : Kf(t);
          };
        Ff(
          {
            target: "Array",
            proto: !0,
            arity: 1,
            forced: !tl || !Yf("concat"),
          },
          {
            concat: function (t) {
              var e,
                n,
                r,
                o,
                i,
                a = Gf(this),
                c = Zf(a, 0),
                u = 0;
              for (e = -1, r = arguments.length; e < r; e++)
                if (el((i = -1 === e ? a : arguments[e])))
                  for (o = Vf(i), Jf(u + o), n = 0; n < o; n++, u++)
                    n in i && Hf(c, u, i[n]);
                else Jf(u + 1), Hf(c, u++, i);
              return (c.length = u), c;
            },
          }
        );
        var nl = {},
          rl = ir,
          ol = ur,
          il = Df,
          al = Array,
          cl = Math.max,
          ul = function (t, e, n) {
            for (
              var r = ol(t),
                o = rl(e, r),
                i = rl(void 0 === n ? r : n, r),
                a = al(cl(i - o, 0)),
                c = 0;
              o < i;
              o++, c++
            )
              il(a, c, t[o]);
            return (a.length = c), a;
          },
          sl = B,
          Al = it,
          fl = Yn.f,
          ll = ul,
          hl =
            "object" == typeof window && window && Object.getOwnPropertyNames
              ? Object.getOwnPropertyNames(window)
              : [];
        nl.f = function (t) {
          return hl && "Window" == sl(t)
            ? (function (t) {
                try {
                  return fl(t);
                } catch (t) {
                  return ll(hl);
                }
              })(t)
            : fl(Al(t));
        };
        var dl = {},
          pl = me;
        dl.f = pl;
        var gl = st,
          ml = ne,
          vl = dl,
          yl = en.f,
          wl = function (t) {
            var e = gl.Symbol || (gl.Symbol = {});
            ml(e, t) || yl(e, t, { value: vl.f(t) });
          },
          bl = R,
          Cl = dt,
          Il = me,
          Sl = ea,
          xl = function () {
            var t = Cl("Symbol"),
              e = t && t.prototype,
              n = e && e.valueOf,
              r = Il("toPrimitive");
            e &&
              !e[r] &&
              Sl(
                e,
                r,
                function (t) {
                  return bl(n, this);
                },
                { arity: 1 }
              );
          },
          El = tn,
          _l = X,
          Bl = $t,
          kl = ur,
          Tl = Nf,
          Dl = S([].push),
          Ol = function (t) {
            var e = 1 == t,
              n = 2 == t,
              r = 3 == t,
              o = 4 == t,
              i = 6 == t,
              a = 7 == t,
              c = 5 == t || i;
            return function (u, s, A, f) {
              for (
                var l,
                  h,
                  d = Bl(u),
                  p = _l(d),
                  g = El(s, A),
                  m = kl(p),
                  v = 0,
                  y = f || Tl,
                  w = e ? y(u, m) : n || a ? y(u, 0) : void 0;
                m > v;
                v++
              )
                if ((c || v in p) && ((h = g((l = p[v]), v, d)), t))
                  if (e) w[v] = h;
                  else if (h)
                    switch (t) {
                      case 3:
                        return !0;
                      case 5:
                        return l;
                      case 6:
                        return v;
                      case 2:
                        Dl(w, l);
                    }
                  else
                    switch (t) {
                      case 4:
                        return !1;
                      case 7:
                        Dl(w, l);
                    }
              return i ? -1 : r || o ? o : w;
            };
          },
          Pl = {
            forEach: Ol(0),
            map: Ol(1),
            filter: Ol(2),
            some: Ol(3),
            every: Ol(4),
            find: Ol(5),
            findIndex: Ol(6),
            filterReject: Ol(7),
          },
          Ml = Tn,
          jl = l,
          Ll = R,
          Nl = S,
          zl = N,
          Ql = Et,
          Rl = h,
          Wl = ne,
          Fl = pt,
          Ul = cn,
          Kl = it,
          ql = Ee,
          Gl = fi,
          Vl = V,
          Jl = oo,
          Hl = zr,
          Zl = Yn,
          Yl = nl,
          Xl = Sr,
          $l = L,
          th = en,
          eh = jr,
          nh = W,
          rh = ea,
          oh = Ja,
          ih = Gt.exports,
          ah = dr,
          ch = ce,
          uh = me,
          sh = dl,
          Ah = wl,
          fh = xl,
          lh = wa,
          hh = Vi,
          dh = Pl.forEach,
          ph = Mn("hidden"),
          gh = hh.set,
          mh = hh.getterFor("Symbol"),
          vh = Object.prototype,
          yh = jl.Symbol,
          wh = yh && yh.prototype,
          bh = jl.TypeError,
          Ch = jl.QObject,
          Ih = $l.f,
          Sh = th.f,
          xh = Yl.f,
          Eh = nh.f,
          _h = Nl([].push),
          Bh = ih("symbols"),
          kh = ih("op-symbols"),
          Th = ih("wks"),
          Dh = !Ch || !Ch.prototype || !Ch.prototype.findChild,
          Oh =
            zl &&
            Rl(function () {
              return (
                7 !=
                Jl(
                  Sh({}, "a", {
                    get: function () {
                      return Sh(this, "a", { value: 7 }).a;
                    },
                  })
                ).a
              );
            })
              ? function (t, e, n) {
                  var r = Ih(vh, e);
                  r && delete vh[e], Sh(t, e, n), r && t !== vh && Sh(vh, e, r);
                }
              : Sh,
          Ph = function (t, e) {
            var n = (Bh[t] = Jl(wh));
            return (
              gh(n, { type: "Symbol", tag: t, description: e }),
              zl || (n.description = e),
              n
            );
          },
          Mh = function (t, e, n) {
            t === vh && Mh(kh, e, n), Ul(t);
            var r = ql(e);
            return (
              Ul(n),
              Wl(Bh, r)
                ? (n.enumerable
                    ? (Wl(t, ph) && t[ph][r] && (t[ph][r] = !1),
                      (n = Jl(n, { enumerable: Vl(0, !1) })))
                    : (Wl(t, ph) || Sh(t, ph, Vl(1, {})), (t[ph][r] = !0)),
                  Oh(t, r, n))
                : Sh(t, r, n)
            );
          },
          jh = function (t, e) {
            Ul(t);
            var n = Kl(e),
              r = Hl(n).concat(Qh(n));
            return (
              dh(r, function (e) {
                (zl && !Ll(Lh, n, e)) || Mh(t, e, n[e]);
              }),
              t
            );
          },
          Lh = function (t) {
            var e = ql(t),
              n = Ll(Eh, this, e);
            return (
              !(this === vh && Wl(Bh, e) && !Wl(kh, e)) &&
              (!(
                n ||
                !Wl(this, e) ||
                !Wl(Bh, e) ||
                (Wl(this, ph) && this[ph][e])
              ) ||
                n)
            );
          },
          Nh = function (t, e) {
            var n = Kl(t),
              r = ql(e);
            if (n !== vh || !Wl(Bh, r) || Wl(kh, r)) {
              var o = Ih(n, r);
              return (
                !o ||
                  !Wl(Bh, r) ||
                  (Wl(n, ph) && n[ph][r]) ||
                  (o.enumerable = !0),
                o
              );
            }
          },
          zh = function (t) {
            var e = xh(Kl(t)),
              n = [];
            return (
              dh(e, function (t) {
                Wl(Bh, t) || Wl(ah, t) || _h(n, t);
              }),
              n
            );
          },
          Qh = function (t) {
            var e = t === vh,
              n = xh(e ? kh : Kl(t)),
              r = [];
            return (
              dh(n, function (t) {
                !Wl(Bh, t) || (e && !Wl(vh, t)) || _h(r, Bh[t]);
              }),
              r
            );
          };
        Ql ||
          (rh(
            (wh = (yh = function () {
              if (Fl(wh, this)) throw bh("Symbol is not a constructor");
              var t =
                  arguments.length && void 0 !== arguments[0]
                    ? Gl(arguments[0])
                    : void 0,
                e = ch(t),
                n = function (t) {
                  this === vh && Ll(n, kh, t),
                    Wl(this, ph) && Wl(this[ph], e) && (this[ph][e] = !1),
                    Oh(this, e, Vl(1, t));
                };
              return (
                zl && Dh && Oh(vh, e, { configurable: !0, set: n }), Ph(e, t)
              );
            }).prototype),
            "toString",
            function () {
              return mh(this).tag;
            }
          ),
          rh(yh, "withoutSetter", function (t) {
            return Ph(ch(t), t);
          }),
          (nh.f = Lh),
          (th.f = Mh),
          (eh.f = jh),
          ($l.f = Nh),
          (Zl.f = Yl.f = zh),
          (Xl.f = Qh),
          (sh.f = function (t) {
            return Ph(uh(t), t);
          }),
          zl &&
            oh(wh, "description", {
              configurable: !0,
              get: function () {
                return mh(this).description;
              },
            })),
          Ml(
            { global: !0, constructor: !0, wrap: !0, forced: !Ql, sham: !Ql },
            { Symbol: yh }
          ),
          dh(Hl(Th), function (t) {
            Ah(t);
          }),
          Ml(
            { target: "Symbol", stat: !0, forced: !Ql },
            {
              useSetter: function () {
                Dh = !0;
              },
              useSimple: function () {
                Dh = !1;
              },
            }
          ),
          Ml(
            { target: "Object", stat: !0, forced: !Ql, sham: !zl },
            {
              create: function (t, e) {
                return void 0 === e ? Jl(t) : jh(Jl(t), e);
              },
              defineProperty: Mh,
              defineProperties: jh,
              getOwnPropertyDescriptor: Nh,
            }
          ),
          Ml(
            { target: "Object", stat: !0, forced: !Ql },
            { getOwnPropertyNames: zh }
          ),
          fh(),
          lh(yh, "Symbol"),
          (ah[ph] = !0);
        var Rh = Et && !!Symbol.for && !!Symbol.keyFor,
          Wh = Tn,
          Fh = dt,
          Uh = ne,
          Kh = fi,
          qh = Gt.exports,
          Gh = Rh,
          Vh = qh("string-to-symbol-registry"),
          Jh = qh("symbol-to-string-registry");
        Wh(
          { target: "Symbol", stat: !0, forced: !Gh },
          {
            for: function (t) {
              var e = Kh(t);
              if (Uh(Vh, e)) return Vh[e];
              var n = Fh("Symbol")(e);
              return (Vh[e] = n), (Jh[n] = e), n;
            },
          }
        );
        var Hh = Tn,
          Zh = ne,
          Yh = Ot,
          Xh = Mt,
          $h = Rh,
          td = (0, Gt.exports)("symbol-to-string-registry");
        Hh(
          { target: "Symbol", stat: !0, forced: !$h },
          {
            keyFor: function (t) {
              if (!Yh(t)) throw TypeError(Xh(t) + " is not a symbol");
              if (Zh(td, t)) return td[t];
            },
          }
        );
        var ed = xf,
          nd = j,
          rd = B,
          od = fi,
          id = S([].push),
          ad = Tn,
          cd = dt,
          ud = y,
          sd = R,
          Ad = S,
          fd = h,
          ld = j,
          hd = Ot,
          dd = Tc,
          pd = Et,
          gd = String,
          md = cd("JSON", "stringify"),
          vd = Ad(/./.exec),
          yd = Ad("".charAt),
          wd = Ad("".charCodeAt),
          bd = Ad("".replace),
          Cd = Ad((1).toString),
          Id = /[\uD800-\uDFFF]/g,
          Sd = /^[\uD800-\uDBFF]$/,
          xd = /^[\uDC00-\uDFFF]$/,
          Ed =
            !pd ||
            fd(function () {
              var t = cd("Symbol")();
              return (
                "[null]" != md([t]) ||
                "{}" != md({ a: t }) ||
                "{}" != md(Object(t))
              );
            }),
          _d = fd(function () {
            return (
              '"\\udf06\\ud834"' !== md("\udf06\ud834") ||
              '"\\udead"' !== md("\udead")
            );
          }),
          Bd = function (t, e) {
            var n = dd(arguments),
              r = (function (t) {
                if (nd(t)) return t;
                if (ed(t)) {
                  for (var e = t.length, n = [], r = 0; r < e; r++) {
                    var o = t[r];
                    "string" == typeof o
                      ? id(n, o)
                      : ("number" != typeof o &&
                          "Number" != rd(o) &&
                          "String" != rd(o)) ||
                        id(n, od(o));
                  }
                  var i = n.length,
                    a = !0;
                  return function (t, e) {
                    if (a) return (a = !1), e;
                    if (ed(this)) return e;
                    for (var r = 0; r < i; r++) if (n[r] === t) return e;
                  };
                }
              })(e);
            if (ld(r) || (void 0 !== t && !hd(t)))
              return (
                (n[1] = function (t, e) {
                  if ((ld(r) && (e = sd(r, this, gd(t), e)), !hd(e))) return e;
                }),
                ud(md, null, n)
              );
          },
          kd = function (t, e, n) {
            var r = yd(n, e - 1),
              o = yd(n, e + 1);
            return (vd(Sd, t) && !vd(xd, o)) || (vd(xd, t) && !vd(Sd, r))
              ? "\\u" + Cd(wd(t, 0), 16)
              : t;
          };
        md &&
          ad(
            { target: "JSON", stat: !0, arity: 3, forced: Ed || _d },
            {
              stringify: function (t, e, n) {
                var r = dd(arguments),
                  o = ud(Ed ? Bd : md, null, r);
                return _d && "string" == typeof o ? bd(o, Id, kd) : o;
              },
            }
          );
        var Td = Sr,
          Dd = $t;
        Tn(
          {
            target: "Object",
            stat: !0,
            forced:
              !Et ||
              h(function () {
                Td.f(1);
              }),
          },
          {
            getOwnPropertySymbols: function (t) {
              var e = Td.f;
              return e ? e(Dd(t)) : [];
            },
          }
        ),
          wl("asyncIterator"),
          wl("hasInstance"),
          wl("isConcatSpreadable"),
          wl("iterator"),
          wl("match"),
          wl("matchAll"),
          wl("replace"),
          wl("search"),
          wl("species"),
          wl("split");
        var Od = xl;
        wl("toPrimitive"), Od();
        var Pd = dt,
          Md = wa;
        wl("toStringTag"),
          Md(Pd("Symbol"), "Symbol"),
          wl("unscopables"),
          wa(l.JSON, "JSON", !0);
        var jd = st.Symbol;
        wl("dispose");
        var Ld = jd;
        wl("asyncDispose");
        var Nd = Tn,
          zd = S,
          Qd = dt("Symbol"),
          Rd = Qd.keyFor,
          Wd = zd(Qd.prototype.valueOf);
        Nd(
          { target: "Symbol", stat: !0 },
          {
            isRegistered: function (t) {
              try {
                return void 0 !== Rd(Wd(t));
              } catch (t) {
                return !1;
              }
            },
          }
        );
        for (
          var Fd = Tn,
            Ud = Gt.exports,
            Kd = dt,
            qd = S,
            Gd = Ot,
            Vd = me,
            Jd = Kd("Symbol"),
            Hd = Jd.isWellKnown,
            Zd = Kd("Object", "getOwnPropertyNames"),
            Yd = qd(Jd.prototype.valueOf),
            Xd = Ud("wks"),
            $d = 0,
            tp = Zd(Jd),
            ep = tp.length;
          $d < ep;
          $d++
        )
          try {
            var np = tp[$d];
            Gd(Jd[np]) && Vd(np);
          } catch (t) {}
        Fd(
          { target: "Symbol", stat: !0, forced: !0 },
          {
            isWellKnown: function (t) {
              if (Hd && Hd(t)) return !0;
              try {
                for (var e = Yd(t), n = 0, r = Zd(Xd), o = r.length; n < o; n++)
                  if (Xd[r[n]] == e) return !0;
              } catch (t) {}
              return !1;
            },
          }
        ),
          wl("matcher"),
          wl("metadataKey"),
          wl("observable"),
          wl("metadata"),
          wl("patternMatch"),
          wl("replaceAll");
        var rp = Ld,
          op = dl.f("iterator");
        function ip(t) {
          return (ip =
            "function" == typeof rp && "symbol" == typeof op
              ? function (t) {
                  return typeof t;
                }
              : function (t) {
                  return t &&
                    "function" == typeof rp &&
                    t.constructor === rp &&
                    t !== rp.prototype
                    ? "symbol"
                    : typeof t;
                })(t);
        }
        var ap = dl.f("toPrimitive");
        function cp(t) {
          var e = (function (t, e) {
            if ("object" !== ip(t) || null === t) return t;
            var n = t[ap];
            if (void 0 !== n) {
              var r = n.call(t, "string");
              if ("object" !== ip(r)) return r;
              throw new TypeError(
                "@@toPrimitive must return a primitive value."
              );
            }
            return String(t);
          })(t);
          return "symbol" === ip(e) ? e : String(e);
        }
        function up(t, e) {
          for (var n = 0; n < e.length; n++) {
            var r = e[n];
            (r.enumerable = r.enumerable || !1),
              (r.configurable = !0),
              "value" in r && (r.writable = !0),
              If(t, cp(r.key), r);
          }
        }
        function sp(t, e, n) {
          return (
            e && up(t.prototype, e),
            n && up(t, n),
            If(t, "prototype", { writable: !1 }),
            t
          );
        }
        var Ap = l;
        Tn({ global: !0, forced: Ap.globalThis !== Ap }, { globalThis: Ap });
        var fp = l,
          lp = { exports: {} },
          hp = { exports: {} };
        !(function (t) {
          var e = rp,
            n = op;
          function r(o) {
            return (
              (t.exports = r =
                "function" == typeof e && "symbol" == typeof n
                  ? function (t) {
                      return typeof t;
                    }
                  : function (t) {
                      return t &&
                        "function" == typeof e &&
                        t.constructor === e &&
                        t !== e.prototype
                        ? "symbol"
                        : typeof t;
                    }),
              (t.exports.__esModule = !0),
              (t.exports.default = t.exports),
              r(o)
            );
          }
          (t.exports = r),
            (t.exports.__esModule = !0),
            (t.exports.default = t.exports);
        })(hp),
          Tn({ target: "Object", stat: !0, sham: !N }, { create: oo });
        var dp = st.Object,
          pp = function (t, e) {
            return dp.create(t, e);
          },
          gp = $t,
          mp = Un,
          vp = jn;
        Tn(
          {
            target: "Object",
            stat: !0,
            forced: h(function () {
              mp(1);
            }),
            sham: !vp,
          },
          {
            getPrototypeOf: function (t) {
              return mp(gp(t));
            },
          }
        );
        var yp = st.Object.getPrototypeOf,
          wp = h,
          bp = function (t, e) {
            var n = [][t];
            return (
              !!n &&
              wp(function () {
                n.call(
                  null,
                  e ||
                    function () {
                      return 1;
                    },
                  1
                );
              })
            );
          },
          Cp = Pl.forEach,
          Ip = bp("forEach")
            ? [].forEach
            : function (t) {
                return Cp(
                  this,
                  t,
                  arguments.length > 1 ? arguments[1] : void 0
                );
              };
        Tn(
          { target: "Array", proto: !0, forced: [].forEach != Ip },
          { forEach: Ip }
        );
        var Sp = st,
          xp = function (t) {
            return Sp[t + "Prototype"];
          },
          Ep = xp("Array").forEach,
          _p = Do,
          Bp = ne,
          kp = pt,
          Tp = Ep,
          Dp = Array.prototype,
          Op = { DOMTokenList: !0, NodeList: !0 },
          Pp = function (t) {
            var e = t.forEach;
            return t === Dp || (kp(Dp, t) && e === Dp.forEach) || Bp(Op, _p(t))
              ? Tp
              : e;
          };
        Tn({ target: "Object", stat: !0 }, { setPrototypeOf: Zn });
        var Mp = st.Object.setPrototypeOf,
          jp = Tn,
          Lp = xf,
          Np = S([].reverse),
          zp = [1, 2];
        jp(
          {
            target: "Array",
            proto: !0,
            forced: String(zp) === String(zp.reverse()),
          },
          {
            reverse: function () {
              return Lp(this) && (this.length = this.length), Np(this);
            },
          }
        );
        var Qp = xp("Array").reverse,
          Rp = pt,
          Wp = Qp,
          Fp = Array.prototype,
          Up = function (t) {
            var e = t.reverse;
            return t === Fp || (Rp(Fp, t) && e === Fp.reverse) ? Wp : e;
          },
          Kp = Tn,
          qp = xf,
          Gp = Cc,
          Vp = ut,
          Jp = ir,
          Hp = ur,
          Zp = it,
          Yp = Df,
          Xp = me,
          $p = Tc,
          tg = Wf("slice"),
          eg = Xp("species"),
          ng = Array,
          rg = Math.max;
        Kp(
          { target: "Array", proto: !0, forced: !tg },
          {
            slice: function (t, e) {
              var n,
                r,
                o,
                i = Zp(this),
                a = Hp(i),
                c = Jp(t, a),
                u = Jp(void 0 === e ? a : e, a);
              if (
                qp(i) &&
                ((n = i.constructor),
                ((Gp(n) && (n === ng || qp(n.prototype))) ||
                  (Vp(n) && null === (n = n[eg]))) &&
                  (n = void 0),
                n === ng || void 0 === n)
              )
                return $p(i, c, u);
              for (
                r = new (void 0 === n ? ng : n)(rg(u - c, 0)), o = 0;
                c < u;
                c++, o++
              )
                c in i && Yp(r, o, i[c]);
              return (r.length = o), r;
            },
          }
        );
        var og = xp("Array").slice,
          ig = pt,
          ag = og,
          cg = Array.prototype,
          ug = function (t) {
            var e = t.slice;
            return t === cg || (ig(cg, t) && e === cg.slice) ? ag : e;
          };
        !(function (t) {
          var e = hp.exports.default,
            n = If,
            r = rp,
            o = pp,
            i = yp,
            a = Pp,
            c = Mp,
            u = hf,
            s = Up,
            A = ug;
          function f() {
            (t.exports = f =
              function () {
                return l;
              }),
              (t.exports.__esModule = !0),
              (t.exports.default = t.exports);
            var l = {},
              h = Object.prototype,
              d = h.hasOwnProperty,
              p =
                n ||
                function (t, e, n) {
                  t[e] = n.value;
                },
              g = "function" == typeof r ? r : {},
              m = g.iterator || "@@iterator",
              v = g.asyncIterator || "@@asyncIterator",
              y = g.toStringTag || "@@toStringTag";
            function w(t, e, r) {
              return (
                n(t, e, {
                  value: r,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                }),
                t[e]
              );
            }
            try {
              w({}, "");
            } catch (t) {
              w = function (t, e, n) {
                return (t[e] = n);
              };
            }
            function b(t, e, n, r) {
              var i = e && e.prototype instanceof S ? e : S,
                a = o(i.prototype),
                c = new L(r || []);
              return p(a, "_invoke", { value: O(t, n, c) }), a;
            }
            function C(t, e, n) {
              try {
                return { type: "normal", arg: t.call(e, n) };
              } catch (t) {
                return { type: "throw", arg: t };
              }
            }
            l.wrap = b;
            var I = {};
            function S() {}
            function x() {}
            function E() {}
            var _ = {};
            w(_, m, function () {
              return this;
            });
            var B = i && i(i(N([])));
            B && B !== h && d.call(B, m) && (_ = B);
            var k = (E.prototype = S.prototype = o(_));
            function T(t) {
              var e;
              a((e = ["next", "throw", "return"])).call(e, function (e) {
                w(t, e, function (t) {
                  return this._invoke(e, t);
                });
              });
            }
            function D(t, n) {
              function r(o, i, a, c) {
                var u = C(t[o], t, i);
                if ("throw" !== u.type) {
                  var s = u.arg,
                    A = s.value;
                  return A && "object" == e(A) && d.call(A, "__await")
                    ? n.resolve(A.__await).then(
                        function (t) {
                          r("next", t, a, c);
                        },
                        function (t) {
                          r("throw", t, a, c);
                        }
                      )
                    : n.resolve(A).then(
                        function (t) {
                          (s.value = t), a(s);
                        },
                        function (t) {
                          return r("throw", t, a, c);
                        }
                      );
                }
                c(u.arg);
              }
              var o;
              p(this, "_invoke", {
                value: function (t, e) {
                  function i() {
                    return new n(function (n, o) {
                      r(t, e, n, o);
                    });
                  }
                  return (o = o ? o.then(i, i) : i());
                },
              });
            }
            function O(t, e, n) {
              var r = "suspendedStart";
              return function (o, i) {
                if ("executing" === r)
                  throw new Error("Generator is already running");
                if ("completed" === r) {
                  if ("throw" === o) throw i;
                  return { value: void 0, done: !0 };
                }
                for (n.method = o, n.arg = i; ; ) {
                  var a = n.delegate;
                  if (a) {
                    var c = P(a, n);
                    if (c) {
                      if (c === I) continue;
                      return c;
                    }
                  }
                  if ("next" === n.method) n.sent = n._sent = n.arg;
                  else if ("throw" === n.method) {
                    if ("suspendedStart" === r)
                      throw ((r = "completed"), n.arg);
                    n.dispatchException(n.arg);
                  } else "return" === n.method && n.abrupt("return", n.arg);
                  r = "executing";
                  var u = C(t, e, n);
                  if ("normal" === u.type) {
                    if (
                      ((r = n.done ? "completed" : "suspendedYield"),
                      u.arg === I)
                    )
                      continue;
                    return { value: u.arg, done: n.done };
                  }
                  "throw" === u.type &&
                    ((r = "completed"), (n.method = "throw"), (n.arg = u.arg));
                }
              };
            }
            function P(t, e) {
              var n = e.method,
                r = t.iterator[n];
              if (void 0 === r)
                return (
                  (e.delegate = null),
                  ("throw" === n &&
                    t.iterator.return &&
                    ((e.method = "return"),
                    (e.arg = void 0),
                    P(t, e),
                    "throw" === e.method)) ||
                    ("return" !== n &&
                      ((e.method = "throw"),
                      (e.arg = new TypeError(
                        "The iterator does not provide a '" + n + "' method"
                      )))),
                  I
                );
              var o = C(r, t.iterator, e.arg);
              if ("throw" === o.type)
                return (
                  (e.method = "throw"), (e.arg = o.arg), (e.delegate = null), I
                );
              var i = o.arg;
              return i
                ? i.done
                  ? ((e[t.resultName] = i.value),
                    (e.next = t.nextLoc),
                    "return" !== e.method &&
                      ((e.method = "next"), (e.arg = void 0)),
                    (e.delegate = null),
                    I)
                  : i
                : ((e.method = "throw"),
                  (e.arg = new TypeError("iterator result is not an object")),
                  (e.delegate = null),
                  I);
            }
            function M(t) {
              var e = { tryLoc: t[0] };
              1 in t && (e.catchLoc = t[1]),
                2 in t && ((e.finallyLoc = t[2]), (e.afterLoc = t[3])),
                this.tryEntries.push(e);
            }
            function j(t) {
              var e = t.completion || {};
              (e.type = "normal"), delete e.arg, (t.completion = e);
            }
            function L(t) {
              (this.tryEntries = [{ tryLoc: "root" }]),
                a(t).call(t, M, this),
                this.reset(!0);
            }
            function N(t) {
              if (t) {
                var e = t[m];
                if (e) return e.call(t);
                if ("function" == typeof t.next) return t;
                if (!isNaN(t.length)) {
                  var n = -1,
                    r = function e() {
                      for (; ++n < t.length; )
                        if (d.call(t, n))
                          return (e.value = t[n]), (e.done = !1), e;
                      return (e.value = void 0), (e.done = !0), e;
                    };
                  return (r.next = r);
                }
              }
              return { next: z };
            }
            function z() {
              return { value: void 0, done: !0 };
            }
            return (
              (x.prototype = E),
              p(k, "constructor", { value: E, configurable: !0 }),
              p(E, "constructor", { value: x, configurable: !0 }),
              (x.displayName = w(E, y, "GeneratorFunction")),
              (l.isGeneratorFunction = function (t) {
                var e = "function" == typeof t && t.constructor;
                return (
                  !!e &&
                  (e === x || "GeneratorFunction" === (e.displayName || e.name))
                );
              }),
              (l.mark = function (t) {
                return (
                  c
                    ? c(t, E)
                    : ((t.__proto__ = E), w(t, y, "GeneratorFunction")),
                  (t.prototype = o(k)),
                  t
                );
              }),
              (l.awrap = function (t) {
                return { __await: t };
              }),
              T(D.prototype),
              w(D.prototype, v, function () {
                return this;
              }),
              (l.AsyncIterator = D),
              (l.async = function (t, e, n, r, o) {
                void 0 === o && (o = u);
                var i = new D(b(t, e, n, r), o);
                return l.isGeneratorFunction(e)
                  ? i
                  : i.next().then(function (t) {
                      return t.done ? t.value : i.next();
                    });
              }),
              T(k),
              w(k, y, "Generator"),
              w(k, m, function () {
                return this;
              }),
              w(k, "toString", function () {
                return "[object Generator]";
              }),
              (l.keys = function (t) {
                var e = Object(t),
                  n = [];
                for (var r in e) n.push(r);
                return (
                  s(n).call(n),
                  function t() {
                    for (; n.length; ) {
                      var r = n.pop();
                      if (r in e) return (t.value = r), (t.done = !1), t;
                    }
                    return (t.done = !0), t;
                  }
                );
              }),
              (l.values = N),
              (L.prototype = {
                constructor: L,
                reset: function (t) {
                  var e;
                  if (
                    ((this.prev = 0),
                    (this.next = 0),
                    (this.sent = this._sent = void 0),
                    (this.done = !1),
                    (this.delegate = null),
                    (this.method = "next"),
                    (this.arg = void 0),
                    a((e = this.tryEntries)).call(e, j),
                    !t)
                  )
                    for (var n in this)
                      "t" === n.charAt(0) &&
                        d.call(this, n) &&
                        !isNaN(+A(n).call(n, 1)) &&
                        (this[n] = void 0);
                },
                stop: function () {
                  this.done = !0;
                  var t = this.tryEntries[0].completion;
                  if ("throw" === t.type) throw t.arg;
                  return this.rval;
                },
                dispatchException: function (t) {
                  if (this.done) throw t;
                  var e = this;
                  function n(n, r) {
                    return (
                      (i.type = "throw"),
                      (i.arg = t),
                      (e.next = n),
                      r && ((e.method = "next"), (e.arg = void 0)),
                      !!r
                    );
                  }
                  for (var r = this.tryEntries.length - 1; r >= 0; --r) {
                    var o = this.tryEntries[r],
                      i = o.completion;
                    if ("root" === o.tryLoc) return n("end");
                    if (o.tryLoc <= this.prev) {
                      var a = d.call(o, "catchLoc"),
                        c = d.call(o, "finallyLoc");
                      if (a && c) {
                        if (this.prev < o.catchLoc) return n(o.catchLoc, !0);
                        if (this.prev < o.finallyLoc) return n(o.finallyLoc);
                      } else if (a) {
                        if (this.prev < o.catchLoc) return n(o.catchLoc, !0);
                      } else {
                        if (!c)
                          throw new Error(
                            "try statement without catch or finally"
                          );
                        if (this.prev < o.finallyLoc) return n(o.finallyLoc);
                      }
                    }
                  }
                },
                abrupt: function (t, e) {
                  for (var n = this.tryEntries.length - 1; n >= 0; --n) {
                    var r = this.tryEntries[n];
                    if (
                      r.tryLoc <= this.prev &&
                      d.call(r, "finallyLoc") &&
                      this.prev < r.finallyLoc
                    ) {
                      var o = r;
                      break;
                    }
                  }
                  o &&
                    ("break" === t || "continue" === t) &&
                    o.tryLoc <= e &&
                    e <= o.finallyLoc &&
                    (o = null);
                  var i = o ? o.completion : {};
                  return (
                    (i.type = t),
                    (i.arg = e),
                    o
                      ? ((this.method = "next"), (this.next = o.finallyLoc), I)
                      : this.complete(i)
                  );
                },
                complete: function (t, e) {
                  if ("throw" === t.type) throw t.arg;
                  return (
                    "break" === t.type || "continue" === t.type
                      ? (this.next = t.arg)
                      : "return" === t.type
                      ? ((this.rval = this.arg = t.arg),
                        (this.method = "return"),
                        (this.next = "end"))
                      : "normal" === t.type && e && (this.next = e),
                    I
                  );
                },
                finish: function (t) {
                  for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                    var n = this.tryEntries[e];
                    if (n.finallyLoc === t)
                      return this.complete(n.completion, n.afterLoc), j(n), I;
                  }
                },
                catch: function (t) {
                  for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                    var n = this.tryEntries[e];
                    if (n.tryLoc === t) {
                      var r = n.completion;
                      if ("throw" === r.type) {
                        var o = r.arg;
                        j(n);
                      }
                      return o;
                    }
                  }
                  throw new Error("illegal catch attempt");
                },
                delegateYield: function (t, e, n) {
                  return (
                    (this.delegate = {
                      iterator: N(t),
                      resultName: e,
                      nextLoc: n,
                    }),
                    "next" === this.method && (this.arg = void 0),
                    I
                  );
                },
              }),
              l
            );
          }
          (t.exports = f),
            (t.exports.__esModule = !0),
            (t.exports.default = t.exports);
        })(lp);
        var sg = lp.exports(),
          Ag = sg;
        try {
          regeneratorRuntime = sg;
        } catch (t) {
          "object" === (void 0 === fp ? "undefined" : ip(fp))
            ? (fp.regeneratorRuntime = sg)
            : Function("r", "regeneratorRuntime = r")(sg);
        }
        var fg = N,
          lg = S,
          hg = R,
          dg = h,
          pg = zr,
          gg = Sr,
          mg = W,
          vg = $t,
          yg = X,
          wg = Object.assign,
          bg = Object.defineProperty,
          Cg = lg([].concat),
          Ig =
            !wg ||
            dg(function () {
              if (
                fg &&
                1 !==
                  wg(
                    { b: 1 },
                    wg(
                      bg({}, "a", {
                        enumerable: !0,
                        get: function () {
                          bg(this, "b", { value: 3, enumerable: !1 });
                        },
                      }),
                      { b: 2 }
                    )
                  ).b
              )
                return !0;
              var t = {},
                e = {},
                n = Symbol(),
                r = "abcdefghijklmnopqrst";
              return (
                (t[n] = 7),
                r.split("").forEach(function (t) {
                  e[t] = t;
                }),
                7 != wg({}, t)[n] || pg(wg({}, e)).join("") != r
              );
            })
              ? function (t, e) {
                  for (
                    var n = vg(t),
                      r = arguments.length,
                      o = 1,
                      i = gg.f,
                      a = mg.f;
                    r > o;

                  )
                    for (
                      var c,
                        u = yg(arguments[o++]),
                        s = i ? Cg(pg(u), i(u)) : pg(u),
                        A = s.length,
                        f = 0;
                      A > f;

                    )
                      (c = s[f++]), (fg && !hg(a, u, c)) || (n[c] = u[c]);
                  return n;
                }
              : wg;
        Tn(
          {
            target: "Object",
            stat: !0,
            arity: 2,
            forced: Object.assign !== Ig,
          },
          { assign: Ig }
        );
        var Sg = st.Object.assign,
          xg = xp("Array").concat,
          Eg = pt,
          _g = xg,
          Bg = Array.prototype,
          kg = function (t) {
            var e = t.concat;
            return t === Bg || (Eg(Bg, t) && e === Bg.concat) ? _g : e;
          },
          Tg = Tn,
          Dg = hr.indexOf,
          Og = bp,
          Pg = D([].indexOf),
          Mg = !!Pg && 1 / Pg([1], 1, -0) < 0;
        Tg(
          { target: "Array", proto: !0, forced: Mg || !Og("indexOf") },
          {
            indexOf: function (t) {
              var e = arguments.length > 1 ? arguments[1] : void 0;
              return Mg ? Pg(this, t, e) || 0 : Dg(this, t, e);
            },
          }
        );
        var jg = xp("Array").indexOf,
          Lg = pt,
          Ng = jg,
          zg = Array.prototype,
          Qg = function (t) {
            var e = t.indexOf;
            return t === zg || (Lg(zg, t) && e === zg.indexOf) ? Ng : e;
          },
          Rg = Pl.map;
        Tn(
          { target: "Array", proto: !0, forced: !Wf("map") },
          {
            map: function (t) {
              return Rg(this, t, arguments.length > 1 ? arguments[1] : void 0);
            },
          }
        );
        var Wg = xp("Array").map,
          Fg = pt,
          Ug = Wg,
          Kg = Array.prototype,
          qg = function (t) {
            var e = t.map;
            return t === Kg || (Fg(Kg, t) && e === Kg.map) ? Ug : e;
          },
          Gg = st,
          Vg = y;
        Gg.JSON || (Gg.JSON = { stringify: JSON.stringify });
        var Jg = function (t, e, n) {
            return Vg(Gg.JSON.stringify, null, arguments);
          },
          Hg = nt,
          Zg = fi,
          Yg = S("".replace),
          Xg = RegExp("^[\t\n\v\f\r                　\u2028\u2029\ufeff]+"),
          $g = RegExp(
            "(^|[^\t\n\v\f\r                　\u2028\u2029\ufeff])[\t\n\v\f\r                　\u2028\u2029\ufeff]+$"
          ),
          tm = function (t) {
            return function (e) {
              var n = Zg(Hg(e));
              return (
                1 & t && (n = Yg(n, Xg, "")), 2 & t && (n = Yg(n, $g, "$1")), n
              );
            };
          },
          em = { start: tm(1), end: tm(2), trim: tm(3) },
          nm = l,
          rm = h,
          om = S,
          im = fi,
          am = em.trim,
          cm = nm.parseInt,
          um = nm.Symbol,
          sm = um && um.iterator,
          Am = /^[+-]?0x/i,
          fm = om(Am.exec),
          lm =
            8 !== cm("\t\n\v\f\r                　\u2028\u2029\ufeff08") ||
            22 !== cm("\t\n\v\f\r                　\u2028\u2029\ufeff0x16") ||
            (sm &&
              !rm(function () {
                cm(Object(sm));
              }))
              ? function (t, e) {
                  var n = am(im(t));
                  return cm(n, e >>> 0 || (fm(Am, n) ? 16 : 10));
                }
              : cm;
        Tn({ global: !0, forced: parseInt != lm }, { parseInt: lm });
        var hm = st.parseInt,
          dm = Pl.filter;
        Tn(
          { target: "Array", proto: !0, forced: !Wf("filter") },
          {
            filter: function (t) {
              return dm(this, t, arguments.length > 1 ? arguments[1] : void 0);
            },
          }
        );
        var pm = xp("Array").filter,
          gm = pt,
          mm = pm,
          vm = Array.prototype,
          ym = function (t) {
            var e = t.filter;
            return t === vm || (gm(vm, t) && e === vm.filter) ? mm : e;
          },
          wm = Mt,
          bm = TypeError,
          Cm = function (t, e) {
            if (!delete t[e])
              throw bm("Cannot delete property " + wm(e) + " of " + wm(t));
          },
          Im = ul,
          Sm = Math.floor,
          xm = function (t, e) {
            var n = t.length,
              r = Sm(n / 2);
            return n < 8
              ? Em(t, e)
              : _m(t, xm(Im(t, 0, r), e), xm(Im(t, r), e), e);
          },
          Em = function (t, e) {
            for (var n, r, o = t.length, i = 1; i < o; ) {
              for (r = i, n = t[i]; r && e(t[r - 1], n) > 0; ) t[r] = t[--r];
              r !== i++ && (t[r] = n);
            }
            return t;
          },
          _m = function (t, e, n, r) {
            for (var o = e.length, i = n.length, a = 0, c = 0; a < o || c < i; )
              t[a + c] =
                a < o && c < i
                  ? r(e[a], n[c]) <= 0
                    ? e[a++]
                    : n[c++]
                  : a < o
                  ? e[a++]
                  : n[c++];
            return t;
          },
          Bm = xm,
          km = gt.match(/firefox\/(\d+)/i),
          Tm = !!km && +km[1],
          Dm = /MSIE|Trident/.test(gt),
          Om = gt.match(/AppleWebKit\/(\d+)\./),
          Pm = !!Om && +Om[1],
          Mm = Tn,
          jm = S,
          Lm = zt,
          Nm = $t,
          zm = ur,
          Qm = Cm,
          Rm = fi,
          Wm = h,
          Fm = Bm,
          Um = bp,
          Km = Tm,
          qm = Dm,
          Gm = It,
          Vm = Pm,
          Jm = [],
          Hm = jm(Jm.sort),
          Zm = jm(Jm.push),
          Ym = Wm(function () {
            Jm.sort(void 0);
          }),
          Xm = Wm(function () {
            Jm.sort(null);
          }),
          $m = Um("sort"),
          tv = !Wm(function () {
            if (Gm) return Gm < 70;
            if (!(Km && Km > 3)) {
              if (qm) return !0;
              if (Vm) return Vm < 603;
              var t,
                e,
                n,
                r,
                o = "";
              for (t = 65; t < 76; t++) {
                switch (((e = String.fromCharCode(t)), t)) {
                  case 66:
                  case 69:
                  case 70:
                  case 72:
                    n = 3;
                    break;
                  case 68:
                  case 71:
                    n = 4;
                    break;
                  default:
                    n = 2;
                }
                for (r = 0; r < 47; r++) Jm.push({ k: e + r, v: n });
              }
              for (
                Jm.sort(function (t, e) {
                  return e.v - t.v;
                }),
                  r = 0;
                r < Jm.length;
                r++
              )
                (e = Jm[r].k.charAt(0)),
                  o.charAt(o.length - 1) !== e && (o += e);
              return "DGBEFHACIJK" !== o;
            }
          });
        Mm(
          { target: "Array", proto: !0, forced: Ym || !Xm || !$m || !tv },
          {
            sort: function (t) {
              void 0 !== t && Lm(t);
              var e = Nm(this);
              if (tv) return void 0 === t ? Hm(e) : Hm(e, t);
              var n,
                r,
                o = [],
                i = zm(e);
              for (r = 0; r < i; r++) r in e && Zm(o, e[r]);
              for (
                Fm(
                  o,
                  (function (t) {
                    return function (e, n) {
                      return void 0 === n
                        ? -1
                        : void 0 === e
                        ? 1
                        : void 0 !== t
                        ? +t(e, n) || 0
                        : Rm(e) > Rm(n)
                        ? 1
                        : -1;
                    };
                  })(t)
                ),
                  n = zm(o),
                  r = 0;
                r < n;

              )
                e[r] = o[r++];
              for (; r < i; ) Qm(e, r++);
              return e;
            },
          }
        );
        var ev = xp("Array").sort,
          nv = pt,
          rv = ev,
          ov = Array.prototype,
          iv = function (t) {
            var e = t.sort;
            return t === ov || (nv(ov, t) && e === ov.sort) ? rv : e;
          },
          av = $t,
          cv = zr;
        Tn(
          {
            target: "Object",
            stat: !0,
            forced: h(function () {
              cv(1);
            }),
          },
          {
            keys: function (t) {
              return cv(av(t));
            },
          }
        );
        var uv = st.Object.keys,
          sv = Tn,
          Av = Date,
          fv = S(Av.prototype.getTime);
        sv(
          { target: "Date", stat: !0 },
          {
            now: function () {
              return fv(new Av());
            },
          }
        );
        var lv = st.Date.now,
          hv =
            "function" == typeof Bun && Bun && "string" == typeof Bun.version,
          dv = l,
          pv = y,
          gv = j,
          mv = hv,
          vv = gt,
          yv = Tc,
          wv = Oc,
          bv = dv.Function,
          Cv =
            /MSIE .\./.test(vv) ||
            (mv &&
              (function () {
                var t = dv.Bun.version.split(".");
                return (
                  t.length < 3 ||
                  (0 == t[0] && (t[1] < 3 || (3 == t[1] && 0 == t[2])))
                );
              })()),
          Iv = function (t, e) {
            var n = e ? 2 : 1;
            return Cv
              ? function (r, o) {
                  var i = wv(arguments.length, 1) > n,
                    a = gv(r) ? r : bv(r),
                    c = i ? yv(arguments, n) : [],
                    u = i
                      ? function () {
                          pv(a, this, c);
                        }
                      : a;
                  return e ? t(u, o) : t(u);
                }
              : t;
          },
          Sv = Tn,
          xv = l,
          Ev = Iv(xv.setInterval, !0);
        Sv(
          { global: !0, bind: !0, forced: xv.setInterval !== Ev },
          { setInterval: Ev }
        );
        var _v = Tn,
          Bv = l,
          kv = Iv(Bv.setTimeout, !0);
        _v(
          { global: !0, bind: !0, forced: Bv.setTimeout !== kv },
          { setTimeout: kv }
        );
        var Tv,
          Dv,
          Ov = st.setTimeout,
          Pv = { exports: {} },
          Mv = new ((function () {
            function t() {
              gf(this, t), (this.data = {});
            }
            return (
              sp(t, [
                {
                  key: "getItem",
                  value: function (t) {
                    return this.data[t];
                  },
                },
                {
                  key: "setItem",
                  value: function (t, e) {
                    this.data[t] = e;
                  },
                },
                {
                  key: "removeItem",
                  value: function (t) {
                    delete this.data[t];
                  },
                },
                {
                  key: "clear",
                  value: function () {
                    this.data = {};
                  },
                },
              ]),
              t
            );
          })())(),
          jv =
            ((Tv = window.localStorage),
            {
              setItem: function (t, e, n, r) {
                var o,
                  i = {
                    v: e,
                    t: new Date().getTime(),
                    e: "number" != typeof n ? 0 : n,
                  };
                try {
                  o = Jg(i);
                } catch (t) {}
                Mv.setItem(t, o);
                try {
                  Tv.setItem(t, o), r && r(0);
                } catch (e) {
                  r && r(1),
                    Ov(function () {
                      try {
                        Tv.setItem(t, o);
                      } catch (t) {}
                    }, 0);
                }
              },
              getItem: function (t) {
                var e,
                  n =
                    arguments.length > 1 && void 0 !== arguments[1]
                      ? arguments[1]
                      : 0,
                  r = Mv.getItem(t);
                try {
                  (r && 1 !== n) || ((r = Tv.getItem(t)) && Mv.setItem(t, r));
                } catch (t) {}
                if (!r) return "";
                try {
                  e = JSON.parse(r);
                } catch (t) {}
                return !e ||
                  !e.t ||
                  !e.e ||
                  0 === e.e ||
                  new Date() - e.t >= 1e3 * e.e
                  ? (Dv(t), "")
                  : e.v;
              },
              removeItem: (Dv = function (t) {
                try {
                  Mv.removeItem(t), Tv.removeItem(t);
                } catch (t) {}
              }),
            }),
          Lv = {
            getSync: function (t) {
              var e,
                n =
                  arguments.length > 1 && void 0 !== arguments[1]
                    ? arguments[1]
                    : 0;
              try {
                e = jv.getItem(t, n);
              } catch (t) {}
              return e;
            },
            setSync: function (t, e, n, r) {
              jv.setItem(t, e, n.expire, r);
            },
            removeSync: function (t) {
              jv.removeItem(t);
            },
          },
          Nv = (function (t, e) {
            return (
              e.forEach(function (e) {
                e &&
                  "string" != typeof e &&
                  !Array.isArray(e) &&
                  Object.keys(e).forEach(function (n) {
                    if ("default" !== n && !(n in t)) {
                      var r = Object.getOwnPropertyDescriptor(e, n);
                      Object.defineProperty(
                        t,
                        n,
                        r.get
                          ? r
                          : {
                              enumerable: !0,
                              get: function () {
                                return e[n];
                              },
                            }
                      );
                    }
                  });
              }),
              Object.freeze(t)
            );
          })({ __proto__: null, default: Lv }, [Lv]);
        function zv(t, e) {
          return (
            Object.prototype.toString.call(t) === "[object ".concat(e, "]")
          );
        }
        function Qv() {
          var t,
            e =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : {},
            n = e.size,
            r = void 0 === n ? 10 : n,
            o = e.dictType,
            i = void 0 === o ? "number" : o,
            a = e.customDict,
            c = "";
          if (a && "string" == typeof a) t = a;
          else
            switch (i) {
              case "alphabet":
                t = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
                break;
              case "max":
                t =
                  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-";
                break;
              default:
                t = "0123456789";
            }
          for (; r--; ) c += t[(Math.random() * t.length) | 0];
          return c;
        }
        function Rv() {}
        function Wv(t) {
          return "string" == typeof t;
        }
        function Fv(t) {
          return "function" == typeof t;
        }
        function Uv(t) {
          var e = ip(t);
          return (
            ("number" == e && !isNaN(t)) || "string" == e || "boolean" == e
          );
        }
        var Kv = ["h5st", "_stk", "_ste"];
        function qv(t) {
          for (var e = uv(t), n = 0; n < e.length; n++) {
            var r = e[n];
            if (Qg(Kv).call(Kv, r) >= 0) return !0;
          }
          return !1;
        }
        function Gv(t, e) {
          e = e || 0;
          for (var n = t.length - e, r = new Array(n); n--; ) r[n] = t[n + e];
          return r;
        }
        function Vv(t) {
          return (t + ug("===").call("===", (t.length + 3) % 4))
            .replace(/-/g, "+")
            .replace(/_/g, "/");
        }
        function Jv(t) {
          return t.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
        }
        function Hv(t) {
          if (t) {
            for (
              var e = arguments.length, n = new Array(e > 1 ? e - 1 : 0), r = 1;
              r < e;
              r++
            )
              n[r - 1] = arguments[r];
            Gv(n);
          }
        }
        var Zv = Lv,
          Yv = encodeURIComponent,
          Xv = A(
            Object.freeze({
              __proto__: null,
              isValidWID: function (t) {
                var e = hm(t);
                return (
                  t &&
                  zv(t, "String") &&
                  e &&
                  zv(e, "Number") &&
                  t.length >= 9 &&
                  t.length <= 12
                );
              },
              formatString: function (t) {
                var e = t.str,
                  n = t.len,
                  r = t.ele,
                  o = void 0 === r ? "0" : r,
                  i = t.type,
                  a = void 0 === i ? "prefix" : i;
                if (
                  !(
                    zv(e, "String") &&
                    n &&
                    zv(n, "Number") &&
                    zv(o, "String") &&
                    1 === o.length
                  )
                )
                  throw new Error("==>formatString：输入不合法。");
                for (var c = e.length, u = "", s = 0; s < n - c; s++) u += o;
                return "prefix" === a ? u + e : e + u;
              },
              isType: zv,
              getRandomIDPro: Qv,
              noop: Rv,
              isString: Wv,
              isFunction: Fv,
              umpBiz: function () {},
              isSafeParamValue: Uv,
              RESERVED_PARAM_NAMES: Kv,
              containsReservedParamName: qv,
              toArray: Gv,
              toBase64: Vv,
              fromBase64: Jv,
              log: Hv,
              assign: function (t) {
                if (null == t)
                  throw new TypeError(
                    "Cannot convert undefined or null to object"
                  );
                t = Object(t);
                for (var e = 1; e < arguments.length; e++) {
                  var n = arguments[e];
                  if (null != n)
                    for (var r in n)
                      Object.prototype.hasOwnProperty.call(n, r) &&
                        (t[r] = n[r]);
                }
                return t;
              },
            })
          ).log,
          $v = {
            method: "GET",
            retry: 0,
            noToken: !1,
            header: null,
            encoding: "utf-8",
            xhr: function () {
              return new window.XMLHttpRequest();
            },
            dataType: "json",
            accepts: {
              script:
                "text/javascript, application/javascript, application/x-javascript",
              json: "application/json",
              xml: "application/xml, text/xml",
              html: "text/html",
              text: "text/plain",
            },
            crossDomain: !1,
            timeout: 8,
            expire: !1,
            setReportUrl: "",
          },
          ty = window;
        if (!ty.callbackName) {
          for (
            var ey = [
                "A",
                "B",
                "C",
                "D",
                "E",
                "F",
                "G",
                "H",
                "I",
                "J",
                "K",
                "L",
                "M",
                "N",
                "O",
                "P",
                "Q",
                "R",
                "S",
                "T",
                "U",
                "V",
                "W",
                "X",
                "Y",
                "Z",
              ],
              ny = 0;
            ny < 3;
            ny++
          )
            for (var ry = 0; ry < 26; ry++) ey.push(ey[26 * ny + ry] + ey[ry]);
          ty.callbackName = ey;
        }
        function oy(t) {
          t = t || {};
          for (var e = arguments, n = 1, r = e.length; n < r; n++)
            for (var o in e[n])
              "object" == ip(e[n][o])
                ? (t[o] = oy(t[o], e[n][o]))
                : void 0 === t[o] && (t[o] = e[n][o]);
          return t;
        }
        function iy(t) {
          var e;
          if (!t) return !1;
          var n = oy(t, $v);
          (n.method = n.method.toUpperCase()),
            n.keepProtocal || (n.url = n.url.replace(/^http:/, "")),
            n.crossDomain ||
              (n.crossDomain =
                /^([\w-]+:)?\/\/([^/]+)/.test(n.url) &&
                RegExp.$2 != window.location.host),
            n.crossDomain &&
              !n.noCredentials &&
              (n.xhrFields = { withCredentials: !0 }),
            n.url || (n.url = window.location.toString());
          var r = n.dataType,
            o = /\?.+=\?/.test(n.url);
          if (
            (o && (r = "jsonp"),
            (!1 !== n.cache &&
              ((t && !0 === t.cache) || ("script" != r && "jsonp" != r))) ||
              (n.url = sy(n.url, "_=" + lv())),
            "jsonp" == r)
          )
            return (
              o ||
                ((n.urlbak = n.url),
                (n.url = sy(
                  n.url,
                  n.jsonp ? n.jsonp + "=?" : !1 === n.jsonp ? "" : "callback=?"
                ))),
              (n.url = Ay(n.url, "ls")),
              (function (t) {
                var e;
                if (!e) {
                  var n = t.jsonpCallback;
                  e =
                    ("function" == typeof n ? n() : n) ||
                    "jsonpCBK" +
                      ty.callbackName[ty.ajaxCount++ % ty.callbackName.length];
                }
                var r,
                  o,
                  i = document.createElement("script"),
                  a = { abort: c },
                  c = function () {
                    (u = 1),
                      Xv(t.debug, t.url, "timeout"),
                      cy(null, "timeout", a, t);
                  },
                  u = 0;
                return (
                  (t.callbackName = e),
                  (i.encoding = t.encoding || "utf-8"),
                  (i.onload = i.onerror =
                    function (e, n) {
                      if ((clearTimeout(o), u))
                        return Xv(t.debug, "timeout"), !1;
                      "error" == e.type
                        ? (Xv(t.debug, t.url, n || e.type || "error"),
                          cy(null, "error", a, t))
                        : r
                        ? ay(r[0], a, t)
                        : cy(null, e.type, a, t),
                        (r = void 0),
                        i.parentNode && i.parentNode.removeChild(i);
                    }),
                  (window[e] = function () {
                    r = arguments;
                  }),
                  (t.url = t.url.replace(/\?(.+)=\?/, "?$1=" + e)),
                  (i.src = t.url),
                  document.head.appendChild(i),
                  t.timeout > 0 &&
                    (o = Ov(function () {
                      c();
                    }, 1e3 * t.timeout)),
                  a
                );
              })(n)
            );
          n.url = Ay(n.url, "ajax");
          var i,
            a = n.accepts[r],
            c = {},
            u = function (t, e) {
              c[t.toLowerCase()] = [t, e];
            },
            s = /^([\w-]+:)\/\//.test(n.url)
              ? RegExp.$1
              : window.location.protocol,
            A = n.xhr(),
            f = A.setRequestHeader;
          if (
            (n.crossDomain || u("X-Requested-With", "XMLHttpRequest"),
            u("Accept", a || "*/*"),
            (a = n.mimeType) &&
              (Qg(a).call(a, ",") > -1 && (a = a.split(",", 2)[0]),
              A.overrideMimeType && A.overrideMimeType(a)),
            (n.contentType ||
              (!1 !== n.contentType && n.data && "GET" != n.method)) &&
              u(
                "Content-Type",
                n.contentType || "application/x-www-form-urlencoded"
              ),
            n.headers)
          )
            for (var l in n.headers) u(l, n.headers[l]);
          (A.setRequestHeader = u),
            (A.onreadystatechange = function () {
              if (4 == A.readyState) {
                (A.onreadystatechange = uy), clearTimeout(i);
                var t,
                  e = !1;
                if (
                  (A.status >= 200 && A.status < 300) ||
                  304 == A.status ||
                  (0 == A.status && "file:" == s)
                ) {
                  t = A.responseText;
                  try {
                    "script" == r
                      ? (0, eval)(t)
                      : "xml" == r
                      ? (t = A.responseXML)
                      : "json" == r &&
                        (t = /^\s*$/.test(t)
                          ? null
                          : (function (t) {
                              return t &&
                                "string" == typeof t &&
                                (t = t.replace(/^\s+|\s+$/g, ""))
                                ? JSON.parse(t)
                                : t;
                            })(t));
                  } catch (t) {
                    e = t;
                  }
                  e ? cy(e, "parsererror", A, n) : ay(t, A, n);
                } else
                  Xv(n.debug, "ajax error", A),
                    cy(A.statusText || null, "load", A, n);
              }
            });
          var h = !("async" in n) || n.async;
          if (n.xhrFields) for (var d in n.xhrFields) A[d] = n.xhrFields[d];
          for (var p in (A.open(n.method, n.url, h, n.username, n.password), c))
            f.apply(A, c[p]);
          if (
            (n.timeout > 0 &&
              (i = Ov(function () {
                (A.onreadystatechange = uy),
                  A.abort(),
                  cy(null, "timeout", A, n);
              }, 1e3 * n.timeout)),
            "POST" == n.method &&
              t.data &&
              "object" == ip(t.data) &&
              n.contentType &&
              Qg((e = n.contentType)).call(e, "multipart/form-data") >= 0)
          ) {
            var g = new FormData();
            for (var m in n.data) g.append([m], n.data[m]);
            n.data = g;
          }
          return A.send(n.data ? n.data : null), A;
        }
        function ay(t, e, n) {
          var r = n.context;
          n.success.call(r, t, n, "success", e);
        }
        function cy(t, e, n, r) {
          var o;
          r.retry <= 0 ||
          "POST" == r.method ||
          Qg((o = ["error", "parsererror"])).call(o, e) >= 0
            ? (function (t, e, n, r) {
                var o = r.context;
                Xv(r.debug, r.url, e, t),
                  r.error.call(
                    o,
                    {
                      code:
                        {
                          timeout: 8e3,
                          error: 5e3,
                          load: 3020,
                          abort: 5001,
                          parsererror: 3021,
                        }[e] || 9e3,
                      message: e,
                    },
                    r,
                    t,
                    n
                  );
              })(t, e, n, r)
            : Ov(function () {
                (r.url = r.url.replace(/(&)?(_|g_tk|g_ty|callback)=\w+/g, "")),
                  r.retry--,
                  iy(r);
              }, 0);
        }
        function uy() {}
        function sy(t, e) {
          return "" == e ? t : (t + "&" + e).replace(/[&?]{1,2}/, "?");
        }
        function Ay(t, e) {
          var n,
            r,
            o,
            i,
            a,
            c =
              ((i = new RegExp("(^| )wq_skey(?:=([^;]*))?(;|$)")),
              null ==
              (o = (a = document.cookie.match(i))
                ? a[2]
                  ? unescape(a[2])
                  : ""
                : null)
                ? ""
                : (function (t) {
                    for (var e = 0, n = t.length, r = 5381; e < n; ++e)
                      r += (r << 5) + t.charAt(e).charCodeAt();
                    return 2147483647 & r;
                  })(o));
          if (
            "" == t ||
            0 !=
              Qg((n = Qg(t).call(t, "://") < 0 ? location.href : t)).call(
                n,
                "http"
              )
          )
            return t;
          if (-1 != Qg(t).call(t, "#")) {
            var u = t.match(/\?.+#/);
            if (u) {
              var s = [
                (r = u[0].split("#"))[0],
                "&g_tk=",
                c,
                "&g_ty=",
                e,
                "#",
                r[1],
              ].join("");
              return t.replace(u[0], s);
            }
            return [
              (r = t.split("#"))[0],
              "?g_tk=",
              c,
              "&g_ty=",
              e,
              "#",
              r[1],
            ].join("");
          }
          return "" == c
            ? t + (-1 != Qg(t).call(t, "?") ? "&" : "?") + "g_ty=" + e
            : t +
                (-1 != Qg(t).call(t, "?") ? "&" : "?") +
                "g_tk=" +
                c +
                "&g_ty=" +
                e;
        }
        function fy(t) {
          return new hf(function (e, n) {
            var r;
            if (t) {
              var o = ly(t);
              if (
                ((o.success = function (t) {
                  try {
                    e({ body: t });
                  } catch (t) {
                    n({ code: 999, message: t });
                  }
                }),
                (o.error = function (t) {
                  n(t);
                }),
                !o.method ||
                  (o.contentType &&
                    -1 !=
                      Qg((r = o.contentType)).call(r, "multipart/form-data")) ||
                  (function (t) {
                    if (t.data && "string" != typeof t.data) {
                      if ("POST" == t.method && t.jsonpCallback) return;
                      t.data =
                        ((e = t.data),
                        ((n = []).add = function (t, e) {
                          this.push(
                            Yv(t) + "=" + ("object" == ip(e) ? Jg(e) : Yv(e))
                          );
                        }),
                        (function (t, e) {
                          for (var n in e) t.add(n, e[n]);
                        })(n, e),
                        n.join("&").replace(/%20/g, "+"));
                    }
                    var e, n;
                    t.data &&
                      "GET" == t.method &&
                      ((t.url = sy(t.url, t.data)), (t.data = void 0));
                  })(o),
                o.expire)
              ) {
                o.cache_key = o.url;
                try {
                  e({ body: Zv.getSync(o.cache_key) });
                } catch (t) {
                  iy(o);
                }
              } else iy(o);
            } else n();
          });
        }
        function ly(t) {
          var e = t instanceof Array ? [] : {};
          for (var n in t) e[n] = "object" === ip(t[n]) ? ly(t[n]) : t[n];
          return e;
        }
        function hy(t) {
          for (var e = 1, n = arguments.length; e < n; e++)
            for (var r in arguments[e]) t[r] = arguments[e][r];
          return t;
        }
        function dy(t) {
          return function (e, n) {
            var r = (function (t, e) {
              var n = {};
              return (
                "object" == ip(e)
                  ? hy(n, e, { url: t })
                  : hy(n, "string" == typeof t ? { url: t } : t),
                n
              );
            })(e, n);
            return (r.method = t), fy(r);
          };
        }
        (ty.ajaxCount = ty.ajaxCount || 0),
          (Pv.exports = fy),
          (Pv.exports.get = dy("GET")),
          (Pv.exports.post = dy("POST"));
        var py = Pv.exports;
        !(function (t, e) {
          var n = wy();
          function r(t, e, n, r) {
            return my(n - 279, t);
          }
          function o(t, e, n, r) {
            return my(e - 109, t);
          }
          for (;;)
            try {
              if (
                379605 ==
                (-parseInt(r(470, 0, 468)) / 1) * (parseInt(o(279, 286)) / 2) +
                  (parseInt(r(450, 0, 451)) / 3) * (parseInt(o(295, 284)) / 4) +
                  (-parseInt(r(464, 0, 471)) / 5) *
                    (-parseInt(r(467, 0, 469)) / 6) +
                  (parseInt(o(287, 296)) / 7) * (parseInt(o(296, 292)) / 8) +
                  (-parseInt(r(460, 0, 464)) / 9) *
                    (parseInt(o(285, 290)) / 10) +
                  -parseInt(o(285, 291)) / 11 +
                  parseInt(o(272, 282)) / 12
              )
                break;
              n.push(n.shift());
            } catch (t) {
              n.push(n.shift());
            }
        })();
        var gy = {};
        function my(t, e) {
          var n = wy();
          return (my = function (e, r) {
            var o = n[(e -= 172)];
            if (void 0 === my.lxaYCY) {
              (my.GuQOZV = function (t) {
                for (
                  var e, n, r = "", o = "", i = 0, a = 0;
                  (n = t.charAt(a++));
                  ~n && ((e = i % 4 ? 64 * e + n : n), i++ % 4)
                    ? (r += String.fromCharCode(255 & (e >> ((-2 * i) & 6))))
                    : 0
                )
                  n =
                    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=".indexOf(
                      n
                    );
                for (var c = 0, u = r.length; c < u; c++)
                  o += "%" + ("00" + r.charCodeAt(c).toString(16)).slice(-2);
                return decodeURIComponent(o);
              }),
                (t = arguments),
                (my.lxaYCY = !0);
            }
            var i = e + n[0],
              a = t[i];
            return a ? (o = a) : ((o = my.GuQOZV(o)), (t[i] = o)), o;
          })(t, e);
        }
        function vy(t, e, n, r) {
          return my(r - -913, n);
        }
        (gy[Cy(-247, -248, -244) + Cy(-248, -254, -252)] = Cy(
          -240,
          -256,
          -250
        )),
          (gy["DYNAMIC_AL" + vy(0, 0, -721, -720)] =
            Cy(-245, -244, -242) + "_s"),
          (gy.VK = vy(0, 0, -715, -722)),
          (gy.FLAG = "WQ_f_v");
        var yy = gy;
        function wy() {
          var t = [
            "mtm4ndbhy29AzKe",
            "mZy5nde4nxHtEeDyyq",
            "mJa0mfrTwKDuyq",
            "rfLoqu1jq19utW",
            "ndCZngvrq3bVzq",
            "v1fFzhLFywXNBW",
            "mJaXndzVvMXSwuO",
            "os45lJK",
            "mtG5mdeWC2ToAvHT",
            "mtqYnJu3ogDnt2fSwG",
            "v1fFDMSX",
            "mtbKs0Pfvwi",
            "r09ssvritq",
            "otm5t1frtLjg",
            "ntuYmJy3nMTwrLDiwq",
            "mI4W",
            "mtK0mezMq2nZuG",
            "s0vo",
            "ng1rq2XUuW",
            "v1fFzhLFDgTFCW",
            "Bg9JywXFA2v5xW",
            "AdvFBNbTx3y0lG",
          ];
          return (wy = function () {
            return t;
          })();
        }
        var by = vy(0, 0, -729, -734);
        function Cy(t, e, n, r) {
          return my(n - -428, e);
        }
        var Iy = vy(0, 0, -731, -733) + vy(0, 0, -733, -739),
          Sy = vy(0, 0, -736, -725);
        function xy() {
          var t = [
            "yxbWBgLJyxrPBW",
            "CMfTCYbLCNjVCG",
            "qMr2ugW",
            "yxbWswq",
            "zgf0ys5Yzxn1Ba",
            "zMLUz2vYChjPBG",
            "ANnVBG",
            "sg1pwgm",
            "DcbMB3jTyxqGzq",
            "Bs9Yzxf1zxn0xW",
            "CNjVCI4",
            "ywXNBW",
            "y2f0y2G",
            "wNj1v3O",
            "whDLDxq",
            "nZiYnZi4mgTRDvPuAG",
            "zxnPr08",
            "vwL0sMy",
            "B0fUEvK",
            "CMvXDwvZDcbLCG",
            "zw52",
            "mJu3mdrRu1DeBNC",
            "sgj6AfK",
            "mtaXmZH5t3j4BMy",
            "zNLNEuO",
            "mtbMt2DjzKi",
            "DgLTzw91Da",
            "zgf0yq",
            "y29Kzq",
            "Cg9ZDa",
            "Dg9Rzw4",
            "mtC4oteWn0XjCfHvzq",
            "yM9KEq",
            "mJqYndC2mK9SyM5fvq",
            "odaXnZHyzNPxEfa",
            "BwvZC2fNzq",
            "teLsuKK",
            "mtu0nty4ngX1uvHIqW",
            "Ahr0Chm6lY9Jyq",
            "mtq0mNbsCgjbDa",
            "zgvIDwC",
            "y29Uy2f0",
            "nJfpAKnIz1i",
            "Exn0sLC",
            "y2fSBa",
            "CMvZDwX0",
            "CMvXDwvZDcbWyq",
          ];
          return (xy = function () {
            return t;
          })();
        }
        function Ey(t, e) {
          var n = xy();
          return (Ey = function (e, r) {
            var o = n[(e -= 180)];
            if (void 0 === Ey.jTyofo) {
              (Ey.pOjNLe = function (t) {
                for (
                  var e, n, r = "", o = "", i = 0, a = 0;
                  (n = t.charAt(a++));
                  ~n && ((e = i % 4 ? 64 * e + n : n), i++ % 4)
                    ? (r += String.fromCharCode(255 & (e >> ((-2 * i) & 6))))
                    : 0
                )
                  n =
                    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=".indexOf(
                      n
                    );
                for (var c = 0, u = r.length; c < u; c++)
                  o += "%" + ("00" + r.charCodeAt(c).toString(16)).slice(-2);
                return decodeURIComponent(o);
              }),
                (t = arguments),
                (Ey.jTyofo = !0);
            }
            var i = e + n[0],
              a = t[i];
            return a ? (o = a) : ((o = Ey.pOjNLe(o)), (t[i] = o)), o;
          })(t, e);
        }
        function _y(t, e) {
          var n = {
            LIRRI: function (t, e) {
              return t(e);
            },
            UitJf: function (t, e) {
              return t(e);
            },
            Xweut: function (t, e) {
              return t(e);
            },
            BdvPl: r(323, 336, 328, 351) + r(318, 330, 330, 341) + ".",
            ZruWz:
              r(327, 301, 320, 304) +
              "ctus.jd.co" +
              r(315, 277, 291, 303) +
              r(270, 276, 293, 280),
            fygyJ: r(272, 287, 288, 309),
            awiad: function (t, e) {
              return t(e);
            },
            HmOXc: "web",
            Embhh: r(344, 330, 329, 305) + "n/json",
          };
          function r(t, e, n, r) {
            return Ey(n - 106, r);
          }
          var o = t[r(0, 0, 287, 299) + "t"],
            i = t[r(0, 0, 332, 344)],
            a = t.version,
            c = t[r(0, 0, 308, 286)],
            u = t[r(0, 0, 302, 287)],
            s = t[A(-646, -643, -662)];
          function A(t, e, n, r) {
            return Ey(t - -862, n);
          }
          return new hf(function (t, f) {
            function l(t, e, n, r) {
              return A(n - 879, 0, t);
            }
            var h = {
              ystJW: function (t, e) {
                return n[Ey(193, 1152)](t, e);
              },
              HbzhY: d(-126, -164, -148) + l(202, 0, 201) + l(216, 0, 203),
              oAnyY: function (t, e) {
                return n[d(-282, -443, -138)](t, e);
              },
              esiGO: n[l(228, 0, 242)],
            };
            function d(t, e, n, o) {
              return r(0, 0, n - -434, t);
            }
            py[l(213, 0, 222)](n[d(-161, 0, -139)], {
              dataType: n[d(-141, 0, -128)],
              data: n.awiad(Jg, {
                version: a,
                fp: o,
                appId: i,
                timestamp: lv(),
                platform: n[d(-137, 0, -145)],
                expandParams: u,
                fv: Iy,
              }),
              contentType: n.Embhh,
              noCredentials: !0,
              timeout: c,
              debug: s,
            })
              .then(function (n) {
                var r = n[i(1168, 1178, 1154, 1155)],
                  o = {};
                function i(t, e, n, r) {
                  return d(r, 0, t - 1288);
                }
                function a(t, e, n, r) {
                  return l(n, 0, t - 305);
                }
                if (
                  ((o[a(526, 0, 536)] = r.status),
                  (o.message = ""),
                  e && h[i(1179, 0, 0, 1173)](e, o),
                  200 == r.status &&
                    r.data &&
                    r[i(1163, 0, 0, 1178)][i(1181, 0, 0, 1197)])
                ) {
                  var c = r[a(525, 0, 540)].result,
                    u = c[a(509, 0, 528)],
                    s = c.tk,
                    A = c.fp;
                  if (u && s) {
                    var p = {};
                    (p.algo = u),
                      (p[i(1166, 0, 0, 1154)] = s),
                      (p.fp = A),
                      h[a(541, 0, 550)](t, p);
                  } else f(h[i(1158, 0, 0, 1180)]);
                } else h[a(516, 0, 494)](f, h[i(1152, 0, 0, 1146)]);
              })
              [d(-140, 0, -140)](function (t) {
                function r(t, e, n, r) {
                  return l(e, 0, t - -547);
                }
                var o,
                  i = t[u(1167, 1158, 1169, 1149)],
                  a = t[u(1136, 1145, 1138, 1156)],
                  c = {};
                function u(t, e, n, r) {
                  return d(n, 0, r - 1273);
                }
                (c[r(-326, -342)] = i),
                  (c[u(0, 0, 1170, 1156)] = a),
                  e && e(c),
                  n[u(0, 0, 1148, 1157)](
                    f,
                    n
                      .UitJf(
                        kg,
                        (o = (u(0, 0, 1153, 1140) + "ror, ")[r(-313, -301)](
                          i,
                          ", "
                        ))
                      )
                      [u(0, 0, 1178, 1165)](o, a)
                  );
              });
          });
        }
        !(function (t, e) {
          var n = xy();
          function r(t, e, n, r) {
            return Ey(t - 320, r);
          }
          function o(t, e, n, r) {
            return Ey(e - -672, r);
          }
          for (;;)
            try {
              if (
                414881 ==
                (-parseInt(o(0, -454, 0, -434)) / 1) *
                  (-parseInt(o(0, -473, 0, -464)) / 2) +
                  -parseInt(r(527, 0, 0, 540)) / 3 +
                  -parseInt(r(533, 0, 0, 511)) / 4 +
                  (parseInt(o(0, -471, 0, -460)) / 5) *
                    (-parseInt(o(0, -462, 0, -478)) / 6) +
                  (parseInt(o(0, -457, 0, -462)) / 7) *
                    (parseInt(r(517, 0, 0, 515)) / 8) +
                  -parseInt(r(529, 0, 0, 543)) / 9 +
                  parseInt(r(511, 0, 0, 524)) / 10
              )
                break;
              n.push(n.shift());
            } catch (t) {
              n.push(n.shift());
            }
        })();
        var By = N,
          ky = xf,
          Ty = TypeError,
          Dy = Object.getOwnPropertyDescriptor,
          Oy =
            By &&
            !(function () {
              if (void 0 !== this) return !0;
              try {
                Object.defineProperty([], "length", {
                  writable: !1,
                }).length = 1;
              } catch (t) {
                return t instanceof TypeError;
              }
            })(),
          Py = Tn,
          My = $t,
          jy = ir,
          Ly = er,
          Ny = ur,
          zy = Oy
            ? function (t, e) {
                if (ky(t) && !Dy(t, "length").writable)
                  throw Ty("Cannot set read only .length");
                return (t.length = e);
              }
            : function (t, e) {
                return (t.length = e);
              },
          Qy = _f,
          Ry = Nf,
          Wy = Df,
          Fy = Cm,
          Uy = Wf("splice"),
          Ky = Math.max,
          qy = Math.min;
        Py(
          { target: "Array", proto: !0, forced: !Uy },
          {
            splice: function (t, e) {
              var n,
                r,
                o,
                i,
                a,
                c,
                u = My(this),
                s = Ny(u),
                A = jy(t, s),
                f = arguments.length;
              for (
                0 === f
                  ? (n = r = 0)
                  : 1 === f
                  ? ((n = 0), (r = s - A))
                  : ((n = f - 2), (r = qy(Ky(Ly(e), 0), s - A))),
                  Qy(s + n - r),
                  o = Ry(u, r),
                  i = 0;
                i < r;
                i++
              )
                (a = A + i) in u && Wy(o, i, u[a]);
              if (((o.length = r), n < r)) {
                for (i = A; i < s - r; i++)
                  (c = i + n), (a = i + r) in u ? (u[c] = u[a]) : Fy(u, c);
                for (i = s; i > s - r + n; i--) Fy(u, i - 1);
              } else if (n > r)
                for (i = s - r; i > A; i--)
                  (c = i + n - 1),
                    (a = i + r - 1) in u ? (u[c] = u[a]) : Fy(u, c);
              for (i = 0; i < n; i++) u[i + A] = arguments[i + 2];
              return zy(u, s - r + n), o;
            },
          }
        );
        var Gy = xp("Array").splice,
          Vy = pt,
          Jy = Gy,
          Hy = Array.prototype,
          Zy = function (t) {
            var e = t.splice;
            return t === Hy || (Vy(Hy, t) && e === Hy.splice) ? Jy : e;
          };
        function Yy(t) {
          return "[object Object]" === Object.prototype.toString.call(t);
        }
        function Xy(t) {
          return !!Yy(t) && !uv(t).length;
        }
        var $y = cn,
          tw = Jo,
          ew = tn,
          nw = R,
          rw = $t,
          ow = function (t, e, n, r) {
            try {
              return r ? e($y(n)[0], n[1]) : e(n);
            } catch (e) {
              tw(t, "throw", e);
            }
          },
          iw = Co,
          aw = Cc,
          cw = ur,
          uw = Df,
          sw = Ko,
          Aw = No,
          fw = Array;
        Tn(
          {
            target: "Array",
            stat: !0,
            forced: !Vs(function (t) {
              Array.from(t);
            }),
          },
          {
            from: function (t) {
              var e = rw(t),
                n = aw(this),
                r = arguments.length,
                o = r > 1 ? arguments[1] : void 0,
                i = void 0 !== o;
              i && (o = ew(o, r > 2 ? arguments[2] : void 0));
              var a,
                c,
                u,
                s,
                A,
                f,
                l = Aw(e),
                h = 0;
              if (!l || (this === fw && iw(l)))
                for (a = cw(e), c = n ? new this(a) : fw(a); a > h; h++)
                  (f = i ? o(e[h], h) : e[h]), uw(c, h, f);
              else
                for (
                  A = (s = sw(e, l)).next, c = n ? new this() : [];
                  !(u = nw(A, s)).done;
                  h++
                )
                  (f = i ? ow(s, o, [u.value, h], !0) : u.value), uw(c, h, f);
              return (c.length = h), c;
            },
          }
        );
        var lw = st.Array.from,
          hw = No;
        Tn({ target: "Array", stat: !0 }, { isArray: xf });
        var dw = st.Array.isArray,
          pw = Ko,
          gw = hr.includes;
        Tn(
          {
            target: "Array",
            proto: !0,
            forced: h(function () {
              return !Array(1).includes();
            }),
          },
          {
            includes: function (t) {
              return gw(this, t, arguments.length > 1 ? arguments[1] : void 0);
            },
          }
        );
        var mw = xp("Array").includes,
          vw = ut,
          yw = B,
          ww = me("match"),
          bw = TypeError,
          Cw = me("match"),
          Iw = Tn,
          Sw = function (t) {
            if (
              (function (t) {
                var e;
                return (
                  vw(t) && (void 0 !== (e = t[ww]) ? !!e : "RegExp" == yw(t))
                );
              })(t)
            )
              throw bw("The method doesn't accept regular expressions");
            return t;
          },
          xw = nt,
          Ew = fi,
          _w = S("".indexOf);
        Iw(
          {
            target: "String",
            proto: !0,
            forced: !(function (t) {
              var e = /./;
              try {
                "/./"[t](e);
              } catch (n) {
                try {
                  return (e[Cw] = !1), "/./"[t](e);
                } catch (t) {}
              }
              return !1;
            })("includes"),
          },
          {
            includes: function (t) {
              return !!~_w(
                Ew(xw(this)),
                Ew(Sw(t)),
                arguments.length > 1 ? arguments[1] : void 0
              );
            },
          }
        );
        var Bw,
          kw = xp("String").includes,
          Tw = pt,
          Dw = mw,
          Ow = kw,
          Pw = Array.prototype,
          Mw = String.prototype,
          jw = function (t) {
            var e = t.includes;
            return t === Pw || (Tw(Pw, t) && e === Pw.includes)
              ? Dw
              : "string" == typeof t ||
                t === Mw ||
                (Tw(Mw, t) && e === Mw.includes)
              ? Ow
              : e;
          },
          Lw = {
            UNSIGNABLE_PARAMS: 1,
            APPID_ABSENT: 2,
            TOKEN_EMPTY: 3,
            GENERATE_SIGNATURE_FAILED: 4,
            UNHANDLED_ERROR: -1,
          },
          Nw = { exports: {} },
          zw = A(Object.freeze({ __proto__: null, default: {} }));
        Nw.exports = Bw =
          Bw ||
          (function (t, e) {
            var n;
            if (
              ("undefined" != typeof window &&
                window.crypto &&
                (n = window.crypto),
              !n &&
                "undefined" != typeof window &&
                window.msCrypto &&
                (n = window.msCrypto),
              !n && void 0 !== s && s.crypto && (n = s.crypto),
              !n)
            )
              try {
                n = zw;
              } catch (t) {}
            var r = function () {
                if (n) {
                  if ("function" == typeof n.getRandomValues)
                    try {
                      return n.getRandomValues(new Uint32Array(1))[0];
                    } catch (t) {}
                  if ("function" == typeof n.randomBytes)
                    try {
                      return n.randomBytes(4).readInt32LE();
                    } catch (t) {}
                }
                throw new Error(
                  "Native crypto module could not be used to get secure random number."
                );
              },
              o =
                pp ||
                (function () {
                  function t() {}
                  return function (e) {
                    var n;
                    return (
                      (t.prototype = e), (n = new t()), (t.prototype = null), n
                    );
                  };
                })(),
              i = {},
              a = (i.lib = {}),
              c = (a.Base = {
                extend: function (t) {
                  var e = o(this);
                  return (
                    t && e.mixIn(t),
                    (e.hasOwnProperty("init") && this.init !== e.init) ||
                      (e.init = function () {
                        e.$super.init.apply(this, arguments);
                      }),
                    (e.init.prototype = e),
                    (e.$super = this),
                    e
                  );
                },
                create: function () {
                  var t = this.extend();
                  return t.init.apply(t, arguments), t;
                },
                init: function () {},
                mixIn: function (t) {
                  for (var e in t) t.hasOwnProperty(e) && (this[e] = t[e]);
                  t.hasOwnProperty("toString") && (this.toString = t.toString);
                },
                clone: function () {
                  return this.init.prototype.extend(this);
                },
              }),
              u = (a.WordArray = c.extend({
                init: function (t, e) {
                  (t = this.words = t || []),
                    (this.sigBytes = null != e ? e : 4 * t.length);
                },
                toString: function (t) {
                  return (t || f).stringify(this);
                },
                concat: function (t) {
                  var e = this.words,
                    n = t.words,
                    r = this.sigBytes,
                    o = t.sigBytes;
                  if ((this.clamp(), r % 4))
                    for (var i = 0; i < o; i++) {
                      var a = (n[i >>> 2] >>> (24 - (i % 4) * 8)) & 255;
                      e[(r + i) >>> 2] |= a << (24 - ((r + i) % 4) * 8);
                    }
                  else for (i = 0; i < o; i += 4) e[(r + i) >>> 2] = n[i >>> 2];
                  return (this.sigBytes += o), this;
                },
                clamp: function () {
                  var e = this.words,
                    n = this.sigBytes;
                  (e[n >>> 2] &= 4294967295 << (32 - (n % 4) * 8)),
                    (e.length = t.ceil(n / 4));
                },
                clone: function () {
                  var t,
                    e = c.clone.call(this);
                  return (e.words = ug((t = this.words)).call(t, 0)), e;
                },
                random: function (t) {
                  for (var e = [], n = 0; n < t; n += 4) e.push(r());
                  return new u.init(e, t);
                },
              })),
              A = (i.enc = {}),
              f = (A.Hex = {
                stringify: function (t) {
                  for (
                    var e = t.words, n = t.sigBytes, r = [], o = 0;
                    o < n;
                    o++
                  ) {
                    var i = (e[o >>> 2] >>> (24 - (o % 4) * 8)) & 255;
                    r.push((i >>> 4).toString(16)),
                      r.push((15 & i).toString(16));
                  }
                  return r.join("");
                },
                parse: function (t) {
                  for (var e = t.length, n = [], r = 0; r < e; r += 2)
                    n[r >>> 3] |= hm(t.substr(r, 2), 16) << (24 - (r % 8) * 4);
                  return new u.init(n, e / 2);
                },
              }),
              l = (A.Latin1 = {
                stringify: function (t) {
                  for (
                    var e = t.words, n = t.sigBytes, r = [], o = 0;
                    o < n;
                    o++
                  ) {
                    var i = (e[o >>> 2] >>> (24 - (o % 4) * 8)) & 255;
                    r.push(String.fromCharCode(i));
                  }
                  return r.join("");
                },
                parse: function (t) {
                  for (var e = t.length, n = [], r = 0; r < e; r++)
                    n[r >>> 2] |= (255 & t.charCodeAt(r)) << (24 - (r % 4) * 8);
                  return new u.init(n, e);
                },
              }),
              h = (A.Utf8 = {
                stringify: function (t) {
                  try {
                    return decodeURIComponent(escape(l.stringify(t)));
                  } catch (t) {
                    throw new Error("Malformed UTF-8 data");
                  }
                },
                parse: function (t) {
                  return l.parse(unescape(encodeURIComponent(t)));
                },
              }),
              d = (a.BufferedBlockAlgorithm = c.extend({
                reset: function () {
                  (this._data = new u.init()), (this._nDataBytes = 0);
                },
                _append: function (t) {
                  var e;
                  "string" == typeof t && (t = h.parse(t)),
                    kg((e = this._data)).call(e, t),
                    (this._nDataBytes += t.sigBytes);
                },
                _process: function (e) {
                  var n,
                    r = this._data,
                    o = r.words,
                    i = r.sigBytes,
                    a = this.blockSize,
                    c = i / (4 * a),
                    s =
                      (c = e
                        ? t.ceil(c)
                        : t.max((0 | c) - this._minBufferSize, 0)) * a,
                    A = t.min(4 * s, i);
                  if (s) {
                    for (var f = 0; f < s; f += a) this._doProcessBlock(o, f);
                    (n = Zy(o).call(o, 0, s)), (r.sigBytes -= A);
                  }
                  return new u.init(n, A);
                },
                clone: function () {
                  var t = c.clone.call(this);
                  return (t._data = this._data.clone()), t;
                },
                _minBufferSize: 0,
              }));
            a.Hasher = d.extend({
              cfg: c.extend(),
              init: function (t) {
                (this.cfg = this.cfg.extend(t)), this.reset();
              },
              reset: function () {
                d.reset.call(this), this._doReset();
              },
              update: function (t) {
                return this._append(t), this._process(), this;
              },
              finalize: function (t) {
                return t && this._append(t), this._doFinalize();
              },
              blockSize: 16,
              _createHelper: function (t) {
                return function (e, n) {
                  return new t.init(n).finalize(e);
                };
              },
              _createHmacHelper: function (t) {
                return function (e, n) {
                  return new p.HMAC.init(t, n).finalize(e);
                };
              },
            });
            var p = (i.algo = {});
            return i;
          })(Math);
        var Qw = ({ exports: {} }.exports = (function (t) {
            return (
              (function () {
                var e = t,
                  n = e.lib.WordArray;
                function r(t, e, r) {
                  for (var o = [], i = 0, a = 0; a < e; a++)
                    if (a % 4) {
                      var c =
                        (r[t.charCodeAt(a - 1)] << ((a % 4) * 2)) |
                        (r[t.charCodeAt(a)] >>> (6 - (a % 4) * 2));
                      (o[i >>> 2] |= c << (24 - (i % 4) * 8)), i++;
                    }
                  return n.create(o, i);
                }
                e.enc.Base64 = {
                  stringify: function (t) {
                    var e = t.words,
                      n = t.sigBytes,
                      r = this._map;
                    t.clamp();
                    for (var o = [], i = 0; i < n; i += 3)
                      for (
                        var a =
                            (((e[i >>> 2] >>> (24 - (i % 4) * 8)) & 255) <<
                              16) |
                            (((e[(i + 1) >>> 2] >>> (24 - ((i + 1) % 4) * 8)) &
                              255) <<
                              8) |
                            ((e[(i + 2) >>> 2] >>> (24 - ((i + 2) % 4) * 8)) &
                              255),
                          c = 0;
                        c < 4 && i + 0.75 * c < n;
                        c++
                      )
                        o.push(r.charAt((a >>> (6 * (3 - c))) & 63));
                    var u = r.charAt(64);
                    if (u) for (; o.length % 4; ) o.push(u);
                    return o.join("");
                  },
                  parse: function (t) {
                    var e = t.length,
                      n = this._map,
                      o = this._reverseMap;
                    if (!o) {
                      o = this._reverseMap = [];
                      for (var i = 0; i < n.length; i++) o[n.charCodeAt(i)] = i;
                    }
                    var a = n.charAt(64);
                    if (a) {
                      var c = Qg(t).call(t, a);
                      -1 !== c && (e = c);
                    }
                    return r(t, e, o);
                  },
                  _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
                };
              })(),
              t.enc.Base64
            );
          })(Nw.exports)),
          Rw = ({ exports: {} }.exports = (function (t) {
            return t.enc.Hex;
          })(Nw.exports)),
          Ww = ({ exports: {} }.exports = (function (t) {
            return t.enc.Utf8;
          })(Nw.exports)),
          Fw = ({ exports: {} }.exports = (function (t) {
            return (
              (function (e) {
                var n = t,
                  r = n.lib,
                  o = r.WordArray,
                  i = r.Hasher,
                  a = n.algo,
                  c = [];
                !(function () {
                  for (var t = 0; t < 64; t++)
                    c[t] = (4294967296 * e.abs(e.sin(t + 1))) | 0;
                })();
                var u = (a.MD5 = i.extend({
                  _doReset: function () {
                    this._hash = new o.init([
                      1732584193, 4023233417, 2562383102, 271733878,
                    ]);
                  },
                  _doProcessBlock: function (t, e) {
                    for (var n = 0; n < 16; n++) {
                      var r = e + n,
                        o = t[r];
                      t[r] =
                        (16711935 & ((o << 8) | (o >>> 24))) |
                        (4278255360 & ((o << 24) | (o >>> 8)));
                    }
                    var i = this._hash.words,
                      a = t[e + 0],
                      u = t[e + 1],
                      h = t[e + 2],
                      d = t[e + 3],
                      p = t[e + 4],
                      g = t[e + 5],
                      m = t[e + 6],
                      v = t[e + 7],
                      y = t[e + 8],
                      w = t[e + 9],
                      b = t[e + 10],
                      C = t[e + 11],
                      I = t[e + 12],
                      S = t[e + 13],
                      x = t[e + 14],
                      E = t[e + 15],
                      _ = i[0],
                      B = i[1],
                      k = i[2],
                      T = i[3];
                    (_ = s(_, B, k, T, a, 7, c[0])),
                      (T = s(T, _, B, k, u, 12, c[1])),
                      (k = s(k, T, _, B, h, 17, c[2])),
                      (B = s(B, k, T, _, d, 22, c[3])),
                      (_ = s(_, B, k, T, p, 7, c[4])),
                      (T = s(T, _, B, k, g, 12, c[5])),
                      (k = s(k, T, _, B, m, 17, c[6])),
                      (B = s(B, k, T, _, v, 22, c[7])),
                      (_ = s(_, B, k, T, y, 7, c[8])),
                      (T = s(T, _, B, k, w, 12, c[9])),
                      (k = s(k, T, _, B, b, 17, c[10])),
                      (B = s(B, k, T, _, C, 22, c[11])),
                      (_ = s(_, B, k, T, I, 7, c[12])),
                      (T = s(T, _, B, k, S, 12, c[13])),
                      (k = s(k, T, _, B, x, 17, c[14])),
                      (_ = A(
                        _,
                        (B = s(B, k, T, _, E, 22, c[15])),
                        k,
                        T,
                        u,
                        5,
                        c[16]
                      )),
                      (T = A(T, _, B, k, m, 9, c[17])),
                      (k = A(k, T, _, B, C, 14, c[18])),
                      (B = A(B, k, T, _, a, 20, c[19])),
                      (_ = A(_, B, k, T, g, 5, c[20])),
                      (T = A(T, _, B, k, b, 9, c[21])),
                      (k = A(k, T, _, B, E, 14, c[22])),
                      (B = A(B, k, T, _, p, 20, c[23])),
                      (_ = A(_, B, k, T, w, 5, c[24])),
                      (T = A(T, _, B, k, x, 9, c[25])),
                      (k = A(k, T, _, B, d, 14, c[26])),
                      (B = A(B, k, T, _, y, 20, c[27])),
                      (_ = A(_, B, k, T, S, 5, c[28])),
                      (T = A(T, _, B, k, h, 9, c[29])),
                      (k = A(k, T, _, B, v, 14, c[30])),
                      (_ = f(
                        _,
                        (B = A(B, k, T, _, I, 20, c[31])),
                        k,
                        T,
                        g,
                        4,
                        c[32]
                      )),
                      (T = f(T, _, B, k, y, 11, c[33])),
                      (k = f(k, T, _, B, C, 16, c[34])),
                      (B = f(B, k, T, _, x, 23, c[35])),
                      (_ = f(_, B, k, T, u, 4, c[36])),
                      (T = f(T, _, B, k, p, 11, c[37])),
                      (k = f(k, T, _, B, v, 16, c[38])),
                      (B = f(B, k, T, _, b, 23, c[39])),
                      (_ = f(_, B, k, T, S, 4, c[40])),
                      (T = f(T, _, B, k, a, 11, c[41])),
                      (k = f(k, T, _, B, d, 16, c[42])),
                      (B = f(B, k, T, _, m, 23, c[43])),
                      (_ = f(_, B, k, T, w, 4, c[44])),
                      (T = f(T, _, B, k, I, 11, c[45])),
                      (k = f(k, T, _, B, E, 16, c[46])),
                      (_ = l(
                        _,
                        (B = f(B, k, T, _, h, 23, c[47])),
                        k,
                        T,
                        a,
                        6,
                        c[48]
                      )),
                      (T = l(T, _, B, k, v, 10, c[49])),
                      (k = l(k, T, _, B, x, 15, c[50])),
                      (B = l(B, k, T, _, g, 21, c[51])),
                      (_ = l(_, B, k, T, I, 6, c[52])),
                      (T = l(T, _, B, k, d, 10, c[53])),
                      (k = l(k, T, _, B, b, 15, c[54])),
                      (B = l(B, k, T, _, u, 21, c[55])),
                      (_ = l(_, B, k, T, y, 6, c[56])),
                      (T = l(T, _, B, k, E, 10, c[57])),
                      (k = l(k, T, _, B, m, 15, c[58])),
                      (B = l(B, k, T, _, S, 21, c[59])),
                      (_ = l(_, B, k, T, p, 6, c[60])),
                      (T = l(T, _, B, k, C, 10, c[61])),
                      (k = l(k, T, _, B, h, 15, c[62])),
                      (B = l(B, k, T, _, w, 21, c[63])),
                      (i[0] = (i[0] + _) | 0),
                      (i[1] = (i[1] + B) | 0),
                      (i[2] = (i[2] + k) | 0),
                      (i[3] = (i[3] + T) | 0);
                  },
                  _doFinalize: function () {
                    var t = this._data,
                      n = t.words,
                      r = 8 * this._nDataBytes,
                      o = 8 * t.sigBytes;
                    n[o >>> 5] |= 128 << (24 - (o % 32));
                    var i = e.floor(r / 4294967296),
                      a = r;
                    (n[15 + (((o + 64) >>> 9) << 4)] =
                      (16711935 & ((i << 8) | (i >>> 24))) |
                      (4278255360 & ((i << 24) | (i >>> 8)))),
                      (n[14 + (((o + 64) >>> 9) << 4)] =
                        (16711935 & ((a << 8) | (a >>> 24))) |
                        (4278255360 & ((a << 24) | (a >>> 8)))),
                      (t.sigBytes = 4 * (n.length + 1)),
                      this._process();
                    for (var c = this._hash, u = c.words, s = 0; s < 4; s++) {
                      var A = u[s];
                      u[s] =
                        (16711935 & ((A << 8) | (A >>> 24))) |
                        (4278255360 & ((A << 24) | (A >>> 8)));
                    }
                    return c;
                  },
                  clone: function () {
                    var t = i.clone.call(this);
                    return (t._hash = this._hash.clone()), t;
                  },
                }));
                function s(t, e, n, r, o, i, a) {
                  var c = t + ((e & n) | (~e & r)) + o + a;
                  return ((c << i) | (c >>> (32 - i))) + e;
                }
                function A(t, e, n, r, o, i, a) {
                  var c = t + ((e & r) | (n & ~r)) + o + a;
                  return ((c << i) | (c >>> (32 - i))) + e;
                }
                function f(t, e, n, r, o, i, a) {
                  var c = t + (e ^ n ^ r) + o + a;
                  return ((c << i) | (c >>> (32 - i))) + e;
                }
                function l(t, e, n, r, o, i, a) {
                  var c = t + (n ^ (e | ~r)) + o + a;
                  return ((c << i) | (c >>> (32 - i))) + e;
                }
                (n.MD5 = i._createHelper(u)),
                  (n.HmacMD5 = i._createHmacHelper(u));
              })(Math),
              t.MD5
            );
          })(Nw.exports));
        !(function (t) {
          return (
            (n = (e = t).lib),
            (r = n.WordArray),
            (o = n.Hasher),
            (i = e.algo),
            (a = []),
            (c = i.SHA1 =
              o.extend({
                _doReset: function () {
                  this._hash = new r.init([
                    1732584193, 4023233417, 2562383102, 271733878, 3285377520,
                  ]);
                },
                _doProcessBlock: function (t, e) {
                  for (
                    var n = this._hash.words,
                      r = n[0],
                      o = n[1],
                      i = n[2],
                      c = n[3],
                      u = n[4],
                      s = 0;
                    s < 80;
                    s++
                  ) {
                    if (s < 16) a[s] = 0 | t[e + s];
                    else {
                      var A = a[s - 3] ^ a[s - 8] ^ a[s - 14] ^ a[s - 16];
                      a[s] = (A << 1) | (A >>> 31);
                    }
                    var f = ((r << 5) | (r >>> 27)) + u + a[s];
                    (f +=
                      s < 20
                        ? 1518500249 + ((o & i) | (~o & c))
                        : s < 40
                        ? 1859775393 + (o ^ i ^ c)
                        : s < 60
                        ? ((o & i) | (o & c) | (i & c)) - 1894007588
                        : (o ^ i ^ c) - 899497514),
                      (u = c),
                      (c = i),
                      (i = (o << 30) | (o >>> 2)),
                      (o = r),
                      (r = f);
                  }
                  (n[0] = (n[0] + r) | 0),
                    (n[1] = (n[1] + o) | 0),
                    (n[2] = (n[2] + i) | 0),
                    (n[3] = (n[3] + c) | 0),
                    (n[4] = (n[4] + u) | 0);
                },
                _doFinalize: function () {
                  var t = this._data,
                    e = t.words,
                    n = 8 * this._nDataBytes,
                    r = 8 * t.sigBytes;
                  return (
                    (e[r >>> 5] |= 128 << (24 - (r % 32))),
                    (e[14 + (((r + 64) >>> 9) << 4)] = Math.floor(
                      n / 4294967296
                    )),
                    (e[15 + (((r + 64) >>> 9) << 4)] = n),
                    (t.sigBytes = 4 * e.length),
                    this._process(),
                    this._hash
                  );
                },
                clone: function () {
                  var t = o.clone.call(this);
                  return (t._hash = this._hash.clone()), t;
                },
              })),
            (e.SHA1 = o._createHelper(c)),
            (e.HmacSHA1 = o._createHmacHelper(c)),
            t.SHA1
          );
          var e, n, r, o, i, a, c;
        })(Nw.exports);
        (function (t) {
          var e, n, r;
          (n = (e = t).lib.Base),
            (r = e.enc.Utf8),
            (e.algo.HMAC = n.extend({
              init: function (t, e) {
                (t = this._hasher = new t.init()),
                  "string" == typeof e && (e = r.parse(e));
                var n = t.blockSize,
                  o = 4 * n;
                e.sigBytes > o && (e = t.finalize(e)), e.clamp();
                for (
                  var i = (this._oKey = e.clone()),
                    a = (this._iKey = e.clone()),
                    c = i.words,
                    u = a.words,
                    s = 0;
                  s < n;
                  s++
                )
                  (c[s] ^= 1549556828), (u[s] ^= 909522486);
                (i.sigBytes = a.sigBytes = o), this.reset();
              },
              reset: function () {
                var t = this._hasher;
                t.reset(), t.update(this._iKey);
              },
              update: function (t) {
                return this._hasher.update(t), this;
              },
              finalize: function (t) {
                var e,
                  n = this._hasher,
                  r = n.finalize(t);
                return (
                  n.reset(), n.finalize(kg((e = this._oKey.clone())).call(e, r))
                );
              },
            }));
        })(Nw.exports),
          (function (t) {
            return (
              (r = (n = (e = t).lib).Base),
              (o = n.WordArray),
              (a = (i = e.algo).MD5),
              (c = i.EvpKDF =
                r.extend({
                  cfg: r.extend({ keySize: 4, hasher: a, iterations: 1 }),
                  init: function (t) {
                    this.cfg = this.cfg.extend(t);
                  },
                  compute: function (t, e) {
                    for (
                      var n,
                        r = this.cfg,
                        i = r.hasher.create(),
                        a = o.create(),
                        c = a.words,
                        u = r.keySize,
                        s = r.iterations;
                      c.length < u;

                    ) {
                      n && i.update(n),
                        (n = i.update(t).finalize(e)),
                        i.reset();
                      for (var A = 1; A < s; A++)
                        (n = i.finalize(n)), i.reset();
                      kg(a).call(a, n);
                    }
                    return (a.sigBytes = 4 * u), a;
                  },
                })),
              (e.EvpKDF = function (t, e, n) {
                return c.create(n).compute(t, e);
              }),
              t.EvpKDF
            );
            var e, n, r, o, i, a, c;
          })(Nw.exports);
        !(function (t) {
          t.lib.Cipher ||
            (function (e) {
              var n = t,
                r = n.lib,
                o = r.Base,
                i = r.WordArray,
                a = r.BufferedBlockAlgorithm,
                c = n.enc;
              c.Utf8;
              var u = c.Base64,
                s = n.algo.EvpKDF,
                A = (r.Cipher = a.extend({
                  cfg: o.extend(),
                  createEncryptor: function (t, e) {
                    return this.create(this._ENC_XFORM_MODE, t, e);
                  },
                  createDecryptor: function (t, e) {
                    return this.create(this._DEC_XFORM_MODE, t, e);
                  },
                  init: function (t, e, n) {
                    (this.cfg = this.cfg.extend(n)),
                      (this._xformMode = t),
                      (this._key = e),
                      this.reset();
                  },
                  reset: function () {
                    a.reset.call(this), this._doReset();
                  },
                  process: function (t) {
                    return this._append(t), this._process();
                  },
                  finalize: function (t) {
                    return t && this._append(t), this._doFinalize();
                  },
                  keySize: 4,
                  ivSize: 4,
                  _ENC_XFORM_MODE: 1,
                  _DEC_XFORM_MODE: 2,
                  _createHelper: (function () {
                    function t(t) {
                      return "string" == typeof t ? y : m;
                    }
                    return function (e) {
                      return {
                        encrypt: function (n, r, o) {
                          return t(r).encrypt(e, n, r, o);
                        },
                        decrypt: function (n, r, o) {
                          return t(r).decrypt(e, n, r, o);
                        },
                      };
                    };
                  })(),
                }));
              r.StreamCipher = A.extend({
                _doFinalize: function () {
                  return this._process(!0);
                },
                blockSize: 1,
              });
              var f = (n.mode = {}),
                l = (r.BlockCipherMode = o.extend({
                  createEncryptor: function (t, e) {
                    return this.Encryptor.create(t, e);
                  },
                  createDecryptor: function (t, e) {
                    return this.Decryptor.create(t, e);
                  },
                  init: function (t, e) {
                    (this._cipher = t), (this._iv = e);
                  },
                })),
                h = (f.CBC = (function () {
                  var t = l.extend();
                  function e(t, e, n) {
                    var r,
                      o = this._iv;
                    o
                      ? ((r = o), (this._iv = undefined))
                      : (r = this._prevBlock);
                    for (var i = 0; i < n; i++) t[e + i] ^= r[i];
                  }
                  return (
                    (t.Encryptor = t.extend({
                      processBlock: function (t, n) {
                        var r = this._cipher,
                          o = r.blockSize;
                        e.call(this, t, n, o),
                          r.encryptBlock(t, n),
                          (this._prevBlock = ug(t).call(t, n, n + o));
                      },
                    })),
                    (t.Decryptor = t.extend({
                      processBlock: function (t, n) {
                        var r = this._cipher,
                          o = r.blockSize,
                          i = ug(t).call(t, n, n + o);
                        r.decryptBlock(t, n),
                          e.call(this, t, n, o),
                          (this._prevBlock = i);
                      },
                    })),
                    t
                  );
                })()),
                d = ((n.pad = {}).Pkcs7 = {
                  pad: function (t, e) {
                    for (
                      var n = 4 * e,
                        r = n - (t.sigBytes % n),
                        o = (r << 24) | (r << 16) | (r << 8) | r,
                        a = [],
                        c = 0;
                      c < r;
                      c += 4
                    )
                      a.push(o);
                    var u = i.create(a, r);
                    kg(t).call(t, u);
                  },
                  unpad: function (t) {
                    var e = 255 & t.words[(t.sigBytes - 1) >>> 2];
                    t.sigBytes -= e;
                  },
                });
              r.BlockCipher = A.extend({
                cfg: A.cfg.extend({ mode: h, padding: d }),
                reset: function () {
                  var t;
                  A.reset.call(this);
                  var e = this.cfg,
                    n = e.iv,
                    r = e.mode;
                  this._xformMode == this._ENC_XFORM_MODE
                    ? (t = r.createEncryptor)
                    : ((t = r.createDecryptor), (this._minBufferSize = 1)),
                    this._mode && this._mode.__creator == t
                      ? this._mode.init(this, n && n.words)
                      : ((this._mode = t.call(r, this, n && n.words)),
                        (this._mode.__creator = t));
                },
                _doProcessBlock: function (t, e) {
                  this._mode.processBlock(t, e);
                },
                _doFinalize: function () {
                  var t,
                    e = this.cfg.padding;
                  return (
                    this._xformMode == this._ENC_XFORM_MODE
                      ? (e.pad(this._data, this.blockSize),
                        (t = this._process(!0)))
                      : ((t = this._process(!0)), e.unpad(t)),
                    t
                  );
                },
                blockSize: 4,
              });
              var p = (r.CipherParams = o.extend({
                  init: function (t) {
                    this.mixIn(t);
                  },
                  toString: function (t) {
                    return (t || this.formatter).stringify(this);
                  },
                })),
                g = ((n.format = {}).OpenSSL = {
                  stringify: function (t) {
                    var e,
                      n,
                      r = t.ciphertext,
                      o = t.salt;
                    return (
                      o
                        ? kg(
                            (e = kg(
                              (n = i.create([1398893684, 1701076831]))
                            ).call(n, o))
                          ).call(e, r)
                        : r
                    ).toString(u);
                  },
                  parse: function (t) {
                    var e,
                      n = u.parse(t),
                      r = n.words;
                    return (
                      1398893684 == r[0] &&
                        1701076831 == r[1] &&
                        ((e = i.create(ug(r).call(r, 2, 4))),
                        Zy(r).call(r, 0, 4),
                        (n.sigBytes -= 16)),
                      p.create({ ciphertext: n, salt: e })
                    );
                  },
                }),
                m = (r.SerializableCipher = o.extend({
                  cfg: o.extend({ format: g }),
                  encrypt: function (t, e, n, r) {
                    r = this.cfg.extend(r);
                    var o = t.createEncryptor(n, r),
                      i = o.finalize(e),
                      a = o.cfg;
                    return p.create({
                      ciphertext: i,
                      key: n,
                      iv: a.iv,
                      algorithm: t,
                      mode: a.mode,
                      padding: a.padding,
                      blockSize: t.blockSize,
                      formatter: r.format,
                    });
                  },
                  decrypt: function (t, e, n, r) {
                    return (
                      (r = this.cfg.extend(r)),
                      (e = this._parse(e, r.format)),
                      t.createDecryptor(n, r).finalize(e.ciphertext)
                    );
                  },
                  _parse: function (t, e) {
                    return "string" == typeof t ? e.parse(t, this) : t;
                  },
                })),
                v = ((n.kdf = {}).OpenSSL = {
                  execute: function (t, e, n, r) {
                    var o;
                    r || (r = i.random(8));
                    var a = s.create({ keySize: e + n }).compute(t, r),
                      c = i.create(ug((o = a.words)).call(o, e), 4 * n);
                    return (
                      (a.sigBytes = 4 * e), p.create({ key: a, iv: c, salt: r })
                    );
                  },
                }),
                y = (r.PasswordBasedCipher = m.extend({
                  cfg: m.cfg.extend({ kdf: v }),
                  encrypt: function (t, e, n, r) {
                    var o = (r = this.cfg.extend(r)).kdf.execute(
                      n,
                      t.keySize,
                      t.ivSize
                    );
                    r.iv = o.iv;
                    var i = m.encrypt.call(this, t, e, o.key, r);
                    return i.mixIn(o), i;
                  },
                  decrypt: function (t, e, n, r) {
                    (r = this.cfg.extend(r)), (e = this._parse(e, r.format));
                    var o = r.kdf.execute(n, t.keySize, t.ivSize, e.salt);
                    return (r.iv = o.iv), m.decrypt.call(this, t, e, o.key, r);
                  },
                }));
            })();
        })(Nw.exports);
        var Uw = ({ exports: {} }.exports = (function (t) {
            return (
              (function () {
                var e = t,
                  n = e.lib.BlockCipher,
                  r = e.algo,
                  o = [],
                  i = [],
                  a = [],
                  c = [],
                  u = [],
                  s = [],
                  A = [],
                  f = [],
                  l = [],
                  h = [];
                !(function () {
                  for (var t = [], e = 0; e < 256; e++)
                    t[e] = e < 128 ? e << 1 : (e << 1) ^ 283;
                  var n = 0,
                    r = 0;
                  for (e = 0; e < 256; e++) {
                    var d = r ^ (r << 1) ^ (r << 2) ^ (r << 3) ^ (r << 4);
                    (d = (d >>> 8) ^ (255 & d) ^ 99), (o[n] = d), (i[d] = n);
                    var p = t[n],
                      g = t[p],
                      m = t[g],
                      v = (257 * t[d]) ^ (16843008 * d);
                    (a[n] = (v << 24) | (v >>> 8)),
                      (c[n] = (v << 16) | (v >>> 16)),
                      (u[n] = (v << 8) | (v >>> 24)),
                      (s[n] = v),
                      (v =
                        (16843009 * m) ^
                        (65537 * g) ^
                        (257 * p) ^
                        (16843008 * n)),
                      (A[d] = (v << 24) | (v >>> 8)),
                      (f[d] = (v << 16) | (v >>> 16)),
                      (l[d] = (v << 8) | (v >>> 24)),
                      (h[d] = v),
                      n
                        ? ((n = p ^ t[t[t[m ^ p]]]), (r ^= t[t[r]]))
                        : (n = r = 1);
                  }
                })();
                var d = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54],
                  p = (r.AES = n.extend({
                    _doReset: function () {
                      if (!this._nRounds || this._keyPriorReset !== this._key) {
                        for (
                          var t = (this._keyPriorReset = this._key),
                            e = t.words,
                            n = t.sigBytes / 4,
                            r = 4 * ((this._nRounds = n + 6) + 1),
                            i = (this._keySchedule = []),
                            a = 0;
                          a < r;
                          a++
                        )
                          a < n
                            ? (i[a] = e[a])
                            : ((s = i[a - 1]),
                              a % n
                                ? n > 6 &&
                                  a % n == 4 &&
                                  (s =
                                    (o[s >>> 24] << 24) |
                                    (o[(s >>> 16) & 255] << 16) |
                                    (o[(s >>> 8) & 255] << 8) |
                                    o[255 & s])
                                : ((s =
                                    (o[(s = (s << 8) | (s >>> 24)) >>> 24] <<
                                      24) |
                                    (o[(s >>> 16) & 255] << 16) |
                                    (o[(s >>> 8) & 255] << 8) |
                                    o[255 & s]),
                                  (s ^= d[(a / n) | 0] << 24)),
                              (i[a] = i[a - n] ^ s));
                        for (
                          var c = (this._invKeySchedule = []), u = 0;
                          u < r;
                          u++
                        ) {
                          if (((a = r - u), u % 4)) var s = i[a];
                          else s = i[a - 4];
                          c[u] =
                            u < 4 || a <= 4
                              ? s
                              : A[o[s >>> 24]] ^
                                f[o[(s >>> 16) & 255]] ^
                                l[o[(s >>> 8) & 255]] ^
                                h[o[255 & s]];
                        }
                      }
                    },
                    encryptBlock: function (t, e) {
                      this._doCryptBlock(
                        t,
                        e,
                        this._keySchedule,
                        a,
                        c,
                        u,
                        s,
                        o
                      );
                    },
                    decryptBlock: function (t, e) {
                      var n = t[e + 1];
                      (t[e + 1] = t[e + 3]),
                        (t[e + 3] = n),
                        this._doCryptBlock(
                          t,
                          e,
                          this._invKeySchedule,
                          A,
                          f,
                          l,
                          h,
                          i
                        ),
                        (n = t[e + 1]),
                        (t[e + 1] = t[e + 3]),
                        (t[e + 3] = n);
                    },
                    _doCryptBlock: function (t, e, n, r, o, i, a, c) {
                      for (
                        var u = this._nRounds,
                          s = t[e] ^ n[0],
                          A = t[e + 1] ^ n[1],
                          f = t[e + 2] ^ n[2],
                          l = t[e + 3] ^ n[3],
                          h = 4,
                          d = 1;
                        d < u;
                        d++
                      ) {
                        var p =
                            r[s >>> 24] ^
                            o[(A >>> 16) & 255] ^
                            i[(f >>> 8) & 255] ^
                            a[255 & l] ^
                            n[h++],
                          g =
                            r[A >>> 24] ^
                            o[(f >>> 16) & 255] ^
                            i[(l >>> 8) & 255] ^
                            a[255 & s] ^
                            n[h++],
                          m =
                            r[f >>> 24] ^
                            o[(l >>> 16) & 255] ^
                            i[(s >>> 8) & 255] ^
                            a[255 & A] ^
                            n[h++],
                          v =
                            r[l >>> 24] ^
                            o[(s >>> 16) & 255] ^
                            i[(A >>> 8) & 255] ^
                            a[255 & f] ^
                            n[h++];
                        (s = p), (A = g), (f = m), (l = v);
                      }
                      (p =
                        ((c[s >>> 24] << 24) |
                          (c[(A >>> 16) & 255] << 16) |
                          (c[(f >>> 8) & 255] << 8) |
                          c[255 & l]) ^
                        n[h++]),
                        (g =
                          ((c[A >>> 24] << 24) |
                            (c[(f >>> 16) & 255] << 16) |
                            (c[(l >>> 8) & 255] << 8) |
                            c[255 & s]) ^
                          n[h++]),
                        (m =
                          ((c[f >>> 24] << 24) |
                            (c[(l >>> 16) & 255] << 16) |
                            (c[(s >>> 8) & 255] << 8) |
                            c[255 & A]) ^
                          n[h++]),
                        (v =
                          ((c[l >>> 24] << 24) |
                            (c[(s >>> 16) & 255] << 16) |
                            (c[(A >>> 8) & 255] << 8) |
                            c[255 & f]) ^
                          n[h++]),
                        (t[e] = p),
                        (t[e + 1] = g),
                        (t[e + 2] = m),
                        (t[e + 3] = v);
                    },
                    keySize: 8,
                  }));
                e.AES = n._createHelper(p);
              })(),
              t.AES
            );
          })(Nw.exports)),
          Kw = ({ exports: {} }.exports = (function (t) {
            return (
              (function (e) {
                var n = t,
                  r = n.lib,
                  o = r.WordArray,
                  i = r.Hasher,
                  a = n.algo,
                  c = [],
                  u = [];
                !(function () {
                  function t(t) {
                    for (var n = e.sqrt(t), r = 2; r <= n; r++)
                      if (!(t % r)) return !1;
                    return !0;
                  }
                  function n(t) {
                    return (4294967296 * (t - (0 | t))) | 0;
                  }
                  for (var r = 2, o = 0; o < 64; )
                    t(r) &&
                      (o < 8 && (c[o] = n(e.pow(r, 0.5))),
                      (u[o] = n(e.pow(r, 1 / 3))),
                      o++),
                      r++;
                })();
                var s = [],
                  A = (a.SHA256 = i.extend({
                    _doReset: function () {
                      this._hash = new o.init(ug(c).call(c, 0));
                    },
                    _doProcessBlock: function (t, e) {
                      for (
                        var n = this._hash.words,
                          r = n[0],
                          o = n[1],
                          i = n[2],
                          a = n[3],
                          c = n[4],
                          A = n[5],
                          f = n[6],
                          l = n[7],
                          h = 0;
                        h < 64;
                        h++
                      ) {
                        if (h < 16) s[h] = 0 | t[e + h];
                        else {
                          var d = s[h - 15],
                            p =
                              ((d << 25) | (d >>> 7)) ^
                              ((d << 14) | (d >>> 18)) ^
                              (d >>> 3),
                            g = s[h - 2],
                            m =
                              ((g << 15) | (g >>> 17)) ^
                              ((g << 13) | (g >>> 19)) ^
                              (g >>> 10);
                          s[h] = p + s[h - 7] + m + s[h - 16];
                        }
                        var v = (r & o) ^ (r & i) ^ (o & i),
                          y =
                            ((r << 30) | (r >>> 2)) ^
                            ((r << 19) | (r >>> 13)) ^
                            ((r << 10) | (r >>> 22)),
                          w =
                            l +
                            (((c << 26) | (c >>> 6)) ^
                              ((c << 21) | (c >>> 11)) ^
                              ((c << 7) | (c >>> 25))) +
                            ((c & A) ^ (~c & f)) +
                            u[h] +
                            s[h];
                        (l = f),
                          (f = A),
                          (A = c),
                          (c = (a + w) | 0),
                          (a = i),
                          (i = o),
                          (o = r),
                          (r = (w + (y + v)) | 0);
                      }
                      (n[0] = (n[0] + r) | 0),
                        (n[1] = (n[1] + o) | 0),
                        (n[2] = (n[2] + i) | 0),
                        (n[3] = (n[3] + a) | 0),
                        (n[4] = (n[4] + c) | 0),
                        (n[5] = (n[5] + A) | 0),
                        (n[6] = (n[6] + f) | 0),
                        (n[7] = (n[7] + l) | 0);
                    },
                    _doFinalize: function () {
                      var t = this._data,
                        n = t.words,
                        r = 8 * this._nDataBytes,
                        o = 8 * t.sigBytes;
                      return (
                        (n[o >>> 5] |= 128 << (24 - (o % 32))),
                        (n[14 + (((o + 64) >>> 9) << 4)] = e.floor(
                          r / 4294967296
                        )),
                        (n[15 + (((o + 64) >>> 9) << 4)] = r),
                        (t.sigBytes = 4 * n.length),
                        this._process(),
                        this._hash
                      );
                    },
                    clone: function () {
                      var t = i.clone.call(this);
                      return (t._hash = this._hash.clone()), t;
                    },
                  }));
                (n.SHA256 = i._createHelper(A)),
                  (n.HmacSHA256 = i._createHmacHelper(A));
              })(Math),
              t.SHA256
            );
          })(Nw.exports)),
          qw = ({ exports: {} }.exports = (function (t) {
            return t.HmacSHA256;
          })(Nw.exports));
        !(function (t) {
          return (
            (n = (e = t).lib),
            (r = n.Base),
            (o = n.WordArray),
            ((i = e.x64 = {}).Word = r.extend({
              init: function (t, e) {
                (this.high = t), (this.low = e);
              },
            })),
            (i.WordArray = r.extend({
              init: function (t, e) {
                (t = this.words = t || []),
                  (this.sigBytes = null != e ? e : 8 * t.length);
              },
              toX32: function () {
                for (
                  var t = this.words, e = t.length, n = [], r = 0;
                  r < e;
                  r++
                ) {
                  var i = t[r];
                  n.push(i.high), n.push(i.low);
                }
                return o.create(n, this.sigBytes);
              },
              clone: function () {
                for (
                  var t,
                    e = r.clone.call(this),
                    n = (e.words = ug((t = this.words)).call(t, 0)),
                    o = n.length,
                    i = 0;
                  i < o;
                  i++
                )
                  n[i] = n[i].clone();
                return e;
              },
            })),
            t
          );
          var e, n, r, o, i;
        })(Nw.exports);
        var Gw = ({ exports: {} }.exports = (function (t) {
            return (
              (function () {
                var e = t,
                  n = e.lib.Hasher,
                  r = e.x64,
                  o = r.Word,
                  i = r.WordArray,
                  a = e.algo;
                function c() {
                  return o.create.apply(o, arguments);
                }
                var u = [
                    c(1116352408, 3609767458),
                    c(1899447441, 602891725),
                    c(3049323471, 3964484399),
                    c(3921009573, 2173295548),
                    c(961987163, 4081628472),
                    c(1508970993, 3053834265),
                    c(2453635748, 2937671579),
                    c(2870763221, 3664609560),
                    c(3624381080, 2734883394),
                    c(310598401, 1164996542),
                    c(607225278, 1323610764),
                    c(1426881987, 3590304994),
                    c(1925078388, 4068182383),
                    c(2162078206, 991336113),
                    c(2614888103, 633803317),
                    c(3248222580, 3479774868),
                    c(3835390401, 2666613458),
                    c(4022224774, 944711139),
                    c(264347078, 2341262773),
                    c(604807628, 2007800933),
                    c(770255983, 1495990901),
                    c(1249150122, 1856431235),
                    c(1555081692, 3175218132),
                    c(1996064986, 2198950837),
                    c(2554220882, 3999719339),
                    c(2821834349, 766784016),
                    c(2952996808, 2566594879),
                    c(3210313671, 3203337956),
                    c(3336571891, 1034457026),
                    c(3584528711, 2466948901),
                    c(113926993, 3758326383),
                    c(338241895, 168717936),
                    c(666307205, 1188179964),
                    c(773529912, 1546045734),
                    c(1294757372, 1522805485),
                    c(1396182291, 2643833823),
                    c(1695183700, 2343527390),
                    c(1986661051, 1014477480),
                    c(2177026350, 1206759142),
                    c(2456956037, 344077627),
                    c(2730485921, 1290863460),
                    c(2820302411, 3158454273),
                    c(3259730800, 3505952657),
                    c(3345764771, 106217008),
                    c(3516065817, 3606008344),
                    c(3600352804, 1432725776),
                    c(4094571909, 1467031594),
                    c(275423344, 851169720),
                    c(430227734, 3100823752),
                    c(506948616, 1363258195),
                    c(659060556, 3750685593),
                    c(883997877, 3785050280),
                    c(958139571, 3318307427),
                    c(1322822218, 3812723403),
                    c(1537002063, 2003034995),
                    c(1747873779, 3602036899),
                    c(1955562222, 1575990012),
                    c(2024104815, 1125592928),
                    c(2227730452, 2716904306),
                    c(2361852424, 442776044),
                    c(2428436474, 593698344),
                    c(2756734187, 3733110249),
                    c(3204031479, 2999351573),
                    c(3329325298, 3815920427),
                    c(3391569614, 3928383900),
                    c(3515267271, 566280711),
                    c(3940187606, 3454069534),
                    c(4118630271, 4000239992),
                    c(116418474, 1914138554),
                    c(174292421, 2731055270),
                    c(289380356, 3203993006),
                    c(460393269, 320620315),
                    c(685471733, 587496836),
                    c(852142971, 1086792851),
                    c(1017036298, 365543100),
                    c(1126000580, 2618297676),
                    c(1288033470, 3409855158),
                    c(1501505948, 4234509866),
                    c(1607167915, 987167468),
                    c(1816402316, 1246189591),
                  ],
                  s = [];
                !(function () {
                  for (var t = 0; t < 80; t++) s[t] = c();
                })();
                var A = (a.SHA512 = n.extend({
                  _doReset: function () {
                    this._hash = new i.init([
                      new o.init(1779033703, 4089235720),
                      new o.init(3144134277, 2227873595),
                      new o.init(1013904242, 4271175723),
                      new o.init(2773480762, 1595750129),
                      new o.init(1359893119, 2917565137),
                      new o.init(2600822924, 725511199),
                      new o.init(528734635, 4215389547),
                      new o.init(1541459225, 327033209),
                    ]);
                  },
                  _doProcessBlock: function (t, e) {
                    for (
                      var n = this._hash.words,
                        r = n[0],
                        o = n[1],
                        i = n[2],
                        a = n[3],
                        c = n[4],
                        A = n[5],
                        f = n[6],
                        l = n[7],
                        h = r.high,
                        d = r.low,
                        p = o.high,
                        g = o.low,
                        m = i.high,
                        v = i.low,
                        y = a.high,
                        w = a.low,
                        b = c.high,
                        C = c.low,
                        I = A.high,
                        S = A.low,
                        x = f.high,
                        E = f.low,
                        _ = l.high,
                        B = l.low,
                        k = h,
                        T = d,
                        D = p,
                        O = g,
                        P = m,
                        M = v,
                        j = y,
                        L = w,
                        N = b,
                        z = C,
                        Q = I,
                        R = S,
                        W = x,
                        F = E,
                        U = _,
                        K = B,
                        q = 0;
                      q < 80;
                      q++
                    ) {
                      var G,
                        V,
                        J = s[q];
                      if (q < 16)
                        (V = J.high = 0 | t[e + 2 * q]),
                          (G = J.low = 0 | t[e + 2 * q + 1]);
                      else {
                        var H = s[q - 15],
                          Z = H.high,
                          Y = H.low,
                          X =
                            ((Z >>> 1) | (Y << 31)) ^
                            ((Z >>> 8) | (Y << 24)) ^
                            (Z >>> 7),
                          $ =
                            ((Y >>> 1) | (Z << 31)) ^
                            ((Y >>> 8) | (Z << 24)) ^
                            ((Y >>> 7) | (Z << 25)),
                          tt = s[q - 2],
                          et = tt.high,
                          nt = tt.low,
                          rt =
                            ((et >>> 19) | (nt << 13)) ^
                            ((et << 3) | (nt >>> 29)) ^
                            (et >>> 6),
                          ot =
                            ((nt >>> 19) | (et << 13)) ^
                            ((nt << 3) | (et >>> 29)) ^
                            ((nt >>> 6) | (et << 26)),
                          it = s[q - 7],
                          at = it.high,
                          ct = it.low,
                          ut = s[q - 16],
                          st = ut.high,
                          At = ut.low;
                        (V =
                          (V =
                            (V =
                              X + at + ((G = $ + ct) >>> 0 < $ >>> 0 ? 1 : 0)) +
                            rt +
                            ((G += ot) >>> 0 < ot >>> 0 ? 1 : 0)) +
                          st +
                          ((G += At) >>> 0 < At >>> 0 ? 1 : 0)),
                          (J.high = V),
                          (J.low = G);
                      }
                      var ft,
                        lt = (N & Q) ^ (~N & W),
                        ht = (z & R) ^ (~z & F),
                        dt = (k & D) ^ (k & P) ^ (D & P),
                        pt = (T & O) ^ (T & M) ^ (O & M),
                        gt =
                          ((k >>> 28) | (T << 4)) ^
                          ((k << 30) | (T >>> 2)) ^
                          ((k << 25) | (T >>> 7)),
                        mt =
                          ((T >>> 28) | (k << 4)) ^
                          ((T << 30) | (k >>> 2)) ^
                          ((T << 25) | (k >>> 7)),
                        vt =
                          ((N >>> 14) | (z << 18)) ^
                          ((N >>> 18) | (z << 14)) ^
                          ((N << 23) | (z >>> 9)),
                        yt =
                          ((z >>> 14) | (N << 18)) ^
                          ((z >>> 18) | (N << 14)) ^
                          ((z << 23) | (N >>> 9)),
                        wt = u[q],
                        bt = wt.high,
                        Ct = wt.low,
                        It = U + vt + ((ft = K + yt) >>> 0 < K >>> 0 ? 1 : 0),
                        St = mt + pt;
                      (U = W),
                        (K = F),
                        (W = Q),
                        (F = R),
                        (Q = N),
                        (R = z),
                        (N =
                          (j +
                            (It =
                              (It =
                                (It =
                                  It +
                                  lt +
                                  ((ft += ht) >>> 0 < ht >>> 0 ? 1 : 0)) +
                                bt +
                                ((ft += Ct) >>> 0 < Ct >>> 0 ? 1 : 0)) +
                              V +
                              ((ft += G) >>> 0 < G >>> 0 ? 1 : 0)) +
                            ((z = (L + ft) | 0) >>> 0 < L >>> 0 ? 1 : 0)) |
                          0),
                        (j = P),
                        (L = M),
                        (P = D),
                        (M = O),
                        (D = k),
                        (O = T),
                        (k =
                          (It +
                            (gt + dt + (St >>> 0 < mt >>> 0 ? 1 : 0)) +
                            ((T = (ft + St) | 0) >>> 0 < ft >>> 0 ? 1 : 0)) |
                          0);
                    }
                    (d = r.low = d + T),
                      (r.high = h + k + (d >>> 0 < T >>> 0 ? 1 : 0)),
                      (g = o.low = g + O),
                      (o.high = p + D + (g >>> 0 < O >>> 0 ? 1 : 0)),
                      (v = i.low = v + M),
                      (i.high = m + P + (v >>> 0 < M >>> 0 ? 1 : 0)),
                      (w = a.low = w + L),
                      (a.high = y + j + (w >>> 0 < L >>> 0 ? 1 : 0)),
                      (C = c.low = C + z),
                      (c.high = b + N + (C >>> 0 < z >>> 0 ? 1 : 0)),
                      (S = A.low = S + R),
                      (A.high = I + Q + (S >>> 0 < R >>> 0 ? 1 : 0)),
                      (E = f.low = E + F),
                      (f.high = x + W + (E >>> 0 < F >>> 0 ? 1 : 0)),
                      (B = l.low = B + K),
                      (l.high = _ + U + (B >>> 0 < K >>> 0 ? 1 : 0));
                  },
                  _doFinalize: function () {
                    var t = this._data,
                      e = t.words,
                      n = 8 * this._nDataBytes,
                      r = 8 * t.sigBytes;
                    return (
                      (e[r >>> 5] |= 128 << (24 - (r % 32))),
                      (e[30 + (((r + 128) >>> 10) << 5)] = Math.floor(
                        n / 4294967296
                      )),
                      (e[31 + (((r + 128) >>> 10) << 5)] = n),
                      (t.sigBytes = 4 * e.length),
                      this._process(),
                      this._hash.toX32()
                    );
                  },
                  clone: function () {
                    var t = n.clone.call(this);
                    return (t._hash = this._hash.clone()), t;
                  },
                  blockSize: 32,
                }));
                (e.SHA512 = n._createHelper(A)),
                  (e.HmacSHA512 = n._createHmacHelper(A));
              })(),
              t.SHA512
            );
          })(Nw.exports)),
          Vw = ({ exports: {} }.exports = (function (t) {
            return t.HmacSHA512;
          })(Nw.exports)),
          Jw = ({ exports: {} }.exports = (function (t) {
            return t.HmacMD5;
          })(Nw.exports));
        function Hw(t, e) {
          function n(t, e, n, r) {
            return $w(r - -875, e);
          }
          var r = {
            vKRae: "1|0|4|3|2",
            PahBQ: function (t, e) {
              return t(e);
            },
            Duklj: function (t, e) {
              return t != e;
            },
            nbXWH: function (t, e) {
              return t(e);
            },
            FMotf: function (t, e) {
              return t && e;
            },
            meAhl: "number",
            ItyWq:
              o(-258, -292) +
              "tempt to i" +
              o(-360, -348) +
              n(0, -443, 0, -414) +
              o(-288, -313) +
              "In order t" +
              n(0, -422, 0, -438) +
              n(0, -394, 0, -379) +
              "rray objec" +
              o(-349, -326) +
              "ve a [Symb" +
              n(0, -441, 0, -410) +
              "r]() method.",
          };
          function o(t, e, n, r) {
            return $w(e - -780, t);
          }
          for (var i = r.vKRae[n(0, -356, 0, -376)]("|"), a = 0; ; ) {
            switch (i[a++]) {
              case "0":
                var c;
                continue;
              case "1":
                var u = {
                  zfUkm: function (t, e) {
                    return r[n(0, 404, 0, -391)](t, e);
                  },
                  CyNpV: function (t, e) {
                    return r[o(-275, -314)](t, e);
                  },
                };
                continue;
              case "2":
                return {
                  s: function () {
                    c = u[o(-516, -299)](pw, t);
                  },
                  n: function () {
                    var t = c[n(0, -408, 0, -383)]();
                    return (A = t.done), t;
                  },
                  e: function (t) {
                    (f = !0), (s = t);
                  },
                  f: function () {
                    function t(t, e, n, r) {
                      return o(t, n - 657);
                    }
                    try {
                      !A &&
                        u.CyNpV(c[t(284, 0, 307)], null) &&
                        c[t(316, 0, 307)]();
                    } finally {
                      if (f) throw s;
                    }
                  },
                };
              case "3":
                var s,
                  A = !0,
                  f = !1;
                continue;
              case "4":
                if (
                  typeof rp === o(-319, -293) ||
                  null == r[o(-283, -297)](hw, t)
                ) {
                  if (
                    r[o(-313, -297)](dw, t) ||
                    (c = r[o(-277, -296)](Zw, t)) ||
                    (r[n(0, -411, 0, -377)](e, t) &&
                      typeof t[n(0, -374, 0, -385)] === r[o(-278, -309)])
                  ) {
                    c && (t = c);
                    var l = 0,
                      h = function () {},
                      d = {};
                    return (
                      (d.s = h),
                      (d.n = function () {
                        var e = {};
                        function r(t, e, r, o) {
                          return n(0, r, 0, t - 71);
                        }
                        if (((e.done = !0), l >= t[r(-314, 0, -312)])) return e;
                        var o = {};
                        return (
                          (o[r(-353, 0, -317)] = !1),
                          (o[n(0, 684, 0, -429)] = t[l++]),
                          o
                        );
                      }),
                      (d.e = function (t) {
                        throw t;
                      }),
                      (d.f = h),
                      d
                    );
                  }
                  throw new TypeError(r[o(-347, -332)]);
                }
                continue;
            }
            break;
          }
        }
        function Zw(t, e) {
          var n,
            r = {
              EEPKE: function (t, e) {
                return t === e;
              },
              CzjJW: o(176, 213),
              xRnAv: function (t, e, n) {
                return t(e, n);
              },
              vBKSv: function (t, e) {
                return t(e);
              },
              TNcXj: function (t, e) {
                return t === e;
              },
              zIVpY: "Object",
              JyJvj: o(152, 145),
              wDqNC: a(102, 95, 81),
              vUhNy: function (t, e) {
                return t === e;
              },
              tPFfU: o(151, 168),
              syEvv: function (t, e, n) {
                return t(e, n);
              },
            };
          function o(t, e, n, r) {
            return $w(t - -282, e);
          }
          if (t) {
            if (r[o(174, 199)](typeof t, r.CzjJW))
              return r[a(51, 69, 85)](Yw, t, e);
            var i = r
              .vBKSv(
                ug,
                (n = Object[a(144, 108, 92)][o(158, 145)][o(190, 163)](t))
              )
              [a(108, 110, 116)](n, 8, -1);
            return (
              r[a(0, 111, 116)](i, r[o(186, 155)]) &&
                t[o(215, 199) + "r"] &&
                (i = t.constructor[a(0, 117, 136)]),
              r[a(0, 111, 104)](i, r.JyJvj) || r[o(174, 178)](i, r[o(161, 174)])
                ? r[o(213, 246)](lw, t)
                : r.vUhNy(i, r[o(196, 223)]) ||
                  /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/[a(0, 100, 91)](i)
                ? r.syEvv(Yw, t, e)
                : void 0
            );
          }
          function a(t, e, n, r) {
            return $w(e - -362, n);
          }
        }
        function Yw(t, e) {
          function n(t, e, n, r) {
            return $w(e - -361, t);
          }
          var r = {
            BJskb: function (t, e) {
              return t == e;
            },
          };
          (r[n(82, 68)] = function (t, e) {
            return t > e;
          }),
            (r[c(-195, -162, -229)] = function (t, e) {
              return t < e;
            });
          var o = r;
          (o[n(89, 66)](e, null) ||
            o[c(-241, -273, -227)](e, t[c(-180, -168, -150)])) &&
            (e = t[c(-180, -171, -151)]);
          for (var i = 0, a = new Array(e); o[n(147, 114)](i, e); i++)
            a[i] = t[i];
          function c(t, e, n, r) {
            return $w(t - -670, n);
          }
          return a;
        }
        function Xw() {
          var t = [
            "DhmGBxvZDcbOyq",
            "yKfpvfO",
            "ruvqs0u",
            "u2v0",
            "C3rYAw5N",
            "u0zeChu",
            "ugzhB2S",
            "lwL0zxjHyMXLia",
            "DgvZDa",
            "nMqWAMHXDZnWyq",
            "u0vbsgm",
            "B2WUAxrLCMf0BW",
            "rhvRBgO",
            "Aw5ZDgfUy2uUcG",
            "EKLwCfK",
            "CMfUzg9T",
            "ChjVDg90ExbL",
            "BwvbAgW",
            "y2fSBa",
            "ve5JwgO",
            "mJC1ndKXofjry3PZqW",
            "quv3EKW",
            "ChvZAa",
            "DNLrC0S",
            "DfbgzLu",
            "BMfTzq",
            "mtyZmg1zzMfiAq",
            "EMzvA20",
            "odi0otu1m2XAAe9Kyq",
            "BMjyv0G",
            "ugfOqLe",
            "AgPZBKK",
            "BfvICg0",
            "Dw5KzwzPBMvK",
            "sw52ywXPzcbHDa",
            "nZq2ofzxCxLpwa",
            "BgvUz3rO",
            "ohLXy25SAq",
            "BMv4Da",
            "mtK3nZGYnJbjugT3wxe",
            "DhH1rwW",
            "DKjlu3y",
            "yMXLlcbUB24Tyq",
            "y29UC3rYDwn0BW",
            "rK1VDgy",
            "C3bSAxq",
            "mtaYodG2mfnHDwrMDa",
            "qKPZA2i",
            "Cg9W",
            "yNvSs2u",
            "CMv0DxjU",
            "EfjUqxy",
            "DgvYyxrLig5VBG",
            "qxjNDw1LBNrZ",
            "twfW",
            "sMz0svm",
            "mtf8oxW1Fda",
            "BYbIzsbPDgvYyq",
            "weH4Bfm",
            "AuvHwfC",
            "Dg9tDhjPBMC",
            "BNvT",
            "mZmYmdK4mKjWzgTICG",
            "D0rXtKm",
            "otmZzNPLA1rA",
            "mxWYFdr8mhWZ",
            "DMfSDwu",
            "AM9PBG",
            "sxr5v3e",
            "CMvQBuS",
            "BhfjtLi",
            "zg9Uzq",
            "CvbxrxC",
            "mti1nvPUz0nxBa",
          ];
          return (Xw = function () {
            return t;
          })();
        }
        function $w(t, e) {
          var n = Xw();
          return ($w = function (e, r) {
            var o = n[(e -= 427)];
            if (void 0 === $w.CPurdB) {
              ($w.KYcvch = function (t) {
                for (
                  var e, n, r = "", o = "", i = 0, a = 0;
                  (n = t.charAt(a++));
                  ~n && ((e = i % 4 ? 64 * e + n : n), i++ % 4)
                    ? (r += String.fromCharCode(255 & (e >> ((-2 * i) & 6))))
                    : 0
                )
                  n =
                    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=".indexOf(
                      n
                    );
                for (var c = 0, u = r.length; c < u; c++)
                  o += "%" + ("00" + r.charCodeAt(c).toString(16)).slice(-2);
                return decodeURIComponent(o);
              }),
                (t = arguments),
                ($w.CPurdB = !0);
            }
            var i = e + n[0],
              a = t[i];
            return a ? (o = a) : ((o = $w.KYcvch(o)), (t[i] = o)), o;
          })(t, e);
        }
        function tb() {
          var t = {
            lqINR: "6|3|2|12|4|10|7|1|8|" + e(1243, 1243, 1238, 1219),
            lUbpm: function (t, e, n) {
              return t(e, n);
            },
            JftIS: function (t, e) {
              return t(e);
            },
            vyQsK: function (t, e) {
              return t - e;
            },
            txuEl: function (t, e) {
              return t > e;
            },
          };
          function e(t, e, n, r) {
            return $w(r - 783, e);
          }
          function n(t, e, n, r) {
            return $w(e - 256, n);
          }
          for (var r = t[n(0, 706, 732)][e(0, 1267, 0, 1282)]("|"), o = 0; ; ) {
            switch (r[o++]) {
              case "0":
                return A;
              case "1":
                var i = ug(d).call(d, 14);
                continue;
              case "2":
                var a = eb();
                continue;
              case "3":
                var c = t[e(0, 1290, 0, 1269)](nb, f, 4);
                continue;
              case "4":
                var u = {};
                (u.size = a), (u[n(0, 697, 714)] = p);
                var s =
                  rb(u) +
                  c +
                  t[n(0, 691, 674)](rb, {
                    size: t[e(0, 1235, 0, 1260)](12, a) - 1,
                    num: p,
                  }) +
                  a;
                continue;
              case "5":
                var A = h[n(0, 703, 676)]("");
                continue;
              case "6":
                var f = n(0, 719, 686);
                continue;
              case "7":
                var l = t.JftIS(ug, d)[e(0, 1232, 0, 1255)](d, 0, 14);
                continue;
              case "8":
                var h = [];
                continue;
              case "9":
                h = t[e(0, 1209, 0, 1218)](kg, h)[n(0, 728, 699)](h, i);
                continue;
              case "10":
                var d = s[e(0, 1269, 0, 1282)]("");
                continue;
              case "11":
                for (; t[e(0, 1310, 0, 1277)](l[n(0, 746, 734)], 0); )
                  h.push(
                    t[e(0, 1226, 0, 1260)](
                      35,
                      t[e(0, 1239, 0, 1269)](hm, l[n(0, 684, 703)](), 36)
                    )[n(0, 696, 664)](36)
                  );
                continue;
              case "12":
                var p = t[n(0, 742, 753)](ob, f, c);
                continue;
            }
            break;
          }
        }
        function eb() {
          return (10 * Math[$w(469, -465)]()) | 0;
        }
        function nb(t, e) {
          var n,
            r = {
              PfGok: function (t, e) {
                return t(e);
              },
              bAOTZ: function (t, e) {
                return t < e;
              },
              qPWEw: function (t, e) {
                return t * e;
              },
              rejmK: function (t, e) {
                return t == e;
              },
              xJXfP: function (t, e) {
                return t < e;
              },
              SFDpu: function (t, e) {
                return t * e;
              },
            },
            o = [],
            i = t[s(899, 934)],
            a = r[s(921, 904)](Hw, t);
          try {
            for (a.s(); !(n = a.n()).done; ) {
              var c = n[u(1179, 1213, 1191, 1223)];
              if (
                r[s(927, 899, 888, 900)](
                  r[s(930, 896, 888, 897)](Math[s(894, 913, 948, 895)](), i),
                  e
                ) &&
                (o[s(923, 920, 938, 887)](c),
                r[u(1213, 1196, 1194, 1163)](--e, 0))
              )
                break;
              i--;
            }
          } catch (t) {
            a.e(t);
          } finally {
            a.f();
          }
          function u(t, e, n, r) {
            return $w(n - 745, r);
          }
          function s(t, e, n, r) {
            return $w(e - 444, t);
          }
          for (var A = "", f = 0; r.xJXfP(f, o.length); f++) {
            var l =
              0 |
              r[s(904, 903)](
                Math[u(0, 0, 1214, 1207)](),
                o[u(0, 0, 1235, 1269)] - f
              );
            (A += o[l]), (o[l] = o[o.length - f - 1]);
          }
          return A;
        }
        function rb(t) {
          var e = {};
          function n(t, e, n, r) {
            return $w(e - 236, r);
          }
          (e[a(-17, -49, 6)] = n(0, 681, 0, 691)),
            (e[n(0, 721, 0, 708)] = function (t, e) {
              return t | e;
            });
          var r = e,
            o = r[a(-17, -7, 14)].split("|"),
            i = 0;
          function a(t, e, n, r) {
            return $w(t - -455, n);
          }
          for (;;) {
            switch (o[i++]) {
              case "0":
                for (; c--; )
                  A +=
                    s[r[n(0, 721, 0, 695)](Math[a(14, 0, 9)]() * s.length, 0)];
                continue;
              case "1":
                var c = t.size,
                  u = t[a(-14, 0, -37)];
                continue;
              case "2":
                var s = u;
                continue;
              case "3":
                return A;
              case "4":
                var A = "";
                continue;
            }
            break;
          }
        }
        function ob(t, e) {
          var n = {
            VQOZS: function (t, e) {
              return t < e;
            },
            SEAHc: function (t, e) {
              return t(e);
            },
            iEaXW: function (t, e) {
              return t !== e;
            },
          };
          function r(t, e, n, r) {
            return $w(e - -649, t);
          }
          for (var o = 0; n.VQOZS(o, e[r(-155, -159)]); o++) {
            var i = n[r(-151, -185)](Qg, t).call(t, e[o]);
            n[r(-235, -210)](i, -1) && (t = t.replace(e[o], ""));
          }
          return t;
        }
        !(function (t, e) {
          var n = Xw();
          function r(t, e, n, r) {
            return $w(r - 760, e);
          }
          function o(t, e, n, r) {
            return $w(r - -969, n);
          }
          for (;;)
            try {
              if (
                520330 ==
                (parseInt(o(0, 0, -551, -516)) / 1) *
                  (parseInt(r(0, 1272, 0, 1240)) / 2) +
                  (parseInt(o(0, 0, -501, -525)) / 3) *
                    (-parseInt(r(0, 1282, 0, 1249)) / 4) +
                  parseInt(r(0, 1285, 0, 1260)) / 5 +
                  parseInt(r(0, 1261, 0, 1234)) / 6 +
                  parseInt(r(0, 1181, 0, 1202)) / 7 +
                  (-parseInt(r(0, 1284, 0, 1251)) / 8) *
                    (-parseInt(r(0, 1209, 0, 1242)) / 9) +
                  -parseInt(r(0, 1245, 0, 1253)) / 10
              )
                break;
              n.push(n.shift());
            } catch (t) {
              n.push(n.shift());
            }
        })();
        var ib,
          ab = {};
        function cb(t, e, n, r) {
          return fb(n - -412, t);
        }
        function ub() {
          var t = [
            "wvPizKG",
            "Cg93",
            "BgvUz3rO",
            "qu1zq3G",
            "y2fSBa",
            "CgXHDgzVCM0",
            "qu1fqLG",
            "Dg9tDhjPBMC",
            "y3zzAuO",
            "BLnlwxK",
            "qvfftge",
            "ntK2nJu1vw5rqMXI",
            "BhnXwMu",
            "mtb8mtf8mG",
            "CMfUzg9T",
            "DwrizeK",
            "wKzwvgy",
            "Bwf4",
            "C3rYAw5NAwz5",
            "ChjVDg90ExbL",
            "s1fsB0y",
            "zMXVB3i",
            "mdaWmdaWmda",
            "ywrSzxiZmG",
            "ywPyEKy",
            "s0DdCLG",
            "EKHVBLK",
            "sgnkv2i",
            "AM9PBG",
            "mJmYmdC0ogzICvHrEq",
            "CwvTnYSPzYveAa",
            "B2Pnr2e",
            "mte0mtC4nhfOuLPIsG",
            "DMvYC2LVBG",
            "zxHWCG",
            "y2LWAgvY",
            "BgHdrfO",
            "zw5JCNLWDa",
            "oxWXmhW1Fdz8mq",
            "y2HHCKnVzgvbDa",
            "mNWYFdH8mtn8na",
            "C3vIC3rY",
            "zxHWAxjLCW",
            "otG2ngzyCg1SyW",
            "C2v0",
            "u0j6tvG",
            "wKXYtve",
            "odGWnZm2mhD3r3nQtq",
            "ngnbEuT4uW",
            "vevIDNm",
            "ueTqt2q",
            "uLjxyxq",
            "ExzPAfq",
            "ohWXnhWXm3W2Fa",
            "qK5PB1K",
            "mJDhqNHKv1a",
            "C1LWrhy",
            "BLrZwhK",
            "BxHlBuO",
            "C3rY",
            "zwneq1u",
            "z3K3itvR",
            "wujIy1u",
            "zxDtwuK",
            "mvfluhjtDG",
            "sKjSEhq",
            "nxWXnxW5Fdr8ma",
            "ChjVzhvJzxi",
            "Fdn8mxWXmNW3Fa",
            "mJrbuu5XtNy",
            "BwfNAwm",
            "s1fVtfm",
            "mtq4odq4ofbOB3bntW",
            "ENPduw0",
            "nJm1mdmYnxvYs2jXwa",
            "mNWWFdD8oxW1",
            "nZCXmwDPshfkrG",
            "CgfYC2u",
            "C3bSAxq",
            "C2v0vwLUDdmY",
            "y2LWAgvYDgv4Da",
            "vuzKzwy",
          ];
          return (ub = function () {
            return t;
          })();
        }
        (ib = function (t) {
          (t.version = "1.2.0"),
            (t.bstr = function (t, e) {
              var n = 1,
                r = 0,
                o = t.length,
                i = 0;
              "number" == typeof e && ((n = 65535 & e), (r = e >>> 16));
              for (var a = 0; a < o; ) {
                for (i = Math.min(o - a, 3850) + a; a < i; a++)
                  r += n += 255 & t.charCodeAt(a);
                (n = 15 * (n >>> 16) + (65535 & n)),
                  (r = 15 * (r >>> 16) + (65535 & r));
              }
              return (r % 65521 << 16) | n % 65521;
            }),
            (t.buf = function (t, e) {
              var n = 1,
                r = 0,
                o = t.length,
                i = 0;
              "number" == typeof e &&
                ((n = 65535 & e), (r = (e >>> 16) & 65535));
              for (var a = 0; a < o; ) {
                for (i = Math.min(o - a, 3850) + a; a < i; a++)
                  r += n += 255 & t[a];
                (n = 15 * (n >>> 16) + (65535 & n)),
                  (r = 15 * (r >>> 16) + (65535 & r));
              }
              return (r % 65521 << 16) | n % 65521;
            }),
            (t.str = function (t, e) {
              var n = 1,
                r = 0,
                o = t.length,
                i = 0,
                a = 0,
                c = 0;
              "number" == typeof e && ((n = 65535 & e), (r = e >>> 16));
              for (var u = 0; u < o; ) {
                for (i = Math.min(o - u, 3850); i > 0; )
                  (a = t.charCodeAt(u++)) < 128
                    ? (n += a)
                    : a < 2048
                    ? ((r += n += 192 | ((a >> 6) & 31)),
                      --i,
                      (n += 128 | (63 & a)))
                    : a >= 55296 && a < 57344
                    ? ((r += n += 240 | (((a = 64 + (1023 & a)) >> 8) & 7)),
                      --i,
                      (r += n += 128 | ((a >> 2) & 63)),
                      --i,
                      (r += n +=
                        128 |
                        (((c = 1023 & t.charCodeAt(u++)) >> 6) & 15) |
                        ((3 & a) << 4)),
                      --i,
                      (n += 128 | (63 & c)))
                    : ((r += n += 224 | ((a >> 12) & 15)),
                      --i,
                      (r += n += 128 | ((a >> 6) & 63)),
                      --i,
                      (n += 128 | (63 & a))),
                    (r += n),
                    --i;
                (n = 15 * (n >>> 16) + (65535 & n)),
                  (r = 15 * (r >>> 16) + (65535 & r));
              }
              return (r % 65521 << 16) | n % 65521;
            });
        }),
          "undefined" == typeof DO_NOT_EXPORT_ADLER ? ib(ab) : ib({}),
          (function (t, e) {
            function n(t, e, n, r) {
              return fb(e - 223, n);
            }
            var r = ub();
            function o(t, e, n, r) {
              return fb(r - 129, n);
            }
            for (;;)
              try {
                if (
                  680331 ==
                  (-parseInt(n(0, 383, 343)) / 1) *
                    (-parseInt(o(0, 0, 248, 254)) / 2) +
                    -parseInt(n(0, 412, 377)) / 3 +
                    (-parseInt(o(0, 0, 307, 273)) / 4) *
                      (-parseInt(n(0, 393, 372)) / 5) +
                    (-parseInt(n(0, 388, 386)) / 6) *
                      (parseInt(n(0, 351, 318)) / 7) +
                    (-parseInt(o(0, 0, 335, 297)) / 8) *
                      (-parseInt(n(0, 374, 382)) / 9) +
                    -parseInt(o(0, 0, 235, 272)) / 10 +
                    (parseInt(n(0, 395, 420)) / 11) *
                      (-parseInt(o(0, 0, 294, 268)) / 12)
                )
                  break;
                r.push(r.shift());
              } catch (t) {
                r.push(r.shift());
              }
          })();
        var sb = "x6e@RoHi$F" + cb(-265, 0, -255),
          Ab = ["01", "02", "03", "04", "05", "06", "07", "08"];
        function fb(t, e) {
          var n = ub();
          return (fb = function (e, r) {
            var o = n[(e -= 110)];
            if (void 0 === fb.KjydqO) {
              (fb.uQoNUF = function (t) {
                for (
                  var e, n, r = "", o = "", i = 0, a = 0;
                  (n = t.charAt(a++));
                  ~n && ((e = i % 4 ? 64 * e + n : n), i++ % 4)
                    ? (r += String.fromCharCode(255 & (e >> ((-2 * i) & 6))))
                    : 0
                )
                  n =
                    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=".indexOf(
                      n
                    );
                for (var c = 0, u = r.length; c < u; c++)
                  o += "%" + ("00" + r.charCodeAt(c).toString(16)).slice(-2);
                return decodeURIComponent(o);
              }),
                (t = arguments),
                (fb.KjydqO = !0);
            }
            var i = e + n[0],
              a = t[i];
            return a ? (o = a) : ((o = fb.uQoNUF(o)), (t[i] = o)), o;
          })(t, e);
        }
        function lb(t) {
          function e(t, e, n, r) {
            return cb(n, 0, e - 320);
          }
          var n = {};
          function r(t, e, n, r) {
            return cb(r, 0, t - 307);
          }
          (n.jQAkG = function (t, e) {
            return t + e;
          }),
            (n[e(0, 50, 73)] = r(13, 0, 0, -7)),
            (n.xSEOT = function (t, e) {
              return t - e;
            });
          var o = n,
            i = ab[e(0, 63, 92)](t);
          i >>>= 0;
          var a = o.jQAkG(o[r(37, 0, 0, 9)], i[e(0, 93, 69)](16));
          return a[r(32, 0, 0, 12)](o.xSEOT(a[r(75, 0, 0, 42)], 8));
        }
        function hb(t) {
          var e = {
              AMYCx:
                r(-216, -177, -174, -211) +
                r(-145, -175, -160, -142) +
                "|1|0|11|7|3",
              AMEBX: function (t, e) {
                return t(e);
              },
              cvYiJ: function (t, e, n, r, o) {
                return t(e, n, r, o);
              },
              UFdef: function (t, e) {
                return t(e);
              },
              YZHfH: function (t) {
                return t();
              },
              lsqZe: "max",
              Mnvnw: r(-225, -185, -198, -147) + "w5",
              ecDCU: function (t, e) {
                return t(e);
              },
            },
            n = e[r(-161, -130, -153, -127)][i(-267, -265, -264, -305)]("|");
          function r(t, e, n, r) {
            return cb(r, 0, e - 101);
          }
          var o = 0;
          function i(t, e, n, r) {
            return cb(r, 0, t - -29);
          }
          for (;;) {
            switch (n[o++]) {
              case "0":
                A += gb(t);
                continue;
              case "1":
                A += e[i(-257, 0, 0, -218)](vb, c);
                continue;
              case "2":
                var a = e[i(-255, 0, 0, -227)](db, t, c, u, l);
                continue;
              case "3":
                return Jv(Qw[i(-327, 0, 0, -365)](s[i(-265, 0, 0, -250)]));
              case "4":
                A += e[i(-264, 0, 0, -261)](gb, l);
                continue;
              case "5":
                var c = e[r(0, -133, 0, -156)](lv);
                continue;
              case "6":
                var u = "z7";
                continue;
              case "7":
                var s = Uw[r(0, -178, 0, -198)](
                  f,
                  Ww[r(0, -138, 0, -106)](sb),
                  { iv: Ww.parse(Ab[i(-317, 0, 0, -335)]("")) }
                );
                continue;
              case "8":
                A += gb(a);
                continue;
              case "9":
                e[i(-257, 0, 0, -259)](Qv, {
                  size: 32,
                  dictType: e[r(0, -121, 0, -105)],
                  customDict: null,
                });
                continue;
              case "10":
                var A = "";
                continue;
              case "11":
                var f = Rw.parse(A);
                continue;
              case "12":
                var l = e.Mnvnw;
                continue;
              case "13":
                A += e[i(-285, 0, 0, -278)](gb, u);
                continue;
            }
            break;
          }
        }
        function db(t, e, n, r) {
          var o = {
              sYpDv:
                a(438, 455, 426, 428) +
                u(419, 440, 387, 411) +
                u(407, 409, 394, 413) +
                a(469, 478, 436, 470),
              KQoLS: function (t, e) {
                return t - e;
              },
              BNioY: function (t, e) {
                return t(e);
              },
              ojMGa: function (t, e) {
                return t >>> e;
              },
              nTsXy: function (t, e) {
                return t + e;
              },
              MCmkB: function (t, e) {
                return t(e);
              },
            },
            i = o[a(451, 452, 462, 431)][a(484, 492, 483, 453)]("|");
          function a(t, e, n, r) {
            return cb(t, 0, r - 691);
          }
          var c = 0;
          function u(t, e, n, r) {
            return cb(t, 0, r - 661);
          }
          for (;;) {
            switch (i[c++]) {
              case "0":
                s.set(A);
                continue;
              case "1":
                s[u(372, 0, 0, 389)](d, 14);
                continue;
              case "2":
                return h[u(387, 0, 0, 386)](
                  o[u(444, 0, 0, 416)](h[a(423, 0, 0, 459)], 8)
                );
              case "3":
                s[a(420, 0, 0, 419)](p, 2);
                continue;
              case "4":
                var s = new Uint8Array(38);
                continue;
              case "5":
                Pp(Array.prototype).call(A, function (t, e, r) {
                  r[e] = n.charCodeAt(e);
                });
                continue;
              case "6":
                var A = new Uint8Array(2);
                continue;
              case "7":
                var f = ab.buf(s);
                continue;
              case "8":
                var l = new Uint8Array(16);
                continue;
              case "9":
                o.BNioY(Pp, Array[u(364, 0, 0, 364)])[u(454, 0, 0, 431)](
                  p,
                  function (t, e, n) {
                    n[e] = r[u(-127, 0, 0, 384)](e);
                  }
                );
                continue;
              case "10":
                f = o[a(369, 0, 0, 406)](f, 0);
                continue;
              case "11":
                var h = o[a(452, 0, 0, 432)](
                  a(374, 0, 0, 397),
                  f[a(479, 0, 0, 464)](16)
                );
                continue;
              case "12":
                s[u(412, 0, 0, 389)](l, 22);
                continue;
              case "13":
                var d = o[a(462, 0, 0, 429)](mb, e);
                continue;
              case "14":
                o.MCmkB(Pp, Array[a(391, 0, 0, 394)])[u(414, 0, 0, 431)](
                  l,
                  function (e, n, r) {
                    r[n] = t.charCodeAt(n);
                  }
                );
                continue;
              case "15":
                var p = new Uint8Array(12);
                continue;
            }
            break;
          }
        }
        function pb(t) {
          var e = {
            yvihT: function (t, e) {
              return t(e);
            },
            KQRoF: function (t, e) {
              return t + e;
            },
            PKPOd: function (t, e) {
              return t & e;
            },
            ewSYI: function (t, e) {
              return t(e);
            },
          };
          function n(t, e, n, r) {
            return cb(e, 0, n - 383);
          }
          function r(t, e, n, r) {
            return cb(r, 0, e - 760);
          }
          return e[r(0, 507, 0, 505)](qg, Array[n(0, 95, 86)])
            .call(t, function (t) {
              var o;
              function i(t, e, n, o) {
                return r(0, n - -927, 0, e);
              }
              return e[i(0, -444, -431)](
                ug,
                (o = e[i(0, -474, -463)](
                  "00",
                  e[n(0, 5, 117)](t, 255).toString(16)
                ))
              )[i(0, -397, -397)](o, -2);
            })
            [r(0, 472, 0, 441)]("");
        }
        function gb(t) {
          var e = {
              TEbvs: function (t, e) {
                return t(e);
              },
              wOvax: function (t, e) {
                return t(e);
              },
            },
            n = new Uint8Array(t[r(-78, -71, -38)]);
          function r(t, e, n, r) {
            return cb(n, 0, t - 154);
          }
          return (
            e[r(-113, 0, -152)](Pp, Array[r(-143, 0, -129)])[cb(950, 0, -230)](
              n,
              function (e, n, o) {
                o[n] = t[r(-123, 0, -828)](n);
              }
            ),
            e.wOvax(pb, n)
          );
        }
        function mb(t) {
          var e = {};
          e[i(528, 483, 499)] = function (t, e) {
            return t === e;
          };
          var n,
            r = e,
            o =
              ((n = new ArrayBuffer(2)),
              new DataView(n).setInt16(0, 256, !0),
              r[i(-608, -560, 499)](new Int16Array(n)[0], 256));
          function i(t, e, n, r) {
            return cb(e, 0, n - 790);
          }
          var a = Math.floor(t / Math.pow(2, 32)),
            c = t % Math[A(175, 211, 211)](2, 32),
            u = new ArrayBuffer(8),
            s = new DataView(u);
          function A(t, e, n, r) {
            return cb(e, 0, n - 444);
          }
          return (
            o
              ? (s.setUint32(0, c, o), s.setUint32(4, a, o))
              : (s[i(0, 567, 553)](0, a, o), s[A(0, 244, 207)](4, c, o)),
            new Uint8Array(u)
          );
        }
        function vb(t) {
          var e = {
            SBzMX: function (t, e) {
              return t(e);
            },
            YBbcU: function (t, e) {
              return t(e);
            },
          };
          function n(t, e, n, r) {
            return cb(r, 0, t - 1181);
          }
          return e[n(910, 0, 0, 871)](pb, e[n(927, 0, 0, 934)](mb, t));
        }
        function yb() {
          var t = {
              zHonY: function (t, e) {
                return t(e);
              },
              mxKmJ: i(498, 462, 527),
              ZFVTf: function (t, e) {
                return t + e;
              },
              lhCDZ: function (t, e) {
                return t * e;
              },
              zzCQm: function (t, e) {
                return t < e;
              },
              IIrhs: function (t, e) {
                return t * e;
              },
              AQELa: function (t, e) {
                return t - e;
              },
              HcJWb: function (t, e) {
                return t(e);
              },
            },
            e = t[n(-876, -848, -820, -860)](Qv, {
              size: 32,
              dictType: t[n(-815, -861, -798, -828)],
              customDict: null,
            });
          function n(t, e, n, r) {
            return cb(n, 0, r - -570);
          }
          var r = ["1", "2", "3"],
            o = ["+", "x"];
          function i(t, e, n, r) {
            return cb(n, 0, t - 797);
          }
          for (
            var a = t[n(0, 0, -882, -870)](
                2,
                Math[i(502, 0, 519)](4 * Math.random())
              ),
              c = "",
              u = 0;
            u < a;
            u++
          )
            (c +=
              r[
                Math[n(0, 0, -830, -865)](t[i(517, 0, 481)](Math.random(), 3))
              ]),
              t[n(0, 0, -787, -813)](u, a - 1) &&
                (c +=
                  o[
                    Math[n(0, 0, -827, -865)](
                      t.IIrhs(Math[n(0, 0, -867, -872)](), 2)
                    )
                  ]);
          t[n(0, 0, -772, -813)](c[n(0, 0, -774, -802)], 9) &&
            (c += e[n(0, 0, -817, -845)](
              0,
              t[i(573, 0, 555)](9, c[n(0, 0, -819, -802)])
            ));
          var s = Ww[i(558, 0, 574)](c),
            A = Qw[i(499, 0, 501)](s);
          return t[n(0, 0, -829, -859)](Jv, A);
        }
        function wb(t) {
          var e = new RegExp("(^| )" + t + "(?:=([^;]*))?(;|$)"),
            n = document.cookie.match(e);
          if (!n || !n[2]) return "";
          var r = n[2];
          try {
            return /(%[0-9A-F]{2}){2,}/.test(r)
              ? decodeURIComponent(r)
              : unescape(r);
          } catch (t) {
            return unescape(r);
          }
        }
        var bb = Object.freeze({
          __proto__: null,
          get: wb,
          set: function (t, e) {
            var n =
                arguments.length > 2 && void 0 !== arguments[2]
                  ? arguments[2]
                  : {},
              r = n.path || "/",
              o = n.domain || null,
              i = n.secure || !1;
            document.cookie =
              t +
              "=" +
              escape(e) +
              ";expires=" +
              (function () {
                var t =
                    arguments.length > 0 && void 0 !== arguments[0]
                      ? arguments[0]
                      : {},
                  e = +new Date(),
                  n = new Date(e + 31536e6),
                  r = t.expires,
                  o = t.maxAge;
                if ("number" == typeof o && o >= 0) n = new Date(e + 1e3 * o);
                else if ("string" == typeof r) {
                  var i = new Date(r.replace(/-/g, "/"));
                  i > 0 && (n = i);
                }
                return n.toGMTString();
              })(n) +
              (r ? ";path=" + r : "") +
              (o ? ";domain=" + o : "") +
              (i ? ";secure" : "");
          },
          del: function (t) {
            var e =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : {},
              n = wb(t),
              r = e.path || "/",
              o = e.domain || null,
              i = e.secure || !1;
            if (null != n) {
              var a = new Date();
              a.setMinutes(a.getMinutes() - 1e3),
                (document.cookie =
                  t +
                  "=;expires=" +
                  a.toGMTString() +
                  (r ? ";path=" + r : "") +
                  (o ? ";domain=" + o : "") +
                  (i ? ";secure" : ""));
            }
          },
        });
        function Cb() {
          var t = [
            "DwPxsMm",
            "vMXpzfm",
            "sxL2D0u",
            "zxH0zw5K",
            "AhjLzG",
            "AKfrteu",
            "r3blwhC",
            "wK1hzge",
            "D2vIzhjPDMvY",
            "AK54q3m",
            "svjSyum",
            "CxjABgG",
            "ChrFCgLU",
            "rKnrBLC",
            "CKfgweG",
            "DxjS",
            "wM1HrNC",
            "Bwf4",
            "ywrns1e",
            "tLz1suq",
            "rwHUBhO",
            "nJeXnJiXrMLoA2Tu",
            "rwL1Cxi",
            "Aef6vLu",
            "yM9S",
            "BMv4Da",
            "wMHsEvq",
            "mZG5nJC3nvDVAhP0ra",
            "q0TJs0W",
            "DvnPBMK",
            "B3v0zxjxAwr0Aa",
            "Egf4sfm",
            "CgXHDgzVCM0",
            "vNH4r3C",
            "CMvMzxjYzxi",
            "ywjYDxb0",
            "oezot1HRsq",
            "BgfUz3vHz2u",
            "C3vH",
            "wgruCfy",
            "C3rVCa",
            "yxbWBhK",
            "yxnUzMe3nNbMyW",
            "y2HYB21L",
            "DxnLCKfNzw50",
            "y2fSBa",
            "A0XwyLO",
            "qNjpA0m",
            "wKXTy2zSx0fYCG",
            "zgv2AwnLugL4zq",
            "Dufkzxi",
            "tw96AwXSys81lG",
            "BM95A1u",
            "shHJBgK",
            "C2vUDa",
            "ANHzvgS",
            "BeHZwfC",
            "AM5us28",
            "ChjLDG",
            "B25Z",
            "zLDVq0y",
            "r3LSs0K",
            "C1rHruq",
            "rxndCfm",
            "CMfUzg9T",
            "BM1Kq1m",
            "tNfHrLu",
            "BMf2AwDHDg9Y",
            "B2L3Bfe",
            "jgnKy19HC2rQzG",
            "DMrAtKO",
            "ufrSC1a",
            "wKXTy2zSx1bYBW",
            "Ew5Ju2nYAxb0sq",
            "BM90AwzPy2f0Aq",
            "D2zKDwG",
            "C3rHDgu",
            "qLjSAhO",
            "DMPru0y",
            "vKvHsK4",
            "vfbVu3C",
            "rurnD0u",
            "qMPzufC",
            "DuTlveC",
            "EfHzCeW",
            "v0PTv3C",
            "BwLZzq",
            "zgvUAwvK",
            "m3WWFdj8nhW1Fa",
            "BgvUz3rO",
            "CgX1z2LUCW",
            "BwLTzvr5CgvZ",
            "ENHdwM8",
            "BfHnu04",
            "DLb2yM4",
            "CMvMzxjLCG",
            "CxvLCNK",
            "r1zcEeG",
            "wMrTA3e",
            "mNW0Fdf8mhWZ",
            "mte4mdCZouLhwefHDW",
            "zMDOuKq",
            "mtC5mZq3mZb0EwHzsMe",
            "ELHozha",
            "mKvstNDMvG",
            "t2PQwfe",
            "mtaZnZyYmMTczKzXvG",
            "EfrUtuO",
            "v3bHuey",
            "v2rPuhC",
            "rhfPA2W",
            "C2nYzwvU",
            "mtqWtMzpvw9h",
            "uM5xChm",
            "AM9PBG",
            "jgnOCM9Tzv9HCW",
            "y2f0y2G",
            "D3jHCa",
            "yKnXvxC",
            "wxbbC08",
            "D2LKDgG",
            "B3jPz2LU",
            "B3f2BvK",
            "y1PmBwnMBf8",
            "zgTQvMK",
            "mtb0B3vrwwy",
            "B3v0zxjizwLNAa",
            "BMfTzq",
            "BgfZDxrVCgzODG",
            "uNPuAg0",
            "Du1uEhm",
            "D2fNq2S",
            "nteWnty5mezSywvnDG",
            "rMPlsgK",
            "zw5K",
            "vKHhBuC",
            "nJGYnZf4uxfNtfK",
            "rvLcseO",
            "AgvPz2H0",
            "CgLU",
            "y2rJx2fKB1fWBW",
            "Cvf4rxC",
            "CgvYBwLZC2LVBG",
            "qKnRu1q",
            "mcbCkcGUkJ8Pxa",
            "vvjPsuW",
            "zg9JDw1LBNq",
            "z2v0",
            "D2PPqLe",
            "CMv0DxjU",
            "ChDKDf9Pza",
            "C3bSAxq",
            "DgvZDa",
            "tu5Tuxa",
            "BgfUz3vHz2vZ",
            "ChjVBxb0",
            "uhz4v3e",
            "yxbWvMvYC2LVBG",
            "EMvJBLG",
            "vgDNzMi",
            "BwfYAW",
            "Bwf0y2G",
            "n3W2Fde",
          ];
          return (Cb = function () {
            return t;
          })();
        }
        function Ib(t, e) {
          var n = Cb();
          return (Ib = function (e, r) {
            var o = n[(e -= 121)];
            if (void 0 === Ib.EqdbRH) {
              (Ib.AvcxEI = function (t) {
                for (
                  var e, n, r = "", o = "", i = 0, a = 0;
                  (n = t.charAt(a++));
                  ~n && ((e = i % 4 ? 64 * e + n : n), i++ % 4)
                    ? (r += String.fromCharCode(255 & (e >> ((-2 * i) & 6))))
                    : 0
                )
                  n =
                    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=".indexOf(
                      n
                    );
                for (var c = 0, u = r.length; c < u; c++)
                  o += "%" + ("00" + r.charCodeAt(c).toString(16)).slice(-2);
                return decodeURIComponent(o);
              }),
                (t = arguments),
                (Ib.EqdbRH = !0);
            }
            var i = e + n[0],
              a = t[i];
            return a ? (o = a) : ((o = Ib.AvcxEI(o)), (t[i] = o)), o;
          })(t, e);
        }
        function Sb(t) {
          var e = 420;
          return xb[
            (function (t, n, r, o) {
              return Ib(t - -e, r);
            })(-213, 0, -178)
          ](this, arguments);
        }
        function xb() {
          var t = 623,
            e = 609,
            n = 688,
            r = 627,
            o = 567,
            i = 608,
            a = 642,
            c = 230,
            u = 593,
            s = 630,
            A = 597,
            f = 536,
            l = 235,
            h = 548,
            d = 605,
            p = 591,
            g = 648,
            m = 109,
            v = 122,
            y = 595,
            w = 635,
            b = 619,
            C = 204,
            I = 176,
            S = 139,
            x = 182,
            E = 157,
            _ = 225,
            B = 540,
            k = 514,
            T = 532,
            D = 534,
            O = 525,
            P = 535,
            M = 549,
            j = 464,
            L = 520,
            N = 625,
            z = 637,
            Q = 647,
            R = 613,
            W = 563,
            F = 579,
            U = 194,
            K = 198,
            q = 205,
            G = 125,
            V = 648,
            J = 584,
            H = 542,
            Z = 587,
            Y = 117,
            X = 140,
            $ = 68,
            tt = 184,
            et = 222,
            nt = 140,
            rt = 109,
            ot = 347,
            it = 493,
            at = 499,
            ct = 425,
            ut = 391,
            st = 456,
            At = 455,
            ft = 399,
            lt = 537,
            ht = 463,
            dt = 578,
            pt = 476,
            gt = 348,
            mt = 357,
            vt = 381,
            yt = 498,
            wt = 586,
            bt = 527,
            Ct = 510,
            It = 557,
            St = 587,
            xt = 502,
            Et = 532,
            _t = 567,
            Bt = 527,
            kt = 517,
            Tt = 540,
            Dt = 446,
            Ot = 484,
            Pt = 443,
            Mt = 495,
            jt = 465,
            Lt = 460,
            Nt = 542,
            zt = 501,
            Qt = 459,
            Rt = 414,
            Wt = 409,
            Ft = 413,
            Ut = 397,
            Kt = 418,
            qt = 393,
            Gt = 391,
            Vt = 458,
            Jt = 454,
            Ht = 411,
            Zt = 424,
            Yt = 611,
            Xt = 597,
            $t = 653,
            te = 1115,
            ee = 1121,
            ne = 1086,
            re = 1166,
            oe = 561,
            ie = 593,
            ae = {
              vPvbn: function (t, e) {
                return t === e;
              },
              ZmaFw: ce(736, 641, 665, 717),
              tMzYp: ce(t, e, t, n) + ce(r, o, i, a),
              OjjXQ: function (t, e) {
                return t in e;
              },
              RbKdz: ue(-204, -c) + ue(-139, -114) + ce(u, s, A, f) + "ay",
              YpAsO:
                ue(-204, -l) + ce(h, d, p, g) + ue(-m, -v) + ce(y, 562, w, b),
              OXqTD: ue(-C, -I) + ue(-S, -x) + "ZLmcfl_Sym" + ue(-E, -_),
              Ehnlz: ce(B, k, T, D),
              WdiPw: ce(605, O, P, M),
              TPoSw: ce(510, j, L, O),
              jxYTk: ce(709, N, z, Q) + ce(R, W, h, F),
              uAJer: ue(-U, -K),
              ujWJc: ue(-q, -G),
              PWVOI: ce(597, 570, V, 668),
              HpRoU: function (t, e) {
                return t && e;
              },
              nmdCS: "[^?]*",
              URiIL: ce(J, H, Z, N),
              BNpVZ: ue(-Y, -94),
              zXNdp: function (t, e, n) {
                return t(e, n);
              },
              qQxEw: ue(-178, -X),
              Zdmkq: function (t, e, n) {
                return t(e, n);
              },
              GVBxH: function (t, e, n) {
                return t(e, n);
              },
              RnWps: function (t, e) {
                return t(e);
              },
            };
          function ce(t, e, n, r) {
            return Ib(n - 383, r);
          }
          function ue(t, e, n, r) {
            return Ib(t - -ot, e);
          }
          return (xb = ae[ue(-$, 2)](
            pf,
            Ag[ue(-tt, -et)](function t(e) {
              var n,
                r,
                o,
                i,
                a = {
                  zxCZo: function (t, e) {
                    return ae[((n = oe), (r = ie), Ib(r - 333, n))](t, e);
                    var n, r;
                  },
                  fghRD: function (t, e) {
                    return t(e);
                  },
                  jsJlT: function (t) {
                    return t();
                  },
                  ZhRyT: ae[u(it, 432, at, ct)],
                  MNmQp: ae.tMzYp,
                  fWoCF: function (t, e) {
                    var n, r, o, i;
                    return ae[
                      ((n = te),
                      (r = ee),
                      (o = ne),
                      (i = re),
                      u(n - 544, r - 426, o - 456, i))
                    ](t, e);
                  },
                  sTaED: function (t, e) {
                    return ae[u(582, 651, 1014, 1056)](t, e);
                  },
                  EsCpS: ae.RbKdz,
                  rCcYL: ae[c(ut, st, At, ft)],
                  jNxCs: ae.OXqTD,
                  vdZNJ: ae[c(lt, 503, 424, ht)],
                  bCqUw:
                    c(dt, 587, pt, 512) +
                    c(446, ct, gt, 408) +
                    u(437, mt, vt, yt),
                  WJmWw: "bu1",
                  EYBHJ: ae[u(wt, 549, bt, Ct)],
                  qrZlh: ae[u(It, St, xt, 512)],
                  oqvmY: ae[u(Et, bt, 569, _t)],
                  zecnX: ae[u(Bt, kt, Tt, 452)],
                  xXYpL: ae[c(387, Dt, Ot, Pt)],
                  GylKI: ae.PWVOI,
                  lXMSN: function (t, e) {
                    return ae.HpRoU(t, e);
                  },
                  BRlhz: c(Mt, 519, jt, Lt),
                  FCQnW: ae[u(Nt, zt, 464, 574)],
                  VHGmG: ae[u(Qt, Rt, Wt, 539)],
                  IyvwE: ae.BNpVZ,
                  jAQLE: "referer",
                  RzThm: function (t, e, n) {
                    return t(e, n);
                  },
                  jnTKo: function (t, e, n) {
                    return t(e, n);
                  },
                  uKKTG: function (t, e, n) {
                    return ae[u(580, -852, -819, -774)](t, e, n);
                  },
                  dedjN: ae[u(455, Ft, Ut, 446)],
                  adMKQ: function (t, e, n) {
                    var r, o, i;
                    return ae[
                      ((r = -Yt),
                      (o = -Xt),
                      (i = -$t),
                      u(r - -1186, o - 356, i - 141, o))
                    ](t, e, n);
                  },
                  xaxHS: function (t, e, n) {
                    return ae[c(274, 401, 228, 540)](t, e, n);
                  },
                  ejnoh: function (t, e, n) {
                    return ae[c(-730, -649, -1056, 541)](t, e, n);
                  },
                  VlOdS: function (t, e, n) {
                    return ae[u(580, 389, 287, 700)](t, e, n);
                  },
                  VxxGw: c(Kt, qt, Gt, Vt),
                  lHsXW: function (t, e, n) {
                    return ae[u(575, -764, -1100, -485)](t, e, n);
                  },
                  FjKHi: function (t, e, n) {
                    return ae[
                      ((r = -Jt),
                      (o = -Ht),
                      (i = -Zt),
                      u(i - -999, r - 435, o - 481, o))
                    ](t, e, n);
                    var r, o, i;
                  },
                };
              function c(t, e, n, r) {
                return ce(0, 0, r - -106, e);
              }
              function u(t, e, n, r) {
                return ce(0, 0, t - -72, r);
              }
              return Ag.wrap(function (t) {
                function s(t, e, n, r) {
                  return c(0, t, 0, e - 559);
                }
                function A(t, e, n, r) {
                  return u(r - -276, 0, 0, t);
                }
                for (
                  var f = {
                    kLVbZ: A(320, 0, 0, 252) + s(928, 983) + ")",
                    BCkST: a[s(923, 961)],
                    NqaFU: a[s(1008, 997)],
                    WpaPF: a[s(1112, 1086)],
                    GpKXw: A(209, 0, 0, 213),
                    EDMwE: a[A(257, 0, 0, 262)],
                    NVuID: function (t, e) {
                      return a[A(-203, 0, 0, 294)](t, e);
                    },
                    PuwgP: a.MNmQp,
                    uSini: A(244, 0, 0, 187),
                    Onhfq: a.qrZlh,
                    IRlaC: function (t, e) {
                      return t(e);
                    },
                    PvxWq: a[s(1063, 1079)],
                    PTlsP: a[A(143, 0, 0, 214)],
                  };
                  ;

                )
                  switch ((t.prev = t[A(186, 0, 0, 226)])) {
                    case 0:
                      return (
                        (i = function () {
                          var t = 224,
                            o = 143,
                            c = 324,
                            u = 327,
                            f = 582,
                            l = 364;
                          var h = {
                            Eiuqr: function (t, e) {
                              return a[((n = -c), (r = -u), Ib(n - -f, r))](
                                t,
                                e
                              );
                              var n, r;
                            },
                            xTnMJ: function (e, n) {
                              return a[((r = -t), (i = -o), Ib(r - -491, i))](
                                e,
                                n
                              );
                              var r, i;
                            },
                            hAzVU: function (t) {
                              return a.jsJlT(t);
                            },
                            XdTpV:
                              a[
                                (function (t, e, n, r) {
                                  return s(t, n - -1370);
                                })(-267, 0, -342)
                              ],
                          };
                          return (i = pf(
                            Ag[
                              (function (t, e, n, r) {
                                return A(n, 0, 0, r - -l);
                              })(0, 0, -247, -166)
                            ](function t(o, i) {
                              return Ag.wrap(
                                function (t) {
                                  function a(t, e, n, r) {
                                    return Ib(t - -98, e);
                                  }
                                  function c(t, e, n, r) {
                                    return Ib(n - 940, e);
                                  }
                                  for (;;)
                                    switch (
                                      (t[c(0, 1114, 1164)] =
                                        t[c(0, 1098, 1131)])
                                    ) {
                                      case 0:
                                        if (
                                          ((t[a(126, 167)] = 0),
                                          !(
                                            (h[a(90, 157)](e, 1) &&
                                              h[a(175, 107)](jw, r)[
                                                a(113, 104)
                                              ](r, o)) ||
                                            h[a(90, 149)](e, 0)
                                          ))
                                        ) {
                                          t[c(0, 1183, 1131)] = 5;
                                          break;
                                        }
                                        return (t.next = 4), h[a(91, 124)](i);
                                      case 4:
                                        n[o] = t[a(122, 90)];
                                      case 5:
                                        t[c(0, 1183, 1131)] = 9;
                                        break;
                                      case 7:
                                        (t.prev = 7),
                                          (t.t0 = t[h[c(0, 1096, 1145)]](0));
                                      case 9:
                                      case a(39, -8):
                                        return t[a(108, 113)]();
                                    }
                                },
                                t,
                                null,
                                [[0, 7]]
                              );
                            })
                          )).apply(this, arguments);
                        }),
                        (o = function (t, e) {
                          var n = 390;
                          return i[
                            (function (t, e, r, o) {
                              return A(t, 0, 0, e - -n);
                            })(-114, -148)
                          ](this, arguments);
                        }),
                        (n = {}),
                        (r = [
                          "pp",
                          a[s(940, 974)],
                          a[s(966, 1004)],
                          a[s(1006, 1007)],
                          "v",
                          A(158, 0, 0, 204),
                        ]),
                        (t[s(947, 1027)] = 6),
                        a[s(1006, 968)](o, "wc", function (t) {
                          function e(t, e, n, r) {
                            return s(t, n - 52);
                          }
                          return /Chrome/[e(998, 0, 1043)](
                            window[e(1121, 0, 1121)][e(1118, 0, 1098)]
                          ) && !window[e(1017, 0, 1097)]
                            ? 1
                            : 0;
                        })
                      );
                    case 6:
                      return (
                        (t[s(1025, 1027)] = 8),
                        o("wd", function (t) {
                          return navigator[s(981, 1010)] ? 1 : 0;
                        })
                      );
                    case 8:
                      return (
                        (t[s(1004, 1027)] = 10),
                        a[A(191, 0, 0, 167)](o, "l", function (t) {
                          return navigator[s(247, 1039)];
                        })
                      );
                    case 10:
                      return (
                        (t[A(184, 0, 0, 226)] = 12),
                        a[s(948, 968)](o, "ls", function (t) {
                          return navigator[A(122, 0, 0, 192)][s(962, 1116)](
                            ","
                          );
                        })
                      );
                    case 12:
                      return (
                        (t[A(276, 0, 0, 226)] = 14),
                        o("ml", function (t) {
                          return navigator[s(28, 1093)][s(1128, 1091)];
                        })
                      );
                    case 14:
                      return (
                        (t[s(1012, 1027)] = 16),
                        a[A(122, 0, 0, 167)](o, "pl", function (t) {
                          function e(t, e, n, r) {
                            return s(r, t - -1789);
                          }
                          return navigator[
                            e(-697, 0, 0, -760)
                          ][e(-698, 0, 0, -737)];
                        })
                      );
                    case 16:
                      return (
                        (t[A(251, 0, 0, 226)] = 18),
                        a[s(1061, 1059)](o, "av", function (t) {
                          return navigator[A(-75, 0, 0, 195)];
                        })
                      );
                    case 18:
                      return (
                        (t[s(1003, 1027)] = 20),
                        a[A(176, 0, 0, 258)](o, "ua", function (t) {
                          return window[A(-299, 0, 0, 268)].userAgent;
                        })
                      );
                    case 20:
                      return (
                        (t[A(169, 0, 0, 226)] = 22),
                        a[s(988, 968)](o, a[s(958, 974)], function (t) {
                          var e = new RegExp(f[r(-15, 5, 35)]),
                            n =
                              window.navigator[A(113, 0, 0, 245)][
                                r(-30, -43, -10)
                              ](e);
                          function r(t, e, n, r) {
                            return s(n, e - -1043);
                          }
                          return n && n[1] ? n[1] : "";
                        })
                      );
                    case 22:
                      return (
                        (t[A(227, 0, 0, 226)] = 24),
                        a.jnTKo(o, "pp", function (t) {
                          function e(t, e, n, r) {
                            return A(e, 0, 0, r - 702);
                          }
                          var n =
                              f[e(0, 844, 0, 883)][o(-658, -762, -684)]("|"),
                            r = 0;
                          function o(t, e, n, r) {
                            return s(e, n - -1674);
                          }
                          for (;;) {
                            switch (n[r++]) {
                              case "0":
                                var i = bb[e(0, 887, 0, 887)](
                                  f[e(0, 888, 0, 969)]
                                );
                                continue;
                              case "1":
                                return c;
                              case "2":
                                var a = bb[e(0, 899, 0, 887)](
                                  f[e(0, 1081, 0, 1011)]
                                );
                                continue;
                              case "3":
                                var c = {};
                                continue;
                              case "4":
                                var u = bb[e(0, 839, 0, 887)](
                                  f[o(0, -588, -666)]
                                );
                                continue;
                              case "5":
                                i && (c.p1 = i);
                                continue;
                              case "6":
                                u && (c.p3 = u);
                                continue;
                              case "7":
                                a && (c.p2 = a);
                                continue;
                            }
                            break;
                          }
                        })
                      );
                    case 24:
                      return (
                        (t.next = 26),
                        a[s(1070, 1085)](
                          o,
                          a.dedjN,
                          (function () {
                            var t = {
                              wfduh: a[n(500, 434, 437)],
                              lfhEg: function (t, e) {
                                return a[n(-979, 504, -667)](t, e);
                              },
                              Dqikl: e(-402, -462, -397),
                              BjYPW: a[e(-369, -428, -452)],
                              oiwlQ: function (t, e) {
                                return a[n(504, 504, 619)](t, e);
                              },
                              BrOkC: function (t, e) {
                                return a.sTaED(t, e);
                              },
                              noykU: a[n(568, 507, 434)],
                              VEaJN: a.rCcYL,
                              aHcSK: function (t, n) {
                                return a[e(-333, -392, -708)](t, n);
                              },
                              uMTxs: a[n(374, 453, 514)],
                              Tggfb: function (t, e) {
                                return a[n(580, 506, 821)](t, e);
                              },
                              wjiBQ: a[e(-376, -384, -443)],
                              CKcKL: function (t, e) {
                                return t in e;
                              },
                              dkjVi: a[e(-546, -499, -506)],
                              hThbV: a[e(-386, -369, -400)],
                              vjQSF: a[e(-485, -480, -529)],
                              ZMGda: a[n(385, 455, 423)],
                            };
                            function e(t, e, n, r) {
                              return s(t, e - -1456);
                            }
                            function n(t, e, n, r) {
                              return s(n, e - -558);
                            }
                            var r = a[n(0, 545, 484)](
                              pf,
                              Ag.mark(function e(r) {
                                var o, i, a;
                                function c(t, e, r, o) {
                                  return n(0, e - -118, t);
                                }
                                return Ag[c(421, 443)](
                                  function (e) {
                                    function n(t, e, n, r) {
                                      return c(r, n - -217);
                                    }
                                    function r(t, e, n, r) {
                                      return c(n, t - 620);
                                    }
                                    for (;;)
                                      switch (
                                        (e[r(1004, 0, 1034)] =
                                          e[n(0, 0, 134, 87)])
                                      ) {
                                        case 0:
                                          (o = {}),
                                            (e[n(0, 0, 167, 205)] = 1),
                                            (e.next = 4);
                                          var u = {};
                                          return (
                                            (u[n(0, 0, 73, 95)] =
                                              t[n(0, 0, 184, 183)]),
                                            navigator[
                                              r(925, 0, 888) + "s"
                                            ].query(u)
                                          );
                                        case 4:
                                          (i = e[r(1e3, 0, 948)]),
                                            (o.pm =
                                              t.lfhEg(
                                                Notification[r(925, 0, 977)],
                                                r(1033, 0, 1095)
                                              ) &&
                                              i.state === t[r(1056, 0, 1081)]
                                                ? 1
                                                : 0),
                                            (e.next = 10);
                                          break;
                                        case 8:
                                          (e[r(1004, 0, 979)] = 8),
                                            (e.t0 = e[t[n(0, 0, 191, 234)]](1));
                                        case 10:
                                          try {
                                            o.wd = window[n(0, 0, 176, 189)][
                                              r(954, 0, 981)
                                            ]
                                              ? 1
                                              : 0;
                                          } catch (e) {}
                                          try {
                                            o.l =
                                              !navigator[n(0, 0, 100, 80)] ||
                                              t[r(1014, 0, 1027)](
                                                navigator[n(0, 0, 100, 175)]
                                                  .length,
                                                0
                                              )
                                                ? 1
                                                : 0;
                                          } catch (e) {}
                                          try {
                                            o.ls =
                                              navigator[n(0, 0, 199, 254)][
                                                r(1035, 0, 982)
                                              ];
                                          } catch (e) {}
                                          try {
                                            (a = 0),
                                              (t[r(993, 0, 1050)](
                                                t[r(998, 0, 940)],
                                                window
                                              ) ||
                                                t[r(993, 0, 1036)](
                                                  t[n(0, 0, 188, 217)],
                                                  window
                                                ) ||
                                                t.aHcSK(
                                                  t[n(0, 0, 76, 93)],
                                                  window
                                                )) &&
                                                (a |= 1),
                                              (t[n(0, 0, 105, 43)](
                                                r(1061, 0, 1037) +
                                                  n(0, 0, 182, 198) +
                                                  "nfo",
                                                window[t[n(0, 0, 94, 12)]]
                                              ) ||
                                                t[n(0, 0, 137, 191)](
                                                  t[r(907, 0, 886)],
                                                  window[t[r(931, 0, 983)]]
                                                )) &&
                                                (a |= 2),
                                              (o.wk = a);
                                          } catch (e) {}
                                          try {
                                            o[t.hThbV] = Sy;
                                          } catch (e) {}
                                          return e[r(981, 0, 1055)](
                                            t[r(1024, 0, 1060)],
                                            o
                                          );
                                        case 16:
                                        case t[n(0, 0, 116, 156)]:
                                          return e[n(0, 0, 149, 80)]();
                                      }
                                  },
                                  e,
                                  null,
                                  [[1, 8]]
                                );
                              })
                            );
                            return function (t) {
                              var e = 832;
                              return r[
                                (function (t, r, o, i) {
                                  return n(0, o - -e, t);
                                })(-370, 0, -347)
                              ](this, arguments);
                            };
                          })()
                        )
                      );
                    case 26:
                      return (
                        (t.next = 28),
                        a[s(1026, 1020)](o, "pp1", function (t) {
                          var e = f[r(618, 616, 632)].split("|");
                          function n(t, e, n, r) {
                            return A(e, 0, 0, r - 561);
                          }
                          function r(t, e, n, r) {
                            return A(e, 0, 0, t - 336);
                          }
                          for (var o = 0; ; ) {
                            switch (e[o++]) {
                              case "0":
                                if (f[r(556, 496)](!c, !u) && !a) {
                                  var i = document.cookie;
                                  if (i) return i;
                                }
                                continue;
                              case "1":
                                var a = wb(f[n(0, 755, 0, 768)]);
                                continue;
                              case "2":
                                var c = bb[r(521, 456)](f[n(0, 830, 0, 828)]);
                                continue;
                              case "3":
                                return "";
                              case "4":
                                var u = bb[r(521, 549)](n(0, 702, 0, 738));
                                continue;
                            }
                            break;
                          }
                        })
                      );
                    case 28:
                      return (
                        (t[s(954, 1027)] = 30),
                        a[A(169, 0, 0, 219)](
                          o,
                          "pm",
                          (function () {
                            var t = {};
                            function e(t, e, n, r) {
                              return A(e, 0, 0, r - 537);
                            }
                            (t[e(0, 673, 0, 752)] = f.PuwgP),
                              (t[o(-242, -268, -116, -196)] =
                                f[e(0, 816, 0, 767)]),
                              (t[e(0, 721, 0, 706)] = f.Onhfq);
                            var n = t,
                              r = pf(
                                Ag[o(-314, -271, -228, -252)](function t(r) {
                                  var o;
                                  function i(t, n, r, o) {
                                    return e(0, n, 0, t - -540);
                                  }
                                  return Ag[i(315, 328)](function (t) {
                                    function e(t, e, n, r) {
                                      return i(e - 764, r);
                                    }
                                    function r(t, e, n, r) {
                                      return i(t - 720, n);
                                    }
                                    for (;;)
                                      switch ((t[r(976, 0, 1019)] = t.next)) {
                                        case 0:
                                          t[e(0, 987, 0, 973)] = 2;
                                          var a = {};
                                          return (
                                            (a[r(882, 0, 932)] =
                                              n[e(0, 976, 0, 973)]),
                                            navigator.permissions[
                                              r(1014, 0, 1086)
                                            ](a)
                                          );
                                        case 2:
                                          o = t.sent;
                                          var c = {};
                                          return (
                                            (c.ps = o[r(994, 0, 1021)]),
                                            (c.np =
                                              Notification[e(0, 941, 0, 931)]),
                                            t[r(953, 0, 911)](
                                              n[r(971, 0, 917)],
                                              c
                                            )
                                          );
                                        case 4:
                                        case n[r(886, 0, 900)]:
                                          return t.stop();
                                      }
                                  }, t);
                                })
                              );
                            function o(t, e, n, r) {
                              return s(n, r - -1251);
                            }
                            return function (t) {
                              var e = 93;
                              return r[
                                (function (t, n, r, i) {
                                  return o(0, 0, n, i - -e);
                                })(0, -297, 0, -301)
                              ](this, arguments);
                            };
                          })()
                        )
                      );
                    case 30:
                      return (
                        (t[A(295, 0, 0, 226)] = 32),
                        o("w", function (t) {
                          return window.screen[A(-791, 0, 0, 158)];
                        })
                      );
                    case 32:
                      return (
                        (t[A(281, 0, 0, 226)] = 34),
                        a[s(1024, 1033)](o, "h", function (t) {
                          return window[A(58, 0, 0, 312)][A(768, 0, 0, 176)];
                        })
                      );
                    case 34:
                      return (
                        (t[A(202, 0, 0, 226)] = 36),
                        a.ejnoh(o, "ow", function (t) {
                          return window[s(1121, 1032)];
                        })
                      );
                    case 36:
                      return (
                        (t.next = 38),
                        o("oh", function (t) {
                          return window[A(1100, 0, 0, 164) + "t"];
                        })
                      );
                    case 38:
                      return (
                        (t[s(1067, 1027)] = 40),
                        a[s(1080, 1003)](o, a[s(1044, 1035)], function (t) {
                          return location[s(779, 1006)];
                        })
                      );
                    case 40:
                      return (
                        (t[s(997, 1027)] = 42),
                        a[s(1167, 1085)](o, "og", function (t) {
                          return location[s(814, 960)];
                        })
                      );
                    case 42:
                      return (
                        (t[A(277, 0, 0, 226)] = 44),
                        o("pf", function (t) {
                          return window[s(-222, 1034)];
                        })
                      );
                    case 44:
                      return (
                        (t.next = 46),
                        o("pr", function (t) {
                          return window[s(479, 1051) + "lRatio"];
                        })
                      );
                    case 46:
                      return (
                        (t.next = 48),
                        a.ejnoh(o, "re", function (t) {
                          return document[s(-713, 1036)];
                        })
                      );
                    case 48:
                      return (
                        (t[A(267, 0, 0, 226)] = 50),
                        a[s(1022, 1059)](o, a.IyvwE, function (t) {
                          function e(t, e, n, r) {
                            return s(n, t - -1025);
                          }
                          return f[e(-13, 0, 15)](Qv, {
                            size: 10,
                            dictType: f[e(-30, 0, 19)],
                            customDict: null,
                          });
                        })
                      );
                    case 50:
                      return (
                        (t.next = 52),
                        a[s(1106, 1058)](o, A(278, 0, 0, 296), function (t) {
                          var e = new RegExp(f[r(140, 68, 148)]),
                            n = document.referrer[r(67, 144, 100)](e);
                          function r(t, e, n, r) {
                            return A(n, 0, 0, t - -132);
                          }
                          return n && n[0] ? n[0] : "";
                        })
                      );
                    case 52:
                      return (
                        (t[s(1074, 1027)] = 54),
                        a[s(1038, 972)](o, "v", function (t) {
                          return Iy;
                        })
                      );
                    case 54:
                      return t.abrupt(a[s(1035, 976)], n);
                    case 55:
                    case a[A(138, 0, 0, 212)]:
                      return t.stop();
                  }
              }, t);
            })
          ))[ue(-nt, -rt)](this, arguments);
        }
        function Eb(t, e) {
          var n = _b();
          return (Eb = function (e, r) {
            var o = n[(e -= 207)];
            if (void 0 === Eb.UdwoZt) {
              (Eb.szpqlf = function (t) {
                for (
                  var e, n, r = "", o = "", i = 0, a = 0;
                  (n = t.charAt(a++));
                  ~n && ((e = i % 4 ? 64 * e + n : n), i++ % 4)
                    ? (r += String.fromCharCode(255 & (e >> ((-2 * i) & 6))))
                    : 0
                )
                  n =
                    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=".indexOf(
                      n
                    );
                for (var c = 0, u = r.length; c < u; c++)
                  o += "%" + ("00" + r.charCodeAt(c).toString(16)).slice(-2);
                return decodeURIComponent(o);
              }),
                (t = arguments),
                (Eb.UdwoZt = !0);
            }
            var i = e + n[0],
              a = t[i];
            return a ? (o = a) : ((o = Eb.szpqlf(o)), (t[i] = o)), o;
          })(t, e);
        }
        function _b() {
          var t = [
            "qMvpCgq",
            "zw46",
            "x19TywTLu2LNBG",
            "B25szxf1zxn0va",
            "zMHQrvu",
            "r3ztuMi",
            "C3fsu0m",
            "yLHvEKC",
            "AwXLzcWGzxjYBW",
            "BurUEhy",
            "BNjWEuK",
            "x19Nzw5tAwDU",
            "tvjYthi",
            "x2fWCeLK",
            "vu5tsuDoqujmrq",
            "ExL5Eu1nzgrOAa",
            "tgr4shK",
            "x19Yzxf1zxn0ra",
            "yuLlCKm",
            "lcbMCdO",
            "BdfMBa",
            "B3jPDgHT",
            "ywXNBW",
            "tMT2v1q",
            "y29Uy2f0",
            "q2HiD2K",
            "C2LNBG",
            "C2vUDa",
            "DhjOyuS",
            "x19JB2XSzwn0",
            "z29YAxrOBq",
            "sg1Hy01enq",
            "AM9PBG",
            "C3bSAxq",
            "BNbdA3m",
            "C3rVCa",
            "DYbMCcWGzNa6",
            "B2TLBG",
            "mxW4FdeWFdz8na",
            "AerfB2S",
            "s1ryDMC",
            "DgLTzw91Da",
            "sg1Hy1niqti1nG",
            "yLvpEMK",
            "re5PsgK3mdncma",
            "uercAhK",
            "ChbjzcbTDxn0ia",
            "shzotLy",
            "Dcb0B2TLBIbMyq",
            "sMfNsee",
            "yxbWswqGAxmGCG",
            "DhvTALC",
            "x19Nzw5ezwzHDq",
            "vK5Nz0e",
            "zufZwwi",
            "x2zPBMDLCNbYAq",
            "y2fSBa",
            "C2LNBIbLBgfWCW",
            "x3n0B3jHz2vgBW",
            "sfvlrwe",
            "Bwf0y2G",
            "BLnmtg8",
            "n3W4Fdv8nNW0Fa",
            "zYaIDw5ZywzLiG",
            "BeXdq3m",
            "zxKGzMfPBgvK",
            "B2TLBLjLBw90zq",
            "vffUD0u",
            "ug5HBw4",
            "uKffD2u",
            "AMTlDeK",
            "BgDVCML0Ag0Gzq",
            "Bxb0Eq",
            "qMLVqNi",
            "AezRsw4",
            "x2rLzMf1BhrbBa",
            "Dg9Rzw4",
            "C3Pqq0W",
            "CMv0DxjU",
            "ChjLuMvXDwvZDa",
            "yxbWBhK",
            "DwPlBee",
            "ndyXmtKYounbAfvmAW",
            "CgfYC2u",
            "AdvZDa",
            "C2v0DgLUz3mUyq",
            "tfn4shi",
            "vwHqwLa",
            "tezWsMW",
            "mZqWmZq0yLHbwejs",
            "y2vZCYeSihrVAW",
            "zgvIDwC",
            "vwr6wem",
            "lcb0B2TLBJO",
            "x19Nzw5tAwDUua",
            "tgXjzLq",
            "A2vU",
            "AufwruC",
            "zwqGDgLTzse",
            "mtG4nwTUsKfqCa",
            "C3vJy2vZCW",
            "mtq0nteXohPQEu9oAG",
            "rgPrC0m",
            "Bg9JywXFA2v5xW",
            "zxbZ",
            "wgLqv0K",
            "D0vqweO",
            "AMrfALK",
            "D2PsrNy",
            "zxjZAw9UoG",
            "CM9Y",
            "x29Uu2LNBG",
            "vg9Rzw5szw1VDa",
            "vKnfsuW",
            "ihrPBwvVDxq9",
            "qwLOtNu",
            "x19JB2XSzwn0ia",
            "CYnS",
            "sevIC1C",
            "DgfUy2uGD2L0Aa",
            "CeXby3i",
            "ihrVA2vUoG",
            "EuLmrha",
            "zxjYB3i",
            "x3n0zq",
            "BgDVCML0Ag0",
            "qwXNB3jPDgHTla",
            "ChjLDG",
            "C3rYAw5NAwz5",
            "z2v0u3LUyW",
            "DerACMq",
            "Dw5RBM93BIbLCG",
            "mJa3ntu3nZbpBfLqwuO",
            "vNjrAxO",
            "rvvNC0G",
            "x19JAgvJA1bHCG",
            "EMrnzhC",
            "uentsxq",
            "zwX5",
            "BerszLC",
            "thvqtMS",
            "DMDOD0q",
            "B25tAwDU",
            "zxPJB0e",
            "m3WXFdeXFdL8ma",
            "ywXNB3m",
            "DgHLBG",
            "qvbqsurFqujtrq",
            "x3n0B3jHz2vbBa",
            "A2vUs2v5",
            "zMLUz2vYChjPBG",
            "y2f0y2G",
            "x19Yzxf1zxn0qq",
            "DxnLigrLzMf1Ba",
            "mxWYFdb8nhWZ",
            "DwD5wLG",
            "A2v5",
            "qMTtBuK",
            "igfWCeLKpq",
            "s2nesvC",
            "C2LVBG",
            "CIbLEgnSDwrPBG",
            "x19HBgDVCML0Aa",
            "sK9hCu0",
            "rKXbrW",
            "y3Hzvu0",
            "x2rLzMf1BhruBW",
            "B3v4A3O",
            "C2v0DgLUz3m",
            "x3rPBwvVDxq",
            "z2jxrLG",
            "CKr6y1q",
            "y2LWAgvYDgv4Da",
            "x2zVCM1HDfzLCG",
            "Dg9Rzw4GAxmGzq",
            "C2v0u3LUyW",
            "mtqWmtqYmMHqqLzHuG",
            "zxbZlcbLBMqGxW",
            "D1fnqKS",
            "BgvUz3rO",
            "CgfYyw1ZigLZia",
            "CNzLzcbWyxjHBq",
            "DgfPBNmGCMvZzq",
            "yxjHBxm",
            "ig5HBwuU",
            "x19Nzw5lzxK",
            "rvjst1i",
            "BhrlzxKGAw5WDq",
            "x3zLCNnPB24",
            "BhrlzxK",
            "s0vo",
            "CuHhwKq",
            "rgHXvKe",
            "AgDmAum",
            "CM1HDfzLCNnPBW",
            "Dg9tDhjPBMC",
            "zw5K",
            "AKTlCMO",
            "v3zZELK",
            "zhf2A3q",
            "x19WyxjZzufSzW",
            "qKzWB28",
            "zfzjsxi",
            "igzWoG",
            "uvzlDu0",
            "ve9lru5Fru1qva",
            "y29Kzq",
            "Cg1Lrhe",
            "zxbZihvZzsbUzq",
            "vg9Rzw4",
            "lgv4ChjLC3m9",
            "lcbZDg9YywDLrG",
            "r09ssvritq",
            "x3rVA2vU",
            "odyWmtnWA0HUDxm",
            "ywjYDxb0",
            "D3jHCa",
            "A3rKs2G",
            "AMDMtu8",
            "mcfa",
            "CMvTB3zLu3LUyW",
            "CMv0DxjUia",
            "CgfYyw1ZignVBG",
            "x3n0B3jHz2v0BW",
            "r3rVAwC",
            "yMuGysbUB24Tzq",
            "z2vgB3jTyxrwzq",
            "BKPItva",
            "s2v5",
            "z2vUzxjHDguGAW",
            "uhLnDKi",
            "z25lzxK",
            "CNnPB246",
            "mtyZmtjqCvz1s2S",
            "yw1Z",
            "ot41kNq1",
            "swzJAfm",
            "EvbRz2m",
            "CeTVrfy",
            "FdL8n3WWFdn8mG",
            "BwfYAW",
            "zxbZlcbZDg9Yyq",
            "uKnfu3y",
            "m3W0Fdv8mNWWFa",
            "Fdj8mta",
            "wgjeBvG",
            "odu2vMH4z0Tn",
            "tefNrvy",
            "x2rLyNvN",
            "yxbWswq",
            "zw52",
            "rKrRvuO",
            "B0DrCu0",
            "lcbYzxn1Bhq6",
            "BKTLEq",
            "BNzdB2XSzwn0pq",
            "BMv4Da",
            "CfHJufu",
            "tw1Qvfy",
            "ihbHCMfTC1n0CG",
            "Bw1ZC1ntuW",
            "x3n0AW",
            "zxbZlcbZDgfYDa",
            "zw5JCNLWDa",
            "tLLQt0K",
            "lcbZAwDUzwrtDa",
            "x29UuMvXDwvZDa",
            "DcbUB3qGC2f2zq",
            "wNzKuuG",
            "x1bbuKfnuW",
            "qLjVr1y",
            "mxWYFdb8n3W0Fa",
            "y2HLigzWlcbMCa",
            "wwnuqMO",
            "lcbFzM9YBwf0vG",
            "zxbZlcb1C2uGyW",
            "z1vXuem",
            "EM1HrKS",
            "BwfZuNy",
            "x19WyxjZzvrVAW",
            "BwvZC2fNzq",
            "ihbHCMfTCW",
            "r0vorvjbvevFuW",
            "C2LNBLn0CG",
            "uwvmC0K",
            "A1jJre0",
            "jJe3AgGX",
            "z0fetKm",
            "x19Nzw5tAwDUla",
            "y3HJtfa",
            "vvPdBe0",
            "mtjyzffMy1q",
            "x2LZtM9YBwfS",
            "zw52q29SBgvJDa",
            "DMfSDwu",
            "A01qD1e",
            "x3n0B3jHz2vgCa",
            "DfrVA2vU",
            "BNfyqMG",
            "zxf1zxn0ihn1yW",
            "zvn6Aw4",
          ];
          return (_b = function () {
            return t;
          })();
        }
        !(function (t, e) {
          var n = Cb();
          function r(t, e, n, r) {
            return Ib(n - 471, r);
          }
          function o(t, e, n, r) {
            return Ib(r - -130, e);
          }
          for (;;)
            try {
              if (
                477105 ==
                (parseInt(r(0, 0, 658, 612)) / 1) *
                  (-parseInt(o(0, 74, 0, 140)) / 2) +
                  (parseInt(o(0, 21, 0, 9)) / 3) *
                    (-parseInt(o(0, 196, 0, 148)) / 4) +
                  (parseInt(o(0, -43, 0, -2)) / 5) *
                    (parseInt(r(0, 0, 743, 715)) / 6) +
                  (parseInt(o(0, 58, 0, 136)) / 7) *
                    (-parseInt(r(0, 0, 673, 754)) / 8) +
                  -parseInt(o(0, 86, 0, 63)) / 9 +
                  parseInt(r(0, 0, 606, 656)) / 10 +
                  parseInt(r(0, 0, 739, 745)) / 11
              )
                break;
              n.push(n.shift());
            } catch (t) {
              n.push(n.shift());
            }
        })(),
          (function (t, e) {
            var n = _b();
            function r(t, e, n, r) {
              return Eb(t - 462, e);
            }
            function o(t, e, n, r) {
              return Eb(e - 635, n);
            }
            for (;;)
              try {
                if (
                  874035 ==
                  parseInt(o(0, 1091, 1223)) / 1 +
                    -parseInt(o(0, 865, 715)) / 2 +
                    -parseInt(r(906, 1033)) / 3 +
                    (parseInt(o(0, 922, 1029)) / 4) *
                      (-parseInt(o(0, 1089, 1031)) / 5) +
                    (parseInt(o(0, 980, 915)) / 6) *
                      (-parseInt(o(0, 1072, 1029)) / 7) +
                    (-parseInt(r(762, 733)) / 8) *
                      (-parseInt(r(730, 685)) / 9) +
                    parseInt(r(949, 1087)) / 10
                )
                  break;
                n.push(n.shift());
              } catch (t) {
                n.push(n.shift());
              }
          })();
        var Bb = (function () {
            var t = 70,
              e = {
                sqRSC: function (t, e) {
                  return t > e;
                },
                GZind: function (t, e) {
                  return t !== e;
                },
                pKoDV: function (t, e, n) {
                  return t(e, n);
                },
                tumjW: function (t, e, n, r) {
                  return t(e, n, r);
                },
                OEGxc:
                  r(1108, 1082, 1157, 1012) +
                  o(566, 279, 280, 429) +
                  o(124, 146, 125, 228),
                bXUzG: function (t, e, n) {
                  return t(e, n);
                },
                gUqPC:
                  "create ins" + o(482, 536, 352, 404) + o(179, 214, 245, 142),
                BFpoo: function (t, e) {
                  return t(e);
                },
                gbWFX: function (t, e) {
                  return t(e);
                },
                lLCCs: function (t, e) {
                  return t(e);
                },
                yILDp: function (t, e) {
                  return t(e);
                },
                cxcLP: function (t, e) {
                  return t(e);
                },
                LlIfT: o(89, 258, 317, 219),
                lDRfW: function (t, e) {
                  return t(e);
                },
                jKKrj: function (t, e) {
                  return t(e);
                },
                jkKtI: function (t, e) {
                  return t + e;
                },
                NkvWT: function (t, e) {
                  return t + e;
                },
                gADNC: function (t, e) {
                  return t + e;
                },
                VrQiz: o(342, 343, 411, 337) + o(53, 282, 128, 171) + "t=",
                wQMBK: r(942, 892, 1004, 1047),
                KTXvg: ",key=",
                oEMYD: function (t, e) {
                  return t === e;
                },
                rDzcT: r(1316, 1178, 1198, 1147) + "3",
                HEbsW: function (t, e, n) {
                  return t(e, n);
                },
                qHGZD: function (t, e) {
                  return t(e);
                },
                ZvdQH: o(57, 1, 125, 138),
                UhPZP: function (t, e) {
                  return t || e;
                },
                FDkUJ: r(970, 1005, 1015, 1036),
                sBewJ: function (t, e) {
                  return t + e;
                },
                yPkgc: function (t, e) {
                  return t + e;
                },
                iAVEG: function (t, e, n) {
                  return t(e, n);
                },
                UZClM: o(249, 189, 202, 272) + o(284, 102, 168, 243) + ":",
                QeLsI: r(1061, 1076, 1059, 970) + "r:",
                lWgnq:
                  "__requestDeps reques" +
                  o(279, 397, 457, 333) +
                  r(1231, 1055, 1103, 1031) +
                  "r: ",
                XiPWI: function (t, e, n) {
                  return t(e, n);
                },
                EUgsH:
                  o(151, 405, 419, 302) +
                  r(1024, 987, 1035, 929) +
                  r(978, 1071, 1020, 1152) +
                  o(65, 244, 153, 216),
                GvSRb: o(315, 209, 112, 258) + o(536, 312, 436, 394),
                PyMvB: function (t) {
                  return t();
                },
                DdbCm: function (t, e) {
                  return t * e;
                },
                szPCL:
                  o(274, 396, 168, 302) +
                  "eps use ca" +
                  r(1133, 1100, 1066, 931) +
                  ":",
                LuPNk: "use normal" + r(1059, 978, 1003, 1113),
                HUKEa: o(254, 313, 447, 363),
                aIKrC: o(237, 246, 47, 137) + o(298, 287, 257, 281),
                pmeDq: r(1077, 1041, 1037, 894) + "1",
                PDBhy: function (t, e) {
                  return t * e;
                },
                zdMdw: function (t, e) {
                  return t * e;
                },
                cxYUM: function (t, e) {
                  return t(e);
                },
                jgfMO: o(399, 181, 153, 304),
                Gtoig: function (t, e, n, r) {
                  return t(e, n, r);
                },
                nSLLo:
                  o(467, 486, 526, 437) +
                  o(271, 475, 295, 356) +
                  r(1114, 1149, 1049, 1130),
                bUOzi: r(1025, 1069, 1133, 1050) + o(199, 102, 106, 223) + "|5",
                XbDmX:
                  r(950, 882, 974, 901) +
                  "empty afte" +
                  o(-3, 253, 29, 145) +
                  r(1191, 1208, 1158, 1053) +
                  o(370, 187, 414, 265),
                UdzXC: function (t, e) {
                  return t(e);
                },
                eAsYb: function (t, e) {
                  return t(e);
                },
                nbrzW: function (t, e) {
                  return t(e);
                },
                ktdKh: o(182, 41, 200, 164) + "not a plain object",
                pLAcr: r(1215, 1029, 1145, 1146) + "equired",
                XqXbV:
                  o(298, 186, 141, 206) +
                  r(946, 925, 976, 922) +
                  o(139, 203, 80, 165) +
                  o(45, 82, 113, 168),
                NYjOI: function (t, e) {
                  return t(e);
                },
                RCESv: r(1108, 896, 974, 871) + "empty",
                ujKlA: o(247, 286, 108, 255) + "6|5|3",
                AihNu: function (t, e) {
                  return t(e);
                },
                dVIIr: function (t, e) {
                  return t + e;
                },
                KFlyv: function (t, e, n, r) {
                  return t(e, n, r);
                },
                MmjTV: r(1314, 1310, 1195, 1330),
                oGQqM: r(1167, 1041, 1023, 1085) + r(1235, 1154, 1160, 1285),
                mVhRl: o(176, 154, 123, 158) + o(394, 467, 347, 357),
                igXjD: function (t, e, n, r) {
                  return t(e, n, r);
                },
                QVKuM:
                  r(1339, 1230, 1211, 1151) + r(1199, 1133, 1087, 1115) + "=",
                nrpyI: o(441, 473, 337, 329) + r(1039, 1198, 1080, 1197),
                MRrLr: function (t, e) {
                  return t == e;
                },
                fhjEU: function (t, e, n) {
                  return t(e, n);
                },
                VCEIL: o(379, 472, 417, 342) + o(452, 280, 368, 383),
                vghwD: function (t, e) {
                  return t - e;
                },
                ChHwi: r(1338, 1098, 1246, 1182),
                LFpJl: r(1177, 1236, 1226, 1367) + o(367, 487, 542, 395),
                npCks: r(1032, 1019, 990, 866),
                nqXBh: function (t, e) {
                  return t(e);
                },
                ezcoA: "__iniConfig",
                MPeoP: r(950, 909, 956, 989) + "m",
                Ldzrb: r(1068, 1029, 1073, 925) + "en",
                eSzin: r(844, 1027, 994, 1018) + r(1066, 1097, 1116, 1012),
                JUgRo: o(312, 290, 360, 379) + r(883, 1086, 977, 871),
                hDEok: "__genSign",
                wjRFv: o(297, 349, 369, 302) + "eps",
                JagHA: r(1178, 1246, 1247, 1218) + "lgorithm",
                elrcz: r(1241, 1172, 1230, 1206) + "ams",
                ugyZX: r(1154, 1055, 1097, 1214),
                DjQsC: r(1030, 1231, 1124, 979),
                wEPXJ: r(1134, 1107, 1121, 985),
              };
            function n() {
              var t = 182,
                r = 110,
                i = 133,
                a = 75,
                c = 508,
                u =
                  e[f(-278, -282, -217, -126)](
                    arguments[f(-333, -254, -345, -370)],
                    0
                  ) && e.GZind(arguments[0], void 0)
                    ? arguments[0]
                    : {};
              e[l(-315, -412, -205)](gf, this, n),
                (this[f(-330, -373, -301, -151) + l(-103, -233, -71)] =
                  yy["DYNAMIC_TO" + l(-363, -237, -248)]),
                (this[f(-80, -78, -75, -190) + "gnKey"] =
                  yy["DYNAMIC_AL" + f(-213, -316, -312, -193)]),
                (this[l(-194, -223, -271) + "rmatVersionKey"] =
                  yy[l(-389, -405, -519)]),
                (this[l(-257, -110, -159) + f(-307, -389, -296, -292)] = yy.VK),
                (this[f(-190, -275, -311, -313)] = ""),
                (this[f(-211, -214, -358, -468) + "ken"] = ""),
                (this[l(-261, -319, -134)] = !1),
                (this[l(-239, -308, -264)] = "");
              var s = {};
              (s.local_key_1 = Fw),
                (s[f(-113, -220, -120, -104) + "2"] = Kw),
                (s[f(-100, -113, -120, -124) + "3"] = qw),
                (this[l(-177, -73, -181) + l(-222, -189, -210)] = s);
              var A = {};
              function f(t, e, n, r) {
                return o(t - i, r, n - a, n - -c);
              }
              function l(e, n, i, a) {
                return o(e - t, n, i - r, e - -537);
              }
              (A.MD5 = Fw),
                (A.SHA256 = Kw),
                (A.SHA512 = Gw),
                (A[l(-210, -200, -270)] = qw),
                (A.HmacSHA512 = Vw),
                (A[f(-119, 0, -192, -229)] = Jw),
                (this[l(-107, -51, 7)] = A),
                (this[f(-303, 0, -336, -319)] = "4.2"),
                (this[f(-443, 0, -351, -415) + "sion"] = 4.2),
                (this._fingerprint = ""),
                (u = e[l(-201, -280, -265)](Sg, {}, n.settings, u)),
                this.__iniConfig(u);
            }
            function r(t, e, n, r) {
              return Eb(n - 740, r);
            }
            function o(e, n, r, o) {
              return Eb(o - -t, n);
            }
            return (
              e[o(0, 294, 0, 403)](sp, n, [
                {
                  key: e[o(0, 505, 0, 428)],
                  value: function (t) {
                    var n = e.OEGxc[r(638, 480, 683, 628)]("|");
                    function r(t, e, n, r) {
                      return o(0, t, 0, r - 310);
                    }
                    var i = 0;
                    function a(t, e, n, r) {
                      return o(0, n, 0, r - -630);
                    }
                    for (;;) {
                      switch (n[i++]) {
                        case "0":
                          e[a(0, 0, -196, -338)](
                            Hv,
                            this[a(0, 0, -298, -398)],
                            e[a(0, 0, -262, -370)][a(0, 0, -242, -321)](
                              this[r(746, 0, 0, 608)]
                            )
                          );
                          continue;
                        case "1":
                          this[r(641, 0, 0, 706)] = Fv(p) ? p : Rv;
                          continue;
                        case "2":
                          Hv(
                            this[r(513, 0, 0, 542)],
                            ("create ins" +
                              a(0, 0, -297, -226) +
                              a(0, 0, -125, -231))[r(609, 0, 0, 619)](
                              this._timeout
                            )
                          );
                          continue;
                        case "3":
                          this[a(0, 0, -514, -398)] = Boolean(h);
                          continue;
                        case "4":
                          this[r(524, 0, 0, 463)] = Number(d);
                          continue;
                        case "5":
                          this._appId = f || "";
                          continue;
                        case "6":
                          var c, u, s, A;
                          this[a(0, 0, -260, -332)] &&
                            ((this[r(410, 0, 0, 517) + a(0, 0, -324, -196)] = e
                              .BFpoo(
                                kg,
                                (c = ""[r(656, 0, 0, 619)](
                                  this._storagetokenKey,
                                  "_"
                                ))
                              )
                              [a(0, 0, -374, -289)](
                                c,
                                this[a(0, 0, -264, -332)]
                              )),
                            (this[a(0, 0, -288, -197) + a(0, 0, -311, -415)] =
                              e[r(531, 0, 0, 464)](
                                kg,
                                (u = "".concat(
                                  this[
                                    a(0, 0, -347, -197) + a(0, 0, -303, -415)
                                  ],
                                  "_"
                                ))
                              )[r(649, 0, 0, 651)](u, this[r(755, 0, 0, 608)])),
                            (this[
                              "_storageFo" +
                                r(548, 0, 0, 488) +
                                r(418, 0, 0, 548)
                            ] = e
                              .lLCCs(
                                kg,
                                (s = ""[r(622, 0, 0, 619)](
                                  this[
                                    "_storageFo" + r(613, 0, 0, 488) + "nKey"
                                  ],
                                  "_"
                                ))
                              )
                              [r(678, 0, 0, 651)](s, this._appId)),
                            (this[r(518, 0, 0, 590) + a(0, 0, -348, -418)] = e[
                              r(780, 0, 0, 659)
                            ](
                              kg,
                              (A = "".concat(
                                this[a(0, 0, -265, -350) + r(672, 0, 0, 522)],
                                "_"
                              ))
                            ).call(A, this._appId)));
                          continue;
                        case "7":
                          var f = t[r(551, 0, 0, 543)],
                            l = t[a(0, 0, -156, -266)],
                            h = t[r(749, 0, 0, 686)],
                            d = t[r(709, 0, 0, 636)],
                            p = t[a(0, 0, -133, -203)],
                            g = t[a(0, 0, -241, -342) + r(773, 0, 0, 632)],
                            m = t["onRequestT" + r(624, 0, 0, 661) + "ly"];
                          continue;
                        case "8":
                          !Wv(t[r(432, 0, 0, 543)]) || t.appId;
                          continue;
                        case "9":
                          this[
                            a(0, 0, -396, -380) +
                              r(767, 0, 0, 707) +
                              r(634, 0, 0, 733)
                          ] = Fv(m) ? m : Rv;
                          continue;
                        case "10":
                          l && this[r(515, 0, 0, 612) + "eps"]();
                          continue;
                        case "11":
                          this[r(701, 0, 0, 560) + r(418, 0, 0, 503)] = e[
                            a(0, 0, -248, -223)
                          ](Fv, g)
                            ? g
                            : Rv;
                          continue;
                      }
                      break;
                    }
                  },
                },
                {
                  key: o(0, 466, 0, 337) + r(0, 0, 983, 940),
                  value: function (t, n, o, i) {
                    var a,
                      c,
                      u,
                      s,
                      A = this;
                    function f(t, e, n, o) {
                      return r(0, 0, e - -1398, o);
                    }
                    function l(t, e, n, o) {
                      return r(0, 0, e - -650, t);
                    }
                    var h = "",
                      d = e[f(0, -208, 0, -198)],
                      p = e
                        .lDRfW(
                          kg,
                          (a = e[f(0, -164, 0, -20)](
                            kg,
                            (c = e[f(0, -403, 0, -390)](
                              kg,
                              (u = e[l(418, 345)](kg, (s = ""[l(362, 469)](t)))[
                                l(371, 501)
                              ](s, n))
                            )[f(0, -247, 0, -311)](u, o))
                          )[f(0, -247, 0, -261)](c, i))
                        )
                        [f(0, -247, 0, -120)](a, d),
                      g = Ww[f(0, -175, 0, -99)](
                        Qw[f(0, -220, 0, -306)](
                          e[f(0, -407, 0, -481)](
                            Vv,
                            this[f(0, -325, 0, -459) + "en"](t, 16, 28)
                          )
                        )
                      ),
                      m = g[l(465, 505)](/^[123]([x+][123])+/);
                    if (m) {
                      var v = m[0].split(""),
                        y = this[l(398, 520) + "gorithm"],
                        w = "";
                      Pp(v)[f(0, -247, 0, -119)](v, function (n) {
                        var r, o;
                        function i(t, e, n, r) {
                          return f(0, e - 339, 0, r);
                        }
                        function a(t, e, n, r) {
                          return l(t, e - -260);
                        }
                        if (e.cxcLP(isNaN, n))
                          e[i(0, -95, 0, -180)](Qg, (o = ["+", "x"]))[
                            i(0, 92, 0, 39)
                          ](o, n) >= 0 && (w = n);
                        else {
                          var c,
                            u = e[a(286, 173)](
                              kg,
                              (c = ""[i(0, 60, 0, 73)](by))
                            ).call(c, n);
                          if (y[u])
                            switch (w) {
                              case "+":
                                h = e[a(322, 307)](
                                  kg,
                                  (r = ""[i(0, 60, 0, 54)](h))
                                )[a(345, 241)](
                                  r,
                                  A[i(0, -103, 0, -228) + "m"](u, p, t)
                                );
                                break;
                              case "x":
                                h = A[a(101, 46) + "m"](u, h, t);
                                break;
                              default:
                                h = A[a(93, 46) + "m"](u, p, t);
                            }
                        }
                      });
                    }
                    return (
                      e.pKoDV(
                        Hv,
                        this[l(376, 392)],
                        e.jkKtI(
                          e[f(0, -280, 0, -377)](
                            e[f(0, -280, 0, -172)](
                              e[f(0, -280, 0, -165)](
                                e[l(351, 431)](e[f(0, -170, 0, -273)], p),
                                e[l(333, 322)]
                              ),
                              g
                            ),
                            e[l(368, 485)]
                          ),
                          h
                        )
                      ),
                      h
                    );
                  },
                },
                {
                  key: e.MPeoP,
                  value: function (t, n, r) {
                    var i = this[a(813, 666, 768) + "gorithm"][t];
                    function a(t, e, n, r) {
                      return o(0, e, 0, t - 453);
                    }
                    function c(t, e, n, r) {
                      return o(0, n, 0, r - 686);
                    }
                    return e.oEMYD(t, e[a(608, 759)])
                      ? e.HEbsW(i, n, r)[a(632, 511)](Rw)
                      : e[c(0, 0, 955, 861)](i, n)[c(0, 0, 988, 865)](Rw);
                  },
                },
                {
                  key: e.Ldzrb,
                  value: function (t, n, r) {
                    return t
                      ? e[o(0, 1274, 0, 407)](ug, t)[o(0, -212, 0, 341)](
                          t,
                          n,
                          r
                        )
                      : "";
                  },
                },
                {
                  key: e[r(0, 0, 1094, 963)],
                  value: function (t, n) {
                    function i(t, e, n, o) {
                      return r(0, 0, t - -552, n);
                    }
                    function a(t, e, n, r) {
                      return o(0, n, 0, r - 917);
                    }
                    if (t && n)
                      for (
                        var c = e[i(510, 0, 517)][i(576, 0, 547)]("|"), u = 0;
                        ;

                      ) {
                        switch (c[u++]) {
                          case "0":
                            var s = this._token && this[a(0, 0, 1048, 1086)];
                            continue;
                          case "1":
                            this[a(0, 0, 1213, 1114)] = e[a(0, 0, 1152, 1289)](
                              t,
                              ""
                            );
                            continue;
                          case "2":
                            this[i(427, 0, 323)] =
                              (n &&
                                new Function(
                                  e[a(0, 0, 1261, 1152)][i(567, 0, 692)](n)
                                )()) ||
                              null;
                            continue;
                          case "3":
                            return s;
                          case "4":
                            this[i(534, 0, 628)] = s;
                            continue;
                        }
                        break;
                      }
                    return !1;
                  },
                },
                {
                  key: e.JUgRo,
                  value: function (t, e, n, i) {
                    function a(t, e, n, r) {
                      return o(0, e, 0, n - -518);
                    }
                    function c(t, e, n, o) {
                      return r(0, 0, t - -888, o);
                    }
                    return [
                      ""[c(231, 0, 0, 249)](n),
                      ""[c(231, 0, 0, 157)](this[a(0, -93, -178) + "nt"]),
                      ""[a(0, -141, -209)](this[a(0, -313, -220)]),
                      ""[a(0, -277, -209)](
                        this[c(198, 0, 0, 51)]
                          ? this[a(0, -310, -321)]
                          : this[c(72, 0, 0, 131) + c(303, 0, 0, 334)]
                      ),
                      ""[a(0, -277, -209)](t),
                      ""[a(0, -260, -209)](this[c(94, 0, 0, -36)]),
                      "".concat(e),
                      "".concat(i),
                    ][c(239, 0, 0, 185)](";");
                  },
                },
                {
                  key: e[r(0, 0, 1134, 1216)],
                  value: function (t, n) {
                    var o,
                      i = {
                        UfseW: function (t, n) {
                          return e.sBewJ(t, n);
                        },
                        KcDIW: function (t, e) {
                          return t + e;
                        },
                      };
                    function a(t, e, n, o) {
                      return r(0, 0, o - -1594, t);
                    }
                    function c(t, e, n, o) {
                      return r(0, 0, n - 20, t);
                    }
                    var u = qg(n)
                        .call(n, function (t) {
                          return i.UfseW(
                            i[Eb(213, -167)](t[Eb(210, 311)], ":"),
                            t.value
                          );
                        })
                        .join("&"),
                      s = e[a(-631, 0, 0, -599)](
                        Kw,
                        e[c(1100, 0, 1051)](e[c(1200, 0, 1138)](t, u), t)
                      )[a(-476, 0, 0, -605)](Rw);
                    return (
                      e[a(-371, 0, 0, -402)](
                        Hv,
                        this._debug,
                        kg(
                          (o = e[a(-628, 0, 0, -510)][a(-404, 0, 0, -475)](
                            u,
                            e[c(1203, 0, 1098)]
                          ))
                        )[c(1275, 0, 1171)](o, s)
                      ),
                      s
                    );
                  },
                },
                {
                  key: e[r(0, 0, 1203, 1298)],
                  value: (function () {
                    var t = {
                      UFOxe: function (t, n, r) {
                        return e[Eb(460, 1224)](t, n, r);
                      },
                      SNjFG: e[n(-437, -479, -378)],
                      dqvkt: e[n(-646, -608, -667)],
                      kcZKN: function (t, e) {
                        return t !== e;
                      },
                      ouxkz: function (t, e) {
                        return t * e;
                      },
                      kMPwQ: function (t) {
                        return e[i(532, 862, 685, 574)](t);
                      },
                      bIavB: function (t, n) {
                        return e.DdbCm(t, n);
                      },
                      tDZrd: function (t, e, n) {
                        return t(e, n);
                      },
                      nJbMP: function (t, n, r) {
                        return e.pKoDV(t, n, r);
                      },
                      BRoGV: e[n(-678, -536, -551)],
                      qrxjq: e[n(-475, -473, -570)],
                      NRwUC:
                        i(792, 586, 765, 662) +
                        n(-714, -639, -497) +
                        "ache token" +
                        i(695, 714, 789, 738),
                      BeOpd: e[n(-474, -554, -478)],
                      VNggA: e[i(766, 586, 714, 663)],
                    };
                    function n(t, e, n, r) {
                      return o(0, t, 0, e - -898);
                    }
                    var r = pf(
                      Ag[i(479, 571, 664, 584)](function r() {
                        var o = {};
                        o[f(-34, -66, 72)] = e.lWgnq;
                        var i,
                          a,
                          c,
                          u,
                          s = o,
                          A = this;
                        function f(t, e, r, o) {
                          return n(r, t - 510);
                        }
                        return Ag[f(-188, 0, -251)](
                          function (e) {
                            function n(t, e, n, r) {
                              return f(n - -263, 0, e);
                            }
                            function r(t, e, n, r) {
                              return f(n - -461, 0, e);
                            }
                            for (;;)
                              switch (
                                (e[n(0, -307, -239)] = e[n(0, -533, -411)])
                              ) {
                                case 0:
                                  if (
                                    ((a = Lv.getSync(
                                      this[
                                        n(0, -415, -308) +
                                          r(0, -608, -671) +
                                          n(0, -451, -413)
                                      ]
                                    )),
                                    t.UFOxe(
                                      Hv,
                                      this[n(0, -469, -419)],
                                      kg(
                                        (i = t.SNjFG.concat(
                                          a,
                                          t[n(0, -422, -468)]
                                        ))
                                      )[n(0, -175, -310)](
                                        i,
                                        this[
                                          r(0, -825, -692) + n(0, -645, -507)
                                        ]
                                      )
                                    ),
                                    (!a ||
                                      t.kcZKN(
                                        a,
                                        this[
                                          r(0, -842, -692) + n(0, -514, -507)
                                        ]
                                      )) &&
                                      (Nv[n(0, -489, -447)](
                                        this[
                                          n(0, -454, -371) + r(0, -714, -637)
                                        ]
                                      ),
                                      Nv[n(0, -322, -447)](
                                        this[
                                          n(0, -529, -444) + n(0, -217, -217)
                                        ]
                                      ),
                                      Nv[r(0, -791, -645)](
                                        this[
                                          r(0, -322, -416) + n(0, -379, -436)
                                        ]
                                      ),
                                      Nv[n(0, -458, -492)](
                                        this[
                                          "_storageFo" +
                                            r(0, -623, -671) +
                                            n(0, -298, -413)
                                        ],
                                        this[r(0, -636, -692) + "sion"],
                                        {
                                          expire: t[r(0, -843, -698)](
                                            86400,
                                            365
                                          ),
                                        }
                                      )),
                                    (this[r(0, -508, -509) + "nt"] = Lv.getSync(
                                      this[n(0, -454, -371) + "Key"]
                                    )),
                                    this[r(0, -506, -509) + "nt"]
                                      ? t.nJbMP(
                                          Hv,
                                          this[n(0, -456, -419)],
                                          t[n(0, -260, -397)].concat(
                                            this[r(0, -436, -509) + "nt"]
                                          )
                                        )
                                      : ((this._fingerprint =
                                          t[r(0, -422, -570)](tb)),
                                        Nv[n(0, -521, -492)](
                                          this[
                                            n(0, -292, -371) + n(0, -297, -439)
                                          ],
                                          this[r(0, -536, -509) + "nt"],
                                          {
                                            expire: t[n(0, -430, -500)](
                                              t.bIavB(3600, 24),
                                              365
                                            ),
                                          }
                                        ),
                                        t[n(0, -243, -236)](
                                          Hv,
                                          this._debug,
                                          (r(0, -489, -547) +
                                            n(0, -381, -459) +
                                            n(0, -206, -330))[r(0, -391, -540)](
                                            this[n(0, -314, -311) + "nt"]
                                          )
                                        )),
                                    (c = Ww.stringify(
                                      Qw.parse(
                                        Nv[r(0, -318, -435)](
                                          this[
                                            r(0, -704, -642) + n(0, -303, -217)
                                          ]
                                        ) || ""
                                      )
                                    )),
                                    (u = Ww[n(0, -201, -238)](
                                      Qw.parse(
                                        Lv.getSync(
                                          this[
                                            r(0, -450, -416) + n(0, -384, -436)
                                          ]
                                        ) || ""
                                      )
                                    )),
                                    !this[r(0, -736, -665) + n(0, -326, -345)](
                                      c,
                                      u
                                    ))
                                  ) {
                                    e[r(0, -668, -609)] = 12;
                                    break;
                                  }
                                  var o = {};
                                  return (
                                    (o[n(0, -524, -461)] = 0),
                                    (o.message = t.qrxjq),
                                    this[n(0, -546, -401) + "Token"](o),
                                    t[r(0, -735, -638)](
                                      Hv,
                                      this[n(0, -514, -419)],
                                      t.NRwUC[r(0, -440, -540)](
                                        this[n(0, -574, -454)]
                                      )
                                    ),
                                    e[n(0, -367, -452)](t[n(0, -256, -366)])
                                  );
                                case 12:
                                  var l = {};
                                  (l[r(0, -693, -659)] = 1),
                                    (l[r(0, -464, -585)] = t[r(0, -536, -511)]),
                                    this["_onRequest" + n(0, -558, -458)](l),
                                    Hv(
                                      this[r(0, -737, -617)],
                                      ("__requestD" +
                                        n(0, -543, -405) +
                                        " __request" +
                                        n(0, -155, -240) +
                                        r(0, -608, -662))[r(0, -484, -540)](
                                        this[r(0, -521, -509) + "nt"]
                                      )
                                    ),
                                    this[n(0, -152, -214) + r(0, -357, -439)]()[
                                      r(0, -436, -413)
                                    ](function (t) {
                                      function e(t, e, r, o) {
                                        return n(0, t, e - 1559);
                                      }
                                      Hv(
                                        A[e(1236, 1140)],
                                        s[e(1112, 1262)][n(0, 1186, -342)](t)
                                      );
                                    }),
                                    t[n(0, -378, -440)](
                                      Hv,
                                      this[r(0, -567, -617)],
                                      (r(0, -531, -547) +
                                        r(0, -605, -688) +
                                        "_requestAlgorithm, fp:")[
                                        r(0, -588, -540)
                                      ](this[r(0, -563, -509) + "nt"])
                                    );
                                case 16:
                                case r(0, -555, -669):
                                  return e[n(0, -363, -331)]();
                              }
                          },
                          r,
                          this
                        );
                      })
                    );
                    function i(t, e, n, r) {
                      return o(0, e, 0, r - 360);
                    }
                    return function () {
                      return r[
                        (function (t, e, n, r) {
                          return i(0, e, 0, r - 144);
                        })(0, 913, 0, 869)
                      ](this, arguments);
                    };
                  })(),
                },
                {
                  key: e[o(0, 241, 0, 334)],
                  value: (function () {
                    var t = {
                        masRv: function (t, n, r, o) {
                          return e[Eb(278, 368)](t, n, r, o);
                        },
                        pXcPU: e[a(289, 176, 236, 201)],
                        hFkIn: i(-582, -807, -697),
                        LSxHr: a(129, 232, 192, 94),
                        YcTBj: i(-668, -604, -595),
                        WvszY: function (t, e, n) {
                          return t(e, n);
                        },
                      },
                      n = e.cxcLP(
                        pf,
                        Ag[i(-645, -597, -676)](function n() {
                          var r,
                            o,
                            a,
                            c,
                            u,
                            s,
                            A,
                            f,
                            l,
                            h = {
                              LAgEV: e[p(820, 824, 731, 827)],
                              Pnamn: function (t, n, r) {
                                return e[p(1032, -413, -984, -353)](t, n, r);
                              },
                              kRcDM:
                                g(1324, 1374, 1330) +
                                "lgorithm r" +
                                g(1028, 1292, 1176) +
                                p(1004, 1003, 972, 994) +
                                g(1159, 1276, 1179),
                              PCSIt: function (t, n) {
                                return e[p(959, 153, -205, 333)](t, n);
                              },
                              ywvpj: function (t, n) {
                                return e[p(1050, 514, 538, 1014)](t, n);
                              },
                              DlESd: function (t, e, n) {
                                return t(e, n);
                              },
                              IfchS: function (t, n) {
                                return e[p(778, -443, -542, -294)](t, n);
                              },
                              JOGqM: g(1095, 1031, 1088) + "p:",
                              LdxHy: e[g(1075, 1165, 1095)],
                            },
                            d = this;
                          function p(t, e, n, r) {
                            return i(t - 310, r, t - 1529);
                          }
                          function g(t, e, n, r) {
                            return i(t - 215, e, n - 1793);
                          }
                          return Ag[g(1238, 1172, 1093)](
                            function (e) {
                              function n(t, e, n, r) {
                                return g(t - 472, t, n - -1781);
                              }
                              function i(t, e, n, r) {
                                return g(t - 313, e, t - -720);
                              }
                              for (;;)
                                switch (
                                  (e[i(585, 732)] = e[n(-542, 0, -648)])
                                ) {
                                  case 0:
                                    return (e[i(413, 526)] = 2), Sb(0);
                                  case 2:
                                    ((r = e[n(-560, 0, -576)]).ai =
                                      this[i(471, 425)]),
                                      (r.fp = this[i(513, 432) + "nt"]),
                                      (o = t[n(-743, 0, -626)](Jg, r, null, 2)),
                                      Hv(
                                        this[i(405, 542)],
                                        t[i(414, 464)][i(482, 565)](o)
                                      ),
                                      (a = Uw[n(-764, 0, -641)](
                                        o,
                                        Ww[n(-414, 0, -520)](
                                          [
                                            "wm",
                                            t[i(532, 553)],
                                            "w-",
                                            t[n(-608, 0, -517)],
                                            t[i(430, 297)],
                                            "o(",
                                          ][i(490, 512)]("")
                                        ),
                                        {
                                          iv: Ww[n(-375, 0, -520)](
                                            [
                                              "01",
                                              "02",
                                              "03",
                                              "04",
                                              "05",
                                              "06",
                                              "07",
                                              "08",
                                            ][i(490, 632)]("")
                                          ),
                                        }
                                      )),
                                      (c = a[i(329, 430)][i(352, 326)]()),
                                      (u = this[n(-582, 0, -548) + "nt"]),
                                      (s = this[i(471, 561)]),
                                      (A = this[n(-818, 0, -716)]),
                                      (f = this[i(326, 224)]),
                                      (l = this[i(405, 461)]),
                                      (e[n(-706, 0, -648)] = 16);
                                    var p = {};
                                    return (
                                      (p[n(-572, 0, -453) + "t"] = u),
                                      (p[n(-754, 0, -655)] = s),
                                      (p.version = A),
                                      (p[i(499, 358)] = f),
                                      (p[n(-521, 0, -654)] = c),
                                      (p[n(-592, 0, -512)] = l),
                                      t[i(355, 450)](
                                        _y,
                                        p,
                                        this[
                                          n(-495, 0, -638) +
                                            i(570, 578) +
                                            n(-411, 0, -465)
                                        ]
                                      )[n(-349, 0, -457)](function (t) {
                                        var e = t[y(635, 630, 654, 593)],
                                          r = t[y(689, 827, 655, 627)],
                                          o = t.fp;
                                        if (
                                          d[
                                            y(512, 659, 434, 554) +
                                              y(634, 599, 613, 647)
                                          ](r, e)
                                        ) {
                                          var a,
                                            c,
                                            u = Nv[v(-290, 0, 0, -353)](
                                              d[
                                                v(-339, 0, 0, -487) +
                                                  v(-429, 0, 0, -555)
                                              ],
                                              1
                                            );
                                          if (!o || (u && o === u))
                                            for (
                                              var s =
                                                  h[y(559, 0, 0, 676)][
                                                    y(646, 0, 0, 770)
                                                  ]("|"),
                                                A = 0;
                                              ;

                                            ) {
                                              switch (s[A++]) {
                                                case "0":
                                                  var f = {};
                                                  (f.expire = m),
                                                    Nv[y(487, 0, 0, 451)](
                                                      d[
                                                        y(761, 0, 0, 755) +
                                                          y(543, 0, 0, 677)
                                                      ],
                                                      Qw[y(741, 0, 0, 745)](
                                                        Ww[v(-448, 0, 0, -399)](
                                                          e
                                                        )
                                                      ),
                                                      f
                                                    );
                                                  continue;
                                                case "1":
                                                  h[v(-461, 0, 0, -414)](
                                                    Hv,
                                                    d[y(560, 0, 0, 464)],
                                                    h[v(-499, 0, 0, -498)][
                                                      y(637, 0, 0, 559)
                                                    ](r)
                                                  );
                                                  continue;
                                                case "2":
                                                  var l = {};
                                                  (l.expire = m),
                                                    Lv.setSync(
                                                      d[
                                                        y(535, 0, 0, 535) +
                                                          v(-309, 0, 0, -333)
                                                      ],
                                                      Qw[v(-231, 0, 0, -354)](
                                                        Ww.parse(r)
                                                      ),
                                                      l
                                                    );
                                                  continue;
                                                case "3":
                                                  var p = d[
                                                    v(-403, 0, 0, -504) + "en"
                                                  ](r, 13, 15);
                                                  continue;
                                                case "4":
                                                  var g = hm(p, 16);
                                                  continue;
                                                case "5":
                                                  var m = h[
                                                    v(-412, 0, 0, -345)
                                                  ](h.ywvpj(g, 60), 60);
                                                  continue;
                                              }
                                              break;
                                            }
                                          else
                                            h.DlESd(
                                              Hv,
                                              d[v(-425, 0, 0, -535)],
                                              h[y(548, 0, 0, 471)](
                                                kg,
                                                (a = kg(
                                                  (c = (v(-210, 0, 0, -330) +
                                                    "lgorithm r" +
                                                    y(611, 0, 0, 627) +
                                                    "cess!,  bu" +
                                                    v(-551, 0, 0, -516) +
                                                    y(734, 0, 0, 775))[
                                                    y(637, 0, 0, 746)
                                                  ](r, h[v(-598, 0, 0, -620)]))
                                                )[v(-328, 0, 0, -426)](
                                                  c,
                                                  u,
                                                  h[v(-345, 0, 0, -466)]
                                                ))
                                              )[v(-456, 0, 0, -426)](a, o)
                                            );
                                        }
                                        function v(t, e, n, r) {
                                          return i(r - -940, t);
                                        }
                                        function y(t, e, r, o) {
                                          return n(o, 0, t - 1216);
                                        }
                                      })
                                    );
                                  case 16:
                                  case n(-719, 0, -708):
                                    return e[i(493, 487)]();
                                }
                            },
                            n,
                            this
                          );
                        })
                      );
                    function i(t, e, n, o) {
                      return r(0, 0, n - -1710, e);
                    }
                    function a(t, e, n, r) {
                      return o(0, r, 0, e - -170);
                    }
                    return function () {
                      var t = 380;
                      return n[
                        (function (e, n, r, o) {
                          return i(0, o, n - t);
                        })(0, -155, 0, -122)
                      ](this, arguments);
                    };
                  })(),
                },
                {
                  key: e.elrcz,
                  value: function (t) {
                    function n(t, e, n, r) {
                      return o(0, t, 0, n - -545);
                    }
                    function r(t, e, n, r) {
                      return o(0, e, 0, n - -201);
                    }
                    for (
                      var i = e[r(0, 26, 127)][n(-234, 0, -227)]("|"), a = 0;
                      ;

                    ) {
                      switch (i[a++]) {
                        case "0":
                          if (g) return this[n(-147, 0, -149)](g), null;
                          continue;
                        case "1":
                          var c, u, s;
                          continue;
                        case "2":
                          if (0 === d.length) {
                            var A = {};
                            return (
                              (A[n(-397, 0, -355)] =
                                Lw[n(-176, 0, -246) + "_PARAMS"]),
                              (A[n(-203, 0, -281)] = e[r(0, 45, 28)]),
                              this[n(-77, 0, -149)](A),
                              null
                            );
                          }
                          continue;
                        case "3":
                          d = e
                            .cxcLP(
                              ym,
                              (c = e[n(-27, 0, -168)](
                                qg,
                                (u = e[n(-57, 0, -206)](
                                  iv,
                                  (s = e.nbrzW(uv, t))
                                ).call(s))
                              ).call(u, function (e) {
                                var o = {};
                                return (
                                  (o[r(0, 763, -61)] = e),
                                  (o[n(-8, 0, -267)] = t[e]),
                                  o
                                );
                              }))
                            )
                            .call(c, function (t) {
                              function r(t, e, r, o) {
                                return n(r, 0, o - 558);
                              }
                              return e[r(0, 0, 540, 437)](
                                Uv,
                                t[r(0, 0, 328, 291)]
                              );
                            });
                          continue;
                        case "4":
                          if (!Yy(t)) {
                            var f = {};
                            (f[r(0, -91, -11)] =
                              Lw[r(0, 43, 98) + n(-441, 0, -292)]),
                              (f[n(-206, 0, -281)] = e[r(0, -118, 0)]),
                              (g = f);
                          }
                          continue;
                        case "5":
                          return d;
                        case "6":
                          if (!this[r(0, 189, 97)]) {
                            var l = {};
                            (l[n(-481, 0, -355)] = Lw[n(-199, 0, -113) + "NT"]),
                              (l[n(-201, 0, -281)] = e[n(-3, 0, -140)]),
                              (g = l);
                          }
                          continue;
                        case "7":
                          if (e[r(0, -93, -20)](qv, t)) {
                            var h = {};
                            (h[r(0, 45, -11)] =
                              Lw[r(0, 93, 98) + n(-302, 0, -292)]),
                              (h[n(-421, 0, -281)] = e.XqXbV),
                              (g = h);
                          }
                          continue;
                        case "8":
                          var d = null;
                          continue;
                        case "9":
                          if (e[n(-343, 0, -297)](Xy, t)) {
                            var p = {};
                            (p[r(0, 22, -11)] =
                              Lw[r(0, 21, 98) + r(0, 61, 52)]),
                              (p[r(0, 81, 63)] = e[r(0, -121, 25)]),
                              (g = p);
                          }
                          continue;
                        case "10":
                          var g = null;
                          continue;
                      }
                      break;
                    }
                  },
                },
                {
                  key: e[o(0, 163, 0, 139)],
                  value: function (t, n) {
                    var r = "",
                      i = lv(),
                      a = (function () {
                        var t,
                          e =
                            arguments.length > 0 && void 0 !== arguments[0]
                              ? arguments[0]
                              : lv(),
                          n =
                            arguments.length > 1 && void 0 !== arguments[1]
                              ? arguments[1]
                              : "yyyy-MM-dd",
                          r = new Date(e),
                          o = n,
                          i = {
                            "M+": r.getMonth() + 1,
                            "d+": r.getDate(),
                            "D+": r.getDate(),
                            "h+": r.getHours(),
                            "H+": r.getHours(),
                            "m+": r.getMinutes(),
                            "s+": r.getSeconds(),
                            "w+": r.getDay(),
                            "q+": Math.floor((r.getMonth() + 3) / 3),
                            "S+": r.getMilliseconds(),
                          };
                        return (
                          /(y+)/i.test(o) &&
                            (o = o.replace(
                              RegExp.$1,
                              ""
                                .concat(r.getFullYear())
                                .substr(4 - RegExp.$1.length)
                            )),
                          Pp((t = uv(i))).call(t, function (t) {
                            if (new RegExp("(".concat(t, ")")).test(o)) {
                              var e,
                                n = "S+" === t ? "000" : "00";
                              o = o.replace(
                                RegExp.$1,
                                1 == RegExp.$1.length
                                  ? i[t]
                                  : kg((e = "".concat(n)))
                                      .call(e, i[t])
                                      .substr("".concat(i[t]).length)
                              );
                            }
                          }),
                          o
                        );
                      })(i, s(51, -35, -119) + s(-35, -91, -173)),
                      c = e[s(105, 20, 112)](a, "74");
                    this[A(575, 572, 589)]
                      ? (r =
                          this[s(-244, -166, -251)](
                            this[A(438, 493, 451)],
                            this._fingerprint,
                            c,
                            this[s(-30, -37, -55)],
                            this[s(37, 95, 64)]
                          ).toString() || "")
                      : ((this[A(573, 446, 556) + A(690, 677, 580)] =
                          (function (t) {
                            function e(t, e, n, r) {
                              return cb(n, 0, e - 465);
                            }
                            function n(t, e, n, r) {
                              return cb(e, 0, r - 59);
                            }
                            for (
                              var r = {
                                  RRWat: "6|1|4|8|3|" + e(0, 224, 203),
                                  QJyFV: function (t) {
                                    return t();
                                  },
                                  udHdI: function (t, e) {
                                    return t + e;
                                  },
                                  JBlxt: function (t, e) {
                                    return t + e;
                                  },
                                  nSKYy: function (t, e) {
                                    return t(e);
                                  },
                                  ajXzF: function (t, e) {
                                    return t + e;
                                  },
                                  TKyJf: function (t, e) {
                                    return t + e;
                                  },
                                },
                                o =
                                  r[n(0, -195, 0, -206)][n(0, -187, 0, -179)](
                                    "|"
                                  ),
                                i = 0;
                              ;

                            ) {
                              switch (o[i++]) {
                                case "0":
                                  a[n(0, -215, 0, -223)] = r.QJyFV(yb);
                                  continue;
                                case "1":
                                  a[e(0, 219, 252)] = "tk";
                                  continue;
                                case "2":
                                  a.producer = "l";
                                  continue;
                                case "3":
                                  a[e(0, 191, 156)] = "41";
                                  continue;
                                case "4":
                                  a[e(0, 182, 172)] = "02";
                                  continue;
                                case "5":
                                  return r[n(0, -240, 0, -242)](
                                    r[n(0, -203, 0, -242)](
                                      r.udHdI(
                                        r[e(0, 164, 205)](
                                          r[n(0, -201, 0, -192)](
                                            a[n(0, -173, 0, -187)] +
                                              a[n(0, -246, 0, -224)],
                                            a[e(0, 236, 244)]
                                          ),
                                          a[e(0, 172, 157)]
                                        ),
                                        a[n(0, -227, 0, -215)]
                                      ),
                                      a[n(0, -196, 0, -190)]
                                    ) + a[e(0, 183, 193)],
                                    a[n(0, -209, 0, -222)]
                                  );
                                case "6":
                                  var a = {};
                                  continue;
                                case "7":
                                  a[n(0, -252, 0, -222)] = r[
                                    n(0, -149, 0, -166)
                                  ](hb, t);
                                  continue;
                                case "8":
                                  a.platform = "w";
                                  continue;
                                case "9":
                                  a[n(0, -223, 0, -234)] = lb(
                                    r[n(0, -204, 0, -242)](
                                      r[e(0, 173, 197)](
                                        r.TKyJf(
                                          r[n(0, -253, 0, -242)](
                                            r.ajXzF(
                                              a[e(0, 219, 185)],
                                              a[e(0, 182, 186)]
                                            ),
                                            a[e(0, 236, 223)]
                                          ) + a[n(0, -188, 0, -215)],
                                          a[e(0, 216, 247)]
                                        ),
                                        a.expr
                                      ),
                                      a[n(0, -212, 0, -222)]
                                    )
                                  );
                                  continue;
                              }
                              break;
                            }
                          })(this[s(124, 5, -112) + "nt"])),
                        (r = this[A(582, 633, 738) + s(-165, -162, -165)](
                          this[A(303, 446, 348) + s(-31, 46, 165)],
                          this._fingerprint,
                          c,
                          this._appId
                        )));
                    var u = {};
                    function s(t, e, n, r) {
                      return o(0, t, 0, e - -335);
                    }
                    function A(t, e, n, r) {
                      return o(0, n, 0, e - 296);
                    }
                    if (!r) {
                      if (
                        this[A(0, 493, 643)] ||
                        this[s(-73, -185) + A(0, 677, 692)]
                      ) {
                        var f = {};
                        (f.code = Lw[s(46, -69) + "IGNATURE_FAILED"]),
                          (f[A(0, 560, 494)] = e[A(0, 532, 576)]),
                          this._onSign(f);
                      } else {
                        var l = {};
                        (l.code = Lw[s(-218, -146) + "Y"]),
                          (l[s(-137, -71)] = e.mVhRl),
                          this[s(64, 61)](l);
                      }
                      return u;
                    }
                    for (
                      var h = e[A(0, 662, 796)][s(58, -17)]("|"), d = 0;
                      ;

                    ) {
                      switch (h[d++]) {
                        case "0":
                          var p = 1;
                          continue;
                        case "1":
                          var g = this[s(-142, -39)](r, t);
                          continue;
                        case "2":
                          var m = e[A(0, 696, 696)](qg, t)
                            [A(0, 637, 761)](t, function (t) {
                              return t.key;
                            })
                            [s(66, -18)](",");
                          continue;
                        case "3":
                          return u;
                        case "4":
                          var v = {};
                          (v[s(-74, -195)] = r),
                            (v[s(-97, -68)] = g),
                            (v[A(0, 541, 478)] = m),
                            (v[A(0, 705, 575)] = p),
                            (v[A(0, 665, 657)] = b),
                            Hv(
                              this._debug,
                              e[A(0, 482, 465)](
                                s(-156, -48) + s(-9, -98),
                                e.KFlyv(Jg, v, null, 2)
                              )
                            );
                          continue;
                        case "5":
                          var y = {};
                          (y[A(0, 486, 579)] = 0),
                            (y[s(-190, -71)] = e[s(-80, -93)]),
                            this[A(0, 692, 674)](y);
                          continue;
                        case "6":
                          var w = {};
                          (w._stk = m),
                            (w[s(198, 74)] = p),
                            (w.h5st = b),
                            (u = w);
                          continue;
                        case "7":
                          var b = this[s(189, 44) + "arams"](g, i, a, n);
                          continue;
                      }
                      break;
                    }
                  },
                },
                {
                  key: e[r(0, 0, 1197, 1087)],
                  value: (function () {
                    var t = {
                        hgLiC: function (t, n) {
                          return e[Eb(477, -406)](t, n);
                        },
                        WpsJe: function (t, n, r, o) {
                          return e.igXjD(t, n, r, o);
                        },
                        trhaK: function (t, n, r) {
                          return e.pKoDV(t, n, r);
                        },
                        HvNNV: e[r(-377, -457, -322)],
                        mDnxv: e[o(0, 1266, 0, 295)],
                        UmXTm: e[r(-221, -319, -240)],
                      },
                      n = pf(
                        Ag[r(-341, -445, -422)](function e() {
                          var n, o, i;
                          function a(t, e, n, o) {
                            return r(t - 542, e - 156, e);
                          }
                          return Ag[a(177, 128)](
                            function (e) {
                              function r(t, e, n, r) {
                                return a(r - -10, n);
                              }
                              function c(t, e, n, r) {
                                return a(r - -389, t);
                              }
                              for (;;)
                                switch (
                                  (e[c(16, 0, 0, 0)] = e[r(0, 0, 216, 207)])
                                ) {
                                  case 0:
                                    return (
                                      (e[c(-75, 0, 0, -172)] = 2),
                                      t[r(0, 0, 66, 144)](Sb, 1)
                                    );
                                  case 2:
                                    return (
                                      ((n = e[c(-94, 0, 0, -100)]).fp =
                                        this[c(-133, 0, 0, -72) + "nt"]),
                                      (o = t.WpsJe(Jg, n, null, 2)),
                                      t[r(0, 0, 220, 280)](
                                        Hv,
                                        this._debug,
                                        t[c(44, 0, 0, -80)][r(0, 0, 271, 276)](
                                          o
                                        )
                                      ),
                                      (i = Uw[c(-113, 0, 0, -165)](
                                        o,
                                        Ww[c(-69, 0, 0, -44)](
                                          t[r(0, 0, 290, 261)]
                                        ),
                                        {
                                          iv: Ww[c(41, 0, 0, -44)](
                                            [
                                              "01",
                                              "02",
                                              "03",
                                              "04",
                                              "05",
                                              "06",
                                              "07",
                                              "08",
                                            ][r(0, 0, 165, 284)]("")
                                          ),
                                        }
                                      )),
                                      e[c(-113, 0, 0, -213)](
                                        t.UmXTm,
                                        i[c(-396, 0, 0, -256)][
                                          r(0, 0, 11, 146)
                                        ]()
                                      )
                                    );
                                  case 8:
                                  case "end":
                                    return e.stop();
                                }
                            },
                            e,
                            this
                          );
                        })
                      );
                    function r(t, e, n, r) {
                      return o(0, n, 0, t - -565);
                    }
                    return function () {
                      var t = 1216;
                      return n[
                        (function (e, n, o, i) {
                          return r(n - t, 0, e);
                        })(920, 1016)
                      ](this, arguments);
                    };
                  })(),
                },
                {
                  key: e[o(0, 535, 0, 391)],
                  value: (function () {
                    function t(t, e, n, r) {
                      return o(0, n, 0, e - 1032);
                    }
                    var n = {
                        OWUWu: function (t) {
                          return e[Eb(284, 457)](t);
                        },
                        FdUEl: function (t, n) {
                          return e[Eb(367, 597)](t, n);
                        },
                        TQnwE: e[t(0, 1376, 1353)],
                        zmaFK: function (n, r, o) {
                          return e[t(0, 1321, 345)](n, r, o);
                        },
                        zsISI: e[a(-192, -55)],
                        BkSmI: function (t, n) {
                          return e[a(13, -27)](t, n);
                        },
                        DhqVA: function (t) {
                          return t();
                        },
                        BioBr: function (t, e, n, r) {
                          return t(e, n, r);
                        },
                        ZbwzE: e[t(0, 1342, 1313)],
                        NpZHP: e[a(6, -80)],
                        jdEjY: e[a(-214, -134)],
                      },
                      i = e[t(0, 1314, 1207)](
                        pf,
                        Ag.mark(function t(e) {
                          var r, o, i, c;
                          function u(t, e, n, r) {
                            return a(t, e - 891);
                          }
                          return Ag[u(734, 638)](
                            function (t) {
                              function a(t, e, n, r) {
                                return u(t, r - -740);
                              }
                              function s(t, e, n, r) {
                                return u(e, r - -6);
                              }
                              for (;;)
                                switch (
                                  (t[a(164, 0, 0, 110)] = t[s(0, 793, 0, 672)])
                                ) {
                                  case 0:
                                    if (
                                      ((t.prev = 0),
                                      (r = n.OWUWu(lv)),
                                      (o =
                                        this["__checkPar" + a(-26, 0, 0, -84)](
                                          e
                                        )),
                                      !n.FdUEl(o, null))
                                    ) {
                                      t[a(-24, 0, 0, -62)] = 5;
                                      break;
                                    }
                                    return t[s(0, 598, 0, 631)](
                                      n[s(0, 659, 0, 784)],
                                      e
                                    );
                                  case 5:
                                    return (
                                      (t.next = 7),
                                      this[
                                        a(-28, 0, 0, 0) + s(0, 900, 0, 821)
                                      ]()
                                    );
                                  case 7:
                                    return (
                                      (t[a(-65, 0, 0, -62)] = 9),
                                      this[s(0, 613, 0, 746)]()
                                    );
                                  case 9:
                                    return (
                                      (i = t[a(133, 0, 0, 10)]),
                                      (c = this[s(0, 642, 0, 719)](o, i)),
                                      n[s(0, 798, 0, 693)](
                                        Hv,
                                        this[s(0, 603, 0, 664)],
                                        n.zsISI.concat(
                                          n[a(-51, 0, 0, -161)](
                                            n[s(0, 512, 0, 608)](lv),
                                            r
                                          ),
                                          "ms"
                                        )
                                      ),
                                      t[s(0, 594, 0, 631)](
                                        n[s(0, 718, 0, 784)],
                                        n[a(186, 0, 0, 56)](Sg, {}, e, c)
                                      )
                                    );
                                  case 15:
                                    (t[a(1, 0, 0, 110)] = 15),
                                      (t.t0 = t[n.ZbwzE](0));
                                    var A = {};
                                    return (
                                      (A[s(0, 760, 0, 622)] =
                                        Lw["UNHANDLED_" + s(0, 520, 0, 602)]),
                                      (A[s(0, 823, 0, 696)] = n.NpZHP),
                                      this[s(0, 857, 0, 828)](A),
                                      t[a(15, 0, 0, -103)](n.TQnwE, e)
                                    );
                                  case 19:
                                  case n[a(96, 0, 0, 90)]:
                                    return t[a(-109, 0, 0, 18)]();
                                }
                            },
                            t,
                            this,
                            [[0, 15]]
                          );
                        })
                      );
                    function a(t, e, n, o) {
                      return r(0, 0, e - -1263, t);
                    }
                    return function (e) {
                      return i[
                        (function (e, n, r, o) {
                          return t(0, n - -876, o);
                        })(0, 521, 0, 619)
                      ](this, arguments);
                    };
                  })(),
                },
              ]),
              n
            );
          })(),
          kb = {};
        function Tb(t, e, n, r) {
          return Eb(r - 850, e);
        }
        (kb.debug = !1),
          (kb[Tb(0, 1408, 0, 1284)] = !1),
          (kb.timeout = 2),
          (Bb[Tb(0, 947, 0, 1072)] = kb);
        var Db = n(52153),
          Ob = n.n(Db);
        function Pb(t) {
          return (
            (Pb =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (t) {
                    return typeof t;
                  }
                : function (t) {
                    return t &&
                      "function" == typeof Symbol &&
                      t.constructor === Symbol &&
                      t !== Symbol.prototype
                      ? "symbol"
                      : typeof t;
                  }),
            Pb(t)
          );
        }
        function Mb() {
          Mb = function () {
            return e;
          };
          var t,
            e = {},
            n = Object.prototype,
            r = n.hasOwnProperty,
            o =
              Object.defineProperty ||
              function (t, e, n) {
                t[e] = n.value;
              },
            i = "function" == typeof Symbol ? Symbol : {},
            a = i.iterator || "@@iterator",
            c = i.asyncIterator || "@@asyncIterator",
            u = i.toStringTag || "@@toStringTag";
          function s(t, e, n) {
            return (
              Object.defineProperty(t, e, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              }),
              t[e]
            );
          }
          try {
            s({}, "");
          } catch (t) {
            s = function (t, e, n) {
              return (t[e] = n);
            };
          }
          function A(t, e, n, r) {
            var i = e && e.prototype instanceof m ? e : m,
              a = Object.create(i.prototype),
              c = new T(r || []);
            return o(a, "_invoke", { value: E(t, n, c) }), a;
          }
          function f(t, e, n) {
            try {
              return { type: "normal", arg: t.call(e, n) };
            } catch (t) {
              return { type: "throw", arg: t };
            }
          }
          e.wrap = A;
          var l = "suspendedStart",
            h = "suspendedYield",
            d = "executing",
            p = "completed",
            g = {};
          function m() {}
          function v() {}
          function y() {}
          var w = {};
          s(w, a, function () {
            return this;
          });
          var b = Object.getPrototypeOf,
            C = b && b(b(D([])));
          C && C !== n && r.call(C, a) && (w = C);
          var I = (y.prototype = m.prototype = Object.create(w));
          function S(t) {
            ["next", "throw", "return"].forEach(function (e) {
              s(t, e, function (t) {
                return this._invoke(e, t);
              });
            });
          }
          function x(t, e) {
            function n(o, i, a, c) {
              var u = f(t[o], t, i);
              if ("throw" !== u.type) {
                var s = u.arg,
                  A = s.value;
                return A && "object" == Pb(A) && r.call(A, "__await")
                  ? e.resolve(A.__await).then(
                      function (t) {
                        n("next", t, a, c);
                      },
                      function (t) {
                        n("throw", t, a, c);
                      }
                    )
                  : e.resolve(A).then(
                      function (t) {
                        (s.value = t), a(s);
                      },
                      function (t) {
                        return n("throw", t, a, c);
                      }
                    );
              }
              c(u.arg);
            }
            var i;
            o(this, "_invoke", {
              value: function (t, r) {
                function o() {
                  return new e(function (e, o) {
                    n(t, r, e, o);
                  });
                }
                return (i = i ? i.then(o, o) : o());
              },
            });
          }
          function E(e, n, r) {
            var o = l;
            return function (i, a) {
              if (o === d) throw Error("Generator is already running");
              if (o === p) {
                if ("throw" === i) throw a;
                return { value: t, done: !0 };
              }
              for (r.method = i, r.arg = a; ; ) {
                var c = r.delegate;
                if (c) {
                  var u = _(c, r);
                  if (u) {
                    if (u === g) continue;
                    return u;
                  }
                }
                if ("next" === r.method) r.sent = r._sent = r.arg;
                else if ("throw" === r.method) {
                  if (o === l) throw ((o = p), r.arg);
                  r.dispatchException(r.arg);
                } else "return" === r.method && r.abrupt("return", r.arg);
                o = d;
                var s = f(e, n, r);
                if ("normal" === s.type) {
                  if (((o = r.done ? p : h), s.arg === g)) continue;
                  return { value: s.arg, done: r.done };
                }
                "throw" === s.type &&
                  ((o = p), (r.method = "throw"), (r.arg = s.arg));
              }
            };
          }
          function _(e, n) {
            var r = n.method,
              o = e.iterator[r];
            if (o === t)
              return (
                (n.delegate = null),
                ("throw" === r &&
                  e.iterator.return &&
                  ((n.method = "return"),
                  (n.arg = t),
                  _(e, n),
                  "throw" === n.method)) ||
                  ("return" !== r &&
                    ((n.method = "throw"),
                    (n.arg = new TypeError(
                      "The iterator does not provide a '" + r + "' method"
                    )))),
                g
              );
            var i = f(o, e.iterator, n.arg);
            if ("throw" === i.type)
              return (
                (n.method = "throw"), (n.arg = i.arg), (n.delegate = null), g
              );
            var a = i.arg;
            return a
              ? a.done
                ? ((n[e.resultName] = a.value),
                  (n.next = e.nextLoc),
                  "return" !== n.method && ((n.method = "next"), (n.arg = t)),
                  (n.delegate = null),
                  g)
                : a
              : ((n.method = "throw"),
                (n.arg = new TypeError("iterator result is not an object")),
                (n.delegate = null),
                g);
          }
          function B(t) {
            var e = { tryLoc: t[0] };
            1 in t && (e.catchLoc = t[1]),
              2 in t && ((e.finallyLoc = t[2]), (e.afterLoc = t[3])),
              this.tryEntries.push(e);
          }
          function k(t) {
            var e = t.completion || {};
            (e.type = "normal"), delete e.arg, (t.completion = e);
          }
          function T(t) {
            (this.tryEntries = [{ tryLoc: "root" }]),
              t.forEach(B, this),
              this.reset(!0);
          }
          function D(e) {
            if (e || "" === e) {
              var n = e[a];
              if (n) return n.call(e);
              if ("function" == typeof e.next) return e;
              if (!isNaN(e.length)) {
                var o = -1,
                  i = function n() {
                    for (; ++o < e.length; )
                      if (r.call(e, o))
                        return (n.value = e[o]), (n.done = !1), n;
                    return (n.value = t), (n.done = !0), n;
                  };
                return (i.next = i);
              }
            }
            throw new TypeError(Pb(e) + " is not iterable");
          }
          return (
            (v.prototype = y),
            o(I, "constructor", { value: y, configurable: !0 }),
            o(y, "constructor", { value: v, configurable: !0 }),
            (v.displayName = s(y, u, "GeneratorFunction")),
            (e.isGeneratorFunction = function (t) {
              var e = "function" == typeof t && t.constructor;
              return (
                !!e &&
                (e === v || "GeneratorFunction" === (e.displayName || e.name))
              );
            }),
            (e.mark = function (t) {
              return (
                Object.setPrototypeOf
                  ? Object.setPrototypeOf(t, y)
                  : ((t.__proto__ = y), s(t, u, "GeneratorFunction")),
                (t.prototype = Object.create(I)),
                t
              );
            }),
            (e.awrap = function (t) {
              return { __await: t };
            }),
            S(x.prototype),
            s(x.prototype, c, function () {
              return this;
            }),
            (e.AsyncIterator = x),
            (e.async = function (t, n, r, o, i) {
              void 0 === i && (i = Promise);
              var a = new x(A(t, n, r, o), i);
              return e.isGeneratorFunction(n)
                ? a
                : a.next().then(function (t) {
                    return t.done ? t.value : a.next();
                  });
            }),
            S(I),
            s(I, u, "Generator"),
            s(I, a, function () {
              return this;
            }),
            s(I, "toString", function () {
              return "[object Generator]";
            }),
            (e.keys = function (t) {
              var e = Object(t),
                n = [];
              for (var r in e) n.push(r);
              return (
                n.reverse(),
                function t() {
                  for (; n.length; ) {
                    var r = n.pop();
                    if (r in e) return (t.value = r), (t.done = !1), t;
                  }
                  return (t.done = !0), t;
                }
              );
            }),
            (e.values = D),
            (T.prototype = {
              constructor: T,
              reset: function (e) {
                if (
                  ((this.prev = 0),
                  (this.next = 0),
                  (this.sent = this._sent = t),
                  (this.done = !1),
                  (this.delegate = null),
                  (this.method = "next"),
                  (this.arg = t),
                  this.tryEntries.forEach(k),
                  !e)
                )
                  for (var n in this)
                    "t" === n.charAt(0) &&
                      r.call(this, n) &&
                      !isNaN(+n.slice(1)) &&
                      (this[n] = t);
              },
              stop: function () {
                this.done = !0;
                var t = this.tryEntries[0].completion;
                if ("throw" === t.type) throw t.arg;
                return this.rval;
              },
              dispatchException: function (e) {
                if (this.done) throw e;
                var n = this;
                function o(r, o) {
                  return (
                    (c.type = "throw"),
                    (c.arg = e),
                    (n.next = r),
                    o && ((n.method = "next"), (n.arg = t)),
                    !!o
                  );
                }
                for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                  var a = this.tryEntries[i],
                    c = a.completion;
                  if ("root" === a.tryLoc) return o("end");
                  if (a.tryLoc <= this.prev) {
                    var u = r.call(a, "catchLoc"),
                      s = r.call(a, "finallyLoc");
                    if (u && s) {
                      if (this.prev < a.catchLoc) return o(a.catchLoc, !0);
                      if (this.prev < a.finallyLoc) return o(a.finallyLoc);
                    } else if (u) {
                      if (this.prev < a.catchLoc) return o(a.catchLoc, !0);
                    } else {
                      if (!s)
                        throw Error("try statement without catch or finally");
                      if (this.prev < a.finallyLoc) return o(a.finallyLoc);
                    }
                  }
                }
              },
              abrupt: function (t, e) {
                for (var n = this.tryEntries.length - 1; n >= 0; --n) {
                  var o = this.tryEntries[n];
                  if (
                    o.tryLoc <= this.prev &&
                    r.call(o, "finallyLoc") &&
                    this.prev < o.finallyLoc
                  ) {
                    var i = o;
                    break;
                  }
                }
                i &&
                  ("break" === t || "continue" === t) &&
                  i.tryLoc <= e &&
                  e <= i.finallyLoc &&
                  (i = null);
                var a = i ? i.completion : {};
                return (
                  (a.type = t),
                  (a.arg = e),
                  i
                    ? ((this.method = "next"), (this.next = i.finallyLoc), g)
                    : this.complete(a)
                );
              },
              complete: function (t, e) {
                if ("throw" === t.type) throw t.arg;
                return (
                  "break" === t.type || "continue" === t.type
                    ? (this.next = t.arg)
                    : "return" === t.type
                    ? ((this.rval = this.arg = t.arg),
                      (this.method = "return"),
                      (this.next = "end"))
                    : "normal" === t.type && e && (this.next = e),
                  g
                );
              },
              finish: function (t) {
                for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                  var n = this.tryEntries[e];
                  if (n.finallyLoc === t)
                    return this.complete(n.completion, n.afterLoc), k(n), g;
                }
              },
              catch: function (t) {
                for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                  var n = this.tryEntries[e];
                  if (n.tryLoc === t) {
                    var r = n.completion;
                    if ("throw" === r.type) {
                      var o = r.arg;
                      k(n);
                    }
                    return o;
                  }
                }
                throw Error("illegal catch attempt");
              },
              delegateYield: function (e, n, r) {
                return (
                  (this.delegate = {
                    iterator: D(e),
                    resultName: n,
                    nextLoc: r,
                  }),
                  "next" === this.method && (this.arg = t),
                  g
                );
              },
            }),
            e
          );
        }
        function jb(t, e) {
          return (
            (function (t) {
              if (Array.isArray(t)) return t;
            })(t) ||
            (function (t, e) {
              var n =
                null == t
                  ? null
                  : ("undefined" != typeof Symbol && t[Symbol.iterator]) ||
                    t["@@iterator"];
              if (null != n) {
                var r,
                  o,
                  i,
                  a,
                  c = [],
                  u = !0,
                  s = !1;
                try {
                  if (((i = (n = n.call(t)).next), 0 === e)) {
                    if (Object(n) !== n) return;
                    u = !1;
                  } else
                    for (
                      ;
                      !(u = (r = i.call(n)).done) &&
                      (c.push(r.value), c.length !== e);
                      u = !0
                    );
                } catch (t) {
                  (s = !0), (o = t);
                } finally {
                  try {
                    if (
                      !u &&
                      null != n.return &&
                      ((a = n.return()), Object(a) !== a)
                    )
                      return;
                  } finally {
                    if (s) throw o;
                  }
                }
                return c;
              }
            })(t, e) ||
            (function (t, e) {
              if (t) {
                if ("string" == typeof t) return Lb(t, e);
                var n = {}.toString.call(t).slice(8, -1);
                return (
                  "Object" === n && t.constructor && (n = t.constructor.name),
                  "Map" === n || "Set" === n
                    ? Array.from(t)
                    : "Arguments" === n ||
                      /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
                    ? Lb(t, e)
                    : void 0
                );
              }
            })(t, e) ||
            (function () {
              throw new TypeError(
                "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
              );
            })()
          );
        }
        function Lb(t, e) {
          (null == e || e > t.length) && (e = t.length);
          for (var n = 0, r = Array(e); n < e; n++) r[n] = t[n];
          return r;
        }
        function Nb(t, e) {
          var n = Object.keys(t);
          if (Object.getOwnPropertySymbols) {
            var r = Object.getOwnPropertySymbols(t);
            e &&
              (r = r.filter(function (e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable;
              })),
              n.push.apply(n, r);
          }
          return n;
        }
        function zb(t) {
          for (var e = 1; e < arguments.length; e++) {
            var n = null != arguments[e] ? arguments[e] : {};
            e % 2
              ? Nb(Object(n), !0).forEach(function (e) {
                  Qb(t, e, n[e]);
                })
              : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n))
              : Nb(Object(n)).forEach(function (e) {
                  Object.defineProperty(
                    t,
                    e,
                    Object.getOwnPropertyDescriptor(n, e)
                  );
                });
          }
          return t;
        }
        function Qb(t, e, n) {
          return (
            (e = (function (t) {
              var e = (function (t, e) {
                if ("object" != Pb(t) || !t) return t;
                var n = t[Symbol.toPrimitive];
                if (void 0 !== n) {
                  var r = n.call(t, e || "default");
                  if ("object" != Pb(r)) return r;
                  throw new TypeError(
                    "@@toPrimitive must return a primitive value."
                  );
                }
                return ("string" === e ? String : Number)(t);
              })(t, "string");
              return "symbol" == Pb(e) ? e : e + "";
            })(e)) in t
              ? Object.defineProperty(t, e, {
                  value: n,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (t[e] = n),
            t
          );
        }
        function Rb(t, e, n, r, o, i, a) {
          try {
            var c = t[i](a),
              u = c.value;
          } catch (t) {
            return void n(t);
          }
          c.done ? e(u) : Promise.resolve(u).then(r, o);
        }
        var Wb = (0, a.pf)(window.location.href),
          Fb = "https://api.m.jd.com/api?functionId=",
          Ub = "jdread-m",
          Kb = new Bb({
            appId: "7e98a",
            preRequest: !0,
            onSign: function (t) {
              t.code, t.message, t.data;
            },
            onRequestTokenRemotely: function (t) {
              t.code, t.message;
            },
          }),
          qb = function (t, e) {
            var n = e && 1 === Number(e.enc) ? t : Vb(t);
            return c
              .get("".concat("").concat(n), { params: e })
              .catch(function (t) {});
          },
          Gb = function (t, e) {
            var n = e && 1 === Number(e.enc) ? t : Vb(t);
            return c.post("".concat("").concat(n), e).catch(function (t) {});
          };
        function Vb(t) {
          var e = u.Z.getters.encPin;
          return 1 === Number(Wb.iframe) && e
            ? -1 === t.indexOf("?")
              ? t + "?enc_pin=" + e
              : t + "&enc_pin=" + e
            : t;
        }
        var Jb = function (t) {
            var e = "/jdread/api/download/chapter/".concat(t.ebookId);
            return delete t.ebookId, qb(e, t);
          },
          Hb = function (t) {
            return (function (t) {
              return aC.apply(this, arguments);
            })({
              funcId: "jdread_api_ebook_catalog_v2_ebookId",
              params: t,
              pathParams: { $ebookId: t.ebookId },
            });
          },
          Zb = function (t) {
            return Gb("/jdread/api/readingdata/sync", t);
          },
          Yb = function (t) {
            return Gb("/jdread/api/marker/sync", t);
          },
          Xb = function (t) {
            return Gb("/jdread/api/logs", t);
          },
          $b = function (t, e) {
            return (
              (e = [
                {
                  log_type: 2,
                  tm: Date.now(),
                  auto: 1,
                  from: 13,
                  from_id: t,
                  content: e,
                },
              ]),
              Xb(e)
            );
          },
          tC = function (t, e) {
            return (
              (e = [
                {
                  log_type: 1,
                  tm: Date.now(),
                  auto: 1,
                  from: 13,
                  from_id: t,
                  content: e,
                },
              ]),
              Xb(e)
            );
          },
          eC = function (t) {
            return Gb("/tob/api/tob/login", t);
          },
          nC = function (t) {
            return qb(
              "/jdread/api/user/info?auto="
                .concat(t.auto, "&sync=")
                .concat(t.sync)
            ).then(function (t) {
              return (
                (window.isUserLogin =
                  0 === (null == t ? void 0 : t.result_code)),
                t
              );
            });
          },
          rC = function (t) {
            var e = "/jdread/api/ebook/".concat(t[0].book_id, "/notes");
            return Gb(e, t);
          },
          oC = function (t) {
            var e = "/jdread/api/ebook/"
              .concat(t.ebook_id, "/chapter/")
              .concat(t.chapter_item_id, "/notes?sort=")
              .concat(t.sort, "&page=")
              .concat(t.page, "&page_size=")
              .concat(t.page_size, "&start_date=")
              .concat(t.start_date, "&chapter_item_id=")
              .concat(t.chapter_item_id, "&ebook_id=")
              .concat(t.ebook_id);
            return qb(e);
          },
          iC = function (t) {
            var e = "/jdread/api/channel/activity/info/?entry_type="
              .concat(t.entry_type, "&channel=")
              .concat(t.channel);
            return qb(e);
          };
        function aC() {
          return (
            (aC = (function (t) {
              return function () {
                var e = this,
                  n = arguments;
                return new Promise(function (r, o) {
                  var i = t.apply(e, n);
                  function a(t) {
                    Rb(i, r, o, a, c, "next", t);
                  }
                  function c(t) {
                    Rb(i, r, o, a, c, "throw", t);
                  }
                  a(void 0);
                });
              };
            })(
              Mb().mark(function t(e) {
                var n, r, o, a, s, A, f, l, h, d, p, g, m, v, y, w;
                return Mb().wrap(
                  function (t) {
                    for (;;)
                      switch ((t.prev = t.next)) {
                        case 0:
                          return (
                            (n = e.funcId),
                            (r = e.params),
                            (o = void 0 === r ? {} : r),
                            (a = e.isEncrypt),
                            (s = void 0 === a ? 0 : a),
                            (A = e.pathParams),
                            (f = void 0 === A ? {} : A),
                            (l = new Date().getTime()),
                            (h = { url: Fb + n, method: "POST", tm: l }),
                            (d = {}),
                            (p = u.Z.getters.encPin),
                            1 === Number(Wb.iframe) && p && (d.enc_pin = p),
                            (h.data = {
                              appid: Ub,
                              t: l,
                              client: "web",
                              clientVersion: "1.0.0",
                              body: JSON.stringify(
                                (0, i.h)({
                                  params: o,
                                  pathParams: f,
                                  publicParams: d,
                                  tm: l,
                                  isPOST: n.endsWith("_post"),
                                })
                              ),
                            }),
                            (t.next = 9),
                            Kb.sign(
                              zb(
                                zb({}, h.data),
                                {},
                                {
                                  functionId: n,
                                  body: Ob()(h.data.body).toString(),
                                }
                              )
                            ).catch(function (t) {
                              return {};
                            })
                          );
                        case 9:
                          return (
                            (g = t.sent),
                            (m = g.h5st),
                            (v = void 0 === m ? "" : m),
                            window.getJsToken &&
                              getJsToken(function (t) {
                                h.data["x-api-eid-token"] = t.jsToken;
                              }, 3e3),
                            (h.data = zb(
                              zb({}, h.data),
                              {},
                              { h5st: decodeURIComponent(v) }
                            )),
                            (y = Object.entries(h.data)
                              .map(function (t) {
                                var e = jb(t, 2),
                                  n = e[0],
                                  r = e[1];
                                return ""
                                  .concat(n, "=")
                                  .concat(encodeURIComponent(r));
                              })
                              .join("&")),
                            (t.prev = 15),
                            (t.next = 18),
                            c.post(h.url, y, {
                              headers: {
                                "content-type":
                                  "application/x-www-form-urlencoded",
                                Accept: "application/json",
                                isEncrypt: s,
                                reqTime: l,
                              },
                              timeout: 1e4,
                              withCredentials: !0,
                            })
                          );
                        case 18:
                          return (
                            (w = t.sent),
                            t.abrupt(
                              "return",
                              w || { data: { result_code: -1 } }
                            )
                          );
                        case 22:
                          return (
                            (t.prev = 22),
                            (t.t0 = t.catch(15)),
                            t.abrupt("return", {
                              data: { result_code: -1, err: t.t0 },
                            })
                          );
                        case 25:
                        case "end":
                          return t.stop();
                      }
                  },
                  t,
                  null,
                  [[15, 22]]
                );
              })
            )),
            aC.apply(this, arguments)
          );
        }
      },
      78366: function (t, e, n) {
        "use strict";
        n.d(e, {
          MR: function () {
            return r;
          },
          Tm: function () {
            return o;
          },
        });
        var r = 0,
          o = 3;
      },
      61294: function (t, e, n) {
        "use strict";
        n(59749),
          n(86544),
          n(58373),
          n(96157),
          n(82529),
          n(84254),
          n(64155),
          n(95906),
          n(50549),
          n(96285),
          n(18200),
          n(69373),
          n(66793),
          n(44578),
          n(34338),
          n(2966),
          n(55791),
          n(97895),
          n(38077),
          n(25728),
          n(39772),
          n(62795),
          n(54564),
          n(49693),
          n(77049),
          n(76801),
          n(97195),
          n(752),
          n(6203),
          n(72410),
          n(50886),
          n(37593),
          n(278),
          n(81386),
          n(93374),
          n(89730),
          n(98742),
          n(65137),
          n(21932),
          n(62506),
          n(13383),
          n(90385),
          n(69365),
          n(33870),
          n(99211),
          n(18201),
          n(65007),
          n(78150),
          n(59903),
          n(56269),
          n(34284),
          n(7629),
          n(56646),
          n(6557),
          n(62428),
          n(45263),
          n(74712),
          n(54986),
          n(47221),
          n(94992),
          n(25499),
          n(59944),
          n(78527),
          n(75239),
          n(92076),
          n(68813),
          n(96976),
          n(62700),
          n(91554),
          n(77509),
          n(21416),
          n(79288),
          n(53584),
          n(82243),
          n(95765),
          n(45993),
          n(92547),
          n(7936),
          n(32704),
          n(52362),
          n(21552),
          n(97389),
          n(25284),
          n(60429),
          n(33994),
          n(35082),
          n(40739),
          n(47409),
          n(36585),
          n(41830),
          n(85415),
          n(81919),
          n(99474),
          n(79997),
          n(88052),
          n(76101),
          n(36446),
          n(35140),
          n(4179),
          n(69358),
          n(75450),
          n(54993),
          n(48115),
          n(30658),
          n(5399),
          n(60228),
          n(86466),
          n(80939),
          n(32320),
          n(73964),
          n(36409),
          n(54333),
          n(30050),
          n(99871),
          n(1049),
          n(32349),
          n(50149),
          n(43792),
          n(69707),
          n(63545),
          n(62087),
          n(51505),
          n(45247),
          n(22373),
          n(52003),
          n(64043),
          n(25847),
          n(12826),
          n(19649),
          n(86239),
          n(2918),
          n(20283),
          n(43843),
          n(21694),
          n(22462),
          n(72940),
          n(8472),
          n(92404),
          n(59588),
          n(57267),
          n(61514),
          n(9873),
          n(268),
          n(28436),
          n(16386),
          n(3255),
          n(90343),
          n(21444),
          n(25906),
          n(95682),
          n(98041),
          n(6364),
          n(82954),
          n(19162),
          n(37960),
          n(470),
          n(67446),
          n(47729),
          n(2e3),
          n(29068),
          n(70292),
          n(55304),
          n(89988),
          n(854),
          n(28607),
          n(30938),
          n(75679),
          n(18557),
          n(36664),
          n(55980),
          n(79943),
          n(96089),
          n(18539),
          n(48690),
          n(45385),
          n(59495),
          n(85552),
          n(31803),
          n(91565),
          n(67987),
          n(49365),
          n(80677),
          n(19038),
          n(18118),
          n(41165),
          n(71522),
          n(79976),
          n(4797),
          n(7300),
          n(93356),
          n(62533),
          n(99724),
          n(99901),
          n(51090),
          n(50414),
          n(47522),
          n(76265),
          n(40088),
          n(10455),
          n(78730),
          n(19979),
          n(79307),
          n(35666);
        var r = n(70538),
          o = function () {
            var t = this,
              e = t.$createElement,
              r = t._self._c || e;
            return r(
              "div",
              {
                staticClass: "reader-app",
                style: { "background-color": t.bgColor + "!important" },
                attrs: { id: "app" },
              },
              [
                t.normalBrowsers
                  ? [
                      t.ebookId && t.isIdValid
                        ? r("router-view", {
                            key: t.$route.fullPath,
                            attrs: { "normal-browsers": t.normalBrowsers },
                          })
                        : r("div", { staticClass: "empty-text" }, [
                            t._v("没有找到该书籍"),
                          ]),
                      t.exception && t.ebookId && t.isIdValid
                        ? r("exception", { attrs: { exception: t.exception } })
                        : t._e(),
                      t.isFirstLoad
                        ? r(
                            "div",
                            {
                              staticClass: "freshGuide",
                              on: { click: t.hideFreshGuide },
                            },
                            [r("img", { attrs: { src: n(84785) } })]
                          )
                        : t._e(),
                    ]
                  : [t._m(0)],
              ],
              2
            );
          },
          i = [
            function () {
              var t = this,
                e = t.$createElement,
                r = t._self._c || e;
              return r("div", { attrs: { id: "err" } }, [
                r("div", { staticClass: "content" }, [
                  r("div", { staticClass: "top" }, [
                    r("img", { attrs: { src: n(71413) } }),
                    r("span", [t._v("兼容提示")]),
                  ]),
                  r("p", [
                    t._v(
                      "\n          您正在使用的浏览器版本过低，将不能正常浏览和使用京东读书。请升级至\n          "
                    ),
                    r("span", [t._v("IE10版本以上")]),
                    t._v("或使用最新版的 "),
                    r("span", [t._v("Chrome")]),
                    t._v("浏览器、\n          "),
                    r("span", [t._v("QQ")]),
                    t._v("浏览器后再次访问。\n        "),
                  ]),
                ]),
              ]);
            },
          ];
        o._withStripped = !0;
        var a = n(20629),
          c = n(58515),
          u = [
            {
              name: "default",
              bgColor: "#F8F8F8",
              contentBgColor: "#FFFFFF",
              color: "#1E1E1E",
              selectedBorderColor: "#FF4854",
              btnBgColor: "#F5F5F5",
              ttsHighlightColor: "rgba(32,120,251,0.25)",
            },
            {
              name: "light",
              bgColor: "#EEE5D3",
              contentBgColor: "#F4ECDA",
              color: "#1E1E1E",
              selectedBorderColor: "#DD7F0F",
              btnBgColor: "#F2E5D1",
              ttsHighlightColor: "rgba(120,14,9,0.25)",
            },
            {
              name: "green",
              bgColor: "#C3E0C5",
              contentBgColor: "#CCE7CE",
              color: "#1E1E1E",
              selectedBorderColor: "#2C7C28",
              btnBgColor: "#BFDFC1",
              ttsHighlightColor: "rgba(0,113,3,0.25)",
            },
            {
              name: "night",
              bgColor: "#0B0B0B",
              contentBgColor: "#171717",
              color: "#C2C2C2",
              selectedBorderColor: "#C94A53",
              btnBgColor: "#292929",
              ttsHighlightColor: "rgba(32,120,251,0.25)",
            },
          ],
          s = function () {
            var t = this,
              e = t.$createElement,
              n = t._self._c || e;
            return n(
              "div",
              {
                staticClass: "exception-box",
                on: {
                  click: function (e) {
                    return (
                      e.stopPropagation(),
                      e.preventDefault(),
                      t.reload.apply(null, arguments)
                    );
                  },
                },
              },
              [
                n("div", { staticClass: "exception-default-img" }),
                n("div", { staticClass: "exception-tips-text" }, [
                  t._v("\n    " + t._s(t.buildErrorMsg()) + "\n  "),
                ]),
              ]
            );
          };
        function A(t) {
          return (
            (A =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (t) {
                    return typeof t;
                  }
                : function (t) {
                    return t &&
                      "function" == typeof Symbol &&
                      t.constructor === Symbol &&
                      t !== Symbol.prototype
                      ? "symbol"
                      : typeof t;
                  }),
            A(t)
          );
        }
        function f(t, e) {
          var n = Object.keys(t);
          if (Object.getOwnPropertySymbols) {
            var r = Object.getOwnPropertySymbols(t);
            e &&
              (r = r.filter(function (e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable;
              })),
              n.push.apply(n, r);
          }
          return n;
        }
        function l(t) {
          for (var e = 1; e < arguments.length; e++) {
            var n = null != arguments[e] ? arguments[e] : {};
            e % 2
              ? f(Object(n), !0).forEach(function (e) {
                  h(t, e, n[e]);
                })
              : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n))
              : f(Object(n)).forEach(function (e) {
                  Object.defineProperty(
                    t,
                    e,
                    Object.getOwnPropertyDescriptor(n, e)
                  );
                });
          }
          return t;
        }
        function h(t, e, n) {
          return (
            (e = (function (t) {
              var e = (function (t, e) {
                if ("object" != A(t) || !t) return t;
                var n = t[Symbol.toPrimitive];
                if (void 0 !== n) {
                  var r = n.call(t, e || "default");
                  if ("object" != A(r)) return r;
                  throw new TypeError(
                    "@@toPrimitive must return a primitive value."
                  );
                }
                return ("string" === e ? String : Number)(t);
              })(t, "string");
              return "symbol" == A(e) ? e : e + "";
            })(e)) in t
              ? Object.defineProperty(t, e, {
                  value: n,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (t[e] = n),
            t
          );
        }
        s._withStripped = !0;
        var d = {
            name: "Exception",
            props: {
              exception: {
                type: Number,
                default: function () {
                  return 0;
                },
              },
            },
            computed: l(
              {},
              (0, a.Se)({ ebookId: "ebookId", from: "from", theme: "theme" })
            ),
            mounted: function () {
              this.$loading(!1, this.theme);
            },
            methods: l(
              l({}, (0, a.OI)({ setException: "SET_EXCEPTION" })),
              {},
              {
                buildErrorMsg: function () {
                  return 2 == this.exception
                    ? "内容加载失败，请稍后重试"
                    : 3 == this.exception
                    ? "此书暂不支持阅读，请联系客服"
                    : "加载失败，点击重新加载";
                },
                reload: function () {
                  if (2 !== this.exception) {
                    this.setException(0);
                    var t = window.location,
                      e = t.protocol,
                      n = t.host,
                      r = t.pathname,
                      o = (0, c.cF)("cur_chapter_".concat(this.ebookId)),
                      i = ""
                        .concat(e, "//")
                        .concat(n)
                        .concat(r, "?ebookId=")
                        .concat(this.ebookId, "&index=")
                        .concat(o.index)
                        .concat(this.from ? "&from=" + this.from : "");
                    window.location.href = i;
                  }
                },
              }
            ),
          },
          p = n(93379),
          g = n.n(p),
          m = n(7795),
          v = n.n(m),
          y = n(90569),
          w = n.n(y),
          b = n(3565),
          C = n.n(b),
          I = n(19216),
          S = n.n(I),
          x = n(44589),
          E = n.n(x),
          _ = n(15068),
          B = n.n(_),
          k = {};
        (k.styleTagTransform = E()),
          (k.setAttributes = C()),
          (k.insert = w().bind(null, "head")),
          (k.domAPI = v()),
          (k.insertStyleElement = S());
        g()(B(), k), B() && B().locals && B().locals;
        function T(t, e, n, r, o, i, a, c) {
          var u,
            s = "function" == typeof t ? t.options : t;
          if (
            (e && ((s.render = e), (s.staticRenderFns = n), (s._compiled = !0)),
            r && (s.functional = !0),
            i && (s._scopeId = "data-v-" + i),
            a
              ? ((u = function (t) {
                  (t =
                    t ||
                    (this.$vnode && this.$vnode.ssrContext) ||
                    (this.parent &&
                      this.parent.$vnode &&
                      this.parent.$vnode.ssrContext)) ||
                    "undefined" == typeof __VUE_SSR_CONTEXT__ ||
                    (t = __VUE_SSR_CONTEXT__),
                    o && o.call(this, t),
                    t &&
                      t._registeredComponents &&
                      t._registeredComponents.add(a);
                }),
                (s._ssrRegister = u))
              : o &&
                (u = c
                  ? function () {
                      o.call(
                        this,
                        (s.functional ? this.parent : this).$root.$options
                          .shadowRoot
                      );
                    }
                  : o),
            u)
          )
            if (s.functional) {
              s._injectStyles = u;
              var A = s.render;
              s.render = function (t, e) {
                return u.call(e), A(t, e);
              };
            } else {
              var f = s.beforeCreate;
              s.beforeCreate = f ? [].concat(f, u) : [u];
            }
          return { exports: t, options: s };
        }
        var D = T(d, s, [], !1, null, null, null).exports,
          O = n(36808),
          P = n.n(O),
          M = n(31018),
          j = n(6273),
          L = n(90146),
          N = n.n(L),
          z = {};
        (z.styleTagTransform = E()),
          (z.setAttributes = C()),
          (z.insert = w().bind(null, "head")),
          (z.domAPI = v()),
          (z.insertStyleElement = S());
        g()(N(), z), N() && N().locals && N().locals;
        function Q(t) {
          return (
            (Q =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (t) {
                    return typeof t;
                  }
                : function (t) {
                    return t &&
                      "function" == typeof Symbol &&
                      t.constructor === Symbol &&
                      t !== Symbol.prototype
                      ? "symbol"
                      : typeof t;
                  }),
            Q(t)
          );
        }
        function R(t, e) {
          var n = Object.keys(t);
          if (Object.getOwnPropertySymbols) {
            var r = Object.getOwnPropertySymbols(t);
            e &&
              (r = r.filter(function (e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable;
              })),
              n.push.apply(n, r);
          }
          return n;
        }
        function W(t) {
          for (var e = 1; e < arguments.length; e++) {
            var n = null != arguments[e] ? arguments[e] : {};
            e % 2
              ? R(Object(n), !0).forEach(function (e) {
                  F(t, e, n[e]);
                })
              : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n))
              : R(Object(n)).forEach(function (e) {
                  Object.defineProperty(
                    t,
                    e,
                    Object.getOwnPropertyDescriptor(n, e)
                  );
                });
          }
          return t;
        }
        function F(t, e, n) {
          return (
            (e = (function (t) {
              var e = (function (t, e) {
                if ("object" != Q(t) || !t) return t;
                var n = t[Symbol.toPrimitive];
                if (void 0 !== n) {
                  var r = n.call(t, e || "default");
                  if ("object" != Q(r)) return r;
                  throw new TypeError(
                    "@@toPrimitive must return a primitive value."
                  );
                }
                return ("string" === e ? String : Number)(t);
              })(t, "string");
              return "symbol" == Q(e) ? e : e + "";
            })(e)) in t
              ? Object.defineProperty(t, e, {
                  value: n,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (t[e] = n),
            t
          );
        }
        var U = {
            name: "Reader",
            data: function () {
              return {
                env: "",
                isFirstLoad: !1,
                bgColor: "",
                themeData: u,
                normalBrowsers: !0,
              };
            },
            computed: W(
              W(
                {},
                (0, a.Se)({
                  ebookId: "ebookId",
                  from: "from",
                  theme: "theme",
                  exception: "exception",
                  format: "format",
                  pageMaxWidth: "pageMaxWidth",
                  currentWinWidth: "currentWinWidth",
                })
              ),
              {},
              {
                isIdValid: function () {
                  return (
                    Number(this.ebookId) >= 3e7 && Number(this.ebookId) < 4e7
                  );
                },
              }
            ),
            components: { Exception: D },
            watch: {
              theme: function (t, e) {
                t !== e &&
                  ((this.bgColor = this.themeData.find(function (e) {
                    return e.name === t;
                  }).bgColor),
                  (document.documentElement.style.background = this.bgColor),
                  (document.body.style.background = this.bgColor));
              },
            },
            created: function () {
              var t = this,
                e = (0, M.ld)();
              e && -1 !== e
                ? document.documentElement.classList.add(e)
                : (e && -1 === e) || (this.normalBrowsers = !1);
              var n = this.$route.query,
                r = n.ebookId,
                o = n.return_url,
                i = n.pt_key,
                a = n.team_id,
                u = void 0 === a ? "" : a;
              this.setEbookId(r),
                i &&
                  !P().get("pt_key") &&
                  P().set("pt_key", i, { path: "/", expires: 1 }),
                o && window.sessionStorage.setItem("loginUrl_".concat(u), o),
                (this.bgColor = this.themeData.find(function (e) {
                  return e.name === t.theme;
                }).bgColor),
                (document.documentElement.style.background = this.bgColor),
                (document.body.style.background = this.bgColor);
              var s = new Date().getTime(),
                A = /^readingData-[1-9]\d{7}-\d+$/;
              for (var f in window.localStorage)
                if (f.indexOf("chapter") > -1 || A.test(f)) {
                  var l = (0, c.cF)(f);
                  l && l.expireTime <= s && (0, c.L_)(f);
                }
              "true" !== localStorage.getItem("isFirstLoad") &&
                ((this.isFirstLoad = !0),
                localStorage.setItem("isFirstLoad", "true"));
            },
            mounted: function () {
              document.removeEventListener(
                "visibilitychange",
                window.visibilitychangeFn
              ),
                document.addEventListener(
                  "visibilitychange",
                  window.visibilitychangeFn
                );
              var t = this;
              !(function (e, n, r) {
                r = r || window;
                var o = !1;
                r.addEventListener(e, function () {
                  o ||
                    ((o = !0),
                    t.$nextTick(function () {
                      r.dispatchEvent(new CustomEvent(n)), (o = !1);
                    }));
                });
              })("resize", "optimizedResize"),
                window.addEventListener(
                  "optimizedResize",
                  function () {
                    var t = window.innerWidth < 1e3 ? 768 : 1e3;
                    t !== this.pageMaxWidth &&
                      (this.setPageMaxWidth(t), window.location.reload()),
                      this.currentWinWidth !== window.innerWidth &&
                        this.setWinWidth(window.innerWidth);
                  }.bind(this)
                );
              var e = this.$route.query,
                n = e.ebookId,
                r = e.source,
                o = [
                  {
                    click_type: 1,
                    res_id: n,
                    res_name: "阅读书籍打开-".concat(r || "jd"),
                  },
                ];
              (0, j.qF)(n, o),
                1 == this.$route.query.vconsoleEruda && this.vconsoleEruda();
            },
            methods: W(
              W(
                {},
                (0, a.OI)({
                  setEbookId: "SET_EBOOK_ID",
                  setPageMaxWidth: "SET_PAGE_MAX_WIDTH",
                  setWinWidth: "SET_WIN_WIDTH",
                })
              ),
              {},
              {
                hideFreshGuide: function () {
                  this.isFirstLoad = !1;
                },
                vconsoleEruda: function () {
                  var t = document.createElement("script");
                  (t.src = "https://cdn.jsdelivr.net/npm/eruda"),
                    document.body.append(t),
                    (t.onload = function () {
                      eruda.init();
                    });
                },
              }
            ),
          },
          K = U,
          q = n(21090),
          G = n.n(q),
          V = {};
        (V.styleTagTransform = E()),
          (V.setAttributes = C()),
          (V.insert = w().bind(null, "head")),
          (V.domAPI = v()),
          (V.insertStyleElement = S());
        g()(G(), V), G() && G().locals && G().locals;
        var J = T(K, o, i, !1, null, null, null).exports,
          H = n(78345),
          Z = function () {
            var t = this,
              e = t.$createElement,
              r = t._self._c || e;
            return r(
              "div",
              {
                staticClass: "Reader-wrap",
                class: { "Reader-wrap-touch": t.isTouchDevice },
                on: {
                  click: function (e) {
                    return (
                      e.stopPropagation(), t.hideToolsFn.apply(null, arguments)
                    );
                  },
                  mouseup: t.handleMouseSelect,
                  touchstart: t.touchstart,
                  touchmove: t.touchmove,
                  touchend: t.touchend,
                },
              },
              [
                r(t.readComponent, {
                  ref: "readerContent",
                  tag: "component",
                  attrs: {
                    "chapter-content": t.chapterArr,
                    "ebook-id": t.ebookId,
                    "cur-chapter-index": t.curChapterIndex,
                    catalogData: t.catalogArr,
                    "anchor-position": t.anchorPosition,
                    "to-ahor-once": t.toAhorOnce,
                    "font-size": t.displayFontSize,
                    theme: t.displayTheme,
                    "is-free-read-end": t.isFreeReadEnd,
                    "content-bg-color": t.contentBgColor,
                    notesLineData: t.notesLineData,
                    notesData: t.notesData,
                    notePosition: t.notePosition,
                  },
                  on: {
                    changeChapter: t.changeChapter,
                    showCtrlLayer: t.showCtrlLayer,
                    fontSizeChange: t.updateCurChapter,
                    noteFoo: t.noteFoo,
                    hx: t.showReaderFo,
                    changePage: t.horizonChangePage,
                    contentChanged: t.contentChanged,
                  },
                }),
                r("read-footer", {
                  attrs: { "is-ctrl-layer-show": t.isCtrlLayerShow },
                  on: {
                    showCatalog: t.showCatalog,
                    showCatalogx: t.showCatalogx,
                    ttsAction: t.ttsAction,
                    changeTheme: t.changeTheme,
                  },
                }),
                r("catalog", {
                  ref: "catalog",
                  attrs: {
                    "is-catalog-show": t.isCatalogShow,
                    catalogData: t.catalogArr,
                    "theme-data": t.displayTheme,
                    bookInfo: t.bookInfo,
                  },
                  on: { hideCatalog: t.hideCatalog, hidePop: t.hidePop },
                }),
                r("catalogx", {
                  ref: "noteList",
                  attrs: {
                    "is-catalog-show": t.isNoteListShow,
                    catalogData: t.notesData,
                    ml: t.catalogArr,
                    "theme-data": t.displayTheme,
                  },
                  on: { hideCatalog: t.hideCatalog, hidePop: t.hidePop },
                }),
                r("side-tools", {
                  ref: "sideTools",
                  attrs: {
                    theme: t.displayTheme,
                    "content-bg-color": t.contentBgColor,
                    "hide-tools": t.hideTools,
                  },
                  on: {
                    updateData: t.gx,
                    showCatalog: t.showCatalog,
                    showCatalogx: t.showCatalogx,
                    ttsAction: t.ttsAction,
                    changeTheme: t.changeTheme,
                  },
                }),
                t.isShowJdGuide
                  ? r("div", { staticClass: "read-guide-jd-layout" }, [
                      r("div", { staticClass: "read-guide-jd" }, [
                        r("img", {
                          directives: [
                            {
                              name: "show",
                              rawName: "v-show",
                              value: 0 == t.jdGuideInfo.show_close,
                              expression: "jdGuideInfo.show_close == 0",
                            },
                          ],
                          staticClass: "guide-close",
                          attrs: { src: n(44104) },
                          on: {
                            click: function (e) {
                              return t.guideJdClose();
                            },
                          },
                        }),
                        r("img", {
                          staticClass: "guide-icon",
                          attrs: { src: t.jdGuideInfo.image },
                          on: {
                            click: function (e) {
                              return t.guideJdClick();
                            },
                          },
                        }),
                      ]),
                    ])
                  : t._e(),
                t.isShowBottomGudie
                  ? r("div", { staticClass: "read-guide-bottom-layout" }, [
                      r("div", { staticClass: "read-guide-bottom" }, [
                        r("img", {
                          staticClass: "guide-icon",
                          attrs: { src: n(96311) },
                        }),
                        r("div", { staticClass: "guide-text" }, [
                          t._v("下次可通过【京东首页搜索免费看小说】回来"),
                        ]),
                        r("img", {
                          staticClass: "guide-close",
                          attrs: { src: n(44765) },
                          on: {
                            click: function (e) {
                              return t.guideButtomClose();
                            },
                          },
                        }),
                      ]),
                    ])
                  : t._e(),
                t.jdGuideInfo.link
                  ? r(
                      "div",
                      {
                        directives: [
                          {
                            name: "show",
                            rawName: "v-show",
                            value: t.showiframe,
                            expression: "showiframe",
                          },
                        ],
                        staticClass: "read-activity-dialog-layout",
                      },
                      [
                        r("div", { staticClass: "dialog-content" }, [
                          r("iframe", {
                            ref: "iframeView",
                            attrs: {
                              width: "100%",
                              height: "100%",
                              frameborder: "0",
                              allowtransparency: "true",
                              src: t.iframeUrl,
                            },
                          }),
                        ]),
                        r("img", {
                          staticClass: "dialog-close",
                          attrs: { src: n(62030) },
                          on: {
                            click: function (e) {
                              return t.iframeClose();
                            },
                          },
                        }),
                      ]
                    )
                  : t._e(),
              ],
              1
            );
          };
        Z._withStripped = !0;
        var Y = n(16816),
          X = n(79947);
        function $(t) {
          return (
            ($ =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (t) {
                    return typeof t;
                  }
                : function (t) {
                    return t &&
                      "function" == typeof Symbol &&
                      t.constructor === Symbol &&
                      t !== Symbol.prototype
                      ? "symbol"
                      : typeof t;
                  }),
            $(t)
          );
        }
        function tt() {
          tt = function () {
            return e;
          };
          var t,
            e = {},
            n = Object.prototype,
            r = n.hasOwnProperty,
            o =
              Object.defineProperty ||
              function (t, e, n) {
                t[e] = n.value;
              },
            i = "function" == typeof Symbol ? Symbol : {},
            a = i.iterator || "@@iterator",
            c = i.asyncIterator || "@@asyncIterator",
            u = i.toStringTag || "@@toStringTag";
          function s(t, e, n) {
            return (
              Object.defineProperty(t, e, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              }),
              t[e]
            );
          }
          try {
            s({}, "");
          } catch (t) {
            s = function (t, e, n) {
              return (t[e] = n);
            };
          }
          function A(t, e, n, r) {
            var i = e && e.prototype instanceof m ? e : m,
              a = Object.create(i.prototype),
              c = new T(r || []);
            return o(a, "_invoke", { value: E(t, n, c) }), a;
          }
          function f(t, e, n) {
            try {
              return { type: "normal", arg: t.call(e, n) };
            } catch (t) {
              return { type: "throw", arg: t };
            }
          }
          e.wrap = A;
          var l = "suspendedStart",
            h = "suspendedYield",
            d = "executing",
            p = "completed",
            g = {};
          function m() {}
          function v() {}
          function y() {}
          var w = {};
          s(w, a, function () {
            return this;
          });
          var b = Object.getPrototypeOf,
            C = b && b(b(D([])));
          C && C !== n && r.call(C, a) && (w = C);
          var I = (y.prototype = m.prototype = Object.create(w));
          function S(t) {
            ["next", "throw", "return"].forEach(function (e) {
              s(t, e, function (t) {
                return this._invoke(e, t);
              });
            });
          }
          function x(t, e) {
            function n(o, i, a, c) {
              var u = f(t[o], t, i);
              if ("throw" !== u.type) {
                var s = u.arg,
                  A = s.value;
                return A && "object" == $(A) && r.call(A, "__await")
                  ? e.resolve(A.__await).then(
                      function (t) {
                        n("next", t, a, c);
                      },
                      function (t) {
                        n("throw", t, a, c);
                      }
                    )
                  : e.resolve(A).then(
                      function (t) {
                        (s.value = t), a(s);
                      },
                      function (t) {
                        return n("throw", t, a, c);
                      }
                    );
              }
              c(u.arg);
            }
            var i;
            o(this, "_invoke", {
              value: function (t, r) {
                function o() {
                  return new e(function (e, o) {
                    n(t, r, e, o);
                  });
                }
                return (i = i ? i.then(o, o) : o());
              },
            });
          }
          function E(e, n, r) {
            var o = l;
            return function (i, a) {
              if (o === d) throw Error("Generator is already running");
              if (o === p) {
                if ("throw" === i) throw a;
                return { value: t, done: !0 };
              }
              for (r.method = i, r.arg = a; ; ) {
                var c = r.delegate;
                if (c) {
                  var u = _(c, r);
                  if (u) {
                    if (u === g) continue;
                    return u;
                  }
                }
                if ("next" === r.method) r.sent = r._sent = r.arg;
                else if ("throw" === r.method) {
                  if (o === l) throw ((o = p), r.arg);
                  r.dispatchException(r.arg);
                } else "return" === r.method && r.abrupt("return", r.arg);
                o = d;
                var s = f(e, n, r);
                if ("normal" === s.type) {
                  if (((o = r.done ? p : h), s.arg === g)) continue;
                  return { value: s.arg, done: r.done };
                }
                "throw" === s.type &&
                  ((o = p), (r.method = "throw"), (r.arg = s.arg));
              }
            };
          }
          function _(e, n) {
            var r = n.method,
              o = e.iterator[r];
            if (o === t)
              return (
                (n.delegate = null),
                ("throw" === r &&
                  e.iterator.return &&
                  ((n.method = "return"),
                  (n.arg = t),
                  _(e, n),
                  "throw" === n.method)) ||
                  ("return" !== r &&
                    ((n.method = "throw"),
                    (n.arg = new TypeError(
                      "The iterator does not provide a '" + r + "' method"
                    )))),
                g
              );
            var i = f(o, e.iterator, n.arg);
            if ("throw" === i.type)
              return (
                (n.method = "throw"), (n.arg = i.arg), (n.delegate = null), g
              );
            var a = i.arg;
            return a
              ? a.done
                ? ((n[e.resultName] = a.value),
                  (n.next = e.nextLoc),
                  "return" !== n.method && ((n.method = "next"), (n.arg = t)),
                  (n.delegate = null),
                  g)
                : a
              : ((n.method = "throw"),
                (n.arg = new TypeError("iterator result is not an object")),
                (n.delegate = null),
                g);
          }
          function B(t) {
            var e = { tryLoc: t[0] };
            1 in t && (e.catchLoc = t[1]),
              2 in t && ((e.finallyLoc = t[2]), (e.afterLoc = t[3])),
              this.tryEntries.push(e);
          }
          function k(t) {
            var e = t.completion || {};
            (e.type = "normal"), delete e.arg, (t.completion = e);
          }
          function T(t) {
            (this.tryEntries = [{ tryLoc: "root" }]),
              t.forEach(B, this),
              this.reset(!0);
          }
          function D(e) {
            if (e || "" === e) {
              var n = e[a];
              if (n) return n.call(e);
              if ("function" == typeof e.next) return e;
              if (!isNaN(e.length)) {
                var o = -1,
                  i = function n() {
                    for (; ++o < e.length; )
                      if (r.call(e, o))
                        return (n.value = e[o]), (n.done = !1), n;
                    return (n.value = t), (n.done = !0), n;
                  };
                return (i.next = i);
              }
            }
            throw new TypeError($(e) + " is not iterable");
          }
          return (
            (v.prototype = y),
            o(I, "constructor", { value: y, configurable: !0 }),
            o(y, "constructor", { value: v, configurable: !0 }),
            (v.displayName = s(y, u, "GeneratorFunction")),
            (e.isGeneratorFunction = function (t) {
              var e = "function" == typeof t && t.constructor;
              return (
                !!e &&
                (e === v || "GeneratorFunction" === (e.displayName || e.name))
              );
            }),
            (e.mark = function (t) {
              return (
                Object.setPrototypeOf
                  ? Object.setPrototypeOf(t, y)
                  : ((t.__proto__ = y), s(t, u, "GeneratorFunction")),
                (t.prototype = Object.create(I)),
                t
              );
            }),
            (e.awrap = function (t) {
              return { __await: t };
            }),
            S(x.prototype),
            s(x.prototype, c, function () {
              return this;
            }),
            (e.AsyncIterator = x),
            (e.async = function (t, n, r, o, i) {
              void 0 === i && (i = Promise);
              var a = new x(A(t, n, r, o), i);
              return e.isGeneratorFunction(n)
                ? a
                : a.next().then(function (t) {
                    return t.done ? t.value : a.next();
                  });
            }),
            S(I),
            s(I, u, "Generator"),
            s(I, a, function () {
              return this;
            }),
            s(I, "toString", function () {
              return "[object Generator]";
            }),
            (e.keys = function (t) {
              var e = Object(t),
                n = [];
              for (var r in e) n.push(r);
              return (
                n.reverse(),
                function t() {
                  for (; n.length; ) {
                    var r = n.pop();
                    if (r in e) return (t.value = r), (t.done = !1), t;
                  }
                  return (t.done = !0), t;
                }
              );
            }),
            (e.values = D),
            (T.prototype = {
              constructor: T,
              reset: function (e) {
                if (
                  ((this.prev = 0),
                  (this.next = 0),
                  (this.sent = this._sent = t),
                  (this.done = !1),
                  (this.delegate = null),
                  (this.method = "next"),
                  (this.arg = t),
                  this.tryEntries.forEach(k),
                  !e)
                )
                  for (var n in this)
                    "t" === n.charAt(0) &&
                      r.call(this, n) &&
                      !isNaN(+n.slice(1)) &&
                      (this[n] = t);
              },
              stop: function () {
                this.done = !0;
                var t = this.tryEntries[0].completion;
                if ("throw" === t.type) throw t.arg;
                return this.rval;
              },
              dispatchException: function (e) {
                if (this.done) throw e;
                var n = this;
                function o(r, o) {
                  return (
                    (c.type = "throw"),
                    (c.arg = e),
                    (n.next = r),
                    o && ((n.method = "next"), (n.arg = t)),
                    !!o
                  );
                }
                for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                  var a = this.tryEntries[i],
                    c = a.completion;
                  if ("root" === a.tryLoc) return o("end");
                  if (a.tryLoc <= this.prev) {
                    var u = r.call(a, "catchLoc"),
                      s = r.call(a, "finallyLoc");
                    if (u && s) {
                      if (this.prev < a.catchLoc) return o(a.catchLoc, !0);
                      if (this.prev < a.finallyLoc) return o(a.finallyLoc);
                    } else if (u) {
                      if (this.prev < a.catchLoc) return o(a.catchLoc, !0);
                    } else {
                      if (!s)
                        throw Error("try statement without catch or finally");
                      if (this.prev < a.finallyLoc) return o(a.finallyLoc);
                    }
                  }
                }
              },
              abrupt: function (t, e) {
                for (var n = this.tryEntries.length - 1; n >= 0; --n) {
                  var o = this.tryEntries[n];
                  if (
                    o.tryLoc <= this.prev &&
                    r.call(o, "finallyLoc") &&
                    this.prev < o.finallyLoc
                  ) {
                    var i = o;
                    break;
                  }
                }
                i &&
                  ("break" === t || "continue" === t) &&
                  i.tryLoc <= e &&
                  e <= i.finallyLoc &&
                  (i = null);
                var a = i ? i.completion : {};
                return (
                  (a.type = t),
                  (a.arg = e),
                  i
                    ? ((this.method = "next"), (this.next = i.finallyLoc), g)
                    : this.complete(a)
                );
              },
              complete: function (t, e) {
                if ("throw" === t.type) throw t.arg;
                return (
                  "break" === t.type || "continue" === t.type
                    ? (this.next = t.arg)
                    : "return" === t.type
                    ? ((this.rval = this.arg = t.arg),
                      (this.method = "return"),
                      (this.next = "end"))
                    : "normal" === t.type && e && (this.next = e),
                  g
                );
              },
              finish: function (t) {
                for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                  var n = this.tryEntries[e];
                  if (n.finallyLoc === t)
                    return this.complete(n.completion, n.afterLoc), k(n), g;
                }
              },
              catch: function (t) {
                for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                  var n = this.tryEntries[e];
                  if (n.tryLoc === t) {
                    var r = n.completion;
                    if ("throw" === r.type) {
                      var o = r.arg;
                      k(n);
                    }
                    return o;
                  }
                }
                throw Error("illegal catch attempt");
              },
              delegateYield: function (e, n, r) {
                return (
                  (this.delegate = {
                    iterator: D(e),
                    resultName: n,
                    nextLoc: r,
                  }),
                  "next" === this.method && (this.arg = t),
                  g
                );
              },
            }),
            e
          );
        }
        function et(t, e, n, r, o, i, a) {
          try {
            var c = t[i](a),
              u = c.value;
          } catch (t) {
            return void n(t);
          }
          c.done ? e(u) : Promise.resolve(u).then(r, o);
        }
        var nt = window.innerWidth,
          rt = window.innerWidth < 1e3 ? 768 : 1e3;
        nt > rt && (nt = rt);
        var ot = window.innerHeight,
          it = 1e3 === nt ? 192 : 40,
          at = Math.floor(Math.round((nt - it) / (nt / 100))) / 100;
        at -= 0.01;
        var ct = function (t, e, n) {
            if (t && e)
              return new Promise(function (r, o) {
                var i = new Image();
                (i.src = t),
                  (i.onload = function () {
                    var t = i.naturalWidth,
                      o = i.naturalHeight,
                      a = t / o,
                      c = "auto",
                      u = "",
                      s = "";
                    if (t > o && t >= Math.floor(nt * at))
                      n
                        ? ((c = "100%"),
                          (u = "auto"),
                          (s = "max-height: 86vh;object-fit: contain;"))
                        : ((c = Math.floor(nt * at) + "px"), (u = "auto"));
                    else if (o > t && o >= Math.floor(nt * at))
                      if (n)
                        (c = "100%"),
                          (u = "auto"),
                          (s = "max-height: 86vh;object-fit: contain;");
                      else {
                        var A = ot * at,
                          f = A / a;
                        A > nt && (f = (A = nt * at) / a),
                          f > ot * at &&
                            ((f = Math.floor(ot * at)),
                            (A = Math.floor(f * a))),
                          (c = A + "px"),
                          (u = f + "px");
                      }
                    else
                      t === o && t >= nt * at && ((c = "100%"), (u = "auto"));
                    if (
                      (e.setAttribute(
                        "style",
                        "width: "
                          .concat(c, "; height: ")
                          .concat(u, ";")
                          .concat(s)
                      ),
                      e.parentNode)
                    ) {
                      var l = c <= nt * at ? c : nt * at;
                      e.parentNode.setAttribute(
                        "style",
                        "min-width: "
                          .concat(l, "px; min-height: ")
                          .concat(
                            u,
                            "; text-align:center;text-indent: 0;margin-left: 0; margin-right: 0; "
                          )
                          .concat(
                            n
                              ? "margin-top:0;padding-left:0; padding-right:0"
                              : ""
                          )
                      );
                    }
                    r();
                  }),
                  (i.onerror = function () {
                    i.src = X;
                  });
              });
          },
          ut = function (t, e) {
            if (t)
              return new Promise(function (n) {
                for (
                  var r = t.getElementsByTagName("img"),
                    o = r.length,
                    i = [],
                    a = 0;
                  a < o;
                  a++
                )
                  i.push(ct(r[a].getAttribute("src"), r[a], e));
                Promise.all(i).then(function () {
                  n();
                });
              });
          },
          st = [],
          At = function (t) {
            if (t && t.length) {
              document.querySelectorAll("link").forEach(function (t) {
                st.includes(t.getAttribute("href")) ||
                  st.push(t.getAttribute("href"));
              });
              for (
                var e = document.getElementById("shortcut"),
                  n = document.getElementsByTagName("head")[0],
                  r = Array.from(t).filter(function (t) {
                    return "LINK" === t.tagName;
                  }),
                  o = r.length,
                  i = 0;
                i < o;
                i++
              )
                st.includes(r[i].getAttribute("href")) ||
                  n.insertBefore(r[i], e);
            }
          },
          ft = function (t) {
            if (t)
              for (
                var e = t.getElementsByTagName("a"), n = e.length, r = 0;
                r < n;
                r++
              ) {
                e[r].removeAttribute("href");
              }
          },
          lt = (function () {
            var t,
              e =
                ((t = tt().mark(function t(e, n, r) {
                  var o, i, a, c, u, s, A, f, l, h, d, p, g, m, v, y;
                  return tt().wrap(function (t) {
                    for (;;)
                      switch ((t.prev = t.next)) {
                        case 0:
                          if (e && r && (!r || "function" == typeof r)) {
                            t.next = 2;
                            break;
                          }
                          return t.abrupt("return", !1);
                        case 2:
                          if ("txt" !== n.format) {
                            t.next = 6;
                            break;
                          }
                          return (
                            (o = e
                              .split("\n")
                              .map(function (t) {
                                return '<p class="content txt">'.concat(
                                  t.trim(),
                                  "</p>"
                                );
                              })
                              .join("")),
                            r(
                              '<h1 class="chapter_title">'
                                .concat(n.chapter_name, "</h1>")
                                .concat(o)
                            ),
                            t.abrupt("return", !0)
                          );
                        case 6:
                          (i = []),
                            (a = [
                              "DIV",
                              "P",
                              "UL",
                              "OL",
                              "TABLE",
                              "DL",
                              "H1",
                              "H2",
                              "H3",
                              "H4",
                              "H5",
                              "H6",
                              "SECTION",
                              "ARTICLE",
                              "HEADER",
                              "FOOTER",
                              "NAV",
                              "ASIDE",
                              "PRE",
                            ]),
                            (c = ["SCRIPT", "STYLE", "TITLE", "META"]),
                            (u = e.replace(/http:\/\//g, "https://"));
                          try {
                            (s = document.createRange()),
                              (A = s.createContextualFragment(u));
                          } catch (t) {
                            ((f =
                              document.implementation.createHTMLDocument(
                                "backup"
                              )).documentElement.innerHTML = u),
                              (A = f.getElementsByTagName("body")[0]);
                          }
                          (l = A.childNodes), At(l), (h = l.length), (d = 0);
                        case 15:
                          if (!(d < h)) {
                            t.next = 43;
                            break;
                          }
                          if (!(p = l[d]) || !p.tagName) {
                            t.next = 40;
                            break;
                          }
                          if (
                            !(g = p.tagName) ||
                            !a.includes(g) ||
                            ["LINK", "TITLE"].includes(g)
                          ) {
                            t.next = 38;
                            break;
                          }
                          return (
                            ft(p),
                            (m = 0 === n.chapter_index),
                            (t.next = 24),
                            ut(p, m)
                          );
                        case 24:
                          if (
                            ((v = p.id),
                            (y = p.getAttribute("name")),
                            n.containPayChapter &&
                              (!n.containPayChapter || v || y))
                          ) {
                            t.next = 30;
                            break;
                          }
                          i.push(p.outerHTML), (t.next = 36);
                          break;
                        case 30:
                          if (
                            !n.containPayChapter ||
                            !(
                              (v && v !== n.payStartChapterId) ||
                              (y && y !== n.payStartChapterId)
                            )
                          ) {
                            t.next = 34;
                            break;
                          }
                          i.push(p.outerHTML), (t.next = 36);
                          break;
                        case 34:
                          if (
                            !n.containPayChapter ||
                            !(
                              (v && v === n.payStartChapterId) ||
                              (y && y === n.payStartChapterId)
                            )
                          ) {
                            t.next = 36;
                            break;
                          }
                          return t.abrupt("break", 43);
                        case 36:
                          t.next = 40;
                          break;
                        case 38:
                          if (!c.includes(g)) {
                            t.next = 40;
                            break;
                          }
                          return t.abrupt("continue", 40);
                        case 40:
                          d++, (t.next = 15);
                          break;
                        case 43:
                          r(i.join(""));
                        case 44:
                        case "end":
                          return t.stop();
                      }
                  }, t);
                })),
                function () {
                  var e = this,
                    n = arguments;
                  return new Promise(function (r, o) {
                    var i = t.apply(e, n);
                    function a(t) {
                      et(i, r, o, a, c, "next", t);
                    }
                    function c(t) {
                      et(i, r, o, a, c, "throw", t);
                    }
                    a(void 0);
                  });
                });
            return function (t, n, r) {
              return e.apply(this, arguments);
            };
          })(),
          ht = function () {
            var t = dt(
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : [],
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : "epub"
              ),
              e = t.length;
            return (
              (t[0].isFirst = !0), (t[e - 1].isLast = !0), Object.freeze(t)
            );
          },
          dt = function () {
            var t =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : [];
            if (
              "txt" ===
              (arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : "epub")
            )
              return (
                t.forEach(function (t, e) {
                  (t.chapter_index = e),
                    !t.chapter_id && (t.chapter_id = t.volume_id),
                    (t.url = t.chapter_id),
                    (t.chapter_item = t.chapter_id),
                    (t.root = t),
                    (t.children = [t]);
                }),
                t
              );
            for (var e = {}, n = t.length, r = 0; r < n; r++) {
              var o = t[r];
              o.chapter_uri
                ? (o.url = o.chapter_uri.split("#")[0].replace("-CD.", "."))
                : o.chapter_item && (o.url = o.chapter_item),
                o.curChapterInfo ||
                  (o.chapter_item = o.chapter_item || o.chapter_id);
              var i = o.url;
              e[i]
                ? o.anchor &&
                  ((o.root = e[i]),
                  o.is_try && !o.root.is_try && (o.root.$is_try = !0),
                  e[i].children.push(o),
                  e[i].anchors
                    ? e[i].anchors.includes("".concat(o.anchor)) ||
                      e[i].anchors.push("".concat(o.anchor))
                    : (e[i].anchors = ["".concat(o.anchor)]),
                  e[i].containPayChapter ||
                    o.is_try ||
                    o.is_buy ||
                    ((e[i].containPayChapter = !0),
                    (e[i].payStartChapterId = o.anchor)))
                : ((e[i] = o), (o.root = o), (e[i].children = [o]));
            }
            return Object.values(e).sort(function (t, e) {
              return t.chapter_index - e.chapter_index;
            });
          },
          pt = n(78366),
          gt = function () {
            var t = this,
              e = t.$createElement,
              n = t._self._c || e;
            return n(
              "div",
              {
                staticClass: "reader-calalog-right",
                class: [
                  t.themeStyle,
                  { isIphoneFS: t.device.isIOS, active: t.isCatalogShow },
                ],
                on: { click: t.hidePop },
              },
              [
                n("div", { staticClass: "catalog-mask" }),
                n(
                  "div",
                  {
                    staticClass: "catalog-innner-wrap",
                    on: {
                      click: function (t) {
                        t.preventDefault(), t.stopPropagation();
                      },
                    },
                  },
                  [
                    n("div", { staticClass: "reader-ebook-name" }, [
                      n("p", [t._v(t._s(t.ebookName))]),
                      n("div", {
                        staticClass: "close",
                        staticStyle: { display: "none" },
                        on: { click: t.hidePop },
                      }),
                    ]),
                    n(
                      "div",
                      {
                        staticClass: "catalog-list",
                        attrs: { id: "catalog-list" },
                      },
                      [
                        t._l(t.catalogData, function (e) {
                          return n(
                            "div",
                            {
                              key: e.chapter_id,
                              staticClass: "catalog-item",
                              class: {
                                locked: t.showLock(e),
                                actived: t.activated(e),
                              },
                              on: {
                                click: function (n) {
                                  return (
                                    n.stopPropagation(),
                                    n.preventDefault(),
                                    t.goToReader(e)
                                  );
                                },
                              },
                            },
                            [
                              t._v(
                                "\n        " + t._s(e.chapter_name) + "\n      "
                              ),
                            ]
                          );
                        }),
                        n("div", { staticClass: "catalog-item" }, [
                          t._v("没有更多了~~"),
                        ]),
                      ],
                      2
                    ),
                  ]
                ),
              ]
            );
          };
        function mt(t) {
          return (
            (mt =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (t) {
                    return typeof t;
                  }
                : function (t) {
                    return t &&
                      "function" == typeof Symbol &&
                      t.constructor === Symbol &&
                      t !== Symbol.prototype
                      ? "symbol"
                      : typeof t;
                  }),
            mt(t)
          );
        }
        function vt(t, e) {
          var n = Object.keys(t);
          if (Object.getOwnPropertySymbols) {
            var r = Object.getOwnPropertySymbols(t);
            e &&
              (r = r.filter(function (e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable;
              })),
              n.push.apply(n, r);
          }
          return n;
        }
        function yt(t) {
          for (var e = 1; e < arguments.length; e++) {
            var n = null != arguments[e] ? arguments[e] : {};
            e % 2
              ? vt(Object(n), !0).forEach(function (e) {
                  wt(t, e, n[e]);
                })
              : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n))
              : vt(Object(n)).forEach(function (e) {
                  Object.defineProperty(
                    t,
                    e,
                    Object.getOwnPropertyDescriptor(n, e)
                  );
                });
          }
          return t;
        }
        function wt(t, e, n) {
          return (
            (e = (function (t) {
              var e = (function (t, e) {
                if ("object" != mt(t) || !t) return t;
                var n = t[Symbol.toPrimitive];
                if (void 0 !== n) {
                  var r = n.call(t, e || "default");
                  if ("object" != mt(r)) return r;
                  throw new TypeError(
                    "@@toPrimitive must return a primitive value."
                  );
                }
                return ("string" === e ? String : Number)(t);
              })(t, "string");
              return "symbol" == mt(e) ? e : e + "";
            })(e)) in t
              ? Object.defineProperty(t, e, {
                  value: n,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (t[e] = n),
            t
          );
        }
        gt._withStripped = !0;
        var bt = {
            name: "Catalog",
            props: {
              catalogData: {
                type: Array,
                default: function () {
                  return [];
                },
              },
              themeData: Object,
              isCatalogShow: Boolean,
              bookInfo: Object,
            },
            data: function () {
              return { curChapter: {}, curChapter_index: "" };
            },
            computed: yt(
              yt(
                {},
                (0, a.Se)({
                  ebookName: "ebookName",
                  ebookId: "ebookId",
                  device: "device",
                  theme: "theme",
                })
              ),
              {},
              {
                themeStyle: function () {
                  return "theme-".concat(this.themeData.name);
                },
              }
            ),
            watch: {
              isCatalogShow: function (t) {
                if (t) {
                  var e = (0, c.cF)(
                    "cur_chapter_".concat(this.$route.query.ebookId)
                  );
                  if (e) {
                    if ((this.$set(this, "curChapter", e), this.curChapter.url))
                      if (this.curChapter.anchor) {
                        for (
                          var n = !1, r = 0;
                          r < this.catalogData.length;
                          r++
                        )
                          if (
                            (n ||
                              (n =
                                this.catalogData[r].chapter_index ===
                                this.curChapter.index),
                            n &&
                              this.catalogData[r].anchor &&
                              this.curChapter.anchor ===
                                this.catalogData[r].anchor)
                          ) {
                            this.curChapter_index =
                              this.catalogData[r].chapter_index;
                            break;
                          }
                      } else this.curChapter_index = this.curChapter.index;
                    else this.curChapter_index = 0;
                    setTimeout(function () {
                      var t =
                        document.querySelector(".catalog-item.actived") ||
                        document.querySelectorAll(".catalog-item")[0];
                      t.classList.contains("actived") ||
                        t.classList.add("actived"),
                        (document.querySelector("#catalog-list").scrollTop =
                          t.offsetTop - 200);
                    }, 0);
                  }
                }
              },
            },
            mounted: function () {
              var t = (0, c.cF)(
                "cur_chapter_".concat(this.$route.query.ebookId)
              );
              t && this.$set(this, "curChapter", t),
                this.$nextTick(function () {
                  var t = document.querySelector(".catalog-item.actived");
                  t && t.scrollIntoView();
                });
            },
            methods: yt(
              yt(
                {},
                (0, a.OI)({
                  setFormat: "SET_FORMAT",
                  setBuyState: "SET_BUY_STATE",
                  setEbookName: "SET_EBOOK_NAME",
                  setCatalog: "SET_CATALOG",
                  setCurChapterInfo: "SET_CUR_CHAPTER_INFO",
                })
              ),
              {},
              {
                activated: function (t) {
                  return this.curChapter_index === t.chapter_index;
                },
                showLock: function (t) {
                  return (
                    ("jd-mp" != this.$route.query.app ||
                      !this.bookInfo ||
                      !this.bookInfo.yuewen_free) &&
                    (!t || !(t.is_try || t.$is_try || t.is_buy))
                  );
                },
                hidePop: function () {
                  this.$emit("hidePop");
                },
                goToReader: function (t) {
                  this.$emit("hideCatalog", {
                    index: t.chapter_index,
                    type: "catalog",
                  });
                },
              }
            ),
          },
          Ct = bt,
          It = n(97646),
          St = n.n(It),
          xt = {};
        (xt.styleTagTransform = E()),
          (xt.setAttributes = C()),
          (xt.insert = w().bind(null, "head")),
          (xt.domAPI = v()),
          (xt.insertStyleElement = S());
        g()(St(), xt), St() && St().locals && St().locals;
        var Et = T(Ct, gt, [], !1, null, null, null).exports,
          _t = function () {
            var t = this,
              e = t.$createElement,
              n = t._self._c || e;
            return n(
              "div",
              {
                staticClass: "reader-calalog",
                class: [
                  t.themeStyle,
                  { isIphoneFS: t.device.isIOS, active: t.isCatalogShow },
                ],
                on: { click: t.hidePop },
              },
              [
                n("div", { staticClass: "catalog-mask" }),
                n(
                  "div",
                  {
                    staticClass: "catalog-innner-wrap",
                    on: {
                      click: function (t) {
                        t.preventDefault(), t.stopPropagation();
                      },
                    },
                  },
                  [
                    n(
                      "div",
                      {
                        staticClass: "reader-ebook-name",
                        staticStyle: { height: "95px" },
                      },
                      [
                        n("p", [t._v(t._s(t.ebookName))]),
                        n("p", { staticClass: "size-color" }, [
                          t._v("共" + t._s(t.catalogData.length) + "条"),
                        ]),
                      ]
                    ),
                    n(
                      "div",
                      {
                        staticClass: "catalog-list",
                        attrs: { id: "catalog-list" },
                      },
                      t._l(t.catalogData, function (e) {
                        return n(
                          "div",
                          { key: e.id, staticClass: "bj-content" },
                          [
                            n(
                              "div",
                              {
                                staticClass: "bj-content-bottom",
                                on: {
                                  click: function (n) {
                                    return t.mlgo(e);
                                  },
                                },
                              },
                              [
                                n("span", { staticClass: "sp-content" }, [
                                  t._v(t._s(e.content)),
                                ]),
                                n("span", { staticClass: "sp-gb" }, [
                                  t._v(t._s(e.quote_text)),
                                ]),
                                n(
                                  "span",
                                  {
                                    staticClass: "sp-gb",
                                    attrs: { id: "sp-gbx" },
                                  },
                                  [
                                    t._v(
                                      t._s(
                                        e.written_at
                                          ? e.written_at
                                              .split(" ")[1]
                                              .split(":")[0] +
                                              ":" +
                                              e.written_at
                                                .split(" ")[1]
                                                .split(":")[1]
                                          : ""
                                      )
                                    ),
                                  ]
                                ),
                                n("div", { staticClass: "border-color" }),
                              ]
                            ),
                          ]
                        );
                      }),
                      0
                    ),
                  ]
                ),
              ]
            );
          };
        function Bt(t) {
          return (
            (Bt =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (t) {
                    return typeof t;
                  }
                : function (t) {
                    return t &&
                      "function" == typeof Symbol &&
                      t.constructor === Symbol &&
                      t !== Symbol.prototype
                      ? "symbol"
                      : typeof t;
                  }),
            Bt(t)
          );
        }
        function kt(t, e) {
          var n = Object.keys(t);
          if (Object.getOwnPropertySymbols) {
            var r = Object.getOwnPropertySymbols(t);
            e &&
              (r = r.filter(function (e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable;
              })),
              n.push.apply(n, r);
          }
          return n;
        }
        function Tt(t) {
          for (var e = 1; e < arguments.length; e++) {
            var n = null != arguments[e] ? arguments[e] : {};
            e % 2
              ? kt(Object(n), !0).forEach(function (e) {
                  Dt(t, e, n[e]);
                })
              : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n))
              : kt(Object(n)).forEach(function (e) {
                  Object.defineProperty(
                    t,
                    e,
                    Object.getOwnPropertyDescriptor(n, e)
                  );
                });
          }
          return t;
        }
        function Dt(t, e, n) {
          return (
            (e = (function (t) {
              var e = (function (t, e) {
                if ("object" != Bt(t) || !t) return t;
                var n = t[Symbol.toPrimitive];
                if (void 0 !== n) {
                  var r = n.call(t, e || "default");
                  if ("object" != Bt(r)) return r;
                  throw new TypeError(
                    "@@toPrimitive must return a primitive value."
                  );
                }
                return ("string" === e ? String : Number)(t);
              })(t, "string");
              return "symbol" == Bt(e) ? e : e + "";
            })(e)) in t
              ? Object.defineProperty(t, e, {
                  value: n,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (t[e] = n),
            t
          );
        }
        _t._withStripped = !0;
        var Ot = {
            name: "Catalog",
            props: {
              catalogData: {
                type: Array,
                default: function () {
                  return [];
                },
              },
              ml: {
                type: Array,
                default: function () {
                  return [];
                },
              },
              themeData: Object,
              isCatalogShow: Boolean,
            },
            data: function () {
              return { curChapter: {} };
            },
            computed: Tt(
              Tt(
                {},
                (0, a.Se)({
                  ebookName: "ebookName",
                  ebookId: "ebookId",
                  device: "device",
                  theme: "theme",
                })
              ),
              {},
              {
                themeStyle: function () {
                  return "theme-".concat(this.themeData.name);
                },
              }
            ),
            watch: {
              isCatalogShow: function (t) {
                if (t) {
                  var e = (0, c.cF)(
                    "cur_chapter_".concat(this.$route.query.ebookId)
                  );
                  e &&
                    (this.$set(this, "curChapter", e),
                    setTimeout(function () {
                      var t =
                        document.querySelector(".catalog-item.actived") ||
                        document.querySelectorAll(".catalog-item")[0];
                      t.classList.contains("actived") ||
                        t.classList.add("actived"),
                        (document.querySelector("#catalog-list").scrollTop =
                          t.offsetTop - 200);
                    }, 0));
                }
              },
            },
            mounted: function () {
              var t = (0, c.cF)(
                "cur_chapter_".concat(this.$route.query.ebookId)
              );
              t && this.$set(this, "curChapter", t),
                this.$nextTick(function () {
                  var t = document.querySelector(".catalog-item.actived");
                  t && t.scrollIntoView();
                });
            },
            methods: Tt(
              Tt(
                {},
                (0, a.OI)({
                  setFormat: "SET_FORMAT",
                  setBuyState: "SET_BUY_STATE",
                  setEbookName: "SET_EBOOK_NAME",
                  setCatalog: "SET_CATALOG",
                  setCurChapterInfo: "SET_CUR_CHAPTER_INFO",
                })
              ),
              {},
              {
                mlgo: function (t) {
                  var e = this.ml.filter(function (e) {
                    return e.chapter_id === String(t.chapter_id);
                  });
                  this.$emit("hideCatalog", {
                    index: e[0].chapter_index,
                    paraIndex: t.from_para_index,
                    type: "note",
                  });
                },
                hidePop: function () {
                  this.$emit("hidePop");
                },
              }
            ),
          },
          Pt = n(25077),
          Mt = n.n(Pt),
          jt = {};
        (jt.styleTagTransform = E()),
          (jt.setAttributes = C()),
          (jt.insert = w().bind(null, "head")),
          (jt.domAPI = v()),
          (jt.insertStyleElement = S());
        g()(Mt(), jt), Mt() && Mt().locals && Mt().locals;
        var Lt = T(Ot, _t, [], !1, null, null, null).exports,
          Nt = function () {
            var t,
              e = this,
              r = e.$createElement,
              o = e._self._c || r;
            return o(
              "div",
              {
                staticClass: "vertical-read",
                style: { color: e.theme.color },
                attrs: { id: "vertical-read" },
                on: {
                  touchmove: e.hideCtrlTools,
                  scroll: e.onScrollHandler,
                  click: e.showCtrlTools,
                },
              },
              [
                o(
                  "div",
                  {
                    staticClass: "vertical-chapter-list",
                    class: {
                      isIphoneFS: e.device.isIOS,
                      firstChapter:
                        e.showContent &&
                        e.showContent.isFirst &&
                        "epub" === e.format,
                      pt64: e.pageMaxWidth >= 1e3,
                    },
                    style: { "background-color": e.contentBgColor },
                    attrs: { id: "vertical-chapter-list" },
                  },
                  [
                    e.showContent
                      ? o(
                          "div",
                          {
                            staticClass: "item-chapter-title",
                            class: [e.themeStyle, e.titleStyle],
                            style: { top: e.headerHeight + "px" },
                          },
                          [
                            o(
                              "div",
                              { staticClass: "chapter-title-flex-row" },
                              [
                                o("div", [
                                  e._v(" " + e._s(e.showContent.name)),
                                ]),
                                o("div", [e._v(e._s(e.pageNum))]),
                              ]
                            ),
                          ]
                        )
                      : e._e(),
                    e.showContent && !e.showContent.isFirst
                      ? o("button", {
                          ref: "readerContent",
                          staticClass: "prevChapter",
                          class: {
                            night: "night" === e.readTheme,
                            "mobile-style": !e.device.isPc,
                          },
                          style: { "background-color": e.theme.btnBgColor },
                          on: {
                            click: function (t) {
                              return (
                                t.stopPropagation(),
                                t.preventDefault(),
                                e.getPrevChapter("prev")
                              );
                            },
                          },
                        })
                      : e._e(),
                    [
                      e.showContent
                        ? o("div", {
                            ref: "a",
                            staticClass: "reader-chapter-content",
                            class:
                              ((t = {}),
                              (t["fontSize-" + e.fontSize] = e.fontSize),
                              (t.night = "night" === e.readTheme),
                              t),
                            attrs: {
                              id:
                                "chapter-" +
                                e.ebookId +
                                "-" +
                                e.showContent.chapter_id,
                              anchors: "" + e.showContent.anchors,
                              isfree: "" + e.showContent.can_read,
                            },
                            domProps: {
                              innerHTML: e._s(e.showContent.content),
                            },
                          })
                        : e._e(),
                      e.showContent &&
                      e.showContent.can_read &&
                      !e.showContent.isLast
                        ? o("button", {
                            staticClass: "nextChapter",
                            class: {
                              night: "night" === e.readTheme,
                              middleChapter:
                                !e.showContent.isFirst && !e.showContent.isLast,
                              "mobile-style": !e.device.isPc,
                            },
                            style: { "background-color": e.theme.btnBgColor },
                            on: {
                              click: function (t) {
                                return (
                                  t.stopPropagation(),
                                  t.preventDefault(),
                                  e.getPrevChapter("next")
                                );
                              },
                            },
                          })
                        : e._e(),
                      e.showContent && e.showContent.isLast
                        ? o(
                            "div",
                            {
                              staticClass: "reade-finish-tips",
                              class: { night: "night" === e.readTheme },
                            },
                            [o("span", [e._v("全书已读完")])]
                          )
                        : e._e(),
                    ],
                    o("ReaderToolbar", {
                      directives: [
                        {
                          name: "show",
                          rawName: "v-show",
                          value: e.isShowIdeaToolbar,
                          expression: "isShowIdeaToolbar",
                        },
                      ],
                      ref: "readerToolbarRef",
                      attrs: { notePosition: e.notePosition },
                      on: {
                        openIdeaBox: e.openIdeaBox,
                        closeIdeaToolBar: e.closeIdeaToolBar,
                        toUnderLine: e.toUnderLine,
                      },
                    }),
                    o("ReaderIdeaFooter", {
                      ref: "readerIdeaBoxRef",
                      on: {
                        toWriteIdeaFoo: e.toWriteIdeaFoo,
                        delNode: e.delNode,
                      },
                    }),
                    e._l(e.notesLineData, function (t, r) {
                      return o(
                        "div",
                        {
                          key: r,
                          staticClass: "notes-line",
                          style: {
                            top: t.top + "px",
                            width: t.width + "px",
                            height: t.height + "px",
                            left: t.left + "px",
                          },
                          on: {
                            click: function (n) {
                              return n.target !== n.currentTarget
                                ? null
                                : e.clickNoteLine(n, t);
                            },
                          },
                        },
                        [
                          !t.content ||
                          (r !== e.notesLineData.length - 1 &&
                            t.id === e.notesLineData[r + 1].id)
                            ? e._e()
                            : o("img", {
                                staticClass: "sp",
                                attrs: { src: n(3995) },
                                on: {
                                  click: function (n) {
                                    return e.openx(t);
                                  },
                                },
                              }),
                        ]
                      );
                    }),
                  ],
                  2
                ),
              ]
            );
          };
        Nt._withStripped = !0;
        var zt = function () {
          var t = this,
            e = t.$createElement,
            r = t._self._c || e;
          return r(
            "div",
            {
              staticClass: "reader_toolbar_container",
              style: {
                left: t.notePosition.x,
                top: t.notePosition.y,
                transform: t.notePosition.xz,
              },
            },
            [
              r("div", { staticClass: "reader_toolbar_content" }, [
                r(
                  "div",
                  {
                    staticClass: "reader_toolbar_itemContainer",
                    style: { transform: t.notePosition.xz },
                  },
                  [
                    r(
                      "button",
                      {
                        directives: [
                          {
                            name: "show",
                            rawName: "v-show",
                            value: t.notePosition.flag,
                            expression: "notePosition.flag",
                          },
                        ],
                        staticClass: "toolbarItem review",
                        on: {
                          click: function (e) {
                            return t.toUnderLine("cre");
                          },
                          touchstart: function (e) {
                            return (
                              e.stopPropagation(),
                              e.preventDefault(),
                              t.toUnderLine("cre")
                            );
                          },
                          touchend: function (t) {
                            t.stopPropagation(), t.preventDefault();
                          },
                        },
                      },
                      [
                        r("img", {
                          style: {
                            display: t.notePosition.flag ? "block" : "none",
                          },
                          attrs: { src: n(74), alt: "图片" },
                        }),
                        r("span", { staticClass: "toolbarItem_text" }, [
                          t._v("划线"),
                        ]),
                      ]
                    ),
                    r(
                      "button",
                      {
                        directives: [
                          {
                            name: "show",
                            rawName: "v-show",
                            value: !t.notePosition.flag,
                            expression: "!notePosition.flag",
                          },
                        ],
                        staticClass: "toolbarItem review",
                        on: {
                          click: function (e) {
                            return t.toUnderLine("del");
                          },
                          touchstart: function (e) {
                            return (
                              e.stopPropagation(),
                              e.preventDefault(),
                              t.toUnderLine("del")
                            );
                          },
                          touchend: function (t) {
                            t.stopPropagation(), t.preventDefault();
                          },
                        },
                      },
                      [
                        r("img", {
                          style: {
                            display: t.notePosition.flag ? "none" : "block",
                          },
                          attrs: { src: n(52882) },
                        }),
                        r("span", { staticClass: "toolbarItem_text" }, [
                          t._v("删除划线"),
                        ]),
                      ]
                    ),
                    r(
                      "button",
                      {
                        staticClass: "toolbarItem review",
                        on: {
                          click: t.toWriteIdea,
                          touchstart: function (e) {
                            return (
                              e.stopPropagation(),
                              e.preventDefault(),
                              t.toWriteIdea.apply(null, arguments)
                            );
                          },
                          touchend: function (t) {
                            t.stopPropagation(), t.preventDefault();
                          },
                        },
                      },
                      [
                        r("img", { attrs: { src: n(36802), alt: "" } }),
                        r("span", { staticClass: "toolbarItem_text" }, [
                          t._v("写想法"),
                        ]),
                      ]
                    ),
                  ]
                ),
              ]),
              r("span", { staticClass: "arrow" }),
            ]
          );
        };
        zt._withStripped = !0;
        var Qt = {
            name: "readerToolbar",
            props: {
              notePosition: {
                type: Object,
                default: function () {
                  return {
                    x: "100px",
                    y: "200px",
                    xz: "0",
                    flag: !0,
                    noteInfo: {},
                  };
                },
              },
            },
            data: function () {
              return { isShowIdeaToolbar: !1, type: "" };
            },
            methods: {
              toWriteIdea: function () {
                this.$emit("openIdeaBox", this.notePosition.noteInfo),
                  this.toWriteIdeaClose();
              },
              toUnderLine: function (t) {
                event.preventDefault(), this.$emit("toUnderLine", t);
              },
              toWriteIdeaClose: function () {
                this.$emit("closeIdeaToolBar");
              },
            },
          },
          Rt = n(32673),
          Wt = n.n(Rt),
          Ft = {};
        (Ft.styleTagTransform = E()),
          (Ft.setAttributes = C()),
          (Ft.insert = w().bind(null, "head")),
          (Ft.domAPI = v()),
          (Ft.insertStyleElement = S());
        g()(Wt(), Ft), Wt() && Wt().locals && Wt().locals;
        var Ut = T(Qt, zt, [], !1, null, "a96d134c", null).exports,
          Kt = function () {
            var t = this,
              e = t.$createElement,
              r = t._self._c || e;
            return t.closeBox
              ? r(
                  "div",
                  {
                    staticClass: "reader_writereview_panel",
                    on: {
                      touchstart: function (t) {
                        t.stopPropagation();
                      },
                      touchmove: function (t) {
                        t.stopPropagation();
                      },
                      touchend: function (t) {
                        t.stopPropagation();
                      },
                      click: function (e) {
                        return e.target !== e.currentTarget
                          ? null
                          : t.closeIdeaBox.apply(null, arguments);
                      },
                    },
                  },
                  [
                    r(
                      "div",
                      {
                        staticClass: "reader_writereview_panel_bg",
                        on: {
                          click: function (e) {
                            t.isShowMenu = !1;
                          },
                          touchstart: function (t) {
                            t.stopPropagation();
                          },
                          touchmove: function (t) {
                            t.stopPropagation();
                          },
                          touchend: function (t) {
                            t.stopPropagation();
                          },
                        },
                      },
                      [
                        r(
                          "span",
                          {
                            staticClass: "close_button",
                            on: {
                              click: t.closeIdeaBox,
                              touchstart: function (t) {
                                t.stopPropagation();
                              },
                              touchmove: function (t) {
                                t.stopPropagation();
                              },
                              touchend: function (t) {
                                t.stopPropagation();
                              },
                            },
                          },
                          [t._v("关闭")]
                        ),
                        r(
                          "div",
                          {
                            staticClass:
                              "writeReview_container forceDark disabled",
                          },
                          [
                            r(
                              "div",
                              {
                                staticClass: "writeReview_editor paddingLarge",
                              },
                              [
                                r("img", {
                                  directives: [
                                    {
                                      name: "show",
                                      rawName: "v-show",
                                      value: t.flag,
                                      expression: "flag",
                                    },
                                  ],
                                  staticClass: "xf",
                                  attrs: { src: n(36802), alt: "" },
                                }),
                                r("textarea", {
                                  directives: [
                                    {
                                      name: "model",
                                      rawName: "v-model",
                                      value: t.writeBookReview,
                                      expression: "writeBookReview",
                                    },
                                  ],
                                  staticClass: "writeReview_textarea",
                                  attrs: { placeholder: "写下这一刻的想法" },
                                  domProps: { value: t.writeBookReview },
                                  on: {
                                    touchstart: function (t) {
                                      t.stopPropagation();
                                    },
                                    touchmove: function (t) {
                                      t.stopPropagation();
                                    },
                                    touchend: function (t) {
                                      t.stopPropagation();
                                    },
                                    click: function (t) {
                                      t.stopPropagation();
                                    },
                                    input: function (e) {
                                      e.target.composing ||
                                        (t.writeBookReview = e.target.value);
                                    },
                                  },
                                }),
                              ]
                            ),
                            r("div", { staticClass: "writeReview_footer" }, [
                              r(
                                "div",
                                { staticClass: "writeReview_footer_Border" },
                                [
                                  r(
                                    "div",
                                    {
                                      staticClass: "menu_container",
                                      on: {
                                        click: function (e) {
                                          return (
                                            e.stopPropagation(),
                                            t.publishIdea.apply(null, arguments)
                                          );
                                        },
                                      },
                                    },
                                    [
                                      r(
                                        "div",
                                        {
                                          directives: [
                                            {
                                              name: "show",
                                              rawName: "v-show",
                                              value: t.isShowMenu,
                                              expression: "isShowMenu",
                                            },
                                          ],
                                          staticClass: "menu_option_container",
                                        },
                                        [
                                          r(
                                            "div",
                                            {
                                              staticClass:
                                                "menu_option_containerBorder",
                                            },
                                            [
                                              r(
                                                "div",
                                                {
                                                  staticClass:
                                                    "menu_option_containerInner",
                                                },
                                                [
                                                  r(
                                                    "ul",
                                                    {
                                                      staticClass:
                                                        "menu_option_list",
                                                    },
                                                    t._l(
                                                      t.ideaTypeList,
                                                      function (e, n) {
                                                        return r(
                                                          "li",
                                                          {
                                                            key: n,
                                                            staticClass:
                                                              "menu_option_list_item",
                                                            on: {
                                                              touchstart:
                                                                function (e) {
                                                                  return t.selectMenuItem(
                                                                    n
                                                                  );
                                                                },
                                                              click: function (
                                                                e
                                                              ) {
                                                                return t.selectMenuItem(
                                                                  n
                                                                );
                                                              },
                                                            },
                                                          },
                                                          [
                                                            r(
                                                              "div",
                                                              {
                                                                staticClass:
                                                                  "menu_option_list_link",
                                                              },
                                                              [
                                                                r("img", {
                                                                  staticClass:
                                                                    "writeReview_footer_Menu_Icon publish",
                                                                  attrs: {
                                                                    src: e.icon,
                                                                  },
                                                                }),
                                                                r(
                                                                  "span",
                                                                  {
                                                                    staticClass:
                                                                      "writeReview_footer_Menu_Title",
                                                                  },
                                                                  [
                                                                    t._v(
                                                                      t._s(
                                                                        e.type
                                                                      )
                                                                    ),
                                                                  ]
                                                                ),
                                                                r(
                                                                  "span",
                                                                  {
                                                                    staticClass:
                                                                      "writeReview_footer_Menu_Subtitle",
                                                                  },
                                                                  [
                                                                    t._v(
                                                                      t._s(
                                                                        e.dec
                                                                      )
                                                                    ),
                                                                  ]
                                                                ),
                                                              ]
                                                            ),
                                                          ]
                                                        );
                                                      }
                                                    ),
                                                    0
                                                  ),
                                                ]
                                              ),
                                            ]
                                          ),
                                        ]
                                      ),
                                    ]
                                  ),
                                  r(
                                    "button",
                                    {
                                      directives: [
                                        {
                                          name: "show",
                                          rawName: "v-show",
                                          value: t.writeBookReview && t.flag,
                                          expression: "writeBookReview && flag",
                                        },
                                      ],
                                      staticClass: "wr_btn_Big",
                                      on: {
                                        click: t.expressIdea,
                                        touchstart: function (t) {
                                          t.stopPropagation();
                                        },
                                        touchmove: function (t) {
                                          t.stopPropagation();
                                        },
                                        touchend: function (t) {
                                          t.stopPropagation();
                                        },
                                      },
                                    },
                                    [t._v("\n            发 布\n          ")]
                                  ),
                                  r(
                                    "div",
                                    {
                                      directives: [
                                        {
                                          name: "show",
                                          rawName: "v-show",
                                          value: !t.flag,
                                          expression: "!flag",
                                        },
                                      ],
                                      staticClass: "wr_btn_Biga",
                                    },
                                    [
                                      r("img", {
                                        attrs: { src: n(36802), alt: "" },
                                        on: {
                                          click: t.editNode,
                                          touchstart: function (t) {
                                            t.stopPropagation();
                                          },
                                          touchmove: function (t) {
                                            t.stopPropagation();
                                          },
                                          touchend: function (t) {
                                            t.stopPropagation();
                                          },
                                        },
                                      }),
                                      r("img", {
                                        attrs: { src: n(94323), alt: "" },
                                        on: {
                                          click: t.delNode,
                                          touchstart: function (t) {
                                            t.stopPropagation();
                                          },
                                          touchmove: function (t) {
                                            t.stopPropagation();
                                          },
                                          touchend: function (t) {
                                            t.stopPropagation();
                                          },
                                        },
                                      }),
                                    ]
                                  ),
                                  r("div", {
                                    staticClass: "writeReview_footer_Clear",
                                  }),
                                ]
                              ),
                            ]),
                          ]
                        ),
                      ]
                    ),
                  ]
                )
              : t._e();
          };
        Kt._withStripped = !0;
        var qt = {
            name: "readerIdeaFooter",
            data: function () {
              return {
                action: "create",
                closeBox: !1,
                writeBookReview: "",
                isShowMenu: !1,
                selectItemIndex: 0,
                showbtn: !0,
                flag: !0,
                ideaTypeList: [
                  {
                    type: "公开",
                    icon: "https://weread-1258476243.file.myqcloud.com/web/wrwebnjlogic/image/review_private_publish_2x.553e0bed.png",
                    dec: "所有人可看",
                  },
                  {
                    type: "关注",
                    icon: "https://weread-1258476243.file.myqcloud.com/web/wrwebnjlogic/image/review_private_follow_2x.27fd6f04.png",
                    dec: "仅互相关注可见",
                  },
                  {
                    type: "私密",
                    icon: "https://weread-1258476243.file.myqcloud.com/web/wrwebnjlogic/image/review_private_secret_2x.3f6de91e.png",
                    dec: "仅自己可见",
                  },
                ],
              };
            },
            methods: {
              editNode: function () {
                this.writeBookReview
                  ? (this.$emit(
                      "toWriteIdeaFoo",
                      "update",
                      this.writeBookReview
                    ),
                    this.closeIdeaBox())
                  : this.$toast("请输入想法内容");
              },
              delNode: function () {
                this.$emit("delNode");
              },
              closeIdeaBox: function () {
                (this.closeBox = !1),
                  (this.writeBookReview = ""),
                  this.$emit("toWriteIdeaFoo", "cancel", this.writeBookReview);
              },
              isIdeaBoxShow: function () {
                return this.closeBox;
              },
              textFocus: function () {
                document
                  .getElementsByClassName("writeReview_textarea")[0]
                  .focus();
              },
              openIdeaBox: function (t) {
                t && t.id && t.content
                  ? ((this.flag = !1), (this.writeBookReview = t.content))
                  : ((this.flag = !0), (this.writeBookReview = "")),
                  (this.action = t ? "update" : "create"),
                  (this.closeBox = !0);
              },
              publishIdea: function () {
                this.isShowMenu = !this.isShowMenu;
              },
              expressIdea: function () {
                this.writeBookReview &&
                  (this.$emit(
                    "toWriteIdeaFoo",
                    this.action,
                    this.writeBookReview
                  ),
                  this.closeIdeaBox());
              },
              selectMenuItem: function (t) {
                this.selectItemIndex = t;
              },
            },
          },
          Gt = qt,
          Vt = n(98378),
          Jt = n.n(Vt),
          Ht = {};
        (Ht.styleTagTransform = E()),
          (Ht.setAttributes = C()),
          (Ht.insert = w().bind(null, "head")),
          (Ht.domAPI = v()),
          (Ht.insertStyleElement = S());
        g()(Jt(), Ht), Jt() && Jt().locals && Jt().locals;
        var Zt = T(Gt, Kt, [], !1, null, "0d99d9be", null).exports;
        function Yt(t, e, n) {
          var r = {},
            o = 0,
            i = 0,
            a = 1;
          if (t && t.length > 0) {
            var c = "epub" == n && t.length > 1;
            c && e <= 1 && (e = 1);
            for (var u = 0, s = c ? 1 : 0; s < t.length; s++) {
              var A = t[s],
                f = 0;
              A.hasOwnProperty("length")
                ? (f = parseInt(A.length))
                : A.hasOwnProperty("character_count") &&
                  (f = parseInt(A.character_count)),
                0 === f && u++,
                (c &&
                  s > 0 &&
                  A.chapter_uri &&
                  -1 != A.chapter_uri.indexOf("#") &&
                  A.chapter_item &&
                  A.chapter_item == t[s - 1].chapter_item) ||
                  (e == s ? ((o += f), (i = f)) : e > s && (o += f), (a += f));
            }
            if (u >= 5) return r;
            (r.preChapterPercent = (1 * o - i) / a),
              (r.curChapterPercent = (1 * o) / a);
          }
          return r;
        }
        function Xt(t) {
          return (
            (Xt =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (t) {
                    return typeof t;
                  }
                : function (t) {
                    return t &&
                      "function" == typeof Symbol &&
                      t.constructor === Symbol &&
                      t !== Symbol.prototype
                      ? "symbol"
                      : typeof t;
                  }),
            Xt(t)
          );
        }
        function $t(t, e) {
          var n = Object.keys(t);
          if (Object.getOwnPropertySymbols) {
            var r = Object.getOwnPropertySymbols(t);
            e &&
              (r = r.filter(function (e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable;
              })),
              n.push.apply(n, r);
          }
          return n;
        }
        function te(t) {
          for (var e = 1; e < arguments.length; e++) {
            var n = null != arguments[e] ? arguments[e] : {};
            e % 2
              ? $t(Object(n), !0).forEach(function (e) {
                  ee(t, e, n[e]);
                })
              : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n))
              : $t(Object(n)).forEach(function (e) {
                  Object.defineProperty(
                    t,
                    e,
                    Object.getOwnPropertyDescriptor(n, e)
                  );
                });
          }
          return t;
        }
        function ee(t, e, n) {
          return (
            (e = (function (t) {
              var e = (function (t, e) {
                if ("object" != Xt(t) || !t) return t;
                var n = t[Symbol.toPrimitive];
                if (void 0 !== n) {
                  var r = n.call(t, e || "default");
                  if ("object" != Xt(r)) return r;
                  throw new TypeError(
                    "@@toPrimitive must return a primitive value."
                  );
                }
                return ("string" === e ? String : Number)(t);
              })(t, "string");
              return "symbol" == Xt(e) ? e : e + "";
            })(e)) in t
              ? Object.defineProperty(t, e, {
                  value: n,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (t[e] = n),
            t
          );
        }
        var ne = {
            name: "VerticleRead",
            data: function () {
              return {
                isShowIdeaToolbar: !1,
                isInterceptShowIdeaToolbar: !1,
                delNotesId: "",
                obj: {},
                curPageSize: 0,
                scrollPercent: 0,
                preChapterPercent: 0,
                curChapterPercent: 0,
              };
            },
            components: { ReaderToolbar: Ut, ReaderIdeaFooter: Zt },
            props: {
              catalogData: {
                type: Array,
                default: function () {
                  return [];
                },
              },
              chapterContent: {
                type: Array,
                default: function () {
                  return [];
                },
              },
              ebookId: {
                type: String,
                default: function () {
                  return "";
                },
              },
              loading: {
                type: Boolean,
                default: function () {
                  return !1;
                },
              },
              curChapterIndex: {
                type: [Number, String],
                default: function () {
                  return 0;
                },
              },
              anchorPosition: {
                type: Number,
                default: function () {
                  return 1;
                },
              },
              toAhorOnce: { type: Boolean, default: !1 },
              fontSize: Number,
              theme: Object,
              isFreeReadEnd: Boolean,
              contentBgColor: {
                type: String,
                default: function () {
                  return "";
                },
              },
              notesLineData: {
                type: Array,
                default: function () {
                  return [];
                },
              },
              notesData: {
                type: Array,
                default: function () {
                  return [];
                },
              },
              notePosition: {
                type: Object,
                default: function () {
                  return { x: "200px", y: "300px" };
                },
              },
              headerHeight: {
                type: Number,
                default: function () {
                  return 0;
                },
              },
            },
            computed: te(
              te(
                {},
                (0, a.Se)({
                  device: "device",
                  readTheme: "theme",
                  pageMaxWidth: "pageMaxWidth",
                  format: "format",
                })
              ),
              {},
              {
                showContent: function () {
                  var t = this,
                    e =
                      this.curChapterIndex <= ("epub" === this.format ? 1 : 0)
                        ? 0
                        : this.curChapterIndex;
                  return this.chapterContent.find(function (n) {
                    return (
                      n.chapter_index === t.curChapterIndex ||
                      n.chapter_index === e
                    );
                  });
                },
                themeStyle: function () {
                  return this.pageMaxWidth >= 900
                    ? "theme-"
                        .concat(this.theme.name, " theme-")
                        .concat(this.theme.name, "-pc")
                    : "theme-".concat(this.theme.name);
                },
                titleStyle: function () {
                  return this.pageMaxWidth >= 900 ? "titlePc" : "titleM";
                },
                pageNum: function () {
                  var t = this.scrollPercent;
                  if (
                    this.catalogData &&
                    this.catalogData.length > 0 &&
                    "number" == typeof this.preChapterPercent
                  ) {
                    if (
                      "txt" === this.format ||
                      "epub" === this.format ||
                      this.catalogData.length >= 400
                    )
                      return (
                        (
                          100 *
                          (this.preChapterPercent +
                            (this.curChapterPercent - this.preChapterPercent) *
                              t)
                        ).toFixed(2) + "%"
                      );
                    if (
                      0 == this.curChapterPercent &&
                      0 == this.preChapterPercent
                    )
                      return "";
                    if (0 == this.curPageSize) return "";
                    var e = Math.max(
                        Math.ceil(this.scrollPercent * this.curPageSize),
                        1
                      ),
                      n = Math.ceil(
                        this.curPageSize /
                          (this.curChapterPercent - this.preChapterPercent)
                      );
                    return e + Math.round(n * this.preChapterPercent) + "/" + n;
                  }
                  return "";
                },
              }
            ),
            mounted: function () {
              var t = Yt(this.catalogData, this.curChapterIndex, this.format);
              if (
                ((this.preChapterPercent = t.preChapterPercent),
                (this.curChapterPercent = t.curChapterPercent),
                !this.toAhorOnce)
              ) {
                var e = document.querySelector(".reader-chapter-content");
                if (!e || e.childElementCount < this.anchorPosition + 1) return;
                this.device.isPc
                  ? (document.getElementById("vertical-read").scrollTop = 0)
                  : (document.getElementById("vertical-read").scrollTop =
                      e.childNodes[this.anchorPosition].offsetTop);
              }
            },
            watch: {
              chapterContent: {
                handler: function () {
                  var t = this;
                  this.$nextTick(function () {
                    t.$nextTick(function () {
                      t.toAhorOnce ||
                        (document.getElementById("vertical-read").scrollTop =
                          t.anchorPosition);
                    });
                  });
                },
                deep: !0,
              },
              fontSize: function (t, e) {
                var n = this;
                this.$nextTick(function () {
                  n.$emit("fontSizeChange");
                });
              },
              showContent: function (t) {
                var e = this;
                this.$nextTick(function () {
                  (0, c.cF)("fromAnchor")
                    ? (0, c.L_)("fromAnchor")
                    : (document.getElementById("vertical-read").scrollTop = 0),
                    (null == t ? void 0 : t.content) &&
                      e.$emit("contentChanged");
                  var n = Yt(e.catalogData, e.curChapterIndex, e.format);
                  (e.preChapterPercent = n.preChapterPercent),
                    (e.curChapterPercent = n.curChapterPercent),
                    (e.curPageSize = 0),
                    setTimeout(function () {
                      var t = document.getElementById("vertical-read");
                      e.curPageSize = Math.ceil(
                        (t.scrollHeight - 120) / (t.clientHeight - 120)
                      );
                    }, 800);
                });
              },
            },
            methods: {
              delNode: function () {
                this.$emit("noteFoo", "delete", this.delNotesId),
                  this.$refs.readerIdeaBoxRef.closeIdeaBox();
              },
              openIdeaToolBar: function () {
                this.isShowIdeaToolbar = !0;
              },
              closeIdeaToolBar: function () {
                this.isShowIdeaToolbar = !1;
              },
              isIdeaToolBarShow: function () {
                return this.isShowIdeaToolbar;
              },
              openIdeaBox: function (t) {
                this.$refs.readerIdeaBoxRef.openIdeaBox(t);
              },
              isShowIdeaBox: function () {
                return this.$refs.readerIdeaBoxRef.isIdeaBoxShow();
              },
              openx: function (t) {
                t && (this.delNotesId = t.id),
                  this.$refs.readerIdeaBoxRef.openIdeaBox(t);
              },
              toUnderLine: function (t) {
                "cre" === t
                  ? this.$emit("noteFoo", "create", "")
                  : "del" === t &&
                    this.delNotesId &&
                    (this.$emit("noteFoo", "delete", this.delNotesId),
                    (this.delNotesId = "")),
                  this.$refs.readerIdeaBoxRef.closeIdeaBox();
              },
              delId: function () {
                this.obj = "";
              },
              toWriteIdeaFoo: function (t, e) {
                var n = this,
                  r = "";
                if ("cancel" !== t && this.delNotesId) {
                  var o = this.notesData.filter(function (t) {
                    return t.id === n.delNotesId;
                  });
                  r = {
                    from_offset_in_para: o[0].from_offset_in_para,
                    from_para_index: o[0].from_para_index,
                    id: o[0].id,
                    quote_text: o[0].quote_text,
                    to_offset_in_para: o[0].to_offset_in_para,
                    to_para_index: o[0].to_para_index,
                    content: e,
                  };
                }
                "update" === t && this.delNotesId
                  ? this.$emit("noteFoo", "update", this.delNotesId, e, r)
                  : "create" === t
                  ? this.$emit("noteFoo", "create", null, e)
                  : this.$emit("noteFoo", "cancel", null, e),
                  (this.delNotesId = "");
              },
              showCtrlTools: function () {
                window.innerWidth >= 1220 || this.isInterceptShowIdeaToolbar
                  ? (this.isInterceptShowIdeaToolbar = !1)
                  : this.$emit("showCtrlLayer");
              },
              hideCtrlTools: function () {
                this.$emit("showCtrlLayer", "off");
              },
              getPrevChapter: function (t) {
                this.$emit("changeChapter", t);
              },
              clickNoteLine: function (t, e) {
                (this.delNotesId = e.id),
                  this.$emit("hx", t, e),
                  (this.isInterceptShowIdeaToolbar = !0);
              },
              onScrollHandler: function (t) {
                var e = t.target.scrollTop,
                  n = t.target.clientHeight,
                  r = t.target.scrollHeight;
                (this.scrollPercent = 0 == e ? 0 : (e + ((e + n) / r) * n) / r),
                  (this.curPageSize = Math.ceil((r - 120) / (n - 120)));
              },
              getReadPercent: function () {
                var t = this.scrollPercent;
                return this.catalogData && this.catalogData.length > 0
                  ? "number" == typeof this.preChapterPercent
                    ? (
                        this.preChapterPercent +
                        (this.curChapterPercent - this.preChapterPercent) * t
                      ).toFixed(4)
                    : this.curChapterIndex / this.catalogData.length +
                      (1 * t) / this.catalogData.length
                  : 0;
              },
            },
          },
          re = ne,
          oe = n(91424),
          ie = n.n(oe),
          ae = {};
        (ae.styleTagTransform = E()),
          (ae.setAttributes = C()),
          (ae.insert = w().bind(null, "head")),
          (ae.domAPI = v()),
          (ae.insertStyleElement = S());
        g()(ie(), ae), ie() && ie().locals && ie().locals;
        var ce = T(re, Nt, [], !1, null, null, null).exports,
          ue = function () {
            var t,
              e = this,
              r = e.$createElement,
              o = e._self._c || r;
            return o(
              "div",
              {
                staticClass: "horizontal-read",
                class: { isIphoneFS: e.device.isIOS, night: e.theme.name },
                style: { color: e.theme.color + "!important" },
                attrs: { id: "horizontal-read" },
              },
              [
                o("div", { staticClass: "chapter-name" }, [
                  e._v(e._s(e.isFreeReadEnd ? "" : e.chapterName)),
                ]),
                e.showContent
                  ? o("div", {
                      staticClass: "horizontal-read-container",
                      class:
                        ((t = {
                          "no-transition":
                            e.isShowFromEnd || e.isTryReadEndingPage || !0,
                          isIphoneFS: e.device.isIOS,
                        }),
                        (t["fontSize-" + e.fontSize] = e.fontSize),
                        (t.night = "night" === e.readTheme),
                        t),
                      style: { height: e.containerHeight + "px" },
                      attrs: {
                        isfree: "" + e.showContent.can_read,
                        id: "horizontal-read-container",
                      },
                      domProps: { innerHTML: e._s(e.showContent.content) },
                    })
                  : e._e(),
                o("ReaderToolbar", {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value: e.isShowIdeaToolbar,
                      expression: "isShowIdeaToolbar",
                    },
                  ],
                  ref: "readerToolbarRef",
                  attrs: { notePosition: e.notePosition },
                  on: {
                    openIdeaBox: e.openIdeaBox,
                    closeIdeaToolBar: e.closeIdeaToolBar,
                    toUnderLine: e.toUnderLine,
                  },
                }),
                o("ReaderIdeaFooter", {
                  ref: "readerIdeaBoxRef",
                  on: { toWriteIdeaFoo: e.toWriteIdeaFoo, delNode: e.delNode },
                }),
                e._l(e.notesLineData, function (t, r) {
                  return o(
                    "div",
                    {
                      key: r,
                      staticClass: "notes-line",
                      style: {
                        top: t.top + "px",
                        width: t.width + "px",
                        height: t.height + "px",
                        left: t.left - (e.curPage - 1) * e.pageWidth + "px",
                      },
                      on: {
                        touchstart: e.disAllowTouchEvent,
                        click: function (n) {
                          return n.target !== n.currentTarget
                            ? null
                            : e.clickNoteLine(n, t);
                        },
                      },
                    },
                    [
                      !t.content ||
                      (r !== e.notesLineData.length - 1 &&
                        t.id === e.notesLineData[r + 1].id)
                        ? e._e()
                        : o("img", {
                            staticClass: "sp",
                            attrs: { src: n(3995) },
                            on: {
                              click: function (n) {
                                return e.openx(t);
                              },
                            },
                          }),
                    ]
                  );
                }),
                o(
                  "div",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: e.isRenderFinish,
                        expression: "isRenderFinish",
                      },
                    ],
                    staticClass: "chapter-page",
                  },
                  [e._v("\n    " + e._s(e.pageNum) + "\n  ")]
                ),
              ],
              2
            );
          };
        ue._withStripped = !0;
        var se = n(50840),
          Ae = n.n(se);
        function fe(t) {
          return (
            (fe =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (t) {
                    return typeof t;
                  }
                : function (t) {
                    return t &&
                      "function" == typeof Symbol &&
                      t.constructor === Symbol &&
                      t !== Symbol.prototype
                      ? "symbol"
                      : typeof t;
                  }),
            fe(t)
          );
        }
        function le(t, e) {
          var n = Object.keys(t);
          if (Object.getOwnPropertySymbols) {
            var r = Object.getOwnPropertySymbols(t);
            e &&
              (r = r.filter(function (e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable;
              })),
              n.push.apply(n, r);
          }
          return n;
        }
        function he(t) {
          for (var e = 1; e < arguments.length; e++) {
            var n = null != arguments[e] ? arguments[e] : {};
            e % 2
              ? le(Object(n), !0).forEach(function (e) {
                  de(t, e, n[e]);
                })
              : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n))
              : le(Object(n)).forEach(function (e) {
                  Object.defineProperty(
                    t,
                    e,
                    Object.getOwnPropertyDescriptor(n, e)
                  );
                });
          }
          return t;
        }
        function de(t, e, n) {
          return (
            (e = (function (t) {
              var e = (function (t, e) {
                if ("object" != fe(t) || !t) return t;
                var n = t[Symbol.toPrimitive];
                if (void 0 !== n) {
                  var r = n.call(t, e || "default");
                  if ("object" != fe(r)) return r;
                  throw new TypeError(
                    "@@toPrimitive must return a primitive value."
                  );
                }
                return ("string" === e ? String : Number)(t);
              })(t, "string");
              return "symbol" == fe(e) ? e : e + "";
            })(e)) in t
              ? Object.defineProperty(t, e, {
                  value: n,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (t[e] = n),
            t
          );
        }
        n(85524);
        var pe = {
            name: "HorizontalRead",
            components: { ReaderToolbar: Ut, ReaderIdeaFooter: Zt },
            props: {
              catalogData: {
                type: Array,
                default: function () {
                  return [];
                },
              },
              chapterContent: {
                type: Array,
                default: function () {
                  return [];
                },
              },
              ebookId: {
                type: String,
                default: function () {
                  return "";
                },
              },
              loading: {
                type: Boolean,
                default: function () {
                  return !1;
                },
              },
              curChapterIndex: {
                type: [Number, String],
                default: function () {
                  return 0;
                },
              },
              anchorPosition: {
                type: Number,
                default: function () {
                  return 1;
                },
              },
              notesLineData: {
                type: Array,
                default: function () {
                  return [];
                },
              },
              notesData: {
                type: Array,
                default: function () {
                  return [];
                },
              },
              notePosition: {
                type: Object,
                default: function () {
                  return { x: "200px", y: "300px" };
                },
              },
              toAhorOnce: { type: Boolean, default: !1 },
              headerHeight: {
                type: Number,
                default: function () {
                  return 0;
                },
              },
              fontSize: Number,
              theme: Object,
              isFreeReadEnd: Boolean,
            },
            data: function () {
              return {
                curPage: 1,
                totalPage: 1,
                pageWidth: this.vmWidth,
                isRenderFinish: !1,
                isShowFromEnd: !1,
                isShowIdeaToolbar: !1,
                intercepterTap: !1,
                delNotesId: "",
                obj: {},
                lastParaIndex: 0,
                preChapterPercent: 0,
                curChapterPercent: 0,
              };
            },
            computed: he(
              he(
                {},
                (0, a.Se)({
                  vmWidth: "vwW",
                  vmHeight: "vwH",
                  pageMaxWidth: "pageMaxWidth",
                  device: "device",
                  format: "format",
                  readTheme: "theme",
                })
              ),
              {},
              {
                showContent: function () {
                  var t = this,
                    e =
                      this.curChapterIndex <= ("epub" === this.format ? 1 : 0)
                        ? 0
                        : this.curChapterIndex;
                  return this.chapterContent.find(function (n) {
                    return (
                      n.chapter_index === t.curChapterIndex ||
                      n.chapter_index === e
                    );
                  });
                },
                isTryReadEndingPage: function () {
                  var t = this.chapterContent.length;
                  return (
                    this.isFreeReadEnd &&
                    this.showContent.chapter_id ===
                      this.chapterContent[t - 1].chapter_id
                  );
                },
                chapterName: function () {
                  return this.showContent ? this.showContent.name : "";
                },
                containerHeight: function () {
                  var t = window.innerHeight;
                  return (
                    "number" != typeof pageWidth &&
                      (t =
                        "CSS1Compat" === document.compatMode
                          ? document.documentElement.clientHeight
                          : window.body.clientHeight),
                    t - 56 - this.headerHeight
                  );
                },
                pageNum: function () {
                  if (
                    this.catalogData &&
                    this.catalogData.length > 0 &&
                    "number" == typeof this.preChapterPercent
                  ) {
                    var t = this.curPage / this.totalPage;
                    if (
                      "txt" === this.format ||
                      "epub" === this.format ||
                      this.catalogData.length >= 400
                    )
                      return (
                        (
                          100 *
                          (this.preChapterPercent +
                            (this.curChapterPercent - this.preChapterPercent) *
                              t)
                        ).toFixed(2) + "%"
                      );
                  }
                  return this.curPage + "/" + this.totalPage;
                },
              }
            ),
            mounted: function () {
              var t = this;
              (this.pageWidth =
                window.innerWidth > this.vmWidth
                  ? window.innerWidth
                  : this.vmWidth),
                (this.pageWidth = this.pageWidth > 1e3 ? 1e3 : this.pageWidth),
                setTimeout(function () {
                  t.initTotalPage();
                }, 180),
                !this.manager && this.bindTouchEvent(),
                document.addEventListener("keyup", function (e) {
                  if (37 === e.keyCode || "ArrowLeft" === e.key) {
                    if (((t.curPage -= 1), t.curPage < 1))
                      return (
                        (t.curPage = 1),
                        (t.isShowFromEnd = !0),
                        void t.$emit("changeChapter", "prev")
                      );
                    t.goPage();
                  } else if (39 === e.keyCode || "ArrowRight" === e.key) {
                    if (t.isTryReadEndingPage) return;
                    if (((t.curPage += 1), t.curPage > t.totalPage))
                      return (
                        (t.curPage = t.totalPage),
                        void t.$emit("changeChapter", "next")
                      );
                    t.goPage();
                  }
                });
            },
            methods: {
              bindTouchEvent: function () {
                var t = this,
                  e = document.querySelector("#horizontal-read"),
                  n = Math.floor(this.vmWidth / 3),
                  r = Math.ceil((this.vmWidth / 3) * 2);
                this.manager = new (Ae().Manager)(e);
                var o = new (Ae().Swipe)(),
                  i = new (Ae().Tap)({ taps: 1 });
                this.manager.add(o),
                  this.manager.add(i),
                  this.manager.on("swipe", function (e) {
                    var n = e.offsetDirection;
                    t.slideFn(n), t.$emit("showCtrlLayer", "off");
                  }),
                  this.manager.on("tap", function (o) {
                    if (t.intercepterTap || t.isShowIdeaToolbar)
                      t.intercepterTap = !1;
                    else if (!t.isShowIdeaBox()) {
                      var i = o.center.x,
                        a = (i -= e.offsetLeft) <= n ? 4 : i >= r ? 2 : 5;
                      5 !== a
                        ? (t.slideFn(a), t.$emit("showCtrlLayer", "off"))
                        : t.$emit("showCtrlLayer");
                    }
                  });
              },
              initTotalPage: function () {
                var t = this,
                  e = document.querySelector("#horizontal-read-container");
                if (e) {
                  var n = Yt(
                    this.catalogData,
                    this.curChapterIndex,
                    this.format
                  );
                  (this.preChapterPercent = n.preChapterPercent),
                    (this.curChapterPercent = n.curChapterPercent),
                    (this.isRenderFinish = !0);
                  var r = e.scrollWidth;
                  (this.totalPage = Math.ceil(r / this.pageWidth)),
                    this.isShowFromEnd
                      ? ((this.curPage = this.totalPage),
                        this.goPage(),
                        setTimeout(function () {
                          t.isShowFromEnd = !1;
                        }, 300))
                      : ((this.curPage = 1), this.goPage()),
                    this.$nextTick(function () {
                      if (
                        (t.toAhorOnce || (t.lastParaIndex = t.anchorPosition),
                        t.lastParaIndex)
                      ) {
                        var e = document.getElementById(
                          "horizontal-read-container"
                        );
                        if (!e || e.childElementCount < t.lastParaIndex + 1)
                          return;
                        (t.curPage =
                          Math.floor(
                            e.childNodes[t.lastParaIndex].offsetLeft /
                              t.pageWidth
                          ) + 1),
                          t.$nextTick(function () {
                            t.goPage();
                          }),
                          (t.lastParaIndex = 0);
                      }
                    });
                }
              },
              slideFn: function (t) {
                if (2 === t) {
                  if (this.isTryReadEndingPage) return;
                  if (((this.curPage += 1), this.curPage > this.totalPage))
                    return (
                      (this.curPage = this.totalPage),
                      void this.$emit("changeChapter", "next")
                    );
                }
                if (4 === t && ((this.curPage -= 1), this.curPage < 1))
                  return (
                    (this.curPage = 1),
                    (this.isShowFromEnd = !0),
                    void this.$emit("changeChapter", "prev")
                  );
                this.goPage();
              },
              goPage: function () {
                var t = document.querySelector("#horizontal-read-container"),
                  e =
                    "translate3d(" +
                    this.pageWidth * (this.curPage - 1) * -1 +
                    "px, 0, 0)";
                if (t) {
                  var n = this.pageWidth * this.curPage,
                    r = "",
                    o = this.showContent.anchors
                      ? this.showContent.anchors.length
                      : 0;
                  if (o > 0)
                    for (var i = 0; i < o; i++) {
                      var a = this.showContent.anchors[i],
                        c = this.showContent.anchors[i + 1]
                          ? this.showContent.anchors[i + 1]
                          : "",
                        u =
                          document.getElementById(a) ||
                          document.getElementsByName(a)[0],
                        s = c
                          ? document.getElementById(c) ||
                            document.getElementsByName(c)[0]
                          : "";
                      if (!u) break;
                      if (
                        s &&
                        u.offsetLeft <= Math.abs(n) &&
                        Math.abs(n) < s.offsetLeft
                      ) {
                        r = a;
                        break;
                      }
                      if (!s && u.offsetLeft <= Math.abs(n)) {
                        r = a;
                        break;
                      }
                    }
                  var A =
                    Math.floor((this.curPage / this.totalPage) * 100) / 100;
                  (t.style.transform = e),
                    this.$emit(
                      "changePage",
                      this.showContent.chapter_id,
                      r,
                      A,
                      this.curPage
                    );
                }
              },
              delNode: function () {
                this.$emit("noteFoo", "delete", this.delNotesId),
                  this.$refs.readerIdeaBoxRef.closeIdeaBox();
              },
              openIdeaToolBar: function () {
                this.isShowIdeaToolbar = !0;
              },
              closeIdeaToolBar: function () {
                this.isShowIdeaToolbar = !1;
              },
              isIdeaToolBarShow: function () {
                return (
                  (this.intercepterTap =
                    this.intercepterTap || this.isShowIdeaToolbar),
                  this.isShowIdeaToolbar
                );
              },
              openIdeaBox: function (t) {
                this.$refs.readerIdeaBoxRef.openIdeaBox(t);
              },
              isShowIdeaBox: function () {
                return this.$refs.readerIdeaBoxRef.isIdeaBoxShow();
              },
              openx: function (t) {
                t && (this.delNotesId = t.id),
                  this.$refs.readerIdeaBoxRef.openIdeaBox(t);
              },
              toUnderLine: function (t) {
                "cre" === t
                  ? this.$emit("noteFoo", "create", "")
                  : "del" === t &&
                    this.delNotesId &&
                    (this.$emit("noteFoo", "delete", this.delNotesId),
                    (this.delNotesId = "")),
                  this.$refs.readerIdeaBoxRef.closeIdeaBox();
              },
              delId: function () {
                this.obj = "";
              },
              toWriteIdeaFoo: function (t, e) {
                var n = this,
                  r = "";
                if ("cancel" !== t && this.delNotesId) {
                  var o = this.notesData.filter(function (t) {
                    return t.id === n.delNotesId;
                  });
                  r = {
                    from_offset_in_para: o[0].from_offset_in_para,
                    from_para_index: o[0].from_para_index,
                    id: o[0].id,
                    quote_text: o[0].quote_text,
                    to_offset_in_para: o[0].to_offset_in_para,
                    to_para_index: o[0].to_para_index,
                    content: e,
                  };
                }
                "update" === t && this.delNotesId
                  ? this.$emit("noteFoo", "update", this.delNotesId, e, r)
                  : "create" === t
                  ? this.$emit("noteFoo", "create", null, e)
                  : this.$emit("noteFoo", "cancel", null, e),
                  (this.delNotesId = "");
              },
              disAllowTouchEvent: function () {
                this.intercepterTap = !0;
              },
              clickNoteLine: function (t, e) {
                (this.intercepterTap = !0),
                  (this.delNotesId = e.id),
                  this.$emit("hx", t, e);
              },
              getReadPercent: function () {
                var t = this.curPage / this.totalPage;
                return this.catalogData && this.catalogData.length > 0
                  ? "number" == typeof this.preChapterPercent
                    ? (
                        this.preChapterPercent +
                        (this.curChapterPercent - this.preChapterPercent) * t
                      ).toFixed(4)
                    : this.curChapterIndex / this.catalogData.length +
                      (1 * t) / this.catalogData.length
                  : 0;
              },
            },
            watch: {
              showContent: {
                handler: function (t) {
                  var e = this;
                  this.isRenderFinish = !1;
                  var n = document.querySelector("#horizontal-read-container");
                  if (n) {
                    n.style.transform = "translate3d(0px, 0, 0)";
                  }
                  this.$nextTick(function () {
                    !e.manager && e.bindTouchEvent(),
                      setTimeout(function () {
                        e.initTotalPage();
                      }, 180),
                      (null == t ? void 0 : t.content) &&
                        e.$emit("contentChanged");
                  });
                },
                deep: !0,
              },
              fontSize: function (t, e) {
                var n = this;
                t !== e &&
                  this.$nextTick(function () {
                    (n.lastParaIndex = window.getStartParaIdx()),
                      setTimeout(function () {
                        n.initTotalPage();
                      }, 180),
                      n.$emit("fontSizeChange");
                  });
              },
              toAhorOnce: function (t, e) {
                var n = this;
                if (!t) {
                  var r = document.getElementById("horizontal-read-container");
                  if (!r || r.childElementCount < this.anchorPosition + 1)
                    return;
                  (this.curPage =
                    Math.floor(
                      r.childNodes[this.anchorPosition].offsetLeft /
                        this.pageWidth
                    ) + 1),
                    this.$nextTick(function () {
                      n.goPage();
                    });
                }
              },
              curPage: function (t, e) {
                window.curPage = t;
              },
            },
          },
          ge = pe,
          me = n(10929),
          ve = n.n(me),
          ye = {};
        (ye.styleTagTransform = E()),
          (ye.setAttributes = C()),
          (ye.insert = w().bind(null, "head")),
          (ye.domAPI = v()),
          (ye.insertStyleElement = S());
        g()(ve(), ye), ve() && ve().locals && ve().locals;
        var we = T(ge, ue, [], !1, null, null, null).exports,
          be = function () {
            var t,
              e = this,
              n = e.$createElement,
              r = e._self._c || n;
            return r(
              "div",
              {
                staticClass: "reader-footer",
                class:
                  ((t = {
                    active: e.isCtrlLayerShow,
                    isIphoneFS: e.device.isIOS,
                  }),
                  (t["theme-" + e.theme] = e.theme),
                  t),
              },
              [
                r("ul", { staticClass: "ctrl-items-list" }, [
                  r(
                    "li",
                    {
                      on: {
                        click: function (t) {
                          return (
                            t.preventDefault(),
                            t.stopPropagation(),
                            e.showCatalog.apply(null, arguments)
                          );
                        },
                      },
                    },
                    [
                      r("span", { staticClass: "icon icon-catalog" }),
                      r("span", { staticClass: "tab-name" }, [e._v("目录")]),
                    ]
                  ),
                  e.showNoteMenu()
                    ? r(
                        "li",
                        {
                          on: {
                            click: function (t) {
                              return (
                                t.preventDefault(),
                                t.stopPropagation(),
                                e.showCatalogx.apply(null, arguments)
                              );
                            },
                          },
                        },
                        [
                          r("span", { staticClass: "icon icon-idea" }),
                          r("span", { staticClass: "tab-name" }, [
                            e._v("想法"),
                          ]),
                        ]
                      )
                    : e._e(),
                  e.showHome
                    ? r(
                        "li",
                        {
                          on: {
                            click: function (t) {
                              return (
                                t.preventDefault(),
                                t.stopPropagation(),
                                e.onClickHome.apply(null, arguments)
                              );
                            },
                          },
                        },
                        [
                          r("span", { staticClass: "icon icon-home" }),
                          r("span", { staticClass: "tab-name" }, [
                            e._v("首页"),
                          ]),
                        ]
                      )
                    : e._e(),
                  e.showTTSMenu()
                    ? r(
                        "li",
                        {
                          on: {
                            click: function (t) {
                              return (
                                t.preventDefault(),
                                t.stopPropagation(),
                                e.ttsMenuAction.apply(null, arguments)
                              );
                            },
                          },
                        },
                        [
                          r("span", { staticClass: "icon icon-tts" }),
                          r("span", { staticClass: "tab-name" }, [
                            e._v("朗读"),
                          ]),
                        ]
                      )
                    : e._e(),
                  r(
                    "li",
                    {
                      on: {
                        click: function (t) {
                          return (
                            t.preventDefault(),
                            t.stopPropagation(),
                            e.showSettings.apply(null, arguments)
                          );
                        },
                      },
                    },
                    [
                      r("span", { staticClass: "icon icon-setting" }),
                      r("span", { staticClass: "tab-name" }, [e._v("设置")]),
                    ]
                  ),
                ]),
                r("setting", {
                  attrs: { "is-setting-show": e.isSettingShow },
                  on: { changeTheme: e.changeTheme },
                }),
              ],
              1
            );
          };
        be._withStripped = !0;
        var Ce = function () {
          var t,
            e = this,
            n = e.$createElement,
            r = e._self._c || n;
          return r(
            "div",
            {
              staticClass: "reader-setting",
              class:
                ((t = { active: e.isSettingShow }),
                (t["theme-" + e.theme] = e.theme),
                (t.isIphoneFS = e.device.isIOS),
                t),
              on: {
                touchstart: function (t) {
                  t.stopPropagation();
                },
                touchendend: function (t) {
                  t.stopPropagation();
                },
              },
            },
            [
              r(
                "div",
                { staticClass: "setting-inner-wrap" },
                [
                  r("slider", {
                    attrs: {
                      "show-value": e.slideValue,
                      step: e.step,
                      min: e.min,
                      max: e.max,
                    },
                    on: { valueChange: e.valueChange },
                  }),
                  r(
                    "div",
                    { staticClass: "reader-theme-wrap" },
                    e._l(e.themeData, function (t) {
                      var n;
                      return r("div", {
                        key: t.name,
                        staticClass: "theme-unit",
                        class: ((n = {}), (n["theme-" + t.name] = t.name), n),
                        style: {
                          "background-color": t.bgColor,
                          "border-color":
                            e.theme === t.name
                              ? t.selectedBorderColor
                              : t.bgColor,
                        },
                        on: {
                          click: function (n) {
                            return e.changeTheme(t);
                          },
                        },
                      });
                    }),
                    0
                  ),
                  r("div", { staticClass: "reader-style-set" }, [
                    r(
                      "div",
                      {
                        staticClass: "reader-style-theme",
                        class: { active: 1 === e.readStyle },
                        on: {
                          click: function (t) {
                            return e.setReaderStyle(1);
                          },
                          touchstart: function (t) {
                            return e.setReaderStyle(1);
                          },
                        },
                      },
                      [e._v("\n        上下翻页\n      ")]
                    ),
                    r(
                      "div",
                      {
                        staticClass: "reader-style-theme",
                        class: { active: 2 === e.readStyle },
                        on: {
                          click: function (t) {
                            return e.setReaderStyle(2);
                          },
                          touchstart: function (t) {
                            return e.setReaderStyle(2);
                          },
                        },
                      },
                      [e._v("\n        左右翻页\n      ")]
                    ),
                  ]),
                ],
                1
              ),
            ]
          );
        };
        Ce._withStripped = !0;
        var Ie = function () {
          var t = this,
            e = t.$createElement,
            n = t._self._c || e;
          return n(
            "div",
            {
              staticClass: "reader-slider",
              class: [t.themeStyle, { "side-style": "side" === t.uniqueKey }],
              attrs: { id: "reader-slide_" + t.uniqueKey },
            },
            [
              n("div", { staticClass: "reader-slider-txt" }, [
                n("div", {
                  staticClass: "sLetter",
                  on: {
                    click: function (e) {
                      return (
                        e.stopPropagation(),
                        e.preventDefault(),
                        t.handleFontSize(0)
                      );
                    },
                  },
                }),
                n("div", {
                  staticClass: "CLetter",
                  on: {
                    click: function (e) {
                      return (
                        e.stopPropagation(),
                        e.preventDefault(),
                        t.handleFontSize(1)
                      );
                    },
                  },
                }),
              ]),
              n(
                "div",
                {
                  staticClass: "reader-slider-inner",
                  attrs: { id: "reader-slider-inner_" + t.uniqueKey },
                },
                [
                  n("div", { staticClass: "reader-slider-bg" }),
                  n("div", {
                    staticClass: "reader-slider-runner",
                    style: "width: " + t.getRunnerWidth + "px",
                  }),
                  n(
                    "div",
                    {
                      staticClass: "reader-slider-seprators",
                      style: { padding: "0 " + t.getMin + "%" },
                    },
                    t._l(t.hightlightLine, function (e) {
                      return n("div", {
                        key: e,
                        staticClass: "line",
                        class: { active: e < t.highlightNumbers },
                      });
                    }),
                    0
                  ),
                  n("div", {
                    staticClass: "slide-move",
                    attrs: { id: "slideMove_" + t.uniqueKey },
                  }),
                  n("div", {
                    staticClass: "reader-slider-thumb",
                    style: "left:" + t.getShowValue + "%",
                    attrs: { id: "reader-slider-thumb_" + t.uniqueKey },
                  }),
                ]
              ),
            ]
          );
        };
        function Se(t) {
          return (
            (Se =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (t) {
                    return typeof t;
                  }
                : function (t) {
                    return t &&
                      "function" == typeof Symbol &&
                      t.constructor === Symbol &&
                      t !== Symbol.prototype
                      ? "symbol"
                      : typeof t;
                  }),
            Se(t)
          );
        }
        function xe(t, e) {
          var n = Object.keys(t);
          if (Object.getOwnPropertySymbols) {
            var r = Object.getOwnPropertySymbols(t);
            e &&
              (r = r.filter(function (e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable;
              })),
              n.push.apply(n, r);
          }
          return n;
        }
        function Ee(t) {
          for (var e = 1; e < arguments.length; e++) {
            var n = null != arguments[e] ? arguments[e] : {};
            e % 2
              ? xe(Object(n), !0).forEach(function (e) {
                  _e(t, e, n[e]);
                })
              : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n))
              : xe(Object(n)).forEach(function (e) {
                  Object.defineProperty(
                    t,
                    e,
                    Object.getOwnPropertyDescriptor(n, e)
                  );
                });
          }
          return t;
        }
        function _e(t, e, n) {
          return (
            (e = (function (t) {
              var e = (function (t, e) {
                if ("object" != Se(t) || !t) return t;
                var n = t[Symbol.toPrimitive];
                if (void 0 !== n) {
                  var r = n.call(t, e || "default");
                  if ("object" != Se(r)) return r;
                  throw new TypeError(
                    "@@toPrimitive must return a primitive value."
                  );
                }
                return ("string" === e ? String : Number)(t);
              })(t, "string");
              return "symbol" == Se(e) ? e : e + "";
            })(e)) in t
              ? Object.defineProperty(t, e, {
                  value: n,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (t[e] = n),
            t
          );
        }
        Ie._withStripped = !0;
        var Be = {
            name: "Slider",
            props: {
              uniqueKey: {
                type: String,
                default: function () {
                  return "default";
                },
              },
              showValue: {
                type: Number,
                default: function () {
                  return 10;
                },
              },
              step: {
                type: Number,
                default: function () {
                  return 1;
                },
              },
              min: {
                type: Number,
                default: function () {
                  return 0;
                },
              },
              max: {
                type: Number,
                default: function () {
                  return 100;
                },
              },
            },
            data: function () {
              return { wrapWidth: 0, hightlightLine: [0, 1, 2, 3, 4, 5, 6] };
            },
            computed: Ee(
              Ee(
                {},
                (0, a.Se)({
                  theme: "theme",
                  fontSize: "fontSize",
                  device: "device",
                  currentWinWidth: "currentWinWidth",
                  pageMaxWidth: "pageMaxWidth",
                })
              ),
              {},
              {
                runnerWidth: function () {
                  return Math.round((this.wrapWidth * this.showValue) / 100);
                },
                highlightNumbers: function () {
                  return Math.ceil((this.showValue - this.min) / this.step);
                },
                themeStyle: function () {
                  return "theme-".concat(this.theme);
                },
                getfontChangeId: function () {
                  return this.$store.state.fontSize;
                },
                getShowValue: function () {
                  if (document.body.clientWidth >= 768)
                    switch (this.getfontChangeId) {
                      case 0:
                        return this.showValue - 4;
                      case 6:
                        return this.showValue + 4;
                    }
                  return this.showValue;
                },
                getRunnerWidth: function () {
                  if (document.body.clientWidth >= 768)
                    switch (this.getfontChangeId) {
                      case 0:
                        return 20;
                      case 6:
                        return this.runnerWidth + 30;
                    }
                  return this.runnerWidth;
                },
                getMin: function () {
                  return document.body.clientWidth >= 1220
                    ? this.min - 3
                    : this.min;
                },
              }
            ),
            mounted: function () {
              this.bindEvent();
            },
            watch: {
              currentWinWidth: function (t) {
                this.refreshData();
              },
            },
            methods: {
              bindEvent: function () {
                var t = this,
                  e = document.querySelector(
                    "#slideMove_".concat(this.uniqueKey)
                  ),
                  n = document.querySelector(
                    "#reader-slider-thumb_".concat(this.uniqueKey)
                  );
                (this.wrapWidth = e.clientWidth),
                  (this.wrapOffsetLeft = document
                    .querySelector(
                      "#reader-slider-inner_".concat(this.uniqueKey)
                    )
                    .getBoundingClientRect().left),
                  (this.managerSliderBar = new (Ae().Manager)(e)),
                  (this.mangerThumb = new (Ae().Manager)(n));
                var r = new (Ae().Pan)({
                  direction: Ae().DIRECTION_ALL,
                  threshold: 0,
                });
                this.mangerThumb.add(r);
                var o = this.device.isPc ? "mousedown" : "touchstart",
                  i = !1;
                (this.outWrapperOffsetLeft = 0),
                  this.device.isPc &&
                    (this.wrapOffsetLeft -= this.outWrapperOffsetLeft),
                  e.addEventListener(
                    o,
                    function (e) {
                      e.preventDefault(),
                        "mousedown" === o && (i = !0),
                        t.device.isPc &&
                          t.wrapOffsetLeft !==
                            document
                              .querySelector(
                                "#reader-slider-inner_".concat(t.uniqueKey)
                              )
                              .getBoundingClientRect().left &&
                          ((t.outWrapperOffsetLeft = 0),
                          (t.wrapOffsetLeft = document
                            .querySelector(
                              "#reader-slider-inner_".concat(t.uniqueKey)
                            )
                            .getBoundingClientRect().left),
                          (t.wrapOffsetLeft -= t.outWrapperOffsetLeft));
                      var n,
                        r = t.device.isPc
                          ? e.clientX - t.outWrapperOffsetLeft
                          : e.changedTouches[0].clientX;
                      (n = t.device.isPc
                        ? t.handleDistance(r - t.wrapOffsetLeft)
                        : t.handleLimitValue(
                            (Math.round(r - t.wrapOffsetLeft) / t.wrapWidth) *
                              100
                          )),
                        t.$emit("valueChange", {
                          value: n,
                          id: Math.floor((n - t.min) / t.step),
                          type: !t.device.isPc && t.pageMaxWidth < 1e3 ? 0 : 1,
                        });
                    },
                    !1
                  ),
                  e.addEventListener(
                    "touchmove",
                    function (e) {
                      e.preventDefault();
                      var n = e.changedTouches[0].clientX,
                        r = t.handleLimitValue(
                          Math.round(
                            ((n - t.wrapOffsetLeft) / t.wrapWidth) * 100
                          )
                        );
                      t.$emit("valueChange", {
                        value: r,
                        id: Math.floor((r - t.min) / t.step),
                        type: 0,
                      });
                    },
                    !1
                  );
                var a = this.device.isPc ? "mouseout" : "touchend";
                e.addEventListener(
                  a,
                  function (e) {
                    if ("mouseout" !== a || i) {
                      "mouseout" === a && (i = !1), e.preventDefault();
                      var n = t.device.isPc
                          ? e.clientX - t.outWrapperOffsetLeft
                          : e.changedTouches[0].clientX,
                        r = t.handleLimitValue(
                          t.handleDistance(n - t.wrapOffsetLeft)
                        );
                      (t.device.isPc &&
                        (navigator.userAgent.indexOf("iPhone") < 0 ||
                          navigator.userAgent.indexOf("Anroid") < 0)) ||
                        t.$emit("valueChange", {
                          value: r,
                          id: Math.floor((r - t.min) / t.step),
                          type: 1,
                        });
                    }
                  },
                  !1
                ),
                  this.mangerThumb.on("panmove", function (e) {
                    e.preventDefault();
                    var n =
                        e.center.x - t.wrapOffsetLeft - t.outWrapperOffsetLeft,
                      r = t.handleLimitValue(
                        Math.round((n / t.wrapWidth) * 100)
                      );
                    t.$emit("valueChange", {
                      value: r,
                      id: Math.floor((r - t.min) / t.step),
                      type: 0,
                    });
                  }),
                  this.mangerThumb.on("panend pancancel", function (e) {
                    e.preventDefault();
                    var n =
                        e.center.x - t.wrapOffsetLeft - t.outWrapperOffsetLeft,
                      r = t.handleDistance(n);
                    t.$emit("valueChange", {
                      value: r,
                      id: Math.floor((r - t.min) / t.step),
                      type: 1,
                    });
                  });
              },
              refreshData: function () {
                var t = this;
                this.$nextTick(function () {
                  t.wrapOffsetLeft = document
                    .querySelector("#reader-slider-inner_".concat(t.uniqueKey))
                    .getBoundingClientRect().left;
                  var e = document.querySelector(
                    "#slideMove_".concat(t.uniqueKey)
                  );
                  (t.wrapWidth = e.clientWidth),
                    t.device.isPc &&
                      (t.wrapOffsetLeft -= t.outWrapperOffsetLeft);
                });
              },
              handleFontSize: function (t) {
                var e = 50,
                  n = this.showValue;
                n < this.min && (n = this.min),
                  0 === t
                    ? (e = n - this.step) < this.min && (e = this.min)
                    : (e = n + this.step) > this.max && (e = this.max),
                  this.$emit("valueChange", {
                    value: e,
                    id: Math.floor((e - this.min) / this.step),
                    type: 1,
                  });
              },
              handleDistance: function (t) {
                var e = Math.round((t / this.wrapWidth) * 100),
                  n = Math.round((e - this.min) / this.step);
                return (e = this.handleLimitValue(this.step * n + this.min));
              },
              handleLimitValue: function (t) {
                return (
                  t < this.min && (t = this.min),
                  t > this.max && (t = this.max),
                  t
                );
              },
            },
          },
          ke = Be,
          Te = n(37158),
          De = n.n(Te),
          Oe = {};
        (Oe.styleTagTransform = E()),
          (Oe.setAttributes = C()),
          (Oe.insert = w().bind(null, "head")),
          (Oe.domAPI = v()),
          (Oe.insertStyleElement = S());
        g()(De(), Oe), De() && De().locals && De().locals;
        var Pe = T(ke, Ie, [], !1, null, null, null).exports;
        function Me(t) {
          return (
            (Me =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (t) {
                    return typeof t;
                  }
                : function (t) {
                    return t &&
                      "function" == typeof Symbol &&
                      t.constructor === Symbol &&
                      t !== Symbol.prototype
                      ? "symbol"
                      : typeof t;
                  }),
            Me(t)
          );
        }
        function je(t, e) {
          var n = Object.keys(t);
          if (Object.getOwnPropertySymbols) {
            var r = Object.getOwnPropertySymbols(t);
            e &&
              (r = r.filter(function (e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable;
              })),
              n.push.apply(n, r);
          }
          return n;
        }
        function Le(t) {
          for (var e = 1; e < arguments.length; e++) {
            var n = null != arguments[e] ? arguments[e] : {};
            e % 2
              ? je(Object(n), !0).forEach(function (e) {
                  Ne(t, e, n[e]);
                })
              : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n))
              : je(Object(n)).forEach(function (e) {
                  Object.defineProperty(
                    t,
                    e,
                    Object.getOwnPropertyDescriptor(n, e)
                  );
                });
          }
          return t;
        }
        function Ne(t, e, n) {
          return (
            (e = (function (t) {
              var e = (function (t, e) {
                if ("object" != Me(t) || !t) return t;
                var n = t[Symbol.toPrimitive];
                if (void 0 !== n) {
                  var r = n.call(t, e || "default");
                  if ("object" != Me(r)) return r;
                  throw new TypeError(
                    "@@toPrimitive must return a primitive value."
                  );
                }
                return ("string" === e ? String : Number)(t);
              })(t, "string");
              return "symbol" == Me(e) ? e : e + "";
            })(e)) in t
              ? Object.defineProperty(t, e, {
                  value: n,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (t[e] = n),
            t
          );
        }
        var ze = {
            name: "Setting",
            props: { isSettingShow: Boolean },
            data: function () {
              return {
                slideValue: 50,
                step: 14.6,
                min: 6,
                max: 94,
                themeData: u,
              };
            },
            components: { Slider: Pe },
            computed: Le(
              {},
              (0, a.Se)({
                fontSize: "fontSize",
                theme: "theme",
                readStyle: "readStyle",
                device: "device",
                ebookId: "ebookId",
              })
            ),
            created: function () {
              (this.slideValue = this.min + this.fontSize * this.step),
                this.fontSize < 0 && (this.slideValue = this.min - 0.2);
            },
            watch: {},
            methods: Le(
              Le(
                {},
                (0, a.OI)({
                  setFontSize: "SET_FONT_SIZE",
                  setReadStyle: "SET_READ_STYLE",
                })
              ),
              {},
              {
                valueChange: function (t) {
                  var e = this;
                  if (
                    (t.id < 0
                      ? (this.slideValue = this.min - 0.2)
                      : (this.slideValue = t.value),
                    1 === t.type)
                  ) {
                    var n = [
                        { click_type: 85, res_name: "字号-".concat(t.id + 1) },
                      ],
                      r = this.ebookId;
                    (0, j.qF)(r, n),
                      this.timer && clearTimeout(this.timer),
                      (this.timer = setTimeout(function () {
                        e.setFontSize(t.id);
                      }, 300));
                  }
                },
                changeTheme: function (t) {
                  var e = [
                      { click_type: 85, res_name: "背景色-".concat(t.name) },
                    ],
                    n = this.ebookId;
                  (0, j.qF)(n, e),
                    this.$store.dispatch("updateTheme", t.name),
                    this.$emit("changeTheme", t.name);
                },
                setReaderStyle: function (t) {
                  this.setReadStyle(t);
                },
              }
            ),
          },
          Qe = ze,
          Re = n(63184),
          We = n.n(Re),
          Fe = {};
        (Fe.styleTagTransform = E()),
          (Fe.setAttributes = C()),
          (Fe.insert = w().bind(null, "head")),
          (Fe.domAPI = v()),
          (Fe.insertStyleElement = S());
        g()(We(), Fe), We() && We().locals && We().locals;
        var Ue = T(Qe, Ce, [], !1, null, null, null).exports;
        function Ke(t) {
          return (
            (Ke =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (t) {
                    return typeof t;
                  }
                : function (t) {
                    return t &&
                      "function" == typeof Symbol &&
                      t.constructor === Symbol &&
                      t !== Symbol.prototype
                      ? "symbol"
                      : typeof t;
                  }),
            Ke(t)
          );
        }
        function qe(t, e) {
          var n = Object.keys(t);
          if (Object.getOwnPropertySymbols) {
            var r = Object.getOwnPropertySymbols(t);
            e &&
              (r = r.filter(function (e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable;
              })),
              n.push.apply(n, r);
          }
          return n;
        }
        function Ge(t) {
          for (var e = 1; e < arguments.length; e++) {
            var n = null != arguments[e] ? arguments[e] : {};
            e % 2
              ? qe(Object(n), !0).forEach(function (e) {
                  Ve(t, e, n[e]);
                })
              : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n))
              : qe(Object(n)).forEach(function (e) {
                  Object.defineProperty(
                    t,
                    e,
                    Object.getOwnPropertyDescriptor(n, e)
                  );
                });
          }
          return t;
        }
        function Ve(t, e, n) {
          return (
            (e = (function (t) {
              var e = (function (t, e) {
                if ("object" != Ke(t) || !t) return t;
                var n = t[Symbol.toPrimitive];
                if (void 0 !== n) {
                  var r = n.call(t, e || "default");
                  if ("object" != Ke(r)) return r;
                  throw new TypeError(
                    "@@toPrimitive must return a primitive value."
                  );
                }
                return ("string" === e ? String : Number)(t);
              })(t, "string");
              return "symbol" == Ke(e) ? e : e + "";
            })(e)) in t
              ? Object.defineProperty(t, e, {
                  value: n,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (t[e] = n),
            t
          );
        }
        var Je = {
            name: "Footer",
            props: { isCtrlLayerShow: Boolean },
            data: function () {
              return {
                isSettingShow: !1,
                showHome: "1" != this.$route.query.noHome,
              };
            },
            computed: Ge(
              {},
              (0, a.Se)({
                buyState: "buyState",
                ebookId: "ebookId",
                device: "device",
                theme: "theme",
              })
            ),
            components: { Setting: Ue },
            watch: {
              isCtrlLayerShow: function (t) {
                !t && this.isSettingShow && (this.isSettingShow = !1);
              },
            },
            methods: Ge(
              Ge({}, (0, a.OI)({ setBuyState: "SET_BUY_STATE" })),
              {},
              {
                showNoteMenu: function () {
                  return (0, Y.ej)("_tob_tk_u_");
                },
                showTTSMenu: function () {
                  return (0, Y.ej)("team_id") || (0, Y.ej)("_tob_tk_u_");
                },
                showCatalog: function () {
                  this.$emit("showCatalog");
                },
                showCatalogx: function () {
                  this.$emit("showCatalogx");
                },
                showSettings: function () {
                  var t = this.ebookId;
                  (0, j.qF)(t, [{ click_type: 85, res_name: "设置" }]),
                    (this.isSettingShow = !0);
                },
                onClickHome: function () {
                  window.location.href = "/";
                },
                ttsMenuAction: function () {
                  this.$emit("ttsAction", "mobile");
                },
                changeTheme: function (t) {
                  this.$emit("changeTheme", t);
                },
              }
            ),
          },
          He = n(86012),
          Ze = n.n(He),
          Ye = {};
        (Ye.styleTagTransform = E()),
          (Ye.setAttributes = C()),
          (Ye.insert = w().bind(null, "head")),
          (Ye.domAPI = v()),
          (Ye.insertStyleElement = S());
        g()(Ze(), Ye), Ze() && Ze().locals && Ze().locals;
        var Xe = T(Je, be, [], !1, null, null, null).exports,
          $e = function () {
            var t = this,
              e = t.$createElement,
              n = t._self._c || e;
            return n(
              "div",
              {
                staticClass: "side-tools-box",
                style: { "margin-left": t.marginLeft + "px!important" },
              },
              [
                n(
                  "div",
                  { staticClass: "side-tools-buttons", class: t.themeStyle },
                  [
                    n("div", {
                      directives: [
                        {
                          name: "show",
                          rawName: "v-show",
                          value: t.showHomeMenu(),
                          expression: "showHomeMenu()",
                        },
                      ],
                      class: [
                        "side-tools-icon",
                        "home-icon",
                        { "hide-back-home": t.isSearchList },
                      ],
                      on: {
                        click: function (e) {
                          return (
                            e.stopPropagation(),
                            e.preventDefault(),
                            t.onClickHome.apply(null, arguments)
                          );
                        },
                      },
                    }),
                    n("div", {
                      staticClass: "side-tools-icon catalog-icon",
                      on: { click: t.showCatalog },
                    }),
                    t.showTTSMenu()
                      ? n("div", {
                          staticClass: "side-tools-icon tts-icon",
                          on: { click: t.ttsMenuAction },
                        })
                      : t._e(),
                    n("div", {
                      staticClass: "side-tools-icon tagging-icon",
                      on: {
                        click: function (e) {
                          return (
                            e.stopPropagation(),
                            e.preventDefault(),
                            t.showCatalogx.apply(null, arguments)
                          );
                        },
                      },
                    }),
                    n("div", {
                      staticClass: "side-tools-icon fontSize-icon",
                      attrs: { id: "side-slider-btns" },
                      on: {
                        click: function (e) {
                          return (
                            e.stopPropagation(),
                            e.preventDefault(),
                            t.showFontSizeSet.apply(null, arguments)
                          );
                        },
                      },
                    }),
                    n("div", {
                      staticClass: "side-tools-icon theme-icon",
                      attrs: { id: "side-theme-btns" },
                      on: {
                        click: function (e) {
                          return (
                            e.stopPropagation(),
                            e.preventDefault(),
                            t.showThemeSettings.apply(null, arguments)
                          );
                        },
                      },
                    }),
                    n("div", {
                      staticClass: "side-tools-icon page-turning-icon",
                      attrs: { id: "page-turning-btns" },
                      on: {
                        click: function (e) {
                          return (
                            e.stopPropagation(),
                            e.preventDefault(),
                            t.showPageTurningSettings.apply(null, arguments)
                          );
                        },
                      },
                    }),
                  ]
                ),
                n(
                  "div",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: t.isShowFontSizeSet,
                        expression: "isShowFontSizeSet",
                      },
                    ],
                    staticClass: "side-slider-wraps",
                    class: [
                      t.themeStyle,
                      { leftSide: t.sliderToRightDistance < 10 },
                    ],
                    attrs: { id: "side-slider-wraps" },
                  },
                  [
                    n("slider", {
                      ref: "pcFontSizeSlider",
                      attrs: {
                        "show-value": t.slideValue,
                        step: t.step,
                        min: t.min,
                        max: t.max,
                        "unique-key": "side",
                      },
                      on: {
                        valueChange: t.valueChange,
                        click: function (t) {
                          t.stopPropagation(), t.preventDefault();
                        },
                      },
                    }),
                  ],
                  1
                ),
                n(
                  "div",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: t.isShowThemeSetting,
                        expression: "isShowThemeSetting",
                      },
                    ],
                    staticClass: "reader-theme-wrap",
                    class: [
                      t.themeStyle,
                      { leftSide: t.sliderToRightDistance < 10 },
                    ],
                    attrs: { id: "reader-theme-wrap" },
                    on: {
                      click: function (t) {
                        t.stopPropagation(), t.preventDefault();
                      },
                    },
                  },
                  t._l(t.themeData, function (e) {
                    var r;
                    return n("div", {
                      key: e.name,
                      staticClass: "theme-unit",
                      class: ((r = {}), (r["theme-" + e.name] = e.name), r),
                      style: {
                        "background-color": e.bgColor,
                        "border-color":
                          t.theme.name === e.name
                            ? e.selectedBorderColor
                            : e.bgColor,
                      },
                      on: {
                        click: function (n) {
                          return t.changeTheme(e);
                        },
                      },
                    });
                  }),
                  0
                ),
                n(
                  "div",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: t.isShowPageTurningSetting,
                        expression: "isShowPageTurningSetting",
                      },
                    ],
                    staticClass: "reader-style-set",
                    class: [
                      t.themeStyle,
                      { leftSide: t.sliderToRightDistance < 10 },
                    ],
                    attrs: { id: "reader-style-set" },
                  },
                  [
                    n(
                      "div",
                      {
                        staticClass: "reader-style-theme",
                        class: { active: 1 === t.readStyle },
                        on: {
                          click: function (e) {
                            return t.setReaderStyle(1);
                          },
                          touchstart: function (e) {
                            return t.setReaderStyle(1);
                          },
                        },
                      },
                      [t._v("\n        上下翻页\n      ")]
                    ),
                    n(
                      "div",
                      {
                        staticClass: "reader-style-theme",
                        class: { active: 2 === t.readStyle },
                        on: {
                          click: function (e) {
                            return t.setReaderStyle(2);
                          },
                          touchstart: function (e) {
                            return t.setReaderStyle(2);
                          },
                        },
                      },
                      [t._v("\n        左右翻页\n      ")]
                    ),
                  ]
                ),
              ]
            );
          };
        function tn(t) {
          return (
            (tn =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (t) {
                    return typeof t;
                  }
                : function (t) {
                    return t &&
                      "function" == typeof Symbol &&
                      t.constructor === Symbol &&
                      t !== Symbol.prototype
                      ? "symbol"
                      : typeof t;
                  }),
            tn(t)
          );
        }
        function en(t, e) {
          var n = Object.keys(t);
          if (Object.getOwnPropertySymbols) {
            var r = Object.getOwnPropertySymbols(t);
            e &&
              (r = r.filter(function (e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable;
              })),
              n.push.apply(n, r);
          }
          return n;
        }
        function nn(t) {
          for (var e = 1; e < arguments.length; e++) {
            var n = null != arguments[e] ? arguments[e] : {};
            e % 2
              ? en(Object(n), !0).forEach(function (e) {
                  rn(t, e, n[e]);
                })
              : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n))
              : en(Object(n)).forEach(function (e) {
                  Object.defineProperty(
                    t,
                    e,
                    Object.getOwnPropertyDescriptor(n, e)
                  );
                });
          }
          return t;
        }
        function rn(t, e, n) {
          return (
            (e = (function (t) {
              var e = (function (t, e) {
                if ("object" != tn(t) || !t) return t;
                var n = t[Symbol.toPrimitive];
                if (void 0 !== n) {
                  var r = n.call(t, e || "default");
                  if ("object" != tn(r)) return r;
                  throw new TypeError(
                    "@@toPrimitive must return a primitive value."
                  );
                }
                return ("string" === e ? String : Number)(t);
              })(t, "string");
              return "symbol" == tn(e) ? e : e + "";
            })(e)) in t
              ? Object.defineProperty(t, e, {
                  value: n,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (t[e] = n),
            t
          );
        }
        $e._withStripped = !0;
        var on = {
            name: "sideTools",
            props: { theme: Object },
            data: function () {
              return {
                slideValue: 50,
                step: 14.6,
                min: 6,
                max: 94,
                themeData: u,
                isShowThemeSetting: !1,
                isShowFontSizeSet: !1,
                isShowPageTurningSetting: !1,
                sliderToRightDistance: 0,
              };
            },
            computed: nn(
              nn(
                {},
                (0, a.Se)({
                  pageMaxWidth: "pageMaxWidth",
                  currentWinWidth: "currentWinWidth",
                  fontSize: "fontSize",
                  ebookId: "ebookId",
                  readStyle: "readStyle",
                })
              ),
              {},
              {
                themeStyle: function () {
                  return "theme-".concat(this.theme.name);
                },
                marginLeft: function () {
                  return this.pageMaxWidth / 2 + 48;
                },
                isSearchList: function () {
                  var t = this.$route.query.fromMark;
                  return t && "searchList" === t;
                },
              }
            ),
            components: { slider: Pe },
            created: function () {
              (this.slideValue = this.min + this.fontSize * this.step),
                this.fontSize < 0 && (this.slideValue = this.min - 0.2);
            },
            watch: {
              currentWinWidth: function (t) {
                var e = this;
                this.$nextTick(function () {
                  var n = document
                    .querySelector("#side-slider-btns")
                    .getBoundingClientRect().left;
                  n &&
                    (e.sliderToRightDistance =
                      t -
                      n -
                      document.getElementById("side-slider-wraps").clientWidth);
                });
              },
            },
            methods: nn(
              nn(
                {},
                (0, a.OI)({
                  setFontSize: "SET_FONT_SIZE",
                  setReadStyle: "SET_READ_STYLE",
                })
              ),
              {},
              {
                showCatalog: function () {
                  this.$emit("showCatalog");
                },
                showCatalogx: function () {
                  this.$emit("showCatalogx");
                },
                ttsMenuAction: function () {
                  this.$emit("ttsAction", "pc");
                },
                onClickHome: function () {
                  window.location.href = "/";
                },
                showHomeMenu: function () {
                  return "1" != this.$route.query.noHome;
                },
                showTTSMenu: function () {
                  return (0, Y.ej)("team_id") || (0, Y.ej)("_tob_tk_u_");
                },
                hideTools: function () {
                  (this.isShowThemeSetting = !1),
                    (this.isShowFontSizeSet = !1),
                    (this.isShowPageTurningSetting = !1);
                },
                showThemeSettings: function () {
                  var t = this,
                    e = this.ebookId;
                  (0, j.qF)(e, [{ click_type: 85, res_name: "背景色" }]),
                    (this.isShowThemeSetting = !0),
                    (this.isShowFontSizeSet = !1),
                    (this.isShowPageTurningSetting = !1),
                    document.getElementById("reader-theme-wrap").clientWidth <
                      1 &&
                      this.$nextTick(function () {
                        t.sliderToRightDistance =
                          window.innerWidth -
                          document
                            .querySelector("#side-slider-btns")
                            .getBoundingClientRect().left -
                          document.getElementById("reader-theme-wrap")
                            .clientWidth;
                      });
                },
                showPageTurningSettings: function () {
                  var t = this,
                    e = this.ebookId;
                  (0, j.qF)(e, [{ click_type: 85, res_name: "支持翻页" }]),
                    (this.isShowPageTurningSetting = !0),
                    (this.isShowFontSizeSet = !1),
                    (this.isShowThemeSetting = !1),
                    document.getElementById("reader-style-set").clientWidth <
                      1 &&
                      this.$nextTick(function () {
                        t.sliderToRightDistance =
                          window.innerWidth -
                          document
                            .querySelector("#page-turning-btns")
                            .getBoundingClientRect().left -
                          document.getElementById("reader-style-set")
                            .clientWidth;
                      });
                },
                setReaderStyle: function (t) {
                  var e = [
                      {
                        click_type: 85,
                        res_name: "".concat(1 == t ? "上下翻页" : "左右翻页"),
                      },
                    ],
                    n = this.ebookId;
                  (0, j.qF)(n, e), this.setReadStyle(t);
                },
                showFontSizeSet: function () {
                  var t = this,
                    e = this.ebookId;
                  (0, j.qF)(e, [{ click_type: 85, res_name: "字号" }]),
                    (this.isShowFontSizeSet = !0),
                    (this.isShowThemeSetting = !1),
                    (this.isShowPageTurningSetting = !1),
                    document.getElementById("side-slider-wraps").clientWidth <
                      1 &&
                      this.$nextTick(function () {
                        t.sliderToRightDistance =
                          window.innerWidth -
                          document
                            .querySelector("#side-slider-btns")
                            .getBoundingClientRect().left -
                          document.getElementById("side-slider-wraps")
                            .clientWidth;
                      }),
                    this.$refs.pcFontSizeSlider.refreshData();
                },
                valueChange: function (t) {
                  if (
                    (t.id < 0
                      ? (this.slideValue = this.min - 0.2)
                      : (this.slideValue = t.value),
                    this.setFontSize(t.id),
                    1 === t.type)
                  ) {
                    var e = [
                        { click_type: 85, res_name: "字号-".concat(t.id + 1) },
                      ],
                      n = this.ebookId;
                    (0, j.qF)(n, e);
                  }
                  this.$emit("updateData");
                },
                changeTheme: function (t) {
                  var e = [
                      { click_type: 85, res_name: "背景色-".concat(t.name) },
                    ],
                    n = this.ebookId;
                  (0, j.qF)(n, e),
                    this.$store.dispatch("updateTheme", t.name),
                    this.$emit("changeTheme", t.name);
                },
              }
            ),
          },
          an = on,
          cn = n(69118),
          un = n.n(cn),
          sn = {};
        (sn.styleTagTransform = E()),
          (sn.setAttributes = C()),
          (sn.insert = w().bind(null, "head")),
          (sn.domAPI = v()),
          (sn.insertStyleElement = S());
        g()(un(), sn), un() && un().locals && un().locals;
        var An = T(an, $e, [], !1, null, null, null).exports,
          fn = n(90507);
        var ln = function (t) {
            var e,
              n,
              r,
              o = document.createElement("div");
            (e = t),
              (n = o),
              (r = window.getComputedStyle(e)),
              Array.from(r).forEach(function (t) {
                return n.style.setProperty(
                  t,
                  r.getPropertyValue(t),
                  r.getPropertyPriority(t)
                );
              });
            for (var i = t.innerText, a = "", c = 0; c < i.length; c++)
              a += i[c] + "<span></span>";
            (o.innerHTML = "<span></span>" + a),
              (o.style.position = "absolute"),
              (o.style.zIndex = "-1"),
              document.body.appendChild(o);
            for (
              var u = o.getElementsByTagName("span"), s = [], A = 0;
              A < u.length;
              A++
            )
              u[A + 1] && u[A + 1].offsetTop > u[A].offsetTop && s.push(A);
            return document.body.removeChild(o), s;
          },
          hn = [],
          dn = function (t) {
            for (
              var e =
                  arguments.length > 1 && void 0 !== arguments[1]
                    ? arguments[1]
                    : "",
                n = arguments.length > 2 ? arguments[2] : void 0,
                r =
                  arguments.length > 3 && void 0 !== arguments[3]
                    ? arguments[3]
                    : 0,
                o = t.cloneNode(!0),
                i = t.from_offset_in_para ? t.from_offset_in_para : 0,
                a = t.to_offset_in_para
                  ? t.to_offset_in_para
                  : t.innerText.length,
                c = t.innerText,
                u = "",
                s = 0;
              s < c.length;
              s++
            )
              u += c[s] + "<span></span>";
            t.innerHTML = "<span></span>" + u;
            var A = t.getElementsByTagName("span"),
              f = ln(t),
              l = f.concat([i, a]).sort(function (t, e) {
                return t - e;
              }),
              h = [];
            if (
              (l.forEach(function (t) {
                -1 === h.indexOf(t) && h.push(t);
              }),
              0 === f.length)
            )
              hn.push({
                width: A[a].offsetLeft - A[i].offsetLeft,
                height: t.offsetHeight,
                top: t.offsetTop + r,
                left: A[i].offsetLeft,
                text: t.innerText,
                content: n,
                id: e,
              });
            else
              for (
                var d = h.findIndex(function (t) {
                    return t === i;
                  }),
                  p = h.findIndex(function (t) {
                    return t === a;
                  }),
                  g = h.slice(d, p + 1),
                  m = p - d,
                  v =
                    1e3 === fn.Z.getters.pageMaxWidth &&
                    0 === fn.Z.getters.fontSize,
                  y = 0;
                y < m;
                y++
              ) {
                var w = -1 === f.indexOf(g[y]) ? g[y] : g[y] + 1,
                  b = -1 === f.indexOf(g[y]) ? 1 : 0,
                  C = g[y + 1];
                hn.push({
                  width: b
                    ? A[C].offsetLeft - A[w].offsetLeft
                    : A[C].offsetLeft - (A[w].offsetLeft - 20),
                  height: A[w].offsetHeight + 6,
                  top: A[w].offsetTop + r - (v ? 1.8 * y : 0),
                  left: b ? A[w].offsetLeft : A[w].offsetLeft - 20,
                  text: t.innerText,
                  content: n,
                  id: e,
                });
              }
            t.innerHTML = o.innerHTML;
          },
          pn = function (t, e) {
            if (t && e && e.length > 0) {
              e[e.length - 1].from_para_index > t.childNodes.length - 1 &&
                (t = t.childNodes[0]);
              var n = t.childNodes[0].offsetTop < t.offsetTop ? t.offsetTop : 0,
                r = Array.apply(null, t.childNodes);
              JSON.parse(JSON.stringify(e)).map(function (t) {
                if (t.from_para_index === t.to_para_index) {
                  var e = r[t.from_para_index];
                  e &&
                    ((e.from_offset_in_para = t.from_offset_in_para),
                    (e.to_offset_in_para = t.to_offset_in_para),
                    dn(e, t.id, t.content, n));
                } else {
                  var o = r.slice(t.from_para_index, t.to_para_index + 1),
                    i = o.length;
                  (o[0].from_offset_in_para = t.from_offset_in_para),
                    (o[i - 1].to_offset_in_para = t.to_offset_in_para),
                    o.map(function (e) {
                      dn(e, t.id, t.content);
                    });
                }
              });
            }
            var o = hn;
            return (hn = []), o;
          },
          gn = n(85524),
          mn = n(9634),
          vn = n(81354),
          yn = n.n(vn);
        function wn(t) {
          var e =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : 16e3,
            n =
              arguments.length > 2 && void 0 !== arguments[2]
                ? arguments[2]
                : 22505,
            r = (function (t) {
              t = mn.Base64.atob(t);
              for (var e = new Uint8Array(t.length), n = 0; n < t.length; ++n)
                e[n] = t.charCodeAt(n);
              return new Int16Array(new DataView(e.buffer).buffer);
            })(t),
            o = (function (t) {
              for (var e = [], n = 0; n < t.length; n++) {
                var r = t[n] < 0 ? t[n] / 32768 : t[n] / 32767;
                e.push(r);
              }
              return new Float32Array(e);
            })(r);
          return (
            (o = (function (t) {
              var e =
                  arguments.length > 1 && void 0 !== arguments[1]
                    ? arguments[1]
                    : 44100,
                n =
                  arguments.length > 2 && void 0 !== arguments[2]
                    ? arguments[2]
                    : 16e3,
                r = Math.round(t.length * (n / e)),
                o = new Float32Array(r),
                i = (t.length - 1) / (r - 1);
              o[0] = t[0];
              for (var a = 1; a < r - 1; a++) {
                var c = a * i,
                  u = Math.floor(c).toFixed(),
                  s = Math.ceil(c).toFixed(),
                  A = c - u;
                o[a] = t[u] + (t[s] - t[u]) * A;
              }
              return (o[r - 1] = t[t.length - 1]), o;
            })(o, e, n)),
            { data: (o = Array.from(o)), rawAudioData: Array.from(r) }
          );
        }
        var bn = n(56126),
          Cn = n.n(bn);
        function In(t) {
          return (
            (In =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (t) {
                    return typeof t;
                  }
                : function (t) {
                    return t &&
                      "function" == typeof Symbol &&
                      t.constructor === Symbol &&
                      t !== Symbol.prototype
                      ? "symbol"
                      : typeof t;
                  }),
            In(t)
          );
        }
        function Sn() {
          Sn = function () {
            return e;
          };
          var t,
            e = {},
            n = Object.prototype,
            r = n.hasOwnProperty,
            o =
              Object.defineProperty ||
              function (t, e, n) {
                t[e] = n.value;
              },
            i = "function" == typeof Symbol ? Symbol : {},
            a = i.iterator || "@@iterator",
            c = i.asyncIterator || "@@asyncIterator",
            u = i.toStringTag || "@@toStringTag";
          function s(t, e, n) {
            return (
              Object.defineProperty(t, e, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              }),
              t[e]
            );
          }
          try {
            s({}, "");
          } catch (t) {
            s = function (t, e, n) {
              return (t[e] = n);
            };
          }
          function A(t, e, n, r) {
            var i = e && e.prototype instanceof m ? e : m,
              a = Object.create(i.prototype),
              c = new T(r || []);
            return o(a, "_invoke", { value: E(t, n, c) }), a;
          }
          function f(t, e, n) {
            try {
              return { type: "normal", arg: t.call(e, n) };
            } catch (t) {
              return { type: "throw", arg: t };
            }
          }
          e.wrap = A;
          var l = "suspendedStart",
            h = "suspendedYield",
            d = "executing",
            p = "completed",
            g = {};
          function m() {}
          function v() {}
          function y() {}
          var w = {};
          s(w, a, function () {
            return this;
          });
          var b = Object.getPrototypeOf,
            C = b && b(b(D([])));
          C && C !== n && r.call(C, a) && (w = C);
          var I = (y.prototype = m.prototype = Object.create(w));
          function S(t) {
            ["next", "throw", "return"].forEach(function (e) {
              s(t, e, function (t) {
                return this._invoke(e, t);
              });
            });
          }
          function x(t, e) {
            function n(o, i, a, c) {
              var u = f(t[o], t, i);
              if ("throw" !== u.type) {
                var s = u.arg,
                  A = s.value;
                return A && "object" == In(A) && r.call(A, "__await")
                  ? e.resolve(A.__await).then(
                      function (t) {
                        n("next", t, a, c);
                      },
                      function (t) {
                        n("throw", t, a, c);
                      }
                    )
                  : e.resolve(A).then(
                      function (t) {
                        (s.value = t), a(s);
                      },
                      function (t) {
                        return n("throw", t, a, c);
                      }
                    );
              }
              c(u.arg);
            }
            var i;
            o(this, "_invoke", {
              value: function (t, r) {
                function o() {
                  return new e(function (e, o) {
                    n(t, r, e, o);
                  });
                }
                return (i = i ? i.then(o, o) : o());
              },
            });
          }
          function E(e, n, r) {
            var o = l;
            return function (i, a) {
              if (o === d) throw Error("Generator is already running");
              if (o === p) {
                if ("throw" === i) throw a;
                return { value: t, done: !0 };
              }
              for (r.method = i, r.arg = a; ; ) {
                var c = r.delegate;
                if (c) {
                  var u = _(c, r);
                  if (u) {
                    if (u === g) continue;
                    return u;
                  }
                }
                if ("next" === r.method) r.sent = r._sent = r.arg;
                else if ("throw" === r.method) {
                  if (o === l) throw ((o = p), r.arg);
                  r.dispatchException(r.arg);
                } else "return" === r.method && r.abrupt("return", r.arg);
                o = d;
                var s = f(e, n, r);
                if ("normal" === s.type) {
                  if (((o = r.done ? p : h), s.arg === g)) continue;
                  return { value: s.arg, done: r.done };
                }
                "throw" === s.type &&
                  ((o = p), (r.method = "throw"), (r.arg = s.arg));
              }
            };
          }
          function _(e, n) {
            var r = n.method,
              o = e.iterator[r];
            if (o === t)
              return (
                (n.delegate = null),
                ("throw" === r &&
                  e.iterator.return &&
                  ((n.method = "return"),
                  (n.arg = t),
                  _(e, n),
                  "throw" === n.method)) ||
                  ("return" !== r &&
                    ((n.method = "throw"),
                    (n.arg = new TypeError(
                      "The iterator does not provide a '" + r + "' method"
                    )))),
                g
              );
            var i = f(o, e.iterator, n.arg);
            if ("throw" === i.type)
              return (
                (n.method = "throw"), (n.arg = i.arg), (n.delegate = null), g
              );
            var a = i.arg;
            return a
              ? a.done
                ? ((n[e.resultName] = a.value),
                  (n.next = e.nextLoc),
                  "return" !== n.method && ((n.method = "next"), (n.arg = t)),
                  (n.delegate = null),
                  g)
                : a
              : ((n.method = "throw"),
                (n.arg = new TypeError("iterator result is not an object")),
                (n.delegate = null),
                g);
          }
          function B(t) {
            var e = { tryLoc: t[0] };
            1 in t && (e.catchLoc = t[1]),
              2 in t && ((e.finallyLoc = t[2]), (e.afterLoc = t[3])),
              this.tryEntries.push(e);
          }
          function k(t) {
            var e = t.completion || {};
            (e.type = "normal"), delete e.arg, (t.completion = e);
          }
          function T(t) {
            (this.tryEntries = [{ tryLoc: "root" }]),
              t.forEach(B, this),
              this.reset(!0);
          }
          function D(e) {
            if (e || "" === e) {
              var n = e[a];
              if (n) return n.call(e);
              if ("function" == typeof e.next) return e;
              if (!isNaN(e.length)) {
                var o = -1,
                  i = function n() {
                    for (; ++o < e.length; )
                      if (r.call(e, o))
                        return (n.value = e[o]), (n.done = !1), n;
                    return (n.value = t), (n.done = !0), n;
                  };
                return (i.next = i);
              }
            }
            throw new TypeError(In(e) + " is not iterable");
          }
          return (
            (v.prototype = y),
            o(I, "constructor", { value: y, configurable: !0 }),
            o(y, "constructor", { value: v, configurable: !0 }),
            (v.displayName = s(y, u, "GeneratorFunction")),
            (e.isGeneratorFunction = function (t) {
              var e = "function" == typeof t && t.constructor;
              return (
                !!e &&
                (e === v || "GeneratorFunction" === (e.displayName || e.name))
              );
            }),
            (e.mark = function (t) {
              return (
                Object.setPrototypeOf
                  ? Object.setPrototypeOf(t, y)
                  : ((t.__proto__ = y), s(t, u, "GeneratorFunction")),
                (t.prototype = Object.create(I)),
                t
              );
            }),
            (e.awrap = function (t) {
              return { __await: t };
            }),
            S(x.prototype),
            s(x.prototype, c, function () {
              return this;
            }),
            (e.AsyncIterator = x),
            (e.async = function (t, n, r, o, i) {
              void 0 === i && (i = Promise);
              var a = new x(A(t, n, r, o), i);
              return e.isGeneratorFunction(n)
                ? a
                : a.next().then(function (t) {
                    return t.done ? t.value : a.next();
                  });
            }),
            S(I),
            s(I, u, "Generator"),
            s(I, a, function () {
              return this;
            }),
            s(I, "toString", function () {
              return "[object Generator]";
            }),
            (e.keys = function (t) {
              var e = Object(t),
                n = [];
              for (var r in e) n.push(r);
              return (
                n.reverse(),
                function t() {
                  for (; n.length; ) {
                    var r = n.pop();
                    if (r in e) return (t.value = r), (t.done = !1), t;
                  }
                  return (t.done = !0), t;
                }
              );
            }),
            (e.values = D),
            (T.prototype = {
              constructor: T,
              reset: function (e) {
                if (
                  ((this.prev = 0),
                  (this.next = 0),
                  (this.sent = this._sent = t),
                  (this.done = !1),
                  (this.delegate = null),
                  (this.method = "next"),
                  (this.arg = t),
                  this.tryEntries.forEach(k),
                  !e)
                )
                  for (var n in this)
                    "t" === n.charAt(0) &&
                      r.call(this, n) &&
                      !isNaN(+n.slice(1)) &&
                      (this[n] = t);
              },
              stop: function () {
                this.done = !0;
                var t = this.tryEntries[0].completion;
                if ("throw" === t.type) throw t.arg;
                return this.rval;
              },
              dispatchException: function (e) {
                if (this.done) throw e;
                var n = this;
                function o(r, o) {
                  return (
                    (c.type = "throw"),
                    (c.arg = e),
                    (n.next = r),
                    o && ((n.method = "next"), (n.arg = t)),
                    !!o
                  );
                }
                for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                  var a = this.tryEntries[i],
                    c = a.completion;
                  if ("root" === a.tryLoc) return o("end");
                  if (a.tryLoc <= this.prev) {
                    var u = r.call(a, "catchLoc"),
                      s = r.call(a, "finallyLoc");
                    if (u && s) {
                      if (this.prev < a.catchLoc) return o(a.catchLoc, !0);
                      if (this.prev < a.finallyLoc) return o(a.finallyLoc);
                    } else if (u) {
                      if (this.prev < a.catchLoc) return o(a.catchLoc, !0);
                    } else {
                      if (!s)
                        throw Error("try statement without catch or finally");
                      if (this.prev < a.finallyLoc) return o(a.finallyLoc);
                    }
                  }
                }
              },
              abrupt: function (t, e) {
                for (var n = this.tryEntries.length - 1; n >= 0; --n) {
                  var o = this.tryEntries[n];
                  if (
                    o.tryLoc <= this.prev &&
                    r.call(o, "finallyLoc") &&
                    this.prev < o.finallyLoc
                  ) {
                    var i = o;
                    break;
                  }
                }
                i &&
                  ("break" === t || "continue" === t) &&
                  i.tryLoc <= e &&
                  e <= i.finallyLoc &&
                  (i = null);
                var a = i ? i.completion : {};
                return (
                  (a.type = t),
                  (a.arg = e),
                  i
                    ? ((this.method = "next"), (this.next = i.finallyLoc), g)
                    : this.complete(a)
                );
              },
              complete: function (t, e) {
                if ("throw" === t.type) throw t.arg;
                return (
                  "break" === t.type || "continue" === t.type
                    ? (this.next = t.arg)
                    : "return" === t.type
                    ? ((this.rval = this.arg = t.arg),
                      (this.method = "return"),
                      (this.next = "end"))
                    : "normal" === t.type && e && (this.next = e),
                  g
                );
              },
              finish: function (t) {
                for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                  var n = this.tryEntries[e];
                  if (n.finallyLoc === t)
                    return this.complete(n.completion, n.afterLoc), k(n), g;
                }
              },
              catch: function (t) {
                for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                  var n = this.tryEntries[e];
                  if (n.tryLoc === t) {
                    var r = n.completion;
                    if ("throw" === r.type) {
                      var o = r.arg;
                      k(n);
                    }
                    return o;
                  }
                }
                throw Error("illegal catch attempt");
              },
              delegateYield: function (e, n, r) {
                return (
                  (this.delegate = {
                    iterator: D(e),
                    resultName: n,
                    nextLoc: r,
                  }),
                  "next" === this.method && (this.arg = t),
                  g
                );
              },
            }),
            e
          );
        }
        function xn(t, e, n, r, o, i, a) {
          try {
            var c = t[i](a),
              u = c.value;
          } catch (t) {
            return void n(t);
          }
          c.done ? e(u) : Promise.resolve(u).then(r, o);
        }
        function En(t) {
          return (
            (function (t) {
              if (Array.isArray(t)) return _n(t);
            })(t) ||
            (function (t) {
              if (
                ("undefined" != typeof Symbol && null != t[Symbol.iterator]) ||
                null != t["@@iterator"]
              )
                return Array.from(t);
            })(t) ||
            (function (t, e) {
              if (t) {
                if ("string" == typeof t) return _n(t, e);
                var n = {}.toString.call(t).slice(8, -1);
                return (
                  "Object" === n && t.constructor && (n = t.constructor.name),
                  "Map" === n || "Set" === n
                    ? Array.from(t)
                    : "Arguments" === n ||
                      /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
                    ? _n(t, e)
                    : void 0
                );
              }
            })(t) ||
            (function () {
              throw new TypeError(
                "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
              );
            })()
          );
        }
        function _n(t, e) {
          (null == e || e > t.length) && (e = t.length);
          for (var n = 0, r = Array(e); n < e; n++) r[n] = t[n];
          return r;
        }
        var Bn,
          kn = null,
          Tn = null,
          Dn = null,
          On = !1,
          Pn = null,
          Mn = 0,
          jn = !1,
          Ln = 0,
          Nn = 3,
          zn = 0;
        function Qn() {
          var t = [
            "2JIdseV",
            "168fEpKGi",
            "207748TKWsQD",
            "YjVhY2IwN2EwOQ==",
            "916XeEsBZ",
            "740677ayAIQN",
            "69070LJlZzE",
            "71159zcPUdr",
            "230088AyISRD",
            "6ZRBVWi",
            "305424xeXJOm",
            "297hFfwmX",
            "3790LyZAUy",
          ];
          return (Qn = function () {
            return t;
          })();
        }
        function Rn(t, e) {
          var n = Qn();
          return (Rn = function (t, e) {
            return n[(t -= 490)];
          })(t, e);
        }
        var Wn = Rn;
        !(function (t, e) {
          for (var n = Rn, r = t(); ; )
            try {
              if (
                131978 ===
                parseInt(n(501)) / 1 +
                  (parseInt(n(499)) / 2) * (-parseInt(n(494)) / 3) +
                  (parseInt(n(490)) / 4) * (-parseInt(n(498)) / 5) +
                  (parseInt(n(495)) / 6) * (-parseInt(n(491)) / 7) +
                  -parseInt(n(496)) / 8 +
                  (-parseInt(n(497)) / 9) * (-parseInt(n(492)) / 10) +
                  (parseInt(n(493)) / 11) * (parseInt(n(500)) / 12)
              )
                break;
              r.push(r.shift());
            } catch (t) {
              r.push(r.shift());
            }
        })(Qn);
        var Fn = Wn(502),
          Un = Kn;
        function Kn(t, e) {
          var n = qn();
          return (Kn = function (t, e) {
            return n[(t -= 175)];
          })(t, e);
        }
        function qn() {
          var t = [
            "648LDeVVe",
            "6230vPjXsE",
            "2605463VGfvHM",
            "3pXiyTi",
            "459864SNxmUT",
            "4210LqJNHA",
            "1011360EBjcIe",
            "6444HvVfkp",
            "66pTMjnc",
            "3055550IGAKVF",
            "bmYxNmUzYzViNmQ5ZDc2NWUyNWQ3MWI5MDRmODU5MWIyNA==",
            "326754FATXva",
          ];
          return (qn = function () {
            return t;
          })();
        }
        !(function (t, e) {
          for (var n = Kn, r = t(); ; )
            try {
              if (
                701785 ===
                (parseInt(n(176)) / 1) * (parseInt(n(183)) / 2) +
                  (-parseInt(n(186)) / 3) * (-parseInt(n(175)) / 4) +
                  (-parseInt(n(184)) / 5) * (-parseInt(n(178)) / 6) +
                  -parseInt(n(185)) / 7 +
                  parseInt(n(177)) / 8 +
                  -parseInt(n(182)) / 9 +
                  (parseInt(n(180)) / 10) * (-parseInt(n(179)) / 11)
              )
                break;
              r.push(r.shift());
            } catch (t) {
              r.push(r.shift());
            }
        })(qn);
        var Gn = Un(181),
          Vn = Hn;
        function Jn() {
          var t = [
            "4grVWsa",
            "NDFhNGMwMjU4MzYzYjAwMzg2NjhmNWQyNjBkODc1YWE5aA==",
            "11WWgKwQ",
            "4hkygaX",
            "17720320zKjmXj",
            "545413tMRgxD",
            "222424HPYcrY",
            "456828FWQFCB",
            "603aHAQMp",
            "4750896WcrLXn",
            "8556086YAwlXa",
            "6pzUVDo",
            "7072585zXuzXz",
          ];
          return (Jn = function () {
            return t;
          })();
        }
        function Hn(t, e) {
          var n = Jn();
          return (Hn = function (t, e) {
            return n[(t -= 347)];
          })(t, e);
        }
        !(function (t, e) {
          for (var n = Hn, r = t(); ; )
            try {
              if (
                948644 ===
                (parseInt(n(348)) / 1) * (parseInt(n(359)) / 2) +
                  (parseInt(n(350)) / 3) * (parseInt(n(356)) / 4) +
                  (-parseInt(n(355)) / 5) * (-parseInt(n(354)) / 6) +
                  -parseInt(n(353)) / 7 +
                  (-parseInt(n(349)) / 8) * (parseInt(n(351)) / 9) +
                  parseInt(n(347)) / 10 +
                  (-parseInt(n(358)) / 11) * (parseInt(n(352)) / 12)
              )
                break;
              r.push(r.shift());
            } catch (t) {
              r.push(r.shift());
            }
        })(Jn);
        var Zn = Vn(357),
          Yn = {
            key: "",
            theme: "",
            audioData: [],
            rawAudioData: [],
            audioDataOffset: 0,
            playStatus: "init",
          },
          Xn = [],
          $n = new (Cn())(),
          tr = !1;
        function er(t, e, n, r, o, i) {
          if (Date.now() - zn < 2e3)
            i &&
              i({
                action: "error",
                code: -18,
                msg: "语音朗读正在停止中，请稍后",
              });
          else {
            (Ln = 0), (Xn = []);
            var a = document.getElementById("vertical-read"),
              c = document.getElementById("horizontal-read"),
              u = document.querySelector(".pc-chapter-title"),
              s = null != u ? u.clientHeight : 0,
              A = gr(o);
            if (A && A.length <= 0)
              return (
                (Yn.key = ""),
                (Bn = !0),
                void (i && i({ action: "nextChapter" }))
              );
            for (var f = 0, l = 0; l < A.length; l++) {
              var h = A[l].getBoundingClientRect();
              if (a && h.top - s > 0) {
                f = l;
                break;
              }
              if (c && h.left > 0) {
                f = l;
                break;
              }
            }
            var d = A[A.length - 1].getBoundingClientRect();
            ((a && 0 == f && d.top < 0) || (c && 0 == f && d.left < 0)) &&
              (f = A.length - 1),
              (Yn.key = t + "#" + e),
              (Yn.theme = r),
              tr || ($n.enable(), (tr = !0)),
              yr(i),
              n && "auto" != n && kn && "running" !== kn.state && kn.resume(),
              kn && nr(Yn.key, o, A, f, !1, i);
          }
        }
        function nr(t, e, n, r, o, i) {
          if (t && t != Yn.key) lr();
          else {
            var a = n.length;
            if (r < a) {
              var c,
                u,
                s = document.getElementById("vertical-read"),
                A = document.getElementById("horizontal-read");
              if (jn)
                return (
                  (jn = !1),
                  s
                    ? (u = document.querySelector(".reader-chapter-content"))
                    : A &&
                      (u = document.querySelector(
                        ".horizontal-read-container"
                      )),
                  void (u && nr(t, u, gr(u), r, !0, i))
                );
              Mn = r;
              var f = n[r],
                l = f.getBoundingClientRect(),
                h = f.textContent,
                d =
                  (h = null === (c = h) || void 0 === c ? void 0 : c.trim()) &&
                  h.length > 0;
              if ((d && mr(r, f.style), r - 1 >= 0)) {
                for (var p, g, m = Xn.length - 1; m >= 0; m--) {
                  var v = Xn[m];
                  if (v.index < r && n[v.index]) {
                    var y = n[v.index],
                      w = y.textContent;
                    if (w && w.trim().length > 0) {
                      (p = v), (g = y);
                      break;
                    }
                  }
                }
                p && g && g.setAttribute("style", p.style);
              }
              d && f.setAttribute("style", pr());
              var b =
                  document.documentElement.clientHeight ||
                  document.body.clientHeight,
                C =
                  document.documentElement.clientWidth ||
                  document.body.clientWidth;
              if (s && o) {
                var I = !0;
                if (r > 0) {
                  var S = n[r - 1].getBoundingClientRect();
                  (S.top < 0 || S.top > b) && (I = !1);
                }
                if (l.bottom > b && I) {
                  var x = document.querySelector(".pc-chapter-title"),
                    E = null != x ? x.clientHeight : 0;
                  s.scrollBy({
                    top: Math.max(l.top - E - 12, 0),
                    left: 0,
                    behavior: "smooth",
                  });
                }
              } else if (A && o) {
                var _ = !0;
                if (r > 0) {
                  var B = n[r - 1].getBoundingClientRect();
                  (B.left < 0 || B.top > b) && (_ = !1),
                    l.left > C && _ && i && i({ action: "nextPage" });
                }
              }
              h && h.length > 200
                ? vr(
                    t,
                    h,
                    n,
                    (function (t, e) {
                      var n = 0,
                        r = [];
                      for (; n < t.length; ) r.push(t.slice(n, (n += e)));
                      return r;
                    })(h, 200),
                    0,
                    function (o) {
                      "end" == o.action ? nr(t, e, n, r + 1, !0, i) : i && i(o);
                    }
                  )
                : h && h.length > 0
                ? ar(t, h, n, function (o) {
                    "end" == o.action ? nr(t, e, n, r + 1, !0, i) : i && i(o);
                  })
                : nr(t, e, n, r + 1, !0, i);
            } else {
              var k = Mn;
              if (k >= 0 && k < n.length) {
                var T = Xn.find(function (t) {
                  return t.index == k;
                });
                T && n[k].setAttribute("style", T.style);
              }
              (Yn.key = ""), (Bn = !0), i && i({ action: "nextChapter" });
            }
          }
        }
        function rr(t) {
          if (t) {
            var e = Mn;
            if (e >= 0 && e < t.length) {
              var n = Xn.find(function (t) {
                return t.index == e;
              });
              n && t[e].setAttribute("style", n.style);
            }
          }
        }
        function or() {
          return "playing" == Yn.playStatus;
        }
        function ir(t, e, n, r) {
          r ? (Yn.theme = r) : (jn = !0);
          var o = gr(n),
            i = t + "#" + e;
          if (Yn.key == i && o) {
            var a = Mn;
            if (a >= 0 && a < o.length) {
              Xn = [];
              for (
                var c = Math.max(0, a - 2);
                c < Math.min(a + 2, o.length);
                c++
              ) {
                mr(c, o[c].style);
              }
              o[a].setAttribute("style", pr());
            }
          }
        }
        function ar(t, e, n, r) {
          !(function (t, e, n, r) {
            new Promise(function (t, e) {
              var n = mn.Base64.decode(Zn),
                r = mn.Base64.decode(Gn),
                o = n.substring(1, n.length - 1),
                i = r.substring(1, r.length - 1),
                a = "wss://tts-api.xfyun.cn/v2/tts",
                c = window.location.host,
                u = new Date().toGMTString(),
                s = "hmac-sha256",
                A = "host date request-line",
                f = "host: "
                  .concat(c, "\ndate: ")
                  .concat(u, "\nGET /v2/tts HTTP/1.1"),
                l = yn().HmacSHA256(f, i),
                h = yn().enc.Base64.stringify(l),
                d = 'api_key="'
                  .concat(o, '", algorithm="')
                  .concat(s, '", headers="')
                  .concat(A, '", signature="')
                  .concat(h, '"'),
                p = mn.Base64.btoa(d);
              t(
                (a = ""
                  .concat(a, "?authorization=")
                  .concat(p, "&date=")
                  .concat(u, "&host=")
                  .concat(c))
              );
            }).then(function (o) {
              var i;
              if ("WebSocket" in window) i = new WebSocket(o);
              else {
                if (!("MozWebSocket" in window))
                  return void alert("浏览器不支持WebSocket");
                i = new MozWebSocket(o);
              }
              (Dn = i),
                (i.onopen = function (n) {
                  (On = !1),
                    (function (t, e) {
                      var n = mn.Base64.decode(Fn),
                        r = n.substring(1, n.length - 1),
                        o = {
                          common: { app_id: r },
                          business: {
                            aue: "raw",
                            auf: "audio/L16;rate=16000",
                            vcn: "x4_lingxiaoying_en",
                            speed: 55,
                            volume: 50,
                            pitch: 50,
                            bgs: 0,
                            tte: "UTF8",
                          },
                          data: { status: 2, text: mn.Base64.encode(e) },
                        };
                      t.send(JSON.stringify(o));
                    })(i, e),
                    (Pn = setTimeout(function () {
                      cr(t, e, r);
                    }, 850));
                }),
                (i.onmessage = function (e) {
                  !(function (t, e, n, r) {
                    if (t && t != Yn.key) return;
                    var o = JSON.parse(e);
                    if (o && 0 === o.code)
                      if (o.data.audio) {
                        var i,
                          a,
                          c = wn(o.data.audio);
                        (i = Yn.audioData).push.apply(i, En(c.data)),
                          (a = Yn.rawAudioData).push.apply(
                            a,
                            En(c.rawAudioData)
                          ),
                          2 === o.data.status && dr();
                      } else
                        2 === o.data.status && dr(),
                          (null == Yn.audioData || Yn.audioData.length <= 0) &&
                            (hr(), r && r({ action: "end", text: "" }));
                    else
                      rr(n),
                        dr(),
                        (Yn.playStatus = "stop"),
                        r &&
                          r({
                            action: "error",
                            code: o.code || -1,
                            msg: o.message || "请稍后重试",
                          }),
                        $n.disable(),
                        (tr = !1);
                  })(t, e.data, n, r);
                }),
                (i.onerror = function (t) {
                  rr(n),
                    hr(),
                    dr(),
                    (Yn.playStatus = "stop"),
                    r && r({ action: "error", code: -2, msg: "请稍后重试" }),
                    $n.disable(),
                    (tr = !1);
                }),
                (i.onclose = function (t) {
                  On = !0;
                });
            });
          })(t, e, n, r);
        }
        function cr(t, e, n) {
          if (t && t != Yn.key) lr();
          else if ((yr(n), null != kn && null != kn)) {
            var r = Yn.audioData.slice(Yn.audioDataOffset);
            if (r && r.length <= 0)
              return ++Ln >= Nn
                ? void (
                    n && n({ action: "error", code: -1, msg: "请稍后重试" })
                  )
                : void (Pn = setTimeout(function () {
                    cr(t, e, n);
                  }, 888));
            n && n({ text: e, action: "start", pageIndex: Mn }),
              (Yn.playStatus = "playing"),
              (Yn.audioDataOffset += r.length);
            var o = kn.createBuffer(1, r.length, 22050),
              i = o.getChannelData(0);
            if (o.copyToChannel) o.copyToChannel(new Float32Array(r), 0, 0);
            else for (var a = 0; a < r.length; a++) i[a] = r[a];
            var c = (Tn = kn.createBufferSource());
            (c.buffer = o),
              c.connect(kn.destination),
              c.start(),
              kn && "running" !== kn.state && kn.resume(),
              (c.onended = function (r) {
                Yn.audioDataOffset < Yn.audioData.length
                  ? cr(t, e, n)
                  : On
                  ? ((ur = 0),
                    lr(),
                    dr(),
                    setTimeout(function () {
                      n && n({ text: e, action: "end", pageIndex: Mn });
                    }, 800))
                  : n && sr(e, n);
              });
          }
        }
        var ur = 0;
        function sr(t, e) {
          Ar(3e3).then(function () {
            On
              ? (lr(),
                dr(),
                setTimeout(function () {
                  e && e({ text: t, action: "end", pageIndex: Mn });
                }, 800))
              : ur < 5 &&
                (ur++,
                setTimeout(function () {
                  sr(t, e);
                }, 50));
          });
        }
        function Ar(t) {
          return fr.apply(this, arguments);
        }
        function fr() {
          var t;
          return (
            (t = Sn().mark(function t(e) {
              return Sn().wrap(function (t) {
                for (;;)
                  switch ((t.prev = t.next)) {
                    case 0:
                      return t.abrupt(
                        "return",
                        new Promise(function (t) {
                          setTimeout(t, e);
                        })
                      );
                    case 1:
                    case "end":
                      return t.stop();
                  }
              }, t);
            })),
            (fr = function () {
              var e = this,
                n = arguments;
              return new Promise(function (r, o) {
                var i = t.apply(e, n);
                function a(t) {
                  xn(i, r, o, a, c, "next", t);
                }
                function c(t) {
                  xn(i, r, o, a, c, "throw", t);
                }
                a(void 0);
              });
            }),
            fr.apply(this, arguments)
          );
        }
        function lr() {
          (Yn.audioDataOffset = 0), (Yn.audioData = []), (Yn.rawAudioData = []);
        }
        function hr() {
          !(function () {
            if (
              ((Yn.audioDataOffset = 0),
              Pn && (clearTimeout(Pn), (Pn = null)),
              Tn)
            )
              try {
                Tn.stop(), Tn.disconnect(), (Tn.buffer = null), (Tn = null);
              } catch (t) {}
            kn && kn.suspend().then(function () {});
          })(),
            lr();
        }
        function dr() {
          Dn && Dn.close(), (Dn = null);
        }
        function pr() {
          var t = Yn.theme || "default",
            e = u.find(function (e) {
              return e.name == t;
            }),
            n = (e && e.ttsHighlightColor) || "rgba(32,120,251,0.25)";
          return "background-color: ".concat(n);
        }
        function gr(t) {
          var e = null == t ? void 0 : t.children,
            n = [];
          if (e)
            for (var r = 0; r < e.length; r++) {
              var o,
                i = e[r],
                a = i.textContent;
              (a = null === (o = a) || void 0 === o ? void 0 : o.trim()) &&
                a.length > 0 &&
                n.push(i);
            }
          return n;
        }
        function mr(t, e) {
          (Xn = Xn.filter(function (e) {
            return Math.abs(e.index - t) <= 5;
          })).push({ index: t, style: e });
        }
        function vr(t, e, n, r, o, i) {
          if (o < r.length) {
            var a = r[o];
            ar(t, a, n, function (e) {
              "end" == e.action
                ? Ar(600).then(function () {
                    vr(t, a, n, r, o + 1, i);
                  })
                : "error" == e.action && i && i(e);
            });
          } else i && i({ action: "end", text: e });
        }
        function yr(t) {
          null == kn &&
            (window.webkitAudioContext
              ? (kn = new webkitAudioContext())
              : window.AudioContext && (kn = new AudioContext()),
            kn && (kn.onstatechange = function () {})),
            null == kn &&
              t &&
              t({ action: "error", code: -1, msg: "浏览器不支持" });
        }
        function wr() {
          return (
            !(!or() && !Bn) &&
            ((Yn.playStatus = "stop"), Bn ? (Bn = !1) : (dr(), hr()), !0)
          );
        }
        function br(t) {
          return (
            (br =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (t) {
                    return typeof t;
                  }
                : function (t) {
                    return t &&
                      "function" == typeof Symbol &&
                      t.constructor === Symbol &&
                      t !== Symbol.prototype
                      ? "symbol"
                      : typeof t;
                  }),
            br(t)
          );
        }
        function Cr() {
          Cr = function () {
            return e;
          };
          var t,
            e = {},
            n = Object.prototype,
            r = n.hasOwnProperty,
            o =
              Object.defineProperty ||
              function (t, e, n) {
                t[e] = n.value;
              },
            i = "function" == typeof Symbol ? Symbol : {},
            a = i.iterator || "@@iterator",
            c = i.asyncIterator || "@@asyncIterator",
            u = i.toStringTag || "@@toStringTag";
          function s(t, e, n) {
            return (
              Object.defineProperty(t, e, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              }),
              t[e]
            );
          }
          try {
            s({}, "");
          } catch (t) {
            s = function (t, e, n) {
              return (t[e] = n);
            };
          }
          function A(t, e, n, r) {
            var i = e && e.prototype instanceof m ? e : m,
              a = Object.create(i.prototype),
              c = new T(r || []);
            return o(a, "_invoke", { value: E(t, n, c) }), a;
          }
          function f(t, e, n) {
            try {
              return { type: "normal", arg: t.call(e, n) };
            } catch (t) {
              return { type: "throw", arg: t };
            }
          }
          e.wrap = A;
          var l = "suspendedStart",
            h = "suspendedYield",
            d = "executing",
            p = "completed",
            g = {};
          function m() {}
          function v() {}
          function y() {}
          var w = {};
          s(w, a, function () {
            return this;
          });
          var b = Object.getPrototypeOf,
            C = b && b(b(D([])));
          C && C !== n && r.call(C, a) && (w = C);
          var I = (y.prototype = m.prototype = Object.create(w));
          function S(t) {
            ["next", "throw", "return"].forEach(function (e) {
              s(t, e, function (t) {
                return this._invoke(e, t);
              });
            });
          }
          function x(t, e) {
            function n(o, i, a, c) {
              var u = f(t[o], t, i);
              if ("throw" !== u.type) {
                var s = u.arg,
                  A = s.value;
                return A && "object" == br(A) && r.call(A, "__await")
                  ? e.resolve(A.__await).then(
                      function (t) {
                        n("next", t, a, c);
                      },
                      function (t) {
                        n("throw", t, a, c);
                      }
                    )
                  : e.resolve(A).then(
                      function (t) {
                        (s.value = t), a(s);
                      },
                      function (t) {
                        return n("throw", t, a, c);
                      }
                    );
              }
              c(u.arg);
            }
            var i;
            o(this, "_invoke", {
              value: function (t, r) {
                function o() {
                  return new e(function (e, o) {
                    n(t, r, e, o);
                  });
                }
                return (i = i ? i.then(o, o) : o());
              },
            });
          }
          function E(e, n, r) {
            var o = l;
            return function (i, a) {
              if (o === d) throw Error("Generator is already running");
              if (o === p) {
                if ("throw" === i) throw a;
                return { value: t, done: !0 };
              }
              for (r.method = i, r.arg = a; ; ) {
                var c = r.delegate;
                if (c) {
                  var u = _(c, r);
                  if (u) {
                    if (u === g) continue;
                    return u;
                  }
                }
                if ("next" === r.method) r.sent = r._sent = r.arg;
                else if ("throw" === r.method) {
                  if (o === l) throw ((o = p), r.arg);
                  r.dispatchException(r.arg);
                } else "return" === r.method && r.abrupt("return", r.arg);
                o = d;
                var s = f(e, n, r);
                if ("normal" === s.type) {
                  if (((o = r.done ? p : h), s.arg === g)) continue;
                  return { value: s.arg, done: r.done };
                }
                "throw" === s.type &&
                  ((o = p), (r.method = "throw"), (r.arg = s.arg));
              }
            };
          }
          function _(e, n) {
            var r = n.method,
              o = e.iterator[r];
            if (o === t)
              return (
                (n.delegate = null),
                ("throw" === r &&
                  e.iterator.return &&
                  ((n.method = "return"),
                  (n.arg = t),
                  _(e, n),
                  "throw" === n.method)) ||
                  ("return" !== r &&
                    ((n.method = "throw"),
                    (n.arg = new TypeError(
                      "The iterator does not provide a '" + r + "' method"
                    )))),
                g
              );
            var i = f(o, e.iterator, n.arg);
            if ("throw" === i.type)
              return (
                (n.method = "throw"), (n.arg = i.arg), (n.delegate = null), g
              );
            var a = i.arg;
            return a
              ? a.done
                ? ((n[e.resultName] = a.value),
                  (n.next = e.nextLoc),
                  "return" !== n.method && ((n.method = "next"), (n.arg = t)),
                  (n.delegate = null),
                  g)
                : a
              : ((n.method = "throw"),
                (n.arg = new TypeError("iterator result is not an object")),
                (n.delegate = null),
                g);
          }
          function B(t) {
            var e = { tryLoc: t[0] };
            1 in t && (e.catchLoc = t[1]),
              2 in t && ((e.finallyLoc = t[2]), (e.afterLoc = t[3])),
              this.tryEntries.push(e);
          }
          function k(t) {
            var e = t.completion || {};
            (e.type = "normal"), delete e.arg, (t.completion = e);
          }
          function T(t) {
            (this.tryEntries = [{ tryLoc: "root" }]),
              t.forEach(B, this),
              this.reset(!0);
          }
          function D(e) {
            if (e || "" === e) {
              var n = e[a];
              if (n) return n.call(e);
              if ("function" == typeof e.next) return e;
              if (!isNaN(e.length)) {
                var o = -1,
                  i = function n() {
                    for (; ++o < e.length; )
                      if (r.call(e, o))
                        return (n.value = e[o]), (n.done = !1), n;
                    return (n.value = t), (n.done = !0), n;
                  };
                return (i.next = i);
              }
            }
            throw new TypeError(br(e) + " is not iterable");
          }
          return (
            (v.prototype = y),
            o(I, "constructor", { value: y, configurable: !0 }),
            o(y, "constructor", { value: v, configurable: !0 }),
            (v.displayName = s(y, u, "GeneratorFunction")),
            (e.isGeneratorFunction = function (t) {
              var e = "function" == typeof t && t.constructor;
              return (
                !!e &&
                (e === v || "GeneratorFunction" === (e.displayName || e.name))
              );
            }),
            (e.mark = function (t) {
              return (
                Object.setPrototypeOf
                  ? Object.setPrototypeOf(t, y)
                  : ((t.__proto__ = y), s(t, u, "GeneratorFunction")),
                (t.prototype = Object.create(I)),
                t
              );
            }),
            (e.awrap = function (t) {
              return { __await: t };
            }),
            S(x.prototype),
            s(x.prototype, c, function () {
              return this;
            }),
            (e.AsyncIterator = x),
            (e.async = function (t, n, r, o, i) {
              void 0 === i && (i = Promise);
              var a = new x(A(t, n, r, o), i);
              return e.isGeneratorFunction(n)
                ? a
                : a.next().then(function (t) {
                    return t.done ? t.value : a.next();
                  });
            }),
            S(I),
            s(I, u, "Generator"),
            s(I, a, function () {
              return this;
            }),
            s(I, "toString", function () {
              return "[object Generator]";
            }),
            (e.keys = function (t) {
              var e = Object(t),
                n = [];
              for (var r in e) n.push(r);
              return (
                n.reverse(),
                function t() {
                  for (; n.length; ) {
                    var r = n.pop();
                    if (r in e) return (t.value = r), (t.done = !1), t;
                  }
                  return (t.done = !0), t;
                }
              );
            }),
            (e.values = D),
            (T.prototype = {
              constructor: T,
              reset: function (e) {
                if (
                  ((this.prev = 0),
                  (this.next = 0),
                  (this.sent = this._sent = t),
                  (this.done = !1),
                  (this.delegate = null),
                  (this.method = "next"),
                  (this.arg = t),
                  this.tryEntries.forEach(k),
                  !e)
                )
                  for (var n in this)
                    "t" === n.charAt(0) &&
                      r.call(this, n) &&
                      !isNaN(+n.slice(1)) &&
                      (this[n] = t);
              },
              stop: function () {
                this.done = !0;
                var t = this.tryEntries[0].completion;
                if ("throw" === t.type) throw t.arg;
                return this.rval;
              },
              dispatchException: function (e) {
                if (this.done) throw e;
                var n = this;
                function o(r, o) {
                  return (
                    (c.type = "throw"),
                    (c.arg = e),
                    (n.next = r),
                    o && ((n.method = "next"), (n.arg = t)),
                    !!o
                  );
                }
                for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                  var a = this.tryEntries[i],
                    c = a.completion;
                  if ("root" === a.tryLoc) return o("end");
                  if (a.tryLoc <= this.prev) {
                    var u = r.call(a, "catchLoc"),
                      s = r.call(a, "finallyLoc");
                    if (u && s) {
                      if (this.prev < a.catchLoc) return o(a.catchLoc, !0);
                      if (this.prev < a.finallyLoc) return o(a.finallyLoc);
                    } else if (u) {
                      if (this.prev < a.catchLoc) return o(a.catchLoc, !0);
                    } else {
                      if (!s)
                        throw Error("try statement without catch or finally");
                      if (this.prev < a.finallyLoc) return o(a.finallyLoc);
                    }
                  }
                }
              },
              abrupt: function (t, e) {
                for (var n = this.tryEntries.length - 1; n >= 0; --n) {
                  var o = this.tryEntries[n];
                  if (
                    o.tryLoc <= this.prev &&
                    r.call(o, "finallyLoc") &&
                    this.prev < o.finallyLoc
                  ) {
                    var i = o;
                    break;
                  }
                }
                i &&
                  ("break" === t || "continue" === t) &&
                  i.tryLoc <= e &&
                  e <= i.finallyLoc &&
                  (i = null);
                var a = i ? i.completion : {};
                return (
                  (a.type = t),
                  (a.arg = e),
                  i
                    ? ((this.method = "next"), (this.next = i.finallyLoc), g)
                    : this.complete(a)
                );
              },
              complete: function (t, e) {
                if ("throw" === t.type) throw t.arg;
                return (
                  "break" === t.type || "continue" === t.type
                    ? (this.next = t.arg)
                    : "return" === t.type
                    ? ((this.rval = this.arg = t.arg),
                      (this.method = "return"),
                      (this.next = "end"))
                    : "normal" === t.type && e && (this.next = e),
                  g
                );
              },
              finish: function (t) {
                for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                  var n = this.tryEntries[e];
                  if (n.finallyLoc === t)
                    return this.complete(n.completion, n.afterLoc), k(n), g;
                }
              },
              catch: function (t) {
                for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                  var n = this.tryEntries[e];
                  if (n.tryLoc === t) {
                    var r = n.completion;
                    if ("throw" === r.type) {
                      var o = r.arg;
                      k(n);
                    }
                    return o;
                  }
                }
                throw Error("illegal catch attempt");
              },
              delegateYield: function (e, n, r) {
                return (
                  (this.delegate = {
                    iterator: D(e),
                    resultName: n,
                    nextLoc: r,
                  }),
                  "next" === this.method && (this.arg = t),
                  g
                );
              },
            }),
            e
          );
        }
        function Ir(t, e, n, r, o, i, a) {
          try {
            var c = t[i](a),
              u = c.value;
          } catch (t) {
            return void n(t);
          }
          c.done ? e(u) : Promise.resolve(u).then(r, o);
        }
        function Sr(t, e) {
          var n = Object.keys(t);
          if (Object.getOwnPropertySymbols) {
            var r = Object.getOwnPropertySymbols(t);
            e &&
              (r = r.filter(function (e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable;
              })),
              n.push.apply(n, r);
          }
          return n;
        }
        function xr(t) {
          for (var e = 1; e < arguments.length; e++) {
            var n = null != arguments[e] ? arguments[e] : {};
            e % 2
              ? Sr(Object(n), !0).forEach(function (e) {
                  Er(t, e, n[e]);
                })
              : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n))
              : Sr(Object(n)).forEach(function (e) {
                  Object.defineProperty(
                    t,
                    e,
                    Object.getOwnPropertyDescriptor(n, e)
                  );
                });
          }
          return t;
        }
        function Er(t, e, n) {
          return (
            (e = (function (t) {
              var e = (function (t, e) {
                if ("object" != br(t) || !t) return t;
                var n = t[Symbol.toPrimitive];
                if (void 0 !== n) {
                  var r = n.call(t, e || "default");
                  if ("object" != br(r)) return r;
                  throw new TypeError(
                    "@@toPrimitive must return a primitive value."
                  );
                }
                return ("string" === e ? String : Number)(t);
              })(t, "string");
              return "symbol" == br(e) ? e : e + "";
            })(e)) in t
              ? Object.defineProperty(t, e, {
                  value: n,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (t[e] = n),
            t
          );
        }
        n(85524);
        var _r = function () {
            return (0, Y.ej)("_tob_tk_u_");
          },
          Br = {
            name: "ReaderPage",
            props: { normalBrowsers: { type: Boolean, default: !0 } },
            data: function () {
              return {
                chapterArr: [],
                catalogArr: [],
                initFlag: !1,
                isFreeReadEnd: !1,
                curChapterIndex: 0,
                isCtrlLayerShow: !1,
                isNoteListShow: !1,
                isCatalogShow: !1,
                anchorPosition: 0,
                toAhorOnce: !1,
                themeData: u,
                contentBgColor: "",
                hideTools: !1,
                initialStatus: !1,
                notesData: [],
                notesLineData: [],
                notePosition: {},
                nodeDataObj: {},
                pageY: 0,
                selectWidth: 0,
                fontz: localStorage.getItem("fontSize"),
                longpress_timeout: 400,
                mTouchSlopSquare: 10,
                bookInfo: {},
                jdGuideCloseChapter: -1,
                isShowBottomGudie: !0,
                showiframe: !1,
                jdGuideInfo: {},
                showH5Title: !1,
              };
            },
            computed: xr(
              xr(
                {},
                (0, a.Se)({
                  ebookId: "ebookId",
                  readStyle: "readStyle",
                  format: "format",
                  buyState: "buyState",
                  vwHeight: "vwH",
                  vwWidth: "vwW",
                  fontSize: "fontSize",
                  theme: "theme",
                  ebookName: "ebookName",
                  paperBookId: "paperBookId",
                  from: "from",
                  cover: "cover",
                  isFree: "isFree",
                  isVip: "isVip",
                  isLogin: "isLogin",
                  device: "device",
                  sizeArr: "sizeArr",
                  pcSizeArr: "pcSizeArr",
                  pageMaxWidth: "pageMaxWidth",
                  encPin: "encPin",
                })
              ),
              {},
              {
                iframeUrl: function () {
                  if (this.jdGuideInfo.link) {
                    var t = this.$route.query.env || "jdmp";
                    return this.jdGuideInfo.link.indexOf("?") >= 0
                      ? ""
                          .concat(this.jdGuideInfo.link, "&jdmpEnv=")
                          .concat(t, "&has_native=0")
                      : ""
                          .concat(this.jdGuideInfo.link, "?jdmpEnv=")
                          .concat(t, "&has_native=0");
                  }
                  return "about:blank";
                },
                isShowJdGuide: function () {
                  if (this.jdGuideCloseChapter == this.curChapterIndex)
                    return !1;
                  if (1 == this.jdGuideInfo.entry_type) {
                    if (
                      null == this.jdGuideInfo.link ||
                      null == this.jdGuideInfo.link ||
                      0 == this.jdGuideInfo.link.startsWith("http")
                    )
                      return !1;
                    var t = Math.max(
                        parseInt(this.jdGuideInfo.start_chapter) - 1,
                        0
                      ),
                      e = parseInt(this.jdGuideInfo.offset_chapter);
                    if (t >= 0 && t > this.curChapterIndex) return !1;
                    if (e <= 1) return !0;
                    if ((this.curChapterIndex - t) % e == 0) return !0;
                  }
                  return !1;
                },
                readComponent: function () {
                  return 1 === this.readStyle
                    ? "VerticleRead"
                    : "HorizontalRead";
                },
                displayFontSize: function () {
                  return 2 === this.readStyle || this.pageMaxWidth < 1e3
                    ? this.sizeArr[this.fontSize]
                    : this.pcSizeArr[this.fontSize];
                },
                displayTheme: function () {
                  var t = this;
                  return this.themeData.find(function (e) {
                    return e.name === t.theme;
                  });
                },
                isTouchDevice: function () {
                  return "ontouchstart" in window;
                },
              }
            ),
            components: {
              VerticleRead: ce,
              HorizontalRead: we,
              Catalog: Et,
              ReadFooter: Xe,
              sideTools: An,
              Catalogx: Lt,
            },
            watch: {
              isShowJdGuide: function (t, e) {
                if (!0 === t) {
                  var n = this.$route.query,
                    r = n.ebookId,
                    o = n.source,
                    i = [
                      {
                        click_type: 1,
                        res_id: r,
                        res_name: "阅读-悬浮窗-".concat(o || "jd"),
                      },
                    ];
                  (0, j.cR)(r, i);
                }
              },
              readStyle: function (t, e) {
                var n = this;
                (this.pageY = 0),
                  (this.toAhorOnce = !1),
                  (this.notesLineData = []),
                  t !== e &&
                    setTimeout(function () {
                      (n.notesLineData = pn(n.getReaderContent(), n.notesData)),
                        ir(n.ebookId, n.curChapterIndex, n.getReaderContent());
                    }, 300),
                  this.$nextTick(function () {
                    1 === t
                      ? (n.VerticleRead =
                          document.getElementById("vertical-read"))
                      : (n.HorizontalRead =
                          document.getElementById("horizontal-read"));
                  });
              },
              theme: {
                immediate: !0,
                handler: function (t, e) {
                  t !== e &&
                    (this.contentBgColor = this.themeData.find(function (e) {
                      return e.name === t;
                    }).contentBgColor),
                    "night" === t
                      ? document.body.classList.add("night")
                      : document.body.classList.remove("night");
                },
              },
              ebookId: function () {
                this.loadCatalogData();
              },
              $route: {
                handler: function (t, e) {
                  t.query.ebookId !== e.query.ebookId &&
                    (this.setEbookId(t.query.ebookId),
                    this.setCatalog([]),
                    window.location.reload());
                },
                deep: !0,
              },
            },
            created: function () {
              var t = this,
                e = function (e) {
                  t.$store.dispatch("updateDarkMode", e);
                };
              try {
                e(
                  window.matchMedia &&
                    window.matchMedia("(prefers-color-scheme: dark)").matches
                ),
                  window.matchMedia &&
                    window
                      .matchMedia("(prefers-color-scheme: dark)")
                      .addEventListener("change", function (t) {
                        e(t.matches);
                      });
              } catch (t) {}
              if (this.normalBrowsers) {
                var n = this.$route.query,
                  r = n.ebookId,
                  o = n.index,
                  i = n.chapterIndex,
                  a = n.from,
                  u = n.pt_key;
                u && !(0, Y.ej)("pt_key") && (0, Y.d8)("pt_key", u),
                  this.setEbookId(r);
                var s = window.innerWidth;
                (this.contentBgColor = this.themeData.find(function (e) {
                  return e.name === t.theme;
                }).contentBgColor),
                  s > this.pageMaxWidth && (s = this.pageMaxWidth),
                  this.setVwWidth(s),
                  this.setVwHeight(window.innerHeight),
                  a && !isNaN(a) ? this.setFrom(Number(a)) : this.setFrom(0);
                var A = parseInt(o),
                  f = parseInt(i);
                isNaN(A) && f > 0 && ((A = f - 1), (o = f - 1));
                var l = (0, c.cF)("cur_chapter_".concat(this.ebookId)),
                  h = Number.parseInt(this.ebookId),
                  d = h >= 34e6 && h <= 34999999 ? 0 : 1;
                if (
                  ((A === d || isNaN(A)) && (A = 0),
                  !l ||
                    (l && !l.index) ||
                    (3 === this.from && l && l.index !== A) ||
                    (l.index === d && 0 === A))
                ) {
                  var p = o ? (isNaN(A) ? 0 : A) : 0;
                  this.setCurChapterInfo({ index: p });
                }
                var g = this.$route.query.team_id || "",
                  m = this.$route.query.user_param;
                g && m
                  ? (0, j.lx)({ team_id: g || "", user_param: m || "" }).then(
                      function (e) {
                        e.result_code === pt.MR &&
                          ((0, Y.d8)("team_id", e.data.team_id),
                          (0, Y.d8)("user_param", m),
                          (0, Y.d8)("enc_pin", e.data.enc_pin),
                          t.setEncPin(e.data.enc_pin),
                          _r() && document.body.classList.add("tob-tk-u"),
                          e.result_code !== pt.Tm
                            ? (t.setIsLogin(!0), t.setTeamId(e.data.team_id))
                            : t.setIsLogin(!1),
                          t.loadCatalogData(),
                          (0, j.bG)({ sync: 1, auto: 0 }).then(function (e) {
                            e.result_code === pt.MR && t.setUserInfo(e.data);
                          }));
                      }
                    )
                  : _r() || (0, Y.ej)("jdread_token")
                  ? (_r() && document.body.classList.add("tob-tk-u"),
                    this.setIsLogin(!0),
                    (0, j.bG)({ sync: 1, auto: 0 }).then(function (e) {
                      e.result_code === pt.MR && t.setUserInfo(e.data);
                    }),
                    this.catalogArr.length < 1
                      ? this.loadCatalogData()
                      : ((this.requestIndexArr = ht(
                          this.catalogArr,
                          this.format
                        )),
                        this.loadChapterData()))
                  : this.loadCatalogData(),
                  window.timer && clearInterval(window.timer);
              }
            },
            mounted: function () {
              var t = this;
              window.attachEvent
                ? window.attachEvent(
                    "onscroll",
                    function (e) {
                      t.pageY = e.target.scrollTop;
                    },
                    !0
                  )
                : window.addEventListener &&
                  window.addEventListener(
                    "scroll",
                    function (e) {
                      t.pageY = e.target.scrollTop;
                    },
                    !0
                  ),
                document.addEventListener("selectionchange", function () {
                  t.isTouchDevice &&
                    t.$refs.readerContent &&
                    !t.$refs.readerContent.isShowIdeaBox() &&
                    document.getSelection().removeAllRanges();
                }),
                (window.onorientationchange = function () {
                  window.location.reload();
                }),
                1 === this.readStyle
                  ? ((this.VerticleRead =
                      document.getElementById("vertical-read")),
                    (this.lastPos = this.VerticleRead.scrollTop))
                  : (this.HorizontalRead =
                      document.getElementById("horizontal-read")),
                (window.$willLeave = this.scrollLoad.bind(this)),
                this.setJdGuideInfo(),
                1 == this.$route.query.showH5Title &&
                  ((this.showH5Title = (0, gn.hideJdTitleButton)()),
                  this.iframeLoaded());
            },
            beforeDestroy: function () {
              var t;
              1 === this.readStyle &&
                (null === (t = this.VerticleRead) ||
                  void 0 === t ||
                  t.removeEventListener("scroll", this.scrollFn));
              window.finalSyncReadData();
            },
            methods: xr(
              xr(
                xr(
                  {},
                  (0, a.OI)({
                    setBuyState: "SET_BUY_STATE",
                    setCurChapterInfo: "SET_CUR_CHAPTER_INFO",
                    setVwWidth: "SET_VW_WIDTH",
                    setVwHeight: "SET_VW_HEIGHT",
                    setEbookName: "SET_EBOOK_NAME",
                    setCatalog: "SET_CATALOG",
                    setEbookId: "SET_EBOOK_ID",
                    setFrom: "SET_FROM",
                    setCover: "SET_COVER",
                    setFormat: "SET_FORMAT",
                    setPaperBookId: "SET_PAPER_BOOK_ID",
                    setIsFree: "SET_IS_FREE",
                    setIsLogin: "SET_IS_LOGIN",
                    setTeamId: "SET_TEAM_ID",
                    setUserInfo: "SET_USER_INFO",
                    setEncPin: "SET_ENC_PIN",
                  })
                ),
                (0, a.OI)({ setException: "SET_EXCEPTION" })
              ),
              {},
              {
                epubEmptyLogs: function () {
                  var t = this.bookInfo,
                    e = t.format,
                    n = t.ebook_name,
                    r = this.ebookId;
                  if ("epub" === e) {
                    var o = [
                      {
                        res_type: 7,
                        click_type: 10,
                        mod_id: "",
                        mod_name: "emptyDirectoryErrorLogs",
                        res_id: r,
                        res_name: n,
                      },
                    ];
                    (0, j.qF)(r, o);
                  }
                },
                getReaderContent: function () {
                  return 1 === this.readStyle
                    ? document.querySelector(".reader-chapter-content")
                    : document.querySelector(".horizontal-read-container");
                },
                touchstart: function () {
                  var t = this;
                  if (_r()) {
                    if (!(event.targetTouches.length > 1))
                      return this.$refs.readerContent.isIdeaToolBarShow()
                        ? (this.$refs.readerContent.closeIdeaToolBar(),
                          "LONGCLICK" === this.touchType &&
                            this.touchStartEvent.target.style &&
                            this.touchStartEvent.target.style.removeProperty(
                              "background-color"
                            ),
                          void (this.interceptTouchEvent = !0))
                        : void (
                            event.target &&
                            event.target instanceof HTMLParagraphElement &&
                            ((this.interceptTouchEvent = !1),
                            (this.touchType = "UNKNOW"),
                            (this.timeTouchStart = new Date().getTime()),
                            (this.touchStartEvent = event),
                            (this.longTouchTimeout = setTimeout(function () {
                              "UNKNOW" === t.touchType &&
                                ((t.touchType = "LONGCLICK"),
                                t.touchStartEvent.target.style.setProperty(
                                  "background-color",
                                  "rgba(32, 120, 251, 0.15)"
                                ));
                            }, this.longpress_timeout)))
                          );
                    this.interceptTouchEvent = !0;
                  }
                },
                touchmove: function () {
                  if (
                    _r() &&
                    event.target &&
                    event.target instanceof HTMLParagraphElement &&
                    !this.interceptTouchEvent
                  )
                    if (
                      (1 === this.readStyle &&
                        Math.abs(
                          event.changedTouches[0].pageX -
                            this.touchStartEvent.changedTouches[0].pageX
                        ) >
                          Math.abs(
                            event.changedTouches[0].pageY -
                              this.touchStartEvent.changedTouches[0].pageY
                          ) &&
                        event.preventDefault(),
                      "UNKNOW" === this.touchType)
                    ) {
                      var t = Math.pow(
                          event.changedTouches[0].pageX -
                            this.touchStartEvent.changedTouches[0].pageX,
                          2
                        ),
                        e = Math.pow(
                          event.changedTouches[0].pageY -
                            this.touchStartEvent.changedTouches[0].pageY,
                          2
                        );
                      (new Date().getTime() - this.timeTouchStart <=
                        this.longpress_timeout &&
                        t + e < this.mTouchSlopSquare) ||
                        (t + e < this.mTouchSlopSquare
                          ? (this.touchType = "LONGCLICK")
                          : (this.touchType = "TAP"));
                    } else
                      "LONGCLICK" === this.touchType &&
                        this.touchStartEvent.target.style.setProperty(
                          "background-color",
                          "rgba(32, 120, 251, 0.15)"
                        );
                },
                touchend: function () {
                  _r() &&
                    (clearTimeout(this.longTouchTimeout),
                    event.target &&
                      event.target instanceof HTMLParagraphElement &&
                      (this.interceptTouchEvent
                        ? event.preventDefault()
                        : "LONGCLICK" === this.touchType &&
                          this.showTouchReaderFo(event)));
                },
                showTouchReaderFo: function (t) {
                  var e,
                    n,
                    r = 0,
                    o = 0;
                  if (1 === this.readStyle)
                    t.target.offsetTop - this.pageY > 80
                      ? ((r = 0), (o = t.target.offsetTop - 80))
                      : t.target.offsetTop + t.target.offsetHeight + 80 <
                        this.pageY + this.vwHeight
                      ? ((r = 180),
                        (o = t.target.offsetTop + t.target.offsetHeight + 10))
                      : ((r = 0), (o = this.pageY + this.vwHeight / 2 - 40)),
                      (e = t.target.offsetWidth / 2 + t.target.offsetLeft - 60),
                      (n = document.querySelector(".reader-chapter-content"));
                  else {
                    var i = this.getReaderContent().clientHeight;
                    if (t.target.offsetTop + t.target.offsetHeight > i) {
                      var a = (t.target.offsetTop + t.target.offsetHeight) % i;
                      t.changedTouches[0].pageY < t.target.offsetTop ||
                      (t.changedTouches[0].pageY > t.target.offsetTop &&
                        t.changedTouches[0].pageY < a)
                        ? ((r = 180), (o = a + 40))
                        : ((r = 0), (o = t.target.offsetTop - 50)),
                        (o > i || o < 90) && ((r = 0), (o = i / 2 - 40));
                    } else
                      t.target.offsetTop > 50
                        ? ((r = 0), (o = t.target.offsetTop - 50))
                        : t.target.offsetTop + t.target.offsetHeight + 40 < i
                        ? ((r = 180),
                          (o = t.target.offsetTop + t.target.offsetHeight + 40))
                        : ((r = 0), (o = this.pageHeight / 2 - 40));
                    (e = t.target.offsetWidth / 2 - 60),
                      (n = document.querySelector(
                        ".horizontal-read-container"
                      ));
                  }
                  if (n) {
                    this.nodeDataObj = (function (t, e) {
                      var n = t.innerText,
                        r = {},
                        o = e.childNodes,
                        i = o.length;
                      1 === i &&
                        o[0] !== t &&
                        (i = (o = (e = e.childNodes[0]).childNodes).length);
                      for (var a, c = null, u = 0; u < i; u++)
                        if (o[u] === t) {
                          c = u;
                          break;
                        }
                      return (
                        (a = c),
                        (r.fromOffsetInPara = 0),
                        (r.toOffsetInPara = n.length),
                        {
                          from_para_index: c,
                          to_para_index: a,
                          quote_text: n,
                          from_offset_in_para: r.fromOffsetInPara,
                          to_offset_in_para: r.toOffsetInPara,
                        }
                      );
                    })(t.target, n);
                    for (var c = 0; c < this.notesData.length; c++) {
                      var u = this.notesData[c];
                      if (
                        u.from_para_index ===
                          this.nodeDataObj.from_para_index &&
                        u.to_para_index === this.nodeDataObj.to_para_index &&
                        u.from_offset_in_para ===
                          this.nodeDataObj.from_offset_in_para &&
                        u.to_offset_in_para ===
                          this.nodeDataObj.to_offset_in_para
                      )
                        return (
                          this.touchStartEvent.target.style.removeProperty(
                            "background-color"
                          ),
                          void this.$toast("本段内容已存在笔记，不可重复添加")
                        );
                    }
                    this.$refs.readerContent.openIdeaToolBar(),
                      this.$set(this.notePosition, "x", e + "px"),
                      this.$set(this.notePosition, "y", o + "px"),
                      this.$set(
                        this.notePosition,
                        "xz",
                        "rotate(" + r + "deg)"
                      ),
                      this.$set(this.notePosition, "flag", !0),
                      this.$set(this.notePosition, "noteInfo", "");
                  } else
                    this.touchStartEvent.target.style.removeProperty(
                      "background-color"
                    );
                },
                showReaderFo: function (t, e, n) {
                  (this.selectWidth = 1),
                    this.$refs.readerContent.openIdeaToolBar(),
                    this.$set(
                      this.notePosition,
                      "x",
                      t.clientX -
                        (document.body.clientWidth - this.vwWidth) / 2 -
                        60 +
                        "px"
                    ),
                    this.$set(
                      this.notePosition,
                      "y",
                      t.clientY + this.pageY + 30 + "px"
                    ),
                    this.$set(this.notePosition, "xz", "rotate(180deg)"),
                    this.$set(this.notePosition, "flag", !1),
                    this.$set(this.notePosition, "noteInfo", e);
                },
                loadChapterData: function () {
                  var t = this,
                    e =
                      arguments.length > 0 && void 0 !== arguments[0]
                        ? arguments[0]
                        : "next",
                    n = this.getRelativeIndex(),
                    r = this.requestIndexArr[n.index];
                  this.curChapterIndex = r.chapter_index;
                  var o = this.chapterArr.find(function (e) {
                    return e.chapter_index === t.curChapterIndex;
                  });
                  if (((this.notesLineData = []), o))
                    0 === n.index &&
                      "next" !== e &&
                      setTimeout(function () {
                        t.getNotesFoo(t.requestIndexArr[1].chapter_item);
                      }, 300),
                      !o.can_read && window.timer
                        ? window.finalSyncReadData()
                        : ((window.actionTime = 0),
                          (window.changeChapterTime = 0),
                          window.reStartRecoedData()),
                      wr() &&
                        o.can_read &&
                        setTimeout(function () {
                          t.ttsAction("auto");
                        }, 500),
                      this.$loading(!1, this.theme);
                  else {
                    this.$loading(!0, this.theme);
                    var i =
                      "txt" === this.format
                        ? { type: r.type, ids: r.chapter_id }
                        : {
                            indexes: (function (e) {
                              if (e.children) {
                                var n = e.children.find(function (t) {
                                  return !t.is_try && t.is_buy;
                                });
                                if (n) return n.chapter_index;
                                var r = e.children.find(function (t) {
                                  return t.is_try;
                                });
                                if (r) return r.chapter_index;
                              }
                              return t.curChapterIndex;
                            })(r),
                          };
                    (0, j.Kr)(
                      xr(
                        { ebookId: this.ebookId, enc: 1, enc_pin: this.encPin },
                        i
                      )
                    )
                      .then(function (o) {
                        var i = JSON.parse(o);
                        if (i.result_code === pt.MR) {
                          var a,
                            u = i.data.chapter[0];
                          if (u.can_read && !u.content)
                            return (
                              t.$loading(!1, t.theme),
                              t.setException(2),
                              t.$toast("书籍资源异常"),
                              "epub" ===
                                (null === (a = i.data) || void 0 === a
                                  ? void 0
                                  : a.content_type) && t.epubEmptyLogs(),
                              !1
                            );
                          (u.chapter_index = r.chapter_index),
                            "txt" === t.format
                              ? (!r.format && (r.format = t.format),
                                !u.chapter_id && (u.chapter_id = u.volume_id))
                              : (u.chapter_id = r.chapter_id);
                          var s = function () {
                            var e = t.requestIndexArr[n.index],
                              r = e.chapter_id,
                              o = e.chapter_index,
                              i = e.chapter_name,
                              a = t.requestIndexArr.length,
                              c = "night" === t.theme ? "night" : "",
                              u = t.device.isAndroid ? "android" : "";
                            return '\n              <div class="try-read-ending '
                              .concat(c, " ")
                              .concat(
                                u,
                                '">\n                <div class="inner-content-wrap">\n                  <div class="ending-title">试读已结束</div>\n                    <div class="ending-title">'
                              )
                              .concat(
                                "登录后更多精彩内容等着您~",
                                '</div>\n                      <div class="user-buy-enters">\n                        <div class="buy-btns" '
                              )
                              .concat("onclick", '="')
                              .concat("login", "('")
                              .concat(t.ebookId, "','")
                              .concat(r, "','")
                              .concat(o, "','")
                              .concat(a, "', '")
                              .concat(i, "')\">\n                          ")
                              .concat(
                                "登录",
                                "\n                      </div>\n                    </div>\n                  </div>\n              </div>"
                              );
                          };
                          u.can_read
                            ? lt(u.content, r, function (o) {
                                if ("epub" === t.format) {
                                  var i = r.children
                                    .slice(1)
                                    .filter(function (t) {
                                      return !t.is_try && !t.is_buy;
                                    });
                                  if (i.length)
                                    (o += s()),
                                      (o += i
                                        .map(function (t) {
                                          return '<div id="'.concat(
                                            t.anchor,
                                            '"></div>'
                                          );
                                        })
                                        .join(""));
                                  else {
                                    var a = t.requestIndexArr[n.nextIndex];
                                    !a ||
                                      a.is_try ||
                                      a.is_buy ||
                                      a.$is_try ||
                                      (o += s());
                                  }
                                }
                                var A = r.url,
                                  f = r.chapter_name,
                                  l = r.chapter_item,
                                  h = r.anchors,
                                  d = void 0 === h ? [] : h,
                                  p = r.isFirst,
                                  g = void 0 !== p && p,
                                  m = r.isLast,
                                  v = void 0 !== m && m;
                                "next" === e
                                  ? "txt" === t.format ||
                                    1 !== n.index ||
                                    (1 === n.index && !t.chapterArr[0])
                                    ? t.chapterArr.push(
                                        Object.assign({}, u, {
                                          content: o,
                                          anchors: d,
                                          url: A,
                                          name: f,
                                          isFirst: g,
                                          isLast: v,
                                          chapterItem: l,
                                        })
                                      )
                                    : t.chapterArr[0].content.indexOf(o) < 0 &&
                                      (t.$set(
                                        t.chapterArr[0],
                                        "content",
                                        t.chapterArr[0].content + o
                                      ),
                                      t.$set(t.chapterArr[0], "isLast", v))
                                  : (t.chapterArr.unshift(
                                      Object.assign({}, u, {
                                        content: o,
                                        anchors: d,
                                        url: A,
                                        name: f,
                                        isFirst: g,
                                        isLast: v,
                                        chapterItem: l,
                                      })
                                    ),
                                    1 === t.readStyle &&
                                      t.$nextTick(function () {
                                        var e,
                                          n =
                                            null ===
                                              (e =
                                                document.getElementsByClassName(
                                                  "reader-chapter-content"
                                                )[0]) || void 0 === e
                                              ? void 0
                                              : e.offsetHeight;
                                        (t.VerticleRead.scrollTop = n || 0),
                                          window.reStartRecoedData();
                                      })),
                                  0 === n.index && "epub" === t.format
                                    ? t.getNextChapter()
                                    : t.$nextTick(function () {
                                        if (
                                          (t.$loading(!1, t.theme),
                                          (window.checkTime = 0),
                                          (window.changeChapterTime = 0),
                                          !t.toAhorOnce)
                                        ) {
                                          var e = (0, c.cF)(
                                            "cur_chapter_".concat(t.ebookId)
                                          ).anchor;
                                          t.goToAnchor(e);
                                        }
                                      });
                              })
                            : (window.finalSyncReadData(),
                              "epub" === t.format && (t.isFreeReadEnd = !0),
                              t.chapterArr.push(
                                Object.assign({}, u, {
                                  content: s(),
                                  anchors: "",
                                })
                              ),
                              t.$nextTick(function () {
                                t.$loading(!1);
                              })),
                            wr() &&
                              u.can_read &&
                              setTimeout(function () {
                                t.ttsAction("auto");
                              }, 800),
                            setTimeout(function () {
                              t.notesLineData = pn(
                                t.getReaderContent(),
                                t.notesData
                              );
                            }, 300);
                        } else
                          t.$loading(!1),
                            t.$toast("此书非畅读书籍，请联系管理员"),
                            t.setException(3);
                      })
                      .catch(function (e) {
                        t.$loading(!1, t.theme);
                      });
                  }
                  this.getNotesFoo(r.chapter_item), this.selfAdaption();
                },
                loadCatalogData: function () {
                  var t = this;
                  (0, j.zm)({ ebookId: this.ebookId })
                    .then(function (e) {
                      if (e.result_code === pt.MR) {
                        var n = e.data,
                          r = (n.can_vip_read, n.format),
                          o = (n.free_book, n.image_url),
                          i = n.is_already_buy,
                          a = n.paper_book_id,
                          u = n.ebook_name,
                          s = n.yuewen_free;
                        if (
                          ((t.bookInfo.ebook_name = u),
                          (t.bookInfo.format = r),
                          (t.bookInfo.yuewen_free = s),
                          "epub" !== r && "txt" !== r)
                        )
                          return void t.$toast("暂不支持此类型书籍");
                        if (e.data.chapter_info.length < 1)
                          return (
                            "epub" === e.data.format && t.epubEmptyLogs(),
                            void t.setException(2)
                          );
                        var A = ht(e.data.chapter_info, r);
                        (t.catalogArr = Object.freeze(e.data.chapter_info)),
                          (t.requestIndexArr = A),
                          t.setCover(o),
                          t.setFormat(r),
                          t.setBuyState(i),
                          t.setPaperBookId(a),
                          t.setEbookName(u);
                        var f =
                            (0, c.cF)("cur_chapter_".concat(t.ebookId)).index ||
                            0,
                          l = A.find(function (t) {
                            return t.chapter_index === f;
                          });
                        if (
                          (l &&
                            t.setCurChapterInfo({
                              chapterId: l.chapter_id,
                              chapterName: l.chapter_name,
                              index: l.chapter_index,
                              anchor: l.anchor || "",
                              url: l.url,
                              chapterItem: l.chapter_item,
                              rate: 0,
                            }),
                          t.isLogin)
                        )
                          if (t.catalogArr[0].chapter_item) {
                            var h = "epub" === r ? 1 : 2;
                            t.syncReadingProgtess(h, "", function (e) {
                              if (e.result_code === pt.MR) {
                                var n = e.data[0].list,
                                  o =
                                    n &&
                                    n.find(function (t) {
                                      return 0 === t.data_type;
                                    });
                                if (o) {
                                  var i,
                                    a = o.chapter_id,
                                    c = o.offset,
                                    u = o.epub_chapter_title,
                                    s = o.id,
                                    A = o.para_idx,
                                    f = o.offset_in_para;
                                  if (
                                    (s || (s = null),
                                    window.sessionStorage.setItem(
                                      "syncProgressObj",
                                      JSON.stringify({
                                        para_idx: A,
                                        offset_in_para: f,
                                      })
                                    ),
                                    !a || 3 === t.from)
                                  )
                                    return t.loadChapterData();
                                  if (t.catalogArr[0].chapter_item) {
                                    var l = o.chapter_id;
                                    i = t.catalogArr.find(function (t) {
                                      return (
                                        t.chapter_id === l ||
                                        t.chapter_item === l
                                      );
                                    });
                                  } else
                                    i = u
                                      ? t.catalogArr.find(function (t) {
                                          return t.chapter_name === u;
                                        })
                                      : t.catalogArr.find(function (t) {
                                          return t.chapter_item === a;
                                        });
                                  i &&
                                    t.setCurChapterInfo({
                                      chapterItem: i.chapter_item,
                                      chapterId: i.chapter_id,
                                      chapterName: i.chapter_name,
                                      index:
                                        i.chapter_index !==
                                        ("epub" === r ? 1 : 0)
                                          ? i.chapter_index
                                          : 0,
                                      anchor: i.anchor || "",
                                      url: i.url,
                                      rate: c,
                                    });
                                }
                                t.loadChapterData();
                              } else t.loadChapterData();
                            });
                          } else t.loadChapterData();
                        else t.loadChapterData();
                        var d =
                          1 == t.$route.query.showH5Title ? "免费读小说" : u;
                        if (((document.title = d), t.device.isIphone)) return;
                        setTimeout(function () {
                          document.title = d;
                          var t = document.createElement("iframe");
                          (t.style.visibility = "hidden"),
                            (t.style.width = "1px"),
                            (t.style.height = "1px"),
                            (t.onload = function () {
                              setTimeout(function () {
                                document.body.removeChild(t);
                              }, 0);
                            }),
                            document.body.appendChild(t);
                        }, 300);
                      }
                    })
                    .catch(function (t) {});
                },
                getRelativeIndex: function () {
                  if (this.requestIndexArr) {
                    var t = {},
                      e = (0, c.cF)("cur_chapter_".concat(this.ebookId)),
                      n = e ? Number(e.index) : 0,
                      r = this.requestIndexArr.findIndex(function (t) {
                        return t.chapter_index === n;
                      });
                    if (r < 0) {
                      var o = this.catalogArr[n];
                      (r = this.requestIndexArr.findIndex(function (t) {
                        return t.url === o.url;
                      })),
                        (r = Math.max(0, r));
                    }
                    var i = r - 1 >= 0 ? r - 1 : 0,
                      a = (this.requestIndexArr.length, r + 1);
                    return (
                      (t.index = r), (t.prevIndex = i), (t.nextIndex = a), t
                    );
                  }
                },
                goToAnchor: function (t) {
                  var e = this,
                    n =
                      (0, c.cF)("cur_chapter_".concat(this.ebookId)).index || 0;
                  if (n && !isNaN(Number(n))) {
                    var r = this.catalogArr.find(function (t) {
                        return t.chapter_index === Number(n);
                      }),
                      o = t || (r ? r.anchor : "");
                    o && (0, c.po)("fromAnchor", "1");
                    var i =
                        document.getElementById(o) ||
                        document.getElementsByName("".concat(o))[0],
                      a =
                        window.sessionStorage.getItem("syncProgressObj") &&
                        JSON.parse(
                          window.sessionStorage.getItem("syncProgressObj")
                        ),
                      u = (0, c.cF)("cur_chapter_".concat(this.ebookId)),
                      s = u.paraOffset;
                    if (i && 3 === this.from)
                      if (1 === this.readStyle)
                        (this.anchorPosition = i.offsetTop - 50),
                          (this.VerticleRead.scrollTop = this.anchorPosition);
                      else {
                        for (
                          ;
                          "horizontal-read-container" !== i.parentElement.id;

                        )
                          i = i.parentElement;
                        for (var A = 0; null != (i = i.previousSibling); ) A++;
                        this.anchorPosition = A;
                      }
                    else if (s && 3 === this.from)
                      1 === this.readStyle
                        ? ((this.anchorPosition = document.querySelector(
                            ".reader-chapter-content"
                          ).childNodes[s].offsetTop),
                          (this.VerticleRead.scrollTop = this.anchorPosition))
                        : (this.anchorPosition = s);
                    else if (a && a.para_idx && 3 !== this.from)
                      if (1 === this.readStyle) {
                        if (
                          ((this.anchorPosition = document.querySelector(
                            ".reader-chapter-content"
                          ).childNodes[a.para_idx].offsetTop),
                          a.offset_in_para)
                        ) {
                          var f = Math.floor(
                              this.vwWidth / this.displayFontSize
                            ),
                            l = this.fontSize < 2 ? 1.8 : 1.7;
                          this.anchorPosition +=
                            Math.floor((a.offset_in_para + 2) / f) * l;
                        }
                        this.VerticleRead.scrollTop = this.anchorPosition;
                      } else this.anchorPosition = a.para_idx;
                    else if (3 !== this.from && !a && !i && u.rate > 0)
                      if (1 === this.readStyle) {
                        var h = document.querySelector(
                          ".reader-chapter-content"
                        );
                        if (!h) return;
                        (this.anchorPosition = h.offsetHeight * u.rate),
                          (this.VerticleRead.scrollTop = this.anchorPosition);
                      } else {
                        var d = document.querySelector(
                          ".horizontal-read-container"
                        ).children.length;
                        this.anchorPosition = Math.floor(d * u.rate);
                      }
                    this.$nextTick(function () {
                      (0, c.L_)("fromAnchor"),
                        window.sessionStorage.removeItem("syncProgressObj"),
                        window.startReadingData(),
                        setTimeout(function () {
                          e.toAhorOnce = !0;
                        }, 200);
                    }),
                      1 === this.readStyle &&
                        ((this.scrollFn = (0, M.Ds)(this.scrollLoad, 300).bind(
                          this
                        )),
                        this.VerticleRead.addEventListener(
                          "scroll",
                          this.scrollFn,
                          !1
                        ));
                  } else
                    1 === this.readStyle &&
                      ((this.scrollFn = (0, M.Ds)(this.scrollLoad, 300).bind(
                        this
                      )),
                      this.VerticleRead.addEventListener(
                        "scroll",
                        this.scrollFn,
                        !1
                      ),
                      (this.toAhorOnce = !0));
                  setTimeout(function () {
                    e.isHideAppGuide = !0;
                  }, 400);
                },
                getNextChapter: function () {
                  if (this.requestIndexArr) {
                    var t = this.getRelativeIndex();
                    if (this.requestIndexArr[t.nextIndex]) {
                      if (t.index === t.nextIndex)
                        return (
                          this.$loading(!1, this.theme),
                          void this.$toast("已经是最后一章了~")
                        );
                      var e = this.$route.query.source;
                      if (
                        0 == this.isLogin &&
                        t.index % 3 == 0 &&
                        t.index > 0 &&
                        null != e &&
                        null != e &&
                        e.length > 0 &&
                        e.indexOf("jd_promote") > -1
                      )
                        window.login();
                      else {
                        var n = this.requestIndexArr[t.nextIndex];
                        this.setCurChapterInfo({
                          chapterId: n.chapter_id,
                          chapterName: n.chapter_name,
                          index: n.chapter_index,
                          anchor: n.anchor || "",
                          url: n.url,
                          chapterItem: n.chapter_item,
                          rate: 0,
                        }),
                          this.loadChapterData();
                      }
                    } else this.$loading(!1, this.theme);
                  }
                },
                getPrevChapter: function () {
                  if (this.requestIndexArr) {
                    var t = this.getRelativeIndex();
                    if (
                      t.index !== t.prevIndex &&
                      !document.getElementById(
                        "chapter-"
                          .concat(this.ebookId, "-")
                          .concat(this.requestIndexArr[t.prevIndex].chapter_id)
                      )
                    ) {
                      var e =
                          t.prevIndex !== ("epub" === this.format ? 1 : 0)
                            ? t.prevIndex
                            : 0,
                        n = this.requestIndexArr[e];
                      this.setCurChapterInfo({
                        chapterId: n.chapter_id,
                        chapterName: n.chapter_name,
                        index: n.chapter_index,
                        anchor: n.anchor || "",
                        url: n.url,
                        chapterItem: n.chapter_item,
                        rate: 0,
                      }),
                        this.loadChapterData("prev");
                    }
                  }
                },
                getCurrentChapter: function (t) {
                  var e = this,
                    n = "",
                    r = document.querySelector(".reader-chapter-content");
                  if (r) {
                    var o = this.requestIndexArr.find(function (t) {
                      return t.chapter_index === e.curChapterIndex;
                    });
                    if (o && o.anchors)
                      for (
                        var i = r.getAttribute("anchors").split(","),
                          a = i.length,
                          c = 0;
                        c < a;
                        c++
                      ) {
                        var u = i[c],
                          s =
                            u &&
                            (document.querySelector("#".concat(u)) ||
                              document.querySelector("[name=".concat(u, "]"))),
                          A = void 0;
                        if (i[c + 1]) {
                          var f = i[c + 1];
                          A =
                            f &&
                            (document.querySelector("#".concat(f)) ||
                              document.querySelector("[name=".concat(f, "]")));
                        }
                        var l = 0;
                        if (
                          ((l = A
                            ? A && A.offsetTop
                            : r.offsetTop + r.offsetHeight),
                          s &&
                            t >= s.offsetTop - this.vwHeight / 2 &&
                            t < l - this.vwHeight / 2)
                        ) {
                          n = u;
                          break;
                        }
                      }
                    return {
                      pos: r.offsetTop,
                      id: r.getAttribute("id").split("-")[2],
                      height: r.offsetHeight,
                      currentAnchor: n,
                    };
                  }
                },
                contentChanged: function () {
                  this.scrollFn && this.scrollFn();
                },
                scrollLoad: function (t) {
                  window.checkTime = 0;
                  var e = this.VerticleRead.scrollTop;
                  if (
                    ((window.curScrollY = e),
                    "down" !== (e - this.lastPos >= 0 ? "down" : "up") ||
                      !this.isFreeReadEnd)
                  ) {
                    this.lastPos = e;
                    var n = this.getCurrentChapter(e);
                    if (n) {
                      var r = this.requestIndexArr.findIndex(function (t) {
                        return t.chapter_id === n.id;
                      });
                      "epub" === this.format &&
                        (r =
                          r > 1
                            ? r
                            : Math.min(1, this.requestIndexArr.length - 1));
                      var o = this.requestIndexArr[r],
                        i = Math.round(((e - n.pos) / n.height) * 100) / 100;
                      if (
                        (i > 1 && (i = 1),
                        i < 0 && (i = 0),
                        this.setCurChapterInfo({
                          chapterId: o.chapter_id,
                          chapterName: o.chapter_name,
                          index: o.chapter_index,
                          anchor: n.currentAnchor || "",
                          url: o.url,
                          chapterItem: o.chapter_item,
                          rate: i,
                        }),
                        o.chapter_item)
                      ) {
                        var a = 0,
                          c = 0;
                        (o.is_buy || o.is_try || o.$is_try) &&
                          ((a = window.getStartParaIdx()),
                          (c = this.getOffsetInPara(a)));
                        var u = "";
                        if (n.currentAnchor) {
                          var s = this.catalogArr.find(function (t) {
                            return (
                              t.anchor === n.currentAnchor &&
                              t.chapter_item === o.chapter_item
                            );
                          });
                          u = (s && s.chapter_name) || o.chapter_name;
                        } else u = o.chapter_name;
                        var A = "epub" === this.format ? 1 : 2,
                          f = [
                            {
                              action: "create",
                              data_type: 0,
                              force: 2,
                              para_idx: a,
                              offset_in_para: c,
                              chapter_id: o.chapter_item,
                              epub_chapter_title: u,
                              quote_text: "",
                              percent:
                                this.$refs.readerContent.getReadPercent(),
                              created_at: Math.round(
                                new Date().getTime() / 1e3
                              ),
                            },
                          ];
                        if (!_r() && !(0, Y.ej)("jdread_token")) return;
                        return (0, j.vn)([
                          {
                            version: 0,
                            ebook_id: this.ebookId,
                            format: A,
                            list: f,
                          },
                        ]).then(function () {});
                      }
                    }
                  }
                },
                horizonChangePage: function (t, e, n, r) {
                  if (t) {
                    var o = this.requestIndexArr.findIndex(function (e) {
                      return e.chapter_id === t;
                    });
                    if (!(o < 0)) {
                      "epub" === this.format &&
                        (o =
                          o > 1
                            ? o
                            : Math.min(1, this.requestIndexArr.length - 1));
                      var i = this.requestIndexArr[o];
                      if (
                        ((n = (n > 1 ? 1 : n < 0 && 0) || n),
                        this.setCurChapterInfo({
                          chapterId: i.chapter_id,
                          chapterName: i.chapter_name,
                          index: i.chapter_index,
                          anchor: e || "",
                          url: i.url,
                          chapterItem: i.chapter_item,
                          rate: n,
                        }),
                        i.chapter_item)
                      ) {
                        var a = window.getStartParaIdx(),
                          c = "";
                        if (e) {
                          var u = this.catalogArr.find(function (t) {
                            return (
                              t.anchor === e &&
                              t.chapter_item === i.chapter_item
                            );
                          });
                          c = (u && u.chapter_name) || i.chapter_name;
                        } else c = i.chapter_name;
                        var s = "epub" === this.format ? 1 : 2,
                          A = [
                            {
                              action: "create",
                              data_type: 0,
                              force: 2,
                              para_idx: a,
                              offset_in_para: 0,
                              chapter_id: i.chapter_item,
                              epub_chapter_title: c,
                              quote_text: "",
                              percent:
                                this.$refs.readerContent.getReadPercent(),
                              created_at: Math.round(
                                new Date().getTime() / 1e3
                              ),
                            },
                          ];
                        if (!_r() && !(0, Y.ej)("jdread_token")) return;
                        (0, j.vn)([
                          {
                            version: 0,
                            ebook_id: this.ebookId,
                            format: s,
                            list: A,
                          },
                        ]).then(function () {});
                      }
                    }
                  }
                },
                changeChapter: function (t) {
                  "next" === t ? this.getNextChapter() : this.getPrevChapter(),
                    this.isCtrlLayerShow && (this.isCtrlLayerShow = !1);
                },
                showCtrlLayer: function (t) {
                  "off" !== t
                    ? ((this.isCtrlLayerShow = !this.isCtrlLayerShow),
                      (window.checkTime = 0),
                      (this.anchorPosition = window.getStartParaIdx()))
                    : (this.isCtrlLayerShow = !1);
                },
                showCatalogx: function () {
                  this.isNoteListShow = !0;
                },
                ttsAction: function (t) {
                  var e = this,
                    n = this.chapterArr.find(function (t) {
                      return t.chapter_index === e.curChapterIndex;
                    });
                  if (!n || n.can_read) {
                    "mobile" == t && this.showCtrlLayer("off");
                    var r = this.getReaderContent();
                    if (or())
                      t && "auto" != t && this.$toast("已关闭语音朗读"),
                        (function (t, e, n) {
                          if (((zn = Date.now()), or())) {
                            var r = gr(n),
                              o = t + "#" + e;
                            Yn.key == o && rr(r),
                              (Yn.key = ""),
                              hr(),
                              kn &&
                                kn.close().then(function () {
                                  kn = null;
                                }),
                              dr(),
                              (Yn.playStatus = "stop");
                          }
                          $n.disable(), (tr = !1), (Ln = 0);
                        })(this.ebookId, this.curChapterIndex, r);
                    else {
                      t &&
                        "auto" != t &&
                        this.$toast("已开始语音朗读，再次点击即可关闭");
                      var o = this;
                      er(
                        this.ebookId,
                        this.curChapterIndex,
                        t,
                        this.theme,
                        r,
                        function (t) {
                          "nextChapter" == t.action
                            ? o.getNextChapter()
                            : "nextPage" == t.action
                            ? o.$refs.readerContent.slideFn(2)
                            : "error" == t.action &&
                              (-18 == t.code && t.msg
                                ? o.$toast(t.msg)
                                : o.$toast(
                                    "语音朗读播放失败，请检查网络正常后重试"
                                  ));
                        }
                      );
                    }
                  } else this.$toast("当前章节暂不支持语音朗读");
                },
                changeTheme: function (t) {
                  var e = this.getReaderContent();
                  ir(this.ebookId, this.curChapterIndex, e, t);
                },
                showCatalog: function () {
                  this.isCatalogShow = !0;
                  var t = this.ebookId;
                  (0, j.qF)(t, [{ click_type: 85, res_name: "目录" }]),
                    (window.checkTime = 0);
                },
                hidePop: function () {
                  (this.isCatalogShow = !1),
                    (this.isNoteListShow = !1),
                    (window.checkTime = 0);
                },
                hideCatalog: function (t) {
                  var e,
                    n,
                    r,
                    o = this;
                  null === (e = this.$refs.catalog) ||
                    void 0 === e ||
                    e.hidePop(),
                    null === (n = this.$refs.noteList) ||
                      void 0 === n ||
                      n.hidePop();
                  var i = (0, c.cF)("cur_chapter_".concat(this.ebookId)),
                    a = this.catalogArr[t.index],
                    u =
                      null === (r = this.catalogArr[i.index]) ||
                      void 0 === r ||
                      null === (r = r.root) ||
                      void 0 === r ||
                      null === (r = r.children) ||
                      void 0 === r
                        ? void 0
                        : r.includes(a);
                  if (t.index === i.index || u)
                    if (1 === this.readStyle) {
                      var s = document.querySelector(".reader-chapter-content")
                        .childNodes[t.paraIndex || 0].offsetTop;
                      "catalog" === t.type &&
                        null != a &&
                        a.anchor &&
                        document.getElementById(a.anchor) &&
                        (s = document.getElementById(a.anchor).offsetTop);
                      var A =
                        document.getElementsByClassName("pc-chapter-title")[0];
                      A && (s -= A.offsetHeight),
                        (this.VerticleRead.scrollTop = Math.max(0, s - 20));
                    } else {
                      if (
                        ((this.toAhorOnce = !1),
                        (this.anchorPosition = t.paraIndex || 0),
                        "catalog" === t.type &&
                          null != a &&
                          a.anchor &&
                          document.getElementById(a.anchor))
                      ) {
                        var f = document.getElementById(
                            "horizontal-read-container"
                          ),
                          l = Array.from(f.childNodes).indexOf(
                            document.getElementById(a.anchor)
                          );
                        l >= 0 && (this.anchorPosition = l);
                      }
                      this.$nextTick(function () {
                        o.toAhorOnce = !0;
                      });
                    }
                  else {
                    var h = this.catalogArr.find(function (e) {
                      return e.chapter_index === t.index;
                    });
                    this.setCurChapterInfo({
                      index: t.index,
                      anchor: h.anchor || "",
                      chapterId: h.chapter_id,
                      chapterName: h.chapter_name,
                      chapterItem: h.chapter_item,
                      rate: 0,
                      paraOffset: t.paraIndex,
                      url: h.url,
                    }),
                      (this.toAhorOnce = !1),
                      (0, c.po)("fromAnchor", "1");
                    var d = JSON.parse(JSON.stringify(this.$route.query));
                    t.index === parseInt(d.index)
                      ? this.loadChapterData()
                      : ((d.index = t.index),
                        (d.from = 3),
                        d.user_param && delete d.user_param,
                        this.$router.replace({ query: d }));
                  }
                },
                updateCurChapter: function () {
                  var t = this;
                  if (1 === this.readStyle) {
                    var e = this.VerticleRead.scrollTop,
                      n = this.getCurrentChapter(e);
                    if (!n) return;
                    var r = this.requestIndexArr.find(function (t) {
                        return t.chapter_id === n.id;
                      }),
                      o = Math.round(((e - n.pos) / n.height) * 100) / 100;
                    o > 1 && (o = 1),
                      o < 0 && (o = 0),
                      this.setCurChapterInfo({
                        chapterId: r.chapter_id,
                        chapterName: r.chapter_name,
                        index: r.chapter_index,
                        rate: o,
                        url: r.url,
                        chapterItem: r.chapter_item,
                        anchor: r.anchor || "",
                      });
                  }
                  (this.notesLineData = []),
                    setTimeout(function () {
                      t.notesLineData = pn(t.getReaderContent(), t.notesData);
                    }, 300);
                },
                syncReadingProgtess: function (t, e, n) {
                  var r,
                    o = this;
                  return ((r = Cr().mark(function r() {
                    var i;
                    return Cr().wrap(function (r) {
                      for (;;)
                        switch ((r.prev = r.next)) {
                          case 0:
                            r.next = 6;
                            break;
                          case 4:
                            r.next = 9;
                            break;
                          case 6:
                            if (_r() || (0, Y.ej)("jdread_token")) {
                              r.next = 9;
                              break;
                            }
                            return (
                              "function" == typeof n && n({}),
                              r.abrupt("return")
                            );
                          case 9:
                            return (
                              (i = [
                                { ebook_id: Number(o.ebookId), format: t },
                              ]),
                              e && (i[0].list = e),
                              (r.next = 14),
                              (0, j.vn)(i).then(function (t) {
                                "function" == typeof n && n(t);
                              })
                            );
                          case 14:
                          case "end":
                            return r.stop();
                        }
                    }, r);
                  })),
                  function () {
                    var t = this,
                      e = arguments;
                    return new Promise(function (n, o) {
                      var i = r.apply(t, e);
                      function a(t) {
                        Ir(i, n, o, a, c, "next", t);
                      }
                      function c(t) {
                        Ir(i, n, o, a, c, "throw", t);
                      }
                      a(void 0);
                    });
                  })();
                },
                getOffsetInPara: function (t) {
                  var e = document.querySelector(".reader-chapter-content")
                    .childNodes[t];
                  if (!e) return 0;
                  var n = this.VerticleRead.scrollTop,
                    r = e.offsetTop,
                    o = this.fontSize < 2 ? 1.8 : 1.7,
                    i = 0,
                    a = n - r > 0 ? n - r : 0,
                    c = Math.floor(this.vwWidth / this.displayFontSize);
                  return (
                    0 !== a &&
                      a >= 1 &&
                      (i =
                        (Math.ceil(a / (o * this.displayFontSize)) - 1) * c -
                        2) < 0 &&
                      (i = 0),
                    i
                  );
                },
                hideToolsFn: function (t) {
                  this.selectWidth ||
                    this.$refs.readerContent.closeIdeaToolBar(),
                    (this.selectWidth = 0);
                  var e = ["reader-theme-wrap", "side-slider-wraps"],
                    n = -1,
                    r = t.target || t.srcElement;
                  if (
                    ((n = e.indexOf(r.id)),
                    !r.id || (r.id && e.indexOf(r.id) < 0))
                  )
                    for (; r.parentNode; )
                      r.id && e.indexOf(r.id) > -1 && (n = 1),
                        (r = r.parentNode);
                  n < 0 && this.$refs.sideTools.hideTools();
                },
                handleMouseSelect: function (t) {
                  if (_r()) {
                    var e = window.getSelection();
                    if ("Range" !== e.type) return !1;
                    var n = (0, c.cF)("cur_chapter_".concat(this.ebookId));
                    if (!(n ? n.chapterItem : "")) return !1;
                    var r = e.toString(),
                      o = window
                        .getSelection()
                        .getRangeAt(0)
                        .getBoundingClientRect();
                    if (((this.selectWidth = o.width), "" !== r)) {
                      var i = document.querySelector(".reader-chapter-content");
                      if (!i) return "";
                      document.body.clientWidth < 1e3
                        ? this.$set(
                            this.notePosition,
                            "x",
                            o.left + o.width / 2 - 60 + "px"
                          )
                        : this.$set(
                            this.notePosition,
                            "x",
                            o.left +
                              o.width / 2 -
                              (document.body.clientWidth - 1e3) / 2 -
                              60 +
                              "px"
                          ),
                        this.$set(
                          this.notePosition,
                          "y",
                          this.pageY + o.top - 100 + "px"
                        ),
                        this.$set(this.notePosition, "xz", "rotate(0deg)"),
                        this.$set(this.notePosition, "flag", !0),
                        this.$refs.readerContent.openIdeaToolBar(),
                        (this.nodeDataObj = (function (t, e) {
                          for (
                            var n = t.anchorNode,
                              r = t.focusNode,
                              o = t.toString(),
                              i = {},
                              a = e.childNodes,
                              c = a.length,
                              u = null,
                              s = null,
                              A = null,
                              f = null,
                              l = 0;
                            l < c;
                            l++
                          ) {
                            var h = a[l];
                            h === n.parentNode && (A = l),
                              h === r.parentNode && (f = l);
                          }
                          return (
                            A === f
                              ? ((u = A),
                                (s = f),
                                t.anchorOffset > t.focusOffset
                                  ? ((i.fromOffsetInPara = t.focusOffset),
                                    (i.toOffsetInPara = t.anchorOffset))
                                  : ((i.fromOffsetInPara = t.anchorOffset),
                                    (i.toOffsetInPara = t.focusOffset)))
                              : A < f
                              ? ((u = A),
                                (s = f),
                                (i.fromOffsetInPara = t.anchorOffset),
                                (i.toOffsetInPara = t.focusOffset))
                              : ((u = f),
                                (s = A),
                                (i.fromOffsetInPara = t.focusOffset),
                                (i.toOffsetInPara = t.anchorOffset)),
                            {
                              from_para_index: u,
                              to_para_index: s,
                              quote_text: o,
                              from_offset_in_para: i.fromOffsetInPara,
                              to_offset_in_para: i.toOffsetInPara,
                            }
                          );
                        })(e, i));
                    } else this.$refs.readerContent.closeIdeaToolBar();
                  }
                },
                noteFoo: function (t) {
                  var e = this,
                    n =
                      arguments.length > 1 && void 0 !== arguments[1]
                        ? arguments[1]
                        : "",
                    r =
                      arguments.length > 2 && void 0 !== arguments[2]
                        ? arguments[2]
                        : "",
                    o = arguments.length > 3 ? arguments[3] : void 0;
                  if ("cancel" !== t) {
                    var i = this.chapterArr.find(function (t) {
                      return t.chapter_index === e.curChapterIndex;
                    });
                    (0 === this.curChapterIndex ||
                      (!i && 1 === this.curChapterIndex)) &&
                      (((i = {}).chapter_id =
                        this.requestIndexArr[1].chapter_id),
                      (i.chapter_name = this.requestIndexArr[1].chapter_name),
                      (i.chapterItem = this.requestIndexArr[1].chapter_item));
                    var a = {
                      chapter_id: i.chapter_id,
                      chapter_name: i.chapter_name,
                      chapter_itemref: i ? i.chapterItem : "",
                      action: t,
                      written_at: new Date().getTime(),
                      note_type: r ? 0 : 2,
                      book_id: this.ebookId,
                      id: n || null,
                      content: r || null,
                    };
                    o && "update" === t && (this.nodeDataObj = o),
                      "create" === t && r && (this.nodeDataObj.content = r),
                      (0, j.ap)([xr(xr({}, this.nodeDataObj), a)]).then(
                        function (r) {
                          if (0 === r.result_code && r.data[0].success)
                            if ("create" === t) {
                              if (
                                ((a.written_at = ""),
                                (e.nodeDataObj = Object.assign(
                                  e.nodeDataObj,
                                  a
                                )),
                                (e.nodeDataObj.id = r.data[0].id),
                                0 === e.notesData.length)
                              )
                                e.notesData.push(xr({}, e.nodeDataObj));
                              else
                                for (
                                  var o,
                                    i = e.nodeDataObj.from_para_index,
                                    c = e.notesData.length,
                                    u = 0;
                                  u < c;
                                  u++
                                ) {
                                  if (
                                    i < (o = e.notesData[u]).from_para_index ||
                                    (i === o.from_para_index &&
                                      e.nodeDataObj.from_offset_in_para <
                                        o.from_offset_in_para)
                                  ) {
                                    e.notesData.splice(u, 0, e.nodeDataObj);
                                    break;
                                  }
                                  u === c - 1 &&
                                    e.notesData.push(xr({}, e.nodeDataObj));
                                }
                              e.notesLineData = pn(
                                e.getReaderContent(),
                                e.notesData
                              );
                            } else if ("update" === t) {
                              (a.written_at = e.nodeDataObj.written_at),
                                (e.nodeDataObj = Object.assign(
                                  e.nodeDataObj,
                                  a
                                ));
                              for (var s = 0; s < e.notesData.length; s++)
                                if (r.data[0].id === e.notesData[s].id) {
                                  e.$set(e.notesData, s, e.nodeDataObj);
                                  break;
                                }
                              e.notesLineData = pn(
                                e.getReaderContent(),
                                e.notesData
                              );
                            } else
                              "delete" === t &&
                                ((e.notesData = e.notesData.filter(function (
                                  t
                                ) {
                                  return t.id !== n;
                                })),
                                (e.notesLineData = e.notesLineData.filter(
                                  function (t) {
                                    return t.id !== n;
                                  }
                                )));
                          else e.$toast("操作失败！请稍后重试");
                        }
                      );
                  }
                  this.touchStartEvent &&
                    this.touchStartEvent.target &&
                    this.touchStartEvent.target.style.removeProperty(
                      "background-color"
                    ),
                    this.$refs.readerContent.closeIdeaToolBar();
                },
                selfAdaption: function () {
                  var t = this;
                  window.onresize = function () {
                    t.gx();
                  };
                },
                gx: function () {
                  var t = this;
                  this.$nextTick(function () {
                    t.notesLineData = pn(t.getReaderContent(), t.notesData);
                  });
                },
                getNotesFoo: function (t) {
                  var e = this;
                  if (!_r()) return !1;
                  if (!t) return !1;
                  var n = {
                    sort: "chapter",
                    page: 1,
                    page_size: 30,
                    start_date: 0,
                    ebook_id: this.ebookId,
                    chapter_item_id: t,
                  };
                  (0, j.wk)(n).then(function (t) {
                    (e.notesData = t.data.items.filter(function (t) {
                      return "delete" !== t.action;
                    })),
                      (e.notesLineData = pn(e.getReaderContent(), e.notesData));
                  });
                },
                setJdGuideInfo: function () {
                  var t = this,
                    e = encodeURIComponent(this.$route.query.channelkey || ""),
                    n = window.localStorage.getItem("showGuideViewTime") || 0,
                    r = new Date(parseInt(n)),
                    o = new Date();
                  r.getFullYear() + "-" + r.getDate() ==
                  o.getFullYear() + "-" + o.getDate()
                    ? (this.isShowBottomGudie = !1)
                    : (this.isShowBottomGudie =
                        1 == this.$route.query.showH5Title);
                  var i = this.$route.query.app;
                  (0, j.c6)({ entry_type: "1", channel: e }).then(function (e) {
                    0 == e.result_code &&
                      "jd-mp" == i &&
                      (t.jdGuideInfo = e.data);
                  });
                },
                guideJdClose: function () {
                  this.jdGuideCloseChapter = this.curChapterIndex;
                  var t = this.$route.query,
                    e = t.ebookId,
                    n = t.source,
                    r = [
                      {
                        click_type: 1,
                        res_id: e,
                        res_name: "阅读-悬浮窗关闭-".concat(n || "jd"),
                      },
                    ];
                  (0, j.qF)(e, r);
                },
                guideJdClick: function () {
                  var t = this.$route.query,
                    e = t.ebookId,
                    n = t.source,
                    r = [
                      {
                        click_type: 1,
                        res_id: e,
                        res_name: "阅读-悬浮窗点击-".concat(n || "jd"),
                      },
                    ];
                  (0, j.qF)(e, r), (this.showiframe = !0);
                },
                guideButtomClose: function () {
                  (this.isShowBottomGudie = !1),
                    window.localStorage.setItem(
                      "showGuideViewTime",
                      new Date().getTime()
                    );
                },
                iframeClose: function () {
                  (this.showiframe = !1),
                    this.showH5Title && (0, gn.hideJdTitleButton)();
                },
                gotoJdMP: function () {
                  var t = this.$route.query.channelkey || "",
                    e = this.$route.query.source || "jd";
                  window.location.href =
                    'openapp.jdmobile://virtual?params={"path":"pages/bookActivityList/bookActivityList.html?source='
                      .concat(e, "&channelkey=")
                      .concat(
                        t,
                        '","des":"jdmp","vapptype":"1","appId":"97AE5DCE3D6C9E07C026CBBABB69984B","category":"jump"}'
                      );
                },
                iframeLoaded: function () {
                  var t = this,
                    e = this.$refs.iframeView;
                  e &&
                    (e.onload = function (e) {
                      t.showH5Title &&
                        setTimeout(function () {
                          (0, gn.hideJdTitleButton)();
                        }, 1e3);
                    });
                },
              }
            ),
          },
          kr = Br,
          Tr = n(90048),
          Dr = n.n(Tr),
          Or = {};
        (Or.styleTagTransform = E()),
          (Or.setAttributes = C()),
          (Or.insert = w().bind(null, "head")),
          (Or.domAPI = v()),
          (Or.insertStyleElement = S());
        g()(Dr(), Or), Dr() && Dr().locals && Dr().locals;
        var Pr = T(kr, Z, [], !1, null, null, null).exports;
        r.Z.use(H.Z);
        var Mr = H.Z.prototype.push;
        H.Z.prototype.push = function (t) {
          return Mr.call(this, t).catch(function (t) {
            return t;
          });
        };
        var jr = new H.Z({
            mode: "history",
            routes: [{ path: "/*", name: "Reader", component: Pr }],
            fallback: !1,
          }),
          Lr = function () {
            var t = this,
              e = t.$createElement,
              n = t._self._c || e;
            return t.showToast
              ? n(
                  "div",
                  { staticClass: "CustToast", class: [t.type, t.position] },
                  [t._v("\n  " + t._s(t.message) + "\n")]
                )
              : t._e();
          };
        Lr._withStripped = !0;
        var Nr = {
            name: "CustToast",
            data: function () {
              return {
                showToast: !0,
                type: "normal",
                message: "消息提示",
                duration: 3e3,
                position: "center",
              };
            },
          },
          zr = n(113),
          Qr = n.n(zr),
          Rr = {};
        (Rr.styleTagTransform = E()),
          (Rr.setAttributes = C()),
          (Rr.insert = w().bind(null, "head")),
          (Rr.domAPI = v()),
          (Rr.insertStyleElement = S());
        g()(Qr(), Rr), Qr() && Qr().locals && Qr().locals;
        var Wr = T(Nr, Lr, [], !1, null, "e52f9000", null).exports,
          Fr = r.Z.extend(Wr);
        function Ur(t) {
          var e =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : "center",
            n =
              arguments.length > 2 && void 0 !== arguments[2]
                ? arguments[2]
                : "normal",
            r =
              arguments.length > 3 && void 0 !== arguments[3]
                ? arguments[3]
                : 2e3,
            o = new Fr({
              data: function () {
                return {
                  showToast: !0,
                  type: n,
                  message: t,
                  duration: r,
                  position: e,
                };
              },
            }),
            i = o.$mount().$el;
          document.body.appendChild(i),
            setTimeout(function () {
              o.showToast = !1;
            }, r);
        }
        Ur.install = function (t) {
          t.prototype.$toast = Ur;
        };
        var Kr = Ur,
          qr = function () {
            var t = this,
              e = t.$createElement,
              n = t._self._c || e;
            return n(
              "div",
              {
                directives: [
                  {
                    name: "show",
                    rawName: "v-show",
                    value: t.showLoading,
                    expression: "showLoading",
                  },
                ],
                staticClass: "loading-comp-box",
                class: [t.type, t.position, { night: "night" === t.theme }],
              },
              [
                n("div", { staticClass: "loading-icon" }),
                n("div", { staticClass: "loading-tips" }, [
                  t._v("\n    " + t._s(t.message) + "\n  "),
                ]),
              ]
            );
          };
        qr._withStripped = !0;
        var Gr = {
            name: "CustLoading",
            data: function () {
              return {
                showLoading: !0,
                type: "normal",
                message: "数据加载中",
                position: "center",
                theme: "default",
              };
            },
          },
          Vr = n(45559),
          Jr = n.n(Vr),
          Hr = {};
        (Hr.styleTagTransform = E()),
          (Hr.setAttributes = C()),
          (Hr.insert = w().bind(null, "head")),
          (Hr.domAPI = v()),
          (Hr.insertStyleElement = S());
        g()(Jr(), Hr), Jr() && Jr().locals && Jr().locals;
        var Zr = T(Gr, qr, [], !1, null, "433be3e2", null).exports,
          Yr = r.Z.extend(Zr);
        function Xr() {
          var t =
              !(arguments.length > 0 && void 0 !== arguments[0]) ||
              arguments[0],
            e =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : "default",
            n =
              arguments.length > 2 && void 0 !== arguments[2]
                ? arguments[2]
                : "数据加载中",
            r =
              arguments.length > 3 && void 0 !== arguments[3]
                ? arguments[3]
                : "center",
            o =
              arguments.length > 4 && void 0 !== arguments[4]
                ? arguments[4]
                : "normal";
          if (
            (document.querySelector(".loading-comp-box") &&
              document.body.removeChild(
                document.querySelector(".loading-comp-box")
              ),
            (this._loading = new Yr({
              data: function () {
                return {
                  showLoading: t,
                  type: o,
                  message: n,
                  position: r,
                  theme: e,
                };
              },
            })),
            t)
          ) {
            var i = this._loading.$mount().$el;
            document.body.appendChild(i),
              this._loading && (this._loading.showLoading = t);
          } else
            document.querySelector(".loading-comp-box") &&
              document.body.removeChild(
                document.querySelector(".loading-comp-box")
              ),
              this._loading.showLoading && (this._loading.showLoading = t);
        }
        Xr.install = function (t) {
          t.prototype.$loading = Xr;
        };
        var $r = Xr;
        (n.p = "/readertob/readertob/"),
          r.Z.use(Kr),
          r.Z.use($r),
          (r.Z.config.productionTip = !1),
          (NodeList.prototype.forEach = Array.prototype.forEach),
          window.innerWidth < 1e3
            ? fn.Z.dispatch("setPageMaxWidth", 768)
            : fn.Z.dispatch("setPageMaxWidth", 1e3),
          window.addEventListener("popstate", function (t) {
            jr.isBack = !0;
          }),
          (window.Reader = new r.Z({
            el: "#app",
            router: jr,
            render: function (t) {
              return t(J);
            },
            store: fn.Z,
          })),
          (document.oncontextmenu = function (t) {
            t.preventDefault();
          });
      },
      90507: function (t, e, n) {
        "use strict";
        n.d(e, {
          Z: function () {
            return H;
          },
        });
        var r = {};
        n.r(r),
          n.d(r, {
            setException: function () {
              return b;
            },
            setPageMaxWidth: function () {
              return C;
            },
            updateDarkMode: function () {
              return I;
            },
            updateTheme: function () {
              return S;
            },
          });
        var o = {};
        n.r(o),
          n.d(o, {
            buyState: function () {
              return M;
            },
            catalogArr: function () {
              return N;
            },
            cover: function () {
              return R;
            },
            currentWinWidth: function () {
              return V;
            },
            device: function () {
              return z;
            },
            ebookId: function () {
              return x;
            },
            ebookName: function () {
              return E;
            },
            encPin: function () {
              return J;
            },
            exception: function () {
              return W;
            },
            fontSize: function () {
              return D;
            },
            format: function () {
              return O;
            },
            from: function () {
              return Q;
            },
            isFree: function () {
              return U;
            },
            isLogin: function () {
              return B;
            },
            isVip: function () {
              return F;
            },
            pageMaxWidth: function () {
              return G;
            },
            paperBookId: function () {
              return P;
            },
            pcSizeArr: function () {
              return q;
            },
            readStyle: function () {
              return _;
            },
            sizeArr: function () {
              return K;
            },
            theme: function () {
              return T;
            },
            userInfo: function () {
              return k;
            },
            vwH: function () {
              return L;
            },
            vwW: function () {
              return j;
            },
          });
        var i = n(70538),
          a = n(20629),
          c = n(84702),
          u = n(82835),
          s = (0, n(2052).Ij)();
        s.isIOS = s.isIOS || /mac\sos/i.test(navigator.userAgent);
        var A,
          f = {
            vwW: 0,
            vwH: 0,
            ebookId: "",
            ebookName: "",
            readStyle: Number.parseInt(
              window.localStorage.getItem("readStyleMode") || "2"
            ),
            isLogin: !1,
            isVip: 0,
            theme: "default",
            darkmode: !1,
            fontSize: window.localStorage.getItem("fontSize") || 2,
            buyState: !1,
            format: "epub",
            paperBookId: "",
            app: u.g,
            catalogArr: [],
            from: 0,
            device: s,
            cover: "",
            exception: 0,
            isFree: !1,
            sizeArr: [16, 18, 19, 21, 24, 28, 32],
            pcSizeArr: [15, 18, 22, 26, 32, 38, 46],
            team_id: "",
            userInfo: {},
            pageMaxWidth: 0,
            currentWinWidth: window.innerWidth,
            enc_pin: "",
          },
          l = n(58515),
          h = "SET_THEME",
          d = "SET_DARKMODE",
          p = "SET_EXCEPTION",
          g = "SET_PAGE_MAX_WIDTH";
        function m(t) {
          return (
            (m =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (t) {
                    return typeof t;
                  }
                : function (t) {
                    return t &&
                      "function" == typeof Symbol &&
                      t.constructor === Symbol &&
                      t !== Symbol.prototype
                      ? "symbol"
                      : typeof t;
                  }),
            m(t)
          );
        }
        function v(t, e, n) {
          return (
            (e = (function (t) {
              var e = (function (t, e) {
                if ("object" != m(t) || !t) return t;
                var n = t[Symbol.toPrimitive];
                if (void 0 !== n) {
                  var r = n.call(t, e || "default");
                  if ("object" != m(r)) return r;
                  throw new TypeError(
                    "@@toPrimitive must return a primitive value."
                  );
                }
                return ("string" === e ? String : Number)(t);
              })(t, "string");
              return "symbol" == m(e) ? e : e + "";
            })(e)) in t
              ? Object.defineProperty(t, e, {
                  value: n,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (t[e] = n),
            t
          );
        }
        var y =
            (v(
              v(
                v(
                  v(
                    v(
                      v(
                        v(
                          v(
                            v(
                              v((A = {}), "SET_EBOOK_ID", function (t, e) {
                                t.ebookId = e;
                              }),
                              "SET_EBOOK_NAME",
                              function (t, e) {
                                t.ebookName = e;
                              }
                            ),
                            "SET_READ_STYLE",
                            function (t, e) {
                              (t.readStyle = e),
                                window.localStorage.setItem("readStyleMode", e);
                            }
                          ),
                          "SET_IS_LOGIN",
                          function (t, e) {
                            t.isLogin = e;
                          }
                        ),
                        h,
                        function (t, e) {
                          t.theme = e;
                        }
                      ),
                      d,
                      function (t, e) {
                        t.darkmode = e;
                      }
                    ),
                    "SET_FONT_SIZE",
                    function (t, e) {
                      (t.fontSize = e),
                        window.localStorage.setItem("fontSize", e);
                    }
                  ),
                  "SET_BUY_STATE",
                  function (t, e) {
                    t.buyState = e;
                  }
                ),
                "SET_FORMAT",
                function (t, e) {
                  t.format = e;
                }
              ),
              "SET_CUR_CHAPTER_INFO",
              function (t, e) {
                e.format = t.format;
                var n = Object.assign(
                  {},
                  (0, l.cF)("cur_chapter_".concat(t.ebookId)),
                  e
                );
                (0, l.po)("cur_chapter_".concat(t.ebookId), n);
              }
            ),
            v(
              v(
                v(
                  v(
                    v(
                      v(
                        v(
                          v(
                            v(
                              v(A, "SET_IS_VIP", function (t, e) {
                                t.isVip = Number(e);
                              }),
                              "SET_PAPER_BOOK_ID",
                              function (t, e) {
                                t.paperBookId = e;
                              }
                            ),
                            "SET_VW_WIDTH",
                            function (t, e) {
                              t.vwW = e;
                            }
                          ),
                          "SET_VW_HEIGHT",
                          function (t, e) {
                            t.vwH = e;
                          }
                        ),
                        "SET_CATALOG",
                        function (t, e) {
                          t.catalogArr = e;
                        }
                      ),
                      "SET_FROM",
                      function (t, e) {
                        t.from = e;
                      }
                    ),
                    "SET_COVER",
                    function (t, e) {
                      t.cover = e;
                    }
                  ),
                  p,
                  function (t, e) {
                    t.exception = e;
                  }
                ),
                "SET_IS_FREE",
                function (t, e) {
                  t.isFree = e;
                }
              ),
              "SET_TEAM_ID",
              function (t, e) {
                t.team_id = e;
              }
            ),
            v(
              v(
                v(
                  v(A, "SET_USER_INFO", function (t, e) {
                    t.userInfo = e;
                  }),
                  g,
                  function (t, e) {
                    t.pageMaxWidth = e;
                  }
                ),
                "SET_WIN_WIDTH",
                function (t, e) {
                  t.currentWinWidth = e;
                }
              ),
              "SET_ENC_PIN",
              function (t, e) {
                t.enc_pin = e;
              }
            )),
          w = y,
          b = function (t, e) {
            (0, t.commit)(p, e);
          },
          C = function (t, e) {
            (0, t.commit)(g, e);
          },
          I = function (t, e) {
            var n = t.commit;
            n(d, e);
            var r = "theme-for-".concat(e ? "dark" : "light");
            n(h, localStorage.getItem(r) || (e ? "night" : "default"));
          },
          S = function (t, e) {
            var n = t.commit,
              r = t.state,
              o = "theme-for-".concat(r.darkmode ? "dark" : "light");
            n(h, e), localStorage.setItem(o, e);
          },
          x = function (t) {
            return t.ebookId;
          },
          E = function (t) {
            return t.ebookName;
          },
          _ = function (t) {
            return t.readStyle;
          },
          B = function (t) {
            return t.isLogin;
          },
          k = function (t) {
            return t.userInfo;
          },
          T = function (t) {
            return t.theme;
          },
          D = function (t) {
            return t.fontSize;
          },
          O = function (t) {
            return t.format;
          },
          P = function (t) {
            return t.paperBookId;
          },
          M = function (t) {
            return t.buyState;
          },
          j = function (t) {
            return t.vwW;
          },
          L = function (t) {
            return t.vwH;
          },
          N = function (t) {
            return t.catalogArr;
          },
          z = function (t) {
            return t.device;
          },
          Q = function (t) {
            return t.from;
          },
          R = function (t) {
            return t.cover;
          },
          W = function (t) {
            return t.exception;
          },
          F = function (t) {
            return t.isVip;
          },
          U = function (t) {
            return t.isFree;
          },
          K = function (t) {
            return t.sizeArr;
          },
          q = function (t) {
            return t.pcSizeArr;
          },
          G = function (t) {
            return t.pageMaxWidth;
          },
          V = function (t) {
            return t.currentWinWidth;
          },
          J = function (t) {
            return t.enc_pin;
          };
        i.Z.use(a.ZP);
        var H = new a.ZP.Store({
          state: f,
          mutations: w,
          getters: o,
          actions: r,
          plugins: [(0, c.Z)({ storage: window.sessionStorage })],
        });
      },
      9634: function (module, exports, __webpack_require__) {
        var __WEBPACK_AMD_DEFINE_ARRAY__,
          __WEBPACK_AMD_DEFINE_RESULT__,
          __WEBPACK_AMD_DEFINE_FACTORY__,
          __WEBPACK_AMD_DEFINE_RESULT__,
          global,
          factory;
        function _typeof(t) {
          return (
            (_typeof =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (t) {
                    return typeof t;
                  }
                : function (t) {
                    return t &&
                      "function" == typeof Symbol &&
                      t.constructor === Symbol &&
                      t !== Symbol.prototype
                      ? "symbol"
                      : typeof t;
                  }),
            _typeof(t)
          );
        }
        (global =
          "undefined" != typeof self
            ? self
            : "undefined" != typeof window
            ? window
            : void 0 !== __webpack_require__.g
            ? __webpack_require__.g
            : this),
          (factory = function (global) {
            "use strict";
            global = global || {};
            var _Base64 = global.Base64,
              version = "2.5.1",
              buffer;
            if (module.exports)
              try {
                buffer = eval("require('buffer').Buffer");
              } catch (t) {
                buffer = void 0;
              }
            var b64chars =
                "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
              b64tab = (function (t) {
                for (var e = {}, n = 0, r = t.length; n < r; n++)
                  e[t.charAt(n)] = n;
                return e;
              })(b64chars),
              fromCharCode = String.fromCharCode,
              cb_utob = function (t) {
                if (t.length < 2)
                  return (e = t.charCodeAt(0)) < 128
                    ? t
                    : e < 2048
                    ? fromCharCode(192 | (e >>> 6)) +
                      fromCharCode(128 | (63 & e))
                    : fromCharCode(224 | ((e >>> 12) & 15)) +
                      fromCharCode(128 | ((e >>> 6) & 63)) +
                      fromCharCode(128 | (63 & e));
                var e =
                  65536 +
                  1024 * (t.charCodeAt(0) - 55296) +
                  (t.charCodeAt(1) - 56320);
                return (
                  fromCharCode(240 | ((e >>> 18) & 7)) +
                  fromCharCode(128 | ((e >>> 12) & 63)) +
                  fromCharCode(128 | ((e >>> 6) & 63)) +
                  fromCharCode(128 | (63 & e))
                );
              },
              re_utob = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g,
              utob = function (t) {
                return t.replace(re_utob, cb_utob);
              },
              cb_encode = function (t) {
                var e = [0, 2, 1][t.length % 3],
                  n =
                    (t.charCodeAt(0) << 16) |
                    ((t.length > 1 ? t.charCodeAt(1) : 0) << 8) |
                    (t.length > 2 ? t.charCodeAt(2) : 0);
                return [
                  b64chars.charAt(n >>> 18),
                  b64chars.charAt((n >>> 12) & 63),
                  e >= 2 ? "=" : b64chars.charAt((n >>> 6) & 63),
                  e >= 1 ? "=" : b64chars.charAt(63 & n),
                ].join("");
              },
              btoa = global.btoa
                ? function (t) {
                    return global.btoa(t);
                  }
                : function (t) {
                    return t.replace(/[\s\S]{1,3}/g, cb_encode);
                  },
              _encode = buffer
                ? buffer.from && Uint8Array && buffer.from !== Uint8Array.from
                  ? function (t) {
                      return (
                        t.constructor === buffer.constructor
                          ? t
                          : buffer.from(t)
                      ).toString("base64");
                    }
                  : function (t) {
                      return (
                        t.constructor === buffer.constructor ? t : new buffer(t)
                      ).toString("base64");
                    }
                : function (t) {
                    return btoa(utob(t));
                  },
              encode = function (t, e) {
                return e
                  ? _encode(String(t))
                      .replace(/[+\/]/g, function (t) {
                        return "+" == t ? "-" : "_";
                      })
                      .replace(/=/g, "")
                  : _encode(String(t));
              },
              encodeURI = function (t) {
                return encode(t, !0);
              },
              re_btou = new RegExp(
                ["[À-ß][-¿]", "[à-ï][-¿]{2}", "[ð-÷][-¿]{3}"].join("|"),
                "g"
              ),
              cb_btou = function (t) {
                switch (t.length) {
                  case 4:
                    var e =
                      (((7 & t.charCodeAt(0)) << 18) |
                        ((63 & t.charCodeAt(1)) << 12) |
                        ((63 & t.charCodeAt(2)) << 6) |
                        (63 & t.charCodeAt(3))) -
                      65536;
                    return (
                      fromCharCode(55296 + (e >>> 10)) +
                      fromCharCode(56320 + (1023 & e))
                    );
                  case 3:
                    return fromCharCode(
                      ((15 & t.charCodeAt(0)) << 12) |
                        ((63 & t.charCodeAt(1)) << 6) |
                        (63 & t.charCodeAt(2))
                    );
                  default:
                    return fromCharCode(
                      ((31 & t.charCodeAt(0)) << 6) | (63 & t.charCodeAt(1))
                    );
                }
              },
              btou = function (t) {
                return t.replace(re_btou, cb_btou);
              },
              cb_decode = function (t) {
                var e = t.length,
                  n = e % 4,
                  r =
                    (e > 0 ? b64tab[t.charAt(0)] << 18 : 0) |
                    (e > 1 ? b64tab[t.charAt(1)] << 12 : 0) |
                    (e > 2 ? b64tab[t.charAt(2)] << 6 : 0) |
                    (e > 3 ? b64tab[t.charAt(3)] : 0),
                  o = [
                    fromCharCode(r >>> 16),
                    fromCharCode((r >>> 8) & 255),
                    fromCharCode(255 & r),
                  ];
                return (o.length -= [0, 0, 2, 1][n]), o.join("");
              },
              _atob = global.atob
                ? function (t) {
                    return global.atob(t);
                  }
                : function (t) {
                    return t.replace(/\S{1,4}/g, cb_decode);
                  },
              atob = function (t) {
                return _atob(String(t).replace(/[^A-Za-z0-9\+\/]/g, ""));
              },
              _decode = buffer
                ? buffer.from && Uint8Array && buffer.from !== Uint8Array.from
                  ? function (t) {
                      return (
                        t.constructor === buffer.constructor
                          ? t
                          : buffer.from(t, "base64")
                      ).toString();
                    }
                  : function (t) {
                      return (
                        t.constructor === buffer.constructor
                          ? t
                          : new buffer(t, "base64")
                      ).toString();
                    }
                : function (t) {
                    return btou(_atob(t));
                  },
              decode = function (t) {
                return _decode(
                  String(t)
                    .replace(/[-_]/g, function (t) {
                      return "-" == t ? "+" : "/";
                    })
                    .replace(/[^A-Za-z0-9\+\/]/g, "")
                );
              },
              noConflict = function () {
                var t = global.Base64;
                return (global.Base64 = _Base64), t;
              };
            if (
              ((global.Base64 = {
                VERSION: version,
                atob: atob,
                btoa: btoa,
                fromBase64: decode,
                toBase64: encode,
                utob: utob,
                encode: encode,
                encodeURI: encodeURI,
                btou: btou,
                decode: decode,
                noConflict: noConflict,
                __buffer__: buffer,
              }),
              "function" == typeof Object.defineProperty)
            ) {
              var noEnum = function (t) {
                return {
                  value: t,
                  enumerable: !1,
                  writable: !0,
                  configurable: !0,
                };
              };
              global.Base64.extendString = function () {
                Object.defineProperty(
                  String.prototype,
                  "fromBase64",
                  noEnum(function () {
                    return decode(this);
                  })
                ),
                  Object.defineProperty(
                    String.prototype,
                    "toBase64",
                    noEnum(function (t) {
                      return encode(this, t);
                    })
                  ),
                  Object.defineProperty(
                    String.prototype,
                    "toBase64URI",
                    noEnum(function () {
                      return encode(this, !0);
                    })
                  );
              };
            }
            return (
              global.Meteor && (Base64 = global.Base64),
              module.exports
                ? (module.exports.Base64 = global.Base64)
                : ((__WEBPACK_AMD_DEFINE_ARRAY__ = []),
                  (__WEBPACK_AMD_DEFINE_RESULT__ = function () {
                    return global.Base64;
                  }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)),
                  void 0 === __WEBPACK_AMD_DEFINE_RESULT__ ||
                    (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)),
              { Base64: global.Base64 }
            );
          }),
          "object" === _typeof(exports)
            ? (module.exports = factory(global))
            : void 0 ===
                (__WEBPACK_AMD_DEFINE_RESULT__ =
                  "function" ==
                  typeof (__WEBPACK_AMD_DEFINE_FACTORY__ = factory)
                    ? __WEBPACK_AMD_DEFINE_FACTORY__.call(
                        exports,
                        __webpack_require__,
                        exports,
                        module
                      )
                    : __WEBPACK_AMD_DEFINE_FACTORY__) ||
              (module.exports = __WEBPACK_AMD_DEFINE_RESULT__);
      },
      16816: function (t, e, n) {
        "use strict";
        n.d(e, {
          d8: function () {
            return i;
          },
          ej: function () {
            return a;
          },
        });
        var r = n(36808),
          o = n.n(r),
          i = function (t, e) {
            var n =
              arguments.length > 2 && void 0 !== arguments[2]
                ? arguments[2]
                : 1;
            o().set(t, e, { path: "/", expires: n });
          },
          a = function (t) {
            return o().get(t) || "";
          };
      },
      82835: function (t, e, n) {
        "use strict";
        n.d(e, {
          En: function () {
            return y;
          },
          g: function () {
            return m;
          },
          h: function () {
            return w;
          },
        });
        var r = n(81354),
          o = n.n(r),
          i = n(36808),
          a = n.n(i),
          c = n(31018),
          u = n(2052),
          s = n(90507),
          A = n(16816);
        function f(t) {
          return (
            (f =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (t) {
                    return typeof t;
                  }
                : function (t) {
                    return t &&
                      "function" == typeof Symbol &&
                      t.constructor === Symbol &&
                      t !== Symbol.prototype
                      ? "symbol"
                      : typeof t;
                  }),
            f(t)
          );
        }
        function l(t, e) {
          var n = Object.keys(t);
          if (Object.getOwnPropertySymbols) {
            var r = Object.getOwnPropertySymbols(t);
            e &&
              (r = r.filter(function (e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable;
              })),
              n.push.apply(n, r);
          }
          return n;
        }
        function h(t) {
          for (var e = 1; e < arguments.length; e++) {
            var n = null != arguments[e] ? arguments[e] : {};
            e % 2
              ? l(Object(n), !0).forEach(function (e) {
                  d(t, e, n[e]);
                })
              : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n))
              : l(Object(n)).forEach(function (e) {
                  Object.defineProperty(
                    t,
                    e,
                    Object.getOwnPropertyDescriptor(n, e)
                  );
                });
          }
          return t;
        }
        function d(t, e, n) {
          return (
            (e = (function (t) {
              var e = (function (t, e) {
                if ("object" != f(t) || !t) return t;
                var n = t[Symbol.toPrimitive];
                if (void 0 !== n) {
                  var r = n.call(t, e || "default");
                  if ("object" != f(r)) return r;
                  throw new TypeError(
                    "@@toPrimitive must return a primitive value."
                  );
                }
                return ("string" === e ? String : Number)(t);
              })(t, "string");
              return "symbol" == f(e) ? e : e + "";
            })(e)) in t
              ? Object.defineProperty(t, e, {
                  value: n,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (t[e] = n),
            t
          );
        }
        var p = (0, c.pf)(window.location.href),
          g = (0, c.pf)(window.location.href),
          m = "tob-web",
          v = s.Z.state.team_id || (0, A.ej)("team_id") || g.team_id || "",
          y = {
            requestUrl: "",
            time: new Date().getTime(),
            app: m,
            href: window.location.href,
            uri: "",
            guid: function () {
              function t() {
                return ((65536 * (1 + Math.random())) | 0)
                  .toString(16)
                  .substring(1);
              }
              return p.uid || t() + t() + t() + t() + t() + t() + t() + t();
            },
            sortString: function (t) {
              for (
                var e = Object.keys(t).sort(), n = e[0] + "=" + t[e[0]], r = 1;
                r < e.length;
                r++
              )
                n = n + "&" + e[r] + "=" + t[e[r]];
              return n;
            },
            getUuid: function (t) {
              var e = "",
                n = a().get("u") || "";
              return (
                t.uuid
                  ? (e = t.uuid)
                  : (n
                      ? localStorage.setItem("_u", n)
                      : (n = localStorage.getItem("_u")) ||
                        ((n = "h5" + this.guid()),
                        localStorage.setItem("_u", n)),
                    (e = n)),
                p.uid || e
              );
            },
            addSign: function (t, e, n) {
              for (
                var r = Object.keys(e),
                  o = t.split("?")[0] + "?" + r[0] + "=" + e[r[0]],
                  i = 1;
                i < r.length;
                i++
              )
                o = o + "&" + r[i] + "=" + e[r[i]];
              return (o = o + "&sign=" + n);
            },
            AESEncrypt: function (t, e) {
              var n = o().enc.Utf8.parse(t),
                r = o().MD5(o().enc.Utf8.parse(e));
              return o()
                .AES.encrypt(n, r, {
                  mode: o().mode.ECB,
                  padding: o().pad.Pkcs7,
                })
                .toString();
            },
            AESDecrypt: function (t, e) {
              var n = o().MD5(o().enc.Utf8.parse(e)),
                r = o().AES.decrypt(t, n, {
                  mode: o().mode.ECB,
                  padding: o().pad.Pkcs7,
                });
              return o().enc.Utf8.stringify(r).toString();
            },
            DESEncrypt: function (t, e) {
              var n = o().enc.Utf8.parse(t),
                r = o().MD5(o().enc.Utf8.parse(e));
              return o()
                .DES.encrypt(n, r, {
                  mode: o().mode.ECB,
                  padding: o().pad.Pkcs7,
                })
                .toString();
            },
            DESDecrypt: function (t, e) {
              var n = o().MD5(o().enc.Utf8.parse(e)),
                r = o().DES.decrypt(t, n, {
                  mode: o().mode.ECB,
                  padding: o().pad.Pkcs7,
                });
              return o().enc.Utf8.stringify(r).toString();
            },
            encrypt: function (t, e, n) {
              return n % 2 == 0 ? this.AESEncrypt(t, e) : this.DESEncrypt(t, e);
            },
            decrypt: function (t, e, n) {
              return n % 2 == 0 ? this.AESDecrypt(t, e) : this.DESDecrypt(t, e);
            },
            getKey: function (t) {
              return t.toString() + this.app;
            },
            enData: function (t) {
              var e = this.getKey(this.time),
                n = this.encrypt(t.split("?")[1], e, this.time);
              return (
                (n = (n = n.replace(/\+/g, "-")).replace(/\//g, "_")),
                (t =
                  t.split("?")[0] +
                  "?enc=1&app=" +
                  this.app +
                  "&tm=" +
                  this.time +
                  "&params=" +
                  encodeURIComponent(n))
              );
            },
            enJsonData: function (t, e) {
              var n = this.getKey(e);
              return this.encrypt(JSON.stringify(t), n, e);
            },
            deData: function (t, e) {
              var n = this.getKey(e);
              return JSON.parse(this.decrypt(t, n, e));
            },
            init: function (t, e, n) {
              (this.requestUrl = t),
                (this.time = e),
                (this.uri = this.requestUrl.split("?")[0].replace("", ""));
              var r = (0, c.pm)(this.href),
                i = (0, c.pm)(this.requestUrl),
                a = this.getUuid(r),
                s = o().MD5(this.app + this.time + a),
                A = (0, u.Ij)(),
                f =
                  p.client || (A.isPc ? "pc" : A.isIOS ? "iphone" : "android"),
                l = p.os || "web",
                h = p.ov || "1.0",
                d = Object.assign(i, {
                  app: this.app,
                  tm: this.time,
                  team_id: v,
                  uuid: a,
                  client: f,
                  os: l,
                  ov: h,
                }),
                g = this.sortString(d),
                m = o().MD5(s + this.uri + g),
                y = this.addSign(this.requestUrl, d, m);
              return n ? this.enData(y) : y;
            },
          },
          w = function (t) {
            var e = t.params,
              n = void 0 === e ? {} : e,
              r = t.pathParams,
              o = void 0 === r ? {} : r,
              i = t.publicParams,
              a = void 0 === i ? {} : i,
              s = t.tm,
              A = t.isPOST,
              f = void 0 !== A && A,
              l = (0, c.pm)(y.href),
              d = { uuid: y.getUuid((0, c.pm)(y.href)) },
              p = m,
              g = l.os || "web",
              w = (0, u.Ij)(),
              b = l.client || (w.isPc ? "pc" : w.isIOS ? "iphone" : "android"),
              C = l.ov || "1.0";
            return (
              (d = Object.assign(
                h({ app: p, tm: s, os: g, client: b, ov: C, team_id: v }, a),
                d
              )),
              f ? (d.post_body = n) : (d = Object.assign(d, n)),
              Object.assign(d, o)
            );
          };
      },
      58515: function (t, e, n) {
        "use strict";
        function r(t) {
          return (
            (r =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (t) {
                    return typeof t;
                  }
                : function (t) {
                    return t &&
                      "function" == typeof Symbol &&
                      t.constructor === Symbol &&
                      t !== Symbol.prototype
                      ? "symbol"
                      : typeof t;
                  }),
            r(t)
          );
        }
        function o(t, e) {
          var n = Object.keys(t);
          if (Object.getOwnPropertySymbols) {
            var r = Object.getOwnPropertySymbols(t);
            e &&
              (r = r.filter(function (e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable;
              })),
              n.push.apply(n, r);
          }
          return n;
        }
        function i(t) {
          for (var e = 1; e < arguments.length; e++) {
            var n = null != arguments[e] ? arguments[e] : {};
            e % 2
              ? o(Object(n), !0).forEach(function (e) {
                  a(t, e, n[e]);
                })
              : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n))
              : o(Object(n)).forEach(function (e) {
                  Object.defineProperty(
                    t,
                    e,
                    Object.getOwnPropertyDescriptor(n, e)
                  );
                });
          }
          return t;
        }
        function a(t, e, n) {
          return (
            (e = (function (t) {
              var e = (function (t, e) {
                if ("object" != r(t) || !t) return t;
                var n = t[Symbol.toPrimitive];
                if (void 0 !== n) {
                  var o = n.call(t, e || "default");
                  if ("object" != r(o)) return o;
                  throw new TypeError(
                    "@@toPrimitive must return a primitive value."
                  );
                }
                return ("string" === e ? String : Number)(t);
              })(t, "string");
              return "symbol" == r(e) ? e : e + "";
            })(e)) in t
              ? Object.defineProperty(t, e, {
                  value: n,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (t[e] = n),
            t
          );
        }
        n.d(e, {
          L_: function () {
            return s;
          },
          cF: function () {
            return u;
          },
          po: function () {
            return c;
          },
        });
        var c = function (t, e) {
            if (t && e) {
              var n = 6048e5 + new Date().getTime();
              window.localStorage.setItem(
                t,
                JSON.stringify(i(i({}, e), {}, { expireTime: n }))
              );
            }
          },
          u = function (t) {
            if (t) return JSON.parse(window.localStorage.getItem(t));
          },
          s = function (t) {
            t && window.localStorage.removeItem(t);
          };
      },
      31018: function (t, e, n) {
        "use strict";
        n.d(e, {
          Ds: function () {
            return a;
          },
          Zd: function () {
            return u;
          },
          ld: function () {
            return c;
          },
          pf: function () {
            return i;
          },
          pm: function () {
            return o;
          },
        });
        var r = n(2052),
          o = function (t) {
            var e = (0, r.Ij)(),
              n = {},
              o = "";
            if (-1 !== t.indexOf("?"))
              for (
                var i = t.slice(t.indexOf("?") + 1).split("&"), a = 0;
                a < i.length;
                a++
              )
                n[(o = i[a].split("="))[0]] = o[1] || "";
            return (
              delete n.tm,
              delete n.app,
              delete n.sign,
              delete n.name,
              delete n.bd_token,
              delete n.from,
              delete n.index,
              delete n.ebookId,
              delete n.source,
              delete n.isVip,
              delete n.br,
              delete n.model,
              delete n.sc,
              delete n.client,
              delete n.os,
              delete n.uid,
              delete n.lat,
              delete n.lng,
              delete n.sid,
              delete n.un_area,
              delete n.pt_key,
              delete n.team_id,
              delete n.return_url,
              delete n.user_param,
              delete n.sync,
              delete n.auto,
              delete n.teamId,
              delete n.return_url,
              n.name && delete n.name,
              e.isJdread ||
                (delete n.nsukey, delete n.isappinstalled, delete n.from),
              n
            );
          },
          i = function (t) {
            var e = {},
              n = "";
            if (-1 !== t.indexOf("?"))
              for (
                var r = t.slice(t.indexOf("?") + 1).split("&"), o = 0;
                o < r.length;
                o++
              )
                e[(n = r[o].split("="))[0]] = n[1];
            return e;
          },
          a = function (t, e, n) {
            var r = null;
            return function () {
              var o = this,
                i = arguments;
              r && clearTimeout(r),
                "function" == typeof n && n(),
                (r = setTimeout(function () {
                  t.apply(o, i);
                }, e));
            };
          },
          c = function () {
            var t = navigator.userAgent,
              e = t.indexOf("compatible") > -1 && t.indexOf("MSIE") > -1,
              n = t.indexOf("Edge") > -1 && !e,
              r = t.indexOf("Trident") > -1 && t.indexOf("rv:11.0") > -1,
              o = t.indexOf("Opera") > -1,
              i = t.indexOf("Firefox") > -1,
              a = t.indexOf("Safari") > -1,
              c = t.indexOf("Chrome") > -1;
            if (
              (("Win32" === navigator.platform ||
                "Windows" === navigator.platform) &&
                document.documentElement.classList.add("win"),
              e)
            ) {
              new RegExp("MSIE (\\d+\\.\\d+);").test(t);
              var u = parseFloat(RegExp.$1);
              return 7 !== u && 8 !== u && 9 !== u && 10 === u && "ie10";
            }
            return n
              ? "edge"
              : r
              ? "ie11"
              : o
              ? "Opera"
              : i
              ? "FF"
              : c
              ? "Chrome"
              : a
              ? "Safari"
              : -1;
          },
          u = function () {
            var t = i(window.location.href),
              e =
                t.return_url ||
                window.sessionStorage.getItem(
                  "loginUrl_".concat(t.team_id || "")
                );
            if (e) {
              e = e && decodeURIComponent(e);
              var n = document.createElement("a");
              if (((n.href = e), n.host.endsWith(".jd.com"))) return e;
            }
            return "/user_login";
          };
      },
      85524: function (t, e, n) {
        "use strict";
        n.r(e),
          n.d(e, {
            getStatusHeight: function () {
              return h;
            },
            hideJdTitleButton: function () {
              return p;
            },
          });
        var r = n(31018),
          o = n(6273),
          i = n(16816),
          a = n(58515),
          c = n(78366),
          u = n(90507);
        function s(t) {
          return (
            (s =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (t) {
                    return typeof t;
                  }
                : function (t) {
                    return t &&
                      "function" == typeof Symbol &&
                      t.constructor === Symbol &&
                      t !== Symbol.prototype
                      ? "symbol"
                      : typeof t;
                  }),
            s(t)
          );
        }
        function A() {
          A = function () {
            return e;
          };
          var t,
            e = {},
            n = Object.prototype,
            r = n.hasOwnProperty,
            o =
              Object.defineProperty ||
              function (t, e, n) {
                t[e] = n.value;
              },
            i = "function" == typeof Symbol ? Symbol : {},
            a = i.iterator || "@@iterator",
            c = i.asyncIterator || "@@asyncIterator",
            u = i.toStringTag || "@@toStringTag";
          function f(t, e, n) {
            return (
              Object.defineProperty(t, e, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              }),
              t[e]
            );
          }
          try {
            f({}, "");
          } catch (t) {
            f = function (t, e, n) {
              return (t[e] = n);
            };
          }
          function l(t, e, n, r) {
            var i = e && e.prototype instanceof y ? e : y,
              a = Object.create(i.prototype),
              c = new O(r || []);
            return o(a, "_invoke", { value: B(t, n, c) }), a;
          }
          function h(t, e, n) {
            try {
              return { type: "normal", arg: t.call(e, n) };
            } catch (t) {
              return { type: "throw", arg: t };
            }
          }
          e.wrap = l;
          var d = "suspendedStart",
            p = "suspendedYield",
            g = "executing",
            m = "completed",
            v = {};
          function y() {}
          function w() {}
          function b() {}
          var C = {};
          f(C, a, function () {
            return this;
          });
          var I = Object.getPrototypeOf,
            S = I && I(I(P([])));
          S && S !== n && r.call(S, a) && (C = S);
          var x = (b.prototype = y.prototype = Object.create(C));
          function E(t) {
            ["next", "throw", "return"].forEach(function (e) {
              f(t, e, function (t) {
                return this._invoke(e, t);
              });
            });
          }
          function _(t, e) {
            function n(o, i, a, c) {
              var u = h(t[o], t, i);
              if ("throw" !== u.type) {
                var A = u.arg,
                  f = A.value;
                return f && "object" == s(f) && r.call(f, "__await")
                  ? e.resolve(f.__await).then(
                      function (t) {
                        n("next", t, a, c);
                      },
                      function (t) {
                        n("throw", t, a, c);
                      }
                    )
                  : e.resolve(f).then(
                      function (t) {
                        (A.value = t), a(A);
                      },
                      function (t) {
                        return n("throw", t, a, c);
                      }
                    );
              }
              c(u.arg);
            }
            var i;
            o(this, "_invoke", {
              value: function (t, r) {
                function o() {
                  return new e(function (e, o) {
                    n(t, r, e, o);
                  });
                }
                return (i = i ? i.then(o, o) : o());
              },
            });
          }
          function B(e, n, r) {
            var o = d;
            return function (i, a) {
              if (o === g) throw Error("Generator is already running");
              if (o === m) {
                if ("throw" === i) throw a;
                return { value: t, done: !0 };
              }
              for (r.method = i, r.arg = a; ; ) {
                var c = r.delegate;
                if (c) {
                  var u = k(c, r);
                  if (u) {
                    if (u === v) continue;
                    return u;
                  }
                }
                if ("next" === r.method) r.sent = r._sent = r.arg;
                else if ("throw" === r.method) {
                  if (o === d) throw ((o = m), r.arg);
                  r.dispatchException(r.arg);
                } else "return" === r.method && r.abrupt("return", r.arg);
                o = g;
                var s = h(e, n, r);
                if ("normal" === s.type) {
                  if (((o = r.done ? m : p), s.arg === v)) continue;
                  return { value: s.arg, done: r.done };
                }
                "throw" === s.type &&
                  ((o = m), (r.method = "throw"), (r.arg = s.arg));
              }
            };
          }
          function k(e, n) {
            var r = n.method,
              o = e.iterator[r];
            if (o === t)
              return (
                (n.delegate = null),
                ("throw" === r &&
                  e.iterator.return &&
                  ((n.method = "return"),
                  (n.arg = t),
                  k(e, n),
                  "throw" === n.method)) ||
                  ("return" !== r &&
                    ((n.method = "throw"),
                    (n.arg = new TypeError(
                      "The iterator does not provide a '" + r + "' method"
                    )))),
                v
              );
            var i = h(o, e.iterator, n.arg);
            if ("throw" === i.type)
              return (
                (n.method = "throw"), (n.arg = i.arg), (n.delegate = null), v
              );
            var a = i.arg;
            return a
              ? a.done
                ? ((n[e.resultName] = a.value),
                  (n.next = e.nextLoc),
                  "return" !== n.method && ((n.method = "next"), (n.arg = t)),
                  (n.delegate = null),
                  v)
                : a
              : ((n.method = "throw"),
                (n.arg = new TypeError("iterator result is not an object")),
                (n.delegate = null),
                v);
          }
          function T(t) {
            var e = { tryLoc: t[0] };
            1 in t && (e.catchLoc = t[1]),
              2 in t && ((e.finallyLoc = t[2]), (e.afterLoc = t[3])),
              this.tryEntries.push(e);
          }
          function D(t) {
            var e = t.completion || {};
            (e.type = "normal"), delete e.arg, (t.completion = e);
          }
          function O(t) {
            (this.tryEntries = [{ tryLoc: "root" }]),
              t.forEach(T, this),
              this.reset(!0);
          }
          function P(e) {
            if (e || "" === e) {
              var n = e[a];
              if (n) return n.call(e);
              if ("function" == typeof e.next) return e;
              if (!isNaN(e.length)) {
                var o = -1,
                  i = function n() {
                    for (; ++o < e.length; )
                      if (r.call(e, o))
                        return (n.value = e[o]), (n.done = !1), n;
                    return (n.value = t), (n.done = !0), n;
                  };
                return (i.next = i);
              }
            }
            throw new TypeError(s(e) + " is not iterable");
          }
          return (
            (w.prototype = b),
            o(x, "constructor", { value: b, configurable: !0 }),
            o(b, "constructor", { value: w, configurable: !0 }),
            (w.displayName = f(b, u, "GeneratorFunction")),
            (e.isGeneratorFunction = function (t) {
              var e = "function" == typeof t && t.constructor;
              return (
                !!e &&
                (e === w || "GeneratorFunction" === (e.displayName || e.name))
              );
            }),
            (e.mark = function (t) {
              return (
                Object.setPrototypeOf
                  ? Object.setPrototypeOf(t, b)
                  : ((t.__proto__ = b), f(t, u, "GeneratorFunction")),
                (t.prototype = Object.create(x)),
                t
              );
            }),
            (e.awrap = function (t) {
              return { __await: t };
            }),
            E(_.prototype),
            f(_.prototype, c, function () {
              return this;
            }),
            (e.AsyncIterator = _),
            (e.async = function (t, n, r, o, i) {
              void 0 === i && (i = Promise);
              var a = new _(l(t, n, r, o), i);
              return e.isGeneratorFunction(n)
                ? a
                : a.next().then(function (t) {
                    return t.done ? t.value : a.next();
                  });
            }),
            E(x),
            f(x, u, "Generator"),
            f(x, a, function () {
              return this;
            }),
            f(x, "toString", function () {
              return "[object Generator]";
            }),
            (e.keys = function (t) {
              var e = Object(t),
                n = [];
              for (var r in e) n.push(r);
              return (
                n.reverse(),
                function t() {
                  for (; n.length; ) {
                    var r = n.pop();
                    if (r in e) return (t.value = r), (t.done = !1), t;
                  }
                  return (t.done = !0), t;
                }
              );
            }),
            (e.values = P),
            (O.prototype = {
              constructor: O,
              reset: function (e) {
                if (
                  ((this.prev = 0),
                  (this.next = 0),
                  (this.sent = this._sent = t),
                  (this.done = !1),
                  (this.delegate = null),
                  (this.method = "next"),
                  (this.arg = t),
                  this.tryEntries.forEach(D),
                  !e)
                )
                  for (var n in this)
                    "t" === n.charAt(0) &&
                      r.call(this, n) &&
                      !isNaN(+n.slice(1)) &&
                      (this[n] = t);
              },
              stop: function () {
                this.done = !0;
                var t = this.tryEntries[0].completion;
                if ("throw" === t.type) throw t.arg;
                return this.rval;
              },
              dispatchException: function (e) {
                if (this.done) throw e;
                var n = this;
                function o(r, o) {
                  return (
                    (c.type = "throw"),
                    (c.arg = e),
                    (n.next = r),
                    o && ((n.method = "next"), (n.arg = t)),
                    !!o
                  );
                }
                for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                  var a = this.tryEntries[i],
                    c = a.completion;
                  if ("root" === a.tryLoc) return o("end");
                  if (a.tryLoc <= this.prev) {
                    var u = r.call(a, "catchLoc"),
                      s = r.call(a, "finallyLoc");
                    if (u && s) {
                      if (this.prev < a.catchLoc) return o(a.catchLoc, !0);
                      if (this.prev < a.finallyLoc) return o(a.finallyLoc);
                    } else if (u) {
                      if (this.prev < a.catchLoc) return o(a.catchLoc, !0);
                    } else {
                      if (!s)
                        throw Error("try statement without catch or finally");
                      if (this.prev < a.finallyLoc) return o(a.finallyLoc);
                    }
                  }
                }
              },
              abrupt: function (t, e) {
                for (var n = this.tryEntries.length - 1; n >= 0; --n) {
                  var o = this.tryEntries[n];
                  if (
                    o.tryLoc <= this.prev &&
                    r.call(o, "finallyLoc") &&
                    this.prev < o.finallyLoc
                  ) {
                    var i = o;
                    break;
                  }
                }
                i &&
                  ("break" === t || "continue" === t) &&
                  i.tryLoc <= e &&
                  e <= i.finallyLoc &&
                  (i = null);
                var a = i ? i.completion : {};
                return (
                  (a.type = t),
                  (a.arg = e),
                  i
                    ? ((this.method = "next"), (this.next = i.finallyLoc), v)
                    : this.complete(a)
                );
              },
              complete: function (t, e) {
                if ("throw" === t.type) throw t.arg;
                return (
                  "break" === t.type || "continue" === t.type
                    ? (this.next = t.arg)
                    : "return" === t.type
                    ? ((this.rval = this.arg = t.arg),
                      (this.method = "return"),
                      (this.next = "end"))
                    : "normal" === t.type && e && (this.next = e),
                  v
                );
              },
              finish: function (t) {
                for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                  var n = this.tryEntries[e];
                  if (n.finallyLoc === t)
                    return this.complete(n.completion, n.afterLoc), D(n), v;
                }
              },
              catch: function (t) {
                for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                  var n = this.tryEntries[e];
                  if (n.tryLoc === t) {
                    var r = n.completion;
                    if ("throw" === r.type) {
                      var o = r.arg;
                      D(n);
                    }
                    return o;
                  }
                }
                throw Error("illegal catch attempt");
              },
              delegateYield: function (e, n, r) {
                return (
                  (this.delegate = {
                    iterator: P(e),
                    resultName: n,
                    nextLoc: r,
                  }),
                  "next" === this.method && (this.arg = t),
                  v
                );
              },
            }),
            e
          );
        }
        function f(t, e, n, r, o, i, a) {
          try {
            var c = t[i](a),
              u = c.value;
          } catch (t) {
            return void n(t);
          }
          c.done ? e(u) : Promise.resolve(u).then(r, o);
        }
        (window.currentReadingTime = 0),
          (window.checkTime = 0),
          (window.timer = null);
        window.startChapter = "";
        var l = function () {
          var t,
            e = /^readingData-[1-9]\d{7}-\d+$/,
            n = [];
          for (var r in window.localStorage)
            e.test(r) && n.push(parseInt(r.split("-")[2]));
          return (
            n.sort(function (t, e) {
              return t - e;
            }),
            (t = n.pop() || 0),
            parseInt(t) + 1
          );
        };
        function h(t) {
          window.jmfe
            .getNavigationStatusHeight()
            .then(function (e) {
              if (window.jmfe.isIOS()) {
                var n = e.status,
                  r = e.data;
                e.msg;
                if ("0" === n) {
                  var o = r.statusBarHeight;
                  r.navigationHeight;
                  t && t(Math.max(o, 25));
                } else t && t(25);
              } else {
                var i = e.statusBarHeight;
                e.navigationHeight;
                t && t(Math.max(i, 25));
              }
            })
            .catch(function (e) {
              t && t(25);
            });
        }
        function d() {
          var t = (0, r.pf)(window.location.href),
            e = t.channelkey,
            n = t.source,
            o = "https://jdread-api.jd.com/h5/book_fiction/home?source="
              .concat(n || "jd", "&channelkey=")
              .concat(e || ""),
            i = '{"action":"to","category":"jump","des":"m","url":"'.concat(
              o,
              '"}'
            );
          (window.location.href = "openapp.jdmobile://virtual?params=".concat(
            encodeURIComponent(i)
          )),
            window.jmfe.closeWebview();
        }
        function p() {
          return (
            window.jmfe.registerCode("9f258051-bf13-4f12-bc31-a1c535da0220"),
            !!window.jmfe.isApp("jd") &&
              (window.jmfe.configNavigationButton({
                clear_js: { type: "clear_js" },
                hidemore: { type: "hidemore" },
              }),
              window.jmfe
                .backControlRouter(function () {
                  d();
                })
                .then(function (t) {
                  var e = t.status,
                    n = t.data;
                  t.msg, window.jmfe.isIOS(), window.jmfe.isAndroid();
                }),
              window.jmfe
                .configNavigationBar({
                  canPull: "0",
                  supportTran: "0",
                  titleWidth: "100",
                  tranParams: {
                    naviMenuType: "bb",
                    backgroundColor: "#ffffff",
                  },
                  topLogo: {
                    w: "80",
                    h: "42",
                    img: "https://img10.360buyimg.com/ebookadmin/jfs/t1/186363/12/43739/5486/6613c619F97953b2d/0683d16e259773e4.png",
                    clickCallBackName: "customClickTopLogoCb",
                    unfreezeLimit: "1",
                  },
                })
                .then(function (t) {}),
              !0)
          );
        }
        (window.startKey = l()),
          (window.visibilitychangeFn = function (t) {
            if ("hidden" === document.visibilityState)
              window.finalSyncReadData();
            else if ("visible" === document.visibilityState) {
              var e =
                document.querySelector(".reader-chapter-content") ||
                document.querySelector(".horizontal-read-container");
              e &&
                "true" === e.getAttribute("isfree") &&
                window.startReadingData();
            }
          }),
          (window.customClickTopLogoCb = function () {
            d();
          }),
          (window.login = function () {
            var t, e;
            null === (t = window.event) || void 0 === t || t.preventDefault(),
              null === (e = window.event) ||
                void 0 === e ||
                e.stopPropagation(),
              window.jmfe.isApp("jd")
                ? window.jmfe.toLogin()
                : (window.location.href = (0, r.Zd)());
          }),
          (window.buyBook = (function () {
            var t,
              e =
                ((t = A().mark(function t(e, n, r, o, i) {
                  var a, c;
                  return A().wrap(
                    function (t) {
                      for (;;)
                        switch ((t.prev = t.next)) {
                          case 0:
                            return (
                              null === (a = window.event) ||
                                void 0 === a ||
                                a.preventDefault(),
                              null === (c = window.event) ||
                                void 0 === c ||
                                c.stopPropagation(),
                              window.addEventListener("pageshow", function () {
                                window.location.reload();
                              }),
                              document.addEventListener(
                                "visibilitychange",
                                function () {
                                  document.hidden || window.location.reload();
                                }
                              ),
                              (t.prev = 4),
                              (t.next = 7),
                              window.$willLeave()
                            );
                          case 7:
                            t.next = 11;
                            break;
                          case 9:
                            (t.prev = 9), (t.t0 = t.catch(4));
                          case 11:
                            return (
                              (t.prev = 11),
                              (t.next = 14),
                              window.finalSyncReadData()
                            );
                          case 14:
                            t.next = 18;
                            break;
                          case 16:
                            (t.prev = 16), (t.t1 = t.catch(11));
                          case 18:
                            window.location.href = ""
                              .concat(
                                location.protocol + "//" + location.host,
                                "/payBook?bookId="
                              )
                              .concat(e, "&chapterId=")
                              .concat(n, "&chapterIndex=")
                              .concat(r, "&chapterCount=")
                              .concat(o, "&chapterName=")
                              .concat(encodeURIComponent(i));
                          case 19:
                          case "end":
                            return t.stop();
                        }
                    },
                    t,
                    null,
                    [
                      [4, 9],
                      [11, 16],
                    ]
                  );
                })),
                function () {
                  var e = this,
                    n = arguments;
                  return new Promise(function (r, o) {
                    var i = t.apply(e, n);
                    function a(t) {
                      f(i, r, o, a, c, "next", t);
                    }
                    function c(t) {
                      f(i, r, o, a, c, "throw", t);
                    }
                    a(void 0);
                  });
                });
            return function (t, n, r, o, i) {
              return e.apply(this, arguments);
            };
          })());
        (window.startReadingData = function () {
          var t = new Date().getTime();
          (window.startTime = t),
            (window.checkTime = 0),
            (window.startIndex = ""),
            (window.startScrollY = 0),
            (window.startPage = 1);
          var e = (0, r.pf)(window.location.href).ebookId;
          window.startChapter = (0, a.cF)("cur_chapter_".concat(e)).chapterId;
          var n = (function () {
              var t = [],
                e = [],
                n = /^readingData-[1-9]\d{7}-\d+$/;
              for (var r in window.localStorage)
                if (n.test(r)) {
                  var o = (0, a.cF)(r);
                  o && (delete o.expireTime, t.push(o), e.push(r));
                }
              return { reserveDataArr: t, keyArr: e };
            })(),
            o = n.reserveDataArr,
            i = n.keyArr;
          y(o, i),
            window.timer && clearInterval(window.timer),
            (window.timer = setInterval(function () {
              "" === window.startIndex &&
                (window.startIndex = window.getStartParaIdx()),
                window.startChapter ||
                  (window.startChapter = (0, a.cF)(
                    "cur_chapter_".concat(e)
                  ).chapterId),
                (window.curChapter = (0, a.cF)(
                  "cur_chapter_".concat(e)
                ).chapterId);
              var t =
                  document.querySelector(".reader-chapter-content") ||
                  document.querySelector(".horizontal-read-container"),
                n = !1;
              window.curChapter &&
                (n = window.curChapter !== window.startChapter);
              var r = !1;
              void 0 !== window.curScrollY &&
                (r = window.curScrollY !== window.startScrollY);
              var o = !1;
              if (
                (window.curPage && (o = window.curPage !== window.startPage),
                (n || r || o) && t && "true" === t.getAttribute("isfree")
                  ? ((window.checkTime = 0),
                    (window.startPage = window.curPage),
                    (window.startScrollY = window.curScrollY))
                  : t &&
                    "false" === t.getAttribute("isfree") &&
                    (window.checkTime = 60),
                !(window.checkTime >= 600))
              ) {
                (window.currentReadingTime += 10), (window.checkTime += 10);
                var i = (0, a.cF)("cur_chapter_".concat(e)).chapterId,
                  c = m(
                    window.startTime,
                    new Date().getTime(),
                    window.currentReadingTime,
                    i
                  ),
                  u = "readingData-".concat(e, "-").concat(window.startKey);
                (0, a.po)(u, c),
                  60 - window.currentReadingTime < 1 &&
                    (c && y([c], [u]),
                    (window.currentReadingTime = 0),
                    (window.startKey = l()),
                    (window.startIndex = window.getStartParaIdx()),
                    (window.startChapter = window.curChapter),
                    (window.startTime = new Date().getTime()));
              }
            }, 1e4));
        }),
          (window.finalSyncReadData = function () {
            if (window.timer) {
              clearInterval(window.timer), (window.timer = null);
              var t = new Date().getTime(),
                e = (0, r.pf)(window.location.href).ebookId,
                n = (0, a.cF)("cur_chapter_".concat(e)).chapterId,
                o = m(window.startTime, t, window.currentReadingTime, n);
              if (!o || (o && o.length < 1)) return;
              var i = "readingData-".concat(e, "-").concat(window.startKey);
              (0, a.po)(i, o);
              var c = y([o], [i]);
              return (
                (window.currentReadingTime = 0), (window.startKey = l()), c
              );
            }
          });
        var g = !1;
        window.reStartRecoedData = function () {
          g ||
            ((g = !0),
            setTimeout(function () {
              var t =
                document.querySelector(".reader-chapter-content") ||
                document.querySelector(".horizontal-read-container");
              t &&
                "true" === t.getAttribute("isfree") &&
                !window.timer &&
                ((window.startKey = l()), window.startReadingData()),
                (g = !1);
            }, 20));
        };
        var m = function (t, e, n, o) {
          if (t && e && o) {
            var i = (0, r.pf)(window.location.href).ebookId,
              a = (0, r.pf)(window.location.href).team_id || "";
            return {
              ebook_id: i,
              length: n,
              start_time: Math.round(t / 1e3),
              end_time: Math.round(e / 1e3),
              start_chapter: window.startChapter,
              end_chapter: o,
              start_para_idx: window.startIndex,
              end_para_idx: v(),
              read_type: 1,
              plus: "1" === (0, r.pf)(window.location.href).isVip,
              team_id: a,
            };
          }
        };
        window.getStartParaIdx = function () {
          var t = 0;
          if (1 === u.Z.getters.readStyle) {
            var e = document.getElementById("vertical-read").scrollTop,
              n =
                document.querySelector(".reader-chapter-content") ||
                document.querySelector(".horizontal-read-container");
            if (!n) return t;
            for (var r = n.childNodes, o = r.length, i = 0; i < o; i++) {
              var a = r[i];
              if (a.offsetTop + a.offsetHeight > e) {
                t = i;
                break;
              }
            }
          } else {
            var c = document.getElementById("horizontal-read-container");
            if (!c) return t;
            for (
              var s = document.defaultView.getComputedStyle(c, null).transform,
                A = -parseFloat(s.substring(7).split(",")[4]) || 0,
                f = c.children[0].offsetLeft,
                l = c.childNodes,
                h = l.length,
                d = 0;
              d < h;
              d++
            ) {
              var p = l[d];
              if (p.offsetLeft === A + f) {
                t = d;
                break;
              }
              if (p.offsetLeft > A + f) {
                t = d - 1;
                break;
              }
            }
          }
          return t;
        };
        var v = function () {
            var t =
                1 === u.Z.getters.readStyle
                  ? document.getElementById("vertical-read").scrollTop
                  : 0,
              e =
                document.querySelector(".reader-chapter-content") ||
                document.querySelector(".horizontal-read-container");
            if (!e) return "";
            for (
              var n = e.childNodes, r = n.length, o = r - 1, i = 0;
              i < r;
              i++
            ) {
              var a = n[i];
              if (
                a.offsetTop > t &&
                a.offsetTop + a.offsetHeight >= t + window.innerHeight
              ) {
                o = i;
                break;
              }
            }
            return o;
          },
          y = function (t, e) {
            if (
              t.length &&
              e.length &&
              ((0, i.ej)("_tob_tk_u_") || (0, i.ej)("jdread_token"))
            )
              return (0, o.wf)(t).then(function (t) {
                (null == t ? void 0 : t.result_code) === c.MR &&
                  e.forEach(function (t) {
                    (0, a.L_)(t);
                  });
              });
          };
      },
      36808: function (t, e, n) {
        var r, o;
        !(function (i) {
          if (
            (void 0 ===
              (o = "function" == typeof (r = i) ? r.call(e, n, e, t) : r) ||
              (t.exports = o),
            (t.exports = i()),
            !!0)
          ) {
            var a = window.Cookies,
              c = (window.Cookies = i());
            c.noConflict = function () {
              return (window.Cookies = a), c;
            };
          }
        })(function () {
          function t() {
            for (var t = 0, e = {}; t < arguments.length; t++) {
              var n = arguments[t];
              for (var r in n) e[r] = n[r];
            }
            return e;
          }
          function e(t) {
            return t.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent);
          }
          return (function n(r) {
            function o() {}
            function i(e, n, i) {
              if ("undefined" != typeof document) {
                "number" ==
                  typeof (i = t({ path: "/" }, o.defaults, i)).expires &&
                  (i.expires = new Date(1 * new Date() + 864e5 * i.expires)),
                  (i.expires = i.expires ? i.expires.toUTCString() : "");
                try {
                  var a = JSON.stringify(n);
                  /^[\{\[]/.test(a) && (n = a);
                } catch (t) {}
                (n = r.write
                  ? r.write(n, e)
                  : encodeURIComponent(String(n)).replace(
                      /%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,
                      decodeURIComponent
                    )),
                  (e = encodeURIComponent(String(e))
                    .replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent)
                    .replace(/[\(\)]/g, escape));
                var c = "";
                for (var u in i)
                  i[u] &&
                    ((c += "; " + u),
                    !0 !== i[u] && (c += "=" + i[u].split(";")[0]));
                return (document.cookie = e + "=" + n + c);
              }
            }
            function a(t, n) {
              if ("undefined" != typeof document) {
                for (
                  var o = {},
                    i = document.cookie ? document.cookie.split("; ") : [],
                    a = 0;
                  a < i.length;
                  a++
                ) {
                  var c = i[a].split("="),
                    u = c.slice(1).join("=");
                  n || '"' !== u.charAt(0) || (u = u.slice(1, -1));
                  try {
                    var s = e(c[0]);
                    if (((u = (r.read || r)(u, s) || e(u)), n))
                      try {
                        u = JSON.parse(u);
                      } catch (t) {}
                    if (((o[s] = u), t === s)) break;
                  } catch (t) {}
                }
                return t ? o[t] : o;
              }
            }
            return (
              (o.set = i),
              (o.get = function (t) {
                return a(t, !1);
              }),
              (o.getJSON = function (t) {
                return a(t, !0);
              }),
              (o.remove = function (e, n) {
                i(e, "", t(n, { expires: -1 }));
              }),
              (o.defaults = {}),
              (o.withConverter = n),
              o
            );
          })(function () {});
        });
      },
      90146: function () {},
      21090: function () {},
      113: function () {},
      97646: function () {},
      86012: function () {},
      10929: function () {},
      45559: function () {},
      15068: function () {},
      98378: function () {},
      32673: function () {},
      63184: function () {},
      69118: function () {},
      37158: function () {},
      91424: function () {},
      25077: function () {},
      90048: function () {},
      56126: function (t, e, n) {
        const { webm: r, mp4: o } = n(77505),
          i = () =>
            "undefined" != typeof navigator &&
            parseFloat(
              (
                "" +
                (/CPU.*OS ([0-9_]{3,4})[0-9_]{0,1}|(CPU like).*AppleWebKit.*Mobile/i.exec(
                  navigator.userAgent
                ) || [0, ""])[1]
              )
                .replace("undefined", "3_2")
                .replace("_", ".")
                .replace("_", "")
            ) < 10 &&
            !window.MSStream,
          a = () => "wakeLock" in navigator;
        t.exports = class {
          constructor() {
            if (((this.enabled = !1), a())) {
              this._wakeLock = null;
              const t = () => {
                null !== this._wakeLock &&
                  "visible" === document.visibilityState &&
                  this.enable();
              };
              document.addEventListener("visibilitychange", t),
                document.addEventListener("fullscreenchange", t);
            } else
              i()
                ? (this.noSleepTimer = null)
                : ((this.noSleepVideo = document.createElement("video")),
                  this.noSleepVideo.setAttribute("title", "No Sleep"),
                  this.noSleepVideo.setAttribute("playsinline", ""),
                  this._addSourceToVideo(this.noSleepVideo, "webm", r),
                  this._addSourceToVideo(this.noSleepVideo, "mp4", o),
                  this.noSleepVideo.addEventListener("loadedmetadata", () => {
                    this.noSleepVideo.duration <= 1
                      ? this.noSleepVideo.setAttribute("loop", "")
                      : this.noSleepVideo.addEventListener("timeupdate", () => {
                          this.noSleepVideo.currentTime > 0.5 &&
                            (this.noSleepVideo.currentTime = Math.random());
                        });
                  }));
          }
          _addSourceToVideo(t, e, n) {
            var r = document.createElement("source");
            (r.src = n), (r.type = `video/${e}`), t.appendChild(r);
          }
          get isEnabled() {
            return this.enabled;
          }
          enable() {
            if (a())
              return navigator.wakeLock
                .request("screen")
                .then((t) => {
                  (this._wakeLock = t),
                    (this.enabled = !0),
                    this._wakeLock.addEventListener("release", () => {});
                })
                .catch((t) => {
                  throw ((this.enabled = !1), t);
                });
            if (i())
              return (
                this.disable(),
                (this.noSleepTimer = window.setInterval(() => {
                  document.hidden ||
                    ((window.location.href =
                      window.location.href.split("#")[0]),
                    window.setTimeout(window.stop, 0));
                }, 15e3)),
                (this.enabled = !0),
                Promise.resolve()
              );
            return this.noSleepVideo
              .play()
              .then((t) => ((this.enabled = !0), t))
              .catch((t) => {
                throw ((this.enabled = !1), t);
              });
          }
          disable() {
            a()
              ? (this._wakeLock && this._wakeLock.release(),
                (this._wakeLock = null))
              : i()
              ? this.noSleepTimer &&
                (window.clearInterval(this.noSleepTimer),
                (this.noSleepTimer = null))
              : this.noSleepVideo.pause(),
              (this.enabled = !1);
          }
        };
      },
      77505: function (t) {
        t.exports = {
          webm: "data:video/webm;base64,GkXfowEAAAAAAAAfQoaBAUL3gQFC8oEEQvOBCEKChHdlYm1Ch4EEQoWBAhhTgGcBAAAAAAAVkhFNm3RALE27i1OrhBVJqWZTrIHfTbuMU6uEFlSua1OsggEwTbuMU6uEHFO7a1OsghV17AEAAAAAAACkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVSalmAQAAAAAAAEUq17GDD0JATYCNTGF2ZjU1LjMzLjEwMFdBjUxhdmY1NS4zMy4xMDBzpJBlrrXf3DCDVB8KcgbMpcr+RImIQJBgAAAAAAAWVK5rAQAAAAAAD++uAQAAAAAAADLXgQFzxYEBnIEAIrWcg3VuZIaFVl9WUDiDgQEj44OEAmJaAOABAAAAAAAABrCBsLqBkK4BAAAAAAAPq9eBAnPFgQKcgQAitZyDdW5khohBX1ZPUkJJU4OBAuEBAAAAAAAAEZ+BArWIQOdwAAAAAABiZIEgY6JPbwIeVgF2b3JiaXMAAAAAAoC7AAAAAAAAgLUBAAAAAAC4AQN2b3JiaXMtAAAAWGlwaC5PcmcgbGliVm9yYmlzIEkgMjAxMDExMDEgKFNjaGF1ZmVudWdnZXQpAQAAABUAAABlbmNvZGVyPUxhdmM1NS41Mi4xMDIBBXZvcmJpcyVCQ1YBAEAAACRzGCpGpXMWhBAaQlAZ4xxCzmvsGUJMEYIcMkxbyyVzkCGkoEKIWyiB0JBVAABAAACHQXgUhIpBCCGEJT1YkoMnPQghhIg5eBSEaUEIIYQQQgghhBBCCCGERTlokoMnQQgdhOMwOAyD5Tj4HIRFOVgQgydB6CCED0K4moOsOQghhCQ1SFCDBjnoHITCLCiKgsQwuBaEBDUojILkMMjUgwtCiJqDSTX4GoRnQXgWhGlBCCGEJEFIkIMGQcgYhEZBWJKDBjm4FITLQagahCo5CB+EIDRkFQCQAACgoiiKoigKEBqyCgDIAAAQQFEUx3EcyZEcybEcCwgNWQUAAAEACAAAoEiKpEiO5EiSJFmSJVmSJVmS5omqLMuyLMuyLMsyEBqyCgBIAABQUQxFcRQHCA1ZBQBkAAAIoDiKpViKpWiK54iOCISGrAIAgAAABAAAEDRDUzxHlETPVFXXtm3btm3btm3btm3btm1blmUZCA1ZBQBAAAAQ0mlmqQaIMAMZBkJDVgEACAAAgBGKMMSA0JBVAABAAACAGEoOogmtOd+c46BZDppKsTkdnEi1eZKbirk555xzzsnmnDHOOeecopxZDJoJrTnnnMSgWQqaCa0555wnsXnQmiqtOeeccc7pYJwRxjnnnCateZCajbU555wFrWmOmkuxOeecSLl5UptLtTnnnHPOOeecc84555zqxekcnBPOOeecqL25lpvQxTnnnE/G6d6cEM4555xzzjnnnHPOOeecIDRkFQAABABAEIaNYdwpCNLnaCBGEWIaMulB9+gwCRqDnELq0ehopJQ6CCWVcVJKJwgNWQUAAAIAQAghhRRSSCGFFFJIIYUUYoghhhhyyimnoIJKKqmooowyyyyzzDLLLLPMOuyssw47DDHEEEMrrcRSU2011lhr7jnnmoO0VlprrbVSSimllFIKQkNWAQAgAAAEQgYZZJBRSCGFFGKIKaeccgoqqIDQkFUAACAAgAAAAABP8hzRER3RER3RER3RER3R8RzPESVREiVREi3TMjXTU0VVdWXXlnVZt31b2IVd933d933d+HVhWJZlWZZlWZZlWZZlWZZlWZYgNGQVAAACAAAghBBCSCGFFFJIKcYYc8w56CSUEAgNWQUAAAIACAAAAHAUR3EcyZEcSbIkS9IkzdIsT/M0TxM9URRF0zRV0RVdUTdtUTZl0zVdUzZdVVZtV5ZtW7Z125dl2/d93/d93/d93/d93/d9XQdCQ1YBABIAADqSIymSIimS4ziOJElAaMgqAEAGAEAAAIriKI7jOJIkSZIlaZJneZaomZrpmZ4qqkBoyCoAABAAQAAAAAAAAIqmeIqpeIqoeI7oiJJomZaoqZoryqbsuq7ruq7ruq7ruq7ruq7ruq7ruq7ruq7ruq7ruq7ruq7ruq4LhIasAgAkAAB0JEdyJEdSJEVSJEdygNCQVQCADACAAAAcwzEkRXIsy9I0T/M0TxM90RM901NFV3SB0JBVAAAgAIAAAAAAAAAMybAUy9EcTRIl1VItVVMt1VJF1VNVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVN0zRNEwgNWQkAkAEAkBBTLS3GmgmLJGLSaqugYwxS7KWxSCpntbfKMYUYtV4ah5RREHupJGOKQcwtpNApJq3WVEKFFKSYYyoVUg5SIDRkhQAQmgHgcBxAsixAsiwAAAAAAAAAkDQN0DwPsDQPAAAAAAAAACRNAyxPAzTPAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABA0jRA8zxA8zwAAAAAAAAA0DwP8DwR8EQRAAAAAAAAACzPAzTRAzxRBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABA0jRA8zxA8zwAAAAAAAAAsDwP8EQR0DwRAAAAAAAAACzPAzxRBDzRAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAEOAAABBgIRQasiIAiBMAcEgSJAmSBM0DSJYFTYOmwTQBkmVB06BpME0AAAAAAAAAAAAAJE2DpkHTIIoASdOgadA0iCIAAAAAAAAAAAAAkqZB06BpEEWApGnQNGgaRBEAAAAAAAAAAAAAzzQhihBFmCbAM02IIkQRpgkAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAGHAAAAgwoQwUGrIiAIgTAHA4imUBAIDjOJYFAACO41gWAABYliWKAABgWZooAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAYcAAACDChDBQashIAiAIAcCiKZQHHsSzgOJYFJMmyAJYF0DyApgFEEQAIAAAocAAACLBBU2JxgEJDVgIAUQAABsWxLE0TRZKkaZoniiRJ0zxPFGma53meacLzPM80IYqiaJoQRVE0TZimaaoqME1VFQAAUOAAABBgg6bE4gCFhqwEAEICAByKYlma5nmeJ4qmqZokSdM8TxRF0TRNU1VJkqZ5niiKommapqqyLE3zPFEURdNUVVWFpnmeKIqiaaqq6sLzPE8URdE0VdV14XmeJ4qiaJqq6roQRVE0TdNUTVV1XSCKpmmaqqqqrgtETxRNU1Vd13WB54miaaqqq7ouEE3TVFVVdV1ZBpimaaqq68oyQFVV1XVdV5YBqqqqruu6sgxQVdd1XVmWZQCu67qyLMsCAAAOHAAAAoygk4wqi7DRhAsPQKEhKwKAKAAAwBimFFPKMCYhpBAaxiSEFEImJaXSUqogpFJSKRWEVEoqJaOUUmopVRBSKamUCkIqJZVSAADYgQMA2IGFUGjISgAgDwCAMEYpxhhzTiKkFGPOOScRUoox55yTSjHmnHPOSSkZc8w556SUzjnnnHNSSuacc845KaVzzjnnnJRSSuecc05KKSWEzkEnpZTSOeecEwAAVOAAABBgo8jmBCNBhYasBABSAQAMjmNZmuZ5omialiRpmud5niiapiZJmuZ5nieKqsnzPE8URdE0VZXneZ4oiqJpqirXFUXTNE1VVV2yLIqmaZqq6rowTdNUVdd1XZimaaqq67oubFtVVdV1ZRm2raqq6rqyDFzXdWXZloEsu67s2rIAAPAEBwCgAhtWRzgpGgssNGQlAJABAEAYg5BCCCFlEEIKIYSUUggJAAAYcAAACDChDBQashIASAUAAIyx1lprrbXWQGettdZaa62AzFprrbXWWmuttdZaa6211lJrrbXWWmuttdZaa6211lprrbXWWmuttdZaa6211lprrbXWWmuttdZaa6211lprrbXWWmstpZRSSimllFJKKaWUUkoppZRSSgUA+lU4APg/2LA6wknRWGChISsBgHAAAMAYpRhzDEIppVQIMeacdFRai7FCiDHnJKTUWmzFc85BKCGV1mIsnnMOQikpxVZjUSmEUlJKLbZYi0qho5JSSq3VWIwxqaTWWoutxmKMSSm01FqLMRYjbE2ptdhqq7EYY2sqLbQYY4zFCF9kbC2m2moNxggjWywt1VprMMYY3VuLpbaaizE++NpSLDHWXAAAd4MDAESCjTOsJJ0VjgYXGrISAAgJACAQUooxxhhzzjnnpFKMOeaccw5CCKFUijHGnHMOQgghlIwx5pxzEEIIIYRSSsaccxBCCCGEkFLqnHMQQgghhBBKKZ1zDkIIIYQQQimlgxBCCCGEEEoopaQUQgghhBBCCKmklEIIIYRSQighlZRSCCGEEEIpJaSUUgohhFJCCKGElFJKKYUQQgillJJSSimlEkoJJYQSUikppRRKCCGUUkpKKaVUSgmhhBJKKSWllFJKIYQQSikFAAAcOAAABBhBJxlVFmGjCRcegEJDVgIAZAAAkKKUUiktRYIipRikGEtGFXNQWoqocgxSzalSziDmJJaIMYSUk1Qy5hRCDELqHHVMKQYtlRhCxhik2HJLoXMOAAAAQQCAgJAAAAMEBTMAwOAA4XMQdAIERxsAgCBEZohEw0JweFAJEBFTAUBigkIuAFRYXKRdXECXAS7o4q4DIQQhCEEsDqCABByccMMTb3jCDU7QKSp1IAAAAAAADADwAACQXAAREdHMYWRobHB0eHyAhIiMkAgAAAAAABcAfAAAJCVAREQ0cxgZGhscHR4fICEiIyQBAIAAAgAAAAAggAAEBAQAAAAAAAIAAAAEBB9DtnUBAAAAAAAEPueBAKOFggAAgACjzoEAA4BwBwCdASqwAJAAAEcIhYWIhYSIAgIABhwJ7kPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32ych77ZOQ99YAD+/6tQgKOFggADgAqjhYIAD4AOo4WCACSADqOZgQArADECAAEQEAAYABhYL/QACIBDmAYAAKOFggA6gA6jhYIAT4AOo5mBAFMAMQIAARAQABgAGFgv9AAIgEOYBgAAo4WCAGSADqOFggB6gA6jmYEAewAxAgABEBAAGAAYWC/0AAiAQ5gGAACjhYIAj4AOo5mBAKMAMQIAARAQABgAGFgv9AAIgEOYBgAAo4WCAKSADqOFggC6gA6jmYEAywAxAgABEBAAGAAYWC/0AAiAQ5gGAACjhYIAz4AOo4WCAOSADqOZgQDzADECAAEQEAAYABhYL/QACIBDmAYAAKOFggD6gA6jhYIBD4AOo5iBARsAEQIAARAQFGAAYWC/0AAiAQ5gGACjhYIBJIAOo4WCATqADqOZgQFDADECAAEQEAAYABhYL/QACIBDmAYAAKOFggFPgA6jhYIBZIAOo5mBAWsAMQIAARAQABgAGFgv9AAIgEOYBgAAo4WCAXqADqOFggGPgA6jmYEBkwAxAgABEBAAGAAYWC/0AAiAQ5gGAACjhYIBpIAOo4WCAbqADqOZgQG7ADECAAEQEAAYABhYL/QACIBDmAYAAKOFggHPgA6jmYEB4wAxAgABEBAAGAAYWC/0AAiAQ5gGAACjhYIB5IAOo4WCAfqADqOZgQILADECAAEQEAAYABhYL/QACIBDmAYAAKOFggIPgA6jhYICJIAOo5mBAjMAMQIAARAQABgAGFgv9AAIgEOYBgAAo4WCAjqADqOFggJPgA6jmYECWwAxAgABEBAAGAAYWC/0AAiAQ5gGAACjhYICZIAOo4WCAnqADqOZgQKDADECAAEQEAAYABhYL/QACIBDmAYAAKOFggKPgA6jhYICpIAOo5mBAqsAMQIAARAQABgAGFgv9AAIgEOYBgAAo4WCArqADqOFggLPgA6jmIEC0wARAgABEBAUYABhYL/QACIBDmAYAKOFggLkgA6jhYIC+oAOo5mBAvsAMQIAARAQABgAGFgv9AAIgEOYBgAAo4WCAw+ADqOZgQMjADECAAEQEAAYABhYL/QACIBDmAYAAKOFggMkgA6jhYIDOoAOo5mBA0sAMQIAARAQABgAGFgv9AAIgEOYBgAAo4WCA0+ADqOFggNkgA6jmYEDcwAxAgABEBAAGAAYWC/0AAiAQ5gGAACjhYIDeoAOo4WCA4+ADqOZgQObADECAAEQEAAYABhYL/QACIBDmAYAAKOFggOkgA6jhYIDuoAOo5mBA8MAMQIAARAQABgAGFgv9AAIgEOYBgAAo4WCA8+ADqOFggPkgA6jhYID+oAOo4WCBA+ADhxTu2sBAAAAAAAAEbuPs4EDt4r3gQHxghEr8IEK",
          mp4: "data:video/mp4;base64,AAAAHGZ0eXBNNFYgAAACAGlzb21pc28yYXZjMQAAAAhmcmVlAAAGF21kYXTeBAAAbGliZmFhYyAxLjI4AABCAJMgBDIARwAAArEGBf//rdxF6b3m2Ui3lizYINkj7u94MjY0IC0gY29yZSAxNDIgcjIgOTU2YzhkOCAtIEguMjY0L01QRUctNCBBVkMgY29kZWMgLSBDb3B5bGVmdCAyMDAzLTIwMTQgLSBodHRwOi8vd3d3LnZpZGVvbGFuLm9yZy94MjY0Lmh0bWwgLSBvcHRpb25zOiBjYWJhYz0wIHJlZj0zIGRlYmxvY2s9MTowOjAgYW5hbHlzZT0weDE6MHgxMTEgbWU9aGV4IHN1Ym1lPTcgcHN5PTEgcHN5X3JkPTEuMDA6MC4wMCBtaXhlZF9yZWY9MSBtZV9yYW5nZT0xNiBjaHJvbWFfbWU9MSB0cmVsbGlzPTEgOHg4ZGN0PTAgY3FtPTAgZGVhZHpvbmU9MjEsMTEgZmFzdF9wc2tpcD0xIGNocm9tYV9xcF9vZmZzZXQ9LTIgdGhyZWFkcz02IGxvb2thaGVhZF90aHJlYWRzPTEgc2xpY2VkX3RocmVhZHM9MCBucj0wIGRlY2ltYXRlPTEgaW50ZXJsYWNlZD0wIGJsdXJheV9jb21wYXQ9MCBjb25zdHJhaW5lZF9pbnRyYT0wIGJmcmFtZXM9MCB3ZWlnaHRwPTAga2V5aW50PTI1MCBrZXlpbnRfbWluPTI1IHNjZW5lY3V0PTQwIGludHJhX3JlZnJlc2g9MCByY19sb29rYWhlYWQ9NDAgcmM9Y3JmIG1idHJlZT0xIGNyZj0yMy4wIHFjb21wPTAuNjAgcXBtaW49MCBxcG1heD02OSBxcHN0ZXA9NCB2YnZfbWF4cmF0ZT03NjggdmJ2X2J1ZnNpemU9MzAwMCBjcmZfbWF4PTAuMCBuYWxfaHJkPW5vbmUgZmlsbGVyPTAgaXBfcmF0aW89MS40MCBhcT0xOjEuMDAAgAAAAFZliIQL8mKAAKvMnJycnJycnJycnXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXiEASZACGQAjgCEASZACGQAjgAAAAAdBmjgX4GSAIQBJkAIZACOAAAAAB0GaVAX4GSAhAEmQAhkAI4AhAEmQAhkAI4AAAAAGQZpgL8DJIQBJkAIZACOAIQBJkAIZACOAAAAABkGagC/AySEASZACGQAjgAAAAAZBmqAvwMkhAEmQAhkAI4AhAEmQAhkAI4AAAAAGQZrAL8DJIQBJkAIZACOAAAAABkGa4C/AySEASZACGQAjgCEASZACGQAjgAAAAAZBmwAvwMkhAEmQAhkAI4AAAAAGQZsgL8DJIQBJkAIZACOAIQBJkAIZACOAAAAABkGbQC/AySEASZACGQAjgCEASZACGQAjgAAAAAZBm2AvwMkhAEmQAhkAI4AAAAAGQZuAL8DJIQBJkAIZACOAIQBJkAIZACOAAAAABkGboC/AySEASZACGQAjgAAAAAZBm8AvwMkhAEmQAhkAI4AhAEmQAhkAI4AAAAAGQZvgL8DJIQBJkAIZACOAAAAABkGaAC/AySEASZACGQAjgCEASZACGQAjgAAAAAZBmiAvwMkhAEmQAhkAI4AhAEmQAhkAI4AAAAAGQZpAL8DJIQBJkAIZACOAAAAABkGaYC/AySEASZACGQAjgCEASZACGQAjgAAAAAZBmoAvwMkhAEmQAhkAI4AAAAAGQZqgL8DJIQBJkAIZACOAIQBJkAIZACOAAAAABkGawC/AySEASZACGQAjgAAAAAZBmuAvwMkhAEmQAhkAI4AhAEmQAhkAI4AAAAAGQZsAL8DJIQBJkAIZACOAAAAABkGbIC/AySEASZACGQAjgCEASZACGQAjgAAAAAZBm0AvwMkhAEmQAhkAI4AhAEmQAhkAI4AAAAAGQZtgL8DJIQBJkAIZACOAAAAABkGbgCvAySEASZACGQAjgCEASZACGQAjgAAAAAZBm6AnwMkhAEmQAhkAI4AhAEmQAhkAI4AhAEmQAhkAI4AhAEmQAhkAI4AAAAhubW9vdgAAAGxtdmhkAAAAAAAAAAAAAAAAAAAD6AAABDcAAQAAAQAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAzB0cmFrAAAAXHRraGQAAAADAAAAAAAAAAAAAAABAAAAAAAAA+kAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAABAAAAAALAAAACQAAAAAAAkZWR0cwAAABxlbHN0AAAAAAAAAAEAAAPpAAAAAAABAAAAAAKobWRpYQAAACBtZGhkAAAAAAAAAAAAAAAAAAB1MAAAdU5VxAAAAAAALWhkbHIAAAAAAAAAAHZpZGUAAAAAAAAAAAAAAABWaWRlb0hhbmRsZXIAAAACU21pbmYAAAAUdm1oZAAAAAEAAAAAAAAAAAAAACRkaW5mAAAAHGRyZWYAAAAAAAAAAQAAAAx1cmwgAAAAAQAAAhNzdGJsAAAAr3N0c2QAAAAAAAAAAQAAAJ9hdmMxAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAALAAkABIAAAASAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGP//AAAALWF2Y0MBQsAN/+EAFWdCwA3ZAsTsBEAAAPpAADqYA8UKkgEABWjLg8sgAAAAHHV1aWRraEDyXyRPxbo5pRvPAyPzAAAAAAAAABhzdHRzAAAAAAAAAAEAAAAeAAAD6QAAABRzdHNzAAAAAAAAAAEAAAABAAAAHHN0c2MAAAAAAAAAAQAAAAEAAAABAAAAAQAAAIxzdHN6AAAAAAAAAAAAAAAeAAADDwAAAAsAAAALAAAACgAAAAoAAAAKAAAACgAAAAoAAAAKAAAACgAAAAoAAAAKAAAACgAAAAoAAAAKAAAACgAAAAoAAAAKAAAACgAAAAoAAAAKAAAACgAAAAoAAAAKAAAACgAAAAoAAAAKAAAACgAAAAoAAAAKAAAAiHN0Y28AAAAAAAAAHgAAAEYAAANnAAADewAAA5gAAAO0AAADxwAAA+MAAAP2AAAEEgAABCUAAARBAAAEXQAABHAAAASMAAAEnwAABLsAAATOAAAE6gAABQYAAAUZAAAFNQAABUgAAAVkAAAFdwAABZMAAAWmAAAFwgAABd4AAAXxAAAGDQAABGh0cmFrAAAAXHRraGQAAAADAAAAAAAAAAAAAAACAAAAAAAABDcAAAAAAAAAAAAAAAEBAAAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAkZWR0cwAAABxlbHN0AAAAAAAAAAEAAAQkAAADcAABAAAAAAPgbWRpYQAAACBtZGhkAAAAAAAAAAAAAAAAAAC7gAAAykBVxAAAAAAALWhkbHIAAAAAAAAAAHNvdW4AAAAAAAAAAAAAAABTb3VuZEhhbmRsZXIAAAADi21pbmYAAAAQc21oZAAAAAAAAAAAAAAAJGRpbmYAAAAcZHJlZgAAAAAAAAABAAAADHVybCAAAAABAAADT3N0YmwAAABnc3RzZAAAAAAAAAABAAAAV21wNGEAAAAAAAAAAQAAAAAAAAAAAAIAEAAAAAC7gAAAAAAAM2VzZHMAAAAAA4CAgCIAAgAEgICAFEAVBbjYAAu4AAAADcoFgICAAhGQBoCAgAECAAAAIHN0dHMAAAAAAAAAAgAAADIAAAQAAAAAAQAAAkAAAAFUc3RzYwAAAAAAAAAbAAAAAQAAAAEAAAABAAAAAgAAAAIAAAABAAAAAwAAAAEAAAABAAAABAAAAAIAAAABAAAABgAAAAEAAAABAAAABwAAAAIAAAABAAAACAAAAAEAAAABAAAACQAAAAIAAAABAAAACgAAAAEAAAABAAAACwAAAAIAAAABAAAADQAAAAEAAAABAAAADgAAAAIAAAABAAAADwAAAAEAAAABAAAAEAAAAAIAAAABAAAAEQAAAAEAAAABAAAAEgAAAAIAAAABAAAAFAAAAAEAAAABAAAAFQAAAAIAAAABAAAAFgAAAAEAAAABAAAAFwAAAAIAAAABAAAAGAAAAAEAAAABAAAAGQAAAAIAAAABAAAAGgAAAAEAAAABAAAAGwAAAAIAAAABAAAAHQAAAAEAAAABAAAAHgAAAAIAAAABAAAAHwAAAAQAAAABAAAA4HN0c3oAAAAAAAAAAAAAADMAAAAaAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAACQAAAAkAAACMc3RjbwAAAAAAAAAfAAAALAAAA1UAAANyAAADhgAAA6IAAAO+AAAD0QAAA+0AAAQAAAAEHAAABC8AAARLAAAEZwAABHoAAASWAAAEqQAABMUAAATYAAAE9AAABRAAAAUjAAAFPwAABVIAAAVuAAAFgQAABZ0AAAWwAAAFzAAABegAAAX7AAAGFwAAAGJ1ZHRhAAAAWm1ldGEAAAAAAAAAIWhkbHIAAAAAAAAAAG1kaXJhcHBsAAAAAAAAAAAAAAAALWlsc3QAAAAlqXRvbwAAAB1kYXRhAAAAAQAAAABMYXZmNTUuMzMuMTAw",
        };
      },
      35666: function (t) {
        var e = (function (t) {
          "use strict";
          var e,
            n = Object.prototype,
            r = n.hasOwnProperty,
            o =
              Object.defineProperty ||
              function (t, e, n) {
                t[e] = n.value;
              },
            i = "function" == typeof Symbol ? Symbol : {},
            a = i.iterator || "@@iterator",
            c = i.asyncIterator || "@@asyncIterator",
            u = i.toStringTag || "@@toStringTag";
          function s(t, e, n) {
            return (
              Object.defineProperty(t, e, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              }),
              t[e]
            );
          }
          try {
            s({}, "");
          } catch (t) {
            s = function (t, e, n) {
              return (t[e] = n);
            };
          }
          function A(t, e, n, r) {
            var i = e && e.prototype instanceof m ? e : m,
              a = Object.create(i.prototype),
              c = new T(r || []);
            return o(a, "_invoke", { value: E(t, n, c) }), a;
          }
          function f(t, e, n) {
            try {
              return { type: "normal", arg: t.call(e, n) };
            } catch (t) {
              return { type: "throw", arg: t };
            }
          }
          t.wrap = A;
          var l = "suspendedStart",
            h = "suspendedYield",
            d = "executing",
            p = "completed",
            g = {};
          function m() {}
          function v() {}
          function y() {}
          var w = {};
          s(w, a, function () {
            return this;
          });
          var b = Object.getPrototypeOf,
            C = b && b(b(D([])));
          C && C !== n && r.call(C, a) && (w = C);
          var I = (y.prototype = m.prototype = Object.create(w));
          function S(t) {
            ["next", "throw", "return"].forEach(function (e) {
              s(t, e, function (t) {
                return this._invoke(e, t);
              });
            });
          }
          function x(t, e) {
            function n(o, i, a, c) {
              var u = f(t[o], t, i);
              if ("throw" !== u.type) {
                var s = u.arg,
                  A = s.value;
                return A && "object" == typeof A && r.call(A, "__await")
                  ? e.resolve(A.__await).then(
                      function (t) {
                        n("next", t, a, c);
                      },
                      function (t) {
                        n("throw", t, a, c);
                      }
                    )
                  : e.resolve(A).then(
                      function (t) {
                        (s.value = t), a(s);
                      },
                      function (t) {
                        return n("throw", t, a, c);
                      }
                    );
              }
              c(u.arg);
            }
            var i;
            o(this, "_invoke", {
              value: function (t, r) {
                function o() {
                  return new e(function (e, o) {
                    n(t, r, e, o);
                  });
                }
                return (i = i ? i.then(o, o) : o());
              },
            });
          }
          function E(t, n, r) {
            var o = l;
            return function (i, a) {
              if (o === d) throw new Error("Generator is already running");
              if (o === p) {
                if ("throw" === i) throw a;
                return { value: e, done: !0 };
              }
              for (r.method = i, r.arg = a; ; ) {
                var c = r.delegate;
                if (c) {
                  var u = _(c, r);
                  if (u) {
                    if (u === g) continue;
                    return u;
                  }
                }
                if ("next" === r.method) r.sent = r._sent = r.arg;
                else if ("throw" === r.method) {
                  if (o === l) throw ((o = p), r.arg);
                  r.dispatchException(r.arg);
                } else "return" === r.method && r.abrupt("return", r.arg);
                o = d;
                var s = f(t, n, r);
                if ("normal" === s.type) {
                  if (((o = r.done ? p : h), s.arg === g)) continue;
                  return { value: s.arg, done: r.done };
                }
                "throw" === s.type &&
                  ((o = p), (r.method = "throw"), (r.arg = s.arg));
              }
            };
          }
          function _(t, n) {
            var r = n.method,
              o = t.iterator[r];
            if (o === e)
              return (
                (n.delegate = null),
                ("throw" === r &&
                  t.iterator.return &&
                  ((n.method = "return"),
                  (n.arg = e),
                  _(t, n),
                  "throw" === n.method)) ||
                  ("return" !== r &&
                    ((n.method = "throw"),
                    (n.arg = new TypeError(
                      "The iterator does not provide a '" + r + "' method"
                    )))),
                g
              );
            var i = f(o, t.iterator, n.arg);
            if ("throw" === i.type)
              return (
                (n.method = "throw"), (n.arg = i.arg), (n.delegate = null), g
              );
            var a = i.arg;
            return a
              ? a.done
                ? ((n[t.resultName] = a.value),
                  (n.next = t.nextLoc),
                  "return" !== n.method && ((n.method = "next"), (n.arg = e)),
                  (n.delegate = null),
                  g)
                : a
              : ((n.method = "throw"),
                (n.arg = new TypeError("iterator result is not an object")),
                (n.delegate = null),
                g);
          }
          function B(t) {
            var e = { tryLoc: t[0] };
            1 in t && (e.catchLoc = t[1]),
              2 in t && ((e.finallyLoc = t[2]), (e.afterLoc = t[3])),
              this.tryEntries.push(e);
          }
          function k(t) {
            var e = t.completion || {};
            (e.type = "normal"), delete e.arg, (t.completion = e);
          }
          function T(t) {
            (this.tryEntries = [{ tryLoc: "root" }]),
              t.forEach(B, this),
              this.reset(!0);
          }
          function D(t) {
            if (null != t) {
              var n = t[a];
              if (n) return n.call(t);
              if ("function" == typeof t.next) return t;
              if (!isNaN(t.length)) {
                var o = -1,
                  i = function n() {
                    for (; ++o < t.length; )
                      if (r.call(t, o))
                        return (n.value = t[o]), (n.done = !1), n;
                    return (n.value = e), (n.done = !0), n;
                  };
                return (i.next = i);
              }
            }
            throw new TypeError(typeof t + " is not iterable");
          }
          return (
            (v.prototype = y),
            o(I, "constructor", { value: y, configurable: !0 }),
            o(y, "constructor", { value: v, configurable: !0 }),
            (v.displayName = s(y, u, "GeneratorFunction")),
            (t.isGeneratorFunction = function (t) {
              var e = "function" == typeof t && t.constructor;
              return (
                !!e &&
                (e === v || "GeneratorFunction" === (e.displayName || e.name))
              );
            }),
            (t.mark = function (t) {
              return (
                Object.setPrototypeOf
                  ? Object.setPrototypeOf(t, y)
                  : ((t.__proto__ = y), s(t, u, "GeneratorFunction")),
                (t.prototype = Object.create(I)),
                t
              );
            }),
            (t.awrap = function (t) {
              return { __await: t };
            }),
            S(x.prototype),
            s(x.prototype, c, function () {
              return this;
            }),
            (t.AsyncIterator = x),
            (t.async = function (e, n, r, o, i) {
              void 0 === i && (i = Promise);
              var a = new x(A(e, n, r, o), i);
              return t.isGeneratorFunction(n)
                ? a
                : a.next().then(function (t) {
                    return t.done ? t.value : a.next();
                  });
            }),
            S(I),
            s(I, u, "Generator"),
            s(I, a, function () {
              return this;
            }),
            s(I, "toString", function () {
              return "[object Generator]";
            }),
            (t.keys = function (t) {
              var e = Object(t),
                n = [];
              for (var r in e) n.push(r);
              return (
                n.reverse(),
                function t() {
                  for (; n.length; ) {
                    var r = n.pop();
                    if (r in e) return (t.value = r), (t.done = !1), t;
                  }
                  return (t.done = !0), t;
                }
              );
            }),
            (t.values = D),
            (T.prototype = {
              constructor: T,
              reset: function (t) {
                if (
                  ((this.prev = 0),
                  (this.next = 0),
                  (this.sent = this._sent = e),
                  (this.done = !1),
                  (this.delegate = null),
                  (this.method = "next"),
                  (this.arg = e),
                  this.tryEntries.forEach(k),
                  !t)
                )
                  for (var n in this)
                    "t" === n.charAt(0) &&
                      r.call(this, n) &&
                      !isNaN(+n.slice(1)) &&
                      (this[n] = e);
              },
              stop: function () {
                this.done = !0;
                var t = this.tryEntries[0].completion;
                if ("throw" === t.type) throw t.arg;
                return this.rval;
              },
              dispatchException: function (t) {
                if (this.done) throw t;
                var n = this;
                function o(r, o) {
                  return (
                    (c.type = "throw"),
                    (c.arg = t),
                    (n.next = r),
                    o && ((n.method = "next"), (n.arg = e)),
                    !!o
                  );
                }
                for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                  var a = this.tryEntries[i],
                    c = a.completion;
                  if ("root" === a.tryLoc) return o("end");
                  if (a.tryLoc <= this.prev) {
                    var u = r.call(a, "catchLoc"),
                      s = r.call(a, "finallyLoc");
                    if (u && s) {
                      if (this.prev < a.catchLoc) return o(a.catchLoc, !0);
                      if (this.prev < a.finallyLoc) return o(a.finallyLoc);
                    } else if (u) {
                      if (this.prev < a.catchLoc) return o(a.catchLoc, !0);
                    } else {
                      if (!s)
                        throw new Error(
                          "try statement without catch or finally"
                        );
                      if (this.prev < a.finallyLoc) return o(a.finallyLoc);
                    }
                  }
                }
              },
              abrupt: function (t, e) {
                for (var n = this.tryEntries.length - 1; n >= 0; --n) {
                  var o = this.tryEntries[n];
                  if (
                    o.tryLoc <= this.prev &&
                    r.call(o, "finallyLoc") &&
                    this.prev < o.finallyLoc
                  ) {
                    var i = o;
                    break;
                  }
                }
                i &&
                  ("break" === t || "continue" === t) &&
                  i.tryLoc <= e &&
                  e <= i.finallyLoc &&
                  (i = null);
                var a = i ? i.completion : {};
                return (
                  (a.type = t),
                  (a.arg = e),
                  i
                    ? ((this.method = "next"), (this.next = i.finallyLoc), g)
                    : this.complete(a)
                );
              },
              complete: function (t, e) {
                if ("throw" === t.type) throw t.arg;
                return (
                  "break" === t.type || "continue" === t.type
                    ? (this.next = t.arg)
                    : "return" === t.type
                    ? ((this.rval = this.arg = t.arg),
                      (this.method = "return"),
                      (this.next = "end"))
                    : "normal" === t.type && e && (this.next = e),
                  g
                );
              },
              finish: function (t) {
                for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                  var n = this.tryEntries[e];
                  if (n.finallyLoc === t)
                    return this.complete(n.completion, n.afterLoc), k(n), g;
                }
              },
              catch: function (t) {
                for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                  var n = this.tryEntries[e];
                  if (n.tryLoc === t) {
                    var r = n.completion;
                    if ("throw" === r.type) {
                      var o = r.arg;
                      k(n);
                    }
                    return o;
                  }
                }
                throw new Error("illegal catch attempt");
              },
              delegateYield: function (t, n, r) {
                return (
                  (this.delegate = {
                    iterator: D(t),
                    resultName: n,
                    nextLoc: r,
                  }),
                  "next" === this.method && (this.arg = e),
                  g
                );
              },
            }),
            t
          );
        })(t.exports);
        try {
          regeneratorRuntime = e;
        } catch (t) {
          "object" == typeof globalThis
            ? (globalThis.regeneratorRuntime = e)
            : Function("r", "regeneratorRuntime = r")(e);
        }
      },
      93379: function (t) {
        "use strict";
        var e = [];
        function n(t) {
          for (var n = -1, r = 0; r < e.length; r++)
            if (e[r].identifier === t) {
              n = r;
              break;
            }
          return n;
        }
        function r(t, r) {
          for (var i = {}, a = [], c = 0; c < t.length; c++) {
            var u = t[c],
              s = r.base ? u[0] + r.base : u[0],
              A = i[s] || 0,
              f = "".concat(s, " ").concat(A);
            i[s] = A + 1;
            var l = n(f),
              h = {
                css: u[1],
                media: u[2],
                sourceMap: u[3],
                supports: u[4],
                layer: u[5],
              };
            if (-1 !== l) e[l].references++, e[l].updater(h);
            else {
              var d = o(h, r);
              (r.byIndex = c),
                e.splice(c, 0, { identifier: f, updater: d, references: 1 });
            }
            a.push(f);
          }
          return a;
        }
        function o(t, e) {
          var n = e.domAPI(e);
          n.update(t);
          return function (e) {
            if (e) {
              if (
                e.css === t.css &&
                e.media === t.media &&
                e.sourceMap === t.sourceMap &&
                e.supports === t.supports &&
                e.layer === t.layer
              )
                return;
              n.update((t = e));
            } else n.remove();
          };
        }
        t.exports = function (t, o) {
          var i = r((t = t || []), (o = o || {}));
          return function (t) {
            t = t || [];
            for (var a = 0; a < i.length; a++) {
              var c = n(i[a]);
              e[c].references--;
            }
            for (var u = r(t, o), s = 0; s < i.length; s++) {
              var A = n(i[s]);
              0 === e[A].references && (e[A].updater(), e.splice(A, 1));
            }
            i = u;
          };
        };
      },
      90569: function (t) {
        "use strict";
        var e = {};
        t.exports = function (t, n) {
          var r = (function (t) {
            if (void 0 === e[t]) {
              var n = document.querySelector(t);
              if (
                window.HTMLIFrameElement &&
                n instanceof window.HTMLIFrameElement
              )
                try {
                  n = n.contentDocument.head;
                } catch (t) {
                  n = null;
                }
              e[t] = n;
            }
            return e[t];
          })(t);
          if (!r)
            throw new Error(
              "Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid."
            );
          r.appendChild(n);
        };
      },
      19216: function (t) {
        "use strict";
        t.exports = function (t) {
          var e = document.createElement("style");
          return t.setAttributes(e, t.attributes), t.insert(e, t.options), e;
        };
      },
      3565: function (t, e, n) {
        "use strict";
        t.exports = function (t) {
          var e = n.nc;
          e && t.setAttribute("nonce", e);
        };
      },
      7795: function (t) {
        "use strict";
        t.exports = function (t) {
          if ("undefined" == typeof document)
            return { update: function () {}, remove: function () {} };
          var e = t.insertStyleElement(t);
          return {
            update: function (n) {
              !(function (t, e, n) {
                var r = "";
                n.supports && (r += "@supports (".concat(n.supports, ") {")),
                  n.media && (r += "@media ".concat(n.media, " {"));
                var o = void 0 !== n.layer;
                o &&
                  (r += "@layer".concat(
                    n.layer.length > 0 ? " ".concat(n.layer) : "",
                    " {"
                  )),
                  (r += n.css),
                  o && (r += "}"),
                  n.media && (r += "}"),
                  n.supports && (r += "}");
                var i = n.sourceMap;
                i &&
                  "undefined" != typeof btoa &&
                  (r +=
                    "\n/*# sourceMappingURL=data:application/json;base64,".concat(
                      btoa(unescape(encodeURIComponent(JSON.stringify(i)))),
                      " */"
                    )),
                  e.styleTagTransform(r, t, e.options);
              })(e, t, n);
            },
            remove: function () {
              !(function (t) {
                if (null === t.parentNode) return !1;
                t.parentNode.removeChild(t);
              })(e);
            },
          };
        };
      },
      44589: function (t) {
        "use strict";
        t.exports = function (t, e) {
          if (e.styleSheet) e.styleSheet.cssText = t;
          else {
            for (; e.firstChild; ) e.removeChild(e.firstChild);
            e.appendChild(document.createTextNode(t));
          }
        };
      },
      81614: function (t) {
        var e;
        (e = "object" == typeof window && window),
          (t.exports = (function (t, e) {
            var n,
              r,
              o,
              i,
              a,
              c,
              u,
              s,
              A,
              f,
              l,
              h,
              d,
              p,
              g,
              m,
              v,
              y,
              w,
              b,
              C,
              I;
            if (t)
              return t.jWeixin
                ? t.jWeixin
                : ((n = {
                    config: "preVerifyJSAPI",
                    onMenuShareTimeline: "menu:share:timeline",
                    onMenuShareAppMessage: "menu:share:appmessage",
                    onMenuShareQQ: "menu:share:qq",
                    onMenuShareWeibo: "menu:share:weiboApp",
                    onMenuShareQZone: "menu:share:QZone",
                    previewImage: "imagePreview",
                    getLocation: "geoLocation",
                    openProductSpecificView: "openProductViewWithPid",
                    addCard: "batchAddCard",
                    openCard: "batchViewCard",
                    chooseWXPay: "getBrandWCPayRequest",
                    openEnterpriseRedPacket: "getRecevieBizHongBaoRequest",
                    startSearchBeacons: "startMonitoringBeacons",
                    stopSearchBeacons: "stopMonitoringBeacons",
                    onSearchBeacons: "onBeaconsInRange",
                    consumeAndShareCard: "consumedShareCard",
                    openAddress: "editAddress",
                  }),
                  (r = (function () {
                    var t,
                      e = {};
                    for (t in n) e[n[t]] = t;
                    return e;
                  })()),
                  (o = t.document),
                  (i = o.title),
                  (a = navigator.userAgent.toLowerCase()),
                  (h = navigator.platform.toLowerCase()),
                  (c = !(!h.match("mac") && !h.match("win"))),
                  (u = -1 != a.indexOf("wxdebugger")),
                  (s = -1 != a.indexOf("micromessenger")),
                  (A = -1 != a.indexOf("android")),
                  (f = -1 != a.indexOf("iphone") || -1 != a.indexOf("ipad")),
                  (l = (h =
                    a.match(/micromessenger\/(\d+\.\d+\.\d+)/) ||
                    a.match(/micromessenger\/(\d+\.\d+)/))
                    ? h[1]
                    : ""),
                  (d = {
                    initStartTime: O(),
                    initEndTime: 0,
                    preVerifyStartTime: 0,
                    preVerifyEndTime: 0,
                  }),
                  (p = {
                    version: 1,
                    appId: "",
                    initTime: 0,
                    preVerifyTime: 0,
                    networkType: "",
                    isPreVerifyOk: 1,
                    systemType: f ? 1 : A ? 2 : -1,
                    clientVersion: l,
                    url: encodeURIComponent(location.href),
                  }),
                  (g = {}),
                  (m = { _completes: [] }),
                  (v = { state: 0, data: {} }),
                  P(function () {
                    d.initEndTime = O();
                  }),
                  (y = !1),
                  (w = []),
                  (b = {
                    config: function (e) {
                      T("config", (g = e));
                      var r = !1 !== g.check;
                      P(function () {
                        if (r)
                          S(
                            n.config,
                            {
                              verifyJsApiList: k(g.jsApiList),
                              verifyOpenTagList: k(g.openTagList),
                            },
                            ((m._complete = function (t) {
                              (d.preVerifyEndTime = O()),
                                (v.state = 1),
                                (v.data = t);
                            }),
                            (m.success = function (t) {
                              p.isPreVerifyOk = 0;
                            }),
                            (m.fail = function (t) {
                              m._fail ? m._fail(t) : (v.state = -1);
                            }),
                            (i = m._completes).push(function () {
                              D();
                            }),
                            (m.complete = function (t) {
                              for (var e = 0, n = i.length; e < n; ++e) i[e]();
                              m._completes = [];
                            }),
                            m)
                          ),
                            (d.preVerifyStartTime = O());
                        else {
                          v.state = 1;
                          for (
                            var t = m._completes, e = 0, o = t.length;
                            e < o;
                            ++e
                          )
                            t[e]();
                          m._completes = [];
                        }
                        var i;
                      }),
                        b.invoke ||
                          ((b.invoke = function (e, n, r) {
                            t.WeixinJSBridge &&
                              WeixinJSBridge.invoke(e, E(n), r);
                          }),
                          (b.on = function (e, n) {
                            t.WeixinJSBridge && WeixinJSBridge.on(e, n);
                          }));
                    },
                    ready: function (t) {
                      (0 != v.state || (m._completes.push(t), !s && g.debug)) &&
                        t();
                    },
                    error: function (t) {
                      l < "6.0.2" ||
                        (-1 == v.state ? t(v.data) : (m._fail = t));
                    },
                    checkJsApi: function (t) {
                      S(
                        "checkJsApi",
                        { jsApiList: k(t.jsApiList) },
                        ((t._complete = function (t) {
                          A &&
                            (n = t.checkResult) &&
                            (t.checkResult = JSON.parse(n));
                          var e,
                            n = t,
                            o = n.checkResult;
                          for (e in o) {
                            var i = r[e];
                            i && ((o[i] = o[e]), delete o[e]);
                          }
                        }),
                        t)
                      );
                    },
                    onMenuShareTimeline: function (t) {
                      x(
                        n.onMenuShareTimeline,
                        {
                          complete: function () {
                            S(
                              "shareTimeline",
                              {
                                title: t.title || i,
                                desc: t.title || i,
                                img_url: t.imgUrl || "",
                                link: t.link || location.href,
                                type: t.type || "link",
                                data_url: t.dataUrl || "",
                              },
                              t
                            );
                          },
                        },
                        t
                      );
                    },
                    onMenuShareAppMessage: function (t) {
                      x(
                        n.onMenuShareAppMessage,
                        {
                          complete: function (e) {
                            "favorite" === e.scene
                              ? S("sendAppMessage", {
                                  title: t.title || i,
                                  desc: t.desc || "",
                                  link: t.link || location.href,
                                  img_url: t.imgUrl || "",
                                  type: t.type || "link",
                                  data_url: t.dataUrl || "",
                                })
                              : S(
                                  "sendAppMessage",
                                  {
                                    title: t.title || i,
                                    desc: t.desc || "",
                                    link: t.link || location.href,
                                    img_url: t.imgUrl || "",
                                    type: t.type || "link",
                                    data_url: t.dataUrl || "",
                                  },
                                  t
                                );
                          },
                        },
                        t
                      );
                    },
                    onMenuShareQQ: function (t) {
                      x(
                        n.onMenuShareQQ,
                        {
                          complete: function () {
                            S(
                              "shareQQ",
                              {
                                title: t.title || i,
                                desc: t.desc || "",
                                img_url: t.imgUrl || "",
                                link: t.link || location.href,
                              },
                              t
                            );
                          },
                        },
                        t
                      );
                    },
                    onMenuShareWeibo: function (t) {
                      x(
                        n.onMenuShareWeibo,
                        {
                          complete: function () {
                            S(
                              "shareWeiboApp",
                              {
                                title: t.title || i,
                                desc: t.desc || "",
                                img_url: t.imgUrl || "",
                                link: t.link || location.href,
                              },
                              t
                            );
                          },
                        },
                        t
                      );
                    },
                    onMenuShareQZone: function (t) {
                      x(
                        n.onMenuShareQZone,
                        {
                          complete: function () {
                            S(
                              "shareQZone",
                              {
                                title: t.title || i,
                                desc: t.desc || "",
                                img_url: t.imgUrl || "",
                                link: t.link || location.href,
                              },
                              t
                            );
                          },
                        },
                        t
                      );
                    },
                    updateTimelineShareData: function (t) {
                      S(
                        "updateTimelineShareData",
                        { title: t.title, link: t.link, imgUrl: t.imgUrl },
                        t
                      );
                    },
                    updateAppMessageShareData: function (t) {
                      S(
                        "updateAppMessageShareData",
                        {
                          title: t.title,
                          desc: t.desc,
                          link: t.link,
                          imgUrl: t.imgUrl,
                        },
                        t
                      );
                    },
                    startRecord: function (t) {
                      S("startRecord", {}, t);
                    },
                    stopRecord: function (t) {
                      S("stopRecord", {}, t);
                    },
                    onVoiceRecordEnd: function (t) {
                      x("onVoiceRecordEnd", t);
                    },
                    playVoice: function (t) {
                      S("playVoice", { localId: t.localId }, t);
                    },
                    pauseVoice: function (t) {
                      S("pauseVoice", { localId: t.localId }, t);
                    },
                    stopVoice: function (t) {
                      S("stopVoice", { localId: t.localId }, t);
                    },
                    onVoicePlayEnd: function (t) {
                      x("onVoicePlayEnd", t);
                    },
                    uploadVoice: function (t) {
                      S(
                        "uploadVoice",
                        {
                          localId: t.localId,
                          isShowProgressTips: 0 == t.isShowProgressTips ? 0 : 1,
                        },
                        t
                      );
                    },
                    downloadVoice: function (t) {
                      S(
                        "downloadVoice",
                        {
                          serverId: t.serverId,
                          isShowProgressTips: 0 == t.isShowProgressTips ? 0 : 1,
                        },
                        t
                      );
                    },
                    translateVoice: function (t) {
                      S(
                        "translateVoice",
                        {
                          localId: t.localId,
                          isShowProgressTips: 0 == t.isShowProgressTips ? 0 : 1,
                        },
                        t
                      );
                    },
                    chooseImage: function (t) {
                      S(
                        "chooseImage",
                        {
                          scene: "1|2",
                          count: t.count || 9,
                          sizeType: t.sizeType || ["original", "compressed"],
                          sourceType: t.sourceType || ["album", "camera"],
                        },
                        ((t._complete = function (t) {
                          if (A) {
                            var e = t.localIds;
                            try {
                              e && (t.localIds = JSON.parse(e));
                            } catch (t) {}
                          }
                        }),
                        t)
                      );
                    },
                    getLocation: function (t) {
                      (t = t || {}),
                        S(
                          n.getLocation,
                          { type: t.type || "wgs84" },
                          ((t._complete = function (t) {
                            delete t.type;
                          }),
                          t)
                        );
                    },
                    previewImage: function (t) {
                      S(
                        n.previewImage,
                        { current: t.current, urls: t.urls },
                        t
                      );
                    },
                    uploadImage: function (t) {
                      S(
                        "uploadImage",
                        {
                          localId: t.localId,
                          isShowProgressTips: 0 == t.isShowProgressTips ? 0 : 1,
                        },
                        t
                      );
                    },
                    downloadImage: function (t) {
                      S(
                        "downloadImage",
                        {
                          serverId: t.serverId,
                          isShowProgressTips: 0 == t.isShowProgressTips ? 0 : 1,
                        },
                        t
                      );
                    },
                    getLocalImgData: function (t) {
                      !1 === y
                        ? ((y = !0),
                          S(
                            "getLocalImgData",
                            { localId: t.localId },
                            ((t._complete = function (t) {
                              var e;
                              (y = !1),
                                0 < w.length &&
                                  ((e = w.shift()), wx.getLocalImgData(e));
                            }),
                            t)
                          ))
                        : w.push(t);
                    },
                    getNetworkType: function (t) {
                      S(
                        "getNetworkType",
                        {},
                        ((t._complete = function (t) {
                          var e = t,
                            n =
                              ((t = e.errMsg),
                              (e.errMsg = "getNetworkType:ok"),
                              e.subtype);
                          if ((delete e.subtype, n)) e.networkType = n;
                          else {
                            n = t.indexOf(":");
                            var r = t.substring(n + 1);
                            switch (r) {
                              case "wifi":
                              case "edge":
                              case "wwan":
                                e.networkType = r;
                                break;
                              default:
                                e.errMsg = "getNetworkType:fail";
                            }
                          }
                        }),
                        t)
                      );
                    },
                    openLocation: function (t) {
                      S(
                        "openLocation",
                        {
                          latitude: t.latitude,
                          longitude: t.longitude,
                          name: t.name || "",
                          address: t.address || "",
                          scale: t.scale || 28,
                          infoUrl: t.infoUrl || "",
                        },
                        t
                      );
                    },
                    hideOptionMenu: function (t) {
                      S("hideOptionMenu", {}, t);
                    },
                    showOptionMenu: function (t) {
                      S("showOptionMenu", {}, t);
                    },
                    closeWindow: function (t) {
                      S("closeWindow", {}, (t = t || {}));
                    },
                    hideMenuItems: function (t) {
                      S("hideMenuItems", { menuList: t.menuList }, t);
                    },
                    showMenuItems: function (t) {
                      S("showMenuItems", { menuList: t.menuList }, t);
                    },
                    hideAllNonBaseMenuItem: function (t) {
                      S("hideAllNonBaseMenuItem", {}, t);
                    },
                    showAllNonBaseMenuItem: function (t) {
                      S("showAllNonBaseMenuItem", {}, t);
                    },
                    scanQRCode: function (t) {
                      S(
                        "scanQRCode",
                        {
                          needResult: (t = t || {}).needResult || 0,
                          scanType: t.scanType || ["qrCode", "barCode"],
                        },
                        ((t._complete = function (t) {
                          var e;
                          f &&
                            (e = t.resultStr) &&
                            ((e = JSON.parse(e)),
                            (t.resultStr =
                              e && e.scan_code && e.scan_code.scan_result));
                        }),
                        t)
                      );
                    },
                    openAddress: function (t) {
                      S(
                        n.openAddress,
                        {},
                        ((t._complete = function (t) {
                          (t.postalCode = t.addressPostalCode),
                            delete t.addressPostalCode,
                            (t.provinceName = t.proviceFirstStageName),
                            delete t.proviceFirstStageName,
                            (t.cityName = t.addressCitySecondStageName),
                            delete t.addressCitySecondStageName,
                            (t.countryName = t.addressCountiesThirdStageName),
                            delete t.addressCountiesThirdStageName,
                            (t.detailInfo = t.addressDetailInfo),
                            delete t.addressDetailInfo;
                        }),
                        t)
                      );
                    },
                    openProductSpecificView: function (t) {
                      S(
                        n.openProductSpecificView,
                        {
                          pid: t.productId,
                          view_type: t.viewType || 0,
                          ext_info: t.extInfo,
                        },
                        t
                      );
                    },
                    addCard: function (t) {
                      for (
                        var e = t.cardList, r = [], o = 0, i = e.length;
                        o < i;
                        ++o
                      ) {
                        var a = {
                          card_id: (a = e[o]).cardId,
                          card_ext: a.cardExt,
                        };
                        r.push(a);
                      }
                      S(
                        n.addCard,
                        { card_list: r },
                        ((t._complete = function (t) {
                          if ((e = t.card_list)) {
                            for (
                              var e, n = 0, r = (e = JSON.parse(e)).length;
                              n < r;
                              ++n
                            ) {
                              var o = e[n];
                              (o.cardId = o.card_id),
                                (o.cardExt = o.card_ext),
                                (o.isSuccess = !!o.is_succ),
                                delete o.card_id,
                                delete o.card_ext,
                                delete o.is_succ;
                            }
                            (t.cardList = e), delete t.card_list;
                          }
                        }),
                        t)
                      );
                    },
                    chooseCard: function (t) {
                      S(
                        "chooseCard",
                        {
                          app_id: g.appId,
                          location_id: t.shopId || "",
                          sign_type: t.signType || "SHA1",
                          card_id: t.cardId || "",
                          card_type: t.cardType || "",
                          card_sign: t.cardSign,
                          time_stamp: t.timestamp + "",
                          nonce_str: t.nonceStr,
                        },
                        ((t._complete = function (t) {
                          (t.cardList = t.choose_card_info),
                            delete t.choose_card_info;
                        }),
                        t)
                      );
                    },
                    openCard: function (t) {
                      for (
                        var e = t.cardList, r = [], o = 0, i = e.length;
                        o < i;
                        ++o
                      ) {
                        var a = { card_id: (a = e[o]).cardId, code: a.code };
                        r.push(a);
                      }
                      S(n.openCard, { card_list: r }, t);
                    },
                    consumeAndShareCard: function (t) {
                      S(
                        n.consumeAndShareCard,
                        { consumedCardId: t.cardId, consumedCode: t.code },
                        t
                      );
                    },
                    chooseWXPay: function (t) {
                      S(n.chooseWXPay, _(t), t),
                        D({ jsApiName: "chooseWXPay" });
                    },
                    openEnterpriseRedPacket: function (t) {
                      S(n.openEnterpriseRedPacket, _(t), t);
                    },
                    startSearchBeacons: function (t) {
                      S(n.startSearchBeacons, { ticket: t.ticket }, t);
                    },
                    stopSearchBeacons: function (t) {
                      S(n.stopSearchBeacons, {}, t);
                    },
                    onSearchBeacons: function (t) {
                      x(n.onSearchBeacons, t);
                    },
                    openEnterpriseChat: function (t) {
                      S(
                        "openEnterpriseChat",
                        { useridlist: t.userIds, chatname: t.groupName },
                        t
                      );
                    },
                    launchMiniProgram: function (t) {
                      S(
                        "launchMiniProgram",
                        {
                          targetAppId: t.targetAppId,
                          path: (function (t) {
                            var e;
                            if ("string" == typeof t && 0 < t.length)
                              return (
                                (e = t.split("?")[0]),
                                (e += ".html"),
                                void 0 !== (t = t.split("?")[1])
                                  ? e + "?" + t
                                  : e
                              );
                          })(t.path),
                          envVersion: t.envVersion,
                        },
                        t
                      );
                    },
                    openBusinessView: function (t) {
                      S(
                        "openBusinessView",
                        {
                          businessType: t.businessType,
                          queryString: t.queryString || "",
                          envVersion: t.envVersion,
                        },
                        ((t._complete = function (t) {
                          if (A) {
                            var e = t.extraData;
                            if (e)
                              try {
                                t.extraData = JSON.parse(e);
                              } catch (e) {
                                t.extraData = {};
                              }
                          }
                        }),
                        t)
                      );
                    },
                    miniProgram: {
                      navigateBack: function (t) {
                        (t = t || {}),
                          P(function () {
                            S(
                              "invokeMiniProgramAPI",
                              {
                                name: "navigateBack",
                                arg: { delta: t.delta || 1 },
                              },
                              t
                            );
                          });
                      },
                      navigateTo: function (t) {
                        P(function () {
                          S(
                            "invokeMiniProgramAPI",
                            { name: "navigateTo", arg: { url: t.url } },
                            t
                          );
                        });
                      },
                      redirectTo: function (t) {
                        P(function () {
                          S(
                            "invokeMiniProgramAPI",
                            { name: "redirectTo", arg: { url: t.url } },
                            t
                          );
                        });
                      },
                      switchTab: function (t) {
                        P(function () {
                          S(
                            "invokeMiniProgramAPI",
                            { name: "switchTab", arg: { url: t.url } },
                            t
                          );
                        });
                      },
                      reLaunch: function (t) {
                        P(function () {
                          S(
                            "invokeMiniProgramAPI",
                            { name: "reLaunch", arg: { url: t.url } },
                            t
                          );
                        });
                      },
                      postMessage: function (t) {
                        P(function () {
                          S(
                            "invokeMiniProgramAPI",
                            { name: "postMessage", arg: t.data || {} },
                            t
                          );
                        });
                      },
                      getEnv: function (e) {
                        P(function () {
                          e({
                            miniprogram: "miniprogram" === t.__wxjs_environment,
                          });
                        });
                      },
                    },
                  }),
                  (C = 1),
                  (I = {}),
                  o.addEventListener(
                    "error",
                    function (t) {
                      var e, n, r;
                      A ||
                        ((r = (e = t.target).tagName),
                        (n = e.src),
                        "IMG" != r &&
                          "VIDEO" != r &&
                          "AUDIO" != r &&
                          "SOURCE" != r) ||
                        (-1 != n.indexOf("wxlocalresource://") &&
                          (t.preventDefault(),
                          t.stopPropagation(),
                          (r = e["wx-id"]) || ((r = C++), (e["wx-id"] = r)),
                          I[r] ||
                            ((I[r] = !0),
                            wx.ready(function () {
                              wx.getLocalImgData({
                                localId: n,
                                success: function (t) {
                                  e.src = t.localData;
                                },
                              });
                            }))));
                    },
                    !0
                  ),
                  o.addEventListener(
                    "load",
                    function (t) {
                      var e;
                      A ||
                        ((e = (t = t.target).tagName),
                        t.src,
                        "IMG" != e &&
                          "VIDEO" != e &&
                          "AUDIO" != e &&
                          "SOURCE" != e) ||
                        ((e = t["wx-id"]) && (I[e] = !1));
                    },
                    !0
                  ),
                  e && (t.wx = t.jWeixin = b),
                  b);
            function S(e, n, r) {
              t.WeixinJSBridge
                ? WeixinJSBridge.invoke(e, E(n), function (t) {
                    B(e, t, r);
                  })
                : T(e, r);
            }
            function x(e, n, r) {
              t.WeixinJSBridge
                ? WeixinJSBridge.on(e, function (t) {
                    r && r.trigger && r.trigger(t), B(e, t, n);
                  })
                : T(e, r || n);
            }
            function E(t) {
              return (
                ((t = t || {}).appId = g.appId),
                (t.verifyAppId = g.appId),
                (t.verifySignType = "sha1"),
                (t.verifyTimestamp = g.timestamp + ""),
                (t.verifyNonceStr = g.nonceStr),
                (t.verifySignature = g.signature),
                t
              );
            }
            function _(t) {
              return {
                timeStamp: t.timestamp + "",
                nonceStr: t.nonceStr,
                package: t.package,
                paySign: t.paySign,
                signType: t.signType || "SHA1",
              };
            }
            function B(t, e, n) {
              ("openEnterpriseChat" != t && "openBusinessView" !== t) ||
                (e.errCode = e.err_code),
                delete e.err_code,
                delete e.err_desc,
                delete e.err_detail;
              var o = e.errMsg;
              switch (
                (o ||
                  ((o = e.err_msg),
                  delete e.err_msg,
                  (o = (function (t, e) {
                    var n,
                      o = r[t];
                    return (
                      o && (t = o),
                      (o = "ok"),
                      e &&
                        ((n = e.indexOf(":")),
                        ("access denied" !=
                          (o = (o = (o =
                            -1 !=
                            (o =
                              -1 !=
                              (o =
                                "failed" ==
                                (o =
                                  "confirm" == (o = e.substring(n + 1))
                                    ? "ok"
                                    : o)
                                  ? "fail"
                                  : o).indexOf("failed_")
                                ? o.substring(7)
                                : o).indexOf("fail_")
                              ? o.substring(5)
                              : o).replace(/_/g, " ")).toLowerCase()) &&
                          "no permission to execute" != o) ||
                          (o = "permission denied"),
                        "" ==
                          (o =
                            "config" == t && "function not exist" == o
                              ? "ok"
                              : o)) &&
                        (o = "fail"),
                      t + ":" + o
                    );
                  })(t, o)),
                  (e.errMsg = o)),
                (n = n || {})._complete && (n._complete(e), delete n._complete),
                (o = e.errMsg || ""),
                g.debug && !n.isInnerInvoke && alert(JSON.stringify(e)),
                (t = o.indexOf(":")),
                o.substring(t + 1))
              ) {
                case "ok":
                  n.success && n.success(e);
                  break;
                case "cancel":
                  n.cancel && n.cancel(e);
                  break;
                default:
                  n.fail && n.fail(e);
              }
              n.complete && n.complete(e);
            }
            function k(t) {
              if (t) {
                for (var e = 0, r = t.length; e < r; ++e) {
                  var o = t[e];
                  (o = n[o]) && (t[e] = o);
                }
                return t;
              }
            }
            function T(t, e) {
              var n;
              !g.debug ||
                (e && e.isInnerInvoke) ||
                ((n = r[t]) && (t = n), e && e._complete && delete e._complete);
            }
            function D(t) {
              var e;
              c ||
                u ||
                g.debug ||
                l < "6.0.2" ||
                p.systemType < 0 ||
                ((e = new Image()),
                (p.appId = g.appId),
                (p.initTime = d.initEndTime - d.initStartTime),
                (p.preVerifyTime = d.preVerifyEndTime - d.preVerifyStartTime),
                b.getNetworkType({
                  isInnerInvoke: !0,
                  success: function (n) {
                    (p.networkType = n.networkType),
                      (n =
                        "https://open.weixin.qq.com/sdk/report?v=" +
                        p.version +
                        "&o=" +
                        p.isPreVerifyOk +
                        "&s=" +
                        p.systemType +
                        "&c=" +
                        p.clientVersion +
                        "&a=" +
                        p.appId +
                        "&n=" +
                        p.networkType +
                        "&i=" +
                        p.initTime +
                        "&p=" +
                        p.preVerifyTime +
                        "&u=" +
                        p.url +
                        "&jsapi_name=" +
                        (t ? t.jsApiName : "")),
                      (e.src = n);
                  },
                }));
            }
            function O() {
              return new Date().getTime();
            }
            function P(e) {
              s &&
                (t.WeixinJSBridge
                  ? e()
                  : o.addEventListener &&
                    o.addEventListener("WeixinJSBridgeReady", e, !1));
            }
          })(e));
      },
      79947: function (t) {
        "use strict";
        t.exports =
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALQAAADwBAMAAABbKlN7AAAAHlBMVEX19fXg4ODz8/Pk5OTp6eni4uLr6+vw8PDt7e3m5ubyvoEoAAABJElEQVR42u3YvUoDQRSG4Y9VMJYncQN2I4q2buHWRgjWC2nsNIX1Il6AuQStcrlWYYqQbeYcyM/7XMDLYYcZ2CMAAAAAAAAAAAAAwMG7b2yHyVJFqlzebieVuLUBjyrxYQOmKtHYgIlK2CDS9vYblK5fVXUh6UUvaeWdzhf7xj/dJkkBU+e3qGqc09PNS3QxN990vSl/d+acHueRvdPPeWTvdC/pYR5y0ZN0ZxaVnsWljTRp0qRJn3S6VxWV/tNlVLr+bA76r4A0adKk3dL1vi6IVnFrrTMbMA5bIdqPioyebJcrZc7f/F0uRrblRT4qy/IeKnNdnSkm3SbFpK+XUkx6nRSTXnzJWz6+mHTbK8AsH5+3826dBAAAAAAAAAAAAAA4Nv9+DIw2Y0Sz/QAAAABJRU5ErkJggg==";
      },
      84785: function (t, e, n) {
        "use strict";
        t.exports = n.p + "img/freshGuide2.3889f57ef07cf0b7d3ef.png";
      },
      52882: function (t) {
        "use strict";
        t.exports =
          "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMjBweCIgaGVpZ2h0PSIyNHB4IiB2aWV3Qm94PSIwIDAgMjAgMjQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+aWNvX2RlbGV0ZeWkh+S7vSA2QDR4PC90aXRsZT4KICAgIDxnIGlkPSLpobXpnaItMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IuaDs+azlS3liJLnur8iIHRyYW5zZm9ybT0idHJhbnNsYXRlKC02ODAuMDAwMDAwLCAtNTg4LjAwMDAwMCkiPgogICAgICAgICAgICA8ZyBpZD0i57yW57uELTIiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDY1Ni4wMDAwMDAsIDU3Mi4wMDAwMDApIj4KICAgICAgICAgICAgICAgIDxnIGlkPSJpY29fZGVsZXRl5aSH5Lu9LTYiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDI0LjAwMDAwMCwgMTYuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICAgICAgPHJlY3QgaWQ9IuefqeW9ouWkh+S7vS03IiB4PSIwIiB5PSIwIiB3aWR0aD0iMjAiIGhlaWdodD0iMjQiPjwvcmVjdD4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNNi44MDA0NzczNCw4Ljc2MTYzNTcxIEw3Ljk5NjQ3NzM0LDkuNzY1NjM1NzEgTDcuNDI2NDc3MzQsMTEuMDYzNjM1NyBMOS41NDM0NzczNCwxMS4wNjM2MzU3IEwxMS4zMzE0NzczLDEyLjU2MzYzNTcgTDYuODI2MDAxNjIsMTIuNTY0Mzc0NyBMNi43Njg0NzczNCwxMi41NTk2MzU3IEw0LjUzMDI5NTY1LDE3LjY1NzMwMjkgQzQuMzc3NTQyMzIsMTguMDA0OTE2NiAzLjk5Mjk4NzU0LDE4LjE3ODY4NjIgMy42Mzc4NjM3OCwxOC4wNzY4Nzg2IEwzLjU0MTkzNzgxLDE4LjA0MjIwMzkgQzMuMTk0MzI0MSwxNy44ODk0NTA2IDMuMDIwNTU0NTQsMTcuNTA0ODk1OCAzLjEyMjM2MjE2LDE3LjE0OTc3MjEgTDMuMTU3MDM2OCwxNy4wNTM4NDYxIEw2LjgwMDQ3NzM0LDguNzYxNjM1NzEgWiBNMTMuNTE5NDc3MywxNC4zOTk2MzU3IEwxNi4xMTQ0NzczLDE2LjU3NzYzNTcgTDE2LjMyMzc3NTMsMTcuMDUzODQ2MSBDMTYuNDkwNDE1MywxNy40MzMwNjEgMTYuMzE4MDg5MiwxNy44NzU1NjM5IDE1LjkzODg3NDMsMTguMDQyMjAzOSBDMTUuNTkxMjYwNiwxOC4xOTQ5NTcyIDE1LjE5MDQ2NzQsMTguMDYyODg0OSAxNC45OTc3MjczLDE3Ljc0NzcyIEwxNC45NTA1MTY0LDE3LjY1NzMwMjkgTDEzLjUxOTQ3NzMsMTQuMzk5NjM1NyBaIE0xMC4zNzQ4NDgyLDMuNTM1NjM2MDkgTDEwLjQyNzAzNTUsMy42MzQ5MDczIEwxMi40Nzk0NzczLDguMzA1NjM1NzEgTDkuODg0NDc3MzQsNi4xMjk2MzU3MSBMOS43NDA0MDUxMSw1Ljc5OTM4MTA2IEw5LjY3MjQ3NzM0LDUuOTUwNjM1NzEgTDguNDc2NDc3MzQsNC45NDc2MzU3MSBMOS4wNTM3NzY2MiwzLjYzNDkwNzMgQzkuMzAwOTc0NTQsMy4wNzIzNzA0MSAxMC4wNjY2NTI2LDMuMDM5MjggMTAuMzc0ODQ4MiwzLjUzNTYzNjA5IFoiIGlkPSLlvaLnirYiIGZpbGw9IiNGQ0ZDRkMiIGZpbGwtcnVsZT0ibm9uemVybyI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgIDxyZWN0IGlkPSLnn6nlvaLlpIfku70tNiIgZmlsbD0iI0ZDRkNGQyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTEuNTExNzc0LCAxMC4xOTUzODEpIHJvdGF0ZSgtNTAuMDAwMDAwKSB0cmFuc2xhdGUoLTExLjUxMTc3NCwgLTEwLjE5NTM4MSkgIiB4PSIxMS4wMTE3NzM4IiB5PSIxLjE5NTM4MTA2IiB3aWR0aD0iMSIgaGVpZ2h0PSIxOCI+PC9yZWN0PgogICAgICAgICAgICAgICAgICAgIDxsaW5lIHgxPSIyIiB5MT0iMjEuMDE0NzkwOSIgeDI9IjE4IiB5Mj0iMjEuMDE0NzkwOSIgaWQ9IuebtOe6vy005aSH5Lu9LTQiIHN0cm9rZT0iI0ZDRkNGQyIgc3Ryb2tlLXdpZHRoPSIxLjUiPjwvbGluZT4KICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+";
      },
      62030: function (t) {
        "use strict";
        t.exports =
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAyCAMAAAAtFKi+AAAAV1BMVEUAAADo6u3o6u3o6u3o6uzp6+7n6e3o6u3q6/Do6u3o6u7o6u3p6+7o6u3o6u3o6+7o6u3q6+7o6u3n6u3p6u7q6+/o6u3o6u3o6u3p6u3n6+/o6u3n6u2RmPjfAAAAG3RSTlMA/foDAmsGXxzzjsJ0699nySZc7lIh0bexYwzjdSQIAAABxElEQVRIx3yRCXKDMAxFVWMoZl+TNNL9z9lvYyM8DdVkMdZ7kkZQHrYIf0X1flfxaHPiL74vzesx9P3weDXL/q8CvC5bwywi8ce0ZY3E5/LAmxWcMeYrBA6Q1gaK/VTedo7Fs4wPwh9gCbvOahPl5yngAu4MPAZlmpOh82wOOCutDkNxG5CMH1Gelc8NRpPxahSe12E0dDBvFMpvyt8bWzIszQ4XAv7WEABuTlPZiY3Wv+theLJxoI4NK39nAOoAo0vtBKtLs4avjq6vkTFUTRZOA/dAAIh4THU8pySwxreo11DHB/i+jQuLq2mHyLPvvdZEVLJJM4Cf6ecwDr6kepDTMFxCaH0iCRMuvr2ReIt8FPx1S7RfNopDR9VhHHyFhpe0mJ0WnYjZQ9HQI0460xJ2pPwFU/6sF/b0lEuD01hUzPNPGtJFboxd4vP0QL12VMO/nyLn097JsHBuhF0VBY3xQQOo+a20jlEAAGEgCDaKrX38/zstRSGYeYCg8bJ7fICvxI9OxjrSsfLHcTTe8PVf+DTevkDXikZhRS8IrAIEGDMKMkHlms1h7Lh3obiyjhQjl2IcKZJ2XexeHbyceP3hgrUBfiqGQniHANgAAAAASUVORK5CYII=";
      },
      94323: function (t) {
        "use strict";
        t.exports =
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAwCAYAAABnjuimAAAARGVYSWZNTQAqAAAACAABh2kABAAAAAEAAAAaAAAAAAADoAEAAwAAAAEAAQAAoAIABAAAAAEAAABUoAMABAAAAAEAAABgAAAAAOPJ0wYAAAOCSURBVHic7ZjNahRBFIW/mr+EmGgSDIggGly4CCIK4gMIvoIobn0BF67diAuD4EJciA+QTdwKvoCii+QlBBdq1CSTn0mOi6lO36mp/plORzdzNunMvXXr9LlVt241jDHGGLXAVRkkyQE3gTtAq+SwfeAD8Nk5pyrzjgxJE5LWNDrWJE1UmbOsGiEcMGf+Pyjwb/q/c1TMYlWiFhvAI2Avw94BXgCzx5kkSlRSo2CctXeBFWAnw3cSeEpKtFEU3zl3mEvUr5+HwDXyU9QE5v3zGeAV2elveh/8mDxfT0PrwBvn3G6Wx31JexU2Sd3Yk3TPcouloNJirxmOgEe4RleBBfqp/59Y91yOMKSe+sV86I3+IQRo5ENB0pykW5KmM+xOUjNmS+w5tikfez7LpyzJaUkfJe1Kei+pE9hbkh5LeivpcmT8JUnLkh6ELyOpLWnVx/6UJURZokuSdvxO3JZ0IbBf9b9L0kuZ+iipIem1t/2WdDEYuyBpy9t3JC3lcSkq7Pa0aTB8ukySHo9nGVzXDeCcf+4AM8HY02ZsONfIRP/QX9x4EuFk++Z5IiDqPMGYLz5W4i8/V2Wim0BynDkgXEd7pC/SjoxPfhPDilmih36uykQPgG1DNE/RNsMlLU/RaeO/RUEHVkTUpqTBsKL7pIp2ApujvKKbJs6xicYUtZOPqqglavdCZaLJ2omt0VEUzUt9rYoCzAQnTahoiIT8AemmPIrFCSkaBgfoGQJh6q2itjokx6rNTu2K2nThSfb8c5h6DNEw7eF6r0XRgdQzvGESEjFFO8ZHgc0qeuKpt0TzFA1LU72K+p4wL/W2PsbKk019nqKbRf1nkaIwuNBHUbRBeoPIUzTMWmWiNi2jKNoy8WOKWqK5DUkVonmKNoN4VuGYoknqayNqO6gpBntIq6hj8LJoFc4rT4WdU1miVtEmcCog+tM/dxnsgHqkNXaDwZOpTb/pTmIUKlrm25PdTIkS3wCcc/uSnnmC7+i3awm+A0+A28Bz51zP2GZIRSq1mQohaVFS199tdiVdj/i0Y7dNf28a6gEkXTF3sa6kxSIeZRQNryOzscmBlhQvhRF/+/mxttRvk661FrAM/CgxLg+zZu4e6S0iE2WIJrsyKU03KpLLgq0qmSiz63vAFwrO4oqQj90rciz1fUnSeeAu6XfOuvALWHHOfa057hhjjJGFvwGAfWRHJU3iAAAAAElFTkSuQmCC";
      },
      71413: function (t) {
        "use strict";
        t.exports =
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAtCAMAAAANxBKoAAAAeFBMVEUAAADX3OPY3eTX3OPX3OPX3OPX3OPX3OPX3OPX3OPX3OPX3OPX3OPX3OPX3OPY3OTX3OPX3OPX3OPX3OPY3eTY3eTX3OPX3OPX3OPX3OPX3OPX3OPX3OPX3OPY3eTX3OPX3OPX3OPX3OPX3OPX3OPW2+LY3eTX3ONVUqK/AAAAJ3RSTlMA/gP7+SbynoFF5eAF1X8fxm4yiQ8LyVBJ7by4kGQwd9w+PVpUNxg+9V7jAAACmUlEQVRIx52V62KjIBCFGQeRGNNNjOZ+adPd5f3fcM9MMKDmT3faKCGfx+HAgMmiKPBpN9W6duzqdbVpC+18G+gu/YoCxUBr5Uvpf89WFqhlVpbZ4gFbCT+HCw/WMgj8h6B3tuA9fpvC5Q6y+n6NyLO8aFcKnsMLN7CJDuzAo98tQGTwHkmIWBby6O/vGjemsAeTlKExhYW+me6Cn4CL+pCzy2AaPLS0ErP3TnBXvvBdngYlvw9G7LgdBd8VUdqPc9a2TM1B5Rpzc/IibwrNY2bc/XFYLNrB5kY8AF/qm6pgJ8qPYUDDfRsshwoNSI9t1nybYrSa+k9iiKPlJ9KIwa5k8TWwDR6tFXEUp6BNhnaikzgMNS3FiFbjymXCssyJWrORm2oCtkd3dPXVzOmHLI2NqUAelzqXHLam67vGvIm+huWVWYM+/1Kc6SMqvYkzfl6bGtfKKC6j7pumKYbIUtEcauNw3RrFme4zyTRMcM4wrt40gttwuvuPV/hNl9EeHEftonjiKcTLdTPV1rzx7YnzKyxbG77Qneetnpy0A/ioKNDKlsBJPangY93PcMSI7tRvnUt5Y8LDjMb16zmXLeGGYUb1T5pqp0FS+1yDy97EMjkEpvFCf078Utegrm8O10F8MdL+o526vq2ub9ROEgcNKLlS3f31L3q7ZawdqUvmcIkZlkyZOv7C8duYC7HW5VDz2Lua6KtNtWER2LEOQ83rEhDA3YDLszUldWlgdHXcT4a9ilES8EdNrJYMKA1VC4V2+T4I3O11/PDxNJ4jprgPJieAh0uHL3D4DL0xrvOU798sRuqSTnQcq+7fs7MBGvVl0UkNvliKZ8P83GFmMXgND15sfu7MzzTLJDE50350Xv7fWfyzc/4fPFZNYQJpzdMAAAAASUVORK5CYII=";
      },
      36802: function (t) {
        "use strict";
        t.exports =
          "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMjBweCIgaGVpZ2h0PSIyNHB4IiB2aWV3Qm94PSIwIDAgMjAgMjQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+aWNvX25vdGVANHg8L3RpdGxlPgogICAgPGcgaWQ9Iumhtemdoi0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0i5oOz5rOVLeWIkue6vyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTc0MC4wMDAwMDAsIC0zODYuMDAwMDAwKSI+CiAgICAgICAgICAgIDxnIGlkPSLnvJbnu4QtNCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNjU2LjAwMDAwMCwgMzc4LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPGcgaWQ9Imljb19ub3RlIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg4NC4wMDAwMDAsIDguMDAwMDAwKSI+CiAgICAgICAgICAgICAgICAgICAgPHJlY3QgaWQ9IuefqeW9oiIgeD0iMCIgeT0iMCIgd2lkdGg9IjIwIiBoZWlnaHQ9IjI0Ij48L3JlY3Q+CiAgICAgICAgICAgICAgICAgICAgPGxpbmUgeDE9IjkuNTAyODA3NjIiIHkxPSIyMC40ODE0NDUzIiB4Mj0iMTguMTY0Mzg4NSIgeTI9IjIwLjQ4MTQ0NTMiIGlkPSLnm7Tnur8tNOWkh+S7vS00IiBzdHJva2U9IiNGQ0ZDRkMiIHN0cm9rZS13aWR0aD0iMS41Ij48L2xpbmU+CiAgICAgICAgICAgICAgICAgICAgPGxpbmUgeDE9IjE0Ljg1MTE4NjYiIHkxPSIxNi45ODE0NDUzIiB4Mj0iMTguMjI0NzgyOCIgeTI9IjE2Ljk4MTQ0NTMiIGlkPSLnm7Tnur8tNOWkh+S7vS01IiBzdHJva2U9IiNGQ0ZDRkMiIHN0cm9rZS13aWR0aD0iMS41Ij48L2xpbmU+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTE3LjE2NDM4ODUsMy41NjUyNjc0MyBMMTcuODcxNDk1Myw0LjI3MjM3NDIxIEMxOC4yNjIwMTk2LDQuNjYyODk4NSAxOC4yNjIwMTk2LDUuMjk2MDYzNDggMTcuODcxNDk1Myw1LjY4NjU4Nzc3IEw0Ljg4MDU5NTQ4LDE4LjY3NzQ4NzYgTDIuMDMxNzE4MTQsMTkuNDA1MDQ0NiBMMi43NTkyNzUxMywxNi41NTYxNjczIEwxNS43NTAxNzUsMy41NjUyNjc0MyBDMTYuMTQwNjk5MywzLjE3NDc0MzE0IDE2Ljc3Mzg2NDIsMy4xNzQ3NDMxNCAxNy4xNjQzODg1LDMuNTY1MjY3NDMgWiBNMTQuOTU4NzczOSwzLjEzODU2NjUzIEMxNS4xMzM1Mzc0LDMuMzEzMzI5OTYgMTUuMTMzNTM3NCwzLjU5NjY3NzQ3IDE0Ljk1ODc3MzksMy43NzE0NDA5MSBMOS43Nzc1NjgwNCw4Ljk1MjY0NjgxIEM5LjYwMjgwNDYxLDkuMTI3NDEwMjQgOS4zMTk0NTcxLDkuMTI3NDEwMjQgOS4xNDQ2OTM2Niw4Ljk1MjY0NjgxIEM4Ljk2OTkzMDIzLDguNzc3ODgzMzggOC45Njk5MzAyMyw4LjQ5NDUzNTg2IDkuMTQ0NjkzNjYsOC4zMTk3NzI0MyBMMTQuMzI1ODk5NiwzLjEzODU2NjUzIEMxNC41MDA2NjMsMi45NjM4MDMwOSAxNC43ODQwMTA1LDIuOTYzODAzMDkgMTQuOTU4NzczOSwzLjEzODU2NjUzIFoiIGlkPSLlvaLnirYiIGZpbGw9IiNGQ0ZDRkMiPjwvcGF0aD4KICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+";
      },
      74: function (t) {
        "use strict";
        t.exports =
          "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMjBweCIgaGVpZ2h0PSIyNHB4IiB2aWV3Qm94PSIwIDAgMjAgMjQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+aWNvX3JlZEA0eDwvdGl0bGU+CiAgICA8ZyBpZD0i6aG16Z2iLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSLmg7Pms5Ut5YiS57q/IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNjgwLjAwMDAwMCwgLTM4Ni4wMDAwMDApIj4KICAgICAgICAgICAgPGcgaWQ9Iue8lue7hC00IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg2NTYuMDAwMDAwLCAzNzguMDAwMDAwKSI+CiAgICAgICAgICAgICAgICA8ZyBpZD0iaWNvX3JlZCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjQuMDAwMDAwLCA4LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgIDxyZWN0IGlkPSLnn6nlvaLlpIfku70iIHg9IjAiIHk9IjAiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyNCI+PC9yZWN0PgogICAgICAgICAgICAgICAgICAgIDxnIGlkPSLnvJbnu4QtNjblpIfku70tNCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMy41MDAwMDAsIDIuNTAwMDAwKSIgc3Ryb2tlPSIjRkNGQ0ZDIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMS41Ij4KICAgICAgICAgICAgICAgICAgICAgICAgPGcgaWQ9Iue8lue7hC0zIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLjM2MTExMSwgMC43MDc4NTIpIj4KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwb2x5bGluZSBpZD0i6Lev5b6EIiBwb2ludHM9Ii0yLjgyNDA4MTEzZS0xMyAxMy45NTIzNDE2IDUuODk2NzM5ODIgMC41MzM0MDI4MTYgMTEuNzkzNDc5NiAxMy45NTIzNDE2Ij48L3BvbHlsaW5lPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpbmUgeDE9IjIuOTgyMzM1NCIgeTE9IjguNDExMTQxODIiIHgyPSI4Ljk0NzAwNjE5IiB5Mj0iOC40MTExNDE4MiIgaWQ9IuebtOe6vy0xOSI+PC9saW5lPgogICAgICAgICAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgICAgIDxsaW5lIHgxPSIyIiB5MT0iMjEuMDA1NTc0NSIgeDI9IjE4IiB5Mj0iMjEuMDA1NTc0NSIgaWQ9IuebtOe6vy005aSH5Lu9LTMiIHN0cm9rZT0iI0UyMzMzMyIgc3Ryb2tlLXdpZHRoPSIyIj48L2xpbmU+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==";
      },
      44765: function (t) {
        "use strict";
        t.exports =
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAARGVYSWZNTQAqAAAACAABh2kABAAAAAEAAAAaAAAAAAADoAEAAwAAAAEAAQAAoAIABAAAAAEAAABcoAMABAAAAAEAAABcAAAAAGEIyR8AAAC7SURBVHicpZNNCsJADIXfdLxJHjQ9YGktxYq48wIezUX3vYGLgk4XFkSYn4DZzsuXZPICJRclJwAe9vBKTkouFYA7gE7J1gjxu7bbc+GV7JV8KtkXIEmtBVLU5ATfN5FjrssYJJvsEpAWwMmFcAWA4NwI4PKY5xuAV6r6D6QRGWqRtRZZG5Eh1XZloeXiEKuuZBuAsQrhDHxGUPJtGSH/iQWf2NZY9EB6zwYXFkwShexXZbmDGGTCv+e8AdZxYeRjtonfAAAAAElFTkSuQmCC";
      },
      96311: function (t) {
        "use strict";
        t.exports =
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAqQAAAMrCAYAAACf14AQAAAgAElEQVR4nO3dvXZcZ5bf4b/UHTgjvNQ5qxPKGdGZM5YjOxOcOVN15kycKxAUOmoqcybwCgxmzrp4BQ1cQYOZQyKbicbBixJAEB/1car2+XietbBIiiCwW2um+ev3nH3ON9+/epWJO0pyXD0EADBZy+oBqv2xeoA9W8Xm8c3P5zf//DjJi6KZAAAe8ynJVZLPSS5ufn6VkUfrNyM7IT1Oi875zc9fVg4DANChy7RIXd78eFE6TYeGHqRHSU5uPuZx6gkATMentDg9v/nxc+UwuxhikN6N0B+KZwEA6IsPaXF6noHF6ZCCdJ5kkeTH2jEAAHrtOi1K32Ugl/W/rR7gGUdJ3qbdzPv3iFEAgOe8SGumf6QF6aJ0mjX0NUiPkpymhejfYjkJAGAbr5P8ltZUb9Maq3f6FqR3Q/TnWFICAOjCy7RDvqu0MO2VPgXp6tK8EAUA2I8XuQ3TRekkd/QhSOdp9zf8LUIUAOAQXqZdyl+mB2+srAzSoyRnactKrwvnAACYqjdpy0+nKby/tCpIT9KOim3NAwDU+zntinXJaemhg/Qo7ZlY/ycuzwMA9MnL3J6WHtQhg/Q47T6Fnw74PQEA2MzPac12sEv4hwrSRdp/MPeKAgD035u02ysPcgn/EEF6mrbF5RI9AMBwvEi7hL/Y9zfad5CepR37AgAwTL+l7QDtzR/39HWP4hI9AMBY/JTWd4t9fPF9nJCKUQCA8fkxyXn2sOzUdZCKUQCA8fohe9jA7zJIxSgAwPi9TsdR2lWQilEAgOl4nQ4XnboK0mXEKADAlPyY9kSlnf3hT999t+vXOEvyX3cfBQCAgTlO8k3a4eTWdg3S03gVKADAlM2TfEpyse0X2OWS/Uk89B4AgHY/6davGd02SGfp6J4BAAAG70V2eEbptkF6Hu+mBwDg1stseWC5TZC+i416AAC+9kOSt5v+oU2DdB5LTAAAPO40G95PukmQHsV9owAAPO1FNnxo/iZBepp2bwAAADzlTTa4dP/N969erfN5x0n+se1EAABMznVaQ14994nrnpB29q5SAAAm4UXaFfZnrROki7RjVwAA2MSPaUvxT1onSE93nQQAgMk6fe4TngvS01hkAgBge2/SXjn/qKeC9ChbPNgUAADueXIf6akgXcTrQQEA2N3LPHFK+lSQOh0FAKArj7blY0G6iHtHAQDozps8snH/WJA6HQUAoGuLh/7hQ0F6nOT1XkcBAGCKfkxbnP/CQ0HqdBQAgH1Z3P8HDwXpk8+JAgCAHXx1+Hk/SE/iUU8AAOzPy7RbRH/3UJACAMA+Le7+QpACAHBoXzTnt/d+w+V6AAD27WWS2eoXd4N0fuhJAACYrN9PSe+fkAIAwCHMVz9ZBeksXhUKAMDhzFc/WQXp8cOfBwAAe/EiNw26CtJ52SgAAEzVPHFCCgBAnS9OSN8UDgIAwDT9HqSz2jkAAJio14kgBQCg1vG3sdAEAECdo/vvsgcAgEOaOyEFAKCUE1IAACodW2oCAKDS0bfxDnsAAAq5ZA8AQClBCgBApTeCFACAUoIUAIBSghQAgFKCFACAUoIUAIBSghQAgFKCFACAUoIUAIBSghQAgFKCFACAUoIUAIBSghQAgFKCFACAUoIUAIBSghQAgFKCFACAUoIUAIBSghQAgFKCFACAUoIUAIBSghQAgFKCFACAUoIUAIBSghQAgFKCFACAUoIUAIBSghQAgFKCFACAUoIUAIBSghQAgFJ/rB4AgIP5lOTq5uezJC/LJgG4Q5ACjMt1kosky5uPzze/fspxWqAeJ5knebOv4QAe8s33r179e/UQAOzkU5Lzm49lR1/z5M7Hi46+JsCDBCnAMK0i9CzPn4DuanHz4eQU2AtBCjAcl2knoGfZf4Q+ZJ7kNMIU6JggBei3y7QAPc/tQlK1edpMlqKATlhqAuifPkboXcu0BajTJD+VTgKMghNSgH74kBZ6fY3Qx8zTZrb4BGzNCSlAnQ+53Y7/XDzLtpZpj4xaJnldOQgwXIIU4LDGEKH3fU47KX2X5MfaUYAhEqQA+3WdL58ROpYIve9z2qOhElEKbEiQAnTvboSeF89yaIubH0UpsDZBCtCNKUfofYu0LXz3lAJrEaQA29vHKzvHYp728H7PKgWeJUgBNnPIV3YO2eckJ0n+UT0I0H+CFOB5InQ7F0l+SfJz9SBAv3kwPsDD+v62pCG5iPtJgSc4IQW4JUL3422Sv1cPAfSXIAWm7mNuF5OuakcZrWXaCwF+KJ4D6CmX7IEpGuPbkvpuluSf1UMA/eSEFJgKEVrrKu00+k3xHEAPCVJgrK7TLhWL0P54F0EKPECQAmPibUn9dp72CC0Pywe+IEiBoROhw3Ke5KfqIYB+EaTAEK0eVL+MCB2aswhS4B5BCgyFtyWNw0XaqfaL6kGA/hCkQJ+J0HFaxjNJgTsEKdA3q7clLSNCx2oZQQrcIUiBPvDKzmnxPzSALwhSoIoInS5BCnxBkAKHtHpb0jIidMq8pAD4giAF9s0rO3nIZZLX1UMA/SBIgX0QoTzH/10AvxOkQBe8LQmArQlSYFsiFIBOCFJgEyIUgM4JUuA53pYEwF4JUuAhIpR9e1M9ANAfghRYuUx7PuhZRCgAByRIYdq8LYkK8+oBgH4RpDA9IpRqs+oBgH4RpDANH9Iux4tQ+uC4egCgXwQpjJe3JdFX8+oBgH4RpDAuIpS+m8U77IF7BCkM2+pB9cuIUIbhpHoAoH8EKQyPtyUxZIvqAYD+EaQwDCKUMZjF5XrgAYIU+mv1tqTVJXkYutPqAYB+EqTQL17ZyVgdxf2jwCMEKdQToUzB2yQvqocA+kmQQg1vS2JKZkl+rh4C6C9BCocjQpmqd9UDAP0mSGG/RChTd5Lkh+ohgH4TpNA9b0uC5ijtf5ABPEmQQjdEKHztPBaZgDUIUtjOdW5f1ylC4WvvkrypHgIYBkEK6/O2JFjPIslP1UMAwyFI4WkiFDazSPJb9RDAsAhS+NqnfHk5HljPImIU2IIghcbbkmA3p/Hwe2BLgpQpE6Gwu9WjnTxrFNiaIGVqLnN7KV6Ewm7maTH6snYMYOgEKVPgbUnQraO0S/Q26YFOCFLGSoTCfpwmeRsPvAc6JEgZk09pD+MWodCto7QIXcTleWAPBClj8D7tNHRZOwaMzsnNx4/VgwDjJkgZquu009CzOA2FLp3c+XBZHjgIQcrQrEL0Xbw/HrpwlNsA9egmoIQgZSiEKHRHhAK9IkgZgvdpm71XtWPAoIlQoLcEKX12mbbZuyyeA4ZqlhagiySvSycBeIIgpa9+STsVBTYziwgFBkaQ0jeXaX+Req0nrO847TWei4hQYIAEKX3ya9qpqKUleN5xWoCexMPqgYETpPTBddpfrOfFc0DfiVBglAQp1Vyih6edpF2OF6HAaAlSKn1M+0vWJXr4krclAZMiSKnyPu1kFGhEKDBZgpQKYhRuH1Q/jwgFJk6QcmieL8qUeVsSwAMEKYf01yRn1UPAgYlQgGcIUg7l14hRpmOW2wh9UzsKQP8JUg7hfdo76WHMZvHKToCtCFL2zQITYzaLCAXYmSBlny7jZJTx8bYkgI4JUvblOu1xNh56zxiIUIA9EqTsyzxilGEToQAHIkjZh3+Jd9MzTN6WBFBAkNK1D0neVQ8BGxChAMUEKV26jo16+u8ot6/rFKEAPSBI6dIi7huln7wtCaDHBCld+ZDkvHoIuEOEAgyEIKULLtXTF7PcXo4XoQADIUjpwtu4VE+dWbwtCWDQBCm7+pjkrHoIJmcWEQowGoKUXZ1WD8BkHOf2nlARCjAigpRdfEiyrB6CUfO2JIAJEKTs4m31AIySCAWYGEHKtt4nuaoegtFYXYqfR4QCTI4gZVteD8quvLITgCSClO18THJRPQSDJEIB+IogZRun1QMwGHffljSPCAXgAYKUTX2KzXqe5pWdAGxEkLIp947yEBEKwNYEKZs6qx6A3pjF25IA6IAgZRMf4p31UzeLCAWgY4KUTZxXD0CJWUQoAHskSNmEIJ0Ob0sC4GAEKetyuX78RCgAJQQp63I6Ok7z3G7Hi1AASghS1rWsHoDOeFsSAL0iSFnHpyRX1UOwExEKQG8JUtaxrB6Aja0eVD+PCAWg5wQp61hWD8BavC0JgEESpKxjWT0AjxKhAAyeIOU513H/aN/Mcns5XoQCMHiClOdcVA9AEm9LAmDEBCnPEaR1ZhGhAEyAIOU53s50WKu3Jc0jQgGYCEHKc5bVA0yAV3YCMGmClOc4Id0PEQoANwQpz3EPabcWSd7G5XgA+J0ghcNYJDmN01AA+Iog5SmfqgcYgeMk75K8qR4EAPrq2+oB6LWr6gEG7m2Sf0SMAsCTnJBC946SnMVblABgLYIUunWU9qgsS0sAsCaX7KE7YhQAtiBIoRtiFAC2JEhhd2IUAHYgSGF3ZxGjALA1QQq7eRvb9ACwE0EK25ulvX0JANiBIIXtnSV5UT0EAAydIIXtnMQbmACgE4IUtvOuegAAGAtBCptbJHlZPQQAjIUghc0tqgcAgDERpLCZWdw7CgCdEqSwmbfVAwDA2AhS2MxJ9QAAMDaCFNY3i2UmAOicIIX1zasHAIAxEqSwvuPqAQBgjAQprE+QAsAeCFJY36x6AAAYI0EK67PQBAB7IEgBACglSAEAKCVIAQAoJUgBACglSAEAKCVIAQAoJUgBACglSGE98+oBAGCsBCkAAKUEKQAApQQpAAClBCkAAKUEKQAApQQpAAClBCkAAKUEKQAApQQpAAClBCkAAKUEKQAApQQpAAClBCkAAKUEKQAApQQpAAClBCkAAKUEKQAApQQpAAClBCkAAKUEKQAApQQpAAClBCkAAKUEKQAApQQpAAClBCkAAKUEKQAApQQpAAClBCkAAKUEKQAApQQpAAClBCkAAKUEKQAApQQpAAClBCkAAKUEKQAApQQpAAClBCkAAKUEKQAApQQpAAClBCkAAKUEKQAApQQpAAClBCkAAKUEKQAApQQpAAClBCkAAKUEKQAApQQpAAClBCkAAKUEKQAApQQpAAClBCkAAKUEKQAApQQpAAClBCkAAKUEKQAApQQpAAClBCkAAKUEKQAApQQpAAClBCkAAKUEKQAApQQpAAClBCkAAKUEKQAApQQpAAClBCkAAKUEKQAApQQpAAClBCkAAKUEKQAApQQpAAClBCkAAKUEKQAApQQpAAClBCkAAKUEKQAApQQpAAClBCkAAKUEKQAApQQpAAClBCkAAKUEKQAApQQpAAClBCkAAKUEKQAApQQpAAClBCkAAKUEKQAApQQpAAClBCkAAKUEKQAApQQpAAClBCkAAKUEKQAApQQpAAClBCkAAKUEKQAApQQpAAClBCkAAKUEKQAApQQpAAClBCkAAKUEKQAApQQpAAClBCkAAKUEKQAApQQpAAClBCkAAKUEKQAApQQpAAClBCkAAKUEKQAApQQpAAClBCkAAKUEKQAApQQpAAClBCkAAKUEKQAApQQpAAClBCkAAKUEKQAApQQpAAClBCkAAKUEKQAApQQpAAClBCkAAKUEKQAApQQpAAClBCkAAKUEKQAApQQpAAClBCkAAKUEKQAApQQpAAClBCkAAKUEKQAApQQpAAClBCkAAKUEKQAApQQpAAClBCkAAKUEKQAApQQpAAClBCkAAKUEKQAApQQpAAClBCkAAKUEKQAApQQpAAClBCkAAKUEKQAApQQpAAClBCkAAKUEKQAApQQpAAClBCkAAKUEKQAApQQpAAClBCkAAKUEKQAApQQpAAClBCkAAKUEKQAApQQpAAClBCkAAKUEKQAApQQpAAClBCkAAKUEKQAApQQpAAClBCkAAKUEKQAApQQpAAClBCkAAKUEKU+ZVQ/QI/PqAQBgrAQpT3lZPQAAMH6ClOccVw/QE/PqAQBgrAQpz5lVD9ATs+oBAGCsBCnPmVcP0AOzuH0BAPZGkPKcefUAPTCvHgAAxkyQ8pzXSY6qhyg2rx4AAMZMkLKOk+oBik39Pz8A7JUgZR2L6gEKnSR5UT0EAIyZIGUdbzLdLfNF9QAAMHaClHW9rR6gwCzJD9VDAMDYCVLWtcj0lptOqwcAgCkQpKzrRaZ1SjpL8mP1EAAwBYKUTbzNdO4lPa0eAACmQpCyiRdJ3lUPcQDzOB0FgIMRpGzqh4z/uZxTiG4A6A1ByjbOMt4Fp3dpb6cCAA5EkLKNF0nOq4fYg5MkP1UPAQBTI0jZ1puM69L2cdrJLwBwYIKUXfyUcbzJ6CjtxNcrQgGggCBlV79l2FF6lGSZ5GXxHAAwWYKULgw1SlcxaokJAAoJUrryW4b1MPnjJFcRowBQTpDSpZ/T7sXs+yOhFmkno+4ZBYAeEKR07YckF2lvO+qbo7QnA/wWMQoAvSFI2YeXSf6eFn99OS2dp4Wy54wCQM8IUvbpp7T7NBeFM8zSLs//PTbpAaCXBCn79iLtEvlVWpge6sR0nvag+3+mPcQfAOipb75/9erfq4dgUq7TFp/epV1C79Is7fWfi9ieB4DBEKRUWsXpMi1ONw3Uo7THN83TQlSEAsAACVL65uPNj8tHfn9258M9oQAwAoIUAIBSlpoAACglSAEAKCVIAQAoJUgBACglSAEAKCVIAQAoJUgBACglSAEAKCVIAQAoJUgBACglSAEAKCVIAQAoJUgBACglSAEAKCVIAQAoJUgBACglSAEAKCVIAQAoJUgBACglSAEAKCVIAQAoJUgBACglSAEAKCVIAQAoJUgBACglSAEAKCVIAQAoJUgBACglSAEAKCVIAQAoJUgBACglSAEAKCVIAQAoJUgBACglSAEAKCVIAQAoJUgBACglSAEAKCVIAQAoJUgBACglSAEAKCVIAQAoJUgBACglSAEAKCVIAQAoJUgBACglSAEAKCVIAQAoJUgBACglSAEAKCVIAQAoJUgBACglSAEAKCVIAQAoJUgBACglSAEAKCVIAQAoJUgBACglSAEAKCVIAQAoJUgBACglSAEAKCVIAQAoJUgBACglSAEAKCVIAQAoJUgBACglSAEAKCVIAQAoJUgBACglSAEAKCVIAQAoJUgBACglSAEAKCVIAQAoJUgBACglSAEAKCVIAQAoJUgBACglSAEAKCVIAQAoJUgBACglSAEAKCVIAQAoJUgBACglSAEAKCVIAQAoJUgBACglSAEAKCVIAQAoJUgBACglSAEAKCVIAQAoJUgBACglSAEAKCVIAQAoJUgBACglSAEAKCVIAQAoJUgBACglSAEAKCVIAQAoJUgBACglSAEAKCVIAQAoJUgBACglSAEAKCVIAQAoJUgBACglSAEAKCVIAQAoJUgBACglSAEAKCVIAQAoJUgBACglSAEAKCVIAQAoJUgBACglSAEAKCVIAQAoJUgBACglSAEAKCVIAQAoJUgBACglSAEAKCVIAQAoJUgBACglSAEAKCVIAQAoJUgBACglSAEAKCVIAQAoJUgBACglSAEAKCVIAQAoJUgBACglSAEAKCVIAQAoJUgBACglSAEAKCVIAQAoJUgBACglSAEAKCVIAQAoJUgBACglSAEAKCVIAQAoJUgBAKh0KUgBAKj0WZACAFBKkAIAUEqQAgBQySV7AABKXQhSAABKfZvkY/UQAABMlhNSAABKff42yVX1FAAATNaVIAUAoJIgBQCgzGXSlpquaucAAGCirpIWpMvSMQAAmKqL5PZNTZ8KBwEAYJq+CNKLwkEAAJimq+Q2SJdlYwAAMFVOSAEAKPP720KdkAIAUGG5+sndV4d+OPwcAABM1O9X6O8G6fLwcwAAMFHL1U/uBun54ecAAGCCLpN8Xv3ibpBe3fwmAADs0/LuL7596jcBAGAPvrgyfz9I3x1wEAAApuc6z5yQXsVlewAA9md5/x/cD9LEKSkAAPvz1SL9Q0F6nnaUCgAAXVsrSD8/9IkAALCjD7nzuKeVh4I0SU73OgoAAFP04KHnY0F6Fa8SBQCgO9fZMEgTy00AAHTnPA9crk+eDtJlko/7mAYAgMk5e+w3ngrSxL2kAADs7lOeeCPoc0G6TPK+w2EAAJieJ28FfS5Ik3ZK6rmkAABs6+yp31wnSK9iwQkAgO28zyPLTCvrBGnSgvTTzuMAADA1p899wrpB+jnJYpdJAACYnA9pV9uftG6QJm3B6dcthwEAYHrWuu1zkyBN2pGrS/cAADznY5541NNdmwapS/cAAKzjdN1P3DRIk1a6v2zx5wAAmIa1T0eT5A9/+u67bb7JMslfkvynbf4wAACj9t+T/L91P3mbE9KVRZLLHf48AADj8z7JxSZ/YJcgXd1P6i1OAAAkrQtPN/1DuwRp0up3vuPXAABgHN5ljeeO3rdrkCYtSv/awdcBAGC4PmXL1813EaRJchZRCgAwZW/zzDvrH9NVkCaiFABgqj4kOd/2D3cZpIkoBQCYmuu009GtdR2kiSgFAJiS02yxyHTXtg/Gf85F2o2t/yXJf9jHNwAAoNzHJP9z1y+yjxPSlbO0R0J5TikAwPhcJznp4gvtM0iTdlJ6HG90AgAYm0W23Kq/b99BmrR7CuZpr5ECAGD4fs0OW/X37ese0vv+NW1o95UCAAzbZTq6VL9yiBPSu87STktdwgcAGJ7O7hu969BBmtzeV/pLwfcGAGB7J9nxEU8PqQjSldMkf057XAAAAP32L0mW+/jClUGa3C48/TXt/lIAAPrnfZJ3+/rih1pqes5F2v2l/5bkL7H0BADQF5dJ/ts+v0FfgjRpm/jLJP87whQAoA8u065m/+s+v0mfgnRFmAIA1LtOW0Tv5OH3T6m+h/Qpn9MWn47S7jH1qCgAgMO4TjsZ3XuMJv0O0rvO0gr9L2lvBrgunQYAYLxWMXpxqG/4zfevXh3qe3XtJO1f1kmSl7WjAACMwsFjNBl2kN51nPYvb/XxonAWAIAhKonRZDxBet/xAx8iFQDgYWUxmiR/rPimB3CRh/+Fzm9+PE5blkqS2c0HwzGL2zQAoCuXSRYpitFkvCekTMNxWpzObz5eF84CAEO0es7oQbbpHyNIGZOjtCW3RZI3taMAQO99SPs7szRGk+E89gnW8TntEWHzJH+OR4QBwGPepx3ilMdoIkgZr6skb9Mu6f9SOgkA9Mtf005Ge0OQMnarN379OcnH2lEAoNR12kuGzorn+IogZSqu0i7l/zUu4wMwPR/TrhqWbdI/RZAyNWdp2/mXxXMAwKH8kh5s0j9FkDJFV2n/j/m+dgwA2KtPaZfoT4vneJYgZao+p93QLUoBGKNf064I9vIS/X1jfVMTrGtx8+OPlUMAQEc+pf3dtqwdYzNOSMFJKQDj8EvaqeiyeI6NOSGFZpG2fegNTwAMzce0Z28P4vL8Q5yQwq2TtEsdADAEn9IeZzjPgGM0EaRw12rRCQD67Drt8vwsPXzI/Tb+8KfvvqueAfrkKsl/TPKfi+cAgPuuk/yvJP8jyf8tnqVT33z/6lX1DNA3R2mXPl5WDwIAaSH67uajtw+334VL9vC1zxnAQ4QBGL27l+ZPM9IYTQQpPOYsbWsRAA7tMm1Z6SgjD9EVQQqPe1c9AACTcZ32TOy/pD1L9Kx0mgPzHFJ43HnaIzXcSwrAvnxMi8/zTOAk9DGCFJ72LsnfqocAYFQucxuhV6WT9IQte3jaLMk/q4cAYPA+pAXopE9CH+OEFJ52lXY5xStFAdjEdW4DdBkR+iRBCs87jyAF4Hmfchug57WjDIsghectqwcAoLcu0/6eOMvA3ydfSZDC8/wXDAB3WUrqmCCF9biPFGDaLCXtkSCF9VxEkAJMiaWkAxKksB7/RQQwfpaSighSWI/7SAHGyVJSDwhSWI8TUoDxsJTUM4IUAJgCS0k9JkgBgDGylDQgghQAGAtLSQMlSAGAIbOUNAKCFAAYGktJIyNIAYAhsJQ0YoIUAOgjS0kTIkgBgL6wlDRRghQAqGQpCUEKABycpSS+IEgBgEOwlMSjBCkAsA+WklibIAUAumIpia0IUgBgF5aS2JkgBQA2ZSmJTglSAGAdlpLYG0EKADzEUhIHI0gBgBVLSZQQpAAwbZaSKCdIAWB6LCXRK4IUAKbBUhK9JUgBYJwsJTEYghQAxsNSEoMkSAFg2CwlMXiCFACGx1ISoyJIAWAYLCUxWoIUAPrJUhKTIUgBoD8sJTFJghQAallKYvIEKQAcnqUkuEOQAsBhWEqCRwhSANgPS0mwJkEKAN2xlARbEKQAsBtLSbAjQQoAm7OUBB0SpACwntVS0jIiFDolSAHgYaulpGVsxsNeCVIAuPUptwFqKQkORJACMHWrzfizWEqCEoIUgCmylAQ9IkgBmApLSdBTghSAsbKUBAMhSAEYE0tJMECCFIChs5QEAydIARgiS0kwIoIUgKGwlAQjJUgB6CtLSTARghSAPrGUBBMkSAGoZikJJk6QAlDBUhLwO0EKwKFYSgIeJEgB2BdLScBaBCkAXbKUBGxMkAKwK0tJwE4EKQDbsJQEdEaQArAuS0nAXghSAB5jKQk4CEEKwF2WkoCDE6QAWEoCSglSgGmylAT0hiAFmA5LSUAvCVKA8bKUBAyCIAUYF0tJwOAIUoDhs5QEDJogBRgmS0nAaAhSgOGwlASMkiAF6C9LScAkCFKAfrGUBEyOIAWoZykJmDRBClDDUhLADUEKcDiWkgAeIEgB9sdSEsAaBClAtywlAWxIkMJ6LJrwFEtJADsQpLAel1q5z1ISQEcEKazvMsnr6iEoZSkJYA8EKazvKoJ0aiwlARyAIIX1XST5oXoI9s5SEsCBCVJY3zLJz9VDsBeWkgAKCVJY37J6ADplKQmgJwQpbOZDXLYfMktJAD0kSGEz5xGkQ2IpCWAAvvn+1avqGWBIjtJO1l4Uz8HjLCUBDIwTUtjM57TI+bF6EL5gKQlgwJyQwuZmSf5ZPacVXd4AAAFVSURBVASWkgDGwgkpbO4qyfs4Ja1gKQlghJyQwnZmcUp6CJaSACbACSls5yrJr0l+Kp5jjCwlAUyME1LY3lHaAs3L6kFGwFISwIQ5IYXtfU6ySPL34jmGylISAEkEKexqGZfuN2EpCYCvuGQP3bhI8rp6iB6ylATAs5yQQjfmadElSi0lAbAhQQrd+JzkJO2kdIqvFbWUBMDWBCl05yq3J6VTiFJLSQB0QpBCty7SHpq/zDgv31tKAqBzghS69zntpPQsyQ+lk+zOUhIAeydIYT9W95SeJvm5dpSNWUoC4KA89gn27zjttLTPl/AtJQFQxgkp7N9FWpSeJnmb/iw8WUoCoBeckMJhHaVFaVWYWkoCoHcEKdQ4SrJIC9OXe/w+lpIA6D1BCvWO0+L0JN3EqaUkAAZFkEK/zNIC9Tjt0VFJ8uaJz79MO/Vcpl2CX/0IAIPx/wHbqvKVrAYqOQAAAABJRU5ErkJggg==";
      },
      44104: function (t) {
        "use strict";
        t.exports =
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAACpF6WWAAAARGVYSWZNTQAqAAAACAABh2kABAAAAAEAAAAaAAAAAAADoAEAAwAAAAEAAQAAoAIABAAAAAEAAABUoAMABAAAAAEAAABUAAAAALdozUAAAAKFSURBVHictZW/a1RBEMc/M++9wDUavB8p0ikItkp4GIJF0tgoIXdwdmdnEiIH+gccaQMJHoacpZYh7yRokyYpRIQjaKv/QIrcJaI2B/fudiw0GpP3/InT7czuZ787O7MrJFitVvM/HR5exuy2OTeFyChmGUS6mO2J6jYij89ks28WFxf7J9fLSUe1Wr0kvd4KIpMCQ0mbAhj0MNuxoaF79Xr9bSLUzOT+3bsl59wjgXNpsAT4e1WdXX74MBIROw6Ve3NzJQdPRCTzu8BjgroKlZVGIwJMAKpzc5dE5OWfKExSbGYT9UbjrdRqNf9ju/1cRK7/LfCY4q2zhcIN/dDpXAEmkyb5vo+q/uBTVXzfT+NOfuh0rqiKVETk1C37vs+dhQWKt24RBAEAQRBQLJe5s7CQCBaRIRWpqJlNJW05GAxo7+8TXr3KTLlMJpNhplwmHB+nvb/PYDBIS8GUD4ymBNmMItTzGAtDzl+4QDaXY7fVYjOKMLO0FIwqZqklFMcxz5pNDg8OyBcKHB4c8KzZJI7jtCVgllFEumnxIAi4WSySzeXotNtkczluFovfcpxoIl0F9pJjwnSpxFgYsttq8WBpid1Wi7EwZLpUQuRUhx/Zni8i25hdPBnxPI/CyAitV6/YjCLiOObp+jrOOQojI3ieR79/6i1BRLalOj8fitmLtLJyzuGc++ZTVVQ1EWhmPRO5psP5/GtgJ+kc/X7/ByCAcy4R+NV2hvP51/+l9xWg3mi8U7NZM0uthJ8CzbpqNltvNN4BHDW2La+tRep5FYP3f6pQPa+yvLYWfRl+hyIitrK6umFBMGFmWwa9X8B6ZrZlQTCxsrq6cfRAQ8J3Av/+R30GA6Eq4DOH1LEAAAAASUVORK5CYII=";
      },
      3995: function (t) {
        "use strict";
        t.exports =
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAWCAYAAAChWZ5EAAAARGVYSWZNTQAqAAAACAABh2kABAAAAAEAAAAaAAAAAAADoAEAAwAAAAEAAQAAoAIABAAAAAEAAABAoAMABAAAAAEAAAAsAAAAABqT2PwAAADzSURBVHic7ZI9bsJAFIRnni0U02apggMVbaSg3CNHoeQYOUruERGJNg2ygW7T2gLF76Xgp0AiKIuyafyVo9WbT6uhAVw+Pj2D+gLDPWJAlDCZ5O9vr1wMBjdy6+YERlHK9xjwoZ/+QTrOCQz9mOV7g37HOZHoxSe0Aq1AeumBmdUADTCSzELzc/z4A2aokjTJU0EvSZPcDFVIHiwAAFSt72aziqr1NXmwwF9zeQMi2Xo8holkUA3OgwRIdJuvZgnQoM1xVL/NgwV2Rw9HeFV+jn/fQCvQCsjWewWxit5MrLbeqwyLYkPIFEQZsbwkZDosis032g6JgRTU6bkAAAAASUVORK5CYII=";
      },
    },
    __webpack_module_cache__ = {},
    deferred;
  function __webpack_require__(t) {
    var e = __webpack_module_cache__[t];
    if (void 0 !== e) return e.exports;
    var n = (__webpack_module_cache__[t] = { exports: {} });
    return (
      __webpack_modules__[t].call(n.exports, n, n.exports, __webpack_require__),
      n.exports
    );
  }
  (__webpack_require__.m = __webpack_modules__),
    (deferred = []),
    (__webpack_require__.O = function (t, e, n, r) {
      if (!e) {
        var o = 1 / 0;
        for (u = 0; u < deferred.length; u++) {
          (e = deferred[u][0]), (n = deferred[u][1]), (r = deferred[u][2]);
          for (var i = !0, a = 0; a < e.length; a++)
            (!1 & r || o >= r) &&
            Object.keys(__webpack_require__.O).every(function (t) {
              return __webpack_require__.O[t](e[a]);
            })
              ? e.splice(a--, 1)
              : ((i = !1), r < o && (o = r));
          if (i) {
            deferred.splice(u--, 1);
            var c = n();
            void 0 !== c && (t = c);
          }
        }
        return t;
      }
      r = r || 0;
      for (var u = deferred.length; u > 0 && deferred[u - 1][2] > r; u--)
        deferred[u] = deferred[u - 1];
      deferred[u] = [e, n, r];
    }),
    (__webpack_require__.n = function (t) {
      var e =
        t && t.__esModule
          ? function () {
              return t.default;
            }
          : function () {
              return t;
            };
      return __webpack_require__.d(e, { a: e }), e;
    }),
    (__webpack_require__.d = function (t, e) {
      for (var n in e)
        __webpack_require__.o(e, n) &&
          !__webpack_require__.o(t, n) &&
          Object.defineProperty(t, n, { enumerable: !0, get: e[n] });
    }),
    (__webpack_require__.g = (function () {
      if ("object" == typeof globalThis) return globalThis;
      try {
        return this || new Function("return this")();
      } catch (t) {
        if ("object" == typeof window) return window;
      }
    })()),
    (__webpack_require__.o = function (t, e) {
      return Object.prototype.hasOwnProperty.call(t, e);
    }),
    (__webpack_require__.r = function (t) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(t, "__esModule", { value: !0 });
    }),
    (__webpack_require__.p = "/readertob/readertob/"),
    (function () {
      var t = { 179: 0 };
      __webpack_require__.O.j = function (e) {
        return 0 === t[e];
      };
      var e = function (e, n) {
          var r,
            o,
            i = n[0],
            a = n[1],
            c = n[2],
            u = 0;
          if (
            i.some(function (e) {
              return 0 !== t[e];
            })
          ) {
            for (r in a)
              __webpack_require__.o(a, r) && (__webpack_require__.m[r] = a[r]);
            if (c) var s = c(__webpack_require__);
          }
          for (e && e(n); u < i.length; u++)
            (o = i[u]),
              __webpack_require__.o(t, o) && t[o] && t[o][0](),
              (t[o] = 0);
          return __webpack_require__.O(s);
        },
        n = (self.webpackChunkreader = self.webpackChunkreader || []);
      n.forEach(e.bind(null, 0)), (n.push = e.bind(null, n.push.bind(n)));
    })();
  var __webpack_exports__ = __webpack_require__.O(void 0, [216], function () {
    return __webpack_require__(61294);
  });
  __webpack_exports__ = __webpack_require__.O(__webpack_exports__);


  /**
   * 执行自动获取图书
   */
  document.getElementById("catalog-list").childNodes[0].click()
  let jdInterval = null;
  let nextChapter = function next() {
    if (document.getElementsByClassName("nextChapter").length == 0) {
        clearInterval(jdInterval)
      return
    }
    document.getElementsByClassName("nextChapter")[0].click()	
  }
  jdInterval = setInterval(nextChapter, 5000)


})();
