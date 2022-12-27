/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/model/ParseException","sap/ui/model/ValidateException"],function(t,i){"use strict";var e=new Map,n=/\.(\d+)$/,s=/\.$/,o=/0+$/;function r(t,i){return sap.ui.getCore().getLibraryResourceBundle().getText(t,i)}return function(a,u,m,l){function p(t,i){var n,s=this;if(this.mCustomUnits===undefined&&t&&t[2]!==undefined){if(t[2]===null){this.mCustomUnits=null}else{this.mCustomUnits=e.get(t[2]);if(!this.mCustomUnits){this.mCustomUnits={};Object.keys(t[2]).forEach(function(i){s.mCustomUnits[i]=s.getCustomUnitForKey(t[2],i)});e.set(t[2],this.mCustomUnits)}n={};n[m]=this.mCustomUnits;u.prototype.setFormatOptions.call(this,Object.assign(n,this.oFormatOptions))}}if(!t||t[0]===undefined||t[1]===undefined||this.mCustomUnits===undefined&&t[2]===undefined){return null}return u.prototype.formatValue.call(this,t.slice(0,2),i)}function c(){var t=u.prototype.getFormatOptions.call(this);delete t[m];return t}function h(){if(!this.bShowMeasure){return[1,2]}else if(!this.bShowNumber){return[0,2]}return[2]}function f(t){var e;if(!this.bShowNumber){e=t?r(l+".WithDecimals",[t]):r(l+".WithoutDecimals")}else{e=t?r("EnterNumberFraction",[t]):r("EnterInt")}return new i(e)}function d(i,e){var n;if(this.mCustomUnits===undefined){throw new t("Cannot parse value without customizing")}n=u.prototype.parseValue.apply(this,arguments);if(n[0]&&typeof n[0]==="string"&&n[0].includes(".")){n[0]=n[0].replace(o,"").replace(s,"")}return n}function w(t){var e,s,r,a=t[0],u=t[1];if(this.mCustomUnits===undefined){throw new i("Cannot validate value without customizing")}if(!a||!u||!this.mCustomUnits||this.oConstraints.skipDecimalsValidation){return}r=n.exec(a);s=r?r[1].replace(o,"").length:0;e=this.mCustomUnits[u].decimals;if(s>e){throw this.getValidateException(e)}}function g(t,i){var e=i?Object.keys(i):[];function n(t){if(t!=="skipDecimalsValidation"){throw new Error("Only 'skipDecimalsValidation' constraint is supported")}}if(t&&t[m]){throw new Error("Format option "+m+" is not supported")}e.forEach(n);if(arguments.length>2){throw new Error("Only parameters oFormatOptions and oConstraints are supported")}t=Object.assign({emptyString:0,parseAsString:true,unitOptional:!t||["showMeasure","showNumber"].every(function(i){return!(i in t)||t[i]})},t);i=Object.assign({},i);u.call(this,t,i);this.mCustomUnits=undefined;this.setConstraints=function(){throw new Error("Constraints are immutable")};this.setFormatOptions=function(){throw new Error("Format options are immutable")}}a._applyUnitMixin=g;a.formatValue=p;a.getFormatOptions=c;a.getPartsIgnoringMessages=h;a.getValidateException=f;a.parseValue=d;a.validateValue=w}});