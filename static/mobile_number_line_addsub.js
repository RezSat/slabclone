
var SyNumberLineAddSubtract = function(graphjQuery, query, pixelRatio) {
	if (!(this.valid = this.isValid(query))){
		return;
	}

	this.graphJQ = $(graphjQuery);
	var canvas = this.graphJQ.get(0);

	this.ctx = canvas.getContext('2d');
	this.h = this.graphJQ.height();
	this.w = this.graphJQ.width();

    this.adjustedWidth = this.w * pixelRatio;
    this.adjustedHeight = this.h * pixelRatio;

    this.graphJQ.attr("height", this.adjustedHeight);
    this.graphJQ.attr("width", this.adjustedWidth);

    this.ctx.scale(pixelRatio, pixelRatio);

	this.arrowsMargin = this.h/5 - 1;
	this.lineThickness = 1;
	this.circleRadius = 3;
	this.markerWidth = 3;
	this.arrowLength = 10;

	this.lineColor = "#bcbcbc";
	this.textColor = "#333";

    this.redColor = "#dc3f59";
    this.greenColor = "#006666";

	this.drawLineNumber();
	this.drawMoves();
};


SyNumberLineAddSubtract.prototype = {
	float_fix : function(num) {
		return Math.round(num * 10000000  + 0.00000005)  / 10000000;
	},

	arbFloor : function(value, roundTo) {
		return Math.floor(value/roundTo)*roundTo;
	},
	
	isValid : function(query){
		var _ = this;

		query = query.replace(/\\left/, "");
		query = query.replace(/\\right/, "");
		query = query.replace(/\+\(-(\d+)\)/, "-$1");
		query = query.replace(/-\(-(\d+)\)/, "+$1");

		_.elements = query.split(/(\+|-)/);
		var ind;
		for (ind in _.elements){
			var element = _.elements[ind];
			if (element != '+' && element != '-' && (isNaN(parseInt(element)) || 
				isNaN(element) || element.indexOf('.') >= 0 || parseInt(element) > 20)){
				return false;
			}
		}

		if (!_.elements[0]) _.elements.shift();
		if (_.elements[0].match(/\d/)){
			_.elements.splice(0, 0, '+');
		}

		_.startLineRange = 0;
		_.endLineRange = 0;
		
		var value = 0;
		for (ind = 0; ind < _.elements.length; ind += 2) {
			var operator = _.elements[ind];
			var num = parseInt(_.elements[ind+1]);
			if (operator == '+') value += num;
			else value -= num;
			
			if (value > 20 || value < -20) return false;			
			while (value > _.endLineRange) _.endLineRange += 10;
			while (value < _.startLineRange) _.startLineRange -= 10;
		}
		
		_.endLineRange++;
		_.startLineRange--;
		_.totalLineRange = _.endLineRange - _.startLineRange;
		
		return true;
	},

	drawLineNumber : function(){
		var _ = this;
 		
 		// draw line
 		_.ctx.fillStyle = _.lineColor;
 		_.linePos = _.h/2;
 		_.ctx.fillRect (_.arrowLength / 2, _.linePos, _.w - _.arrowLength, _.lineThickness);
 		_.ctx.font = "12px Ubuntu";
 		_.ctx.textAlign = "center";
 		_.drawArrow(0, _.linePos, 270*Math.PI/180, _.lineColor);
 		_.drawArrow(_.w, _.linePos, 90*Math.PI/180, _.lineColor);

		
		var gridscaleMinorX = 1;
		var currx = -20;	
		
		var currxMajor = currx;
		while(true){
			xpos = ((currx-_.startLineRange)/_.totalLineRange)*_.w;	//position of the line (in pixels)
			if(xpos-0.5 > _.w + 1 || isNaN(xpos)) { //make sure it is on the screen
				break;
			}
			if(xpos < 0) {
				currx += gridscaleMinorX;
				continue;
			}
			currx = _.float_fix(currx);
			if (xpos > 10 && xpos <_.w - 10) {
				_.addMarkerOnLine(xpos, currx);
			}

			currx += gridscaleMinorX;
		}
	},

	addMarkerOnLine : function(xpos, num){
		num = Math.round(num * 100) / 100;
		var _ = this;
		_.ctx.fillStyle = _.lineColor;
 		_.ctx.fillRect (xpos - _.markerWidth / 2, _.linePos - _.markerWidth, _.markerWidth, _.markerWidth);
				
		var xtextwidth = _.ctx.measureText(num).width;
		if (xpos + xtextwidth * 0.5 > _.w) //cannot overflow the screen
			xpos = _.w - xtextwidth * 0.5 + 1;
		else 
			if (xpos - xtextwidth * 0.5 < 0) 
				xpos = xtextwidth * 0.5 + 1;

		_.ctx.fillText(num, xpos, _.linePos+15);
	},
	
	drawMoves: function(){
		var _ = this;
		var value = parseInt(_.elements[1]);
		if (_.elements[0] == '-') value *= -1;
		
		for (var ind = 2; ind < _.elements.length; ind += 2){
			var oldValue = value;
			var operator = _.elements[ind];
			var num = parseInt(_.elements[ind+1]);
			if (operator == '+') value += num;
			else value -= num;
			_.drawCurve(oldValue, value, operator == '+');
		}
		_.drawCircle(value, true);
	},
	
	drawCurve : function(x1, x2, addition){
		var _ = this;
		
		var text = Math.abs(x1 - x2);
		x1 = _.w * (x1 - _.startLineRange) / _.totalLineRange;
		x2 = _.w * (x2 - _.startLineRange) / _.totalLineRange;

		var curveOverUnder = 40;
		var textYPos = 20;
		if (addition) {
			_.ctx.strokeStyle = _.ctx.fillStyle = _.greenColor;
			curveOverUnder = curveOverUnder * (-1);
			text="+"+text;
		}else{
			_.ctx.strokeStyle = _.ctx.fillStyle  = _.redColor;
			text="-"+text;
			textYPos = _.h - 10;
		}

		var y_1 = _.h/2+curveOverUnder;
		var y_2 = _.h/2;
		var x_1 = x2;
		var x_2 = x1+(x2-x1)/2;
		var angle = Math.PI/2-Math.atan2(y_1-y_2, x_1-x_2);
		
		_.ctx.beginPath();
		_.ctx.lineWidth = _.lineWidth;
		_.ctx.moveTo(x1,_.h/2);
		_.ctx.quadraticCurveTo(x1+(x2-x1)/2,_.h/2+curveOverUnder,x2,_.h/2);
		_.ctx.fillText(text,x1+(x2-x1)/2,textYPos);
		_.ctx.stroke();
		_.drawArrow2(x2,_.h/2, angle, _.ctx.strokeStyle);
	},


	drawArrow: function(x, y, angle, color){
		var _ = this;
		_.ctx.save();
		_.ctx.beginPath();
		_.ctx.translate(x,y);
		_.ctx.rotate(angle);
		_.ctx.moveTo(0,0);
		_.ctx.lineTo(5, _.arrowLength);
		_.ctx.lineTo(-5, _.arrowLength);
		_.ctx.closePath();
		_.ctx.restore();
		_.ctx.fillStyle = color;
		_.ctx.fill();
		_.ctx.save();
	},

	drawArrow2: function(x, y, angle, color){
		var _ = this;
		_.ctx.save();
		_.ctx.translate(x,y);
		_.ctx.rotate(angle);
		_.ctx.moveTo(0,0);
		_.ctx.lineTo(5, _.arrowLength);
		_.ctx.moveTo(0,0);
		_.ctx.lineTo(-5, _.arrowLength);
		_.ctx.restore();
		_.ctx.stroke();
	},
	
	drawCircle : function(x, closed){
		var _ = this;
		x = _.w * (x - _.startLineRange) / _.totalLineRange;
		_.ctx.beginPath();
		_.ctx.arc(x, _.linePos, _.circleRadius, 0, Math.PI*2);
		_.ctx.lineWidth = _.lineWidth;
		_.ctx.strokeStyle = _.lineColor;
		_.ctx.stroke();
		_.ctx.fillStyle = "white";
		_.ctx.fill();
	}
};


