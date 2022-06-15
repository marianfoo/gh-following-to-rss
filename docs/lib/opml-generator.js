sap.ui.define([],function(){
/**
   * Created by azu on 2014/01/18.
   * LICENSE : MIT
   */
function n(e){return e.map(function(e){if(e.hasOwnProperty("_children")){var r=e["_children"];delete e["_children"];return{outline:n(r).concat({_attr:e})}}return{outline:{_attr:e}}})}function e(e){return xml({body:n(e)})}function r(n){var e=Object.keys(n).map(function(e){var r={};var t=n[e];if(e==="dateCreated"&&t instanceof Date){r[e]=t.toUTCString()}else{r[e]=t}return r});return xml({head:e})}function t(n,t){var i=r(n);var a=e(t);return'<?xml version="1.0" encoding="UTF-8"?><opml version="2.0">'+i+a+"</opml>"}var i={__esModule:true};i.main=t;return i});