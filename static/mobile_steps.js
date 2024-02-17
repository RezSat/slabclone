function i18n(key) {
	return key;
}
/**
 * String.prototype.replaceAll() polyfill
 */
if (!String.prototype.replaceAll) {
	String.prototype.replaceAll = function(str, newStr){

		// If a regex pattern
		if (Object.prototype.toString.call(str).toLowerCase() === '[object regexp]') {
			return this.replace(str, newStr);
		}

		// If a string
		return this.replace(new RegExp(str, 'g'), newStr);

	};
}

var ApplicationSteps = function() {
	this.stepsRes = null;
	this.stepsArray = [];
	this.stepsHighestBox = [];
	this.stepsArrayIndex = 0;
	this.relatedProblems = null;
	this.subscribed = "true";
	
	this.showHideMap = {};
	this.showHideMap.hideSteps = i18n('hide steps');
	this.showHideMap.showSteps = i18n('show steps');
	this.showHideMap.stepByStep = i18n('Step by Step');
	
	this.showHideMap.unlockSteps = i18n('unlock steps');
	
	this.init();
};

ApplicationSteps.prototype = {
	init: function(){
		var _ = this;
		
		$("body").on("click", ".newSelect", function(event) {
			
			event.preventDefault();

			var had = $(this).hasClass("closed");

			if ($(this).hasClass('stepsSelect') &&
					($(event.target).hasClass("arrows") || $(event.target).hasClass("value"))
				) {

				//logFunnel("ClickedFeature", "Dropdown");
			}
			
			$(".newSelect").addClass("closed");
			$(".slItems").hide();
			
			$(this).toggleClass("closed", !had);
			$(this).children('.slItems').toggle(had);
		});

		$("body").on("click", "#multipleOptions .slItem", function (event) {
			event.preventDefault();
			event.stopPropagation();
		});

		$("body").on("click", "#multipleOptions .slItem", function() {
			lastVal = $(this).attr("value");
			console.log('Solutions', 'ClickSolvingOptions', _.stepsRes.topic);

			var newVal = $(this).attr('value');
			var select = $(this).parent().parent(); 
			if (select.children('.value').attr('value') == newVal) return;

			_.setNewQuery(newVal); // like this is just checking for more options  kidda thing
		});
		
		$("body").on("click", ".stepsSelect .slItem", function(event) {
			event.preventDefault();

			var newVal = $(this).attr('value');
			var select = $(this).parent().parent().parent();
			var index = select.data("index");
			
			if (select.find('.value').attr('value') == newVal) return;
			
			if (_.inStepByStep){
				_.inStepByStep = false;
				
				$("#dym .dym").empty();
				_.stepsArray = [];
				_.stepsHighestBox = [];
				_.stepsArrayIndex = 0;
				_.writeSteps(_.stepsRes);
				_.writeChAnswer(_.stepsRes);
				
				if (newVal == 'showSteps') {
					_.isPracticeIconAdded = false;
					_.openHideStepsNew(0, true);

				}
				
				return;
			}
			_.openHideStepsNew(0, true);
			
			if (newVal == 'showSteps'){
				_.openHideStepsNew(index, true);
				//logFunnel("ClickedFeature", "Dropdown\tShowSteps");
			} else if (newVal == 'hideSteps'){
				console.log(_.NotebookSourceSolutions, "CloseOuterSteps", null, _.stepsRes.query);
				_.openHideStepsNew(index, true);

				//logFunnel("ClickedFeature", "Dropdown\tHideSteps");
			} 
			event.preventDefault();
	    });
	},

	showGraph: function(show) {
	    var _ = this;

	    $("#Plot_dynaimc .solution_box").toggle(show);
	    $("#Plot_dynaimc>h2 span").toggle(!show);
	    $("#Plot_dynaimc>h2").unbind('click').click(function(event) {
	        $("#Plot_dynaimc .solution_box").toggle();
	        $("#Plot_dynaimc>h2 span").toggle();
        });
	},

	showPracticeLink: function(show) {
		var linkContainer = $("#practice-link-container");
		linkContainer.toggle(show);
		linkContainer.appendTo(linkContainer.parent());
	},
	
	setNewQuery: function(newVal) {
		var _ = this;
		setNewMobileQuery(newVal);
	},
	
	setStepsFromMobileResponse : function(res, stepsSettings) {
		var _ = this;
		_.stepsRes = res;
		createSteps(res);
		_.doDynamicPlot(false);
		//Still used in legacy code
		changePlotToImage();
		removeShowStepsWhereApplicable(res);

		_.applyStepsSettings(stepsSettings);

		_.setSavedNote($(".nl-questionFavorite"), 'nl-questionFavoriteSaved');
	},

	setPlotFromMobileResponse : function(res) {
		var _ = this;

		var plot = $('#Plot_dynaimc');
		var plotLink = $('#PlotLink');
		var plotLoading = $("#plot-loading");
		plotLoading.hide();

		if(res) {
			_.stepsRes.plotInfo = res;

			var errs = _.stepsRes && _.stepsRes.plotInfo ? _.stepsRes.plotInfo.graphCalcInputErrors : ["error"];
			if (!Array.isArray(errs) || errs.length == 0 || errs.length == 1 && !errs[0]) {
				_.stepsRes.plotInfo.plotRequest = undefined;
				_.doDynamicPlot(_.showZoom, true);
			} else {
				plotLink.hide();
				plot.hide();
			}
		}
	},

	applyStepsSettings : function(stepsSettings) {
        var _ = this;

        var visibleSteps = $('.show-hide-steps-div');
        var index = $(".show-hide-steps-div").first().data("index");
        if (visibleSteps.length === 1){
            if (_.inStepByStep){
				console.log("1");
                _.makeStepByStepSolution();
                _.showPracticeLink(false);
            } else if (stepsSettings === undefined || stepsSettings === "showSteps") {
            	console.log("2");
				_.isPracticeIconAdded = false;
                _.openHideStepsNew(index, true);
                _.showPracticeLink(true);
                _.showVerify();
            } else if (stepsSettings === "hideSteps") {
				console.log("3");
                _.openHideStepsNew(index, false)
                _.showPracticeLink(false);
                _.showVerify();
            } else if (stepsSettings === "stepByStep"){
				console.log("4");
                _.makeStepByStepSolution();
                _.showPracticeLink(false);
                _.showGraph(false);
            }
        }
	},
	
	receiveNewSteps: function(res, dontUpdatePlot, stepsSettings) {
		//here we go this will se the json data to the stepRes
		var _ = this;
		
		_.stepsRes = res;
		$('#steps-loading').hide();
		_.writeSteps(_.stepsRes);
		_.writeChAnswer(_.stepsRes);

        _.applyStepsSettings(stepsSettings);

        _.addNotesDiv();
        refreshLeftNavbarHeight();


	},

	writeChAnswer : function(res){
		var _ = this;
		if (res.externalSolution != null) {
			var delim = new RegExp("</?formula.*?>","g");
			var nonFormula = new RegExp("(^|</?formula.*?>)(.*?)(</?formula.*?>|$)", "g");
			var pTags = new RegExp("</?p>","g");
			var parsedSolution = _.parseExternalSolution(res);
			var steps = parsedSolution.steps;
			if (steps.length === 0 || (steps.length === 1 && steps[0] === '')) {
				this.showCannotSolve();
				return;
			}
			var multipleSolutions = $('#multipleSolutions');
			var temp = $('<div></div>');
			var solutionDiv = $('<div class="solution_div"></div>');
			var solutionOutside = $('<div class="solution_box solution_outside_box"></div>');
			var solutionTitleContainer = $('<div onClick class="solution_title_container_highest"></div>');
			var solutionMainTitle = $('<div class="solution_step_title"></div>');
			var solution = parsedSolution.solution;
			if (parsedSolution.query.startsWith("\\lim") && (solution.indexOf("does not exist") >= 0)) {
				solution = "Diverges."
			}
			// If the solution is just concatenation of steps, remove it.
			if (res.standardQuery.startsWith("prove") ||
				solution.replaceAll("<p> </p>", "").indexOf(steps[0]) >= 0) { // contains 1st step
				solution = "True "; // trailing space for overflow x right padding issue.
			}
			if (solution.match("^<img[^<>]*>$")) {
				steps.push(solution);
				solution = "See image in steps.";
			}
			solution = _.getLastSolutionLine(solution);
			solution = solution.replaceAll(nonFormula, _.processSolutionTitleText);
			var separator = parsedSolution.query.indexOf("=") >= 0 ? " \\quad:\\quad " : " = ";
			var solutionTitle = "###" + parsedSolution.query + separator + solution + "###";
			solutionTitle = solutionTitle.replaceAll(pTags, "").replaceAll(delim, "\\space ");
			solutionMainTitle.append(solutionTitle);
			renderMathInElement(solutionMainTitle[0], {
				delimiters:	[{left: "###", right: "###", display: true}]
			});
			// katex couldn't render for some reason
			if (solutionMainTitle[0].innerText.indexOf("###") >= 0) {
				this.showCannotSolve();
				return;
			};
			var stepDiv = $('<div style="display: block;"></div>');
			var stepList = $('<ul id="steps-container" class="solution_step_list"></ul>');
			stepList.append('<li class="solution_step_list_itemc solution_steps_text">Steps</li>');
			if (parsedSolution.steps.length > 0) {
				var step = parsedSolution.steps[0];
				var stepItem = $('<li class="solution_step_list_item"></li>');
				stepItem.append(_.createSolutionStepBook(step, delim));
				stepList.append(stepItem);
			}
			if (parsedSolution.steps.length > 1) {
				if (this.subscribed) {
					var arr = parsedSolution.steps.slice(1);
					for (var stepId in arr) {
						var step = arr[stepId];
						var stepItem = $('<li class="solution_step_list_item"></li>');
						stepItem.append(_.createSolutionStepBook(step, delim))
						stepList.append('<hr class="stepsHr">');
						stepList.append(stepItem);
					}
				} else {
					var stepItem = $('<li class="solution_step_list_item"></li>');
					var solutionInside = $('<div class="solution_box solution_inside_box""></div>');
					var innerSolutionTitleContainer = $('<div onclick="SYSTEPS.showHideRule(this)" class="solution_title_container"></div>');
					var a = $("<a></a>");
					a.append($("<span class='locked-step'/>"));
					a.append($("<span class='showButtonText'>Show Steps</span>"));
					var solutionStepTitle = $('<div class="solution_step_title">More steps</div>');
					innerSolutionTitleContainer.append(a);
					innerSolutionTitleContainer.append(solutionStepTitle);
					solutionInside.append(innerSolutionTitleContainer);
					stepItem.append(solutionInside);
					stepList.append('<hr class="stepsHr">');
					stepList.append(stepItem);
				}
			}

			solutionTitleContainer.append(solutionMainTitle);
			solutionOutside.append(solutionTitleContainer);
			stepDiv.append(stepList);
			solutionOutside.append(stepDiv);
			solutionDiv.append(solutionOutside);
			temp.append(solutionDiv);

			temp.find("img").each(function() {
				var img = $(this);
				var url = img.attr("src");
				var id = url.replace(/[\/:.]/g, "");
				img.wrap($("<div />", {id: id}));
				img.remove();
				requestChImage(url, id);
			});

			multipleSolutions.append(temp.html());
		}
	},

	getLastSolutionLine : function(solution) {
		solution = solution.replaceAll("<p> </p>", "");
		if (solution.indexOf("<p>") >= 0) {
			solution = solution.substr(solution.lastIndexOf("<p>"));
		}
		if (solution.indexOf("\\begin{aligned}") >= 0 && solution.match("&\\s*=")) {	// multi line formula
			solution = solution.replace(/\\begin\{aligned\}(.*)\\end\{aligned\}/, function (_, multiline) {
				return multiline.split("\\\\").pop().replaceAll("&", "");
			});
		}
		return solution;
	},

	processSolutionTitleText : function(textPart) {
		var imageTag = new RegExp("<img.*?>", "g");
		return textPart.replaceAll(" ", " \\space ")
			.replaceAll(imageTag, "");
	},

	createSolutionStepBook : function(step, delim) {
		let stepText = $('<div class="solution_step_book"></div>');
		stepText.append(step.replaceAll(delim, "###"));
		renderMathInElement(stepText[0], {
			delimiters:
				[
					{left: "###", right: "###", display: false}
				]
		});
		return stepText;
	},

	parseExternalSolution : function(res) {
		var rareTrigo =
			new RegExp("\\\\(sech|csch|arcsech?|arccsch?|arcsinh|arccosh|arctanh|arccoth)", "g");
		let parsedSolution = new Object();
		parsedSolution.query = res.externalSolution.renamedQuery.replaceAll(rareTrigo,"\\mathrm{$1}");
		parsedSolution.solution = "";
		parsedSolution.steps = [];
		let answerObj = JSON.parse(res.externalSolution.solution);
		if (answerObj.answers !== undefined) {
			for (var answerId in answerObj.answers) {
				var answer = answerObj.answers[answerId];
				if (answer.widgets !== undefined) {
					for (var widgetId in answer.widgets) {
						var widget = answer.widgets[widgetId];
						if (widget.text !== undefined) {
							parsedSolution.solution += widget.text;
						}
					}
				}
				if (answer.explanations !== undefined) {
					for (var stepId in answer.explanations) {
						var step = answer.explanations[stepId];
						let stepText = "";
						if (step.explanations !== undefined) {
							for (var stepPartId in step.explanations) {
								var stepPart = step.explanations[stepPartId];
								if (stepPart.widgets !== undefined) {
									for (var widgetId in stepPart.widgets) {
										var widget = stepPart.widgets[widgetId];
										stepText += widget.text;
									}
								}
							}
						}
						parsedSolution.steps.push(stepText);
					}
				}
			}
		}
		return parsedSolution;
	},

	getScrollHeight : function(selector){
		var jq = $(selector);
		if (jq.size() == 0) return 0;
		return jq[0].scrollHeight;
	},

	showVerify : function(step_by_step_div) {
		
		var _ = this;

		if (_.stepsRes.showVerify) {
		    var template;
			
			if(step_by_step_div) {
				
				template = $("#verify-section-template").clone();
				template.removeAttr("id");
				template.find("#verify-input").addClass("stepByStepInput");
				step_by_step_div.append(template.html());

				step_by_step_div.find('.mathquill-editable').mathquill('editable');
				step_by_step_div.find('.hintText.bold').text(i18n("Know the answer?"));
				step_by_step_div.find("#EnterText").text(i18n('Enter your answer'));
				step_by_step_div.find("#clear-textfield").toggleClass("lockedVerify", !_.subscribed);
				$("#clear-textfield").addClass("verify-hidden");
                $("#verify-camera-button").removeClass("verify-hidden");

			} else {
				template = $("#verify-section-template").clone();
				template.removeAttr("id");
				template.toggleClass("lockedVerify", !_.subscribed);
				$("#verify-section").empty().append(template.html());
				
				$('#verify-section .mathquill-editable').mathquill('editable');

				$('#verify-section .hintText.bold').text(i18n("Got a different answer?"));
				$('#verify-section #EnterText').text(i18n('Enter your answer'));

				$("#verify-section #clear-textfield").toggleClass("lockedVerify", !_.subscribed);

	            $("#clear-textfield").addClass("verify-hidden");
                $("#verify-camera-button").removeClass("verify-hidden");
				$('#verify-section').show();
			}
			
			$('.verify-button').unbind('click').click(function(event) {
				_.verify($(this));
			});
			
			$('#verify-input').unbind('keyup').keyup(function(event) {
				var charCode = (event.charCode) ? event.charCode : event.keyCode;
				if (event.keyCode === 13) {
					_.verify($(this).parent().find("button"));
				}
			});
		}
	},
	
	verify: function(button) {
		var latex = button.parent().find(".verify-input").mathquill("latex");
		appVerify(latex);
	},
	
	makeStepByStepSolution : function(){
		var _ = this;
		
		_.inStepByStep = true;
		$(".ul-div").remove();
		var index = $(".show-hide-steps-div").first().data("index");
		_.openHideStepsNew(index, true);
		_.populateStepByStep();
	},
	
	populateStepByStep: function(){
		var _ = this;
		$(".solution_title_container_highest").remove();
		$("#steps-container .solution_step_list_item").remove();
		$("#steps-container hr").remove();
		$(".solutionHints").remove();
		$(".solution_outside_box").css('padding-top','7px');
        var value = $('.show-hide-steps-div .value');
        value.attr('value', "stepByStep");
        value.text(_.showHideMap.stepByStep);
        $("#multipleSolutions .solution_outside_box").prepend($("<div></div>", {css: {"clear": "both"}}));
        $("#multipleSolutions .solution_outside_box").prepend(_.getSolvingOptions());
		$('#verify-section').hide();
		
		_.stepIndex = 0;
		_.steps = getFixedStepsFormat(_.stepsRes.solutions[0].steps);
		
		var parent = $("#steps-container").parent();
		var div = $("<div class='solutionHints'></div>");
		div.append("<div class='nl-third nl-resetLH'>&nbsp;</div>");
		div.append("<div class='nl-third nl-totalHints nl-resetLH'></div>");
		div.append("<div class='nl-third nl-textRight nl-resetLH'><a class='next-step-button nl-nextHintLink nl-resetLH'>" + i18n('Next Step') + " <i class='nl-practice-sprite nl-practice-sprite-next'></i></a></div>");
		
		parent.append(div);
		
		_.showVerify(div);
		
		$("#steps-container").show();
		$(".next-step-button").unbind('click').click(function(){
			if (_.stepIndex < _.steps.length){
				$("#steps-container").append(_.createStepListItem(_.steps[_.stepIndex]));
				$("#steps-container .mathquill-embedded-latex:not(.mathquill-rendered-math)").mathquill();
			}
			if (_.stepIndex > 0){
				console.log('Solutions', "StepByStep-Next");
			}
			_.stepIndex++;
			if (_.stepIndex <= _.steps.length){
				$(".nl-totalHints").text(_.stepIndex + " / " + _.steps.length);
				$(".next-step-button").show();
			}

			if (_.stepIndex >= _.steps.length){
				$(".next-step-button").hide();
			}
		});
		$(".next-step-button").click();
	},
	
	getSolvingOptions : function(){
		var _ = this;
		if (!_.stepsRes.solvingOptions) return;
		var select = $("<div id='multipleOptions' class='newSelect closed'></select>");
		select.append("<span class='arrows'><i class='nl-practice-sprite'></i></span>");
		select.append("<div class='value' value='"+_.stepsRes.solvingOptions.returnedOption+"'></div>");
		
		var values = $("<div class='slItems'></div>");
		for (var i = 0; i < _.stepsRes.solvingOptions.count; i++){
			_.stepsRes.solvingOptions.displays[i] = _.stepsRes.solvingOptions.displays[i].replace(/\\mathrm\{/, "");
			_.stepsRes.solvingOptions.displays[i] = _.stepsRes.solvingOptions.displays[i].replace(/\}/, "");
			var isSelectedValue = _.stepsRes.solvingOptions.returnedOption == _.stepsRes.solvingOptions.queries[i];
			if (isSelectedValue){
				select.find('.value').append(_.stepsRes.solvingOptions.displays[i]);
			}

			values.append("<div class='slItem' value='" + _.stepsRes.solvingOptions.queries[i] + "'>"+_.stepsRes.solvingOptions.displays[i]+"</div>");
		}
		select.append(values);
		console.log('Solutions', 'ShowSolvingOptions', _.stepsRes.topic);
		
		return select;
	},
	
	getSettingsContent: function(val, noStepByStep){
		var _ = this;
		var select = $("<div class='stepsSelect newSelect closed'></select>");
//		if(!_.subscribed) {
//			select.append("<span class='arrows locked'></span>");
//			select.append("<div class='value' value='"+val+"'>"+_.showHideMap['unlockSteps']+"</div>");
//		} else {
			select.append("<span class='arrows'><i class='nl-practice-sprite'></i></span>");
			select.append("<div class='value' value='"+val+"'>"+_.showHideMap[val]+"</div>");
//		}
		
		var values = $("<div class='slItems'></div>");
		values.append("<div class='slItem' value='hideSteps'>"+_.showHideMap['hideSteps']+"</div>");
		values.append("<div class='slItem' value='showSteps'>"+_.showHideMap['showSteps']+"</div>");

		select.append(values);
		
		var div = $("<div class='show-hide-steps-div'></div>");
		div.append(select);
		
		return div;
	},
	
	removeSolvingOptions : function(){
		$("#multipleOptions").remove();
	},
	
	updatePracticeLinks : function(where2add) {
		var _ = this;
		if (_.stepsRes){
			var url = '/practice';
			var text = 'click here to start application practice »';
			if (_.stepsRes.topic != "Other"){
				url = _.stepsRes.practiceLink;
				text = 'click here to practice ' + _.stepsRes.topic.toLowerCase() + ' »';

				if (_.stepsRes.topic.toLowerCase() == 'integrals' && !isUserLoggedIn()){
					url = "/practice/integrals-practice#area=quiztrial";
					text = 'click here to test your integrals skills »';
				}
				else if (_.stepsRes.topic == 'Equations'  && (_.stepsRes.subTopic == 'Quadratic' || _.stepsRes.subTopic == 'Linear')){
					text = 'click here to practice ' + _.stepsRes.subTopic.toLowerCase() + ' equations »';
				}
				$("#PracticeLink").attr('href', url);
			}
	
			_.addPracticeLink(where2add, 'SolutionBottom', url, text);
		}		
	},
	
	addPracticeLink : function(where2add, type, url, text) {
		var _ = this;
		where2add.append($('<a class="stepsPracticeLink" href="'+url+'">' + text + '</a>'));
	},
	
	hasTitle : function(solution, title){
		if (solution.title && solution.title.text && solution.title.text.createdText){
			if (solution.title.text.createdText.indexOf(title) >= 0) {
				return true;
			}
		}

		if (solution.steps){
			for (var i = 0; i < solution.steps.length; i++){
				if (this.hasTitle(solution.steps[i], title)){
					return true;
				}
			}
		}

		return false;
	},
	
	writeSteps : function(res){
		var _ = this;
		if (res){
			if (res.errorMessage){
				//not append-intensive
				
				$('#multipleSolutions').append(this.createMessageBox(res.errorMessage));
				$('#multipleSolutions .mathquill-embedded-latex').mathquill();
				if (res.errorMessage.indexOf('Upgrade') >= 0){
					$('#multipleSolutions .mathquill-embedded-latex')
						.after(" <a class='upgrde-button' onclick='if (isUserLoggedIn()) {showSubscription(\"SolutionsSolvingMethod\")}else{showSignUp(\"SolutionsSolvingMethod\", true)}'>Upgrade</a>");
				}
			}
			else if (res.solutions != undefined) {
				$('#multipleSolutions').empty();
				if (res.dym && res.dym.showDidYouMean){
					
					// console.log("Solutions", "ShowDYM", null, $("#main-input").mathquill('latex'));
					
					var urlPrefix = "mobileRender?or=dym&license=" + license + "&query=";
											
					_.showDYM($("#dym"), urlPrefix, res.dym);
				}
				
				_.parseSolutions(res.solutions);
				if (_.requestLang != "" && _.requestLang != res.stepLang){
					$(".onlyEnglish").show();
				}

				if (res.relatedProblems && res.relatedProblems.length > 0){
					_.relatedProblems = res.relatedProblems;
					_.addRelatedProblems(100);
					$('#RelatedLink').show();
					// console.log('Solutions', 'ShowRelated', null, $("#main-input").mathquill('latex'));
				}
			} else if (res.computesTo && res.computesTo != "NA") {
				// show solution only, no steps
				$('#multipleSolutions').append(this.createMessageBox(res.computesTo));
			} else{
				this.showCannotSolve();
			}
		} else {
			this.showCannotSolve();
		}

		$(".solution_div").each(function(i, item) {
			var div = $(item);
			var inside = div.find(".show-hide-steps-div");
			inside.insertBefore(div);
		});
		
		$('#ExamplesLink').show();
		this.makeScrollable($("#mathquill_query_container .solution_box"));
	},
	
	showDYM : function(dymObj, urlPrefix, dymData){
		var outQuery = this.combineTextEquation(dymData.outText, dymData.outEquation);
		var dymQuery = this.combineTextEquation(dymData.dymText, dymData.dymEquation);
		
		var solvingA = $("<a href='"+urlPrefix+encodeURIComponent(outQuery)+ "'></a>");
		solvingA.append(createMathquillSpan('solvingText', "\\mathrm{"+i18n("Solving")+"}\\:"));
		solvingA.append(createMathquillSpan('solvingQuery', "\\mathrm{"+outQuery+"}"));
		dymObj.find('.dym').append(solvingA);
		
		if (dymData.showInstead){
			dymObj.find('.dym').append("<br/>");

			var insteadA = $("<a class='dymRight' href='"+urlPrefix+encodeURIComponent(dymQuery) + "'></a>");
			var dym = dymQuery;
			insteadA.append(createMathquillSpan('dymText', "\\mathrm{"+i18n("Solve instead")+"}\\:"));
			insteadA.append(createMathquillSpan('dymQuery', "\\mathrm{"+dymQuery+"}"));
			dymObj.find('.dym').append(insteadA);
		}
		
		dymObj.show();
		dymObj.find('.mathquill-embedded-latex').mathquill();
	},
	
	addRelatedProblems : function(limit){
		$('#relatedList').empty();
		for (var i = 0; i < this.relatedProblems.length && i < limit; i++){
			var solvingUrl = "solveRelated/" + encodeURIComponent(this.relatedProblems[i]) + "?or=related";
			var problem = this.relatedProblems[i].replace(/ /g, "\\:").replace(/</g, "&lt;").replace(/>/g, "&gt;");
			problem = prepareQueryForMathQuill(problem);
			var li = $('<li><a class="clickable" onclick="window.location=\''+solvingUrl+'\';"><span class="mathquill-embedded-latex">' + problem + '</span> <svg><use href="#solutions-img" xlink:href="#solutions-img"></use></svg></a></li>');
			$('#relatedList').append(li);
		}
		$('#related').show();
		$('#relatedList .mathquill-embedded-latex').mathquill();
	},
	
	showCannotSolve : function(){
        $('#multipleSolutions').append(this.createMessageBox(i18n("cannot solve")));
        $('#multipleSolutions .mathquill-embedded-latex').mathquill();
	},

	getPlotSettings : function(showZoom) {
		return this.plotSettings ? this.plotSettings : {showZoom: showZoom, pixelRatio: window.devicePixelRatio, lineWidth: 2};
	},

	doDynamicPlot : function(showZoom, recur) {
		var _ = this;
		_.showZoom = showZoom;

		if(_.stepsRes) {
			setTimeout(function() {
				var numberLine = SyNumberLine.fromNumberLineInfo($('#numberLine .solution_box'), $("#numberLine, #NumberLineLink"), _.stepsRes.numberLineInfo);
				if (numberLine.valid) {
					$('#numberLine').hide();
					$('#NumberLineLink').show();
				}
			}, 0);
		}

		if (_.stepsRes && _.stepsRes.plotInfo){
			var plot = $('#Plot_dynaimc');
			var plotLink = $('#PlotLink');
			var plotRequest = _.stepsRes.plotInfo.plotRequest;
            if (plotRequest === '') {
                plotLink.hide();
                plot.hide();
            }
 			else if (plotRequest && !recur){
				plot.show();
				_.syPlot = new SyPlot("#sy_graph", {}, this.getPlotSettings(showZoom));
				var plotText = plot.find('.plotText');
				plotText.hide();
				var sygraph = $("#sy_graph");
				var plotLoading = $("#plot-loading");
				plotLoading.css("position", "absolute");
				plotLoading.css("margin-top", (sygraph.height()/2+1) + "px");
				plotLoading.css("margin-left", (sygraph.width()/2-16) + "px");
				plotLoading.show();
				plotLink.show();

				if (plotRequest === "yes") {
					plotRequest = SYMBOLAB.params.query;
				}

				// plot is not returned with the steps request, make another request to plot, with this.stepsRes.plotInfo.plotRequest
				requestPlot(plotRequest);
			}
			else{
				try{
					if (!recur) plot.show();
					_.syPlot = new SyPlot("#sy_graph", this.stepsRes.plotInfo, this.getPlotSettings(showZoom));
					var plotText = plot.find('.plotText');
					plotText.show();
					var plotTitle = this.getPlotTitle();
					plotText.append(createMathquillSpan(null, plotTitle));
					$('#ExamplesLink').show();
					plotLink.show();
					mathquillifyVisible(plot);
					_.addViewMore();
				}
				catch(err){
				    console.log(err);
					plotLink.hide();
					plot.hide();
					return;
				}
			}
		}
	},

	addViewMore: function(){

		var query;
		if (this.stepsRes.showViewLarger) {
			query = this.stepsRes.canonicalNotebookQuery;
			if ("System of Inequalities" === this.stepsRes.topic){
				query = this.stepsRes.canonicalNotebookQuery.replace(/,/g, ";");
			}
		}

		if (query) {
			query = query.replace(/ /g, "\\:");
			query = encodeURI(query);
			query = query.replace(/\+/g, "%2B");
			$(".viewLargerPlot").attr('href', 'graphing-calculator?functions=' + query);
			$(".viewLargerPlot").show();
		}
	},

	getPlotTitle : function() {
		var title = "";
		if (this.stepsRes.plotInfo.functionChanges && this.stepsRes.plotInfo.functionChanges[0]){
			var functionChanges = this.stepsRes.plotInfo.functionChanges[0];
			var title = functionChanges.plotTitle;
			if (functionChanges.paramsLatex && functionChanges.paramsLatex.length){
				
				title += "\\quad\\mathrm{" + i18n('plot assuming') + "}";
				for(var i = 0; i < functionChanges.paramsLatex.length; i++) {
					title += "\\quad ";
					title += functionChanges.paramsLatex[i];
					title += "=";
					title += functionChanges.paramsReplacementsLatex[i];
				}
			}
		}
		
		return title;
	},
	
	
	parseSolutions : function(solutions){
		var multipleSolutions = $('#multipleSolutions');
		var newSolutionBox = $('<div class="new_solution_box_title"></div>')
		newSolutionBox.append('<h2>' + i18n('solution') + '</h2>');
		var temp = $("<div></div>");
		temp.append(newSolutionBox);
		
		for (var idx in solutions) {
			var oneSolution = solutions[idx];
			if (oneSolution == null) continue;
			var solutionDiv = $('<div class="solution_div"></div>');
			solutionDiv.append(this.createSolutionBox(oneSolution, true));
			temp.append(solutionDiv);
		}
		
		multipleSolutions.append(temp.html());
		
		mathquillifyVisible(multipleSolutions);
		var _ = this;
		setTimeout(function() {
		    _.makeScrollable(multipleSolutions);

		    _.twoLineTitle(multipleSolutions);

		}, 100);
	},

	createSolutionBoxDiv : function(oneSolution, highestBox){
		var solutionBox;
		if (highestBox){
			solutionBox = $('<div class="solution_box solution_outside_box"></div>');
		}
		else{
			solutionBox = $('<div class="solution_box solution_inside_box"></div>');
		}
		
		if (oneSolution.step_id != undefined){
			solutionBox.attr("id", oneSolution.step_id);
		}
		
		return solutionBox;
	},


	getTitleContainer : function(oneSolution, highestBox){
		var openCommand = "SYSTEPS.showHideRule(this);";
		if (highestBox){
			openCommand = "SYSTEPS.openHiddenSteps(this, true);";
		}
		
		var index = -1;

		if (!oneSolution.isOpen && !this.isToLock(oneSolution)){
			index = this.stepsArrayIndex;
			this.stepsArray[this.stepsArrayIndex] = oneSolution;
			this.stepsHighestBox[this.stepsArrayIndex] = highestBox;
			this.stepsArrayIndex++;
		}
		
		var titleContainer = $("<div></div>", {onclick: openCommand});
		
		if (highestBox) {
			titleContainer.addClass("solution_title_container_highest");
		} else {
			titleContainer.addClass("solution_title_container");
		}
		
		titleContainer.attr("data-index", index);
		
		if (highestBox){
			if (!oneSolution.isInfoStep){
				var content = content = this.getSettingsContent('hideSteps', this.stepsRes.solutions && this.stepsRes.solutions.length > 1);
				content.attr("data-index", index);
				titleContainer.append(content);
			}
		}
		else {
			var a = $("<a></a>");
			if (oneSolution.isOpen){
				a.append($("<span class='hideStepsButton'/>"));
				a.append($("<span class='hideButtonText'>" + i18n('hide steps') + "</span>"));
			}
			else{
				if (oneSolution.isLocked && !this.subscribed) {
					a.append($("<span class='locked-step'/>", {html: "&nbsp;"}));
					if (!this.seenLockedStep) {
						//logFunnel('SeenFeature', "LockedStep");
					}
					this.seenLockedStep = true;
				}
				else{
					a.append($("<span class='showStepsButton'/>"));
				}
				a.append($("<span class='showButtonText'>" + i18n('show steps') + "</span>"));
			}
			titleContainer.append(a);
		}
		
		if(oneSolution.title === undefined){
			titleContainer.append(createMathquillDiv("title", "title"));
		}
		else{
			titleContainer.append(this.getInfoLine("title", oneSolution.title));
		}
		
		return titleContainer;
	},

	isToLock : function(oneSolution) {
		return oneSolution.isLocked && !this.subscribed;
	},

	createSolutionBox : function(oneSolution, highestBox){
		var solutionBox = this.createSolutionBoxDiv(oneSolution, highestBox);
		var titleContainer = this.getTitleContainer(oneSolution, highestBox);
		solutionBox.append(titleContainer);
		if (oneSolution.isOpen || oneSolution.isInfoStep){
			solutionBox.append(this.createSolutionBoxContent(oneSolution, highestBox));
		}
		return solutionBox;
	},

	createSolutionBoxContentUl : function(oneSolution, highestBox){
		var _  = this;
		var appendQueryInput = true;
		var stepList;
		if (typeof(isCompare) != "undefined" && isCompare){
			stepList = $('<ol style="margin-left:-15px !important;list-style:inherit;list-style-type: decimal;" type="1" id="steps-container" class="solution_step_list"></ol>');
		}
		else{
			stepList = $('<ul id="steps-container" class="solution_step_list"></ul>');
		}
		if (highestBox){ 
			stepList.append($("<li class='solution_step_list_itemc solution_steps_text'>" + (oneSolution.isInfoStep ? "" : i18n('steps')) + "</li>")); 
		}	
		
		if (oneSolution.definition != undefined){
			stepList.append(this.getDefintionLine(oneSolution.definition, highestBox));
			appendQueryInput = false;
		}
		if (oneSolution.general_rule != undefined){
			var div = $("<div></div>");
			div.append(this.getInfoLine("rule", oneSolution.general_rule));
			stepList.append(div);
			appendQueryInput = false;
		}
		
		if (oneSolution.explanation != undefined){
			for (var idx2 in oneSolution.explanation) {
				var div = $("<div></div>");
				div.append(createMathquillDiv('solution_step_explanation', oneSolution.explanation[idx2].createdText, oneSolution.explanation[idx2].id));
				stepList.append(div);
				appendQueryInput = false;
			}
		}
		if (appendQueryInput == true && oneSolution.step_input != undefined){
			stepList.append(createMathquillDiv("solution_step_result", oneSolution.step_input));
			stepList.append($("<hr class='stepsHr'/>"));
		}
		
		var wasEntireResultEnetered = false;
		for (var idx in oneSolution.steps) {
			var step = oneSolution.steps[idx];
			var stepListItem = this.createStepListItem(step);
			if (this.isAddHR(stepListItem, stepList)) {
				stepList.append($("<hr class='stepsHr'/>"));
			}
			stepList.append(stepListItem);
			wasEntireResultEnetered = stepListItem.find(">.solution_step_result").size() > 0;
		}
		
		if (wasEntireResultEnetered == false){
			var stepListItem = $('<li class="solution_step_list_item"></li>');
			stepListItem.append(createMathquillDiv("solution_step_result", oneSolution.entire_result));
			stepList.append(stepListItem);
		}
		
		return stepList;
	},
	
	createStepListItem : function(oneStep){
		var stepListItem = $('<li class="solution_step_list_item"></li>');
		
		if (oneStep.isInterimStep){
			var interimDiv = this.createSolutionBox(oneStep);
			stepListItem.append(interimDiv);
			if (oneStep.isShowSolutionAfterStep){
				if (oneStep.entire_result != undefined){
					stepListItem.append(createMathquillDiv("solution_step_result", oneStep.entire_result));
				}
			}			
		}
		else{
			this.populateStepListItem(stepListItem, oneStep);
			
		}
		
		return stepListItem;
	},
	
	createSolutionBoxContent : function(oneSolution, highestBox){
		var _ = this;
		var ul = this.createSolutionBoxContentUl(oneSolution, highestBox);
		var ulDiv = $("<div></div>", {"class": "ul-div"});
		if (!highestBox){
			ulDiv.addClass('solution_list_div');
		}

		ulDiv.append(ul);
		return ulDiv;
	},

	addNotesDiv : function(){
		var _ = this;
		var h = $("#main-input").innerHeight();
		$(".nl-notesFav").css('margin-top', h/2-15)
		$(".nl-notesFav").show();
	},

	openCloseNotes :  function(){
		var next = $(".notesTitle").next();
		var parent = $(".notesTitle").parent();
		
		if(next.is(":visible")){
			next.hide();
			$('.notesTitle').text(i18n('Save'));
		}else{
			next.show();
			$('.notesTitle').text(i18n('Notes'));
		}
		var height = parent.outerHeight() + 3;
		if (typeof(SYPRAC) != "undefined"){
			height += 3;
		}
		parent.css("margin-top", "-"+height + "px");	
	},

	injectChImage : function(id, base64) {
		var div = $("div." + id);
		var img = $("<img />", {"src": 'data:image/png;base64,' + base64});
		div.append(img);
	},

	injectImage : function(id, width, base64, type, isEmptyImage) {
	},

	populateStepListItem : function(stepListItem, oneStep) {
		if (oneStep.step_id != undefined){
			stepListItem.attr("id", oneStep.step_id);
		}
		
	 	if (oneStep.title != undefined){
	 		if (oneStep.general_rule != undefined){
				if (this.requestLang == "he"){
					oneStep.title.text.createdText = oneStep.general_rule.text.createdText + "\\quad:" + oneStep.title.text.createdText;
				}else{
					oneStep.title.text.createdText += ":\\quad " + oneStep.general_rule.text.createdText;
				}

				oneStep.general_rule = null;
	 		}
	 		stepListItem.append(this.getInfoLine("title", oneStep.title));
	 	}

		if (oneStep.definition != undefined){
			var div = $("<div></div>");
			div.append(this.getDefintionLine(oneStep.definition, false));
			stepListItem.append(div);
		}
		if (oneStep.general_rule != undefined){
			stepListItem.append(this.getInfoLine("rule", oneStep.general_rule));
		}
		if (oneStep.explanation != undefined){
			for (var idx2 in oneStep.explanation) {
				stepListItem.append(createMathquillDiv('solution_step_explanation', oneStep.explanation[idx2].createdText, oneStep.explanation[idx2].id));
			}
		}

		if(oneStep.image !== undefined) {
			setTimeout(function() {
				var inStepImage = SyNumberLine.fromInStepImageUrl(stepListItem, $("blank"), oneStep.image);
			}, 0);
		}
		
		if (oneStep.steps != undefined){
			for (var idx2 in oneStep.steps) {
				var interim = oneStep.steps[idx2];
				if (interim.isInterimStep){
					var interimDiv = this.createSolutionBox(interim);
					stepListItem.append(interimDiv);
				}
				else{
					//interim.entire_result = null;
					this.populateStepListItem(stepListItem, interim);
					if (interim.entire_result == null && idx2 < (oneStep.steps.length - 1)){
						stepListItem.append("<br/>");
					}
				}
				
			}
		}
		if (oneStep.entire_result != undefined){
			stepListItem.append(createMathquillDiv("solution_step_result", oneStep.entire_result));
		}
	},
	
	isAddHR : function(stepListItem, stepList) {
		var lastItem = stepList.children().last();
		
		if (stepListItem.find(">.solution_box").size()>0 && lastItem.find(">.solution_step_result").size() == 1) return true;
		if (lastItem.size() == 0 || lastItem.is("hr") || lastItem.text() == "Steps") return false;
		if ( $(stepListItem).children().length <= 1) return false;
		if (lastItem.find(">.solution_box").size()>0 && lastItem.find(">.solution_step_result").size() == 0) return false;

		return true;
	},

	getDefintionLine : function(infoLine, highestBox){
		var definitionBox = $('<div class="solution_box solution_step_definition_main"></div>');
		var titleContainer = $('<div class="solution_step_definition" onclick="SYSTEPS.showHideRule(this)" ></div>');
		
		var a = $("<a></a>");
		a.append($("<span class='print-hide hideStepsButton'/>"));
		a.append($("<span class='print-hide hideButtonText'>" + i18n('hide definition') + "</span>"));
		
		titleContainer.append(a);
		titleContainer.append(createMathquillDiv("solution_step_title_text", infoLine.text.createdText, infoLine.text.id));
		
		definitionBox.append(titleContainer);
		var defBox = createMathquillDiv("solution_step_definition_text", infoLine.extension.createdText, infoLine.extension.id);
		definitionBox.append(defBox);
		
		return definitionBox;
	},

	getInfoLine : function(type, infoLine) {
	    var _ = this;
	    var topDiv = $("<div></div>");

	    if (infoLine.text){
	        if(infoLine.text_part1 !== undefined && infoLine.text_part2 !== undefined) {
	            var line1 = _.getSingleInfoLine(type, infoLine.text_part1.createdText, infoLine.text_part1.id, "splitAnswerFirst");
	            var colon = _.getSingleInfoLine(type, "\\quad:\\quad", infoLine.text_part1.id, "splitAnswerLineColon");
	            var line2 = _.getSingleInfoLine(type, infoLine.text_part2.createdText, infoLine.text_part2.id, "splitAnswerLine");

	            topDiv.append(line1);
	            topDiv.append(colon);
	            topDiv.append(line2);

	            topDiv.children().css({"float": "left"});

	            topDiv.append($("<div></div>", {css: {"clear": "both"}}));
	        } else {
	            var line = _.getSingleInfoLine(type, infoLine.text.createdText, infoLine.text.id);
	            topDiv.append(line);
	        }
	    }

        return topDiv;
	},

	getSingleInfoLine : function(type, text, id, extraClass){
		var span = $('<div class="solution_step_' + type + '"></div>');

		if(extraClass !== undefined) {
		    span.addClass(extraClass);
		}

		var text = createMathquillSpan("solution_step_" + type + "_text", text, id);
        text.css('position', 'relative');
        span.append(text);
		return span;
	},
	
    openHideStepsNew :function(index, open){
		var _ = this;

		var select = $('.show-hide-steps-div').filter(function() { return $(this).data("index") === index })
		var target = $('.solution_title_container_highest').filter(function() { return $(this).data("index") === index })
		
		$('.notesMainDiv').remove();
		$('.stepsPracticeLink').remove()
		
		if (open) {
			
			target.parent().find(".ul-div").remove();
			
			this.addContentIfNeeded(target);
			_.updateNotesPractice(target);

            target.prepend($("<div></div>", {css: {"clear": "both"}}));
            target.prepend(_.getSolvingOptions());
			
			target.parent().find(".ul-div").show();
		} else {
			target.parent().find(".ul-div").hide();
			_.removeSolvingOptions();
		}

		var value = select.find(".value");
		value.attr('value', open ? "showSteps" : "hideSteps");
		value.text(_.showHideMap[open ? "showSteps" : "hideSteps"]);
	},
//
	openHiddenSteps :function(obj, shouldLog) {
		var _ = this;
		var jq = $(obj);
		var button = jq.find('.show-hide-steps');
		if (button.size() == 0) return;
		
		var next = jq.next();
		$('.notesMainDiv').remove();
		$('.stepsPracticeLink').remove();
		if (button.text().indexOf(i18n('show steps')) >= 0) {
			this.addContentIfNeeded(jq);
			button.text("\u00AB " + i18n('hide steps'));
			_.updateNotesPractice(jq);
		}
		else {
			next.hide();
			button.text(i18n('show steps') + " \u00BB");
			
			if(shouldLog) {
				console.log("Solutions", "	Steps", null, $("#main-input").mathquill('latex'));
			}
		}
	},
	
	setSavedNote : function(noteJq, savedClass) {
		var _ = this;
		if (isUserLoggedIn()) {
			if(_.stepsRes.isInNotebook) {
				noteJq.addClass(savedClass);
			}
		}
	},
	
	updateNotesPractice : function(jq){
		var _ = this;
	},

	addContentIfNeeded : function(jq){
		var index = jq.data("index");
		if (typeof(index) != "undefined") {
			var content = this.createSolutionBoxContent(this.stepsArray[index], this.stepsHighestBox[index]);
			jq.parent().append(content);
			mathquillifyVisible(content);
			this.makeScrollable(content);

			var _ = this;
			if (_.stepsHighestBox[index]) {
				content.find('.solution_step_title_text').each(function(){
					if (_.isPracticeIconAdded) return;
					var jq = $(this);
					var title = jq.mathquill('latex');
					if (!title) return;
					var text = ""; 
					var link = null;
					if (_.stepsRes && _.stepsRes.solutions.length > 0) {
						var solution = _.stepsRes.solutions[0];
						if(solution !== undefined && solution.practiceLink !== undefined && solution.practiceTopic !== undefined) {
							text = i18n("js.Click here to Practice") + " " + solution.practiceTopic;
							link = solution.practiceLink.substring(1);
						}
					}

					if (text) {
						console.log("Solutions", "PracticeLink-TextShow", link);
						var a = $("<a href='" + link + "' class='clickable solution-practice-link'><i class='nl-practice-sprite nl-practice-sprite-hintIcon-small'></i></a>");
						a.prepend(text);
						var div = $("<div></div>", {html: a, id: "practice-link-container"});
						jq.closest(".solution_outside_box").append(div);
						_.isPracticeIconAdded = true;
					}
				});
			}
			
			//For the rules/definitions, we remove this placeholder
			//so it is only generated once, and hidden/shown after that
			if(!jq.hasClass('solution_title_container_highest')) {
				jq.removeData("index");
				jq.removeAttr("data-index");
			}
		}
		else{
			jq.parent().find(".ul-div").show();
			jq.parent().find(".solution_step_definition_text").show();
		}
	},
	
	openHiddenPlot : function(){
		if ($('.show-hide-plot').text().indexOf(i18n('show plot')) >= 0){
			$('.show-hide-plot').text('« ' + i18n('hide plot'));
			$('#plot-image').show();
			$('#sy_graph').show();
			$("#Plot_dynaimc").removeClass('plot-closed');
			if (typeof(SYMBOLAB) != "undefined" && typeof(SYPAD) != "undefined"){
				console.log('Solutions', 'hideSteps', SYPAD.inputValue('latex'));
			}
		}
		else{
			$('.show-hide-plot').text(i18n('show plot') + ' »');
			$('#plot-image').hide();
			$('#sy_graph').hide();
			$("#Plot_dynaimc").addClass('plot-closed');
		}
	},

	combineTextEquation : function(text, equation){
		var out = "";
		if (text){
			out += text;
			out += " ";
		}
		out+=equation;
		return out;
	},
	
	createMessageBox : function(text){
		var solutionDiv = $('<div class="solution_div"></div>');
		var solutionBox = $('<div class="solution_box solution_outside_box"></div>');
		var titleContainer = $("<div class='solution_title_container_highest'> </div>");
		titleContainer.append(createMathquillDiv("solution_step_title", text));
		solutionBox.append(titleContainer);
		solutionDiv.append(solutionBox);
		return solutionDiv;
	},
	
	isShowMoreImage : function (obj){
		return $(obj).find(".showStepsButton").size() > 0;
	},
	
	changeToShowMore : function (obj){
		var button = $(obj).find(".hideStepsButton");
		button.removeClass("hideStepsButton");
		button.addClass("showStepsButton");
		
		var text = $(obj).find(".hideButtonText");
		text.removeClass("hideButtonText");
		text.addClass("showButtonText");
		
		var textContent = text.html();
		if (textContent != null){
			textContent = textContent.replace(i18n('hide'), i18n('show'));
			text.html(textContent);
		}
	},

	changeToShowLess : function (obj){
		var button = $(obj).find(".showStepsButton");
		button.removeClass("showStepsButton");
		button.addClass("hideStepsButton");
		
		var text = $(obj).find(".showButtonText");
		text.removeClass("showButtonText");
		text.addClass("hideButtonText");
		
		var textContent = text.html();
		if (textContent != null){
			textContent = textContent.replace( i18n('show'),  i18n('hide'));
			text.html(textContent);
		}
	},
	
	showHideRule : function(obj){
		var jq = $(obj);
		if (jq.find('.show-hide-steps').size() > 0){
			return;
		}
		var next = $(obj).next();
		if ($(obj).find(".locked-step").size() > 0){
			showUpgradeReason("LockedStep");
		}
		else if (this.isShowMoreImage(obj)){
			this.addContentIfNeeded(jq);
			this.changeToShowLess(obj);
		}
		else{
			next.hide();
			this.changeToShowMore(obj)
		}
	},

	resetSteps : function(){
		$('#show-hide-steps-div').hide();
		$('#steps-container').hide();
		$('.show-hide-steps').text(i18n('show steps') + ' »');
		$('#steps-container').find('.steps ul').empty();
		$('#steps-container h2').text("");
	},

	twoLineTitle : function(jq) {

        jq.find(".splitAnswerLine").each(function() {
            var element = $(this);

            var parent = element.parent();


            var height = parent.find(".splitAnswerFirst").height();
            var colon = parent.find(".splitAnswerLineColon")
            colon
                .height(height + 1)
                .css({"line-height": "" + (height + 1) + "px"});
            if(colon.offset().left < 50) {
                colon.hide();
            }

            if(element.offset().left < 50) {
                element.prev().css('opacity', '0.0'); //hide extra colon element

                var solutionText = i18n("solution");
                if(element.find("span.selectable").text().indexOf(solutionText) > -1) {
                    //redundant to add "Answer" when "Solution" appears
					console.log("YESSSS")
                    return;
                }

                var answerWordSpan = $("<span></span>").text("\\mathrm{" + i18n("js.Answer") + "}:\\quad");

                var scrollContent = element.find(".scrollContent");
                if(scrollContent.length > 0) {
                    scrollContent.prepend(answerWordSpan);
                } else {
                    element.prepend(answerWordSpan);
                    element.find(".solution_step_title_text").css({"display": "inline"});
                }
                answerWordSpan.mathquill();
            }

            //after all has been settled, set height of last element

            var answerHeight = element.height();
            if(answerHeight > height) {
                parent.find(".splitAnswerFirst, .splitAnswerLineColon")
                    .height(answerHeight + 1)
                    .css({"line-height": "" + (answerHeight + 1) + "px"});
            } else {
                element
                    .height(height + 1)
                    .css({"line-height": "" + (height + 1) + "px"});
            }
        });
	},

	makeScrollable : function(jq){
		var steps = this;

		jq.find(".solution_step_title, .solution_step_result, .solution_step_explanation, .solution_step_definition_text , .solution_scrollable").not(".splitAnswerLineColon").each(function(){
		    var parent = $(this);
			if(parent.is(":visible") && !parent.hasClass("syscrollable")){
				var embedded = parent.find(".mathquill-embedded-latex");
				if(embedded.length == 1){

			        if(parent.hasClass("splitAnswerFirst")) {
			            steps.createScrollIgnoreMathrm(this);
			        } else {
					    steps.createScroll(this);
					}
				}
				else{
					$(this).find(".multiline").each(function() {
						if(parent.hasClass("splitAnswerFirst")) {
                            steps.createScrollIgnoreMathrm(this);
                        } else {
                            steps.createScroll(this);
                        }
					});
				}
	    	}
		});
	},

	createScrollIgnoreMathrm : function(element) {
        var _ = this;
        if ($(element).width() == 0){
            return;
        }

        var totalWidth = getActualWidth(element, true);
        if (totalWidth < $(element).parent().width() + 1){
            return;
        }

        createScrollForce(element, totalWidth);

        $(element).css({"float": "none"});
	},
	
	createScroll : function(element){
		var _ = this;
		if ($(element).width() == 0){
			return;
		}

		//Mathquill can wrap lines nicely but only if they are \mathrm.

		var answerWidth = 70;

        	var totalWidth = getActualWidth(element, true) + answerWidth;
        	var nonMathrmWidth = getActualWidth(element, false);
        	if( $(element).hasClass("solution_scrollable")){
        	    if (nonMathrmWidth < $(element).parent().width()){
                    return;
                }
        	}else{
            	if (nonMathrmWidth < $(element).parent().width() + answerWidth){
        	    	return;
        	    }
        	}

        	createScrollForce(element, totalWidth);

		$(element).css({"float": "none"});
	}
}


Application.prototype.getClassString = function(res){
	for (var i =0; i< res.debugInfo.length; i++){
		var x= res.debugInfo[i];
		if (x.indexOf("StepObject=") == 0){
			return x;
		}
	}
	
	return null;
}

