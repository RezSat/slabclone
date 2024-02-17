
//TODO: migrate createAndShowTooltipTimout into here as well

function isTourRunning() {
	if((typeof hopscotch != 'undefined') && hopscotch.getCurrTour()) {
		return true;
	}
	
	return false;
}

//returns true if a point of interest tooltip was shown
function showPointOfInterest(selector, content, opts) {
	if(isTourRunning()) {
		return true;
	}

	try{
		opts = $.extend({
			side: "top",
			openTooltipOn: null,
			isDismissed: function() {
				return isTooltipInLocalStorage(selector);
			},
			onDismiss: function() {
				setTooltipInLocalStorage(selector);
			},
			actionable: false
		}, opts);

		if (!opts.isDismissed()){
			try{ $(selector).tooltipster('destroy'); } catch (err){ }

			$(selector).tooltipster({
				content: createPOIContent(selector, content, opts.onDismiss),
				theme: "tooltipster-light",
				interactive: true,
				trigger: "custom",
				triggerClose: {
					click: opts.actionable ? false : true
				},
				restoration: 'none',
				side: opts.side
			});

			closeOpenTooltips();

			if(opts.openTooltipOn) {
				opts.openTooltipOn.tooltipster('show');
			} else {
				$(selector).tooltipster('show');
			}
			return true;
		}
	}
	catch (err){
		
	}
	
	return false;
}

function createGotIt(onclick) {
	var gotItLink = $("<a />", {
		'class': "nl-smallGrayButton",
		click: onclick,
		text: i18n("Got it")
	});
	
	return gotItLink;
}

function createPOIContent(selector, content, dismissFunc) {
	var contentDiv = $("<div />", {
		html: content,
		css: {"display": "inline-block"}
	});
	
	var fullContent = $("<div />", {
		'class': "sy-tooltip-content"
	}).append(contentDiv);
	
	var gotIt = createGotIt(function() {
		dismissFunc();
		$(selector).tooltipster('hide');
	});
	
	fullContent.append(gotIt);
	
	return fullContent;
}

//TODO: "upgrade" and "signup" are very similar
function createUpgradeContent(selector, jq, content, type) {
	
	var contentDiv = $("<div />", {
		html: content,
		css: {"display": "inline-block"}
	});
	
	var fullContent = $("<div />", {
		'class': "sy-tooltip-content"
	}).append(contentDiv);
	
	var upgradeLink = $("<a />", {
		'class': "upgradeLink",
		click: function() {
			if (isUserLoggedIn()) {
				showSubscription(type);
			} else {
				showSignUp(type, true);
			}
			setTooltipUpgradeInLocalStorage(selector);
			jq.tooltipster('destroy');
		},
		text: i18n("Upgrade")
	});
	
	contentDiv.prepend("&nbsp;");
	contentDiv.prepend(upgradeLink);
	
	var gotIt = createGotIt(function() {
		setTooltipUpgradeInLocalStorage(selector);
		jq.tooltipster('hide');
	});
	
	fullContent.append(gotIt);
	
	return fullContent;
}

function createSigninContent(selector, jq, content, type) {
	var contentDiv = $("<div />", {
		html: content,
		css: {"display": "inline-block"}
	});
	
	var fullContent = $("<div />", {
		'class': "sy-tooltip-content"
	}).append(contentDiv);
	
	var signinLink = $("<a />", {
		'class': "upgradeLink",
		click: function() {
			showSignUp(type, false);
			setTooltipSignupInLocalStorage(selector);
			jq.tooltipster('destroy');
		},
		text: i18n("Sign up")
	});
	
	contentDiv.prepend("&nbsp;");
	contentDiv.prepend(signinLink);
	
	var gotIt = createGotIt(function() {
		setTooltipSignupInLocalStorage(selector);
		jq.tooltipster('hide');
	});
	
	fullContent.append(gotIt);
	
	return fullContent;
}

function createUpgradeTooltipOnly(jq, selector, type, content, side, checkLocalStorage){
	if (!checkLocalStorage || !isTooltipUpgradeInLocalStorage(selector)) {
		
		var contentJQ = createUpgradeContent(selector, jq, content, type); 
		try{ 
			jq.tooltipster('destroy'); 
		} catch(err) {}
	
		jq.tooltipster({
			content: contentJQ,
			theme: "tooltipster-light",
			interactive: true,
			trigger: "custom",
			restoration: 'none',
			side: (side != null ? side : "left")
		});
	
		closeOpenTooltips();
		try{  jq.tooltipster('show'); }catch(err){}
	
		return true;
	}
	return false;
}

function createSignupTooltipOnly(selector, type, content, side){
	
	var contentJQ =  createSigninContent(selector, $(selector), content, type);

	try{
		$(selector).tooltipster('destroy');
	} catch(err) {}

	$(selector).tooltipster({
		content: contentJQ,
		theme: "tooltipster-light",
		trigger: "custom",
		interactive: true,
		restoration: 'none',
		side: (side != null ? side: "left")

	});

	closeOpenTooltips();
	$(selector).tooltipster('show');
	return true;
}

function createUpgradeTooltip(selector, type, content, side) {
	if(isTourRunning()) {
		return;
	}
	
	if (false == createUpgradeTooltipOnly($(selector), selector, type, content, side)){
		if (isUserLoggedIn()) {
			showSubscription(type);
		}
		else{
			showSignUp(type, true);
		}
	}
}

function createUpgradeTooltip2(jq, selector, type, content, side){
	if(isTourRunning()) {
		return;
	}
	
	if (false == createUpgradeTooltipOnly(jq, selector, type, content, side)){
		if (isUserLoggedIn()) {
			showSubscription(type);
		}
		else{
			showSignUp(type, true);
		}
	}
}

function createSignupTooltip(selector, type, content, side){
	
	if(isTourRunning()) {
		return;
	}
	
	if (false == createSignupTooltipOnly(selector, type, content, side)){
		showSignUp(type, false);
	}
}

function isInLocalStorage(qualifier, selector) {
	return localStorage.getItem(qualifier + selector)
}

function setInLocalStorage(qualifier, selector) {
	localStorage.setItem(qualifier + selector, true)
}

function isTooltipInLocalStorage(selector) {
	return isInLocalStorage("tooltip", selector);
}

function setTooltipInLocalStorage(selector) {
	setInLocalStorage("tooltip", selector);
}

function isTooltipUpgradeInLocalStorage(selector) {
	return isInLocalStorage("tooltipUpgrade", selector);
}

function setTooltipUpgradeInLocalStorage(selector) {
	setInLocalStorage("tooltipUpgrade", selector);
}

function isTooltipSignupInLocalStorage(selector) {
	return isInLocalStorage("tooltipSignup", selector);
}

function setTooltipSignupInLocalStorage(selector) {
	setInLocalStorage("tooltipSignup", selector);
}

function closeOpenTooltips() {
	var instances = $.tooltipster.instances();
	$.each(instances, function(i, instance){
	    instance.close();
	});
}

