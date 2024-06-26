(function() {
    function c() {}

    function g() {}

    function k(b, h, n) {
        this.init(b, [h], [n || (b && 1 < b.length ? b.slice(1) : b)])
    }

    function r() {}

    function t(b, h, n) {
        arguments.length && (this.parent = b, this.prev = h || 0, this.next = n || 0, this.jQinit(this.fold(J(), function(y, B) {
            return B.jQ.add(y)
        })))
    }

    function l(b, h, n, y) {
        function B() {
            ea = O;
            var G = L.selection ? L.selection.latex() : "";
            W.val(G);
            G && (W[0].select ? W[0].select() : document.selection && (G = W[0].createTextRange(), G.expand("textedit"), G.select()))
        }

        function F(G) {
            L.seek(J(G.target), G.pageX,
                G.pageY);
            if (L.prev !== fa.prev || L.parent !== fa.parent) ba = 0, L.selectFrom(fa);
            return !1
        }

        function H(G) {
            delete G.target;
            return F(G)
        }

        function D(G) {
            L.blink = Ka;
            L.selection || (y ? L.show() : ka.detach());
            b.unbind("mousemove", F);
            J(document).unbind("mousemove", H).unbind("mouseup", D)
        }

        function Q() {
            var G = W.val();
            "$" === G.slice(0, 1) && "$" === G.slice(-1) && (G = G.slice(1, -1));
            G = G.replace(/ /g, "#");
            L.writeLatex(G).show();
            W.val("")
        }

        function ha() {
            if (!oa) {
                var G = W.val();
                if (G) {
                    W.val("");
                    for (var sa = 0; sa < G.length; sa += 1) L.parent.textInput(G.charAt(sa))
                } else(L.selection ||
                    ea !== O) && B()
            }
        }
        var Z = b.contents().detach();
        n || b.addClass("mathquill-rendered-math");
        h.jQ = b.data("[[mathquill internal data]]", {
            block: h,
            revert: function() {
                b.empty().unbind(".mathquill").removeClass("mathquill-rendered-math mathquill-editable mathquill-textbox").append(Z)
            }
        });
        var L = h.cursor = new ta(h);
        h.renderLatex(Z.text());
        var ka = h.textarea = J('<span class="textarea"><textarea></textarea></span>'),
            W = ka.children(),
            ea;
        h.selectionChanged = function() {
            ea === O && (ea = setTimeout(B));
            Aa(b[0])
        };
        b.bind("selectstart.mathquill",
            function(G) {
                G.target !== W[0] && G.preventDefault();
                G.stopPropagation()
            });
        var fa = 0,
            Ka = L.blink,
            Ba, ba = 0;
        b.bind("mousedown.mathquill", function(G) {
            setTimeout(function() {
                W.focus()
            });
            L.blink = J.noop;
            L.seek(J(G.target), G.pageX, G.pageY);
            y || b.prepend(ka);
            ba = L.parent === fa.parent && L.prev === fa.prev ? ba + 1 : 1;
            clearTimeout(Ba);
            Ba = setTimeout(function() {
                ba = 0
            }, 500);
            if (3 === ba)
                for (ba = 0, L.clearSelection().appendTo(h); L.prev;) L.selectLeft();
            else 2 === ba ? L.selectWord() : (fa = new t(L.parent, L.prev, L.next), b.mousemove(F), J(document).mousemove(H));
            J(document).mouseup(D);
            return !1
        });
        if (y) {
            b.prepend(ka);
            b.addClass("mathquill-editable");
            n && b.addClass("mathquill-textbox");
            W.focus(function(G) {
                h.hidePlaceholder();
                L.parent || L.appendTo(h);
                L.parent.jQ.addClass("hasCursor");
                L.selection ? (L.selection.jQ.removeClass("blur"), setTimeout(h.selectionChanged)) : L.show();
                G.stopPropagation();
                J(this).trigger("focus.mathquill")
            }).blur(function(G) {
                L.hide().parent.blur();
                L.selection && L.selection.jQ.addClass("blur");
                h.showPlaceholder();
                G.stopPropagation();
                J(this).trigger("blur.mathquill")
            });
            b.bind("focus.mathquill blur.mathquill", function(G) {
                W.trigger(G)
            }).blur();
            b.bind("cut", function(G) {
                B();
                L.selection && setTimeout(function() {
                    L.deleteSelection();
                    L.redraw()
                });
                G.stopPropagation()
            }).bind("copy", function(G) {
                B();
                oa = !0;
                G.stopPropagation()
            }).bind("paste", function(G) {
                oa = !0;
                setTimeout(Q);
                G.stopPropagation()
            });
            var Ca, ua, Da, oa = !1;
            b.bind("keydown.mathquill", function(G) {
                Ca = G;
                ua = !0;
                !1 === L.parent.keydown(G) && G.preventDefault()
            }).bind("keypress.mathquill", function(G) {
                if (ua) ua = !1;
                else {
                    if (Da !== G.which) return;
                    L.parent.keydown(Ca)
                }
                Da = G.which;
                ea !== O && clearTimeout(ea);
                oa = !1;
                G = navigator.userAgent || navigator.vendor || window.opera;
                "iOS" === (/android/i.test(G) ? "Android" : "1" === readCookie("sy.probablyIPad") || /iPad|iPhone|iPod/.test(G) && !window.MSStream ? "iOS" : "unknown") ? setTimeout(ha, 100): setTimeout(ha)
            })
        } else {
            b.bind("cut paste", !1).bind("copy", B).prepend('<span class="selectable"></span>');
            W.blur(function() {
                L.clearSelection();
                setTimeout(G)
            });

            function G() {
                ka.detach()
            }
        }
    }

    function q() {}

    function z(b) {
        this.init("$");
        this.firstChild.cursor =
            b;
        this.firstChild.textInput = function(h) {
            this.skipTextInput || ("$" !== h || b.parent !== this ? b.write(h) : this.isEmpty() ? b.insertAfter(this.parent).backspace().insertNew(new u("\\$", "$")).show() : b.next ? b.prev ? b.write(h) : b.insertBefore(this.parent) : b.insertAfter(this.parent))
        }
    }

    function d() {}

    function f(b, h) {
        h.prototype = b.prototype;
        return h
    }

    function a(b) {
        var h = Array.prototype.slice.call(arguments, 1);
        return f(b, function() {
            b.apply(this, Array.prototype.concat.apply(h, arguments))
        })
    }

    function m(b, h, n) {
        this.init(b,
            [h], O, n)
    }

    function v(b, h, n) {
        this.init(b, ['<span class="diacritic"><span class="diacritic-char">' + h + "&nbsp;</span></span>", "<span></span>"], O, n)
    }

    function x(b, h, n, y, B) {
        this.stretchFactor = y;
        this.init(b, ['<span class="diacritic"><span class="' + h + '">' + n + "&nbsp;</span></span>", "<span></span>"], O, B)
    }

    function w(b, h, n, y) {
        this.init(b, [h], [n], y)
    }

    function E(b) {
        this.init("\\frac", O, O, b);
        this.jQ.append('<span style="display:inline-block;width:0">&nbsp;</span>')
    }

    function C() {
        E.apply(this, arguments)
    }

    function A(b) {
        this.init("\\sqrt",
            O, O, b)
    }

    function N(b) {
        this.init("\\longdivision", O, O, b)
    }

    function V(b) {
        A.call(this, b);
        this.jQ = this.firstChild.jQ.detach().add(this.jQ)
    }

    function K(b, h, n, y, B) {
        this.init("\\left" + n, ['<span class="block"><span class="paren">' + b + '</span><span class="block"></span><span class="paren">' + h + "</span></span>"], [b, h], B);
        this.end = "\\right" + y
    }

    function M(b, h, n, y, B) {
        K.apply(this, arguments)
    }

    function R(b, h, n) {
        K.call(this, b, h, b, h, n)
    }

    function X(b, h, n) {
        M.call(this, b, h, b, h, n)
    }

    function S(b) {
        R.call(this, "|", "|", b)
    }

    function P(b) {
        b instanceof
        t ? this.replacedText = b.remove().jQ.text() : "string" === typeof b && (this.replacedText = b);
        this.init()
    }

    function ca() {}

    function Y(b, h) {
        function n() {
            P.apply(this, arguments)
        }
        p = n.prototype = new P;
        p.cmd = b;
        p.html_template = [h];
        return n
    }

    function pa(b) {
        this.init("\\");
        b && (this.replacedFragment = b.detach(), this.isEmpty = function() {
            return !1
        })
    }

    function va(b) {
        this.init("\\twostack", O, O, b);
        this.jQ.wrapInner('<span class="array"></span>');
        this.blockjQ = this.jQ.children()
    }

    function qa(b) {
        this.init("\\binom", O, O, b);
        this.jQ.wrapInner('<span class="array"></span>');
        this.blockjQ = this.jQ.children();
        this.bracketjQs = J('<span class="paren">(</span>').prependTo(this.jQ).add(J('<span class="paren">)</span>').appendTo(this.jQ))
    }

    function Ea() {
        qa.apply(this, arguments)
    }

    function Fa(b) {
        this.init("\\vector", O, O, b)
    }

    function wa(b, h, n, y) {
        this.rows = n;
        this.cols = y;
        this.init("\\matrix", O, O, b);
        this.envName = "matrix"
    }

    function Ga() {}

    function ia(b, h, n) {
        function y(B, F, H, D) {
            this.rows = H;
            this.cols = D;
            this.init("\\" + b, O, O, B);
            this.envName = b;
            B = this.blockjQ = this.tablejQ;
            this.bracketjQs = B.prev().add(B.next())
        }
        p = y.prototype = new Ga;
        p.html_template = ['<span class="block"><span class="paren">' + h + '</span><table class="matrix"></table><span class="paren">' + n + "</span></span>"];
        p.initBlocks = function(B) {
            this.tablejQ = this.jQ.find("table");
            this.initMatrix(B)
        };
        p.redraw = K.prototype.redraw;
        e[b] = y
    }

    function T(b, h) {
        k.call(this, b, "<var>" + (h || b) + "</var>")
    }

    function u(b, h) {
        k.call(this, b, "<span>" + (h || b) + "</span>")
    }

    function xa(b, h) {
        k.call(this, b, "<span>" + (h || b) + "</span>")
    }

    function Ha() {
        u.call(this, "\\:", " ")
    }

    function ja(b, h) {
        k.call(this,
            b, '<span class="nonSymbola">' + (h || b) + "</span>")
    }

    function I(b, h, n) {
        k.call(this, b, '<span class="binary-operator">' + h + "</span>", n)
    }

    function la(b, h) {
        u.apply(this, arguments)
    }

    function aa(b, h) {
        k.call(this, b, "<big>" + h + "</big>")
    }

    function ra(b, h) {
        k.call(this, "\\" + h + " ", "<span>" + h + "</span>")
    }

    function ta(b) {
        this.parent = this.root = b;
        var h = this.jQ = this._jQ = J('<span class="cursor">&#8203;</span>');
        this.blink = function() {
            h.toggleClass("blink")
        }
    }

    function ma(b, h, n) {
        t.apply(this, arguments)
    }
    var J = jQuery,
        O, na = Math.min,
        ya = Math.max;
    var p = c.prototype;
    p.prev = 0;
    p.next = 0;
    p.parent = 0;
    p.firstChild = 0;
    p.lastChild = 0;
    p.eachChild = function(b) {
        for (var h = this.firstChild; h && !1 !== b.call(this, h); h = h.next);
        return this
    };
    p.foldChildren = function(b, h) {
        this.eachChild(function(n) {
            b = h.call(this, b, n)
        });
        return b
    };
    p.keydown = function(b) {
        return this.parent.keydown(b)
    };
    p.textInput = function(b) {
        return this.parent.textInput(b)
    };
    p = g.prototype = new c;
    p.init = function(b, h, n, y) {
        b && (this.cmd = b);
        h && (this.html_template = h);
        n && (this.text_template = n);
        this.jQ =
            J(this.html_template[0]).data("[[mathquill internal data]]", {
                cmd: this
            });
        this.initBlocks(y)
    };
    p.initBlocks = function(b) {
        if (1 === this.html_template.length) this.firstChild = this.lastChild = this.jQ.data("[[mathquill internal data]]").block = b && b.blockify() || new r, this.firstChild.parent = this, this.firstChild.jQ = this.jQ.append(this.firstChild.jQ);
        else {
            var h, n = this.html_template.length;
            this.firstChild = b = h = b && b.blockify() || new r;
            b.parent = this;
            b.jQ = J(this.html_template[1]).data("[[mathquill internal data]]", {
                block: b
            }).append(b.jQ).appendTo(this.jQ);
            b.blur();
            for (var y = 2; y < n; y += 1) b = new r, b.parent = this, b.prev = h, h = h.next = b, b.jQ = J(this.html_template[y]).data("[[mathquill internal data]]", {
                block: b
            }).appendTo(this.jQ), b.blur();
            this.lastChild = b
        }
    };
    p.latex = function() {
        return this.foldChildren(this.cmd, function(b, h) {
            return b + "{" + (h.latex() || " ") + "}"
        })
    };
    p.text_template = [""];
    p.text = function() {
        var b = 0;
        return this.foldChildren(this.text_template[b], function(h, n) {
            b += 1;
            var y = n.text();
            return h && "(" === this.text_template[b] && "(" === y[0] && ")" === y.slice(-1) ? h + y.slice(1,
                -1) + this.text_template[b] : h + n.text() + (this.text_template[b] || "")
        })
    };
    p.insertAt = function(b) {
        this.parent = b.parent;
        this.next = b.next;
        (this.prev = b.prev) ? b.prev.next = this: b.parent.firstChild = this;
        b.next ? b.next.prev = this : b.parent.lastChild = this;
        b.prev = this;
        this.jQ.insertBefore(b.jQ);
        this.respace();
        this.next && this.next.respace();
        this.prev && this.prev.respace();
        this.placeCursor(b);
        b.redraw();
        if ("\\matrixmid " == this.cmd) {
            for (b = this.parent; b && "\\left(" != b.cmd;) b = b.parent;
            b && (b = b.blockjQ.outerHeight() / +b.blockjQ.css("fontSize").slice(0,
                -2), da(this.jQ, na(1 + .2 * (b - 1), 1.2), .98 * b), this.jQ.addClass("paren"))
        }
    };
    p.respace = J.noop;
    p.placeCursor = function(b) {
        b.appendTo(this.foldChildren(this.firstChild, function(h, n) {
            return h.isEmpty() ? h : n
        }))
    };
    p.precedence = 0;
    p.isEmpty = function() {
        return this.foldChildren(!0, function(b, h) {
            return b && h.isEmpty()
        })
    };
    p.remove = function() {
        var b = this.prev,
            h = this.next,
            n = this.parent;
        b ? b.next = h : n.firstChild = h;
        h ? h.prev = b : n.lastChild = b;
        this.jQ.remove();
        return this
    };
    p = k.prototype = new g;
    p.initBlocks = J.noop;
    p.latex = function() {
        return this.cmd
    };
    p.text = function() {
        return this.text_template
    };
    p.placeCursor = J.noop;
    p.isEmpty = function() {
        return !0
    };
    p = r.prototype = new c;
    p.latex = function() {
        return this.foldChildren("", function(b, h) {
            return b + h.latex()
        })
    };
    p.text = function() {
        return this.firstChild === this.lastChild ? this.firstChild.text() : this.foldChildren("(", function(b, h) {
            return b + h.text()
        }) + ")"
    };
    p.isEmpty = function() {
        return 0 === this.firstChild && 0 === this.lastChild
    };
    p.focus = function() {
        this.jQ.addClass("hasCursor");
        this.isEmpty() && this.jQ.removeClass("empty");
        return this
    };
    p.blur = function() {
        this.jQ.removeClass("hasCursor");
        this.isEmpty() && this.jQ.addClass("empty");
        return this
    };
    p = t.prototype;
    p.remove = g.prototype.remove;
    p.jQinit = function(b) {
        this.jQ = b
    };
    p.each = function(b) {
        for (var h = this.prev.next || this.parent.firstChild; h !== this.next && !1 !== b.call(this, h); h = h.next);
        return this
    };
    p.fold = function(b, h) {
        this.each(function(n) {
            b = h.call(this, b, n)
        });
        return b
    };
    p.latex = function() {
        return this.fold("", function(b, h) {
            return b + h.latex()
        })
    };
    p.blockify = function() {
        var b = this.prev,
            h = this.next,
            n = this.parent,
            y = new r,
            B = y.firstChild = b.next || n.firstChild,
            F = y.lastChild = h.prev || n.lastChild;
        b ? b.next = h : n.firstChild = h;
        h ? h.prev = b : n.lastChild = b;
        B.prev = this.prev = 0;
        F.next = this.next = 0;
        this.parent = y;
        this.each(function(H) {
            H.parent = y
        });
        y.jQ = this.jQ;
        return y
    };
    p = q.prototype = new r;
    p.latex = function() {
        return r.prototype.latex.call(this).replace(/(\\[a-z]+) (?![a-z])/ig, "$1")
    };
    p.text = function() {
        return this.foldChildren("", function(b, h) {
            return b + h.text()
        })
    };
    p.renderLatex = function(b) {
        this.jQ.children().slice(1).remove();
        this.firstChild = this.lastChild = 0;
        this.cursor.appendTo(this).writeLatex(b);
        this.blur()
    };
    p.setPlaceholder = function(b) {
        this.placeholder = b
    };
    p.showPlaceholder = function() {
        this.placeholder && this.isEmpty() && (this.cursor.writeLatex(this.placeholder), this.blur(), this.firstChild = this.lastChild = 0, this.jQ.addClass("placeholder"))
    };
    p.hidePlaceholder = function() {
        this.placeholder && this.isEmpty() && (this.jQ.removeClass("placeholder").children().slice(1).remove(), this.cursor.appendTo(this))
    };
    p.keydown = function(b) {
        b.ctrlKey =
            b.ctrlKey || b.metaKey;
        switch (b.originalEvent && b.originalEvent.keyIdentifier || b.which) {
            case 8:
            case "Backspace":
            case "U+0008":
                if (b.ctrlKey)
                    for (; this.cursor.prev || this.cursor.selection;) this.cursor.backspace();
                else this.cursor.backspace();
                break;
            case 27:
            case "Esc":
            case "U+001B":
            case 9:
            case "Tab":
            case "U+0009":
                if (b.ctrlKey) break;
                var h = this.cursor.parent;
                if (b.shiftKey) {
                    if (h === this.cursor.root) return this.skipTextInput = !0;
                    h.prev ? this.cursor.appendTo(h.prev) : this.cursor.insertBefore(h.parent)
                } else {
                    if (h ===
                        this.cursor.root) return this.skipTextInput = !0;
                    h.next ? this.cursor.prependTo(h.next) : this.cursor.insertAfter(h.parent)
                }
                this.cursor.clearSelection();
                break;
            case 13:
            case "Enter":
                return this.skipTextInput = !0;
            case 35:
            case "End":
                if (b.shiftKey)
                    for (; this.cursor.next || b.ctrlKey && this.cursor.parent !== this;) this.cursor.selectRight();
                else this.cursor.clearSelection().appendTo(b.ctrlKey ? this : this.cursor.parent);
                break;
            case 36:
            case "Home":
                if (b.shiftKey)
                    for (; this.cursor.prev || b.ctrlKey && this.cursor.parent !== this;) this.cursor.selectLeft();
                else this.cursor.clearSelection().prependTo(b.ctrlKey ? this : this.cursor.parent);
                break;
            case 37:
            case "Left":
                if (b.ctrlKey && this.cursor.prev) {
                    for (h = b.shiftKey ? "selectLeft" : "hopLeft"; this.cursor.prev && 0 !== this.cursor.prev.precedence;) this.cursor[h]();
                    for (; this.cursor.prev && 0 === this.cursor.prev.precedence;) this.cursor[h]();
                    b.shiftKey || this.cursor.show();
                    break
                }
                b.shiftKey ? this.cursor.selectLeft() : this.cursor.moveLeft();
                break;
            case 38:
            case "Up":
                if (b.ctrlKey) break;
                if (b.shiftKey)
                    if (this.cursor.prev)
                        for (; this.cursor.prev;) this.cursor.selectLeft();
                    else this.cursor.selectLeft();
                else this.cursor.parent.prev ? this.cursor.clearSelection().appendTo(this.cursor.parent.prev) : this.cursor.prev ? this.cursor.clearSelection().prependTo(this.cursor.parent) : this.cursor.parent !== this && this.cursor.clearSelection().insertBefore(this.cursor.parent.parent);
                break;
            case 39:
            case "Right":
                if (b.ctrlKey && this.cursor.next) {
                    for (h = b.shiftKey ? "selectRight" : "hopRight"; this.cursor.next && 0 === this.cursor.next.precedence;) this.cursor[h]();
                    for (; this.cursor.next && 0 !== this.cursor.next.precedence;) this.cursor[h]();
                    b.shiftKey || this.cursor.show();
                    break
                }
                b.shiftKey ? this.cursor.selectRight() : this.cursor.moveRight();
                break;
            case 40:
            case "Down":
                if (b.ctrlKey) break;
                if (b.shiftKey)
                    if (this.cursor.next)
                        for (; this.cursor.next;) this.cursor.selectRight();
                    else this.cursor.selectRight();
                else this.cursor.parent.next ? this.cursor.clearSelection().prependTo(this.cursor.parent.next) : this.cursor.next ? this.cursor.clearSelection().appendTo(this.cursor.parent) : this.cursor.parent !== this && this.cursor.clearSelection().insertAfter(this.cursor.parent.parent);
                break;
            case 46:
            case "Del":
            case "U+007F":
                if (b.ctrlKey)
                    for (; this.cursor.next || this.cursor.selection;) this.cursor.deleteForward();
                else this.cursor.deleteForward();
                break;
            case 65:
            case "A":
            case "U+0041":
                if (b.ctrlKey && !b.shiftKey && !b.altKey) {
                    if (this !== this.cursor.root) return this.parent.keydown(b);
                    for (this.cursor.clearSelection().appendTo(this); this.cursor.prev;) this.cursor.selectLeft();
                    break
                }
            default:
                return this.skipTextInput = !1, !0
        }
        this.skipTextInput = !0;
        return !1
    };
    p.textInput = function(b) {
        this.skipTextInput ||
            this.cursor.write(b)
    };
    p = z.prototype = new g;
    p.html_template = ['<span class="mathquill-rendered-math"></span>'];
    p.initBlocks = function() {
        this.firstChild = this.lastChild = this.jQ.data("[[mathquill internal data]]").block = new q;
        this.firstChild.parent = this;
        this.firstChild.jQ = this.jQ
    };
    p.latex = function() {
        return "$" + this.firstChild.latex() + "$"
    };
    p = d.prototype = new r;
    p.renderLatex = function(b) {
        var h = this.cursor;
        this.jQ.children().slice(1).remove();
        this.firstChild = this.lastChild = 0;
        h.show().appendTo(this);
        b = b.match(/(?:\\\$|[^$])+|\$(?:\\\$|[^$])*\$|\$(?:\\\$|[^$])*$/g) ||
            "";
        for (var n = 0; n < b.length; n += 1) {
            var y = b[n];
            if ("$" === y[0]) {
                y = "$" === y[-1 + y.length] && "\\" !== y[-2 + y.length] ? y.slice(1, -1) : y.slice(1);
                var B = new z(h);
                h.insertNew(B);
                B.firstChild.renderLatex(y);
                h.show().insertAfter(B)
            } else
                for (B = 0; B < y.length; B += 1) this.cursor.insertNew(new u(y[B]))
        }
    };
    p.keydown = q.prototype.keydown;
    p.textInput = function(b) {
        this.skipTextInput || (this.cursor.deleteSelection(), "$" === b ? this.cursor.insertNew(new z(this.cursor)) : this.cursor.insertNew(new u(b)))
    };
    var U = {},
        e = {},
        Aa = J.noop,
        Ia = document.createElement("div").style,
        La = {
            transform: 1,
            WebkitTransform: 1,
            MozTransform: 1,
            OTransform: 1,
            msTransform: 1
        },
        za;
    for (za in La)
        if (za in Ia) {
            var Ja = za;
            break
        } if (Ja) var da = function(b, h, n) {
        b.css(Ja, "scale(" + h + "," + n + ")")
    };
    else "filter" in Ia ? (Aa = function(b) {
        b.className = b.className
    }, da = function(b, h, n) {
        function y() {
            b.css("marginRight", (1 + D.width() * (H - 1)) / H + "px")
        }
        var B = n > h ? "M11=" : "M22=",
            F = ya(h, n),
            H = na(h, n);
        H /= 1 + (F - 1) / 2;
        0 === b.children().length && b.wrapInner("<span></span>");
        b.addClass("matrixed").css({
            fontSize: F + "em",
            marginTop: "-.175em"
        });
        var D =
            b.children().css({
                filter: "progid:DXImageTransform.Microsoft.Matrix(" + B + H + ",SizingMethod='auto expand')"
            });
        y();
        var Q = setInterval(y);
        J(window).load(function() {
            clearTimeout(Q);
            y()
        })
    }) : da = function(b, h, n) {
        b.css("fontSize", ya(h, n) + "em")
    };
    f(g, m);
    e.mathrm = a(m, "\\mathrm", '<span class="roman font"></span>');
    e.mathit = a(m, "\\mathit", '<i class="font"></i>');
    e.mathbf = a(m, "\\mathbf", '<b class="font"></b>');
    e.mathsf = a(m, "\\mathsf", '<span class="sans-serif font"></span>');
    e.mathtt = a(m, "\\mathtt", '<span class="monospace font"></span>');
    e.underline = a(m, "\\underline", '<span class="underline"></span>');
    p = v.prototype = new g;
    p.redraw = p._redraw = function() {
        var b = !this.firstChild.isEmpty();
        this.firstChild.eachChild(function(y) {
            return b = b && y.cmd in {
                a: 1,
                c: 1,
                e: 1,
                g: 1,
                m: 1,
                n: 1,
                o: 1,
                p: 1,
                q: 1,
                r: 1,
                s: 1,
                u: 1,
                v: 1,
                w: 1,
                x: 1,
                y: 1,
                z: 1
            }
        });
        this.jQ.children(":first").toggleClass("lowercase", b);
        var h = !b && this.firstChild.firstChild === this.lastChild.lastChild && "t" === this.firstChild.firstChild.cmd;
        this.jQ.children(":first").toggleClass("only-lowercase-t", h);
        if (b) n = !0;
        else {
            var n = !0;
            this.firstChild.eachChild(function(y) {
                return n = n && y instanceof k && !(y instanceof aa)
            })
        }
        this.jQ.toggleClass("block", !n)
    };
    J.browser.webkit && (p.redraw = function() {
        this._redraw();
        this.webkitForceRedrawToggle = !this.webkitForceRedrawToggle;
        this.jQ.children(":first").css("display", this.webkitForceRedrawToggle ? "inline-block" : "")
    });
    e.grave = a(v, "\\grave", "&#768;");
    e.acute = a(v, "\\acute", "&#769;");
    e.hat = e.circumflex = a(v, "\\hat", "&#770;");
    e.tilde = a(v, "\\tilde", "&#771;");
    e.bar = a(v, "\\bar", "&#773;");
    e.breve = a(v, "\\breve", "&#774;");
    e.dot = a(v, "\\dot", "&#775;");
    e.ddot = a(v, "\\ddot", "&#776;");
    e.check = e.caron = a(v, "\\ddot", "&#780;");
    e.dddot = a(v, "\\dddot", "&#8411;");
    e.ddddot = a(v, "\\ddddot", "&#8412;");
    e.vec = a(v, "\\vec", "&#8407;");
    e.overline = f(v, function(b) {
        this.init("\\overline", ['<span class="diacritic"><span class="overline"></span></span>'], O, b)
    });
    p = x.prototype = new v;
    p.redraw = function() {
        this._redraw();
        var b = ya(1, this.stretchFactor * this.jQ.innerWidth() / +this.jQ.css("fontSize").slice(0, -2));
        da(this.jQ.children(":first"),
            b, 1.2)
    };
    e.widehat = a(x, "\\widehat", "widehat", "&#770;", 2.95);
    e.overleftarrow = a(x, "\\overleftarrow", "overarrow", "&#8406;", 2);
    e.overrightarrow = a(x, "\\overrightarrow", "overarrow", "&#8407;", 2);
    e.overarc = a(x, "\\overarc", "overarc", "&#x25E0;", 1.5);
    p = w.prototype = new g;
    p.latex = function() {
        var b = this.firstChild.latex();
        return 1 === b.length ? this.cmd + b : this.cmd + "{" + (b || " ") + "}"
    };
    p.redraw = function() {
        this.prev && this.prev.respace();
        this.prev instanceof w || (this.respace(), !this.next || this.next instanceof w || this.next.respace())
    };
    p.respace = function() {
        "\\int " === this.prev.cmd || this.prev instanceof w && this.prev.cmd != this.cmd && this.prev.prev && "\\int " === this.prev.prev.cmd ? this.limit || (this.limit = !0, this.jQ.addClass("limit")) : this.limit && (this.limit = !1, this.jQ.removeClass("limit"));
        if (this.respaced = this.prev instanceof w && this.prev.cmd != this.cmd && !this.prev.respaced) {
            var b = +this.jQ.css("fontSize").slice(0, -2),
                h = this.prev.jQ.outerWidth();
            thisWidth = this.jQ.outerWidth();
            "_" === this.cmd && "^" === this.prev.cmd && "\\left[" === this.prev.prev.cmd ?
                this.jQ.css({
                    left: (this.limit && "_" === this.cmd ? -.25 : 0) - h / b + "em",
                    marginRight: "",
                    verticalAlign: "-0.8em"
                }) : this.jQ.css({
                    left: (this.limit && "_" === this.cmd ? -.25 : 0) - h / b + "em",
                    marginRight: .1 - na(thisWidth, h) / b + "em"
                })
        } else "\\left[" === this.prev.cmd && "_" === this.cmd ? this.jQ.css({
            marginRight: "",
            verticalAlign: "-0.8em"
        }) : this.limit && "_" === this.cmd ? this.jQ.css({
            left: "-.25em",
            marginRight: ""
        }) : this.jQ.css({
            left: "",
            marginRight: ""
        });
        this.prev instanceof aa && (this.precedence = this.prev.precedence);
        this.respaced && this.prev.prev instanceof
        aa ? this.precedence = this.prev.prev.precedence : delete this.precedence;
        this.next instanceof w && this.next.respace();
        return this
    };
    e.subscript = e._ = f(w, function(b) {
        this.init("_", ["<sub></sub>"], ["_"], b)
    });
    e.superscript = e.supscript = e["^"] = f(w, function(b) {
        this.init("^", ["<sup></sup>"], ["**"], b)
    });
    p = E.prototype = new g;
    p.html_template = ['<span class="fraction"></span>', '<span class="numerator"></span>', '<span class="denominator"></span>'];
    p.text_template = ["(", "/", ")"];
    e.frac = e.dfrac = e.cfrac = e.fraction = E;
    p = C.prototype =
        new E;
    p.placeCursor = function(b) {
        if (this.firstChild.isEmpty()) {
            for (var h = this.prev; h && 0 === h.precedence && "\\int " != h.cmd && "\\lim " != h.cmd && "\\sum " != h.cmd && "," != h.cmd && "^" != h.cmd && "_" != h.cmd;) h = h.prev;
            h !== this.prev ? (h = (new t(this.parent, h, this)).blockify(), h.jQ = this.firstChild.jQ.empty().removeClass("empty").append(h.jQ).data("[[mathquill internal data]]", {
                block: h
            }), h.next = this.lastChild, h.parent = this, this.firstChild = this.lastChild.prev = h, b.appendTo(this.lastChild)) : b.appendTo(this.firstChild)
        } else b.appendTo(this.lastChild)
    };
    e.over = U["/"] = C;
    p = A.prototype = new g;
    p.html_template = ['<span class="block"><span class="sqrt-prefix">&radic;</span></span>', '<span class="sqrt-stem"></span>'];
    p.text_template = ["sqrt(", ")"];
    p.redraw = function() {
        var b = this.lastChild.jQ;
        da(b.prev(), 1, b.innerHeight() / +b.css("fontSize").slice(0, -2) - .1)
    };
    e.sqrt = e["\u221a"] = A;
    p = N.prototype = new g;
    p.html_template = ['<span class="block"><span class="sqrt-prefix longdivision">|</span></span>', '<span class="sqrt-stem"></span>'];
    p.text_template = ["longdivision(",
        ")"
    ];
    e.longdivision = N;
    p = V.prototype = new A;
    p.html_template = ['<span class="block"><span class="sqrt-prefix">&radic;</span></span>', '<sup class="nthroot"></sup>', '<span class="sqrt-stem"></span>'];
    p.text_template = ["sqrt[", "](", ")"];
    p.latex = function() {
        return "\\sqrt[" + this.firstChild.latex() + "]{" + this.lastChild.latex() + "}"
    };
    e.nthroot = V;
    p = K.prototype = new g;
    p.initBlocks = function(b) {
        this.firstChild = this.lastChild = b && b.blockify() || new r;
        this.firstChild.parent = this;
        this.firstChild.jQ = this.jQ.children(":eq(1)").data("[[mathquill internal data]]", {
            block: this.firstChild
        }).append(this.firstChild.jQ);
        b = this.blockjQ = this.firstChild.jQ;
        this.bracketjQs = b.prev().add(b.next())
    };
    p.latex = function() {
        return this.cmd + this.firstChild.latex() + this.end
    };
    p.redraw = function() {
        var b = this.blockjQ.outerHeight() / +this.blockjQ.css("fontSize").slice(0, -2);
        da(this.bracketjQs, na(1 + .2 * (b - 1), 1.2), 1.05 * b)
    };
    e.lbrace = U["{"] = f(K, function(b) {
        K.call(this, "{", "}", "\\{", "\\}", b)
    });
    e.langle = e.lang = f(K, function(b) {
        K.call(this, "&lang;", "&rang;", "\\langle ", "\\rangle ", b)
    });
    p = M.prototype =
        new K;
    p.placeCursor = function(b) {
        !this.next && this.parent.parent && this.parent.parent.end === this.end && this.firstChild.isEmpty() ? b.backspace().insertAfter(this.parent.parent) : (this.firstChild.blur(), this.redraw())
    };
    e.rbrace = U["}"] = f(M, function(b) {
        M.call(this, "{", "}", "\\{", "\\}", b)
    });
    e.rangle = e.rang = f(M, function(b) {
        M.call(this, "&lang;", "&rang;", "\\langle ", "\\rangle ", b)
    });
    R.prototype = K.prototype;
    e.lparen = U["("] = f(R, function(b) {
        R.call(this, "(", ")", b)
    });
    e.lbrack = e.lbracket = U["["] = f(R, function(b) {
        R.call(this,
            "[", "]", b)
    });
    X.prototype = M.prototype;
    e.rparen = U[")"] = f(X, function(b) {
        X.call(this, "(", ")", b)
    });
    e.rbrack = e.rbracket = U["]"] = f(X, function(b) {
        X.call(this, "[", "]", b)
    });
    p = S.prototype = new R;
    p.placeCursor = function(b) {
        !this.next && this.parent.parent && this.parent.parent.end === this.end && this.firstChild.isEmpty() ? b.backspace().insertAfter(this.parent.parent) : b.appendTo(this.firstChild)
    };
    e.lpipe = e.rpipe = U["|"] = S;
    p = P.prototype = new g;
    p.cmd = "\\text";
    p.html_template = ['<span class="text"></span>'];
    p.text_template = ['"',
        '"'
    ];
    p.precedence = .25;
    p.initBlocks = function() {
        this.firstChild = this.lastChild = this.jQ.data("[[mathquill internal data]]").block = new ca;
        this.firstChild.parent = this;
        this.firstChild.jQ = this.jQ.append(this.firstChild.jQ)
    };
    p.placeCursor = function(b) {
        (this.cursor = b).appendTo(this.firstChild);
        if (this.replacedText)
            for (b = 0; b < this.replacedText.length; b += 1) this.write(this.replacedText.charAt(b))
    };
    p.write = function(b) {
        this.cursor.insertNew(new u(b))
    };
    p.keydown = function(b) {
        return this.cursor.selection || (8 !== b.which ||
            this.cursor.prev) && (46 !== b.which || this.cursor.next) ? this.parent.keydown(b) : (this.isEmpty() && this.cursor.insertAfter(this), !1)
    };
    p.textInput = function(b) {
        this.cursor.deleteSelection();
        "$" !== b ? this.write(b) : this.isEmpty() ? this.cursor.insertAfter(this).backspace().insertNew(new u("\\$", "$")) : this.cursor.next ? this.cursor.prev ? (b = new P(new t(this.firstChild, this.cursor.prev)), b.placeCursor = function(h) {
                this.prev = 0;
                delete this.placeCursor;
                this.placeCursor(h)
            }, b.firstChild.focus = function() {
                return this
            }, this.cursor.insertAfter(this).insertNew(b),
            b.prev = this, this.cursor.insertBefore(b), delete b.firstChild.focus) : this.cursor.insertBefore(this) : this.cursor.insertAfter(this)
    };
    p = ca.prototype = new r;
    p.blur = function() {
        this.jQ.removeClass("hasCursor");
        if (this.isEmpty()) {
            var b = this.parent,
                h = b.cursor;
            h.parent === this ? this.jQ.addClass("empty") : (h.hide(), b.remove(), h.next === b ? h.next = b.next : h.prev === b && (h.prev = b.prev), h.show().redraw())
        }
        return this
    };
    p.focus = function() {
        r.prototype.focus.call(this);
        var b = this.parent;
        if (b.next.cmd === b.cmd) {
            var h = this,
                n = b.cursor;
            b = b.next.firstChild;
            b.eachChild(function(y) {
                y.parent = h;
                y.jQ.appendTo(h.jQ)
            });
            this.lastChild ? this.lastChild.next = b.firstChild : this.firstChild = b.firstChild;
            b.firstChild.prev = this.lastChild;
            this.lastChild = b.lastChild;
            b.parent.remove();
            n.prev ? n.insertAfter(n.prev) : n.prependTo(this);
            n.redraw()
        } else b.prev.cmd === b.cmd && (n = b.cursor, n.prev ? b.prev.firstChild.focus() : n.appendTo(b.prev.firstChild));
        return this
    };
    U.$ = e.text = e.textnormal = e.textrm = e.textup = e.textmd = P;
    e.em = e.italic = e.italics = e.emph = e.textit = e.textsl =
        Y("\\textit", '<i class="text"></i>');
    e.strong = e.bold = e.textbf = Y("\\textbf", '<b class="text"></b>');
    e.sf = e.textsf = Y("\\textsf", '<span class="sans-serif text"></span>');
    e.tt = e.texttt = Y("\\texttt", '<span class="monospace text"></span>');
    e.textsc = Y("\\textsc", '<span style="font-variant:small-caps" class="text"></span>');
    e.uppercase = Y("\\uppercase", '<span style="text-transform:uppercase" class="text"></span>');
    e.lowercase = Y("\\lowercase", '<span style="text-transform:lowercase" class="text"></span>');
    e.linethrough =
        Y("\\linethrough", '<span style="text-decoration:line-through red" class="text"></span>');
    p = pa.prototype = new g;
    p.html_template = ['<span class="latex-command-input">\\</span>'];
    p.text_template = ["\\"];
    p.placeCursor = function(b) {
        this.cursor = b.appendTo(this.firstChild);
        this.replacedFragment && (this.jQ = this.jQ.add(this.replacedFragment.jQ.addClass("blur").bind("mousedown mousemove", function(h) {
            J(h.target = this.nextSibling).trigger(h);
            return !1
        }).insertBefore(this.jQ)))
    };
    p.latex = function() {
        return "\\" + this.firstChild.latex() +
            " "
    };
    p.keydown = function(b) {
        return 9 === b.which || 13 === b.which ? (this.renderCommand(), !1) : this.parent.keydown(b)
    };
    p.textInput = function(b) {
        b.match(/[a-z]/i) ? (this.cursor.deleteSelection(), this.cursor.insertNew(new u(b))) : (this.renderCommand(), " " === b || "\\" === b && this.firstChild.isEmpty() || this.cursor.parent.textInput(b))
    };
    p.renderCommand = function() {
        this.jQ = this.jQ.last();
        this.remove();
        this.next ? this.cursor.insertBefore(this.next) : this.cursor.appendTo(this.parent);
        var b = this.firstChild.latex();
        b ? this.cursor.insertCmd(b,
            this.replacedFragment) : (b = new u("\\backslash ", "\\"), this.cursor.insertNew(b), this.replacedFragment && this.replacedFragment.remove())
    };
    U["\\"] = pa;
    p = va.prototype = new g;
    p.html_template = ['<span class="block"></span>', "<span></span>", "<span></span>"];
    p.text_template = ["twostack(", ",", ")"];
    p.redraw = va.prototype.redraw;
    e.twostack = va;
    p = qa.prototype = new g;
    p.html_template = ['<span class="block"></span>', "<span></span>", "<span></span>"];
    p.text_template = ["choose(", ",", ")"];
    p.redraw = K.prototype.redraw;
    e.binom = e.binomial =
        qa;
    p = Ea.prototype = new qa;
    p.placeCursor = C.prototype.placeCursor;
    e.choose = Ea;
    p = Fa.prototype = new g;
    p.html_template = ['<span class="array"></span>', "<span></span>"];
    p.latex = function() {
        return "\\begin{matrix}" + this.foldChildren([], function(b, h) {
            b.push(h.latex());
            return b
        }).join("\\\\ ") + "\\end{matrix}"
    };
    p.text = function() {
        return "[" + this.foldChildren([], function(b, h) {
            b.push(h.text());
            return b
        }).join() + "]"
    };
    p.placeCursor = function(b) {
        this.cursor = b.appendTo(this.firstChild)
    };
    p.keydown = function(b) {
        var h = this.cursor.parent;
        if (h.parent === this) {
            if (13 === b.which) return b = new r, b.parent = this, b.jQ = J("<span></span>").data("[[mathquill internal data]]", {
                block: b
            }).insertAfter(h.jQ), h.next ? h.next.prev = b : this.lastChild = b, b.next = h.next, h.next = b, b.prev = h, this.cursor.appendTo(b).redraw(), !1;
            if (9 === b.which && !b.shiftKey && !h.next) {
                if (h.isEmpty()) return h.prev ? (this.cursor.insertAfter(this), delete h.prev.next, this.lastChild = h.prev, h.jQ.remove(), this.cursor.redraw(), !1) : this.parent.keydown(b);
                b = new r;
                b.parent = this;
                b.jQ = J("<span></span>").data("[[mathquill internal data]]", {
                    block: b
                }).appendTo(this.jQ);
                this.lastChild = b;
                h.next = b;
                b.prev = h;
                this.cursor.appendTo(b).redraw();
                return !1
            }
            if (8 === b.which) {
                if (h.isEmpty()) return h.prev ? (this.cursor.appendTo(h.prev), h.prev.next = h.next) : (this.cursor.insertBefore(this), this.firstChild = h.next), h.next ? h.next.prev = h.prev : this.lastChild = h.prev, h.jQ.remove(), this.isEmpty() ? this.cursor.deleteForward() : this.cursor.redraw(), !1;
                if (!this.cursor.prev) return !1
            }
        }
        return this.parent.keydown(b)
    };
    e.vector = Fa;
    p = wa.prototype = new g;
    p.html_template = ['<table class="matrix"/>'];
    p.initBlocks = function(b) {
        this.tablejQ = this.jQ;
        this.initMatrix(b)
    };
    p.initMatrix = function(b) {
        if (this.rows === O) {
            do {
                var h = prompt('Please enter the number of rows and columns in the NxM format.\nFor example, for a 2x3 matrix, please enter "2x3" (without quotes):').split(/[x ,]/);
                if (2 === h.length) var n = parseInt(h[0]),
                    y = parseInt(h[1])
            } while (!(0 < n && 0 < y))
        } else n = this.rows, y = this.cols;
        var B;
        h = 0;
        this.matrix = [];
        for (var F = 0; F < n; F += 1) {
            var H = [];
            this.matrix.push(H);
            for (var D = H.jQ = J("<tr/>").appendTo(this.tablejQ),
                    Q = 0; Q < y; Q += 1) 0 === F && 0 === Q ? this.firstChild = B = b && b.blockify() || new r : B = new r, B.parent = this, B.prev = h, h = h.next = B, B.row = F, B.col = Q, B.jQ = J("<td/>").data("[[mathquill internal data]]", {
                block: B
            }).append(B.jQ).appendTo(D), H.push(B), B.blur()
        }
        this.lastChild = h
    };
    p.latex = function() {
        for (var b = [], h = 0; h < this.matrix.length; h += 1) {
            for (var n = [], y = this.matrix[h], B = 0; B < y.length; B += 1) n.push(y[B].latex());
            b.push(n.join("&"))
        }
        return ["\\begin{" + this.envName + "}", b.join("\\\\ "), "\\end{" + this.envName + "}"].join("")
    };
    p.text = function() {
        for (var b = [], h = 0; h < this.matrix.length; h += 1) {
            for (var n = [], y = this.matrix[h], B = 0; B < y.length; B += 1) n.push(y[B].text());
            b.push(n.join(", "))
        }
        return "[\n [" + b.join("],\n [") + "]\n]"
    };
    p.placeCursor = function(b) {
        this.cursor = b.appendTo(this.firstChild)
    };
    p.keydown = function(b) {
        var h = this.cursor.parent;
        if (h.parent === this)
            if (8 === b.which) {
                if (!this.cursor.prev && !this.cursor.selection) return !1
            } else if (46 === b.which) {
            if (!this.cursor.prev && !this.cursor.selection) return !1
        } else if (/^13|38|40$/.test(b.which)) {
            var n = h.row;
            h = h.col;
            (13 ===
                b.which ? b.shiftKey : 38 === b.which) ? 0 < n && this.cursor.appendTo(this.matrix[n - 1][h]): n < this.matrix.length - 1 && this.cursor.prependTo(this.matrix[n + 1][h])
        }
        return this.parent.keydown(b)
    };
    p.textInput = function(b) {
        if ("\t" !== b && "\n" !== b) return this.parent.textInput(b)
    };
    e.smallmatrix = e.matrix = wa;
    Ga.prototype = wa.prototype;
    ia("pmatrix", "(", ")");
    ia("bmatrix", "[", "]");
    ia("Bmatrix", "{", "}");
    ia("vmatrix", "|", "|");
    ia("Vmatrix", "&#8214;", "&#8214;");
    ia("cases", "{", "&nbsp;");
    e.editable = f(z, function() {
        this.init("\\editable");
        l(this.jQ, this.firstChild, !1, !0);
        var b;
        this.placeCursor = function(h) {
            b = h.appendTo(this.firstChild)
        };
        this.firstChild.blur = function() {
            b.prev === this.parent && (delete this.blur, this.cursor.appendTo(this), r.prototype.blur.call(this))
        };
        this.latex = function() {
            return this.firstChild.latex()
        };
        this.text = function() {
            return this.firstChild.text()
        }
    });
    p = T.prototype = new k;
    p.text = function() {
        var b = this.cmd;
        !this.prev || this.prev instanceof T || this.prev instanceof I || (b = "*" + b);
        !this.next || this.next instanceof I || "^" ===
            this.next.cmd || (b += "*");
        return b
    };
    u.prototype = k.prototype;
    xa.prototype = k.prototype;
    xa.redraw = function() {
        var b = this.blockjQ.outerHeight() / +this.blockjQ.css("fontSize").slice(0, -2);
        da(this.bracketjQs, na(1 + .3 * (b - 1), 1.3), 1.05 * b)
    };
    p = Ha.prototype = new u;
    p.precedence = .5;
    U[" "] = U["#"] = Ha;
    e.prime = e["'"] = U["'"] = a(u, "'", "<big>\u2032</big>");
    ja.prototype = k.prototype;
    e["@"] = ja;
    e["&"] = a(ja, "\\&", "&");
    e["%"] = a(ja, "\\%", "%");
    e.alpha = e.beta = e.gamma = e.delta = e.zeta = e.eta = e.theta = e.iota = e.kappa = e.mu = e.nu = e.xi = e.rho = e.sigma =
        e.tau = e.chi = e.psi = e.omega = f(k, function(b, h) {
            T.call(this, "\\" + h + " ", "&" + h + ";")
        });
    e.phi = a(T, "\\phi ", "&#981;");
    e.phiv = e.varphi = a(T, "\\varphi ", "&phi;");
    e.epsilon = a(T, "\\epsilon ", "&#1013;");
    e.epsiv = e.varepsilon = a(T, "\\varepsilon ", "&epsilon;");
    e.piv = e.varpi = a(T, "\\varpi ", "&piv;");
    e.sigmaf = e.sigmav = e.varsigma = a(T, "\\varsigma ", "&sigmaf;");
    e.thetav = e.vartheta = e.thetasym = a(T, "\\vartheta ", "&thetasym;");
    e.upsilon = e.upsi = a(T, "\\upsilon ", "&upsilon;");
    e.gammad = e.Gammad = e.digamma = a(T, "\\digamma ", "&#989;");
    e.kappav = e.varkappa = a(T, "\\varkappa ", "&#1008;");
    e.rhov = e.varrho = a(T, "\\varrho ", "&#1009;");
    e.pi = e["\u03c0"] = a(ja, "\\pi ", "&pi;");
    e.lambda = a(ja, "\\lambda ", "&lambda;");
    e.Upsilon = e.Upsi = e.upsih = e.Upsih = a(k, "\\Upsilon ", '<var style="font-family: serif">&upsih;</var>');
    e.Gamma = e.Delta = e.Theta = e.Lambda = e.Xi = e.Pi = e.Sigma = e.Phi = e.Psi = e.Omega = e.forall = f(k, function(b, h) {
        u.call(this, "\\" + h + " ", "&" + h + ";")
    });
    p = I.prototype = new k;
    p.precedence = 1;
    p = la.prototype = new I;
    p.respace = function() {
        this.jQ[0].className = this.prev ?
            this.prev instanceof I && this.next && !(this.next instanceof I) ? "unary-operator" : "binary-operator" : "";
        return this
    };
    e["+"] = a(la, "+", "+");
    e["\u2013"] = e["-"] = a(la, "-", "&minus;");
    e["\u00b1"] = e.pm = e.plusmn = e.plusminus = a(la, "\\pm ", "&plusmn;");
    e.mp = e.mnplus = e.minusplus = a(la, "\\mp ", "&#8723;");
    U["*"] = e.sdot = e.cdot = a(I, "\\cdot ", "&middot;");
    e["="] = a(I, "=", "=");
    e["<"] = a(I, "<", "&lt;");
    e[">"] = a(I, ">", "&gt;");
    e.notin = e.sim = e.cong = e.equiv = e.oplus = e.otimes = f(I, function(b, h) {
        I.call(this, "\\" + h + " ", "&" + h + ";")
    });
    e.times =
        f(I, function(b, h) {
            I.call(this, "\\times ", "&times;", "[x]")
        });
    e["\u00f7"] = e.div = e.divide = e.divides = a(I, "\\div ", "&divide;", "[/]");
    e["\u2260"] = e.ne = e.neq = a(I, "\\ne ", "&ne;");
    e.ast = e.star = e.loast = e.lowast = a(I, "\\ast ", "&lowast;");
    e.therefor = e.therefore = a(I, "\\therefore ", "&there4;");
    e.cuz = e.because = a(I, "\\because ", "&#8757;");
    e.prop = e.propto = a(I, "\\propto ", "&prop;");
    e["\u2248"] = e.asymp = e.approx = a(I, "\\approx ", "&asymp;");
    e.lt = a(I, "<", "&lt;");
    e.gt = a(I, ">", "&gt;");
    e["\u2264"] = e.le = e.leq = a(I, "\\le ", "&le;");
    e["\u2265"] = e.ge = e.geq = a(I, "\\ge ", "&ge;");
    e.isin = e["in"] = a(I, "\\in ", "&isin;");
    e.ni = e.contains = a(I, "\\ni ", "&ni;");
    e.notni = e.niton = e.notcontains = e.doesnotcontain = a(I, "\\not\\ni ", "&#8716;");
    e.sub = e.subset = a(I, "\\subset ", "&sub;");
    e.supset = e.superset = a(I, "\\supset ", "&sup;");
    e.sup = ra;
    e.nsub = e.notsub = e.nsubset = e.notsubset = a(I, "\\not\\subset ", "&#8836;");
    e.nsup = e.notsup = e.nsupset = e.notsupset = e.nsuperset = e.notsuperset = a(I, "\\not\\supset ", "&#8837;");
    e.sube = e.subeq = e.subsete = e.subseteq = a(I, "\\subseteq ",
        "&sube;");
    e.supe = e.supeq = e.supsete = e.supseteq = e.supersete = e.superseteq = a(I, "\\supseteq ", "&supe;");
    e.nsube = e.nsubeq = e.notsube = e.notsubeq = e.nsubsete = e.nsubseteq = e.notsubsete = e.notsubseteq = a(I, "\\not\\subseteq ", "&#8840;");
    e.nsupe = e.nsupeq = e.notsupe = e.notsupeq = e.nsupsete = e.nsupseteq = e.notsupsete = e.notsupseteq = e.nsupersete = e.nsuperseteq = e.notsupersete = e.notsuperseteq = a(I, "\\not\\supseteq ", "&#8841;");
    aa.prototype = new k;
    e["\u2211"] = e.sum = e.summation = a(aa, "\\sum ", "&sum;");
    e["\u220f"] = e.prod = e.product =
        a(aa, "\\prod ", "&prod;");
    e.coprod = e.coproduct = a(aa, "\\coprod ", "&#8720;");
    e["\u222b"] = e["int"] = e.integral = a(aa, "\\int ", "&int;");
    e.N = e.naturals = e.Naturals = a(u, "\\mathbb{N}", "&#8469;");
    e.P = e.primes = e.Primes = e.projective = e.Projective = e.probability = e.Probability = a(u, "\\mathbb{P}", "&#8473;");
    e.Z = e.integers = e.Integers = a(u, "\\mathbb{Z}", "&#8484;");
    e.Q = e.rationals = e.Rationals = a(u, "\\mathbb{Q}", "&#8474;");
    e.R = e.reals = e.Reals = a(u, "\\mathbb{R}", "&#8477;");
    e.C = e.complex = e.Complex = e.complexes = e.Complexes = e.complexplane =
        e.Complexplane = e.ComplexPlane = a(u, "\\mathbb{C}", "&#8450;");
    e.quad = e.emsp = a(u, "\\quad ", "&nbsp;&nbsp;&nbsp;&nbsp;");
    e.qquad = a(u, "\\qquad ", "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
    e.diamond = a(u, "\\diamond ", "&#9671;");
    e.bigtriangleup = a(u, "\\bigtriangleup ", "&#9651;");
    e.ominus = a(u, "\\ominus ", "&#8854;");
    e.uplus = a(u, "\\uplus ", "&#8846;");
    e.bigtriangledown = a(u, "\\bigtriangledown ", "&#9661;");
    e.sqcap = a(u, "\\sqcap ", "&#8851;");
    e.triangleleft = a(u, "\\triangleleft ", "&#8882;");
    e.sqcup = a(u, "\\sqcup ",
        "&#8852;");
    e.triangleright = a(u, "\\triangleright ", "&#8883;");
    e.odot = a(u, "\\odot ", "&#8857;");
    e.bigcirc = a(u, "\\bigcirc ", "&#9711;");
    e.dagger = a(u, "\\dagger ", "&#0134;");
    e.ddagger = a(u, "\\ddagger ", "&#135;");
    e.wr = a(u, "\\wr ", "&#8768;");
    e.amalg = a(u, "\\amalg ", "&#8720;");
    e.models = a(u, "\\models ", "&#8872;");
    e.prec = a(u, "\\prec ", "&#8826;");
    e.succ = a(u, "\\succ ", "&#8827;");
    e.preceq = a(u, "\\preceq ", "&#8828;");
    e.succeq = a(u, "\\succeq ", "&#8829;");
    e.simeq = a(u, "\\simeq ", "&#8771;");
    e.mid = a(u, "\\mid ", "&#8739;");
    e.matrixmid = a(xa, "\\matrixmid ", "&#8739;");
    e.ll = a(u, "\\ll ", "&#8810;");
    e.gg = a(u, "\\gg ", "&#8811;");
    e.parallel = a(u, "\\parallel ", "&#8741;");
    e.bowtie = a(u, "\\bowtie ", "&#8904;");
    e.sqsubset = a(u, "\\sqsubset ", "&#8847;");
    e.sqsupset = a(u, "\\sqsupset ", "&#8848;");
    e.smile = a(u, "\\smile ", "&#8995;");
    e.sqsubseteq = a(u, "\\sqsubseteq ", "&#8849;");
    e.sqsupseteq = a(u, "\\sqsupseteq ", "&#8850;");
    e.doteq = a(u, "\\doteq ", "&#8784;");
    e.frown = a(u, "\\frown ", "&#8994;");
    e.vdash = a(u, "\\vdash ", "&#8870;");
    e.dashv = a(u, "\\dashv ",
        "&#8867;");
    e.longleftarrow = a(u, "\\longleftarrow ", "&#8592;");
    e.longrightarrow = a(u, "\\longrightarrow ", "&#8594;");
    e.Longleftarrow = a(u, "\\Longleftarrow ", "&#8656;");
    e.Longrightarrow = a(u, "\\Longrightarrow ", "&#8658;");
    e.longleftrightarrow = a(u, "\\longleftrightarrow ", "&#8596;");
    e.updownarrow = a(u, "\\updownarrow ", "&#8597;");
    e.Longleftrightarrow = a(u, "\\Longleftrightarrow ", "&#8660;");
    e.Updownarrow = a(u, "\\Updownarrow ", "&#8661;");
    e.mapsto = a(u, "\\mapsto ", "&#8614;");
    e.nearrow = a(u, "\\nearrow ", "&#8599;");
    e.hookleftarrow = a(u, "\\hookleftarrow ", "&#8617;");
    e.hookrightarrow = a(u, "\\hookrightarrow ", "&#8618;");
    e.searrow = a(u, "\\searrow ", "&#8600;");
    e.leftharpoonup = a(u, "\\leftharpoonup ", "&#8636;");
    e.rightharpoonup = a(u, "\\rightharpoonup ", "&#8640;");
    e.swarrow = a(u, "\\swarrow ", "&#8601;");
    e.leftharpoondown = a(u, "\\leftharpoondown ", "&#8637;");
    e.rightharpoondown = a(u, "\\rightharpoondown ", "&#8641;");
    e.nwarrow = a(u, "\\nwarrow ", "&#8598;");
    e.ldots = a(u, "\\ldots ", "&#8230;");
    e.cdots = a(u, "\\cdots ", "&#8943;");
    e.vdots =
        a(u, "\\vdots ", "&#8942;");
    e.ddots = a(u, "\\ddots ", "&#8945;");
    e.surd = a(u, "\\surd ", "&#8730;");
    e.triangle = a(u, "\\triangle ", "&#9653;");
    e.ell = a(u, "\\ell ", "&#8467;");
    e.top = a(u, "\\top ", "&#8868;");
    e.flat = a(u, "\\flat ", "&#9837;");
    e.natural = a(u, "\\natural ", "&#9838;");
    e.sharp = a(u, "\\sharp ", "&#9839;");
    e.wp = a(u, "\\wp ", "&#8472;");
    e.bot = a(u, "\\bot ", "&#8869;");
    e.clubsuit = a(u, "\\clubsuit ", "&#9827;");
    e.diamondsuit = a(u, "\\diamondsuit ", "&#9826;");
    e.heartsuit = a(u, "\\heartsuit ", "&#9825;");
    e.spadesuit = a(u, "\\spadesuit ",
        "&#9824;");
    e.oint = a(u, "\\oint ", "&#8750;");
    e.bigcap = a(u, "\\bigcap ", "&#8745;");
    e.bigcup = a(u, "\\bigcup ", "&#8746;");
    e.bigsqcup = a(u, "\\bigsqcup ", "&#8852;");
    e.bigvee = a(u, "\\bigvee ", "&#8744;");
    e.bigwedge = a(u, "\\bigwedge ", "&#8743;");
    e.bigodot = a(u, "\\bigodot ", "&#8857;");
    e.bigotimes = a(u, "\\bigotimes ", "&#8855;");
    e.bigoplus = a(u, "\\bigoplus ", "&#8853;");
    e.biguplus = a(u, "\\biguplus ", "&#8846;");
    e.lfloor = a(u, "\\lfloor ", "&#8970;");
    e.rfloor = a(u, "\\rfloor ", "&#8971;");
    e.lceil = a(u, "\\lceil ", "&#8968;");
    e.rceil =
        a(u, "\\rceil ", "&#8969;");
    e.slash = a(u, "\\slash ", "&#47;");
    e.opencurlybrace = a(u, "\\opencurlybrace ", "&#123;");
    e.closecurlybrace = a(u, "\\closecurlybrace ", "&#125;");
    e.caret = a(u, "\\caret ", "^");
    e.underscore = a(u, "\\underscore ", "_");
    e.backslash = a(u, "\\backslash ", "\\");
    e.vert = a(u, "|");
    e.perp = e.perpendicular = a(u, "\\perp ", "&perp;");
    e.nabla = e.del = a(u, "\\nabla ", "&nabla;");
    e.hbar = a(u, "\\hbar ", "&#8463;");
    e.textdiv = a(u, "\\textdiv ", "&#247;");
    e.marker = a(u, "\\marker ", "&#9646;");
    e.msquare = a(u, "\\msquare ", "&#9633;");
    e.square = a(u, "\\square ", "&#9744;");
    e.bsquare = a(u, "\\bsquare ", "&#9724;");
    e.hspace = a(u, "\\hspace ", "&#8201;");
    e.notequal = a(u, "\\not= ", "&#8800;");
    e.blacksquare = a(u, "\\blacksquare= ", "&#9642;");
    e.hybull = a(u, "\\hybull", "&#8259;");
    e.ding = a(u, "\\ding", "&#9830;");
    e.whiteVerticalRectangle = a(u, "\\whiteVerticalRectangle", "&#9647;");
    e.leftFiveEigthsBlock = a(u, "\\leftFiveEigthsBlock", "&#9611;");
    e.rightHalfBlock = a(u, "\\rightHalfBlock", "&#9616;");
    e.space = a(u, "\\space", "&#8197;");
    e.smallspace = a(u, "\\smallspace",
        "&#8201;");
    e.hairspace = a(u, "\\smallspace", "&#8202;");
    e.emptyspace = a(u, "\\emptyspace", "&#8203;");
    e.dollar = a(u, "\\dollar", "$");
    e.AA = e.Angstrom = e.angstrom = a(u, "\\text\\AA ", "&#8491;");
    e.ring = e.circ = e.circle = a(u, "\\circ ", "&#9702;");
    e.bull = e.bullet = a(u, "\\bullet ", "&bull;");
    e.setminus = e.smallsetminus = a(u, "\\setminus ", "&#8726;");
    e.not = e["\u00ac"] = e.neg = a(u, "\\neg ", "&not;");
    e["\u2026"] = e.dots = e.ellip = e.hellip = e.ellipsis = e.hellipsis = a(u, "\\dots ", "&hellip;");
    e.converges = e.darr = e.dnarr = e.dnarrow = e.downarrow =
        a(u, "\\downarrow ", "&darr;");
    e.dArr = e.dnArr = e.dnArrow = e.Downarrow = a(u, "\\Downarrow ", "&dArr;");
    e.diverges = e.uarr = e.uparrow = a(u, "\\uparrow ", "&uarr;");
    e.uArr = e.Uparrow = a(u, "\\Uparrow ", "&uArr;");
    e.to = a(I, "\\to ", "&rarr;");
    e.rarr = e.rightarrow = a(u, "\\rightarrow ", "&rarr;");
    e.implies = a(I, "\\Rightarrow ", "&rArr;");
    e.rArr = e.Rightarrow = a(u, "\\Rightarrow ", "&rArr;");
    e.gets = a(I, "\\gets ", "&larr;");
    e.larr = e.leftarrow = a(u, "\\leftarrow ", "&larr;");
    e.impliedby = a(I, "\\Leftarrow ", "&lArr;");
    e.lArr = e.Leftarrow = a(u,
        "\\Leftarrow ", "&lArr;");
    e.harr = e.lrarr = e.leftrightarrow = a(u, "\\leftrightarrow ", "&harr;");
    e.iff = a(I, "\\Leftrightarrow ", "&hArr;");
    e.hArr = e.lrArr = e.Leftrightarrow = a(u, "\\Leftrightarrow ", "&hArr;");
    e.Re = e.Real = e.real = a(u, "\\Re ", "&real;");
    e.Im = e.imag = e.image = e.imagin = e.imaginary = e.Imaginary = a(u, "\\Im ", "&image;");
    e.part = e.partial = a(u, "\\partial ", "&part;");
    e.inf = e.infin = e.infty = e.infinity = a(u, "\\infty ", "&infin;");
    e.alef = e.alefsym = e.aleph = e.alephsym = a(u, "\\aleph ", "&alefsym;");
    e.xist = e.xists = e.exist =
        e.exists = a(u, "\\exists ", "&exist;");
    e.and = e.land = e.wedge = a(u, "\\wedge ", "&and;");
    e.or = e.lor = e.vee = a(u, "\\vee ", "&or;");
    e.o = e.O = e.empty = e.emptyset = e.oslash = e.Oslash = e.nothing = e.varnothing = a(I, "\\varnothing ", "&empty;");
    e.cup = e.union = a(I, "\\cup ", "&cup;");
    e.cap = e.intersect = e.intersection = a(I, "\\cap ", "&cap;");
    e.deg = e.degree = a(u, "^{\\circ} ", "&deg;");
    e.ang = e.angle = a(u, "\\angle ", "&ang;");
    p = ra.prototype = new k;
    p.respace = function() {
        this.jQ[0].className = this.next instanceof w || this.next instanceof K ? "" :
            "non-italicized-function"
    };
    e.exp = e.at = e.tr = e.det = e.rk = e.adj = e.ln = e.lg = e.log = e.span = e.proj = e.det = e.dim = e.min = e.max = e.mod = e.lcm = e.gcd = e.gcf = e.hcf = e.lim = ra;
    (function() {
        var b = "sin cos tan sec cosec csc cotan cot".split(" "),
            h;
        for (h in b) e[b[h]] = e[b[h] + "h"] = e["a" + b[h]] = e["arc" + b[h]] = e["a" + b[h] + "h"] = e["arc" + b[h] + "h"] = ra
    })();
    p = ta.prototype;
    p.prev = 0;
    p.next = 0;
    p.parent = 0;
    p.show = function() {
        this.jQ = this._jQ.removeClass("blink");
        "intervalId" in this ? clearInterval(this.intervalId) : (this.next ? this.selection && this.selection.prev ===
            this.prev ? this.jQ.insertBefore(this.selection.jQ) : this.jQ.insertBefore(this.next.jQ.first()) : this.jQ.appendTo(this.parent.jQ), this.parent.focus());
        this.intervalId = setInterval(this.blink, 500);
        return this
    };
    p.hide = function() {
        "intervalId" in this && clearInterval(this.intervalId);
        delete this.intervalId;
        this.jQ.detach();
        this.jQ = J();
        return this
    };
    p.redraw = function() {
        for (var b = this.parent; b; b = b.parent) b.redraw && b.redraw()
    };
    p.insertAt = function(b, h, n) {
        var y = this.parent;
        this.parent = b;
        this.prev = h;
        this.next = n;
        y.blur()
    };
    p.insertBefore = function(b) {
        this.insertAt(b.parent, b.prev, b);
        this.parent.jQ.addClass("hasCursor");
        this.jQ.insertBefore(b.jQ.first());
        return this
    };
    p.insertAfter = function(b) {
        this.insertAt(b.parent, b, b.next);
        this.parent.jQ.addClass("hasCursor");
        this.jQ.insertAfter(b.jQ.last());
        return this
    };
    p.prependTo = function(b) {
        this.insertAt(b, 0, b.firstChild);
        b.textarea ? this.jQ.insertAfter(b.textarea) : this.jQ.prependTo(b.jQ);
        b.focus();
        return this
    };
    p.appendTo = function(b) {
        this.insertAt(b, b.lastChild, 0);
        this.jQ.appendTo(b.jQ);
        b.focus();
        return this
    };
    p.hopLeft = function() {
        this.jQ.insertBefore(this.prev.jQ.first());
        this.next = this.prev;
        this.prev = this.prev.prev;
        return this
    };
    p.hopRight = function() {
        this.jQ.insertAfter(this.next.jQ.last());
        this.prev = this.next;
        this.next = this.next.next;
        return this
    };
    p.moveLeft = function() {
        this.selection ? this.insertBefore(this.selection.prev.next || this.parent.firstChild).clearSelection() : this.prev ? this.prev.lastChild ? this.appendTo(this.prev.lastChild) : this.hopLeft() : this.parent.prev ? this.appendTo(this.parent.prev) :
            this.parent !== this.root && this.insertBefore(this.parent.parent);
        return this.show()
    };
    p.moveRight = function() {
        this.selection ? this.insertAfter(this.selection.next.prev || this.parent.lastChild).clearSelection() : this.next ? this.next.firstChild ? this.prependTo(this.next.firstChild) : this.hopRight() : this.parent.next ? this.prependTo(this.parent.next) : this.parent !== this.root && this.insertAfter(this.parent.parent);
        return this.show()
    };
    p.seek = function(b, h, n) {
        n = this.clearSelection();
        if (b.hasClass("empty")) return n.prependTo(b.data("[[mathquill internal data]]").block),
            n;
        var y = b.data("[[mathquill internal data]]");
        if (y) {
            if (y.cmd && !y.block) return b.outerWidth() > 2 * (h - b.offset().left) ? n.insertBefore(y.cmd) : n.insertAfter(y.cmd), n
        } else b = b.parent(), (y = b.data("[[mathquill internal data]]")) || (y = {
            block: n.root
        });
        y.cmd ? n.insertAfter(y.cmd) : n.appendTo(y.block);
        b = n.jQ.offset().left - h;
        do n.moveLeft(), y = b, b = n.jQ.offset().left - h; while (0 < b && (n.prev || n.parent !== n.root)); - b > y && n.moveRight();
        return n
    };
    p.replaceIntervalParentheses = function(b) {
        for (var h = [], n = [], y = 0; y < b.length; y++) {
            var B =
                b[y];
            "(" === B || "[" === B ? n.push({
                ind: y,
                type: B
            }) : ")" === B ? (B = n.pop()) && "[" === B.type && (h.push({
                index: B.ind,
                value: "LEFTCLOSED"
            }), h.push({
                index: y,
                value: "RIGHTOPEN"
            })) : "]" === B && (B = n.pop()) && "(" === B.type && (h.push({
                index: B.ind,
                value: "LEFTOPEN"
            }), h.push({
                index: y,
                value: "RIGHTCLOSED"
            }))
        }
        for (n = h.length - 1; 0 <= n; n--) b = b.replaceAt(h[n].index, h[n].value);
        return b
    };
    p.writeLatex = function(b) {
        this.root.hidePlaceholder();
        this.deleteSelection();
        if (0 > b.indexOf("matrix") && 1E3 < b.length) return this.hide();
        b = b.replace(/\\sqrt\[(.+?)\]/g,
            "\\nthroot-$1-");
        b = b.replace(/\\nthroot\[(.+?)\]/g, "\\nthroot-$1-");
        b = this.replaceIntervalParentheses(b);
        b = b.replace(/(\\left\s*\(|\()/g, "\\left(");
        b = b.replace(/(\\right\s*\)|\))/g, "\\right)");
        b = b.replace(/(\\left\s*\[|\[)/g, "\\left[");
        b = b.replace(/(\\right\s*\]|\])/g, "\\right]");
        b = b.replace(/\\nthroot-(.+?)-/g, "\\nthroot[$1]");
        b = b.replace(/^\\left([\(\[])$/, "$1");
        b = b.replace(/^\\right([\)\]])$/, "$1");
        b = b.replace(/\\int(#| )(_|^)/g, "\\int$2");
        b = b.replace(/"/g, "");
        b = b.replace(/\*/g, "\\cdot ");
        b = b.replace(/\$/g,
            "");
        b = b.replace(/\\%/g, "%");
        b = b.replace(/([a-z])\\circ/g, "$1\\:\\circ");
        b = b.replace(/LEFTOPEN/g, "(");
        b = b.replace(/LEFTCLOSED/g, "[");
        b = b.replace(/RIGHTOPEN/g, ")");
        b = b.replace(/RIGHTCLOSED/g, "]");
        b = b.replace(/\\land/g, "\\quad\\mathrm{and}\\quad ");
        b = b.replace(/\\lor/g, "\\quad\\mathrm{or}\\quad ");
        b = b.replace(/f'/g, "f\\:'");
        b = (b = b.replace(/f\\prime/g, "f\\:\\prime")) && b.match(/\\(?:begin|end){cases}|\\(?:begin|end){([pbv]|small)?matrix}|\\\\|\\mathbb{[CNPQRZ]}|\\text{([^}]|\\})*}|\\:|\\[a-z]*|[^\s]/ig) ||
            0;
        this.adjustParenScripts(b);
        this.parent.textarea || this.adjustVariables(b);
        this.adjustVariablesHE(b);
        (function B(n, y) {
            if ("]" == b) n.insertNew(new u(b));
            else
                for (; b.length;) {
                    var F = b.shift();
                    if (!F || F === y || "\\end{" === F.slice(0, 5)) break;
                    if ("&" === F || "\\\\" === F) {
                        b.unshift("{");
                        break
                    }
                    var H;
                    if ("\\begin{" === F.slice(0, 7)) {
                        F = F.slice(7, -1);
                        for (var D = H = 1, Q = 0;; Q += 1) {
                            var ha = b[Q];
                            if ("\\end{" === ha.slice(0, 5)) break;
                            else "\\\\" === ha ? H += 1 : "&" === ha && 1 === H && (D += 1)
                        }
                        n.insertNew(H = new e[F](O, O, H, D));
                        b.unshift("{")
                    } else if ("\\text{" ===
                        F.slice(0, 6)) {
                        H = new P(F.slice(6, -1));
                        n.insertNew(H).insertAfter(H);
                        continue
                    } else if ("{" == F) {
                        B(n, "}");
                        continue
                    } else if (/\\mathbb\{[CNPQRZ]\}/.test(F)) {
                        H = new(e[F.slice(-2, -1)]);
                        n.insertNew(H).insertAfter(H);
                        continue
                    } else if ("\\left" === F || "\\right" === F)
                        if (F = b.shift(), "\\" === F && (F = b.shift()), n.insertCh(F), H = n.prev || n.parent.parent, n.prev) break;
                        else b.unshift("{");
                    else if (/^\\[a-z]+$/i.test(F))
                        if (F = F.slice(1), H = e[F]) n.insertNew(H = new H(O, F));
                        else {
                            H = new P(F);
                            n.insertNew(H).insertAfter(H);
                            continue
                        }
                    else H =
                        F.match(/[a-zA-Z\u00E1-\u00F3]/) ? new T(F) : (H = e[F]) ? new H : "#" == F || "\\:" == F ? new U[" "] : new u(F), n.insertNew(H);
                    H.eachChild(function(Z) {
                        n.appendTo(Z);
                        Z = b.shift();
                        if (!Z) return !1;
                        "{" === Z || "[" === Z ? B(n, "{" === Z ? "}" : "]") : n.insertCh(Z)
                    });
                    n.insertAfter(H)
                }
        })(this);
        return this.hide()
    };
    p.write = function(b) {
        return this.show().insertCh(b)
    };
    p.insertCh = function(b) {
        this.selection && (this.prev = this.selection.prev, this.next = this.selection.next);
        var h = b.match(/^[a-zA-Z]$/) ? new T(b) : (h = U[b] || e[b]) ? new h(this.selection, b) :
            new u(b);
        this.selection && (h instanceof k && this.selection.remove(), delete this.selection);
        return this.insertNew(h)
    };
    p.insertNew = function(b) {
        b.insertAt(this);
        return this
    };
    p.insertCmd = function(b, h) {
        var n = e[b];
        n ? (n = new n(h, b), this.insertNew(n), n instanceof k && h && h.remove()) : (n = new P(b), n.firstChild.focus = function() {
            delete this.focus;
            return this
        }, this.insertNew(n).insertAfter(n), h && h.remove());
        return this
    };
    p.unwrapGramp = function() {
        var b = this.parent.parent,
            h = b.parent,
            n = b.prev;
        b.eachChild(function(y) {
            y.isEmpty() ||
                (y.eachChild(function(B) {
                    B.parent = h;
                    B.jQ.insertBefore(b.jQ.first())
                }), (y.firstChild.prev = n) ? n.next = y.firstChild : h.firstChild = y.firstChild, n = y.lastChild)
        });
        (n.next = b.next) ? b.next.prev = n: h.lastChild = n;
        if (!this.next)
            if (this.prev) this.next = this.prev.next;
            else
                for (; !this.next;)
                    if (this.parent = this.parent.next) this.next = this.parent.firstChild;
                    else {
                        this.next = b.next;
                        this.parent = h;
                        break
                    } this.next ? this.insertBefore(this.next) : this.appendTo(h);
        b.jQ.remove();
        b.prev && b.prev.respace();
        b.next && b.next.respace()
    };
    p.backspace = function() {
        if (!this.deleteSelection())
            if (this.prev) this.prev.isEmpty() ? this.prev = this.prev.remove().prev : this.selectLeft();
            else if (this.parent !== this.root) {
            if (this.parent.parent.isEmpty()) return this.insertAfter(this.parent.parent).backspace();
            this.unwrapGramp()
        }
        this.prev && this.prev.respace();
        this.next && this.next.respace();
        this.redraw();
        return this
    };
    p.deleteForward = function() {
        if (!this.deleteSelection())
            if (this.next) this.next.isEmpty() ? this.next = this.next.remove().next : this.selectRight();
            else if (this.parent !== this.root) {
            if (this.parent.parent.isEmpty()) return this.insertBefore(this.parent.parent).deleteForward();
            this.unwrapGramp()
        }
        this.prev && this.prev.respace();
        this.next && this.next.respace();
        this.redraw();
        return this
    };
    p.selectWord = function() {
        if (this.parent.isEmpty()) return this.selectLeft();
        for (var b = this.next, h = this.prev, n = b ? b.precedence : h.precedence; b.precedence === n;) b = b.next;
        for (; h.precedence === n;) h = h.prev;
        b ? this.insertBefore(b) : this.appendTo(this.parent);
        this.hide().selection =
            new ma(this.parent, h, b)
    };
    p.selectFrom = function(b) {
        var h = this,
            n = b,
            y = 0;
        a: for (;;) {
            for (var B = this; B !== h.parent.parent; B = B.parent.parent)
                if (B.parent === n.parent) {
                    var F = B;
                    var H = n;
                    break a
                } for (B = b; B !== n.parent.parent; B = B.parent.parent)
                if (h.parent === B.parent) {
                    F = h;
                    H = B;
                    break a
                } h.parent.parent && (h = h.parent.parent);
            n.parent.parent && (n = n.parent.parent);
            if (1E3 < y++) break a
        }
        if (F.next !== H) {
            for (b = F; b; b = b.next)
                if (b === H.prev) {
                    var D = !0;
                    break
                } D || (D = H, H = F, F = D)
        }
        this.hide().selection = new ma(F.parent, F.prev, H.next);
        this.insertAfter(H.next.prev ||
            H.parent.lastChild);
        this.root.selectionChanged()
    };
    p.selectLeft = function() {
        if (this.selection)
            if (this.selection.prev === this.prev) this.prev ? (this.hopLeft().next.jQ.prependTo(this.selection.jQ), this.selection.prev = this.prev) : this.parent !== this.root && this.insertBefore(this.parent.parent).selection.levelUp();
            else {
                if (this.prev.jQ.insertAfter(this.selection.jQ), this.hopLeft().selection.next = this.next, this.selection.prev === this.prev) {
                    this.deleteSelection();
                    return
                }
            }
        else {
            if (this.prev) this.hopLeft();
            else if (this.parent !==
                this.root) this.insertBefore(this.parent.parent);
            else return;
            this.hide().selection = new ma(this.parent, this.prev, this.next.next)
        }
        this.root.selectionChanged()
    };
    p.selectRight = function() {
        if (this.selection)
            if (this.selection.next === this.next) this.next ? (this.hopRight().prev.jQ.appendTo(this.selection.jQ), this.selection.next = this.next) : this.parent !== this.root && this.insertAfter(this.parent.parent).selection.levelUp();
            else {
                if (this.next.jQ.insertBefore(this.selection.jQ), this.hopRight().selection.prev = this.prev,
                    this.selection.next === this.next) {
                    this.deleteSelection();
                    return
                }
            }
        else {
            if (this.next) this.hopRight();
            else if (this.parent !== this.root) this.insertAfter(this.parent.parent);
            else return;
            this.hide().selection = new ma(this.parent, this.prev.prev, this.next)
        }
        this.root.selectionChanged()
    };
    p.clearSelection = function() {
        this.show().selection && (this.selection.clear(), delete this.selection, this.root.selectionChanged());
        return this
    };
    p.deleteSelection = function() {
        if (!this.show().selection) return !1;
        this.prev = this.selection.prev;
        this.next = this.selection.next;
        this.selection.remove();
        delete this.selection;
        this.root.selectionChanged();
        return !0
    };
    p.adjustVariables = function(b) {
        for (var h = !1, n = 0; n < b.length; n++) {
            var y = b[n];
            "a" <= y && "z" >= y || "A" <= y && "Z" >= y || "\u00e1" <= y && "\u00f3" >= y ? (h && (b[n - 1] += b[n], b.splice(n, 1), n--), h = !0) : h = !1
        }
    };
    p.adjustVariablesHE = function(b) {
        for (var h = !1, n = 0; n < b.length; n++) {
            var y = b[n];
            "\u05d0" <= y && "\u05ea" >= y || "\u0600" <= y && "\u06ff" >= y ? (h && (b[n - 1] += b[n], b.splice(n, 1), n--), h = !0) : h = !1
        }
    };
    p.adjustParenScripts = function(b) {
        for (var h =
                0; h < b.length - 2; h++) {
            var n = b[h];
            if ("^" === n || "_" === n)
                if (n = b[h + 2], "\\left" === b[h + 1] && "(" === n) {
                    n = h + 1;
                    for (var y = 1, B = h + 3; 0 < y && B < b.length - 1; B++) {
                        var F = b[B],
                            H = b[B + 1];
                        "\\right" === F && ")" === H ? y-- : "\\left" === F && "(" === H && y++
                    }
                    0 == y && (b.splice(n, 0, "{"), b.splice(B + 2, 0, "}"))
                }
        }
    };
    p = ma.prototype = new t;
    p.jQinit = function(b) {
        this.jQ = b.wrapAll('<span class="selection"></span>').parent()
    };
    p.levelUp = function() {
        this.clear().jQinit(this.parent.parent.jQ);
        this.prev = this.parent.parent.prev;
        this.next = this.parent.parent.next;
        this.parent =
            this.parent.parent.parent;
        return this
    };
    p.clear = function() {
        this.jQ.replaceWith(this.jQ.children());
        return this
    };
    p.blockify = function() {
        this.jQ.replaceWith(this.jQ = this.jQ.children());
        return t.prototype.blockify.call(this)
    };
    p.detach = function() {
        var b = t.prototype.blockify.call(this);
        this.blockify = function() {
            this.jQ.replaceWith(b.jQ = this.jQ = this.jQ.children());
            return b
        };
        return this
    };
    J.fn.mathquill = function(b, h, n) {
        switch (b) {
            case "placeholder":
                return this.each(function() {
                    var D = J(this).data("[[mathquill internal data]]");
                    (D = D && D.block) && D.setPlaceholder && (D.setPlaceholder(h), this !== document.activeElement && D.showPlaceholder())
                });
            case "redraw":
                return this.find(":not(:has(:first))").each(function() {
                    var D = J(this).data("[[mathquill internal data]]");
                    D && (D.cmd || D.block) && ta.prototype.redraw.call(D.cmd || D.block)
                }), this;
            case "revert":
                return this.each(function() {
                    var D = J(this).data("[[mathquill internal data]]");
                    D && D.revert && D.revert()
                });
            case "latex":
                if (1 < arguments.length) return this.each(function() {
                    var D = J(this).data("[[mathquill internal data]]");
                    D && D.block && D.block.renderLatex && D.block.renderLatex(h)
                });
                var y = this.data("[[mathquill internal data]]");
                return y && y.block && y.block.latex();
            case "text":
                return (y = this.data("[[mathquill internal data]]")) && y.block && y.block.text();
            case "html":
                return this.html().replace(/ ?hasCursor|hasCursor /, "").replace(/ class=(""|(?= |>))/g, "").replace(/<span class="?cursor( blink)?"?><\/span>/i, "").replace(/<span class="?textarea"?><textarea><\/textarea><\/span>/i, "");
            case "write":
                if (1 < arguments.length) return this.each(function() {
                    var D =
                        J(this).data("[[mathquill internal data]]"),
                        Q = (D = D && D.block) && D.cursor;
                    if (Q) {
                        Q.writeLatex(h);
                        if (n != O)
                            for (i = 0; i < n; i++) Q.moveLeft();
                        D.blur()
                    }
                });
            case "cmd":
                if (1 < arguments.length) return this.each(function() {
                    var D = J(this).data("[[mathquill internal data]]"),
                        Q = (D = D && D.block) && D.cursor;
                    if (Q) {
                        Q.writeLatex(h);
                        if (n != O)
                            for (i = 0; i < n; i += 1) Q.moveLeft();
                        D.blur()
                    }
                });
            case "backspace":
                return this.each(function() {
                    var D = J(this).data("[[mathquill internal data]]");
                    D = D && D.block;
                    (D && D.cursor).backspace()
                });
            case "moveleft":
                return this.each(function() {
                    var D =
                        J(this).data("[[mathquill internal data]]"),
                        Q = (D = D && D.block) && D.cursor;
                    D.focus();
                    Q.moveLeft()
                });
            case "moveright":
                return this.each(function() {
                    var D = J(this).data("[[mathquill internal data]]"),
                        Q = (D = D && D.block) && D.cursor;
                    D.focus();
                    Q.moveRight()
                });
            default:
                var B = "textbox" === b,
                    F = B || "editable" === b,
                    H = B ? d : q;
                return this.each(function() {
                    l(J(this), new H, B, F)
                })
        }
    };
    J(function() {
        J(".mathquill-editable:not(.mathquill-rendered-math)").mathquill("editable");
        J(".mathquill-textbox:not(.mathquill-rendered-math)").mathquill("textbox");
        J(".mathquill-embedded-latex:not(.mathquill-rendered-math)").mathquill()
    })
})();
(function(c, g) {
    "function" === typeof define && define.amd ? define(["jquery"], function(k) {
        return g(k)
    }) : "object" === typeof exports ? module.exports = g(require("jquery")) : g(jQuery)
})(this, function(c) {
    function g(d) {
        this.$container;
        this.constraints = null;
        this.__$tooltip;
        this.__init(d)
    }

    function k(d, f) {
        var a = !0;
        c.each(d, function(m, v) {
            if (void 0 === f[m] || d[m] !== f[m]) return a = !1
        });
        return a
    }

    function r(d) {
        var f = d.attr("id");
        return (f = f ? q.window.document.getElementById(f) : null) ? f === d[0] : c.contains(q.window.document.body,
            d[0])
    }
    var t = {
            animation: "fade",
            animationDuration: 350,
            content: null,
            contentAsHTML: !1,
            contentCloning: !1,
            debug: !0,
            delay: 300,
            delayTouch: [300, 500],
            functionInit: null,
            functionBefore: null,
            functionReady: null,
            functionAfter: null,
            functionFormat: null,
            IEmin: 6,
            interactive: !1,
            multiple: !1,
            parent: "body",
            plugins: ["sideTip"],
            repositionOnScroll: !1,
            restoration: "none",
            selfDestruction: !0,
            theme: [],
            timer: 0,
            trackerInterval: 500,
            trackOrigin: !1,
            trackTooltip: !1,
            trigger: "hover",
            triggerClose: {
                click: !1,
                mouseleave: !1,
                originClick: !1,
                scroll: !1,
                tap: !1,
                touchleave: !1
            },
            triggerOpen: {
                click: !1,
                mouseenter: !1,
                tap: !1,
                touchstart: !1
            },
            updateAnimation: "rotate",
            zIndex: 9999999
        },
        l = "undefined" != typeof window ? window : null,
        q = {
            hasTouchCapability: !(!l || !("ontouchstart" in l || l.DocumentTouch && l.document instanceof l.DocumentTouch || l.navigator.maxTouchPoints)),
            hasTransitions: function() {
                if (!l) return !1;
                var d = (l.document.body || l.document.documentElement).style,
                    f = "transition",
                    a = ["Moz", "Webkit", "Khtml", "O", "ms"];
                if ("string" == typeof d[f]) return !0;
                f = f.charAt(0).toUpperCase() +
                    f.substr(1);
                for (var m = 0; m < a.length; m++)
                    if ("string" == typeof d[a[m] + f]) return !0;
                return !1
            }(),
            IE: !1,
            semVer: "4.1.6",
            window: l
        },
        z = function() {
            this.__$emitterPrivate = c({});
            this.__$emitterPublic = c({});
            this.__instancesLatestArr = [];
            this.__plugins = {};
            this._env = q
        };
    z.prototype = {
        __bridge: function(d, f, a) {
            if (!f[a]) {
                var m = function() {};
                m.prototype = d;
                var v = new m;
                v.__init && v.__init(f);
                c.each(d, function(x, w) {
                    0 != x.indexOf("__") && (f[x] ? t.debug && console.log("The " + x + " method of the " + a + " plugin conflicts with another plugin or native methods") :
                        (f[x] = function() {
                            return v[x].apply(v, Array.prototype.slice.apply(arguments))
                        }, f[x].bridged = v))
                });
                f[a] = v
            }
            return this
        },
        __setWindow: function(d) {
            q.window = d;
            return this
        },
        _getRuler: function(d) {
            return new g(d)
        },
        _off: function() {
            this.__$emitterPrivate.off.apply(this.__$emitterPrivate, Array.prototype.slice.apply(arguments));
            return this
        },
        _on: function() {
            this.__$emitterPrivate.on.apply(this.__$emitterPrivate, Array.prototype.slice.apply(arguments));
            return this
        },
        _one: function() {
            this.__$emitterPrivate.one.apply(this.__$emitterPrivate,
                Array.prototype.slice.apply(arguments));
            return this
        },
        _plugin: function(d) {
            if ("string" == typeof d) {
                var f = null;
                0 < d.indexOf(".") ? f = this.__plugins[d] : c.each(this.__plugins, function(a, m) {
                    if (m.name.substring(m.name.length - d.length - 1) == "." + d) return f = m, !1
                });
                return f
            }
            if (0 > d.name.indexOf(".")) throw Error("Plugins must be namespaced");
            this.__plugins[d.name] = d;
            d.core && this.__bridge(d.core, this, d.name);
            return this
        },
        _trigger: function() {
            var d = Array.prototype.slice.apply(arguments);
            "string" == typeof d[0] && (d[0] = {
                type: d[0]
            });
            this.__$emitterPrivate.trigger.apply(this.__$emitterPrivate, d);
            this.__$emitterPublic.trigger.apply(this.__$emitterPublic, d);
            return this
        },
        instances: function(d) {
            var f = [];
            c(d || ".tooltipstered").each(function() {
                var a = c(this),
                    m = a.data("tooltipster-ns");
                m && c.each(m, function(v, x) {
                    f.push(a.data(x))
                })
            });
            return f
        },
        instancesLatest: function() {
            return this.__instancesLatestArr
        },
        off: function() {
            this.__$emitterPublic.off.apply(this.__$emitterPublic, Array.prototype.slice.apply(arguments));
            return this
        },
        on: function() {
            this.__$emitterPublic.on.apply(this.__$emitterPublic,
                Array.prototype.slice.apply(arguments));
            return this
        },
        one: function() {
            this.__$emitterPublic.one.apply(this.__$emitterPublic, Array.prototype.slice.apply(arguments));
            return this
        },
        origins: function(d) {
            return c((d ? d + " " : "") + ".tooltipstered").toArray()
        },
        setDefaults: function(d) {
            c.extend(t, d);
            return this
        },
        triggerHandler: function() {
            this.__$emitterPublic.triggerHandler.apply(this.__$emitterPublic, Array.prototype.slice.apply(arguments));
            return this
        }
    };
    c.tooltipster = new z;
    c.Tooltipster = function(d, f) {
        this.__callbacks = {
            close: [],
            open: []
        };
        this.__closingTime;
        this.__Content;
        this.__contentBcr;
        this.__destroying = this.__destroyed = !1;
        this.__$emitterPrivate = c({});
        this.__$emitterPublic = c({});
        this.__enabled = !0;
        this.__garbageCollector;
        this.__Geometry;
        this.__lastPosition;
        this.__namespace = "tooltipster-" + Math.round(1E6 * Math.random());
        this.__options;
        this.__$originParents;
        this.__pointerIsOverOrigin = !1;
        this.__previousThemes = [];
        this.__state = "closed";
        this.__timeouts = {
            close: [],
            open: null
        };
        this.__touchEvents = [];
        this.__tracker = null;
        this._$origin;
        this._$tooltip;
        this.__init(d, f)
    };
    c.Tooltipster.prototype = {
        __init: function(d, f) {
            var a = this;
            a._$origin = c(d);
            a.__options = c.extend(!0, {}, t, f);
            a.__optionsFormat();
            if (!q.IE || q.IE >= a.__options.IEmin) {
                d = null;
                void 0 === a._$origin.data("tooltipster-initialTitle") && (d = a._$origin.attr("title"), void 0 === d && (d = null), a._$origin.data("tooltipster-initialTitle", d));
                if (null !== a.__options.content) a.__contentSet(a.__options.content);
                else {
                    f = a._$origin.attr("data-tooltip-content");
                    var m;
                    f && (m = c(f));
                    m && m[0] ? a.__contentSet(m.first()) :
                        a.__contentSet(d)
                }
                a._$origin.removeAttr("title").addClass("tooltipstered");
                a.__prepareOrigin();
                a.__prepareGC();
                c.each(a.__options.plugins, function(v, x) {
                    a._plug(x)
                });
                if (q.hasTouchCapability) c("body").on("touchmove." + a.__namespace + "-triggerOpen", function(v) {
                    a._touchRecordEvent(v)
                });
                a._on("created", function() {
                    a.__prepareTooltip()
                })._on("repositioned", function(v) {
                    a.__lastPosition = v.position
                })
            } else a.__options.disabled = !0
        },
        __contentInsert: function() {
            var d = this._$tooltip.find(".tooltipster-content"),
                f =
                this.__Content;
            this._trigger({
                type: "format",
                content: this.__Content,
                format: function(a) {
                    f = a
                }
            });
            this.__options.functionFormat && (f = this.__options.functionFormat.call(this, this, {
                origin: this._$origin[0]
            }, this.__Content));
            "string" !== typeof f || this.__options.contentAsHTML ? d.empty().append(f) : d.text(f);
            return this
        },
        __contentSet: function(d) {
            d instanceof c && this.__options.contentCloning && (d = d.clone(!0));
            this.__Content = d;
            this._trigger({
                type: "updated",
                content: d
            });
            return this
        },
        __destroyError: function() {
            throw Error("This tooltip has been destroyed and cannot execute your method call.");
        },
        __geometry: function() {
            var d = this._$origin,
                f = this._$origin.is("area");
            if (f) {
                var a = this._$origin.parent().attr("name");
                d = c('img[usemap="#' + a + '"]')
            }
            var m = d[0].getBoundingClientRect(),
                v = c(q.window.document),
                x = c(q.window);
            a = d;
            var w = {
                available: {
                    document: null,
                    window: null
                },
                document: {
                    size: {
                        height: v.height(),
                        width: v.width()
                    }
                },
                window: {
                    scroll: {
                        left: q.window.scrollX || q.window.document.documentElement.scrollLeft,
                        top: q.window.scrollY || q.window.document.documentElement.scrollTop
                    },
                    size: {
                        height: x.height(),
                        width: x.width()
                    }
                },
                origin: {
                    fixedLineage: !1,
                    offset: {},
                    size: {
                        height: m.bottom - m.top,
                        width: m.right - m.left
                    },
                    usemapImage: f ? d[0] : null,
                    windowOffset: {
                        bottom: m.bottom,
                        left: m.left,
                        right: m.right,
                        top: m.top
                    }
                }
            };
            if (f) {
                f = this._$origin.attr("shape");
                var E = this._$origin.attr("coords");
                E && (E = E.split(","), c.map(E, function(N, V) {
                    E[V] = parseInt(N)
                }));
                if ("default" != f) switch (f) {
                    case "circle":
                        f = E[0];
                        d = E[1];
                        m = E[2];
                        w.origin.size.height = 2 * m;
                        w.origin.size.width = w.origin.size.height;
                        w.origin.windowOffset.left += f - m;
                        w.origin.windowOffset.top += d - m;
                        break;
                    case "rect":
                        f = E[0];
                        d = E[1];
                        m = E[2];
                        w.origin.size.height = E[3] - d;
                        w.origin.size.width = m - f;
                        w.origin.windowOffset.left += f;
                        w.origin.windowOffset.top += d;
                        break;
                    case "poly":
                        v = m = d = f = 0;
                        x = "even";
                        for (var C = 0; C < E.length; C++) {
                            var A = E[C];
                            "even" == x ? (A > m && (m = A, 0 === C && (f = m)), A < f && (f = A), x = "odd") : (A > v && (v = A, 1 == C && (d = v)), A < d && (d = A), x = "even")
                        }
                        w.origin.size.height = v - d;
                        w.origin.size.width = m - f;
                        w.origin.windowOffset.left += f;
                        w.origin.windowOffset.top += d
                }
            }
            this._trigger({
                type: "geometry",
                edit: function(N) {
                    w.origin.size.height = N.height;
                    w.origin.windowOffset.left = N.left;
                    w.origin.windowOffset.top = N.top;
                    w.origin.size.width = N.width
                },
                geometry: {
                    height: w.origin.size.height,
                    left: w.origin.windowOffset.left,
                    top: w.origin.windowOffset.top,
                    width: w.origin.size.width
                }
            });
            w.origin.windowOffset.right = w.origin.windowOffset.left + w.origin.size.width;
            w.origin.windowOffset.bottom = w.origin.windowOffset.top + w.origin.size.height;
            w.origin.offset.left = w.origin.windowOffset.left + w.window.scroll.left;
            w.origin.offset.top = w.origin.windowOffset.top + w.window.scroll.top;
            w.origin.offset.bottom = w.origin.offset.top + w.origin.size.height;
            w.origin.offset.right = w.origin.offset.left + w.origin.size.width;
            w.available.document = {
                bottom: {
                    height: w.document.size.height - w.origin.offset.bottom,
                    width: w.document.size.width
                },
                left: {
                    height: w.document.size.height,
                    width: w.origin.offset.left
                },
                right: {
                    height: w.document.size.height,
                    width: w.document.size.width - w.origin.offset.right
                },
                top: {
                    height: w.origin.offset.top,
                    width: w.document.size.width
                }
            };
            for (w.available.window = {
                    bottom: {
                        height: Math.max(w.window.size.height -
                            Math.max(w.origin.windowOffset.bottom, 0), 0),
                        width: w.window.size.width
                    },
                    left: {
                        height: w.window.size.height,
                        width: Math.max(w.origin.windowOffset.left, 0)
                    },
                    right: {
                        height: w.window.size.height,
                        width: Math.max(w.window.size.width - Math.max(w.origin.windowOffset.right, 0), 0)
                    },
                    top: {
                        height: Math.max(w.origin.windowOffset.top, 0),
                        width: w.window.size.width
                    }
                };
                "html" != a[0].tagName.toLowerCase();) {
                if ("fixed" == a.css("position")) {
                    w.origin.fixedLineage = !0;
                    break
                }
                a = a.parent()
            }
            return w
        },
        __optionsFormat: function() {
            "number" ==
            typeof this.__options.animationDuration && (this.__options.animationDuration = [this.__options.animationDuration, this.__options.animationDuration]);
            "number" == typeof this.__options.delay && (this.__options.delay = [this.__options.delay, this.__options.delay]);
            "number" == typeof this.__options.delayTouch && (this.__options.delayTouch = [this.__options.delayTouch, this.__options.delayTouch]);
            "string" == typeof this.__options.theme && (this.__options.theme = [this.__options.theme]);
            "string" == typeof this.__options.parent &&
                (this.__options.parent = c(this.__options.parent));
            "hover" == this.__options.trigger ? (this.__options.triggerOpen = {
                mouseenter: !0,
                touchstart: !0
            }, this.__options.triggerClose = {
                mouseleave: !0,
                originClick: !0,
                touchleave: !0
            }) : "click" == this.__options.trigger && (this.__options.triggerOpen = {
                click: !0,
                tap: !0
            }, this.__options.triggerClose = {
                click: !0,
                tap: !0
            });
            this._trigger("options");
            return this
        },
        __prepareGC: function() {
            var d = this;
            d.__options.selfDestruction ? d.__garbageCollector = setInterval(function() {
                var f = (new Date).getTime();
                d.__touchEvents = c.grep(d.__touchEvents, function(a, m) {
                    return 6E4 < f - a.time
                });
                r(d._$origin) || d.destroy()
            }, 2E4) : clearInterval(d.__garbageCollector);
            return d
        },
        __prepareOrigin: function() {
            var d = this;
            d._$origin.off("." + d.__namespace + "-triggerOpen");
            if (q.hasTouchCapability) d._$origin.on("touchstart." + d.__namespace + "-triggerOpen touchend." + d.__namespace + "-triggerOpen touchcancel." + d.__namespace + "-triggerOpen", function(a) {
                d._touchRecordEvent(a)
            });
            if (d.__options.triggerOpen.click || d.__options.triggerOpen.tap &&
                q.hasTouchCapability) {
                var f = "";
                d.__options.triggerOpen.click && (f += "click." + d.__namespace + "-triggerOpen ");
                d.__options.triggerOpen.tap && q.hasTouchCapability && (f += "touchend." + d.__namespace + "-triggerOpen");
                d._$origin.on(f, function(a) {
                    d._touchIsMeaningfulEvent(a) && d._open(a)
                })
            }
            if (d.__options.triggerOpen.mouseenter || d.__options.triggerOpen.touchstart && q.hasTouchCapability) f = "", d.__options.triggerOpen.mouseenter && (f += "mouseenter." + d.__namespace + "-triggerOpen "), d.__options.triggerOpen.touchstart && q.hasTouchCapability &&
                (f += "touchstart." + d.__namespace + "-triggerOpen"), d._$origin.on(f, function(a) {
                    if (d._touchIsTouchEvent(a) || !d._touchIsEmulatedEvent(a)) d.__pointerIsOverOrigin = !0, d._openShortly(a)
                });
            if (d.__options.triggerClose.mouseleave || d.__options.triggerClose.touchleave && q.hasTouchCapability) f = "", d.__options.triggerClose.mouseleave && (f += "mouseleave." + d.__namespace + "-triggerOpen "), d.__options.triggerClose.touchleave && q.hasTouchCapability && (f += "touchend." + d.__namespace + "-triggerOpen touchcancel." + d.__namespace + "-triggerOpen"),
                d._$origin.on(f, function(a) {
                    d._touchIsMeaningfulEvent(a) && (d.__pointerIsOverOrigin = !1)
                });
            return d
        },
        __prepareTooltip: function() {
            var d = this,
                f = d.__options.interactive ? "auto" : "";
            d._$tooltip.attr("id", d.__namespace).css({
                "pointer-events": f,
                zIndex: d.__options.zIndex
            });
            c.each(d.__previousThemes, function(a, m) {
                d._$tooltip.removeClass(m)
            });
            c.each(d.__options.theme, function(a, m) {
                d._$tooltip.addClass(m)
            });
            d.__previousThemes = c.merge([], d.__options.theme);
            return d
        },
        __scrollHandler: function(d) {
            if (this.__options.triggerClose.scroll) this._close(d);
            else {
                if (d.target === q.window.document) this.__Geometry.origin.fixedLineage || this.__options.repositionOnScroll && this.reposition(d);
                else {
                    var f = this.__geometry(),
                        a = !1;
                    "fixed" != this._$origin.css("position") && this.__$originParents.each(function(m, v) {
                        m = c(v);
                        var x = m.css("overflow-x"),
                            w = m.css("overflow-y");
                        if ("visible" != x || "visible" != w)
                            if (v = v.getBoundingClientRect(), "visible" != x && (f.origin.windowOffset.left < v.left || f.origin.windowOffset.right > v.right) || "visible" != w && (f.origin.windowOffset.top < v.top || f.origin.windowOffset.bottom >
                                    v.bottom)) return a = !0, !1;
                        if ("fixed" == m.css("position")) return !1
                    });
                    a ? this._$tooltip.css("visibility", "hidden") : (this._$tooltip.css("visibility", "visible"), this.__options.repositionOnScroll ? this.reposition(d) : this._$tooltip.css({
                        left: this.__lastPosition.coord.left + (f.origin.offset.left - this.__Geometry.origin.offset.left),
                        top: this.__lastPosition.coord.top + (f.origin.offset.top - this.__Geometry.origin.offset.top)
                    }))
                }
                this._trigger({
                    type: "scroll",
                    event: d
                })
            }
            return this
        },
        __stateSet: function(d) {
            this.__state =
                d;
            this._trigger({
                type: "state",
                state: d
            });
            return this
        },
        __timeoutsClear: function() {
            clearTimeout(this.__timeouts.open);
            this.__timeouts.open = null;
            c.each(this.__timeouts.close, function(d, f) {
                clearTimeout(f)
            });
            this.__timeouts.close = [];
            return this
        },
        __trackerStart: function() {
            var d = this,
                f = d._$tooltip.find(".tooltipster-content");
            d.__options.trackTooltip && (d.__contentBcr = f[0].getBoundingClientRect());
            d.__tracker = setInterval(function() {
                if (r(d._$origin) && r(d._$tooltip)) {
                    if (d.__options.trackOrigin) {
                        var a = d.__geometry(),
                            m = !1;
                        k(a.origin.size, d.__Geometry.origin.size) && (d.__Geometry.origin.fixedLineage ? k(a.origin.windowOffset, d.__Geometry.origin.windowOffset) && (m = !0) : k(a.origin.offset, d.__Geometry.origin.offset) && (m = !0));
                        m || (d.__options.triggerClose.mouseleave ? d._close() : d.reposition())
                    }
                    d.__options.trackTooltip && (a = f[0].getBoundingClientRect(), a.height !== d.__contentBcr.height || a.width !== d.__contentBcr.width) && (d.reposition(), d.__contentBcr = a)
                } else d._close()
            }, d.__options.trackerInterval);
            return d
        },
        _close: function(d,
            f) {
            var a = this,
                m = !0;
            a._trigger({
                type: "close",
                event: d,
                stop: function() {
                    m = !1
                }
            });
            if (m || a.__destroying) {
                f && a.__callbacks.close.push(f);
                a.__callbacks.open = [];
                a.__timeoutsClear();
                var v = function() {
                    c.each(a.__callbacks.close, function(w, E) {
                        E.call(a, a, {
                            event: d,
                            origin: a._$origin[0]
                        })
                    });
                    a.__callbacks.close = []
                };
                if ("closed" != a.__state) {
                    f = !0;
                    var x = (new Date).getTime() + a.__options.animationDuration[1];
                    "disappearing" == a.__state && x > a.__closingTime && (f = !1);
                    f && (a.__closingTime = x, "disappearing" != a.__state && a.__stateSet("disappearing"),
                        f = function() {
                            clearInterval(a.__tracker);
                            a._trigger({
                                type: "closing",
                                event: d
                            });
                            a._$tooltip.off("." + a.__namespace + "-triggerClose").removeClass("tooltipster-dying");
                            c(q.window).off("." + a.__namespace + "-triggerClose");
                            a.__$originParents.each(function(w, E) {
                                c(E).off("scroll." + a.__namespace + "-triggerClose")
                            });
                            a.__$originParents = null;
                            c("body").off("." + a.__namespace + "-triggerClose");
                            a._$origin.off("." + a.__namespace + "-triggerClose");
                            a._off("dismissable");
                            a.__stateSet("closed");
                            a._trigger({
                                type: "after",
                                event: d
                            });
                            a.__options.functionAfter && a.__options.functionAfter.call(a, a, {
                                event: d,
                                origin: a._$origin[0]
                            });
                            v()
                        }, q.hasTransitions ? (a._$tooltip.css({
                            "-moz-animation-duration": a.__options.animationDuration[1] + "ms",
                            "-ms-animation-duration": a.__options.animationDuration[1] + "ms",
                            "-o-animation-duration": a.__options.animationDuration[1] + "ms",
                            "-webkit-animation-duration": a.__options.animationDuration[1] + "ms",
                            "animation-duration": a.__options.animationDuration[1] + "ms",
                            "transition-duration": a.__options.animationDuration[1] +
                                "ms"
                        }), a._$tooltip.clearQueue().removeClass("tooltipster-show").addClass("tooltipster-dying"), 0 < a.__options.animationDuration[1] && a._$tooltip.delay(a.__options.animationDuration[1]), a._$tooltip.queue(f)) : a._$tooltip.stop().fadeOut(a.__options.animationDuration[1], f))
                } else v()
            }
            return a
        },
        _off: function() {
            this.__$emitterPrivate.off.apply(this.__$emitterPrivate, Array.prototype.slice.apply(arguments));
            return this
        },
        _on: function() {
            this.__$emitterPrivate.on.apply(this.__$emitterPrivate, Array.prototype.slice.apply(arguments));
            return this
        },
        _one: function() {
            this.__$emitterPrivate.one.apply(this.__$emitterPrivate, Array.prototype.slice.apply(arguments));
            return this
        },
        _open: function(d, f) {
            var a = this;
            if (!a.__destroying && r(a._$origin) && a.__enabled) {
                var m = !0;
                "closed" == a.__state && (a._trigger({
                    type: "before",
                    event: d,
                    stop: function() {
                        m = !1
                    }
                }), m && a.__options.functionBefore && (m = a.__options.functionBefore.call(a, a, {
                    event: d,
                    origin: a._$origin[0]
                })));
                if (!1 !== m && null !== a.__Content) {
                    f && a.__callbacks.open.push(f);
                    a.__callbacks.close = [];
                    a.__timeoutsClear();
                    var v = function() {
                        "stable" != a.__state && a.__stateSet("stable");
                        c.each(a.__callbacks.open, function(C, A) {
                            A.call(a, a, {
                                origin: a._$origin[0],
                                tooltip: a._$tooltip[0]
                            })
                        });
                        a.__callbacks.open = []
                    };
                    if ("closed" !== a.__state) f = 0, "disappearing" === a.__state ? (a.__stateSet("appearing"), q.hasTransitions ? (a._$tooltip.clearQueue().removeClass("tooltipster-dying").addClass("tooltipster-show"), 0 < a.__options.animationDuration[0] && a._$tooltip.delay(a.__options.animationDuration[0]), a._$tooltip.queue(v)) : a._$tooltip.stop().fadeIn(v)) :
                        "stable" == a.__state && v();
                    else {
                        a.__stateSet("appearing");
                        f = a.__options.animationDuration[0];
                        a.__contentInsert();
                        a.reposition(d, !0);
                        q.hasTransitions ? (a._$tooltip.addClass("tooltipster-" + a.__options.animation).addClass("tooltipster-initial").css({
                            "-moz-animation-duration": a.__options.animationDuration[0] + "ms",
                            "-ms-animation-duration": a.__options.animationDuration[0] + "ms",
                            "-o-animation-duration": a.__options.animationDuration[0] + "ms",
                            "-webkit-animation-duration": a.__options.animationDuration[0] + "ms",
                            "animation-duration": a.__options.animationDuration[0] +
                                "ms",
                            "transition-duration": a.__options.animationDuration[0] + "ms"
                        }), setTimeout(function() {
                            "closed" != a.__state && (a._$tooltip.addClass("tooltipster-show").removeClass("tooltipster-initial"), 0 < a.__options.animationDuration[0] && a._$tooltip.delay(a.__options.animationDuration[0]), a._$tooltip.queue(v))
                        }, 0)) : a._$tooltip.css("display", "none").fadeIn(a.__options.animationDuration[0], v);
                        a.__trackerStart();
                        c(q.window).on("resize." + a.__namespace + "-triggerClose", function(C) {
                            var A = c(document.activeElement);
                            (A.is("input") ||
                                A.is("textarea")) && c.contains(a._$tooltip[0], A[0]) || a.reposition(C)
                        }).on("scroll." + a.__namespace + "-triggerClose", function(C) {
                            a.__scrollHandler(C)
                        });
                        a.__$originParents = a._$origin.parents();
                        a.__$originParents.each(function(C, A) {
                            c(A).on("scroll." + a.__namespace + "-triggerClose", function(N) {
                                a.__scrollHandler(N)
                            })
                        });
                        if (a.__options.triggerClose.mouseleave || a.__options.triggerClose.touchleave && q.hasTouchCapability) {
                            a._on("dismissable", function(C) {
                                C.dismissable ? C.delay ? (E = setTimeout(function() {
                                        a._close(C.event)
                                    },
                                    C.delay), a.__timeouts.close.push(E)) : a._close(C) : clearTimeout(E)
                            });
                            d = a._$origin;
                            var x = "",
                                w = "",
                                E = null;
                            a.__options.interactive && (d = d.add(a._$tooltip));
                            a.__options.triggerClose.mouseleave && (x += "mouseenter." + a.__namespace + "-triggerClose ", w += "mouseleave." + a.__namespace + "-triggerClose ");
                            a.__options.triggerClose.touchleave && q.hasTouchCapability && (x += "touchstart." + a.__namespace + "-triggerClose", w += "touchend." + a.__namespace + "-triggerClose touchcancel." + a.__namespace + "-triggerClose");
                            d.on(w, function(C) {
                                !a._touchIsTouchEvent(C) &&
                                    a._touchIsEmulatedEvent(C) || a._trigger({
                                        delay: ("mouseleave" == C.type ? a.__options.delay : a.__options.delayTouch)[1],
                                        dismissable: !0,
                                        event: C,
                                        type: "dismissable"
                                    })
                            }).on(x, function(C) {
                                !a._touchIsTouchEvent(C) && a._touchIsEmulatedEvent(C) || a._trigger({
                                    dismissable: !1,
                                    event: C,
                                    type: "dismissable"
                                })
                            })
                        }
                        if (a.__options.triggerClose.originClick) a._$origin.on("click." + a.__namespace + "-triggerClose", function(C) {
                            a._touchIsTouchEvent(C) || a._touchIsEmulatedEvent(C) || a._close(C)
                        });
                        (a.__options.triggerClose.click || a.__options.triggerClose.tap &&
                            q.hasTouchCapability) && setTimeout(function() {
                            if ("closed" != a.__state) {
                                var C = "";
                                a.__options.triggerClose.click && (C += "click." + a.__namespace + "-triggerClose ");
                                a.__options.triggerClose.tap && q.hasTouchCapability && (C += "touchend." + a.__namespace + "-triggerClose");
                                c("body").on(C, function(A) {
                                    a._touchIsMeaningfulEvent(A) && (a._touchRecordEvent(A), a.__options.interactive && c.contains(a._$tooltip[0], A.target) || a._close(A))
                                });
                                if (a.__options.triggerClose.tap && q.hasTouchCapability) c("body").on("touchstart." + a.__namespace +
                                    "-triggerClose",
                                    function(A) {
                                        a._touchRecordEvent(A)
                                    })
                            }
                        }, 0);
                        a._trigger("ready");
                        a.__options.functionReady && a.__options.functionReady.call(a, a, {
                            origin: a._$origin[0],
                            tooltip: a._$tooltip[0]
                        })
                    }
                    0 < a.__options.timer && (E = setTimeout(function() {
                        a._close()
                    }, a.__options.timer + f), a.__timeouts.close.push(E))
                }
            }
            return a
        },
        _openShortly: function(d) {
            var f = this,
                a = !0;
            if ("stable" != f.__state && "appearing" != f.__state && !f.__timeouts.open && (f._trigger({
                    type: "start",
                    event: d,
                    stop: function() {
                        a = !1
                    }
                }), a)) {
                var m = 0 == d.type.indexOf("touch") ?
                    f.__options.delayTouch : f.__options.delay;
                m[0] ? f.__timeouts.open = setTimeout(function() {
                    f.__timeouts.open = null;
                    f.__pointerIsOverOrigin && f._touchIsMeaningfulEvent(d) ? (f._trigger("startend"), f._open(d)) : f._trigger("startcancel")
                }, m[0]) : (f._trigger("startend"), f._open(d))
            }
            return f
        },
        _optionsExtract: function(d, f) {
            var a = this,
                m = c.extend(!0, {}, f),
                v = a.__options[d];
            v || (v = {}, c.each(f, function(x, w) {
                w = a.__options[x];
                void 0 !== w && (v[x] = w)
            }));
            c.each(m, function(x, w) {
                void 0 !== v[x] && ("object" != typeof w || w instanceof Array ||
                    null == w || "object" != typeof v[x] || v[x] instanceof Array || null == v[x] ? m[x] = v[x] : c.extend(m[x], v[x]))
            });
            return m
        },
        _plug: function(d) {
            var f = c.tooltipster._plugin(d);
            if (f) f.instance && c.tooltipster.__bridge(f.instance, this, f.name);
            else throw Error('The "' + d + '" plugin is not defined');
            return this
        },
        _touchIsEmulatedEvent: function(d) {
            for (var f = !1, a = (new Date).getTime(), m = this.__touchEvents.length - 1; 0 <= m; m--) {
                var v = this.__touchEvents[m];
                if (500 > a - v.time) v.target === d.target && (f = !0);
                else break
            }
            return f
        },
        _touchIsMeaningfulEvent: function(d) {
            return this._touchIsTouchEvent(d) &&
                !this._touchSwiped(d.target) || !this._touchIsTouchEvent(d) && !this._touchIsEmulatedEvent(d)
        },
        _touchIsTouchEvent: function(d) {
            return 0 == d.type.indexOf("touch")
        },
        _touchRecordEvent: function(d) {
            this._touchIsTouchEvent(d) && (d.time = (new Date).getTime(), this.__touchEvents.push(d));
            return this
        },
        _touchSwiped: function(d) {
            for (var f = !1, a = this.__touchEvents.length - 1; 0 <= a; a--) {
                var m = this.__touchEvents[a];
                if ("touchmove" == m.type) {
                    f = !0;
                    break
                } else if ("touchstart" == m.type && d === m.target) break
            }
            return f
        },
        _trigger: function() {
            var d =
                Array.prototype.slice.apply(arguments);
            "string" == typeof d[0] && (d[0] = {
                type: d[0]
            });
            d[0].instance = this;
            d[0].origin = this._$origin ? this._$origin[0] : null;
            d[0].tooltip = this._$tooltip ? this._$tooltip[0] : null;
            this.__$emitterPrivate.trigger.apply(this.__$emitterPrivate, d);
            c.tooltipster._trigger.apply(c.tooltipster, d);
            this.__$emitterPublic.trigger.apply(this.__$emitterPublic, d);
            return this
        },
        _unplug: function(d) {
            var f = this;
            if (f[d]) {
                var a = c.tooltipster._plugin(d);
                a.instance && c.each(a.instance, function(m, v) {
                    f[m] &&
                        f[m].bridged === f[d] && delete f[m]
                });
                f[d].__destroy && f[d].__destroy();
                delete f[d]
            }
            return f
        },
        close: function(d) {
            this.__destroyed ? this.__destroyError() : this._close(null, d);
            return this
        },
        content: function(d) {
            var f = this;
            if (void 0 === d) return f.__Content;
            if (f.__destroyed) f.__destroyError();
            else if (f.__contentSet(d), null !== f.__Content) {
                if ("closed" !== f.__state && (f.__contentInsert(), f.reposition(), f.__options.updateAnimation))
                    if (q.hasTransitions) {
                        var a = f.__options.updateAnimation;
                        f._$tooltip.addClass("tooltipster-update-" +
                            a);
                        setTimeout(function() {
                            "closed" != f.__state && f._$tooltip.removeClass("tooltipster-update-" + a)
                        }, 1E3)
                    } else f._$tooltip.fadeTo(200, .5, function() {
                        "closed" != f.__state && f._$tooltip.fadeTo(200, 1)
                    })
            } else f._close();
            return f
        },
        destroy: function() {
            var d = this;
            d.__destroyed ? d.__destroyError() : d.__destroying || (d.__destroying = !0, d._close(null, function() {
                d._trigger("destroy");
                d.__destroying = !1;
                d.__destroyed = !0;
                d._$origin.removeData(d.__namespace).off("." + d.__namespace + "-triggerOpen");
                c("body").off("." + d.__namespace +
                    "-triggerOpen");
                var f = d._$origin.data("tooltipster-ns");
                f && (1 === f.length ? (f = null, "previous" == d.__options.restoration ? f = d._$origin.data("tooltipster-initialTitle") : "current" == d.__options.restoration && (f = "string" == typeof d.__Content ? d.__Content : c("<div></div>").append(d.__Content).html()), f && d._$origin.attr("title", f), d._$origin.removeClass("tooltipstered"), d._$origin.removeData("tooltipster-ns").removeData("tooltipster-initialTitle")) : (f = c.grep(f, function(a, m) {
                    return a !== d.__namespace
                }), d._$origin.data("tooltipster-ns",
                    f)));
                d._trigger("destroyed");
                d._off();
                d.off();
                d.__Content = null;
                d.__$emitterPrivate = null;
                d.__$emitterPublic = null;
                d.__options.parent = null;
                d._$origin = null;
                d._$tooltip = null;
                c.tooltipster.__instancesLatestArr = c.grep(c.tooltipster.__instancesLatestArr, function(a, m) {
                    return d !== a
                });
                clearInterval(d.__garbageCollector)
            }));
            return d
        },
        disable: function() {
            this.__destroyed ? this.__destroyError() : (this._close(), this.__enabled = !1);
            return this
        },
        elementOrigin: function() {
            if (this.__destroyed) this.__destroyError();
            else return this._$origin[0]
        },
        elementTooltip: function() {
            return this._$tooltip ? this._$tooltip[0] : null
        },
        enable: function() {
            this.__enabled = !0;
            return this
        },
        hide: function(d) {
            return this.close(d)
        },
        instance: function() {
            return this
        },
        off: function() {
            this.__destroyed || this.__$emitterPublic.off.apply(this.__$emitterPublic, Array.prototype.slice.apply(arguments));
            return this
        },
        on: function() {
            this.__destroyed ? this.__destroyError() : this.__$emitterPublic.on.apply(this.__$emitterPublic, Array.prototype.slice.apply(arguments));
            return this
        },
        one: function() {
            this.__destroyed ?
                this.__destroyError() : this.__$emitterPublic.one.apply(this.__$emitterPublic, Array.prototype.slice.apply(arguments));
            return this
        },
        open: function(d) {
            this.__destroyed || this.__destroying ? this.__destroyError() : this._open(null, d);
            return this
        },
        option: function(d, f) {
            if (void 0 === f) return this.__options[d];
            this.__destroyed ? this.__destroyError() : (this.__options[d] = f, this.__optionsFormat(), 0 <= c.inArray(d, ["trigger", "triggerClose", "triggerOpen"]) && this.__prepareOrigin(), "selfDestruction" === d && this.__prepareGC());
            return this
        },
        reposition: function(d, f) {
            this.__destroyed ? this.__destroyError() : "closed" != this.__state && r(this._$origin) && (f || r(this._$tooltip)) && (f || this._$tooltip.detach(), this.__Geometry = this.__geometry(), this._trigger({
                type: "reposition",
                event: d,
                helper: {
                    geo: this.__Geometry
                }
            }));
            return this
        },
        show: function(d) {
            return this.open(d)
        },
        status: function() {
            return {
                destroyed: this.__destroyed,
                destroying: this.__destroying,
                enabled: this.__enabled,
                open: "closed" !== this.__state,
                state: this.__state
            }
        },
        triggerHandler: function() {
            this.__destroyed ?
                this.__destroyError() : this.__$emitterPublic.triggerHandler.apply(this.__$emitterPublic, Array.prototype.slice.apply(arguments));
            return this
        }
    };
    c.fn.tooltipster = function() {
        var d = Array.prototype.slice.apply(arguments);
        if (0 === this.length) return this;
        if ("string" === typeof d[0]) {
            var f = "#*$~&";
            this.each(function() {
                var E = c(this).data("tooltipster-ns");
                if (E = E ? c(this).data(E[0]) : null) {
                    if ("function" === typeof E[d[0]]) {
                        1 < this.length && "content" == d[0] && (d[1] instanceof c || "object" == typeof d[1] && null != d[1] && d[1].tagName) &&
                            !E.__options.contentCloning && E.__options.debug && console.log("You are using a single HTML element as content for several tooltips. You probably want to set the contentCloning option to TRUE.");
                        var C = E[d[0]](d[1], d[2])
                    } else throw Error('Unknown method "' + d[0] + '"');
                    if (C !== E || "instance" === d[0]) return f = C, !1
                } else throw Error("You called Tooltipster's \"" + d[0] + '" method on an uninitialized element');
            });
            return "#*$~&" !== f ? f : this
        }
        c.tooltipster.__instancesLatestArr = [];
        var a = d[0] && void 0 !== d[0].multiple,
            m = a &&
            d[0].multiple || !a && t.multiple;
        a = (a = d[0] && void 0 !== d[0].content) && d[0].content || !a && t.content;
        var v = d[0] && void 0 !== d[0].contentCloning;
        v = v && d[0].contentCloning || !v && t.contentCloning;
        var x = d[0] && void 0 !== d[0].debug,
            w = x && d[0].debug || !x && t.debug;
        1 < this.length && (a instanceof c || "object" == typeof a && null != a && a.tagName) && !v && w && console.log("You are using a single HTML element as content for several tooltips. You probably want to set the contentCloning option to TRUE.");
        this.each(function() {
            var E = !1,
                C = c(this),
                A = C.data("tooltipster-ns"),
                N = null;
            A ? m ? E = !0 : w && (console.log("Tooltipster: one or more tooltips are already attached to the element below. Ignoring."), console.log(this)) : E = !0;
            E && (N = new c.Tooltipster(this, d[0]), A ||= [], A.push(N.__namespace), C.data("tooltipster-ns", A), C.data(N.__namespace, N), N.__options.functionInit && N.__options.functionInit.call(N, N, {
                origin: this
            }), N._trigger("init"));
            c.tooltipster.__instancesLatestArr.push(N)
        });
        return this
    };
    g.prototype = {
        __init: function(d) {
            this.__$tooltip = d;
            this.__$tooltip.css({
                left: 0,
                overflow: "hidden",
                position: "absolute",
                top: 0
            }).find(".tooltipster-content").css("overflow", "auto");
            this.$container = c('<div class="tooltipster-ruler"></div>').append(this.__$tooltip).appendTo("body")
        },
        __forceRedraw: function() {
            var d = this.__$tooltip.parent();
            this.__$tooltip.detach();
            this.__$tooltip.appendTo(d)
        },
        constrain: function(d, f) {
            this.constraints = {
                width: d,
                height: f
            };
            this.__$tooltip.css({
                display: "block",
                height: "",
                overflow: "auto",
                width: d
            });
            return this
        },
        destroy: function() {
            this.__$tooltip.detach().find(".tooltipster-content").css({
                display: "",
                overflow: ""
            });
            this.$container.remove()
        },
        free: function() {
            this.constraints = null;
            this.__$tooltip.css({
                display: "",
                height: "",
                overflow: "visible",
                width: ""
            });
            return this
        },
        measure: function() {
            this.__forceRedraw();
            var d = this.__$tooltip[0].getBoundingClientRect(),
                f = {
                    size: {
                        height: d.height || d.bottom,
                        width: d.width || d.right
                    }
                };
            if (this.constraints) {
                var a = this.__$tooltip.find(".tooltipster-content"),
                    m = this.__$tooltip.outerHeight(),
                    v = a[0].getBoundingClientRect();
                d = d.width <= this.constraints.width && v.width >= a[0].scrollWidth -
                    1;
                f.fits = m <= this.constraints.height && d
            }
            q.IE && 11 >= q.IE && f.size.width !== q.window.document.documentElement.clientWidth && (f.size.width = Math.ceil(f.size.width) + 1);
            return f
        }
    };
    z = navigator.userAgent.toLowerCase(); - 1 != z.indexOf("msie") ? q.IE = parseInt(z.split("msie")[1]) : -1 !== z.toLowerCase().indexOf("trident") && -1 !== z.indexOf(" rv:11") ? q.IE = 11 : -1 != z.toLowerCase().indexOf("edge/") && (q.IE = parseInt(z.toLowerCase().split("edge/")[1]));
    c.tooltipster._plugin({
        name: "tooltipster.sideTip",
        instance: {
            __defaults: function() {
                return {
                    arrow: !0,
                    distance: 6,
                    functionPosition: null,
                    maxWidth: null,
                    minIntersection: 16,
                    minWidth: 0,
                    position: null,
                    side: "top",
                    viewportAware: !0
                }
            },
            __init: function(d) {
                var f = this;
                f.__instance = d;
                f.__namespace = "tooltipster-sideTip-" + Math.round(1E6 * Math.random());
                f.__previousState = "closed";
                f.__options;
                f.__optionsFormat();
                f.__instance._on("state." + f.__namespace, function(a) {
                    "closed" == a.state ? f.__close() : "appearing" == a.state && "closed" == f.__previousState && f.__create();
                    f.__previousState = a.state
                });
                f.__instance._on("options." + f.__namespace,
                    function() {
                        f.__optionsFormat()
                    });
                f.__instance._on("reposition." + f.__namespace, function(a) {
                    f.__reposition(a.event, a.helper)
                })
            },
            __close: function() {
                this.__instance.content() instanceof c && this.__instance.content().detach();
                this.__instance._$tooltip.remove();
                this.__instance._$tooltip = null
            },
            __create: function() {
                var d = c('<div class="tooltipster-base tooltipster-sidetip"><div class="tooltipster-box"><div class="tooltipster-content"></div></div><div class="tooltipster-arrow"><div class="tooltipster-arrow-uncropped"><div class="tooltipster-arrow-border"></div><div class="tooltipster-arrow-background"></div></div></div></div>');
                this.__options.arrow || d.find(".tooltipster-box").css("margin", 0).end().find(".tooltipster-arrow").hide();
                this.__options.minWidth && d.css("min-width", this.__options.minWidth + "px");
                this.__options.maxWidth && d.css("max-width", this.__options.maxWidth + "px");
                this.__instance._$tooltip = d;
                this.__instance._trigger("created")
            },
            __destroy: function() {
                this.__instance._off("." + self.__namespace)
            },
            __optionsFormat: function() {
                this.__options = this.__instance._optionsExtract("tooltipster.sideTip", this.__defaults());
                this.__options.position &&
                    (this.__options.side = this.__options.position);
                "object" != typeof this.__options.distance && (this.__options.distance = [this.__options.distance]);
                4 > this.__options.distance.length && (void 0 === this.__options.distance[1] && (this.__options.distance[1] = this.__options.distance[0]), void 0 === this.__options.distance[2] && (this.__options.distance[2] = this.__options.distance[0]), void 0 === this.__options.distance[3] && (this.__options.distance[3] = this.__options.distance[1]), this.__options.distance = {
                    top: this.__options.distance[0],
                    right: this.__options.distance[1],
                    bottom: this.__options.distance[2],
                    left: this.__options.distance[3]
                });
                "string" == typeof this.__options.side && (this.__options.side = [this.__options.side, {
                    top: "bottom",
                    right: "left",
                    bottom: "top",
                    left: "right"
                } [this.__options.side]], "left" == this.__options.side[0] || "right" == this.__options.side[0] ? this.__options.side.push("top", "bottom") : this.__options.side.push("right", "left"));
                6 === c.tooltipster._env.IE && !0 !== this.__options.arrow && (this.__options.arrow = !1)
            },
            __reposition: function(d,
                f) {
                var a, m = this,
                    v = m.__targetFind(f),
                    x = [];
                m.__instance._$tooltip.detach();
                var w = m.__instance._$tooltip.clone(),
                    E = c.tooltipster._getRuler(w),
                    C = !1;
                (a = m.__instance.option("animation")) && w.removeClass("tooltipster-" + a);
                c.each(["window", "document"], function(K, M) {
                    var R = null;
                    m.__instance._trigger({
                        container: M,
                        helper: f,
                        satisfied: C,
                        takeTest: function(P) {
                            R = P
                        },
                        results: x,
                        type: "positionTest"
                    });
                    if (1 == R || 0 != R && 0 == C && ("window" != M || m.__options.viewportAware))
                        for (K = 0; K < m.__options.side.length; K++) {
                            var X = {
                                    horizontal: 0,
                                    vertical: 0
                                },
                                S = m.__options.side[K];
                            "top" == S || "bottom" == S ? X.vertical = m.__options.distance[S] : X.horizontal = m.__options.distance[S];
                            m.__sideChange(w, S);
                            c.each(["natural", "constrained"], function(P, ca) {
                                R = null;
                                m.__instance._trigger({
                                    container: M,
                                    event: d,
                                    helper: f,
                                    mode: ca,
                                    results: x,
                                    satisfied: C,
                                    side: S,
                                    takeTest: function(pa) {
                                        R = pa
                                    },
                                    type: "positionTest"
                                });
                                if (1 == R || 0 != R && 0 == C) {
                                    P = {
                                        container: M,
                                        distance: X,
                                        fits: null,
                                        mode: ca,
                                        outerSize: null,
                                        side: S,
                                        size: null,
                                        target: v[S],
                                        whole: null
                                    };
                                    var Y = ("natural" == ca ? E.free() : E.constrain(f.geo.available[M][S].width -
                                        X.horizontal, f.geo.available[M][S].height - X.vertical)).measure();
                                    P.size = Y.size;
                                    P.outerSize = {
                                        height: Y.size.height + X.vertical,
                                        width: Y.size.width + X.horizontal
                                    };
                                    P.fits = "natural" == ca ? f.geo.available[M][S].width >= P.outerSize.width && f.geo.available[M][S].height >= P.outerSize.height ? !0 : !1 : Y.fits;
                                    "window" == M && (P.whole = P.fits ? "top" == S || "bottom" == S ? f.geo.origin.windowOffset.right >= m.__options.minIntersection && f.geo.window.size.width - f.geo.origin.windowOffset.left >= m.__options.minIntersection : f.geo.origin.windowOffset.bottom >=
                                        m.__options.minIntersection && f.geo.window.size.height - f.geo.origin.windowOffset.top >= m.__options.minIntersection : !1);
                                    x.push(P);
                                    if (P.whole) C = !0;
                                    else if ("natural" == P.mode && (P.fits || P.size.width <= f.geo.available[M][S].width)) return !1
                                }
                            })
                        }
                });
                m.__instance._trigger({
                    edit: function(K) {
                        x = K
                    },
                    event: d,
                    helper: f,
                    results: x,
                    type: "positionTested"
                });
                x.sort(function(K, M) {
                    if (K.whole && !M.whole) return -1;
                    if (!K.whole && M.whole) return 1;
                    if (K.whole && M.whole) {
                        var R = m.__options.side.indexOf(K.side);
                        M = m.__options.side.indexOf(M.side);
                        return R < M ? -1 : R > M ? 1 : "natural" == K.mode ? -1 : 1
                    }
                    return K.fits && !M.fits ? -1 : !K.fits && M.fits ? 1 : K.fits && M.fits ? (R = m.__options.side.indexOf(K.side), M = m.__options.side.indexOf(M.side), R < M ? -1 : R > M ? 1 : "natural" == K.mode ? -1 : 1) : "document" == K.container && "bottom" == K.side && "natural" == K.mode ? -1 : 1
                });
                var A = x[0];
                A.coord = {};
                switch (A.side) {
                    case "left":
                    case "right":
                        A.coord.top = Math.floor(A.target - A.size.height / 2);
                        break;
                    case "bottom":
                    case "top":
                        A.coord.left = Math.floor(A.target - A.size.width / 2)
                }
                switch (A.side) {
                    case "left":
                        A.coord.left =
                            f.geo.origin.windowOffset.left - A.outerSize.width;
                        break;
                    case "right":
                        A.coord.left = f.geo.origin.windowOffset.right + A.distance.horizontal;
                        break;
                    case "top":
                        A.coord.top = f.geo.origin.windowOffset.top - A.outerSize.height;
                        break;
                    case "bottom":
                        A.coord.top = f.geo.origin.windowOffset.bottom + A.distance.vertical
                }
                "window" == A.container ? "top" == A.side || "bottom" == A.side ? 0 > A.coord.left ? A.coord.left = 0 <= f.geo.origin.windowOffset.right - this.__options.minIntersection ? 0 : f.geo.origin.windowOffset.right - this.__options.minIntersection -
                    1 : A.coord.left > f.geo.window.size.width - A.size.width && (A.coord.left = f.geo.origin.windowOffset.left + this.__options.minIntersection <= f.geo.window.size.width ? f.geo.window.size.width - A.size.width : f.geo.origin.windowOffset.left + this.__options.minIntersection + 1 - A.size.width) : 0 > A.coord.top ? A.coord.top = 0 <= f.geo.origin.windowOffset.bottom - this.__options.minIntersection ? 0 : f.geo.origin.windowOffset.bottom - this.__options.minIntersection - 1 : A.coord.top > f.geo.window.size.height - A.size.height && (A.coord.top = f.geo.origin.windowOffset.top +
                        this.__options.minIntersection <= f.geo.window.size.height ? f.geo.window.size.height - A.size.height : f.geo.origin.windowOffset.top + this.__options.minIntersection + 1 - A.size.height) : (A.coord.left > f.geo.window.size.width - A.size.width && (A.coord.left = f.geo.window.size.width - A.size.width), 0 > A.coord.left && (A.coord.left = 0));
                m.__sideChange(w, A.side);
                f.tooltipClone = w[0];
                f.tooltipParent = m.__instance.option("parent").parent[0];
                f.mode = A.mode;
                f.whole = A.whole;
                f.origin = m.__instance._$origin[0];
                f.tooltip = m.__instance._$tooltip[0];
                delete A.container;
                delete A.fits;
                delete A.mode;
                delete A.outerSize;
                delete A.whole;
                A.distance = A.distance.horizontal || A.distance.vertical;
                a = c.extend(!0, {}, A);
                m.__instance._trigger({
                    edit: function(K) {
                        A = K
                    },
                    event: d,
                    helper: f,
                    position: a,
                    type: "position"
                });
                m.__options.functionPosition && (a = m.__options.functionPosition.call(m, m.__instance, f, a)) && (A = a);
                E.destroy();
                if ("top" == A.side || "bottom" == A.side) {
                    a = "left";
                    var N = A.target - A.coord.left;
                    var V = A.size.width - this.__options.minIntersection
                } else a = "top", N = A.target - A.coord.top,
                    V = A.size.height - this.__options.minIntersection;
                N < this.__options.minIntersection ? N = this.__options.minIntersection : N > V && (N = V);
                V = f.geo.origin.fixedLineage ? f.geo.origin.windowOffset : {
                    left: f.geo.origin.windowOffset.left + f.geo.window.scroll.left,
                    top: f.geo.origin.windowOffset.top + f.geo.window.scroll.top
                };
                A.coord = {
                    left: V.left + (A.coord.left - f.geo.origin.windowOffset.left),
                    top: V.top + (A.coord.top - f.geo.origin.windowOffset.top)
                };
                m.__sideChange(m.__instance._$tooltip, A.side);
                f.geo.origin.fixedLineage ? m.__instance._$tooltip.css("position",
                    "fixed") : m.__instance._$tooltip.css("position", "");
                m.__instance._$tooltip.css({
                    left: A.coord.left,
                    top: A.coord.top,
                    height: A.size.height,
                    width: A.size.width
                }).find(".tooltipster-arrow").css({
                    left: "",
                    top: ""
                }).css(a, N);
                m.__instance._$tooltip.appendTo(m.__instance.option("parent"));
                m.__instance._trigger({
                    type: "repositioned",
                    event: d,
                    position: A
                })
            },
            __sideChange: function(d, f) {
                d.removeClass("tooltipster-bottom").removeClass("tooltipster-left").removeClass("tooltipster-right").removeClass("tooltipster-top").addClass("tooltipster-" +
                    f)
            },
            __targetFind: function(d) {
                var f = {},
                    a = this.__instance._$origin[0].getClientRects();
                1 < a.length && 1 == this.__instance._$origin.css("opacity") && (this.__instance._$origin.css("opacity", .99), a = this.__instance._$origin[0].getClientRects(), this.__instance._$origin.css("opacity", 1));
                2 > a.length ? (f.top = Math.floor(d.geo.origin.windowOffset.left + d.geo.origin.size.width / 2), f.bottom = f.top, f.left = Math.floor(d.geo.origin.windowOffset.top + d.geo.origin.size.height / 2), f.right = f.left) : (d = a[0], f.top = Math.floor(d.left +
                    (d.right - d.left) / 2), d = 2 < a.length ? a[Math.ceil(a.length / 2) - 1] : a[0], f.right = Math.floor(d.top + (d.bottom - d.top) / 2), d = a[a.length - 1], f.bottom = Math.floor(d.left + (d.right - d.left) / 2), d = 2 < a.length ? a[Math.ceil((a.length + 1) / 2) - 1] : a[a.length - 1], f.left = Math.floor(d.top + (d.bottom - d.top) / 2));
                return f
            }
        }
    });
    return c
});

function isTourRunning() {
    return "undefined" != typeof hopscotch && hopscotch.getCurrTour() ? !0 : !1
}

function showPointOfInterest(c, g, k) {
    if (isTourRunning()) return !0;
    try {
        if (k = $.extend({
                side: "top",
                openTooltipOn: null,
                isDismissed: function() {
                    return isTooltipInLocalStorage(c)
                },
                onDismiss: function() {
                    setTooltipInLocalStorage(c)
                },
                actionable: !1
            }, k), !k.isDismissed()) {
            try {
                $(c).tooltipster("destroy")
            } catch (r) {}
            $(c).tooltipster({
                content: createPOIContent(c, g, k.onDismiss),
                theme: "tooltipster-light",
                interactive: !0,
                trigger: "custom",
                triggerClose: {
                    click: k.actionable ? !1 : !0
                },
                restoration: "none",
                side: k.side
            });
            closeOpenTooltips();
            k.openTooltipOn ? k.openTooltipOn.tooltipster("show") : $(c).tooltipster("show");
            return !0
        }
    } catch (r) {}
    return !1
}

function showTooltip(c, g, k) {
    try {
        k = $.extend({
            side: "top",
            openTooltipOn: null,
            actionable: !1,
            onDismiss: function() {}
        }, k);
        try {
            $(c).tooltipster("destroy")
        } catch (r) {}
        $(c).tooltipster({
            content: createPOIContent(c, g, k.onDismiss),
            theme: "tooltipster-light",
            interactive: !0,
            trigger: "custom",
            triggerClose: {
                click: k.actionable ? !1 : !0
            },
            restoration: "none",
            side: k.side
        });
        closeOpenTooltips();
        k.openTooltipOn ? k.openTooltipOn.tooltipster("show") : $(c).tooltipster("show");
        return !0
    } catch (r) {}
    return !1
}

function createGotIt(c) {
    return $("<a />", {
        "class": "nl-smallGrayButton",
        click: c,
        text: i18n("Got it")
    })
}

function createPOIContent(c, g, k) {
    g = $("<div />", {
        html: g,
        css: {
            display: "inline-block"
        }
    });
    g = $("<div />", {
        "class": "sy-tooltip-content"
    }).append(g);
    var r = createGotIt(function() {
        k();
        $(c).tooltipster("hide")
    });
    g.append(r);
    return g
}

function createUpgradeContent(c, g, k, r) {
    var t = $("<div />", {
        html: k,
        css: {
            display: "inline-block"
        }
    });
    k = $("<div />", {
        "class": "sy-tooltip-content"
    }).append(t);
    var l = $("<a />", {
        "class": "upgradeLink",
        click: function() {
            showSignUpSubscribe(r);
            setTooltipUpgradeInLocalStorage(c);
            g.tooltipster("destroy")
        },
        text: i18n("Upgrade")
    });
    t.prepend("&nbsp;");
    t.prepend(l);
    t = createGotIt(function() {
        setTooltipUpgradeInLocalStorage(c);
        g.tooltipster("hide")
    });
    k.append(t);
    return k
}

function createSigninContent(c, g, k, r) {
    var t = $("<div />", {
        html: k,
        css: {
            display: "inline-block"
        }
    });
    k = $("<div />", {
        "class": "sy-tooltip-content"
    }).append(t);
    var l = $("<a />", {
        "class": "upgradeLink",
        click: function() {
            showSignUp(r);
            setTooltipSignupInLocalStorage(c);
            g.tooltipster("destroy")
        },
        text: i18n("Sign up")
    });
    t.prepend("&nbsp;");
    t.prepend(l);
    t = createGotIt(function() {
        setTooltipSignupInLocalStorage(c);
        g.tooltipster("hide")
    });
    k.append(t);
    return k
}

function createUpgradeTooltipOnly(c, g, k, r, t, l) {
    if (!l || !isTooltipUpgradeInLocalStorage(g)) {
        g = createUpgradeContent(g, c, r, k);
        try {
            c.tooltipster("destroy")
        } catch (q) {}
        c.tooltipster({
            content: g,
            theme: "tooltipster-light",
            interactive: !0,
            trigger: "custom",
            restoration: "none",
            side: null != t ? t : "left"
        });
        closeOpenTooltips();
        try {
            c.tooltipster("show")
        } catch (q) {}
        return !0
    }
    return !1
}

function createSignupTooltipOnly(c, g, k, r) {
    g = createSigninContent(c, $(c), k, g);
    try {
        $(c).tooltipster("destroy")
    } catch (t) {}
    $(c).tooltipster({
        content: g,
        theme: "tooltipster-light",
        trigger: "custom",
        interactive: !0,
        restoration: "none",
        side: null != r ? r : "left"
    });
    closeOpenTooltips();
    $(c).tooltipster("show");
    return !0
}

function createUpgradeTooltip(c, g, k, r) {
    isTourRunning() || !1 === createUpgradeTooltipOnly($(c), c, g, k, r) && showSignUpSubscribe(g)
}

function createUpgradeTooltip2(c, g, k, r, t) {
    isTourRunning() || !1 === createUpgradeTooltipOnly(c, g, k, r, t) && showSignUpSubscribe(k)
}

function createSignupTooltip(c, g, k, r) {
    isTourRunning() || 0 == createSignupTooltipOnly(c, g, k, r) && showSignUp(g)
}

function isInLocalStorage(c, g) {
    return getLocalStorage().getItem(c + g)
}

function setInLocalStorage(c, g) {
    getLocalStorage().setItem(c + g, !0)
}

function isTooltipInLocalStorage(c) {
    return isInLocalStorage("tooltip", c)
}

function setTooltipInLocalStorage(c) {
    setInLocalStorage("tooltip", c)
}

function isTooltipUpgradeInLocalStorage(c) {
    return isInLocalStorage("tooltipUpgrade", c)
}

function setTooltipUpgradeInLocalStorage(c) {
    setInLocalStorage("tooltipUpgrade", c)
}

function isTooltipSignupInLocalStorage(c) {
    return isInLocalStorage("tooltipSignup", c)
}

function setTooltipSignupInLocalStorage(c) {
    setInLocalStorage("tooltipSignup", c)
}

function closeOpenTooltips() {
    var c = $.tooltipster.instances();
    $.each(c, function(g, k) {
        k.close()
    })
}
$.browser.chrome = /chrome/.test(navigator.userAgent.toLowerCase());
! function(c) {
    function g(d, f) {
        if (!(this instanceof g)) return d = new g(d, f), d.open(), d;
        this.id = g.id++;
        this.setup(d, f);
        this.chainCallbacks(g._callbackChain)
    }
    if ("undefined" == typeof c) return void("console" in window && window.console.info("Too much lightness, Featherlight needs jQuery."));
    var k = [],
        r = function(d) {
            return k = c.grep(k, function(f) {
                return f !== d && 0 < f.$instance.closest("body").length
            })
        },
        t = function(d, f) {
            var a = {};
            f = new RegExp("^" + f + "([A-Z])(.*)");
            for (var m in d) {
                var v = m.match(f);
                v && (v = (v[1] + v[2].replace(/([A-Z])/g,
                    "-$1")).toLowerCase(), a[v] = d[m])
            }
            return a
        },
        l = {
            keyup: "onKeyUp",
            resize: "onResize"
        },
        q = function(d) {
            c.each(g.opened().reverse(), function() {
                return d.isDefaultPrevented() || !1 !== this[l[d.type]](d) ? void 0 : (d.preventDefault(), d.stopPropagation(), !1)
            })
        },
        z = function(d) {
            if (d !== g._globalHandlerInstalled) {
                g._globalHandlerInstalled = d;
                var f = c.map(l, function(a, m) {
                    return m + "." + g.prototype.namespace
                }).join(" ");
                c(window)[d ? "on" : "off"](f, q)
            }
        };
    g.prototype = {
        constructor: g,
        namespace: "featherlight",
        targetAttr: "data-featherlight",
        variant: null,
        resetCss: !1,
        background: null,
        openTrigger: "click",
        closeTrigger: "click",
        filter: null,
        root: "body",
        openSpeed: 250,
        closeSpeed: 250,
        closeOnClick: "background",
        closeOnEsc: !0,
        closeIcon: "&#10005;",
        loading: "",
        persist: !1,
        otherClose: null,
        beforeOpen: c.noop,
        beforeContent: c.noop,
        beforeClose: c.noop,
        afterOpen: c.noop,
        afterContent: c.noop,
        afterClose: c.noop,
        onKeyUp: c.noop,
        onResize: c.noop,
        type: null,
        contentFilters: "jquery image html ajax iframe text".split(" "),
        setup: function(d, f) {
            "object" != typeof d || 0 != d instanceof
            c || f || (f = d, d = void 0);
            var a = c.extend(this, f, {
                target: d
            });
            d = a.resetCss ? a.namespace + "-reset" : a.namespace;
            d = c(a.background || ['<div class="' + d + "-loading " + d + '">', '<div class="' + d + '-content">', '<span class="' + d + "-close-icon " + a.namespace + '-close">', a.closeIcon, "</span>", '<div class="' + a.namespace + '-inner">' + a.loading + "</div>", "</div></div>"].join(""));
            var m = "." + a.namespace + "-close" + (a.otherClose ? "," + a.otherClose : "");
            return a.$instance = d.clone().addClass(a.variant), a.$instance.on(a.closeTrigger + "." + a.namespace,
                function(v) {
                    var x = c(v.target);
                    ("background" === a.closeOnClick && x.is("." + a.namespace) || "anywhere" === a.closeOnClick || x.closest(m).length) && (a.close(v), v.preventDefault())
                }), this
        },
        getContent: function() {
            if (!1 !== this.persist && this.$content) return this.$content;
            var d = this.constructor.contentFilters,
                f = this.$currentTarget && this.$currentTarget.attr(this.targetAttr),
                a = this.target || f || "",
                m = d[this.type];
            if (!m && a in d && (m = d[a], a = this.target && f), a = a || this.$currentTarget && this.$currentTarget.attr("href") || "", !m)
                for (var v in d) this[v] &&
                    (m = d[v], a = this[v]);
            if (!m) {
                var x = a;
                if (a = null, c.each(this.contentFilters, function() {
                        return m = d[this], m.test && (a = m.test(x)), !a && m.regex && x.match && x.match(m.regex) && (a = x), !a
                    }), !a) return "console" in window && window.console.error("Featherlight: no content filter found " + (x ? ' for "' + x + '"' : " (no target specified)")), !1
            }
            return m.process.call(this, a)
        },
        setContent: function(d) {
            return (d.is("iframe") || 0 < c("iframe", d).length) && this.$instance.addClass(this.namespace + "-iframe"), this.$instance.removeClass(this.namespace +
                "-loading"), this.$instance.find("." + this.namespace + "-inner").not(d).slice(1).remove().end().replaceWith(c.contains(this.$instance[0], d[0]) ? "" : d), this.$content = d.addClass(this.namespace + "-inner"), this
        },
        open: function(d) {
            var f = this;
            if (f.$instance.hide().appendTo(f.root), !(d && d.isDefaultPrevented() || !1 === f.beforeOpen(d))) {
                d && d.preventDefault();
                var a = f.getContent();
                if (a) return k.push(f), z(!0), f.$instance.fadeIn(f.openSpeed), f.beforeContent(d), c.when(a).always(function(m) {
                    f.setContent(m);
                    f.afterContent(d)
                }).then(f.$instance.promise()).done(function() {
                    f.afterOpen(d)
                })
            }
            return f.$instance.detach(),
                c.Deferred().reject().promise()
        },
        close: function(d) {
            var f = this,
                a = c.Deferred();
            return !1 === f.beforeClose(d) ? a.reject() : (0 === r(f).length && z(!1), f.$instance.fadeOut(f.closeSpeed, function() {
                f.$instance.detach();
                f.afterClose(d);
                a.resolve()
            })), a.promise()
        },
        chainCallbacks: function(d) {
            for (var f in d) this[f] = c.proxy(d[f], this, c.proxy(this[f], this))
        }
    };
    c.extend(g, {
        id: 0,
        autoBind: "[data-featherlight]",
        defaults: g.prototype,
        contentFilters: {
            jquery: {
                regex: /^[#.]\w/,
                test: function(d) {
                    return d instanceof c && d
                },
                process: function(d) {
                    return !1 !==
                        this.persist ? c(d) : c(d).clone(!0)
                }
            },
            image: {
                regex: /\.(png|jpg|jpeg|gif|tiff|bmp|svg)(\?\S*)?$/i,
                process: function(d) {
                    var f = c.Deferred(),
                        a = new Image,
                        m = c('<img src="' + d + '" alt="" class="' + this.namespace + '-image" />');
                    return a.onload = function() {
                        m.naturalWidth = a.width;
                        m.naturalHeight = a.height;
                        f.resolve(m)
                    }, a.onerror = function() {
                        f.reject(m)
                    }, a.src = d, f.promise()
                }
            },
            html: {
                regex: /^\s*<[\w!][^<]*>/,
                process: function(d) {
                    return c(d)
                }
            },
            ajax: {
                regex: /./,
                process: function(d) {
                    var f = c.Deferred(),
                        a = c("<div></div>").load(d,
                            function(m, v) {
                                "error" !== v && f.resolve(a.contents());
                                f.fail()
                            });
                    return f.promise()
                }
            },
            iframe: {
                process: function(d) {
                    var f = new c.Deferred,
                        a = c("<iframe/>").hide().attr("src", d).css(t(this, "iframe")).on("load", function() {
                            f.resolve(a.show())
                        }).appendTo(this.$instance.find("." + this.namespace + "-content"));
                    return f.promise()
                }
            },
            text: {
                process: function(d) {
                    return c("<div>", {
                        text: d
                    })
                }
            }
        },
        functionAttributes: "beforeOpen afterOpen beforeContent afterContent beforeClose afterClose".split(" "),
        readElementConfig: function(d,
            f) {
            var a = this,
                m = new RegExp("^data-" + f + "-(.*)"),
                v = {};
            return d && d.attributes && c.each(d.attributes, function() {
                var x = this.name.match(m);
                if (x) {
                    var w = this.value;
                    x = c.camelCase(x[1]);
                    if (0 <= c.inArray(x, a.functionAttributes)) w = new Function(w);
                    else try {
                        w = c.parseJSON(w)
                    } catch (E) {}
                    v[x] = w
                }
            }), v
        },
        extend: function(d, f) {
            var a = function() {
                this.constructor = d
            };
            return a.prototype = this.prototype, d.prototype = new a, d.__super__ = this.prototype, c.extend(d, this, f), d.defaults = d.prototype, d
        },
        attach: function(d, f, a) {
            var m = this;
            "object" !=
            typeof f || 0 != f instanceof c || a || (a = f, f = void 0);
            a = c.extend({}, a);
            var v, x = c.extend({}, m.defaults, m.readElementConfig(d[0], a.namespace || m.defaults.namespace), a);
            return d.on(x.openTrigger + "." + x.namespace, x.filter, function(w) {
                var E = c.extend({
                        $source: d,
                        $currentTarget: c(this)
                    }, m.readElementConfig(d[0], x.namespace), m.readElementConfig(this, x.namespace), a),
                    C = v || c(this).data("featherlight-persisted") || new m(f, E);
                "shared" === C.persist ? v = C : !1 !== C.persist && c(this).data("featherlight-persisted", C);
                E.$currentTarget.blur();
                C.open(w)
            }), d
        },
        current: function() {
            var d = this.opened();
            return d[d.length - 1] || null
        },
        opened: function() {
            var d = this;
            return r(), c.grep(k, function(f) {
                return f instanceof d
            })
        },
        close: function(d) {
            var f = this.current();
            return f ? f.close(d) : void 0
        },
        _onReady: function() {
            var d = this;
            d.autoBind && (c(d.autoBind).each(function() {
                d.attach(c(this))
            }), c(document).on("click", d.autoBind, function(f) {
                f.isDefaultPrevented() || "featherlight" === f.namespace || (f.preventDefault(), d.attach(c(f.currentTarget)), c(f.target).trigger("click.featherlight"))
            }))
        },
        _callbackChain: {
            onKeyUp: function(d, f) {
                return 27 === f.keyCode ? (this.closeOnEsc && c.featherlight.close(f), !1) : d(f)
            },
            onResize: function(d, f) {
                if (this.$content.naturalWidth) {
                    var a = this.$content.naturalWidth,
                        m = this.$content.naturalHeight;
                    this.$content.css("width", "").css("height", "");
                    var v = Math.max(a / parseInt(this.$content.parent().css("width"), 10), m / parseInt(this.$content.parent().css("height"), 10));
                    1 < v && this.$content.css("width", "" + a / v + "px").css("height", "" + m / v + "px")
                }
                return d(f)
            },
            afterContent: function(d,
                f) {
                d = d(f);
                return this.onResize(f), d
            }
        }
    });
    c.featherlight = g;
    c.fn.featherlight = function(d, f) {
        return g.attach(this, d, f)
    };
    c(document).ready(function() {
        g._onReady()
    })
}(jQuery);
(function() {
    var c, g;
    if (c = {
            version: "2.3.3",
            name: "jQuery-runner"
        }, g = this.jQuery || this.Zepto || this.$, !g || !g.fn) throw Error("[" + c.name + "] jQuery or jQuery-like library is required for this plugin to work");
    var k = {};
    var r = function(f) {
        return (10 > f ? "0" : "") + f
    };
    var t = 1;
    var l = function() {
        return "runner" + t++
    };
    var q = function(f, a) {
        return f["r" + a] || f["webkitR" + a] || f["mozR" + a] || f["msR" + a] || function(m) {
            return setTimeout(m, 30)
        }
    }(this, "equestAnimationFrame");
    var z = function(f, a) {
        var m, v, x;
        a = a || {};
        var w = [36E5, 6E4, 1E3, 10];
        var E = ["", ":", ":", "."];
        var C = m = "";
        var A = a.milliseconds;
        var N = w.length;
        0 > f && (f = Math.abs(f), m = "-");
        a = v = 0;
        for (x = w.length; x > v; a = ++v) {
            var V = w[a];
            var K = 0;
            f >= V && (K = Math.floor(f / V), f -= K * V);
            (K || 1 < a || C) && (a !== N - 1 || A) && (C += (C ? E[a] : "") + r(K))
        }
        return m + C
    };
    var d = function() {
        function f(a, m, v) {
            var x;
            return this instanceof f ? (this.items = a, x = this.id = l(), this.settings = g.extend({}, this.settings, m), k[x] = this, a.each(function(w, E) {
                g(E).data("runner", x)
            }), this.value(this.settings.startAt), void((v || this.settings.autostart) &&
                this.start())) : new f(a, m, v)
        }
        return f.prototype.running = !1, f.prototype.updating = !1, f.prototype.finished = !1, f.prototype.interval = null, f.prototype.total = 0, f.prototype.lastTime = 0, f.prototype.startTime = 0, f.prototype.lastLap = 0, f.prototype.lapTime = 0, f.prototype.settings = {
                autostart: !1,
                countdown: !1,
                stopAt: null,
                startAt: 0,
                milliseconds: !0,
                format: null
            }, f.prototype.value = function(a) {
                this.items.each(function(m) {
                    return function(v, x) {
                        v = g(x);
                        x = v.is("input") ? "val" : "text";
                        v[x](m.format(a))
                    }
                }(this))
            }, f.prototype.format =
            function(a) {
                var m;
                return m = this.settings.format, (g.isFunction(m) ? m : z)(a, this.settings)
            }, f.prototype.update = function() {
                var a, m, v, x, w;
                this.updating || (this.updating = !0, v = this.settings, w = g.now(), x = v.stopAt, a = v.countdown, m = w - this.lastTime, this.lastTime = w, a ? this.total -= m : this.total += m, null !== x && (a && this.total <= x || !a && this.total >= x) && (this.total = x, this.finished = !0, this.stop(), this.fire("runnerFinish")), this.value(this.total), this.updating = !1)
            }, f.prototype.fire = function(a) {
                this.items.trigger(a, this.info())
            },
            f.prototype.start = function() {
                var a;
                this.running || (this.running = !0, (!this.startTime || this.finished) && this.reset(), this.lastTime = g.now(), a = function(m) {
                    return function() {
                        m.running && (m.update(), q(a))
                    }
                }(this), q(a), this.fire("runnerStart"))
            }, f.prototype.stop = function() {
                this.running && (this.running = !1, this.update(), this.fire("runnerStop"))
            }, f.prototype.toggle = function() {
                this.running ? this.stop() : this.start()
            }, f.prototype.lap = function() {
                var a, m;
                return m = this.lastTime, a = m - this.lapTime, this.settings.countdown &&
                    (a = -a), (this.running || a) && (this.lastLap = a, this.lapTime = m), m = this.format(this.lastLap), this.fire("runnerLap"), m
            }, f.prototype.reset = function(a) {
                a && this.stop();
                a = g.now();
                "number" != typeof this.settings.startAt || this.settings.countdown || (a -= this.settings.startAt);
                this.startTime = this.lapTime = this.lastTime = a;
                this.total = this.settings.startAt;
                this.value(this.total);
                this.finished = !1;
                this.fire("runnerReset")
            }, f.prototype.info = function() {
                var a;
                return a = this.lastLap || 0, {
                    running: this.running,
                    finished: this.finished,
                    time: this.total,
                    formattedTime: this.format(this.total),
                    startTime: this.startTime,
                    lapTime: a,
                    formattedLapTime: this.format(a),
                    settings: this.settings
                }
            }, f
    }();
    g.fn.runner = function(f, a, m) {
        var v, x;
        switch (f ||= "init", "object" == typeof f && (m = a, a = f, f = "init"), v = this.data("runner"), x = v ? k[v] : !1, f) {
            case "init":
                new d(this, a, m);
                break;
            case "info":
                if (x) return x.info();
                break;
            case "reset":
                x && x.reset(a);
                break;
            case "lap":
                if (x) return x.lap();
                break;
            case "start":
            case "stop":
            case "toggle":
                if (x) return x[f]();
                break;
            case "version":
                return c.version;
            default:
                g.error("[" + c.name + "] Method " + f + " does not exist")
        }
        return this
    };
    g.fn.runner.format = z
}).call(this);
var syAjaxRunning = !1;
$(document).ajaxStart(function() {
    syAjaxRunning = !0
});
$(document).ajaxStop(function() {
    syAjaxRunning = !1
});
$(document).ajaxError(function(c, g, k, r) {
    403 == g.status && (window.location = "/expirationPassed?api=" + k.url + "&from=" + window.location.href)
});
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1)
};
String.prototype.replaceAt = function(c, g) {
    return this.substr(0, c) + g + this.substr(c + 1)
};
String.prototype.pluralize = function(c) {
    return 1 == Math.abs(c) ? this : this + "s"
};

function symbolab_log(c, g, k, r) {
}

function amp_log(c, g, k) {
    return $.ajax({
        type: "POST",
        url: "/ampLog",
        data: {
            event: c,
            data: g,
            force: k
        }
    })
}
var NoLocalStorage = function() {};
NoLocalStorage.prototype = {
    getItem: function() {
        return null
    },
    setItem: function() {},
    removeItem: function() {}
};
var lsObj = new NoLocalStorage;

function getLocalStorage() {
    return localStorage
}

function syMenu(c, g) {
    g = g.replace("/solver/", "");
    symbolab_log("Solutions", "Menu" + c, SOLUTIONS.page + "=>" + g)
}

function prepareQueryForMathQuill(c) {
    if (void 0 == c) return c;
    c = c.replace(/operatorname/g, "text");
    c = c.replace(/\\(\w+?)\s+(?={|_|\^|\(|\\)/g, "\\$1");
    c = c.replace(/\\,/g, " ");
    c = c.replace(/(, |,)/g, ",\\:");
    0 <= c.indexOf("\\{") && (c = c.replace(/\{\\space\}/g, "\\space"), c = c.replace(/\\left\s*\\\{/g, "\\{"), c = c.replace(/\\\{/g, "\\left\\{"), c = c.replace(/\\right\s*\\\}/g, "\\}"), c = c.replace(/\\\}/g, "\\right\\}"), c = c.replace(/\\space}/g, "{\\space}"));
    c = c.replace(/\\vec\{(.+?)\}/g, "\\vec{$1 }");
    c = c.replace(/\\hat\{(.+?)\}/g,
        "\\hat{$1 }");
    return c = c.replace(/ /g, "#")
}

function getWidth(c, g) {
    var k = 0;
    if (c.hasClass("block") || c.hasClass("numerator") || c.hasClass("denominator")) c.children().each(function() {
        k += getWidth($(this), g)
    });
    else {
        if (c.hasClass("fraction")) {
            var r = getWidth($(c.children()[0]), g);
            c = getWidth($(c.children()[1]), g);
            return Math.max(r + 10, c + 10)
        }
        c.hasClass("roman") ? g && c.children().each(function() {
            k += $(this).outerWidth()
        }) : k = c.outerWidth()
    }
    return k
}

function getActualWidth(c, g) {
    var k = 0;
    $(c).find(".mathquill-embedded-latex").children().each(function() {
        $(this).is(":visible:not(.selectable)") && (k += getWidth($(this), g))
    });
    return k *= 1.1
}

function getGraphInputWidth(c) {
    var g = 0;
    $(c).children().each(function() {
        $(this).is(":visible:not(.selectable)") && (g += getWidth($(this), !0))
    });
    return g *= 1.1
}

function createScrollForce(c, g, k) {
    if (g || k) {
        var r = $('<div class="scrollContent" style="background: transparent"></div>');
        g && r.width(g);
        k && r.height(k);
        $(c).children().wrap(r);
        $(c).addClass("syscrollable");
        $(c).find(".mathquill-embedded-latex").mathquill("redraw")
    }
}

function createTableArray(c) {
    c = c.replace("\\quad \\quad", "");
    c = c.replace("\\begin{array}", "");
    var g = !1;
    0 < c.indexOf("\\summaryline") && (c = c.replace("\\summaryline", ""), g = !0);
    c = c.replace("\\end{array}", "");
    c = c.replace(/{\|(c\|)+}/ig, "");
    c = c.replace(/\\hline\s*/gi, " ");
    var k = $("<div style='overflow-x: auto;'></div>"),
        r = $("<table class='tableMatrix'></table>");
    c = c.split("\\\\");
    c.pop();
    for (var t, l = 0; l < c.length; l++) {
        var q = c[l];
        t = $("<tr></tr>");
        q = q.split("&");
        for (var z = 0; z < q.length; z++) {
            var d = q[z],
                f = $("<span class='mathquill-embedded-latex'></span>");
            f.text(d);
            d = $("<td class='syME'></td>");
            d.append(f);
            t.append(d)
        }
        g && l === c.length - 1 && (t.css("background-color", "#f5f5f5"), t.css("color", "black"));
        r.append(t)
    }
    k.append(r);
    return k
}

function createTable(c) {
    c = c.replace("\\quad \\quad", "");
    c = c.replace("\\begin{table}", "");
    var g = !1;
    0 < c.indexOf("\\summaryline") && (c = c.replace("\\summaryline", ""), g = !0);
    c = c.replace("\\end{table}", "");
    var k = $("<div style='overflow-x: auto;'></div>"),
        r = $("<table class='tableMatrix'></table>");
    c = c.split("\\\\");
    c.pop();
    for (var t, l = 0; l < c.length; l++) {
        var q = c[l];
        t = $("<tr></tr>");
        q = q.split("&");
        q.pop();
        for (var z = 0; z < q.length; z++) {
            var d = q[z],
                f = $("<span class='mathquill-embedded-latex'></span>");
            f.text(d);
            d =
                $("<td class='syME'></td>");
            d.append(f);
            t.append(d)
        }
        g && l == c.length - 1 && (t.css("background-color", "#f5f5f5"), t.css("color", "black"));
        r.append(t)
    }
    k.append(r);
    return k
}

function createMathquillSpan(c, g, k) {
    if (void 0 == g) return $("<span></span>");
    var r = g.split("<br/>");
    if (1 == r.length) {
        if (0 <= g.indexOf("\\begin{table}")) var t = createTable(g);
        else 0 <= g.indexOf("\\begin{array}") ? t = createTableArray(g) : (g = prepareQueryForMathQuill(g), t = $('<span class="' + c + ' mathquill-embedded-latex"></span>'), t.text(g));
        k && $(t).prop("title", k)
    } else {
        t = $('<div class="multi-line-span"></div>');
        for (var l in r) g = createMathquillDiv(c, r[l]), g.addClass("multiline"), t.append(g)
    }
    return t
}

function createMathquillDiv(c, g, k) {
    c = $('<div class="' + c + '"></div>');
    c.append(this.createMathquillSpan("", g, k));
    return c
}

function createMathquillDiv2(c, g, k) {
    c = $('<div class="' + c + '"></div>');
    c.append(this.createMathquillSpan("", g, k));
    c.find(".mathquill-embedded-latex:not(.mathquill-rendered-math)").each(function() {
        $(this).mathquill()
    });
    return c
}

function mathquillify(c) {
    c.find(".mathquill-embedded-latex:not(.mathquill-rendered-math)").each(function() {
        $(this).mathquill()
    })
}

function mathquillifyRedrawOnly(c) {
    c.find(".mathquill-embedded-latex.mathquill-rendered-math").each(function() {
        $(this).mathquill("redraw")
    })
}

function mathquillifyVisible(c) {
    c.find(".mathquill-embedded-latex:not(.mathquill-rendered-math)").each(function() {
        var g = $(this);
        g.is(":visible") && g.mathquill()
    })
}
$(function() {
    const c = (new Date(2023, 9, 31)).getTime();
    var g = (new Date(2023, 11, 15)).getTime();
    const k = readCookie("sy.privacyAcceptDate"),
        r = $(".nl-cookiepolicy");
    let t = !1;
    const l = (new Date).getTime();
    if (l >= g) t = !1;
    else if (k) {
        if (g = parseInt(k), isNaN(g) || g < c) t = !0
    } else 0 > window.location.pathname.indexOf("privacy") && 0 > window.location.pathname.indexOf("cookie") && (t = !0);
    t && r.show();
    $(".privacy-policy").click(function() {
        allowedCookieGroups("C0003") && createCookie("sy.privacyAcceptDate", l, 30);
        $(".nl-cookiepolicy").remove()
    });
    $("#save-as-bookmark.sign-in-button").click(function() {
        showSignIn("AvatarClicked", "NotebookStickie")
    });
    $("#userName").click(function() {
        showSignIn("AvatarClicked", "Avatar")
    });
    $(":not(#save-as-bookmark):not(#user-name).sign-in-button").click(function() {
        showSignIn("AvatarClicked")
    });
    $("#solution_page #nl-subNav a").click(function(q) {
        q.preventDefault();
        var z = $(this).attr("href");
        $.when(symbolab_log("General", "TopMenu", z)).always(function() {
            window.location = z
        })
    });
    $(".nl-navAction.notifications").click(function() {
        $(".nl-notificationsBox").toggle();
        $(".nl-notificationsBox").mathquill("redraw");
        $(".nl-notificationsBox").is(":visible") && ($(".newNotifications").removeClass("newNotifications"), $.ajax({
            type: "POST",
            url: "/api/notification/seen",
            beforeSend: authorizeAjaxWithSyToken
        }));
        return !1
    });
    $("select.classification").change(function(q) {
        q = $(this).parent();
        var z = $(this).attr("id"),
            d = $(this).val();
        z = $("#" + (z + "-" + d));
        q.children(" select.subclass").addClass("hidden");
        q.children(" select.subclass").attr("disabled", "disabled");
        1 < z.children().size() && (z.removeClass("hidden"),
            z.removeAttr("disabled"))
    });
    $("a.more").click(function(q) {
        q.preventDefault();
        var z = this;
        $(z).parent().next().toggle(function() {
            var d = $(z).data("previous-text"),
                f = $(z).text();
            $(z).text(d);
            $(z).data("previous-text", f);
            0 > window.location.href.indexOf("team") && $("#SearchExamples").find(".mathquill-embedded-latex").mathquill("redraw")
        })
    });
    "/" === window.location.pathname || "/calculators" === window.location.pathname ? ensureCorrectLightsOutHomepage() : ensureCorrectLightsOut();
    $("body").off("click", "#nl-mainNav li > a").on("click",
        "#nl-mainNav li > a",
        function(q) {
            q.preventDefault();
            q = $(this).attr("href");
            getLocalStorage().setItem("linkOrigin", "TopMenu");
            window.location = q
        });
    document.addEventListener("click", function() {
        $(".nl-notificationsBox").hide()
    })
});

function isMobileRender() {
    return "undefined" != typeof isMobileRendering && isMobileRendering
}

function isPopularSearch() {
    return 0 <= window.location.href.indexOf("/popular")
}

function showUpgradeMessage() {
    "undefined" != typeof mobileWeb && mobileWeb ? "iOS" === OS ? confirm("Download the app to see steps. Redirect to App Store?") && (window.location = "https://itunes.apple.com/app/id876942533") : "Android" === OS && confirm("Download the app to see steps. Redirect to Google Play?") && (window.location = "https://play.google.com/store/apps/details?id=com.devsense.symbolab") : window.location.href = "/upgradeVersion"
}

function parseQueryParameters(c) {
    for (var g, k = /([^&=]+)=?([^&]*)/g, r = window.location.search.substring(1); g = k.exec(r);) c[decodeURIComponent(g[1])] = decodeURIComponent(g[2])
}
$.extend($.expr[":"], {
    "starts-with": function(c, g, k, r) {
        return 0 === $.trim($(c).text()).indexOf(k[3])
    },
    "ends-with": function(c, g, k, r) {
        c = $.trim($(c).text());
        k = k[3];
        return c.lastIndexOf(k) === c.length - k.length
    }
});

function changeLanguage(c, g) {
    var k = location.hostname;
    k = k.replace(g + ".", "");
    k = k.replace("www.", "");
    g = 80 == location.port ? "" : ":" + location.port;
    c = "en" == $(c).attr("data") ? "www." : $(c).attr("data") + ".";
    window.location = "http://" + c + k + g + "/solver"
}

function showSignIn(c, g, k) {
    registrationReason = c;
    googleIsSignUp = !1;
    getLocalStorage().setItem("registrationReason", c);
    void 0 === g && symbolab_log("Registration", "ShowSignIn", registrationReason);
    localStorage.setItem("beforeSubs", 1);
    showSignUp(void 0 !== g ? g : "TopMenu", k)
}

function showSignUpSubscribe(c, g) {
    sy_pSub ? resumeSubscription(c, g) : isUserLoggedIn() ? showSubscription(c, g) : showSignUp(c, g)
}

function bookImageError(c) {
    c.onerror = "";
    $(c).hide();
    var g = $("<p><a href = '" + c.src + "'>Click here to view image</a></p>");
    $(c).parent().append(g);
    return !0
}

function pickLanguage(c) {
    var g = $.Deferred();
    $.when(symbolab_log("General", "UserSwitchLang", c)).always(function() {
        g.resolve()
    });
    return g
}

function loadScript(c) {
    if (0 < $('script[src="' + c + '"]').length) return $.Deferred().resolve();
    var g = $.Deferred(),
        k = document.createElement("script");
    k.async = "async";
    k.type = "text/javascript";
    k.src = c;
    k.onload = k.onreadystatechange = function(r, t) {
        if (!k.readyState || /loaded|complete/.test(k.readyState)) t ? g.reject() : g.resolve()
    };
    k.onerror = function() {
        g.reject()
    };
    $("head")[0].appendChild(k);
    return g.promise()
}

function showGeneratePdf() {
    $(".nl-generatePdf").removeClass("nl-hidden");
    $.featherlight(".nl-generatePdf");
    return $.when(loadScript("/public/auto/jspdf.debug.min.js")).pipe(function() {
        return $.when(loadScript("/public/auto/html2canvas2.min.js"))
    })
}

function showFeedback(c, g, k) {
    $(".nl-signInContainer>div").addClass("nl-hidden");
    $(".nl-feedback-modal").removeClass("nl-hidden");
    $.featherlight(".nl-signInContainer");
    c && ($(".featherlight-content .nl-feedback-modal h2").text(i18n("js.How can we help you?")), $(".featherlight-content .nl-feedback-modal #inputName").val(g), $(".featherlight-content .nl-feedback-modal #inputEmail").val(k))
}

function getRegistrationUrl(c, g, k) {
    let r = "";
    void 0 !== k && (r = k);
    k = window.location.href;
    r = 0 <= k.indexOf("?") ? "&" + r : "?" + r;
    return "/registration#flow=" + c + "&url=" + encodeURIComponent(k + r) + "&reason=" + encodeURIComponent(g)
}

function showSignUp(c, g) {
    var k = c.split("\t");
    0 <= k.indexOf("LockedStep") ? window.location = getRegistrationUrl("lock", c, g) : 0 <= k.indexOf("Graphing") || 0 <= k.indexOf("Solver") ? window.location = getRegistrationUrl("upgrade", c, g) : 0 <= k.indexOf("SolverSaveNote") ? window.location = getRegistrationUrl("notebook", c) : 0 <= k.indexOf("GraphSave") ? window.location = getRegistrationUrl("signup", c, g) : window.location = getRegistrationUrl("signup", c)
}

function sendCourseHeroLink() {
    return $.ajax({
        type: "POST",
        url: "/requestChEmail",
        data: {
            sourceURL: window.location.href
        },
        beforeSend: authorizeAjaxWithSyToken
    })
}

function showSubscription(c, g) {
    const k = getRegistrationUrl("upgrade", c, g);
    "iOS" === OS ? setTimeout(() => {
        window.location = k
    }, 100) : window.location = k
}

function showGroupLicense(c) {
    $(".nl-signInContainer>div").addClass("nl-hidden");
    $(".nl-groupLicense").removeClass("nl-hidden");
    $.featherlight(".nl-signInContainer");
    setSelectedSubscriptionOption($("td.subscribeOption:visible").last());
    renderPaypalGroupButton(c, "todo: clean the code")
}

function renderPaypalGroupButton(c, g) {
    loadScript("https://www.paypal.com/sdk/js?client-id=" + g + "&currency=USD").done(function() {
        paypal.Buttons({
            style: {
                shape: "pill",
                color: "gold"
            },
            createOrder: function(k, r) {
                k = getGroupOrder(c);
                return r.order.create(k)
            },
            onApprove: paypalOnApprove,
            onCancel: paypalOnCancel,
            onError: paypalOnError
        }).render(".featherlight-content .nl-groupLicense #group-payment-paypal-button")
    })
}

function getFixedStepsFormatAPI(c) {
    for (var g = [], k = 0; k < c.length; k++) {
        var r = c[k];
        if ("interim" === r.type) g.push(r);
        else if (null != r.steps && 1 < r.steps.length) {
            for (var t = 0; t < r.steps.length; t++) g.push(r.steps[t]);
            r.entire_result && g.push({
                entire_result: r.entire_result
            })
        } else g.push(r)
    }
    return g
}

function getFixedStepsFormat(c) {
    for (var g = [], k = 0; k < c.length; k++) {
        var r = c[k];
        if (r.isInterimStep) g.push(r);
        else if (null != r.steps && 1 < r.steps.length) {
            for (var t = 0; t < r.steps.length; t++) g.push(r.steps[t]);
            r.entire_result && g.push({
                entire_result: r.entire_result
            })
        } else g.push(r)
    }
    return g
}

function createAndShowTooltipTimout(c, g, k, r) {
    $(c).tooltipster({
        content: g,
        theme: "tooltipster-light",
        side: r,
        restoration: "none",
        trigger: "custom"
    });
    $(".sy-tooltip-close-icon:visible").click();
    $(c).tooltipster("show");
    setTimeout(function() {
        $(c).tooltipster("destroy")
    }, k)
}

function removeUserSettings() {
    getLocalStorage().removeItem("settings.numDecimalDisplay");
    getLocalStorage().removeItem("settings.printOpen");
    getLocalStorage().removeItem("settings.printGraph")
}

function removeUserInfo() {
    getLocalStorage().removeItem("udid");
    getLocalStorage().removeItem("firstName");
    getLocalStorage().removeItem("sy.udid");
    getLocalStorage().removeItem("sy.firstName")
}

function logout() {
    removeAllUserInfo();
    window.location = "/logout"
}

function removeAllUserInfo() {
    eraseTerminalSessionStringCookie();
    removeUserSettings();
    removeUserInfo()
}

function logUserOutWithoutRedirect() {
    removeAllUserInfo(void 0);
    return $.ajax({
        data: {
            isMobile: !0
        },
        url: "/logout",
        type: "GET"
    })
}

function refreshLeftNavbarHeight() {
    var c = $(".nl-content:visible").height(),
        g = $(".nl-pageContent").height();
    c = Math.max(g, c);
    0 < c && ($("#navbarStyle").remove(), $("head").append($("<style id='navbarStyle'>.nl-leftNav { min-height: " + (c + 110) + "px; }</style>")), $("head").append($("<style id='navbarStyle'>.sidebar-content { min-height: " + (c + 100) + "px; }</style>")))
}
$(window).load(function() {
    refreshLeftNavbarHeight()
});

function prepareGeometryForReload() {
    return "undefined" != typeof SYGEO ? SYGEO.doShareCreateRequest().then(function(c) {
        SYGEO.userIsLoggingIn = !0;
        return "temporaryShare=" + c._id
    }) : Promise.reject()
}
$(function() {
    function c() {
        var l = $(".nl-autocomplete");
        l.empty();
        l.hide()
    }

    function g() {
        return window.location.pathname.indexOf("/solver") ? "Solver" : window.location.pathname.indexOf("/graphing-calculator") ? "Graphing" : window.location.pathname.indexOf("/notebook") ? "Notebook" : window.location.pathname.indexOf("/practice") ? "Practice" : window.location.pathname.indexOf("/calculator") ? "Calculators" : window.location.pathname
    }

    function k(l) {
        l.addClass("nl-disabled");
        var q = $.Deferred(),
            z = $.Deferred();
        $.when(symbolab_log("Registration",
            "SignInAttempt-Email", registrationReason)).always(function() {
            q.resolve()
        });
        $.ajax({
            type: "POST",
            url: "/login",
            data: {
                email: $(".featherlight-content #signin_email").val(),
                password: $(".featherlight-content #signin_password").val(),
                url: window.location.href,
                registrationReason,
                remember: $(".featherlight-content #rememberMe").prop("checked")
            },
            success: function(d) {
                d.alert ? ($(".nl-signInWithText .nl-error").text(d.alert), $(".nl-signInWithText .nl-error").show(), l.removeClass("nl-disabled"), z.reject()) : prepareGeometryForReload().then(function(f) {
                    location.hash =
                        f;
                    z.resolve()
                }, function() {
                    z.resolve()
                })
            },
            error: function() {
                l.removeClass("nl-disabled");
                z.reject()
            }
        });
        $.whenAll(z, q).done(function() {
            location.reload()
        })
    }
    1 == getLocalStorage().getItem("beforeSubs") && getLocalStorage().removeItem("beforeSubs");
    $.featherlight.defaults.afterClose = function(l) {
        $(".nl-signInContainer>div").addClass("nl-hidden")
    };
    $(".nl-search").click(function(l) {
        var q = $(".nl-searchContainer input");
        $(l.originalEvent.target).is(q) || (q.val(""), l = $("#nl-mainNav"), l.toggleClass("nl-searchOpen"),
            l.hasClass("nl-searchOpen") && (q.focus(), "/" === window.location.pathname ? symbolab_log("General", "Subject Search Open Homepage") : symbolab_log("General", "Subject Search Open")), c())
    });
    $("body").click(function(l) {
        $("#nl-mainNav").hasClass("nl-searchOpen") && 0 === $(l.originalEvent.target).parents(".nl-search").length && c()
    });
    $(".nl-searchClose").click(function(l) {
        l.preventDefault();
        l.stopPropagation();
        $(".nl-search").css({
            width: 40
        });
        $(".nl-autocomplete").empty();
        $(".nl-autocomplete").hide();
        setTimeout(function() {
            $("#nl-mainNav").removeClass("nl-searchOpen");
            $(".nl-search").removeAttr("style")
        }, 200)
    });
    var r = !1;
    $("#nl-searchField").keyup(function() {
        if (!r) {
            r = !0;
            var l = $(".nl-searchContainer input").val();
            $.ajax({
                type: "GET",
                url: "/suggestSubjects",
                data: {
                    query: l,
                    language: "en",
                    type: 0 <= window.location.href.indexOf("/solver/") ? "Solutions" : "Practice"
                },
                success: function(q) {
                    if (null == q || 0 == q.length) $(".nl-autocomplete").hide();
                    else {
                        $(".nl-autocomplete").empty();
                        for (var z = null, d = 0; d < q.length; d++) {
                            var f = q[d];
                            f.type != z && ($(".nl-autocomplete").append("<div class='type'>" +
                                f.type + "</div>"), z = f.type);
                            f.display = f.display.replace(/'/, "&apos;");
                            var a = 'getLocalStorage().setItem("linkOrigin", "SubjectSuggest"); window.location="' + f.search + '";';
                            $(".nl-autocomplete").append("<div class='result' onclick='" + a + "'>" + f.display + "</div>")
                        }
                        $(".nl-autocomplete").fadeIn()
                    }
                    r = !1
                }
            })
        }
    });
    $("#fbCancelBtn").click(function() {
        $.featherlight.current().close();
        $(".nl-signInContainer>div").addClass("nl-hidden")
    });
    $("#fbSendBtn").click(function() {
        var l = {};
        l.name = $(".featherlight-content .nl-feedback-modal #inputName").val();
        l.email = $(".featherlight-content .nl-feedback-modal #inputEmail").val();
        l.message = $(".featherlight-content .nl-feedback-modal #inputMessage").val();
        l.url = window.location.href;
        l.referrer = document.referrer;
        "undefined" != typeof SYPRACTICE && (l.subject = SYPRACTICE.subject, l.topic = SYPRACTICE.topic, l.subTopic = SYPRACTICE.subTopic, l.problem = SYPRACTICE.problemInfo.problem.problemTranslation);
        "undefined" != typeof syUnsubscribe && symbolab_log("Registration", "ClickedFeature", `NewUnsubscribe\t${syUnsubscribe.planType}\tHelpSent`);
        l.message ? ($.ajax({
            type: "POST",
            url: "/feedback",
            beforeSend: authorizeAjaxWithSyToken,
            data: l
        }), $(".featherlight-content .nl-feedback-modal .alert-error").hide(), $(".featherlight-content .nl-feedback-modal .alert-success").show(), setTimeout(function() {
            $.featherlight.current().close();
            $(".nl-signInContainer>div").addClass("nl-hidden")
        }, 2E3), $(".featherlight-content .nl-feedback-modal #fbSendBtn").addClass("nl-disabled")) : $(".featherlight-content .nl-feedback-modal .alert-error").show()
    });
    $(".nl-languagesMenu a").click(function(l) {
        l.preventDefault();
        var q = $(this).attr("href");
        $.when(pickLanguage($(this).attr("data"))).always(function() {
            window.location = q
        })
    });
    $("#join").click(function() {
        showSignUp("TopMenu\t" + g())
    });
    $("#upgrade").click(function() {
        showSubscription("UpgradeButton\t" + g())
    });
    $(".subscribeOption").click(function() {
        setSelectedSubscriptionOption($(this));
        symbolab_log("Registration", "BrowsePlan", $(this).attr("id"))
    });
    $("input[type=radio][name=subscriptionTypeRadio]").change(function() {
        setSelectedSubscriptionOption($(this).parent().parent().find(".subscribeOption"))
    });
    $("#noAccount").click(function() {
        $(".nl-signInContainer>div").addClass("nl-hidden");
        $(".nl-signUpWithText").removeClass("nl-hidden");
        symbolab_log("Registration", "ShowSignUp", registrationReason)
    });
    $("#haveAccount").click(function() {
        $(".nl-signInContainer>div").addClass("nl-hidden");
        $(".nl-signInWithText").removeClass("nl-hidden");
        symbolab_log("Registration", "ShowSignIn", registrationReason)
    });
    $(".nl-forgotPasswordLink").click(function() {
        $(".nl-signInContainer>div").addClass("nl-hidden");
        $(".nl-forgotPassword").removeClass("nl-hidden")
    });
    $(".nl-joinEmail").click(function() {
        var l = $(this);
        l.hide();
        $(".nl-joinEmailForm").show();
        symbolab_log("Registration", "ClickJoinEmail");
        l.parent().parent().parent().parent().parent().parent().parent().parent().parent().animate({
            scrollTop: 300
        })
    });
    $(".nl-signInButton").click(function() {
        var l = $(this);
        k(l)
    });
    $(".nl-signIn input").on("keyup", function(l) {
        13 == l.keyCode && (l = $(this).closest(".nl-signIn").find(".nl-signInButton"), l.hasClass("nl-disabled") || k(l))
    });
    $(".nl-resetButton").click(function() {
        var l =
            $(this);
        l.addClass("nl-disabled");
        symbolab_log("Registration", "ResetPasswordClicked");
        $.ajax({
            type: "POST",
            url: "/resetRequest",
            data: {
                email: $(".featherlight-content #reset_email").val()
            },
            success: function(q) {
                q.success ? ($(".nl-forgotPassword").hide(), $(".nl-forgotPasswordSuccess").show(), $(".nl-forgotPasswordSuccess .nl-bold").text(q.email)) : ($(".nl-forgotPassword .nl-error").text(q.alert), $(".nl-forgotPassword .nl-error").show(), l.removeClass("nl-disabled"))
            },
            error: function() {
                l.removeClass("nl-disabled")
            }
        })
    });
    var t = {};
    parseQueryParameters(t);
    "true" !== t.upgrade || subscribed || showSubscription(getLocalStorage().getItem("registrationReason"))
});
var sy_subscType;

function paypalOnApprove(c, g) {
    c.type = sy_subscType;
    c.variation = sy_var;
    c.country = sy_cid;
    $(".featherlight-content .nl-signInContainer>div").addClass("nl-hidden");
    $(".featherlight-content .nl-processing").removeClass("nl-hidden");
    var k = $.Deferred();
    $.when(symbolab_log("Registration", "SubscribeCompleted-" + sy_subscType, registrationReason)).always(function() {
        k.resolve()
    });
    var r = $.Deferred();
    $.ajax({
        type: "POST",
        url: "/paypal/onApprove",
        beforeSend: authorizeAjaxWithSyToken,
        data: c,
        success: function(t) {
            "success subscription" ===
            t.alert ? ($(".featherlight-content .nl-signInContainer>div").addClass("nl-hidden"), $(".featherlight-content .nl-thankYouSubsc #subsRenewText").text(i18n("Subscription renews " + sy_subscType)), $(".featherlight-content .nl-thankYouSubsc").removeClass("nl-hidden"), $.featherlight.defaults.afterClose = function() {
                r.resolve()
            }) : "success payment" === t.alert ? ($(".featherlight-content .nl-signInContainer>div").addClass("nl-hidden"), $(".featherlight-content .nl-thankYou").removeClass("nl-hidden"), $.featherlight.defaults.afterClose =
                function() {
                    r.resolve()
                }) : ($(".featherlight-content .nl-signInContainer>div").addClass("nl-hidden"), $(".featherlight-content .nl-failed").removeClass("nl-hidden"), r.reject())
        },
        error: function(t, l, q) {
            console.log()
        }
    });
    $.whenAll(k, r).done(function() {
        location.reload()
    });
    return !0
}

function getAmount() {
    return "special" === sy_subscType ? 12.99 : "weekly" === sy_subscType ? 1.99 : "monthly" === sy_subscType ? 6.99 : "annually" === sy_subscType ? 29.99 : 0
}

function paypalOnCancel(c) {
    symbolab_log("Registration", "PayPalCancel-" + sy_subscType, registrationReason)
}

function paypalOnError(c) {
    symbolab_log("Registration", "PayPalError-" + sy_subscType, registrationReason)
}

function getSubscription() {
    var c = "";
    $.ajax({
        type: "GET",
        url: "/paypal/getSubscription",
        async: !1,
        data: {
            type: sy_subscType,
            variation: sy_var,
            country: sy_cid
        },
        beforeSend: authorizeAjaxWithSyToken,
        success: function(g) {
            c = g
        }
    });
    return c
}

function getGroupOrder(c) {
    var g = "";
    $.ajax({
        type: "GET",
        url: "/paypal/getGroupOrder",
        async: !1,
        data: {
            groupId: c,
            type: sy_subscType,
            promo: $(".featherlight-content #promoText").val()
        },
        beforeSend: authorizeAjaxWithSyToken,
        success: function(k) {
            g = k
        }
    });
    return g
}

function setSelectedSubscriptionOption(c) {
    $(".featherlight-content .subscribe-button").addClass("nl-disabled");
    var g = c.data("button");
    sy_subscType = c.attr("id");
    $(".featherlight-content #" + g).removeClass("nl-disabled");
    $(c.parent().find("input")).prop("checked", !0)
}

function createMatrixLatex(c, g) {
    for (var k = "\\begin{pmatrix}", r = 0; r < c; r++) {
        for (var t = 0; t < g - 1; t++) k += "&";
        r < c - 1 && (k += "\\\\")
    }
    return k + "\\end{pmatrix}"
}

function createCustomMatrix(c) {
    c.empty();
    c.append("<div class='title'>" + i18n("matrix-select-size") + " <span class='customMatrixDimensions'></span></div>");
    c.append("<span class='closeCustomMatrix'><div>" + i18n("matrix-close") + "</div></span>");
    for (var g = "<div class='matrixTable' style='padding-right: 0px !important; '><table>", k = 0; 10 > k; k++) {
        g += "<tr>";
        for (var r = 0; 10 > r; r++) g += "<td class='customMatrixTd'/>";
        g += "</tr>"
    }
    c.append(g + "</table></div>");
    c.show();
    $(".customMatrixTd").hover(function() {
        $(".customMatrixTd").removeClass("on");
        for (var t = $(this).parent().children().index($(this)) + 1, l = $(this).parent().parent().children().index($(this).parent()) + 1, q = 0; q < l; q++)
            for (var z = $(this).parent().parent().children().eq(q), d = 0; d < t; d++) z.children().eq(d).addClass("on");
        $(".customMatrixDimensions").text(l + "x" + t)
    });
    $(".customMatrixTd").click(function() {
        var t = $(this).parent().children().index($(this)) + 1,
            l = $(this).parent().parent().children().index($(this).parent()) + 1,
            q = createMatrixLatex(l, t);
        c.hide();
        "undefined" != typeof SYPAD ? (SYPAD.inputBox().mathquill("write",
            q, l * t), SYPAD.inputBox().focus()) : ($(".mathquill-editable").mathquill("write", q, l * t), $(".mathquill-editable").focus());
        return !1
    });
    c.find(".closeCustomMatrix").click(function() {
        c.hide();
        return !1
    })
}
jQuery.fn.selectText = function() {
    var c = this[0];
    if (document.body.createTextRange) {
        var g = document.body.createTextRange();
        g.moveToElementText(c);
        g.select()
    } else if (window.getSelection) {
        var k = window.getSelection();
        g = document.createRange();
        g.selectNodeContents(c);
        k.removeAllRanges();
        k.addRange(g)
    }
};

function pageExpired(c, g) {}

function browser() {
    var c = navigator.appName,
        g = navigator.userAgent,
        k, r = g.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
    r && null != (k = g.match(/version\/([\.\d]+)/i)) && (r[2] = k[1]);
    return r = r ? [r[1], r[2]] : [c, navigator.appVersion, "-?"]
}
var invertStyleContents = "<style type='text/css' id='invert-style'>@media screen {@-moz-document url-prefix('') { \tbody { \t\tbackground-color: black!important; \t} } html { \t-webkit-filter: invert(100%); \t-moz-filter: invert(100%); \t-o-filter: invert(100%); \t-ms-filter: invert(100%); \tfilter: invert(100%); } #HomeTopNav, #home_left_img, #home_right_img, .nl-search, .nl-searchContainer,#CodepadHead i.active,  #CodepadHead i:hover, #nl-feedback-text,.first.active, .search, .locked-step,.radBtn.active, .degBtn.active, .equalsBtn, .verify-button,.actionIcon:not(.selectize-control), .shareIcon, .solution-examples-img,.nl-actionButton.graph_menu_button, .colorIndication.colorBall,#resetSettingsBtn, .alertIndication, .practiceImg, .pMTitle,#customQuiz, .nl-quizBtn, .nl-title, .nl-redButton.nl-verify,.nl-practice-sprite.nl-practice-sprite-hintIcon, #nl-showHintsText, .nl-practice-sprite.nl-practice-sprite-hintArrow,.nl-relatedTopics, .nl-seeMoreClosed, .nl-seeMoreOpened,#clear-textfield, #add-given-button, #prove-find-selectors,.link_decoration, .search_image1, .locked-step, #fbSendBtn, #shapes svg,#add_segments_image, #triangle-shape-image, #icon_square_image, #circle-shape-select-icon, #parallels_image,.nl-leftMenu.active, .givenLabel, .nl-forgotPasswordLink, .nl-alreadyRegistered,#signInTopText, #centerIllustration, .signInHeader, #registerButton,.clickable.nl-practice-sprite, .shareIcon, .send.save.highlight-background,.structuredWhat, .structured_label, #empty_state_image,:not(.active) > .new_indication, .bloggerIcon, .post_more, .helpTop, .popular, #title,.item, #nl-correctAnswers, .nl-third.nl-summary-text.subTopicSummary, .nl-quizHistory, .corner-ribbon.print-hide,.admin.badge, .user-avatar, .select-number, .infoWhite .progressBar,.new-group-placeholder > .text, .new-group-placeholder > .line-h, .new-group-placeholder > .line-v,.edit > .icon, .delete-btn > .icon, .notebook > .icon, .dashboard > .icon, .member, .navigation-wrapper > .active,.accept-buttons, .differences, .add-member-button, .add-button, .sl > .purchase,.userInfoButton, svg.stock-avatar, .user-avatar .stock-avatar use, .nl-practice-sprite.nl-graphing-calc-icon,.remindMeLater, .planTitle, .planTerms, #plans_with_buttons input,#express-paypal-button-oneTime, div#express-paypal-button-subsc,.button-container > .cancel, .button-container > .save, .signUpList img, .subscriptionTypeRadioClass,.notebookLink, .groupOverMainSvg, .left-group, #groupTitleUse, .groups-icon, .groupOverviewTitle,#redoTopic, .nl-questionMark, .nl-answerCaption.nl-greenText, .nl-practice-sprite.nl-search-icon,.content-progress, .content-target .summary, .score-badge, .subject.open,.upload-avatar-img, .upload-avatar .upload-1, .update-avatar-button, p#profileUpdateSuccess,#group-payment-paypal-button, .groupNameSmall, .nameAndTopic svg use, #editAssignment svg, #removeAssignment svg,.msftBadge, .nl-facebook, .nl-microsoft, .nl-joinEmail, .nl-signInButton, .nl-createEmailAccount, #ShareButtons, #at-expanded-menu-host, #at20mc, #LikeButtons, #itunesLink, #androidLink, .googleAdsenseMiddle, #googleAdSenseHomepage, .googleAdsense, .adblock-replacement,.googleLeftSkyScrapper, .practiceAd, .practiceAd2, .avatar-success.alert-success,.active > img.avatar-image, .current-avatar > img.avatar-image, .userName img.avatar-image,.stock-list svg, .g_id_signin { \t-webkit-filter: invert(100%)!important; \t-moz-filter: invert(100%)!important; \t-o-filter: invert(100%)!important; \t-ms-filter: invert(100%)!important; \tfilter: invert(100%)!important; } .alertIndication {background-color: #181818!important;}.mathquill-rendered-math .empty {background: #CCCCCC!important;}.btn-custom.search {border: 1px solid #444444!important;}#nl-mainNav ul li.nl-navAction.nl-search {border-left: 1px solid #333333!important;}.new-pad-button {background-color: #E8E8E8!important;}#given-selector {background-color: #222222;}#given-selector:not(.selected) {color : #AAAAAA!important;}#prove-selector {background-color: #222222;}#prove-selector:not(.selected) {color : #AAAAAA!important;}#find-selector {background-color: #222222;}#find-selector:not(.selected) {color : #AAAAAA!important;}#find-selector:not(.selected) {color : #AAAAAA!important;}.groupTitle {color: #fe6d6e!important;}.groupName {color: #fe6d6e!important;}.nl-pageContent #group-lists .new-group-placeholder {border: solid 1px #fe6d6e !important;}#shapes > ul > li > a {background-color: #D8D8D8!important;}.member {background-color: #222222!important;}.navigation-wrapper > .active {color: #FFFFFF!important;}span.planTitle:not(#winterPromotion), span.planTerms:not(#pricePromotion) {color: #BBBBBB!important;}}</style>",
    invertStyleContentsHomepage =
    "<style type='text/css' id='invert-style'>@media screen {@-moz-document url-prefix('') { \tbody { \t\tbackground-color: black!important; \t} } html { \t-webkit-filter: invert(100%); \t-moz-filter: invert(100%); \t-o-filter: invert(100%); \t-ms-filter: invert(100%); \tfilter: invert(100%); } #home_left_img, #home_right_img, .nl-search, .nl-searchContainer, #nl-mainNav ul li:not(#HomeTopNav):hover span,#CodepadHead i.active,  #CodepadHead i:hover, #nl-feedback-text,.first.active, .search, .locked-step,.radBtn.active, .degBtn.active, .equalsBtn, .verify-button,.actionIcon:not(.selectize-control), .shareIcon, .solution-examples-img,.nl-actionButton.graph_menu_button, .colorIndication.colorBall,#resetSettingsBtn, .alertIndication, .practiceImg, .pMTitle,#customQuiz, .nl-quizBtn, .nl-title, .nl-redButton.nl-verify,.nl-practice-sprite.nl-practice-sprite-hintIcon, #nl-showHintsText, .nl-practice-sprite.nl-practice-sprite-hintArrow,.nl-relatedTopics, .nl-seeMoreClosed, .nl-seeMoreOpened,#clear-textfield, #add-given-button, #prove-find-selectors,.link_decoration, .search_image1, .locked-step, #fbSendBtn, #shapes svg,#add_segments_image, #triangle-shape-image, #icon_square_image, #circle-shape-select-icon, #parallels_image,.nl-leftMenu.active, .givenLabel, .nl-forgotPasswordLink, .nl-alreadyRegistered,#signInTopText, #centerIllustration, .signInHeader, #registerButton,.clickable.nl-practice-sprite, .shareIcon, .send.save.highlight-background,.structuredWhat, .structured_label, #empty_state_image,:not(.active) > .new_indication, .bloggerIcon, .post_more, .helpTop, .popular, #title,.item, #nl-correctAnswers, .nl-third.nl-summary-text.subTopicSummary, .nl-quizHistory, .corner-ribbon.print-hide,.admin.badge, .user-avatar, .select-number, .infoWhite .progressBar,.new-group-placeholder > .text, .new-group-placeholder > .line-h, .new-group-placeholder > .line-v,.edit > .icon, .delete-btn > .icon, .notebook > .icon, .dashboard > .icon, .member, .navigation-wrapper > .active,.accept-buttons, .differences, .add-member-button, .add-button, .sl > .purchase,.userInfoButton, svg.stock-avatar, .user-avatar .stock-avatar use, .nl-practice-sprite.nl-graphing-calc-icon,.remindMeLater, .planTitle, .planTerms, #plans_with_buttons input,#express-paypal-button-oneTime, div#express-paypal-button-subsc,.button-container > .cancel, .button-container > .save, .signUpList img, .subscriptionTypeRadioClass,.notebookLink, .groupOverMainSvg, .left-group, #groupTitleUse, .groups-icon, .groupOverviewTitle,#redoTopic, .nl-questionMark, .nl-answerCaption.nl-greenText, .nl-practice-sprite.nl-search-icon,.content-progress, .content-target .summary, .score-badge, .subject.open,.upload-avatar-img, .upload-avatar .upload-1, .update-avatar-button, p#profileUpdateSuccess,#group-payment-paypal-button, .groupNameSmall, .nameAndTopic svg use, #editAssignment svg, #removeAssignment svg,.msftBadge, .nl-facebook, .nl-microsoft, .nl-joinEmail, .nl-signInButton, .nl-createEmailAccount,#ShareButtons, #at-expanded-menu-host, #at20mc,#LikeButtons, #itunesLink, #androidLink, .googleAdsenseMiddle,#googleAdSenseHomepage, .googleAdsense,.googleLeftSkyScrapper, .practiceAd, .practiceAd2, .avatar-success.alert-success,.active > img.avatar-image, .current-avatar > img.avatar-image, .userName .whiteDropdown,#nl-topics, .m2u li a, .red_background, .bar-selected, #verify-btn, .nl-notesFav.note1, #show-steps-button,#view_full_notebook, .related_arrow, .collapse, .expand, #send-us-feedback > *, .viewLargerPlot svg, .show-more,.dotted-line-background, .show-hide-steps-box > *, #practice-link-container img, .homepage-solver-app-store,#next-step-button, #steps-button .open, #save-as-bookmark > svg, #save-as-bookmark-notebook, #save-as-bookmark-signin,#save-as-bookmark-notebook-saved, #save-as-bookmark-save-saved, #empty_bookmark, #toggle_mini_keypad, .toggle_mini_keypad,.googleAdsense, .stock-list svg, .parentPage.foldable:hover .red_color,.parentPage.foldable.red_background span, #verify-btn-wrapper:hover span, #bar-bookmark:hover span,i.active .mathquill-rendered-math .overline ,i:hover > .mathquill-rendered-math .overline,#nl-mainNav, #HomeTopNav svg use, #userName svg use,\n#HomeTopNav svg, #userName svg, #toggle-pad-on svg, .nl-searchContainer,\n#word_problems_img, #graphing_img, #geometry_img, #homepage-practice-headline, #homepage-practice-headline2,\n#homepage-practice-button, #reel_img, #solution_page_mobile_img, #homepage-practice-img, #solution_page_img,\n#homepage-explore-board div, #popular-calculators-links > div > svg,\n.home-only svg, #feedback-button, .feedback-button, #social-buttons a svg, .homepage-solver-app-store,\n.toggle-full-pad svg, .arrow_left1, #relatedList .more,.short-title-div a, #video-section, i.active .mathquill-rendered-math .overline, #nl-logo,#short-show-all, .short-calculators-title, .long-calculators-title,.input-bar, #sliders-button, .triple-bar, #pad-toggle-button, #keypad div.keypanel span.touch, .plotBalloon, .plotBalloon div,.red_background_parent svg#canvasSettings, .graphCheckbox svg, .input_template, .alertIndication1,#sign-in-button, #sign-bookmark, .save.bar-bookmark span, .tooltipstered1,.nl-notesFav, .tooltipster-box, .nl-notesFav1,.nl-content.nl-headline-content, .skin-clean #calculate-buttons-line svg use, .skin-clean #calculate-btn,.skin-orange #main-calculator, .skin-orange .givenInput, .skin-orange .units,.g_id_signin, #study-guide article img { -webkit-filter: invert(100%)!important;-moz-filter: invert(100%)!important;-o-filter: invert(100%)!important;-ms-filter: invert(100%)!important;filter: invert(100%)!important;}#homepage-second-block-inner, #homepage-explore {\nbackground-color: #E0E0E0!important;\n}\n#homepage-solver-banner {\nbox-shadow: 0 2px 14px rgba(0, 0, 0, 0.4)!important;\n}\nli.nl-search {\nbackground-color: #3ac6af!important;\n}\n#Codepad {\nbackground-color: #24c0a6!important;\n}\n.alertIndication {}.mathquill-rendered-math .empty {background: #CCCCCC!important;}.btn-custom.search {border: 1px solid #444444!important;}#nl-mainNav ul li.nl-navAction.nl-search {border-left: 1px solid #333333!important;}.new-pad-button {background-color: #E8E8E8!important;}#given-selector {background-color: #222222;}#given-selector:not(.selected) {color : #AAAAAA!important;}#prove-selector {background-color: #222222;}#prove-selector:not(.selected) {color : #AAAAAA!important;}#find-selector {background-color: #222222;}#find-selector:not(.selected) {color : #AAAAAA!important;}#find-selector:not(.selected) {color : #AAAAAA!important;}.groupTitle {color: #fe6d6e!important;}.groupName {color: #fe6d6e!important;}.nl-pageContent #group-lists .new-group-placeholder {border: solid 1px #fe6d6e !important;}#shapes > ul > li > a {background-color: #D8D8D8!important;}.member {background-color: #222222!important;}.navigation-wrapper > .active {color: #FFFFFF!important;}span.planTitle:not(#winterPromotion), span.planTerms:not(#pricePromotion) {color: #BBBBBB!important;}.nl-leftMenu:not(.red_color) .pointer, .nl-leftMenu:not(.red_color) span:not(.red) {color: white;}#stock-avatar-light-mode .stock-avatar.signed-out, #stock-avatar-light-mode .stock-avatar.signed-out use {filter: saturate(0)!important;}#bread-crumbs *, .mathquill-input, .mathquill-editable, .mathquill-rendered-math, .placeholder {color: black;}.short-body-div a, .long-calculators-title a {color: black;}#dym-target > a {border: 1px solid black!important;}.info {\nfilter: brightness(0%)!important;\n}.toggle-full-pad span, .new_solution_box_title, #topic-description_title, .new_solution_box_title2, a.viewLargerPlot,#most_used_actions h2, #main-input.mathquill-input.mathquill-editable, .mathquill-embedded-latex,#topic-description_body, #FAQ div, #FAQ li span ,.post_title, .post_content, #most_used_actions select,#dym-target span, #dym h2, .plotting, .solution_display_row .solution_scrollable #mathquillQueryInput * ,#solution-only-one-line .mathquill-embedded-latex * , .new_solution_box_title1, #nl-edit-bar a:not(.bar-selected),.solution_step_primary .mathquill-embedded-latex span, .steps-title, #solution-only h2, #practice-link-container, .solution_step_primary .mathquill-embedded-latex var, .solution_step_secondary .mathquill-embedded-latex span, #keypad div.keypanel span {color: black!important;}a.popular.popular_examples .mathquill-embedded-latex {color: #707070!important;}#nl-edit-bar a.bar-selected.pill {color: #DB3F59 !important;}#Examples_section, #input-and-go, #top-three-notes, #send-us-feedback, #topic-description, .new_solution_box_body,#solution-only-container,.nl-leftNav > div {box-shadow: 0px 1.74375px 13.95px rgba(0, 0, 0, 0.1);}.m2u_hr {border: 1px solid #d5d3d3!important;}.sliders-button {background-color: white;}#sliders-button, #sliders-button-close {display: none;}svg#sliders-button-inverse, svg#sliders-button-close-inverse {display: block;}#examples a div p, .titleInput::placeholder, .graphMainMenu div a {color: black!important;}.nl-notesFav, .menu, #canvasZoom :not(.red_background_parent) #canvasSettings use, #graph-plus-minus img, #graph-focus img,.graphMainMenu > div a svg, .graphSettingLabel, .axisName, .axisLabel input::placeholder, .rangeContainer, #input #keypad div.keypanel span svg {filter: brightness(0);}.graphMainMenu > div a:hover {background-color: #24c0a626!important;}.input-row > div > span, .row-left span {color: white;}#calculator_page1 {background-color: #E9EBEB;}#form-calculator .dark {background-color: #DDDDDD!important;}}</style>";

function getProductByUrl() {
    return 0 <= window.location.href.indexOf("/solver") ? "Solutions" : 0 <= window.location.href.indexOf("/practice") ? "Practice" : 0 <= window.location.href.indexOf("/notebook") ? "Notebook" : 0 <= window.location.href.indexOf("/graphing-calculator") ? "GraphingCalculator" : "Action"
}

function liveToggleInvert(c) {
    c ? (0 == $("#invert-style").size() && $("head").append($(invertStyleContents)), $(".nl-lightsOutSwitch").attr("title", i18n("js.Lights on"))) : ($("#invert-style").remove(), $(".nl-lightsOutSwitch").attr("title", i18n("js.Lights out")))
}

function liveToggleInvertHomepage(c) {
    c ? (0 === $("#invert-style").size() && ($("head").append($(invertStyleContentsHomepage)), $(".toggle_mini_keypad .open").attr("src", "/public/images/toggle_open_dm.png")), $(".nl-lightsOutSwitch").attr("title", i18n("js.Lights on"))) : ($("#invert-style").remove(), $(".nl-lightsOutSwitch").attr("title", i18n("js.Lights out")), $(".toggle_mini_keypad .open").attr("src", "/public/images/toggle_open.png"));
    graphingSlider(c)
}

function graphingSlider(c) {
    c && 0 < $("#sliders-button").length ? 0 === $("#sliders-button.hide").length ? ($("#sliders-button-inverse").attr("class", "sliders-button-inverse"), $("#sliders-button-close-inverse").attr("class", "sliders-button-inverse hide-important")) : ($("#sliders-button-inverse").attr("class", "sliders-button-inverse hide-important"), $("#sliders-button-close-inverse").attr("class", "sliders-button-inverse")) : !c && 0 < $("#sliders-button-inverse").length && (0 === $("#sliders-button-inverse.hide-important").length ?
        ($("#sliders-button").attr("class", "sliders-button"), $("#sliders-button-close").attr("class", "sliders-button hide")) : ($("#sliders-button").attr("class", "sliders-button hide"), $("#sliders-button-close").attr("class", "sliders-button")))
}

function ensureCorrectLightsOut() {
    "true" === getInverseCookieValue() ? liveToggleInvert(!0) : liveToggleInvert(!1)
}

function lightsOut() {
    "true" === getInverseCookieValue() ? (createInvertCookie("false"), liveToggleInvert(!1), symbolab_log(getProductByUrl(), "LightsOn", null)) : (createInvertCookie("true"), liveToggleInvert(!0), symbolab_log(getProductByUrl(), "LightsOut", null))
}

function ensureCorrectLightsOutHomepage() {
    "true" === getInverseCookieValue() ? liveToggleInvertHomepage(!0) : liveToggleInvertHomepage(!1)
}

function lightsOutHomepage() {
    "true" === getInverseCookieValue() ? (createInvertCookie("false"), liveToggleInvertHomepage(!1), symbolab_log(getProductByUrl(), "LightsOn", null)) : (createInvertCookie("true"), liveToggleInvertHomepage(!0), symbolab_log(getProductByUrl(), "LightsOut", null))
}

function resetUserData() {
    var c = getTerminalSessionStringCookieValue();
    c = !c || 0 <= c.indexOf("Start") ? "End Session" : "Start Session";
    createTerminalSessionStringCookie(c);
    $("#resetTop").text(c);
    $.whenAll($.ajax({
        type: "POST",
        url: "/api/user/clearPractice",
        beforeSend: authorizeAjaxWithSyToken
    }), $.ajax({
        type: "POST",
        url: "/api/notebook/clearNotes",
        beforeSend: authorizeAjaxWithSyToken
    })).then(function() {
        window.location.href = "/"
    })
}
(function(c) {
    var g = [].slice;
    c.whenAll = function(k) {
        function r(w, E, C) {
            return function() {
                C !== t && f++;
                z.notifyWith(E[w] = this, C[w] = g.call(arguments));
                if (!--q) z[(f ? "reject" : "resolve") + "With"](E, C)
            }
        }
        for (var t = 1 == arguments.length && c.isArray(k) ? k : g.call(arguments), l = t.length, q = l, z = c.Deferred(), d = 0, f = 0, a = Array(l), m = Array(l), v = Array(l), x; d < l; d++)(x = t[d]) && c.isFunction(x.promise) ? x.promise().done(r(d, v, t)).fail(r(d, a, m)) : (z.notifyWith(this, x), --q);
        q || z.resolveWith(v, t);
        return z.promise()
    }
})(jQuery);

function createCookie(c, g, k, r) {
    if (k) {
        var t = new Date;
        t.setTime(t.getTime() + 864E5 * k);
        k = "; expires=" + t.toGMTString()
    } else k = "";
    t = "";
    r || (window.location.href.match(/symbolab\.com/) ? t = ";domain=.symbolab.com" : window.location.href.match(/scibug\.com/) && (t = ";domain=.scibug.com"));
    document.cookie = encodeURIComponent(c) + "=" + encodeURIComponent(g) + k + "; path=/" + t
}

function readCookieLegacyFallback(c, g) {
    c = readCookie(c);
    return null == c || "" === c ? readCookie(g) : c
}

function readCookie(c) {
    c = encodeURIComponent(c) + "=";
    for (var g = document.cookie.split(";"), k = 0; k < g.length; k++) {
        for (var r = g[k];
            " " === r.charAt(0);) r = r.substring(1, r.length);
        if (0 === r.indexOf(c)) return decodeURIComponent(r.substring(c.length, r.length))
    }
    return null
}

function eraseCookie(c) {
    createCookie(c, "", -1)
}

function eraseLegacyCookie(c) {
    createCookie(c, "", -1, !0)
}

function isUserLoggedIn() {
    return readCookieLegacyFallback("sy2.token", "sy.token") ? !0 : !1
}

function createPubTokenCookie(c) {
    createCookie("sy2.pub.token", c, 1)
}

function eraseTerminalSessionStringCookie() {
    eraseCookie("sy2.terminalSessionString");
    eraseLegacyCookie("sy.terminalSessionString")
}

function createTerminalSessionStringCookie(c) {
    eraseTerminalSessionStringCookie();
    createCookie("sy2.terminalSessionString", c)
}

function createTerminalSessionPassCookie(c) {
    createCookie("sy2.terminal.pass", c)
}

function getInverseCookieValue() {
    return readCookieLegacyFallback("sy2.invert", "invert")
}

function getTerminalSessionStringCookieValue() {
    return readCookieLegacyFallback("sy2.terminalSessionString", "sy.terminalSessionString")
}

function createInvertCookie(c) {
    allowedCookieGroups("C0003") && createCookie("sy2.invert", c)
}

function authorizeAjaxWithSyToken(c) {
    c.setRequestHeader("Authorization", "Bearer " + readCookieLegacyFallback("sy2.token", "sy.token"))
}

function authorizeAjaxWithSyPubToken(c) {
    c.setRequestHeader("Authorization", "Bearer " + readCookieLegacyFallback("sy2.pub.token", "sy.pub.token"))
}

function ajaxImage(c, g, k) {
    return new Promise(function(r, t) {
        var l = new XMLHttpRequest;
        l.onreadystatechange = function() {
            if (4 === this.readyState)
                if (200 === this.status) {
                    var q = (window.URL || window.webkitURL).createObjectURL(this.response),
                        z = this.response;
                    g.on("load", function() {
                        r(z);
                        g.off("load")
                    });
                    g.attr("src", q)
                } else void 0 !== k && k.hide(), t(this.error)
        };
        l.open("GET", c);
        authorizeAjaxWithSyPubToken(l);
        l.responseType = "blob";
        l.setRequestHeader("x-requested-with", "XMLHttpRequest");
        l.send()
    })
}

function groupSelectSelected(c) {
    c = c[0];
    var g;
    var k = c.parentNode.parentNode.getElementsByTagName("select")[0];
    var r = c.parentNode.previousSibling;
    for (g = 0; g < k.length; g++)
        if (k.options[g].innerHTML == c.innerHTML) {
            k.selectedIndex = g;
            r.innerHTML = c.innerHTML;
            g = c.parentNode.getElementsByClassName("same-as-selected");
            for (k = 0; k < g.length; k++) g[k].removeAttribute("class");
            c.setAttribute("class", "same-as-selected");
            break
        }
}

function clearGroupSelects(c) {
    c.find(".select-selected").remove();
    c.find(".select-items").remove()
}

function openSelect(c) {
    c = c.find("div.select-selected")[0];
    c.nextSibling.classList.toggle("select-hide");
    c.classList.toggle("select-arrow-active")
}

function setupGroupSelect(c, g, k, r) {
    function t(v) {
        var x, w = [];
        var E = document.getElementsByClassName("select-items");
        var C = document.getElementsByClassName("select-selected");
        for (x = 0; x < C.length; x++) v == C[x] ? w.push(x) : C[x].classList.remove("select-arrow-active");
        for (x = 0; x < E.length; x++) w.indexOf(x) && E[x].classList.add("select-hide")
    }
    var l;
    var q = document.getElementsByClassName("group-select");
    for (l = 0; l < q.length; l++)
        if (void 0 === k || $(q[l]).attr("id") === k) {
            var z = q[l].getElementsByTagName("select")[0];
            var d =
                document.createElement("DIV");
            d.setAttribute("class", "select-selected");
            var f = z.options[z.selectedIndex];
            void 0 !== f && (d.innerHTML = f.innerHTML);
            q[l].appendChild(d);
            var a = document.createElement("DIV");
            a.setAttribute("class", "select-items select-hide");
            f = 0;
            for (c && (f = 1); f < z.length; f++) {
                var m = document.createElement("DIV");
                m.innerHTML = z.options[f].innerHTML;
                m.setAttribute("data-group", z.options[f].value);
                z.options[f].disabled ? ($(m).addClass("disabled"), m.addEventListener("click", function(v) {
                        v.stopPropagation()
                    })) :
                    m.addEventListener("click", function(v) {
                        groupSelectSelected($(this));
                        this.parentNode.previousSibling.click();
                        g()
                    });
                a.appendChild(m)
            }
            q[l].appendChild(a);
            d.addEventListener("click", function(v) {
                v.stopPropagation();
                t(this);
                this.nextSibling.classList.toggle("select-hide");
                this.classList.toggle("select-arrow-active");
                this.classList.contains("select-arrow-active") && r && r()
            })
        } document.addEventListener("click", t)
}

function repeat(c, g) {
    for (var k = "", r = 1; r <= g; r++) k += c;
    return k
}
window.a2a_config = {
    onclick: 1,
    callbacks: [{
        ready: () => {
            $(".a2a_dd span:first-child").click()
        },
        share: c => {
            symbolab_log("Registration", "ClickedFeature", a2a_config.logAction + "\tShare\t" + c.service);
            amplitude.track("Clicked", {
                type: "Share",
                service: c.service,
                url: c.url
            });
            return {
                url: a2a_config.linkurl,
                title: a2a_config.linkname
            }
        }
    }]
};
let shareClickEventReady = !1;

function shareClick({
    url: c,
    title: g,
    logAction: k
}) {
    a2a_config.linkurl = c;
    a2a_config.linkname = g;
    a2a_config.logAction = k;
    "undefined" == typeof a2a ? (c = document.createElement("script"), c.type = "text/javascript", c.src = "https://static.addtoany.com/menu/page.js", document.getElementsByTagName("head")[0].appendChild(c)) : (shareClickEventReady && (symbolab_log("Registration", "SeenFeature", a2a_config.logAction + "\tShare"), c || (c = window.location.href), amplitude.track("Seen", {
        type: "Share",
        url: c
    })), shareClickEventReady = !0)
}

function escapeHtml(c) {
    return c.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;")
}

function resumeSubscription(c, g) {
    symbolab_log("Registration", "ShowResume", c);
    alertify.okBtn(i18n("js.Resume")).cancelBtn(i18n("js.cancel")).confirm(i18n("js.resume_question", i18n(sy_pSub)), function() {
        $(".loading-animation").show();
        $.ajax({
            type: "POST",
            url: "/api/payments/resumeSubscription",
            data: {
                reason: "user request"
            },
            beforeSend: authorizeAjaxWithSyToken,
            success: function(k) {
                symbolab_log("Registration", "Resumed", c);
                alertify.okBtn("OK").alert(k.success ? i18n("js.Subscription Resumed") : i18n("js.Operation Failed"),
                    function() {
                        void 0 !== g && (location += g);
                        location.reload()
                    },
                    function() {
                        void 0 !== g && (location += g);
                        location.reload()
                    })
            }
        })
    }, function() {
        $("#paypalActivate").removeClass("nl-disabled");
        $("#paypalUnsubscribeNew").removeClass("nl-disabled")
    })
}

function setDefaultSubscription() {
    setSelectedSubscriptionOption($(".subscribeOption[id=annually]"))
}

function getParams(c) {
    var g = {},
        k = c.indexOf("#");
    if (0 <= k) {
        c = c.substring(k + 1);
        for (var r = /([^&=]+)=?([^&]*)/g; k = r.exec(c);) g[decodeURIComponent(k[1])] = decodeURIComponent(k[2])
    }
    return g
}

function clickedSendCHLinkButton(c) {
    const g = $(c);
    g.addClass("nl-disabled");
    sendCourseHeroLink().done(function(k) {
        g.removeClass("nl-disabled");
        k.success && ($("#nl-successfullySignedPopup").hide(), alertify.alert(k.success))
    }).fail(function(k) {
        g.removeClass("nl-disabled");
        alertify.alert(k)
    })
}

function loadCourseHeroLink(c, g) {
    if (isUserLoggedIn()) {
        const k = window.location.href.replace(/\?.*/, "");
        subscribed ? "1" === c ? (amplitude.track("CHBundle", {
                state: "UserLinked"
            }), isSolverFeatureRequestedCancelUpgradeMessage() || (symbolab_log("Registration", "CHBundle-UserLinked"), $("#nl-successfullySignedPopup").show(), $("#popup-avatar").hide(), $("#successfullySignedUp").text(i18n("Subscription active")), $("#UpgradeToProButton").removeClass("hide-important").text(i18n("Manage subscription")).off("click").on("click",
                function() {
                    window.location = "/user#subscription"
                }))) : (amplitude.track("CHBundle", {
                state: "UserSubscribed"
            }), symbolab_log("Registration", "CHBundle-UserSubscribed"), isSolverFeatureRequestedCancelUpgradeMessage() || ($("#nl-successfullySignedPopup").show(), $("#popup-avatar").hide(), $("#successfullySignedUp").text(i18n("You are currently subscribed")), $("#UpgradeToProButton").removeClass("hide-important").text(i18n("Manage subscription")).off("click").on("click", function() {
                window.location = "/user#subscription"
            }))) :
            "1" === g ? (amplitude.track("CHBundle", {
                state: "UserNotVerified"
            }), symbolab_log("Registration", "CHBundle-UserNotVerified"), $("#popup-avatar").hide(), $("#nl-successfullySignedPopup").show(), $("#successfullySignedUp").text(i18n("Your subscription is ready to activate")), $("#UpgradeToProButton").removeClass("hide-important").text(i18n("Activate CourseHero Bundle")).off("click").on("click", function() {
                clickedSendCHLinkButton(this)
            })) : (amplitude.track("CHBundle", {
                state: "UserNotFound"
            }), symbolab_log("Registration",
                "CHBundle-UserNotFound"), $("#success_image").hide(), $("#nl-successfullySignedPopup").show(), $("#successfullySignedUp").text(i18n("Your bundle subscription is registered under a different email")), $("#UpgradeToProButton").removeClass("hide-important").text(i18n("Sign in with Bundle Email")).off("click").on("click", function() {
                logUserOutWithoutRedirect().done(function(r) {
                    window.location = "/registration#flow=signup&reason=CHLink&page=signup&url=" + encodeURIComponent(window.location.href)
                })
            }));
        window.history.replaceState({},
            document.title, k)
    } else symbolab_log("Registration", "CHBundle-NotLoggedIn"), amplitude.track("CHBundle", {
        state: "NotLoggedIn"
    }).promise.then(function() {
        window.location = "/registration#flow=signup&reason=CHLink&page=signup&url=" + encodeURIComponent(window.location.href)
    });
    $("#cancelPopup").click(function() {
        $("#nl-successfullySignedPopup").hide()
    });
    $("#StartExploringButton").click(function() {
        $("#nl-successfullySignedPopup").hide()
    })
}

function loadUpgrade(c) {
    $("#moreText").text("");
    var g = getParams(c);
    c = getPlanText(g.planInfo);
    0 < c.length && ($("#moreText").css("font-size", "17px").html(c), $("#popup-avatar").css("margin-top", "30px"), $("#popupButtons").css("margin-top", "50px"));
    g.page && ("1" === g.link && $("#UpgradeToProButton").text(i18n("Activate CourseHero Bundle")), "upgraded" === g.page ? (isSolverFeatureRequestedCancelUpgradeMessage() || $("#nl-successfullySignedPopup").show(), symbolab_log("Registration", "SubscribeCompleted-" + g.vendor + "_" +
            g.planInfo, g.reason), amp_log("SubscribeCompleted", "vendor=" + g.vendor + "\tplanInfo=" + g.planInfo, !0), isSolverFeatureRequestedCancelUpgradeMessage() || ($("#popup-avatar").hide(), "1" === g.link ? ($("#moreText").text(i18n("Subscription active")), $("#successfullySignedUp").text(i18n("Thank you for signing in")), $("#UpgradeToProButton").text(i18n("Activate CourseHero Bundle"))) : $("#successfullySignedUp").text(i18n("Thank you for subscribing")))) : "signedIn" === g.page && "1" === g.link ? ("1" === g.upgradeAttempt ? $("#successfullySignedUp").text(i18n("Your subscription bundle awaits")) :
            $("#successfullySignedUp").text(i18n("Thank you for signing in")), $("#nl-successfullySignedPopup").show(), $("#success_image").hide()) : "signedUp" === g.page ? ($("#successfullySignedUp").text(i18n("Thank you for signing up")), $("#nl-successfullySignedPopup").show(), $("#popup-avatar").hide()) : "ongoingSubscription" !== g.page || isSolverFeatureRequestedCancelUpgradeMessage() || ($("#successfullySignedUp").text("Thank you for your ongoing subscription"), $("#nl-successfullySignedPopup").show(), $("#popup-avatar").hide()),
        $("body").off("click", "#UpgradeToProButton:not(.nl-disabled)").on("click", "#UpgradeToProButton:not(.nl-disabled)", function() {
            "1" === g.link ? clickedSendCHLinkButton(this) : showSignUp("Solver")
        }));
    $("#cancelPopup").click(function() {
        $("#nl-successfullySignedPopup").hide()
    });
    $("#StartExploringButton").click(function() {
        $("#nl-successfullySignedPopup").hide()
    });
    window.history.replaceState({}, document.title, window.location.pathname + window.location.search)
}

function getPlanText(c) {
    var g = "";
    "monthly" === c ? g = i18n("Subscription renews monthly") : "weekly" === c ? g = i18n("Subscription renews weekly") : "annually" === c ? g = i18n("Subscription renews annually") : "semi" === c && (g = i18n("Subscription renews semi-annually"));
    return g
}

function isSolverFeatureRequestedCancelUpgradeMessage() {
    const c = new URLSearchParams(window.location.search);
    return 0 <= ["verify", "challenge"].indexOf(c.get("feature"))
}

function checkIPad() {
    const c = new URL(window.location);
    if ("1" !== decodeURIComponent(c.searchParams.get("mobileWebRedirect"))) {
        var g = navigator.userAgent && -1 < navigator.userAgent.toLowerCase().indexOf("macintosh") && navigator.maxTouchPoints && 2 < navigator.maxTouchPoints,
            k = readCookie("sy.probablyIPad");
        k && "1" === k || !g || (createCookie("sy.probablyIPad", "1"), c.searchParams.set("mobileWebRedirect", "1"), window.location = c.href)
    }
}
$(document).ready(function() {
    checkIPad();
    var c = new URL(window.location);
    c.searchParams.has("coursehero") ? loadCourseHeroLink(c.searchParams.get("linked"), c.searchParams.get("linkavailable")) : (c = window.location.hash, (c.includes("page=upgraded") || c.includes("page=signedIn") || c.includes("page=signedUp") || c.includes("page=coursehero") || c.includes("page=ongoingSubscription")) && loadUpgrade(c));
    $("#signIn").click(function(g) {
        g.preventDefault();
        showSignUp("TopMenu")
    });
    $("#mobile_logout").click(function(g) {
        g.preventDefault();
        window.location = "/logout"
    });
    "undefined" !== typeof amplitude && (c = getLocalStorage().getItem("linkOrigin"), getLocalStorage().removeItem("linkOrigin"), (c = amplitude.track("Enter", {
        data: window.location.pathname,
        linkOrigin: c,
        referrer: document.referrer
    })) && c.promise && c.promise.then(function(g) {
        allowedCookieGroups("C0002") && (createCookie("sy.amp.session", amplitude.getSessionId()), createCookie("sy.amp.device", amplitude.getDeviceId()))
    }))
});

function allowedCookieGroups(c) {
    var g = readCookie("OptanonConsent");
    return g ? (g = g.split("&").map(function(k) {
        return k.split("=")
    }), g = Object.fromEntries(g).groups.split(",").map(function(k) {
        k = k.split(":");
        return [k[0], "1" === k[1]]
    }), !0 === Object.fromEntries(g)[c]) : !0
}

function OptanonWrapper() {
    var c = OneTrust.GetDomainData();
    c && c.ConsentModel && "opt-out" === c.ConsentModel.Name && $(".cookie-settings-link").hide();
    OneTrust.OnConsentChanged(function(g) {
        (g = OneTrust.GetDomainData()) && g.ConsentModel && "opt-in" === g.ConsentModel.Name && window.location.reload()
    })
}

function openCookiePreferencesIfRelevant() {
    var c = OneTrust.GetDomainData();
    c && c.ConsentModel && "opt-in" === c.ConsentModel.Name && OneTrust.ToggleInfoDisplay()
}

function handleGoogleOneTapNotification(c) {
    const g = "/" === window.location.pathname ? "HomePage" : "Solver";
    c.isDisplayMoment() && c.isDisplayed() && symbolab_log("Registration", "SeenFeature", "OneTap\t" + g);
    c.isSkippedMoment() && symbolab_log("Registration", "ClickedFeature", "OneTap\t" + g + "\tClose")
}

function handleGoogleOneTap(c) {
    const g = "/" === window.location.pathname ? "HomePage" : "Solver";
    symbolab_log("Registration", "ClickedFeature", "OneTap\t" + g + "\tLogin");
    registrationReason = "OneTap\t" + g;
    handleGoogleToken(c)
}

function handleGoogleToken(c) {
    var g = requestUrl,
        k = googleIsSignUp ? !1 : $(".featherlight-content #rememberMe").prop("checked"),
        r = function(t) {
            window.location.href === g ? void 0 !== t && (g = 0 > g.indexOf("#") ? g + "#" : g + "&", window.location = g + t) : (void 0 !== t && (g = 0 > g.indexOf("#") ? g + "#" : g + "&", g += t), window.location = g);
            window.location.reload()
        };
    $.ajax({
        type: "POST",
        url: "/googleMobileAuth",
        beforeSend: authorizeAjaxWithSyToken,
        data: {
            idRequestToken: c.credential,
            registrationReason,
            remember: k,
            redirect: requestUrl
        }
    }).done(function(t) {
        if (t.success ||
            t.jwt) {
            let l = void 0;
            t.newlyLinkedToCourseHero && (l = "firstTimeLink=1");
            prepareGeometryForReload().then(function(q) {
                g += encodeURIComponent("#" + q);
                r(l)
            }, function() {
                r(l)
            })
        } else t = $("<p />", {
            text: t.alert,
            "class": "alert alert-error"
        }), $("#loginOptionsPanel .alert.alert-error").remove(), $("#loginOptionsPanel").append(t)
    })
}
async function securedAjax(c) {
    return ajax(c, !0)
}
async function ajax(c, g) {
    return new Promise((k, r) => {
        c.type = c.type ?? "GET";
        g && (c.beforeSend = authorizeAjaxWithSyToken);
        c.success = function(t) {
            k(t)
        };
        c.error = function(t) {
            r(t)
        };
        $.ajax(c)
    })
}

function searchInitiatedLog(c, g) {
    g ||= (new URLSearchParams(window.location.search)).get("or") ?? "";
    symbolab_log("General", "SearchInitiated", g, c)
}
(function() {
    function c() {
        var t = {
            parent: document.body,
            version: "1.0.11",
            defaultOkLabel: "OK",
            okLabel: "OK",
            defaultCancelLabel: "Cancel",
            cancelLabel: "Cancel",
            defaultMaxLogItems: 2,
            maxLogItems: 2,
            promptValue: "",
            promptPlaceholder: "",
            closeLogOnClick: !1,
            closeLogOnClickDefault: !1,
            delay: 5E3,
            defaultDelay: 5E3,
            logContainerClass: "alertify-logs",
            logContainerDefaultClass: "alertify-logs",
            dialogs: {
                buttons: {
                    holder: "<nav>{{buttons}}</nav>",
                    ok: "<button class='ok' tabindex='1'>{{ok}}</button>",
                    cancel: "<button class='cancel' tabindex='2'>{{cancel}}</button>"
                },
                input: "<input type='text'>",
                message: "<p class='msg'>{{message}}</p>",
                log: "<div class='{{class}}'>{{message}}</div>"
            },
            defaultDialogs: {
                buttons: {
                    holder: "<nav>{{buttons}}</nav>",
                    ok: "<button class='ok' tabindex='1'>{{ok}}</button>",
                    cancel: "<button class='cancel' tabindex='2'>{{cancel}}</button>"
                },
                input: "<input type='text'>",
                message: "<p class='msg'>{{message}}</p>",
                log: "<div class='{{class}}'>{{message}}</div>"
            },
            build: function(l) {
                var q = this.dialogs.buttons.ok,
                    z = "<div class='dialog'><div>" + this.dialogs.message.replace("{{message}}",
                        l.message);
                if ("confirm" === l.type || "prompt" === l.type) q = this.dialogs.buttons.cancel + this.dialogs.buttons.ok;
                "prompt" === l.type && (z += this.dialogs.input);
                return z = (z + this.dialogs.buttons.holder + "</div></div>").replace("{{buttons}}", q).replace("{{ok}}", this.okLabel).replace("{{cancel}}", this.cancelLabel)
            },
            setCloseLogOnClick: function(l) {
                this.closeLogOnClick = !!l
            },
            close: function(l, q) {
                this.closeLogOnClick && l.addEventListener("click", function() {
                    g(l)
                });
                q = q && !isNaN(+q) ? +q : this.delay;
                0 > q ? g(l) : 0 < q && setTimeout(function() {
                        g(l)
                    },
                    q)
            },
            dialog: function(l, q, z, d) {
                return this.setup({
                    type: q,
                    message: l,
                    onOkay: z,
                    onCancel: d
                })
            },
            log: function(l, q, z) {
                var d = document.querySelectorAll(".alertify-logs > div");
                if (d) {
                    var f = d.length - this.maxLogItems;
                    if (0 <= f) {
                        var a = 0;
                        for (f += 1; a < f; a++) this.close(d[a], -1)
                    }
                }
                this.notify(l, q, z)
            },
            setLogPosition: function(l) {
                this.logContainerClass = "alertify-logs " + l
            },
            setupLogContainer: function() {
                var l = document.querySelector(".alertify-logs"),
                    q = this.logContainerClass;
                l || (l = document.createElement("div"), l.className = q, this.parent.appendChild(l));
                l.className !== q && (l.className = q);
                return l
            },
            notify: function(l, q, z) {
                var d = this.setupLogContainer(),
                    f = document.createElement("div");
                f.className = q || "default";
                f.innerHTML = t.logTemplateMethod ? t.logTemplateMethod(l) : l;
                "function" === typeof z && f.addEventListener("click", z);
                d.appendChild(f);
                setTimeout(function() {
                    f.className += " show"
                }, 10);
                this.close(f, this.delay)
            },
            setup: function(l) {
                function q(x) {
                    "function" !== typeof x && (x = function() {});
                    d && d.addEventListener("click", function(w) {
                        if (l.onOkay && "function" === typeof l.onOkay)
                            if (a) l.onOkay(a.value,
                                w);
                            else l.onOkay(w);
                        a ? x({
                            buttonClicked: "ok",
                            inputValue: a.value,
                            event: w
                        }) : x({
                            buttonClicked: "ok",
                            event: w
                        });
                        g(z)
                    });
                    f && f.addEventListener("click", function(w) {
                        if (l.onCancel && "function" === typeof l.onCancel) l.onCancel(w);
                        x({
                            buttonClicked: "cancel",
                            event: w
                        });
                        g(z)
                    });
                    a && a.addEventListener("keyup", function(w) {
                        13 === w.which && d.click()
                    })
                }
                var z = document.createElement("div");
                z.className = "alertify hide";
                z.innerHTML = this.build(l);
                var d = z.querySelector(".ok"),
                    f = z.querySelector(".cancel"),
                    a = z.querySelector("input"),
                    m =
                    z.querySelector("label");
                a && ("string" === typeof this.promptPlaceholder && (m ? m.textContent = this.promptPlaceholder : a.placeholder = this.promptPlaceholder), "string" === typeof this.promptValue && (a.value = this.promptValue), "string" === typeof this._inputType && (a.type = this._inputType));
                var v;
                "function" === typeof Promise ? v = new Promise(q) : q();
                this.parent.appendChild(z);
                setTimeout(function() {
                    z.classList.remove("hide");
                    a && l.type && "prompt" === l.type ? (a.select(), a.focus()) : d && d.focus()
                }, 100);
                return v
            },
            okBtn: function(l) {
                this.okLabel =
                    l;
                return this
            },
            inputType: function(l) {
                this._inputType = l;
                return this
            },
            setDelay: function(l) {
                l = l || 0;
                this.delay = isNaN(l) ? this.defaultDelay : parseInt(l, 10);
                return this
            },
            cancelBtn: function(l) {
                this.cancelLabel = l;
                return this
            },
            setMaxLogItems: function(l) {
                this.maxLogItems = parseInt(l || this.defaultMaxLogItems)
            },
            theme: function(l) {
                switch (l.toLowerCase()) {
                    case "bootstrap":
                        this.dialogs.buttons.ok = "<button class='ok btn btn-primary' tabindex='1'>{{ok}}</button>";
                        this.dialogs.buttons.cancel = "<button class='cancel btn btn-default' tabindex='2'>{{cancel}}</button>";
                        this.dialogs.input = "<input type='text' class='form-control'>";
                        break;
                    case "purecss":
                        this.dialogs.buttons.ok = "<button class='ok pure-button' tabindex='1'>{{ok}}</button>";
                        this.dialogs.buttons.cancel = "<button class='cancel pure-button' tabindex='2'>{{cancel}}</button>";
                        break;
                    case "mdl":
                    case "material-design-light":
                        this.dialogs.buttons.ok = "<button class='ok mdl-button mdl-js-button mdl-js-ripple-effect'  tabindex='1'>{{ok}}</button>";
                        this.dialogs.buttons.cancel = "<button class='cancel mdl-button mdl-js-button mdl-js-ripple-effect' tabindex='2'>{{cancel}}</button>";
                        this.dialogs.input = "<div class='mdl-textfield mdl-js-textfield'><input class='mdl-textfield__input'><label class='md-textfield__label'></label></div>";
                        break;
                    case "angular-material":
                        this.dialogs.buttons.ok = "<button class='ok md-primary md-button' tabindex='1'>{{ok}}</button>";
                        this.dialogs.buttons.cancel = "<button class='cancel md-button' tabindex='2'>{{cancel}}</button>";
                        this.dialogs.input = "<div layout='column'><md-input-container md-no-float><input type='text'></md-input-container></div>";
                        break;
                    default:
                        this.dialogs.buttons.ok =
                            this.defaultDialogs.buttons.ok, this.dialogs.buttons.cancel = this.defaultDialogs.buttons.cancel, this.dialogs.input = this.defaultDialogs.input
                }
            },
            reset: function() {
                this.parent = document.body;
                this.theme("default");
                this.okBtn(this.defaultOkLabel);
                this.cancelBtn(this.defaultCancelLabel);
                this.setMaxLogItems();
                this.promptPlaceholder = this.promptValue = "";
                this.delay = this.defaultDelay;
                this.setCloseLogOnClick(this.closeLogOnClickDefault);
                this.setLogPosition("bottom left");
                this.logTemplateMethod = null
            },
            injectCSS: function() {
                if (!document.querySelector("#alertifyCSS")) {
                    var l =
                        document.getElementsByTagName("head")[0],
                        q = document.createElement("style");
                    q.type = "text/css";
                    q.id = "alertifyCSS";
                    q.innerHTML = "/* style.css */";
                    l.insertBefore(q, l.firstChild)
                }
            },
            removeCSS: function() {
                var l = document.querySelector("#alertifyCSS");
                l && l.parentNode && l.parentNode.removeChild(l)
            }
        };
        t.injectCSS();
        return {
            _$$alertify: t,
            parent: function(l) {
                t.parent = l
            },
            reset: function() {
                t.reset();
                return this
            },
            alert: function(l, q, z) {
                return t.dialog(l, "alert", q, z) || this
            },
            confirm: function(l, q, z) {
                return t.dialog(l, "confirm",
                    q, z) || this
            },
            prompt: function(l, q, z) {
                return t.dialog(l, "prompt", q, z) || this
            },
            log: function(l, q) {
                t.log(l, "default", q);
                return this
            },
            theme: function(l) {
                t.theme(l);
                return this
            },
            success: function(l, q) {
                t.log(l, "success", q);
                return this
            },
            error: function(l, q) {
                t.log(l, "error", q);
                return this
            },
            cancelBtn: function(l) {
                t.cancelBtn(l);
                return this
            },
            okBtn: function(l) {
                t.okBtn(l);
                return this
            },
            inputType: function(l) {
                t.inputType(l);
                return this
            },
            delay: function(l) {
                t.setDelay(l);
                return this
            },
            placeholder: function(l) {
                t.promptPlaceholder =
                    l;
                return this
            },
            defaultValue: function(l) {
                t.promptValue = l;
                return this
            },
            maxLogItems: function(l) {
                t.setMaxLogItems(l);
                return this
            },
            closeLogOnClick: function(l) {
                t.setCloseLogOnClick(!!l);
                return this
            },
            logPosition: function(l) {
                t.setLogPosition(l || "");
                return this
            },
            setLogTemplate: function(l) {
                t.logTemplateMethod = l;
                return this
            },
            clearLogs: function() {
                t.setupLogContainer().innerHTML = "";
                return this
            },
            version: t.version
        }
    }
    var g = function(t) {
        if (t) {
            var l = function() {
                t && t.parentNode && t.parentNode.removeChild(t)
            };
            t.classList.remove("show");
            t.classList.add("hide");
            t.addEventListener("transitionend", l);
            setTimeout(l, 500)
        }
    };
    if ("undefined" !== typeof module && module && module.exports) {
        module.exports = function() {
            return new c
        };
        var k = new c,
            r;
        for (r in k) module.exports[r] = k[r]
    } else "function" === typeof define && define.amd ? define(function() {
        return new c
    }) : $(document).ready(function() {
        window.alertify = new c
    })
})();

function log_user(c, g) {
    return symbolab_log("General", c, g)
}
var init_user_page = function(c, g, k, r, t, l) {
    var q = "true" == k;
    localStorage.setItem("settings.numDecimalDisplay", t["settings.numDecimalDisplay"]);
    localStorage.setItem("settings.printOpen", t["settings.printOpen"]);
    localStorage.setItem("settings.printGraph", t["settings.printGraph"]);
    c && (this.stripe = Stripe(c, {
        locale: l
    }));
    var z;
    $(".settingsSelect").focus(function() {
        z = this.value
    }).change(function(d) {
        d = $(this).attr("field");
        var f = $(this).val();
        "settings.printOpen" !== d || q ? (getLocalStorage().setItem(d, f), $.ajax({
            type: "POST",
            url: "/api/user/updateUserField",
            beforeSend: authorizeAjaxWithSyToken,
            data: {
                field: d,
                value: f
            }
        })) : (createUpgradeTooltip($("select[field='" + d + "']"), "UserPage\tSettings-" + d, i18n("to change settings"), "right"), $(this).attr("value", z))
    });
    $("body").off("click", "#UpgradeToProButtonFromUserPage:not(.nl-disabled)").on("click", "#UpgradeToProButtonFromUserPage:not(.nl-disabled)", function() {
        const d = $(this);
        d.addClass("nl-disabled");
        sendCourseHeroLink().done(function(f) {
            f.success ? alertify.alert(f.success) : d.removeClass("nl-disabled")
        }).fail(function(f) {
            alertify.alert(f);
            d.removeClass("nl-disabled")
        })
    });
    $("#paypalUnsubscribeNew").click(function() {
        const d = $(this);
        d.addClass("nl-disabled");
        $("#paypalPause").addClass("nl-disabled");
        $("#paypalActivate").addClass("nl-disabled");
        const f = $("#paypalActivate").is(":visible");
        if ($("#paypalUnsubscribeNew").hasClass("mobile") || f || "en" !== l) {
            symbolab_log("Registration", "SeenFeature", "UserPage\tUnsubscribe" + (f ? "\tAlreadyPaused" : ""));
            const a = f ? i18n("js.Your subscription is paused, cancel") : i18n("js.cancel_question");
            alertify.okBtn(i18n("Yes")).cancelBtn(i18n("No")).confirm(a,
                function() {
                    unsubscribe(q, "UserPage\tUnsubscribe" + (f ? "\tAlreadyPaused" : ""))
                },
                function() {
                    $("#paypalPause").removeClass("nl-disabled");
                    $("#paypalActivate").removeClass("nl-disabled");
                    d.removeClass("nl-disabled")
                })
        } else window.location = "/unsubscribe"
    });
    $("#paypalPause").click(function() {
        var d = $(this);
        $("#paypalUnsubscribeNew").addClass("nl-disabled");
        d.addClass("nl-disabled");
        symbolab_log("Registration", "SeenFeature", "UserPage\tPause\tPauseButton");
        alertify.okBtn(i18n("js.Confirm")).cancelBtn(i18n("js.cancel")).confirm(i18n("js.pause_question",
            $("input#throughInput").val()), function() {
            doPause("UserPage\tPause\tPauseButton")
        }, function() {
            d.removeClass("nl-disabled");
            $("#paypalUnsubscribeNew").removeClass("nl-disabled")
        })
    });
    $("#stripePortal").click(function() {
        var d = $(this).attr("data");
        $(".loading-animation").show();
        $.ajax({
            type: "POST",
            url: "/stripePortal",
            data: {
                sub_id: d
            },
            beforeSend: authorizeAjaxWithSyToken,
            success: function(f) {
                window.location.href = JSON.parse(f).data
            }
        })
    });
    $("#update_billingemail").click(function() {
        $(".loading-animation").show();
        var d = $("#billingemail").val();
        $.ajax({
            type: "POST",
            url: "/updateOrRequestVerifyPost",
            data: {
                email: d,
                sourceURL: window.location.href
            },
            beforeSend: authorizeAjaxWithSyToken,
            success: function(f) {
                f.success && alertify.okBtn("OK").alert(f.success);
                $(".loading-animation").hide()
            },
            error: function() {
                $(".loading-animation").hide();
                alertify.okBtn("OK").alert("Error updating billing email")
            }
        })
    });
    $("#editBillingInfo").click(function() {
        $.ajax({
            type: "POST",
            url: "/api/payments/prepareCardUpdate",
            beforeSend: authorizeAjaxWithSyToken,
            success: function(d) {
                d = JSON.parse(d).clientSecret;
                var f = stripe.elements({
                    appearance: {
                        theme: "stripe"
                    },
                    clientSecret: d
                });
                d = f.create("payment", {
                    terms: {
                        card: "never"
                    }
                });
                d.on("ready", function(a) {
                    $("#edit_billing_div").hide();
                    $("#billing_update_target").show()
                });
                d.mount("#payment-element");
                $("#payment-form").on("submit", async a => {
                    a.preventDefault();
                    ({
                        error: a
                    } = await stripe.confirmSetup({
                        elements: f,
                        confirmParams: {
                            payment_method_data: {
                                billing_details: {
                                    name: $("#card-holder-name").val(),
                                    email: $("#card-holder-email").val()
                                }
                            },
                            return_url: window.location.protocol + "//" + window.location.host + "/cardUpdated"
                        }
                    }));
                    a && (document.querySelector("#error-message").textContent = a.message)
                })
            },
            error: function() {}
        })
    });
    $("#cancelUpdateBillingInfo").click(function() {
        $("#billing_update_target").hide();
        $("#edit_billing_div").show()
    });
    $("#paypalActivate").click(function() {
        $(this).addClass("nl-disabled");
        $("#paypalUnsubscribeNew").addClass("nl-disabled");
        resumeSubscription("UserPage")
    });
    $(".lock_img").click(function() {
        var d = $(this),
            f = d.attr("field");
        createUpgradeTooltip(d, "UserPage\tSettings-" + f, i18n("to change settings"), "right")
    });
    $("#paypalSubscribeNew").click(function() {
        q ? alertify.okBtn("OK").cancelBtn(i18n("Cancel")).confirm(i18n("js.Your subscription is active, extend", $("input#throughInput").val()), function() {
            $("#special").attr("id", "extend");
            showSubscription("UserPage\tSubscribeButton");
            setSelectedSubscriptionOption($(".subscribeOption:visible").eq(0));
            $(".subscribeOption:visible").eq(1).addClass("nl-disabled");
            $(".subscribeOption:visible").eq(2).addClass("nl-disabled");
            $(".subscribeOption:visible").eq(3).addClass("nl-disabled")
        }, function() {}) : showSubscription("UserPage\tSubscribeButton")
    });
    $(".updateUser").click(function() {
        $("#profileUpdateSuccess").hide();
        $("#profileUpdateFail").hide();
        var d = new Promise(function(a, m) {
                $.ajax({
                    type: "POST",
                    url: "/api/user/updateUserField",
                    beforeSend: authorizeAjaxWithSyToken,
                    data: {
                        field: "firstName",
                        value: $("#firstName").val()
                    },
                    success: function(v) {
                        v && v.success ? a() : m()
                    },
                    error: function() {
                        m()
                    }
                })
            }),
            f = new Promise(function(a, m) {
                $.ajax({
                    type: "POST",
                    url: "/api/user/updateUserField",
                    beforeSend: authorizeAjaxWithSyToken,
                    data: {
                        field: "lastName",
                        value: $("#lastName").val()
                    },
                    success: function(v) {
                        v && v.success ? a() : m()
                    },
                    error: function() {
                        m()
                    }
                })
            });
        Promise.all([d, f]).then(function() {
            $("#profileUpdateSuccess").show()
        }, function() {
            $("#profileUpdateFail").show()
        })
    });
    $("#disableAccountButton").click(function() {
        q && "true" === r ? alertify.cancelBtn("Cancel").okBtn("Unsubscribe").confirm(i18n("js.Your subscription is active, unsubscribe before deleting your account"), function() {
                $("#paypalUnsubscribeNew").click()
            }) :
            alertify.okBtn("OK").cancelBtn(i18n("Cancel")).confirm(i18n("js.Your practice history and notes will be deleted!") + "\n" + ("true" === k ? i18n("js.You still have an active subscription!") + "\n" : "") + "Are you sure you want to delete your account?", function() {
                $.ajax({
                    type: "POST",
                    url: "/api/user/disableAccount",
                    beforeSend: authorizeAjaxWithSyToken,
                    success: function(d) {
                        d && d.success && logout()
                    }
                })
            }, function() {})
    });
    $("#clearPracticeButton").click(function() {
        alertify.okBtn("OK").cancelBtn(i18n("Cancel")).confirm(i18n("js.Are you sure you want to clear your practice data?"),
            function() {
                $.ajax({
                    type: "POST",
                    url: "/api/user/clearPractice",
                    beforeSend: authorizeAjaxWithSyToken,
                    success: function(d) {
                        d && d.success && $("#clearPracticeAlert").css("visibility", "visible")
                    }
                })
            },
            function() {})
    });
    $("#clearWebNotesButton").click(function() {
        alertify.okBtn("OK").cancelBtn(i18n("Cancel")).confirm(i18n("js.Are you sure you want to clear your notebook?"), function() {
            $.ajax({
                type: "POST",
                url: "/api/notebook/clearNotes",
                beforeSend: authorizeAjaxWithSyToken,
                data: {
                    isMobile: !1
                },
                success: function(d) {
                    d && d.success &&
                        $("#clearWebNotesAlert").css("visibility", "visible")
                }
            })
        }, function() {})
    });
    $("#resetPasswordButton").click(function() {
        $("#resetPasswordFail").hide();
        $("#resetPasswordSuccess").hide();
        $.ajax({
            type: "POST",
            url: "/api/user/changePassword",
            beforeSend: authorizeAjaxWithSyToken,
            data: {
                currentPassword: $("#curPass").val(),
                password: $("#newPass").val(),
                password2: $("#newPass2").val()
            },
            success: function(d) {
                d && d.alert ? ($("#resetPasswordFail").text(d.alert), $("#resetPasswordFail").show()) : ($("#resetPasswordSuccess").show(),
                    $("#curPass").val(""), $("#newPass").val(""), $("#newPass2").val(""))
            }
        })
    });
    $("#redeemPromotion").click(function() {
        var d = $(this);
        d.addClass("nl-disabled");
        $.ajax({
            type: "POST",
            url: "/redeemPromotion",
            beforeSend: authorizeAjaxWithSyToken,
            data: {
                code: $("#promotion").val()
            },
            success: function(f) {
                f ? location.reload() : (alertify.okBtn("OK").alert("Invalid Code"), d.removeClass("nl-disabled"))
            },
            error: function() {
                d.removeClass("nl-disabled")
            }
        })
    });
    $(".addEmail").click(function() {
        $("#emailFail").hide();
        $("#emailSuccess").hide();
        alertify.okBtn(i18n("OK")).cancelBtn(i18n("Cancel")).inputType("password").prompt(i18n("js.Please enter password"), function(d, f) {
            $.ajax({
                type: "POST",
                url: "/api/user/updateEmail",
                beforeSend: authorizeAjaxWithSyToken,
                data: {
                    newEmail: $("#email").val(),
                    password: d
                },
                success: function(a) {
                    a && a.alert ? ($("#emailFail").text(a.alert), $("#emailFail").show()) : $("#emailSuccess").show()
                }
            })
        })
    });
    $(".edit-avatar").click(function() {
        log_user("AvatarOpenEdit");
        $.featherlight(".change-avatar", {
            variant: "edit-avatar-popup",
            beforeClose: function() {
                !0 ===
                    $(".featherlight.edit-avatar-popup").data("wasCanceled") && log_user("AvatarCancelEdit")
            }
        });
        $(".upload-error").hide();
        $(".featherlight.edit-avatar-popup").data("wasCanceled", !0)
    });
    $(".stock-list > div").click(function() {
        $(".upload-error").hide();
        $(".stock-list > div").removeClass("active");
        var d = $(this);
        d.addClass("active");
        d = 5 - d.index() - 1;
        $(".current-avatar-container .stock-avatar use").attr("href", "#stock-avatar-" + d);
        $(".featherlight .current-avatar .stock-avatar-container").removeClass("no-image");
        $(".featherlight .current-avatar img").addClass("no-image");
        log_user("AvatarSelectStock", d)
    });
    $("#upload-avatar-input").change(function(d) {
        $(".upload-error").hide();
        loadImageFile(d.target.files[0])
    });
    $(".update-avatar-button").click(function() {
        $(".avatar-success").hide();
        var d = $(".featherlight .current-avatar img"),
            f = d.attr("src"),
            a = 5 - $(".stock-list > div.active").index() - 1;
        d.hasClass("no-image") ? $.ajax({
            type: "POST",
            url: "/api/user/updateUserAvatar",
            beforeSend: authorizeAjaxWithSyToken,
            data: {
                selectedStock: a
            },
            success: function() {
                $(".avatar-success").show();
                $(".featherlight.edit-avatar-popup").data("wasCanceled", !1);
                $.featherlight.close();
                setClientSideAvatarStock(a)
            },
            error: function() {
                $(".upload-error").show().text(i18n("js.Avatar stock fail"))
            }
        }) : $.ajax({
            type: "POST",
            url: "/api/user/updateUserAvatar",
            beforeSend: authorizeAjaxWithSyToken,
            data: {
                base64: f
            },
            success: function() {
                $(".avatar-success").show();
                $(".featherlight.edit-avatar-popup").data("wasCanceled", !1);
                $.featherlight.close();
                setClientSideAvatarImage(f)
            },
            error: function() {
                $(".upload-error").show().text(i18n("js.Avatar upload fail"))
            }
        })
    })
};

function setClientSideAvatarImage(c) {
    $(".user-avatar-panel img, .current-avatar img, #userName img").removeClass("no-image");
    $(".stock-avatar-container").addClass("no-image");
    $(".user-avatar-panel img, .current-avatar img, #userName img").attr("src", c);
    $(".stock-list > div").removeClass("active")
}

function setClientSideAvatarStock(c) {
    $(".user-avatar-panel img, .current-avatar img, #userName img").addClass("no-image");
    $(".stock-avatar-container").removeClass("no-image");
    $(".stock-avatar use").attr("href", "#stock-avatar-" + c);
    $(".stock-list > div").removeClass("active");
    $(".stock-list > div:nth-child(" + (5 - c) + ")").addClass("active")
}

function loadImageFile(c) {
    if (c.type.match(/image.*/))
        if (1024E3 < c.size) $(".upload-error").show().text(i18n("js.Bad upload")), $("#upload-avatar-input").val(""), log_user("AvatarImageTooBigAttempt");
        else {
            var g = new FileReader;
            g.onload = function(k) {
                var r = new Image;
                r.onload = function(t) {
                    t = document.createElement("canvas");
                    var l = r.width,
                        q = r.height;
                    if (l > q) {
                        var z = 0;
                        var d = (l - q) / 2;
                        l -= 2 * d
                    } else z = (q - l) / 2, d = 0, q -= 2 * z;
                    t.width = 288;
                    t.height = 288;
                    t.getContext("2d").drawImage(r, d, z, l, q, 0, 0, 288, 288);
                    t = t.toDataURL("image/jpeg",
                        .8);
                    d = $(".featherlight .current-avatar img");
                    d.removeClass("no-image");
                    d.attr("src", t);
                    $(".featherlight .stock-list > div").removeClass("active");
                    $(".featherlight .current-avatar .stock-avatar-container").addClass("no-image");
                    log_user("AvatarImageUploaded")
                };
                r.src = k.target.result
            };
            g.readAsDataURL(c);
            $("#upload-avatar-input").val("")
        }
    else $(".upload-error").show().text(i18n("js.Bad upload")), $("#upload-avatar-input").val(""), log_user("AvatarWrongFileTypeAttempt")
}

function doPause(c) {
    $(".loading-animation").show();
    $.ajax({
        type: "POST",
        url: "/api/payments/pauseSubscription",
        data: {
            reason: "user request"
        },
        beforeSend: authorizeAjaxWithSyToken,
        success: function(g) {
            symbolab_log("Registration", "ClickedFeature", c);
            alertify.okBtn("OK").alert(g.success ? i18n("js.pause_question", $("input#throughInput").val()) : i18n("js.Operation Failed"), function() {
                location.reload()
            })
        }
    })
}

function unsubscribe(c, g) {
    $(".loading-animation").show();
    $.ajax({
        type: "POST",
        url: "/api/payments/cancelSubscription",
        beforeSend: authorizeAjaxWithSyToken,
        success: function(k) {
            symbolab_log("Registration", "ClickedFeature", g);
            amplitude.track("Unsubscribe", {
                reason: g
            });
            alertify.okBtn("OK").alert(c ? i18n("js.Your subscription is active", $("input#throughInput").val()) : i18n("js.Subscription canceled"), function() {
                location.reload()
            })
        }
    })
}

function promiseCompletionSource() {
    let c, g;
    return {
        promise: new Promise((k, r) => {
            c = k;
            g = r
        }),
        resolve: c,
        reject: g
    }
}
const SyPayments = function(c, g, k) {
    this.stripe = Stripe(c, {
        locale: k
    });
    this.sy_cid = g;
    this.lang = k;
    this.walletPromiseCompletionSource = promiseCompletionSource();
    this.installBehavior()
};
SyPayments.prototype = {
    installBehavior: function() {},
    showWalletButton: function(c, g, k, r, t) {
        const l = this;
        let q, z;
        try {
            q = l.stripe.elements(), z = l.stripe.paymentRequest({
                country: this.sy_cid,
                currency: "usd",
                total: {
                    label: "Total",
                    amount: Math.round(100 * g)
                },
                requestPayerName: !0,
                requestPayerEmail: !0
            })
        } catch (f) {
            this.walletPromiseCompletionSource.reject("Failed to initialize Stripe " + f);
            return
        }
        const d = q.create("paymentRequestButton", {
            paymentRequest: z,
            style: {
                paymentRequestButton: {
                    height: "54px"
                }
            }
        });
        d.on("click", function() {
            symbolab_log("Registration",
                "SubscribeClicked-stripe_" + c, r)
        });
        z.on("paymentmethod", f => {
            $.ajax({
                type: "POST",
                url: "/api/payments/createSubscription",
                data: {
                    variation: sy_var,
                    country: l.sy_cid,
                    type: c,
                    platform: "stripe",
                    url: null,
                    position: null
                },
                beforeSend: authorizeAjaxWithSyToken,
                error: function(a, m) {
                    $(".spinner").hide()
                },
                success: function(a) {
                    (async function(m) {
                        var v = $("#error-message");
                        m = JSON.parse(m);
                        if (m.result && "ALERT" === m.result) v.text(m.data), $(".error_image1 svg").show(), $(".spinner").hide();
                        else {
                            v = m.clientSecret;
                            var {
                                paymentIntent: x,
                                error: w
                            } = await l.stripe.confirmCardPayment(v, {
                                payment_method: f.paymentMethod.id
                            }, {
                                handleActions: !1
                            });
                            w ? f.complete("fail") : (f.complete("success"), "requires_action" === x.status && await l.stripe.confirmCardPayment(v), $.when(symbolab_log("Registration", "SubscribeCompleted-" + c, r)).always(function() {
                                let E = window.location.href;
                                E = 0 <= E.indexOf("?") ? E + "&" : E + "?";
                                window.location.href = E + "checksubscribed";
                                window.location.reload()
                            }))
                        }
                    })(a)
                }
            })
        });
        (async () => {
            const f = await z.canMakePayment();
            f && (f.googlePay || f.applePay) ?
                (d.mount("#" + k), this.walletPromiseCompletionSource.resolve(!0), t()) : (document.getElementById(k).style.display = "none", this.walletPromiseCompletionSource.reject("No wallet available"))
        })()
    },
    runWalletCheck: function() {
        let c;
        try {
            c = this.stripe.paymentRequest({
                country: this.sy_cid,
                currency: "usd",
                total: {
                    label: "Total",
                    amount: 1
                },
                requestPayerName: !0,
                requestPayerEmail: !0
            })
        } catch (g) {
            this.walletPromiseCompletionSource.reject("Failed to initialize Stripe " + g);
            return
        }(async () => {
            const g = await c.canMakePayment();
            g &&
                (g.googlePay || g.applePay) ? this.walletPromiseCompletionSource.resolve(!0) : this.walletPromiseCompletionSource.reject("No wallet available")
        })()
    },
    initializeStripe: function(c, g, k, r, t) {
        const l = this;
        $(".spinner").show();
        $("#billing-screen-shot").show();
        $("#payment-form").hide();
        $.ajax({
            type: "POST",
            url: "/api/payments/createSubscription",
            data: {
                variation: sy_var,
                country: l.sy_cid,
                type: c,
                platform: "stripe",
                url: g,
                position: k,
                coupon: t
            },
            beforeSend: authorizeAjaxWithSyToken,
            error: function(q, z) {
                $(".spinner").hide()
            },
            success: function(q) {
                const z = $("#error-message");
                q = JSON.parse(q);
                if (q.result && "ALERT" === q.result) z.text(q.data), $(".error_image1 svg").show(), $(".spinner").hide();
                else {
                    var d = l.stripe.elements({
                        appearance: {
                            theme: "stripe"
                        },
                        clientSecret: q.clientSecret
                    });
                    q = d.create("payment", {
                        terms: {
                            card: "never"
                        }
                    });
                    q.on("ready", function() {
                        $(".spinner").hide();
                        $("#billing-screen-shot").hide();
                        $("#payment-form").show()
                    });
                    q.mount("#payment-element");
                    $("#payment-form").on("submit", async f => {
                        f.preventDefault();
                        f = $("#payment-form");
                        f.addClass("nl-disabled");
                        const {
                            error: a
                        } = await l.stripe.confirmPayment({
                            elements: d,
                            confirmParams: {
                                payment_method_data: {
                                    billing_details: {
                                        name: $("#card-holder-name").val(),
                                        email: $("#card-holder-email").val()
                                    }
                                },
                                return_url: g
                            }
                        });
                        a && (z.text(a.message), $(".error_image1 svg").show(), f.removeClass("nl-disabled"))
                    })
                }
            }
        })
    },
    renderPaypalButton: function(c, g) {
        const k = this,
            r = c.plantype,
            t = c.reason;
        $("#express-paypal-button-subsc").off("click").on("click", function() {
            symbolab_log("Registration", "SubscribeClicked-paypal_" +
                r, t);
            const l = $(this);
            l.addClass("nl-disabled");
            $.ajax({
                type: "POST",
                url: "/api/payments/createSubscription",
                data: {
                    variation: sy_var,
                    country: k.sy_cid,
                    type: r,
                    platform: "paypal",
                    url: c.url,
                    position: g,
                    reason: c.reason,
                    coupon: c.cpn
                },
                beforeSend: authorizeAjaxWithSyToken,
                error: function(q, z) {
                    l.removeClass("nl-disabled")
                },
                success: function(q) {
                    if (null != q) {
                        const z = JSON.parse(q);
                        "REDIRECT" === z.result ? window.location.href = JSON.parse(q).data : "ALERT" === z.result && alert(z.data)
                    }
                    l.removeClass("nl-disabled")
                }
            })
        })
    }
};