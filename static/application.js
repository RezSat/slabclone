
var Application = function(userId, query, lang) {
	this.params = new Object();
	
	this.params.userId = userId;
	this.params.query = query;
	this.params.language = lang;
	
	this.init();
}

Application.prototype = {
	init: function() {   // init is called when Codepad is instantiated.
		parseQueryParameters(this.params);
		var sym = this;
		$('.topnav ul li a').click(function(event) {});
	},	
	
	queryString: function(locals) {
		if (locals == undefined) locals={};
		locals = $.extend({}, this.params, locals)
		var qs = [];
		for(var key in locals) {
			var value = locals[key];
			if (value != ""){
				qs.push((key) + "=" + encodeURIComponent(value));
			}
		}
		return qs.join('&');
	},
	params: {},
	results: {},
	
	forwardSearch : function(searchPhrase, origin) {
		if (searchPhrase != ""){
			var eqdebugStr = "";
			if (this.params.eqdebug == 'on'){
				eqdebugStr = "&eqdebug=on";
			}
			
			var newWindowLocation = '/solver/';
			if (typeof SOLUTIONS != "undefined" && SOLUTIONS.page != ""){
				newWindowLocation +=  SOLUTIONS.page + "/";
			}
			else{
				newWindowLocation +=  "step-by-step/";
			}

			newWindowLocation += encodeURIComponent(searchPhrase);
			if (origin){
				newWindowLocation += "?or="+origin;
			}
			window.location = newWindowLocation;
		}
	}
}


Application.prototype.updateSolutionsUrl = function(){
	$('#solutionsTopNav a').attr("href", "/solver/step-by-step/"+encodeURIComponent(this.params.query));
}



Application.prototype.getTextLenScore = function(results){
	var totalLen = parseInt(results.textlen) + parseInt(results.eqlen);
	var textLenScore = totalLen/100000;
	return textLenScore;
}

Application.prototype.logRedirect = function(type, info1, info2, url) {
	var _ = this;
	var data = {
			userId: _.params.userId,
			language: _.params.language,
			type: type, 
			info1: info1, 
			info2: info2, 
			redirect: url
	};
	$('body').append($('<form/>', {
		id: 'redirectPostForm',
		method: 'POST',
		action: '/logRedirect'
	}));
	var form = $('#redirectPostForm');
	for(var i in data){
		form.append($('<input/>', {
			type: 'hidden',
			name: i,
			value: data[i]
		}));
	}
	form.submit();
}

Application.prototype.showPopover = function(obj, title, content) {
	var application = this;
	obj.popover({
		title: title,
		content: content,
		placement: 'top',
		delay: { show: 500, hide: 5000 }
	}).popover('show');
	setInterval(function() {
		application.inputBox().popover('disable');
		application.inputBox().popover('hide');
	}, 4000);

};

Application.prototype.lastInsertedIsEquals = function() {
	var application = this;
	var inputQuery = application.inputValue('latex');
	if (inputQuery.indexOf('=') == inputQuery.length - 1)
		return 1;
	else
		return 0;
}

Application.prototype.updateCalculation = function() {
	var application = this;
	var inputQuery = application.inputValue('latex');
	if (!application.calcmode)
		application.calcmode = 'rad';
	if (inputQuery.indexOf('=') >= 0)
		inputQuery = inputQuery.split('=')[0];
	SYPAD.inputBox().mathquill('latex', inputQuery + ' = '); // print this right away.
	$.ajax({
		type: "GET",
		url: Application.paths.calculate,
		data: {
			query: inputQuery,
			radDeg: application.calcmode
		},
		error: function(res){
			application.showPopover(application.inputBox(), 'Calculation Error', "We ran into a problem calculating that. Try searching instead.");
		},
		success: function(res){
			if (res.response != undefined && res.response != "NA") {
				application.appendInput(res.response);
			} else {
				application.showPopover(application.inputBox(), 'Calculation Error', "We ran into a problem calculating that. Try searching instead.");
			}
		}
	});
}



Application.prototype.executeSearch = function() {

	var query = this.params.query;
	if (query == "") return;
	query = query.replace(/\\(text|mbox)\s*{(.+?)}/g, "$2 ");
	query = query.replace(/\\:/g, " ");
	query = query.replace(/\\left\\s*\(/g, "(");
	query = query.replace(/\\right\\s*\)/g, ")");

	var origQuery = query;

	// update query
	this.params.query = query;

	if (query == ""){
		this.promptError('Cannot understand this query, please try a different query.');
		this.inputBox().mathquill('latex', prepareQueryForMathQuill(origQuery));
		return;
	}

	if (this.currentPage() == 0 || this.currentPage() > 100){
		this.promptError('Allowed page numbers are 1-100.');
		return;
	}

	this.inputBox().mathquill('latex', prepareQueryForMathQuill(query));
	$('.print-only .search-query').mathquill('latex', query);
	this.updateSolutionsUrl();
	this.updateResults();
	if (!this.isScholar) {
		this.updateStepsPlot();
	}
}

Application.prototype.promptError = function(errMsg) {
	var application = this;
	application.clearResults();

	document.title = "Error - Application Results";
	$('#ShareButtonsSection').prepend("<span class='errorMsg'>" + errMsg+"</span>");
	
	$('#Refinements .scholar-refinements, #Refinements .web-refinements').hide();
	$('#Codepad .actions').hide()
	return;
}



Application.convert2html = function(input) {
	input = input.replace(/</g, "&lt;");
	input = input.replace(/>/g, "&gt;");
	return input;
}



function url_domain(data) {
	var a = document.createElement('a');
	a.href = data;
	return a.hostname;
}

function htmlDecode(input){
	if (input == "") return input;
	var e = document.createElement('div');
	e.innerHTML = input;
	return e.childNodes[0].nodeValue;
}

