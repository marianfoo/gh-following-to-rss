/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Renderer","sap/ui/core/Core","sap/ui/core/InvisibleText","./library","./ListBaseRenderer","./ColumnListItemRenderer"],function(e,t,a,s,r,l){"use strict";var i=s.ListKeyboardMode;var o=s.MultiSelectMode;var n=e.extend(r);n.apiVersion=2;var d=t.getConfiguration().getRTL();n.columnAlign={left:d?"flex-end":"flex-start",center:"center",right:d?"flex-start":"flex-end"};n.renderColumns=function(e,t,s){var l=0,i=0,d=false,c=false,u=t.getMode(),p=r.ModeOrder[u],g="sapMListTbl",C=t.getId("tbl"),f=s=="Head"?"th":"td",b="t"+s.toLowerCase(),h=t.getColumns(),m=t.shouldRenderDummyColumn(),M,H=function(t,a,r){e.openStart(f,a&&C+a);if(f==="th"){e.class("sapMTableTH");e.attr("role",r?"presentation":"columnheader");e.attr("scope","col")}else if(r){e.attr("role","presentation")}r&&e.attr("aria-hidden","true");e.class(g+t);if(s==="Foot"){if(t==="HighlightCol"){e.class("sapMTableHighlightFooterCell")}else if(t==="NavigatedCol"){e.class("sapMTableNavigatedFooterCell")}}e.openEnd();e.close(f);l++};if(s=="Head"){var L=h.filter(function(e){return e.getVisible()});var T=h.reduce(function(e,t,a){t.setIndex(-1);t.setInitialOrder(a);t.setForcedColumn(false);return t.getVisible()&&t.getCalculatedMinScreenWidth()<e.getCalculatedMinScreenWidth()?t:e},L[0]);var y=h.filter(function(e){return e.getVisible()&&!e.isPopin()&&!e.isHidden()}).length;if(!y&&T){T.setForcedColumn(true);y=1}M=h.every(function(e){return!e.getHeader()||!e.getHeader().getVisible()||!e.getVisible()||e.isPopin()||e.isHidden()})}e.openStart(b);if(t._hasFooter&&s==="Foot"){e.class("sapMTableTFoot");if(t.hasPopin()){e.class("sapMListTblHasPopin")}}e.openEnd();e.openStart("tr",t.addNavSection(C+s+"er"));if(M){e.class("sapMListTblHeaderNone")}else{e.attr("tabindex",-1);e.class("sapMListTblRow").class("sapMListTbl"+s+"er");e.class("sapMLIBFocusable").class("sapMTableRowCustomFocus")}e.openEnd();H("HighlightCol",s+"Highlight",true);if(p==-1){if(u=="MultiSelect"&&s=="Head"&&!M){e.openStart("th");e.class("sapMTableTH");e.attr("scope","col");e.attr("aria-hidden","true");e.class(g+"SelCol");e.attr("role","presentation");e.openEnd();e.renderControl(t.getMultiSelectMode()==o.Default?t._getSelectAllCheckbox():t._getClearAllButton());e.close("th");l++}else{H("SelCol","",true)}}t.getColumns(true).forEach(function(r,o){if(!r.getVisible()){return}if(r.isPopin()){d=true;return}var u=r.isHidden();if(u){i++}var p=r["get"+s+"er"](),C=t.getFixedLayout(),b=y==1&&C!="Strict"?"":r.getWidth(),h=r.getStyleClass(true).split(" "),m=r.getCssAlign();t._bCheckLastColumnWidth=C=="Strict"&&y==1;if(s=="Head"){e.openStart(f,r);e.class("sapMTableTH");e.attr("role","columnheader");e.attr("scope","col");var M=r.getSortIndicator().toLowerCase();M!=="none"&&e.attr("aria-sort",M)}else{e.openStart(f)}h&&h.forEach(function(t){e.class(t)});e.class(g+"Cell");e.class(g+s+"erCell");e.attr("data-sap-ui-column",r.getId());e.attr("data-sap-width",r.getWidth());e.style("width",b);if(m&&s!=="Head"){e.style("text-align",m)}if(u){e.style("display","none");e.attr("aria-hidden","true")}e.openEnd();if(p){if(s==="Head"){e.openStart("div",r.getId()+"-ah");e.class("sapMColumnHeader");var H=r._getHeaderMenuInstance();if((t.bActiveHeaders||H)&&!p.isA("sap.ui.core.InvisibleText")){e.attr("tabindex",0);e.attr("role","button");e.class("sapMColumnHeaderActive");e.attr("aria-haspopup",H?H.getAriaHasPopupType().toLowerCase():"dialog");if(p.isA("sap.m.Label")&&p.getRequired()){e.attr("aria-describedby",a.getStaticId("sap.m","CONTROL_IN_COLUMN_REQUIRED"))}}else if(t.bFocusableHeaders){e.attr("tabindex",0);e.class("sapMColumnHeaderFocusable")}if(m){e.style("justify-content",n.columnAlign[m]);e.style("text-align",m)}e.openEnd();e.renderControl(p.addStyleClass("sapMColumnHeaderContent"));e.close("div")}else{e.renderControl(p)}}if(s=="Head"&&!c){c=!!r.getFooter()}e.close(f);r.setIndex(l++)});if(d&&m){H("DummyCell",s+"DummyCell",true)}H("NavCol",s+"Nav",true);if(p==1){H("SelCol","",true)}H("NavigatedCol",s+"Navigated",true);if(!d&&m){H("DummyCell",s+"DummyCell",true)}e.close("tr");e.close(b);if(s==="Head"){t._hasPopin=d;t._colCount=l-i;t._hasFooter=c;t._headerHidden=M}};n.renderContainerAttributes=function(e,a){e.attr("role","application").attr("data-sap-ui-pasteregion","true");e.attr("aria-roledescription",t.getLibraryResourceBundle("sap.m").getText("TABLE_CONTAINER_ROLE_DESCRIPTION"));e.class("sapMListTblCnt");e.accessibilityState(a,this.getAccessibilityState(a))};n.renderListStartAttributes=function(e,t){e.openStart("table",t.getId("listUl"));e.class("sapMListTbl");e.attr("aria-labelledby",t.getAriaLabelledBy().concat(this.getAriaLabelledBy(t),a.getStaticId("sap.m","TABLE_ARIA_LABEL")).join(" "));if(t.getFixedLayout()===false){e.style("table-layout","auto")}if(t._iItemNeedsColumn){e.class("sapMListTblHasNav")}};n.renderListHeadAttributes=function(e,t){t._aPopinHeaders=[];this.renderColumns(e,t,"Head");e.openStart("tbody",t.addNavSection(t.getId("tblBody")));e.class("sapMListItems");e.class("sapMTableTBody");if(t.getAlternateRowColors()){e.class(t._getAlternateRowColorsClass())}if(t.hasPopin()){e.class("sapMListTblHasPopin")}e.openEnd()};n.renderListEndAttributes=function(e,t){e.close("tbody");t._hasFooter&&this.renderColumns(e,t,"Foot");e.close("table");this.renderPopinColumnHeaders(e,t)};n.renderPopinColumnHeaders=function(e,t){if(!t._aPopinHeaders||!t._aPopinHeaders.length){return}e.openStart("div",t.getId("popin-headers"));e.class("sapMTablePopinHeaders");e.attr("aria-hidden","true");e.openEnd();t._aPopinHeaders.forEach(function(t){e.renderControl(t)});e.close("div")};n.renderNoData=function(e,a){e.openStart("tr",a.getId("nodata"));e.attr("tabindex",a.getKeyboardMode()==i.Navigation?-1:0);e.class("sapMLIB").class("sapMListTblRow").class("sapMLIBTypeInactive");l.addFocusableClasses(e,a);if(!a._headerHidden||!a.getHeaderText()&&!a.getHeaderToolbar()){e.class("sapMLIBShowSeparator")}e.openEnd();var s=!a.hasPopin()&&a.shouldRenderDummyColumn();e.openStart("td",a.getId("nodata-text"));e.attr("colspan",a.getColCount()-s);e.class("sapMListTblCell").class("sapMListTblCellNoData");e.openEnd();if(!a.shouldRenderItems()){if(a.getAggregation("_noColumnsMessage")){e.renderControl(a.getAggregation("_noColumnsMessage"))}else{e.text(t.getLibraryResourceBundle("sap.m").getText("TABLE_NO_COLUMNS"))}}else{this.renderNoDataArea(e,a)}e.close("td");if(s){l.renderDummyCell(e,a)}e.close("tr")};return n},true);