/**
 * ------------------------------------------------------------------------
 * More Imports
 * ------------------------------------------------------------------------
 */

// SVG Injector
import SVGInjector from "svg-injector";

// Swiper
import Swiper from "swiper/bundle";

// Popper Js
import { computeStyles, left } from "@popperjs/core";

/**
 * ------------------------------------------------------------------------
 * Rahisi Functions
 * ------------------------------------------------------------------------
 */

(function ($) {
  "use strict";

  const windowEl = window,
    html = document.html,
    body = document.body,
    bgImgsEls = document.querySelectorAll(".bg-img"),
    svgEls = document.querySelectorAll("svg"),
    svgImgInjectees = document.querySelectorAll('[data-svg-inject="true"]'),
    bgShapes = document.querySelectorAll(".bg-shape"),
    stickyColumns = document.querySelectorAll(".js-sticky-column"),
    videos = document.querySelectorAll(".js-media-player video"),
    audios = document.querySelectorAll(".js-media-player audio"),
    btnExpandableEls = document.querySelectorAll(".btn-expandable"),
    iframePopUpEls = document.querySelectorAll(".js-iframe-pop-up"),
    jsSliderWrappers = document.querySelectorAll(".js-slider-wrap"),
    arrSum = (arr) => arr.reduce((a, b) => a + b, 0),
    nodeToArrayConverter = (nodelist) => Array.prototype.slice.call(nodelist),
    whichAnimationEvent = () => {
      let t,
        el = document.createElement("fakeelement");

      let animations = {
        animation: "animationend",
        WebkitAnimation: "webkitAnimationEnd",
        MozAnimation: "mozAnimationEnd",
      };

      for (t in animations) {
        if (el.style[t] !== undefined) {
          return animations[t];
        }
      }
    },
    getVendorPrefix = (arrayOfPrefixes) => {
      let tmp = document.createElement("div");
      let result = "";

      for (let i = 0; i < arrayOfPrefixes.length; ++i) {
        if (typeof tmp.style[arrayOfPrefixes[i]] != "undefined") {
          result = arrayOfPrefixes[i];
          break;
        } else {
          result = null;
        }
      }

      return result;
    },
    animationDelayPrefix = getVendorPrefix([
      "animationDelay",
      "webkitAnimationDelay",
      "mozAnimationDelay",
      "oAnimationDelay",
    ]),
    animationDurationPrefix = getVendorPrefix([
      "animationDuration",
      "webkitAnimationDuration",
      "mozAnimationDuration",
      "oAnimationDuration",
    ]),
    transformPrefix = getVendorPrefix([
      "transform",
      "msTransform",
      "MozTransform",
      "WebkitTransform",
      "OTransform",
    ]),
    svgScaling = (el) => {
      let svgParent = ".svg-scaler";

      if ($(el).closest(svgParent).length > 0) {
        let svgEl = el,
          svgElViewBox = svgEl.getAttribute("viewBox"),
          svgElViewBoxArray =
            svgElViewBox.search(",") === -1
              ? svgElViewBox.split(" ")
              : svgElViewBox.split(","),
          svgWidth = svgElViewBoxArray[2],
          svgHeight = svgElViewBoxArray[3],
          svgRatio = (100 * svgHeight) / svgWidth;

        $(svgEl)
          .closest(svgParent)
          .css({
            paddingBottom: svgRatio + "%",
          });
      }
    },
    doAnimations = (elements, prefix = "animate__") => {
      let animationEndEvents = whichAnimationEvent();
      elements.each(function () {
        let $this = $(this),
          animationName = `${prefix}${$this.data("animation")}`,
          animationDuration = $this.data("animation-duration"),
          animationDelay = $this.data("animation-delay"),
          animationClasses = `${prefix}animated ${animationName}`;

        $this[0].style[animationDelayPrefix] = animationDelay;
        $this[0].style[animationDurationPrefix] = animationDuration;

        $this.addClass(animationClasses).one(animationEndEvents, function () {
          $this.removeClass(animationClasses);
        });
      });
    },
    zeroStartView = (num) =>
      parseInt(num) > 9 ? parseInt(num) : `0${parseInt(num)}`,
    imgToBg = (el) => {
      let $img = $(el).find("img"),
        imgUrl = $img.attr("src");

      $(el).css({
        backgroundImage: `url("${imgUrl}")`,
      });

      $img.hide();
    },
   

  const app = {
    appinit: () => {      
      app.bgImgs();
      app.svgInjector();
      app.svgScaling();
      app.bgShapesPosition();
      app.btnExpanding();
      app.iframePopUp();
      app.stickyColumns();
      app.slider();
    },   
    bgImgs: () => {
      let allBgImgsConts = [],
        bgImgsArray = nodeToArrayConverter(bgImgsEls);

      allBgImgsConts = allBgImgsConts.concat(bgImgsArray);

      allBgImgsConts.forEach((bgImgCont) => {
        imgToBg(bgImgCont);
      });
    },
    svgInjector: () => {
      if (svgImgInjectees.length) {
        let svgImgInjecteesArray = nodeToArrayConverter(svgImgInjectees);

        svgImgInjecteesArray.forEach((svgImgInjectee) => {
          let svgImgInjecteeWidth = svgImgInjectee.getAttribute("width"),
            svgImgInjecteeHeight = svgImgInjectee.getAttribute("height");

          let injectorOptions = {
            afterEach(error, svg) {
              svgScaling(svg);

              if (svgImgInjecteeWidth && svgImgInjecteeHeight != null) {
                svg.setAttribute("width", svgImgInjecteeWidth);
                svg.setAttribute("height", svgImgInjecteeHeight);
              }
            },
          };

          SVGInjector(svgImgInjectee, injectorOptions);
        });
      }
    },
    svgScaling: () => {
      let svgElsArray = nodeToArrayConverter(svgEls);

      svgElsArray.forEach((svgEl) => {
        svgScaling(svgEl);
      });
    },
    btnExpanding: () => {
      if (btnExpandableEls.length) {
        let btnExpandableElsArray = nodeToArrayConverter(btnExpandableEls);

        btnExpandableElsArray.forEach((btnExpandableEl) => {
          let $btnExpandableEl = $(btnExpandableEl);
          let $expandableText = $btnExpandableEl.find(".expandable-text");
          let expandableWidth = $expandableText.outerWidth();
          let $expandableTextWrapper = $expandableText.closest(
            ".expandable-text-wrap"
          );
          $expandableTextWrapper.css({
            width: "0px",
          });

          $btnExpandableEl.hover(
            function () {
              $expandableTextWrapper.css({
                width: `${expandableWidth}px`,
              });
            },
            function () {
              $expandableTextWrapper.css({
                width: "0px",
              });
            }
          );
        });
      }
    },
    iframePopUp: () => {
      if (iframePopUpEls.length) {
        let iframePopUpElsArray = nodeToArrayConverter(iframePopUpEls);

        iframePopUpElsArray.forEach((iframePopUpEl) => {
          let $iframePopUpEl = $(iframePopUpEl);
          let iframePopUpElCustomOptionsAttr = $iframePopUpEl.attr(
            "data-modal-settings"
          );
          let iframePopUpElCustomOptions =
            iframePopUpElCustomOptionsAttr == null ||
            iframePopUpElCustomOptionsAttr === ""
              ? {}
              : JSON.parse(iframePopUpElCustomOptionsAttr);

          const magnificPopUpSettings = {
            default: {
              disableOn: 500,
              type: "iframe",
              mainClass: "mfp-fade",
              removalDelay: 160,
              preloader: false,
              fixedContentPos: false,
            },
            custom: iframePopUpElCustomOptions,
            get settings() {
              return $.extend({}, this.default, this.custom);
            },
          };

          $iframePopUpEl.magnificPopup(magnificPopUpSettings.settings);
        });
      }
    },
    bgShapesPosition: () => {
      if (bgShapes.length) {
        let bgShapesArray = nodeToArrayConverter(bgShapes);

        bgShapesArray.forEach((bgShape) => {
          let topPositionVal = bgShape.getAttribute("data-top-pos"),
            leftPositionVal = bgShape.getAttribute("data-left-pos"),
            bottomPositionVal = bgShape.getAttribute("data-bottom-pos"),
            rightPositionVal = bgShape.getAttribute("data-right-pos"),
            rotateVal = bgShape.getAttribute("data-rotate"),
            widthVal = bgShape.getAttribute("data-width"),
            heightVal = bgShape.getAttribute("data-height"),
            opacity = bgShape.getAttribute("data-opacity");

          bgShape.style.opacity = opacity != null ? opacity : 1;
          bgShape.style.top = topPositionVal;
          bgShape.style.left = leftPositionVal;
          bgShape.style.bottom = bottomPositionVal;
          bgShape.style.right = rightPositionVal;
          bgShape.style.width = widthVal;
          bgShape.style.height = heightVal;
          bgShape.style[transformPrefix] = "rotate(" + rotateVal + ")";
        });
      }
    },
    stickyColumns: () => {
      if (stickyColumns.length) {
        let stickyColumnsArray = nodeToArrayConverter(stickyColumns);

        stickyColumnsArray.forEach((stickyColumn) => {
          let $stickyColumn = $(stickyColumn),
            offsetTopVal = stickyColumn.getAttribute("data-offset-top");

          $stickyColumn.wrapInner('<div class="theiaStickySidebar"/>');

          $stickyColumn.theiaStickySidebar({
            additionalMarginTop:
              offsetTopVal == null || offsetTopVal === ""
                ? 30
                : parseInt(offsetTopVal),
          });
        });
      }
    }, 
    slider: () => {
    
    }
  
  };

  $(document).ready(() => {
    app.appinit();
  });
})(jQuery);
