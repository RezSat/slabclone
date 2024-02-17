function SyPlotSettingsInfo() {
	this.isDrawFunctionIntercepts = { draw : false, possible: false};
	this.isDrawAxisIntercepts= { draw : false, possible: true};
	this.isDrawExtreme = { draw : false, possible: true};
	this.isDrawAsypmtotes = { draw : false, possible: false};
	
	this.xLabel = "";
	this.x1 = 0;
	this.x2 = 0;
	
	this.yLabel = "";
	this.y1 = 0;
	this.y2 = 0;
};


function SyPlotSettingsHolder() {
	this.defaultSettings = new SyPlotSettingsInfo(); // settings received from BE
	this.userSettings;    // settings set by user when changing in settings box
	this.tempSettings;    // settings affected by zoom or pan
	
	//callbacks for mobile
	this.hideHomeCallback = null;
	this.showHomeCallback = null;
	this.updateSettingsCallback = null;
	
	this.logActivityType = "GraphingCalculator";
};

SyPlotSettingsHolder.prototype = {

		cur : function(){
			if (this.tempSettings) return this.tempSettings;
			else if (this.userSettings) return this.userSettings;
			else return this.defaultSettings;
		},
		
		hasUserSettings : function() {
			return this.userSettings != null;
		},
		
		createUserSettings : function() {
			var _ = this;
			
			//copy current settings (including pan and zoom)
			_.userSettings = jQuery.extend(true, {}, _.cur());
			
			//make user settings dominant now
			_.tempSettings = null;
			
			_.updateSettingsFromHTML();
			
			_.notifyUpdatedUserSettings(false);
		},

		init : function(options, syPlot, cleanAll) {
			var _ = this;
			_.syPlot = syPlot;

			if (cleanAll) {
				_.userSettings = null;
				_.tempSettings = null;
			}
			_.defaultSettings = new SyPlotSettingsInfo();

			$("#canvasZoom").remove();
			_.canvasZoom = $("<div id='canvasZoom' class='no-select'></div>").insertAfter(syPlot.graphJQ);
			

			if (options['showPoints']){
				sy_graphSettings.defaultSettings.isDrawAxisIntercepts.draw = true;
				sy_graphSettings.defaultSettings.isDrawExtreme.draw = true;
			}

			if (options['showSettings']){

				var settingsBox = $("#settingsBoxTemplate").clone();
                settingsBox.find("*[id]").each(function(i, item){ $(item).attr('id', $(item).attr('id').replace("_", "")); });
                _.canvasZoom.append(settingsBox.html());

				this.settingsContainerJQ = $("#settingsContainer");
				this.settingsJQ = $("#canvasSettings").parent();
				this.settingsJQ.unbind('click').click(function() {
					_.toggleSettings();
				});
			}

			if (options['showZoom']){
				this.canvasZoom.append(
						'<div><img id="zoomIn" src="/public/img/plus.png"></div>'+
						'<div><img id="zoomOut" src="/public/img/minus.png"></div>'+
						'<div><img id="graphReset" src="/public/images/home.png"></div>'
				);
			}

			_.defaultSettings.isDrawAsypmtotes.draw = false;
			_.defaultSettings.isDrawAsypmtotes.possible = false;
			if (syPlot.plotInfo && syPlot.plotInfo.funcsToDraw) {
				for(var i in syPlot.plotInfo.funcsToDraw.funcs) {
					if (syPlot.plotInfo.funcsToDraw.funcs[i].attributes.isAsymptote) {
				        _.defaultSettings.isDrawAsypmtotes.draw = true;
				        _.defaultSettings.isDrawAsypmtotes.possible = true;
					}
				}
			}
			
			if (_.userSettings) _.userSettings.isDrawAsypmtotes.possible = _.defaultSettings.isDrawAsypmtotes.possible;
    		if (_.tempSettings) _.tempSettings.isDrawAsypmtotes.possible = _.defaultSettings.isDrawAsypmtotes.possible;

			var isDrawFunctionInterceptsPossible = _.getNonAsymptoteFunctions() > 1;
			_.defaultSettings.isDrawFunctionIntercepts.possible = isDrawFunctionInterceptsPossible;
    		if (_.userSettings) _.userSettings.isDrawFunctionIntercepts.possible = isDrawFunctionInterceptsPossible;
    		if (_.tempSettings) _.tempSettings.isDrawFunctionIntercepts.possible = isDrawFunctionInterceptsPossible;


			$(".rangeSelect").unbind('keyup').keyup(function () {
				_.createUserSettings();
	            _.syPlot.draw(true);
	            
	            if($(this).attr("id").includes("x")) {
	            	symbolab_log(_.logActivityType, "Settings", "XRange");
	            } else {
	            	symbolab_log(_.logActivityType, "Settings", "YRange");
	            }
			});

			$("#xLabel, #yLabel").unbind('keyup').keyup(function () {
				_.createUserSettings();
	            _.syPlot.draw(true);
	            
	            if($(this).attr("id").includes("x")) {
	            	symbolab_log(_.logActivityType, "Settings", "XLabel");
	            } else {
	            	symbolab_log(_.logActivityType, "Settings", "YLabel");
	            }
	        });
			
	        $("#asymCheck").unbind('click').click(function () {	
	        	_.createUserSettings();
	        	_.syPlot.draw(true);
	        	
	        	_.logChecked(this, "Asymptotes");
	        	_.notifyUpdatedUserSettings(false);
	        });
	        
	        $("#extCheck").unbind('click').click(function () {
	        	_.createUserSettings();
	        	_.syPlot.draw(true);
	        	
	        	_.logChecked(this, "Extremes");
	        	_.notifyUpdatedUserSettings(false);
	        });
	        
	        $("#axisCheck").unbind('click').click(function () {
	        	_.createUserSettings();
	        	_.syPlot.draw(true);
	        	
	        	_.logChecked(this, "AxisIntercepts");
	        	_.notifyUpdatedUserSettings(false);
	        });
	        
	        $("#funcCheck").unbind('click').click(function () {
	        	_.createUserSettings();
	        	_.syPlot.draw(true);
	        	
	        	_.logChecked(this, "FunctionIntercepts");
	        	_.notifyUpdatedUserSettings(false);
	        });

	        $("#resetSettingsBtn").unbind('click').click(function () {	        	
	        	_.tempSettings =  null;
	        	_.userSettings =  null;
	            
	        	_.hideHomeButton();
	        	
	        	symbolab_log(_.logActivityType, "Settings", "Reset");
	        	
				$("#settingsContainer").fadeOut("fast");
	        	_.syPlot.draw(true);
	        	
	        	_.notifyUpdatedUserSettings(false);
				symbolab_log("GraphingCalculator", "Settings", "Reset");
	        });

			$("#zoomIn").parent().unbind('click').click(function() {
				_.syPlot.zoomIn();
				_.syPlot.donePanning();
				// symbolab_log("GraphingCalculator", "Zoom", "In");
			});
			
			$("#zoomOut").parent().unbind('click').click(function() {
				_.syPlot.zoomOut();
				_.syPlot.donePanning();
				// symbolab_log("GraphingCalculator", "Zoom", "Out");
			});

			// mouse wheel zoom (only in GC)
			if (window.location.href.indexOf("/graphing-calculator") >= 0){	
				_.syPlot.graphJQ.unbind("mousewheel").mousewheel(function(event, delta) {
					
					clearTimeout($.data(this, 'timer'));
					$.data(this, 'timer', setTimeout(function() {
					     _.syPlot.donePanning();
					  }, 50));
					
					if (delta > 0) {
						_.syPlot.zoomIn(event); 
					} else {
						_.syPlot.zoomOut(event); 
					}
				});
			}			

			$("#graphReset").parent().unbind('click').click(function() {
				_.homeClicked();
                symbolab_log("GraphingCalculator", "Zoom", "Home");
			});
			
			_.notifyUpdatedUserSettings(true);
		},
		
		homeClicked : function() {
			var _ = this;
			
			_.tempSettings = null;
			_.hideHomeButton();
			_.closeSettings();
			_.syPlot.draw(true);
			
			symbolab_log(_.logActivityType, "Settings", "Home");
		},
		
		hideHomeButton : function() {
			var _ = this;
			
			$("#graphReset").fadeOut("fast");
			
			if(_.hideHomeCallback) {
				_.hideHomeCallback();
			}
		},
		
		showHomeButton : function() {
			var _ = this;
			
			$("#graphReset").fadeIn("fast");
			
			if(_.showHomeCallback) {
				_.showHomeCallback();
			}
		},
		
		settingsOpen: function() {
			var container = $("#settingsContainer");
			return container.is(":visible")
		},

		toggleSettings : function() {
			var _ = this;
			var container = $("#settingsContainer");
			
			if(_.settingsOpen()) {
				symbolab_log("GraphingCalculator", "Settings", "Close");
			} else {
				this.updateHTMLFromSettings();
				symbolab_log("GraphingCalculator", "Settings", "Open");
			}
			
			container.fadeToggle("fast");
		},
		
		closeSettings : function() {
			var _ = this;
			
			var container = $("#settingsContainer");
			
			if(_.settingsOpen()) {
				container.fadeOut("fast");
				symbolab_log(_.logActivityType, "Settings", "Close");
			}
		},
		
		logChecked : function(element, checkname) {
			var _ = this;
			
			if($(element).find('input').is(':checked')) {
        		symbolab_log(_.logActivityType, checkname, "On");
        	} else {
        		symbolab_log(_.logActivityType, checkname, "Off");
        	}
		},
		
		updateCoordinates : function() {
			// create new copy of settings 'tempSettings' and point to it
			this.tempSettings = jQuery.extend(true, {}, this.cur());
			
			this.cur().x1 = this.syPlot.currCoord.x1.toFixed(2);
			this.cur().x2 = this.syPlot.currCoord.x2.toFixed(2);
			this.cur().y1 = this.syPlot.currCoord.y1.toFixed(2);
			this.cur().y2 = this.syPlot.currCoord.y2.toFixed(2);
		},
		
		updateSettingsFromHTML: function() {
			this.cur().x1 = $('#x1').val();		
			this.cur().x2 = $('#x2').val();		
			this.cur().y1 = $('#y1').val();		
			this.cur().y2 = $('#y2').val();	
			this.cur().xLabel = $('#xLabel').val();	
			this.cur().yLabel = $('#yLabel').val();
			this.cur().isDrawAsypmtotes.draw = $("#asymCheck input").is(":checked");
			this.cur().isDrawExtreme.draw = $("#extCheck input").is(":checked");
			this.cur().isDrawAxisIntercepts.draw = $("#axisCheck input").is(":checked");
			this.cur().isDrawFunctionIntercepts.draw = $("#funcCheck input").is(":checked");
			
			if(this.tempSettings == null) {
				//when we save to user settings, this becomes home
				this.hideHomeButton();
			}
		},
		
		notifyUpdatedUserSettings : function(isInitial) {
			//TODO: don't save temp settings
			if(this.updateSettingsCallback) {
				this.updateSettingsCallback(isInitial);
			}
		},
	
		adjustCheck : function (info, id) {
			if (info.possible == false){
				$(id).hide();
			}
			else{
				$(id).show();
				$(id).find("input").attr("checked", info.draw);
				$(id+" input").removeAttr("disabled");
				$(id).css('color', '');
			}
		},
		
		updateHTMLFromSettings : function () {
	    	var _ = this;
	    	
	    	$('#x1').val(_.cur().x1);
	    	$('#x2').val(_.cur().x2);
	    	$('#y1').val(_.cur().y1);
	    	$('#y2').val(_.cur().y2);
	
	    	$('#xLabel').val(_.cur().xLabel);
	    	$('#yLabel').val(_.cur().yLabel);
	    	
	    	_.adjustCheck(_.cur().isDrawFunctionIntercepts, '#funcCheck');
	    	_.adjustCheck(_.cur().isDrawAxisIntercepts, '#axisCheck');
	    	_.adjustCheck(_.cur().isDrawExtreme, '#extCheck');
	    	_.adjustCheck(_.cur().isDrawAsypmtotes, '#asymCheck');
	    	
	    	// remove "graph settings" text if needed
			$('#graphSettingSections hr, #graphSettingSections label').show();
			if (_.cur().isDrawFunctionIntercepts.possible == false &&  _.cur().isDrawAxisIntercepts.possible == false && 
	    			_.cur().isDrawExtreme.possible == false && _.cur().isDrawAsypmtotes.possible == false) {
	    		$('#graphSettingSections .settingsDivider, #graphSettingSections label').hide();
	    	}
	    },
	    isMultipleFunctions : function () {
	    	var _ = this;
	    	return  _.countsValidFunctions() > 1;
        },
         countsValidFunctions : function () {
            var _ = this;

            	var cnt = 0;
            	var str;
            	if (_.syPlot.plotInfo && _.syPlot.plotInfo.funcsToDraw && _.syPlot.plotInfo.funcsToDraw.funcs){
            		for(var i = 0; i < _.syPlot.plotInfo.funcsToDraw.funcs.length; i++){
            			if (_.syPlot.plotInfo.funcsToDraw.funcs[i].attributes.isAsymptote) continue;
            			if(str){
            			    if (_.syPlot.plotInfo.funcsToDraw.funcs[i].displayFormula === str){
            			        continue;
            			    }
            			}else{
            			    str = _.syPlot.plotInfo.funcsToDraw.funcs[i].displayFormula;
            			}
            			cnt++;
            		}
            	}

            	return cnt;
        },
		getNonAsymptoteFunctions: function() {
			var _ = this;

			var cnt = 0;
			if (_.syPlot.plotInfo && _.syPlot.plotInfo.funcsToDraw && _.syPlot.plotInfo.funcsToDraw.funcs){
				for(var i = 0; i < _.syPlot.plotInfo.funcsToDraw.funcs.length; i++){
					if (_.syPlot.plotInfo.funcsToDraw.funcs[i].attributes.isAsymptote) continue;
					cnt++;
				}
			}

			return cnt;
		},
		
		loadSettingsFromJson : function(res) {
	    	var _ = this;
	    	_.tempSettings = null;
	    	_.userSettings = jQuery.extend(true, {}, _.defaultSettings);

	    	// adjust settings
	    	_.cur().xLabel = res.graph.xAxis.label;
	    	_.cur().x1 = res.graph.xAxis.min;
	    	_.cur().x2 = res.graph.xAxis.max;
	    	
	    	_.cur().yLabel = res.graph.yAxis.label;
	    	_.cur().y1 = res.graph.yAxis.min;
	    	_.cur().y2 = res.graph.yAxis.max;
	    			
			res.graph.graphSettings.forEach(function(item, index){
				//Accept only "checked" as a checked option when loading from json
				$('#'+item.fst+' input').attr('checked', item.snd == "checked" ? "checked" : false);
			});

			//Save options as booleans in internal memory
			_.cur().isDrawAsypmtotes.draw = $("#asymCheck input").is(":checked");
			_.cur().isDrawExtreme.draw = $("#extCheck input").is(":checked");
			_.cur().isDrawAxisIntercepts.draw = $("#axisCheck input").is(":checked");
			_.cur().isDrawFunctionIntercepts.draw = $("#funcCheck input").is(":checked");
			
			if(_.syPlot) {
				_.syPlot.draw(true);
			}
		},
		
		outputGraphSettings : function() {
			var _ = this;
			
			//Backwards compatibility: retain "checked" as selected option indicator
			var settings = [
					{fst:"asymCheck", snd:_.cur().isDrawAsypmtotes.draw ? "checked" : "false"},
					{fst:"extCheck", snd:_.cur().isDrawExtreme.draw ? "checked" : "false"},
					{fst:"axisCheck", snd:_.cur().isDrawAxisIntercepts.draw ? "checked" : "false"},
					{fst:"funcCheck", snd:_.cur().isDrawFunctionIntercepts.draw ? "checked" : "false"}
				];
			
			return settings;
		}
};

var sy_graphSettings = new SyPlotSettingsHolder();
