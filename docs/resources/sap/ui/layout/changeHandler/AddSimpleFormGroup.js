/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/changeHandler/Base","sap/ui/core/util/reflection/JsControlTreeModifier"],function(e,r){"use strict";var t={};t.CONTENT_AGGREGATION="content";var n=function(e,r,t){return t.reduce(function(t,n){return t.then(function(t){if(t!==undefined){return t}var o=e.getControlType(n);if(r.indexOf(o)===-1){return Promise.resolve().then(e.getVisible.bind(e,n)).then(function(e){return e||undefined})}else{return false}})},Promise.resolve())};var o=function(e,r,t,o){var i;var a=-1;if(o===0){return o}return n(e,r,t).then(function(n){if(n){a++}for(var u=0;u<t.length;u++){var l=e.getControlType(t[u]);if(r.indexOf(l)>-1){a++;if(a===o){i=t[u];return t.indexOf(i)}}}return t.length})};t.applyChange=function(r,n,i){var a=i.modifier;var u=i.view;var l=i.appComponent;var f;var g=r.getTexts();var c=r.getContent();if(g&&g.groupLabel&&g.groupLabel.value&&c&&c.group&&(c.group.selector||c.group.id)){var d=c.group.selector;var p;if(d){if(d.idIsLocal){p=l.createId(d.id)}else{p=d.id}}else{p=c.group.id}r.setRevertData({groupId:p});var s=g.groupLabel.value;var v;return Promise.resolve().then(function(){return a.getAggregation(n,t.CONTENT_AGGREGATION)}).then(function(e){if(typeof c.group.index==="number"){return c.group.index}else{v=c.group.relativeIndex;return o(a,["sap.ui.core.Title","sap.m.Title","sap.m.Toolbar","sap.m.OverflowToolbar"],e,v)}}).then(function(r){f=r;if(a.bySelector(p,l)){return e.markAsNotApplicable("Control to be created already exists:"+p)}return a.createControl("sap.ui.core.Title",l,u,p)}).then(function(e){a.setProperty(e,"text",s);return a.insertAggregation(n,"content",e,f,u)})}};t.completeChangeContent=function(e,t,n){var o=n.appComponent;var i={group:{}};if(t.newLabel){e.setText("groupLabel",t.newLabel,"XFLD")}else{throw new Error("oSpecificChangeInfo.newLabel attribute required")}if(t.newControlId){i.group.selector=r.getSelector(t.newControlId,o)}else{throw new Error("oSpecificChangeInfo.newControlId attribute required")}if(t.index===undefined){throw new Error("oSpecificChangeInfo.index attribute required")}else{i.group.relativeIndex=t.index}e.setContent(i)};t.getControlIdFromChangeContent=function(e){var r;if(e&&e.getContent()){r=e.getContent().group.id}return r};t.revertChange=function(e,r,n){var o=n.appComponent;var i=n.view;var a=n.modifier;var u=e.getRevertData().groupId;var l=a.getSelector(u,o);var f=a.bySelector(l,o,i);return Promise.resolve().then(function(){return a.removeAggregation(r,t.CONTENT_AGGREGATION,f)}).then(function(){a.destroy(f);e.resetRevertData()})};t.getChangeVisualizationInfo=function(e,t){var n=e.getContent().group.selector;var o=r.bySelector(n,t).getParent().getId();var i=e.getText("groupLabel");return{affectedControls:[o],updateRequired:true,descriptionPayload:{originalLabel:i}}};t.getCondenserInfo=function(){return undefined};return t},true);