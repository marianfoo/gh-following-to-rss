/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Element","sap/ui/core/library","./library","./ListItemBase","./ColumnListItemRenderer","sap/ui/thirdparty/jquery","sap/ui/dom/jquery/Selectors"],function(t,e,i,o,n,s){"use strict";var r=i.ListType;var p=e.VerticalAlign;var a=o.extend("sap.m.ColumnListItem",{metadata:{library:"sap.m",properties:{vAlign:{type:"sap.ui.core.VerticalAlign",group:"Appearance",defaultValue:p.Inherit}},defaultAggregation:"cells",aggregations:{cells:{type:"sap.ui.core.Control",multiple:true,singularName:"cell",bindable:"bindable"}}},renderer:n});var u=t.extend("sap.m.TablePopin",{ontap:function(t){if(t.isMarked()||o.detectTextSelection(this.getDomRef())){return t.stopImmediatePropagation(true)}if(t.srcControl===this||!s(t.target).is(":sapFocusable")){this.getParent().focus()}}});a.prototype.TagName="tr";a.prototype.init=function(){o.prototype.init.call(this);this._bNeedsTypeColumn=false;this._aClonedHeaders=[]};a.prototype.onBeforeRendering=function(){o.prototype.onBeforeRendering.call(this);if(this._oPopin&&this._oDomRef){this.$Popin().off()}};a.prototype.onAfterRendering=function(){if(this._oPopin&&this.isActionable(true)){this.$Popin().on("mouseenter mouseleave",function(t){this.previousSibling.classList.toggle("sapMPopinHovered",t.type=="mouseenter")})}o.prototype.onAfterRendering.call(this);this._checkTypeColumn()};a.prototype.exit=function(){o.prototype.exit.call(this);this._checkTypeColumn(false);this._destroyClonedHeaders();if(this._oPopin){this._oPopin.destroy(true);this._oPopin=null}};a.prototype.setVisible=function(t){o.prototype.setVisible.call(this,t);if(!t&&this.hasPopin()){this.removePopin()}return this};a.prototype.getTable=function(){var t=this.getParent();if(t&&t.isA("sap.m.Table")){return t}};a.prototype.getPopin=function(){if(!this._oPopin){this._oPopin=new u({id:this.getId()+"-sub"}).addDelegate({ontouchstart:this.ontouchstart,ontouchmove:this.ontouchmove,ontap:this.ontap,ontouchend:this.ontouchend,ontouchcancel:this.ontouchcancel,onsaptabnext:this.onsaptabnext,onsaptabprevious:this.onsaptabprevious,onsapup:this.onsapup,onsapdown:this.onsapdown,oncontextmenu:this.oncontextmenu},this).setParent(this,null,true)}return this._oPopin};a.prototype.$Popin=function(){return this.$("sub")};a.prototype.hasPopin=function(){return this._oPopin};a.prototype.removePopin=function(){this._oPopin&&this.$Popin().remove()};a.prototype.getTabbables=function(){return this.$().add(this.$Popin()).find(":sapTabbable")};a.prototype.getAccessibilityType=function(t){return t.getText("ACC_CTR_TYPE_ROW")};a.prototype.getContentAnnouncement=function(t){var e=this.getTable();if(!e){return}var i=[],n=this.getCells(),s=e.getColumns(true);s.sort(function(t,e){var i=t.getIndex(),o=e.getIndex(),n=i-o;if(n==0){return 0}if(i<0){return 1}if(o<0){return-1}return n}).forEach(function(t){var e=n[t.getInitialOrder()];if(!e||!t.getVisible()||t.isHidden()&&!t.isPopin()){return}var s=t.getHeader();if(s&&s.getVisible()){i.push(o.getAccessibilityText(s)+" "+o.getAccessibilityText(e,true))}else{i.push(o.getAccessibilityText(e,true))}});return i.join(" . ").trim()};a.prototype.updateSelectedDOM=function(t,e){o.prototype.updateSelectedDOM.apply(this,arguments);if(this.hasPopin()){this.$Popin().attr("aria-selected",t)}};a.prototype.onfocusin=function(t){if(t.isMarked()){return}if(t.srcControl===this){this.$().children(".sapMListTblCellDup").find(":sapTabbable").attr("tabindex",-1)}o.prototype.onfocusin.apply(this,arguments)};a.prototype._checkTypeColumn=function(t){if(t==undefined){t=this._needsTypeColumn()}if(this._bNeedsTypeColumn!=t){this._bNeedsTypeColumn=t;this.informList("TypeColumnChange",t)}};a.prototype._needsTypeColumn=function(){var t=this.getType();return this.getVisible()&&(t==r.Detail||t==r.Navigation||t==r.DetailAndActive)};a.prototype._addClonedHeader=function(t){return this._aClonedHeaders.push(t)};a.prototype._destroyClonedHeaders=function(){if(this._aClonedHeaders.length){this._aClonedHeaders.forEach(function(t){t.destroy("KeepDom")});this._aClonedHeaders=[]}};a.prototype._activeHandlingInheritor=function(){this._toggleActiveClass(true)};a.prototype._inactiveHandlingInheritor=function(){this._toggleActiveClass(false)};a.prototype._toggleActiveClass=function(t){if(this.hasPopin()){this.$Popin().toggleClass("sapMLIBActive",t)}};return a});