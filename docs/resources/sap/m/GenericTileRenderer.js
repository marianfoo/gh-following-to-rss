/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/library","sap/base/security/encodeCSS","sap/ui/core/Configuration"],function(e,o,t){"use strict";var n=e.GenericTileMode;var a=e.LoadState;var s=e.FrameType;var r=e.ValueColor;var i={apiVersion:2};i.render=function(e,t){var i=t._getTooltipText();var l=t._getAriaText();var d=t.getHeaderImage();var c=t.hasListeners("press");var p=t.getState();var f=o("sapMGTState"+p);var g;var v=t.getFrameType();var T=t.getAriaRoleDescription();var h=t.getAriaRole();var S=v===s.OneByHalf||v===s.TwoByHalf;var M=t._sBGColor;var m=t._isIconMode()&&v===s.OneByOne;var u=t.getUrl()&&(!t._isInActionScope()||t.getMode()===n.IconMode)&&p!==a.Disabled&&!t._isNavigateActionEnabled()&&!t._isActionMode();if(t._isInActionScope()){g=o("sapMGTScopeActions")}else{g=o("sapMGTScopeDisplay")}if(u){e.openStart("a",t);e.attr("href",t.getUrl());e.attr("rel","noopener noreferrer");if(!this._isDragabble(t)){e.attr("draggable","false")}}else{e.openStart("div",t)}if(i&&p!==a.Loading){e.attr("title",i)}e.class("sapMGT");e.class(f);e.class(g);if(!t._isInActionScope()&&t._bShowActionsView){e.class("sapMGTScopeActions")}if(t._isIconMode()){if(v===s.OneByOne){var I="sapMGTOneByOne"}else if(v===s.TwoByHalf){var I="TwoByHalf"}}e.class(t._isIconMode()?I:v);var y=t.getMode()===n.ArticleMode,C=t.getMode()===n.ActionMode;if(C){e.class("sapMGTActionMode")}if(y){e.class("sapMGTArticleMode")}if(t._isIconMode()){e.class("sapMGTIconMode");if(this._isThemeHighContrast()){e.class("HighContrastTile")}}if(!y&&!C&&v!==s.OneByHalf&&(t.getSystemInfo()||t.getAppShortcut())){e.class("tileWithAppInfo")}if(t._isIconMode()){if(v===s.TwoByHalf){e.class("sapMGTTwoByHalf")}else if(v===s.OneByOne){if(!this._isThemeHighContrast()){e.style("background-color",M)}else{e.style("border-color",M);e.style("box-shadow","0 0 0 1px"+M)}}}if(h){e.attr("role",h)}else if(!u){e.attr("role",c?"button":"presentation")}else{e.attr("role","link")}if(p===a.Loaded){e.attr("aria-label",l)}if(T){e.attr("aria-roledescription",T)}if(p!==a.Disabled){if(!t.isInActionRemoveScope()&&t.getPressEnabled()){e.class("sapMPointer")}if(!t.getPressEnabled()){e.class("sapMAutoPointer")}e.attr("tabindex","0")}if(t.getWidth()){e.style("width",t.getWidth())}if(t.getBackgroundImage()){e.style("background-image","url('"+o(t.getBackgroundImage())+"')");e.class("sapMGTBackgroundImage")}if(t.getMode()===n.HeaderMode){e.class("sapMGTHeaderMode")}var _=t.getTileContent();var G=_.length;if(this._isNewsContentPresent(_,G)){e.class("sapMGTNewsContent")}e.openEnd();if(i){t.getAggregation("_invisibleText").setText(i);e.renderControl(t.getAggregation("_invisibleText"))}var B=false;var O=false;function H(e,o){if(v===s.OneByOne){e.openStart("div").class("sapMGTContentShimmerPlaceholderItemOneByOne");e.class("sapMGTContentShimmerPlaceholderWithDescriptionOneByOne");e.openEnd();e.openStart("div").class("sapMGTContentShimmerPlaceholderRowsOneByOne").openEnd();e.openStart("div").class("sapMGTContentShimmerPlaceholderIconOneByOne").class("sapMGTLoadingShimmer").openEnd().close("div");if(o){e.openStart("div").class("sapMGTContentShimmerPlaceholderItemTextOneByOne").class("sapMGTLoadingShimmer").openEnd().close("div")}}else{e.openStart("div").class("sapMGTContentShimmerPlaceholderItemTwoByHalf");e.class("sapMGTContentShimmerPlaceholderWithDescriptionTwoByHalf");if(!t.getIconLoaded()&&!o){e.class("sapMGTContentShimmerPlaceholderWithDescriptionTwoByHalfIconLoaded")}e.openEnd();e.openStart("div").class("sapMGTContentShimmerPlaceholderRowsTwoByHalf").openEnd();e.openStart("div").class("sapMGTContentShimmerPlaceholderIconTwoByHalf").class("sapMGTLoadingShimmer").openEnd().close("div");if(o){e.openStart("div").class("sapMGTContentShimmerPlaceholderItemTextTwoByHalf").class("sapMGTLoadingShimmer").openEnd().close("div")}}e.close("div");e.close("div")}if(p===a.Loading){if(t._isIconMode()){H(e,true)}else{e.openStart("div").class("sapMGTContentShimmerPlaceholderItem");e.class("sapMGTContentShimmerPlaceholderWithDescription");e.openEnd();e.openStart("div").class("sapMGTContentShimmerPlaceholderRows").openEnd();e.openStart("div").class("sapMGTContentShimmerPlaceholderItemHeader").class("sapMGTLoadingShimmer").openEnd().close("div");e.openStart("div").class("sapMGTContentShimmerPlaceholderItemText").class("sapMGTLoadingShimmer").openEnd().close("div");if(!S){for(var b=0;b<G;b++){e.renderControl(_[b])}}e.close("div");e.close("div")}}else{if(!C&&this._isValueColorValid(t.getValueColor())){e.openStart("div");e.class("sapMGTCriticalBorder");e.class(t.getValueColor());e.openEnd();e.close("div")}if(t._isIconMode()){if(!t.getIconLoaded()){H(e,false)}else{if(v===s.OneByOne){e.openStart("div");e.class("sapMGTHideOverflow");e.openEnd();e.openStart("div");e.class("sapMGTIconWrapper");e.openEnd()}e.openStart("div");if(v===s.OneByOne){e.class("sapMGTOneByOneIcon")}else{e.class("sapMGTTwoByHalfIcon");if(!this._isThemeHighContrast()){e.style("background-color",M)}else{e.class("HighContrastTile");e.style("border-color",M);e.style("box-shadow","0 0 0 1px"+M)}}e.openEnd();if(t.getTileIcon()){var A=t._generateIconAggregation(t.getTileIcon());if(A){e.renderControl(t.getAggregation(A))}}e.close("div")}}if(this._shouldRenderInfoContainer(t)&&v===s.TwoByHalf){e.openStart("div",t.getId()+"-wrapper").class("sapMGTWrapper").openEnd();e.openStart("div",t.getId()+"-wrapper-content").class("sapMGTWrapperCnt").openEnd()}e.openStart("div");e.class("sapMGTHdrContent");if(t._isIconMode()){if(v===s.OneByOne){var I="sapMGTOneByOne";if(!t.getIconLoaded()){I=I.concat(" sapMGTOneByOneIconLoaded")}}else if(v===s.TwoByHalf){var I="TwoByHalf"}}e.class(t._isIconMode()?I:v);if(i){e.attr("title",i)}if(C&&t.getFrameType()===s.TwoByOne&&d){e.class("sapMGTHdrImage")}e.openEnd();if(d){t._oImage.removeStyleClass(r.None);if(this._sPreviousStyleClass){t._oImage.removeStyleClass(this._sPreviousStyleClass)}this._sPreviousStyleClass=this._isValueColorValid(t.getValueColor())?t.getValueColor():r.None;t._oImage.addStyleClass(this._sPreviousStyleClass);e.renderControl(t._oImage)}this._renderHeader(e,t);if(m){e.close("div");e.close("div")}for(var b=0;b<G;b++){B=t._checkFooter(_[b],t)&&(_[b].getFooter()||_[b].getUnit());var E=_[b].getContent();if(E){if(v===s.OneByHalf&&E.getMetadata().getElementName()==="sap.m.ImageContent"){O=false}else{O=true;break}}}if(!(S&&O)&&t.getSubheader()){this._renderSubheader(e,t)}e.close("div");if(!t._isIconMode()){e.openStart("div",t.getId()+"-content");e.class("sapMGTContent");if(t.getSystemInfo()||t.getAppShortcut()){if(_.length===0){e.class("appInfoWithoutTileCnt")}if(B&&v!==s.OneByHalf){e.class("appInfoWithFooter")}else{e.class("appInfoWithoutFooter")}}e.openEnd();for(var b=0;b<G;b++){e.renderControl(_[b])}if(this._shouldRenderInfoContainer(t)&&v!==s.TwoByHalf){this._renderInfoContainer(e,t)}e.close("div")}if(this._shouldRenderInfoContainer(t)&&v===s.TwoByHalf){e.close("div");this._renderInfoContainer(e,t);e.close("div")}}if(p!==a.Loaded&&p!==a.Loading){this._renderStateOverlay(e,t,i)}if(p!==a.Disabled){this._renderHoverOverlay(e,t);this._renderFocusDiv(e,t)}if(t._isInActionScope()){this._renderActionsScope(e,t)}if(u){e.close("a")}else{e.close("div")}};i._isDragabble=function(e){var o=e.getDragDropConfig().some(function(o){return o.isDraggable(e)});if(!o){var t=e.getParent();if(t&&t.getDragDropConfig){o=t.getDragDropConfig().some(function(o){return o.isDraggable(e)})}}return o};i._shouldRenderInfoContainer=function(e){var o=e.getFrameType(),t=e.getMode()===n.ArticleMode,a=e.getMode()===n.ActionMode,r=e.getMode()===n.IconMode;if(o===s.OneByOne&&r){return true}return!t&&!a&&!r&&o!==s.OneByHalf&&(e.getSystemInfo()||e.getAppShortcut())};i._renderInfoContainer=function(e,o){e.openStart("div",o.getId()+"-tInfo");e.class("sapMGTTInfoContainer");e.openEnd();e.openStart("div",o.getId()+"-tInfo-content");e.class("sapMGTTInfo");e.openEnd();if(o.getAppShortcut()){e.openStart("div",o.getId()+"-appShortcutWrapper");e.class("sapMGTAppShortcutText").openEnd();e.renderControl(o._oAppShortcut);e.close("div")}if(o.getSystemInfo()){e.openStart("div",o.getId()+"-sytemInfoWrapper");e.class("sapMGTSystemInfoText").openEnd();e.renderControl(o._oSystemInfo);e.close("div")}e.close("div");e.close("div")};i._renderFocusDiv=function(e,o){e.openStart("div",o.getId()+"-focus");e.class("sapMGTFocusDiv");e.openEnd();e.close("div")};i._renderStateOverlay=function(e,o,t){var n=o.getState();e.openStart("div",o.getId()+"-overlay");e.class("sapMGTOverlay");if(t){e.attr("title",t)}e.openEnd();switch(n){case a.Loading:o._oBusy.setBusy(n==a.Loading);e.renderControl(o._oBusy);break;case a.Failed:e.openStart("div",o.getId()+"-failed-ftr");e.class("sapMGenericTileFtrFld");e.openEnd();e.openStart("div",o.getId()+"-failed-icon");e.class("sapMGenericTileFtrFldIcn");e.openEnd();e.renderControl(o._oWarningIcon);e.close("div");if(!o._isInActionScope()&&!o._bShowActionsView){e.openStart("div",o.getId()+"-failed-text");e.class("sapMGenericTileFtrFldTxt");e.openEnd();e.renderControl(o.getAggregation("_failedMessageText"));e.close("div")}e.close("div");break;default:}e.close("div")};i._renderActionsScope=function(e,o){if(o.getState()!==a.Disabled){e.renderControl(o._oRemoveButton);e.renderControl(o._oMoreIcon)}};i._renderHoverOverlay=function(e,o){e.openStart("div",o.getId()+"-hover-overlay");if(o.getBackgroundImage()){e.class("sapMGTWithImageHoverOverlay")}else{e.class("sapMGTWithoutImageHoverOverlay");if(o._isIconMode()){if(o.getFrameType()===s.OneByOne){e.style("border-radius","1rem")}else{e.style("border-radius","0.75rem")}}}e.openEnd();e.close("div")};i._renderHeader=function(e,o){e.openStart("div",o.getId()+"-hdr-text");e.class("sapMGTHdrTxt");if(o._isActionMode()&&this._isValueColorValid(o.getValueColor())){e.class("sapMGTCriticalHdrTxt");e.class(o.getValueColor())}e.openEnd();e.renderControl(o._oTitle);e.close("div")};i._renderSubheader=function(e,o){e.openStart("div",o.getId()+"-subHdr-text");e.class("sapMGTSubHdrTxt");e.openEnd();e.renderControl(o._oSubTitle);e.close("div")};i._isValueColorValid=function(e){if(e==r.Good||e==r.Error||e==r.Neutral||e==r.Critical){return true}return false};i._isThemeHighContrast=function(){return/(hcw|hcb)/g.test(t.getTheme())};i._isNewsContentPresent=function(e,o){var t=false;for(var n=0;n<o;n++){var a=e[n].getContent();if(a&&a.isA("sap.m.NewsContent")){t=true;break}}return t};return i},true);