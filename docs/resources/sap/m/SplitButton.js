/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/Control","./Button","./ButtonRenderer","sap/ui/core/EnabledPropagator","sap/ui/core/IconPool","sap/ui/core/library","./SplitButtonRenderer","sap/ui/events/KeyCodes"],function(t,e,r,o,i,n,a,s,p){"use strict";var u=a.TextDirection;var l=t.ButtonType;var c=e.extend("sap.m.SplitButton",{metadata:{interfaces:["sap.m.IOverflowToolbarContent"],library:"sap.m",properties:{text:{type:"string",group:"Misc",defaultValue:null},type:{type:"sap.m.ButtonType",group:"Appearance",defaultValue:l.Default},width:{type:"sap.ui.core.CSSSize",group:"Misc",defaultValue:null},enabled:{type:"boolean",group:"Behavior",defaultValue:true},icon:{type:"sap.ui.core.URI",group:"Appearance",defaultValue:null},activeIcon:{type:"sap.ui.core.URI",group:"Misc",defaultValue:null},iconDensityAware:{type:"boolean",group:"Misc",defaultValue:true},textDirection:{type:"sap.ui.core.TextDirection",group:"Appearance",defaultValue:u.Inherit}},aggregations:{_textButton:{type:"sap.m.Button",multiple:false,visibility:"hidden"},_arrowButton:{type:"sap.m.Button",multiple:false,visibility:"hidden"}},associations:{ariaDescribedBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaDescribedBy"},ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{press:{},arrowPress:{}}},renderer:s});i.call(c.prototype);c.prototype.onAfterRendering=function(){var t=this._getTextButton().$(),e=this._getArrowButton().$();t.attr("tabindex","-1");e.attr("tabindex","-1");t.removeAttr("title");e.removeAttr("title");t.removeAttr("aria-describedby");e.removeAttr("aria-describedby")};c.prototype._handleAction=function(t){if(t.getSource().hasStyleClass("sapMSBArrow")){this.fireArrowPress({keyboard:t.getParameter("keyboard")})}else{this.firePress({keyboard:t.getParameter("keyboard")})}};c.prototype.setArrowState=function(t){var e=this.getAggregation("_arrowButton");if(!e){return}if(t){e.$().addClass("sapMSBActive")}else{e.$().removeClass("sapMSBActive")}};c.prototype._getTextButton=function(){var t=this.getAggregation("_textButton");if(!t){t=new r({id:this.getId()+"-textButton",width:"100%",icon:this.getIcon(),text:this.getText(),press:this._handleAction.bind(this)}).addStyleClass("sapMSBText");this.setAggregation("_textButton",t)}return t};c.prototype._getArrowButton=function(){var t=this.getAggregation("_arrowButton");if(!t){t=new r({id:this.getId()+"-arrowButton",icon:"sap-icon://slim-arrow-down",press:this._handleAction.bind(this),tooltip:sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("SPLIT_BUTTON_ARROW_TOOLTIP"),ariaHasPopup:a.aria.HasPopup.Menu}).addStyleClass("sapMSBArrow");this.setAggregation("_arrowButton",t)}return t};c.prototype.setProperty=function(t,o,i){if(t==="type"&&(o===l.Up||o===l.Back||o===l.Unstyled)){return this}var n=e.prototype.setProperty.apply(this,arguments);if(t==="activeIcon"||t==="iconDensityAware"||t==="textDirection"){r.prototype.setProperty.apply(this._getTextButton(),arguments)}else if(t==="text"||t==="type"||t==="icon"){var a="set"+y(t);r.prototype[a].call(this._getTextButton(),o);if(t==="type"){r.prototype[a].call(this._getArrowButton(),o)}}return n};function y(t){return t.charAt(0).toUpperCase()+t.slice(1)}c.prototype.onkeydown=function(t){if(t.which===p.SPACE){t.preventDefault()}this._getTextButton().onkeydown(t)};c.prototype.onkeyup=function(t){this._getTextButton().onkeyup(t)};c.prototype.onsapup=function(t){this._getArrowButton().firePress({keyboard:true})};c.prototype.onsapdown=function(t){this._getArrowButton().firePress({keyboard:true})};c.prototype.onsapupmodifiers=function(t){this._getArrowButton().firePress({keyboard:true})};c.prototype.onsapdownmodifiers=function(t){this._getArrowButton().firePress({keyboard:true})};c.prototype.onsapshow=function(t){this._getArrowButton().firePress();t.preventDefault()};c.prototype.getButtonTypeAriaLabelId=function(){var t=this._getTextButton().getType();return o.getButtonTypeAriaLabelId(t)};c.prototype.getTitleAttributeValue=function(){var t=this.getTooltip_AsString(),e=n.getIconInfo(this.getIcon()),r;if(t||e&&e.text&&!this.getText()){r=t||e.text}return r};c.prototype.getOverflowToolbarConfig=function(){var t={canOverflow:true,propsUnrelatedToSize:["enabled","type","icon","activeIcon"],autoCloseEvents:["press"]};return t};return c});