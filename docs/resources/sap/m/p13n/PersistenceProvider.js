/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","sap/ui/fl/variants/VariantManagement","sap/ui/fl/Utils","sap/m/p13n/enum/PersistenceMode","sap/ui/layout/VerticalLayout"],function(e,t,o,i,r){"use strict";var s=e.extend("sap.m.p13n.PersistenceProvider",{metadata:{library:"sap.m",designtime:"sap/ui/mdc/designtime/p13n/PersistenceProvider.designtime",properties:{mode:{type:"sap.m.p13n.enum.PersistenceMode",group:"Data",defaultValue:i.Auto}},associations:{for:{type:"sap.ui.core.Control",multiple:true}}},renderer:{apiVersion:2,render:function(e,t){e.openStart("div",t);e.openEnd();e.close("div")}}});s.prototype.init=function(){e.prototype.init.apply(this,arguments);this.attachModelContextChange(this._setModel,this);this._oModelPromise=new Promise(function(e,t){this._fnResolveModel=e}.bind(this))};s.prototype._setModel=function(){var e=this.getModel(o.VARIANT_MODEL_NAME);if(e){this._fnResolveModel(e)}};s.prototype.applySettings=function(){e.prototype.applySettings.apply(this,arguments);this._bmodeLocked=true;if(this.getMode()===i.Transient){var s=new t(this.getId()+"--vm",{for:this.getAssociation("for")});this._oModelPromise.then(function(e){s.setModel(e,o.VARIANT_MODEL_NAME)});this._oWrapper=new r(this.getId()+"--accWrapper",{visible:true,content:[s]});this._oWrapper.onAfterRendering=function(){r.prototype.onAfterRendering.apply(this,arguments);this.getDomRef().setAttribute("aria-hidden",true)};var n=sap.ui.getCore().getUIArea(sap.ui.getCore().getStaticAreaRef());n.addContent(this._oWrapper)}return this};s.prototype.addFor=function(e){this.addAssociation("for",e);var t=sap.ui.getCore().byId(this.getId()+"--vm");if(this.getMode()===i.Transient&&t){t.addFor(e)}return this};s.prototype.removeFor=function(e){this.removeAssociation("for",e);var t=sap.ui.getCore().byId(this.getId()+"--vm");if(this.getMode()===i.Transient&&t){t.removeFor(e)}return this};s.prototype.setMode=function(e){if(this._bmodeLocked&&e!==this.getMode()){throw new Error("mode is a final property.")}this.setProperty("mode",e);return this};s.prototype.exit=function(){if(this._oWrapper){var t=sap.ui.getCore().getUIArea(sap.ui.getCore().getStaticAreaRef());t.removeContent(this._oWrapper);this._oWrapper.destroy();this._oWrapper=null}this._oModelPromise=null;this._fnResolveModel=null;this._bmodeLocked=null;e.prototype.exit.apply(this,arguments)};return s});