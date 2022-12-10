/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/deepEqual","sap/base/util/each","sap/ui/base/Object","sap/ui/core/message/Message"],function(e,t,r,s){"use strict";var i=r.extend("sap.ui.model.DataState",{metadata:{},constructor:function(){this.mProperties=i.getInitialProperties();this.mChangedProperties=i.getInitialProperties()}});i.prototype.setProperty=function(e,t){this.mChangedProperties[e]=t;return this};i.prototype.calculateChanges=function(){for(var t in this.mChangedProperties){var r=this.mChangedProperties[t].value;if(!e(this.mProperties[t],r)){if(Array.isArray(r)){r=r.slice(0)}this.mProperties[t]=r}}return this};i.prototype.getProperty=function(e){return this.mChangedProperties[e]};i.prototype.getAllMessages=function(){var e=new Set;this.getMessages().forEach(e.add.bind(e));this._getOldMessages().forEach(e.add.bind(e));return Array.from(e)};i.prototype.getMessages=function(){return i.getMessagesForProperties(this.mChangedProperties)};i.prototype._getOldMessages=function(){return i.getMessagesForProperties(this.mProperties)};i.getMessagesForProperties=function(e){var t=[],r=e.controlMessages,i=e.modelMessages;if(i||r){t=t.concat(r||[],i||[]);t.sort(s.compare)}return t};i.prototype.setModelMessages=function(e){this.mChangedProperties["modelMessages"]=e||[];return this};i.prototype.getModelMessages=function(){return this.getProperty("modelMessages")};i.prototype.setControlMessages=function(e){this.mChangedProperties["controlMessages"]=e||[];return this};i.prototype.getControlMessages=function(){return this.getProperty("controlMessages")};i.prototype.isDirty=function(){var t=this.mChangedProperties["value"],r=this.mChangedProperties["originalValue"];return this.isControlDirty()||!e(t,r)};i.prototype.isControlDirty=function(){return this.mChangedProperties["invalidValue"]!==undefined};i.prototype.isLaundering=function(){return this.mChangedProperties["laundering"]};i.prototype.setLaundering=function(e){this.mChangedProperties["laundering"]=e;return this};i.prototype.getValue=function(){return this.getProperty("value")};i.prototype.setValue=function(e){this.mChangedProperties["value"]=e;return this};i.prototype.getInvalidValue=function(){return this.getProperty("invalidValue")};i.prototype.setInvalidValue=function(e){this.mChangedProperties["invalidValue"]=e;return this};i.prototype.getOriginalValue=function(){return this.getProperty("originalValue")};i.prototype.setOriginalValue=function(e){this.mChangedProperties["originalValue"]=e;return this};i.prototype.changed=function(t){if(t===false){this.mProperties=Object.assign({},this.mChangedProperties)}return!e(this.mChangedProperties,this.mProperties)};i.prototype.getChanges=function(){var r={},s,i;t(this.mChangedProperties,function(t,s){if(!e(this.mChangedProperties[t],this.mProperties[t])){r[t]={};r[t].value=this.mChangedProperties[t];r[t].oldValue=this.mProperties[t]}}.bind(this));s=this.getMessages();i=this._getOldMessages();if(s.length>0||i.length>0){r["messages"]={};r["messages"].oldValue=i;r["messages"].value=s}return r};i.getInitialProperties=function(){return{controlMessages:[],dirty:false,internalValue:undefined,invalidValue:undefined,laundering:false,messages:[],modelMessages:[],originalInternalValue:undefined,originalValue:undefined,value:undefined}};i.prototype.reset=function(){this.mChangedProperties=i.getInitialProperties()};return i});