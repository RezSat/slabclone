
function isInteger(num) {
  return (num ^ 0) === num;
}


function calcEps(){
	var temp1, temp2, mchEps
	temp1 = 1.0
	do {
		mchEps = temp1
		temp1 /= 2
		temp2 = 1.0 + temp1
	}
	while (temp2 > 1.0)
	return mchEps;
}


Math.log10 = function(arg) {
	return Math.log(arg)/Math.log(10);
}

SyCalc = new SyCalc;


function SyPlot (graphjQuery, plotInfo2, options){
	this.graphJQ = $(graphjQuery);
	this.graph = this.graphJQ.get(0);
	this.width = this.graphJQ.width();
	this.plotInfo = plotInfo2;
	this.height = this.graphJQ.height();
	this.charHeight = 8;
	this.startDrag = {x : 0, y : 0};
	this.mouseButton = 0;
	this.canvasX = this.graph.offsetLeft;
	this.canvasY = this.graph.offsetTop;
	this.quality = 2;
	this.variable = this.plotInfo ? this.plotInfo.variable : 'x';
	this.zoomFactor = 0.2;
	this.allFuncVals = [];//All Y-values of functions as evaluated on all xVals
	this.funcsXpos = [];//All xpos values drawn in screen
	this.funcsYpos = [];//All ypos values drawn in screen
	this.funcXvals = [];
	this.drawFuncs = [];//All functions drawn on screen
	this.balloonShowed = false;
	this.tablePoints = [];
	this.tablePointsText = [];
	this.pointsDraw = [];
	this.pointsDrawAttr = [];
	this.pointsDrawText = [];
	this.functionsInfo = [];
	this.eps = calcEps();
	
	this.logActivityType = "GraphingCalculator";
	
	var _ = this;
	
	this.options = $.extend({}, {
		showSettings: false,
		showZoom: false,
		showBalloons: false,
		lineWidth: 1,
		pixelRatio: 1,
		proximity: 10,
		mouseEvents: true,
		yBalloonOffset: 0
		}, options);

	sy_graphSettings.init(this.options, this);

	//Rounds floating points
	this.float_fix = function(num) {
		return Math.round(num * 10000000  + 0.00000005)  / 10000000
	}
	
	this.getProportionalYValue = function(xValue){
		var ratio = xValue / this.width;
		return this.height * ratio;
	}
	

	this.init = function(width, height, pixelRatio) {
		
		this.allFuncs = {};
		
		var grapher = this;
		if (this.graph.getContext){
			
			this.ctx = this.graph.getContext('2d');
			this.ctx.lineWidth = 2;
			
			this.adjustedWidth = width * pixelRatio;
			this.adjustedHeight = height * pixelRatio;
			
			this.graphJQ.attr("height", this.adjustedHeight);
			this.graphJQ.attr("width", this.adjustedWidth);
			
			this.ctx.scale(pixelRatio, pixelRatio);
			
			var xmin = -10, xmax = 10, ymin = -10, ymax = 10;
			var bb = this.plotInfo ? this.plotInfo.localBoundingBox : undefined;
			if (bb) {
				xmin = Math.max(bb.xMin, -1000000);
				xmax = Math.min(bb.xMax, 1000000);
				ymin = Math.max(bb.yMin, -1000000);
				ymax = Math.min(bb.yMax, 1000000);
			}
			if (this.plotInfo && this.plotInfo.aspectRatio != null) {
				var graphRatio = width / height / this.plotInfo.aspectRatio;

				var boxwh = Math.abs(xmax - xmin)/2;
				var boxhh = Math.abs(ymax - ymin)/2;
				var boxRatio = boxwh / boxhh;
				if (graphRatio < boxRatio) boxhh = boxwh / graphRatio;
				else boxwh = boxhh * graphRatio;
				var centerx = 0;
				if (graphRatio < boxRatio || xmin + boxwh/2 > 0 || xmax - boxwh/2 < 0) {
					centerx = (xmax + xmin)/2;
				}
				var centery = 0;
				if (graphRatio >= boxRatio || ymin + boxhh/2 > 0 || ymax - boxhh/2 < 0) {
					centery = (ymax + ymin)/2;
				}
				xmin = centerx - boxwh;
				xmax = centerx + boxwh;
				ymin = centery - boxhh;
				ymax = centery + boxhh;
			}

			sy_graphSettings.defaultSettings.x1 = xmin.toFixed(2);
			sy_graphSettings.defaultSettings.x2 = xmax.toFixed(2);
			sy_graphSettings.defaultSettings.y1 = ymin.toFixed(2);
			sy_graphSettings.defaultSettings.y2 = ymax.toFixed(2);


			this.currCoord = { x1 : xmin, x2 : xmax, y1 : ymin, y2 : ymax };
 
			this.startCoord = this.copyCoord(this.currCoord);
					
			var self = this;
			
			if(this.options['mouseEvents']) {
				// on mouse move
				this.graphJQ.unbind("mousemove").mousemove(function(event) {
					
					// if we are dragging to dot
					if (self.mouseButton == 2) {
						
						var yVals = self.funcsYpos[self.currentFunctionIndex];					
						var xVals = self.funcsXpos[self.currentFunctionIndex];
						var xCanvas = event.pageX - $("canvas").offset().left;
						var yCanvas = event.pageY - $("canvas").offset().top;
						var closestCoords = self.findClosestPoint(xCanvas, yCanvas, xVals, yVals);
	
						var x = self.getXvalue(closestCoords.x).toFixed(2);
						var y = self.getYvalue(closestCoords.y).toFixed(2);
	
						self.clearBalloons();
						self.showBalloon(self.functionsInfo[self.currentFunctionIndex], xCanvas, yCanvas);
						$(".plotBalloon span").eq(0).append("<p class='ballon-cord'>(" + x + "," + y + ")</p>")
	
						// return original canvas drawing
					    self.ctx.drawImage(self.canvasImg, 0, 0);
						
						// draw new dot
						self.ctx.beginPath();
						self.ctx.fillStyle = self.plotInfo.funcsToDraw.funcs[self.currentFunctionIndex].attributes.color;
						self.ctx.arc(closestCoords.x, closestCoords.y, 4, 0, Math.PI*2, false);
						self.ctx.fill();
	
						return;
					}
					
					if (self.mouseButton == 1) {
						$("#sy_graph").css("cursor", "move");
						
						if (window.location.href.indexOf('/graphing-calculator') >= 0){
							self.canvasX = $("canvas").offset().left;
							self.canvasY = $("canvas").offset().top;
						}
						else{
							self.canvasX = self.graph.offsetLeft;
							self.canvasY = self.graph.offsetTop;
						}
						var x = event.pageX - self.canvasX;
						var y = event.pageY - self.canvasY;
						
						self.movePlot(x - self.startDrag.x, y - self.startDrag.y);
						
						self.startDrag.x = x;
						self.startDrag.y = y;
						return;
					}
					
					if (window.location.href.indexOf('/graphing-calculator') >= 0){
						self.canvasX = $("canvas").offset().left;
						self.canvasY = $("canvas").offset().top;
						self.checkMove(event.pageX - self.canvasX, event.pageY - self.canvasY);
					}
					else{
						self.canvasX = self.graph.offsetLeft;
						self.canvasY = self.graph.offsetTop;
						self.checkMove(event.pageX - self.canvasX, event.pageY - self.canvasY);
					}
					
				});
				
				// if we are dragging to dot out of canvas area
				this.graphJQ.unbind("mouseleave").mouseleave(function() {				
					if (self.mouseButton == 2) {
						self.clearBalloons();					
					    self.ctx.drawImage(self.canvasImg, 0, 0);
					}
					self.mouseButton = 0;
				});
			
				//on mouse down
				this.graphJQ.unbind("mousedown").mousedown(function(event) {
					
					self.mouseDown(event);				
					if (!self.plotInfo || !self.plotInfo.funcsToDraw || !self.plotInfo.funcsToDraw.funcs) {
						self.mouseButton = 1;
						return;
					}
					
					var xCanvas = event.pageX - $("canvas").offset().left;
					var yCanvas = event.pageY - $("canvas").offset().top;	
					var pointCoords = null, coords = null, specialPointClick = false;
	
					// mouse is over pointDraw (externum / inserscetion)
					for(var i in self.pointsDraw) {
	
						coords = self.getCoord(self.pointsDraw[i].x, self.pointsDraw[i].y);
						if (self.isPointInProximity(xCanvas, yCanvas, coords.x, coords.y, 5)){
													
							// create function search order
							var indexArr = [];
							if (self.currentFunctionIndex != undefined) indexArr.push(self.currentFunctionIndex);
							for (var i = 0; i < self.funcsYpos.length; i++) indexArr.push(i);
												
							// find which function has this point
							var flag = true;
							for (var i = 0; i < indexArr.length && flag; i++) {
								var yVals = self.funcsYpos[indexArr[i]];					
								var xVals = self.funcsXpos[indexArr[i]];
								for (var ind = 0; ind < xVals.length; ind++){
									if (self.isPointInProximity(xCanvas, yCanvas, xVals[ind], yVals[ind], 10)){
										self.currentFunctionIndex = indexArr[i];
										flag = false;
										break;
									}
								}
							}
							specialPointClick = true;
							break;
						}
					}
	
	
					// create function search order
					var indexArr = [];
					if (self.currentFunctionIndex != undefined) indexArr.push(self.currentFunctionIndex);
				    for (var k in self.funcsYpos) {
				        if (self.funcsYpos.hasOwnProperty(k)) indexArr.push(k);
				    }
	
					// find the closest point on a graph
					var flag = true;
					for (var i = 0; i < indexArr.length && !specialPointClick && flag; i++) {
						var yVals = self.funcsYpos[indexArr[i]];	
						var xVals = self.funcsXpos[indexArr[i]];
						for (var ind = 0; ind < xVals.length; ind++){
							if (self.isPointInProximity(xCanvas, yCanvas, xVals[ind], yVals[ind], 10)){
	
								coords = self.findClosestPoint(xCanvas, yCanvas, xVals, yVals);
								self.currentFunctionIndex = indexArr[i];
								
								pointCoords = {
									x: self.getXvalue(coords.x).toFixed(2),
									y: self.getYvalue(coords.y).toFixed(2)									
								}
								
								flag = false;
								break;
							}
						}
					}
					
					if (specialPointClick || pointCoords) {
						self.mouseButton = 2;
	
						// save canvas of before draw
						self.canvasImg = new Image;
						self.canvasImg.src = self.graphJQ[0].toDataURL();
						
						// draw and update balloon
						self.ctx.beginPath();
						self.ctx.fillStyle = self.plotInfo.funcsToDraw.funcs[self.currentFunctionIndex].attributes.color;
						self.ctx.arc(coords.x, coords.y, 4, 0, Math.PI*2, false);
						self.ctx.fill();						
	
						if (!specialPointClick) {
							self.clearBalloons();
							self.showBalloon(self.functionsInfo[self.currentFunctionIndex], xCanvas, yCanvas);
							$(".plotBalloon span").eq(0).append("<p class='ballon-cord'>(" + pointCoords.x + "," + pointCoords.y + ")</p>");
						}					
					} else {
						self.mouseButton = 1;
					}
					
				});
	
				// event listener on body element
				$('#graph').unbind("mouseup").mouseup(function(event) {				
					if (self.mouseButton == 2) {
						// return original canvas drawing
					    self.ctx.drawImage(self.canvasImg, 0, 0);
	                    $('.ballon-cord').remove();
					}
					self.mouseUp(event);
				});
				
				// on mouse up
				this.graphJQ.unbind("mouseup").mouseup(function(event) {
					if (self.mouseButton == 2) {
						// return original canvas drawing
					    self.ctx.drawImage(self.canvasImg, 0, 0);
	                    $('.ballon-cord').remove();
	
					    // redraw hover balloon
						self.canvasX = $("canvas").offset().left;
						self.canvasY = $("canvas").offset().top;
						self.checkMove(event.pageX - self.canvasX +1, event.pageY - self.canvasY +1);
					}
					
					self.mouseUp(event);
				});
			}

		}
		else {
			alert(i18n("js.Sorry, your browser is not supported."));
		}
	}
	
	this.mobileTouchPlot = function(x,y) {
		this.checkMove(x, y);
	}
	
	this.mobileMovePlot = function(dx, dy) {
		this.movePlot(dx, dy);
	}
	
	this.movePlot = function(dx, dy) {
		var _ = this;
		
		var scale = _.getScale();
		_.currCoord.x1 = _.currCoord.x1 - (dx / scale.x);
		_.currCoord.x2 = _.currCoord.x2 - (dx / scale.x);
		_.currCoord.y1 = _.currCoord.y1 + (dy / scale.y);
		_.currCoord.y2 = _.currCoord.y2 + (dy / scale.y);
		
		sy_graphSettings.updateCoordinates();
		
        _.checkResetNeeded(true);
		_.draw(false);
	}
	
	this.donePanning = function() {
		this.draw(true);
	}

	this.arbRound = function(value, roundTo) {
		return Math.round(value/roundTo)*roundTo;
	}

	this.arbFloor = function(value, roundTo) {
		return Math.floor(value/roundTo)*roundTo;
	}

	this.copyCoord = function(coord) {
		return {x1 : coord.x1, x2 : coord.x2, y1 : coord.y1, y2 : coord.y2};
	}

	this.clearScreen = function() {
		this.ctx.fillStyle = "rgb(255,255,255)";
		this.ctx.fillRect (0, 0, this.width, this.height);
	}

	//Draws a horizontal line x
	this.drawVerticalLine = function(x, attr, funcIndex) {
		this.setCtxStyle(attr);
		this.ctx.lineWidth = attr.isAsymptote == true ? 1 : this.options['lineWidth'];
		this.ctx.beginPath();
		var start = this.getCoord(x, this.currCoord.y2);
		var end = this.getCoord(x, this.currCoord.y1);
		this.ctx.moveTo(start.x, start.y);
		this.ctx.lineTo(end.x, end.y);
		this.ctx.stroke();
		this.defaultCtxStyle();//return dash to no-dash value
	}

	//Draws line segment of type LineToPlot
	this.drawLineSegment = function(seg) {
		this.setCtxStyle(seg.attributes);
		this.ctx.beginPath();
		var start = this.getCoord(this.evalForm(seg.p1x), this.evalForm(seg.p1y));
		var end = this.getCoord(this.evalForm(seg.p2x), this.evalForm(seg.p2y));
		this.ctx.moveTo(start.x, start.y);
		this.ctx.lineTo(end.x, end.y);
		this.ctx.stroke();
		this.defaultCtxStyle();
	}

	this.adjustAttr = function(attr){
		if ("PURPLE" === attr.color) {
			attr.color = "#006666";
		}
		if ("PURPLE" === attr.borderColor) {
			attr.borderColor = "#006666";
		}
	}
	
	//attr is of the type FunctionPlotAttributes
	this.setCtxStyle = function(attr){
		this.adjustAttr(attr)
		this.ctx.strokeStyle = attr.color;
		if (attr.lineType == "DASH"){
			this.ctx.setLineDash([5,10]);
			this.ctx.lineWidth=1;
		}
		else if (attr.lineType == "DOT"){
			this.ctx.setLineDash([2,4]);
			this.ctx.lineWidth=2;
		}
		else if (attr.lineType == "BOLD"){
			this.ctx.lineWidth=4;
		}
		else if (attr.lineType == "NORMAL"){
			this.ctx.lineWidth=1;
		}
	}

	//return context style to default
	this.defaultCtxStyle = function(){
		this.ctx.setLineDash([]);
		this.ctx.lineWidth=1;
		this.ctx.strokeStyle = "#000000";
	}

	this.drawPoint = function(xval, yval, color, borderColor) {
		var coord = this.getCoord(xval, yval);
		this.ctx.beginPath();
		this.ctx.fillStyle = color;
		if (borderColor) {
			this.ctx.strokeStyle = borderColor;
			this.ctx.arc(coord.x, coord.y, 3.3, 0, Math.PI*2, false);
			this.ctx.fill();
			this.ctx.stroke();
		} else {
			this.ctx.arc(coord.x, coord.y, 3, 0, Math.PI*2, false);
			this.ctx.fill();
		}
	}
	
	this.drawGrid = function() {
		this.clearScreen();
		
		var x1 = this.currCoord.x1 = parseFloat(sy_graphSettings.cur().x1);
		var x2 = this.currCoord.x2 = parseFloat(sy_graphSettings.cur().x2);
		var y1 = this.currCoord.y1 = parseFloat(sy_graphSettings.cur().y1);
		var y2 = this.currCoord.y2 = parseFloat(sy_graphSettings.cur().y2);

		var xrange = x2 - x1;
		var yrange = y2 - y1;
		
		//Compute how many grid lines to show
		var maxgridlinesMajor = {
			x: 0.015 * this.width,
			y: 0.015 * this.height
		};
		//Calculate the numeric value of each pixel (scale of the graph)
		var xscale = xrange/this.width;
		var yscale = yrange/this.height;

		//Calculate the scale of the gridlines
		for(i = 0.000000000001, c = 0; (xrange/i > maxgridlinesMajor.x -1) && (i<Infinity); c++) {
			if(c % 3 == 1) i *= 2.5;	//alternating between 2, 5 and 10
			else i *= 2;
		}
		var gridscaleMajorX = this.float_fix(i);
		var gridscaleMinorX = this.float_fix(i / 5);

		//do the same for the y-axis
		for(i = 0.000000000001, c = 0; yrange/i > maxgridlinesMajor.y -1; c++) {
			if(c % 3 == 1) i *= 2.5;
			else i *= 2;
		}
		var gridscaleMajorY = this.float_fix(i);
		var gridscaleMinorY = this.float_fix(i / 5);

		this.ctx.font = "10pt 'open sans'";	//set the font
		this.ctx.textAlign = "center";

		var xaxis = yaxis = null;

		//currx is the current gridline being drawn, as a numerical value (not a pixel value)
		var currx = this.arbFloor(x1, gridscaleMajorX);	//set it to before the lowest x-value on the screen
		var curry = this.arbFloor(y1, gridscaleMajorY);
		var xmainaxis = this.charHeight * 1.5;	//the next two variables are the axis on which text is going to be placed
		var ymainaxis = -1;
		currx = this.float_fix(currx);	//flix floating point errors
		curry = this.float_fix(curry);

		if(y2 >= 0 && y1 <= 0)	//y=0 appears on the screen - move the text to follow
			xmainaxis = this.height - ((0-y1)/(y2-y1))*this.height + (this.charHeight * 1.5);
		else if(y1 > 0)	//the smallest value of y is below the screen - the x-axis labels get pushed to the bottom of the screen
			xmainaxis = this.height - 5;

		//the x-axis labels have to be a certain distance from the bottom of the screen
		if(xmainaxis > this.height - (this.charHeight / 2))
			xmainaxis = this.height - 5;

		//do the same as above with the y-axis
		if(x2 >= 0 && x1 <= 0)	//y-axis in the middle of the screen
			ymainaxis = ((0-x1)/(x2-x1))*this.width - 2;
		else if(x2 < 0)	//y-axis on the right side of the screen
			ymainaxis = this.width-6;

		if(ymainaxis < (this.ctx.measureText(curry).width + 1)) {
			ymainaxis = -1;
		}

		var sigdigs = String(currx).length + 3;
		
		var currxMajor = currx;
		//VERTICAL LINES
		i = 0;
		while(i < 10000){
			i++;
			xpos = ((currx-x1)/(x2-x1))*this.width;	//position of the line (in pixels)
			//make sure it is on the screen
			if(xpos-0.5 > this.width + 1 || isNaN(xpos)) {
				break;
			}
			if(xpos < 0) {
				currx += gridscaleMinorX;
				continue;
			}
			currx = this.float_fix(currx);
			if(currx == 0) xaxis = xpos;

			var isMajor = isInteger(this.float_fix((currxMajor - currx) / gridscaleMajorX));
			this.ctx.fillStyle = isMajor ? "#bcbcbc" : "#eaeaea";
			this.ctx.fillRect (xpos-0.5, 0, 1, this.height);
			this.ctx.fillStyle = "rgb(0,0,0)";

			//Draw label
			if (currx != 0 && isMajor) {
				var xtextwidth = this.ctx.measureText(currx).width;
				if (xpos + xtextwidth * 0.5 > this.width) //cannot overflow the screen
					xpos = this.width - xtextwidth * 0.5 + 1;
				else 
					if (xpos - xtextwidth * 0.5 < 0) 
						xpos = xtextwidth * 0.5 + 1;
				this.ctx.fillText(currx, xpos, xmainaxis);
			}

			currx += gridscaleMinorX;
			
		}
		this.ctx.textAlign = "right";
		sigdigs = String(curry).length + 3;

		//HORIZONTAL LINES
		var curryMajor = curry;
		i = 0;
		while (true){
			ypos = this.height - ((curry-y1)/(y2-y1))*this.height;	//position of the line (in pixels)
			//make sure it is on the screen
			if(ypos-0.5 > this.height + 1) {
				curry += gridscaleMinorY;
				continue;
			}
			if (ypos < 0 || isNaN(ypos)){
				break;
			}
			curry = this.float_fix(curry);

			if(curry == 0)
				yaxis = ypos;

			var isMajor = isInteger(this.float_fix((curryMajor - curry) / gridscaleMajorY));
			this.ctx.fillStyle = isMajor ? "#bcbcbc" : "#eaeaea";
			this.ctx.fillRect (0, ypos-0.5, this.width, 1);
			this.ctx.fillStyle = "black";

			//Draw label
			if (curry != 0 && isMajor) {
				var ytextwidth = this.ctx.measureText(curry).width;
				if (ypos + (this.charHeight / 2) > this.height) //cannot overflow the screen
					ypos = this.height - (this.charHeight / 2) - 1;
				if (ypos - 4 < 0) 
					ypos = 4;
				var xaxispos = ymainaxis;
				if (ymainaxis == -1) 
					xaxispos = ytextwidth + 1;
				this.ctx.fillText(curry, xaxispos, ypos + 3);
			}
			curry += gridscaleMinorY;
			i++;
		}

		// check if remove the axis
		if (this.plotInfo && this.plotInfo.funcsToDraw) {			
			for (k in this.plotInfo.funcsToDraw.funcs) {
				var finfo = this.plotInfo.funcsToDraw.funcs[k];
				var attr = finfo.attributes;
				if (attr && attr.lineType && attr.lineType !== "NORMAL") {
					if (finfo.evalFormula === "y=0") yaxis = null;
					else if (finfo.evalFormula === "x=0") xaxis = null;
				}
			}
		}
		
		//Draw the axis
		if(xaxis){
			this.ctx.fillRect(xaxis-0.5, 0, 1, this.height);
			if (sy_graphSettings.cur() && sy_graphSettings.cur().yLabel){
				var width = this.ctx.measureText(sy_graphSettings.cur().yLabel).width;
				this.ctx.save();
				this.ctx.translate(xaxis+15, 15);
				this.ctx.rotate(90*Math.PI / 180);
				this.ctx.fillText(sy_graphSettings.cur().yLabel, width, 4);
				this.ctx.restore();
			}
		}
			
		if(yaxis){
			this.ctx.fillRect (0, yaxis-0.5, this.width, 1);
			if (sy_graphSettings.cur() && sy_graphSettings.cur().xLabel){
				this.ctx.fillText(sy_graphSettings.cur().xLabel, this.width - 15, yaxis - 15);
			}
		}
			
	}
	
	this.minYpos = function(){
		return 0;
	}
	
	this.maxYpos = function(){
		return this.height;
	}
	
	this.minXpos = function(){
		return 0;
	}
	
	this.maxXpos = function(){
		return this.width;
	}
	
	//True if y pixel position is in drawing canvas
	this.inCanvasY = function(ypos){
		return ypos >= this.minYpos() && ypos <= this.maxYpos();
	}
	
	//True if x pixel position is in drawing canvas
	this.inCanvasX = function(xpos){
		return xpos >= this.minXpos() && xpos <= this.maxXpos();
	}
	
	//get the pixel coordinates of a function real point
	this.getCoord = function(x, y) {
		var xpos = this.getXCoord(x);
		var ypos = this.getYCoord(y);
		return {x : xpos, y : ypos};
	}
	
	//get the canvas pixel value of a real x coordinate
	this.getXCoord = function(x){
		x = this.roundInfinities(x);
		return ((x-this.currCoord.x1)/(this.currCoord.x2-this.currCoord.x1))*this.width;
	}
	
	//get the canvas pixel value of a real y coordinate
	this.getYCoord = function(y){
		y = this.roundInfinities(y);
		return this.height - ((y-this.currCoord.y1)/(this.currCoord.y2-this.currCoord.y1))*this.height;
	}
	
	this.roundInfinities = function(val){
		if (val=="-Infinity" || val=="-\\infty "){
			return -1e10;
		}
		else if (val == "Infinity" || val=="\\infty "){
			return 1e10;
		}
		return parseFloat(val);
	}
	
	this.getYInCanvas = function(y) {
		if (y<this.minYpos()){
			return this.minYpos();
		}
		else if (y > this.maxYpos()){
			return this.maxYpos();
		}
		else {
			return y;
		}
	}
	this.getXInCanvas = function(x) {
		if (x<this.minXpos()){
			return this.minXpos();
		}
		else if (x > this.maxXpos()){
			return this.maxXpos();
		}
		else {
			return x;
		}
	}
	
	//get the actual x,y position of a (pixel) coordinate
	this.getValue = function(x, y){
		return {x : this.getXvalue(x), y : this.getYvalue(y)};
	}
	this.getXvalue = function(x){
		var scale = this.getScale();
		var xpos = x / scale.x + this.currCoord.x1;
		return xpos;
	}
	this.getYvalue = function(y){
		var scale = this.getScale();
		var ypos = (this.height - y) / scale.y + this.currCoord.y1;
		return ypos;
	}
	//calculates the canvas edge point which is in the direction of the vector and adds to lists.
	this.roundToEdge = function(yposList,xposList,x,y1,y2) {
		var yval = y2>=y1?this.height:0;//determine top or bottom by direction function takes in y values frop point 1 to 2
		xposList.push(x);
		yposList.push(yval);
	}
	
	this.yposFromXpos = function(func,xpos){
		var scale = this.getScale();
		var xval = xpos / scale.x + this.currCoord.x1;	//calculate the x-value for a given pixel
		var yval = this.evalFunc(func, xval);	//evaluate the function
		var ypos = this.height - ((yval - this.currCoord.y1) * scale.y);
		return ypos;
	}
	
	// given function check if x pos is inside its domain
	// this function is not taking into account the case 'not equla' due to missing 
	this.inDomain = function(func, xpos) {
		if (func == null) return false;
		
		if (func.xmin != null) {
			if (xpos < func.xmin) {
				return false;
			}
			if (func.xmax != null && xpos > func.xmax) {
				return false;
			}
			return true;
		}
		if (func.xmax != null && xpos > func.xmax) {
			return false;
		}
		
		return true
	}
	
	//Given a function 'func' plots a series of connected lines at intervals 1 / this.quality
	//Goes over x-values from left to right and evaluates the function y-values.
	//While y-value is within the canvas the points are connected to plot the function
	//If y-value is not defined or is out of canvas, plotting stops
	//When going in and out of canvas bounds, a point of the canvas edge is added so line touches edge of canvas.
	//This extra point is extrapolated from closes two points drawn within canvas.
	//If large jump in y-values is seen then we assume function is undefined in the middle and path is broken into two. (like in tan(x) cases)
	//Oren Ish-Am May 2015
	this.drawFunction = function(func, finfo, funcIndex) {
		if(!func)
			return false;
	
		// check if there are no illegal functions/variables
		try{
			this.yposFromXpos(func,0);
		}
		catch(err){
			return false;
		}	
		
		//We don't want to draw lines that go off the screen too much, so we keep track of how many times we've had
		//to go off the screen here
		var attr = finfo.attributes;
		var scale = this.getScale();
		var pathExists = false;
		var prevDirection = 0;
		var sumIncrements = 0;
		var numIncrements = 0;
		var prevYpos = -1;
		var prevXpos = -1;
		var pos = [];
		var yposList = [];
		var xposList = [];
		var xVals = [];
		var curFuncVals = [];
		var invQuality = 1 / this.quality;
		var minxval = 0;
		var maxxval = this.width + invQuality;
		var numAddSamples = 250;
		if (finfo.xmin != null) {
			var xval = this.getXCoord(finfo.xmin);
			if (minxval < xval) minxval = xval;
		}
		if (finfo.xmax != null) {
			var xval = this.getXCoord(finfo.xmax);
			if (maxxval > xval) maxxval = xval + invQuality;
		}
		
		for(var xpos = minxval; xpos < maxxval; xpos += invQuality) {//Loop through each pixel
			var idx = xposList.length;//running index of xposList and yposList last item
			var ypos = this.yposFromXpos(func,xpos);
			if(this.inCanvasY(ypos)) {
				if(pathExists==false){
					//start of path after out-of-bounds must touch bounding box top or bottom. 
					//estimate intersection with edge by this point and the next one.
					if (idx>=0 && !isNaN(yposList[idx-1])){
						//peek into next ypos
						var nextYpos = this.yposFromXpos(func,xpos+ invQuality);
						this.roundToEdge(yposList,xposList,xpos,nextYpos,ypos);
					}
					else if (idx>=0 && isNaN(yposList[idx-1])){
						//When coming from an area where the function is not defined, add some sample points
						var xposSamp = xposList[idx-1];
						for(var si=0;si<(numAddSamples-1);++si){
							xposSamp += invQuality/numAddSamples;
							var yposSamp = this.yposFromXpos(func,xposSamp);
							yposList.push(yposSamp);
							xposList.push(xposSamp);
						}
					}
				}
				else {//determine function direction: 1 rising, -1 falling, 0 undefined
					var diffY = ypos-prevYpos;
					var currDirection = diffY>0?-1:(diffY<0?1:0);
					if (prevDirection !==0){//prevDirection was defined by two points
						if (currDirection == prevDirection){
							sumIncrements += Math.abs(ypos-prevYpos);//gather all function changes in this direction
							++numIncrements;
						}
						else {
							//direction has changed. If sharp fall or rise, assume asymptote lies between current and previous point - split paths.
							var change = Math.abs(ypos-prevYpos);
							if (change > sumIncrements && change > this.height/1000 && numIncrements>2){
								//Add point to path of previous point ending in bounding box
								this.roundToEdge(yposList,xposList,xposList[idx-1],yposList[idx-2],yposList[idx-1]);
								//Add out-of-bounds point to signal that path needs to be terminated
								yposList.push(this.height+1000);
								xposList.push(xpos);
								//start of path must touch bounding box. Find which side of box is closest to current point and connect
								//peek into next ypos
								var nextYpos = this.yposFromXpos(func,xpos+ invQuality);
								this.roundToEdge(yposList,xposList,xpos,nextYpos,ypos);
							}
							sumIncrements=0;
							numIncrements=0;
						}
					}
					prevDirection = currDirection;
				}
				pathExists = true;//Signal point was drawn within BB
				prevYpos = ypos;
				prevXpos = xpos;
			}	
			else {
				if(pathExists) {	//The line is out-of-bounds and there is still an active path that requires termination
					if (!isNaN(ypos)){
						//If going out-of-bounds, connect path to top or bottom of canvas
						this.roundToEdge(yposList,xposList,xposList[idx-1],yposList[idx-2],yposList[idx-1]);
					}
					else if (idx>=0){
						//When exiting into an area where the function is not defined, add some sample points
						var xposSamp = xposList[idx-1];
						var yposSamp = null;
						for(var si=0;si<(numAddSamples-1);++si){
							xposSamp += invQuality/numAddSamples;
							if (isNaN(yposSamp)) {
								yposList.push(yposSamp);
								xposList.push(xposSamp);
							} else {
								yposSamp = this.yposFromXpos(func,xposSamp);
								if (isNaN(yposSamp) && finfo.xmax != null && (xpos + invQuality) > maxxval) {
									yposList.push(this.getYCoord(this.evalFunc(func, finfo.xmax)));
									xposList.push(this.getXCoord(finfo.xmax));
								} else {
									yposList.push(yposSamp);
									xposList.push(xposSamp);
								}
							}
						}
					}

					pathExists=false;
					prevYpos = -1;
					prevDirection = 0;
					sumIncrements = 0;
				}
			}	
			yposList.push(ypos);
			xposList.push(xpos);
			curFuncVals.push(ypos);
			xVals.push(xpos);
		}

		//this.xVals.push(maxxval);
		//curFuncVals.push(this.height - ((-this.currCoord.y1) * scale.y));
		this.allFuncVals[funcIndex] = curFuncVals;
		this.funcsYpos[funcIndex] = yposList;
		this.funcsXpos[funcIndex] = xposList;
		this.funcXvals[funcIndex] = xVals;
		this.drawFuncs[funcIndex] = func;
		//--------------
		// DRAW THE PATH
		//--------------
		this.setCtxStyle(attr);
		this.ctx.beginPath();
		this.ctx.lineWidth = attr.isAsymptote == true ? 1 : this.options['lineWidth'];
		
		for(var i = 0; i < yposList.length; ++i) {
			var ypos = yposList[i];
			var xpos = xposList[i];

			if(this.inCanvasY(ypos)) {	//The line is on the screen, or pretty close to it
				if(pathExists==false){//no path exists, start new path
					this.ctx.beginPath();
					this.ctx.moveTo(xpos, ypos);
				}
				this.ctx.lineTo(xpos, ypos);
				pathExists = true;//Signal point was drawn within BB
			}
			else {
				if(pathExists) {	//The line is out-of-bounds and there is still an active path that requires termination
					this.ctx.stroke();
					pathExists=false;
				}
			}
			
		}
		this.ctx.stroke();
		this.defaultCtxStyle();//return to old values
	}
	this.drawLines = function() {
		if (this.plotInfo && this.plotInfo.linesToDraw){
			for(var i in this.plotInfo.linesToDraw) {
				var segment = this.plotInfo.linesToDraw[i];
				this.drawLineSegment(segment);
			}
		}		
	}
	this.drawFunctions = function() {
		if (this.plotInfo && this.plotInfo.funcsToDraw){
			for(var i in this.plotInfo.funcsToDraw.funcs) {
				var finfo = this.plotInfo.funcsToDraw.funcs[i]; 
				var func = finfo.evalFormula;
				var attr = finfo.attributes;
				
				if (attr.isAsymptote && sy_graphSettings.cur() && sy_graphSettings.cur().isDrawAsypmtotes.draw == false){
					continue;
				}
				var balloon = finfo.displayFormula;
				for (var j in attr.labels){
					balloon += "<br/>\\mathrm{" + attr.labels[j]+"}";
				}
				this.functionsInfo.push(balloon);
				
				if (func.indexOf('y=') === 0) func = func.substring(2);
				
				if (func.indexOf(this.variable+'=') === 0){//vertical line x=3
					func = func.substring(2);
					func = SyCalc.parseEquation(func, true);
					var parsedFunc = SyParse.parse(func);
					var evaluated = SyParse.evaluate(parsedFunc);
					this.drawVerticalLine(evaluated, attr, i);
				}
				else{
					func = SyCalc.parseEquation(func, true);
					this.drawFunction(func, finfo, i);
				}
			}
		}		
	}
	
	this.drawPoints = function(){
		if (this.plotInfo && this.plotInfo.pointsToDraw){
			for(var i in this.plotInfo.pointsToDraw.pointsDecimal) {
				var point = this.plotInfo.pointsToDraw.pointsDecimal[i];
				var attr = this.plotInfo.pointsToDraw.attributes[i];
				var balloon = this.plotInfo.pointsToDraw.pointsLatex[i];
				for (var j in attr.labels){
					balloon += "<br/>\\mathrm{" + attr.labels[j]+"}";
				}
				//Add to database of points to be drawn
				this.pointsDraw.push({x:point.fst,y:point.snd});
				this.pointsDrawAttr.push(attr);
				this.pointsDrawText.push(balloon);				
			}
		}
	},
	
	this.drawFunctionIntersections = function(){
		var scale = this.getScale();
		if (this.plotInfo
				&& this.plotInfo.drawFuncIntersection
				&& this.allFuncVals.length > 1
				&& sy_graphSettings.cur().isDrawFunctionIntercepts.draw){
			var hasIntercept = false;
			for(var i=0; i<(this.allFuncVals.length-1); i++){
				for(var j=i+1; j<this.allFuncVals.length; j++){
					if (this.plotInfo.funcsToDraw.funcs[i].attributes.isAsymptote) continue;//do not intersect asymptotes
					if (this.plotInfo.funcsToDraw.funcs[j].attributes.isAsymptote) continue;
					var yvals1 = this.allFuncVals[i];
					var yvals2 = this.allFuncVals[j];
					if (!yvals1 || !yvals2) continue;
					var func1 = this.drawFuncs[i];
					var func2 = this.drawFuncs[j];
					var derForm1 = this.plotInfo.funcsToDraw.funcs[i].derivativeFormula;
					var derForm2 = this.plotInfo.funcsToDraw.funcs[j].derivativeFormula;
					var rootFunc = "("+func1 +")-(" + func2 +")";


					// find new x indexes
					var frsFuncXVals = this.funcXvals[i];
					var sndFuncXVals = this.funcXvals[j];
					var fstIndex = 1;
					var sndIndex = 1;
					var smallestLength = Math.min(this.funcXvals[i].length, this.funcXvals[j].length);

					if (frsFuncXVals[0] < sndFuncXVals[0]) {
						for (fstIndex; fstIndex < frsFuncXVals.length; fstIndex++) {
							if (Math.abs(frsFuncXVals[fstIndex] - sndFuncXVals[0]) > 5) {
								break;
							}
						}
					} else if (frsFuncXVals[0] > sndFuncXVals[0]) {
						for (sndIndex; sndIndex < sndFuncXVals.length; sndIndex++) {
							if (Math.abs(sndFuncXVals[sndIndex] - frsFuncXVals[0]) < 0.1) {
								break;
							}
						}
					}


					var sign = yvals1[fstIndex]>=yvals2[sndIndex]?1:-1; //index 0 has bad values
					var skip = 3;
					var xVals = this.funcXvals[i];
					
					for (var xi=1; xi<smallestLength; xi+=skip){
						
						var y1 = yvals1[xi + fstIndex];
						var y2 = yvals2[xi + sndIndex];
						var tmpSign = y1>=y2?1:-1;
						if (tmpSign!==sign){
							if(this.inCanvasY(y1) && this.inCanvasY(y2)){
								//Sign reversal happened between previous xVal and next xVal
								var rngMin = xVals[xi-skip-1]  / scale.x + this.currCoord.x1;
								var rngMax = xVals[xi+1] / scale.x + this.currCoord.x1;//calculate the x-value for a given pixel
								var rootx = this.findIntersection(rootFunc,/*rootDeriv,*/rngMin,rngMax,false);//rootx is the x-value
								var rooty = this.evalFunc(func1,rootx);
								if (rootx!==false){
									var label = "<br/>\\mathrm{function-intersection}";
									this.addIntersectionPoint(rootFunc,rootx,rooty,label,"RED");
									hasIntercept = true;
								}
							}
							sign = tmpSign;//Remember which function is on top
						}
					}
				}
			}
		}
	}
	this.drawXIntersections = function(){
		if (this.plotInfo && this.plotInfo.drawFuncIntersection){
			var interDrawn = false;
			for(var i=0; i<this.allFuncVals.length; i++){
				var yvals1 = this.allFuncVals[i];
				var func1 = this.drawFuncs[i];
				if (!yvals1) continue;
				if (this.plotInfo.funcsToDraw.funcs[i].attributes.isAsymptote) continue;
				var rootFunc = func1;
				var yZeroCoord = this.getYCoord(0);//convert from actual y=0 to pixel coordinates.
				var sign = NaN;//init the sign variable only if distinct from zero. For cases like e^{-x^2} which tend to zero at infinity
				if (yvals1[0]>yZeroCoord) {sign = 1;}
				else if (yvals1[0]<yZeroCoord) {sign = -1};
				
				var skip = 3;
				var xVals = this.funcXvals[i];
				var arrLen = xVals.length;
				for (var xi=1;xi<arrLen;xi+=skip){
					var y1 = yvals1[xi];
					var tmpSign = sign;//default. Change only if really larger or smaller than zero.
					if (y1>yZeroCoord) {tmpSign = 1;}
					else if (y1<yZeroCoord) {tmpSign = -1};
					if (!isNaN(sign) && tmpSign!==sign){
						if(this.inCanvasY(yZeroCoord)){
							//Sign reversal happened between previous xVal and next xVal
							var scale = this.getScale();
							var rngMin = xVals[xi-skip-1]  / scale.x + this.currCoord.x1;
							var rngMax = xVals[xi+1] / scale.x + this.currCoord.x1;//calculate the x-value for a given pixel
							var rootx = this.findIntersection(rootFunc,/*rootDeriv,*/rngMin,rngMax,false);//rootx is the x-value
							var rooty = 0;
							if (rootx!==false){
								var label = "<br/>\\mathrm{x-intercept}";
								this.addIntersectionPoint(rootFunc,rootx,rooty,label,"BLACK");
								interDrawn = true;
							}
						}
						sign = tmpSign;//Remember which function is on top
					}
				}
			}
		}
	} 
	//For all functions, iterate over all xVals and find places where derivative changes signs.
	//For those itervals, use Newton-Raphson to home in on the exact point and figure out if min or max
	this.drawExtremumPoints = function(){
		if (this.plotInfo && this.plotInfo.drawFuncIntersection){
			
			var extDrawn = false;
			for(var i=0; i<this.allFuncVals.length; i++){
				var rootFunc = this.drawFuncs[i];
				if (!rootFunc) continue;
				
				var xVals = this.funcXvals[i];
				
				var yvals1 = this.allFuncVals[i];
				var xCoord = this.getXvalue(xVals[0]);
				var prevSign = NaN;//init the sign variable only if distinct from zero. For cases like e^{-x^2} which tend to zero at infinity
				var der = this.getDerivative(rootFunc,xCoord);
				if (der>0) {prevSign = 1;}//init the prevSign variable
				else if (der<0) {prevSign = -1};
				
				var skip = 3;
				var arrLen = xVals.length;
				for (var xi=1;xi<arrLen;xi+=skip){
					var y1 = yvals1[xi];//use only to check that point is in canvas
					//var y2 = this.getYCoord(0);//convert from actual y=0 to pixel coordinates.
					xCoord = this.getXvalue(xVals[xi]);
					der = this.getDerivative(rootFunc,xCoord);
					var currSign = prevSign;//default. Change only if really larger or smaller than zero.
					if (der>0) {currSign = 1;}
					else if (der<0) {currSign = -1};

					if (!isNaN(prevSign)  && currSign!==prevSign){
						if(this.inCanvasY(y1)){
							//Sign reversal happened between previous xVal and next xVal
							var scale = this.getScale();
							var rngMin = xVals[xi-skip-1]  / scale.x + this.currCoord.x1;
							var rngMax = xVals[xi+1] / scale.x + this.currCoord.x1;//calculate the x-value for a given pixel
							var rootx = this.findDerivativeIntersection(rootFunc,rngMin,rngMax);//rootx is the x-value
							if (this.inDomain(this.plotInfo.funcsToDraw.funcs[i], rootx)) {
								var rooty = this.evalFunc(rootFunc,rootx);
								if (rootx!==false){
									var label = prevSign>currSign?"<br/>\\mathrm{Maximum}":"<br/>\\mathrm{Minimum}";
									this.addIntersectionPoint(rootFunc,rootx,rooty,label,"BLUE");
									extDrawn = true;
								}
								//Functions tangent to x axis will not find x-intercept with regular function. This point is also an x-intercept
								if (Math.abs(rooty)<1e-8){
									var label = "<br/>\\mathrm{x-intercept}";
									this.addIntersectionPoint(rootFunc,rootx,rooty,label,"BLACK");
									extDrawn = true;
								}
							}
						}
					}
					prevSign = currSign;//Remember which function is on top
				}
			}
		}
	} 
	this.drawYIntersections = function(){
		if (this.plotInfo && this.plotInfo.drawFuncIntersection){
			var interDrawn = false;
			for(var i=0; i<this.allFuncVals.length; i++){
				var func = this.plotInfo.funcsToDraw.funcs[i];
				if (func.attributes.isAsymptote) continue;
				var func1 = this.drawFuncs[i];
				if (!func1) continue;
				var rootx = 0;//rootx is the x-value
				if (!this.inDomain(func, rootx)) continue;
				var rooty = this.evalFunc(func1,rootx);
				if (isFinite(rooty)){
					var label = "<br/>\\mathrm{y-intercept}";
					this.addIntersectionPoint(func1,rootx,rooty,label,"BLACK");
					interDrawn = true;
				}
			}
		}
	}
	//Try and match points to known values for nice display and add information for plotting point
	this.addIntersectionPoint = function(func,rootx,rooty,label,color){
		var retx = this.guessNumber(rootx,func);
		if (retx.success && (retx.str == "\\sqrt{0}" || retx.str == "-\\sqrt{0}")) retx.str = "0";
		var rety = this.guessNumber(rooty,func);
		rootx = this.toPrecision(rootx,5);
		rooty = this.toPrecision(rooty,5);
		var point = {x:rootx,y:rooty};
		var idx = this.myIndexOf(this.pointsDraw,point);
		if(idx==-1){
			this.pointsDraw.push(point);
			var attr = { color: color, borderColor: null};
			this.pointsDrawAttr.push(attr);
			this.pointsDrawText.push("("+retx.str+","+rety.str+")"+label);
		}
		else{
			var txt = this.pointsDrawText[idx];
			if (txt.indexOf(label)<0){
				txt += label;
				this.pointsDrawText[idx] = txt;
			}
		}
	}
	//round num to n precision digits
	this.toPrecision = function(num, n) {
		if(num == 0) {
			return 0;
		}

		var d = Math.ceil(Math.log10(num < 0 ? -num: num));
		var power = n - Math.round(d);

		var magnitude = Math.pow(10, power);
		var shifted = Math.round(num*magnitude);
		return shifted/magnitude;
	}

	this.isSamePoint = function(x1,x2) {    
		return Math.abs(x1-x2)<0.00001;
	}
	
	//Custom method to find index of point object within array
	this.myIndexOf = function(arr,obj) {    
		for (var i = 0; i < arr.length; i++) {
			if (this.isSamePoint(arr[i].x, obj.x) && this.isSamePoint(arr[i].y, obj.y)) {
				return i;
			}
		}
		return -1;
	}

	this.evalForm = function(form){
		try {
			var funcX = SyCalc.parseEquation(form, true);
			if (funcX === "") return "undefined";
			var parsedFunc = SyParse.parse(funcX);
			return SyParse.evaluate(parsedFunc);
         } catch (err){
        	 return "undefined";
         }
    }
	
	this.getCachedFunction = function(func) {
		
		var functionObj = this.allFuncs[func];
		if(!functionObj) {
			functionObj = {};
			
			if (func.indexOf(this.variable)>=0){
				functionObj.variable = this.variable;
			}
			else if (func.indexOf('x')>=0){
				functionObj.variable = 'x';
			}
			else if (func.indexOf('u')>=0){
				functionObj.variable = 'u';
			}
			
			functionObj.parsedFunction = SyParse.parse(func);
			
			this.allFuncs[func] = functionObj;
		}
		
		return functionObj;
	}

	this.evalFunc = function(func, xval){
		
		var functionObj = this.getCachedFunction(func);
		
		if(xval === undefined) {
			return SyParse.evaluate(functionObj.parsedFunction);
		} else {
			var variables = {};
			variables[functionObj.variable] = xval;
			return SyParse.evaluate(functionObj.parsedFunction, variables);	//evaluate the function
		}
	}
	
	this.roundToInt = function(num){
		var round = Math.round(num);
		if (Math.abs(num-round)<1e-5) return round;
		else return num;
	}
	this.hasTrig = function(func){
		if (func.match(/(sin|tan|cos|csc|sec|cot)/)) return true;
		return false;
	}
	this.hasE = function(func){
		if (func.match(/e.*\^/)) return true;
		return false;
	}
	//Given a number, return the closest Latex String representation possible. For example:
	//1.0000001 --> 1
	//3.14159 --> \pi
	//-0.6666667 --> -\frac{2}{3}
	//1.03522371 --> 1.03522371   [is not close to any known "nice" number]
	//recursive=true means make recursive calls
	//hasTrig means this is the solution to some equation with trig - have \pi as a possibility

	this.guessNumber = function(num,func){
		var hasTrig = this.hasTrig(func);//function contains trig - \pi is an option for solution
		var hasE = this.hasE(func);//function contains 'e' - 'e' is option for solution
		this.num2str = function (num,recursive){//defined internally to have access to flags above
			var maxIntTry = 11;
			var EPS = 1e-5;
			var ret = {str: String(num),success: false};//has fields .str (string representation), .success (if found close number)
			var reply;
			//Check if close to an integer
			var round = Math.round(num);
			if (this.isInt(num)){//number is integer
				ret.str = String(num);
				ret.success = true;
			}
			else if (Math.abs(num-round)<EPS){//number close to integer like 5.0001
				ret.str = String(round);
				ret.success = true;
			}
			//--If negative, try to recognize positive and then negate answer
			else if (num<0){//-5
				reply = this.num2str(-num,true);
				ret.str = this.negateNumberString(reply.str);
				ret.success = reply.success;
			}
			//Check if \pi or Euler 'e'
			else if (Math.abs(num-Math.PI)<EPS && hasTrig){//3.14159
				ret.str = "\\pi";
				ret.success = true;
			}
			else if (Math.abs(num-Math.E)<EPS && hasE){//2.718281828
				ret.str = "e";
				ret.success = true;
			}
			else { 
				for (var i = 2; i <= maxIntTry; i++) {
					//Check integer sqrts
					if (Math.abs(num-Math.sqrt(i))<EPS){//\sqrt{2}
						ret.str = "\\sqrt{"+i+"}";
						ret.success = true;
					}
				}
				if (recursive){
					var sqrt = Math.sqrt(num);//\pi^2
					reply = this.num2str(sqrt,false);
					if (reply.success){
						ret.str = reply.str+"^{2}";
						ret.success = true;
						return ret;
					}
					var sqr = Math.pow(num,2);//\sqrt{\pi}
					reply = this.num2str(sqr,false);
					if (reply.success){
						ret.str = "\\sqrt{"+reply.str+"}";;
						ret.success = true;
						return ret;
					}
					for (var i = 2; i <= maxIntTry; i++) {
						//Check integer multiplication of number. For example 0.3333333 multiplied by 3 will give 1
						var mult = num*i;
						reply = this.num2str(mult,false);
						if (reply.success){
							ret.str = "\\frac{"+reply.str+"}{"+i+"}";
							ret.success = true;
							return ret;
						}
						//Check integer division of number. For example 3\pi divided by 3 will give \pi
						var div = num/i;
						reply = this.num2str(div,false);
						if (reply.success){
							ret.str = i+reply.str;
							ret.success = true;
							return ret;
						}
					}
					for (var i = 2; i < maxIntTry; i++) {
						for (var j = i+1; j <= maxIntTry; j++) {
							if (!this.isInt(i/j) && !this.isInt(j/i)){
								var mult = num*i/j;
								reply = this.num2str(mult,false);
								if (reply.success){
									ret.str = "\\frac{"+j+reply.str+"}{"+i+"}";
									ret.success = true;
									return ret;
								}
								mult = num*j/i;
								reply = this.num2str(mult,false);
								if (reply.success){
									ret.str = "\\frac{"+i+reply.str+"}{"+j+"}";
									ret.success = true;
									return ret;
								}
								
							}
						}
					}
					for (var i = 1; i <= maxIntTry; i++) {
						//Check integer addition of number. For example (\pi-1)+1 will give \pi
						var add = num+i;
						reply = this.num2str(add,false);
						if (reply.success){
							ret.str = reply.str+"-"+i;
							ret.success = true;
							return ret;
						}
						//Check integer subtraction of number. For example (\pi+1)-1 will give \pi
						var sub = num-i;
						if (sub>0){
							reply = this.num2str(sub,false);
							if (reply.success){
								ret.str = reply.str+"+"+i;
								ret.success = true;
								return ret;
							}
						}
					}
				}
			}	
			return ret;
		}
		var res = this.num2str(num,true);
		if (!res.success){
			res.str = String(this.toPrecision(num,5));
		}
		return res;
	}
	this.isInt = function(num){
		return num%1===0;
	}
	//Given a number in string form, negate it:
	//\pi --> -\\pi
	//\\pi+1 --> -\\pi-1
	this.negateNumberString = function(str){
		str = str.replace(/-/g,"#");
		str = str.replace(/\+/g,"-");
		str = str.replace(/#/g,"+");
		if (str.charAt(0)==='+'){
			str = str.subString(1,str.length);
		}
		else {
			str = "-"+str;
		}
		return str;
	}
	function dump(myObj) {	
		//console.log("my object: %o", myObj)
	}
	
	//Given func1 and func2, find intersection in range [rngMin,rngMax]
	//Use NewtonRaphson, code based on Graphr code: https://github.com/yerich/Graphr/blob/master/calc.js
	//Method works on actual x,y values and not pixel coordinates
	this.findIntersection = function(rootFunc,/*rootDerivative,*/rngMin,rngMax,shifted){
		var guess = (rngMin+rngMax)/2;
		dump(rootFunc + ", guess: "+guess);
		//Newton's method becomes very inaccurate if the root is too close to zero. Therefore we just shift everything over a few units.
		if(Math.abs(guess) < 0.1 && shifted != true) {
            var replacedEquation = rootFunc;
//            var replacedDerivative = rootDerivative;
			replacedEquation = replacedEquation.replace(new RegExp('\\b' + this.variable + '\\b', 'g'), '(' + this.variable + '+5)');
//			replacedDerivative = replacedDerivative?replacedDerivative.replace(new RegExp('\\b' + this.variable + '\\b', 'g'), '(' + this.variable + '+5)'):null;
			dump('Replaced equation = ' + replacedEquation/*+'\tReplaced Deriv'+replacedDerivative*/);
			var answer = this.findIntersection(replacedEquation,/*replacedDerivative,*/ rngMin-5,rngMax-5, true);
			dump(answer);
			if(answer !== false){
				return answer+5
			}
			return false;
		}
		return this.newtonRaphson(rootFunc,guess,rngMin,rngMax,false);
	}
//Given func1 and func2, find intersection in range [rngMin,rngMax]
	//Use NewtonRaphson, code based on Graphr code: https://github.com/yerich/Graphr/blob/master/calc.js
	this.findDerivativeIntersection = function(rootFunc,rngMin,rngMax,shifted){
		var guess = (rngMin+rngMax)/2;
		dump(rootFunc + ", guess: "+guess);
		//Newton's method becomes very inaccurate if the root is too close to zero. Therefore we just shift everything over a few units.
		if(Math.abs(guess) < 0.1 && shifted != true) {
            var replacedEquation = rootFunc;
			replacedEquation = replacedEquation.replace(new RegExp('\\b' + this.variable + '\\b', 'g'), '(' + this.variable + '+5)');
			var answer = this.findDerivativeIntersection(replacedEquation, rngMin-5,rngMax-5, true);
			if(answer !== false){
				return answer+5
			}
			return false;
		}
		return this.newtonRaphson(rootFunc,guess,rngMin,rngMax,true);
	}
	this.newtonRaphson = function(rootFunc,guess,rngMin,rngMax,extremum){
		var center = guess;
		var prev = guess;
		var j = 0;
		var max_loops = 30;
		var answer = 1;
		while (prev >= rngMin && prev <= rngMax && j++ < max_loops) {
			answer = extremum?this.getDerivative(rootFunc, prev):this.evalFunc(rootFunc,prev);	//evaluate the derivative/function

			if (Math.abs(answer) < 1e-10 && Math.abs(prev-xval) < 1e-10) {
				return prev;
			}
			var xval = prev;
			var sndDerivative = extremum?this.get2ndDerivative(rootFunc, xval):this.getDerivative(rootFunc, xval);
			if (sndDerivative == 0 || !isFinite(sndDerivative))
				break;

			//dump('d/dx = ' + sndDerivative);
			prev = prev - answer / sndDerivative;
		}

		if (Math.abs(answer) < 1e-10 || j >= max_loops) {
            dump('Convergence failed, best root = ' + prev);
            return prev;
		}

		dump("false: center at "+center+" but guess at "+prev);

		return false;
	}
	this.getDerivative = function(f, xval){
		/*
		 * This is a brute force method of calculating derivatives, using
		 * Newton's difference quotient: f'(x)=\frac{f(x+h)-f(x-h)}{2h}
		 * 
		 * The method calculated f'(x) for 50 h values and then averages them out.
		 */
		var ddx = 0;
	
		//The suitable value for h is given at http://www.nrbook.com/a/bookcpdf/c5-7.pdf to be sqrt(eps) * x
		var x = xval;
		if(x > 1 || x < -1)
			var h = Math.sqrt(this.eps) * x;
		else
			var h = Math.sqrt(this.eps);
		      
		var answerx = this.evalFunc(f,x); //f(x)
		//var multVals = [1,25,50];
		var multVals = [25];
		for(var i = 0; i < multVals.length; i++) {
			var diff = (h * multVals[i]);
            var inverseDiff = 1 / diff;// 1/h
			
			//h is positive
			xval = x + diff;
			var answer =  this.evalFunc(f,xval);//f(x+h)
			ddx += (answer - answerx) * inverseDiff;//f(x+h)/h
			
			//h is negative
			xval = x - diff;
			answer = this.evalFunc(f,xval);//f(x-h)        
			ddx += (answerx - answer) * inverseDiff;//f(x-h)/h
		}
	
		return ddx / (2*multVals.length);
	};
	this.get2ndDerivative = function(f, xval){
		/*
		 * This is a brute force method of calculating second derivatives, using
		 * Newton's difference quotient: f''(x)=\frac{f(x+h)-2f(x)+f(x-h)}{h^2}
		 * 
		 * The method calculated f''(x) for 50 h values and then averages them out.
		 */
		var ddx = 0;
	
		//The suitable value for h is given at http://www.nrbook.com/a/bookcpdf/c5-7.pdf to be sqrt(eps) * x
		var x = xval;
		if(x > 1 || x < -1)
			var h = Math.pow(this.eps,0.25) * x;
		else
			var h = Math.pow(this.eps,0.25);
		      
		var answerx = this.evalFunc(f,x);//f(x)      		
		var multVals = [25];
		for(var i = 0; i < multVals.length; i++) {
			var diff = (h * multVals[i]);
            var inverseDiff = 1 / (diff*diff);//1/h^2
			
			//h is positive
			xval = x + diff;
			var answer =  this.evalFunc(f,xval);//f(x+h)
			ddx += (answer - answerx) * inverseDiff;//(f(x+h)-f(x))/h^2
			
			//h is negative
			xval = x - diff;
			answer = this.evalFunc(f,xval);//f(x-h)        
			ddx += (answer-answerx) * inverseDiff;//(f(x-h)-f(x))/h^2
		}
	
		return ddx / multVals.length;
	};

	this.fillAreas = function(){
		if (this.plotInfo){
			for (var fili in this.plotInfo.fills){
				var ftd = this.plotInfo.fills[fili];
				if (ftd.xIneq || ftd.yIneq || ftd.twoVar){
					this.inequalityPlot(ftd);
				}
				else {
					this.fillPlot(ftd);
				}
			}
			if (this.plotInfo.colorInequalityIntersection){
				this.colorIntersection(this.plotInfo.fills);
			}
			
		}
	};

	this.inequalityPlot = function(ftd){		
		if (ftd.xIneq || ftd.yIneq){//xIneq: inequality with x like x^2<4. yIneq: inequality with y like y^2<4. 
			for(var ri in ftd.ranges) {
				var rangePair = ftd.ranges[ri];
				var rangeMin, rangeMax;
				if (ftd.xIneq){
					rangeMin = this.getXInCanvas(this.getXCoord(rangePair.fst)); 
					rangeMax = this.getXInCanvas(this.getXCoord(rangePair.snd)); 
				}
				else{
					rangeMax = this.getYInCanvas(this.getYCoord(rangePair.fst)); 
					rangeMin = this.getYInCanvas(this.getYCoord(rangePair.snd)); 
				}
				//Split range to small intervals and for each fill the canvas either from top to bottom, or side to side
				var intervals = 1 / this.quality
				for(var pos = rangeMin; pos <= rangeMax; pos += intervals) {//Loop through each pixel
					this.ctx.strokeStyle = ftd.color;
					this.ctx.beginPath();
					if (ftd.xIneq){
						this.ctx.moveTo(pos, this.minYpos());
						this.ctx.lineTo(pos, this.maxYpos());
					}
					else{
						this.ctx.moveTo(this.minXpos(), pos);
						this.ctx.lineTo(this.maxXpos(), pos);
					}
					this.ctx.stroke();
				}
			}
		}
		else if (ftd.twoVar){//inequality like y>2x+1, fill from function to one side
			var xVals = this.funcXvals[0];
			for (var xInd = 0; xInd < xVals.length; xInd++){
				var xVal = xVals[xInd];
				//if (xVal === parseInt(xVal, 10)){  		// only draw line for full pixel, otherwise there is a bug in safari
					this.ctx.strokeStyle = ftd.color;	// also doesn't make much sense to fill partial pixels
					this.ctx.beginPath();
					var fi = this.indexOfFunction(ftd.func);//vind the right funcVals by finding this function in list of plotted functions
					var y1=this.allFuncVals[fi][xInd];
					y1 = this.fixYPosition(y1);
					var y2=ftd.trueAboveLine?0:this.height;
					this.ctx.moveTo(xVal, y1);
					this.ctx.lineTo(xVal, y2);
					this.ctx.stroke();
				//}
			}	
		}	
	}
	//filling between functions, like for definite integrals
	this.fillPlot = function(ftd){
		for(var i = 0; i < ftd.funcIndices.length; i++) {
			var funcsIndicesPair = ftd.funcIndices[i];
			var rangePair = ftd.ranges[i];
			
			var rangeMin = this.getXInCanvas(this.getXCoord(rangePair.fst)); 
			var rangeMax = this.getXInCanvas(this.getXCoord(rangePair.snd)); 
			
			var xVals = this.funcXvals[this.funcXvals.length-1];
			for (var xInd = 0; xInd < xVals.length; xInd++){
				var xVal = xVals[xInd];
				if (xVal>=rangeMin && xVal<=rangeMax){
					this.ctx.strokeStyle = ftd.color;
					this.ctx.beginPath();
					var y1=this.allFuncVals[funcsIndicesPair.fst][xInd];
					var y2=this.allFuncVals[funcsIndicesPair.snd][xInd];
					y1 = this.getYInCanvas(y1);
					y2 = this.getYInCanvas(y2);
					this.ctx.moveTo(xVal, y1);
					this.ctx.lineTo(xVal, y2);
					this.ctx.stroke();
				}
			}					
		}
	}
	//If there is more than one inequality, calculate the color of the canvas in the intersection of all of them
	//Then go over canvas and color the intersection in a non-transparant color
	this.colorIntersection = function(fills){
		var canvas = document.createElement("canvas");
		var context =canvas.getContext("2d");
		context.width = 2;
		context.height = 2;
		context.fillStyle = "rgb(255,255,255)";
		context.fillRect (0, 0, context.width, context.height);
		
		var numCols = 0;
		//calculate the combination of all colors on canvas by painting a small canves with all colors and then checking the value of one pixel
		for (var fili in fills){
			var ftd = fills[fili];
			if (ftd.xIneq || ftd.yIneq || ftd.twoVar){
				var jump = 1 / this.quality;
				//if (ftd.xIneq || ftd.yIneq) jump = 1;
				for (var xInd = 0; xInd<context.width; xInd+=jump){
					context.strokeStyle = ftd.color;
					context.beginPath();
					context.moveTo(xInd, 0);
					context.lineTo(xInd, context.height);
					context.stroke();
				}
				
				numCols = numCols+1;
			}
		}
		if (numCols>1){
			var intersectColor = context.getImageData(0 , 0, 1, 1).data;//array of length 4 [r,g,b,a]
			var resultColor = [0,0,0,255];
			//scan canvas and look for this color. If seen, replace with opaque color
			var imgData = this.ctx.getImageData(0,0,this.graph.width, this.graph.height);
			var data = imgData.data;
			var changed = false;
			// enumerate all pixels
			// each pixel's r,g,b,a datum are stored in separate sequential array elements
			for(var i=0; i<data.length; i += 16) {
				var pixColor = this.slice(data, i,i+4);
				if (this.closeEnough(pixColor,intersectColor)){
					data[i] = resultColor[0];
					data[i+1] = resultColor[1];
					data[i+2] = resultColor[2];
					data[i+3] = resultColor[3];
					changed = true;
				}
				else if (changed){
					this.closeEnough(pixColor,intersectColor);
				}
			}
			this.ctx.putImageData(imgData, 0, 0);
		}
	}

	this.closeEnough = function(color1, color2){
		var proximity = 7;
		if (Math.abs(color1[0]-color2[0]) >= proximity) return false;
		if (Math.abs(color1[1]-color2[1]) >= proximity) return false;
		if (Math.abs(color1[2]-color2[2]) >= proximity) return false;
		if (Math.abs(color1[3]-color2[3]) >= proximity) return false;

		return true;
	};

	this.slice = function(data, start, end){
		var arr = new Array();
		for (var i = start; i < end; i++){
			arr[i-start] = data[i];
		}

		return arr;		
	};


	/**
	 * find newFunc in funcs and return index in list or -1 if not found
	 */
	this.indexOfFunction = function(findMe) {
		for (var fi in this.plotInfo.funcsToDraw.funcs){
			var f = this.plotInfo.funcsToDraw.funcs[fi];
			if (f.evalFormula == findMe) return fi;
		}
		return -1;
	}
	this.fixYPosition = function(y) {
		if (y<0){
			return 0;
		}
		else if (y > this.height){
			return this.height;
		}
		else {
			return y;
		}
	}	
	//Gets the scale (pixels per unit)
	this.getScale = function() {
		return {x : (this.width / (this.currCoord.x2 - this.currCoord.x1)),
			y : (this.height / (this.currCoord.y2 - this.currCoord.y1))}
	}

	//get the range of values on the screen
	this.getRange = function() {
		return {x : Math.abs(this.currCoord.x2 - this.currCoord.x1),
			y : Math.abs(this.currCoord.y2 - this.currCoord.y1)}
	}

	this.checkMove = function(x, y) {
		this.clearBalloons();
		this.balloonShowed = false;
		
		var checkMoveProximity = this.options["proximity"];
		
		// mouse is over pointDraw (extremum / intersection)
		if (this.pointsDraw.length>0){
			// check if hovering point
			for(var i in this.pointsDraw) {
				var point = this.pointsDraw[i];
				var coord = this.getCoord(point.x, point.y);
				if (this.isPointInProximity(x, y, coord.x, coord.y, checkMoveProximity)){
					this.showBalloon(this.pointsDrawText[i], coord.x + 100, coord.y - 40);
					break;
				}
			}
		}		
		
		if (this.balloonShowed == false && this.plotInfo) {
			for(var i in this.plotInfo.linesToDraw) {
				//Show balloons for line segments
				var segment = this.plotInfo.linesToDraw[i];
				var p1 = this.getCoord(segment.p1x, segment.p1y);
				var p2 = this.getCoord(segment.p2x, segment.p2y);

				var dist = this.pointSegmentDist(x,y,p1.x,p1.y,p2.x,p2.y);
				if (dist<10){
					this.showBalloon(segment.attributes.labels[0], x, y);
				}
			}
			if (this.plotInfo.funcsToDraw && this.plotInfo.funcsToDraw.funcs){
				
				// create function search order
				var indexArr = [];
				if (this.currentFunctionIndex != undefined) indexArr.push(this.currentFunctionIndex);
			    for (var k in this.funcsYpos) {
			        if (this.funcsYpos.hasOwnProperty(k)) indexArr.push(k);
			    }

				// check if hovering function
				for(var i = 0; i< indexArr.length; i++) {
					
					var yVals = this.funcsYpos[indexArr[i]];
					if (yVals == null){
						// vertical asymptote x=3 for example
						var func = this.plotInfo.funcsToDraw.funcs[indexArr[i]].evalFormula;
						var funcX = SyCalc.parseEquation(func.substring(2), true);
						if (funcX === "") continue;
						var parsedFunc = SyParse.parse(funcX);
						funcX = SyParse.evaluate(parsedFunc);
						var xpos = ((funcX-this.currCoord.x1)/(this.currCoord.x2-this.currCoord.x1))*this.width;
						if (this.isInProximity(xpos, x, checkMoveProximity)){
							this.showBalloon(this.functionsInfo[indexArr[i]], x, y);
						}
					}
					else{
						var xVals = this.funcsXpos[indexArr[i]];
						for (var ind = 0; ind < xVals.length; ind++){
							if (this.isPointInProximity(x, y, xVals[ind], yVals[ind], checkMoveProximity)){
								this.showBalloon(this.functionsInfo[indexArr[i]], x, y);
								break;
							}
						}
					}
					
					if (this.balloonShowed){
						break;
					}
				}
				
				if (this.balloonShowed == false) {
				    for (var i in this.plotInfo.funcsToDraw.funcs) {
						var yVals = this.funcsYpos[i];
						if (yVals == null) {
							// vertical asymptote x=3 for example
							var func = this.plotInfo.funcsToDraw.funcs[i].evalFormula;
							var funcX = SyCalc.parseEquation(func.substring(2), true);
							if (funcX === "") continue;
							var parsedFunc = SyParse.parse(funcX);
							funcX = SyParse.evaluate(parsedFunc);
							var xpos = ((funcX-this.currCoord.x1)/(this.currCoord.x2-this.currCoord.x1))*this.width;
							if (this.isInProximity(xpos, x, checkMoveProximity)){
								this.showBalloon(this.functionsInfo[i], x, y);
							}
						}
				    }
				}
			}
		}
	}
	
	//--Distance between point (x,y) and segment [(x1,y1),(x2,y2)]
	this.pointSegmentDist = function(x,y,x1, y1, x2, y2){
		var A = x - x1;
		var B = y - y1;
		var C = x2 - x1;
		var D = y2 - y1;

		var dot = A * C + B * D;
		var len_sq = C * C + D * D;
		var param = -1;
		if (len_sq != 0) //in case of 0 length line
			param = dot / len_sq;

		var xx, yy;

		 if (param < 0) {
			xx = x1;
			yy = y1;
		 }
		 else if (param > 1) {
			xx = x2;
			yy = y2;
		 }
		 else {
			xx = x1 + param * C;
			yy = y1 + param * D;
		 }

		 var dx = x - xx;
		 var dy = y - yy;
		 return Math.sqrt(dx * dx + dy * dy);
	}
	this.isPointInProximity = function(x1, y1, x2, y2, distance){
		return (this.isInProximity(x1, x2, distance) && this.isInProximity(y1, y2, distance));
	}
	
	this.isInProximity = function(x1, x2, distance){
		var x_diff = x1-x2;
		if (x_diff<0) x_diff = -1*x_diff;
		return (x_diff<distance);
	}
	
	// return point on graph that has min distance with given point
	this.findClosestPoint = function(xCanvas, yCanvas, xVals, yVals) {
		var minDistance = 999999, bestX = null, bestY = null;
		for (var i = 0; i<xVals.length; i++) {
			var dis = Math.sqrt(Math.pow(xCanvas - xVals[i], 2) + Math.pow(yCanvas - yVals[i], 2));
			if (dis < minDistance) {
				minDistance = dis;
				bestX = xVals[i];
				bestY = yVals[i];
			}
		}

		return {x:bestX,y:bestY};
	}
	
	this.clearBalloons = function(){
		$(".plotBalloon").hide();
	}
	
	this.clearPlotInfo = function(){
		this.pointsDraw = [];
		this.pointsDrawAttr = [];
		this.pointsDrawText = [];
		this.functionsInfo = [];
	}
	
	this.showBalloon = function(latex, x, y){
		
		if(!$.fn.showBalloon || !latex || latex.length == 0) {
			return;
		}
		
		this.balloonShowed = true;
		y += this.options["yBalloonOffset"];
		y = -1*y;
		
		var spans = "<div>";
		var lines = latex.split("<br/>");
		for (var idx in lines) {
			var line = lines[idx];
			spans += "<span class='mathquill-embedded-latex'>"+line+"</span><br/>";
		}
		spans+="</div>";
		
		this.graphJQ.showBalloon({
	   		 contents: spans, 
	   		 position: "top left",
	   		 classname: "plotBalloon",
	   		 offsetX: x,
	   		 offsetY: y,
	   		 delay: 0,
	   		 minLifetime: 0,
	   		 showDuration: 0, 
	   		 hideDuration: 0,
	   		 tipSize: 0,
	   		 css: {
	   			 'max-width': '200px',
	   			 opacity: "1",
	   			 'z-index':'1100',
	   		 }
	     });		
		
		$('.plotBalloon .mathquill-embedded-latex').mathquill();
	}

	this.mouseDown = function(event) {
		if(this.mouseButton == 0) {
			this.startDrag.x = event.pageX - this.canvasX;
			this.startDrag.y = event.pageY - this.canvasY;
		}
	}

	this.mouseUp = function(event) {
		$("#sy_graph").css("cursor", "default");
		this.mouseButton = 0;
		
		this.donePanning();
	}

	this.zoomIn = function(event){
		this.zoom(this.zoomFactor, event);
	}
    
    this.getNewValue = function (oldVal, selector) {
    	var val = parseFloat($(selector).val());
    	if (isFinite(val)){
    		return val;
    	}
    	return oldVal;
    }
        
    this.checkResetNeeded = function (updateSetting) {
		sy_graphSettings.showHomeButton();
    }
	
    
	this.zoomOut = function(event){
		this.zoom(-this.zoomFactor, event);
	}
	

	this.zoom = function(scale, event) {
		var range = this.getRange();
		
		var newCoords = jQuery.extend({}, this.currCoord);
		
		if(event) {
			var mousex = event.pageX - this.canvasX;
			var mousey = event.pageY - this.canvasY;
			var mousetop = 1-(mousey / this.height);	//if we divide the screen into two halves based on the position of the mouse, this is the top half
			var mouseleft = mousex / this.width;	//as above, but the left hald
			newCoords.x1 += range.x * scale * mouseleft;
			newCoords.y1 += range.y * scale * mousetop;
			newCoords.x2 -= range.x * scale * (1-mouseleft);
			newCoords.y2 -= range.y * scale * (1-mousetop);
		}
		else {
			newCoords.x1 += range.x * scale;
			newCoords.y1 += range.y * scale;
			newCoords.x2 -= range.x * scale;
			newCoords.y2 -= range.y * scale;
		}
		
		const eps = 0.1;
		if(newCoords.x2 - newCoords.x1 <= eps || newCoords.y2 - newCoords.y1 <= eps) {
			return;
		}

		this.currCoord = jQuery.extend({}, newCoords);
		sy_graphSettings.updateCoordinates();
		
		this.checkResetNeeded(true);
		this.draw(false);
	}
    
    window.graphG = this;
	
	
    this.plotPoints = function(){
		for(var i=0; i<this.pointsDraw.length;++i){
			var point = this.pointsDraw[i];
			var attr = this.pointsDrawAttr[i];
			this.adjustAttr(attr)
			this.drawPoint(point.x, point.y, attr.color, attr.borderColor);
		}
	}
    
	this.draw = function(calcPoints){
		this.clearBalloons();
		
		if (calcPoints) {
			this.clearPlotInfo();
		}
		this.drawGrid();
		this.drawFunctions();
		if (calcPoints) {
			this.drawPoints();
		}
		this.fillAreas();
		this.drawLines();
		if (calcPoints) {
			if (sy_graphSettings.cur().isDrawFunctionIntercepts.draw){
				this.drawFunctionIntersections();
			}
			if (sy_graphSettings.cur().isDrawExtreme.draw){
				this.drawExtremumPoints();
			}
			if (sy_graphSettings.cur().isDrawAxisIntercepts.draw){
				this.drawXIntersections();
				this.drawYIntersections();
			}
			
			if (this.tablePoints.length > 0){
				for (var i = 0; i < this.tablePoints.length; i++){
					this.pointsDraw.push(this.tablePoints[i]);
					this.pointsDrawText.push(this.tablePointsText[i]);
					this.pointsDrawAttr.push({'color' : this.tablePointsColor, 'borderColor': this.tablePointsColor});
				}
			}
			
			this.plotPoints();
		}
		
		//TODO: why is this here? it makes the nag screen appear every time the user tries to leave the page
		//$("#save").removeClass('nl-disabled');
	}
	
	this.init(this.width, this.height, this.options["pixelRatio"]);
	this.draw(true);
};


function SyCalc() {
	this.angles = "radians";
	this.loopcounter = 0;
	this.eps = calcEps();	//Machine epsilon - the maximum expected floating point error

	/* Basic Math Functions (sin, cos, csc, etc.)
	 */

	//This will take a number and covert it to radians, based on the current setting
	this.convAngles = function(value) {
		if(this.angles == "degrees")
			return value*(Math.PI/180);
		if(this.angles == "gradians")
			return value*(Math.PI/200);
		return value;
	}

	//This will take a radian value and convert it to the proper unit, based on the current setting
	this.convRadians = function(value) {
		if(this.angles == "degrees")
			return (value * 180 / Math.PI);
		if(this.angles == "gradians")
			return (value * 200 / Math.PI);
		return value;
	}

	this.sin = function(value) {
		return Math.sin(SyCalc.convAngles(value));
	}

	this.cos = function(value) {
		return Math.cos(SyCalc.convAngles(value));
	}

	this.tan = function(value) {
		return Math.tan(SyCalc.convAngles(value));
	}

	this.sec = function(value) {
		return (1 / Math.cos(SyCalc.convAngles(value)));
	}

	this.csc = function(value) {
		return (1 / Math.sin(SyCalc.convAngles(value)));
	}

	this.cot = function(value) {
		return (1 / Math.tan(SyCalc.convAngles(value)));
	}

	this.arcsin = function(value) {
		return SyCalc.convRadians(Math.asin(value));
	}

	this.arccos = function(value) {
		return SyCalc.convRadians(Math.acos(value));
	}

	this.arctan = function(value) {
		return SyCalc.convRadians(Math.atan(value));
	}
	
	this.arccsc = function(value) {
		return (SyCalc.convRadians(Math.asin(1/value)));
	}

	this.arcsec = function(value) {
		return SyCalc.convRadians(Math.acos(1/value));
	}

	this.arccot = function(value) {
		return (SyCalc.convRadians(value<0?(Math.atan(1/value)+Math.PI):Math.atan(1/value)));
	}

	this.pow = function(base, exp) {
		return Math.pow(base, exp);
	}

	this.sinh = function(value) {
		var ex = Math.exp(value);
		return (ex - (1 / ex)) / 2;
	}

	this.cosh = function(value) {
		var ex = Math.exp(value);
		return (ex + (1 / ex)) / 2;
	}

	this.tanh = function(value) {
		var ex2 = Math.exp(value * 2);
		return (ex2 - 1) / (ex2 + 1);
	}

	this.sech = function(value) {
		var ex = Math.exp(value);
		return 2 / (ex + (1 / ex));
	}

	this.csch = function(value) {
		var ex = Math.exp(value);
		return 2 / (ex - (1 / ex));
	}

	this.coth = function(value) {
		var ex2 = Math.exp(value * 2);
		return (ex2 + 1) / (ex2 - 1);
	}

	this.arcsinh = function(value) {
		return Math.log(value + Math.sqrt(value * value + 1));
	}

	this.arccosh = function(value) {
		return Math.log(value + Math.sqrt(value * value - 1));
	}

	this.arctanh = function(value) {
		return Math.log((1 + value) / (1 - value)) / 2;
	}

	this.arcsech = function(value) {
		return Math.log((1 + Math.sqrt(1 - value * value)) / value);
	}

	this.arccsch = function(value) {
		return Math.log((1 + Math.sqrt(value * value + 1)) / value);
	}

	this.arccoth = function(value) {
		return Math.log((value + 1) / (value - 1)) / 2;
	}

	/* Utility functions
	 */

	this.roundToSignificantFigures = function (num, n) {
	    if(num == 0) {
	        return 0;
	    }

	    d = Math.ceil(Math.log10(num < 0 ? -num: num));
	    power = n - d;

	    magnitude = Math.pow(10, power);
	    shifted = Math.round(num*magnitude);
	    return shifted/magnitude;
	}

	this.fixRoot = function(input) {
		var rootPos;
		while ((rootPos = input.indexOf("\\sqrt[")) >= 0){
			var pos = rootPos + 6;
			var pow = this.getBlock(input, pos, "[", "]");
			pos += pow.length;
			if (input.substr(pos, 2) !== "]{") break;
			pos += 2;
			var block = this.getBlock(input, pos, "{", "}");
			pos += block.length + 1;
			if (pow.length > 1) pow = "(" + pow + ")";
			input = input.replace(input.substring(rootPos, pos), "("+block+")^{1/"+pow+"}");
		}

		return input;
	}
	
	this.parseEquation = function(input, recur) {
		input = input.replace(/\\pi/g, '\u03c0');
		input = input.replace(/\\log_\{(.+?)\}\((.+?)\)/g, '(\\frac{\\ln($2)}{\\ln($1)})');
		input = input.replace(/\\ln(\\left\|.+?\\right\|)/g, '\\ln($1)');//Correct \ln|...| into \ln(|...|)
		input = input.replace(/\\left\|(.+?)\\right\|/g, '(\\abs($1))');
		input = input.replace(/\\lfloor(.+?)\\rfloor/g, '(\\floor($1))');
		input = input.replace(/\\lceil(.+?)\\rceil/g, '(\\ceil($1))');
		input = input.replace(/(\\ln|\\log|\\sin|\\cos|\\tan|\\cot|\\csc|\\sec|\\sinh|\\cosh|\\tanh|\\coth|\\csch|\\sech|\\arcsin|\\arccos|\\arctan|\\arccot|\\arccsc|\\arcsec|\\arcsinh|\\arccosh|\\arctanh|\\arccoth|\\arccsch|\\arcsech)\^\{(.+?)\}\((.+?)\)/g, '($1($3))^{$2}');
		
		input = this.fixRoot(input);
		
		var equation = input;
		var newequation = "";
		var lastchar = "";
		var i = 0;
		var isFunc = false;
		var func = "";

		for(i; i < equation.length; i++) {
			var currchar = equation[i];
			
			if(newequation.length == 0)
				lastchar = " ";
			else
				lastchar = newequation.substr(newequation.length - 1);
					
			var newlength = newequation.length;
			if(currchar.match(/[a-zA-Z\u03b8\u0398\u03b1\u03b2\u03c0]/)) {	//letter
				if (isFunc){
					func += currchar;
					continue;
				}
				
				if(lastchar == ")" || lastchar.match(/[0-9]/) || lastchar == "|" || lastchar.match(/[a-zA-Z\u03b8\u0398\u03b1\u03b2\u03c0]/))
					newequation += "*";
				newequation += currchar;
			}
			
			isFunc = false;
			if (func == "cdot") {
				newequation += "*";
				func = ""
			}
			if(currchar.match(/[0-9]/)) {	//number
				if(lastchar == ")" || lastchar.match(/[a-zA-Z\u03b8\u0398\u03b1\u03b2\u03c0]/) || lastchar == "|")
					newequation += "*";
				newequation += currchar;
			}

			else if(currchar.match(/\./)) {	//decimal
				if(!lastchar.match(/[0-9]/))
					newequation += "0";
				newequation += currchar;
			}

			else if(currchar.match(/\^/)) {	// ^ operator
				newequation += currchar;
				if (equation[i+1]==='{'){
					var block = this.getBlock(equation, i+2, "{", "}");
					i += block.length + 2;
					newequation += "(" + this.parseEquation(block) + ")";
				}				
				
			}
			
			else if(currchar.match(/[\*\/\-\+\%]/)) {	//operator
				newequation += currchar;
			}
			
			else if(currchar == "(") {
				if(lastchar == ")" || lastchar.match(/[a-zA-Z]/) || lastchar.match(/[0-9]/))
					newequation += "*";
				
				if (func != ""){
					newequation += func;
					func = "";
				}
				var block = this.getBlock(equation, i+1, "(", ")");
				newequation += "(" + this.parseEquation(block) + ")";
				i += block.length + 1;
			}
			
			else if(currchar == "{") {
				if (func === "frac"){
					var block1 = this.getBlock(equation, i+1, "{", "}");
					i += block1.length + 2; // to jump to the beginning of the next block
					
					var block2 = this.getBlock(equation, i+1, "{", "}");
					i += block2.length + 1;
					
					if(lastchar == ")" || lastchar.match(/[a-zA-Z]/) || lastchar.match(/[0-9]/))
						newequation += "*";
				
					newequation += "(" + this.parseEquation(block1) + ")/("+ this.parseEquation(block2) + ")";
					func = "";
				}
				else if (func == "sqrt"){
					var block1 = this.getBlock(equation, i+1, "{", "}");
					i += block1.length + 1;
					if(lastchar == ")" || lastchar.match(/[a-zA-Z]/) || lastchar == "|" || lastchar.match(/[0-9]/) )
						newequation += "*";
					newequation += "sqrt(" + this.parseEquation(block1) + ")";
					func = "";
				}
			}
			
			else if (currchar == "\\"){
				func = "";
				isFunc = true;
			}
		}

		return newequation;
	}

	this.getBlock = function(equation, i, leftParen, rightParen){
		var output = "";
		var depth = 1;
		for(i; i < equation.length; i++) {
			var currchar = equation[i];
			
			if (currchar == leftParen) {
				depth++;
			}
			else if(currchar == rightParen) {
				depth--;
			}
				
			if(depth == 0){
				return output;
			}
			
			output += currchar;
		}
		
		return output;
				
	}
	
	this.roundFloat = function(val) {	//Stupid flaoting point inprecision...
		return (Math.round(val * 100000000000) / 100000000000);
	}
};

/*
js-expression-eval
https://github.com/silentmatt/js-expression-eval

Based on ndef.parser, by Raphael Graf(r@undefined.ch)
http://www.undefined.ch/mparser/index.html
*/
var SyParse = (function (scope) {
	mchEps = calcEps() * 10;
	
	function object(o) {
		function F() {}
		F.prototype = o;
		return new F();
	}

	var TNUMBER = 0;
	var TOP1 = 1;
	var TOP2 = 2;
	var TVAR = 3;
	var TFUNCALL = 4;

	function Token(type_, index_, prio_, number_) {
		this.type_ = type_;
		this.index_ = index_ || 0;
		this.prio_ = prio_ || 0;
		this.number_ = (number_ !== undefined && number_ !== null) ? number_ : 0;
		this.toString = function () {
			switch (this.type_) {
			case TNUMBER:
				return this.number_;
			case TOP1:
			case TOP2:
			case TVAR:
				return this.index_;
			case TFUNCALL:
				return "CALL";
			default:
				return "Invalid Token";
			}
		};
	}

	function Expression(tokens, ops1, ops2, functions) {
		this.tokens = tokens;
		this.ops1 = ops1;
		this.ops2 = ops2;
		this.functions = functions;
	}

	// Based on http://www.json.org/json2.js
    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\'\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        meta = {    // table of character substitutions
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            "'" : "\\'",
            '\\': '\\\\'
        };

	function escapeValue(v) {
		if (typeof v === "string") {
			escapable.lastIndex = 0;
	        return escapable.test(v) ?
	            "'" + v.replace(escapable, function (a) {
	                var c = meta[a];
	                return typeof c === 'string' ? c :
	                    '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
	            }) + "'" :
	            "'" + v + "'";
		}
		return v;
	}

	Expression.prototype = {
		simplify: function (values) {
			values = values || {};
			var nstack = [];
			var newexpression = [];
			var n1;
			var n2;
			var f;
			var L = this.tokens.length;
			var item;
			var i = 0;
			for (i = 0; i < L; i++) {
				item = this.tokens[i];
				var type_ = item.type_;
				if (type_ === TNUMBER) {
					nstack.push(item);
				}
				else if (type_ === TVAR && (item.index_ in values)) {
					item = new Token(TNUMBER, 0, 0, values[item.index_]);
					nstack.push(item);
				}
				else if (type_ === TOP2 && nstack.length > 1) {
					n2 = nstack.pop();
					n1 = nstack.pop();
					f = this.ops2[item.index_];
					item = new Token(TNUMBER, 0, 0, f(n1.number_, n2.number_));
					nstack.push(item);
				}
				else if (type_ === TOP1 && nstack.length > 0) {
					n1 = nstack.pop();
					f = this.ops1[item.index_];
					item = new Token(TNUMBER, 0, 0, f(n1.number_));
					nstack.push(item);
				}
				else {
					while (nstack.length > 0) {
						newexpression.push(nstack.shift());
					}
					newexpression.push(item);
				}
			}
			while (nstack.length > 0) {
				newexpression.push(nstack.shift());
			}

			return new Expression(newexpression, object(this.ops1), object(this.ops2), object(this.functions));
		},

		/*
		substitute: function (variable, expr) {
			if (!(expr instanceof Expression)) {
				expr = new Parser().parse(String(expr));
			}
			var newexpression = [];
			var L = this.tokens.length;
			var item;
			var i = 0;
			for (i = 0; i < L; i++) {
				item = this.tokens[i];
				var type_ = item.type_;
				if (type_ === TVAR && item.index_ === variable) {
					for (var j = 0; j < expr.tokens.length; j++) {
						var expritem = expr.tokens[j];
						var replitem = new Token(expritem.type_, expritem.index_, expritem.prio_, expritem.number_);
						newexpression.push(replitem);
					}
				}
				else {
					newexpression.push(item);
				}
			}

			var ret = new Expression(newexpression, object(this.ops1), object(this.ops2), object(this.functions));
			return ret;
		},*/

		evaluate: function (values) {
			values = values || {};
			var nstack = [];
			var n1;
			var n2;
			var f;
			var L = this.tokens.length;
			var item;
			var i = 0;
			for (i = 0; i < L; i++) {
				item = this.tokens[i];
				var type_ = item.type_;
				if (type_ === TNUMBER) {
					nstack.push(item.number_);
				}
				else if (type_ === TOP2) {
					n2 = nstack.pop();
					n1 = nstack.pop();
					//Look ahead for cases where a negative number is raised by fractional power: (-27)^{1/3}. In this case, do not use
					//Math.pow (it will return NaN), use custom method.
					// This is done in order to plot functions like f(x)=x^{1/3} at x<0
					if (item.index_ == "/" && i<(L-1) && this.tokens[i+1].index_ == "^" && nstack[nstack.length-1]<0 && isInt(n2) && isInt(n1) && !isEven(n2)){
						var n0 = nstack.pop();
						nstack.push(fracRootOfNegNum(n0,n1,n2));
						i++;
					}
					else {
						f = this.ops2[item.index_];
						nstack.push(f(n1, n2));
					}
				}
				else if (type_ === TVAR) {
					if (item.index_ in values) {
						nstack.push(values[item.index_]);
					}
					else if (item.index_ in this.functions) {
						nstack.push(this.functions[item.index_]);
					}
					else {
						throw new Error("undefined variable: " + item.index_);
					}
				}
				else if (type_ === TOP1) {
					n1 = nstack.pop();
					f = this.ops1[item.index_];
					nstack.push(f(n1));
				}
				else if (type_ === TFUNCALL) {
					n1 = nstack.pop();
					f = nstack.pop();
					if (f.apply && f.call) {
						if (Object.prototype.toString.call(n1) == "[object Array]") {
							nstack.push(f.apply(undefined, n1));
						}
						else {
							nstack.push(f.call(undefined, n1));
						}
					}
					else {
						throw new Error(f + " is not a function");
					}
				}
				else {
					throw new Error("invalid Expression");
				}
			}
			if (nstack.length > 1) {
				throw new Error("invalid Expression (parity)");
			}
			return Math.round(nstack[0] / mchEps) * mchEps;
		},

		toString: function (toJS) {
			var nstack = [];
			var n1;
			var n2;
			var f;
			var L = this.tokens.length;
			var item;
			var i = 0;
			for (i = 0; i < L; i++) {
				item = this.tokens[i];
				var type_ = item.type_;
				if (type_ === TNUMBER) {
					nstack.push(escapeValue(item.number_));
				}
				else if (type_ === TOP2) {
					n2 = nstack.pop();
					n1 = nstack.pop();
					f = item.index_;
					if (toJS && f == "^") {
						nstack.push("Math.pow(" + n1 + "," + n2 + ")");
					}
					else {
						nstack.push("(" + n1 + f + n2 + ")");
					}
				}
				else if (type_ === TVAR) {
					nstack.push(item.index_);
				}
				else if (type_ === TOP1) {
					n1 = nstack.pop();
					f = item.index_;
					if (f === "-") {
						nstack.push("(" + f + n1 + ")");
					}
					else {
						nstack.push(f + "(" + n1 + ")");
					}
				}
				else if (type_ === TFUNCALL) {
					n1 = nstack.pop();
					f = nstack.pop();
					nstack.push(f + "(" + n1 + ")");
				}
				else {
					throw new Error("invalid Expression");
				}
			}
			if (nstack.length > 1) {
				throw new Error("invalid Expression (parity)");
			}
			return nstack[0];
		},

		variables: function () {
			var L = this.tokens.length;
			var vars = [];
			for (var i = 0; i < L; i++) {
				var item = this.tokens[i];
				if (item.type_ === TVAR && (vars.indexOf(item.index_) == -1)) {
					vars.push(item.index_);
				}
			}

			return vars;
		},

		toJSFunction: function (param, variables) {
			var f = new Function(param, "with(Parser.values) { return " + this.simplify(variables).toString(true) + "; }");
			return f;
		}
	};

	function add(a, b) {
		return Number(a) + Number(b);
	}
	function sub(a, b) {
		return a - b; 
	}
	function mul(a, b) {
		return a * b;
	}
	function div(a, b) {
		return a / b;
	}
	function mod(a, b) {
		return a % b;
	}
	function concat(a, b) {
		return "" + a + b;
	}
	//(arg)^{numer/denom} where arg is negative, numer and denom are integers and denom is odd.
	// In this case, a real root exists, return it and ignot the rest of the complex cases.
	// This is done in order to plot functions like f(x)=x^{1/3} at x<0
	function fracRootOfNegNum(arg, numer, denom) {
		var powDen = -Math.pow(-arg,1.0/denom);//--convert \sqrt[3](-27) to -\sqrt[3](27)
		return Math.pow(powDen, numer);
	}
	function neg(a) {
		return -a;
	}

	function isInt(num){
		return num%1===0;
	}
	function isEven(num){
		return num%2===0;
	}
	function random(a) {
		return Math.random() * (a || 1);
	}
	function fac(a) { //a!
		a = Math.floor(a);
		var b = a;
		while (a > 1) {
			b = b * (--a);
		}
		return b;
	}

	// TODO: use hypot that doesn't overflow
	function pyt(a, b) {
		return Math.sqrt(a * a + b * b);
	}

	function append(a, b) {
		if (Object.prototype.toString.call(a) != "[object Array]") {
			return [a, b];
		}
		a = a.slice();
		a.push(b);
		return a;
	}

	function Parser() {
		this.success = false;
		this.errormsg = "";
		this.expression = "";

		this.pos = 0;

		this.tokennumber = 0;
		this.tokenprio = 0;
		this.tokenindex = 0;
		this.tmpprio = 0;

		this.ops1 = {
			"sin": SyCalc.sin,
			"cos": SyCalc.cos,
			"tan": SyCalc.tan,
			"cot": SyCalc.cot,
			"sec": SyCalc.sec,
			"csc": SyCalc.csc,
			
			"arcsin": SyCalc.arcsin,
			"arccos": SyCalc.arccos,
			"arctan": SyCalc.arctan,
			"arccot": SyCalc.arccot,
			"arcsec": SyCalc.arcsec,
			"arccsc": SyCalc.arccsc,
			
			"sinh": SyCalc.sinh,
			"cosh": SyCalc.cosh,
			"tanh": SyCalc.tanh,
			"coth": SyCalc.coth,
			"sech": SyCalc.sech,
			"csch": SyCalc.csch,
			
			"arcsinh": SyCalc.arcsinh,
			"arccosh": SyCalc.arccosh,
			"arctanh": SyCalc.arctanh,
			"arccoth": SyCalc.arccoth,
			"arcsech": SyCalc.arcsech,
			"arccsch": SyCalc.arccsch,
			
			"sqrt": Math.sqrt,
			"log": Math.log10,
			"ln" : Math.log,
			"abs": Math.abs,
			"ceil": Math.ceil,
			"floor": Math.floor,
			"round": Math.round,
			"-": neg,
			"exp": Math.exp
		};

		this.ops2 = {
			"+": add,
			"-": sub,
			"*": mul,
			"/": div,
			"%": mod,
			"^": Math.pow,
			",": append,
			"||": concat
		};

		this.functions = {
			"random": random,
			"fac": fac,
			"min": Math.min,
			"max": Math.max,
			"pyt": pyt,
			"pow": Math.pow,
		};

		this.consts = {
			"e": Math.E,
			"pi": Math.PI,
			"\u03c0": Math.PI
		};
	}

	Parser.parse = function (expr) {
		return new Parser().parse(expr);
	};

	Parser.evaluate = function (parsedFunction, variables) {
		return parsedFunction.evaluate(variables);
	};

	Parser.Expression = Expression;

	Parser.values = {
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
		ln : Math.log,
		abs: Math.abs,
		ceil: Math.ceil,
		floor: Math.floor,
		round: Math.round,
		random: random,
		fac: fac,
		exp: Math.exp,
		min: Math.min,
		max: Math.max,
		pyt: pyt,
		pow: Math.pow,
		E: Math.E,
		PI: Math.PI
	};

	var PRIMARY  = 1 << 0;
	var OPERATOR = 1 << 1;
	var FUNCTION = 1 << 2;
	var LPAREN   = 1 << 3;
	var RPAREN   = 1 << 4;
	var COMMA    = 1 << 5;
	var SIGN     = 1 << 6;
	var CALL     = 1 << 7;

	Parser.prototype = {
		parse: function (expr) {
			this.errormsg = "";
			this.success = true;
			var operstack = [];
			var tokenstack = [];
			this.tmpprio = 0;
			var expected = (PRIMARY | LPAREN | FUNCTION | SIGN);
			var noperators = 0;
			this.expression = expr;
			this.pos = 0;

			while (this.pos < this.expression.length) {
				if (this.isOperator()) {
					if (this.isSign() && (expected & SIGN)) {
						if (this.isNegativeSign()) {
							this.tokenprio = 2;
							this.tokenindex = "-";
							noperators++;
							this.addfunc(tokenstack, operstack, TOP1);
						}
						expected = (PRIMARY | LPAREN | FUNCTION | SIGN);
					}
					else if (this.isComment()) {

					}
					else {
						if ((expected & OPERATOR) === 0) {
							this.error_parsing(this.pos, "unexpected operator");
						}
						noperators += 2;
						this.addfunc(tokenstack, operstack, TOP2);
						expected = (PRIMARY | LPAREN | FUNCTION | SIGN);
					}
				}
				else if (this.isNumber()) {
					if ((expected & PRIMARY) === 0) {
						this.error_parsing(this.pos, "unexpected number");
					}
					var token = new Token(TNUMBER, 0, 0, this.tokennumber);
					tokenstack.push(token);

					expected = (OPERATOR | RPAREN | COMMA);
				}
				else if (this.isString()) {
					if ((expected & PRIMARY) === 0) {
						this.error_parsing(this.pos, "unexpected string");
					}
					var token = new Token(TNUMBER, 0, 0, this.tokennumber);
					tokenstack.push(token);

					expected = (OPERATOR | RPAREN | COMMA);
				}
				else if (this.isLeftParenth()) {
					if ((expected & LPAREN) === 0) {
						this.error_parsing(this.pos, "unexpected \"(\"");
					}

					if (expected & CALL) {
						noperators += 2;
						this.tokenprio = -2;
						this.tokenindex = -1;
						this.addfunc(tokenstack, operstack, TFUNCALL);
					}

					expected = (PRIMARY | LPAREN | FUNCTION | SIGN);
				}
				else if (this.isRightParenth()) {
					if ((expected & RPAREN) === 0) {
						this.error_parsing(this.pos, "unexpected \")\"");
					}

					expected = (OPERATOR | RPAREN | COMMA | LPAREN | CALL);
				}
				else if (this.isComma()) {
					if ((expected & COMMA) === 0) {
						this.error_parsing(this.pos, "unexpected \",\"");
					}
					this.addfunc(tokenstack, operstack, TOP2);
					noperators += 2;
					expected = (PRIMARY | LPAREN | FUNCTION | SIGN);
				}
				else if (this.isConst()) {
					if ((expected & PRIMARY) === 0) {
						this.error_parsing(this.pos, "unexpected constant");
					}
					var consttoken = new Token(TNUMBER, 0, 0, this.tokennumber);
					tokenstack.push(consttoken);
					expected = (OPERATOR | RPAREN | COMMA);
				}
				else if (this.isOp2()) {
					if ((expected & FUNCTION) === 0) {
						this.error_parsing(this.pos, "unexpected function");
					}
					this.addfunc(tokenstack, operstack, TOP2);
					noperators += 2;
					expected = (LPAREN);
				}
				else if (this.isOp1()) {
					if ((expected & FUNCTION) === 0) {
						this.error_parsing(this.pos, "unexpected function");
					}
					this.addfunc(tokenstack, operstack, TOP1);
					noperators++;
					expected = (LPAREN);
				}
				else if (this.isVar()) {
					if ((expected & PRIMARY) === 0) {
						this.error_parsing(this.pos, "unexpected variable");
					}
					var vartoken = new Token(TVAR, this.tokenindex, 0, 0);
					tokenstack.push(vartoken);

					expected = (OPERATOR | RPAREN | COMMA | LPAREN | CALL);
				}
				else if (this.isWhite()) {
				}
				else {
					if (this.errormsg === "") {
						this.error_parsing(this.pos, "unknown character");
					}
					else {
						this.error_parsing(this.pos, this.errormsg);
					}
				}
			}
			if (this.tmpprio < 0 || this.tmpprio >= 10) {
				this.error_parsing(this.pos, "unmatched \"()\"");
			}
			while (operstack.length > 0) {
				var tmp = operstack.pop();
				tokenstack.push(tmp);
			}
			if (noperators + 1 !== tokenstack.length) {
				//print(noperators + 1);
				//print(tokenstack);
				this.error_parsing(this.pos, expr + ": parity " + noperators + 1 + ", " + tokenstack);
			}

			return new Expression(tokenstack, object(this.ops1), object(this.ops2), object(this.functions));
		},

		evaluate: function (expr, variables) {
			return this.parse(expr).evaluate(variables);
		},

		error_parsing: function (column, msg) {
			this.success = false;
			this.errormsg = "parse error [column " + (column) + "]: " + msg;
			throw new Error(this.errormsg);
		},

//\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

		addfunc: function (tokenstack, operstack, type_) {
			var operator = new Token(type_, this.tokenindex, this.tokenprio + this.tmpprio, 0);
			while (operstack.length > 0) {
				if (operator.prio_ <= operstack[operstack.length - 1].prio_) {
					tokenstack.push(operstack.pop());
				}
				else {
					break;
				}
			}
			operstack.push(operator);
		},

		isNumber: function () {
			var r = false;
			var str = "";
			while (this.pos < this.expression.length) {
				var code = this.expression.charCodeAt(this.pos);
				if ((code >= 48 && code <= 57) || code === 46) {
					str += this.expression.charAt(this.pos);
					this.pos++;
					this.tokennumber = parseFloat(str);
					r = true;
				}
				else {
					break;
				}
			}
			return r;
		},

		// Ported from the yajjl JSON parser at http://code.google.com/p/yajjl/
		unescape: function(v, pos) {
			var buffer = [];
			var escaping = false;

			for (var i = 0; i < v.length; i++) {
				var c = v.charAt(i);

				if (escaping) {
					switch (c) {
					case "'":
						buffer.push("'");
						break;
					case '\\':
						buffer.push('\\');
						break;
					case '/':
						buffer.push('/');
						break;
					case 'b':
						buffer.push('\b');
						break;
					case 'f':
						buffer.push('\f');
						break;
					case 'n':
						buffer.push('\n');
						break;
					case 'r':
						buffer.push('\r');
						break;
					case 't':
						buffer.push('\t');
						break;
					case 'u':
						// interpret the following 4 characters as the hex of the unicode code point
						var codePoint = parseInt(v.substring(i + 1, i + 5), 16);
						buffer.push(String.fromCharCode(codePoint));
						i += 4;
						break;
					default:
						throw this.error_parsing(pos + i, "Illegal escape sequence: '\\" + c + "'");
					}
					escaping = false;
				} else {
					if (c == '\\') {
						escaping = true;
					} else {
						buffer.push(c);
					}
				}
			}

			return buffer.join('');
		},

		isString: function () {
			var r = false;
			var str = "";
			var startpos = this.pos;
			if (this.pos < this.expression.length && this.expression.charAt(this.pos) == "'") {
				this.pos++;
				while (this.pos < this.expression.length) {
					var code = this.expression.charAt(this.pos);
					if (code != "'" || str.slice(-1) == "\\") {
						str += this.expression.charAt(this.pos);
						this.pos++;
					}
					else {
						this.pos++;
						this.tokennumber = this.unescape(str, startpos);
						r = true;
						break;
					}
				}
			}
			return r;
		},

		isConst: function () {
			var str;
			for (var i in this.consts) {
				if (true) {
					var L = i.length;
					str = this.expression.substr(this.pos, L);
					if (i === str) {
						this.tokennumber = this.consts[i];
						this.pos += L;
						return true;
					}
				}
			}
			return false;
		},

		isOperator: function () {
			var code = this.expression.charCodeAt(this.pos);
			if (code === 43) { // +
				this.tokenprio = 0;
				this.tokenindex = "+";
			}
			else if (code === 45) { // -
				this.tokenprio = 0;
				this.tokenindex = "-";
			}
			else if (code === 124) { // |
				if (this.expression.charCodeAt(this.pos + 1) === 124) {
					this.pos++;
					this.tokenprio = 0;
					this.tokenindex = "||";
				}
				else {
					return false;
				}
			}
			else if (code === 42) { // *
				this.tokenprio = 1;
				this.tokenindex = "*";
			}
			else if (code === 47) { // /
				this.tokenprio = 2;
				this.tokenindex = "/";
			}
			else if (code === 37) { // %
				this.tokenprio = 2;
				this.tokenindex = "%";
			}
			else if (code === 94) { // ^
				this.tokenprio = 3;
				this.tokenindex = "^";
			}
			else {
				return false;
			}
			this.pos++;
			return true;
		},

		isSign: function () {
			var code = this.expression.charCodeAt(this.pos - 1);
			if (code === 45 || code === 43) { // -
				return true;
			}
			return false;
		},

		isPositiveSign: function () {
			var code = this.expression.charCodeAt(this.pos - 1);
			if (code === 43) { // -
				return true;
			}
			return false;
		},

		isNegativeSign: function () {
			var code = this.expression.charCodeAt(this.pos - 1);
			if (code === 45) { // -
				return true;
			}
			return false;
		},

		isLeftParenth: function () {
			var code = this.expression.charCodeAt(this.pos);
			if (code === 40) { // (
				this.pos++;
				this.tmpprio += 10;
				return true;
			}
			return false;
		},

		isRightParenth: function () {
			var code = this.expression.charCodeAt(this.pos);
			if (code === 41) { // )
				this.pos++;
				this.tmpprio -= 10;
				return true;
			}
			return false;
		},

		isComma: function () {
			var code = this.expression.charCodeAt(this.pos);
			if (code === 44) { // ,
				this.pos++;
				this.tokenprio = -1;
				this.tokenindex = ",";
				return true;
			}
			return false;
		},

		isWhite: function () {
			var code = this.expression.charCodeAt(this.pos);
			if (code === 32 || code === 9 || code === 10 || code === 13) {
				this.pos++;
				return true;
			}
			return false;
		},

		isOp1: function () {
			var str = "";
			for (var i = this.pos; i < this.expression.length; i++) {
				var c = this.expression.charAt(i);
				if (c.toUpperCase() === c.toLowerCase()) {
					if (i === this.pos || c < '0' || c > '9') {
						break;
					}
				}
				str += c;
			}
			if (str.length > 0 && (str in this.ops1)) {
				this.tokenindex = str;
				this.tokenprio = 5;
				this.pos += str.length;
				return true;
			}
			return false;
		},

		isOp2: function () {
			var str = "";
			for (var i = this.pos; i < this.expression.length; i++) {
				var c = this.expression.charAt(i);
				if (c.toUpperCase() === c.toLowerCase()) {
					if (i === this.pos || c < '0' || c > '9') {
						break;
					}
				}
				str += c;
			}
			if (str.length > 0 && (str in this.ops2)) {
				this.tokenindex = str;
				this.tokenprio = 5;
				this.pos += str.length;
				return true;
			}
			return false;
		},

		isVar: function () {
			var str = "";
			for (var i = this.pos; i < this.expression.length; i++) {
				var c = this.expression.charAt(i);
				if (c.toUpperCase() === c.toLowerCase()) {
					if (i === this.pos || c < '0' || c > '9') {
						break;
					}
				}
				str += c;
			}
			if (str.length > 0) {
				this.tokenindex = str;
				this.tokenprio = 4;
				this.pos += str.length;
				return true;
			}
			return false;
		},

		isComment: function () {
			var code = this.expression.charCodeAt(this.pos - 1);
			if (code === 47 && this.expression.charCodeAt(this.pos) === 42) {
				this.pos = this.expression.indexOf("*/", this.pos) + 2;
				if (this.pos === 1) {
					this.pos = this.expression.length;
				}
				return true;
			}
			return false;
		}
	};

	scope.Parser = Parser;
	return Parser
})(typeof exports === 'undefined' ? {} : exports);
