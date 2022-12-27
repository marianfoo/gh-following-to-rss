/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/assert"],function(t){"use strict";var e={},r={};e.mixInto=function(e){t(!e.prototype.unstash,"StashedControlSupport: fnClass already has method 'unstash', sideeffects possible",e.getMetadata().getName());if(e.getMetadata().isA("sap.ui.core.Fragment")||e.getMetadata().isA("sap.ui.core.mvc.View")){throw new Error("Stashing is not supported for sap.ui.coreFragment or sap.ui.core.mvc.View")}a(e)};function a(t){t.prototype.unstash=function(){if(this.isStashed()){var t=n(this);t.stashed=false;return t}return this};t.prototype.isStashed=function(){return!!r[this.getId()]};var e=t.prototype.clone;t.prototype.clone=function(){if(this.isStashed()){throw new Error("A stashed control cannot be cloned, id: '"+this.getId()+"'.")}return e.apply(this,arguments)};var a=t.prototype.destroy;t.prototype.destroy=function(){delete r[this.getId()];a.apply(this,arguments)}}function n(t){var e;var a;var n;var o=r[t.getId()];e=t.getParent();if(e){n=e.getMetadata().getAggregation(t.sParentAggregationName);a=n.indexOf(e,t);n.remove(e,t)}t.destroy();var s=sap.ui.require("sap/ui/core/Component");var i=s&&e&&s.getOwnerComponentFor(e);var p;var u=o.fnCreate;if(i){p=i.runAsOwner(u)}else{p=u()}if(a>=0){p.forEach(function(t){n.insert(e,t,a)})}delete r[t.getId()];return p[0]}function o(t,e){var a=[];for(var n in r){var o=sap.ui.getCore().byId(r[n].wrapperId);var s=t?o:n;var i=o&&o.getParent();if(!e||i&&i.getId()===e){a.push(s)}}return a}e.getStashedControlIds=function(t){return o(false,t)};e.getStashedControls=function(t){return o(true,t)};e.createStashedControl=function(t){var e={wrapperId:t.wrapperId,fnCreate:t.fnCreate};r[t.wrapperId]=e;return e};return e});