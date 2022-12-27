/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/Device","sap/m/library","sap/ui/core/Configuration"],function(e,t,a){"use strict";var i=t.SwitchType;var n={apiVersion:2};n.CSS_CLASS="sapMSwt";n.render=function(t,i){var s=i.getState(),l=s?i._sOn:i._sOff,d=i.getTooltip_AsString(),r=i.getEnabled(),c=i.getName(),o=a.getAccessibility(),p=a.getAnimation(),f=n.CSS_CLASS;t.openStart("div",i);t.class(f+"Cont");if(!r){t.class(f+"ContDisabled")}if(r){t.attr("tabindex","0")}if(d){t.attr("title",d)}if(o){this.writeAccessibilityState(t,i)}t.openEnd();t.openStart("div",i.getId()+"-switch");t.attr("aria-hidden","true");t.class(f);if(p){t.class(f+"Trans")}t.class(s?f+"On":f+"Off");t.class(f+i.getType());if(e.system.desktop&&r){t.class(f+"Hoverable")}if(!r){t.class(f+"Disabled")}if(i._sOn===" "&&i._sOff===" "){t.class(f+"NoLabel")}t.openEnd();t.openStart("div",i.getId()+"-inner");t.class(f+"Inner");t.openEnd();this.renderText(t,i);this.renderHandle(t,i,l);t.close("div");t.close("div");if(c){this.renderCheckbox(t,i,l)}if(o){this.renderInvisibleElement(t,i,{id:i.getInvisibleElementId(),text:i.getInvisibleElementText(s)})}t.close("div")};n.renderText=function(e,t){var a=n.CSS_CLASS,s=t.getType()===i.Default;e.openStart("div",t.getId()+"-texton");e.class(a+"Text");e.class(a+"TextOn");e.openEnd();e.openStart("span");e.class(a+"Label");e.class(a+"LabelOn");e.openEnd();if(s){e.text(t._sOn)}e.close("span");e.close("div");e.openStart("div",t.getId()+"-textoff");e.class(a+"Text");e.class(a+"TextOff");e.openEnd();e.openStart("span");e.class(a+"Label");e.class(a+"LabelOff");e.openEnd();if(s){e.text(t._sOff)}e.close("span");e.close("div")};n.renderHandle=function(e,t,a){var i=n.CSS_CLASS;e.openStart("div",t.getId()+"-handle");e.attr("data-sap-ui-swt",a);e.class(i+"Handle");e.openEnd();e.close("div")};n.renderCheckbox=function(e,t,a){e.voidStart("input",t.getId()+"-input");e.attr("type","checkbox");e.attr("name",t.getName());e.attr("value",a);if(t.getState()){e.attr("checked","checked")}if(!t.getEnabled()){e.attr("disabled","disabled")}e.voidEnd()};n.writeAccessibilityState=function(e,t){var a=t.getAriaLabelledBy(),i;if(a){a={value:t.getInvisibleElementId(),append:true}}i={role:"switch",checked:t.getState(),labelledby:a};e.accessibilityState(t,i)};n.renderInvisibleElement=function(e,t,a){e.openStart("span",a.id);e.attr("aria-hidden","true");e.class("sapUiInvisibleText");e.openEnd();e.text(a.text);e.close("span")};return n},true);