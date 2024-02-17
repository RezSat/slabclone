// use the helper constructors below (fromNumberLineInfo/fromInStepImageUrl) instead of calling this
var SyNumberLine = function (targetElement, elementsToHide, numberLineInfo, inStepImageUrl) {

    this.valid = true;

    this.numberLineInfo = numberLineInfo;
    this.inStepImageUrl = inStepImageUrl;


    this.targetElement = targetElement;

    this.elementsToHide = elementsToHide;

    if (inStepImageUrl) {
        this.width = targetElement.width();

        this.drawInStepImage();
    } else {
        if (!numberLineInfo || !numberLineInfo.imageAPI) {
            this.valid = false;
            return;
        }

        this.width = targetElement.width() - 20;

        this.drawNumberLine();
    }
}

SyNumberLine.fromNumberLineInfo = function (targetElement, elementsToHide, numberLineInfo) {
    return new SyNumberLine(targetElement, elementsToHide, numberLineInfo, undefined);
};

SyNumberLine.fromInStepImageUrl = function (targetElement, elementsToHide, inStepImageUrl) {
    return new SyNumberLine(targetElement, elementsToHide, undefined, inStepImageUrl);
};

SyNumberLine.prototype = {
    uuid: function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    },

    drawNumberLine: function () {
        var _ = this;

        var id = "number-line-image";
        var div = $("<div>", {class: id, css: {padding: "0px"}});

        var emptyImg = "empty_number_line_img";
        var divEmptyImg = $("<div>", {class: emptyImg, css: {padding: "10px"}});
        _.targetElement.append(divEmptyImg);

        setTimeout(function () {
            var ratio = window.devicePixelRatio;
            var width = _.targetElement.width() - 20;
            //call for EmptyNumberLine first, instead of final image
            var url = _.numberLineInfo.imageAPI;
            var urlEmpty = url.replace("numberLineAddSubtract", "emptyNumberLineAddSubtract");
            requestImage(urlEmpty, emptyImg, width, ratio);
        }, 0);

        $("#playStopGifBtn").click(function (event) {
            if ($("#playStopGifBtn").hasClass("play_icon") || $("#playStopGifBtn").hasClass("replay")) {
                $("#playStopGifBtn").removeClass("play_icon");
                $("#playStopGifBtn").addClass("replay");
                _.restartNumberLine(event);
            }
        });

        setTimeout(function () {
            var ratio = window.devicePixelRatio;
            var width = _.targetElement.width() - 20;
            var url = _.numberLineInfo.imageAPI;
            if (_.numberLineInfo.animatedImageAPI != null) {
                // $("#playStopGifBtn").addClass("nl-show");
                // $("#playStopGifBtn").addClass("play_icon");
                url = _.numberLineInfo.animatedImageAPI;
            }

            _.targetElement.append(div);
            requestImage(url, id, width, ratio);
        }, 0);
    },

    restartNumberLine: function (event) {
        var img = $("#numberLine img");
        var existingSrc = img.attr("src");
        event.preventDefault();
        img.attr("src", "");
        img.attr("src", existingSrc);
    },

    drawInStepImage: function () {
        var _ = this;

        var ratio = window.devicePixelRatio;
        var url = _.inStepImageUrl;

        var id = _.uuid();
        var idEmpty = id + "_empty";

        var playStopBtn = $("<a />", {"class": "playStopGifBtn"});

        if(url.indexOf("multiply") < 0) {
            // don't add the restart button for "multiply" because there is no room
            _.targetElement.append(playStopBtn);
        }

        var solutionBox = $("<div />", {"class": "solution_box", css: {"margin-left": "0px", "border": "none"}});
        _.targetElement.append(solutionBox);

        var emptyImg = $("<img />", {"class": idEmpty, css: {"width": _.width, "margin": "auto", "display": "block"}});
        var emptyImgContainer = $("<div>", {
            "class": "empty_number_line_img",
            "css": {"padding-left": "0px", "padding-right": "0px"}
        });

        emptyImg.addClass("instepImage");

        emptyImgContainer.append(emptyImg);

        solutionBox.append(emptyImgContainer);
        solutionBox.css({"position": "relative"});

        var loaderImage = $("<img />", {src: "green_loader.svg"});
        var emptyImgLoader = $("<div>", {
            "class": "loader",
            "css": {position: "absolute", "left": (_.width / 2 - 16) + "px", top: "8px"}
        }).append(loaderImage);
        solutionBox.append(emptyImgLoader);

        var image = $("<img/>", {
            "class": id,
            css: {width: _.width, "margin": "auto", "display": "block"}
        });

        image.addClass("instepImage");

        _.targetElement.append(image);
        image.hide();

        playStopBtn.on("click", function(event) {
            if (playStopBtn.hasClass("play_icon") || playStopBtn.hasClass("replay")) {
                playStopBtn.removeClass("play_icon");
                playStopBtn.addClass("replay");
                _.restartNumberLineInStep(event, image);
            }
        });

        //call for EmptyNumberLine first, instead of final image
        var urlEmpty =
            url.replace("numberLineAddSubtractAnimated", "emptyNumberLineAddSubtract").replace("multiply", "emptyMultiply");

        requestImage(urlEmpty, idEmpty, _.width, ratio);
        requestImage(url, id, _.width, ratio);
    },

    restartNumberLineInStep: function (event, img) {
        var existingSrc = img.attr("src");
        event.preventDefault();
        img.attr("src", "");
        img.attr("src", existingSrc);
    }
};
