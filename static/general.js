$.browser.chrome = /chrome/.test(navigator.userAgent.toLowerCase());

!function(a){"use strict";function b(a,c){if(!(this instanceof b)){var d=new b(a,c);return d.open(),d}this.id=b.id++,this.setup(a,c),this.chainCallbacks(b._callbackChain)}if("undefined"==typeof a)return void("console"in window&&window.console.info("Too much lightness, Featherlight needs jQuery."));var c=[],d=function(b){return c=a.grep(c,function(a){return a!==b&&a.$instance.closest("body").length>0})},e=function(a,b){var c={},d=new RegExp("^"+b+"([A-Z])(.*)");for(var e in a){var f=e.match(d);if(f){var g=(f[1]+f[2].replace(/([A-Z])/g,"-$1")).toLowerCase();c[g]=a[e]}}return c},f={keyup:"onKeyUp",resize:"onResize"},g=function(c){a.each(b.opened().reverse(),function(){return c.isDefaultPrevented()||!1!==this[f[c.type]](c)?void 0:(c.preventDefault(),c.stopPropagation(),!1)})},h=function(c){if(c!==b._globalHandlerInstalled){b._globalHandlerInstalled=c;var d=a.map(f,function(a,c){return c+"."+b.prototype.namespace}).join(" ");a(window)[c?"on":"off"](d,g)}};b.prototype={constructor:b,namespace:"featherlight",targetAttr:"data-featherlight",variant:null,resetCss:!1,background:null,openTrigger:"click",closeTrigger:"click",filter:null,root:"body",openSpeed:250,closeSpeed:250,closeOnClick:"background",closeOnEsc:!0,closeIcon:"&#10005;",loading:"",persist:!1,otherClose:null,beforeOpen:a.noop,beforeContent:a.noop,beforeClose:a.noop,afterOpen:a.noop,afterContent:a.noop,afterClose:a.noop,onKeyUp:a.noop,onResize:a.noop,type:null,contentFilters:["jquery","image","html","ajax","iframe","text"],setup:function(b,c){"object"!=typeof b||b instanceof a!=!1||c||(c=b,b=void 0);var d=a.extend(this,c,{target:b}),e=d.resetCss?d.namespace+"-reset":d.namespace,f=a(d.background||['<div class="'+e+"-loading "+e+'">','<div class="'+e+'-content">','<span class="'+e+"-close-icon "+d.namespace+'-close">',d.closeIcon,"</span>",'<div class="'+d.namespace+'-inner">'+d.loading+"</div>","</div>","</div>"].join("")),g="."+d.namespace+"-close"+(d.otherClose?","+d.otherClose:"");return d.$instance=f.clone().addClass(d.variant),d.$instance.on(d.closeTrigger+"."+d.namespace,function(b){var c=a(b.target);("background"===d.closeOnClick&&c.is("."+d.namespace)||"anywhere"===d.closeOnClick||c.closest(g).length)&&(d.close(b),b.preventDefault())}),this},getContent:function(){if(this.persist!==!1&&this.$content)return this.$content;var b=this,c=this.constructor.contentFilters,d=function(a){return b.$currentTarget&&b.$currentTarget.attr(a)},e=d(b.targetAttr),f=b.target||e||"",g=c[b.type];if(!g&&f in c&&(g=c[f],f=b.target&&e),f=f||d("href")||"",!g)for(var h in c)b[h]&&(g=c[h],f=b[h]);if(!g){var i=f;if(f=null,a.each(b.contentFilters,function(){return g=c[this],g.test&&(f=g.test(i)),!f&&g.regex&&i.match&&i.match(g.regex)&&(f=i),!f}),!f)return"console"in window&&window.console.error("Featherlight: no content filter found "+(i?' for "'+i+'"':" (no target specified)")),!1}return g.process.call(b,f)},setContent:function(b){var c=this;return(b.is("iframe")||a("iframe",b).length>0)&&c.$instance.addClass(c.namespace+"-iframe"),c.$instance.removeClass(c.namespace+"-loading"),c.$instance.find("."+c.namespace+"-inner").not(b).slice(1).remove().end().replaceWith(a.contains(c.$instance[0],b[0])?"":b),c.$content=b.addClass(c.namespace+"-inner"),c},open:function(b){var d=this;if(d.$instance.hide().appendTo(d.root),!(b&&b.isDefaultPrevented()||d.beforeOpen(b)===!1)){b&&b.preventDefault();var e=d.getContent();if(e)return c.push(d),h(!0),d.$instance.fadeIn(d.openSpeed),d.beforeContent(b),a.when(e).always(function(a){d.setContent(a),d.afterContent(b)}).then(d.$instance.promise()).done(function(){d.afterOpen(b)})}return d.$instance.detach(),a.Deferred().reject().promise()},close:function(b){var c=this,e=a.Deferred();return c.beforeClose(b)===!1?e.reject():(0===d(c).length&&h(!1),c.$instance.fadeOut(c.closeSpeed,function(){c.$instance.detach(),c.afterClose(b),e.resolve()})),e.promise()},chainCallbacks:function(b){for(var c in b)this[c]=a.proxy(b[c],this,a.proxy(this[c],this))}},a.extend(b,{id:0,autoBind:"[data-featherlight]",defaults:b.prototype,contentFilters:{jquery:{regex:/^[#.]\w/,test:function(b){return b instanceof a&&b},process:function(b){return this.persist!==!1?a(b):a(b).clone(!0)}},image:{regex:/\.(png|jpg|jpeg|gif|tiff|bmp|svg)(\?\S*)?$/i,process:function(b){var c=this,d=a.Deferred(),e=new Image,f=a('<img src="'+b+'" alt="" class="'+c.namespace+'-image" />');return e.onload=function(){f.naturalWidth=e.width,f.naturalHeight=e.height,d.resolve(f)},e.onerror=function(){d.reject(f)},e.src=b,d.promise()}},html:{regex:/^\s*<[\w!][^<]*>/,process:function(b){return a(b)}},ajax:{regex:/./,process:function(b){var c=a.Deferred(),d=a("<div></div>").load(b,function(a,b){"error"!==b&&c.resolve(d.contents()),c.fail()});return c.promise()}},iframe:{process:function(b){var c=new a.Deferred,d=a("<iframe/>").hide().attr("src",b).css(e(this,"iframe")).on("load",function(){c.resolve(d.show())}).appendTo(this.$instance.find("."+this.namespace+"-content"));return c.promise()}},text:{process:function(b){return a("<div>",{text:b})}}},functionAttributes:["beforeOpen","afterOpen","beforeContent","afterContent","beforeClose","afterClose"],readElementConfig:function(b,c){var d=this,e=new RegExp("^data-"+c+"-(.*)"),f={};return b&&b.attributes&&a.each(b.attributes,function(){var b=this.name.match(e);if(b){var c=this.value,g=a.camelCase(b[1]);if(a.inArray(g,d.functionAttributes)>=0)c=new Function(c);else try{c=a.parseJSON(c)}catch(h){}f[g]=c}}),f},extend:function(b,c){var d=function(){this.constructor=b};return d.prototype=this.prototype,b.prototype=new d,b.__super__=this.prototype,a.extend(b,this,c),b.defaults=b.prototype,b},attach:function(b,c,d){var e=this;"object"!=typeof c||c instanceof a!=!1||d||(d=c,c=void 0),d=a.extend({},d);var f,g=d.namespace||e.defaults.namespace,h=a.extend({},e.defaults,e.readElementConfig(b[0],g),d);return b.on(h.openTrigger+"."+h.namespace,h.filter,function(g){var i=a.extend({$source:b,$currentTarget:a(this)},e.readElementConfig(b[0],h.namespace),e.readElementConfig(this,h.namespace),d),j=f||a(this).data("featherlight-persisted")||new e(c,i);"shared"===j.persist?f=j:j.persist!==!1&&a(this).data("featherlight-persisted",j),i.$currentTarget.blur(),j.open(g)}),b},current:function(){var a=this.opened();return a[a.length-1]||null},opened:function(){var b=this;return d(),a.grep(c,function(a){return a instanceof b})},close:function(a){var b=this.current();return b?b.close(a):void 0},_onReady:function(){var b=this;b.autoBind&&(a(b.autoBind).each(function(){b.attach(a(this))}),a(document).on("click",b.autoBind,function(c){c.isDefaultPrevented()||"featherlight"===c.namespace||(c.preventDefault(),b.attach(a(c.currentTarget)),a(c.target).trigger("click.featherlight"))}))},_callbackChain:{onKeyUp:function(b,c){return 27===c.keyCode?(this.closeOnEsc&&a.featherlight.close(c),!1):b(c)},onResize:function(a,b){if(this.$content.naturalWidth){var c=this.$content.naturalWidth,d=this.$content.naturalHeight;this.$content.css("width","").css("height","");var e=Math.max(c/parseInt(this.$content.parent().css("width"),10),d/parseInt(this.$content.parent().css("height"),10));e>1&&this.$content.css("width",""+c/e+"px").css("height",""+d/e+"px")}return a(b)},afterContent:function(a,b){var c=a(b);return this.onResize(b),c}}}),a.featherlight=b,a.fn.featherlight=function(a,c){return b.attach(this,a,c)},a(document).ready(function(){b._onReady()})}(jQuery);
(function(){var a,b,c,d,e,f,g,h,i;if(c={version:"2.3.3",name:"jQuery-runner"},g=this.jQuery||this.Zepto||this.$,!g||!g.fn)throw new Error("["+c.name+"] jQuery or jQuery-like library is required for this plugin to work");e={},d=function(a){return(10>a?"0":"")+a},i=1,f=function(){return"runner"+i++},h=function(a,b){return a["r"+b]||a["webkitR"+b]||a["mozR"+b]||a["msR"+b]||function(a){return setTimeout(a,30)}}(this,"equestAnimationFrame"),b=function(a,b){var c,e,f,g,h,i,j,k,l,m,n;for(b=b||{},k=[36e5,6e4,1e3,10],i=["",":",":","."],h="",g="",f=b.milliseconds,e=k.length,l=0,0>a&&(a=Math.abs(a),h="-"),c=m=0,n=k.length;n>m;c=++m)j=k[c],l=0,a>=j&&(l=Math.floor(a/j),a-=l*j),(l||c>1||g)&&(c!==e-1||f)&&(g+=(g?i[c]:"")+d(l));return h+g},a=function(){function a(b,c,d){var h;return this instanceof a?(this.items=b,h=this.id=f(),this.settings=g.extend({},this.settings,c),e[h]=this,b.each(function(a,b){g(b).data("runner",h)}),this.value(this.settings.startAt),void((d||this.settings.autostart)&&this.start())):new a(b,c,d)}return a.prototype.running=!1,a.prototype.updating=!1,a.prototype.finished=!1,a.prototype.interval=null,a.prototype.total=0,a.prototype.lastTime=0,a.prototype.startTime=0,a.prototype.lastLap=0,a.prototype.lapTime=0,a.prototype.settings={autostart:!1,countdown:!1,stopAt:null,startAt:0,milliseconds:!0,format:null},a.prototype.value=function(a){this.items.each(function(b){return function(c,d){var e;c=g(d),e=c.is("input")?"val":"text",c[e](b.format(a))}}(this))},a.prototype.format=function(a){var c;return c=this.settings.format,(c=g.isFunction(c)?c:b)(a,this.settings)},a.prototype.update=function(){var a,b,c,d,e;this.updating||(this.updating=!0,c=this.settings,e=g.now(),d=c.stopAt,a=c.countdown,b=e-this.lastTime,this.lastTime=e,a?this.total-=b:this.total+=b,null!==d&&(a&&this.total<=d||!a&&this.total>=d)&&(this.total=d,this.finished=!0,this.stop(),this.fire("runnerFinish")),this.value(this.total),this.updating=!1)},a.prototype.fire=function(a){this.items.trigger(a,this.info())},a.prototype.start=function(){var a;this.running||(this.running=!0,(!this.startTime||this.finished)&&this.reset(),this.lastTime=g.now(),a=function(b){return function(){b.running&&(b.update(),h(a))}}(this),h(a),this.fire("runnerStart"))},a.prototype.stop=function(){this.running&&(this.running=!1,this.update(),this.fire("runnerStop"))},a.prototype.toggle=function(){this.running?this.stop():this.start()},a.prototype.lap=function(){var a,b;return b=this.lastTime,a=b-this.lapTime,this.settings.countdown&&(a=-a),(this.running||a)&&(this.lastLap=a,this.lapTime=b),b=this.format(this.lastLap),this.fire("runnerLap"),b},a.prototype.reset=function(a){var b;a&&this.stop(),b=g.now(),"number"!=typeof this.settings.startAt||this.settings.countdown||(b-=this.settings.startAt),this.startTime=this.lapTime=this.lastTime=b,this.total=this.settings.startAt,this.value(this.total),this.finished=!1,this.fire("runnerReset")},a.prototype.info=function(){var a;return a=this.lastLap||0,{running:this.running,finished:this.finished,time:this.total,formattedTime:this.format(this.total),startTime:this.startTime,lapTime:a,formattedLapTime:this.format(a),settings:this.settings}},a}(),g.fn.runner=function(b,d,f){var h,i;switch(b||(b="init"),"object"==typeof b&&(f=d,d=b,b="init"),h=this.data("runner"),i=h?e[h]:!1,b){case"init":new a(this,d,f);break;case"info":if(i)return i.info();break;case"reset":i&&i.reset(d);break;case"lap":if(i)return i.lap();break;case"start":case"stop":case"toggle":if(i)return i[b]();break;case"version":return c.version;default:g.error("["+c.name+"] Method "+b+" does not exist")}return this},g.fn.runner.format=b}).call(this);

function i18n(key) {
	return key;
}
var syAjaxRunning = false;
$(document).ajaxStart(function(){
	syAjaxRunning = true;
});

$(document).ajaxStop(function(){
	syAjaxRunning = false;
});

$(document).ajaxError(function(event, jqxhr, settings, thrownError) {
	if (jqxhr.status == 403){
		window.location = "/expirationPassed?api="+settings.url+"&from="+window.location.href;
	}
});


// e.g. "anystring".capitalize()   #=> Anystring
String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

String.prototype.replaceAt = function(index, character) {
    return this.substr(0, index) + character + this.substr(index+1);
};

// e.g. "result".pluralize(2)   #=> results
String.prototype.pluralize = function(count) {
  if (Math.abs(count) == 1)
    return this;
  else
    return this + 's';
};

function symbolab_log(action, info1, info2, initialQuery) {
	
	if (!initialQuery) {
		initialQuery = null;
	}

	// if (action === "Registration" && info2){
	// 	info2 = "Var"+sy_var+"\t"+info2;
	// }
	
	return $.ajax({
		type: "POST",
		url: "/detailedLog",
		data: {
			type: action,
			info1: info1,
			info2: info2,
			query: initialQuery
		}
	});
}

function syMenu(type, destination){
	destination = destination.replace("/solver/", "");
	symbolab_log("Solutions", "Menu"+type, SOLUTIONS.page + "=>" + destination);
}

var sy_var = 0;
function prepareQueryForMathQuill(query) {
	if (query == undefined) return query;

	query = query.replace(/operatorname/g, "text");

	// fixes unneeded space between escape and what comes after it
	query = query.replace(/\\(\w+?)\s+(?={|_|\^|\(|\\)/g, "\\$1");

	query = query.replace(/\\,/g, " ");
	query = query.replace(/(, |,)/g, ",\\:");

	// do check the following examples if making changes:
	// laplace\:e^{\frac{t}{2}}
	// geometric\:mean\:\left\{0.42,\:0.52,\:0.58,\:0.62\right\}
	// long\:division\:\frac{121}{19}
	if (query.indexOf('\\{') >= 0){
		query = query.replace(/\{\\space\}/g, "\\space");
		query = query.replace(/\\left\s*\\\{/g, "\\{");
		query = query.replace(/\\\{/g, "\\left\\{");		
		query = query.replace(/\\right\s*\\\}/g, "\\}");
		query = query.replace(/\\\}/g, "\\right\\}");
		query = query.replace(/\\space}/g, "{\\space}");
	}	

	query = query.replace(/\\vec\{(.+?)\}/g, "\\vec\{$1 \}");
	query = query.replace(/\\hat\{(.+?)\}/g, "\\hat\{$1 \}");

	query = query.replace(/ /g, "#");

	
	return query;
}

function getWidth(element, isRomanToo){
	var width = 0;
		
	if (element.hasClass("block") || element.hasClass("numerator") || element.hasClass("denominator")){
		element.children().each(function() {
			width += getWidth($(this), isRomanToo);
		});
	}
	else if (element.hasClass("fraction")){
		var numWidth = getWidth($(element.children()[0]), isRomanToo);
		var denWidth = getWidth($(element.children()[1]), isRomanToo);
		return Math.max(numWidth+10, denWidth+10);
	}
	else if (element.hasClass("roman")){
		if (isRomanToo){
			element.children().each(function() {
				width += $(this).outerWidth();
			});
		}
	}
	else{
		width = element.outerWidth();
	}

	return width;
}

function getActualWidth(element, isRomanToo){
	var totalWidth = 0;
	$(element).find(".mathquill-embedded-latex").children().each(function() {
		if ($(this).is(":visible:not(.selectable)")){
			totalWidth += getWidth($(this), isRomanToo);
		}
	});
	totalWidth = totalWidth * 1.1;
	return totalWidth;
}

function getGraphInputWidth(element){
	var totalWidth = 0;
	$(element).children().each(function() {
		if ($(this).is(":visible:not(.selectable)")){
			totalWidth += getWidth($(this), true);
		}
	});
	totalWidth = totalWidth * 1.1;
	return totalWidth;
}


function createScrollForce(element, newWidth, newHeight){
	if (!newWidth && !newHeight) return;
	
	var scrollContent = $('<div class="scrollContent" style="background: transparent"></div>');
	if (newWidth) scrollContent.width(newWidth);
	if (newHeight) scrollContent.height(newHeight);
	$(element).children().wrap(scrollContent);
	$(element).addClass("syscrollable");
	$(element).find(".mathquill-embedded-latex").mathquill("redraw");


// 	$(element).addClass("syscrollable");
// 	var scrollableContent = $(element).html();
// 	$(element).html("");
// 	$(element).append('<div class="scrollContent" style="background: transparent"></div>');
// 	var arr = $(element).children(".scrollContent");
// 	var scrollContent = arr[0];
// 	$(scrollContent).append(scrollableContent);
// 	if (newWidth){
// 		$(scrollContent).width(newWidth);
// 	}
// 	if (newHeight){
// 		$(scrollContent).height(newHeight);
// 	}
// 	$(element).find(".mathquill-embedded-latex").mathquill("redraw");
}

function createTable(line){
	line = line.replace("\\quad \\quad", "");
	line = line.replace("\\begin{table}", "");
	var summaryline = false;
	if (line.indexOf('\\summaryline') > 0){
		line = line.replace("\\summaryline", "");
		summaryline = true;
	}
	line = line.replace("\\end{table}", "");
	
	var div = $("<div style='overflow-x: auto;'></div>");
	var table = $("<table class='tableMatrix'></table>");
	
	var rows = line.split("\\\\");
	rows.pop();
	var tr;
	for (var i = 0; i < rows.length; i++) {
		var row = rows[i];
		var tr = $("<tr></tr>");
		
		var columns = row.split("&");
		columns.pop();
		for (var j = 0; j < columns.length; j++) {
			var column = columns[j];
			var sp = $("<span class='mathquill-embedded-latex'></span>");
			sp.text(column);
			var td = $("<td class='syME'></td>");
			td.append(sp);
			tr.append(td);			
		}
		if (summaryline && i == rows.length - 1){
			tr.css('background-color', '#f5f5f5');
			tr.css('color', 'black');
		}
		table.append(tr);
	}
	
	
	
	div.append(table);
	return div;
}

function createMathquillSpan(classType, content, id){
	if (content == undefined) return $('<span></span>');
	
	var lines = content.split("<br/>");
	var span;
	if (lines.length == 1){
		if (content.indexOf("\\begin{table}") >= 0){
			span = createTable(content);
			//span.find('.mathquill-embedded-latex:not(.mathquill-rendered-math)').mathquill();
		}
		else{
			content = prepareQueryForMathQuill(content);
			span = $('<span class="' + classType + ' mathquill-embedded-latex"></span>');
			span.text(content);
		}	
		if (id){
			$(span).prop('title', id);
		}
		return span;
	}
	else{
		span = $('<div class="multi-line-span"></div>');
		for (var idx in lines) {
			var line = lines[idx];
			var div = createMathquillDiv(classType, line);
			div.addClass('multiline');
			span.append(div);
		}
		return span;
	}		
}

function createMathquillDiv(classType, content, id){
	var div = $('<div class="' + classType + '"></div>');
	div.append(this.createMathquillSpan("", content, id));
	return div;	
}

function createMathquillDiv2(classType, content, id){
	var div = $('<div class="' + classType + '"></div>');
	div.append(this.createMathquillSpan("", content, id));
	
	div.find('.mathquill-embedded-latex:not(.mathquill-rendered-math)').each(function(){
		var jq = $(this);
		jq.mathquill();
	});
	
	return div;	
}

function mathquillifyVisible(jq){
	jq.find('.mathquill-embedded-latex:not(.mathquill-rendered-math)').each(function(){
		var jq = $(this);
		if (jq.is(":visible")){
			jq.mathquill();
		}
	});
}

$(function() {
	var acceptPolicy = readCookie("sy.privacy");
	if ("yes" != acceptPolicy){
		$(".nl-cookiepolicy").show();
	}

	$(".privacy-policy").click(function(){
		createCookie("sy.privacy","yes", 1000);
		$(".nl-cookiepolicy").remove();
	});

	$("#nl-mainNav .topitem a, #nl-mainNav .overflow a").click(function(event){
		event.preventDefault();
		var link = $(this).attr("href");
		$.when(symbolab_log("General", "TopMenu", link))
			.always(function() { window.location = link; });
	});
	
	$(".nl-navAction.notifications").click(function(){
		$(".nl-notificationsBox").toggle();
		$(".nl-notificationsBox").mathquill('redraw');
		if ($(".nl-notificationsBox").is(":visible")){
			$(".newNotifications").removeClass('newNotifications');
			$.ajax({
				type: "POST",
				url: "/api/notification/seen",
			    beforeSend: authorizeAjaxWithSyToken				
			});
		}
		return false;
	});
	
	$("select.classification").change(function(e){
		var parent = $(this).parent();
		var classificationId = $(this).attr("id");
		var state = $(this).val();
		var subclassId = classificationId+"-"+state;
		var subclassObj = $("#" + subclassId);
		parent.children(" select.subclass").addClass("hidden");
		parent.children(" select.subclass").attr("disabled", "disabled");
		if (subclassObj.children().size() > 1) {
			subclassObj.removeClass("hidden");
			subclassObj.removeAttr("disabled");
		}
	});
		  
	$('a.more').click(function(event) {
		event.preventDefault();
	    var link = this;
	    var linkParent = $(link).parent();
	    var next = linkParent.next();
	    next.toggle(function(){
	      var previousText = $(link).data('previous-text');
	      var currentText = $(link).text();
	      $(link).text(previousText);
	      $(link).data('previous-text', currentText);
	      if (window.location.href.indexOf('team') < 0){
	    	  $('#SearchExamples').find('.mathquill-embedded-latex').mathquill('redraw');
	      }
	    });
	  });

	  ensureCorrectLightsOut();

	  document.addEventListener("click", function(){ $(".nl-notificationsBox").hide(); });

});

function isMobileRender(){
	return typeof(isMobileRendering) != "undefined" && isMobileRendering;	
}


function showUpgradeMessage(){
	if (typeof(mobileWeb) != "undefined" && mobileWeb){
		if (OS=='iOS'){
			//Use native confirm
			if (confirm("Download the app to see steps. Redirect to App Store?")){
				window.location = "https://itunes.apple.com/app/id876942533";
			}
		}
		else if (OS == 'Android'){
			//Use native confirm
			if (confirm("Download the app to see steps. Redirect to Google Play?")){
				window.location = "https://play.google.com/store/apps/details?id=com.devsense.symbolab";
			}
		}
	}
	else{
		window.location.href = "/upgradeVersion";
	}	
}


function parseQueryParameters(params) {
	var match,
	pl     = /\+/g,  // Regex for replacing addition symbol with a space
	regexp = /([^&=]+)=?([^&]*)/g,
	decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
	qpstr  = window.location.search.substring(1);
	while (match = regexp.exec(qpstr)) {
		params[decodeURIComponent(match[1])] = decodeURIComponent(match[2]);
	}
}

$.extend($.expr[":"], {
    "starts-with": function(elem, i, data, set) {
        var text = $.trim($(elem).text()),
            term = data[3];

        // first index is 0
        return text.indexOf(term) === 0;
    },

    "ends-with": function(elem, i, data, set) {
        var text = $.trim($(elem).text()),
            term = data[3];

        // last index is last possible
        return text.lastIndexOf(term) === text.length - term.length;
    }
});

function changeLanguage(el, curLang){
	var hostname = location.hostname;
	hostname = hostname.replace(curLang+".", "");
	hostname = hostname.replace("www.", "");
	var port = (location.port == 80 ? "" : ":"+location.port);
	var lang = ($(el).attr('data') == "en" ? "www." : $(el).attr('data')+".");	
	window.location = "http://"+lang+hostname+port+"/solver";
}

var registrationReason = "";
function showSignIn(reason){
	registrationReason = reason;
	localStorage.setItem("registrationReason", reason);
	$(".nl-signInContainer>div").addClass('nl-hidden');
	$(".nl-signInWithText").removeClass('nl-hidden');
	symbolab_log("Registration", "ShowSignIn", registrationReason);
	gtag('event', 'show_signin', { 'reason': registrationReason });
	localStorage.setItem("beforeSubs", 1);
	$.featherlight(".nl-signInContainer");
}

// update cookie  preference
function pickLanguage(lang){
    var logPromise = $.Deferred();
    $.when(symbolab_log("General", "UserSwitchLang", lang)).always(function() { logPromise.resolve(); });

    eraseCookie("sy2.lang_preference");
    createCookie("sy2.lang_preference",lang, 365);
    return logPromise;
}
	
function loadScript(path) {
	
	if($('script[src="'+ path + '"]').length > 0) {
		//Already loaded this script. Do not reload it.
		return $.Deferred().resolve();
	}
	
	var result = $.Deferred();
	var script = document.createElement("script");
	
	script.async = "async";
	script.type = "text/javascript";
	script.src = path;
	script.onload = script.onreadystatechange = function (_, isAbort) {
	    if (!script.readyState || /loaded|complete/.test(script.readyState)) {
	       if (isAbort)
	           result.reject();
	       else
	          result.resolve();
	  }
	};
	script.onerror = function () { result.reject(); };
	$("head")[0].appendChild(script);
	return result.promise();
}

//use "pipe" to wait until loaded (jQuery 1.7)
function showGeneratePdf(){
	
	$(".nl-signInContainer>div").addClass('nl-hidden');
	$(".nl-generatePdf").removeClass('nl-hidden');
	$.featherlight(".nl-signInContainer");
	
	return $.when(loadScript("/public/auto/jspdf.debug.min.js")).pipe(function() { return $.when(loadScript("/public/auto/html2canvas2.min.js")); });
}

function showFeedback(support, name, email){
	$(".nl-signInContainer>div").addClass('nl-hidden');
	$(".nl-feedback-modal").removeClass('nl-hidden');
	$.featherlight(".nl-signInContainer");
	if (support){
		$(".featherlight-content .nl-feedback-modal h2").text(i18n('js.How can we help you?'));
		$(".featherlight-content .nl-feedback-modal #inputName").val(name);
		$(".featherlight-content .nl-feedback-modal #inputEmail").val(email);
	}
}

function showSignUp(reason){
	registrationReason = reason;
	localStorage.setItem("registrationReason", reason);
	$(".nl-signInContainer>div").addClass('nl-hidden');
	$(".nl-signUpWithText").removeClass('nl-hidden');
	symbolab_log("Registration", "ShowSignUp", registrationReason);
	gtag('event', 'show_signup', { 'reason': reason });
	$.featherlight(".nl-signInContainer");
	localStorage.setItem("beforeSubs", 1);

	$('.featherlight-content .price').tooltipster({
		content: $('#pricesTable'),
		theme: "tooltipster-light",
		contentCloning: false,
		delay: 1,
		functionReady: function(){
			symbolab_log('Registration', "PricesShown");
			//registrationReason = "PricesShown";
		}
	});
}

function showSubscription(reason){
	registrationReason = reason;
	localStorage.setItem("registrationReason", reason);
	$(".nl-signInContainer>div").addClass('nl-hidden');
	$(".nl-subscribe").removeClass('nl-hidden');
	symbolab_log("Registration", "ShowSubscription", registrationReason);
	gtag('event', 'show_subscribe', { 'reason': reason });
	localStorage.setItem("sy.page", window.location.href);
	$.featherlight(".nl-signInContainer");
	renderPaypalButtons();
	setSelectedSubscriptionOption($(".subscribeOption:visible").eq(2));
}

function showGroupLicense(groupId){
	$(".nl-signInContainer>div").addClass('nl-hidden');
	$(".nl-groupLicense").removeClass('nl-hidden');
	$.featherlight(".nl-signInContainer");
	setSelectedSubscriptionOption($("td.subscribeOption:visible").last());
	renderPaypalGroupButton(groupId);
}

function renderPaypalGroupButton(groupId){
	loadScript("https://www.paypal.com/sdk/js?client-id=AUFiQ7Ykb8GCAlZbjL_J-v6BozCv1NZ2rSk3XJ68Fsu3BdMUc2XQhD9dRdXjyq51nFnuprj97T5LGxED&currency=USD").done(function() {
        var options = {
			style: {
				shape: 'pill',
				color: 'gold'
			},
			createOrder: function(data, actions) {
				var json = getGroupOrder(groupId);
				return actions.order.create(json);
			},
			onApprove: paypalOnApprove,
			onCancel: paypalOnCancel,
			onError: paypalOnError
		};

        // create one time payment button
        paypal.Buttons(options).render('.featherlight-content .nl-groupLicense #group-payment-paypal-button');
    });
}

function getFixedStepsFormat(stepsIn){
	var stepsOut = [];
	for (var i = 0; i < stepsIn.length; i++){
		var step = stepsIn[i];
		if (step.isInterimStep){
			stepsOut.push(step);
		}
		else if (step.steps != null && step.steps.length > 1){
			for (var j = 0; j < step.steps.length; j++){
				var step2 = step.steps[j];
				stepsOut.push(step2);
			}
			
			if (step.entire_result){
				stepsOut.push({'entire_result' : step.entire_result });
			}
		}
		else{
			stepsOut.push(step);
		}
	}
	
	return stepsOut;
}

function updateUserSettings(){
	if (isUserLoggedIn()){
		$.ajax({
			type: "GET",
			url: "/api/user/settings",
		    beforeSend: authorizeAjaxWithSyToken,
			success: function(settings){
				localStorage.setItem("settings.steps", settings && settings.steps ? settings.steps.toString() : 'showSteps');
				localStorage.setItem("settings.pad", settings && settings.pad ? settings.pad.toString() : 'compactPad');
			}
		});
	}
}

function createAndShowTooltipTimout(selector, text, timout, side){
	$(selector).tooltipster({
	    'content': text,
	    'theme': "tooltipster-light",
	    'side': side,
	    'restoration': 'none',
		'trigger': 'custom'
	});
	$(".sy-tooltip-close-icon:visible").click();
	$(selector).tooltipster('show');
	setTimeout(function () {
		$(selector).tooltipster('destroy');          	
    }, timout);
}

function removeUserSettings(){
	localStorage.removeItem("settings.steps");
	localStorage.removeItem("settings.pad");
	localStorage.removeItem("settings.numDecimalDisplay");
	localStorage.removeItem("settings.printOpen");
	localStorage.removeItem("settings.printGraph");
}

function removeUserInfo(){
	localStorage.removeItem("udid");        // old
	localStorage.removeItem("firstName");   // old
	localStorage.removeItem("sy.udid");     // new
	localStorage.removeItem("sy.firstName");// new
}

function logout(terminalDomain){ 
	if (terminalDomain){
		resetUserData();
	}
	eraseTerminalSessionStringCookie();
	
	removeUserSettings();
	removeUserInfo();
	window.location = "/logout";
}

function refreshLeftNavbarHeight() {
	var internalContentHeight = $(".nl-content:visible").height();
	var pageHeight = $(".nl-pageContent").height();
	
	var h = Math.max(pageHeight, internalContentHeight);
	
	if(h > 0) {
		$("#navbarStyle").remove();
		$("head").append($("<style id='navbarStyle'>.nl-leftNav { min-height: " + (h + 110) + "px; }</style>"));
		$("head").append($("<style id='navbarStyle'>.sidebar-content { min-height: " + (h + 100) + "px; }</style>"));
	}
}

$(window).load(function() {
	refreshLeftNavbarHeight();
});

// Saves current work in a share if relevant.
// Returns a E6 promise resolving to a string to add to the URL hash when returning from login.
function prepareGeometryForReload() {
	if (typeof(SYGEO) != "undefined"){
		var promise = SYGEO.doShareCreateRequest();
		return promise.then(function(result) {

			// TODO: the userIsLoggingIn mechanism could be improved
			SYGEO.userIsLoggingIn = true;

			var id = result._id;
			return "temporaryShare=" + id;
		});
	}

	return Promise.reject();
}

$(function() {
	var featherLightRefreshRequired = false;
	var upgrade_check = false;
	
	if (localStorage.getItem("beforeSubs") == 1){
		localStorage.removeItem("beforeSubs");
		updateUserSettings();
	}

	function refreshPage(){
		if (featherLightRefreshRequired){
			var url = window.location.href.replace(/\#.*$/, "");
			if (upgrade_check){
				url += url.indexOf('?') >= 0 ? '&' : '?'; 
				url += 'upgrade=true';
			}
			window.location.href = url;
		}
	}
	
	$.featherlight.defaults.afterClose = function(event){
		refreshPage();
	};
	
	try{
		$('.tooltip').tooltipster();

		var tooltipShowed = $(".sy-tooltip-close-icon:visible").size()>0;

		if($("#geometryNav").is(":visible")) {
			// geometry tooltip
			if (tooltipShowed == false && window.location.href.indexOf('practice') < 0  &&
					window.location.href.indexOf('notebook') < 0                        &&
					window.location.href.indexOf('graphing-calculator') < 0             &&
					window.location.href.indexOf('geometry') < 0             &&
					window.location.href.indexOf('groups') < 0){
				tooltipShowed = showPointOfInterest("#geometryNav a",
					'<a class="clickable" onclick="$.when(symbolab_log(\'Geometry\', \'EnterTooltip\')).always(function() { window.location=\'/geometry\'; });">' + i18n('js.Geometry Tooltip') + '</a>');
			}
		} else {
			// practice tooltip
			if (tooltipShowed == false && window.location.href.indexOf('practice') < 0  &&
					window.location.href.indexOf('notebook') < 0                        &&
					window.location.href.indexOf('graphing-calculator') < 0             &&
					window.location.href.indexOf('geometry') < 0             &&
					window.location.href.indexOf('groups') < 0){
				tooltipShowed = showPointOfInterest("#practiceNav a",
					'<a class="clickable" onclick="$.when(symbolab_log(\'Practice\', \'EnterTooltip\')).always(function() { window.location=\'/practice\'; });">' + i18n('js.Click here to Practice') + '</a>');
			}
		}
	} catch (err){
		
	}
	
	$(".nl-search").click(function() {
		$(".nl-searchContainer input").val("");
	    $("#nl-mainNav").addClass("nl-searchOpen");
	    $(".nl-searchContainer input").focus();
	});
	
	$(".nl-searchClose").click(function(e) {
	    e.preventDefault();
	    e.stopPropagation();
	    $(".nl-search").css({width: 40});
	    $(".nl-autocomplete").empty();
	    $(".nl-autocomplete").hide();
	    setTimeout(function () {
	        $("#nl-mainNav").removeClass("nl-searchOpen"); 
	        $(".nl-search").removeAttr("style");
	    }, 200);
	});
	
	var isUpdatingSuggest = false;
	$("#nl-searchField").keyup(function () {
		if (isUpdatingSuggest) return;
		isUpdatingSuggest = true;
		var query = $(".nl-searchContainer input").val();
		$.ajax({
			type: "GET",
			url: "/suggestSubjects",
			data: {
				query: query,
				language: "en",
				type: (window.location.href.indexOf('/solver/') >= 0 ? "Solutions" : "Practice")
			},
			success: function(res){
				if (res == null || res.length == 0) {
					$(".nl-autocomplete").hide();
				}
				else{
					$(".nl-autocomplete").empty();
					
					var lastType = null; 
					for (var i = 0; i < res.length; i++){
						var sol = res[i];
						if (sol.type != lastType){
							$(".nl-autocomplete").append("<div class='type'>" + sol.type + "</div>");
							lastType = sol.type;
						}
						
						sol.display = sol.display.replace(/\'/, "&apos;");
						$(".nl-autocomplete").append("<div class='result' onclick='$.when(symbolab_log(\"SubjectSuggest\",\""+query+"\",\"" + sol.type + "/" + sol.display+"\")).always(function() { window.location=\"" + sol.search+"\"; });'>" + sol.display + "</div>");
					}
					
					$(".nl-autocomplete").fadeIn();
				}
				isUpdatingSuggest = false;
			}
		});
	});

	$("#fbCancelBtn").click(function () {
		$.featherlight.current().close();
	});
	
	$("#fbSendBtn").click(function () {
		var info = {};
		info.name = $(".featherlight-content .nl-feedback-modal #inputName").val();
		info.email = $(".featherlight-content .nl-feedback-modal #inputEmail").val();
		info.message = $(".featherlight-content .nl-feedback-modal #inputMessage").val();
		info.url = window.location.href;
		info.referrer = document.referrer;
		
		if (typeof(SYPRACTICE) != "undefined"){
			info.subject = SYPRACTICE.subject;
			info.topic = SYPRACTICE.topic;
			info.subTopic = SYPRACTICE.subTopic;
			info.problem = SYPRACTICE.problemInfo.problem.problemTranslation;
		}		

		if (!info.message){
			$(".featherlight-content .nl-feedback-modal .alert-error").show();
		}
		else{
			$.ajax({
				type: "POST",
				url: "/feedback",
				beforeSend: authorizeAjaxWithSyToken,
				data: info
			});
			
			$(".featherlight-content .nl-feedback-modal .alert-error").hide();
			$(".featherlight-content .nl-feedback-modal .alert-success").show();
			setTimeout(function () {
				$.featherlight.current().close();
		    }, 2000);
		}
		
		$(".featherlight-content .nl-feedback-modal #fbSendBtn").addClass('nl-disabled');

	});
	
	$("#signIn").click(function () {
		showSignIn(window.location.pathname, true);
	});

	$(".nl-languagesMenu a").click(function (e) {
    		e.preventDefault();
    		var href=$(this).attr("href");
    		$.when(pickLanguage($(this).attr("data"))).always(function(){window.location=href;});

    	});
	
	$("#join").click(function () {
		showSignUp(window.location.pathname, true);
	});
	
	$("#upgrade").click(function () {
		showSubscription(window.location.pathname, true);
	});	
	
	$(".subscribeOption").click(function(){
		setSelectedSubscriptionOption($(this));
		symbolab_log("Registration", "BrowsePlan",$(this).attr('id'));
	});

    $("input[type=radio][name=subscriptionTypeRadio]").change(function(){
        setSelectedSubscriptionOption($(this).parent().parent().find(".subscribeOption"));
    });

	$("#noAccount").click(function () {
		$(".nl-signInContainer>div").addClass('nl-hidden');
		$(".nl-signUpWithText").removeClass('nl-hidden');
		symbolab_log("Registration", "ShowSignUp", registrationReason);
		gtag('event', 'show_signup', { 'reason': registrationReason });
	});
	
	$("#haveAccount").click(function () {
		$(".nl-signInContainer>div").addClass('nl-hidden');
		$(".nl-signInWithText").removeClass('nl-hidden');
		symbolab_log("Registration", "ShowSignIn", registrationReason);
		gtag('event', 'show_signin', { 'reason': registrationReason });
	});
	
	
	$(".nl-forgotPasswordLink").click(function () {
		$(".nl-signInContainer>div").addClass('nl-hidden');
		$(".nl-forgotPassword").removeClass('nl-hidden');
	});
	
	$(".nl-joinEmail").click(function () {
	    var el = $(this);
	    el.hide();
	    $(".nl-joinEmailForm").show();

	    symbolab_log('Registration', "ClickJoinEmail");
	    el.parent().parent().parent().parent().parent().parent().parent().parent().parent().animate({scrollTop : 300});
		

	});
	
	$(".nl-signInButton").click(function(){
		var button = $(this);
		signInWithEmail(button);
	});
	
	$(".nl-signIn input").on('keyup', function (e) {
		if (e.keyCode == 13) {
			var button = $(this).closest(".nl-signIn").find(".nl-signInButton");
			if(!button.hasClass("nl-disabled")) {
				signInWithEmail(button);
			}
		}
	});
	
	function signInWithEmail(button) {
		button.addClass("nl-disabled");
		
		var logPromise = $.Deferred();
    	$.when(symbolab_log("Registration", "EmailSignIn", registrationReason))
    		.always(function() { logPromise.resolve(); });
    	
    	var loginPromise = $.Deferred();
		
		$.ajax({
			type: "POST",
			url: "/login",
			data: {
				email: $(".featherlight-content #signin_email").val(),
				password: $(".featherlight-content #signin_password").val(),
				url: window.location.href,
				remember: $(".featherlight-content #rememberMe").prop("checked")
			},
			success: function(res){
				if (res.alert){
					$(".nl-signInWithText .nl-error").text(res.alert);
					$(".nl-signInWithText .nl-error").show();
					button.removeClass("nl-disabled");
					loginPromise.reject();
				}
				else {
					gtag('event', 'login', { 'method': 'email', 'reason': registrationReason });

					prepareGeometryForReload().then(function(hashAddition) {
						location.hash = hashAddition;

						// TODO: replace with 'finally'
						loginPromise.resolve();
					}, function() {
						// TODO: replace with 'finally'
						loginPromise.resolve();
					});
				}
			},
			error: function() {
				button.removeClass("nl-disabled");
				loginPromise.reject();
			}
		});
		
		$.whenAll(loginPromise, logPromise).done(function() {
			location.reload();
		});
	}
	
	$(".nl-createEmailAccount").click(function(){
		var button = $(this);
		createEmailAccount(button);
	});
	
	$(".nl-joinEmailForm input").on('keyup', function (e) {
		if (e.keyCode == 13) {
			var button = $(this).closest(".nl-joinEmailForm").find(".nl-createEmailAccount");
			if(!button.hasClass("nl-disabled")) {
				createEmailAccount(button);
			}
		}
	});

	function createEmailAccount(button) {
		if (!checkAgreeTerms("email")) return;
		
		button.addClass("nl-disabled");
		$(".nl-signUpForm .nl-error").text("");
		
		var logPromise = $.Deferred();
    	$.when(symbolab_log("Registration", "EmailSignup", registrationReason))
    		.always(function() { logPromise.resolve(); });
    	
    	var loginPromise = $.Deferred();
		
		$.ajax({
			type: "POST",
			url: "/signup",
			data: {
				email: $(".featherlight-content #signup_email").val(),
				firstName: $(".featherlight-content #signup_firstName").val(),
				lastName: $(".featherlight-content #signup_lastName").val(),
				password: $(".featherlight-content #signup_password").val(),
				url: window.location.href,
				registrationReason: registrationReason
			},
			success: function(res){
				if (res.alert && res.alert.indexOf("To complete registration") < 0){
					$(".nl-signUpForm .nl-error").text(res.alert);
					button.removeClass("nl-disabled");
					loginPromise.reject();
				} else if ( //location.href.indexOf("/practice") >= 0 ||
							location.href.indexOf("/notebook") >= 0 ||
							location.href.indexOf("/groups") >= 0   ||
							location.href.indexOf("/joinGroup") >= 0 ) {

					// resolve promise so the page reloads
					gtag('event', 'sign_up', { 'method': 'email', 'reason': registrationReason});
					loginPromise.resolve();
				}
				else {
					gtag('event', 'sign_up', { 'method': 'email' });
					$(".featherlight-content #haveAccount").hide();
					$('body').removeClass("signedout");
					$('body').addClass("signedin");

					$('a#userName img').addClass("no-image");
					$('a#userName svg use').attr("href", "#stock-avatar-0").removeClass("no-image");

					$("a#userName").attr("alt", res.firstName + " " + res.lastName);
					$("a#userName").attr("title", res.firstName + " " + res.lastName);

					$(".featherlight-content .nl-signInContainer>div").addClass('nl-hidden');
					$(".featherlight-content .nl-subscribe").removeClass('nl-hidden');
					localStorage.setItem("sy.page", window.location.href);
					symbolab_log("Registration", "ShowSubscribe", registrationReason);
					gtag('event', 'show_subscribe', { 'reason': registrationReason});
					renderPaypalButtons();
					setSelectedSubscriptionOption($(".subscribeOption:visible").eq(2));
					
					button.removeClass("nl-disabled");
					
					//reject promise, even though we succeeded, so we don't reload the page
					loginPromise.reject();
				}
			},
			error: function() {
				button.removeClass("nl-disabled");
			}
		});
		
		$.whenAll(loginPromise, logPromise).done(function() {
			location.reload();
		});
	}
	
	$(".nl-resetButton").click(function(){
		var button = $(this);
		button.addClass("nl-disabled");
		
		symbolab_log("Registration", "ResetPasswordClicked");
		
		$.ajax({
			type: "POST",
			url: "/resetRequest",
			data: {
				email: $(".featherlight-content #reset_email").val()
			},
			success: function(res){
				if (res.success){
					$(".nl-forgotPassword").hide();
					$(".nl-forgotPasswordSuccess").show();
					$(".nl-forgotPasswordSuccess .nl-bold").text(res.email);
				}
				else {
					$(".nl-forgotPassword .nl-error").text(res.alert);
					$(".nl-forgotPassword .nl-error").show();
					button.removeClass("nl-disabled");
				}
			},
			error: function() {
				button.removeClass("nl-disabled");
			}
		});
	});

	var params = {};
	parseQueryParameters(params);
	if (params.upgrade === "true" && !subscribed){
		showSubscription(localStorage.getItem("registrationReason"));
	} else if(params.login === "true" && !isUserLoggedIn()) {

		showSignIn("Parameter login = true");

		// we only link to ?login=true when we are going to the index page
		window.history.replaceState({}, document.title, "/");
	}
});

var sy_subscType;
function paypalOnApprove(data, actions) {
	data.type = sy_subscType;
	data.variation = sy_var;
	$(".featherlight-content .nl-signInContainer>div").addClass('nl-hidden');
	$(".featherlight-content .nl-processing").removeClass('nl-hidden');

	var logPromise = $.Deferred();
	$.when(symbolab_log("Registration", "SubscribeCompleted-"+sy_subscType, registrationReason)).always(function() {
		logPromise.resolve(); 
	});

	var gtagPromise = $.Deferred();
	$.when(gtag('event', 'subscribe_complete', { 'reason': registrationReason, 'type': sy_subscType})).always(function() {
		gtagPromise.resolve(); 
	});


	var gtagPromise2 = $.Deferred();
	$.when(gtag('event', 'purchase', { 'value': getAmount(), 'currency': 'USD', 'items': sy_subscType})).always(function() {
		gtagPromise2.resolve();
	});

	var paymentPromise = $.Deferred();
	$.ajax({
		type: "POST",
		url: "/paypal/onApprove",
		beforeSend: authorizeAjaxWithSyToken,
		data: data,
		success: function(res) {
			if (res.alert == "success subscription"){
				$(".featherlight-content .nl-signInContainer>div").addClass('nl-hidden');
				$(".featherlight-content .nl-thankYouSubsc #subsRenewText").text(i18n('Subscription renews '+sy_subscType))
				$(".featherlight-content .nl-thankYouSubsc").removeClass('nl-hidden');
				$.featherlight.defaults.afterClose = function() {
					paymentPromise.resolve();
				};
			}
			else if (res.alert == "success payment"){
				$(".featherlight-content .nl-signInContainer>div").addClass('nl-hidden');
				$(".featherlight-content .nl-thankYou").removeClass('nl-hidden');
				$.featherlight.defaults.afterClose = function() {
					paymentPromise.resolve();
				};
			}
			else {
				$(".featherlight-content .nl-signInContainer>div").addClass('nl-hidden');
				$(".featherlight-content .nl-failed").removeClass('nl-hidden');
				paymentPromise.reject();
			}
		},
		error: function(xhr, ajaxOptions, thrownError){
			console.log();
		}
	});
	
	$.whenAll(logPromise, paymentPromise, gtagPromise, gtagPromise2).done(function() {
		location.reload();
	});
	
	return paypalPromise;
}

function getAmount(){
	if (sy_subscType === "special")
		return 12.99
	else if (sy_subscType === "weekly")
		return 1.99;
	else if (sy_subscType === "monthly")
    	return 6.99;
	else if (sy_subscType === "annually")
    	return 29.99;
    else return 0;

}

function paypalOnCancel(){
	symbolab_log("Registration", "SubscribeCancelled-"+sy_subscType, registrationReason);
	gtag('event', 'subscribe_cancelled', { 'reason': registrationReason, 'type': sy_subscType});
}

function paypalOnError(){
	symbolab_log("Registration", "SubscribeError-"+sy_subscType, registrationReason);
	gtag('event', 'subscribe_error', { 'reason': registrationReason, 'type': sy_subscType});
}

function getSubscription(){
	var json = "";
	$.ajax({
		type: "GET",
		url: "/paypal/getSubscription",
		async: false,
		data: {
			type: sy_subscType,
			variation: sy_var
		},
		beforeSend: authorizeAjaxWithSyToken,
		success: function(data) {
			json = data;
		}
	});

	return json;
}

function getGroupOrder(groupId){
	var json = "";
	$.ajax({
		type: "GET",
		url: "/paypal/getGroupOrder",
		async: false,
		data: {
			groupId: groupId,
			type: sy_subscType,
			promo: $(".featherlight-content #promoText").val()
		},
		beforeSend: authorizeAjaxWithSyToken,
        success: function(data) {
			json = data;
		}
	});

	return json;
}

function renderPaypalButtons() {
	loadScript("https://www.paypal.com/sdk/js?client-id=AUFiQ7Ykb8GCAlZbjL_J-v6BozCv1NZ2rSk3XJ68Fsu3BdMUc2XQhD9dRdXjyq51nFnuprj97T5LGxED&vault=true").done(function() {
		var settings = {
			style: {
				shape: 'pill',
				color: 'gold'
			},
			createOrder: function(data, actions) {
				symbolab_log('Registration', 'SubscribeClicked-'+sy_subscType, registrationReason);
				var json = getSubscription();
				return actions.order.create(json);
			},
			onApprove: paypalOnApprove,
			onCancel: paypalOnCancel,
			onError: paypalOnError
		};
		paypal.Buttons(settings).render('.featherlight-content .nl-subscForm #express-paypal-button-oneTime');

		var settings_sub = {
			style: {
				layout: 'horizontal',
				shape: 'pill',
				tagline: false
			},
			createSubscription: function(data, actions) {
				symbolab_log('Registration', 'SubscribeClicked-' + sy_subscType, registrationReason);
				var json = getSubscription();
				if (json.alert){
					alertify.confirm(
					    json.alert, 
					    function(){ location.reload(); },
					    function(){ location.reload(); }
					);
					return null;
				}
				var promise = actions.subscription.create(json);
				promise.then(function(res){
					$.ajax({
                    		type: "POST",
                    		url: "/paypal/onSubscriptionCreate",
                    		data: {
                    			profile_id: res,
								variation: sy_var
							},
                    		beforeSend: authorizeAjaxWithSyToken
                    	});
				});
				return promise;
			},
			onApprove: paypalOnApprove,
            onCancel: paypalOnCancel,
            onError: paypalOnError
		};
		paypal.Buttons(settings_sub).render('.featherlight-content .nl-subscForm #express-paypal-button-subsc');
	});
}


function setSelectedSubscriptionOption(td) {
	$(".featherlight-content .subscribe-button").addClass('nl-disabled');
	var btn = td.data('button');
	sy_subscType = td.attr('id');
	$(".featherlight-content #"+btn).removeClass('nl-disabled');
	$(td.parent().find("input")).prop("checked", true);
}



function createMatrixLatex(rowIndex, colIndex){
	var matrixStr = "\\begin{pmatrix}";
	for (var i = 0; i < rowIndex; i++){
		for (var j = 0; j < colIndex-1; j++){
			matrixStr += "&";
		}
		if (i < rowIndex - 1){
			matrixStr += "\\\\";
		}				
	}
	matrixStr += "\\end{pmatrix}";
	return matrixStr;
}

function createCustomMatrix(mainDiv){
	mainDiv.empty();
	mainDiv.append("<div class='title'>" + i18n("matrix-select-size") + " <span class='customMatrixDimensions'></span></div>");
	mainDiv.append("<span class='closeCustomMatrix'><div>" + i18n('matrix-close') + "</div></span>");
	var size = 10;

	var tableStr = "<div class='matrixTable' style='padding-right: 0px !important; '><table>";
	for (var i = 0; i < size; i++){
		tableStr += "<tr>";
		for (var j = 0; j < size; j++){
			tableStr += "<td class='customMatrixTd'/>";
		}
		tableStr += "</tr>";	
	}
	tableStr += "</table></div>";
	mainDiv.append(tableStr);
	mainDiv.show();

	var sypad = this;
	
	$(".customMatrixTd").hover(function() {
		$('.customMatrixTd').removeClass('on');
		var colIndex = $(this).parent().children().index($(this))+1;
		var rowIndex = $(this).parent().parent().children().index($(this).parent())+1;

		for (var i = 0; i < rowIndex; i++){
			var rows = $(this).parent().parent().children().eq(i);
			for (var j = 0; j < colIndex; j++){
				rows.children().eq(j).addClass('on');
			}
		}

		$('.customMatrixDimensions').text(rowIndex+"x"+colIndex);
	});

	$(".customMatrixTd").click(function() {
		var colIndex = $(this).parent().children().index($(this))+1;
		var rowIndex = $(this).parent().parent().children().index($(this).parent())+1;
		var matrixStr = createMatrixLatex(rowIndex, colIndex);
		mainDiv.hide();
		if (typeof SYPAD != "undefined"){
			SYPAD.inputBox().mathquill('write', matrixStr, rowIndex*colIndex);
			SYPAD.inputBox().focus();
		}
		else{
			$(".mathquill-editable").mathquill('write', matrixStr, rowIndex*colIndex);
			$(".mathquill-editable").focus();
		}
		
		return false;
	});

	mainDiv.find(".closeCustomMatrix").click(function() {
		mainDiv.hide();
		return false;
	});	
}


jQuery.fn.selectText = function(){
   var doc = document;
   var element = this[0];
   var range;
   if (doc.body.createTextRange) {
       range = document.body.createTextRange();
       range.moveToElementText(element);
       range.select();
   } else if (window.getSelection) {
       var selection = window.getSelection();        
       range = document.createRange();
       range.selectNodeContents(element);
       selection.removeAllRanges();
       selection.addRange(range);
   }
};

function pageExpired(xhr, api) {
	
}

function browser(){
	var N= navigator.appName, ua= navigator.userAgent, tem;
	var M= ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
	if(M && (tem= ua.match(/version\/([\.\d]+)/i))!= null) M[2]= tem[1];
	M= M? [M[1], M[2]]: [N, navigator.appVersion,'-?'];
	return M;
}

var invertStyleContents = "<style type='text/css' id='invert-style'>" +
				"@media screen {" +
				"@-moz-document url-prefix('') { " +
					"	body { " +
					"		background-color: black!important; " +
					"	} " +
					"} " +
		    		"html { " +
		    		"	-webkit-filter: invert(100%); " +
		    		"	-moz-filter: invert(100%); " +
		    		"	-o-filter: invert(100%); " +
		        	"	-ms-filter: invert(100%); " +
		        	"	filter: invert(100%); " +
		        	"} "+
		        	".msftBadge, .nl-facebook, .nl-microsoft, .nl-joinEmail, .nl-signInButton, .nl-createEmailAccount, "+
		        	"#ShareButtons, #at-expanded-menu-host, #at20mc, "+
		        	"#LikeButtons, #itunesLink, #androidLink, .googleAdsenseMiddle, "+
		        	"#googleAdSenseHomepage, .googleAdsense, "+
		        	".googleLeftSkyScrapper, .nl-socialContainer, .practiceAd, .practiceAd2, " +
		        	"svg.stock-avatar, img.avatar-image, .stock-list svg { "+
		        	"	-webkit-filter: invert(100%); "+
		    		"	-moz-filter: invert(100%); "+
		    		"	-o-filter: invert(100%); "+
		        	"	-ms-filter: invert(100%); "+
		        	"	filter: invert(100%); "+
		        	"} "+
	        	"}"+
			"</style>";

function getProductByUrl(){
	if (window.location.href.indexOf("/solver") >= 0)
		return "Solutions";
	else if (window.location.href.indexOf("/practice") >= 0)
		return "Practice";
	else if (window.location.href.indexOf("/notebook") >= 0)
		return "Notebook";
	else if (window.location.href.indexOf("/graphing-calculator") >= 0)
		return "GraphingCalculator";
	else
		return "Action";
}

function liveToggleInvert(on) {
	if(on) {
		if($("#invert-style").size() == 0) {
			$("head").append($(invertStyleContents));
		}
		$(".nl-lightsOutSwitch").attr("title", i18n("js.Lights on"));
	} else {
		$("#invert-style").remove();
		$(".nl-lightsOutSwitch").attr("title", i18n("js.Lights out"));
	}
}

function ensureCorrectLightsOut() {
	var invert = getInverseCookieValue();
	
	if(invert === "true") {
		liveToggleInvert(true);
	} else {
		liveToggleInvert(false);
	}
}

function lightsOut() {
	var invert = getInverseCookieValue();
	
	if(invert === "true") {
		createInvertCookie("false");
		liveToggleInvert(false);
		symbolab_log(getProductByUrl(), "LightsOn", null);
	} else {
		createInvertCookie("true");
		liveToggleInvert(true);
		symbolab_log(getProductByUrl(), "LightsOut", null);
	}
}


function resetUserData(){
	var startEndSession = getTerminalSessionStringCookieValue();
	if (!startEndSession || startEndSession.indexOf('Start') >= 0){
		startEndSession = "End Session";
	}
	else{
		startEndSession = "Start Session";
	} 

	createTerminalSessionStringCookie(startEndSession);
	$("#resetTop").text(startEndSession);
	
	$.whenAll(
		$.ajax({
			type: "POST",
			url: '/api/user/clearPractice',
		    beforeSend: authorizeAjaxWithSyToken
		}),
		$.ajax({
			type: "POST",
			url: '/api/notebook/clearNotes',
		    beforeSend: authorizeAjaxWithSyToken
		})
	).then(function() {
		window.location.href = '/';
	});
}

function checkAgreeTerms(source){
	if ($(".featherlight-content #signup_agree").prop("checked") == false){
		$(".nl-signUpForm .nl-error").text(i18n("js.You must agree to the terms"));
		$(".nl-signUpForm .nl-error").show();

		// symbolab_log('Registration', "AgreeTermsPrompt", source);
		return false;
	}

	return true;
}

function microsoftSignIn(button, requestUrl, isSignup) {
	if (isSignup && !checkAgreeTerms("microsoft")) return;

	button = $(button);
	button.addClass("nl-disabled");
	
	var redirect = '?redirect=' + requestUrl;
	var remember = !isSignup ? '&remember='+$('.featherlight-content #rememberMe').prop('checked') : "";
	var registration = '&registrationReason=' + registrationReason;

	$.when(symbolab_log('Registration', isSignup ? 'MicrosoftSignUp' : 'MicrosoftSignIn' , registrationReason))
		.always(function() {
			window.location='/microsoftAuth' + redirect + remember + registration;
		});

	// TODO: replace with 'finally'
	var finalAction = function() {
		$.when(symbolab_log('Registration', 'MicrosoftSignIn', registrationReason))
		.always(function() {
			window.location='/microsoftAuth' + redirect + remember + registration;
		});
	};

	prepareGeometryForReload().then(function(hashAddition) {
		redirect = redirect + encodeURIComponent("#" + hashAddition);
		finalAction();
	}, function() {
		finalAction();
	});
}

function facebookSignIn(button, requestUrl, isSignup) {
	if (isSignup && !checkAgreeTerms("facebook")) return;

	button = $(button);
	button.addClass("nl-disabled");
	
	var redirect = '?redirect=' + requestUrl;
	var remember = !isSignup ? '&remember='+$('.featherlight-content #rememberMe').prop('checked') : "";
	var registration = '&registrationReason=' + registrationReason;

	// TODO: replace with 'finally'
    var finalAction = function() {
		$.when(symbolab_log('Registration', isSignup ? 'FacebookSignUp' : 'FacebookSignIn', registrationReason))
			.always(function() {
				window.location='/facebookAuth' + redirect + remember + registration;
			});
	}

	prepareGeometryForReload().then(function(hashAddition) {
		redirect = redirect + encodeURIComponent("#" + hashAddition);
		finalAction();
	}, function() {
		finalAction();
	});
}


//$.whenAll()
;(function($) {
	  var slice = [].slice;

	  $.whenAll = function(array) {
	    var
	      resolveValues = (arguments.length == 1 && $.isArray(array)) ? array : slice.call(arguments),
	      length = resolveValues.length,
	      remaining = length,
	      deferred = $.Deferred(),
	      i = 0,
	      failed = 0,
	      rejectContexts = Array(length),
	      rejectValues = Array(length),
	      resolveContexts = Array(length),
	      value;

	    function updateFunc (index, contexts, values) {
	      return function() {
	        !(values === resolveValues) && failed++;
	        deferred.notifyWith(contexts[index] = this, values[index] = slice.call(arguments));
	        if (!(--remaining)) {
	          deferred[(!failed ? 'resolve' : 'reject') + 'With'](contexts, values);
	        }
	      };
	    }
	    
	    for (; i < length; i++) {
	      if ((value = resolveValues[i]) && $.isFunction(value.promise)) {
	        value.promise()
	          .done(updateFunc(i, resolveContexts, resolveValues))
	          .fail(updateFunc(i, rejectContexts, rejectValues))
	        ;
	      }
	      else {
	        deferred.notifyWith(this, value);
	        --remaining;
	      }
	    }

	    if (!remaining) {
	      deferred.resolveWith(resolveContexts, resolveValues);
	    }

	    return deferred.promise();
	  };
	})(jQuery);

function createCookie(name, value, days, ignoreDomain) {
    var expires;

    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    } else {
        expires = "";
    }
    
    var domain = "";
    if(!ignoreDomain) {
	    if(window.location.href.match(/symbolab\.com/)) {
	    	domain = ";domain=.symbolab.com";
	    } else if(window.location.href.match(/scibug\.com/)) {
	    	domain = ";domain=.scibug.com";
	    }
    }
    
    document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + expires + "; path=/" + domain;
}

function readCookieLegacyFallback(name, legacyName) {
	var newValue = readCookie(name);
	if(newValue == null || newValue === "") {
		return readCookie(legacyName);
	}
	
	return newValue;
}

function readCookie(name) {
    var nameEQ = encodeURIComponent(name) + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name, "", -1);
}

function eraseLegacyCookie(name) {
	createCookie(name, "", -1, true);
}

function isUserLoggedIn() {
	if(readCookieLegacyFallback("sy2.token", "sy.token")) {
		return true;
	}
	
	return false;
}

function createPubTokenCookie(pubToken) {
	createCookie("sy2.pub.token", pubToken, 1);
}

function eraseTerminalSessionStringCookie() {
	eraseCookie("sy2.terminalSessionString");
	eraseLegacyCookie("sy.terminalSessionString");
}

function createTerminalSessionStringCookie(startEndSession) {
	eraseTerminalSessionStringCookie();
	createCookie("sy2.terminalSessionString", startEndSession);
}

function createTerminalSessionPassCookie(terminalSessionPass) {
	createCookie("sy2.terminal.pass", terminalSessionPass);
}

function createLanguagePreferenceCookie(language){
    createCookie("sy2.lang_preference",language, 365)
}

function getInverseCookieValue() {
	return readCookieLegacyFallback("sy2.invert", "invert");
}

function getTerminalSessionStringCookieValue() {
	return readCookieLegacyFallback("sy2.terminalSessionString", "sy.terminalSessionString");
}

function createInvertCookie(value) {
	createCookie("sy2.invert", value);
}

function authorizeAjaxWithSyToken(xhr) {
	xhr.setRequestHeader("Authorization", 'Bearer '+ readCookieLegacyFallback("sy2.token", "sy.token"));
}

function authorizeAjaxWithSyPubToken(xhr) {
	xhr.setRequestHeader("Authorization", 'Bearer '+ readCookieLegacyFallback("sy2.pub.token", "sy.pub.token"));
}

function ajaxImage(url, image, hideIfFailedElements) {
	return new Promise(function(resolve, reject) {
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function(){
			if (this.readyState === 4) {
				if(this.status === 200) {
					var url = window.URL || window.webkitURL;
					var objUrl = url.createObjectURL(this.response);
					var response = this.response;

					image.on("load", function() {
						resolve(response);
						image.off("load");
					});
					image.attr("src", objUrl);

				} else {
					if(hideIfFailedElements !== undefined) {
						hideIfFailedElements.hide();
					}

					reject(this.error);
				}
			}
		};

		xhr.open('GET', url);
		authorizeAjaxWithSyPubToken(xhr);
		xhr.responseType = 'blob';
		xhr.setRequestHeader("x-requested-with", "XMLHttpRequest");
		xhr.send();
	});
}

function groupSelectSelected(jq) {
	/* When an item is clicked, update the original select box,
	and the selected item: */

	var element = jq[0];

	var y, i, k, s, h;
	s = element.parentNode.parentNode.getElementsByTagName("select")[0];
	h = element.parentNode.previousSibling;
	for (i = 0; i < s.length; i++) {
	  if (s.options[i].innerHTML == element.innerHTML) {
		s.selectedIndex = i;
		h.innerHTML = element.innerHTML;
		y = element.parentNode.getElementsByClassName("same-as-selected");
		for (k = 0; k < y.length; k++) {
		  y[k].removeAttribute("class");
		}
		element.setAttribute("class", "same-as-selected");
		break;
	  }
	}
}

function clearGroupSelects(parent) {
	parent.find(".select-selected").remove();
	parent.find(".select-items").remove();
}

function openSelect(parentContainer) {
	var select = parentContainer.find("div.select-selected")[0];
	select.nextSibling.classList.toggle("select-hide");
	select.classList.toggle("select-arrow-active");
}


function setupGroupSelect( removeFirstOption, onChange, parentId ) {
    var _ = this;

    var x, i, j, selElmnt, a, b, c;
    /* Look for any elements with the class "custom-select": */
    x = document.getElementsByClassName("group-select");
    for (i = 0; i < x.length; i++) {
      if(parentId !== undefined) {
      	if($(x[i]).attr("id") !== parentId) {
      		continue;
      	}
      }
      selElmnt = x[i].getElementsByTagName("select")[0];
      /* For each element, create a new DIV that will act as the selected item: */
      a = document.createElement("DIV");
      a.setAttribute("class", "select-selected");
      var selectedOption = selElmnt.options[selElmnt.selectedIndex];
      if(selectedOption !== undefined) {
      	a.innerHTML = selectedOption.innerHTML;
      }
      x[i].appendChild(a);
      /* For each element, create a new DIV that will contain the option list: */
      b = document.createElement("DIV");
      b.setAttribute("class", "select-items select-hide");
      j = 0;
      if (removeFirstOption) j = 1;
      for (; j < selElmnt.length; j++) {
        /* For each option in the original select element,
        create a new DIV that will act as an option item: */
        c = document.createElement("DIV");
        c.innerHTML = selElmnt.options[j].innerHTML;
        c.setAttribute("data-group", selElmnt.options[j].value);

        if(selElmnt.options[j].disabled) {
        	$(c).addClass("disabled");
        	c.addEventListener("click", function(e) {
        		 e.stopPropagation();
        	});
        } else {
			c.addEventListener("click", function(e) {
				groupSelectSelected($(this));
				var h = this.parentNode.previousSibling;
				h.click();
				onChange();
			});
        }

        b.appendChild(c);
      }
      x[i].appendChild(b);
		a.addEventListener("click", function(e) {
			/* When the select box is clicked, close any other select boxes,
			and open/close the current select box: */
			e.stopPropagation();
			closeAllSelect(this);
			this.nextSibling.classList.toggle("select-hide");
			this.classList.toggle("select-arrow-active");
		});
    }

    function closeAllSelect(elmnt) {
      /* A function that will close all select boxes in the document,
      except the current select box: */
      var x, y, i, arrNo = [];
      x = document.getElementsByClassName("select-items");
      y = document.getElementsByClassName("select-selected");
      for (i = 0; i < y.length; i++) {
        if (elmnt == y[i]) {
          arrNo.push(i)
        } else {
          y[i].classList.remove("select-arrow-active");
        }
      }
      for (i = 0; i < x.length; i++) {
        if (arrNo.indexOf(i)) {
          x[i].classList.add("select-hide");
        }
      }
    }

    /* If the user clicks anywhere outside the select box,
    then close all select boxes: */
    document.addEventListener("click", closeAllSelect);
}

function repeat(str, times) {
  var repeated = '';
  for (var i = 1; i <= times; i++) {
    repeated += str;
  }

  return repeated;
};


var shareHandler = function(event, data){
	symbolab_log("Practice", "Share-Clicked");
	$(".alertify").remove();
};

function showShare(){
	addthis.init();
	if (addthis.layers.refresh) addthis.layers.refresh();
	addthis.configure({data_track_clickback: false});
	addthis.removeEventListener('addthis.menu.share', shareHandler, true);
	addthis.addEventListener('addthis.menu.share', shareHandler, true);
	symbolab_log("Practice", "Share-Show");

	var url = window.location.origin + window.location.pathname;
	var alertBox = '<div class="addthis_inline_share_toolbox_jcxz" data-title="'+document.title+'" data-url="'+url+'"></div>';
	alertify.okBtn(i18n('Cancel')).alert(alertBox);
}

function shareClick(){
	if (typeof(addthis) == "undefined"){
		var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.onload = function() {
    		showShare();
        }
        script.src = '//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-528a03623a3e3d11';
        head.appendChild(script);
	}
	else{
		showShare();
	}
};

function escapeHtml(unsafe) {
	return unsafe
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#039;");
};

//var old = alert;
//alert = function() {
//  console.log(new Error().stack);
//  old.apply(window, arguments);
//};

