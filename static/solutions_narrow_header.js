(function(a) {
    "function" === typeof define && define.amd ? define(["jquery"], a) : "object" === typeof exports ? module.exports = a : a(jQuery)
})(function(a) {
    function e(p) {
        var t = p || window.event,
            w = h.call(arguments, 1),
            v = 0,
            z = 0,
            C = 0,
            D = 0;
        p = a.event.fix(t);
        p.type = "mousewheel";
        "detail" in t && (z = -1 * t.detail);
        "wheelDelta" in t && (z = t.wheelDelta);
        "wheelDeltaY" in t && (z = t.wheelDeltaY);
        "wheelDeltaX" in t && (v = -1 * t.wheelDeltaX);
        "axis" in t && t.axis === t.HORIZONTAL_AXIS && (v = -1 * z, z = 0);
        var x = 0 === z ? v : z;
        "deltaY" in t && (x = z = -1 * t.deltaY);
        "deltaX" in
        t && (v = t.deltaX, 0 === z && (x = -1 * v));
        if (0 !== z || 0 !== v) {
            if (1 === t.deltaMode) {
                var A = a.data(this, "mousewheel-line-height");
                x *= A;
                z *= A;
                v *= A
            } else 2 === t.deltaMode && (A = a.data(this, "mousewheel-page-height"), x *= A, z *= A, v *= A);
            A = Math.max(Math.abs(z), Math.abs(v));
            if (!l || A < l) l = A, u.settings.adjustOldDeltas && "mousewheel" === t.type && 0 === A % 120 && (l /= 40);
            u.settings.adjustOldDeltas && "mousewheel" === t.type && 0 === A % 120 && (x /= 40, v /= 40, z /= 40);
            x = Math[1 <= x ? "floor" : "ceil"](x / l);
            v = Math[1 <= v ? "floor" : "ceil"](v / l);
            z = Math[1 <= z ? "floor" : "ceil"](z /
                l);
            u.settings.normalizeOffset && this.getBoundingClientRect && (t = this.getBoundingClientRect(), C = p.clientX - t.left, D = p.clientY - t.top);
            p.deltaX = v;
            p.deltaY = z;
            p.deltaFactor = l;
            p.offsetX = C;
            p.offsetY = D;
            p.deltaMode = 0;
            w.unshift(p, x, v, z);
            m && clearTimeout(m);
            m = setTimeout(f, 200);
            return (a.event.dispatch || a.event.handle).apply(this, w)
        }
    }

    function f() {
        l = null
    }
    var b = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"],
        g = "onwheel" in document || 9 <= document.documentMode ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"],
        h = Array.prototype.slice,
        m, l;
    if (a.event.fixHooks)
        for (var n = b.length; n;) a.event.fixHooks[b[--n]] = a.event.mouseHooks;
    var u = a.event.special.mousewheel = {
        version: "3.1.12",
        setup: function() {
            if (this.addEventListener)
                for (var p = g.length; p;) this.addEventListener(g[--p], e, !1);
            else this.onmousewheel = e;
            a.data(this, "mousewheel-line-height", u.getLineHeight(this));
            a.data(this, "mousewheel-page-height", u.getPageHeight(this))
        },
        teardown: function() {
            if (this.removeEventListener)
                for (var p = g.length; p;) this.removeEventListener(g[--p],
                    e, !1);
            else this.onmousewheel = null;
            a.removeData(this, "mousewheel-line-height");
            a.removeData(this, "mousewheel-page-height")
        },
        getLineHeight: function(p) {
            p = a(p);
            var t = p["offsetParent" in a.fn ? "offsetParent" : "parent"]();
            t.length || (t = a("body"));
            return parseInt(t.css("fontSize"), 10) || parseInt(p.css("fontSize"), 10) || 16
        },
        getPageHeight: function(p) {
            return a(p).height()
        },
        settings: {
            adjustOldDeltas: !0,
            normalizeOffset: !0
        }
    };
    a.fn.extend({
        mousewheel: function(p) {
            return p ? this.bind("mousewheel", p) : this.trigger("mousewheel")
        },
        unmousewheel: function(p) {
            return this.unbind("mousewheel", p)
        }
    })
});
var Symbolab = function(a, e, f) {
    this.params = {};
    this.params.userId = a;
    this.params.query = e;
    this.params.language = f;
    this.init()
};
Symbolab.prototype = {
    init: function() {
        parseQueryParameters(this.params);
        $(".topnav ul li a").click(function(a) {})
    },
    queryString: function(a) {
        void 0 == a && (a = {});
        a = $.extend({}, this.params, a);
        var e = [],
            f;
        for (f in a) {
            var b = a[f];
            "" != b && e.push(f + "=" + encodeURIComponent(b))
        }
        return e.join("&")
    },
    params: {},
    results: {},
    forwardSearch: function(a, e, f) {
        if ("" !== a) {
            var b = "/solver/";
            if ("undefined" != typeof SOLUTIONS && "" !== SOLUTIONS.page) b += SOLUTIONS.page + "/";
            else {
                let g = window.location.pathname.split("/"),
                    h = "step-by-step";
                2 <
                    g.length && "solver" === g[1] && "" !== g[2] && (h = g[2]);
                b += h + "/"
            }
            b += encodeURIComponent(a);
            e && (b += "?or=" + e);
            "3" !== sy_var || f ? window.location = b : symbolab_log("Registration", "ClickedFeature", "ClickSuggest")
        }
    }
};
Symbolab.prototype.updateSolutionsUrl = function() {
    $("#solutionsTopNav a").attr("href", "/solver/step-by-step/" + encodeURIComponent(this.params.query))
};
Symbolab.prototype.getTextLenScore = function(a) {
    return (parseInt(a.textlen) + parseInt(a.eqlen)) / 1E5
};
Symbolab.prototype.logRedirect = function(a, e, f, b) {
    a = {
        userId: this.params.userId,
        language: this.params.language,
        type: a,
        info1: e,
        info2: f,
        redirect: b
    };
    $("body").append($("<form/>", {
        id: "redirectPostForm",
        method: "POST",
        action: "/logRedirect"
    }));
    e = $("#redirectPostForm");
    for (var g in a) e.append($("<input/>", {
        type: "hidden",
        name: g,
        value: a[g]
    }));
    e.submit()
};
Symbolab.prototype.showPopover = function(a, e, f) {
    var b = this;
    a.popover({
        title: e,
        content: f,
        placement: "top",
        delay: {
            show: 500,
            hide: 5E3
        }
    }).popover("show");
    setInterval(function() {
        b.inputBox().popover("disable");
        b.inputBox().popover("hide")
    }, 4E3)
};
Symbolab.prototype.lastInsertedIsEquals = function() {
    var a = this.inputValue("latex");
    return a.indexOf("=") == a.length - 1 ? 1 : 0
};
Symbolab.prototype.updateCalculation = function() {
    var a = this,
        e = a.inputValue("latex");
    a.calcmode || (a.calcmode = "rad");
    0 <= e.indexOf("=") && (e = e.split("=")[0]);
    SYPAD.inputBox().mathquill("latex", e + " = ");
    $.ajax({
        type: "GET",
        url: Symbolab.paths.calculate,
        data: {
            query: e,
            radDeg: a.calcmode
        },
        error: function(f) {
            a.showPopover(a.inputBox(), "Calculation Error", "We ran into a problem calculating that. Try searching instead.")
        },
        success: function(f) {
            void 0 != f.response && "NA" != f.response ? a.appendInput(f.response) : a.showPopover(a.inputBox(),
                "Calculation Error", "We ran into a problem calculating that. Try searching instead.")
        }
    })
};
Symbolab.prototype.executeSearch = function() {
    var a = this.params.query;
    if ("" != a) {
        a = a.replace(/\\(text|mbox)\s*{(.+?)}/g, "$2 ");
        a = a.replace(/\\:/g, " ");
        a = a.replace(/\\left\\s*\(/g, "(");
        var e = a = a.replace(/\\right\\s*\)/g, ")");
        this.params.query = a;
        "" == a ? (this.promptError("Cannot understand this query, please try a different query."), this.inputBox().mathquill("latex", prepareQueryForMathQuill(e))) : 0 == this.currentPage() || 100 < this.currentPage() ? this.promptError("Allowed page numbers are 1-100.") : (this.inputBox().mathquill("latex",
            prepareQueryForMathQuill(a)), $(".print-only .search-query").mathquill("latex", a), this.updateSolutionsUrl(), this.updateResults(), this.isScholar || this.updateStepsPlot())
    }
};
Symbolab.prototype.promptError = function(a) {
    this.clearResults();
    document.title = "Error - Symbolab Results";
    $("#ShareButtonsSection").prepend("<span class='errorMsg'>" + a + "</span>");
    $("#Refinements .scholar-refinements, #Refinements .web-refinements").hide();
    $("#Codepad .actions").hide()
};
Symbolab.convert2html = function(a) {
    a = a.replace(/</g, "&lt;");
    return a = a.replace(/>/g, "&gt;")
};

function url_domain(a) {
    var e = document.createElement("a");
    e.href = a;
    return e.hostname
}

function htmlDecode(a) {
    if ("" == a) return a;
    var e = document.createElement("div");
    e.innerHTML = a;
    return e.childNodes[0].nodeValue
}
Symbolab_toolbar_functions = {
    Basic: {
        prepend: function(a, e) {
            SYPAD.prependInput(e.data("prepend"), e.data("moveleft"))
        },
        append: function(a, e) {
            SYPAD.appendInput(e.data("append"), e.data("moveleft"))
        },
        clear: function() {
            SYPAD.inputBox(!1).mathquill("latex", "")
        }
    },
    Calc: {
        mode: function(a, e) {
            void 0 == SYPAD.calcmode && (SYPAD.calcmode = "rad");
            "deg" == symbolab.calcmode ? (e.addClass("radmode"), SYPAD.calcmode = "rad") : (e.removeClass("radmode"), SYPAD.calcmode = "deg")
        },
        calculate: function(a, e) {
            SYPAD.updateCalculation()
        },
        "x!": function(a,
            e) {
            SYPAD.appendInput("!")
        }
    }
};
var SymbolabPad = function(a, e, f, b) {
    this.language = a;
    this.customInputboxSelector = e;
    this.allowsSearching = f;
    void 0 === b && (b = !1);
    this.triggerOnKeyUpEvents = b;
    this.periodicTable = [
        ["H", , , , "\\Rightarrow", "O_{\\msquare}", , , , , , , , , , , , "He"],
        ["Li", "Be", , , , , , , , , , , "B", "C", "N", "O", "F", "Ne"],
        ["Na", "Mg", , , , , , , , , , , "Al", "Si", "P", "S", "Cl", "Ar"], "K Ca Sc Ti V Cr Mn Fe Co Ni Cu Zn Ga Ge As Se Br Kr".split(" "), "Rb Sr Y Zr Nb Mo Tc Ru Rh Pd Ag Cd In Sn Sb Te I Xe".split(" "), ["Cs", "Ba", , "Hf", "Ta", "W", "Re", "Os", "Ir", "Pt", "Au",
            "Hg", "Tl", "Pb", "Bi", "Po", "At", "Rn"
        ],
        ["Fr", "Ra", , "Rf", "Db", "Sg", "Bh", "Hs", "Mt", "Ds", "Rg", "Cn", "Uut", "Fl", "Uup", "Lv", "Uus", "Uuo"],
        [, , , , , , , , , , , , , , , , , ],
        [, , "La", "Ce", "Pr", "Nd", "Pm", "Sm", "Eu", "Gd", "Tb", "Dy", "Ho", "Er", "Tm", "Yb", "Lu"],
        [, , "Ac", "Th", "Pa", "U", "Np", "Pu", "Am", "Cm", "Bk", "Cf", "Es", "Fm", "Md", "No", "Lr"]
    ];
    this.elementNames = {
        "\\Rightarrow": "Right arrow",
        "O_{\\msquare}": "Underscore",
        H: "Hydrogen",
        He: "Helium",
        Li: "Lithium",
        Be: "Beryllium",
        B: "Boron",
        C: "Carbon",
        N: "Nitrogen",
        O: "Oxygen",
        F: "Fluorine",
        Ne: "Neon",
        Na: "Sodium",
        Mg: "Magnesium",
        Al: "Aluminum",
        Si: "Silicon",
        P: "Phosphorus",
        S: "Sulfur",
        Cl: "Chlorine",
        Ar: "Argon",
        K: "Potassium",
        Ca: "Calcium",
        Sc: "Scandium",
        Ti: "Titanium",
        V: "Vanadium",
        Cr: "Chromium",
        Mn: "Manganese",
        Fe: "Iron",
        Co: "Cobalt",
        Ni: "Nickel",
        Cu: "Copper",
        Zn: "Zinc",
        Ga: "Gallium",
        Ge: "Germanium",
        As: "Arsenic",
        Se: "Selenium",
        Br: "Bromine",
        Kr: "Krypton",
        Rb: "Rubidium",
        Sr: "Strontium",
        Y: "Yttrium",
        Zr: "Zirconium",
        Nb: "Niobium",
        Mo: "Molybdenum",
        Tc: "Technetium",
        Ru: "Ruthenium",
        Rh: "Rhodium",
        Pd: "Palladium",
        Ag: "Silver",
        Cd: "Cadmium",
        In: "Indium",
        Sn: "Tin",
        Sb: "Antimony",
        Te: "Tellurium",
        I: "Iodine",
        Xe: "Xenon",
        Cs: "Caesium",
        Ba: "Barium",
        Hf: "Hafnium",
        Ta: "Tantalum",
        W: "Tungsten",
        Re: "Rhenium",
        Os: "Osmium",
        Ir: "Iridium",
        Pt: "Platinum",
        Au: "Gold",
        Hg: "Mercury",
        Tl: "Thallium",
        Pb: "Lead",
        Bi: "Bismuth",
        Po: "Polonium",
        At: "Astatine",
        Rn: "Radon",
        Fr: "Francium",
        Ra: "Radium",
        Rf: "Rutherfordium",
        Db: "Dubnium",
        Sg: "Seaborgium",
        Bh: "Bohrium",
        Hs: "Hassium",
        Mt: "Meitnerium",
        Ds: "Darmstadtium",
        Rg: "Roentgenium",
        Cn: "Copernicium",
        Uut: "Ununtrium",
        Fl: "Flerovium",
        Uup: "Ununpentium",
        Lv: "Livermorium",
        Uus: "Ununseptium",
        Uuo: "Ununoctium",
        La: "Lanthanum",
        Ce: "Cerium",
        Pr: "Praseodymium",
        Nd: "Neodymium",
        Pm: "Promethium",
        Sm: "Samarium",
        Eu: "Europium",
        Gd: "Gadolinium",
        Tb: "Terbium",
        Dy: "Dysprosium",
        Ho: "Holmium",
        Er: "Erbium",
        Tm: "Thulium",
        Yb: "Ytterbium",
        Lu: "Lutetium",
        Ac: "Actinium",
        Th: "Thorium",
        Pa: "Protactinium",
        U: "Uranium",
        Np: "Neptunium",
        Pu: "Plutonium",
        Am: "Americium",
        Cm: "Curium",
        Bk: "Berkelium",
        Cf: "Californium",
        Es: "Einsteinium",
        Fm: "Fermium",
        Md: "Mendelevium",
        No: "Nobelium",
        Lr: "Lawrencium"
    };
    this.init()
};
SymbolabPad.prototype = {
    init: function() {
        var a = this,
            e = $("body");
        e.click(function(f) {
            a.selectChild("#CodePadSuggestions").hide();
            $("#tsUl").hide()
        });
        this.selectChild("button.search").click(function(f) {
            a.initateSearch()
        });
        $("#main-input").keyup(function(f) {
            13 == f.keyCode && a.initateSearch()
        });
        e.on("click", '[class^="pad-toolbar-"]', function(f) {
            a.switchPad($(this));
            0 <= this.className.indexOf("chemistry") && a.createChemistryPad("#chemistryTable");
            f = $(this).attr("class").split(" ")[0].split("-")[2].capitalize();
            symbolab_log("Pad", "KeyboardType", f)
        });
        e.on("click", ".pad-button-matrix c", function(f) {
            f = $(this).mathquill("latex");
            f = f.replace("\\left(", "");
            f = f.replace("\\right)", "");
            var b = f.split("\\times"),
                g = createMatrixLatex(b[0], b[1]);
            a.inputBox(!1).mathquill("write", g, b[0] * b[1]);
            a.inputBox(!1).focus();
            symbolab_log("Pad", "Matrix", "matrix:" + f);
            return !1
        });
        this.selectChild(".padButton").each(function(f, b) {
            f = $(b);
            b = f.attr("title");
            void 0 !== b && null !== b && "" !== b || f.attr("title", f.data("append"))
        });
        e.on("click", ".equalsBtn",
            function(f) {
                a.initateSearch()
            });
        e.on("click", ".radBtn", function(f) {
            $(".radBtn").addClass("active");
            $(".degBtn").removeClass("active")
        });
        e.on("click", ".degBtn", function(f) {
            $(".radBtn").removeClass("active");
            $(".degBtn").addClass("active")
        });
        e.on("click", ".clearBtn", function(f) {
            a.replaceInput("")
        });
        e.off("click", ".padButton:not(.disabled)").on("click", ".padButton:not(.disabled)", function(f) {
            a.padButtonClick(this)
        });
        $("#toggle_mini_keypad, .toggle_mini_keypad").click(function() {
            const f = $(this),
                b = f.find("img.open"),
                g = f.find("img.close"),
                h = f.siblings("#mini_codepad, .mini_codepad");
            f.hasClass("open") ? (f.removeClass("open"), g.fadeOut("fast", function() {
                h.slideUp(function() {
                    b.fadeIn("fast")
                })
            }), symbolab_log("Pad", "CompactPad", "Contract")) : (f.addClass("open"), b.fadeOut("fast", function() {
                h.slideDown(function() {
                    g.fadeIn("fast")
                })
            }), symbolab_log("Pad", "CompactPad", "Expand"))
        });
        e.off("click", "#see_all_text").on("click", "#see_all_text", function() {
            $(".nl-padOperators").toggleClass("no-hover")
        });
        $("#see_all_span").on("mouseenter",
            function() {
                $(".nl-padOperators").removeClass("no-hover");
                $("#most_used_dropdown").scrollTop(0)
            });
        $.data(this, "timer", setTimeout(function() {
            a.setSeeAllDropdownHeight()
        }, 50));
        window.addEventListener("resize", function() {
            a.setSeeAllDropdownHeight()
        });
        e.off("click", ".padSelect").on("click", ".padSelect", function() {
            const f = $(this);
            a.padButtonClick(f);
            f.parent().addClass("no-hover");
            setTimeout(function() {
                f.parent().removeClass("no-hover")
            }, 500)
        });
        e.off("click", "#toggle-pad").on("click", "#toggle-pad", function() {
            const f =
                $("#all-pads").toggleClass("on").hasClass("on");
            $("#toggle-pad").toggleClass("on", f);
            f ? ($("#all-pads").mathquill("redraw"), $("#main-input").focus(), symbolab_log("General", "Open Pad"), a.setSeeAllDropdownHeight()) : symbolab_log("General", "Close Pad")
        });
        e.off("click", "#main-input").on("click", "#main-input", function(f) {
            0 < $(f.originalEvent.target).parents("#toggle-pad").length || $("#all-pads").hasClass("on") || ($("#all-pads").toggleClass("on"), $("#toggle-pad").toggleClass("on"), $("#all-pads").mathquill("redraw"),
                a.setSeeAllDropdownHeight(), symbolab_log("General", "Open Pad"))
        });
        e.off("focus.mathquill", "#main-input.mathquill-editable").on("focus.mathquill", "#main-input.mathquill-editable", function() {
            a.inputGotFocus()
        });
        e.off("click", ".toggle-full-pad svg").on("click", ".toggle-full-pad svg", f => this.toggleFullPad())
    },
    inputGotFocus: function() {
        const a = $("#all-pads");
        a.hasClass("on") || (a.toggleClass("on"), $("#toggle-pad").toggleClass("on"), a.mathquill("redraw"), this.setSeeAllDropdownHeight(), symbolab_log("General",
            "Open Pad"))
    },
    toggleFullPad: function() {
        $(".codepad-container").toggle();
        $("#widgetPad").toggleClass("hide");
        var a = $(".toggle-full-pad svg use").attr("href");
        $("#all-pads").mathquill("redraw");
        a = "#toggle-full-keypad" === a ? "#toggle-full-keypad-open" : "#toggle-full-keypad";
        $(".toggle-full-pad svg use").attr("href", a);
        this.setSeeAllDropdownHeight();
        "#toggle-full-keypad" === a ? ($("#Compact").show(), symbolab_log("Solutions", "switch", "compact pad")) : (symbolab_log("Solutions", "switch", "full pad"), a = $('[class^="pad-toolbar-"].active').attr("class").split(" ")[0].split("-")[2].capitalize(),
            symbolab_log("Pad", "KeyboardType", a))
    },
    setSeeAllDropdownHeight: function() {
        if (0 < $("#see_all_text").length) {
            let a = $(window).height() - $("#see_all_text").offset().top - $("#see_all_text").outerHeight() + $(window).scrollTop() - 20;
            $("#most_used_dropdown").css("max-height", a + "px")
        }
    },
    sortSelect: function(a) {
        var e = a.val(),
            f = a.find("option").sort(function(b, g) {
                return 0 == b.index ? -1 : 0 == g.index ? 1 : b.text.localeCompare(g.text, this.language, {
                    sensitivity: "base"
                })
            });
        a.html(f).val(e)
    },
    appendButtonAndGetLogInfo: function(a) {
        a =
            $(a);
        var e = a.parents("table:first"),
            f = a.data("function"),
            b = e.attr("id");
        a.data("clear") && Symbolab_toolbar_functions.Basic.clear();
        if ("undefined" != typeof f) {
            var g = f;
            Symbolab_toolbar_functions[b][f](symbolab, e, a)
        } else "undefined" != typeof a.data("append") ? (g = a.data("append"), Symbolab_toolbar_functions.Basic.append(e, a)) : "undefined" != typeof a.data("prepend") ? (g = a.data("prepend"), Symbolab_toolbar_functions.Basic.prepend(e, a)) : g = $("#chemistryTable").is(":visible") ? "Chemistry" : $(".matrixTable").is(":visible") ?
            "Matrix" : a.attr("id");
        return [g, b]
    },
    padButtonClick: function(a) {
        var e = this.appendButtonAndGetLogInfo(a);
        a = e[0];
        e = e[1];
        "/" != window.location.pathname ? symbolab_log("Pad", e, a) : symbolab_log("MainPagePad", e, a);
        this.inputBox(!1).focus();
        return !1
    },
    switchPad: function(a) {
        var e = a.attr("class").split(" ")[0].split("-")[2].capitalize(),
            f = SYPAD.selectChild("#" + e);
        SYPAD.selectChild("table.buttons:not(.nohide)").hide();
        "Chemistry" == e || "Calculator" == e ? SYPAD.selectChild("#Common.buttons").hide() : SYPAD.selectChild("#Common.buttons").show();
        f.show();
        SYPAD.selectChild('[class^="pad-toolbar-"]').removeClass("active");
        a.addClass("active");
        SYPAD.currentToolbar = e;
        SYPAD.showAllButtons();
        $(".button-container .mathquill-embedded-latex").mathquill("redraw")
    },
    inputValue: function(a) {
        a = this.inputBox(a).mathquill("latex");
        return this.cleanSearchPhrase(a)
    },
    cleanSearchPhrase: function(a) {
        void 0 != a && (a = a.replace(/\\:/g, " "), a = a.replace(/(\^\{(.*?)\}|\^(.))/g, "^{$2$3}"), a = a.replace(/(_\{(.*?)\}|_(.))/g, "_{$2$3}"));
        return a
    },
    initateSearch: function() {
        var a =
            this;
        if (!a.searching && (void 0 === this.allowsSearching || this.allowsSearching)) {
            var e = this.inputValue(!0);
            if ("" != e)
                if (searchInitiatedLog(e), $("table#Calculator").is(":visible")) this.searching = !0, e = $(".radBtn").hasClass("active"), $.ajax({
                    type: "GET",
                    url: "/calculate",
                    data: {
                        query: SYPAD.inputValue(),
                        isRad: e
                    },
                    success: function(f) {
                        SYPAD.replaceInput(f.response)
                    },
                    complete: function() {
                        a.searching = !1
                    }
                });
                else {
                    let f = "input";
                    "3" === sy_var && this.suggestedQuery && (f = e === this.suggestedQuery ? "sug" : "sugEdit");
                    SYMBOLAB.forwardSearch(e,
                        f, !0)
                }
        }
    },
    appendInput: function(a, e) {
        if ("undefined" != typeof a) {
            "undefined" == typeof e && (e = 0);
            var f = this.inputBox(!1).focus();
            f.mathquill("write", a + "", e).focus();
            "undefined" != typeof SYSUGGEST && void 0 != SYSUGGEST && 0 == $("table#Calculator").is(":visible") && SYSUGGEST.updateSuggestions(this.inputValue());
            "undefined" != typeof SYGRAPH && SYGRAPH && (SYGRAPH.updateGraphInputOverflow(f, !0), SYGRAPH.getJsonAndDraw(), SYGRAPH.unchangedSinceLoad = !1);
            this.triggerOnKeyUpEvents && $(f).keyup()
        }
    },
    replaceInput: function(a) {
        a = prepareQueryForMathQuill(a);
        this.inputBox(!1).mathquill("latex", a)
    },
    inputFromSuggest() {
        this.suggestedQuery = this.inputValue(!0)
    },
    selectChild: function(a) {
        return $(a)
    },
    showCommonButtons: function() {
        this.selectChild(".codepadbody .buttons:not(.hide) tr").hide();
        this.selectChild(".codepadbody .buttons:not(.hide) tr:first").show();
        this.selectChild("#Basic").hide()
    },
    showAllButtons: function() {
        this.selectChild(".codepadbody .buttons:not(.hide) tr").show()
    },
    inputBox: function(a) {
        return void 0 !== this.customInputboxSelector && $(this.customInputboxSelector).is(":visible") ?
            $(this.customInputboxSelector) : a ? $("#main-input") : null != this.activeInputBox ? this.activeInputBox : this.selectChild(".mathquill-editable:first")
    },
    inputBoxIndex: function() {
        var a = this.inputBox(!1);
        return $(".graph-input").index(a)
    },
    createChemistryPad: function(a) {
        var e = this;
        a = $(a);
        if (a.is(":empty")) {
            for (var f = "<tbody>", b = 0; b < this.periodicTable.length; b++) {
                f += "<tr>";
                for (var g = this.periodicTable[b], h = 0; h < g.length; h++) f = g[h] ? f + ("<td class='atomInTable' title='" + e.elementNames[g[h]] + "'><span class='mathquill-embedded-latex'>\\mathrm{" +
                    g[h] + "}</span></td>") : f + "<td class='noAtomInTable'></td>";
                f += "</tr>"
            }
            a.append(f + "</tbody>");
            a.find(".mathquill-embedded-latex").mathquill();
            $(".atomInTable").click(function() {
                var m = $(this).find(".mathquill-embedded-latex").mathquill("latex"),
                    l = 0;
                0 < m.indexOf("_") ? (m = "_", l = 1) : (m = m.replace("\\mathrm{", ""), m = m.replace("}", ""));
                e.inputBox(!1).mathquill("write", m, l);
                e.inputBox(!1).focus();
                symbolab_log("Pad", "Chemistry", m)
            })
        }
        $(".solution-codepad-header span").html("\u00ab " + i18n("compact pad"));
        $("#Compact").hide();
        a.show();
        a.find(".mathquill-embedded-latex").mathquill("redraw")
    },
    createCalculatorPad: function(a) {
        var e = this;
        a = $(a);
        if (a.is(":empty")) {
            for (var f = "<tbody>", b = 0; b < this.periodicTable.length; b++) {
                f += "<tr>";
                for (var g = this.periodicTable[b], h = 0; h < g.length; h++) f = g[h] ? f + ("<td class='atomInTable' title='" + e.elementNames[g[h]] + "'><span class='mathquill-embedded-latex'>\\mathrm{" + g[h] + "}</span></td>") : f + "<td class='noAtomInTable'></td>";
                f += "</tr>"
            }
            a.append(f + "</tbody>");
            a.find(".mathquill-embedded-latex").mathquill();
            $(".atomInTable").click(function() {
                var m = $(this).find(".mathquill-embedded-latex").mathquill("latex"),
                    l = 0;
                0 < m.indexOf("_") ? (m = "_", l = 1) : (m = m.replace("\\mathrm{", ""), m = m.replace("}", ""));
                e.inputBox(!1).mathquill("write", m, l);
                e.inputBox(!1).focus();
                symbolab_log("Pad", "Chemistry", m)
            })
        }
        $(".solution-codepad-header span").html("\u00ab " + i18n("compact pad"));
        $("#Compact").hide();
        a.show();
        a.find(".mathquill-embedded-latex").mathquill("redraw")
    }
};
class SyKeypad {
    constructor(a) {
        function e() {
            setTimeout(() => {
                $("#english-keypad div").css("height", "auto");
                $("#mobile-keypad #keypad div.keypanel#english-keypad span").css("width", "auto");
                $("#mobile-keypad #keypad div.keypanel#english-keypad span.shift").css("width", "auto");
                $("#mobile-keypad #keypad div.keypanel#english-keypad span.blank").css("width", "auto");
                $("#mobile-keypad #keypad div.keypanel#english-keypad span.space").css("width", "auto");
                var b = $("#keypad-slide").height();
                $("#english-keypad div").height(b /
                    4 - 2);
                $("#mobile-keypad #keypad div.keypanel#english-keypad span").css("height", "auto");
                b = $("#keypad-slide").width();
                var g = b / 10 - 3;
                $("#mobile-keypad #keypad div.keypanel#english-keypad span").css("width", g);
                $("#mobile-keypad #keypad div.keypanel#english-keypad span.shift").css("width", 2.1 * g);
                $("#mobile-keypad #keypad div.keypanel#english-keypad span.blank").css("width", 2.1 * g);
                $("#mobile-keypad #keypad div.keypanel#english-keypad span.space").css("width", 6.4 * g);
                g = $("#english-keypad div").width();
                $("#english-keypad div").css("margin-right",
                    b - g)
            }, 0)
        }
        this.root = a;
        $(".mathquill-editable:not(.mathquill-rendered-math)", a).mathquill("editable");
        this.inputBox = $("#main-input", a);
        this.inputBox.mathquill("placeholder", "\\mathrm{Enter\\:a\\:problem}");
        this.keypad = $("#keypad", a);
        this.keypad.off("touchstart", "div.keypanel span").on("touchstart", "div.keypanel span", b => {
            this._resetHighlights();
            $(b.currentTarget).addClass("touch")
        });
        this.keypad.off("click", "div.keypanel span").on("click", "div.keypanel span", b => {
            this._resetHighlights();
            const g = $(b.currentTarget).closest(".keypanel").hasClass("uppercase");
            $(b.currentTarget).hasClass("shift") && (g ? ($(b.currentTarget).closest(".keypanel").removeClass("uppercase"), $(b.currentTarget).find("svg#not-pressed").show(), $(b.currentTarget).find("svg#pressed").hide()) : ($(b.currentTarget).closest(".keypanel").addClass("uppercase"), $(b.currentTarget).find("svg#not-pressed").hide(), $(b.currentTarget).find("svg#pressed").show()));
            this._padButtonClick(b.currentTarget, g)
        });
        const f = $("body");
        f.on("touchend touchcancel", () => this._resetHighlights());
        f.off("focus.mathquill",
            ".mathquill-editable").on("focus.mathquill", ".mathquill-editable", () => {
            this.keypad.hasClass("hide-important") && (this.keypad.removeClass("hide-important"), e(), $("#scan-to-solve-and-decoration", a).hide())
        });
        $("#keypad-slide", a).on("scroll", function(b) {
            20 > Math.abs(b.target.scrollLeft % b.target.offsetWidth) && (b = Math.floor(b.target.scrollLeft / b.target.offsetWidth), $("#keypad_scroll_indicators span", a).removeClass("selected").eq(b).addClass("selected"))
        });
        $("#keypad_scroll_indicators > span").off("click").on("click",
            function() {
                if (!$(this).hasClass("selected")) {
                    var b = $("#keypad-slide").width() * $(this).index();
                    $("#keypad-slide").addClass("animate").animate({
                        scrollLeft: b
                    }, "slow", function() {
                        $("#keypad-slide").removeClass("animate")
                    });
                    $("#keypad_scroll_indicators > span", a).removeClass("selected");
                    $(this).addClass("selected")
                }
            });
        $("textarea", a).attr("inputmode", "none");
        e();
        window.addEventListener("resize", function() {
            e()
        })
    }
    _cleanSearchPhrase(a) {
        void 0 !== a && (a = a.replace(/\\:/g, " "), a = a.replace(/(\^\{(.*?)\}|\^(.))/g,
            "^{$2$3}"), a = a.replace(/(_\{(.*?)\}|_(.))/g, "_{$2$3}"));
        return a
    }
    _command(a) {
        switch (a.data("command")) {
            case "backspace":
                this._backspace();
                break;
            case "moveleft":
                this._moveLeft();
                break;
            case "moveright":
                this._moveRight();
                break;
            case "newline":
                this._newLine();
                break;
            case "go":
                this._go()
        }
    }
    _backspace() {
        this.inputBox.mathquill("backspace")
    }
    _moveLeft() {
        this.inputBox.mathquill("moveleft")
    }
    _moveRight() {
        this.inputBox.mathquill("moveright")
    }
    _go() {
        var a = this.inputBox.mathquill("latex");
        a = this._cleanSearchPhrase(a);
        a = encodeURIComponent(a);
        window.location.href = "/solver/step-by-step/" + a + "?or=input"
    }
    _newLine() {
        var a = this.inputBox.mathquill("latex");
        let e = 0;
        const f = !!a.match(/^\s*[fy][\s\w\\()]*=/i);
        if (0 <= a.indexOf("\\begin{cases}")) {
            const b = a.match(/(.*?)(\\begin{cases}.+?)(\\end{cases}.*)/i);
            b && (a = b[1] + b[2] + (f ? " \\\\ & " : " \\\\ ") + b[3], e = f ? 2 : 1)
        } else f ? (symbolab_log("Pad", "NewlineType", "Function"), a += " \\begin{cases} & \\\\ & \\end{cases}", e = 4) : (symbolab_log("Pad", "NewlineType", "SoE"), a += " \\begin{cases} \\\\ \\end{cases}",
            e = 2);
        this.inputBox.mathquill("latex", "");
        this.inputBox.mathquill("write", a, e)
    }
    _appendInput(a, e) {
        e = e ? a.data("append").toUpperCase() : a.data("append");
        a = a.data("moveleft");
        void 0 !== e && (void 0 === a && (a = 0), this.inputBox.mathquill("write", e + "", a))
    }
    _padButtonClick(a, e) {
        e = this._appendButtonAndGetLogInfo(a, e);
        a = e[0];
        e = e[1];
        "/" !== window.location.pathname ? symbolab_log("Pad", e, a) : symbolab_log("MainPagePad", e, a);
        this.inputBox.focus();
        return !1
    }
    _appendButtonAndGetLogInfo(a, e) {
        a = $(a);
        const f = a.parents(".keypanel:first").attr("id");
        a.data("clear") && this.inputBox.mathquill("latex", "");
        let b;
        void 0 !== a.data("append") ? (b = e ? a.data("append").toUpperCase() : a.data("append"), this._appendInput(a, e)) : void 0 !== a.data("command") && (b = a.data("command"), this._command(a));
        return [b, f]
    }
    _resetHighlights() {
        $("div.keypanel span", this.keypad).removeClass("touch")
    }
}
class SyCamera {
    constructor(a, e, f, b, g, h) {
        this._baseReason = a;
        this._curLang = e;
        this._page = f;
        this._debugMode = b;
        this._body = $("body");
        this._container = $("#video");
        this._cropContainer = $("#crop_handle_container");
        this._animationCanvas = $("#bar_animation");
        this._imageArea = $("#user-image");
        this._oneCorner = $("#crop_top_left");
        this._cameraSuccessCallback = h;
        this._cameraButtonSelector = void 0 === g ? "#input-camera" : g;
        0 <= window.location.hash.indexOf("camera") && (a = window.location.href.replace(/#.*/, ""), window.history.replaceState({},
            document.title, a));
        this._setupCameraClick();
        window.onhashchange = () => {
            "#camera" !== window.location.hash && this._closeCamera()
        }
    }
    _setupCameraClick() {
        const a = new FileReader;
        var e = $("#file-input-target");
        e.empty();
        const f = $('<input type="file"\n\t\t\t\t\t\t\t\t  capture="environment"\n\t\t\t\t\t\t\t\t  accept="image/*">');
        e.append(f);
        f.on("change", () => {
            const b = f[0].files[0];
            b && (a.addEventListener("load", () => {
                const g = new Image;
                g.src = a.result;
                g.onload = () => {
                    $("#user-image").attr("src", a.result);
                    this._openCamera(g.width,
                        g.height)
                }
            }), a.readAsDataURL(b))
        });
        e = $(this._cameraButtonSelector);
        e.removeClass("hide-important");
        e.off("click").on("click", b => {
            b.preventDefault();
            f.click()
        });
        $("#scan-to-solve").off("click").on("click", b => {
            b.preventDefault();
            f.click()
        });
        $("#decoration svg").off("click").on("click", b => {
            b.preventDefault();
            f.click()
        })
    }
    _openCamera(a, e) {
        window.location.hash = "#camera";
        this._sessionId = this._uuidSessionId();
        this._body.addClass("no-scroll");
        $("#video").removeClass("hide");
        this._cropPositionMove(0, 0);
        $("#user-image").css("aspect-ratio",
            "" + a + "/" + e);
        $("#crop_top_left").off("touchstart").on("touchstart", g => {
            this._handleTouchStart(g)
        });
        $("#crop_top_right").off("touchstart").on("touchstart", g => {
            this._handleTouchStart(g)
        });
        $("#crop_bottom_right").off("touchstart").on("touchstart", g => {
            this._handleTouchStart(g)
        });
        $("#crop_bottom_left").off("touchstart").on("touchstart", g => {
            this._handleTouchStart(g)
        });
        $("#crop_top_left").off("touchmove").on("touchmove", g => {
            this._handleTouchMove(g, 0)
        });
        $("#crop_top_right").off("touchmove").on("touchmove",
            g => {
                this._handleTouchMove(g, 1)
            });
        $("#crop_bottom_right").off("touchmove").on("touchmove", g => {
            this._handleTouchMove(g, 2)
        });
        $("#crop_bottom_left").off("touchmove").on("touchmove", g => {
            this._handleTouchMove(g, 3)
        });
        let f = 0,
            b = 0;
        $("#crop_handle_container").off("touchstart").on("touchstart", g => {
            0 < $(g.originalEvent.target).closest(".crop-corner").length || !(g = g.originalEvent.touches[0]) || (f = g.clientX, b = g.clientY)
        });
        $("#crop_handle_container").off("touchmove").on("touchmove", g => {
            !(0 < $(g.originalEvent.target).closest(".crop-corner").length) &&
            (g.preventDefault(), g.stopPropagation(), g = g.originalEvent.touches[0]) && (this._entireCropWindowMove(g.clientX, g.clientY, f, b), f = g.clientX, b = g.clientY)
        });
        this._body.off("touchstart").on("touchstart", g => {});
        $("#shutter").off("click").on("click", async () => {
            await this._doCapture(a, e)
        });
        window.addEventListener("resize", () => {
            this._cropPositionMove(0, 0)
        });
        this._ready = !0
    }
    _closeCamera() {
        this._debugLog("Closing camera");
        $("#video").addClass("hide");
        $("#user-image").removeAttr("src");
        this._setupCameraClick();
        $("#latex-result").addClass("hide-important");
        $("#store-prompt").addClass("hide-important");
        this._animationCanvas.addClass("hide-important");
        this._body.removeClass("no-scroll")
    }
    _uuidSessionId() {
        return "SNAP-xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(a) {
            const e = 16 * Math.random() | 0;
            return ("x" === a ? e : e & 3 | 8).toString(16)
        })
    }
    _entireCropWindowMove(a, e, f, b) {
        const g = this._imageArea.height(),
            h = this._container.width();
        var m = this._imageArea.offset();
        const l = this._imageArea.offsetParent().offset(),
            n = this._cropContainer.width(),
            u = this._cropContainer.height();
        var p = this._cropContainer.offset();
        const t = p.left;
        p = p.top - l.top;
        m = Math.round(m.top - l.top);
        a = t + (a - f);
        e = p + (e - b);
        n + a > h ? a = t : 0 > a && (a = t);
        u + e > g + m ? e = p : e < m && (e = p);
        a = Math.round(a);
        e = Math.round(e);
        this._cropContainer.css({
            left: a + "px",
            top: e + "px"
        })
    }
    _cropPositionMove(a, e, f, b, g) {
        const h = this._imageArea.height(),
            m = this._container.width();
        var l = this._imageArea.offset();
        const n = this._imageArea.offsetParent().offset(),
            u = 2 * this._oneCorner.width(),
            p = 1.2 * this._oneCorner.height(),
            t = this._cropContainer.width(),
            w = this._cropContainer.height();
        var v = this._cropContainer.offset();
        const z = v.left;
        v = v.top - n.top;
        l = Math.round(l.top - n.top);
        let C, D, x, A;
        if (0 === a && 0 === e) C = 300, D = 200, x = (m - C) / 2, A = (h - D) / 2 + l;
        else switch (a -= f, e -= b, g) {
            case 0:
                x = z + a;
                C = t - a;
                A = v + e;
                D = w - e;
                break;
            case 1:
                x = z;
                C = t + a;
                A = v + e;
                D = w - e;
                break;
            case 2:
                x = z;
                C = t + a;
                A = v;
                D = w + e;
                break;
            case 3:
                x = z + a, C = t - a, A = v, D = w + e
        }
        C + x > m ? (C = m - x, C < u && (C = u, x = m - C)) : 0 > x && (x = z, C = t);
        D + A > h + l ? (D = h + l - A, D < p && (A = h + l - D)) : A < l && (A = v, D = w);
        C < u && (C = t, x = z);
        D < p && (D = w, A = v);
        C = Math.round(C);
        D = Math.round(D);
        x = Math.round(x);
        A = Math.round(A);
        this._cropContainer.css({
            left: x +
                "px",
            top: A + "px",
            width: C + "px",
            height: D + "px"
        });
        this._animationCanvas[0].width = C;
        this._animationCanvas[0].height = D
    }
    _handleTouchStart(a) {
        if (a = a.originalEvent.touches[0]) this._currentX = a.clientX, this._currentY = a.clientY
    }
    _handleTouchMove(a, e) {
        a.preventDefault();
        a.stopPropagation();
        if (a = a.originalEvent.touches[0]) this._cropPositionMove(a.clientX, a.clientY, this._currentX, this._currentY, e), this._currentX = a.clientX, this._currentY = a.clientY
    }
    async _doCapture(a, e) {
        if (this._ready) {
            this._ready = !1;
            this._animationCanvas.removeClass("hide-important");
            var f = $("#image-canvas")[0],
                b = $("#user-image"),
                g = $("#crop_handle_container");
            a = b.width() / a;
            e = b.height() / e;
            f.width = g.width() / a;
            f.height = g.height() / e;
            g = g.offset();
            var h = b.offset(),
                m = g.left - h.left;
            h = g.top - h.top;
            g = f.getContext("2d");
            g.drawImage(b[0], m / a, h / e, f.width, f.height, 0, 0, f.width, f.height);
            b = g.getImageData(0, 0, g.canvas.width, g.canvas.height);
            a = b.data;
            for (e = 0; e < a.length; e += 4) m = parseInt((a[e] + a[e + 1] + a[e + 2]) / 3), a[e] = m, a[e + 1] = m, a[e + 2] = m;
            g.putImageData(b, 0, 0);
            b = f.toDataURL("image/jpeg", .85);
            this._debugMode &&
                ($("#debug-image")[0].src = b);
            f = new FormData;
            b = this._dataURIToBlob(b);
            a = this._getSequence();
            g = ("0000" + a).slice(-4) + ".jpg";
            f.append("data", b, g);
            this._putSequence((a + 1) % 5E3);
            b = this._debugMode ? "debug" : "";
            this._animationCanvas.addClass("hide-important");
            $("#ocr_spinner").removeClass("hide-important");
            try {
                const l = await securedAjax({
                    type: "POST",
                    url: "/api/getLatex?mode=" + b + "&sessionid=" + this._sessionId + "&language=" + this._curLang,
                    data: f,
                    processData: !1,
                    contentType: !1
                });
                this._handleSuccess(l)
            } catch (l) {
                console.log(l),
                    this._showError(i18n("js.connectivity_error")), $("#ocr_spinner").addClass("hide-important")
            }
        }
    }
    _debugLog(a) {
        this._debugMode && console.log(a)
    }
    _dataURIToBlob(a) {
        var e = a.split(",");
        a = 0 <= e[0].indexOf("base64") ? atob(e[1]) : decodeURI(e[1]);
        e = e[0].split(":")[1].split(";")[0];
        const f = new Uint8Array(a.length);
        for (let b = 0; b < a.length; b++) f[b] = a.charCodeAt(b);
        return new Blob([f], {
            type: e
        })
    }
    _putSequence(a) {
        localStorage.sequence = JSON.stringify(a)
    }
    _getSequence() {
        const a = localStorage.sequence;
        return void 0 === a ? 0 : JSON.parse(a)
    }
    _setupShutterSoundAndPlay() {
        this._audioAlreadySetUp ?
            this._playShutterSound() : (this._audioAlreadySetUp = !0, this._context = new AudioContext, window.fetch("/public/audio/shutter.wav").then(a => a.arrayBuffer()).then(a => this._context.decodeAudioData(a)).then(a => {
                this._shutterBuffer = a;
                this._playShutterSound()
            }).catch(a => {
                this._debugLog("Failed to get shutter sound: " + a)
            }))
    }
    _playShutterSound() {
        if (this._shutterBuffer) {
            var a = this._context.createBufferSource();
            a.buffer = this._shutterBuffer;
            var e = this._context.createGain();
            e.gain.value = .5;
            e.connect(this._context.destination);
            a.connect(e);
            a.start()
        }
    }
    _handleSuccess(a) {
        a.success ? this._cameraSuccessCallback ? a.latex && (window.location.hash = "", this._cameraSuccessCallback(a.latex)) : (this._ready = !0, a = encodeURIComponent(a.latex), window.location.href = "/solver/" + this._page + "/" + a + "?or=ocr") : this._showError(a.user_message);
        $("#ocr_spinner").addClass("hide-important")
    }
    _showError(a) {
        $("#toast-contents").text(a).removeClass("hide-important").show().delay(2E3).fadeOut();
        this._ready = !0
    }
}
var StructuredGeometry = function(a) {
    this.query = a;
    this.supported = !1;
    this.parsedObject = {};
    this.parse()
};
StructuredGeometry.prototype = {
    parse: function() {
        var a = this.query.match(/^(equilateral triangle|square|circle), find (perimeter|area given side|area|circumference), given (.+?)$/i);
        if (a) {
            var e = {};
            a[3].split(",").forEach(function(f) {
                f = f.split("=");
                e[f[0]] = f[1]
            });
            this.parsedObject = {
                entity: a[1],
                find: a[2],
                givens: e
            };
            this.supported = !0
        }
    },
    shouldGenerateLinkForQuery: function() {
        return this.supported
    }
};
var SymbolabEquationSuggest = function() {
    this.init()
};
SymbolabEquationSuggest.prototype = {
    init: function() {
        var a = this;
        $("#main-input").keyup(function(e) {
            if (37 == e.keyCode || 39 == e.keyCode || $("table#Calculator").is(":visible")) return !1;
            if (38 == e.keyCode) $("#CodePadSuggestions").is(":visible") && a.moveSuggestion(-1);
            else if (8 != e.keyCode && "Calc" == SYPAD.currentToolbar && 1 == symbolab.lastInsertedIsEquals()) a.updateCalculation();
            else if (40 == e.keyCode) $("#CodePadSuggestions").is(":visible") && a.moveSuggestion(1);
            else if (27 == e.keyCode) a.selectChild("#CodePadSuggestions").hide();
            else {
                var f = SYPAD.inputValue("latex");
                setTimeout(function() {
                    var b = SYPAD.inputValue("latex");
                    "" == b ? $("#CodePadSuggestions").hide() : f === b && a.updateSuggestions(b)
                }, 150)
            }
        })
    },
    moveSuggestion: function(a) {
        var e, f = $("#CodePadSuggestions li.active");
        0 > a && 0 == f.length || (0 == f.length ? e = $("#CodePadSuggestions li:first") : 1 == a ? e = f.next() : -1 == a && (e = f.prev()), 0 != e.length && (this.highlightSuggestion(f, e, !0), SYPAD.inputBox().focus()))
    },
    highlightSuggestion: function(a, e, f) {
        a && a.removeClass("active");
        e.addClass("active");
        f && (SYPAD.replaceInput(e.attr("title")), SYPAD.inputFromSuggest())
    },
    clearSuggestions: function(a) {
        a = $("#CodePadSuggestions");
        a.find("li").remove();
        a.hide()
    },
    updateSuggestions: function(a) {
        if (!this.updatingSuggestions && !this.disable_suggestions) {
            this.updatingSuggestions = !0;
            var e = this,
                f = $("#CodePadSuggestions");
            $.ajax({
                type: "GET",
                url: "/suggest",
                data: {
                    userId: SYMBOLAB.params.userId,
                    connected: SYMBOLAB.params.connected,
                    language: SYMBOLAB.params.language,
                    query: a
                },
                error: function(b) {
                    e.updatingSuggestions = !1;
                    f.hide()
                },
                success: function(b) {
                    e.clearSuggestions();
                    if (void 0 == b || 0 == b.length) f.hide(), e.updatingSuggestions = !1;
                    else {
                        for (var g in b) e.addSuggestion(b[g].display);
                        f.show();
                        e.updatingSuggestions = !1;
                        f.find(".mathquill-embedded-latex:not(.mathquill-rendered-math)").mathquill();
                        f.find("li").hover(function(h) {
                            var m = $("#CodePadSuggestions li.active");
                            h = $(h.currentTarget);
                            e.highlightSuggestion(m, h, !1)
                        });
                        f.find("li").click(function(h) {
                            var m = f.find("li.active");
                            h = $(h.currentTarget);
                            e.highlightSuggestion(m, h, !0);
                            "undefined" !=
                            typeof widget && 1 == widget ? makeWidgetSearch() : (m = SYPAD.inputValue("latex"), SYMBOLAB.forwardSearch(m, "sug", !1))
                        })
                    }
                }
            })
        }
    },
    addSuggestion: function(a) {
        a = prepareQueryForMathQuill(a);
        $("#CodePadSuggestions").append('<li title="' + a + '"><div class="mathquill-embedded-latex"">' + a + "</div></li>")
    }
};
async function createAndDownloadPDF() {
    symbolab_log("Registration", "ClickedFeature", "Solver\tPDF");
    await beforePrint(!1);
    window.print();
    afterPrint()
}
const printSolutionPage = async function() {
    symbolab_log("Registration", "ClickedFeature", "Solver\tPrint");
    await beforePrint(!1);
    window.print();
    afterPrint()
}, beforePrint = async function(a) {
    a && $("body").addClass("pdf");
    var e = new Promise((b, g) => {
        $("#symbolabLogoPrint").css("flex-basis", "100%").append("<a class='printLogo' href='/'><img  src='/public/img/logo-s.png' alt='Symbolab Logo'></a>");
        g = $("#symbolabLogoPrint img")[0];
        !g || g.complete ? b() : g.addEventListener("load", b)
    });
    const f = new Promise((b, g) => {
        g =
            $("#show-steps-button:not(.hide-important)");
        0 === g.length ? b() : ($("#solution-only").one("steps-rendered", h => {
            b()
        }), g.click())
    });
    await Promise.all([e, f]);
    "yes" === getLocalStorage().getItem("settings.printOpen") && SYSTEPS.expandAllSteps();
    "no" == getLocalStorage().getItem("settings.printGraph") && $("#Plot_dynaimc").hide();
    a && $("#solution-only-container *").css("-webkit-transform", "none");
    $("#show-hide-steps-divider").hide();
    $(".codepad-input").addClass("hide-important");
    $("body").css("background-color", "white");
    $(".nl-page").css("background-color", "transparent");
    a = a ? 1020 : 1300;
    400 > $("#multipleSolutions").height() && $("#multipleSolutions").prepend('<div class="printWatermark"><p style="top:400px;">Symbolab</p></div>');
    for (e = 400; e < $("#multipleSolutions").height(); e += a) $("#multipleSolutions").prepend('<div class="printWatermark"><p style="top:' + e + 'px;">Symbolab</p></div>');
    $("#Plot_dynaimc").prepend('<div class="printWatermark"><p>Symbolab</p></div>');
    this.subscribed ? showPointOfInterest(".printIcon", '<a class="upgradeLink" href="/user#settings">Click here</a> to set your print & pdf preferences', {
        side: "left"
    }) : createUpgradeTooltipOnly($(".printIcon"), ".printIcon", "SolutionsPrint", "to set your print & pdf preferences", "left", !0)
}, afterPrint = function() {
    $(".printWatermark").remove();
    $(".printLogo").remove();
    $(".codepad-input").removeClass("hide-important");
    $("body").removeClass("pdf");
    $("body").css("background-color", "");
    $(".nl-page").css("background-color", "");
    $("#show-hide-steps-divider").show();
    "no" == getLocalStorage().getItem("settings.printGraph") && $("#Plot_dynaimc").show()
};
var Solutions = function(a, e, f, b, g, h, m, l) {
    this.subject = a;
    this.page = e;
    this.query = f;
    this.input = b;
    this.input_back = g;
    this.appLangs = h;
    this.curLang = m;
    this.subscribed = "true" == l;
    this.subjectUl;
    this.installBehavior();
    this.subjectSuggestions = this.activeSuggestionIndex = 0
};
Solutions.prototype = {
    init: function(a) {
        this.updatePage(a);
        void 0 !== SYPAD && "/solver/word-problems-calculator" === window.location.pathname && SYPAD.inputBox().mathquill("placeholder", "\\mathrm{Enter\\:your\\:word\\:problem}");
        jQuery(document).bind("keydown", function(e) {
            if ((e.metaKey || e.ctrlKey) && 80 === e.keyCode) return printSolutionPage(), !1
        });
        $("#itunesLink").click(function() {
            symbolab_log("Solutions", "iOSLink")
        });
        $(".viewLargerPlot").click(function(e) {
            e.preventDefault();
            var f = $(this).attr("href");
            $.when(symbolab_log("Registration",
                "ClickedFeature", "Solver\tViewLargerPlot")).always(function() {
                window.location = f
            })
        });
        $("#androidLink").click(function() {
            symbolab_log("Solutions", "AndroidLink")
        });
        $(".embedPost").click(function() {
            symbolab_log("Solutions", "Blog", $(this).find(".post_title").text())
        });
        1 === $(".structuredWhat").size() && $(".structuredWhat").click()
    },
    updatePage: function(a) {
        0 <= this.page.indexOf("chemi") ? (SOLUTIONS.switchPad(i18n("full pad")), setTimeout(function() {
                $(".pad-toolbar-chemistry").click()
            }, 500)) : 0 <= this.page.indexOf("matrix") ||
            0 <= this.page.indexOf("linear-algebra") && "undefined" !== typeof SOLUTIONS ? (SOLUTIONS.switchPad(i18n("full pad")), setTimeout(function() {
                $(".pad-toolbar-matrix").click()
            }, 500)) : 0 <= this.page.indexOf("boolean") || 0 <= this.page.indexOf("set-theory") || 0 <= this.page.indexOf("truth-table") || 0 <= this.page.indexOf("logical-sets") ? (SOLUTIONS.switchPad(i18n("full pad")), $(".pad-toolbar-accents").click()) : (0 <= this.page.indexOf("triangle") || 0 <= this.page.indexOf("quadrilateral") || 0 <= this.page.indexOf("trapezoid") || 0 <=
                this.page.indexOf("parallelogram") || 0 <= this.page.indexOf("parallelogram") || 0 <= this.page.indexOf("rhombus") || 0 <= this.page.indexOf("rectangle") || 0 <= this.page.indexOf("square") || 0 <= this.page.indexOf("law-of") || 0 <= this.page.indexOf("line-intersection")) && showPointOfInterest("#structuredTop", "<a class=\"clickable\" onclick=\"$.when(symbolab_log('Geometry', 'StructuredTooltip')).always(function() { window.location='/geometry'; });\">" + i18n("js.Geometry Structured Tooltip") + "</a>", {
                side: "bottom"
            });
        this.updateMenu();
        "" === this.query && (this.input && void 0 !== SYPAD && SYPAD.inputBox().mathquill("write", this.input.replace(/&amp;/g, "&"), this.input_back), 0 <= this.page.indexOf("system-of-equations") && $(".as300").insertAfter("#Examples"));
        (this.query || !this.subscribed || 0 < $("#guideLink").size()) && $("#ExamplesLink").show();
        this.query && ($("#steps-loading").show(), this.doSolve(a))
    },
    updateMenu: function() {
        var a = this;
        "" !== a.page && ("calculus-calculator" === a.page || "pre-algebra-calculator" === a.page || "algebra-calculator" === a.page ||
            "linear-algebra-calculator" === a.page || "functions-graphing-calculator" === a.page || "geometry-calculator" === a.page ? $(".ma").eq(0).click() : $(".nl-leftNav li a").each(function(e) {
                if (0 <= $(this).attr("href").indexOf("/" + a.page)) {
                    $(this).addClass("active");
                    e = $(this).parents("li");
                    for (var f = e.length - 1; 0 <= f; f--) e.eq(f).find(".ma").eq(0).click()
                }
            }))
    },
    doSolve: function(a) {
        var e = this.query;
        SYMBOLAB.params.query = e;
        "" == e ? (SYMBOLAB.inputBox().mathquill("latex", this.query), SYMBOLAB.promptError("Cannot understand this query, please try a different query.")) :
            (e = prepareQueryForMathQuill(e), void 0 != SYPAD && SYPAD.inputBox().mathquill("latex", e), SYSTEPS.updateStepsPlot(!1, this.page, a), $(".show-hide-plot").text("\u00ab " + i18n("hide plot")), $("#steps-container").show(), $("#steps-container").find(".mathquill-embedded-latex").mathquill("redraw"))
    },
    switchPad: function(a, e) {
        e ||= ".pad-toolbar-basic";
        if (0 <= a.indexOf(i18n("full pad"))) {
            symbolab_log("Pad", "switch", "full pad");
            var f = $(".codepad-container"),
                b = $.Deferred();
            0 < f.size() ? b.resolve() : $.get("/full_pad", null,
                function(g) {
                    g = g.replace("&{'Basic'}", i18n("Basic"));
                    g = g.replace("&{'Radians'}", i18n("Radians"));
                    g = g.replace("&{'Degrees'}", i18n("Degrees"));
                    g = g.replace("&{'clear'}", i18n("clear"));
                    $(g).insertAfter("#widgetPad");
                    f = $(".codepad-container");
                    b.resolve()
                }, "html");
            $.whenAll(b).done(function() {
                f.find(".mathquill-embedded-latex:not(.mathquill-rendered-math)").mathquill();
                f.show();
                $(".codepad-container-small").hide();
                $(".solution-codepad-header span").html("\u00ab " + i18n("compact pad"));
                void 0 != SYPAD && $(e).click();
                f.mathquill("redraw")
            })
        } else symbolab_log("Pad", "switch", "compact pad"), $(".codepad-container").hide(), $("#chemistryTable2").hide(), $(".codepad-container-small").show(), $("#widgetPad").show(), $("#Compact").show(), $("#widgetPad").mathquill("redraw"), $(".solution-codepad-header span").html(i18n("full pad") + " \u00bb")
    },
    parseQueryParameters: function() {
        for (var a, e = /([^&=]+)=?([^&]*)/g, f = window.location.search.substring(1); a = e.exec(f);) this.params[decodeURIComponent(a[1])] = decodeURIComponent(a[2])
    },
    doStructuredSearch: function() {
        query =
            $("#structured_subtopic").text() + ", find " + $(".selectedWhat").text() + ", given ";
        $(".givenDiv:visible .oneGiven").each(function() {
            var a = $(this).find(".givenLabel").text(),
                e = $(this).find(".mathquill-editable").mathquill("latex");
            e ||= "0";
            var f = $(this).find(".chosen").text();
            query += a + "=" + e + f + ","
        });
        query = query.replace(/,$/, "");
        window.location = "/solver/" + this.page + "/" + encodeURIComponent(query)
    },
    doConversionSearch: function() {
        query = "convert " + $("#convInput").mathquill("latex") + " " + $("#convertFrom .same-as-selected").data("group") +
            " to " + $("#convertTo .same-as-selected").data("group");
        query = query.replace(/,$/, "");
        window.location = "/solver/" + this.page + "/" + encodeURIComponent(query)
    },
    populateGivenStructure: function() {
        if (this.query) {
            var a = this;
            $(".givenDiv .mathquill-editable").mathquill("latex", "");
            var e = /.+?, find (.+?), given (.+)/;
            a.structuredWhat = this.query.match(e)[1];
            $(".structuredWhat").filter(function() {
                return $(this).text() === a.structuredWhat
            }).click();
            e = this.query.match(e)[2].split(",");
            this.fixGivenArray(e);
            $(".givenDiv:visible .oneGiven .typeTD").removeClass("chosen");
            for (var f = 0; f < e.length; f++) {
                var b = e[f];
                if ("" != b) {
                    b.match(/(.+?)=.*/);
                    var g = b.match(/.+?=(.*)/)[1];
                    $(".givenDiv:visible .oneGiven").eq(f).find(".typeTD").each(function() {
                        var h = $(this).text();
                        if ((new RegExp("[^a-z]" + h + "$")).test(g)) return g = g.replace(h, ""), $(this).addClass("chosen"), !1
                    });
                    $(".givenDiv:visible .mathquill-editable").eq(f).mathquill("latex", g)
                }
            }
        }
    },
    populateConversions: function() {
        if (this.query) {
            var a = /^convert (.+?)([a-z]+?) to ([a-z]+?)$/;
            this.query.match(a);
            $("#convInput").mathquill("latex",
                this.query.match(a)[1]);
            groupSelectSelected($("#convertFrom .select-items div[data-group=" + this.query.match(a)[2] + "]"));
            groupSelectSelected($("#convertTo .select-items div[data-group=" + this.query.match(a)[3] + "]"))
        } else groupSelectSelected($("#convertFrom .select-items div").eq(0)), groupSelectSelected($("#convertTo .select-items div").eq(1))
    },
    fixGivenArray: function(a) {
        for (var e = 0; e < a.length; e++) {
            var f = a[e];
            "" != f && 0 > f.indexOf("=") && (a[e - 1] = a[e - 1] + "," + f, a.splice(e, 1), e--)
        }
    },
    installBehavior: function() {
        var a =
            this;
        isUserLoggedIn() && 1 == a.subscribed && $("#click-capture").addClass("click-capture-subscribed");
        $("body").on("click", "#click-capture", function() {
            if (!isUserLoggedIn() || 0 == _.subscribed) return showSignUpSubscribe("Solver\tVerify"), !1
        });
        $("body").on("click", ".toggle_interim img", function(f) {
            $(f.currentTarget).parent().parent().find(".solution_title_container").click()
        });
        $(".nl-topSubMenu a").click(function() {
            syMenu("Top", $(this).attr("href"))
        });
        $(".nl-leftMenu").click(function() {
            syMenu("Left", $(this).attr("href"))
        });
        var e = a.subject;
        "" == e && (e = "algebra");
        e = a.page;
        "" == e && (e = "equation-calculator");
        $(".interPageLink").click(function(f) {
            symbolab_log("Solutions", "PageLinkClick", $(f.currentTarget).text())
        });
        $(".btn-custom.search").text(i18n("go button"));
        $("#fullPadLink").click(function(f) {
            a.switchPad(f.currentTarget.innerHTML);
            isUserLoggedIn() ? showPointOfInterest("#fullPadLink", i18n("js.set preferred pad here")) : createSignupTooltipOnly($("#fullPadLink"), "#fullPadLink", "SolverPadSwitch", i18n("js.to set your preferred pad"),
                "top")
        });
        $("button.structured_search").click(function(f) {
            a.doStructuredSearch()
        });
        $("button.convert_search").click(function(f) {
            a.doConversionSearch()
        });
        $("#verify-input").unbind("keyup").keyup(function(f) {
            13 === (f.charCode ? f.charCode : f.keyCode) && a.verify($(this).parent().find("button"), "SolutionPage", a.query)
        });
        $(".verify-button").click(function(f) {
            a.verify($(this), "SolutionPage", a.query)
        });
        $(".structuredWhat").click(function() {
            $(".structuredWhat").removeClass("selectedWhat");
            $(this).addClass("selectedWhat");
            var f = $(this).text();
            $(".givenDiv").hide();
            var b = $(this).attr("data");
            $(b).show();
            $(b).find(".mathquill-editable").eq(0).focus();
            $(b).find(".mathquill-editable").each(function() {
                var g = $(this).attr("placeholder");
                g && $(this).mathquill("placeholder", g)
            });
            (b = $(b).find(".hidden-image").text()) && $("#structuredTop .structured_image").attr("src", b);
            $("#multipleSolutions").toggle(f === a.structuredWhat)
        });
        $(".typeTD").click(function() {
            $(this).siblings().removeClass("chosen");
            $(this).addClass("chosen")
        });
        $(".sprite_pad_input.structured").tooltipster({
            theme: "tooltipster-light",
            trigger: "click",
            arrow: !1,
            side: "top",
            functionPosition: function(f, b, g) {
                g.coord.left -= 150;
                return g
            },
            interactive: !0,
            functionBefore: function(f, b) {
                var g = $('<table id="buttonsTable" class="noselect"><tbody><tr><td class="padButton new-pad-button font16" data-append="^" data-moveleft="1"><span class="mathquill-embedded-latex">x^{\\msquare}</span></td><td class="padButton new-pad-button font16" data-append="_" data-moveleft="1"><span class="mathquill-embedded-latex">x_{\\msquare}</span></td><td class="padButton new-pad-button font16" data-append="\\frac{}{}" data-moveleft="2"><span class="mathquill-embedded-latex">\\frac{\\msquare}{\\msquare}</span></td><td class="padButton new-pad-button font16" data-append="\\sqrt" data-moveleft="1"><span class="mathquill-embedded-latex">\\sqrt{\\square}</span></td><td class="padButton new-pad-button font16" data-append="\\pi" data-moveleft="0"><span class="mathquill-embedded-latex">\\pi</span></td></tr></tbody></table>');
                g.find(".mathquill-embedded-latex").mathquill();
                void 0 != SYPAD && (SYPAD.activeInputBox = $(b.origin).parents(".givenInput").find(".mathquill-editable"));
                f.content(g);
                $(b.origin).removeClass("sprite_pad_input");
                $(b.origin).addClass("sprite_pad_input_green")
            },
            functionAfter: function(f, b) {
                $(b.origin).addClass("sprite_pad_input");
                $(b.origin).removeClass("sprite_pad_input_green")
            }
        });
        $(".sprite_pad_input.converters").tooltipster({
            theme: "tooltipster-light",
            trigger: "click",
            arrow: !1,
            side: "top",
            interactive: !0,
            functionBefore: function(f,
                b) {
                var g = $('<table id="buttonsTable" class="noselect"><tbody><tr><td class="padButton new-pad-button font16" data-append="^" data-moveleft="1"><span class="mathquill-embedded-latex">x^{\\msquare}</span></td><td class="padButton new-pad-button font16" data-append="\\frac{}{}" data-moveleft="2"><span class="mathquill-embedded-latex">\\frac{\\msquare}{\\msquare}</span></td><td class="padButton new-pad-button font16" data-append="\\sqrt" data-moveleft="1"><span class="mathquill-embedded-latex">\\sqrt{\\square}</span></td></tr></tbody></table>');
                g.find(".mathquill-embedded-latex").mathquill();
                g.find(".padButton").click(function() {
                    SYPAD.padButtonClick(this)
                });
                void 0 != SYPAD && (SYPAD.activeInputBox = $(b.origin).parents(".givenInput").find(".mathquill-editable"));
                f.content(g);
                $(b.origin).removeClass("sprite_pad_input");
                $(b.origin).addClass("sprite_pad_input_green")
            },
            functionAfter: function(f, b) {
                $(b.origin).addClass("sprite_pad_input");
                $(b.origin).removeClass("sprite_pad_input_green")
            }
        });
        $(".arrow_right").click(function(f) {
            f = f.currentTarget;
            var b =
                f.childNodes[0].childNodes[0],
                g = !1;
            let h = $(f).parent().next("ul");
            0 < $(b).attr("href").indexOf("arrow_right-svg") && (g = !0);
            $(f).closest("ul").eq(0).find("ul").hide();
            $(f).closest("ul").eq(0).find(".arrow_right svg use").attr("href", "#arrow_right-svg");
            g && ($(b).attr("href", "#arrow_down-svg"), h.eq(0).removeClass("hide"), h.eq(0).slideToggle(300))
        });
        $("body").on("click", ".nl-notesFav", function() {
            var f = $(this);
            if (isUserLoggedIn())
                if (f.hasClass("nl-notesFavSaved")) $.when(_.deleteNote(SOLUTIONS.query)).done(function() {
                    f.toggleClass("nl-notesFavSaved");
                    symbolab_log("Solutions", "FavoriteDelete", SOLUTIONS.query)
                });
                else {
                    var b = _.saveSolutionNote(SOLUTIONS.query, _.stepsRes.topic);
                    $.when(b).done(function(g) {
                        g && subscribed ? showPointOfInterest(".nl-notesFav", g, {
                            onDismiss: function() {}
                        }) : g ? createUpgradeTooltip(".nl-notesFav", "SolverSaveNote", g) : f.toggleClass("nl-notesFavSaved")
                    })
                }
            else createSignupTooltip(".nl-notesFav ", "SolverSaveNote", i18n("to save notes and more"));
            symbolab_log("Solutions", "SaveClicked", null, !1, SOLUTIONS.query)
        });
        $("body").off("click",
            "#PlotLink, #ExamplesLink").on("click", "#PlotLink, #ExamplesLink", function(f) {
            f.preventDefault();
            f = $(this).attr("href");
            $(f).get(0).scrollIntoView({
                behavior: "smooth",
                block: "start",
                inline: "start"
            })
        })
    },
    verify: function(a, e, f) {
        var b = this;
        b.verifying || (b.verifying = !0, a.parent().find(".nl-answerCaption").hide(), a.parent().find(".nl-answerCaption.not-ready").show(), $.ajax({
            type: "GET",
            url: "/api/verifySolution",
            beforeSend: authorizeAjaxWithSyPubToken,
            data: {
                problem: f,
                solution: a.parent().find("#verify-input").mathquill("latex"),
                or: e
            },
            success: function(g) {
                a.parent().find(".nl-answerCaption").hide();
                g.correct ? a.parent().find(".nl-answerCaption.nl-greenText").show() : g.partiallyCorrect ? (a.parent().find(".nl-answerCaption.nl-goldText span").eq(0).text(g.userMessage), a.parent().find(".nl-answerCaption.nl-goldText").show()) : a.parent().find(".nl-answerCaption.nl-redText").show()
            },
            error: function(g) {
                a.parent().find(".nl-answerCaption").hide();
                a.parent().find(".nl-answerCaption.nl-redText").show()
            },
            complete: function() {
                b.verifying = !1
            }
        }))
    }
};
(function(a) {
    function e() {
        this.initialize.apply(this, arguments)
    }

    function f(h, m, l) {
        function n(z, C, D, x, A) {
            var q = Math.round(x / 1.7320508);
            C.inactive()["setBorder" + D.camel.pos.f](x)["setBorder" + D.camel.pos.c1](q)["setBorder" + D.camel.pos.c2](q)["set" + D.camel.pos.p1](D.isTopLeft ? -x : z.inner[D.size.p])["set" + D.camel.pos.c1](z.inner[D.size.c] / 2 - q).active().$.css("border-" + D.pos.f + "-color", A)
        }
        m.stop(!0, !0);
        var u = {
            position: "absolute",
            height: "0",
            width: "0",
            border: "solid 0 transparent"
        };
        var p = new e(h),
            t = new e(m);
        t.setTop(-l.offsetY + (l.position && 0 <= l.position.indexOf("top") ? p.top - t.height : l.position && 0 <= l.position.indexOf("bottom") ? p.bottom : p.center.top - t.height / 2));
        t.setLeft(l.offsetX + (l.position && 0 <= l.position.indexOf("left") ? p.left - t.width : l.position && 0 <= l.position.indexOf("right") ? p.right : p.center.left - t.width / 2));
        if (0 < l.tipSize) {
            m.data("outerTip") && (m.data("outerTip").remove(), m.removeData("outerTip"));
            m.data("innerTip") && (m.data("innerTip").remove(), m.removeData("innerTip"));
            h = new e(a("<div>").css(u).appendTo(m));
            u = new e(a("<div>").css(u).appendTo(m));
            for (var w, v = 0; v < g.pos.length; v++) {
                w = g.getRelativeNames(v);
                if (t.center[w.pos.c1] >= p[w.pos.c1] && t.center[w.pos.c1] <= p[w.pos.c2])
                    if (0 == v % 2) {
                        if (t[w.pos.o] >= p[w.pos.o] && t[w.pos.f] >= p[w.pos.f]) break
                    } else if (t[w.pos.o] <= p[w.pos.o] && t[w.pos.f] <= p[w.pos.f]) break;
                w = null
            }
            w ? (t["set" + w.camel.pos.p1](t[w.pos.p1] + (w.isTopLeft ? 1 : -1) * (l.tipSize - t["border" + w.camel.pos.o])), n(t, h, w, l.tipSize, m.css("border-" + w.pos.o + "-color")), n(t, u, w, l.tipSize - 2 * t["border" + w.camel.pos.o], m.css("background-color")),
                m.data("outerTip", h.$).data("innerTip", u.$)) : a.each([h.$, u.$], function() {
                this.remove()
            })
        }
    }

    function b(h, m) {
        h = h.data("balloon") && h.data("balloon").get(0);
        return !(h && (h === m.relatedTarget || a.contains(h, m.relatedTarget)))
    }
    var g = {};
    g.pos = a.extend(["top", "bottom", "left", "right"], {
        camel: ["Top", "Bottom", "Left", "Right"]
    });
    g.size = a.extend(["height", "width"], {
        camel: ["Height", "Width"]
    });
    g.getRelativeNames = function(h) {
        h = {
            pos: {
                o: h,
                f: 0 == h % 2 ? h + 1 : h - 1,
                p1: 0 == h % 2 ? h : h - 1,
                p2: 0 == h % 2 ? h + 1 : h,
                c1: 2 > h ? 2 : 0,
                c2: 2 > h ? 3 : 1
            },
            size: {
                p: 2 >
                    h ? 0 : 1,
                c: 2 > h ? 1 : 0
            }
        };
        var m = {},
            l;
        for (l in h) {
            m[l] || (m[l] = {});
            for (var n in h[l]) m[l][n] = g[l][h[l][n]], m.camel || (m.camel = {}), m.camel[l] || (m.camel[l] = {}), m.camel[l][n] = g[l].camel[h[l][n]]
        }
        m.isTopLeft = m.pos.o == m.pos.p1;
        return m
    };
    (function() {
        function h(n, u) {
            if (void 0 == u) return h(n, !0), h(n, !1);
            u = g.getRelativeNames(u ? 0 : 2);
            n[u.size.p] = n.$["outer" + u.camel.size.p]();
            n[u.pos.f] = n[u.pos.o] + n[u.size.p];
            n.center[u.pos.o] = n[u.pos.o] + n[u.size.p] / 2;
            n.inner[u.pos.o] = n[u.pos.o] + n["border" + u.camel.pos.o];
            n.inner[u.size.p] =
                n.$["inner" + u.camel.size.p]();
            n.inner[u.pos.f] = n.inner[u.pos.o] + n.inner[u.size.p];
            n.inner.center[u.pos.o] = n.inner[u.pos.f] + n.inner[u.size.p] / 2;
            return n
        }
        var m = {
            setBorder: function(n, u) {
                return function(p) {
                    this.$.css("border-" + n.toLowerCase() + "-width", p + "px");
                    this["border" + n] = p;
                    return this.isActive ? h(this, u) : this
                }
            },
            setPosition: function(n, u) {
                return function(p) {
                    this.$.css(n.toLowerCase(), p + "px");
                    this[n.toLowerCase()] = p;
                    return this.isActive ? h(this, u) : this
                }
            }
        };
        e.prototype = {
            initialize: function(n) {
                this.$ = n;
                a.extend(!0, this, this.$.offset(), {
                    center: {},
                    inner: {
                        center: {}
                    }
                });
                for (n = 0; n < g.pos.length; n++) this["border" + g.pos.camel[n]] = parseInt(this.$.css("border-" + g.pos[n] + "-width")) || 0;
                this.active()
            },
            active: function() {
                this.isActive = !0;
                h(this);
                return this
            },
            inactive: function() {
                this.isActive = !1;
                return this
            }
        };
        for (var l = 0; l < g.pos.length; l++) e.prototype["setBorder" + g.pos.camel[l]] = m.setBorder(g.pos.camel[l], 2 > l), 0 == l % 2 && (e.prototype["set" + g.pos.camel[l]] = m.setPosition(g.pos.camel[l], 2 > l))
    })();
    a.fn.balloon = function(h) {
        return this.one("mouseenter",
            function(m) {
                var l = a(this),
                    n = this,
                    u = l.unbind("mouseenter", arguments.callee).showBalloon(h).mouseenter(function(p) {
                        b(l, p) && l.showBalloon()
                    }).data("balloon");
                u && u.mouseleave(function(p) {
                    n === p.relatedTarget || a.contains(n, p.relatedTarget) || l.hideBalloon()
                }).mouseenter(function(p) {
                    u.stop(!0, !0);
                    l.showBalloon()
                })
            }).mouseleave(function(m) {
            var l = a(this);
            b(l, m) && l.hideBalloon()
        })
    };
    a.fn.showBalloon = function(h) {
        var m, l, n;
        if (h || !this.data("options")) null === a.balloon.defaults.css && (a.balloon.defaults.css = {}), this.data("options",
            a.extend(!0, {}, a.balloon.defaults, h || {}));
        h = this.data("options");
        return this.each(function() {
            var u;
            m = a(this);
            (n = m.data("offTimer")) && clearTimeout(n);
            var p = a.isFunction(h.contents) ? h.contents() : h.contents || (h.contents = m.attr("title") || m.attr("alt"));
            (u = !(l = m.data("balloon"))) && (l = a("<div>").append(p));
            if (h.url || l && "" != l.html()) !u && p && p != l.html() && l.empty().append(p), m.removeAttr("title"), h.url && l.load(a.isFunction(h.url) ? h.url(this) : h.url, function(t, w, v) {
                h.ajaxComplete && h.ajaxComplete(t, w, v);
                f(m, l,
                    h)
            }), u ? (l.addClass(h.classname).css(h.css || {}).css({
                visibility: "hidden",
                position: "absolute"
            }).appendTo("body"), m.data("balloon", l), f(m, l, h), l.hide().css("visibility", "visible")) : f(m, l, h), h.showAnimation ? h.showAnimation.apply(l.stop(!0, !0), [h.showDuration, h.showComplete]) : l.show(h.showDuration, function() {
                this.style.removeAttribute && this.style.removeAttribute("filter");
                h.showComplete && h.showComplete.apply(l)
            })
        })
    };
    a.fn.hideBalloon = function() {
        var h = this.data("options"),
            m, l;
        return this.data("balloon") ?
            this.each(function() {
                var n = a(this);
                (m = n.data("onTimer")) && clearTimeout(m);
                (l = n.data("offTimer")) && clearTimeout(l);
                n.data("offTimer", setTimeout(function() {
                    var u = n.data("balloon");
                    h.hideAnimation ? u && h.hideAnimation.apply(u.stop(!0, !0), [h.hideDuration, h.hideComplete]) : u && u.stop(!0, !0).hide(h.hideDuration, h.hideComplete)
                }, h.minLifetime))
            }) : this
    };
    a.balloon = {
        defaults: {
            contents: null,
            url: null,
            ajaxComplete: null,
            classname: null,
            position: "top",
            offsetX: 0,
            offsetY: 0,
            tipSize: 12,
            delay: 0,
            minLifetime: 200,
            showDuration: 100,
            showAnimation: null,
            hideDuration: 80,
            hideAnimation: function(h) {
                this.fadeOut(h)
            },
            showComplete: null,
            hideComplete: null,
            css: {
                minWidth: "20px",
                padding: "4px 8px",
                borderRadius: "8px",
                boxShadow: "0px 1px 8px 0px rgba(0, 0, 0, 0.16)",
                color: "white",
                backgroundColor: "rgba(122, 135, 149, 0.80)",
                opacity: a.support.opacity ? "0.85" : null,
                zIndex: "32767",
                textAlign: "left",
                fontWeight: "500",
                fontSize: "10.5pt"
            }
        }
    }
})(jQuery);

function isInteger(a) {
    return (a ^ 0) === a
}

function calcEps() {
    var a = 1;
    do {
        var e = a;
        a /= 2;
        var f = 1 + a
    } while (1 < f);
    return e
}
Math.log10 = function(a) {
    return Math.log(a) / Math.log(10)
};
SyCalc = new SyCalc;

function SyPlot(a, e, f) {
    this.graphJQ = $(a);
    this.graph = this.graphJQ.get(0);
    this.width = this.graphJQ.width();
    this.height = this.graphJQ.height();
    this.plotInfo = e;
    this.charHeight = 8;
    this.startDrag = {
        x: 0,
        y: 0
    };
    this.mouseButton = 0;
    this.quality = 2;
    this.variable = this.plotInfo ? this.plotInfo.variable : "x";
    this.zoomOutFactor = .45;
    this.zoomInFactor = .382;
    this.allFuncVals = [];
    this.funcsXpos = [];
    this.funcsYpos = [];
    this.funcXvals = [];
    this.drawFuncs = [];
    this.balloonShowed = !1;
    this.tablePoints = [];
    this.tablePointsText = [];
    this.pointsDraw = [];
    this.pointsDrawAttr = [];
    this.pointsDrawText = [];
    this.functionsInfo = [];
    this.eps = calcEps();
    this.options = $.extend({}, {
        showSettings: !1,
        showZoom: !1,
        showBalloons: !1,
        lineWidth: 1,
        pixelRatio: 1,
        proximity: 10,
        mouseEvents: !0,
        yBalloonOffset: 0,
        allowTouch: !0,
        greenBackground: !1,
        dontDrawPoints: !1
    }, f);
    sy_graphSettings.init(this.options, this);
    this.float_fix = function(b) {
        return Math.round(1E7 * b + 5E-8) / 1E7
    };
    this.roundCoord = function(b) {
        return .1 > Math.abs(b) ? b.toPrecision(2) : b.toFixed(2)
    };
    this.getProportionalYValue = function(b) {
        return b /
            this.width * this.height
    };
    this.getPointFromEvent = function(b) {
        let g = b.offsetX;
        var h = b.offsetY;
        if (void 0 === g || void 0 === h) b.target ? (h = b.target.getBoundingClientRect(), g = b.originalEvent.touches[0].clientX - h.left, h = b.originalEvent.touches[0].clientY - h.top) : (g = b.pageX, h = b.pageY);
        return [g, h]
    };
    this.init = function(b, g, h) {
        this.allFuncs = {};
        if (this.graph.getContext) {
            this.ctx = this.graph.getContext("2d");
            this.ctx.lineWidth = 2;
            this.adjustedWidth = b * h;
            this.adjustedHeight = g * h;
            this.graphJQ.attr("height", this.adjustedHeight);
            this.graphJQ.attr("width", this.adjustedWidth);
            this.ctx.scale(h, h);
            h = -10;
            var m = 10,
                l = -10,
                n = 10,
                u = this.plotInfo ? this.plotInfo.localBoundingBox : void 0;
            u && (h = Math.max(u.xMin, -1E6), m = Math.min(u.xMax, 1E6), l = Math.max(u.yMin, -1E6), n = Math.min(u.yMax, 1E6));
            b /= g;
            g = Math.abs(m - h) / 2;
            u = Math.abs(n - l) / 2;
            var p = g / u;
            b < p ? u = g / b : g = u * b;
            var t = 0;
            if (b < p || 0 < h + g / 2 || 0 > m - g / 2) t = (m + h) / 2;
            var w = 0;
            if (b >= p || 0 < l + u / 2 || 0 > n - u / 2) w = (n + l) / 2;
            h = t - g;
            m = t + g;
            l = w - u;
            n = w + u;
            sy_graphSettings.defaultSettings.x1 = this.roundCoord(h);
            sy_graphSettings.defaultSettings.x2 =
                this.roundCoord(m);
            sy_graphSettings.defaultSettings.y1 = this.roundCoord(l);
            sy_graphSettings.defaultSettings.y2 = this.roundCoord(n);
            this.currCoord = {
                x1: h,
                x2: m,
                y1: l,
                y2: n
            };
            var v = this;
            this.options.mouseEvents && (this.graphJQ.off("mousemove touchmove").on("mousemove touchmove", function(z) {
                let [C, D] = v.getPointFromEvent(z);
                v.options.allowTouch && (2 === v.mouseButton ? (z = v.findClosestPoint(C, D, v.funcsXpos[v.currentFunctionIndex], v.funcsYpos[v.currentFunctionIndex]), C = v.roundCoord(v.getXvalue(z.x)), D = v.roundCoord(v.getYvalue(z.y)),
                    v.clearBalloons(), v.showBalloon(v.functionsInfo[v.currentFunctionIndex], xCanvas, yCanvas), $(".plotBalloon span").eq(0).append("<p class='ballon-cord'>(" + C + "," + D + ")</p>"), v.ctx.drawImage(v.canvasImg, 0, 0), v.ctx.beginPath(), v.ctx.fillStyle = v.plotInfo.funcsToDraw.funcs[v.currentFunctionIndex].attributes.color, v.ctx.arc(z.x, z.y, 4, 0, 2 * Math.PI, !1), v.ctx.fill()) : 1 === v.mouseButton ? ($("#sy_graph").css("cursor", "move"), v.movePlot(C - v.startDrag.x, D - v.startDrag.y), v.startDrag.x = C, v.startDrag.y = D) : v.checkMove(C,
                    D))
            }), this.graphJQ.unbind("mouseleave").mouseleave(function() {
                2 === v.mouseButton && (v.clearBalloons(), v.ctx.drawImage(v.canvasImg, 0, 0));
                v.mouseButton = 0
            }), this.graphJQ.off("mousedown touchstart").on("mousedown touchstart", function(z) {
                if (v.options.allowTouch) {
                    z.preventDefault();
                    v.mouseDown(z);
                    if (v.plotInfo && v.plotInfo.funcsToDraw && v.plotInfo.funcsToDraw.funcs) {
                        var [C, D] = v.getPointFromEvent(z);
                        z = !1;
                        for (var x in v.pointsDraw) {
                            var A = v.getCoord(v.pointsDraw[x].x, v.pointsDraw[x].y);
                            if (v.isPointInProximity(C,
                                    D, A.x, A.y, 5)) {
                                var q = [];
                                void 0 != v.currentFunctionIndex && q.push(v.currentFunctionIndex);
                                for (x = 0; x < v.funcsYpos.length; x++) q.push(x);
                                A = !0;
                                for (x = 0; x < q.length && A; x++)
                                    for (var r = v.funcsYpos[q[x]], y = v.funcsXpos[q[x]], B = 0; B < y.length; B++)
                                        if (v.isPointInProximity(C, D, y[B], r[B], 10)) {
                                            v.currentFunctionIndex = q[x];
                                            A = !1;
                                            break
                                        } z = !0;
                                break
                            }
                        }
                        q = [];
                        void 0 != v.currentFunctionIndex && q.push(v.currentFunctionIndex);
                        for (var E in v.funcsYpos) v.funcsYpos.hasOwnProperty(E) && q.push(E);
                        A = !0;
                        for (x = 0; x < q.length && !z && A; x++)
                            for (r = v.funcsYpos[q[x]],
                                y = v.funcsXpos[q[x]], B = 0; B < y.length; B++)
                                if (v.isPointInProximity(C, D, y[B], r[B], 10)) {
                                    A = v.findClosestPoint(C, D, y, r);
                                    v.currentFunctionIndex = q[x];
                                    v.roundCoord(v.getXvalue(A.x));
                                    v.roundCoord(v.getYvalue(A.y));
                                    A = !1;
                                    break
                                }
                    }
                    v.mouseButton = 1
                }
            }), $("#graph").off("mouseup touchend").on("mouseup touchend", function(z) {
                v.options.allowTouch && (2 === v.mouseButton && (v.ctx.drawImage(v.canvasImg, 0, 0), $(".ballon-cord").remove()), v.mouseUp(z))
            }), this.graphJQ.off("mouseup touchend").on("mouseup touchend", function(z) {
                if (2 ===
                    v.mouseButton) {
                    v.ctx.drawImage(v.canvasImg, 0, 0);
                    $(".ballon-cord").remove();
                    v.canvasX = $("canvas").offset().left;
                    v.canvasY = $("canvas").offset().top;
                    const [C, D] = v.getPointFromEvent(z);
                    v.checkMove(C + 1, D + 1)
                }
                v.mouseUp(z)
            }))
        } else alert(i18n("js.Sorry, your browser is not supported."))
    };
    this.mobileTouchPlot = function(b, g) {
        this.checkMove(b, g)
    };
    this.mobileMovePlot = function(b, g) {
        this.movePlot(b, g)
    };
    this.movePlot = function(b, g) {
        var h = this.getScale();
        this.currCoord.x1 -= b / h.x;
        this.currCoord.x2 -= b / h.x;
        this.currCoord.y1 +=
            g / h.y;
        this.currCoord.y2 += g / h.y;
        sy_graphSettings.updateCoordinates();
        this.checkResetNeeded(!0);
        this.draw(!1)
    };
    this.donePanning = function() {
        this.draw(!0)
    };
    this.arbRound = function(b, g) {
        return Math.round(b / g) * g
    };
    this.arbFloor = function(b, g) {
        return Math.floor(b / g) * g
    };
    this.copyCoord = function(b) {
        return {
            x1: b.x1,
            x2: b.x2,
            y1: b.y1,
            y2: b.y2
        }
    };
    this.clearScreen = function() {
        this.ctx.fillStyle = this.options.greenBackground ? "#009490" : "rgb(255,255,255)";
        this.ctx.fillRect(0, 0, this.width, this.height)
    };
    this.drawVerticalLine =
        function(b, g, h) {
            this.setCtxStyle(g);
            this.ctx.lineWidth = 1 == g.isAsymptote ? 1 : this.options.lineWidth;
            this.ctx.beginPath();
            g = this.getCoord(b, this.currCoord.y2);
            b = this.getCoord(b, this.currCoord.y1);
            this.ctx.moveTo(g.x, g.y);
            this.ctx.lineTo(b.x, b.y);
            this.ctx.stroke();
            this.defaultCtxStyle()
        };
    this.drawLineSegment = function(b) {
        this.setCtxStyle(b.attributes);
        this.ctx.beginPath();
        var g = this.getCoord(this.evalForm(b.p1x), this.evalForm(b.p1y));
        b = this.getCoord(this.evalForm(b.p2x), this.evalForm(b.p2y));
        this.ctx.moveTo(g.x,
            g.y);
        this.ctx.lineTo(b.x, b.y);
        this.ctx.stroke();
        this.defaultCtxStyle()
    };
    this.adjustAttr = function(b) {
        "PURPLE" === b.color && (b.color = "#006666");
        "PURPLE" === b.borderColor && (b.borderColor = "#006666")
    };
    this.setCtxStyle = function(b) {
        this.adjustAttr(b);
        this.options.greenBackground ? (this.ctx.strokeStyle = "#fff", this.ctx.setLineDash([]), this.ctx.lineWidth = 2) : (this.ctx.strokeStyle = b.color, "DASH" == b.lineType ? (this.ctx.setLineDash([5, 10]), this.ctx.lineWidth = 1) : "DOT" == b.lineType ? (this.ctx.setLineDash([2, 4]), this.ctx.lineWidth =
            2) : "BOLD" == b.lineType ? this.ctx.lineWidth = 4 : "NORMAL" == b.lineType && (this.ctx.lineWidth = 1))
    };
    this.defaultCtxStyle = function() {
        this.ctx.setLineDash([]);
        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = "#000000"
    };
    this.drawPoint = function(b, g, h, m) {
        this.options.dontDrawPoints || (b = this.getCoord(b, g), this.ctx.beginPath(), this.ctx.fillStyle = this.options.greenBackground ? "#00625F" : h, m ? (this.ctx.strokeStyle = m, this.ctx.arc(b.x, b.y, 4, 0, 2 * Math.PI, !1), this.ctx.fill(), this.ctx.stroke()) : (this.ctx.arc(b.x, b.y, 4, 0, 2 * Math.PI,
            !1), this.ctx.fill()))
    };
    this.drawGrid = function() {
        this.clearScreen();
        var b = this.currCoord.x1 = parseFloat(sy_graphSettings.cur().x1),
            g = this.currCoord.x2 = parseFloat(sy_graphSettings.cur().x2),
            h = this.currCoord.y1 = parseFloat(sy_graphSettings.cur().y1),
            m = this.currCoord.y2 = parseFloat(sy_graphSettings.cur().y2),
            l = g - b,
            n = .015 * this.width;
        i = 1E-12;
        for (c = 0; l / i > n - 1 && Infinity > i; c++) i = 1 == c % 3 ? 2.5 * i : 2 * i;
        n = this.float_fix(i);
        var u = this.float_fix(i / 5);
        this.ctx.font = "10pt 'open sans'";
        this.ctx.textAlign = "center";
        l = yaxis =
            null;
        var p = this.arbFloor(b, n),
            t = this.arbFloor(h, n),
            w = 1.5 * this.charHeight,
            v = -1;
        p = this.float_fix(p);
        t = this.float_fix(t);
        0 <= m && 0 >= h ? w = this.height - (0 - h) / (m - h) * this.height + 1.5 * this.charHeight : 0 < h && (w = this.height - 5);
        w > this.height - this.charHeight / 2 && (w = this.height - 5);
        0 <= g && 0 >= b ? v = (0 - b) / (g - b) * this.width - 2 : 0 > g && (v = this.width - 6);
        v < this.ctx.measureText(t).width + 1 && (v = -1);
        var z = p;
        for (i = 0; 1E4 > i;) {
            i++;
            xpos = (p - b) / (g - b) * this.width;
            if (xpos - .5 > this.width + 1 || isNaN(xpos)) break;
            if (!(0 > xpos)) {
                p = this.float_fix(p);
                0 == p &&
                    (l = xpos);
                var C = isInteger(this.float_fix((z - p) / n));
                this.ctx.fillStyle = this.options.greenBackground ? C ? "#29605E" : "#7CBCBB" : C ? "#bcbcbc" : "#eaeaea";
                this.ctx.fillRect(xpos - .5, 0, 1, this.height);
                this.ctx.fillStyle = "rgb(0,0,0)";
                0 != p && C && (C = this.ctx.measureText(p).width, xpos + .5 * C > this.width ? xpos = this.width - .5 * C + 1 : 0 > xpos - .5 * C && (xpos = .5 * C + 1), this.ctx.fillText(p, xpos, w))
            }
            p += u
        }
        this.ctx.textAlign = "right";
        b = t;
        for (i = 0;;)
            if (ypos = this.height - (t - h) / (m - h) * this.height, ypos - .5 > this.height + 1) t += u;
            else {
                if (0 > ypos || isNaN(ypos)) break;
                t = this.float_fix(t);
                0 == t && (yaxis = ypos);
                C = isInteger(this.float_fix((b - t) / n));
                this.ctx.fillStyle = this.options.greenBackground ? C ? "#29605E" : "#7CBCBB" : C ? "#bcbcbc" : "#eaeaea";
                this.ctx.fillRect(0, ypos - .5, this.width, 1);
                this.ctx.fillStyle = "black";
                0 != t && C && (g = this.ctx.measureText(t).width, ypos + this.charHeight / 2 > this.height && (ypos = this.height - this.charHeight / 2 - 1), 0 > ypos - 4 && (ypos = 4), p = v, -1 == v && (p = g + 1), this.ctx.fillText(t, p, ypos + 3));
                t += u;
                i++
            } h = m = !0;
        if (this.plotInfo && this.plotInfo.funcsToDraw)
            for (k in this.plotInfo.funcsToDraw.funcs) n =
                this.plotInfo.funcsToDraw.funcs[k], (u = n.attributes) && u.lineType && "NORMAL" !== u.lineType && ("y=0" === n.evalFormula ? h = !1 : "x=0" === n.evalFormula && (m = !1));
        l && (m && this.ctx.fillRect(l - .5, 0, 1, this.height), sy_graphSettings.cur() && sy_graphSettings.cur().yLabel && (m = this.ctx.measureText(sy_graphSettings.cur().yLabel).width, this.ctx.save(), this.ctx.translate(l + 15, 15), this.ctx.rotate(90 * Math.PI / 180), this.ctx.fillText(sy_graphSettings.cur().yLabel, m, 4), this.ctx.restore()));
        yaxis && (h && this.ctx.fillRect(0, yaxis - .5, this.width,
            1), sy_graphSettings.cur() && sy_graphSettings.cur().xLabel && this.ctx.fillText(sy_graphSettings.cur().xLabel, this.width - 15, yaxis - 15))
    };
    this.minYpos = function() {
        return 0
    };
    this.maxYpos = function() {
        return this.height
    };
    this.minXpos = function() {
        return 0
    };
    this.maxXpos = function() {
        return this.width
    };
    this.inCanvasY = function(b) {
        return b >= this.minYpos() && b <= this.maxYpos()
    };
    this.inCanvasX = function(b) {
        return b >= this.minXpos() && b <= this.maxXpos()
    };
    this.getCoord = function(b, g) {
        b = this.getXCoord(b);
        g = this.getYCoord(g);
        return {
            x: b,
            y: g
        }
    };
    this.getXCoord = function(b) {
        b = this.roundInfinities(b);
        return (b - this.currCoord.x1) / (this.currCoord.x2 - this.currCoord.x1) * this.width
    };
    this.getYCoord = function(b) {
        b = this.roundInfinities(b);
        return this.height - (b - this.currCoord.y1) / (this.currCoord.y2 - this.currCoord.y1) * this.height
    };
    this.roundInfinities = function(b) {
        return "-Infinity" == b || "-\\infty " == b ? -1E10 : "Infinity" == b || "\\infty " == b ? 1E10 : parseFloat(b)
    };
    this.getYInCanvas = function(b) {
        return b < this.minYpos() ? this.minYpos() : b > this.maxYpos() ? this.maxYpos() :
            b
    };
    this.getXInCanvas = function(b) {
        return b < this.minXpos() ? this.minXpos() : b > this.maxXpos() ? this.maxXpos() : b
    };
    this.getValue = function(b, g) {
        return {
            x: this.getXvalue(b),
            y: this.getYvalue(g)
        }
    };
    this.getXvalue = function(b) {
        var g = this.getScale();
        return b / g.x + this.currCoord.x1
    };
    this.getYvalue = function(b) {
        var g = this.getScale();
        return (this.height - b) / g.y + this.currCoord.y1
    };
    this.roundToEdge = function(b, g, h, m, l) {
        m = l >= m ? this.height : 0;
        g.push(h);
        b.push(m)
    };
    this.yposFromXpos = function(b, g) {
        var h = this.getScale();
        b = this.evalFunc(b,
            g / h.x + this.currCoord.x1);
        return this.height - (b - this.currCoord.y1) * h.y
    };
    this.inDomain = function(b, g) {
        return null == b ? !1 : null != b.xmin ? g < b.xmin || null != b.xmax && g > b.xmax ? !1 : !0 : null != b.xmax && g > b.xmax ? !1 : !0
    };
    this.drawFunction = function(b, g, h) {
        if (!b) return !1;
        try {
            this.yposFromXpos(b, 0)
        } catch (y) {
            return !1
        }
        var m = g.attributes;
        this.getScale();
        var l = !1,
            n = 0,
            u = 0,
            p = 0,
            t = -1,
            w = [],
            v = [],
            z = [],
            C = [],
            D = 1 / this.quality,
            x = 0,
            A = this.width + D;
        if (null != g.xmin) {
            var q = this.getXCoord(g.xmin);
            x < q && (x = q)
        }
        null != g.xmax && (q = this.getXCoord(g.xmax),
            A > q && (A = q + D));
        for (; x < A; x += D) {
            var r = v.length;
            q = this.yposFromXpos(b, x);
            if (this.inCanvasY(q)) {
                if (0 == l)
                    if (0 <= r && !isNaN(w[r - 1])) t = this.yposFromXpos(b, x + D), this.roundToEdge(w, v, x, t, q);
                    else {
                        if (0 <= r && isNaN(w[r - 1]))
                            for (t = v[r - 1], l = 0; 249 > l; ++l) t += D / 250, r = this.yposFromXpos(b, t), w.push(r), v.push(t)
                    }
                else l = q - t, l = 0 < l ? -1 : 0 > l ? 1 : 0, 0 !== n && (l == n ? (u += Math.abs(q - t), ++p) : (n = Math.abs(q - t), n > u && n > this.height / 1E3 && 2 < p && (this.roundToEdge(w, v, v[r - 1], w[r - 2], w[r - 1]), w.push(this.height + 1E3), v.push(x), t = this.yposFromXpos(b, x + D),
                    this.roundToEdge(w, v, x, t, q)), p = u = 0)), n = l;
                l = !0;
                t = q
            } else if (l) {
                if (!isNaN(q)) this.roundToEdge(w, v, v[r - 1], w[r - 2], w[r - 1]);
                else if (0 <= r)
                    for (t = v[r - 1], r = null, l = 0; 249 > l; ++l) t += D / 250, isNaN(r) ? (w.push(r), v.push(t)) : (r = this.yposFromXpos(b, t), isNaN(r) && null != g.xmax && x + D > A ? (w.push(this.getYCoord(this.evalFunc(b, g.xmax))), v.push(this.getXCoord(g.xmax))) : (w.push(r), v.push(t)));
                l = !1;
                t = -1;
                u = n = 0
            }
            w.push(q);
            v.push(x);
            C.push(q);
            z.push(x)
        }
        this.allFuncVals[h] = C;
        this.funcsYpos[h] = w;
        this.funcsXpos[h] = v;
        this.funcXvals[h] = z;
        this.drawFuncs[h] = b;
        this.setCtxStyle(m);
        this.ctx.beginPath();
        this.ctx.lineWidth = 1 == m.isAsymptote ? 1 : this.options.lineWidth;
        for (b = 0; b < w.length; ++b) q = w[b], x = v[b], this.inCanvasY(q) ? (0 == l && (this.ctx.beginPath(), this.ctx.moveTo(x, q)), this.ctx.lineTo(x, q), l = !0) : l && (this.ctx.stroke(), l = !1);
        this.ctx.stroke();
        this.defaultCtxStyle()
    };
    this.drawLines = function() {
        if (this.plotInfo && this.plotInfo.linesToDraw)
            for (var b in this.plotInfo.linesToDraw) this.drawLineSegment(this.plotInfo.linesToDraw[b])
    };
    this.drawFunctions =
        function() {
            if (this.plotInfo && this.plotInfo.funcsToDraw)
                for (var b in this.plotInfo.funcsToDraw.funcs) {
                    var g = this.plotInfo.funcsToDraw.funcs[b],
                        h = g.evalFormula,
                        m = g.attributes;
                    if (!m.isAsymptote || !sy_graphSettings.cur() || 0 != sy_graphSettings.cur().isDrawAsypmtotes.draw) {
                        var l = g.displayFormula,
                            n;
                        for (n in m.labels) l += "<br/>\\mathrm{" + m.labels[n] + "}";
                        this.functionsInfo.push(l);
                        0 === h.indexOf("y=") && (h = h.substring(2));
                        0 === h.indexOf(this.variable + "=") ? (h = h.substring(2), h = SyCalc.parseEquation(h, !0), g = SyParse.parse(h),
                            g = SyParse.evaluate(g), this.drawVerticalLine(g, m, b)) : (h = SyCalc.parseEquation(h, !0), this.drawFunction(h, g, b))
                    }
                }
        };
    this.drawPoints = function() {
        if (this.plotInfo && this.plotInfo.pointsToDraw)
            for (var b in this.plotInfo.pointsToDraw.pointsDecimal) {
                var g = this.plotInfo.pointsToDraw.pointsDecimal[b],
                    h = this.plotInfo.pointsToDraw.attributes[b],
                    m = "",
                    l = null,
                    n = null,
                    u = !1,
                    p;
                for (p in h.labels) {
                    var t = h.labelTypes[p],
                        w = !0;
                    "INTERCEPT" === t ? (w = sy_graphSettings.cur().isDrawAxisIntercepts.draw) && null == n && (n = t, l = h.labelColors[p]) :
                        "EXTREME" === t ? (w = sy_graphSettings.cur().isDrawExtreme.draw) && null == n && (n = t, l = h.labelColors[p]) : "INTERSECTION" === t ? (w = sy_graphSettings.cur().isDrawFunctionIntercepts.draw) && "SOLUTION" !== n && (n = t, l = h.labelColors[p]) : "SOLUTION" === t && "INTERSECTION" !== n ? (n = t, l = h.labelColors[p]) : null == n && (l = h.labelColors[p]);
                    w && (u = !0, h.labels[p] && (m += "<br/>\\mathrm{" + h.labels[p] + "}"))
                }
                u && (null == l || h.borderColor || (h = Object.assign({}, h), h.color = l), m = this.plotInfo.pointsToDraw.pointsLatex[b] + m, this.pointsDraw.push({
                    x: g.fst,
                    y: g.snd
                }), this.pointsDrawAttr.push(h), this.pointsDrawText.push(m))
            }
    };
    this.toPrecision = function(b, g) {
        if (0 == b) return 0;
        g = Math.pow(10, g - Math.round(Math.ceil(Math.log10(0 > b ? -b : b))));
        return Math.round(b * g) / g
    };
    this.isSamePoint = function(b, g) {
        return 1E-5 > Math.abs(b - g)
    };
    this.myIndexOf = function(b, g) {
        for (var h = 0; h < b.length; h++)
            if (this.isSamePoint(b[h].x, g.x) && this.isSamePoint(b[h].y, g.y)) return h;
        return -1
    };
    this.evalForm = function(b) {
        try {
            var g = SyCalc.parseEquation(b, !0);
            if ("" === g) return "undefined";
            var h = SyParse.parse(g);
            return SyParse.evaluate(h)
        } catch (m) {
            return "undefined"
        }
    };
    this.getCachedFunction = function(b) {
        var g = this.allFuncs[b];
        g || (g = {}, 0 <= b.indexOf(this.variable) ? g.variable = this.variable : 0 <= b.indexOf("x") ? g.variable = "x" : 0 <= b.indexOf("u") && (g.variable = "u"), g.parsedFunction = SyParse.parse(b), this.allFuncs[b] = g);
        return g
    };
    this.evalFunc = function(b, g) {
        b = this.getCachedFunction(b);
        if (void 0 === g) return SyParse.evaluate(b.parsedFunction);
        var h = {};
        h[b.variable] = g;
        return SyParse.evaluate(b.parsedFunction, h)
    };
    this.hasTrig =
        function(b) {
            return b.match(/(sin|tan|cos|csc|sec|cot)/) ? !0 : !1
        };
    this.hasE = function(b) {
        return b.match(/e.*\^/) ? !0 : !1
    };
    this.isInt = function(b) {
        return 0 === b % 1
    };
    this.findIntersection = function(b, g, h, m) {
        var l = (g + h) / 2;
        return .1 > Math.abs(l) && !0 !== m ? (b = b.replace(new RegExp("\\b" + this.variable + "\\b", "g"), "(" + this.variable + "+5)"), g = this.findIntersection(b, g - 5, h - 5, !0), !1 !== g ? g + 5 : !1) : this.newtonRaphson(b, l, g, h, !1)
    };
    this.findDerivativeIntersection = function(b, g, h, m) {
        var l = (g + h) / 2;
        return .1 > Math.abs(l) && 1 != m ? (b = b.replace(new RegExp("\\b" +
            this.variable + "\\b", "g"), "(" + this.variable + "+5)"), g = this.findDerivativeIntersection(b, g - 5, h - 5, !0), !1 !== g ? g + 5 : !1) : this.newtonRaphson(b, l, g, h, !0)
    };
    this.newtonRaphson = function(b, g, h, m, l) {
        for (var n = 0, u = 1; g >= h && g <= m && 30 > n++;) {
            u = l ? this.getDerivative(b, g) : this.evalFunc(b, g);
            if (1E-10 > Math.abs(u) && 1E-10 > Math.abs(g - p)) return g;
            var p = g,
                t = l ? this.get2ndDerivative(b, p) : this.getDerivative(b, p);
            if (0 == t || !isFinite(t)) break;
            g -= u / t
        }
        return 1E-10 > Math.abs(u) || 30 <= n ? g : !1
    };
    this.getDerivative = function(b, g) {
        for (var h = 0, m =
                g, l = 1 < m || -1 > m ? Math.sqrt(this.eps) * m : Math.sqrt(this.eps), n = this.evalFunc(b, m), u = [25], p = 0; p < u.length; p++) {
            var t = l * u[p],
                w = 1 / t;
            g = m + t;
            g = this.evalFunc(b, g);
            h += (g - n) * w;
            g = m - t;
            g = this.evalFunc(b, g);
            h += (n - g) * w
        }
        return h / (2 * u.length)
    };
    this.get2ndDerivative = function(b, g) {
        for (var h = 0, m = g, l = 1 < m || -1 > m ? Math.pow(this.eps, .25) * m : Math.pow(this.eps, .25), n = this.evalFunc(b, m), u = [25], p = 0; p < u.length; p++) {
            var t = l * u[p],
                w = 1 / (t * t);
            g = m + t;
            g = this.evalFunc(b, g);
            h += (g - n) * w;
            g = m - t;
            g = this.evalFunc(b, g);
            h += (g - n) * w
        }
        return h / u.length
    };
    this.fillAreas =
        function() {
            if (this.plotInfo) {
                for (var b in this.plotInfo.fills) {
                    var g = this.plotInfo.fills[b];
                    g.xIneq || g.yIneq || g.twoVar ? this.inequalityPlot(g) : this.fillPlot(g)
                }
                this.plotInfo.colorInequalityIntersection && this.colorIntersection(this.plotInfo.fills)
            }
        };
    this.inequalityPlot = function(b) {
        if (b.xIneq || b.yIneq)
            for (var g in b.ranges) {
                var h = b.ranges[g];
                if (b.xIneq) {
                    var m = this.getXInCanvas(this.getXCoord(h.fst));
                    var l = this.getXInCanvas(this.getXCoord(h.snd))
                } else l = this.getYInCanvas(this.getYCoord(h.fst)), m = this.getYInCanvas(this.getYCoord(h.snd));
                for (h = 1 / this.quality; m <= l; m += h) this.ctx.strokeStyle = b.color, this.ctx.beginPath(), b.xIneq ? (this.ctx.moveTo(m, this.minYpos()), this.ctx.lineTo(m, this.maxYpos())) : (this.ctx.moveTo(this.minXpos(), m), this.ctx.lineTo(this.maxXpos(), m)), this.ctx.stroke()
            } else if (b.twoVar)
                for (g = this.funcXvals[0], void 0 === g && (g = this.funcXvals[Object.keys(this.funcXvals)[0]]), l = 0; l < g.length; l++) {
                    m = g[l];
                    this.ctx.strokeStyle = b.color;
                    this.ctx.beginPath();
                    h = this.indexOfFunction(b.func);
                    h = this.allFuncVals[h][l];
                    h = this.fixYPosition(h);
                    var n = b.trueAboveLine ? 0 : this.height;
                    this.ctx.moveTo(m, h);
                    this.ctx.lineTo(m, n);
                    this.ctx.stroke()
                }
    };
    this.fillPlot = function(b) {
        for (var g = 0; g < b.funcIndices.length; g++) {
            var h = b.funcIndices[g],
                m = b.ranges[g],
                l = this.getXInCanvas(this.getXCoord(m.fst));
            m = this.getXInCanvas(this.getXCoord(m.snd));
            for (var n = this.funcXvals[this.funcXvals.length - 1], u = 0; u < n.length; u++) {
                var p = n[u];
                if (p >= l && p <= m) {
                    this.ctx.strokeStyle = b.color;
                    this.ctx.beginPath();
                    var t = this.allFuncVals[h.fst][u],
                        w = this.allFuncVals[h.snd][u];
                    t = this.getYInCanvas(t);
                    w = this.getYInCanvas(w);
                    this.ctx.moveTo(p, t);
                    this.ctx.lineTo(p, w);
                    this.ctx.stroke()
                }
            }
        }
    };
    this.colorIntersection = function(b) {
        var g = document.createElement("canvas").getContext("2d");
        g.width = 2;
        g.height = 2;
        g.fillStyle = this.options.greenBackground ? "#009490" : "rgb(255,255,255)";
        g.fillRect(0, 0, g.width, g.height);
        var h = 0;
        for (u in b) {
            var m = b[u];
            if (m.xIneq || m.yIneq || m.twoVar) {
                for (var l = 1 / this.quality, n = 0; n < g.width; n += l) g.strokeStyle = m.color, g.beginPath(), g.moveTo(n, 0), g.lineTo(n, g.height), g.stroke();
                h += 1
            }
        }
        if (1 <
            h) {
            b = g.getImageData(0, 0, 1, 1).data;
            g = [0, 0, 0, 255];
            h = this.ctx.getImageData(0, 0, this.graph.width, this.graph.height);
            var u = h.data;
            m = !1;
            for (l = 0; l < u.length; l += 16) n = this.slice(u, l, l + 4), this.closeEnough(n, b) ? (u[l] = g[0], u[l + 1] = g[1], u[l + 2] = g[2], u[l + 3] = g[3], m = !0) : m && this.closeEnough(n, b);
            this.ctx.putImageData(h, 0, 0)
        }
    };
    this.closeEnough = function(b, g) {
        return 7 <= Math.abs(b[0] - g[0]) || 7 <= Math.abs(b[1] - g[1]) || 7 <= Math.abs(b[2] - g[2]) || 7 <= Math.abs(b[3] - g[3]) ? !1 : !0
    };
    this.slice = function(b, g, h) {
        for (var m = [], l = g; l < h; l++) m[l -
            g] = b[l];
        return m
    };
    this.indexOfFunction = function(b) {
        for (var g in this.plotInfo.funcsToDraw.funcs)
            if (this.plotInfo.funcsToDraw.funcs[g].evalFormula == b) return g;
        return -1
    };
    this.fixYPosition = function(b) {
        return 0 > b ? 0 : b > this.height ? this.height : b
    };
    this.getScale = function() {
        return {
            x: this.width / (this.currCoord.x2 - this.currCoord.x1),
            y: this.height / (this.currCoord.y2 - this.currCoord.y1)
        }
    };
    this.getRange = function() {
        return {
            x: Math.abs(this.currCoord.x2 - this.currCoord.x1),
            y: Math.abs(this.currCoord.y2 - this.currCoord.y1)
        }
    };
    this.checkMove = function(b, g) {
        this.clearBalloons();
        this.balloonShowed = !1;
        var h = this.options.proximity;
        if (0 < this.pointsDraw.length)
            for (var m in this.pointsDraw) {
                var l = this.pointsDraw[m];
                l = this.getCoord(l.x, l.y);
                if (this.isPointInProximity(b, g, l.x, l.y, h)) {
                    this.showBalloon(this.pointsDrawText[m], l.x + 100, l.y);
                    return
                }
            }
        if (0 == this.balloonShowed && this.plotInfo) {
            for (m in this.plotInfo.linesToDraw) {
                l = this.plotInfo.linesToDraw[m];
                var n = this.getCoord(l.p1x, l.p1y),
                    u = this.getCoord(l.p2x, l.p2y);
                10 > this.pointSegmentDist(b,
                    g, n.x, n.y, u.x, u.y) && this.showBalloon(l.attributes.labels[0], b, g)
            }
            if (this.plotInfo.funcsToDraw && this.plotInfo.funcsToDraw.funcs) {
                l = [];
                void 0 != this.currentFunctionIndex && l.push(this.currentFunctionIndex);
                for (var p in this.funcsYpos) this.funcsYpos.hasOwnProperty(p) && l.push(p);
                for (m = 0; m < l.length; m++) {
                    p = this.funcsYpos[l[m]];
                    if (null == p) {
                        p = this.plotInfo.funcsToDraw.funcs[l[m]].evalFormula;
                        p = SyCalc.parseEquation(p.substring(2), !0);
                        if ("" === p) continue;
                        p = SyParse.parse(p);
                        p = SyParse.evaluate(p);
                        p = (p - this.currCoord.x1) /
                            (this.currCoord.x2 - this.currCoord.x1) * this.width;
                        this.isInProximity(p, b, h) && this.showBalloon(this.functionsInfo[l[m]], b, g)
                    } else
                        for (n = this.funcsXpos[l[m]], u = 0; u < n.length; u++)
                            if (this.isPointInProximity(b, g, n[u], p[u], h)) {
                                this.showBalloon(this.functionsInfo[l[m]], b, g);
                                n = this.findClosestPoint(b, g, n, this.funcsYpos[l[m]]);
                                p = this.roundCoord(this.getXvalue(n.x));
                                n = this.roundCoord(this.getYvalue(n.y));
                                $(".plotBalloon span").eq(0).append("<p class='ballon-cord'>(" + p + "," + n + ")</p>");
                                break
                            } if (this.balloonShowed) break
                }
                if (0 ==
                    this.balloonShowed)
                    for (m in this.plotInfo.funcsToDraw.funcs) p = this.funcsYpos[m], null == p && (p = this.plotInfo.funcsToDraw.funcs[m].evalFormula, p = SyCalc.parseEquation(p.substring(2), !0), "" !== p && (p = SyParse.parse(p), p = SyParse.evaluate(p), p = (p - this.currCoord.x1) / (this.currCoord.x2 - this.currCoord.x1) * this.width, this.isInProximity(p, b, h) && this.showBalloon(this.functionsInfo[m], b, g)))
            }
        }
    };
    this.pointSegmentDist = function(b, g, h, m, l, n) {
        var u = l - h,
            p = n - m,
            t = u * u + p * p,
            w = -1;
        0 != t && (w = ((b - h) * u + (g - m) * p) / t);
        0 > w || (1 < w ? (h = l, m =
            n) : (h += w * u, m += w * p));
        b -= h;
        g -= m;
        return Math.sqrt(b * b + g * g)
    };
    this.isPointInProximity = function(b, g, h, m, l) {
        return this.isInProximity(b, h, l) && this.isInProximity(g, m, l)
    };
    this.isInProximity = function(b, g, h) {
        b -= g;
        0 > b && (b *= -1);
        return b < h
    };
    this.findClosestPoint = function(b, g, h, m) {
        for (var l = 999999, n = null, u = null, p = 0; p < h.length; p++) {
            var t = Math.sqrt(Math.pow(b - h[p], 2) + Math.pow(g - m[p], 2));
            t < l && (l = t, n = h[p], u = m[p])
        }
        return {
            x: n,
            y: u
        }
    };
    this.clearBalloons = function() {
        $(".plotBalloon").hide()
    };
    this.clearPlotInfo = function() {
        this.pointsDraw = [];
        this.pointsDrawAttr = [];
        this.pointsDrawText = [];
        this.functionsInfo = []
    };
    this.showBalloon = function(b, g, h) {
        if ($.fn.showBalloon && b && 0 !== b.length) {
            this.balloonShowed = !0;
            h += this.options.yBalloonOffset;
            h *= -1;
            var m = "<div>";
            b = b.split("<br/>");
            for (var l in b) m += "<span class='mathquill-embedded-latex'>" + b[l] + "</span><br/>";
            this.graphJQ.showBalloon({
                contents: m + "</div>",
                position: "top left",
                classname: "plotBalloon",
                offsetX: g,
                offsetY: h,
                delay: 0,
                minLifetime: 0,
                showDuration: 0,
                hideDuration: 0,
                tipSize: 0,
                css: {
                    "max-width": "200px",
                    opacity: "1",
                    "z-index": "1100"
                }
            });
            $(".plotBalloon .mathquill-embedded-latex").mathquill()
        }
    };
    this.mouseDown = function(b) {
        0 === this.mouseButton && ([this.startDrag.x, this.startDrag.y] = this.getPointFromEvent(b))
    };
    this.mouseUp = function(b) {
        $("#sy_graph").css("cursor", "default");
        this.mouseButton = 0;
        this.donePanning()
    };
    this.zoomInOut = function(b, g) {
        const h = b ? 1 : -1,
            m = b ? this.zoomInFactor : this.zoomOutFactor;
        return new Promise(async l => {
            for (let n = m / 5; n <= m; n += m / 5) await this.zoom(h * m / 5, g, n > .95 * m), await this.sleep(20);
            l()
        })
    };
    this.sleep = function(b) {
        return new Promise(g => setTimeout(g, b))
    };
    this.getNewValue = function(b, g) {
        g = parseFloat($(g).val());
        return isFinite(g) ? g : b
    };
    this.checkResetNeeded = function(b) {
        sy_graphSettings.showHomeButton()
    };
    this.zoom = function(b, g, h) {
        var m = this.getRange(),
            l = jQuery.extend({}, this.currCoord);
        if (g) {
            const [u, p] = this.getPointFromEvent(g);
            g = 1 - p / this.height;
            var n = u / this.width;
            l.x1 += m.x * b * n;
            l.y1 += m.y * b * g;
            l.x2 -= m.x * b * (1 - n);
            l.y2 -= m.y * b * (1 - g)
        } else l.x1 += m.x * b, l.y1 += m.y * b, l.x2 -= m.x * b, l.y2 -= m.y * b;
        .1 >=
            l.x2 - l.x1 || .1 >= l.y2 - l.y1 || (this.currCoord = jQuery.extend({}, l), sy_graphSettings.updateCoordinates(), h && this.checkResetNeeded(!0), this.draw(!1, !1))
    };
    window.graphG = this;
    this.plotPoints = function() {
        for (var b = 0; b < this.pointsDraw.length; ++b) {
            var g = this.pointsDraw[b],
                h = this.pointsDrawAttr[b];
            this.adjustAttr(h);
            this.drawPoint(g.x, g.y, h.color, h.borderColor)
        }
    };
    this.draw = function(b, g) {
        this.clearBalloons();
        b && this.clearPlotInfo();
        this.drawGrid();
        this.drawFunctions();
        b && this.drawPoints();
        this.fillAreas();
        this.drawLines();
        if (b) {
            if (0 < this.tablePoints.length)
                for (b = 0; b < this.tablePoints.length; b++) this.pointsDraw.push(this.tablePoints[b]), this.pointsDrawText.push(this.tablePointsText[b]), this.pointsDrawAttr.push({
                    color: this.tablePointsColor,
                    borderColor: this.tablePointsColor
                });
            g || this.plotPoints()
        }
    };
    this.init(this.width, this.height, this.options.pixelRatio);
    this.draw(!0)
}

function SyCalc() {
    this.angles = "radians";
    this.loopcounter = 0;
    this.eps = calcEps();
    this.convAngles = function(a) {
        return "degrees" == this.angles ? Math.PI / 180 * a : "gradians" == this.angles ? Math.PI / 200 * a : a
    };
    this.convRadians = function(a) {
        return "degrees" == this.angles ? 180 * a / Math.PI : "gradians" == this.angles ? 200 * a / Math.PI : a
    };
    this.sin = function(a) {
        return Math.sin(SyCalc.convAngles(a))
    };
    this.cos = function(a) {
        return Math.cos(SyCalc.convAngles(a))
    };
    this.tan = function(a) {
        return Math.tan(SyCalc.convAngles(a))
    };
    this.sec = function(a) {
        return 1 /
            Math.cos(SyCalc.convAngles(a))
    };
    this.csc = function(a) {
        return 1 / Math.sin(SyCalc.convAngles(a))
    };
    this.cot = function(a) {
        return 1 / Math.tan(SyCalc.convAngles(a))
    };
    this.arcsin = function(a) {
        return SyCalc.convRadians(Math.asin(a))
    };
    this.arccos = function(a) {
        return SyCalc.convRadians(Math.acos(a))
    };
    this.arctan = function(a) {
        return SyCalc.convRadians(Math.atan(a))
    };
    this.arccsc = function(a) {
        return SyCalc.convRadians(Math.asin(1 / a))
    };
    this.arcsec = function(a) {
        return SyCalc.convRadians(Math.acos(1 / a))
    };
    this.arccot = function(a) {
        return SyCalc.convRadians(0 >
            a ? Math.atan(1 / a) + Math.PI : Math.atan(1 / a))
    };
    this.pow = function(a, e) {
        return Math.pow(a, e)
    };
    this.sinh = function(a) {
        a = Math.exp(a);
        return (a - 1 / a) / 2
    };
    this.cosh = function(a) {
        a = Math.exp(a);
        return (a + 1 / a) / 2
    };
    this.tanh = function(a) {
        a = Math.exp(2 * a);
        return (a - 1) / (a + 1)
    };
    this.sech = function(a) {
        a = Math.exp(a);
        return 2 / (a + 1 / a)
    };
    this.csch = function(a) {
        a = Math.exp(a);
        return 2 / (a - 1 / a)
    };
    this.coth = function(a) {
        a = Math.exp(2 * a);
        return (a + 1) / (a - 1)
    };
    this.arcsinh = function(a) {
        return Math.log(a + Math.sqrt(a * a + 1))
    };
    this.arccosh = function(a) {
        return Math.log(a +
            Math.sqrt(a * a - 1))
    };
    this.arctanh = function(a) {
        return Math.log((1 + a) / (1 - a)) / 2
    };
    this.arcsech = function(a) {
        return Math.log((1 + Math.sqrt(1 - a * a)) / a)
    };
    this.arccsch = function(a) {
        return Math.log((1 + Math.sqrt(a * a + 1)) / a)
    };
    this.arccoth = function(a) {
        return Math.log((a + 1) / (a - 1)) / 2
    };
    this.roundToSignificantFigures = function(a, e) {
        if (0 == a) return 0;
        d = Math.ceil(Math.log10(0 > a ? -a : a));
        power = e - d;
        magnitude = Math.pow(10, power);
        shifted = Math.round(a * magnitude);
        return shifted / magnitude
    };
    this.fixRoot = function(a) {
        for (var e; 0 <= (e = a.indexOf("\\sqrt["));) {
            var f =
                e + 6,
                b = this.getBlock(a, f, "[", "]");
            f += b.length;
            if ("]{" !== a.substr(f, 2)) break;
            f += 2;
            var g = this.getBlock(a, f, "{", "}");
            f += g.length + 1;
            1 < b.length && (b = "(" + b + ")");
            a = a.replace(a.substring(e, f), "(" + g + ")^{1/" + b + "}")
        }
        return a
    };
    this.parseEquation = function(a, e) {
        a = a.replace(/\\pi/g, "\u03c0");
        a = a.replace(/\\log_\{(.+?)\}\((.+?)\)/g, "(\\frac{\\ln($2)}{\\ln($1)})");
        a = a.replace(/\\ln(\\left\|.+?\\right\|)/g, "\\ln($1)");
        a = a.replace(/\\left\|(.+?)\\right\|/g, "(\\abs($1))");
        a = a.replace(/\\lfloor(.+?)\\rfloor/g, "(\\floor($1))");
        a = a.replace(/\\lceil(.+?)\\rceil/g, "(\\ceil($1))");
        a = a.replace(/(\\ln|\\log|\\sin|\\cos|\\tan|\\cot|\\csc|\\sec|\\sinh|\\cosh|\\tanh|\\coth|\\csch|\\sech|\\arcsin|\\arccos|\\arctan|\\arccot|\\arccsc|\\arcsec|\\arcsinh|\\arccosh|\\arctanh|\\arccoth|\\arccsch|\\arcsech)\^\{(.+?)\}\((.+?)\)/g, "($1($3))^{$2}");
        a = this.fixRoot(a);
        e = "";
        var f = 0,
            b = !1,
            g = "";
        for (f; f < a.length; f++) {
            var h = a[f];
            var m = 0 == e.length ? " " : e.substr(e.length - 1);
            if (h.match(/[a-zA-Z\u03b8\u0398\u03b1\u03b2\u03c0]/)) {
                if (b) {
                    g += h;
                    continue
                }
                if (")" ==
                    m || m.match(/[0-9]/) || "|" == m || m.match(/[a-zA-Z\u03b8\u0398\u03b1\u03b2\u03c0]/)) e += "*";
                e += h
            }
            b = !1;
            "cdot" == g && (e += "*", g = "");
            if (h.match(/[0-9]/)) {
                if (")" == m || m.match(/[a-zA-Z\u03b8\u0398\u03b1\u03b2\u03c0]/) || "|" == m) e += "*";
                e += h
            } else if (h.match(/\./)) m.match(/[0-9]/) || (e += "0"), e += h;
            else if (h.match(/\^/)) e += h, "{" === a[f + 1] && (m = this.getBlock(a, f + 2, "{", "}"), f += m.length + 2, e += "(" + this.parseEquation(m) + ")");
            else if (h.match(/[\*\/\-\+%]/)) e += h;
            else if ("(" == h) {
                if (")" == m || m.match(/[a-zA-Z]/) || m.match(/[0-9]/)) e +=
                    "*";
                "" != g && (e += g, g = "");
                m = this.getBlock(a, f + 1, "(", ")");
                e += "(" + this.parseEquation(m) + ")";
                f += m.length + 1
            } else if ("{" == h)
                if ("frac" === g) {
                    g = this.getBlock(a, f + 1, "{", "}");
                    f += g.length + 2;
                    h = this.getBlock(a, f + 1, "{", "}");
                    f += h.length + 1;
                    if (")" == m || m.match(/[a-zA-Z]/) || m.match(/[0-9]/)) e += "*";
                    e += "(" + this.parseEquation(g) + ")/(" + this.parseEquation(h) + ")";
                    g = ""
                } else {
                    if ("sqrt" == g) {
                        g = this.getBlock(a, f + 1, "{", "}");
                        f += g.length + 1;
                        if (")" == m || m.match(/[a-zA-Z]/) || "|" == m || m.match(/[0-9]/)) e += "*";
                        e += "sqrt(" + this.parseEquation(g) +
                            ")";
                        g = ""
                    }
                }
            else "\\" == h && (g = "", b = !0)
        }
        return e
    };
    this.getBlock = function(a, e, f, b) {
        var g = "",
            h = 1;
        for (e; e < a.length; e++) {
            var m = a[e];
            m == f ? h++ : m == b && h--;
            if (0 == h) break;
            g += m
        }
        return g
    };
    this.roundFloat = function(a) {
        return Math.round(1E11 * a) / 1E11
    }
}
var SyParse = function(a) {
        function e(q) {
            function r() {}
            r.prototype = q;
            return new r
        }

        function f(q, r, y, B) {
            this.type_ = q;
            this.index_ = r || 0;
            this.prio_ = y || 0;
            this.number_ = void 0 !== B && null !== B ? B : 0;
            this.toString = function() {
                switch (this.type_) {
                    case 0:
                        return this.number_;
                    case 1:
                    case 2:
                    case 3:
                        return this.index_;
                    case 4:
                        return "CALL";
                    default:
                        return "Invalid Token"
                }
            }
        }

        function b(q, r, y, B) {
            this.tokens = q;
            this.ops1 = r;
            this.ops2 = y;
            this.functions = B
        }

        function g(q) {
            return "string" === typeof q ? (x.lastIndex = 0, x.test(q) ? "'" + q.replace(x,
                function(r) {
                    var y = A[r];
                    return "string" === typeof y ? y : "\\u" + ("0000" + r.charCodeAt(0).toString(16)).slice(-4)
                }) + "'" : "'" + q + "'") : q
        }

        function h(q, r) {
            return Number(q) + Number(r)
        }

        function m(q, r) {
            return q - r
        }

        function l(q, r) {
            return q * r
        }

        function n(q, r) {
            return q / r
        }

        function u(q, r) {
            return q % r
        }

        function p(q, r) {
            return "" + q + r
        }

        function t(q) {
            return -q
        }

        function w(q) {
            return Math.random() * (q || 1)
        }

        function v(q) {
            for (var r = q = Math.floor(q); 1 < q;) r *= --q;
            return r
        }

        function z(q, r) {
            return Math.sqrt(q * q + r * r)
        }

        function C(q, r) {
            if ("[object Array]" !=
                Object.prototype.toString.call(q)) return [q, r];
            q = q.slice();
            q.push(r);
            return q
        }

        function D() {
            this.success = !1;
            this.expression = this.errormsg = "";
            this.tmpprio = this.tokenindex = this.tokenprio = this.tokennumber = this.pos = 0;
            this.ops1 = {
                sin: SyCalc.sin,
                cos: SyCalc.cos,
                tan: SyCalc.tan,
                cot: SyCalc.cot,
                sec: SyCalc.sec,
                csc: SyCalc.csc,
                arcsin: SyCalc.arcsin,
                arccos: SyCalc.arccos,
                arctan: SyCalc.arctan,
                arccot: SyCalc.arccot,
                arcsec: SyCalc.arcsec,
                arccsc: SyCalc.arccsc,
                sinh: SyCalc.sinh,
                cosh: SyCalc.cosh,
                tanh: SyCalc.tanh,
                coth: SyCalc.coth,
                sech: SyCalc.sech,
                csch: SyCalc.csch,
                arcsinh: SyCalc.arcsinh,
                arccosh: SyCalc.arccosh,
                arctanh: SyCalc.arctanh,
                arccoth: SyCalc.arccoth,
                arcsech: SyCalc.arcsech,
                arccsch: SyCalc.arccsch,
                sqrt: Math.sqrt,
                log: Math.log10,
                ln: Math.log,
                abs: Math.abs,
                ceil: Math.ceil,
                floor: Math.floor,
                round: Math.round,
                "-": t,
                exp: Math.exp
            };
            this.ops2 = {
                "+": h,
                "-": m,
                "*": l,
                "/": n,
                "%": u,
                "^": Math.pow,
                ",": C,
                "||": p
            };
            this.functions = {
                random: w,
                fac: v,
                min: Math.min,
                max: Math.max,
                pyt: z,
                pow: Math.pow
            };
            this.consts = {
                e: Math.E,
                pi: Math.PI,
                "\u03c0": Math.PI
            }
        }
        mchEps = 10 *
            calcEps();
        var x = /[\\'\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
            A = {
                "\b": "\\b",
                "\t": "\\t",
                "\n": "\\n",
                "\f": "\\f",
                "\r": "\\r",
                "'": "\\'",
                "\\": "\\\\"
            };
        b.prototype = {
            simplify: function(q) {
                q = q || {};
                var r = [],
                    y = [],
                    B = this.tokens.length,
                    E;
                for (E = 0; E < B; E++) {
                    var F = this.tokens[E];
                    var G = F.type_;
                    if (0 === G) r.push(F);
                    else if (3 === G && F.index_ in q) F = new f(0, 0, 0, q[F.index_]), r.push(F);
                    else if (2 === G && 1 < r.length) {
                        var H = r.pop();
                        G = r.pop();
                        F = this.ops2[F.index_];
                        F = new f(0, 0, 0, F(G.number_, H.number_));
                        r.push(F)
                    } else if (1 === G && 0 < r.length) G = r.pop(), F = this.ops1[F.index_], F = new f(0, 0, 0, F(G.number_)), r.push(F);
                    else {
                        for (; 0 < r.length;) y.push(r.shift());
                        y.push(F)
                    }
                }
                for (; 0 < r.length;) y.push(r.shift());
                return new b(y, e(this.ops1), e(this.ops2), e(this.functions))
            },
            evaluate: function(q) {
                q = q || {};
                var r = [],
                    y = this.tokens.length,
                    B;
                for (B = 0; B < y; B++) {
                    var E = this.tokens[B];
                    var F = E.type_;
                    if (0 === F) r.push(E.number_);
                    else if (2 === F) {
                        var G = r.pop();
                        F = r.pop();
                        if ("/" == E.index_ && B < y - 1 && "^" == this.tokens[B +
                                1].index_ && 0 > r[r.length - 1] && 0 === G % 1 && 0 === F % 1 && 0 !== G % 2) {
                            E = r.pop();
                            var H = r;
                            H.push.call(H, Math.pow(-Math.pow(-E, 1 / G), F));
                            B++
                        } else E = this.ops2[E.index_], r.push(E(F, G))
                    } else if (3 === F)
                        if (E.index_ in q) r.push(q[E.index_]);
                        else if (E.index_ in this.functions) r.push(this.functions[E.index_]);
                    else throw Error("undefined variable: " + E.index_);
                    else if (1 === F) F = r.pop(), E = this.ops1[E.index_], r.push(E(F));
                    else if (4 === F)
                        if (F = r.pop(), E = r.pop(), E.apply && E.call) "[object Array]" == Object.prototype.toString.call(F) ? r.push(E.apply(void 0,
                            F)) : r.push(E.call(void 0, F));
                        else throw Error(E + " is not a function");
                    else throw Error("invalid Expression");
                }
                if (1 < r.length) throw Error("invalid Expression (parity)");
                return Math.round(r[0] / mchEps) * mchEps
            },
            toString: function(q) {
                var r = [],
                    y = this.tokens.length,
                    B;
                for (B = 0; B < y; B++) {
                    var E = this.tokens[B];
                    var F = E.type_;
                    if (0 === F) r.push(g(E.number_));
                    else if (2 === F) {
                        var G = r.pop();
                        F = r.pop();
                        E = E.index_;
                        q && "^" == E ? r.push("Math.pow(" + F + "," + G + ")") : r.push("(" + F + E + G + ")")
                    } else if (3 === F) r.push(E.index_);
                    else if (1 === F) F =
                        r.pop(), E = E.index_, "-" === E ? r.push("(" + E + F + ")") : r.push(E + "(" + F + ")");
                    else if (4 === F) F = r.pop(), E = r.pop(), r.push(E + "(" + F + ")");
                    else throw Error("invalid Expression");
                }
                if (1 < r.length) throw Error("invalid Expression (parity)");
                return r[0]
            },
            variables: function() {
                for (var q = this.tokens.length, r = [], y = 0; y < q; y++) {
                    var B = this.tokens[y];
                    3 === B.type_ && -1 == r.indexOf(B.index_) && r.push(B.index_)
                }
                return r
            },
            toJSFunction: function(q, r) {
                return new Function(q, "with(Parser.values) { return " + this.simplify(r).toString(!0) + "; }")
            }
        };
        D.parse = function(q) {
            return (new D).parse(q)
        };
        D.evaluate = function(q, r) {
            return q.evaluate(r)
        };
        D.Expression = b;
        D.values = {
            sin: SyCalc.sin,
            cos: SyCalc.cos,
            tan: SyCalc.tan,
            cot: SyCalc.cot,
            csc: SyCalc.csc,
            sec: SyCalc.sec,
            arcsin: SyCalc.arcsin,
            arccos: SyCalc.arccos,
            arctan: SyCalc.arctan,
            arccot: SyCalc.arccot,
            arccsc: SyCalc.arccsc,
            arcsec: SyCalc.arcsec,
            sinh: SyCalc.sinh,
            cosh: SyCalc.cosh,
            tanh: SyCalc.tanh,
            coth: SyCalc.coth,
            csch: SyCalc.csch,
            sech: SyCalc.sech,
            arcsinh: SyCalc.arcsinh,
            arccosh: SyCalc.arccosh,
            arctanh: SyCalc.arctanh,
            arccoth: SyCalc.arccoth,
            arccsch: SyCalc.arccsch,
            arcsech: SyCalc.arcsech,
            sqrt: SyCalc.sqrt,
            log: Math.log10,
            ln: Math.log,
            abs: Math.abs,
            ceil: Math.ceil,
            floor: Math.floor,
            round: Math.round,
            random: w,
            fac: v,
            exp: Math.exp,
            min: Math.min,
            max: Math.max,
            pyt: z,
            pow: Math.pow,
            E: Math.E,
            PI: Math.PI
        };
        D.prototype = {
            parse: function(q) {
                this.errormsg = "";
                this.success = !0;
                var r = [],
                    y = [];
                this.tmpprio = 0;
                var B = 77,
                    E = 0;
                this.expression = q;
                for (this.pos = 0; this.pos < this.expression.length;) this.isOperator() ? this.isSign() && B & 64 ? (this.isNegativeSign() &&
                        (this.tokenprio = 2, this.tokenindex = "-", E++, this.addfunc(y, r, 1)), B = 77) : this.isComment() || (0 === (B & 2) && this.error_parsing(this.pos, "unexpected operator"), E += 2, this.addfunc(y, r, 2), B = 77) : this.isNumber() ? (0 === (B & 1) && this.error_parsing(this.pos, "unexpected number"), B = new f(0, 0, 0, this.tokennumber), y.push(B), B = 50) : this.isString() ? (0 === (B & 1) && this.error_parsing(this.pos, "unexpected string"), B = new f(0, 0, 0, this.tokennumber), y.push(B), B = 50) : this.isLeftParenth() ? (0 === (B & 8) && this.error_parsing(this.pos, 'unexpected "("'),
                        B & 128 && (E += 2, this.tokenprio = -2, this.tokenindex = -1, this.addfunc(y, r, 4)), B = 77) : this.isRightParenth() ? (0 === (B & 16) && this.error_parsing(this.pos, 'unexpected ")"'), B = 186) : this.isComma() ? (0 === (B & 32) && this.error_parsing(this.pos, 'unexpected ","'), this.addfunc(y, r, 2), E += 2, B = 77) : this.isConst() ? (0 === (B & 1) && this.error_parsing(this.pos, "unexpected constant"), B = new f(0, 0, 0, this.tokennumber), y.push(B), B = 50) : this.isOp2() ? (0 === (B & 4) && this.error_parsing(this.pos, "unexpected function"), this.addfunc(y, r, 2), E += 2, B = 8) :
                    this.isOp1() ? (0 === (B & 4) && this.error_parsing(this.pos, "unexpected function"), this.addfunc(y, r, 1), E++, B = 8) : this.isVar() ? (0 === (B & 1) && this.error_parsing(this.pos, "unexpected variable"), B = new f(3, this.tokenindex, 0, 0), y.push(B), B = 186) : this.isWhite() || ("" === this.errormsg ? this.error_parsing(this.pos, "unknown character") : this.error_parsing(this.pos, this.errormsg));
                for ((0 > this.tmpprio || 10 <= this.tmpprio) && this.error_parsing(this.pos, 'unmatched "()"'); 0 < r.length;) B = r.pop(), y.push(B);
                E + 1 !== y.length && this.error_parsing(this.pos,
                    q + ": parity " + E + 1 + ", " + y);
                return new b(y, e(this.ops1), e(this.ops2), e(this.functions))
            },
            evaluate: function(q, r) {
                return this.parse(q).evaluate(r)
            },
            error_parsing: function(q, r) {
                this.success = !1;
                this.errormsg = "parse error [column " + q + "]: " + r;
                throw Error(this.errormsg);
            },
            addfunc: function(q, r, y) {
                for (y = new f(y, this.tokenindex, this.tokenprio + this.tmpprio, 0); 0 < r.length;)
                    if (y.prio_ <= r[r.length - 1].prio_) q.push(r.pop());
                    else break;
                r.push(y)
            },
            isNumber: function() {
                for (var q = !1, r = ""; this.pos < this.expression.length;) {
                    var y =
                        this.expression.charCodeAt(this.pos);
                    if (48 <= y && 57 >= y || 46 === y) r += this.expression.charAt(this.pos), this.pos++, this.tokennumber = parseFloat(r), q = !0;
                    else break
                }
                return q
            },
            unescape: function(q, r) {
                for (var y = [], B = !1, E = 0; E < q.length; E++) {
                    var F = q.charAt(E);
                    if (B) {
                        switch (F) {
                            case "'":
                                y.push("'");
                                break;
                            case "\\":
                                y.push("\\");
                                break;
                            case "/":
                                y.push("/");
                                break;
                            case "b":
                                y.push("\b");
                                break;
                            case "f":
                                y.push("\f");
                                break;
                            case "n":
                                y.push("\n");
                                break;
                            case "r":
                                y.push("\r");
                                break;
                            case "t":
                                y.push("\t");
                                break;
                            case "u":
                                B = parseInt(q.substring(E +
                                    1, E + 5), 16);
                                y.push(String.fromCharCode(B));
                                E += 4;
                                break;
                            default:
                                throw this.error_parsing(r + E, "Illegal escape sequence: '\\" + F + "'");
                        }
                        B = !1
                    } else "\\" == F ? B = !0 : y.push(F)
                }
                return y.join("")
            },
            isString: function() {
                var q = !1,
                    r = "",
                    y = this.pos;
                if (this.pos < this.expression.length && "'" == this.expression.charAt(this.pos))
                    for (this.pos++; this.pos < this.expression.length;)
                        if ("'" != this.expression.charAt(this.pos) || "\\" == r.slice(-1)) r += this.expression.charAt(this.pos), this.pos++;
                        else {
                            this.pos++;
                            this.tokennumber = this.unescape(r,
                                y);
                            q = !0;
                            break
                        } return q
            },
            isConst: function() {
                var q;
                for (q in this.consts) {
                    var r = q.length;
                    var y = this.expression.substr(this.pos, r);
                    if (q === y) return this.tokennumber = this.consts[q], this.pos += r, !0
                }
                return !1
            },
            isOperator: function() {
                var q = this.expression.charCodeAt(this.pos);
                if (43 === q) this.tokenprio = 0, this.tokenindex = "+";
                else if (45 === q) this.tokenprio = 0, this.tokenindex = "-";
                else if (124 === q)
                    if (124 === this.expression.charCodeAt(this.pos + 1)) this.pos++, this.tokenprio = 0, this.tokenindex = "||";
                    else return !1;
                else if (42 ===
                    q) this.tokenprio = 1, this.tokenindex = "*";
                else if (47 === q) this.tokenprio = 2, this.tokenindex = "/";
                else if (37 === q) this.tokenprio = 2, this.tokenindex = "%";
                else if (94 === q) this.tokenprio = 3, this.tokenindex = "^";
                else return !1;
                this.pos++;
                return !0
            },
            isSign: function() {
                var q = this.expression.charCodeAt(this.pos - 1);
                return 45 === q || 43 === q ? !0 : !1
            },
            isPositiveSign: function() {
                return 43 === this.expression.charCodeAt(this.pos - 1) ? !0 : !1
            },
            isNegativeSign: function() {
                return 45 === this.expression.charCodeAt(this.pos - 1) ? !0 : !1
            },
            isLeftParenth: function() {
                return 40 ===
                    this.expression.charCodeAt(this.pos) ? (this.pos++, this.tmpprio += 10, !0) : !1
            },
            isRightParenth: function() {
                return 41 === this.expression.charCodeAt(this.pos) ? (this.pos++, this.tmpprio -= 10, !0) : !1
            },
            isComma: function() {
                return 44 === this.expression.charCodeAt(this.pos) ? (this.pos++, this.tokenprio = -1, this.tokenindex = ",", !0) : !1
            },
            isWhite: function() {
                var q = this.expression.charCodeAt(this.pos);
                return 32 === q || 9 === q || 10 === q || 13 === q ? (this.pos++, !0) : !1
            },
            isOp1: function() {
                for (var q = "", r = this.pos; r < this.expression.length; r++) {
                    var y =
                        this.expression.charAt(r);
                    if (y.toUpperCase() === y.toLowerCase() && (r === this.pos || "0" > y || "9" < y)) break;
                    q += y
                }
                return 0 < q.length && q in this.ops1 ? (this.tokenindex = q, this.tokenprio = 5, this.pos += q.length, !0) : !1
            },
            isOp2: function() {
                for (var q = "", r = this.pos; r < this.expression.length; r++) {
                    var y = this.expression.charAt(r);
                    if (y.toUpperCase() === y.toLowerCase() && (r === this.pos || "0" > y || "9" < y)) break;
                    q += y
                }
                return 0 < q.length && q in this.ops2 ? (this.tokenindex = q, this.tokenprio = 5, this.pos += q.length, !0) : !1
            },
            isVar: function() {
                for (var q =
                        "", r = this.pos; r < this.expression.length; r++) {
                    var y = this.expression.charAt(r);
                    if (y.toUpperCase() === y.toLowerCase() && (r === this.pos || "0" > y || "9" < y)) break;
                    q += y
                }
                return 0 < q.length ? (this.tokenindex = q, this.tokenprio = 4, this.pos += q.length, !0) : !1
            },
            isComment: function() {
                return 47 === this.expression.charCodeAt(this.pos - 1) && 42 === this.expression.charCodeAt(this.pos) ? (this.pos = this.expression.indexOf("*/", this.pos) + 2, 1 === this.pos && (this.pos = this.expression.length), !0) : !1
            }
        };
        return a.Parser = D
    }("undefined" === typeof exports ? {} : exports),
    SyNumberLine = function(a, e, f, b) {
        this.valid = !0;
        this.numberLineInfo = f;
        this.inStepImageUrl = b;
        this.targetElement = a;
        this.elementsToHide = e;
        b ? (this.width = a.width(), this.drawInStepImage()) : f && f.imageAPI ? (this.width = a.width() - 20, this.drawNumberLine()) : this.valid = !1
    };
SyNumberLine.fromNumberLineInfo = function(a, e, f) {
    return new SyNumberLine(a, e, f, void 0)
};
SyNumberLine.fromInStepImageUrl = function(a, e, f) {
    return new SyNumberLine(a, e, void 0, f)
};
SyNumberLine.prototype = {
    drawNumberLine: function() {
        var a = this,
            e = window.devicePixelRatio,
            f = e * a.width,
            b = a.numberLineInfo.imageAPI + "&width=" + f;
        a.numberLineInfo.animatedImageAPI && (b = a.numberLineInfo.animatedImageAPI + "&width=" + f);
        f = -48;
        50 < 100 / e && (f = -75);
        var g = $("<img/>", {
            css: {
                width: a.width,
                padding: "10px",
                margin: "auto",
                display: "block"
            }
        });
        g.hide();
        $("#numberLineLoader").css("margin-top", f + "px");
        a.targetElement.append(g);
        g.hide();
        e = $("#empty_number_line_img img", {
            css: {
                margin: "auto",
                display: "block"
            }
        });
        f = b.replace("numberLineAddSubtractAnimated",
            "emptyNumberLineAddSubtract");
        ajaxImage(f, e, a.elementsToHide).then(function(m) {});
        var h = $("#playStopGifBtn");
        ajaxImage(b, g, a.elementsToHide).then(function(m) {
            g.show();
            "image/gif" === m.type ? ($("#numberLineLoader").hide(), $("#empty_number_line_img").hide(), $("#numberLineLoader img").remove(), $("#empty_number_line_img img").remove(), h.addClass("nl-show"), h.addClass("play_icon"), h.click(function(l) {
                    if (h.hasClass("play_icon") || h.hasClass("replay")) h.removeClass("play_icon"), h.addClass("replay"), a.restartNumberLine(l)
                })) :
                ($("#numberLineLoader").hide(), $("#empty_number_line_img").hide())
        })
    },
    restartNumberLine: function(a) {
        var e = $("#numberLine img"),
            f = e.attr("src");
        a.preventDefault();
        e.attr("src", "");
        e.attr("src", f)
    },
    drawInStepImage: function() {
        var a = this,
            e = window.devicePixelRatio,
            f = a.inStepImageUrl + "&width=" + e * a.width + "&ratio=" + e,
            b = -48;
        50 < 100 / e && (b = -75);
        var g = $("<i />", {
            "class": "playStopGifBtn"
        });
        a.targetElement.append(g);
        var h = $("<div />", {
            "class": "solution_box",
            css: {
                "margin-left": "0px",
                border: "none"
            }
        });
        a.targetElement.append(h);
        var m = $("<img />", {
                css: {
                    width: a.width,
                    margin: "auto",
                    display: "block"
                }
            }),
            l = $("<div>", {
                "class": "empty_number_line_img",
                css: {
                    "padding-left": "0px",
                    "padding-right": "0px"
                }
            });
        l.append(m);
        h.append(l);
        var n = $("<img />", {
                src: "/public/img/ajax-loader.gif"
            }),
            u = $("<div>", {
                "class": "numberLineLoader",
                css: {
                    "margin-left": a.width / 2 - 16 + "px"
                }
            }).append(n);
        h.append(u);
        var p = $("<img/>", {
            css: {
                width: a.width,
                "padding-top": "10px",
                "padding-bottom": "10px",
                margin: "auto",
                display: "block"
            }
        });
        p.hide();
        u.css("margin-top", b + "px");
        a.targetElement.append(p);
        p.hide();
        b = f.replace("numberLineAddSubtractAnimated", "emptyNumberLineAddSubtract").replace("multiply", "emptyMultiply");
        ajaxImage(b, m, a.elementsToHide).then(function(t) {
            m.css("width", m[0].naturalWidth / e + "px")
        });
        ajaxImage(f, p, a.elementsToHide).then(function(t) {
            u.hide();
            l.hide();
            p.css("width", p[0].naturalWidth / e + "px");
            "image/gif" === t.type && (g.addClass("nl-show"), g.addClass("play_icon"), g.on("click", function(w) {
                if (g.hasClass("play_icon") || g.hasClass("replay")) g.removeClass("play_icon"), g.addClass("replay"),
                    a.restartNumberLineInStep(w, p)
            }));
            p.show();
            n.remove();
            m.remove()
        })
    },
    restartNumberLineInStep: function(a, e) {
        var f = e.attr("src");
        a.preventDefault();
        e.attr("src", "");
        e.attr("src", f)
    }
};

function SyPlotSettingsInfo() {
    this.isDrawAxisIntercepts = {
        draw: !1,
        possible: !0
    };
    this.isDrawExtreme = {
        draw: !1,
        possible: !0
    };
    this.isDrawAsypmtotes = {
        draw: !1,
        possible: !1
    };
    this.isDrawFunctionIntercepts = {
        draw: !1,
        possible: !1
    };
    this.xLabel = "";
    this.x2 = this.x1 = 0;
    this.yLabel = "";
    this.y2 = this.y1 = 0
}

function SyPlotSettingsHolder() {
    this.defaultSettings = new SyPlotSettingsInfo;
    this.updateSettingsCallback = this.showHomeCallback = this.hideHomeCallback = this.tempSettings = this.userSettings = null;
    this.logActivityType = "GraphingCalculator"
}
SyPlotSettingsHolder.prototype = {
    cur: function() {
        return this.tempSettings ? this.tempSettings : this.userSettings ? this.userSettings : this.defaultSettings
    },
    hasUserSettings: function() {
        return null != this.userSettings
    },
    createUserSettings: function() {
        this.userSettings = jQuery.extend(!0, {}, this.cur());
        this.tempSettings = null;
        this.updateSettingsFromHTML();
        this.notifyUpdatedUserSettings(!1)
    },
    init: function(a, e, f) {
        var b = this;
        b.syPlot = e;
        f && (b.userSettings = null, b.tempSettings = null);
        b.defaultSettings = new SyPlotSettingsInfo;
        $("#canvasZoom").remove();
        b.canvasZoom = $("<div id='canvasZoom' class='no-select'></div>").insertAfter(e.graphJQ);
        sy_graphSettings.defaultSettings.isDrawAxisIntercepts.draw = !0;
        sy_graphSettings.defaultSettings.isDrawExtreme.draw = !0;
        sy_graphSettings.defaultSettings.isDrawFunctionIntercepts.draw = !0;
        if (a.showSettings && (f = $("body"), 0 === $("#settingsContainer").length)) {
            const h = $("#settingsBoxTemplate").clone();
            h.find("*[id]").each(function(m, l) {
                $(l).attr("id", $(l).attr("id").replace("_", ""))
            });
            f.append(h.html());
            f.off("click", "#settingsButtonContainer").on("click", "#settingsButtonContainer", function() {
                b.toggleSettings()
            })
        }
        a.showZoom && (f = "", a.showSettings && (f += '<div id="settingsButtonContainer"><svg id="canvasSettings"><use href="#graph-settings"></use></svg></div>'), this.canvasZoom.append(f + '<div id="graph-plus-minus"><div id="graph-plus"><img alt="zoom in" id="zoomIn" src="/public/images/solution-plot-plus.svg" width="24" height="24"></div><div id="graph-minus"><img alt="zoom out" id="zoomOut" src="/public/images/solution-plot-minus.svg" width="24" height="24"></div></div><div id="graph-focus"><img alt="graph reset" id="graphReset" src="/public/images/solution-plot-focus.svg" width="24" height="24"></div>'));
        b.defaultSettings.isDrawAsypmtotes.draw = !1;
        b.defaultSettings.isDrawAsypmtotes.possible = !1;
        if (e.plotInfo && e.plotInfo.funcsToDraw)
            for (var g in e.plotInfo.funcsToDraw.funcs) e.plotInfo.funcsToDraw.funcs[g].attributes.isAsymptote && (b.defaultSettings.isDrawAsypmtotes.draw = !0, b.defaultSettings.isDrawAsypmtotes.possible = !0);
        b.userSettings && (b.userSettings.isDrawAsypmtotes.possible = b.defaultSettings.isDrawAsypmtotes.possible);
        b.tempSettings && (b.tempSettings.isDrawAsypmtotes.possible = b.defaultSettings.isDrawAsypmtotes.possible);
        $(".rangeSelect").unbind("keyup").keyup(function() {
            b.createUserSettings();
            b.syPlot.draw(!0);
            $(this).attr("id").includes("x") ? symbolab_log(b.logActivityType, "Settings", "XRange") : symbolab_log(b.logActivityType, "Settings", "YRange")
        });
        $("#xLabel, #yLabel").unbind("keyup").keyup(function() {
            b.createUserSettings();
            b.syPlot.draw(!0);
            $(this).attr("id").includes("x") ? symbolab_log(b.logActivityType, "Settings", "XLabel") : symbolab_log(b.logActivityType, "Settings", "YLabel")
        });
        $("#asymCheck svg").unbind("click").click(function() {
            let h =
                "#toggle-full-keypad-back" === $("#asymCheck svg use").attr("href") ? "#toggle-full-keypad-back-open" : "#toggle-full-keypad-back";
            $("#asymCheck svg use").attr("href", h);
            b.createUserSettings();
            b.syPlot.draw(!0);
            b.logChecked(this, "Asymptotes");
            b.notifyUpdatedUserSettings(!1)
        });
        $("#extCheck svg").unbind("click").click(function() {
            let h = "#toggle-full-keypad-back" === $("#extCheck svg use").attr("href") ? "#toggle-full-keypad-back-open" : "#toggle-full-keypad-back";
            $("#extCheck svg use").attr("href", h);
            b.createUserSettings();
            b.syPlot.draw(!0);
            b.logChecked(this, "Extremes");
            b.notifyUpdatedUserSettings(!1)
        });
        $("#axisCheck svg").unbind("click").click(function() {
            let h = "#toggle-full-keypad-back" === $("#axisCheck svg use").attr("href") ? "#toggle-full-keypad-back-open" : "#toggle-full-keypad-back";
            $("#axisCheck svg use").attr("href", h);
            b.createUserSettings();
            b.syPlot.draw(!0);
            b.logChecked(this, "AxisIntercepts");
            b.notifyUpdatedUserSettings(!1)
        });
        $("#funcCheck svg").unbind("click").click(function() {
            let h = "#toggle-full-keypad-back" ===
                $("#funcCheck svg use").attr("href") ? "#toggle-full-keypad-back-open" : "#toggle-full-keypad-back";
            $("#funcCheck svg use").attr("href", h);
            b.createUserSettings();
            b.syPlot.draw(!0);
            b.logChecked(this, "FuncIntersection");
            b.notifyUpdatedUserSettings(!1)
        });
        $("#resetSettingsBtn").unbind("click").click(function() {
            b.tempSettings = null;
            b.userSettings = null;
            b.hideHomeButton();
            symbolab_log(b.logActivityType, "Settings", "Reset");
            $("#settingsContainer").fadeOut("fast");
            b.syPlot.draw(!0);
            b.notifyUpdatedUserSettings(!1);
            symbolab_log("GraphingCalculator", "Settings", "Reset")
        });
        $("#zoomIn").parent().unbind("click").click(async function() {
            await b.syPlot.zoomInOut(!0);
            b.syPlot.donePanning();
            b.updateHTMLFromSettings()
        });
        $("#zoomOut").parent().unbind("click").click(async function() {
            await b.syPlot.zoomInOut(!1);
            b.syPlot.donePanning();
            b.updateHTMLFromSettings()
        });
        0 <= window.location.href.indexOf("/graphing-calculator") && b.syPlot.graphJQ.unbind("mousewheel").mousewheel(function(h, m) {
            clearTimeout($.data(this, "timer"));
            $.data(this,
                "timer", setTimeout(function() {
                    b.syPlot.donePanning()
                }, 50));
            0 < m ? b.syPlot.zoomInOut(!0, h) : b.syPlot.zoomInOut(!1, h)
        });
        $("#graphReset").parent().unbind("click").click(function() {
            b.homeClicked();
            symbolab_log("GraphingCalculator", "Zoom", "Home")
        });
        b.notifyUpdatedUserSettings(!0)
    },
    homeClicked: function() {
        this.tempSettings = null;
        this.hideHomeButton();
        this.closeSettings();
        this.syPlot.draw(!0);
        symbolab_log(this.logActivityType, "Settings", "Home")
    },
    hideHomeButton: function() {
        $("#graphReset").fadeOut("fast");
        $("#graphReset").parent().fadeOut("fast");
        this.hideHomeCallback && this.hideHomeCallback()
    },
    showHomeButton: function() {
        $("#graphReset").fadeIn("fast");
        $("#graphReset").parent().fadeIn("fast");
        this.showHomeCallback && this.showHomeCallback()
    },
    settingsOpen: function() {
        return $("#settingsContainer").is(":visible")
    },
    toggleSettings: function(a, e) {
        void 0 === a && (a = !0);
        void 0 === e && (e = !0);
        $(".graphMainMenu").removeClass("show");
        let f = $("#settingsButtonContainer");
        const b = $("#settingsContainer");
        this.settingsOpen() ? e && (symbolab_log("GraphingCalculator", "Settings",
            "Close"), b.fadeOut("fast"), f.removeClass("red_background_parent")) : a && (this.updateHTMLFromSettings(), symbolab_log("GraphingCalculator", "Settings", "Open"), b.fadeIn("fast"), f.addClass("red_background_parent"))
    },
    closeSettings: function() {
        var a = $("#settingsContainer");
        this.settingsOpen() && (a.fadeOut("fast"), symbolab_log(this.logActivityType, "Settings", "Close"))
    },
    logChecked: function(a, e) {
        "#toggle-full-keypad-back" === $(a).find("svg use").attr("href") ? symbolab_log(this.logActivityType, e, "On") : symbolab_log(this.logActivityType,
            e, "Off")
    },
    updateCoordinates: function() {
        this.tempSettings = jQuery.extend(!0, {}, this.cur());
        this.cur().x1 = this.syPlot.currCoord.x1.toFixed(2);
        this.cur().x2 = this.syPlot.currCoord.x2.toFixed(2);
        this.cur().y1 = this.syPlot.currCoord.y1.toFixed(2);
        this.cur().y2 = this.syPlot.currCoord.y2.toFixed(2)
    },
    updateSettingsFromHTML: function() {
        this.cur().x1 = $("#x1").val();
        this.cur().x2 = $("#x2").val();
        this.cur().y1 = $("#y1").val();
        this.cur().y2 = $("#y2").val();
        this.cur().xLabel = $("#xLabel").val();
        this.cur().yLabel = $("#yLabel").val();
        this.cur().isDrawAsypmtotes.draw = "#toggle-full-keypad-back" === $("#asymCheck svg use").attr("href");
        this.cur().isDrawExtreme.draw = "#toggle-full-keypad-back" === $("#extCheck svg use").attr("href");
        this.cur().isDrawAxisIntercepts.draw = "#toggle-full-keypad-back" === $("#axisCheck svg use").attr("href");
        this.cur().isDrawFunctionIntercepts.draw = "#toggle-full-keypad-back" === $("#funcCheck svg use").attr("href");
        null == this.tempSettings && this.hideHomeButton()
    },
    notifyUpdatedUserSettings: function(a) {
        this.updateSettingsCallback &&
            this.updateSettingsCallback(a)
    },
    adjustCheck: function(a, e) {
        !1 === a.possible ? $(e).hide() : ($(e).show(), a = a.draw ? "#toggle-full-keypad-back" : "#toggle-full-keypad-back-open", $(e).find("svg use").attr("href", a), $(e).css("color", ""))
    },
    updateHTMLFromSettings: function() {
        $("#x1").val(this.cur().x1);
        $("#x2").val(this.cur().x2);
        $("#y1").val(this.cur().y1);
        $("#y2").val(this.cur().y2);
        $("#xLabel").val(this.cur().xLabel);
        $("#yLabel").val(this.cur().yLabel);
        this.adjustCheck(this.cur().isDrawAxisIntercepts, "#axisCheck");
        this.adjustCheck(this.cur().isDrawExtreme, "#extCheck");
        this.adjustCheck(this.cur().isDrawAsypmtotes, "#asymCheck");
        this.adjustCheck(this.cur().isDrawFunctionIntercepts, "#funcCheck");
        $("#graphSettingSections hr, #graphSettingSections label").show();
        !1 === this.cur().isDrawAxisIntercepts.possible && !1 === this.cur().isDrawExtreme.possible && !1 === this.cur().isDrawAsypmtotes.possible && !1 === this.cur().isDrawFunctionIntercepts.possible && $("#graphSettingSections .settingsDivider, #graphSettingSections label").hide()
    },
    isMultipleFunctions: function() {
        return 1 < this.countsValidFunctions()
    },
    countsValidFunctions: function() {
        var a = 0;
        if (this.syPlot.plotInfo && this.syPlot.plotInfo.funcsToDraw && this.syPlot.plotInfo.funcsToDraw.funcs)
            for (var e = 0; e < this.syPlot.plotInfo.funcsToDraw.funcs.length; e++)
                if (!this.syPlot.plotInfo.funcsToDraw.funcs[e].attributes.isAsymptote) {
                    if (f) {
                        if (this.syPlot.plotInfo.funcsToDraw.funcs[e].displayFormula === f) continue
                    } else var f = this.syPlot.plotInfo.funcsToDraw.funcs[e].displayFormula;
                    a++
                } return a
    },
    getNonAsymptoteFunctions: function() {
        var a = 0;
        if (this.syPlot.plotInfo && this.syPlot.plotInfo.funcsToDraw && this.syPlot.plotInfo.funcsToDraw.funcs)
            for (var e = 0; e < this.syPlot.plotInfo.funcsToDraw.funcs.length; e++) this.syPlot.plotInfo.funcsToDraw.funcs[e].attributes.isAsymptote || a++;
        return a
    },
    loadSettingsFromJson: function(a) {
        this.tempSettings = null;
        this.userSettings = jQuery.extend(!0, {}, this.defaultSettings);
        this.cur().xLabel = a.graph.xAxis.label;
        this.cur().x1 = a.graph.xAxis.min;
        this.cur().x2 = a.graph.xAxis.max;
        this.cur().yLabel = a.graph.yAxis.label;
        this.cur().y1 = a.graph.yAxis.min;
        this.cur().y2 = a.graph.yAxis.max;
        a.graph.graphSettings.forEach(function(e, f) {
            $("#" + e.fst + " input").attr("checked", "checked" === e.snd ? "checked" : !1)
        });
        this.cur().isDrawAsypmtotes.draw = "#toggle-full-keypad-back" === $("#asymCheck svg use").attr("href");
        this.cur().isDrawExtreme.draw = "#toggle-full-keypad-back" === $("#extCheck svg use").attr("href");
        this.cur().isDrawAxisIntercepts.draw = "#toggle-full-keypad-back" === $("#axisCheck svg use").attr("href");
        this.cur().isDrawFunctionIntercepts.draw = "#toggle-full-keypad-back" === $("#funcCheck svg use").attr("href");
        this.syPlot && this.syPlot.draw(!0)
    },
    outputGraphSettings: function() {
        return [{
            fst: "asymCheck",
            snd: this.cur().isDrawAsypmtotes.draw ? "checked" : "false"
        }, {
            fst: "extCheck",
            snd: this.cur().isDrawExtreme.draw ? "checked" : "false"
        }, {
            fst: "axisCheck",
            snd: this.cur().isDrawAxisIntercepts.draw ? "checked" : "false"
        }, {
            fst: "funcCheck",
            snd: this.cur().isDrawFunctionIntercepts.draw ? "checked" : "false"
        }]
    }
};
var sy_graphSettings = new SyPlotSettingsHolder;
class SymbolabSteps {
    constructor() {
        this.solution = new SymbolabSolution;
        this.solutionSteps = new SymbolabSolutionSteps;
        this.dym = new Dym;
        this.related = new Related;
        this.plot = new Plot;
        this.challengeLink = new ChallengeLink;
        this.refreshPageState = {}
    }
    createState(a) {
        return new RenderState(a)
    }
    renderSolution(a) {
        a.solutionContainer = this.solution.render(a.solutionObject.solution.solution, a)
    }
    renderSteps(a) {
        a.solutionMethodsAndTitleContainer = this.solutionSteps.renderMethodsAndTitle(a.stepsObject.solution.steps, a);
        a.solutionStepsContainer =
            this.solutionSteps.renderStepsContainer(a.stepsObject.solution.steps, a);
        a.solutionStepByStepContainer = this.solutionSteps.renderStepByStep(a.stepsObject.solution.steps, a)
    }
    renderDym(a) {
        a.dymContainer = this.dym.render(a.solutionObject, a)
    }
    renderRelated(a) {
        a.relatedContainer = this.related.render(a.solutionObject, a)
    }
    renderPlot(a, e, f) {
        f.plotContainer = this.plot.render(a, e, f)
    }
    renderChallengeLink(a) {
        a.challengeLinkContainer = this.challengeLink.render(a.solutionObject, a)
    }
    postRender(a) {
        setTimeout(function() {
            a.processPostRenderSteps();
            $(a.solutionContainer).trigger("steps-rendered")
        })
    }
    expandAllSteps() {
        const a = e => {
            e.click();
            $(".interim_container:not(.open) .interim_step_title_container", e.next(".solution_step_list")).each((f, b) => {
                a($(b))
            })
        };
        $(".interim_container:not(.open) .interim_step_title_container").each((e, f) => a($(f)));
        $(".solution_step_definition:not(.expanded)").each((e, f) => $(f).click());
        $("[id='solution-format-indicator'].collapse").each((e, f) => $(f).click())
    }
    createMessageBox(a) {
        const e = $('<div class="solution_div"></div>'),
            f = $('<div class="solution_box solution_outside_box"></div>'),
            b = $("<div class='solution_title_container_highest'> </div>");
        b.append(createMathquillDiv("solution_step_title", a));
        f.append(b);
        e.append(f);
        return e
    }
}
const TIMEOUT = 31E3;
class Network {
    getSolution(a) {
        a = a.config;
        return $.ajax({
            type: "POST",
            url: "/pub_api/bridge/solution",
            beforeSend: authorizeAjaxWithSyPubToken,
            data: {
                origin: a.origin,
                language: a.language,
                query: a.query,
                choices: a.choices,
                referer: a.referer
            },
            timeout: TIMEOUT
        })
    }
    getSteps(a) {
        a = a.config;
        return $.ajax({
            type: "POST",
            url: "/pub_api/bridge/steps",
            beforeSend: authorizeAjaxWithSyToken,
            data: {
                appName: "Symbolab",
                symbolabQuestion: a.query,
                language: a.language,
                origin: a.origin,
                choices: a.choices,
                referer: a.referer
            },
            timeout: TIMEOUT
        })
    }
    getPlot(a) {
        return $.ajax({
            type: "POST",
            url: "/pub_api/graph/plottingInfo",
            beforeSend: authorizeAjaxWithSyPubToken,
            data: {
                userGraph: JSON.stringify({
                    formulas: [{
                        fst: a.plotRequest
                    }]
                }),
                origin: a.config.origin,
                language: a.config.language,
                nolog: !0
            }
        })
    }
    deleteNote(a) {
        return $.ajax({
            type: "POST",
            url: "/api/notebook/deleteNotes",
            beforeSend: authorizeAjaxWithSyPubToken,
            data: {
                symbolab_questions: a
            }
        })
    }
    saveNote(a, e, f, b) {
        return $.ajax({
            type: "POST",
            url: "/api/notebook/addNote",
            beforeSend: authorizeAjaxWithSyPubToken,
            data: {
                symbolab_question: a,
                display: e,
                topic: f,
                savedFrom: b
            }
        })
    }
    verify(a,
        e, f, b) {
        return $.ajax({
            type: "POST",
            url: "/pub_api/bridge/verify",
            beforeSend: authorizeAjaxWithSyPubToken,
            data: {
                symbolabQuestion: e,
                answer: f,
                language: a.config.language,
                appName: "Symbolab"
            },
            timeout: TIMEOUT
        })
    }
    getPageData(a, e) {
        return $.ajax({
            type: "POST",
            url: "/pub_api/bridge/pageData",
            beforeSend: authorizeAjaxWithSyPubToken,
            data: {
                host: a,
                page: e
            }
        })
    }
}
class ScrollUtils {
    makeScrollable(a) {
        const e = this;
        a.find(".interim_step_title, .solution_step_primary, .solution_step_title, .solution_step_result, .solution_step_explanation, .solution_step_definition_text, .solution_scrollable, .solution_math").not(".splitAnswerLineColon").each(function() {
            const f = $(this);
            f.is(":visible") && !f.hasClass("syscrollable") && (1 === f.find(".mathquill-embedded-latex").length ? (f.hasClass("splitAnswerFirst"), e.createScrollIgnoreMathrm(this)) : $(this).find(".multiline").each(function() {
                f.hasClass("splitAnswerFirst") ?
                    e.createScrollIgnoreMathrm(this) : e.createScroll(this)
            }))
        })
    }
    createScrollIgnoreMathrm(a) {
        if (0 !== $(a).width()) {
            var e = getActualWidth(a, !0),
                f = $(a).parent(),
                b = f.children().map(function(g, h) {
                    return $(h) === $(a) ? 0 : $(h).outerWidth(!0)
                }).toArray().reduce(function(g, h) {
                    return g + h
                }, 0);
            f = f.width() - b;
            e < f || (createScrollForce(a, e), $(a).css({
                "float": "none"
            }))
        }
    }
    createScroll(a) {
        if (0 !== $(a).width()) {
            var e = getActualWidth(a, !0) + 70,
                f = getActualWidth(a, !1);
            if ($(a).hasClass("solution_scrollable")) {
                if (f < $(a).parent().width()) return
            } else if (f <
                $(a).parent().width() + 70) return;
            createScrollForce(a, e);
            $(a).css({
                "float": "none"
            })
        }
    }
}
class RenderState {
    constructor(a) {
        this.postRenderSteps = [];
        this.config = $.extend({}, {
            stepsSettings: "hideSteps"
        }, a);
        this.callbacks = {};
        this.stepsArray = [];
        this.stepsHighestBox = [];
        this.stepsArrayIndex = 0
    }
    eitherStepByStepOrChallenge() {
        return 0 <= ["challenge", "stepByStep"].indexOf(this.config.stepsSettings)
    }
    addPostRenderStep(a) {
        this.postRenderSteps.push(a)
    }
    addMathquillifyVisible(a) {
        this.postRenderSteps.push(function() {
            mathquillifyVisible(a)
        })
    }
    addMakeScrollable(a) {
        this.postRenderSteps.push(function() {
            makeScrollable(a)
        })
    }
    processPostRenderSteps() {
        this.postRenderSteps.forEach(a => {
            a()
        });
        this.postRenderSteps = []
    }
    logFunnel(a, e) {
        this.callbacks.logFunnel && this.callbacks.logFunnel(a, e)
    }
    showUpgrade(a, e) {
        this.callbacks.showUpgrade && this.callbacks.showUpgrade(a, e)
    }
}
class SymbolabSolution {
    render(a, e) {
        const f = $(getSolutionTemplate());
        this.parseSolutions(a, f, e);
        e.addMathquillifyVisible($("#other-solutions", f));
        e.callbacks.handleElementAdded?.("solution", f, a);
        return f
    }
    parseSolutions(a, e, f) {
        var b = a.default;
        if (void 0 !== b) {
            b = createMathquillDiv("solution_math", b, b);
            var g = $("#solution-only-target", e).empty();
            g.append(b);
            f.addMathquillifyVisible(g)
        }
        const h = ["interval", "radians", "degrees", "decimal"];
        b = Object.keys(a).filter(function(n) {
            return 0 <= h.indexOf(n)
        });
        const m =
            $("#other-solutions-container", e),
            l = $("#other-solutions", e).empty();
        0 < b.length && (g = $("<div />", {
            "class": "other-solutions-spacer",
            html: "&nbsp;"
        }), b.forEach(function(n) {
            const u = $("<div />", {
                    "class": "one-solution"
                }),
                p = $("<div />", {
                    "class": "one-solution-title",
                    text: i18n(n)
                });
            n = createMathquillDiv("", a[n], "solution-" + n);
            u.append(p);
            u.append(n);
            l.append(u)
        }), l.append(g.clone()), $("#number-extra-formats", e).text("+" + b.length), $("#solution-format-indicator", e).show().off("click").on("click", function() {
            m.toggleClass("hide-important");
            $("#solution-format-indicator", e).toggleClass("collapse");
            mathquillifyVisible(l);
            f.logFunnel("ClickedFeature", "MultipleSolutions")
        }))
    }
}

function getSolutionTemplate() {
    return `<div id="solution-only">
                <h2>${i18n("solution")}</h2>
                <div id="solution-only-one-line">
                    <div id="solution-only-target"></div>
                    <div id="solution-only-spacer">&nbsp;</div>
                    <div id="solution-format-indicator" class="hide collapse">
                        <span id="number-extra-formats"></span>
                        <svg>
                            <use href="#chevron-reveal-up"></use>
                        </svg>
                    </div>
                </div>
                <div id="other-solutions-container" class="hide-important">
                    <div id="other-solutions"></div>
                </div>	
            </div>`
}
class SymbolabSolutionSteps {
    renderMethodsAndTitle(a, e) {
        a = $(getMethodAndTitleTemplate());
        "stepByStep" === e.config.stepsSettings ? a.find("#steps-button").addClass("active") : this.writeMethods(a, e);
        $("#steps-container", a).show();
        return a
    }
    renderStepsContainer(a, e) {
        const f = $(getStepsTemplate(a.meta?.practiceLink, a.meta?.practiceTopic, e));
        this.writeSteps(a, f, e);
        this.openHideStepsNew(0, !0, a, f, e);
        return f
    }
    renderStepByStep(a, e) {
        const f = $(getStepByStepTemplate());
        this.writeSteps(a, f, e);
        this.openHideStepsNew(0, !0,
            a, f, e);
        return f
    }
    writeSteps(a, e, f) {
        const b = $("<div />");
        if (a)
            if (f.eitherStepByStepOrChallenge()) this.makeStepByStepSolution(f, e), $("#practice-link-container", e).hide();
            else {
                const g = $('<div class="solution_div"></div>');
                g.append(this.createSolutionBox(a, !0, f));
                b.append(g)
            } $("#multipleSolutions", e).empty().append(b.html())
    }
    writeMethods(a, e) {
        const f = this,
            b = a.find("#methods-target"),
            g = e.stepsObject.solution.methods;
        g && 1 < g.length && (a.find("#methods-container").removeClass("hide"), g.forEach(function(h) {
            const m =
                createMathquillSpan("", h.method, "");
            h = $("<option />", {
                value: JSON.stringify({
                    symbolab_question: h.query.symbolab_question,
                    display: h.query.display
                }),
                html: m
            });
            b.append(h)
        }), b.val(g[0].query), e.selectedMethod = g[0].query.symbolab_question, e.addPostRenderStep(function() {
            mathquillify(a);
            setupGroupSelect(!1, function(h) {
                e.logFunnel("ClickedFeature", "SolvingOptions\tChange");
                f.method_select(h, e)
            }, void 0, function() {
                e.logFunnel("ClickedFeature", "SolvingOptions")
            })
        }), a.find(".steps-title").hide())
    }
    method_select(a,
        e) {
        a = $("#methods-target").val();
        a = JSON.parse(a);
        a.symbolab_question !== e.selectedMethod && (e.selectedMethod = a.symbolab_question, e.callbacks.setNewQuery && e.callbacks.setNewQuery(a.symbolab_question, a.display, !0))
    }
    openHideStepsNew(a, e, f, b, g) {
        f = $(".solution_title_container_highest", b).filter(function() {
            return $(this).data("index") === a
        });
        e && this.addContentIfNeeded(f, g)
    }
    addContentIfNeeded(a, e) {
        const f = a.data("index");
        if ("undefined" != typeof f) {
            const b = this.createSolutionBoxContent(e.stepsArray[f], e.stepsHighestBox[f],
                e);
            a.parent().append(b);
            mathquillify(b);
            e.addPostRenderStep(function() {
                mathquillifyRedrawOnly(b)
            });
            a.hasClass("solution_title_container_highest") || (a.removeData("index"), a.removeAttr("data-index"))
        } else a.parent().find(".ul-div").show(), a.parent().find(".solution_step_definition_text").show()
    }
    createSolutionBox(a, e, f) {
        const b = this.createSolutionBoxDiv(a, e);
        a = this.getTitleContainer(a, e, f);
        b.append(a);
        return b
    }
    createSolutionBoxDiv(a, e) {
        return e ? $('<div class="solution_box solution_outside_box"></div>') :
            $('<div class="solution_box solution_inside_box"></div>')
    }
    createSolutionBoxContent(a, e, f) {
        a = this.createSolutionBoxContentUl2(a, e, f);
        f = $("<div></div>", {
            "class": "ul-div"
        });
        e || f.addClass("solution_list_div");
        f.append(a);
        return f
    }
    async openAiHelpDialog(a, e, f, b) {
        state.logFunnel("ClickedFeature", "AI_Inside\tOpen");
        (new AiChatDialog(a.parent().parent(), (g, h) => state.logFunnel(g, h), firstName, e, b)).show()
    }
    renderSteps(a, e, f, b) {
        const g = this;
        switch (a.type) {
            case "interim":
                if (e) a.input && (e = createMathquillDiv("solution_step_title",
                    a.input), e[0].step = a, f.append(e), b.callbacks.handleElementAdded?.("interim-step-input", e, a)), a.steps.forEach(function(n) {
                    g.renderSteps(n, !1, f, b)
                }), b.callbacks.handleElementAdded?.("interim-steps", f, a);
                else {
                    e = $("<div />", {
                        "class": "interim_container"
                    });
                    var h = $("<div />", {
                            "class": "interim_step_title_container"
                        }),
                        m = createMathquillDiv("interim_step_title", a.title),
                        l = $("<div />", {
                            "class": "interim_step_title_spacer",
                            html: "&nbsp;"
                        });
                    const n = $("<svg class='arrow'><use href='#chevron-reveal-up-black'></use></svg>");
                    h.append(m).append(l);
                    !$("body").hasClass("mobile") && a.meta?.gptData && (m = $("<svg><use href='#ai-help-inside'></use></svg>"), l = "2" === sy_var ? i18n("Chat with AI") : i18n("Explain steps"), m = $("<span />", {
                        "class": "ai-help-element",
                        "data-tooltip": l
                    }).append(m), m = $("<div>", {
                        "class": "ai-help-container"
                    }).append(m), h.append(m), b.seenAiInside || (b.callbacks.logFunnel2("SeenFeature", "AI_Inside"), b.seenAiInside = !0, amplitude.track("Seen", {
                        type: "AI_Inside",
                        subject: b?.solutionObject?.solution?.solution?.subject,
                        topic: b?.solutionObject?.solution?.solution?.topic,
                        subTopic: b?.solutionObject?.solution?.solution?.subTopic
                    })));
                    a.locked && ("1" !== sy_var && "3" !== sy_var && "4" !== sy_var || !isTier1 || isMobile || "en" !== curLang) && (b.seenLockedStep || (b.callbacks.logFunnel2("SeenFeature", "LockedStep"), amplitude.track("Seen", {
                            type: "LockedStep",
                            subject: b?.solutionObject?.solution?.solution?.subject,
                            topic: b?.solutionObject?.solution?.solution?.topic,
                            subTopic: b?.solutionObject?.solution?.solution?.subTopic
                        }), b.seenLockedStep = !0), m = $("<svg class='locked-step-icon'><use href='#locked-step-key-icon'></use></svg>"),
                        h.append(m));
                    h.append(n);
                    b.callbacks.handleElementAdded?.("interim-step-title", h, a);
                    e.append(h);
                    f.append(e);
                    h.html(h.html());
                    $(".ai-help-element", h).on("mouseenter", function() {
                        b.logFunnel("ClickedFeature", "AI_Inside\tHover", !0)
                    });
                    h.on("click", function() {
                        if (a.locked && ("1" !== sy_var && "3" !== sy_var && "4" !== sy_var || !isTier1 || isMobile || "en" !== curLang)) b.solutionObject.solution.solution.interimType = a.meta?.interimType, amplitude.track("Clicked", {
                            type: "LockedStep",
                            subject: b?.solutionObject?.solution?.solution?.subject,
                            topic: b?.solutionObject?.solution?.solution?.topic,
                            subTopic: b?.solutionObject?.solution?.solution?.subTopic,
                            interimType: a.meta?.interimType
                        }), !$("body").hasClass("mobile") && a.meta?.gptData ? (amplitude.track("Clicked", {
                            type: "AI_Inside",
                            subject: b?.solutionObject?.solution?.solution?.subject,
                            topic: b?.solutionObject?.solution?.solution?.topic,
                            subTopic: b?.solutionObject?.solution?.solution?.subTopic,
                            interimType: a.meta?.interimType
                        }), b.showUpgrade("AI_Inside", !0)) : b.showUpgrade("LockedStep", !0);
                        else {
                            const u =
                                $(this).closest(".interim_container");
                            g.toggleInterimStep(u, a, b) && b.callbacks.logFunnel2("ClickedFeature", "UnlockedInterim", a.meta?.interimType)
                        }
                    })
                }
                break;
            case "step":
                a.primary && (e = createMathquillDiv("solution_step_primary", a.primary), f.append(e), e[0].step = a, b.callbacks.handleElementAdded?.("regular-step-primary", e, a));
                a.secondary && a.secondary.forEach(function(n) {
                    n = createMathquillDiv("solution_step_secondary", n);
                    n[0].step = a;
                    f.append(n);
                    b.callbacks.handleElementAdded?.("regular-step-secondary", n, a)
                });
                void 0 !== a.image && setTimeout(function() {
                    SyNumberLine.fromInStepImageUrl(f, $("blank"), a.image)
                }, 0);
                break;
            case "definition":
                g.writeDefinition(f, a, b);
                a.secondary && a.secondary.forEach(function(n) {
                    f.append(createMathquillDiv("solution_step_secondary", n))
                });
                break;
            case "html":
                e = RegExp("</?formula.*?>", "g");
                h = $('<div class="external_step"></div>');
                h.append(a.content.replaceAll(e, "###"));
                renderMathInElement(h[0], {
                    delimiters: [{
                        left: "###",
                        right: "###",
                        display: !1
                    }]
                });
                if (0 <= h[0].innerText.indexOf("###")) {
                    f.append(h);
                    return
                }
                f.append(h)
        }
        a.result && (e = createMathquillDiv("solution_step_title", a.result), e[0].step = a, f.append(e), b.callbacks.handleElementAdded?.("regular-step-result", e, a))
    }
    toggleInterimStep(a, e, f) {
        const b = this;
        if (a.hasClass("open")) return a.removeClass("open"), a.find(".solution_step_list").first().remove(), "1" !== sy_var && "3" !== sy_var && "4" !== sy_var || a.find(".unlock-steps-message").first().remove(), !1;
        const g = $('<div class="solution_step_list"></div>');
        if (e.input) {
            var h = createMathquillDiv("solution_step_title",
                e.input);
            f.callbacks.handleElementAdded?.("interim-step-input", h, e);
            if (!$("body").hasClass("mobile") && e.meta?.gptData) {
                var m = $("<svg class='locked-step-icon'><use href='#ai-help-with-body'></use></svg>");
                const l = $("<button />", {
                    "class": "ai-help-element",
                    "data-tooltip": "Click for AI help"
                }).append(m);
                m = $("<div>", {
                    "class": "ai-help-container"
                }).append(l);
                l.on("click", async function(n) {
                    n.preventDefault();
                    await b.openAiHelpDialog(l, e.meta?.gptData, e.meta?.gptTitle ?? e.input, f.solutionObject.solution.query.display)
                });
                h = $("<div>", {
                    class: "input-with-ai-help"
                }).append(h).append(m)
            }
            g.append(h)
        }
        e.steps.forEach(function(l) {
            b.renderSteps(l, !1, g, f)
        });
        f.callbacks.handleElementAdded?.("interim-steps", g, e);
        a.append(g);
        a.addClass("open");
        if (e.locked && ("1" === sy_var || "3" === sy_var || "4" === sy_var) && isTier1 && !isMobile && "en" === curLang) {
            g.addClass("locked");
            const {
                template: l,
                imageId: n
            } = getUnlockMessageTemplate();
            h = $(l);
            a.append(h);
            h.find("button.unlock-go-pro").click(() => {
                f.showUpgrade(`Blurred\t${n}`)
            });
            f.callbacks.logFunnel2("SeenFeature",
                `Blurred\t${n}`);
            amplitude.track("Seen", {
                type: "Blurred",
                subject: f?.solutionObject?.solution?.solution?.subject,
                topic: f?.solutionObject?.solution?.solution?.topic,
                subTopic: f?.solutionObject?.solution?.solution?.subTopic
            })
        }
        mathquillifyVisible(a);
        return !0
    }
    writeDefinition(a, e, f) {
        const b = $("<div />", {
            "class": "solution_step_definition_title_container"
        });
        var g = $("<svg class='info'><use href='#definition-i-icon'></use></svg>");
        const h = createMathquillDiv("text", e.title);
        f.callbacks.handleElementAdded?.("definition-step-title",
            b, e);
        const m = $("<svg class='expand'><use href='#definition-expand'></use></svg>"),
            l = $("<svg class='collapse'><use href='#definition-collapse'></use></svg>");
        b.append(g).append(h).append(m).append(l);
        g = e.text.replace(/\\mathrm{([^(}]+)}/ig, function(n, u, p) {
            n = u.split(/\s|\\:/).filter(function(t) {
                return "" !== t
            }).join("}\\:\\mathrm{");
            u = "";
            0 < p && (u = " ");
            return u + "\\mathrm{" + n + "} "
        });
        g = createMathquillDiv("solution_step_definition_body", g);
        f.callbacks.handleElementAdded?.("definition-step-text", g, e);
        e = $("<div />", {
            "class": "solution_step_definition"
        }).append(b).append(g);
        e.on("click", function() {
            $(this).toggleClass("expanded");
            const n = $(".solution_step_definition_body", this);
            mathquillifyVisible(n);
            n.mathquill("redraw")
        });
        a.append(e)
    }
    createSolutionBoxContentUl2(a, e, f) {
        const b = $('<div class="solution_step_list"></div>');
        this.renderSteps(a, e, b, f);
        return b
    }
    getTitleContainer(a, e, f) {
        let b = 0;
        this.isToLock(a) || (b = f.stepsArrayIndex, f.stepsArray[f.stepsArrayIndex] = a, f.stepsHighestBox[f.stepsArrayIndex] = e, f.stepsArrayIndex++);
        a = $("<div></div>", {
            "data-index": b
        });
        e ? a.addClass("solution_title_container_highest") : a.addClass("solution_title_container");
        return a
    }
    isToLock(a, e) {
        return a.isLocked && !e.subscribed
    }
    makeStepByStepSolution(a, e) {
        a.inStepByStep = !0;
        $(".ul-div", e).remove();
        this.populateStepByStep(a, e)
    }
    populateStepByStep(a, e) {
        const f = this;
        a.steps = getFixedStepsFormatAPI(a.stepsObject.solution.steps.steps);
        a.stepIndex = 0;
        $("#step-by-step-container", e).show();
        const b = $("#next-step-button", e);
        b.off("click").on("click", function() {
            const g =
                $(this).closest("#step-by-step-container");
            f.nextStep(a, g)
        });
        $("#next-step-button .text", e).html(i18n("Get a hint") + "&nbsp;<b>" + (a.stepIndex + 1) + "</b> / " + a.steps.length);
        b.show()
    }
    nextStep(a, e) {
        const f = $("#step-by-step-steps", e),
            b = $("#next-step-button .text", e),
            g = $("#next-step-button", e),
            h = a.steps;
        a.stepIndex < h.length && (f.append(this.createStepListItem(h[a.stepIndex], a, e)), $("#step-by-step-steps .mathquill-embedded-latex:not(.mathquill-rendered-math)", e).mathquill());
        a.stepIndex++;
        a.stepIndex < h.length ?
            (b.html(i18n("Next Hint") + "&nbsp;<b>" + (a.stepIndex + 1) + "</b> / " + h.length), g.show()) : (a.callbacks.hintsComplete?.(), g.hide());
        this.getAHint(a)
    }
    createStepListItem(a, e, f) {
        f = $('<li class=" "></li>');
        switch (a.type) {
            case "interim":
                a = this.createSolutionBoxContent(a, !1, e);
                f.append(a);
                e.addMathquillifyVisible(a);
                break;
            case "step":
                this.populateStepListItem(f, a);
                break;
            case "definition":
                this.writeDefinition(f, a, e)
        }
        return f
    }
    populateStepListItem(a, e) {
        void 0 !== e.image && setTimeout(function() {
            SyNumberLine.fromInStepImageUrl(a,
                $("blank"), e.image)
        }, 0);
        if (void 0 !== e.steps)
            for (let b in e.steps) {
                var f = e.steps[b];
                f.isInterimStep ? (f = this.createSolutionBox(f), a.append(f)) : (this.populateStepListItem(a, f), null == f.result && b < e.steps.length - 1 && a.append("<br/>"))
            }
        e.primary && a.append(createMathquillDiv("solution_step_primary", e.primary));
        e.secondary && e.secondary.forEach(function(b) {
            a.append(createMathquillDiv("solution_step_secondary", b))
        });
        void 0 !== e.result && a.append(createMathquillDiv("solution_step_result", e.result))
    }
    getAHint(a) {
        let e =
            "";
        "challenge" === a.config.stepsSettings ? e = "Challenge\t" : "stepByStep" === a.config.stepsSettings && (e = "OneStepAtTime\t");
        a.callbacks.logFunnel("ClickedFeature", e + "Next")
    }
}

function getMethodAndTitleTemplate() {
    return `<div id="steps-title-container">
            <div class="title-or-methods">
                <h2 class="steps-title">${i18n("solution steps")}</h2>
                <div id="methods-container" class="hide">
                    <div id="methods">
                        <span>${i18n("Solve by:")}</span>
                        <div class="group-select-container">
                            <div class="group-select">
                                <select id="methods-target" class="groupSelect">
            
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="steps-button" class="print-hide">
                <svg class="closed" role="button">
                    <use href="#toggle-full-keypad"></use>
                </svg>
                <svg class="open" role="button">
                    <use href="#toggle-full-keypad-open"></use>
                </svg>
                
                <span>${i18n("one step at a time")}</span>
            </div>
        </div>`
}

function getStepsTemplate(a, e, f) {
    return '<div id="steps-container">\n        <section id="multipleSolutions"></section>' + (!f.config.isMobile && a ? '<a id="practice-link-container" class="hide print-hide" href="' + a + '">\n            <img src=\'/public/images/practice_icon1.png\' alt="Practice"/> <span class="text">' + i18n("Practice link title", e) + "</span>\n        </a>" : "") + "</div>"
}

function getStepByStepTemplate() {
    return '<div id="step-by-step-container">\n            <div id="step-by-step-steps">\n\n            </div>\n\n            <div id="next-step-button-container">\n                <div id="next-step-button" role="button">\n                    <span class="text"></span>\n                </div>\n            </div>\n        </div>'
}

function getUnlockMessageTemplate() {
    const a = "4" === sy_var ? "2" : `${Math.floor(3*Math.random())+1}`;
    return {
        template: `<div class="unlock-steps-message">
			<svg><use href="#unlock-steps-${a}"></use></svg>
			<div class="unlock-title">Unlock Solution Steps</div>
			<div class="unlock-message">Get full access to all solution steps for any math problem</div>
			<button class="unlock-go-pro">${"3"===sy_var?"Show Steps":"Go Pro"}</button>
		</div>`,
        imageId: a
    }
}
class Dym {
    render(a, e) {
        const f = a.alternatives;
        if (!f || 0 === f.length) return null;
        const b = $(getDymTemplate()),
            g = b.find("#dym-target");
        f.forEach(function(h) {
            const m = createMathquillSpan("dymQuery", h.display);
            encodeURIComponent(h.symbolab_question);
            var l = encodeURIComponent(h.display);
            const n = h.origin ?? "dym";
            l = $("<a />", {
                "class": "dymQueryLink",
                href: l + "?or=" + n
            });
            l.on("click", () => {
                searchInitiatedLog(h.display, n)
            });
            l.append(m);
            g.append(l)
        });
        e.addMathquillifyVisible(b);
        e.callbacks.handleElementAdded?.("dym", b,
            a.alternatives);
        return b
    }
}

function getDymTemplate() {
    return `<h2>${i18n("Solve instead")}</h2>
    <div id="dym-scroll">
        <div id="dym-target" class="solution_box solution_outside_box box_no_background dym"></div>
    </div>`
}
class Related {
    render(a, e) {
        const f = $("<ul />", {
            id: "relatedList",
            "class": "solution-examples"
        });
        this.addRelatedProblems(f, a.related, 0, 3);
        e.addMathquillifyVisible(f);
        e.callbacks.handleElementAdded?.("related", f, a.related);
        return f
    }
    addRelatedProblems(a, e, f, b) {
        const g = this;
        if (e && 0 < e.length) {
            $("#related").show();
            for ($("#bar-Related").show(); f < e.length && f < b; f++) {
                let m = e[f];
                var h = encodeURIComponent(m.display);
                const l = m.origin ?? "related";
                h = h + "?or=" + l;
                let n = m.display.replace(/ /g, "\\:").replace(/</g, "&lt;").replace(/>/g,
                    "&gt;");
                n = prepareQueryForMathQuill(n);
                h = $('<li><a href="' + h + '"><span class="mathquill-embedded-latex">' + n + '</span><span class="related_arrow"><svg><use href="#red-full-arrow-svg"></use></svg></span></a></li>');
                $("a", h).on("click", () => {
                    searchInitiatedLog(m.display, l)
                });
                a.append(h)
            }
            e.length > b ? (f = $('<li class="more-li"><a><span class="more">' + i18n("Show More") + "</span></a></li>"), f.on("click", function() {
                g.addRelatedProblems(a, e, b, 100)
            }), a.append(f)) : a.find(".more-li").remove()
        }
        mathquillifyVisible(a)
    }
}
class Plot {
    render(a, e, f) {
        const b = $("<div />");
        let g = a ?? e?.solution?.plot_output?.meta?.plotInfo;
        f.showPlot = !1;
        if (g)
            if (a = g.plotRequest, "" === a) f.showPlot = !1;
            else if (a) "yes" === a && e && (a = e.solution.query.display), f.callbacks.requestPlot?.(a);
        else {
            b.append($(this.getTemplate()));
            const h = b.find("#sy_graph");
            f.showPlot = !0;
            f.addPostRenderStep(l => {
                f.syPlot = new SyPlot(h, g, this.getPlotSettings(!0, !0))
            });
            e = b.find(".plotText");
            e.show();
            e = e.find(".plotTextTarget").empty();
            a = this.getPlotTitle(g);
            e.append(createMathquillSpan(null,
                a));
            let m;
            f.solutionObject.solution.plot_output.meta.showViewLarger && (m = f.solutionObject.solution.query.display, "System of Inequalities" === f.solutionObject.solution.solution.topic && (m = m.replace(/,/g, ";")));
            m ? (m = m.replace(/ /g, "\\:"), m = encodeURI(m), m = m.replace(/\+/g, "%2B"), m = m.replace(/&/g, "%26"), b.find(".viewLargerPlot").attr("href", "/graphing-calculator?or=" + SYMBOLAB.params.or + "&functions=" + m)) : b.find(".viewLargerPlot").hide();
            f.addMathquillifyVisible(b);
            $("#bar-Graph").show();
            f.callbacks.plotComplete?.()
        } else f.callbacks.plotComplete?.();
        return b
    }
    getPlotTitle(a) {
        let e = "";
        if (a && a.functionChanges && a.functionChanges[0] && (a = a.functionChanges[0], e = a.plotTitle, a.paramsLatex && a.paramsLatex.length)) {
            e += "\\quad\\mathrm{" + i18n("plot assuming") + "}";
            for (let f = 0; f < a.paramsLatex.length; f++) e += "\\quad ", e += a.paramsLatex[f], e += "=", e += a.paramsReplacementsLatex[f]
        }
        return e
    }
    getPlotSettings(a, e) {
        return {
            showZoom: a,
            pixelRatio: window.devicePixelRatio,
            lineWidth: 2,
            allowTouch: e
        }
    }
    getTemplate() {
        return `<div id="plot"> </div>
                <div class="solution_box solution_outside_box">
                    <div class="plot-title-and-expand">
                        <h2>${i18n("plot")}</h2>
                        <div id="show-hide-plot-div" class="expanded">
                            <svg class='expand'><use href='#graph-expand'></use></svg>
                            <svg class='collapse'><use href='#graph-collapse'></use></svg>
                        </div>
                    </div>
                    <div class="entire-plot">
                        <div class="plotText">
                            <span class="plotting">${i18n("plotting")}:&nbsp;</span>
                            <span class="plotTextTarget"></span>
                        </div>
                        <div class="bare-plot-container">
                            <div id="plot-loading" style="display: none;"><img src="/public/img/ajax-loader.gif"/></div>
                            <canvas id="sy_graph">Sorry, your browser does not support this application</canvas>
                        </div>
                        <div>
                            <a class="print-hide viewLargerPlot"><svg><use href="#gc-icon"></use></svg>${i18n("View interactive graph0")}</a>
                        </div>
                    </div>
                </div>`
    }
}
class ChallengeLink {
    render(a, e) {
        const f = a.similar;
        e.config.challenge = f;
        if (!f || e.eitherStepByStepOrChallenge()) return $("<div />");
        a = $(this.getTemplate());
        a.find("#challenge-button").off("click").on("click", function() {
            e.callbacks.challengeClicked?.(f)
        });
        a.find("#challenge-subscribe .subscribe-button").off("click").on("click", function() {
            e.callbacks.challengeSubscribeClicked?.()
        });
        e.logFunnel("SeenFeature", "Challenge");
        return a
    }
    getTemplate() {
        return '<div id="challenge-container">\n                <div id="challenge-button">\n                    <div id="challenge-text">' + i18n("Take a challenge!") +
            '</div>\n                    <svg>\n                        <use href="#challenge-icon"></use>\n                    </svg>\n                </div>\n                <div id="challenge-subscribe" class="hide">\n                    <div id="challenge-subscription">\n                        <span>' + i18n("Take a challenge!") + '</span>\n                        <svg class="close">\n                            <use href="#close-white-svg"></use>\n                        </svg>\n                    </div>\n                    <div id="subscribe-before-verify">\n                        ' +
            i18n("Subscribe to take a challenge") + '\n                    </div>\n                    <div class="subscribe-button" role="button">\n                        ' + i18n("Subscribe") + "\n                    </div>\n                </div>\n            </div>"
    }
}
class AiChatDialog {
    constructor(a, e, f, b, g) {
        this.anchor = a;
        this.logFunnel = e;
        this.userName = f;
        this.gptData = b;
        this.query = g;
        this.sessionId = URL.createObjectURL(new Blob([])).split("/").pop();
        this.welcomeMessages = [`Hi ${this.userName}, how can I help you?`, "Type a question or select an option below."];
        this.limitReached = !1;
        this.questionNumber = 0
    }
    show() {
        var a = $(".ai-chat-dialog");
        if (0 < a.length) a[0].aiDialog.closeDialog();
        else {
            this.dialog = a = $(this.getTemplate());
            this.dialog[0].aiDialog = this;
            this.anchor.append(a);
            this.input = $(".ai-input input", a);
            this.inputButton = $(".ai-input button", a);
            a.on("click", ".close-button", async () => {
                await this.closeDialog()
            });
            var e = async () => {
                const f = this.input.val().trim();
                this.input.val("");
                0 === f.length ? this.addMessage("chatbot", "Please ask a question") : await this.sendRequest(f, !1)
            };
            a.on("click", ".ai-input .input-button", e);
            this.input.on("keyup", async f => {
                13 === f.keyCode && await e()
            });
            this.welcomeMessages.forEach((f, b) => {
                this.addTimedMessage("chatbot", f, 500 * (b + 1))
            });
            this.addTimedMessage("option",
                "I didn't understand this step", 1E3);
            this.addTimedMessage("option", "Explain this more simply", 1E3);
            a.on("click", ".message.option", async f => {
                const b = f.currentTarget.textContent;
                $(f.currentTarget).remove();
                await this.sendRequest(b, !0)
            });
            this.anchor[0].getBoundingClientRect().y + a[0].getBoundingClientRect().height > window.visualViewport.height && a[0].scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
            setTimeout(() => {
                this.input.focus()
            }, 500)
        }
    }
    addMessage(a, e) {
        const f = $(".main-content", this.anchor),
            b = $("<div>", {
                class: `message ${a}`
            });
        e && b.text(e);
        "chatbot" === a && b.append($("<div>"));
        f.append(b);
        this.scrollDown();
        return b
    }
    addToMessage(a, e) {
        let f = a.children().last(),
            b = f.text();
        for (let g = 0; g < e.length; g++) {
            const h = e[g];
            "\n" === h ? (f.text(b), f = $("<div>"), a.append(f), b = "") : b += h
        }
        f.text(b)
    }
    addTimedMessage(a, e, f) {
        setTimeout(() => {
            this.addMessage(a, e)
        }, f)
    }
    scrollDown() {
        const a = $(".main-content", this.dialog);
        a && (a[0].scrollTop = a[0].scrollHeight)
    }
    async sendRequest(a, e) {
        this.enableInput(!1);
        this.questionNumber++;
        this.addMessage("user",
            a);
        const f = this;
        setTimeout(async () => {
            const b = this.addMessage("chatbot");
            let g = $("<div>", {
                class: "waiting"
            });
            var h = (l, n) => {
                const u = $("<span>.</span>");
                u.css({
                    "animation-delay": `${n}s`
                });
                l.append(u)
            };
            h(g, 0);
            h(g, .1);
            h(g, .2);
            b.append(g);
            this.scrollDown();
            let m = 0;
            h = function(l) {
                g.remove();
                if (!l.currentTarget || 200 === l.currentTarget.status) {
                    var n = l.currentTarget.response;
                    l = n.substring(m);
                    m = n.length;
                    n = l.replace("<!-ERROR->", "");
                    n !== l && (f.limitReached = !0, l = n);
                    0 < l.length && (f.addToMessage(b, l), f.scrollDown())
                }
            };
            try {
                await ajax({
                    type: "POST",
                    url: `/pub_api/gptExplanation?data=${encodeURIComponent(f.gptData)}`,
                    data: {
                        userMessage: a,
                        conversationId: f.sessionId,
                        userTextCameFromButton: e,
                        problem: f.query
                    },
                    beforeSend: authorizeAjaxWithSyPubToken,
                    xhrFields: {
                        onprogress: h
                    }
                })
            } catch (l) {
                200 !== l.status && (f.addToMessage(b, "I am sorry - something went wrong, please try again..."), f.scrollDown(), f.logFunnel("SeenFeature", "AI_Inside\tDialogueError"))
            } finally {
                this.limitReached || (this.enableInput(!0), this.input.focus())
            }
        }, 500);
        this.logFunnel("ClickedFeature",
            "AI_Inside\tQuestion" + this.questionNumber)
    }
    enableInput(a) {
        this.input.prop("disabled", !a);
        this.inputButton.prop("disabled", !a)
    }
    async closeDialog() {
        this.dialog.remove();
        this.logFunnel("ClickedFeature", "AI_Inside\tClose")
    }
    getTemplate() {
        return '\n            <div class="ai-chat-dialog">\n                <header>\n                    <svg ><use href="#ai-help"></use></svg>\n                    <div class="dialog-title">\n                        <div>Chat with Symbo</div>     \n                        <div class="tooltip-container" data-tooltip="AI may present inaccurate or offensive content that does not represent Symbolab\'s views.">\n                            <svg><use href="#definition-i-icon-black"></use></svg>\n                            <svg class="red"><use href="#definition-i-icon-red"></use></svg>                                \n                        </div>                    \n                    </div>\n                    <button class="close-button"><svg ><use href="#close-svg"></use></svg></button>                    \n                </header>\n                <div class="main-content"></div>\n                <div class="dialog-footer">\n                    <div class="ai-input">\n                        <input placeholder="Ask a question">\n                        <button class="input-button"><svg ><use href="#send"></use></svg></button>\n                    </div>\n                    <div class="disclaimer">Do not enter any personal information</div>    \n                </div>\n            </div>\n        '
    }
}
const SYSTEPS = new SymbolabSteps,
    NETWORK = new Network,
    SCROLLUTILS = new ScrollUtils;
let state, challengeState = void 0;
var currentElsLint = [];

function logFunnel(a, e) {
    symbolab_log("Registration", a, "Solver\t" + e)
}

function logFunnel2(a, e, f) {
    const b = state?.solutionObject?.solution?.solution?.topic,
        g = state?.solutionObject?.solution?.solution?.subTopic;
    e = "Solver\t" + e;
    b && (e += "\t" + b);
    g && (e += "\t" + g);
    void 0 !== f && (e += "\t" + f);
    symbolab_log("Registration", a, e)
}

function showStepsRequested() {
    void 0 !== state && (state.stepsObject ? renderSteps(state) : ($("#show-steps-button").hide(), $("#steps-button-loading").removeClass("hide-important"), state.config.query = state.solutionObject.solution.query.symbolab_question, NETWORK.getSteps(state).done(a => {
        state.stepsObject = a;
        renderSteps(state);
        $("#steps-button-loading").addClass("hide-important");
        $("#show-steps-button").show()
    }).fail(a => {
        const e = i18n("\\mathrm{Connection\\:error,\\:please\\:try\\:again}");
        isMobile ? ($("#error").removeClass("hide-important").addClass("toastError"),
            toast($("#error"), e)) : alertify.okBtn("OK").alert(e);
        $("#steps-button-loading").hide();
        symbolab_log("Communication error", "getSteps " + a.statusText)
    })))
}

function openVerifyRequested() {
    subscribed ? openVerify(!1, !1) : ($("#verify-subscribe").show(), $("#verify-subscribe .close").off("click").on("click", function() {
        $("#verify-subscribe").hide()
    }), $("#challenge-subscribe").hide())
}

function openVerify(a, e) {
    const f = $("#codepad-align-width2 .mathquill-editable");
    e || f.mathquill("latex", "");
    $("#verify-floating-background").removeClass("hide-important");
    $("#challenge-success").addClass("hide-important");
    $("#codepad-align-width2").removeClass("codepad-align-width2-shrink");
    $("#codepad-align-width2-title").removeClass("hide-important");
    $("#verify-subscribe-challenge").hide();
    $("#codepad-align-width2").mathquill("redraw");
    $("#codepad-align-width2 #verify-result").addClass("hide-important");
    a ? ($("#codepad-align-width2 #step-by-step-target").show(), $("#codepad-align-width2 .challenge-header").removeClass("hide-important"), f.mathquill("placeholder", i18n("js.Know the answer? Give it a try"))) : (challengeState = void 0, $("#codepad-align-width2 .challenge-header").addClass("hide-important"), $("#codepad-align-width2 #step-by-step-container").hide(), f.mathquill("placeholder", "\\mathrm{" + (i18n("Got a different answer?") + " " + i18n("Check if it's correct")).replace(/\s/gi, "\\:") + "}"));
    SYPAD.activeInputBox =
        f;
    SYSUGGEST = null
}

function openChallengeRequested(a) {
    if (void 0 !== a)
        if (subscribed) challengeState = SYSTEPS.createState({
            origin,
            language: curLang,
            query: a.symbolab_question,
            choices: "",
            referer,
            initialQuery: globalQuery,
            stepsSettings: "challenge"
        }), challengeState.callbacks = {
            hintsComplete: function() {
                challengeState.noMoreHints = !0
            },
            logFunnel: function(e, f) {
                logFunnel(e, f, state.config.initialQuery)
            },
            logFunnel2: function(e, f) {
                logFunnel2(e, f)
            }
        }, NETWORK.getSteps(challengeState).done(e => {
            challengeState.stepsObject = e;
            challengeState.stepsArrayIndex = 0;
            renderSteps(challengeState, $("#step-by-step-target"));
            openVerify(!0, !1);
            $("#codepad-align-width2 .challenge-query-display").html(a.display).mathquill()
        });
        else {
            const e = 400 < $("#challenge-button")[0].getBoundingClientRect().y;
            $("#challenge-subscribe").toggleClass("top-placement", e);
            $("#challenge-subscribe").show();
            $("#challenge-subscribe .close").off("click").on("click", function() {
                $("#challenge-subscribe").hide()
            });
            $("#verify-subscribe").hide()
        }
}

function getStepsEventData(a, e) {
    var f = {},
        b = void 0 === a.solutionObject ? a.stepsObject : a.solutionObject;
    f.type = e;
    f.success = void 0 === b?.error;
    f.userQuery = a.config.query;
    f.origin = a.config.origin;
    f.stdQuery = b?.queryDisplay;
    b?.solution?.solution && (f.subject = b.solution.solution.subject, f.topic = b.solution.solution.topic, f.subTopic = b.solution.solution.subTopic);
    return f
}

function renderSteps(a, e) {
    amplitude.track("Solve", getStepsEventData(a, "Steps"));
    SYSTEPS.renderSteps(a);
    let f = e ?? $("#solution-steps-target"),
        b = e ?? $("#solution-step-by-step-container");
    f.empty();
    b.empty();
    "showSteps" === a.config.stepsSettings ? f.append(a.solutionStepsContainer) : b.append(a.solutionStepByStepContainer);
    SYSTEPS.postRender(a);
    e || ($("#solution-methods-title-target").empty().append(a.solutionMethodsAndTitleContainer).removeClass("hide-important"), $("#show-steps-button").addClass("hide-important"),
        $("#show-hide-steps-divider").removeClass("hide-important"), $("#step-by-step-container").removeClass("hide-important"))
}

function goToDestination(a, e, f) {
    a.preventDefault();
    a.stopPropagation();
    goToDestination0($(a.currentTarget), e, f)
}

function goToDestination0(a, e, f) {
    currentElsLint.push({
        curEl: a,
        hrefDestination: e,
        isPressedOnTheTitle: f
    });
    if (f) {
        if ("#arrow_down-svg" === a.next().find("use").attr("href") && a.parent().hasClass("red_color")) {
            arrowRightClick(a.next());
            return
        }
        if (!a.parent().parent().hasClass("parentPage")) {
            let b = e.replace("/solver/", "");
            NETWORK.getPageData(window.location.host, b).done(g => {
                examplesHtml(g.examplesTranslate, b);
                if (0 < a.next().find("use").length)(a.parent().hasClass("nl-leftMenu") && a.parent().hasClass("red_color") ||
                    0 < a.next().find("use").attr("href").indexOf("arrow_right-svg")) && arrowRightClick(a.next());
                else {
                    var h = $(".arrow_right use");
                    let m = h.attr("href");
                    h = h.parent().parent();
                    let l = h.parent().parent().find(a);
                    "#arrow_down-svg" === m && 0 === l.length && arrowRightClick(h)
                }
                $(".nl-leftMenu.red_color").removeClass("red_color");
                a.parent().addClass("red_color");
                replacePage(e, g.title, g.translationUrlName, g.input, g.input_back, g.middle_text, g.faqs, g.studyGuideList, g.blogsExternalLinkInfo, g.pubButtons)
            });
            return
        }
    }
    if (0 < a.find("use").length)
        if ("#arrow_down-svg" ===
            a.find("use").attr("href") || "#arrow_right-svg" === a.find("use").attr("href") && a.parent().hasClass("red_color")) arrowRightClick(a);
        else {
            let b = e.replace("/solver/", "");
            NETWORK.getPageData(window.location.host, b).done(g => {
                examplesHtml(g.examplesTranslate, b);
                arrowRightClick(a);
                $(".nl-leftMenu.red_color").removeClass("red_color");
                a.parent().addClass("red_color");
                replacePage(e, g.title, g.translationUrlName, g.input, g.input_back, g.middle_text, g.faqs, g.studyGuideList, g.blogsExternalLinkInfo, g.pubButtons)
            })
        }
    else f =
        e.replace("/solver/", ""), "" === f && (f = "step-by-step"), getLocalStorage().setItem("linkOrigin", "SolutionLeftMenu"), symbolab_log("Solutions", "MenuLeft", page + "=>" + f).always(function() {
            window.location.href = e
        })
}

function replacePage(a, e, f, b, g, h, m, l, n, u) {
    let p = a.replace("/solver/", "");
    "" === p && (p = "step-by-step");
    symbolab_log("Solutions", "MenuLeft", page + "=>" + p);
    page = a;
    document.title = e;
    page_title = f;
    history.pushState({}, document.title, a);
    amplitude.track("Enter", {
        data: window.location.pathname,
        linkOrigin: "SolutionLeftMenu"
    });
    symbolab_log("Solutions", "Enter", window.location.pathname);
    "" !== globalQuery && (globalQuery = "", $("#Plot_dynaimc").hide(), $("#related").hide(), $("#bar-Related").hide(), $("#dym").hide(), $("#challenge").empty(),
        $("#solution-step-by-step-container").empty(), $("#all-pads").addClass("on"));
    $("#all-pads").mathquill("redraw");
    a = "";
    void 0 !== b && (a = anotherHtmlDecode(b));
    $("#main-input").mathquill("latex", "");
    a && ($("#main-input").mathquill("write", a.replace(/&amp;/g, "&"), g), setTimeout(() => {
        $("#main-input").focus()
    }, 50));
    $(".mathquill-editable").mathquill("placeholder", "\\mathrm{" + i18n("Enter a Problem").replaceAll(" ", "\\:") + "}");
    $("#solution-only-container").hide();
    $("#nl-edit-bar").addClass("hide-important");
    void 0 !==
        h && "" !== h && ($("#topic-description_body").empty().html(h), $("#topic-description").show());
    void 0 === m ? $("#FAQPlaceHolders").hide() : $("#FAQPlaceHolders").empty().append(faqsHtmlCreator(m)).show();
    void 0 === l ? $("#study-guides-placeholder").hide() : $("#study-guides-placeholder").empty().append(studyGuidesHtmlCreator(l)).show();
    b = blogsHtmlCreator(n);
    $(".new_solution_box_body").empty().append(b);
    b = buttonsActionsHtmlCreator(u);
    $("#MostUsedActions").empty().append(b);
    for (let t of u) $("#padButton-" + t.translations.en.show.replace(" ",
        "_")).text("\\mathrm{" + t.translations[curLang].show.replace(" ", "\\:") + "}").mathquill();
    setBreadCrumbs()
}

function faqsHtmlCreator(a) {
    let e = '<section id="FAQ" className="print-hide hide-until-loaded"><div>Frequently Asked Questions (FAQ)</div><ul>';
    for (let f = 0; f < a.faqs.length; f++) e += "<li><div>" + a.faqs[f].fst + "</div></li>", e += "<li><span>" + a.faqs[f].snd + "</span></li>";
    return e += '<li class="show-more-li showing-all"><a><span class="show-more">Show more</span></a></li></ul>' + a.ldJson + "</section>"
}

function studyGuidesHtmlCreator(a) {
    let e = '\n        <section id="study-guides" class="print-hide hide-until-loaded">\n            <div>Study Guides</div>\n            <ul>';
    for (const f of a) e += `
            <li>
                <a class='externalLink embedPost' href='/study-guides/${f.resourceLocation}'>
                    <div>${f.title}</div>
                    <span>${f.snippet}</span>
                </a>
            </li>`;
    return e + '\n                <li class="show-more-li showing-all"><a><span class="show-more">Show more</span></a></li>\n            </ul>\n        </section>'
}

function blogsHtmlCreator(a) {
    let e = "";
    for (let f of a) e += "<li><span class='bloggerIcon'></span><div class='post_title'>" + f.title + "</div><div class='post_content'>" + f.shortText + "...</div><a class='externalLink embedPost' href='" + f.url + "' target='_blank'><div class='post_more'>Read More</div></a></li>";
    return e
}

function buttonsActionsHtmlCreator(a) {
    let e = "";
    for (let f of a) e += '<span class="padButton new-pad-button font16" data-append="' + f.translations[curLang].write + '" data-moveleft="' + f.moveBack + '" data-clear="true"><span class="mathquill-embedded-latex" id="padButton-' + f.translations.en.show.replace(" ", "_") + '"></span></span>';
    e += '<span style="position: relative;"><svg class="svg-icon"><use href="#dropdown_arrow"></use></svg><select id="most_used_dropdown"><option>' + i18n("See All") + "</option>";
    for (let f of a) e +=
        '<option data-append="' + f.translations[curLang].write + " data-moveleft=" + f.moveBack + '" data-clear="true">' + f.translations[curLang].show + "</option>";
    return e + "</select></span>"
}

function setBreadCrumbs() {
    let a = window.location.pathname,
        e = $("#bread-crumbs");
    e.empty();
    const f = a.split("/");
    let b = "";
    for (let l = 1; l < f.length; l++) {
        let n = f[l];
        if ("/solver" === a || "/solver/" === a || "/solver/step-by-step" === a || "/solver/step-by-step/" === a) b += "/" + n;
        else if (1 !== l || "step-by-step" !== f[2] && "solver" !== f[2]) {
            if (2 === l && n !== subject_page) {
                var g = $("<span />");
                g.html(" > ");
                var h = $("<a />", {
                    href: b + "/" + subject_page
                });
                e.append(h);
                var m = $("<h3 />");
                m.html(subject_page_title);
                h.append(m);
                e.append(g)
            }
            b += "/" +
                n;
            n = "step-by-step" === n || "solver" === n ? i18n("Solutions") : page_title;
            g = $("<span />");
            g.html(" > ");
            h = $("<a />", {
                href: b
            });
            e.append(h);
            m = $("<h3 />");
            m.html(n);
            h.append(m);
            l < f.length - 1 ? e.append(g) : "" !== globalQuery && m.html(title)
        } else b += "/" + n
    }
}

function arrowRightClick(a) {
    var e = a.find("use"),
        f = !1;
    let b = a.parent().next("ul");
    0 < e.attr("href").indexOf("arrow_right-svg") && (f = !0);
    a.closest("ul").eq(0).find("ul").hide();
    a.closest("ul").eq(0).find(".arrow_right svg use").attr("href", "#arrow_right-svg");
    f && (e.attr("href", "#arrow_down-svg"), b.eq(0).removeClass("hide"), b.eq(0).slideToggle(300))
}

function examplesHtml(a, e) {
    let f = "";
    a.forEach(function(b, g) {
        g = "";
        "word-problems-calculator" === e && (g += "\\mathrm{");
        g += b.replaceAll("^\\/.+?\\/", "");
        "word-problems-calculator" === e && (g += "}");
        f += `<li>
            <a href="/solver/${"/"===b.charAt(0)?b.substring(1,b.indexOf("/",1)):e}/${encodeURIComponent(b.replaceAll("^\\/.+?\\/","").replace("\\:"," ")).replace("+","%20")}?or=ex">
                <span class="mathquill-embedded-latex mathquill-rendered-math">` + g + "</span>"; - 1 != !e.indexOf("problems") && (f += "<span class='solution-examples-img'>\n                     <svg><use href=\"#red-full-arrow-svg\"></use></svg>\n                 </span>");
        f += "</a>\n            </li>"
    });
    3 < a.length && (f += '<li class="show-more-li showing-all"><a><span class="show-more">' + i18n("Show More") + "</span></a></li>");
    a = $(f);
    $(".solution-examples").empty().append(a).find(".mathquill-embedded-latex").mathquill();
    logExampleClickEvents();
    $(".solution-examples .show-more").click(function() {
        $("#Examples_section .solution-examples > li").addClass("showing-all");
        $("#Examples_section .solution-examples > li").mathquill("redraw");
        $(".solution-examples .show-more-li").remove()
    })
}

function logExampleClickEvents() {
    $("#Examples_section li a").on("click", function() {
        searchInitiatedLog($(this).attr("href"), "ex")
    })
}
$(function() {
    function a() {
        $("#verify-subscribe-challenge").show();
        $("#verify-subscribe-challenge .close").off("click").on("click", function() {
            $("#verify-subscribe-challenge").hide()
        })
    }

    function e(l, n, u) {
        if ("" !== udid) {
            displayUserNotes || (displayUserNotes = [], userNotes.forEach(function(t, w) {
                3 > w && displayUserNotes.push(t)
            }));
            if (n && (displayUserNotes = [], userNotes.forEach(function(t, w) {
                    3 > displayUserNotes.length && t.display !== l.solutionObject.solution.query.display && displayUserNotes.push(t)
                }), u))
                for (displayUserNotes.unshift({
                        display: l.solutionObject.solution.query.display,
                        question: l.solutionObject.solution.query.symbolab_question,
                        url: encodeURIComponent(l.solutionObject.solution.query.display.replaceAll("\\\\", "\\\\").replaceAll("\\s+", "\\\\:").replaceAll("^\\/.+?\\/", "")).replace("+", "%20")
                    }); 3 < displayUserNotes.length;) displayUserNotes.pop();
            if (0 === displayUserNotes.length) $("#save-as-bookmark").addClass("add-bookmark").css("visibility", "visible").show();
            else {
                $("#save-as-bookmark").hide();
                $("#save-as-bookmark").removeClass("add-bookmark");
                var p = `
						<div id="top-three-notes">
							<div class="new_solution_box_title1">${i18n("Notebook")}</div>
							<ul>`;
                displayUserNotes.forEach(function(t) {
                    let w = '\n\t\t\t\t\t\t\t\t<li class="note">\n\t\t\t\t\t\t\t\t\t<a href="/solver/' + ("" === t.display ? "step-by-step/" + t.problem : "/" === t.display.charAt(0) ? t.display.substring(1, t.display.indexOf("/", 1)) : page) + "/" + t.url + '?or=nb">\n\t\t\t\t\t\t\t\t\t<span class="math-container">\n\t\t\t\t\t\t\t\t\t\t<span class="mathquill-embedded-latex">';
                    w = t.display ? w + t.display.replaceAll(" ", "\\:") : w + t.problem.replaceAll(" ", "\\:");
                    p += w + '</span></span>\n\t\t\t\t\t\t\t\t\t\t<span class="related_arrow"><svg><use href="#red-full-arrow-svg"></use></svg></span>\n\t\t\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t\t\t</li>'
                });
                p += `
							</ul>
							<a id="view_full_notebook" href="/notebook">
								<svg>
									<use href="#view_full_notebook-svg"></use>
									<span>${i18n("View Full Notebook")}</span>
								</svg>
							</a>
						</div>`;
                n = $(p);
                $("#top-three-notes").removeClass("hide-important").empty().append(n).find(".mathquill-embedded-latex:not(.mathquill-rendered-math)").mathquill()
            }
        }
    }

    function f(l) {
        let n = "";
        switch (l.toLowerCase()) {
            case "challenge":
                n = "&feature=challenge";
                break;
            case "verify":
                n = "&feature=verify"
        }
        l = "Solver\t" + l;
        state?.solutionObject && (l += "\t" + state.solutionObject.solution.solution.topic + "\t" + state.solutionObject.solution.solution.subTopic + "\t" + state.solutionObject.solution.solution.interimType);
        showSignUpSubscribe(l,
            "stepsSettings=" + state.config.stepsSettings + n)
    }

    function b(l) {
        void 0 === l && (l = !1);
        let n = !0;
        const u = $("#leave-challenge-floating-background");
        !challengeState || l || challengeState.noMoreHints || challengeState.wasCorrect || (n = !1, u.removeClass("hide-important"), u.off("click").on("click", function(p) {
            $(p.target).is($(this)) && $(this).addClass("hide-important")
        }), $("#cancel-leaving-challenge").off("click").on("click", function() {
            u.addClass("hide-important")
        }), $("#leave-challenge-button").off("click").on("click",
            function() {
                b(!0)
            }));
        n && (challengeState = void 0, $("#verify-floating-background").addClass("hide-important"), u.addClass("hide-important"), SYPAD.activeInputBox = $("#main-input .mathquill-editable"), SYSUGGEST = SYSUGGEST_OBJ)
    }

    function g() {
        var l = !isMobile || null != origin && ("ex" === origin || origin.includes("popular"));
        state = SYSTEPS.createState({
            origin,
            language: curLang,
            query: globalQuery,
            choices: "",
            referer,
            initialQuery: globalQuery,
            isMobile: ("undefined" !== typeof isMobile && isMobile) ?? !1
        });
        const n = new URLSearchParams(window.location.search);
        let u = n.get("stepsSettings");
        0 > ["showSteps", "hideSteps", "stepByStep"].indexOf(u) && (u = l ? "showSteps" : "hideSteps");
        state.config.stepsSettings = u;
        state.config.requestedFeature = n.get("feature");
        n.delete("stepsSettings");
        n.delete("feature");
        l = window.location.href.replace(/\?.*$/, "?" + n.toString());
        history.replaceState({}, document.title, l);
        state.callbacks = {
            logFunnel: function(p, t) {
                logFunnel(p, t, state.config.initialQuery)
            },
            logFunnel2: function(p, t) {
                logFunnel2(p, t)
            },
            requestPlot: function(p) {
                state.plotRequest = p;
                NETWORK.getPlot(state).done(t => {
                    state.plotInfo = t;
                    SYSTEPS.renderPlot(t, void 0, state);
                    $("#Plot_dynaimc").empty().append(state.plotContainer);
                    SYSTEPS.postRender(state)
                })
            },
            plotComplete: function() {
                state.plotReady = !0
            },
            showUpgrade(p, t) {
                isMobile ? signedIn ? subscribed || showSubscription(p) : showGoogleSignIn(p, t) : f(p)
            },
            setNewQuery(p, t, w) {
                void 0 === w && (w = !1);
                state.config.query = p;
                w && (state.config.stepsSettings = "showSteps");
                NETWORK.getSteps(state).done(v => {
                    state.stepsObject = v;
                    state.stepsArrayIndex = 0;
                    renderSteps(state)
                }).fail(v => {
                    const z = i18n("\\mathrm{Connection\\:error,\\:please\\:try\\:again}");
                    isMobile ? ($("#error").removeClass("hide-important").addClass("toastError"), toast($("#error"), z)) : alertify.okBtn("OK").alert(z);
                    $("#steps-button-loading").hide();
                    $("#show-steps-button").show();
                    symbolab_log("Communication error", "getSteps " + v.statusText)
                })
            },
            challengeClicked: function(p) {
                logFunnel("ClickedFeature", "Challenge");
                openChallengeRequested(p)
            },
            challengeSubscribeClicked: function() {
                f("Challenge")
            },
            refreshGraph: function() {
                state.plotInfo &&
                    state.plotReady && (SYSTEPS.renderPlot(state.plotInfo, void 0, state, !0), $("#Plot_dynaimc").empty().append(state.plotContainer), SYSTEPS.postRender(state))
            }
        };
        NETWORK.getSolution(state).pipe(p => {
            "External Solutions" === p?.solution?.solution?.subject && h();
            return p
        }).done(p => {
            state.solutionObject = p;
            amplitude.track("Solve", getStepsEventData(state, "Solution"));
            $("#query_spin").remove();
            if (void 0 !== p.error) p = p.error.message.replaceAll(" ", "\\:"), $("#error").html(p).mathquill().removeClass("hide-important").mathquill("redraw");
            else {
                (state.solutionObject.solution.solution.subject ?? "").toLowerCase().includes("word problem") && $(".nl-page").addClass("word-problems");
                var t = prepareQueryForMathQuill(p.solution.query.display);
                $("#mathquillQueryInput").mathquill("latex", t, 0);
                SYSTEPS.renderSolution(state);
                SYSTEPS.renderDym(state);
                SYSTEPS.renderRelated(state);
                SYSTEPS.renderChallengeLink(state);
                SYSTEPS.renderPlot(void 0, p, state);
                $("#solution-only-target").empty().append(state.solutionContainer);
                t = $("#dym");
                state.dymContainer ? (t.removeClass("empty"),
                    t.empty().append(state.dymContainer)) : t.addClass("empty");
                $("#relatedBox").empty().append(state.relatedContainer);
                t = $("#Plot_dynaimc");
                t.empty().append(state.plotContainer);
                t.show();
                $("#challenge").empty().append(state.challengeLinkContainer).removeClass("hide-important");
                SYSTEPS.postRender(state);
                p.isInNotebook && $("#bar-bookmark").addClass("has-note");
                $("#bar-bookmark").show();
                p.solution.meta?.showVerify && $("#verify-btn").show();
                $("#show-steps-button").removeClass("hide-important");
                state.stepsArrayIndex =
                    0;
                if (state.config.stepsSettings) switch (state.config.stepsSettings) {
                    case "showSteps":
                    case "stepByStep":
                        showStepsRequested()
                }
                if (state.config.requestedFeature) switch (state.config.requestedFeature) {
                    case "verify":
                        openVerifyRequested();
                        break;
                    case "challenge":
                        openChallengeRequested(state.config.challenge)
                }
            }
        }).fail(p => {
            const t = i18n("\\mathrm{Connection\\:error,\\:please\\:try\\:again}");
            isMobile ? toast($("#toast"), t) : alertify.okBtn("OK").alert(t);
            $("#query_spin").remove();
            symbolab_log("Communication error",
                "getSolution " + p.statusText)
        })
    }

    function h() {
        const l = document.createElement("link");
        l.rel = "stylesheet";
        l.href = "https://cdn.jsdelivr.net/npm/katex@0.13.18/dist/katex.min.css";
        l.integrity = "sha384-zTROYFVGOfTw7JV7KUu8udsvW2fx4lWOsCEDqhBreBwlHI4ioVRtmIvEThzJHGET";
        l.crossOrigin = "anonymous";
        l.async = !1;
        document.body.appendChild(l);
        return $.when(loadScript("https://cdn.jsdelivr.net/npm/katex@0.13.18/dist/katex.min.js")).pipe(function() {
            return $.when(loadScript("https://cdn.jsdelivr.net/npm/katex@0.13.18/dist/contrib/auto-render.min.js"))
        })
    }
    SYMBOLAB = new Symbolab("fe", globalQuery, curLang);
    SYPAD = new SymbolabPad(curLang);
    SYSUGGEST_OBJ = new SymbolabEquationSuggest;
    SYSUGGEST = null;
    var m = $("#main-input");
    SYPAD.activeInputBox = m;
    $(".mathquill-editable").addClass("nl-disabled");
    $(".mathquill-editable:not(.mathquill-rendered-math)").mathquill("editable");
    $(".mathquill-editable").mathquill("placeholder", "\\mathrm{" + i18n("Enter a Problem").replaceAll(" ", "\\:") + "}");
    input && !globalQuery && (m.mathquill("write", input.replace(/&amp;/g, "&"), input_back),
        m.focus());
    $(".mathquill-editable").removeClass("nl-disabled");
    $(".codepad-container").hide();
    $("#widgetPad").toggleClass("hide");
    $("#widgetPad").mathquill("redraw");
    $(".codepad-input").show();
    $(".toggle-full-pad").show();
    $("#most_used_actions").show();
    $("#most_used_actions").mathquill("redraw");
    $(".codepad-container").mathquill("redraw");
    $(".loading-animation").hide();
    $("#CodepadHead .first i").addClass("active");
    1 == localStorage.getItem("beforeSubs") && localStorage.removeItem("beforeSubs");
    $("#verify-input").mathquill("placeholder",
        i18n("Different answer"));
    $("#Examples_section .solution-examples").show();
    $("#Examples_section .solution-examples").mathquill("redraw");
    $(".codepad-input").show();
    $("#most_used_actions").show();
    $("#most_used_actions").mathquill("redraw");
    $(".loading-animation").hide();
    $("#verify-subscribe .subscribe-button").off("click").on("click", function() {
        f("Verify")
    });
    $("#verify-subscribe-challenge .subscribe-button").off("click").on("click", function() {
        f("Challenge")
    });
    $("body").on("focus blur", "#main-input-verify",
        function() {
            subscribed ? (SYPAD.activeInputBox = $(this), SYSUGGEST = null) : a()
        });
    $("#main-input-verify").on("click", function() {
        subscribed || a()
    });
    $("body").on("focus blur", "#main-input", function() {
        SYPAD.activeInputBox = $(this);
        SYSUGGEST = SYSUGGEST_OBJ
    });
    window.location.href.includes("/solver") && 100 > $(".googleAdsense").height() && !subscribed && ($(".adblock-replacement a").on("click", function() {
        getLocalStorage().setItem("linkOrigin", "SolutionCalculatorLink")
    }), $(".adblock-replacement").show(), $(".googleAdsense-container").hide());
    $(".mathquill-editable:not(.mathquill-rendered-math)").mathquill("editable");
    $(".mathquill-textbox:not(.mathquill-rendered-math)").mathquill("textbox");
    $(function() {
        function l(x) {
            x ? ($("ul.m2u").css("padding", "0 0 0 25px"), $(".m2u li").parent().addClass("foldable"), $(".m2u li").addClass("foldable"), $(".m2u li a.nl-leftMenu").addClass("hide-subtopic"), $("#nl-topics a a.nl-leftMenu").addClass("hide-subtopic"), $(".m2u li .arrow_left").hide(), $(".nl-leftMenu-after-arrow").css("margin-left", "0"), $("#nl-topics").removeClass("spase-subtopic"),
                $(".leftMenu").removeClass("open"), n(!0)) : ($(".m2u li").parent().removeClass("foldable"), $(".m2u li").removeClass("foldable"), $("ul.m2u").css("padding", "0 0 0 40px"), $(".m2u li a.nl-leftMenu").removeClass("hide-subtopic"), $("#nl-topics a.nl-leftMenu").removeClass("hide-subtopic"), $(".m2u li .arrow_left").show(), $(".nl-leftMenu-after-arrow").css("margin-left", "43px"), $("#nl-topics").addClass("spase-subtopic"), $(".leftMenu").addClass("open"), n(!1));
            t = $(".nl-leftNav").css("min-width")
        }

        function n(x) {
            var A =
                window.location.pathname.split("/"),
                q = "/" + A[1] + "/" + A[2];
            A = $('a[href$="' + q + '"].nl-leftMenu');
            0 === A.length && (A = $("a span[onclick=\"goToDestination(event, '" + q + "', true);\"]").parent());
            A.addClass("red_color");
            x || A.next().show();
            0 < A.length && x && void 0 !== A.find("svg.page-url").first()[0] && (A.find("svg.page-url").first()[0].classList = ["page-url"]);
            let r = A.parent();
            q = r.prevAll(".parentPage").first();
            $(r).find(".arrow_right svg use").attr("href", "#arrow_down-svg");
            $(r).parent().eq(0).removeClass("hide");
            r.hasClass("parentPage") && (q = r);
            0 === q.length && (r = r.parent().parent(), q = r.prevAll(".parentPage").first(), $(r).find(".arrow_right svg use").attr("href", "#arrow_down-svg"), r.hasClass("parentPage") && (q = r), 0 === q.length && (x || r.parent().show(), r = r.parent().parent(), q = r.prevAll(".parentPage").first(), $(r).find(".arrow_right svg use").attr("href", "#arrow_down-svg"), r.hasClass("parentPage") && (q = r)));
            x || A.next().find(".arrow_right svg use").attr("href", "#arrow_right-svg");
            A = q.find("svg.page-url");
            x ? (q.addClass("red_background"),
                0 < A.length && (A[0].classList = ["page-url white"])) : (q.removeClass("red_background"), 0 < A.length && (A[0].classList = ["page-url"], x = q.find("span"), 0 < x.length && (A[0].classList = ["page-url red"], x.addClass("red_color"))))
        }

        function u(x, A) {
            const q = $("#verify-result"),
                r = $("#verify-result-text");
            let y = "",
                B = !0;
            switch (x) {
                case "Correct":
                    r.text(i18n("Correct"));
                    y = "correct";
                    break;
                case "PartialError":
                    r.text(A);
                    y = "partial";
                    break;
                case "LetsTryAgain":
                    r.text(i18n("Let's Try Again"));
                    y = "incorrect";
                    break;
                case "None":
                    B = !1
            }
            q.removeClass();
            q.toggleClass("hide-important", !B);
            q.addClass(y)
        }

        function p() {
            if (subscribed) {
                const x = SYPAD.activeInputBox.mathquill("latex");
                NETWORK.verify(state, challengeState ? challengeState.config.query : state.solutionObject.solution.query.symbolab_question, x, void 0).done(A => {
                    A.correct ? (u("Correct"), void 0 !== challengeState && (challengeState.wasCorrect = !0, $(".practice-more-button").toggle(void 0 !== state.stepsObject?.solution.steps.meta?.practiceLink), $("#challenge-success").removeClass("hide-important"), $("#codepad-align-width2").addClass("codepad-align-width2-shrink"),
                        $("#codepad-align-width2-title").addClass("hide-important"), $("#step-by-step-target").hide())) : (openVerify(challengeState, !0), A.partial_error ? u("PartialError", A.partial_error) : "401" !== A.errorId && u("LetsTryAgain"))
                }).fail(A => {
                    const q = i18n("\\mathrm{Connection\\:error,\\:please\\:try\\:again}");
                    isMobile ? ($("#next-step-button-container").addClass("toastError"), toast($("#next-step-button-container"), q)) : alertify.okBtn("OK").alert(q);
                    $("#steps-button-loading").hide();
                    symbolab_log("Communication error",
                        "verify " + A.statusText)
                })
            } else a()
        }
        e(void 0, !1);
        $(".nl-topics svg").show();
        $(".leftMenu").show();
        $(".leftMenu svg").show();
        $(".arrow_left1").show();
        var t = $(".nl-leftNav").css("min-width");
        window.addEventListener("resize", function(x) {
            x = $(".nl-leftNav").css("min-width");
            t !== x && (t = x, "72px" === x ? $(".m2u li").hasClass("foldable") || ($(".leftMenu").css("width", "72px"), l(!0)) : $(".m2u li").hasClass("foldable") && ($(".leftMenu").css("width", "256px"), l(!1)))
        }, !0);
        $("#nl-topics").toggleClass("spase-subtopic");
        $("#show-steps-button").off("click").on("click", function() {
            logFunnel("ClickedFeature", "StepsToggle\tShow");
            state.config.stepsSettings = "showSteps";
            showStepsRequested()
        });
        var w = $("body");
        let v = globalQuery;
        if (isMobile && v.startsWith("query=")) {
            var z = v.substring(v.indexOf("query=") + 6);
            $("#main-input").mathquill("latex", z).focus();
            v = ""
        }
        "" === v ? ($("#all-pads").mathquill("redraw"), $("#solution-only-container").hide()) : ($("#nl-edit-bar").removeClass("hide-important"), "72px" !== $(".nl-leftNav").css("min-width") &&
            l(!0), v = prepareQueryForMathQuill(v), isMobile || $("#main-input").mathquill("latex", v));
        $(".add-bookmark").off("click").on("click", function() {
            $("#verify-subscribe").hide();
            if ("" === udid) $("#notebook-sign-in").show(), $("#close-bookmark").off("click").on("click", function() {
                $("#notebook-sign-in").hide()
            });
            else {
                const x = $(this);
                if (isUserLoggedIn())
                    if (x.hasClass("has-note")) $.when(NETWORK.deleteNote(state.solutionObject.solution.query.symbolab_question)).done(function() {
                        x.removeClass("has-note");
                        e(state, !0,
                            !1);
                        symbolab_log("Solutions", "FavoriteDelete", state.solutionObject.solution.query.symbolab_question)
                    });
                    else if (0 === userNotes.length && "" === v) {
                    let A = $("#empty_bookmark");
                    A.show();
                    setTimeout(function() {
                        A.hide()
                    }, 2E3)
                } else {
                    const A = NETWORK.saveNote(state.solutionObject.solution.query.symbolab_question, state.solutionObject.solution.query.display, state.solutionObject.solution.solution.topic, "Solutions");
                    $.when(A).done(function(q) {
                        (q = q.response) && "" !== q && subscribed ? showPointOfInterest("#bar-bookmark", q, {
                                onDismiss: function() {}
                            }) :
                            q && "" !== q ? createUpgradeTooltip("#bar-bookmark", "SolverSaveNote", q) : (x.addClass("has-note"), e(state, !0, !0))
                    })
                } else createSignupTooltip("#bar-bookmark", "SolverSaveNote", i18n("to save notes and more"))
            }
            "" !== v && symbolab_log("Solutions", "SaveClicked", null, !1, state.solutionObject.solution.query.symbolab_question)
        });
        w.off("click", "#show-hide-steps-divider").on("click", "#show-hide-steps-divider", function() {
            state.stepsArrayIndex = 0;
            logFunnel("ClickedFeature", "StepsToggle\tHide");
            $("#show-steps-button").removeClass("hide-important");
            $("#steps-container").hide();
            $("#show-hide-steps-divider").addClass("hide-important");
            $("#step-by-step-container").addClass("hide-important");
            $("#solution-methods-title-target").addClass("hide-important")
        });
        w.off("click", "#show-hide-plot-div").on("click", "#show-hide-plot-div", function() {
            $(this).toggleClass("expanded");
            $(".entire-plot").toggle()
        });
        "72px" === $(".nl-leftNav").css("min-width") ? l(!0) : "" === v && ($(".m2u li a span").removeClass("hide-subtopic"), $("#nl-topics span").removeClass("hide-subtopic"),
            $(".nl-leftMenu span.arrow_right").show());
        w.off("click", "#nl-topics svg").on("click", "#nl-topics svg", function() {
            let x = !$(".m2u li a.nl-leftMenu").hasClass("hide-subtopic");
            x ? $(".leftMenu").css("width", "72px") : $(".leftMenu").css("width", "256px");
            l(x)
        });
        w.off("click", "#verify-btn").on("click", "#verify-btn", function(x) {
            $("#notebook-sign-in").hide();
            state.logFunnel("ClickedFeature", "Verify");
            openVerifyRequested()
        });
        $("#codepad-close").off("click").on("click", function() {
            b()
        });
        w.off("click", ".btnVerify").on("click",
            ".btnVerify",
            function() {
                p()
            });
        $("#main-input-verify").keyup(function(x) {
            "Enter" === x.key && p()
        });
        $("#verify-floating-background").on("click", function(x) {
            $(x.target).is($(this)) && b()
        });
        w.off("click", "#solution-methods-title-target #steps-button").on("click", "#solution-methods-title-target #steps-button", function() {
            const x = $(this).hasClass("active");
            logFunnel("ClickedFeature", "OneStepAtTime");
            state.config.stepsSettings = x ? "showSteps" : "stepByStep";
            state.stepsArrayIndex = 0;
            renderSteps(state)
        });
        w.off("click",
            ".practice-more-button").on("click", ".practice-more-button", function() {
            const x = state.stepsObject?.solution.steps.meta?.practiceLink;
            x && (window.location.href = x)
        });
        $("#pencil").off("click").on("click", function() {
            let x = window.location.pathname.replace("step-by-step/", "step-by-step/query=");
            window.location.href = window.location.protocol + "//" + window.location.host + x
        });
        z = window.location.pathname;
        w = $('a[href$="' + z + '"].nl-leftMenu');
        0 === w.length && (w = $("a span[onclick=\"goToDestination(event, '" + z + "', false);\"]").parent());
        w.addClass("red_color");
        if (0 < w.length && (z = w.find(".pointer"), 0 < z.length && currentElsLint.push({
                curEl: z,
                hrefDestination: window.location.pathname,
                isPressedOnTheTitle: !0
            }), !$(".m2u li a.nl-leftMenu").hasClass("hide-subtopic"))) {
            z = w.find(".arrow_right");
            0 < z.length && arrowRightClick(z);
            0 < w.find("svg.page-url").length && (w.find("svg.page-url").first()[0].classList = ["page-url red"]);
            var C = w.parent();
            z = C.prevAll(".parentPage").first();
            C.hasClass("parentPage") && (z = C);
            0 === z.length && (C = C.parent().parent(), z = C.prevAll(".parentPage").first(),
                C.hasClass("parentPage") && (z = C), 0 === z.length && (C = C.parent().parent(), z = C.prevAll(".parentPage").first(), C.hasClass("parentPage") && (z = C)));
            C = z.find("svg.page-url");
            let x = !0;
            0 === w.length && (x = !1);
            x && (z = z.find("span"), 0 < z.length && (C[0].classList = ["page-url red"], z.addClass("red_color")))
        }
        w = w.parent().parent().prev();
        z = $(w).next("ul");
        $(w).find(".arrow_right svg use").attr("href", "#arrow_down-svg");
        z.eq(0).removeClass("hide");
        w = w.parent().parent().prev();
        0 !== w.length && (z = $(w).next("ul"), $(w).find(".arrow_right svg use").attr("href",
            "#arrow_down-svg"), z.eq(0).removeClass("hide"), w = w.parent().parent().prev(), 0 !== w.length && (z = $(w).next("ul"), $(w).find(".arrow_right svg use").attr("href", "#arrow_down-svg"), z.eq(0).removeClass("hide")));
        $(".solution-examples .show-more").click(function() {
            $("#Examples_section .solution-examples > li").addClass("showing-all");
            $("#Examples_section .solution-examples > li").mathquill("redraw");
            $(".solution-examples .show-more-li").remove()
        });
        setBreadCrumbs();
        $("#nl-edit-bar .nl-edit-bar-links a").click(function() {
            $(".bar-selected").removeClass("bar-selected");
            $(this).addClass("bar-selected");
            amplitude.track("Clicked", {
                type: "InternalLinks",
                data: $(this).attr("href")
            })
        });
        0 === $("plot").length && $("#bar-Graph").hide();
        0 === $("#related .relatedList li").length && $("#bar-Related").hide();
        $(".notification-top").click(function() {
            $(".notification-top.white use").attr("href", "#header-notifications");
            $(".notification-top.brown use").attr("href", "#header-notifications-brown")
        });
        "" === v && $("#topic-description").show();
        $("#Examples_section .new_solution_box_title").click(function(x) {
            $("html, body").animate({
                    scrollTop: $("#Examples").offset().top
                },
                800)
        });
        $("#related .new_solution_box_title").click(function(x) {
            $("html, body").animate({
                scrollTop: $("#related_anchor").offset().top
            }, 800)
        });
        let D;
        window.addEventListener("resize", function() {
            clearTimeout(D);
            D = setTimeout(function() {
                state?.callbacks?.refreshGraph?.()
            }, 200)
        }, !1);
        window.addEventListener("popstate", x => {
            1 < currentElsLint.length && (console.log("drop " + currentElsLint.pop()), x = currentElsLint.pop(), goToDestination0(x.curEl, x.hrefDestination, x.isPressedOnTheTitle))
        });
        "" !== v && g()
    });
    m = window.location.pathname;
    m.includes("solver/chemi") && setTimeout(() => {
        SYPAD.toggleFullPad();
        $(".pad-toolbar-chemistry").click()
    }, 0);
    m.includes("solver/scientific-calculator") && setTimeout(() => {
        SYPAD.toggleFullPad();
        $(".pad-toolbar-calculator").click()
    }, 0);
    (m.includes("solver/matrix") || m.includes("solver/vector") || m.includes("solver/orthogonal-projection") || m.includes("solver/gram-schmidt") || m.includes("solver/linear-algebra")) && setTimeout(() => {
        SYPAD.toggleFullPad();
        $(".pad-toolbar-matrix").click()
    }, 0);
    logExampleClickEvents()
});

function toast(a, e) {
    a.text(e).fadeIn();
    setTimeout(function() {
        a.fadeOut()
    }, 3E3)
};