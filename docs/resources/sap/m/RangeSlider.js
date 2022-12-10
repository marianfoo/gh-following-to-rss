/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/InvisibleText","sap/base/Log","./Slider","./SliderUtilities","./RangeSliderRenderer","sap/ui/thirdparty/jquery","sap/ui/events/KeyCodes","sap/ui/core/Configuration"],function(t,e,i,a,o,n,s,l){"use strict";var r=i.extend("sap.m.RangeSlider",{metadata:{library:"sap.m",properties:{value2:{type:"float",group:"Data",defaultValue:100},range:{type:"float[]",group:"Data",defaultValue:[0,100]},progressBarSize:{type:"object",visibility:"hidden"},startHandlePressed:{type:"boolean",visibility:"hidden"},endHandlePressed:{type:"boolean",visibility:"hidden"}},designtime:"sap/m/designtime/RangeSlider.designtime"},renderer:o});r.prototype.init=function(){var e,a,o;i.prototype.init.call(this,arguments);this._bInitialRangeChecks=true;this._aInitialFocusRange=this.getRange();this._oResourceBundle=sap.ui.getCore().getLibraryResourceBundle("sap.m");this._ariaUpdateDelay=[];e=new t({text:this._oResourceBundle.getText("RANGE_SLIDER_LEFT_HANDLE")});a=new t({text:this._oResourceBundle.getText("RANGE_SLIDER_RIGHT_HANDLE")});o=new t({text:this._oResourceBundle.getText("RANGE_SLIDER_RANGE_HANDLE")});this.destroyAggregation("_handlesLabels",true);this.addAggregation("_handlesLabels",e);this.addAggregation("_handlesLabels",a);this.addAggregation("_handlesLabels",o);this._mHandleTooltip={start:{handle:null,tooltip:null,label:e},end:{handle:null,tooltip:null,label:a}}};r.prototype.exit=function(){i.prototype.exit.apply(this,arguments);this._oResourceBundle=null;this._aInitialFocusRange=null;this._liveChangeLastValue=null;this._mHandleTooltip.start.handle=null;this._mHandleTooltip.start.tooltip=null;this._mHandleTooltip.start.label=null;this._mHandleTooltip.end.handle=null;this._mHandleTooltip.end.tooltip=null;this._mHandleTooltip.end.label=null;this._ariaUpdateDelay=null};r.prototype.onBeforeRendering=function(){this._bRTL=l.getRTL();var t=this.getRange();if(this.getShowAdvancedTooltip()){this.initAndSyncTooltips(["leftTooltip","rightTooltip"]);this._storeTooltipsMetadata()}this._recalculateRange();this._bInitialRangeChecks=false;this._iDecimalPrecision=this.getDecimalPrecisionOfNumber(this.getStep());this.setRange(t);this._validateProperties();this._syncScaleUsage()};r.prototype.onAfterRendering=function(){i.prototype.onAfterRendering.apply(this,arguments);var t=this.getRange();this._mHandleTooltip.start.handle=this.getDomRef("handle1");this._mHandleTooltip.end.handle=this.getDomRef("handle2");this._recalculateStyles();this._updateHandle(this._mHandleTooltip.start.handle,t[0]);this._updateHandle(this._mHandleTooltip.end.handle,t[1]);if(this.getShowAdvancedTooltip()&&t[0]>t[1]){this._swapTooltips(t)}};r.prototype._storeTooltipsMetadata=function(){var t=this.getUsedTooltips();if(!this._mHandleTooltip.start.tooltip){this._mHandleTooltip.start.tooltip=t[0]}if(!this._mHandleTooltip.end.tooltip){this._mHandleTooltip.end.tooltip=t[1]}};r.prototype._recalculateRange=function(){var t,e=this.getValue(),i=this.getValue2(),a,o;t=[this._getPercentOfValue(this._bRTL?i:e),this._getPercentOfValue(this._bRTL?e:i)];a=Math.min.apply(Math,t)+"%";o=100-Math.max.apply(Math,t)+"%";this.setProperty("progressBarSize",{left:this._bRTL?o:a,right:this._bRTL?a:o})};r.prototype.getClosestHandleDomRef=function(t){var e=this._mHandleTooltip.start.handle,i=this._mHandleTooltip.end.handle,a=Math.abs(t.pageX-e.offsetLeft-this._fSliderPaddingLeft-this._fSliderOffsetLeft),o=Math.abs(t.clientX-i.offsetLeft-this._fSliderPaddingLeft-this._fSliderOffsetLeft);return a>o?i:e};r.prototype._getIndexOfHandle=function(t){if(t&&t.getAttribute&&t.getAttribute("data-range-val")==="start"){return 0}else if(t&&t.getAttribute&&t.getAttribute("data-range-val")==="end"){return 1}else{return-1}};r.prototype._getHandleForTooltip=function(t){var e=t===this._mHandleTooltip.start.tooltip?this._mHandleTooltip.start.handle:this._mHandleTooltip.end.handle;return e};r.prototype._updateHandle=function(t,e){var i=this._mHandleTooltip.start.handle===t?this._mHandleTooltip.start.tooltip:this._mHandleTooltip.end.tooltip,a=this.getRange(),o=this._getIndexOfHandle(t),n=this._getPercentOfValue(e);a[o]=e;this._updateRangePropertyDependencies(a);this._updateHandleDom(t,a,o,e,n);if(this.getShowAdvancedTooltip()){this._updateTooltipContent(i,e);this._adjustTooltipsContainer()}};r.prototype._updateHandleDom=function(t,e,i,a,o){var n,s=this.getRenderer().CSS_CLASS,l=this.getDomRef("input");if(this.getName()){l.setAttribute(t.getAttribute("data-range-val"),this.toFixed(e[i],this._iDecimalPrecision));l.setAttribute("value",this.getValue())}if(this._bRTL){t.style.right=o+"%"}else{t.style.left=o+"%"}if(this.getShowHandleTooltip()&&!this.getShowAdvancedTooltip()){t.title=this._formatValueByCustomElement(a)}n=e[0]===e[1];this.$("handle1").toggleClass(s+"HandleOverlap",n);this.$("handle2").toggleClass(s+"HandleOverlap",n);clearTimeout(this._ariaUpdateDelay[i]);this._ariaUpdateDelay[i]=setTimeout(this["_updateHandleAria"].bind(this,t,a),100)};r.prototype._updateHandleAria=function(t,e){var i=this.getRange(),a=this.getDomRef("progress"),o=this.toFixed(e,this._iDecimalPrecision),n=this._formatValueByCustomElement(o),s=this.getValue(),l=this.getValue2(),r=Math.abs(l-s);i[0]=this.toFixed(i[0],this._iDecimalPrecision);i[1]=this.toFixed(i[1],this._iDecimalPrecision);this._updateHandlesAriaLabels();this._updateHandleAriaAttributeValues(t,e,n);if(a){a.setAttribute("aria-valuetext",this._oResourceBundle.getText("RANGE_SLIDER_RANGE_ANNOUNCEMENT",i.map(this._formatValueByCustomElement,this)));a.setAttribute("aria-valuenow",r)}};r.prototype._updateHandlesAriaLabels=function(){var t=this.getRange(),e=this._mHandleTooltip.start.label;if(t[0]>t[1]&&!this._mHandleTooltip.bAriaHandlesSwapped||t[0]<t[1]&&this._mHandleTooltip.bAriaHandlesSwapped){this._mHandleTooltip.start.label=this._mHandleTooltip.end.label;this._mHandleTooltip.end.label=e;if(this._mHandleTooltip.start.handle){this._mHandleTooltip.start.handle.setAttribute("aria-labelledby",this._mHandleTooltip.start.label.getId())}if(this._mHandleTooltip.end.handle){this._mHandleTooltip.end.handle.setAttribute("aria-labelledby",this._mHandleTooltip.end.label.getId())}this._mHandleTooltip.bAriaHandlesSwapped=!this._mHandleTooltip.bAriaHandlesSwapped}};r.prototype._setAriaControls=function(){if(!this.getShowAdvancedTooltip()){return}if(!this._mHandleTooltip.start.handle.getAttribute("aria-controls")&&this._mHandleTooltip.start.tooltip){this._mHandleTooltip.start.handle.setAttribute("aria-controls",this._mHandleTooltip.start.tooltip.getId())}if(!this._mHandleTooltip.end.handle.getAttribute("aria-controls")&&this._mHandleTooltip.end.tooltip){this._mHandleTooltip.end.handle.setAttribute("aria-controls",this._mHandleTooltip.end.tooltip.getId())}};r.prototype._updateTooltipContent=function(t,e){var i=this.toFixed(e,this._iDecimalPrecision);if(t){t.setValue(parseFloat(i))}};r.prototype._swapTooltips=function(t){var e=this._mHandleTooltip.start.tooltip;var i=t[0]>=t[1]&&!this._mHandleTooltip.bTooltipsSwapped;var a=t[0]<t[1]&&this._mHandleTooltip.bTooltipsSwapped;if(i||a){this._mHandleTooltip.start.tooltip=this._mHandleTooltip.end.tooltip;this._mHandleTooltip.end.tooltip=e;this._updateTooltipContent(this._mHandleTooltip.start.tooltip,t[0]);this._updateTooltipContent(this._mHandleTooltip.end.tooltip,t[1]);if(this.getInputsAsTooltips()){this._mHandleTooltip.start.handle.setAttribute("aria-controls",this._mHandleTooltip.start.tooltip.getId());this._mHandleTooltip.end.handle.setAttribute("aria-controls",this._mHandleTooltip.end.tooltip.getId())}if(a){this._mHandleTooltip.bTooltipsSwapped=false}if(i){this._mHandleTooltip.bTooltipsSwapped=true}}};r.prototype._adjustTooltipsContainer=function(){var t=this.getAggregation("_tooltipContainer");if(!t.getDomRef()){return}t.repositionTooltips(this.getMin(),this.getMax());this._swapTooltips(this.getRange())};r.prototype.getUsedTooltips=function(){var t=this.getCustomTooltips(),e=this.getAggregation("_defaultTooltips")||[];return t.length>1?t:e};r.prototype.handleTooltipChange=function(t){this.updateTooltipsPositionAndState(t.getSource(),Number(t.getParameter("value")))};r.prototype.updateTooltipsPositionAndState=function(t,e,i){var a,o,n=this._mHandleTooltip.bTooltipsSwapped;e=this._adjustRangeValue(e);a=this._mHandleTooltip.start.tooltip===t?this._mHandleTooltip.start.handle:this._mHandleTooltip.end.handle;this._updateHandle(a,e);if(n!==this._mHandleTooltip.bTooltipsSwapped){o=this._mHandleTooltip.start.tooltip!==t?this._mHandleTooltip.start.tooltip:this._mHandleTooltip.end.tooltip;o.focus()}if(!i){this._fireChangeAndLiveChange({range:this.getRange()})}this.updateAdvancedTooltipDom()};r.prototype._updateDOMAfterSetters=function(t,e,i){var a,o;if(this.getDomRef()){a=this._getPercentOfValue(t);o=i===1?this._mHandleTooltip.end:this._mHandleTooltip.start;this._updateHandleDom(o.handle,e,i,t,a);if(this.getShowAdvancedTooltip()){this._updateTooltipContent(o.tooltip,t)}return true}return false};r.prototype.setRange=function(t){t=t.map(this._adjustRangeValue,this);this._updateRangePropertyDependencies(t);return this};r.prototype.setStep=function(t){this._validateProperties();this._iDecimalPrecision=this.getDecimalPrecisionOfNumber(t);return this.setProperty("step",t)};r.prototype.setValue=function(t){var e=this.getRange();if(typeof t!=="number"||!isFinite(t)){return this}t=this._adjustRangeValue(t);e[0]=t;this._updateRangePropertyDependencies(e);if(this.getShowAdvancedTooltip()&&this._mHandleTooltip.start.tooltip){this.updateTooltipsPositionAndState(this._mHandleTooltip.start.tooltip,t,true)}return this};r.prototype.setValue2=function(t){var e=this.getRange();t=this._adjustRangeValue(t);e[1]=t;this._updateRangePropertyDependencies(e);if(this.getShowAdvancedTooltip()&&this._mHandleTooltip.end.tooltip){this.updateTooltipsPositionAndState(this._mHandleTooltip.end.tooltip,t,true)}return this};r.prototype._updateRangePropertyDependencies=function(t){var e=Array.isArray(t)?t.slice():[],i=this._iDecimalPrecision?this._iDecimalPrecision:0,a=Number(e[0].toFixed(i)),o=Number(e[1].toFixed(i));if(this.getProperty("value")!==a){this.setProperty("value",a);e[0]=a}if(this.getProperty("value2")!==o){this.setProperty("value2",o);e[1]=o}this.setProperty("range",e)};r.prototype._calculateHandlePosition=function(t){var e=this.getMax(),i=this.getMin(),a;a=(t-this._fSliderPaddingLeft-this._fSliderOffsetLeft)/this._fSliderWidth*(e-i)+i;if(this._bRTL){a=this._convertValueToRtlMode(a)}return this._adjustRangeValue(a)};r.prototype._adjustRangeValue=function(t){var i=this.getMax(),a=this.getMin(),o=this.getStep(),n;if(this._bInitialRangeChecks){return t}n=Math.abs((t-a)%o);if(n!==0){t=n*2>=o?t+o-n:t-n}if(t<a){e.warning("Warning: "+"Min value ("+t+") not in the range: ["+a+","+i+"]",this);t=a}else if(t>i){e.warning("Warning: "+"Max value ("+t+") not in the range: ["+a+","+i+"]",this);t=i}if(!Number.isInteger(o)){t=parseFloat(t.toFixed(this._iDecimalPrecision))}return t};r.prototype.ontouchstart=function(t){var e=t.targetTouches[0],i=this.getRenderer().CSS_CLASS,o="."+i,s,l,r,h,p,d,g,u,_,f,c;if(!this.getEnabled()){return}t.setMarked();this._recalculateStyles();if(["number","text"].indexOf(t.target.type)>-1){return}r=this._calculateHandlePosition(e.pageX);p=this.getRange();h=[this._mHandleTooltip.start.handle,this._mHandleTooltip.end.handle];d=this._getIndexOfHandle(t.target);g=h.reduce(function(t,e){return Math.abs(t-e.offsetLeft)},0);s=Math.min.apply(Math,p);l=Math.max.apply(Math,p);c=this.$("handle1").outerWidth()/2;u=Math.abs(this.getMin())+Math.abs(this.getMax());_=c*100/this.$("inner").outerWidth();f=_/100*u;if(r<s||r<s+f||r>l||r>l-f||g<=a.CONSTANTS.RANGE_MOVEMENT_THRESHOLD){h=[this.getClosestHandleDomRef(e)];this._updateHandle(h[0],r);this.fireLiveChange({range:p})}else if(d!==-1){h=[this.getDomRef(d===0?"handle1":"handle2")]}n(document).on("touchend"+o+" touchcancel"+o+" mouseup"+o,this._ontouchend.bind(this,h)).on("touchmove"+o+(t.originalEvent.type!=="touchstart"?" mousemove"+o:""),this._ontouchmove.bind(this,r,this.getRange(),h));h.forEach(function(t){var e=t.getAttribute("data-ui5-handle-position")+"HandlePressed";if(!this.getProperty(e)){this.setProperty(e,true)}},this);if(h.length===2){setTimeout(function(){this.getDomRef("progress").focus()}.bind(this),0)}};r.prototype._ontouchmove=function(t,e,i,a){var o,n,s,l,r=a.targetTouches?a.targetTouches[0].pageX:a.pageX,h=this.getMax(),p=this.getMin(),d=[],g=[];a.preventDefault();a.setMarked();if(a.isMarked("delayedMouseEvent")||!this.getEnabled()||a.button){return}o=this._calculateHandlePosition(r)-t;for(var u=0;u<e.length;u++){d[u]=e[u]+o}g=this._getNormalizedRange(this.getRange(),e,i);n=d.every(function(t,e){return t===g[e]});s=d.every(function(t){return t>=p&&t<=h});l=g.indexOf(p)>-1||g.indexOf(h)>-1;if(!n){if(i.length===1||s||!l){i.map(function(t){this._updateHandle(t,e[this._getIndexOfHandle(t)]+o)},this)}this.getShowAdvancedTooltip()&&this._adjustTooltipsContainer();g=this._getNormalizedRange(this.getRange(),e,i)}this._triggerLiveChange();this.setRange(g)};r.prototype.updateAdvancedTooltipDom=function(){this.getAggregation("_tooltipContainer").repositionTooltips(this.getMin(),this.getMax())};r.prototype._triggerLiveChange=function(){var t,e=this.getRange();this._liveChangeLastValue=this._liveChangeLastValue||[];t=e.some(function(t,e){return t!==this._liveChangeLastValue[e]},this);if(t){this._liveChangeLastValue=e.slice();this.fireLiveChange({range:e})}};r.prototype._getNormalizedRange=function(t,e,i){var a=this.getMax(),o=this.getMin(),n=Math.abs(e[0]-e[1]),s=[],l,r;for(l=0;l<t.length;l++){s[l]=t[l]<o?o:t[l];s[l]=t[l]>a?a:s[l];if(i.length===2){if(s[0]==o){s[1]=s[0]+n}else{r=Math.abs(l-1);s[r]=s[l]<=o?s[l]+n:s[r];s[r]=s[l]>=a?s[l]-n:s[r]}}}return s};r.prototype._ontouchend=function(t,e){var i=this.getRange(),a=this.getRenderer().CSS_CLASS;e.setMarked();this.setProperty("startHandlePressed",false);this.setProperty("endHandlePressed",false);n(document).off("."+a);if(this._aInitialFocusRange[0]!==i[0]||this._aInitialFocusRange[1]!==i[1]){this._aInitialFocusRange=Array.prototype.slice.call(i);this.fireChange({range:i})}if(this.getShowAdvancedTooltip()){this._updateTooltipContent(this._mHandleTooltip.start.tooltip,i[0]);this._updateTooltipContent(this._mHandleTooltip.end.tooltip,i[1])}};r.prototype.onfocusin=function(t){var e=this.getAggregation("_tooltipContainer");if(this.getShowAdvancedTooltip()){e.show(this);this._adjustTooltipsContainer();this._setAriaControls()}if(document.activeElement!==this.getFocusDomRef()){this._aInitialFocusRange=this.getRange()}};r.prototype.getFocusDomRef=function(){if(this.getDomRef().contains(document.activeElement)){return document.activeElement}return this.getDomRef("progress")};r.prototype._updateSliderValues=function(t,e){var i=this.getRange(),a=this.getMax(),o=this.getMin(),n=Math.max.apply(null,i),s=Math.min.apply(null,i),l=this._getIndexOfHandle(e),r=t<0?-1:1,h=l>-1?[e]:[this._mHandleTooltip.start.handle,this._mHandleTooltip.end.handle];if(h.length===1){s=n=i[l]}if(n+t>a){t=r*(Math.abs(a)-Math.abs(n))}else if(s+t<o){t=Math.abs(s)-Math.abs(o);t=t<0?t:r*t}h.map(function(e){this._updateHandle(e,i[this._getIndexOfHandle(e)]+t)},this)};r.prototype.onkeydown=function(t){var e=this.getInputsAsTooltips(),i=this.getShowAdvancedTooltip(),o=t.keyCode===a.CONSTANTS.F2_KEYCODE,l=t.target===this._mHandleTooltip.start.handle,r=n(t.target).hasClass(a.CONSTANTS.HANDLE_CLASS);if(o&&i&&e&&r){this._mHandleTooltip[l?"start":"end"].tooltip.focus()}if(t.keyCode===s.SPACE){t.preventDefault()}};r.prototype.onsapincrease=function(t){t.preventDefault();t.setMarked();if(this.getEnabled()){this._updateSliderValues(this.getStep(),t.target);this._fireChangeAndLiveChange({range:this.getRange()})}};r.prototype.onsapplus=r.prototype.onsapincrease;r.prototype.onsapincreasemodifiers=function(t){if(t.altKey){return}t.preventDefault();t.stopPropagation();t.setMarked();if(this.getEnabled()){this._updateSliderValues(this._getLongStep(),t.target);this._fireChangeAndLiveChange({range:this.getRange()})}};r.prototype.onsappageup=r.prototype.onsapincreasemodifiers;r.prototype.onsapdecrease=function(t){t.preventDefault();t.setMarked();if(this.getEnabled()){this._updateSliderValues(-1*this.getStep(),t.target);this._fireChangeAndLiveChange({range:this.getRange()})}};r.prototype.onsapminus=r.prototype.onsapdecrease;r.prototype.onsapdecreasemodifiers=function(t){if(t.altKey){return}t.preventDefault();t.stopPropagation();t.setMarked();if(this.getEnabled()){this._updateSliderValues(-1*this._getLongStep(),t.target);this._fireChangeAndLiveChange({range:this.getRange()})}};r.prototype.onsappagedown=r.prototype.onsapdecreasemodifiers;r.prototype.onsaphome=function(t){var e=0,i,a,o;t.setMarked();t.preventDefault();e=this._getIndexOfHandle(t.target);i=this.getRange()[e];o=this.getMin();if(this.getEnabled()&&i!==o){a=e===1?this._mHandleTooltip.end:this._mHandleTooltip.start;this._updateHandle(a.handle,o);this._fireChangeAndLiveChange({range:this.getRange()})}};r.prototype.onsapend=function(t){t.setMarked();t.preventDefault();if(this.getEnabled()){this._updateSliderValues(this.getMax(),t.target);this._fireChangeAndLiveChange({range:this.getRange()})}};r.prototype.onsapescape=function(){this.setRange(this._aInitialFocusRange);this._fireChangeAndLiveChange({range:this.getRange()})};return r});