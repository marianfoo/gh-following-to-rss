/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/Log","sap/ui/core/library","sap/ui/core/Element","sap/ui/core/Icon","sap/ui/core/IconPool","sap/ui/core/HTML","sap/m/library","sap/m/Button","sap/m/CustomListItem","sap/m/Image","sap/m/Input","sap/m/Label","sap/m/Link","sap/m/ProgressIndicator","sap/m/VBox","sap/m/HBox"],function(t,e,i,s,n,o,a,r,l,h,d,p,u,_,c,g){"use strict";var m=i.extend("sap.m.upload.UploadSetItem",{metadata:{library:"sap.m",properties:{enabledRemove:{type:"boolean",defaultValue:true},enabledEdit:{type:"boolean",defaultValue:true},fileName:{type:"string",defaultValue:null},mediaType:{type:"string",defaultValue:null},thumbnailUrl:{type:"string",defaultValue:null},uploadState:{type:"sap.m.UploadState",defaultValue:null},url:{type:"string",defaultValue:null},visibleRemove:{type:"boolean",defaultValue:true},visibleEdit:{type:"boolean",defaultValue:true},uploadUrl:{type:"string",defaultValue:null},selected:{type:"boolean",group:"Behavior",defaultValue:false}},defaultAggregation:"attributes",aggregations:{attributes:{type:"sap.m.ObjectAttribute",multiple:true,singularName:"attribute"},markers:{type:"sap.m.ObjectMarker",multiple:true,singularName:"marker"},statuses:{type:"sap.m.ObjectStatus",multiple:true,singularName:"status"},headerFields:{type:"sap.ui.core.Item",multiple:true,singularName:"headerField"}},events:{openPressed:{item:{type:"sap.m.upload.UploadSetItem"},allowPreventDefault:true},removePressed:{item:{type:"sap.m.upload.UploadSetItem"},allowPreventDefault:true}}}});var f=a.UploadState,y=a.FlexJustifyContent,b=e.ValueState;var E=o.extend("sap.m.upload.DynamicItemContent",{metadata:{library:"sap.m",properties:{item:{type:"sap.m.upload.UploadSetItem"}}},renderer:{apiVersion:2,render:function(t,e){var i=e.getItem();t.openStart("div");t.class("sapMUCTextContainer");if(this._bInEditMode){t.class("sapMUCEditMode")}t.attr("id",e.getId());t.openEnd();t.openStart("div").class("sapMUSTextInnerContainer").openEnd();t.renderControl(i._bInEditMode?i._getFileNameEdit():i._getFileNameLink());i._renderMarkers(t);t.close("div");i._renderAttributes(t);i._renderStatuses(t);t.close("div");i._renderStateAndProgress(t);i._renderButtons(t)}}});m.MEGABYTE=1048576;m.IMAGE_FILE_ICON="sap-icon://card";m.prototype.init=function(){this._oRb=sap.ui.getCore().getLibraryResourceBundle("sap.m");this._oListItem=null;this._oIcon=null;this._oFileNameLink=null;this._oFileNameEdit=null;this._oDynamicContent=null;this._oRestartButton=null;this._oEditButton=null;this._oDeleteButton=null;this._oTerminateButton=null;this._oConfirmRenameButton=null;this._oCancelRenameButton=null;this._oProgressBox=null;this._oProgressIndicator=null;this._oStateLabel=null;this._oProgressLabel=null;this._oFileObject=null;this._fFileSize=null;this._bInEditMode=false;this._bContainsError=false;this._bFileTypeRestricted=false;this._bNameLengthRestricted=false;this._bSizeRestricted=false;this._bMediaTypeRestricted=false};m.prototype.setFileName=function(t){var e;if(this.getFileName()!==t){this.setProperty("fileName",t,true);if(this.getParent()){this._getFileNameLink().setText(t);e=m._splitFileName(t);this._getFileNameEdit().setValue(e.name);this._checkNameLengthRestriction(this.getParent().getMaxFileNameLength());this._checkTypeRestriction(this.getParent().getFileTypes())}}return this};m.prototype.setUploadState=function(t){var e=this._getProgressIndicator(),i=this._getStateLabel(),s=t!==f.Complete,n=t===f.Uploading;this.setProperty("uploadState",t,true);e.setVisible(s);i.setVisible(s);this._getProgressLabel().setVisible(s);switch(t){case f.Complete:e.setState(b.None);i.setText("");break;case f.Error:e.setState(b.Error);i.setText(this._oRb.getText("UPLOAD_SET_ITEM_ERROR_STATE"));break;case f.Ready:e.setState(b.None);i.setText(this._oRb.getText("UPLOAD_SET_ITEM_READY_STATE"));break;case f.Uploading:e.setState(b.Information);i.setText(this._oRb.getText("UPLOAD_SET_ITEM_UPLOADING_STATE"));break}if(this.getParent()){this._getRestartButton().setVisible(t===f.Error);if(this.getVisibleEdit()){this._getEditButton().setVisible(!n)}if(this.getVisibleRemove()){this._getDeleteButton().setVisible(!n)}this._getTerminateButton().setVisible(this.getParent().getTerminationEnabled()&&n)}return this};m.prototype.setEnabledRemove=function(t){if(this.getEnabledRemove()!==t){this.setProperty("enabledRemove",t,true);if(this.getParent()){this._getDeleteButton().setEnabled(t)}}return this};m.prototype.setVisibleRemove=function(t){if(this.getVisibleRemove()!==t){this.setProperty("visibleRemove",t,true);if(this.getParent()){this._getDeleteButton().setVisible(t)}}return this};m.prototype.setEnabledEdit=function(t){if(this.getEnabledEdit()!==t){this.setProperty("enabledEdit",t,true);if(this.getParent()){this._getEditButton().setEnabled(t)}}return this};m.prototype.setVisibleEdit=function(t){if(this.getVisibleEdit()!==t){this.setProperty("visibleEdit",t,true);if(this.getParent()){this._getEditButton().setVisible(t)}}return this};m.prototype.setThumbnailUrl=function(t){if(this.getThumbnailUrl()!=t){this.setProperty("thumbnailUrl",t,true);if(this._oListItem&&t){for(var e=0;e<this._oListItem.getContent().length;e++){var i=this._oListItem.getContent()[e];if(i&&i.isA(["sap.ui.core.Icon","sap.m.Image"])){this._oListItem.removeContent(i);if(this._oIcon){this._oIcon.destroy();this._oIcon=null}this._oIcon=n.createControlByURI({id:this.getId()+"-thumbnail",src:t,decorative:false},h);this._oIcon.addStyleClass("sapMUCItemImage sapMUCItemIcon");this._oListItem.insertContent(this._oIcon,0)}}}}return this};m.prototype.setSelected=function(t){if(this.getSelected()!==t){this.setProperty("selected",t,true);this.fireEvent("selected")}return this};m.prototype.getFileObject=function(){return this._oFileObject};m.prototype.getListItem=function(){return this._getListItem()};m.prototype.setProgress=function(t){var e;this._getProgressLabel().setText(t+"%");e=this.$("-busyIndicator");if(t===100){e.attr("aria-label",this._oRb.getText("UPLOAD_SET_UPLOAD_COMPLETED"))}else{e.attr("aria-valuenow",t)}this._getProgressIndicator().setPercentValue(t);return this};m.prototype.download=function(e){var i=this.getParent();if(!i){t.warning("Download cannot proceed without a parent association.");return false}return i._getActiveUploader().downloadItem(this,[],e)};m.prototype.isRestricted=function(){return this._isRestricted()};m.prototype.getEditState=function(){return this._bInEditMode};m.prototype._handleFileNamePressed=function(){if(this.fireOpenPressed({item:this})){a.URLHelper.redirect(this.getUrl(),true)}};m.prototype._getListItem=function(){if(!this._oListItem){this._oListItem=new l(this.getId()+"-listItem",{content:[this._getIcon(),this._getDynamicContent()]});this._oListItem.addStyleClass("sapMUCItem");this._oListItem.setTooltip(this.getTooltip_Text())}return this._oListItem};m.prototype._setFileObject=function(t){this._oFileObject=t;if(t){this._fFileSize=t.size/m.MEGABYTE;this.setMediaType(t.type)}else{this._fFileSize=null;this.setMediaType(null)}if(this.getParent()){this._checkSizeRestriction(this.getParent().getMaxFileSize());this._checkMediaTypeRestriction(this.getParent().getMediaTypes())}};m.prototype._getIcon=function(){if(!this._oIcon){if(this.getThumbnailUrl()){this._oIcon=n.createControlByURI({id:this.getId()+"-thumbnail",src:this.getThumbnailUrl(),decorative:false},h);this._oIcon.addStyleClass("sapMUCItemImage sapMUCItemIcon")}else{this._oIcon=new s(this.getId()+"-icon",{src:this._getIconByMimeType(this.getMediaType()),decorative:false,useIconTooltip:false});this._oIcon.addStyleClass("sapMUCItemIcon")}this.addDependent(this._oIcon)}return this._oIcon};m.prototype._getIconByMimeType=function(t){var e=["image/png","image/tiff","image/bmp","image/jpeg","image/gif"];if(t){if(e.indexOf(t)===-1){return n.getIconForMimeType(t)}return this._getIconByFileType()}else{return this._getIconByFileType()}};m.prototype._getIconByFileType=function(){var t=m._splitFileName(this.getFileName()).extension;if(!t){return"sap-icon://document"}switch(t.toLowerCase()){case"bmp":case"jpg":case"jpeg":case"png":return m.IMAGE_FILE_ICON;case"csv":case"xls":case"xlsx":return"sap-icon://excel-attachment";case"doc":case"docx":case"odt":return"sap-icon://doc-attachment";case"pdf":return"sap-icon://pdf-attachment";case"ppt":case"pptx":return"sap-icon://ppt-attachment";case"txt":return"sap-icon://document-text";default:return"sap-icon://document"}};m.prototype._getFileNameLink=function(){if(!this._oFileNameLink){this._oFileNameLink=new u({id:this.getId()+"-fileNameLink",press:[this,this._handleFileNamePressed,this]});this._oFileNameLink.setText(this.getFileName());this._oFileNameLink.addStyleClass("sapMUCFileName");this._oFileNameLink.addStyleClass("sapMUSFileName");this.addDependent(this._oFileNameLink)}this._oFileNameLink.setEnabled(!!this.getUrl());return this._oFileNameLink};m.prototype._getDynamicContent=function(){if(!this._oDynamicContent){this._oDynamicContent=new E({item:this});this.addDependent(this._oDynamicContent)}return this._oDynamicContent};m.prototype._getRestartButton=function(){var t=this.getParent();if(!this._oRestartButton){this._oRestartButton=new r({id:this.getId()+"-restartButton",icon:"sap-icon://refresh",type:a.ButtonType.Standard,visible:this.getUploadState()===f.Error,tooltip:this._oRb.getText("UPLOAD_SET_RESTART_BUTTON_TEXT"),press:[this,t._handleItemRestart,t]});this.addDependent(this._oRestartButton)}return this._oRestartButton};m.prototype._getEditButton=function(){var t=this.getParent();if(!this._oEditButton){this._oEditButton=new r({id:this.getId()+"-editButton",icon:"sap-icon://edit",type:a.ButtonType.Standard,enabled:this.getEnabledEdit(),visible:this.getVisibleEdit(),tooltip:this._oRb.getText("UPLOAD_SET_EDIT_BUTTON_TEXT"),press:[this,t._handleItemEdit,t]});this._oEditButton.addStyleClass("sapMUCEditBtn");this.addDependent(this._oEditButton)}return this._oEditButton};m.prototype._getFileNameEdit=function(){var t;if(!this._oFileNameEdit){t=m._splitFileName(this.getFileName());this._oFileNameEdit=new d({id:this.getId()+"-fileNameEdit",type:a.InputType.Text});this._oFileNameEdit.addStyleClass("sapMUCEditBox");this._oFileNameEdit.setFieldWidth("75%");this._oFileNameEdit.setDescription(t.extension);this._updateFileNameEdit();this.addDependent(this._oFileNameEdit)}return this._oFileNameEdit};m.prototype._updateFileNameEdit=function(){var t=this._getFileNameEdit();if(this._bContainsError){t.setValueState(b.Error);t.setValueStateText("");t.setShowValueStateMessage(true);if(t.getValue().length===0){t.setValueStateText(this._oRb.getText("UPLOAD_SET_TYPE_FILE_NAME"))}else{t.setValueStateText(this._oRb.getText("UPLOAD_SET_FILE_NAME_EXISTS"))}}};m._checkDoubleFileName=function(t,e){if(e.length===0||!t){return false}var i=e.length;t=t.replace(/^\s+/,"");for(var s=0;s<i;s++){if(t===e[s].getProperty("fileName")){return true}}return false};m._findById=function(t,e){for(var i=0;i<e.length;i++){if(e[i].getId()===t){return e[i]}}return null};m.prototype._setInEditMode=function(t){if(t&&!this._bInEditMode){var e=m._splitFileName(this.getFileName());this._getFileNameEdit().setValue(e.name)}this._bInEditMode=t;this._setContainsError(false);this._getFileNameEdit().setShowValueStateMessage(false);this._getFileNameEdit().setProperty("valueState","None",true);this.invalidate()};m.prototype._getContainsError=function(){return this._bContainsError};m.prototype._setContainsError=function(t){this._bContainsError=t;if(!this._bContainsError){return}this._updateFileNameEdit()};m._splitFileName=function(t,e){var i={};var s=/(?:\.([^.]+))?$/;var n=s.exec(t);if(!n[0]){n[0]="";i.name=t}else{i.name=t?t.slice(0,t.indexOf(n[0])):""}if(e){i.extension=n[0]}else{i.extension=n[1]}return i};m.prototype._getDeleteButton=function(){var t=this.getParent();if(!this._oDeleteButton){this._oDeleteButton=new r({id:this.getId()+"-deleteButton",icon:"sap-icon://decline",type:a.ButtonType.Standard,enabled:this.getEnabledRemove(),visible:this.getVisibleRemove(),tooltip:this._oRb.getText("UPLOAD_SET_DELETE_BUTTON_TEXT"),press:[this,t._handleItemDelete,t]});this._oDeleteButton.addStyleClass("sapMUCDeleteBtn");this.addDependent(this._oDeleteButton)}return this._oDeleteButton};m.prototype._getTerminateButton=function(){var t=this.getParent();if(!this._oTerminateButton){this._oTerminateButton=new r({id:this.getId()+"-terminateButton",icon:"sap-icon://stop",type:a.ButtonType.Standard,visible:t.getTerminationEnabled()&&this.getUploadState()===f.Uploading,tooltip:this._oRb.getText("UPLOAD_SET_TERMINATE_BUTTON_TEXT"),press:[this,t._handleTerminateRequest,t]});this._oTerminateButton.addStyleClass("sapMUCDeleteBtn");this.addDependent(this._oTerminateButton)}return this._oTerminateButton};m.prototype._getConfirmRenameButton=function(){var t=this.getParent();if(!this._oConfirmRenameButton){this._oConfirmRenameButton=new r({id:this.getId()+"-okButton",text:this._oRb.getText("UPLOAD_SET_RENAME_BUTTON_TEXT"),type:a.ButtonType.Transparent,press:[this,t._handleItemEditConfirmation,t]});this._oConfirmRenameButton.addStyleClass("sapMUCOkBtn");this.addDependent(this._oConfirmRenameButton)}return this._oConfirmRenameButton};m.prototype._getCancelRenameButton=function(){var t=this.getParent();if(!this._oCancelRenameButton){this._oCancelRenameButton=new r({id:this.getId()+"-cancelButton",text:this._oRb.getText("UPLOAD_SET_CANCEL_BUTTON_TEXT"),type:a.ButtonType.Transparent,press:[this,t._handleItemEditCancelation,t]});this._oCancelRenameButton.addStyleClass("sapMUCCancelBtn");this.addDependent(this._oCancelRenameButton)}return this._oCancelRenameButton};m.prototype._getProgressBox=function(){if(!this._oProgressBox){this._oProgressBox=new c({id:this.getId()+"-progressBox",items:[this._getProgressIndicator(),new g({justifyContent:y.SpaceBetween,items:[this._getStateLabel(),this._getProgressLabel()]})],width:"20%"});this._oProgressBox.addStyleClass("sapMUSProgressBox");this.addDependent(this._oProgressBox)}return this._oProgressBox};m.prototype._getProgressIndicator=function(){if(!this._oProgressIndicator){this._oProgressIndicator=new _({id:this.getId()+"-progressIndicator",percentValue:0,state:b.Information,visible:this.getUploadState()!==f.Complete});this._oProgressIndicator.addStyleClass("sapMUSProgressIndicator")}return this._oProgressIndicator};m.prototype._getStateLabel=function(){if(!this._oStateLabel){this._oStateLabel=new p({id:this.getId()+"-stateLabel",text:"Pending",visible:this.getUploadState()!==f.Complete})}return this._oStateLabel};m.prototype._getProgressLabel=function(){if(!this._oProgressLabel){this._oProgressLabel=new p({id:this.getId()+"-progressLabel",visible:this.getUploadState()!==f.Complete});this.setProgress(0);this.addDependent(this._oProgressLabel)}return this._oProgressLabel};m.prototype._renderAttributes=function(t){var e=this.getAttributes().length-1;if(this.getAttributes().length>0){t.openStart("div").class("sapMUCAttrContainer").openEnd();this.getAttributes().forEach(function(i,s){t.renderControl(i.addStyleClass("sapMUCAttr"));if(s<e&&i.getVisible()){t.openStart("div").class("sapMUCSeparator").openEnd();t.text(" · ").close("div")}});t.close("div")}};m.prototype._renderMarkers=function(t){if(this.getMarkers().length>0){t.openStart("div").class("sapMUSObjectMarkerContainer").openEnd();this.getMarkers().forEach(function(e){t.renderControl(e.addStyleClass("sapMUCObjectMarker"))});t.close("div")}};m.prototype._renderStatuses=function(t){var e=this.getStatuses().length-1;if(this.getStatuses().length>0){t.openStart("div").class("sapMUCStatusContainer").openEnd();this.getStatuses().forEach(function(i,s){t.renderControl(i);if(s<e){t.openStart("div").class("sapMUCSeparator").openEnd();t.text(" · ").close("div")}});t.close("div")}};m.prototype._renderStateAndProgress=function(t){t.renderControl(this._getProgressBox())};m.prototype._renderButtons=function(t){var e;if(this._bInEditMode){e=[this._getConfirmRenameButton(),this._getCancelRenameButton()]}else{e=[this._getRestartButton(),this._getEditButton(),this._getDeleteButton(),this._getTerminateButton()]}if(e.length>0){t.openStart("div").class("sapMUCButtonContainer").openEnd();e.forEach(function(i,s){if(s<e.length-1){i.addStyleClass("sapMUCFirstButton")}t.renderControl(i)});t.close("div")}};m.prototype._checkTypeRestriction=function(t){var e=m._splitFileName(this.getFileName()),i=!!this.getFileName()&&!!t&&t.length>0&&e.extension&&t.indexOf(e.extension.toLowerCase())===-1;if(i!==this._bFileTypeRestricted){this._bFileTypeRestricted=i;this.invalidate();if(i&&this.getParent()){this.getParent().fireFileTypeMismatch({item:this})}}};m.prototype._checkNameLengthRestriction=function(t){var e=t&&!!this.getFileName()&&this.getFileName().length>t;if(e!==this._bNameLengthRestricted){this._bNameLengthRestricted=e;this.invalidate();if(e&&this.getParent()){this.getParent().fireFileNameLengthExceeded({item:this})}}};m.prototype._checkSizeRestriction=function(t){var e=t&&this._fFileSize>t;if(e!==this._bSizeRestricted){this._bSizeRestricted=e;this.invalidate();if(e&&this.getParent()){this.getParent().fireFileSizeExceeded({item:this})}}};m.prototype._checkMediaTypeRestriction=function(t){var e=!!t&&t.length>0&&!!this.getMediaType()&&t.indexOf(this.getMediaType())===-1;if(e!==this._bMediaTypeRestricted){this._bMediaTypeRestricted=e;this.invalidate();if(e&&this.getParent()){this.getParent().fireMediaTypeMismatch({item:this})}}};m.prototype._isRestricted=function(){return this._bFileTypeRestricted||this._bNameLengthRestricted||this._bSizeRestricted||this._bMediaTypeRestricted};m.prototype.exit=function(){if(this._oProgressIndicator){this._oProgressIndicator.destroy();this._oProgressIndicator=null}if(this._oStateLabel){this._oStateLabel.destroy();this._oStateLabel=null}if(this._oProgressBox){this._oProgressBox.destroy();this._oProgressBox=null}};m.prototype._reset=function(){if(this._oListItem){this._oListItem.destroy();this._oListItem=null}this._oListItem=null;if(this._oIcon){this.removeDependent(this._oIcon);this._oIcon.destroy();this._oIcon=null}if(this._oFileNameLink){this.removeDependent(this._oFileNameLink);this._oFileNameLink.destroy();this._oFileNameLink=null}this._oDynamicContent=null};return m});