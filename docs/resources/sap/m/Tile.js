/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/InvisibleText","sap/ui/core/Control","sap/ui/Device","./TileRenderer","sap/ui/thirdparty/jquery"],function(t,e,i,s,r,n){"use strict";var a=i.extend("sap.m.Tile",{metadata:{library:"sap.m",deprecated:true,properties:{removable:{type:"boolean",group:"Misc",defaultValue:true}},events:{press:{}}},renderer:r});a.prototype.init=function(){if(s.system.desktop){var t=n.proxy(function(t){if(t.srcControl===this&&!t.isMarked()){this.ontap();t.stopPropagation()}},this);this.onsapspace=t;this.onsapenter=t}};a.prototype.onAfterRendering=function(){if(this._rendered&&!this._bIsDragged&&this.getParent()&&this.getParent().isA("sap.m.TileContainer")){this.setPos(this._posX,this._posY)}this._rendered=true};a.prototype.setPos=function(t,e){this._posX=t=Math.floor(t);this._posY=e=Math.floor(e);if(!this._rendered){return}var i=this.getDomRef();if(!i){return}if("webkitTransform"in i.style){this.$().css("-webkit-transform","translate3d("+t+"px,"+e+"px,0)")}else if("transform"in i.style){this.$().css("transform","translate3d("+t+"px,"+e+"px,0)")}else if("msTransform"in i.style){this.$().css("msTransform","translate("+t+"px,"+e+"px)")}else if("MozTransform"in i.style){this.$().css("-moz-transform","translate3d("+t+"px,"+e+"px,0)")}if(this._invisible){this.$().css("visibility","");delete this._invisible}};a.prototype.setSize=function(t,e){this._width=t;this._height=e};a.prototype.isEditable=function(t){var i=this._bIsEditable;if(t===true||t===false){this._bIsEditable=t}if(i!=t&&this.$()){this.$().attr("aria-describedBy",t?e.getStaticId("sap.m","TILE_REMOVE_BY_DEL_KEY"):null)}return this._bIsEditable};a.prototype.isDragged=function(t){if(!this._bIsEditable){return}if(t===true||t===false){var e=this.$();e.toggleClass("sapMTileDrag",t);this._bIsDragged=t}return this._bIsDragged};a.prototype.ontouchstart=function(t){if(!this.isEditable()&&!this._parentPreventsTapEvent){this.$().toggleClass("sapMTileActive sapMTileActive-CTX",true);this._clientX=t.clientX;this._clientY=t.clientY}};a.prototype.ontouchend=function(){if(!this.isEditable()){this.$().toggleClass("sapMTileActive sapMTileActive-CTX",false)}};Object.defineProperty(a.prototype,"_parentPreventsTapEvent",{get:function(){var t=this.getParent();while(t){if(t._bAvoidChildTapEvent||t instanceof a&&t.isEditable()){return true}t=t.getParent()}return false}});a.prototype.ontouchmove=function(t){if(!this.isEditable()&&!this._parentPreventsTapEvent){if(Math.abs(t.clientX-this._clientX)>30||Math.abs(t.clientY-this._clientY)>10){this.$().toggleClass("sapMTileActive sapMTileActive-CTX",false)}}};a.prototype.ontap=function(){if(!this.isEditable()&&!this._parentPreventsTapEvent){this.firePress({})}};a.prototype.setVisible=function(t){this.setProperty("visible",t);if(!t){this._rendered=false}if(this.getParent()&&this.getParent().isA("sap.m.TileContainer")){this.getParent().invalidate()}return this};a.prototype._setVisible=function(t){this._invisible=!t;return this};return a});