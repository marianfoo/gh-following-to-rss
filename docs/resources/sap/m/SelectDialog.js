/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","./Button","./Dialog","./List","./SearchField","./library","sap/ui/core/library","./SelectDialogBase","sap/ui/core/InvisibleText","sap/ui/core/InvisibleMessage","sap/ui/Device","sap/m/Toolbar","sap/m/Text","sap/m/BusyIndicator","sap/m/Bar","sap/m/Title","sap/base/Log"],function(t,e,i,s,o,n,a,r,l,h,u,d,g,c,p,_,f){"use strict";var y=n.ListMode;var S=n.ButtonType;var m=n.TitleAlignment;var C=a.InvisibleMessageMode;var I=r.extend("sap.m.SelectDialog",{metadata:{library:"sap.m",properties:{title:{type:"string",group:"Appearance",defaultValue:null},noDataText:{type:"string",group:"Appearance",defaultValue:null},multiSelect:{type:"boolean",group:"Dimension",defaultValue:false},growingThreshold:{type:"int",group:"Misc",defaultValue:null},growing:{type:"boolean",group:"Behavior",defaultValue:true},contentWidth:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},rememberSelections:{type:"boolean",group:"Behavior",defaultValue:false},contentHeight:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},showClearButton:{type:"boolean",group:"Behavior",defaultValue:false},confirmButtonText:{type:"string",group:"Appearance"},draggable:{type:"boolean",group:"Behavior",defaultValue:false},resizable:{type:"boolean",group:"Behavior",defaultValue:false},titleAlignment:{type:"sap.m.TitleAlignment",group:"Misc",defaultValue:m.Auto}},defaultAggregation:"items",aggregations:{items:{type:"sap.m.ListItemBase",multiple:true,singularName:"item",forwarding:{idSuffix:"-list",aggregation:"items",forwardBinding:true}},_dialog:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"}},events:{confirm:{parameters:{selectedItem:{type:"sap.m.StandardListItem"},selectedItems:{type:"sap.m.StandardListItem[]"},selectedContexts:{type:"object[]"}}},search:{parameters:{value:{type:"string"},itemsBinding:{type:"any"},clearButtonPressed:{type:"boolean"}}},liveChange:{parameters:{value:{type:"string"},itemsBinding:{type:"any"}}},cancel:{}}},renderer:{apiVersion:2,render:function(){}}});I.prototype.init=function(){var t=this,e=0;this._bAppendedToUIArea=false;this._bInitBusy=false;this._bFirstRender=true;this._bAfterCloseAttached=false;this._oRb=sap.ui.getCore().getLibraryResourceBundle("sap.m");this._oList=new s(this.getId()+"-list",{growing:t.getGrowing(),growingScrollToLoad:t.getGrowing(),mode:y.SingleSelectMaster,sticky:[n.Sticky.InfoToolbar],infoToolbar:new d({visible:false,active:false,content:[new g({text:this._oRb.getText("TABLESELECTDIALOG_SELECTEDITEMS",[0])})]}),selectionChange:this._selectionChange.bind(this),updateStarted:this._updateStarted.bind(this),updateFinished:this._updateFinished.bind(this)});this._list=this._oList;this._oBusyIndicator=new c(this.getId()+"-busyIndicator").addStyleClass("sapMSelectDialogBusyIndicator",true);this._oSearchField=new o(this.getId()+"-searchField",{width:"100%",ariaLabelledBy:l.getStaticId("sap.m","SELECTDIALOG_SEARCH"),liveChange:function(i){var s=i.getSource().getValue(),o=s?300:0;clearTimeout(e);if(o){e=setTimeout(function(){t._executeSearch(s,false,"liveChange")},o)}else{t._executeSearch(s,false,"liveChange")}},search:function(e){var i=e.getSource().getValue(),s=e.getParameters().clearButtonPressed;t._executeSearch(i,s,"search")}});this._searchField=this._oSearchField;this._oSubHeader=new p(this.getId()+"-subHeader",{contentMiddle:[this._oSearchField]});var a=new p(this.getId()+"-dialog-header",{titleAlignment:this.getTitleAlignment(),contentMiddle:[new _(this.getId()+"-dialog-title",{level:"H2"})]});this._oDialog=new i(this.getId()+"-dialog",{customHeader:a,titleAlignment:this.getTitleAlignment(),stretch:u.system.phone,contentHeight:"2000px",subHeader:this._oSubHeader,content:[this._oBusyIndicator,this._oList],leftButton:this._getCancelButton(),draggable:this.getDraggable()&&u.system.desktop,resizable:this.getResizable()&&u.system.desktop,escapeHandler:function(e){t._onCancel();e.resolve()}}).addStyleClass("sapMSelectDialog");this._dialog=this._oDialog;this.setAggregation("_dialog",this._oDialog);this._sSearchFieldValue="";this._iListUpdateRequested=0};I.prototype.setGrowing=function(t){this._oList.setGrowing(t);this._oList.setGrowingScrollToLoad(t);this.setProperty("growing",t,true);return this};I.prototype.setDraggable=function(t){this._setInteractionProperty(t,"draggable",this._oDialog.setDraggable);return this};I.prototype.setResizable=function(t){this._setInteractionProperty(t,"resizable",this._oDialog.setResizable);return this};I.prototype._setInteractionProperty=function(t,e,i){this.setProperty(e,t,true);if(!u.system.desktop&&t){f.warning(e+" property works only on desktop devices!");return}if(u.system.desktop&&this._oDialog){i.call(this._oDialog,t)}};I.prototype.setBusy=function(){this._oDialog.setBusy.apply(this._oDialog,arguments);return this};I.prototype.getBusy=function(){return this._oDialog.getBusy.apply(this._oDialog,arguments)};I.prototype.setBusyIndicatorDelay=function(t){this._oList.setBusyIndicatorDelay(t);this._oDialog.setBusyIndicatorDelay(t);this.setProperty("busyIndicatorDelay",t,true);return this};I.prototype.exit=function(){this._oList=null;this._oSearchField=null;this._oSubHeader=null;this._oClearButton=null;this._oBusyIndicator=null;this._sSearchFieldValue=null;this._iListUpdateRequested=0;this._bInitBusy=false;this._bFirstRender=false;if(this._bAppendedToUIArea){var t=sap.ui.getCore().getStaticAreaRef();t=sap.ui.getCore().getUIArea(t);t.removeContent(this,true)}if(this._oDialog){this._oDialog.destroy();this._oDialog=null}if(this._oOkButton){this._oOkButton.destroy();this._oOkButton=null}this._oSelectedItem=null;this._aSelectedItems=null;this._list=null;this._searchField=null;this._dialog=null};I.prototype.onAfterRendering=function(){if(this._bInitBusy&&this._bFirstRender){this._setBusy(true);this._bInitBusy=false}return this};I.prototype.invalidate=function(){if(this._oDialog&&(!arguments[0]||arguments[0]&&arguments[0].getId()!==this.getId()+"-dialog")){this._oDialog.invalidate(arguments)}else{r.prototype.invalidate.apply(this,arguments)}return this};I.prototype.open=function(t){if((!this.getParent()||!this.getUIArea())&&!this._bAppendedToUIArea){var e=sap.ui.getCore().getStaticAreaRef();e=sap.ui.getCore().getUIArea(e);e.addContent(this,true);this._bAppendedToUIArea=true}this._oSearchField.setValue(t);this._sSearchFieldValue=t||"";this._setInitialFocus();this._oDialog.open();if(this._bInitBusy){this._setBusy(true)}this._updateSelectionIndicator();this._aInitiallySelectedContextPaths=this._oList.getSelectedContextPaths();return this};I.prototype.setGrowingThreshold=function(t){this._oList.setGrowingThreshold(t);this.setProperty("growingThreshold",t,true);return this};I.prototype.setMultiSelect=function(t){this.setProperty("multiSelect",t,true);if(t){this._oList.setMode(y.MultiSelect);this._oList.setIncludeItemInSelection(true);this._oDialog.setEndButton(this._getCancelButton());this._oDialog.setBeginButton(this._getOkButton())}else{this._oList.setMode(y.SingleSelectMaster);this._oDialog.setEndButton(this._getCancelButton());this._oDialog.destroyBeginButton();delete this._oOkButton}return this};I.prototype.setTitle=function(t){this.setProperty("title",t,true);this._oDialog.getCustomHeader().getAggregation("contentMiddle")[0].setText(t);return this};I.prototype.setTitleAlignment=function(t){this.setProperty("titleAlignment",t,true);if(this._oDialog){this._oDialog.setTitleAlignment(t)}return this};I.prototype.setConfirmButtonText=function(t){this.setProperty("confirmButtonText",t,true);this._oOkButton&&this._oOkButton.setText(t||this._oRb.getText("SELECT_CONFIRM_BUTTON"));return this};I.prototype.setNoDataText=function(t){this._oList.setNoDataText(t);return this};I.prototype.getNoDataText=function(){return this._oList.getNoDataText()};I.prototype.getContentWidth=function(){return this._oDialog.getContentWidth()};I.prototype.setContentWidth=function(t){this._oDialog.setContentWidth(t);return this};I.prototype.getContentHeight=function(){return this._oDialog.getContentHeight()};I.prototype.setShowClearButton=function(t){this.setProperty("showClearButton",t,true);if(t){var e=this._oDialog.getCustomHeader();e.addContentRight(this._getClearButton())}if(this._oClearButton){this._oClearButton.setVisible(t)}return this};I.prototype.setContentHeight=function(t){this._oDialog.setContentHeight(t);return this};I.prototype.addStyleClass=function(){this._oDialog.addStyleClass.apply(this._oDialog,arguments);return this};I.prototype.removeStyleClass=function(){this._oDialog.removeStyleClass.apply(this._oDialog,arguments);return this};I.prototype.toggleStyleClass=function(){this._oDialog.toggleStyleClass.apply(this._oDialog,arguments);return this};I.prototype.hasStyleClass=function(){return this._oDialog.hasStyleClass.apply(this._oDialog,arguments)};I.prototype.getDomRef=function(){if(this._oDialog){return this._oDialog.getDomRef.apply(this._oDialog,arguments)}else{return null}};I.prototype.clearSelection=function(){this._removeSelection();this._updateSelectionIndicator();this._oDialog.focus();return this};I.prototype.setModel=function(t,e){this._setBusy(false);this._bInitBusy=false;this._iListUpdateRequested+=1;this._oList.setModel(t,e);r.prototype.setModel.apply(this,arguments);this._updateSelectionIndicator();return this};I.prototype.setBindingContext=function(t,e){this._oList.setBindingContext(t,e);r.prototype.setBindingContext.apply(this,arguments);return this};I.prototype._executeSearch=function(t,e,i){var s=this._oList,o=s?s.getBinding("items"):undefined,n=this._sSearchFieldValue!==t;if(this._oDialog.isOpen()&&(n&&i==="liveChange"||i==="search")){this._sSearchFieldValue=t;if(o){this._iListUpdateRequested+=1;if(i==="search"){this.fireSearch({value:t,itemsBinding:o,clearButtonPressed:e})}else if(i==="liveChange"){this.fireLiveChange({value:t,itemsBinding:o})}}else{if(i==="search"){this.fireSearch({value:t,clearButtonPressed:e})}else if(i==="liveChange"){this.fireLiveChange({value:t})}}}return this};I.prototype._setBusy=function(t){if(this._iListUpdateRequested){if(t){this._oList.addStyleClass("sapMSelectDialogListHide");this._oBusyIndicator.$().css("display","inline-block")}else{this._oList.removeStyleClass("sapMSelectDialogListHide");this._oBusyIndicator.$().css("display","none")}}};I.prototype._updateStarted=function(t){this.fireUpdateStarted(t.getParameters());if(this.getModel()&&this.getModel().isA("sap.ui.model.odata.ODataModel")){if(this._oDialog.isOpen()&&this._iListUpdateRequested){this._setBusy(true)}else{this._bInitBusy=true}}};I.prototype._updateFinished=function(t){this.fireUpdateFinished(t.getParameters());this._updateSelectionIndicator();if(this.getModel()&&this.getModel().isA("sap.ui.model.odata.ODataModel")){this._setBusy(false);this._bInitBusy=false}this._iListUpdateRequested=0;this._oList.getItems().forEach(function(t){t.addEventDelegate(this._getListItemsEventDelegates())},this)};I.prototype._getOkButton=function(){var t=this,i=null;i=function(){var e=t._oList.getBinding("items");if(e&&(e.getAllCurrentContexts().length>t._oList.getItems().length||t._sSearchFieldValue)){t._oList.destroyItems();t._oList.setGrowing(false);e.filter([]);t._oList.setGrowing(t.getGrowing());t._oList.attachEventOnce("updateFinished",function(){t._oSelectedItem=t._oList.getSelectedItem();t._aSelectedItems=t._oList.getSelectedItems();t._fireConfirmAndUpdateSelection()})}else{t._oSelectedItem=t._oList.getSelectedItem();t._aSelectedItems=t._oList.getSelectedItems();t._fireConfirmAndUpdateSelection()}t._sSearchFieldValue=null};if(!this._oOkButton){this._oOkButton=new e(this.getId()+"-ok",{type:S.Emphasized,text:this.getConfirmButtonText()||this._oRb.getText("SELECT_CONFIRM_BUTTON"),press:function(){t._oDialog.attachEventOnce("afterClose",i);t._oDialog.close()}})}return this._oOkButton};I.prototype._getCancelButton=function(){var t=this;if(!this._oCancelButton){this._oCancelButton=new e(this.getId()+"-cancel",{text:this._oRb.getText("MSGBOX_CANCEL"),press:function(e){t._onCancel()}})}return this._oCancelButton};I.prototype._getClearButton=function(){if(!this._oClearButton){this._oClearButton=new e(this.getId()+"-clear",{text:this._oRb.getText("SELECTDIALOG_CLEARBUTTON"),press:this.clearSelection.bind(this)})}return this._oClearButton};I.prototype._onCancel=function(t){var e=this,i=null;i=function(){e._oSelectedItem=null;e._aSelectedItems=[];e._sSearchFieldValue=null;e._oDialog.detachAfterClose(i);e._resetSelection();e.fireCancel()};this._oDialog.attachAfterClose(i);this._oDialog.close()};I.prototype._updateSelectionIndicator=function(){var t=this._oList.getSelectedContextPaths(true).length,e=this._oList.getInfoToolbar(),i=!!t&&this.getMultiSelect();if(this.getShowClearButton()&&this._oClearButton){this._oClearButton.setEnabled(t>0)}if(e.getVisible()!==i){e.setVisible(i)}e.getContent()[0].setText(this._oRb.getText("TABLESELECTDIALOG_SELECTEDITEMS",[t]));if(this._oDialog.isOpen()){h.getInstance().announce(t>0?this._oRb.getText("TABLESELECTDIALOG_SELECTEDITEMS_SR",[t]):"",C.Polite)}};I.prototype._fireConfirmAndUpdateSelection=function(){var t={selectedItem:this._oSelectedItem,selectedItems:this._aSelectedItems};Object.defineProperty(t,"selectedContexts",{get:this._oList.getSelectedContexts.bind(this._oList,true)});this.fireConfirm(t);this._updateSelection()};I.prototype._selectionChange=function(t){if(t.getParameters){this.fireSelectionChange(t.getParameters())}if(!this._oDialog){return}if(this.getMultiSelect()){this._updateSelectionIndicator();return}if(!this._bAfterCloseAttached){this._oDialog.attachEventOnce("afterClose",this._resetAfterClose,this);this._bAfterCloseAttached=true}this._oDialog.close()};I.prototype._resetAfterClose=function(){this._oSelectedItem=this._oList.getSelectedItem();this._aSelectedItems=this._oList.getSelectedItems();this._bAfterCloseAttached=false;this._fireConfirmAndUpdateSelection()};I.prototype._updateSelection=function(){if(!this.getRememberSelections()&&!this.bIsDestroyed){this._removeSelection()}};I.prototype._removeSelection=function(){this._oList.removeSelections(true);delete this._oSelectedItem;delete this._aSelectedItems};I.prototype._resetSelection=function(){if(!this.bIsDestroyed){this._oList.removeSelections(true);this._oList.setSelectedContextPaths(this._aInitiallySelectedContextPaths);this._oList.getItems().forEach(function(t){var e=t.getBindingContextPath();if(e&&this._aInitiallySelectedContextPaths.indexOf(e)>-1){t.setSelected(true)}},this)}};I.prototype._getListItemsEventDelegates=function(){var e=function(e){var i=t(e.target).closest(".sapMLIB").control()[0];if(i._eventHandledByControl){return}if(e&&e.isDefaultPrevented&&e.isMarked&&(e.isDefaultPrevented()||e.isMarked("preventSelectionChange"))){return}if(e&&e.srcControl.isA("sap.m.GroupHeaderListItem")){return}this._selectionChange(e)}.bind(this);return{ontap:e,onsapselect:e}};return I});