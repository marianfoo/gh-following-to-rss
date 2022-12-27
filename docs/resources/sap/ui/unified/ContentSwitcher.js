/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","./library","./ContentSwitcherRenderer","sap/base/Log"],function(t,e,n,i){"use strict";var o=e.ContentSwitcherAnimation;var r=t.extend("sap.ui.unified.ContentSwitcher",{metadata:{deprecated:true,library:"sap.ui.unified",properties:{animation:{type:"string",group:"Appearance",defaultValue:"None"},activeContent:{type:"int",group:"Behavior",defaultValue:1}},aggregations:{content1:{type:"sap.ui.core.Control",multiple:true,singularName:"content1"},content2:{type:"sap.ui.core.Control",multiple:true,singularName:"content2"}}},renderer:n});(function(t){r.prototype.init=function(){};r.prototype.switchContent=function(){this.setActiveContent(this.getActiveContent()==1?2:1);return this};r.prototype.onAfterRendering=function(){this._$Contents=[this.$("content1"),this.$("content2")]};r.prototype._showActiveContent=function(t){if(this._$Contents){this._$Contents[0].toggleClass("sapUiUfdCSwitcherVisible",t===1);this._$Contents[1].toggleClass("sapUiUfdCSwitcherVisible",t===2)}};r.prototype.setActiveContent=function(t){t=parseInt(t);if(isNaN(t)||t<1){t=1;i.warning("setActiveContent argument must be either 1 or 2. Active content set to 1.")}else if(t>2){t=2;i.warning("setActiveContent argument must be either 1 or 2. Active content set to 2.")}this.setProperty("activeContent",t,true);this._showActiveContent(t);return this};r.prototype.setAnimation=function(t,e){if(typeof t!=="string"){t=o.None;i.warning('setAnimation argument must be a string. Animation was set to "'+o.None+'".')}t=t.replace(/[^a-zA-Z0-9]/g,"");var n=this.getProperty("animation");if(t===n){return this}var r=this.$();if(r[0]){r.toggleClass("sapUiUfdCSwitcherAnimation"+n,false);r.toggleClass("sapUiUfdCSwitcherAnimation"+t,true)}return this.setProperty("animation",t,e)}})(window);return r});