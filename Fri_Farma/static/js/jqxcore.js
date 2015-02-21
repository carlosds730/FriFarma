/*
 jQWidgets v3.1.0 (2013-Dec-23)
 Copyright (c) 2011-2014 jQWidgets.
 License: http://jqwidgets.com/license/
 */

(function (a) {
    a.jqx = a.jqx || {};
    a.jqx.define = function (b, c, d) {
        b[c] = function () {
            if (this.baseType) {
                this.base = new b[this.baseType]();
                this.base.defineInstance()
            }
            this.defineInstance()
        };
        b[c].prototype.defineInstance = function () {
        };
        b[c].prototype.base = null;
        b[c].prototype.baseType = undefined;
        if (d && b[d]) {
            b[c].prototype.baseType = d
        }
    };
    a.jqx.invoke = function (e, d) {
        if (d.length == 0) {
            return
        }
        var f = typeof(d) == Array || d.length > 0 ? d[0] : d;
        var c = typeof(d) == Array || d.length > 1 ? Array.prototype.slice.call(d, 1) : a({}).toArray();
        while (e[f] == undefined && e.base != null) {
            if (e[f] != undefined && a.isFunction(e[f])) {
                return e[f].apply(e, c)
            }
            if (typeof f == "string") {
                var b = f.toLowerCase();
                if (e[b] != undefined && a.isFunction(e[b])) {
                    return e[b].apply(e, c)
                }
            }
            e = e.base
        }
        if (e[f] != undefined && a.isFunction(e[f])) {
            return e[f].apply(e, c)
        }
        if (typeof f == "string") {
            var b = f.toLowerCase();
            if (e[b] != undefined && a.isFunction(e[b])) {
                return e[b].apply(e, c)
            }
        }

    };
    a.jqx.hasProperty = function (c, b) {
        if (typeof(b) == "object") {
            for (var e in b) {
                var d = c;
                while (d) {
                    if (d.hasOwnProperty(e)) {
                        return true
                    }
                    if (d.hasOwnProperty(e.toLowerCase())) {
                        return true
                    }
                    d = d.base
                }
                return false
            }
        } else {
            while (c) {
                if (c.hasOwnProperty(b)) {
                    return true
                }
                if (c.hasOwnProperty(b.toLowerCase())) {
                    return true
                }
                c = c.base
            }
        }
        return false
    };
    a.jqx.hasFunction = function (e, d) {
        if (d.length == 0) {
            return false
        }
        if (e == undefined) {
            return false
        }
        var f = typeof(d) == Array || d.length > 0 ? d[0] : d;
        var c = typeof(d) == Array || d.length > 1 ? Array.prototype.slice.call(d, 1) : {};
        while (e[f] == undefined && e.base != null) {
            if (e[f] && a.isFunction(e[f])) {
                return true
            }
            if (typeof f == "string") {
                var b = f.toLowerCase();
                if (e[b] && a.isFunction(e[b])) {
                    return true
                }
            }
            e = e.base
        }
        if (e[f] && a.isFunction(e[f])) {
            return true
        }
        if (typeof f == "string") {
            var b = f.toLowerCase();
            if (e[b] && a.isFunction(e[b])) {
                return true
            }
        }
        return false
    };
    a.jqx.isPropertySetter = function (c, b) {
        if (b.length == 1 && typeof(b[0]) == "object") {
            return true
        }
        if (b.length == 2 && typeof(b[0]) == "string" && !a.jqx.hasFunction(c, b)) {
            return true
        }
        return false
    };
    a.jqx.validatePropertySetter = function (f, d, b) {
        if (!a.jqx.propertySetterValidation) {
            return true
        }
        if (d.length == 1 && typeof(d[0]) == "object") {
            for (var e in d[0]) {
                var g = f;
                while (!g.hasOwnProperty(e) && g.base) {
                    g = g.base
                }
                if (!g || !g.hasOwnProperty(e)) {
                    if (!b) {
                        var c = g.hasOwnProperty(e.toString().toLowerCase());
                        if (!c) {
                            throw"Invalid property: " + e
                        } else {
                            return true
                        }
                    }
                    return false
                }
            }
            return true
        }
        if (d.length != 2) {
            if (!b) {
                throw"Invalid property: " + d.length >= 0 ? d[0] : ""
            }
            return false
        }
        while (!f.hasOwnProperty(d[0]) && f.base) {
            f = f.base
        }
        if (!f || !f.hasOwnProperty(d[0])) {
            if (!b) {
                throw"Invalid property: " + d[0]
            }
            return false
        }
        return true
    };
    a.jqx.set = function (c, b) {
        if (b.length == 1 && typeof(b[0]) == "object") {
            a.each(b[0], function (d, e) {
                var f = c;
                while (!f.hasOwnProperty(d) && f.base != null) {
                    f = f.base
                }
                if (f.hasOwnProperty(d)) {
                    a.jqx.setvalueraiseevent(f, d, e)
                } else {
                    if (f.hasOwnProperty(d.toLowerCase())) {
                        a.jqx.setvalueraiseevent(f, d.toLowerCase(), e)
                    } else {
                        if (a.jqx.propertySetterValidation) {
                            throw"jqxCore: invalid property '" + d + "'"
                        }
                    }
                }
            })
        } else {
            if (b.length == 2) {
                while (!c.hasOwnProperty(b[0]) && c.base) {
                    c = c.base
                }
                if (c.hasOwnProperty(b[0])) {
                    a.jqx.setvalueraiseevent(c, b[0], b[1])
                } else {
                    if (c.hasOwnProperty(b[0].toLowerCase())) {
                        a.jqx.setvalueraiseevent(c, b[0].toLowerCase(), b[1])
                    } else {
                        if (a.jqx.propertySetterValidation) {
                            throw"jqxCore: invalid property '" + b[0] + "'"
                        }
                    }
                }
            }
        }
    };
    a.jqx.setvalueraiseevent = function (c, d, e) {
        var b = c[d];
        c[d] = e;
        if (!c.isInitialized) {
            return
        }
        if (c.propertyChangedHandler != undefined) {
            c.propertyChangedHandler(c, d, b, e)
        }
        if (c.propertyChangeMap != undefined && c.propertyChangeMap[d] != undefined) {
            c.propertyChangeMap[d](c, d, b, e)
        }
    };
    a.jqx.get = function (e, d) {
        if (d == undefined || d == null) {
            return undefined
        }
        if (e.propertyMap) {
            var c = e.propertyMap(d);
            if (c != null) {
                return c
            }
        }
        if (e.hasOwnProperty(d)) {
            return e[d]
        }
        if (e.hasOwnProperty(d.toLowerCase())) {
            return e[d.toLowerCase()]
        }
        var b = undefined;
        if (typeof(d) == Array) {
            if (d.length != 1) {
                return undefined
            }
            b = d[0]
        } else {
            if (typeof(d) == "string") {
                b = d
            }
        }
        while (!e.hasOwnProperty(b) && e.base) {
            e = e.base
        }
        if (e) {
            return e[b]
        }
        return undefined
    };
    a.jqx.serialize = function (e) {
        var b = "";
        if (a.isArray(e)) {
            b = "[";
            for (var d = 0; d < e.length; d++) {
                if (d > 0) {
                    b += ", "
                }
                b += a.jqx.serialize(e[d])
            }
            b += "]"
        } else {
            if (typeof(e) == "object") {
                b = "{";
                var c = 0;
                for (var d in e) {
                    if (c++ > 0) {
                        b += ", "
                    }
                    b += d + ": " + a.jqx.serialize(e[d])
                }
                b += "}"
            } else {
                b = e.toString()
            }
        }
        return b
    };
    a.jqx.propertySetterValidation = true;
    a.jqx.jqxWidgetProxy = function (g, c, b) {
        var d = a(c);
        var f = a.data(c, g);
        if (f == undefined) {
            return undefined
        }
        var e = f.instance;
        if (a.jqx.hasFunction(e, b)) {
            return a.jqx.invoke(e, b)
        }
        if (a.jqx.isPropertySetter(e, b)) {
            if (a.jqx.validatePropertySetter(e, b)) {
                a.jqx.set(e, b);
                return undefined
            }
        } else {
            if (typeof(b) == "object" && b.length == 0) {
                return
            } else {
                if (typeof(b) == "object" && b.length == 1 && a.jqx.hasProperty(e, b[0])) {
                    return a.jqx.get(e, b[0])
                } else {
                    if (typeof(b) == "string" && a.jqx.hasProperty(e, b[0])) {
                        return a.jqx.get(e, b)
                    }
                }
            }
        }
        throw"jqxCore: Invalid parameter '" + a.jqx.serialize(b) + "' does not exist.";
        return undefined
    };
    a.jqx.applyWidget = function (c, d, k, l) {
        var g = false;
        try {
            g = window.MSApp != undefined
        } catch (f) {
        }
        var m = a(c);
        if (!l) {
            l = new a.jqx["_" + d]()
        } else {
            l.host = m;
            l.element = c
        }
        if (c.id == "") {
            c.id = a.jqx.utilities.createId()
        }
        var j = {host: m, element: c, instance: l};
        l.widgetName = d;
        a.data(c, d, j);
        a.data(c, "jqxWidget", j.instance);
        var h = [];
        var l = j.instance;
        while (l) {
            l.isInitialized = false;
            h.push(l);
            l = l.base
        }
        h.reverse();
        h[0].theme = a.jqx.theme || "";
        a.jqx.jqxWidgetProxy(d, c, k);
        for (var b in h) {
            l = h[b];
            if (b == 0) {
                l.host = m;
                l.element = c;
                l.WinJS = g
            }
            if (l != undefined) {
                if (l.createInstance != null) {
                    if (g) {
                        MSApp.execUnsafeLocalFunction(function () {
                            l.createInstance(k)
                        })
                    } else {
                        l.createInstance(k)
                    }
                }
            }
        }
        for (var b in h) {
            if (h[b] != undefined) {
                h[b].isInitialized = true
            }
        }
        if (g) {
            MSApp.execUnsafeLocalFunction(function () {
                j.instance.refresh(true)
            })
        } else {
            j.instance.refresh(true)
        }
    };
    a.jqx.jqxWidget = function (b, d, j) {
        var c = false;
        try {
            jqxArgs = Array.prototype.slice.call(j, 0)
        } catch (h) {
            jqxArgs = ""
        }
        try {
            c = window.MSApp != undefined
        } catch (h) {
        }
        var g = b;
        var f = "";
        if (d) {
            f = "_" + d
        }
        a.jqx.define(a.jqx, "_" + g, f);
        a.fn[g] = function () {
            var e = Array.prototype.slice.call(arguments, 0);
            if (e.length == 0 || (e.length == 1 && typeof(e[0]) == "object")) {
                if (this.length == 0) {
                    if (this.selector) {
                        throw new Error("Invalid jQuery Selector - " + this.selector + "! Please, check whether the used ID or CSS Class name is correct.")
                    } else {
                        throw new Error("Invalid jQuery Selector! Please, check whether the used ID or CSS Class name is correct.")
                    }
                }
                return this.each(function () {
                    var n = a(this);
                    var m = this;
                    var o = a.data(m, g);
                    if (o == null) {
                        a.jqx.applyWidget(m, g, e, undefined)
                    } else {
                        a.jqx.jqxWidgetProxy(g, this, e)
                    }
                })
            } else {
                if (this.length == 0) {
                    if (this.selector) {
                        throw new Error("Invalid jQuery Selector - " + this.selector + "! Please, check whether the used ID or CSS Class name is correct.")
                    } else {
                        throw new Error("Invalid jQuery Selector! Please, check whether the used ID or CSS Class name is correct.")
                    }
                }
                var l = null;
                var k = 0;
                this.each(function () {
                    var m = a.jqx.jqxWidgetProxy(g, this, e);
                    if (k == 0) {
                        l = m;
                        k++
                    } else {
                        if (k == 1) {
                            var n = [];
                            n.push(l);
                            l = n
                        }
                        l.push(m)
                    }
                })
            }
            return l
        };
        try {
            a.extend(a.jqx["_" + g].prototype, Array.prototype.slice.call(j, 0)[0])
        } catch (h) {
        }
        a.extend(a.jqx["_" + g].prototype, {
            toThemeProperty: function (e, k) {
                if (this.theme == "") {
                    return e
                }
                if (k != null && k) {
                    return e + "-" + this.theme
                }
                return e + " " + e + "-" + this.theme
            }
        });
        a.jqx["_" + g].prototype.refresh = function () {
            if (this.base) {
                this.base.refresh(true)
            }
        };
        a.jqx["_" + g].prototype.createInstance = function () {
        };
        a.jqx["_" + g].prototype.applyTo = function (l, k) {
            if (!(k instanceof Array)) {
                var e = [];
                e.push(k);
                k = e
            }
            a.jqx.applyWidget(l, g, k, this)
        };
        a.jqx["_" + g].prototype.getInstance = function () {
            return this
        };
        a.jqx["_" + g].prototype.propertyChangeMap = {};
        a.jqx["_" + g].prototype.addHandler = function (m, k, e, l) {
            switch (k) {
                case"mousewheel":
                    if (window.addEventListener) {
                        if (a.jqx.browser.mozilla) {
                            m[0].addEventListener("DOMMouseScroll", e, false)
                        } else {
                            m[0].addEventListener("mousewheel", e, false)
                        }
                        return false
                    }
                    break;
                case"mousemove":
                    if (window.addEventListener && !l) {
                        m[0].addEventListener("mousemove", e, false);
                        return false
                    }
                    break
            }
            if (l == undefined || l == null) {
                if (m.on) {
                    m.on(k, e)
                } else {
                    m.bind(k, e)
                }
            } else {
                if (m.on) {
                    m.on(k, l, e)
                } else {
                    m.bind(k, l, e)
                }
            }
        };
        a.jqx["_" + g].prototype.removeHandler = function (l, k, e) {
            switch (k) {
                case"mousewheel":
                    if (window.removeEventListener) {
                        if (a.jqx.browser.mozilla) {
                            l[0].removeEventListener("DOMMouseScroll", e, false)
                        } else {
                            l[0].removeEventListener("mousewheel", e, false)
                        }
                        return false
                    }
                    break;
                case"mousemove":
                    if (e) {
                        if (window.removeEventListener) {
                            l[0].removeEventListener("mousemove", e, false)
                        }
                    }
                    break
            }
            if (k == undefined) {
                if (l.off) {
                    l.off()
                } else {
                    l.unbind()
                }
                return
            }
            if (e == undefined) {
                if (l.off) {
                    l.off(k)
                } else {
                    l.unbind(k)
                }
            } else {
                if (l.off) {
                    l.off(k, e)
                } else {
                    l.unbind(k, e)
                }
            }
        }
    };
    a.jqx.theme = a.jqx.theme || "";
    a.jqx.ready = function () {
        a(window).trigger("jqxReady")
    };
    a.jqx.utilities = a.jqx.utilities || {};
    a.extend(a.jqx.utilities, {
        scrollBarSize: 15, touchScrollBarSize: 10, createId: function () {
            var b = function () {
                return (((1 + Math.random()) * 65536) | 0).toString(16).substring(1)
            };
            return "jqxWidget" + b() + b()
        }, setTheme: function (f, g, e) {
            if (typeof e === "undefined") {
                return
            }
            var h = e[0].className.split(" "), b = [], j = [], d = e.children();
            for (var c = 0; c < h.length; c += 1) {
                if (h[c].indexOf(f) >= 0) {
                    if (f.length > 0) {
                        b.push(h[c]);
                        j.push(h[c].replace(f, g))
                    } else {
                        j.push(h[c] + "-" + g)
                    }
                }
            }
            this._removeOldClasses(b, e);
            this._addNewClasses(j, e);
            for (var c = 0; c < d.length; c += 1) {
                this.setTheme(f, g, a(d[c]))
            }
        }, _removeOldClasses: function (d, c) {
            for (var b = 0; b < d.length; b += 1) {
                c.removeClass(d[b])
            }
        }, _addNewClasses: function (d, c) {
            for (var b = 0; b < d.length; b += 1) {
                c.addClass(d[b])
            }
        }, getOffset: function (b) {
            var d = a.jqx.mobile.getLeftPos(b[0]);
            var c = a.jqx.mobile.getTopPos(b[0]);
            return {top: c, left: d}
        }, resize: function (d, m, l, k) {
            if (k === undefined) {
                k = true
            }
            var g = -1;
            var f = this;
            var c = function (o) {
                if (!f.hiddenWidgets) {
                    return -1
                }
                var p = -1;
                for (var n = 0; n < f.hiddenWidgets.length; n++) {
                    if (o.id) {
                        if (f.hiddenWidgets[n].id == o.id) {
                            p = n;
                            break
                        }
                    } else {
                        if (f.hiddenWidgets[n].id == o[0].id) {
                            p = n;
                            break
                        }
                    }
                }
                return p
            };
            if (this.resizeHandlers) {
                for (var e = 0; e < this.resizeHandlers.length; e++) {
                    if (d.id) {
                        if (this.resizeHandlers[e].id == d.id) {
                            g = e;
                            break
                        }
                    } else {
                        if (this.resizeHandlers[e].id == d[0].id) {
                            g = e;
                            break
                        }
                    }
                }
                if (l === true) {
                    if (g != -1) {
                        this.resizeHandlers.splice(g, 1)
                    }
                    if (this.resizeHandlers.length == 0) {
                        var j = a(window);
                        if (j.off) {
                            j.off("resize.jqx");
                            j.off("orientationchange.jqx");
                            j.off("orientationchanged.jqx")
                        } else {
                            j.unbind("resize.jqx");
                            j.unbind("orientationchange.jqx");
                            j.unbind("orientationchanged.jqx")
                        }
                        this.resizeHandlers = null
                    }
                    var b = c(d);
                    if (b != -1 && this.hiddenWidgets) {
                        this.hiddenWidgets.splice(b, 1)
                    }
                    return
                }
            } else {
                if (l === true) {
                    var b = c(d);
                    if (b != -1 && this.hiddenWidgets) {
                        this.hiddenWidgets.splice(b, 1)
                    }
                    return
                }
            }
            var f = this;
            var h = function (n, o) {
                if (!f.resizeHandlers) {
                    return
                }
                var p = function (t, r) {
                    var s = t.widget.parents().length;
                    var q = r.widget.parents().length;
                    try {
                        if (s < q) {
                            return -1
                        }
                        if (s > q) {
                            return 1
                        }
                    } catch (u) {
                        var v = u
                    }
                    return 0
                };
                f.hiddenWidgets = [];
                f.resizeHandlers.sort(p);
                a.each(f.resizeHandlers, function (s, v) {
                    var u = this.widget.data();
                    if (!u) {
                        return true
                    }
                    if (!u.jqxWidget) {
                        return true
                    }
                    var t = u.jqxWidget.width;
                    var q = u.jqxWidget.height;
                    if (u.jqxWidget.base) {
                        if (t == undefined) {
                            t = u.jqxWidget.base.width
                        }
                        if (q == undefined) {
                            q = u.jqxWidget.base.height
                        }
                    }
                    var r = false;
                    if (t != null && t.toString().indexOf("%") != -1) {
                        r = true
                    }
                    if (q != null && q.toString().indexOf("%") != -1) {
                        r = true
                    }
                    if (a.jqx.isHidden(this.widget)) {
                        if (c(this.widget) === -1) {
                            f.hiddenWidgets.push(this)
                        }
                    } else {
                        if (n === undefined || n !== true) {
                            if (r) {
                                this.callback(o);
                                if (f.hiddenWidgets.indexOf(this) >= 0) {
                                    f.hiddenWidgets.splice(f.hiddenWidgets.indexOf(this), 1)
                                }
                            }
                        }
                    }
                });
                if (f.hiddenWidgets.length > 0) {
                    f.hiddenWidgets.sort(p);
                    if (f.__resizeInterval) {
                        clearInterval(f.__resizeInterval)
                    }
                    f.__resizeInterval = setInterval(function () {
                        var q = false;
                        var r = [];
                        a.each(f.hiddenWidgets, function (s, t) {
                            if (a.jqx.isHidden(this.widget)) {
                                q = true;
                                r.push(this)
                            } else {
                                this.callback(o)
                            }
                        });
                        f.hiddenWidgets = r;
                        if (!q) {
                            clearInterval(f.__resizeInterval)
                        }
                    }, 100)
                }
            };
            if (!this.resizeHandlers) {
                this.resizeHandlers = [];
                var j = a(window);
                if (j.on) {
                    j.on("resize.jqx", function (n) {
                        h(null, "resize")
                    });
                    j.on("orientationchange.jqx", function (n) {
                        h(null, "orientationchange")
                    });
                    j.on("orientationchanged.jqx", function (n) {
                        h(null, "orientationchange")
                    })
                } else {
                    j.bind("resize.jqx", function (n) {
                        h(null, "orientationchange")
                    });
                    j.bind("orientationchange.jqx", function (n) {
                        h(null, "orientationchange")
                    });
                    j.bind("orientationchanged.jqx", function (n) {
                        h(null, "orientationchange")
                    })
                }
            }
            if (k) {
                if (g === -1) {
                    this.resizeHandlers.push({id: d[0].id, widget: d, callback: m})
                }
            }
            if (a.jqx.isHidden(d) && k === true) {
                h(true)
            }
        }, html: function (c, d) {
            if (!a(c).on) {
                return a(c).html(d)
            }
            try {
                return jQuery.access(c, function (s) {
                    var f = c[0] || {}, m = 0, j = c.length;
                    if (s === undefined) {
                        return f.nodeType === 1 ? f.innerHTML.replace(rinlinejQuery, "") : undefined
                    }
                    var r = /<(?:script|style|link)/i, n = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video", h = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, p = /<([\w:]+)/, g = /<(?:script|object|embed|option|style)/i, k = new RegExp("<(?:" + n + ")[\\s/>]", "i"), q = /^\s+/, t = {
                        option: [1, "<select multiple='multiple'>", "</select>"],
                        legend: [1, "<fieldset>", "</fieldset>"],
                        thead: [1, "<table>", "</table>"],
                        tr: [2, "<table><tbody>", "</tbody></table>"],
                        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                        col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
                        area: [1, "<map>", "</map>"],
                        _default: [0, "", ""]
                    };
                    if (typeof s === "string" && !r.test(s) && (jQuery.support.htmlSerialize || !k.test(s)) && (jQuery.support.leadingWhitespace || !q.test(s)) && !t[(p.exec(s) || ["", ""])[1].toLowerCase()]) {
                        s = s.replace(h, "<$1></$2>");
                        try {
                            for (; m < j; m++) {
                                f = this[m] || {};
                                if (f.nodeType === 1) {
                                    jQuery.cleanData(f.getElementsByTagName("*"));
                                    f.innerHTML = s
                                }
                            }
                            f = 0
                        } catch (o) {
                        }
                    }
                    if (f) {
                        c.empty().append(s)
                    }
                }, null, d, arguments.length)
            } catch (b) {
                return a(c).html(d)
            }
        }, hasTransform: function (d) {
            var c = "";
            c = d.css("transform");
            if (c == "" || c == "none") {
                c = d.parents().css("transform");
                if (c == "" || c == "none") {
                    var b = a.jqx.utilities.getBrowser();
                    if (b.browser == "msie") {
                        c = d.css("-ms-transform");
                        if (c == "" || c == "none") {
                            c = d.parents().css("-ms-transform")
                        }
                    } else {
                        if (b.browser == "chrome") {
                            c = d.css("-webkit-transform");
                            if (c == "" || c == "none") {
                                c = d.parents().css("-webkit-transform")
                            }
                        } else {
                            if (b.browser == "opera") {
                                c = d.css("-o-transform");
                                if (c == "" || c == "none") {
                                    c = d.parents().css("-o-transform")
                                }
                            } else {
                                if (b.browser == "mozilla") {
                                    c = d.css("-moz-transform");
                                    if (c == "" || c == "none") {
                                        c = d.parents().css("-moz-transform")
                                    }
                                }
                            }
                        }
                    }
                } else {
                    return c != "" && c != "none"
                }
            }
            if (c == "" || c == "none") {
                c = a(document.body).css("transform")
            }
            return c != "" && c != "none" && c != null
        }, getBrowser: function () {
            var c = navigator.userAgent.toLowerCase();
            var b = /(chrome)[ \/]([\w.]+)/.exec(c) || /(webkit)[ \/]([\w.]+)/.exec(c) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(c) || /(msie) ([\w.]+)/.exec(c) || c.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(c) || [];
            var d = {browser: b[1] || "", version: b[2] || "0"};
            if (c.indexOf("rv:11.0") >= 0 && c.indexOf(".net4.0c") >= 0) {
                d.browser = "msie";
                d.version = "11";
                b[1] = "msie"
            }
            d[b[1]] = b[1];
            return d
        }
    });
    a.jqx.browser = a.jqx.utilities.getBrowser();
    a.jqx.isHidden = function (d) {
        try {
            var b = d[0].offsetWidth, e = d[0].offsetHeight;
            if (b === 0 || e === 0) {
                return true
            } else {
                return false
            }
        } catch (c) {
            return false
        }
    };
    a.jqx.ariaEnabled = true;
    a.jqx.aria = function (c, e, d) {
        if (!a.jqx.ariaEnabled) {
            return
        }
        if (e == undefined) {
            a.each(c.aria, function (g, h) {
                var k = !c.base ? c.host.attr(g) : c.base.host.attr(g);
                if (k != undefined && !a.isFunction(k)) {
                    var j = k;
                    switch (h.type) {
                        case"number":
                            j = Number(k);
                            if (isNaN(j)) {
                                j = k
                            }
                            break;
                        case"boolean":
                            j = k == "true" ? true : false;
                            break;
                        case"date":
                            j = new Date(k);
                            if (j == "Invalid Date" || isNaN(j)) {
                                j = k
                            }
                            break
                    }
                    c[h.name] = j
                } else {
                    var k = c[h.name];
                    if (a.isFunction(k)) {
                        k = c[h.name]()
                    }
                    if (k == undefined) {
                        k = ""
                    }
                    try {
                        !c.base ? c.host.attr(g, k.toString()) : c.base.host.attr(g, k.toString())
                    } catch (f) {
                    }
                }
            })
        } else {
            try {
                if (c.host) {
                    if (!c.base) {
                        if (c.host) {
                            if (c.element.setAttribute) {
                                c.element.setAttribute(e, d.toString())
                            } else {
                                c.host.attr(e, d.toString())
                            }
                        } else {
                            c.attr(e, d.toString())
                        }
                    } else {
                        if (c.base.host) {
                            c.base.host.attr(e, d.toString())
                        } else {
                            c.attr(e, d.toString())
                        }
                    }
                } else {
                    if (c.setAttribute) {
                        c.setAttribute(e, d.toString())
                    }
                }
            } catch (b) {
            }
        }
    };
    if (!Array.prototype.indexOf) {
        Array.prototype.indexOf = function (c) {
            var b = this.length;
            var d = Number(arguments[1]) || 0;
            d = (d < 0) ? Math.ceil(d) : Math.floor(d);
            if (d < 0) {
                d += b
            }
            for (; d < b; d++) {
                if (d in this && this[d] === c) {
                    return d
                }
            }
            return -1
        }
    }
    a.jqx.mobile = a.jqx.mobile || {};
    a.jqx.position = function (b) {
        var e = parseInt(b.pageX);
        var d = parseInt(b.pageY);
        if (a.jqx.mobile.isTouchDevice()) {
            var c = a.jqx.mobile.getTouches(b);
            var f = c[0];
            e = parseInt(f.pageX);
            d = parseInt(f.pageY)
        }
        return {left: e, top: d}
    };
    a.extend(a.jqx.mobile, {
        _touchListener: function (h, f) {
            var b = function (j, l) {
                var k = document.createEvent("MouseEvents");
                k.initMouseEvent(j, l.bubbles, l.cancelable, l.view, l.detail, l.screenX, l.screenY, l.clientX, l.clientY, l.ctrlKey, l.altKey, l.shiftKey, l.metaKey, l.button, l.relatedTarget);
                k._pageX = l.pageX;
                k._pageY = l.pageY;
                return k
            };
            var g = {mousedown: "touchstart", mouseup: "touchend", mousemove: "touchmove"};
            var d = b(g[h.type], h);
            h.target.dispatchEvent(d);
            var c = h.target["on" + g[h.type]];
            if (typeof c === "function") {
                c(h)
            }
        }, setMobileSimulator: function (c, e) {
            if (this.isTouchDevice()) {
                return
            }
            this.simulatetouches = true;
            if (e == false) {
                this.simulatetouches = false
            }
            var d = {mousedown: "touchstart", mouseup: "touchend", mousemove: "touchmove"};
            var b = this;
            if (window.addEventListener) {
                var f = function () {
                    for (var g in d) {
                        if (c.addEventListener) {
                            c.removeEventListener(g, b._touchListener);
                            c.addEventListener(g, b._touchListener, false)
                        }
                    }
                };
                if (a.jqx.browser.msie) {
                    f()
                } else {
                    f()
                }
            }
        }, isTouchDevice: function () {
            if (this.touchDevice != undefined) {
                return this.touchDevice
            }
            var b = "Browser CodeName: " + navigator.appCodeName + "";
            b += "Browser Name: " + navigator.appName + "";
            b += "Browser Version: " + navigator.appVersion + "";
            b += "Platform: " + navigator.platform + "";
            b += "User-agent header: " + navigator.userAgent + "";
            if (b.indexOf("Android") != -1) {
                return true
            }
            if (b.indexOf("IEMobile") != -1) {
                return true
            }
            if (b.indexOf("Windows Phone") != -1) {
                return true
            }
            if (b.indexOf("WPDesktop") != -1) {
                return true
            }
            if (b.indexOf("ZuneWP7") != -1) {
                return true
            }
            if (b.indexOf("BlackBerry") != -1 && b.indexOf("Mobile Safari") != -1) {
                return true
            }
            if (b.indexOf("ipod") != -1) {
                return true
            }
            if (b.indexOf("nokia") != -1 || b.indexOf("Nokia") != -1) {
                return true
            }
            if (b.indexOf("Chrome/17") != -1) {
                return false
            }
            if (b.indexOf("CrOS") != -1) {
                return false
            }
            if (b.indexOf("Opera") != -1 && b.indexOf("Mobi") == -1 && b.indexOf("Mini") == -1 && b.indexOf("Platform: Win") != -1) {
                return false
            }
            if (b.indexOf("Opera") != -1 && b.indexOf("Mobi") != -1 && b.indexOf("Opera Mobi") != -1) {
                return true
            }
            var c = {
                ios: "i(?:Pad|Phone|Pod)(?:.*)CPU(?: iPhone)? OS ",
                android: "(Android |HTC_|Silk/)",
                blackberry: "BlackBerry(?:.*)Version/",
                rimTablet: "RIM Tablet OS ",
                webos: "(?:webOS|hpwOS)/",
                bada: "Bada/"
            };
            try {
                if (this.touchDevice != undefined) {
                    return this.touchDevice
                }
                this.touchDevice = false;
                for (i in c) {
                    if (c.hasOwnProperty(i)) {
                        prefix = c[i];
                        match = b.match(new RegExp("(?:" + prefix + ")([^\\s;]+)"));
                        if (match) {
                            if (i.toString() == "blackberry") {
                                this.touchDevice = false;
                                return false
                            }
                            this.touchDevice = true;
                            return true
                        }
                    }
                }
                if (navigator.platform.toLowerCase().indexOf("win") != -1) {
                    this.touchDevice = false;
                    return false
                }
                if (("ontouchstart" in window) || window.DocumentTouch && document instanceof DocumentTouch) {
                    this.touchDevice = true
                }
                return this.touchDevice
            } catch (d) {
                this.touchDevice = false;
                return false
            }
        }, getLeftPos: function (b) {
            var c = b.offsetLeft;
            while ((b = b.offsetParent) != null) {
                if (b.tagName != "HTML") {
                    c += b.offsetLeft;
                    if (document.all) {
                        c += b.clientLeft
                    }
                }
            }
            return c
        }, getTopPos: function (c) {
            var e = c.offsetTop;
            var b = a(c).coord();
            while ((c = c.offsetParent) != null) {
                if (c.tagName != "HTML") {
                    e += (c.offsetTop - c.scrollTop);
                    if (document.all) {
                        e += c.clientTop
                    }
                }
            }
            var d = navigator.userAgent.toLowerCase();
            var f = (d.indexOf("windows phone") != -1 || d.indexOf("WPDesktop") != -1 || d.indexOf("ZuneWP7") != -1 || d.indexOf("msie 9") != -1 || d.indexOf("msie 11") != -1 || d.indexOf("msie 10") != -1) && d.indexOf("touch") != -1;
            if (f) {
                return b.top
            }
            if (this.isSafariMobileBrowser()) {
                if (this.isSafari4MobileBrowser() && this.isIPadSafariMobileBrowser()) {
                    return e
                }
                if (d.indexOf("version/7") != -1) {
                    return b.top
                }
                e = e + a(window).scrollTop()
            }
            return e
        }, isChromeMobileBrowser: function () {
            var c = navigator.userAgent.toLowerCase();
            var b = c.indexOf("android") != -1;
            return b
        }, isOperaMiniMobileBrowser: function () {
            var c = navigator.userAgent.toLowerCase();
            var b = c.indexOf("opera mini") != -1 || c.indexOf("opera mobi") != -1;
            return b
        }, isOperaMiniBrowser: function () {
            var c = navigator.userAgent.toLowerCase();
            var b = c.indexOf("opera mini") != -1;
            return b
        }, isNewSafariMobileBrowser: function () {
            var c = navigator.userAgent.toLowerCase();
            var b = c.indexOf("ipad") != -1 || c.indexOf("iphone") != -1 || c.indexOf("ipod") != -1;
            b = b && (c.indexOf("version/5") != -1);
            return b
        }, isSafari4MobileBrowser: function () {
            var c = navigator.userAgent.toLowerCase();
            var b = c.indexOf("ipad") != -1 || c.indexOf("iphone") != -1 || c.indexOf("ipod") != -1;
            b = b && (c.indexOf("version/4") != -1);
            return b
        }, isWindowsPhone: function () {
            var c = navigator.userAgent.toLowerCase();
            var b = (c.indexOf("windows phone") != -1 || c.indexOf("WPDesktop") != -1 || c.indexOf("ZuneWP7") != -1 || c.indexOf("msie 9") != -1 || c.indexOf("msie 11") != -1 || c.indexOf("msie 10") != -1) && c.indexOf("touch") != -1;
            return b
        }, isSafariMobileBrowser: function () {
            var c = navigator.userAgent.toLowerCase();
            var b = c.indexOf("ipad") != -1 || c.indexOf("iphone") != -1 || c.indexOf("ipod") != -1;
            return b
        }, isIPadSafariMobileBrowser: function () {
            var c = navigator.userAgent.toLowerCase();
            var b = c.indexOf("ipad") != -1;
            return b
        }, isMobileBrowser: function () {
            var c = navigator.userAgent.toLowerCase();
            var b = c.indexOf("ipad") != -1 || c.indexOf("iphone") != -1 || c.indexOf("android") != -1;
            return b
        }, getTouches: function (b) {
            if (b.originalEvent) {
                if (b.originalEvent.touches && b.originalEvent.touches.length) {
                    return b.originalEvent.touches
                } else {
                    if (b.originalEvent.changedTouches && b.originalEvent.changedTouches.length) {
                        return b.originalEvent.changedTouches
                    }
                }
            }
            if (!b.touches) {
                b.touches = [];
                b.touches[0] = b.originalEvent != undefined ? b.originalEvent : b;
                if (b.originalEvent != undefined && b.pageX) {
                    b.touches[0] = b
                }
                if (b.type == "mousemove") {
                    b.touches[0] = b
                }
            }
            return b.touches
        }, getTouchEventName: function (b) {
            if (this.isWindowsPhone()) {
                if (b.toLowerCase().indexOf("start") != -1) {
                    return "MSPointerDown"
                }
                if (b.toLowerCase().indexOf("move") != -1) {
                    return "MSPointerMove"
                }
                if (b.toLowerCase().indexOf("end") != -1) {
                    return "MSPointerUp"
                }
            } else {
                return b
            }
        }, dispatchMouseEvent: function (b, f, d) {
            if (this.simulatetouches) {
                return
            }
            var c = document.createEvent("MouseEvent");
            c.initMouseEvent(b, true, true, f.view, 1, f.screenX, f.screenY, f.clientX, f.clientY, false, false, false, false, 0, null);
            if (d != null) {
                d.dispatchEvent(c)
            }
        }, getRootNode: function (b) {
            while (b.nodeType !== 1) {
                b = b.parentNode
            }
            return b
        }, setTouchScroll: function (b, c) {
            if (!this.enableScrolling) {
                this.enableScrolling = []
            }
            this.enableScrolling[c] = b
        }, touchScroll: function (d, y, g, D, b, k) {
            if (d == null) {
                return
            }
            var B = this;
            var t = 0;
            var j = 0;
            var l = 0;
            var u = 0;
            var m = 0;
            var n = 0;
            if (!this.scrolling) {
                this.scrolling = []
            }
            this.scrolling[D] = false;
            var h = false;
            var q = a(d);
            var v = ["select", "input", "textarea"];
            var c = 0;
            var e = 0;
            if (!this.enableScrolling) {
                this.enableScrolling = []
            }
            this.enableScrolling[D] = true;
            var D = D;
            var C = this.getTouchEventName("touchstart") + ".touchScroll";
            var p = this.getTouchEventName("touchend") + ".touchScroll";
            var A = this.getTouchEventName("touchmove") + ".touchScroll";
            var c = function (E) {
                if (!B.enableScrolling[D]) {
                    return true
                }
                if (a.inArray(E.target.tagName.toLowerCase(), v) !== -1) {
                    return
                }
                var F = B.getTouches(E);
                var G = F[0];
                if (F.length == 1) {
                    B.dispatchMouseEvent("mousedown", G, B.getRootNode(G.target))
                }
                h = false;
                j = G.pageY;
                m = G.pageX;
                if (B.simulatetouches) {
                    j = G._pageY;
                    m = G._pageX
                }
                B.scrolling[D] = true;
                t = 0;
                u = 0;
                return true
            };
            if (q.on) {
                q.on(C, c)
            } else {
                q.bind(C, c)
            }
            var x = function (J) {
                if (!B.enableScrolling[D]) {
                    return true
                }
                if (!B.scrolling[D]) {
                    return true
                }
                var L = B.getTouches(J);
                if (L.length > 1) {
                    return true
                }
                var H = L[0].pageY;
                var I = L[0].pageX;
                if (B.simulatetouches) {
                    H = L[0]._pageY;
                    I = L[0]._pageX
                }
                var E = H - j;
                var F = I - m;
                e = H;
                touchHorizontalEnd = I;
                l = E - t;
                n = F - u;
                h = true;
                t = E;
                u = F;
                g(-n * 1, -l * 1, F, E, J);
                var G = b != null ? b[0].style.visibility != "hidden" : true;
                var K = k != null ? k[0].style.visibility != "hidden" : true;
                if (G || K) {
                    if ((n !== 0 && G) || (l !== 0 && K)) {
                        J.preventDefault();
                        J.stopPropagation();
                        if (J.preventManipulation) {
                            J.preventManipulation()
                        }
                        return false
                    }
                }
            };
            if (q.on) {
                q.on(A, x)
            } else {
                q.bind(A, x)
            }
            if (this.simulatetouches) {
                var o = a(window).on != undefined || a(window).bind;
                var z = function (E) {
                    B.scrolling[D] = false
                };
                a(window).on != undefined ? a(document).on("mouseup.touchScroll", z) : a(document).bind("mouseup.touchScroll", z);
                if (window.frameElement) {
                    if (window.top != null) {
                        var r = function (E) {
                            B.scrolling[D] = false
                        };
                        if (window.top.document) {
                            a(window.top.document).on ? a(window.top.document).on("mouseup", r) : a(window.top.document).bind("mouseup", r)
                        }
                    }
                }
                var s = a(document).on != undefined || a(document).bind;
                var w = function (E) {
                    if (!B.scrolling[D]) {
                        return true
                    }
                    B.scrolling[D] = false;
                    var G = B.getTouches(E)[0], F = B.getRootNode(G.target);
                    B.dispatchMouseEvent("mouseup", G, F);
                    B.dispatchMouseEvent("click", G, F)
                };
                a(document).on != undefined ? a(document).on("touchend", w) : a(document).bind("touchend", w)
            }
            var f = function (E) {
                if (!B.enableScrolling[D]) {
                    return true
                }
                var G = B.getTouches(E)[0];
                if (!B.scrolling[D]) {
                    return true
                }
                B.scrolling[D] = false;
                if (h) {
                    B.dispatchMouseEvent("mouseup", G, F)
                } else {
                    var G = B.getTouches(E)[0], F = B.getRootNode(G.target);
                    B.dispatchMouseEvent("mouseup", G, F);
                    B.dispatchMouseEvent("click", G, F);
                    return true
                }
            };
            q.on ? q.on(p + " touchcancel.touchScroll", f) : q.bind(p + " touchcancel.touchScroll", f)
        }
    });
    a.jqx.cookie = a.jqx.cookie || {};
    a.extend(a.jqx.cookie, {
        cookie: function (e, f, c) {
            if (arguments.length > 1 && String(f) !== "[object Object]") {
                c = jQuery.extend({}, c);
                if (f === null || f === undefined) {
                    c.expires = -1
                }
                if (typeof c.expires === "number") {
                    var h = c.expires, d = c.expires = new Date();
                    d.setDate(d.getDate() + h)
                }
                f = String(f);
                return (document.cookie = [encodeURIComponent(e), "=", c.raw ? f : encodeURIComponent(f), c.expires ? "; expires=" + c.expires.toUTCString() : "", c.path ? "; path=" + c.path : "", c.domain ? "; domain=" + c.domain : "", c.secure ? "; secure" : ""].join(""))
            }
            c = f || {};
            var b, g = c.raw ? function (j) {
                return j
            } : decodeURIComponent;
            return (b = new RegExp("(?:^|; )" + encodeURIComponent(e) + "=([^;]*)").exec(document.cookie)) ? g(b[1]) : null
        }
    });
    a.jqx.string = a.jqx.string || {};
    a.extend(a.jqx.string, {
        replace: function (f, d, e) {
            if (d === e) {
                return this
            }
            var b = f;
            var c = b.indexOf(d);
            while (c != -1) {
                b = b.replace(d, e);
                c = b.indexOf(d)
            }
            return b
        }, contains: function (b, c) {
            if (b == null || c == null) {
                return false
            }
            return b.indexOf(c) != -1
        }, containsIgnoreCase: function (b, c) {
            if (b == null || c == null) {
                return false
            }
            return b.toUpperCase().indexOf(c.toUpperCase()) != -1
        }, equals: function (b, c) {
            if (b == null || c == null) {
                return false
            }
            b = this.normalize(b);
            if (c.length == b.length) {
                return b.slice(0, c.length) == c
            }
            return false
        }, equalsIgnoreCase: function (b, c) {
            if (b == null || c == null) {
                return false
            }
            b = this.normalize(b);
            if (c.length == b.length) {
                return b.toUpperCase().slice(0, c.length) == c.toUpperCase()
            }
            return false
        }, startsWith: function (b, c) {
            if (b == null || c == null) {
                return false
            }
            return b.slice(0, c.length) == c
        }, startsWithIgnoreCase: function (b, c) {
            if (b == null || c == null) {
                return false
            }
            return b.toUpperCase().slice(0, c.length) == c.toUpperCase()
        }, normalize: function (b) {
            if (b.charCodeAt(b.length - 1) == 65279) {
                b = b.substring(0, b.length - 1)
            }
            return b
        }, endsWith: function (b, c) {
            if (b == null || c == null) {
                return false
            }
            b = this.normalize(b);
            return b.slice(-c.length) == c
        }, endsWithIgnoreCase: function (b, c) {
            if (b == null || c == null) {
                return false
            }
            b = this.normalize(b);
            return b.toUpperCase().slice(-c.length) == c.toUpperCase()
        }
    });
    a.extend(jQuery.easing, {
        easeOutBack: function (f, g, e, k, j, h) {
            if (h == undefined) {
                h = 1.70158
            }
            return k * ((g = g / j - 1) * g * ((h + 1) * g + h) + 1) + e
        }, easeInQuad: function (f, g, e, j, h) {
            return j * (g /= h) * g + e
        }, easeInOutCirc: function (f, g, e, j, h) {
            if ((g /= h / 2) < 1) {
                return -j / 2 * (Math.sqrt(1 - g * g) - 1) + e
            }
            return j / 2 * (Math.sqrt(1 - (g -= 2) * g) + 1) + e
        }, easeInOutSine: function (f, g, e, j, h) {
            return -j / 2 * (Math.cos(Math.PI * g / h) - 1) + e
        }, easeInCubic: function (f, g, e, j, h) {
            return j * (g /= h) * g * g + e
        }, easeOutCubic: function (f, g, e, j, h) {
            return j * ((g = g / h - 1) * g * g + 1) + e
        }, easeInOutCubic: function (f, g, e, j, h) {
            if ((g /= h / 2) < 1) {
                return j / 2 * g * g * g + e
            }
            return j / 2 * ((g -= 2) * g * g + 2) + e
        }, easeInSine: function (f, g, e, j, h) {
            return -j * Math.cos(g / h * (Math.PI / 2)) + j + e
        }, easeOutSine: function (f, g, e, j, h) {
            return j * Math.sin(g / h * (Math.PI / 2)) + e
        }, easeInOutSine: function (f, g, e, j, h) {
            return -j / 2 * (Math.cos(Math.PI * g / h) - 1) + e
        }
    })
})(jQuery);
(function (b) {
    b.extend(jQuery.event.special, {
        close: {noBubble: true},
        open: {noBubble: true},
        cellclick: {noBubble: true},
        rowclick: {noBubble: true},
        tabclick: {noBubble: true},
        selected: {noBubble: true},
        expanded: {noBubble: true},
        collapsed: {noBubble: true},
        valuechanged: {noBubble: true},
        expandedItem: {noBubble: true},
        collapsedItem: {noBubble: true},
        expandingItem: {noBubble: true},
        collapsingItem: {noBubble: true}
    });
    b.fn.extend({
        ischildof: function (f) {
            var d = b(this).parents().get();
            for (var c = 0; c < d.length; c++) {
                if (typeof f != "string") {
                    var e = d[c];
                    if (f !== undefined) {
                        if (e == f[0]) {
                            return true
                        }
                    }
                } else {
                    if (f !== undefined) {
                        if (b(d[c]).is(f)) {
                            return true
                        }
                    }
                }
            }
            return false
        }
    });
    b.fn.jqxProxy = function () {
        var d = b(this).data().jqxWidget;
        var c = Array.prototype.slice.call(arguments, 0);
        return b.jqx.jqxWidgetProxy(d.widgetName, d.element, c)
    };
    var a = this.originalVal = b.fn.val;
    b.fn.val = function (d) {
        if (typeof d == "undefined") {
            if (b(this).hasClass("jqx-widget")) {
                var c = b(this).data().jqxWidget;
                if (c && c.val) {
                    return c.val()
                }
            }
            return a.call(this)
        } else {
            if (b(this).hasClass("jqx-widget")) {
                var c = b(this).data().jqxWidget;
                if (c && c.val) {
                    if (arguments.length != 2) {
                        return c.val(d)
                    } else {
                        return c.val(d, arguments[1])
                    }
                }
            }
            return a.call(this, d)
        }
    };
    b.fn.coord = function (o) {
        var e, k, j = {top: 0, left: 0}, f = this[0], m = f && f.ownerDocument;
        if (!m) {
            return
        }
        e = m.documentElement;
        if (!jQuery.contains(e, f)) {
            return j
        }
        if (typeof f.getBoundingClientRect !== undefined) {
            j = f.getBoundingClientRect()
        }
        var d = function (p) {
            return jQuery.isWindow(p) ? p : p.nodeType === 9 ? p.defaultView || p.parentWindow : false
        };
        k = d(m);
        var h = 0;
        var c = 0;
        var g = navigator.userAgent.toLowerCase();
        var n = g.indexOf("ipad") != -1 || g.indexOf("iphone") != -1;
        if (n) {
            h = 2
        }
        if (true == o) {
            if (b(document.body).css("position") != "static") {
                var l = b(document.body).coord();
                h = -l.left;
                c = -l.top
            }
        }
        return {
            top: c + j.top + (k.pageYOffset || e.scrollTop) - (e.clientTop || 0),
            left: h + j.left + (k.pageXOffset || e.scrollLeft) - (e.clientLeft || 0)
        }
    }
})(jQuery);