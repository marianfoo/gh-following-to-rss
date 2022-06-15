sap.ui.define([],function(){
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */
const e=function(e){const t=[];let n=0;for(let i=0;i<e.length;i++){let r=e.charCodeAt(i);if(r<128){t[n++]=r}else if(r<2048){t[n++]=r>>6|192;t[n++]=r&63|128}else if((r&64512)===55296&&i+1<e.length&&(e.charCodeAt(i+1)&64512)===56320){r=65536+((r&1023)<<10)+(e.charCodeAt(++i)&1023);t[n++]=r>>18|240;t[n++]=r>>12&63|128;t[n++]=r>>6&63|128;t[n++]=r&63|128}else{t[n++]=r>>12|224;t[n++]=r>>6&63|128;t[n++]=r&63|128}}return t};const t=function(e){const t=[];let n=0,i=0;while(n<e.length){const r=e[n++];if(r<128){t[i++]=String.fromCharCode(r)}else if(r>191&&r<224){const s=e[n++];t[i++]=String.fromCharCode((r&31)<<6|s&63)}else if(r>239&&r<365){const s=e[n++];const o=e[n++];const a=e[n++];const c=((r&7)<<18|(s&63)<<12|(o&63)<<6|a&63)-65536;t[i++]=String.fromCharCode(55296+(c>>10));t[i++]=String.fromCharCode(56320+(c&1023))}else{const s=e[n++];const o=e[n++];t[i++]=String.fromCharCode((r&15)<<12|(s&63)<<6|o&63)}}return t.join("")};const n={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZ"+"abcdefghijklmnopqrstuvwxyz"+"0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob==="function",encodeByteArray(e,t){if(!Array.isArray(e)){throw Error("encodeByteArray takes an array as a parameter")}this.init_();const n=t?this.byteToCharMapWebSafe_:this.byteToCharMap_;const i=[];for(let t=0;t<e.length;t+=3){const r=e[t];const s=t+1<e.length;const o=s?e[t+1]:0;const a=t+2<e.length;const c=a?e[t+2]:0;const u=r>>2;const d=(r&3)<<4|o>>4;let l=(o&15)<<2|c>>6;let h=c&63;if(!a){h=64;if(!s){l=64}}i.push(n[u],n[d],n[l],n[h])}return i.join("")},encodeString(t,n){if(this.HAS_NATIVE_SUPPORT&&!n){return btoa(t)}return this.encodeByteArray(e(t),n)},decodeString(e,n){if(this.HAS_NATIVE_SUPPORT&&!n){return atob(e)}return t(this.decodeStringToByteArray(e,n))},decodeStringToByteArray(e,t){this.init_();const n=t?this.charToByteMapWebSafe_:this.charToByteMap_;const i=[];for(let t=0;t<e.length;){const r=n[e.charAt(t++)];const s=t<e.length;const o=s?n[e.charAt(t)]:0;++t;const a=t<e.length;const c=a?n[e.charAt(t)]:64;++t;const u=t<e.length;const d=u?n[e.charAt(t)]:64;++t;if(r==null||o==null||c==null||d==null){throw Error()}const l=r<<2|o>>4;i.push(l);if(c!==64){const e=o<<4&240|c>>2;i.push(e);if(d!==64){const e=c<<6&192|d;i.push(e)}}}return i},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={};this.charToByteMap_={};this.byteToCharMapWebSafe_={};this.charToByteMapWebSafe_={};for(let e=0;e<this.ENCODED_VALS.length;e++){this.byteToCharMap_[e]=this.ENCODED_VALS.charAt(e);this.charToByteMap_[this.byteToCharMap_[e]]=e;this.byteToCharMapWebSafe_[e]=this.ENCODED_VALS_WEBSAFE.charAt(e);this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]]=e;if(e>=this.ENCODED_VALS_BASE.length){this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)]=e;this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)]=e}}}}};const i=function(e){try{return n.decodeString(e,true)}catch(e){console.error("base64Decode failed: ",e)}return null};
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function r(){if(typeof navigator!=="undefined"&&typeof navigator["userAgent"]==="string"){return navigator["userAgent"]}else{return""}}function s(){return typeof window!=="undefined"&&!!(window["cordova"]||window["phonegap"]||window["PhoneGap"])&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(r())}function o(){const e=typeof chrome==="object"?chrome.runtime:typeof browser==="object"?browser.runtime:undefined;return typeof e==="object"&&e.id!==undefined}function a(){return typeof navigator==="object"&&navigator["product"]==="ReactNative"}function c(){const e=r();return e.indexOf("MSIE ")>=0||e.indexOf("Trident/")>=0}
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */const u="FirebaseError";class d extends Error{constructor(e,t,n){super(t);this.code=e;this.customData=n;this.name=u;Object.setPrototypeOf(this,d.prototype);if(Error.captureStackTrace){Error.captureStackTrace(this,l.prototype.create)}}}class l{constructor(e,t,n){this.service=e;this.serviceName=t;this.errors=n}create(e,...t){const n=t[0]||{};const i=`${this.service}/${e}`;const r=this.errors[e];const s=r?h(r,n):"Error";const o=`${this.serviceName}: ${s} (${i}).`;const a=new d(i,o,n);return a}}function h(e,t){return e.replace(f,(e,n)=>{const i=t[n];return i!=null?String(i):`<${n}?>`})}const f=/\{\$([^}]+)}/g;function p(e){for(const t in e){if(Object.prototype.hasOwnProperty.call(e,t)){return false}}return true}function m(e,t){if(e===t){return true}const n=Object.keys(e);const i=Object.keys(t);for(const r of n){if(!i.includes(r)){return false}const n=e[r];const s=t[r];if(g(n)&&g(s)){if(!m(n,s)){return false}}else if(n!==s){return false}}for(const e of i){if(!n.includes(e)){return false}}return true}function g(e){return e!==null&&typeof e==="object"}
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function v(e){const t=[];for(const[n,i]of Object.entries(e)){if(Array.isArray(i)){i.forEach(e=>{t.push(encodeURIComponent(n)+"="+encodeURIComponent(e))})}else{t.push(encodeURIComponent(n)+"="+encodeURIComponent(i))}}return t.length?"&"+t.join("&"):""}function I(e){const t={};const n=e.replace(/^\?/,"").split("&");n.forEach(e=>{if(e){const[n,i]=e.split("=");t[decodeURIComponent(n)]=decodeURIComponent(i)}});return t}function _(e){const t=e.indexOf("?");if(!t){return""}const n=e.indexOf("#",t);return e.substring(t,n>0?n:undefined)}function y(e,t){const n=new T(e,t);return n.subscribe.bind(n)}class T{constructor(e,t){this.observers=[];this.unsubscribes=[];this.observerCount=0;this.task=Promise.resolve();this.finalized=false;this.onNoObservers=t;this.task.then(()=>{e(this)}).catch(e=>{this.error(e)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)});this.close(e)}complete(){this.forEachObserver(e=>{e.complete()});this.close()}subscribe(e,t,n){let i;if(e===undefined&&t===undefined&&n===undefined){throw new Error("Missing Observer.")}if(E(e,["next","error","complete"])){i=e}else{i={next:e,error:t,complete:n}}if(i.next===undefined){i.next=w}if(i.error===undefined){i.error=w}if(i.complete===undefined){i.complete=w}const r=this.unsubscribeOne.bind(this,this.observers.length);if(this.finalized){this.task.then(()=>{try{if(this.finalError){i.error(this.finalError)}else{i.complete()}}catch(e){}return})}this.observers.push(i);return r}unsubscribeOne(e){if(this.observers===undefined||this.observers[e]===undefined){return}delete this.observers[e];this.observerCount-=1;if(this.observerCount===0&&this.onNoObservers!==undefined){this.onNoObservers(this)}}forEachObserver(e){if(this.finalized){return}for(let t=0;t<this.observers.length;t++){this.sendOne(t,e)}}sendOne(e,t){this.task.then(()=>{if(this.observers!==undefined&&this.observers[e]!==undefined){try{t(this.observers[e])}catch(e){if(typeof console!=="undefined"&&console.error){console.error(e)}}}})}close(e){if(this.finalized){return}this.finalized=true;if(e!==undefined){this.finalError=e}this.task.then(()=>{this.observers=undefined;this.onNoObservers=undefined})}}function E(e,t){if(typeof e!=="object"||e===null){return false}for(const n of t){if(n in e&&typeof e[n]==="function"){return true}}return false}function w(){}
/**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function k(e){if(e&&e._delegate){return e._delegate}else{return e}}
/*! *****************************************************************************
  Copyright (c) Microsoft Corporation.
  
  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.
  
  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** */function b(e,t){var n={};for(var i in e)if(Object.prototype.hasOwnProperty.call(e,i)&&t.indexOf(i)<0)n[i]=e[i];if(e!=null&&typeof Object.getOwnPropertySymbols==="function")for(var r=0,i=Object.getOwnPropertySymbols(e);r<i.length;r++){if(t.indexOf(i[r])<0&&Object.prototype.propertyIsEnumerable.call(e,i[r]))n[i[r]]=e[i[r]]}return n}
/**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */var A;(function(e){e[e["DEBUG"]=0]="DEBUG";e[e["VERBOSE"]=1]="VERBOSE";e[e["INFO"]=2]="INFO";e[e["WARN"]=3]="WARN";e[e["ERROR"]=4]="ERROR";e[e["SILENT"]=5]="SILENT"})(A||(A={}));const R={debug:A.DEBUG,verbose:A.VERBOSE,info:A.INFO,warn:A.WARN,error:A.ERROR,silent:A.SILENT};const S=A.INFO;const N={[A.DEBUG]:"log",[A.VERBOSE]:"log",[A.INFO]:"info",[A.WARN]:"warn",[A.ERROR]:"error"};const O=(e,t,...n)=>{if(t<e.logLevel){return}const i=(new Date).toISOString();const r=N[t];if(r){console[r](`[${i}]  ${e.name}:`,...n)}else{throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`)}};class P{constructor(e){this.name=e;this._logLevel=S;this._logHandler=O;this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in A)){throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``)}this._logLevel=e}setLogLevel(e){this._logLevel=typeof e==="string"?R[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!=="function"){throw new TypeError("Value assigned to `logHandler` must be a function")}this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,A.DEBUG,...e);this._logHandler(this,A.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,A.VERBOSE,...e);this._logHandler(this,A.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,A.INFO,...e);this._logHandler(this,A.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,A.WARN,...e);this._logHandler(this,A.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,A.ERROR,...e);this._logHandler(this,A.ERROR,...e)}}class C{constructor(e,t,n){this.name=e;this.instanceFactory=t;this.type=n;this.multipleInstances=false;this.serviceProps={};this.instantiationMode="LAZY";this.onInstanceCreated=null}setInstantiationMode(e){this.instantiationMode=e;return this}setMultipleInstances(e){this.multipleInstances=e;return this}setServiceProps(e){this.serviceProps=e;return this}setInstanceCreatedCallback(e){this.onInstanceCreated=e;return this}}
/**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */const D={PHONE:"phone"};const L={FACEBOOK:"facebook.com",GITHUB:"github.com",GOOGLE:"google.com",PASSWORD:"password",PHONE:"phone",TWITTER:"twitter.com"};const M={EMAIL_LINK:"emailLink",EMAIL_PASSWORD:"password",FACEBOOK:"facebook.com",GITHUB:"github.com",GOOGLE:"google.com",PHONE:"phone",TWITTER:"twitter.com"};const U={LINK:"link",REAUTHENTICATE:"reauthenticate",SIGN_IN:"signIn"};const F={EMAIL_SIGNIN:"EMAIL_SIGNIN",PASSWORD_RESET:"PASSWORD_RESET",RECOVER_EMAIL:"RECOVER_EMAIL",REVERT_SECOND_FACTOR_ADDITION:"REVERT_SECOND_FACTOR_ADDITION",VERIFY_AND_CHANGE_EMAIL:"VERIFY_AND_CHANGE_EMAIL",VERIFY_EMAIL:"VERIFY_EMAIL"};
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function V(){return{["admin-restricted-operation"]:"This operation is restricted to administrators only.",["argument-error"]:"",["app-not-authorized"]:"This app, identified by the domain where it's hosted, is not "+"authorized to use Firebase Authentication with the provided API key. "+"Review your key configuration in the Google API console.",["app-not-installed"]:"The requested mobile application corresponding to the identifier ("+"Android package name or iOS bundle ID) provided is not installed on "+"this device.",["captcha-check-failed"]:"The reCAPTCHA response token provided is either invalid, expired, "+"already used or the domain associated with it does not match the list "+"of whitelisted domains.",["code-expired"]:"The SMS code has expired. Please re-send the verification code to try "+"again.",["cordova-not-ready"]:"Cordova framework is not ready.",["cors-unsupported"]:"This browser is not supported.",["credential-already-in-use"]:"This credential is already associated with a different user account.",["custom-token-mismatch"]:"The custom token corresponds to a different audience.",["requires-recent-login"]:"This operation is sensitive and requires recent authentication. Log in "+"again before retrying this request.",["dependent-sdk-initialized-before-auth"]:"Another Firebase SDK was initialized and is trying to use Auth before Auth is "+"initialized. Please be sure to call `initializeAuth` or `getAuth` before "+"starting any other Firebase SDK.",["dynamic-link-not-activated"]:"Please activate Dynamic Links in the Firebase Console and agree to the terms and "+"conditions.",["email-change-needs-verification"]:"Multi-factor users must always have a verified email.",["email-already-in-use"]:"The email address is already in use by another account.",["emulator-config-failed"]:"Auth instance has already been used to make a network call. Auth can "+"no longer be configured to use the emulator. Try calling "+'"connectAuthEmulator()" sooner.',["expired-action-code"]:"The action code has expired.",["cancelled-popup-request"]:"This operation has been cancelled due to another conflicting popup being opened.",["internal-error"]:"An internal AuthError has occurred.",["invalid-app-credential"]:"The phone verification request contains an invalid application verifier."+" The reCAPTCHA token response is either invalid or expired.",["invalid-app-id"]:"The mobile app identifier is not registed for the current project.",["invalid-user-token"]:"This user's credential isn't valid for this project. This can happen "+"if the user's token has been tampered with, or if the user isn't for "+"the project associated with this API key.",["invalid-auth-event"]:"An internal AuthError has occurred.",["invalid-verification-code"]:"The SMS verification code used to create the phone auth credential is "+"invalid. Please resend the verification code sms and be sure to use the "+"verification code provided by the user.",["invalid-continue-uri"]:"The continue URL provided in the request is invalid.",["invalid-cordova-configuration"]:"The following Cordova plugins must be installed to enable OAuth sign-in: "+"cordova-plugin-buildinfo, cordova-universal-links-plugin, "+"cordova-plugin-browsertab, cordova-plugin-inappbrowser and "+"cordova-plugin-customurlscheme.",["invalid-custom-token"]:"The custom token format is incorrect. Please check the documentation.",["invalid-dynamic-link-domain"]:"The provided dynamic link domain is not configured or authorized for the current project.",["invalid-email"]:"The email address is badly formatted.",["invalid-emulator-scheme"]:"Emulator URL must start with a valid scheme (http:// or https://).",["invalid-api-key"]:"Your API key is invalid, please check you have copied it correctly.",["invalid-cert-hash"]:"The SHA-1 certificate hash provided is invalid.",["invalid-credential"]:"The supplied auth credential is malformed or has expired.",["invalid-message-payload"]:"The email template corresponding to this action contains invalid characters in its message. "+"Please fix by going to the Auth email templates section in the Firebase Console.",["invalid-multi-factor-session"]:"The request does not contain a valid proof of first factor successful sign-in.",["invalid-oauth-provider"]:"EmailAuthProvider is not supported for this operation. This operation "+"only supports OAuth providers.",["invalid-oauth-client-id"]:"The OAuth client ID provided is either invalid or does not match the "+"specified API key.",["unauthorized-domain"]:"This domain is not authorized for OAuth operations for your Firebase "+"project. Edit the list of authorized domains from the Firebase console.",["invalid-action-code"]:"The action code is invalid. This can happen if the code is malformed, "+"expired, or has already been used.",["wrong-password"]:"The password is invalid or the user does not have a password.",["invalid-persistence-type"]:"The specified persistence type is invalid. It can only be local, session or none.",["invalid-phone-number"]:"The format of the phone number provided is incorrect. Please enter the "+"phone number in a format that can be parsed into E.164 format. E.164 "+"phone numbers are written in the format [+][country code][subscriber "+"number including area code].",["invalid-provider-id"]:"The specified provider ID is invalid.",["invalid-recipient-email"]:"The email corresponding to this action failed to send as the provided "+"recipient email address is invalid.",["invalid-sender"]:"The email template corresponding to this action contains an invalid sender email or name. "+"Please fix by going to the Auth email templates section in the Firebase Console.",["invalid-verification-id"]:"The verification ID used to create the phone auth credential is invalid.",["invalid-tenant-id"]:"The Auth instance's tenant ID is invalid.",["login-blocked"]:"Login blocked by user-provided method: {$originalMessage}",["missing-android-pkg-name"]:"An Android Package Name must be provided if the Android App is required to be installed.",["auth-domain-config-required"]:"Be sure to include authDomain when calling firebase.initializeApp(), "+"by following the instructions in the Firebase console.",["missing-app-credential"]:"The phone verification request is missing an application verifier "+"assertion. A reCAPTCHA response token needs to be provided.",["missing-verification-code"]:"The phone auth credential was created with an empty SMS verification code.",["missing-continue-uri"]:"A continue URL must be provided in the request.",["missing-iframe-start"]:"An internal AuthError has occurred.",["missing-ios-bundle-id"]:"An iOS Bundle ID must be provided if an App Store ID is provided.",["missing-or-invalid-nonce"]:"The request does not contain a valid nonce. This can occur if the "+"SHA-256 hash of the provided raw nonce does not match the hashed nonce "+"in the ID token payload.",["missing-multi-factor-info"]:"No second factor identifier is provided.",["missing-multi-factor-session"]:"The request is missing proof of first factor successful sign-in.",["missing-phone-number"]:"To send verification codes, provide a phone number for the recipient.",["missing-verification-id"]:"The phone auth credential was created with an empty verification ID.",["app-deleted"]:"This instance of FirebaseApp has been deleted.",["multi-factor-info-not-found"]:"The user does not have a second factor matching the identifier provided.",["multi-factor-auth-required"]:"Proof of ownership of a second factor is required to complete sign-in.",["account-exists-with-different-credential"]:"An account already exists with the same email address but different "+"sign-in credentials. Sign in using a provider associated with this "+"email address.",["network-request-failed"]:"A network AuthError (such as timeout, interrupted connection or unreachable host) has occurred.",["no-auth-event"]:"An internal AuthError has occurred.",["no-such-provider"]:"User was not linked to an account with the given provider.",["null-user"]:"A null user object was provided as the argument for an operation which "+"requires a non-null user object.",["operation-not-allowed"]:"The given sign-in provider is disabled for this Firebase project. "+"Enable it in the Firebase console, under the sign-in method tab of the "+"Auth section.",["operation-not-supported-in-this-environment"]:"This operation is not supported in the environment this application is "+'running on. "location.protocol" must be http, https or chrome-extension'+" and web storage must be enabled.",["popup-blocked"]:"Unable to establish a connection with the popup. It may have been blocked by the browser.",["popup-closed-by-user"]:"The popup has been closed by the user before finalizing the operation.",["provider-already-linked"]:"User can only be linked to one identity for the given provider.",["quota-exceeded"]:"The project's quota for this operation has been exceeded.",["redirect-cancelled-by-user"]:"The redirect operation has been cancelled by the user before finalizing.",["redirect-operation-pending"]:"A redirect sign-in operation is already pending.",["rejected-credential"]:"The request contains malformed or mismatching credentials.",["second-factor-already-in-use"]:"The second factor is already enrolled on this account.",["maximum-second-factor-count-exceeded"]:"The maximum allowed number of second factors on a user has been exceeded.",["tenant-id-mismatch"]:"The provided tenant ID does not match the Auth instance's tenant ID",["timeout"]:"The operation has timed out.",["user-token-expired"]:"The user's credential is no longer valid. The user must sign in again.",["too-many-requests"]:"We have blocked all requests from this device due to unusual activity. "+"Try again later.",["unauthorized-continue-uri"]:"The domain of the continue URL is not whitelisted.  Please whitelist "+"the domain in the Firebase console.",["unsupported-first-factor"]:"Enrolling a second factor or signing in with a multi-factor account requires sign-in with a supported first factor.",["unsupported-persistence-type"]:"The current environment does not support the specified persistence type.",["unsupported-tenant-operation"]:"This operation is not supported in a multi-tenant context.",["unverified-email"]:"The operation requires a verified email.",["user-cancelled"]:"The user did not grant your application the permissions it requested.",["user-not-found"]:"There is no user record corresponding to this identifier. The user may "+"have been deleted.",["user-disabled"]:"The user account has been disabled by an administrator.",["user-mismatch"]:"The supplied credentials do not correspond to the previously signed in user.",["user-signed-out"]:"",["weak-password"]:"The password must be 6 characters long or more.",["web-storage-unsupported"]:"This browser is not supported or 3rd party cookies and data may be disabled.",["already-initialized"]:"initializeAuth() has already been called with "+"different options. To avoid this error, call initializeAuth() with the "+"same options as when it was originally called, or call getAuth() to return the"+" already initialized instance."}}function x(){return{["dependent-sdk-initialized-before-auth"]:"Another Firebase SDK was initialized and is trying to use Auth before Auth is "+"initialized. Please be sure to call `initializeAuth` or `getAuth` before "+"starting any other Firebase SDK."}}const H=V;const j=x;const W=new l("auth","Firebase",x());const q={ADMIN_ONLY_OPERATION:"auth/admin-restricted-operation",ARGUMENT_ERROR:"auth/argument-error",APP_NOT_AUTHORIZED:"auth/app-not-authorized",APP_NOT_INSTALLED:"auth/app-not-installed",CAPTCHA_CHECK_FAILED:"auth/captcha-check-failed",CODE_EXPIRED:"auth/code-expired",CORDOVA_NOT_READY:"auth/cordova-not-ready",CORS_UNSUPPORTED:"auth/cors-unsupported",CREDENTIAL_ALREADY_IN_USE:"auth/credential-already-in-use",CREDENTIAL_MISMATCH:"auth/custom-token-mismatch",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"auth/requires-recent-login",DEPENDENT_SDK_INIT_BEFORE_AUTH:"auth/dependent-sdk-initialized-before-auth",DYNAMIC_LINK_NOT_ACTIVATED:"auth/dynamic-link-not-activated",EMAIL_CHANGE_NEEDS_VERIFICATION:"auth/email-change-needs-verification",EMAIL_EXISTS:"auth/email-already-in-use",EMULATOR_CONFIG_FAILED:"auth/emulator-config-failed",EXPIRED_OOB_CODE:"auth/expired-action-code",EXPIRED_POPUP_REQUEST:"auth/cancelled-popup-request",INTERNAL_ERROR:"auth/internal-error",INVALID_API_KEY:"auth/invalid-api-key",INVALID_APP_CREDENTIAL:"auth/invalid-app-credential",INVALID_APP_ID:"auth/invalid-app-id",INVALID_AUTH:"auth/invalid-user-token",INVALID_AUTH_EVENT:"auth/invalid-auth-event",INVALID_CERT_HASH:"auth/invalid-cert-hash",INVALID_CODE:"auth/invalid-verification-code",INVALID_CONTINUE_URI:"auth/invalid-continue-uri",INVALID_CORDOVA_CONFIGURATION:"auth/invalid-cordova-configuration",INVALID_CUSTOM_TOKEN:"auth/invalid-custom-token",INVALID_DYNAMIC_LINK_DOMAIN:"auth/invalid-dynamic-link-domain",INVALID_EMAIL:"auth/invalid-email",INVALID_EMULATOR_SCHEME:"auth/invalid-emulator-scheme",INVALID_IDP_RESPONSE:"auth/invalid-credential",INVALID_MESSAGE_PAYLOAD:"auth/invalid-message-payload",INVALID_MFA_SESSION:"auth/invalid-multi-factor-session",INVALID_OAUTH_CLIENT_ID:"auth/invalid-oauth-client-id",INVALID_OAUTH_PROVIDER:"auth/invalid-oauth-provider",INVALID_OOB_CODE:"auth/invalid-action-code",INVALID_ORIGIN:"auth/unauthorized-domain",INVALID_PASSWORD:"auth/wrong-password",INVALID_PERSISTENCE:"auth/invalid-persistence-type",INVALID_PHONE_NUMBER:"auth/invalid-phone-number",INVALID_PROVIDER_ID:"auth/invalid-provider-id",INVALID_RECIPIENT_EMAIL:"auth/invalid-recipient-email",INVALID_SENDER:"auth/invalid-sender",INVALID_SESSION_INFO:"auth/invalid-verification-id",INVALID_TENANT_ID:"auth/invalid-tenant-id",MFA_INFO_NOT_FOUND:"auth/multi-factor-info-not-found",MFA_REQUIRED:"auth/multi-factor-auth-required",MISSING_ANDROID_PACKAGE_NAME:"auth/missing-android-pkg-name",MISSING_APP_CREDENTIAL:"auth/missing-app-credential",MISSING_AUTH_DOMAIN:"auth/auth-domain-config-required",MISSING_CODE:"auth/missing-verification-code",MISSING_CONTINUE_URI:"auth/missing-continue-uri",MISSING_IFRAME_START:"auth/missing-iframe-start",MISSING_IOS_BUNDLE_ID:"auth/missing-ios-bundle-id",MISSING_OR_INVALID_NONCE:"auth/missing-or-invalid-nonce",MISSING_MFA_INFO:"auth/missing-multi-factor-info",MISSING_MFA_SESSION:"auth/missing-multi-factor-session",MISSING_PHONE_NUMBER:"auth/missing-phone-number",MISSING_SESSION_INFO:"auth/missing-verification-id",MODULE_DESTROYED:"auth/app-deleted",NEED_CONFIRMATION:"auth/account-exists-with-different-credential",NETWORK_REQUEST_FAILED:"auth/network-request-failed",NULL_USER:"auth/null-user",NO_AUTH_EVENT:"auth/no-auth-event",NO_SUCH_PROVIDER:"auth/no-such-provider",OPERATION_NOT_ALLOWED:"auth/operation-not-allowed",OPERATION_NOT_SUPPORTED:"auth/operation-not-supported-in-this-environment",POPUP_BLOCKED:"auth/popup-blocked",POPUP_CLOSED_BY_USER:"auth/popup-closed-by-user",PROVIDER_ALREADY_LINKED:"auth/provider-already-linked",QUOTA_EXCEEDED:"auth/quota-exceeded",REDIRECT_CANCELLED_BY_USER:"auth/redirect-cancelled-by-user",REDIRECT_OPERATION_PENDING:"auth/redirect-operation-pending",REJECTED_CREDENTIAL:"auth/rejected-credential",SECOND_FACTOR_ALREADY_ENROLLED:"auth/second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"auth/maximum-second-factor-count-exceeded",TENANT_ID_MISMATCH:"auth/tenant-id-mismatch",TIMEOUT:"auth/timeout",TOKEN_EXPIRED:"auth/user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"auth/too-many-requests",UNAUTHORIZED_DOMAIN:"auth/unauthorized-continue-uri",UNSUPPORTED_FIRST_FACTOR:"auth/unsupported-first-factor",UNSUPPORTED_PERSISTENCE:"auth/unsupported-persistence-type",UNSUPPORTED_TENANT_OPERATION:"auth/unsupported-tenant-operation",UNVERIFIED_EMAIL:"auth/unverified-email",USER_CANCELLED:"auth/user-cancelled",USER_DELETED:"auth/user-not-found",USER_DISABLED:"auth/user-disabled",USER_MISMATCH:"auth/user-mismatch",USER_SIGNED_OUT:"auth/user-signed-out",WEAK_PASSWORD:"auth/weak-password",WEB_STORAGE_UNSUPPORTED:"auth/web-storage-unsupported",ALREADY_INITIALIZED:"auth/already-initialized"};
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */const G=new P("@firebase/auth");function z(e,...t){if(G.logLevel<=A.ERROR){G.error(`Auth (${SDK_VERSION}): ${e}`,...t)}}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function B(e,...t){throw Y(e,...t)}function K(e,...t){return Y(e,...t)}function $(e,t,n){const i=Object.assign(Object.assign({},j()),{[t]:n});const r=new l("auth","Firebase",i);return r.create(t,{appName:e.name})}function J(e,t,n){const i=n;if(!(t instanceof i)){if(i.name!==t.constructor.name){B(e,"argument-error")}throw $(e,"argument-error",`Type of ${t.constructor.name} does not match expected instance.`+`Did you pass a reference from a different Auth SDK?`)}}function Y(e,...t){if(typeof e!=="string"){const n=t[0];const i=[...t.slice(1)];if(i[0]){i[0].appName=e.name}return e._errorFactory.create(n,...i)}return W.create(e,...t)}function X(e,t,...n){if(!e){throw Y(t,...n)}}function Q(e){const t=`INTERNAL ASSERTION FAILED: `+e;z(t);throw new Error(t)}function Z(e,t){if(!e){Q(t)}}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */const ee=new Map;function te(e){Z(e instanceof Function,"Expected a class definition");let t=ee.get(e);if(t){Z(t instanceof e,"Instance stored in cache mismatched with class");return t}t=new e;ee.set(e,t);return t}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function ne(e,t){const n=_getProvider(e,"auth");if(n.isInitialized()){const e=n.getImmediate();const i=n.getOptions();if(m(i,t!==null&&t!==void 0?t:{})){return e}else{B(e,"already-initialized")}}const i=n.initialize({options:t});return i}function ie(e,t){const n=(t===null||t===void 0?void 0:t.persistence)||[];const i=(Array.isArray(n)?n:[n]).map(te);if(t===null||t===void 0?void 0:t.errorMap){e._updateErrorMap(t.errorMap)}e._initializeWithPersistence(i,t===null||t===void 0?void 0:t.popupRedirectResolver)}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function re(){var e;return typeof self!=="undefined"&&((e=self.location)===null||e===void 0?void 0:e.href)||""}function se(){return oe()==="http:"||oe()==="https:"}function oe(){var e;return typeof self!=="undefined"&&((e=self.location)===null||e===void 0?void 0:e.protocol)||null}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function ae(){if(typeof navigator!=="undefined"&&navigator&&"onLine"in navigator&&typeof navigator.onLine==="boolean"&&(se()||o()||"connection"in navigator)){return navigator.onLine}return true}function ce(){if(typeof navigator==="undefined"){return null}const e=navigator;return e.languages&&e.languages[0]||e.language||null}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class ue{constructor(e,t){this.shortDelay=e;this.longDelay=t;Z(t>e,"Short delay should be less than long delay!");this.isMobile=s()||a()}get(){if(!ae()){return Math.min(5e3,this.shortDelay)}return this.isMobile?this.longDelay:this.shortDelay}}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function de(e,t){Z(e.emulator,"Emulator should always be set here");const{url:n}=e.emulator;if(!t){return n}return`${n}${t.startsWith("/")?t.slice(1):t}`}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class le{static initialize(e,t,n){this.fetchImpl=e;if(t){this.headersImpl=t}if(n){this.responseImpl=n}}static fetch(){if(this.fetchImpl){return this.fetchImpl}if(typeof self!=="undefined"&&"fetch"in self){return self.fetch}Q("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl){return this.headersImpl}if(typeof self!=="undefined"&&"Headers"in self){return self.Headers}Q("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl){return this.responseImpl}if(typeof self!=="undefined"&&"Response"in self){return self.Response}Q("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */const he={["CREDENTIAL_MISMATCH"]:"custom-token-mismatch",["MISSING_CUSTOM_TOKEN"]:"internal-error",["INVALID_IDENTIFIER"]:"invalid-email",["MISSING_CONTINUE_URI"]:"internal-error",["INVALID_PASSWORD"]:"wrong-password",["MISSING_PASSWORD"]:"internal-error",["EMAIL_EXISTS"]:"email-already-in-use",["PASSWORD_LOGIN_DISABLED"]:"operation-not-allowed",["INVALID_IDP_RESPONSE"]:"invalid-credential",["INVALID_PENDING_TOKEN"]:"invalid-credential",["FEDERATED_USER_ID_ALREADY_LINKED"]:"credential-already-in-use",["MISSING_REQ_TYPE"]:"internal-error",["EMAIL_NOT_FOUND"]:"user-not-found",["RESET_PASSWORD_EXCEED_LIMIT"]:"too-many-requests",["EXPIRED_OOB_CODE"]:"expired-action-code",["INVALID_OOB_CODE"]:"invalid-action-code",["MISSING_OOB_CODE"]:"internal-error",["CREDENTIAL_TOO_OLD_LOGIN_AGAIN"]:"requires-recent-login",["INVALID_ID_TOKEN"]:"invalid-user-token",["TOKEN_EXPIRED"]:"user-token-expired",["USER_NOT_FOUND"]:"user-token-expired",["TOO_MANY_ATTEMPTS_TRY_LATER"]:"too-many-requests",["INVALID_CODE"]:"invalid-verification-code",["INVALID_SESSION_INFO"]:"invalid-verification-id",["INVALID_TEMPORARY_PROOF"]:"invalid-credential",["MISSING_SESSION_INFO"]:"missing-verification-id",["SESSION_EXPIRED"]:"code-expired",["MISSING_ANDROID_PACKAGE_NAME"]:"missing-android-pkg-name",["UNAUTHORIZED_DOMAIN"]:"unauthorized-continue-uri",["INVALID_OAUTH_CLIENT_ID"]:"invalid-oauth-client-id",["ADMIN_ONLY_OPERATION"]:"admin-restricted-operation",["INVALID_MFA_PENDING_CREDENTIAL"]:"invalid-multi-factor-session",["MFA_ENROLLMENT_NOT_FOUND"]:"multi-factor-info-not-found",["MISSING_MFA_ENROLLMENT_ID"]:"missing-multi-factor-info",["MISSING_MFA_PENDING_CREDENTIAL"]:"missing-multi-factor-session",["SECOND_FACTOR_EXISTS"]:"second-factor-already-in-use",["SECOND_FACTOR_LIMIT_EXCEEDED"]:"maximum-second-factor-count-exceeded",["BLOCKING_FUNCTION_ERROR_RESPONSE"]:"internal-error"};
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */const fe=new ue(3e4,6e4);function pe(e,t){if(e.tenantId&&!t.tenantId){return Object.assign(Object.assign({},t),{tenantId:e.tenantId})}return t}async function me(e,t,n,i,r={}){return ge(e,r,async()=>{let r={};let s={};if(i){if(t==="GET"){s=i}else{r={body:JSON.stringify(i)}}}const o=v(Object.assign({key:e.config.apiKey},s)).slice(1);const a=await e._getAdditionalHeaders();a["Content-Type"]="application/json";if(e.languageCode){a["X-Firebase-Locale"]=e.languageCode}return le.fetch()(Ie(e,e.config.apiHost,n,o),Object.assign({method:t,headers:a,referrerPolicy:"no-referrer"},r))})}async function ge(e,t,n){e._canInitEmulator=false;const i=Object.assign(Object.assign({},he),t);try{const t=new _e(e);const r=await Promise.race([n(),t.promise]);t.clearNetworkTimeout();const s=await r.json();if("needConfirmation"in s){throw ye(e,"account-exists-with-different-credential",s)}if(r.ok&&!("errorMessage"in s)){return s}else{const t=r.ok?s.errorMessage:s.error.message;const[n,o]=t.split(" : ");if(n==="FEDERATED_USER_ID_ALREADY_LINKED"){throw ye(e,"credential-already-in-use",s)}else if(n==="EMAIL_EXISTS"){throw ye(e,"email-already-in-use",s)}else if(n==="USER_DISABLED"){throw ye(e,"user-disabled",s)}const a=i[n]||n.toLowerCase().replace(/[_\s]+/g,"-");if(o){throw $(e,a,o)}else{B(e,a)}}}catch(t){if(t instanceof d){throw t}B(e,"network-request-failed")}}async function ve(e,t,n,i,r={}){const s=await me(e,t,n,i,r);if("mfaPendingCredential"in s){B(e,"multi-factor-auth-required",{_serverResponse:s})}return s}function Ie(e,t,n,i){const r=`${t}${n}?${i}`;if(!e.config.emulator){return`${e.config.apiScheme}://${r}`}return de(e.config,r)}class _e{constructor(e){this.auth=e;this.timer=null;this.promise=new Promise((e,t)=>{this.timer=setTimeout(()=>t(K(this.auth,"network-request-failed")),fe.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function ye(e,t,n){const i={appName:e.name};if(n.email){i.email=n.email}if(n.phoneNumber){i.phoneNumber=n.phoneNumber}const r=K(e,t,i);r.customData._tokenResponse=n;return r}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */async function Te(e,t){return me(e,"POST","/v1/accounts:delete",t)}async function Ee(e,t){return me(e,"POST","/v1/accounts:update",t)}async function we(e,t){return me(e,"POST","/v1/accounts:lookup",t)}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function ke(e){if(!e){return undefined}try{const t=new Date(Number(e));if(!isNaN(t.getTime())){return t.toUTCString()}}catch(e){}return undefined}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function be(e,t=false){return k(e).getIdToken(t)}async function Ae(e,t=false){const n=k(e);const i=await n.getIdToken(t);const r=Se(i);X(r&&r.exp&&r.auth_time&&r.iat,n.auth,"internal-error");const s=typeof r.firebase==="object"?r.firebase:undefined;const o=s===null||s===void 0?void 0:s["sign_in_provider"];return{claims:r,token:i,authTime:ke(Re(r.auth_time)),issuedAtTime:ke(Re(r.iat)),expirationTime:ke(Re(r.exp)),signInProvider:o||null,signInSecondFactor:(s===null||s===void 0?void 0:s["sign_in_second_factor"])||null}}function Re(e){return Number(e)*1e3}function Se(e){const[t,n,r]=e.split(".");if(t===undefined||n===undefined||r===undefined){z("JWT malformed, contained fewer than 3 sections");return null}try{const e=i(n);if(!e){z("Failed to decode base64 JWT payload");return null}return JSON.parse(e)}catch(e){z("Caught error parsing JWT payload as JSON",e);return null}}function Ne(e){const t=Se(e);X(t,"internal-error");X(typeof t.exp!=="undefined","internal-error");X(typeof t.iat!=="undefined","internal-error");return Number(t.exp)-Number(t.iat)}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */async function Oe(e,t,n=false){if(n){return t}try{return await t}catch(t){if(t instanceof d&&Pe(t)){if(e.auth.currentUser===e){await e.auth.signOut()}}throw t}}function Pe({code:e}){return e===`auth/${"user-disabled"}`||e===`auth/${"user-token-expired"}`}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class Ce{constructor(e){this.user=e;this.isRunning=false;this.timerId=null;this.errorBackoff=3e4}_start(){if(this.isRunning){return}this.isRunning=true;this.schedule()}_stop(){if(!this.isRunning){return}this.isRunning=false;if(this.timerId!==null){clearTimeout(this.timerId)}}getInterval(e){var t;if(e){const e=this.errorBackoff;this.errorBackoff=Math.min(this.errorBackoff*2,96e4);return e}else{this.errorBackoff=3e4;const e=(t=this.user.stsTokenManager.expirationTime)!==null&&t!==void 0?t:0;const n=e-Date.now()-3e5;return Math.max(0,n)}}schedule(e=false){if(!this.isRunning){return}const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(true)}catch(e){if(e.code===`auth/${"network-request-failed"}`){this.schedule(true)}return}this.schedule()}}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class De{constructor(e,t){this.createdAt=e;this.lastLoginAt=t;this._initializeTime()}_initializeTime(){this.lastSignInTime=ke(this.lastLoginAt);this.creationTime=ke(this.createdAt)}_copy(e){this.createdAt=e.createdAt;this.lastLoginAt=e.lastLoginAt;this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}
/**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */async function Le(e){var t;const n=e.auth;const i=await e.getIdToken();const r=await Oe(e,we(n,{idToken:i}));X(r===null||r===void 0?void 0:r.users.length,n,"internal-error");const s=r.users[0];e._notifyReloadListener(s);const o=((t=s.providerUserInfo)===null||t===void 0?void 0:t.length)?Fe(s.providerUserInfo):[];const a=Ue(e.providerData,o);const c=e.isAnonymous;const u=!(e.email&&s.passwordHash)&&!(a===null||a===void 0?void 0:a.length);const d=!c?false:u;const l={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||false,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:a,metadata:new De(s.createdAt,s.lastLoginAt),isAnonymous:d};Object.assign(e,l)}async function Me(e){const t=k(e);await Le(t);await t.auth._persistUserIfCurrent(t);t.auth._notifyListenersIfCurrent(t)}function Ue(e,t){const n=e.filter(e=>!t.some(t=>t.providerId===e.providerId));return[...n,...t]}function Fe(e){return e.map(e=>{var{providerId:t}=e,n=b(e,["providerId"]);return{providerId:t,uid:n.rawId||"",displayName:n.displayName||null,email:n.email||null,phoneNumber:n.phoneNumber||null,photoURL:n.photoUrl||null}})}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */async function Ve(e,t){const n=await ge(e,{},async()=>{const n=v({grant_type:"refresh_token",refresh_token:t}).slice(1);const{tokenApiHost:i,apiKey:r}=e.config;const s=Ie(e,i,"/v1/token",`key=${r}`);const o=await e._getAdditionalHeaders();o["Content-Type"]="application/x-www-form-urlencoded";return le.fetch()(s,{method:"POST",headers:o,body:n})});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class xe{constructor(){this.refreshToken=null;this.accessToken=null;this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){X(e.idToken,"internal-error");X(typeof e.idToken!=="undefined","internal-error");X(typeof e.refreshToken!=="undefined","internal-error");const t="expiresIn"in e&&typeof e.expiresIn!=="undefined"?Number(e.expiresIn):Ne(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}async getToken(e,t=false){X(!this.accessToken||this.refreshToken,e,"user-token-expired");if(!t&&this.accessToken&&!this.isExpired){return this.accessToken}if(this.refreshToken){await this.refresh(e,this.refreshToken);return this.accessToken}return null}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:n,refreshToken:i,expiresIn:r}=await Ve(e,t);this.updateTokensAndExpiration(n,i,Number(r))}updateTokensAndExpiration(e,t,n){this.refreshToken=t||null;this.accessToken=e||null;this.expirationTime=Date.now()+n*1e3}static fromJSON(e,t){const{refreshToken:n,accessToken:i,expirationTime:r}=t;const s=new xe;if(n){X(typeof n==="string","internal-error",{appName:e});s.refreshToken=n}if(i){X(typeof i==="string","internal-error",{appName:e});s.accessToken=i}if(r){X(typeof r==="number","internal-error",{appName:e});s.expirationTime=r}return s}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken;this.refreshToken=e.refreshToken;this.expirationTime=e.expirationTime}_clone(){return Object.assign(new xe,this.toJSON())}_performRefresh(){return Q("not implemented")}}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function He(e,t){X(typeof e==="string"||typeof e==="undefined","internal-error",{appName:t})}class je{constructor(e){var{uid:t,auth:n,stsTokenManager:i}=e,r=b(e,["uid","auth","stsTokenManager"]);this.providerId="firebase";this.proactiveRefresh=new Ce(this);this.reloadUserInfo=null;this.reloadListener=null;this.uid=t;this.auth=n;this.stsTokenManager=i;this.accessToken=i.accessToken;this.displayName=r.displayName||null;this.email=r.email||null;this.emailVerified=r.emailVerified||false;this.phoneNumber=r.phoneNumber||null;this.photoURL=r.photoURL||null;this.isAnonymous=r.isAnonymous||false;this.tenantId=r.tenantId||null;this.providerData=r.providerData?[...r.providerData]:[];this.metadata=new De(r.createdAt||undefined,r.lastLoginAt||undefined)}async getIdToken(e){const t=await Oe(this,this.stsTokenManager.getToken(this.auth,e));X(t,this.auth,"internal-error");if(this.accessToken!==t){this.accessToken=t;await this.auth._persistUserIfCurrent(this);this.auth._notifyListenersIfCurrent(this)}return t}getIdTokenResult(e){return Ae(this,e)}reload(){return Me(this)}_assign(e){if(this===e){return}X(this.uid===e.uid,this.auth,"internal-error");this.displayName=e.displayName;this.photoURL=e.photoURL;this.email=e.email;this.emailVerified=e.emailVerified;this.phoneNumber=e.phoneNumber;this.isAnonymous=e.isAnonymous;this.tenantId=e.tenantId;this.providerData=e.providerData.map(e=>Object.assign({},e));this.metadata._copy(e.metadata);this.stsTokenManager._assign(e.stsTokenManager)}_clone(e){return new je(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}))}_onReload(e){X(!this.reloadListener,this.auth,"internal-error");this.reloadListener=e;if(this.reloadUserInfo){this._notifyReloadListener(this.reloadUserInfo);this.reloadUserInfo=null}}_notifyReloadListener(e){if(this.reloadListener){this.reloadListener(e)}else{this.reloadUserInfo=e}}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=false){let n=false;if(e.idToken&&e.idToken!==this.stsTokenManager.accessToken){this.stsTokenManager.updateFromServerResponse(e);n=true}if(t){await Le(this)}await this.auth._persistUserIfCurrent(this);if(n){this.auth._notifyListenersIfCurrent(this)}}async delete(){const e=await this.getIdToken();await Oe(this,Te(this.auth,{idToken:e}));this.stsTokenManager.clearRefreshToken();return this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||undefined,emailVerified:this.emailVerified,displayName:this.displayName||undefined,isAnonymous:this.isAnonymous,photoURL:this.photoURL||undefined,phoneNumber:this.phoneNumber||undefined,tenantId:this.tenantId||undefined,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var n,i,r,s,o,a,c,u;const d=(n=t.displayName)!==null&&n!==void 0?n:undefined;const l=(i=t.email)!==null&&i!==void 0?i:undefined;const h=(r=t.phoneNumber)!==null&&r!==void 0?r:undefined;const f=(s=t.photoURL)!==null&&s!==void 0?s:undefined;const p=(o=t.tenantId)!==null&&o!==void 0?o:undefined;const m=(a=t._redirectEventId)!==null&&a!==void 0?a:undefined;const g=(c=t.createdAt)!==null&&c!==void 0?c:undefined;const v=(u=t.lastLoginAt)!==null&&u!==void 0?u:undefined;const{uid:I,emailVerified:_,isAnonymous:y,providerData:T,stsTokenManager:E}=t;X(I&&E,e,"internal-error");const w=xe.fromJSON(this.name,E);X(typeof I==="string",e,"internal-error");He(d,e.name);He(l,e.name);X(typeof _==="boolean",e,"internal-error");X(typeof y==="boolean",e,"internal-error");He(h,e.name);He(f,e.name);He(p,e.name);He(m,e.name);He(g,e.name);He(v,e.name);const k=new je({uid:I,auth:e,email:l,emailVerified:_,displayName:d,isAnonymous:y,photoURL:f,phoneNumber:h,tenantId:p,stsTokenManager:w,createdAt:g,lastLoginAt:v});if(T&&Array.isArray(T)){k.providerData=T.map(e=>Object.assign({},e))}if(m){k._redirectEventId=m}return k}static async _fromIdTokenResponse(e,t,n=false){const i=new xe;i.updateFromServerResponse(t);const r=new je({uid:t.localId,auth:e,stsTokenManager:i,isAnonymous:n});await Le(r);return r}}
/**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class We{constructor(){this.type="NONE";this.storage={}}async _isAvailable(){return true}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===undefined?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){return}_removeListener(e,t){return}}We.type="NONE";const qe=We;
/**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function Ge(e,t,n){return`${"firebase"}:${e}:${t}:${n}`}class ze{constructor(e,t,n){this.persistence=e;this.auth=t;this.userKey=n;const{config:i,name:r}=this.auth;this.fullUserKey=Ge(this.userKey,i.apiKey,r);this.fullPersistenceKey=Ge("persistence",i.apiKey,r);this.boundEventHandler=t._onStorageEvent.bind(t);this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?je._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e){return}const t=await this.getCurrentUser();await this.removeCurrentUser();this.persistence=e;if(t){return this.setCurrentUser(t)}}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,n="authUser"){if(!t.length){return new ze(te(qe),e,n)}const i=(await Promise.all(t.map(async e=>{if(await e._isAvailable()){return e}return undefined}))).filter(e=>e);let r=i[0]||te(qe);const s=Ge(n,e.config.apiKey,e.name);let o=null;for(const n of t){try{const t=await n._get(s);if(t){const i=je._fromJSON(e,t);if(n!==r){o=i}r=n;break}}catch(e){}}const a=i.filter(e=>e._shouldAllowMigration);if(!r._shouldAllowMigration||!a.length){return new ze(r,e,n)}r=a[0];if(o){await r._set(s,o.toJSON())}await Promise.all(t.map(async e=>{if(e!==r){try{await e._remove(s)}catch(e){}}}));return new ze(r,e,n)}}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function Be(e){const t=e.toLowerCase();if(t.includes("opera/")||t.includes("opr/")||t.includes("opios/")){return"Opera"}else if(Ye(t)){return"IEMobile"}else if(t.includes("msie")||t.includes("trident/")){return"IE"}else if(t.includes("edge/")){return"Edge"}else if(Ke(t)){return"Firefox"}else if(t.includes("silk/")){return"Silk"}else if(Qe(t)){return"Blackberry"}else if(Ze(t)){return"Webos"}else if($e(t)){return"Safari"}else if((t.includes("chrome/")||Je(t))&&!t.includes("edge/")){return"Chrome"}else if(Xe(t)){return"Android"}else{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/;const n=e.match(t);if((n===null||n===void 0?void 0:n.length)===2){return n[1]}}return"Other"}function Ke(e=r()){return/firefox\//i.test(e)}function $e(e=r()){const t=e.toLowerCase();return t.includes("safari/")&&!t.includes("chrome/")&&!t.includes("crios/")&&!t.includes("android")}function Je(e=r()){return/crios\//i.test(e)}function Ye(e=r()){return/iemobile/i.test(e)}function Xe(e=r()){return/android/i.test(e)}function Qe(e=r()){return/blackberry/i.test(e)}function Ze(e=r()){return/webos/i.test(e)}function et(e=r()){return/iphone|ipad|ipod/i.test(e)}function tt(e=r()){var t;return et(e)&&!!((t=window.navigator)===null||t===void 0?void 0:t.standalone)}function nt(){return c()&&document.documentMode===10}function it(e=r()){return et(e)||Xe(e)||Ze(e)||Qe(e)||/windows phone/i.test(e)||Ye(e)}function rt(){try{return!!(window&&window!==window.top)}catch(e){return false}}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function st(e,t=[]){let n;switch(e){case"Browser":n=Be(r());break;case"Worker":n=`${Be(r())}-${e}`;break;default:n=e}const i=t.length?t.join(","):"FirebaseCore-web";return`${n}/${"JsCore"}/${SDK_VERSION}/${i}`}
/**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class ot{constructor(e){this.auth=e;this.queue=[]}pushCallback(e,t){const n=t=>new Promise((n,i)=>{try{const i=e(t);n(i)}catch(e){i(e)}});n.onAbort=t;this.queue.push(n);const i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}async runMiddleware(e){var t;if(this.auth.currentUser===e){return}const n=[];try{for(const t of this.queue){await t(e);if(t.onAbort){n.push(t.onAbort)}}}catch(e){n.reverse();for(const e of n){try{e()}catch(e){}}throw this.auth._errorFactory.create("login-blocked",{originalMessage:(t=e)===null||t===void 0?void 0:t.message})}}}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class at{constructor(e,t,n){this.app=e;this.heartbeatServiceProvider=t;this.config=n;this.currentUser=null;this.emulatorConfig=null;this.operations=Promise.resolve();this.authStateSubscription=new ut(this);this.idTokenSubscription=new ut(this);this.beforeStateQueue=new ot(this);this.redirectUser=null;this.isProactiveRefreshEnabled=false;this._canInitEmulator=true;this._isInitialized=false;this._deleted=false;this._initializationPromise=null;this._popupRedirectResolver=null;this._errorFactory=W;this.lastNotifiedUid=undefined;this.languageCode=null;this.tenantId=null;this.settings={appVerificationDisabledForTesting:false};this.frameworks=[];this.name=e.name;this.clientVersion=n.sdkClientVersion}_initializeWithPersistence(e,t){if(t){this._popupRedirectResolver=te(t)}this._initializationPromise=this.queue(async()=>{var n,i;if(this._deleted){return}this.persistenceManager=await ze.create(this,e);if(this._deleted){return}if((n=this._popupRedirectResolver)===null||n===void 0?void 0:n._shouldInitProactively){try{await this._popupRedirectResolver._initialize(this)}catch(e){}}await this.initializeCurrentUser(t);this.lastNotifiedUid=((i=this.currentUser)===null||i===void 0?void 0:i.uid)||null;if(this._deleted){return}this._isInitialized=true});return this._initializationPromise}async _onStorageEvent(){if(this._deleted){return}const e=await this.assertedPersistence.getCurrentUser();if(!this.currentUser&&!e){return}if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e);await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,true)}async initializeCurrentUser(e){var t;const n=await this.assertedPersistence.getCurrentUser();let i=n;let r=false;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const n=(t=this.redirectUser)===null||t===void 0?void 0:t._redirectEventId;const s=i===null||i===void 0?void 0:i._redirectEventId;const o=await this.tryRedirectSignIn(e);if((!n||n===s)&&(o===null||o===void 0?void 0:o.user)){i=o.user;r=true}}if(!i){return this.directlySetCurrentUser(null)}if(!i._redirectEventId){if(r){try{await this.beforeStateQueue.runMiddleware(i)}catch(e){i=n;this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(e))}}if(i){return this.reloadAndSetCurrentUserOrClear(i)}else{return this.directlySetCurrentUser(null)}}X(this._popupRedirectResolver,this,"argument-error");await this.getOrInitRedirectPersistenceManager();if(this.redirectUser&&this.redirectUser._redirectEventId===i._redirectEventId){return this.directlySetCurrentUser(i)}return this.reloadAndSetCurrentUserOrClear(i)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,true)}catch(e){await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await Le(e)}catch(e){if(e.code!==`auth/${"network-request-failed"}`){return this.directlySetCurrentUser(null)}}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=ce()}async _delete(){this._deleted=true}async updateCurrentUser(e){const t=e?k(e):null;if(t){X(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token")}return this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=false){if(this._deleted){return}if(e){X(this.tenantId===e.tenantId,this,"tenant-id-mismatch")}if(!t){await this.beforeStateQueue.runMiddleware(e)}return this.queue(async()=>{await this.directlySetCurrentUser(e);this.notifyAuthListeners()})}async signOut(){await this.beforeStateQueue.runMiddleware(null);if(this.redirectPersistenceManager||this._popupRedirectResolver){await this._setRedirectUser(null)}return this._updateCurrentUser(null,true)}setPersistence(e){return this.queue(async()=>{await this.assertedPersistence.setPersistence(te(e))})}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new l("auth","Firebase",e())}onAuthStateChanged(e,t,n){return this.registerStateListener(this.authStateSubscription,e,t,n)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,n){return this.registerStateListener(this.idTokenSubscription,e,t,n)}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,t){const n=await this.getOrInitRedirectPersistenceManager(t);return e===null?n.removeCurrentUser():n.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&te(e)||this._popupRedirectResolver;X(t,this,"argument-error");this.redirectPersistenceManager=await ze.create(this,[te(t._redirectPersistence)],"redirectUser");this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,n;if(this._isInitialized){await this.queue(async()=>{})}if(((t=this._currentUser)===null||t===void 0?void 0:t._redirectEventId)===e){return this._currentUser}if(((n=this.redirectUser)===null||n===void 0?void 0:n._redirectEventId)===e){return this.redirectUser}return null}async _persistUserIfCurrent(e){if(e===this.currentUser){return this.queue(async()=>this.directlySetCurrentUser(e))}}_notifyListenersIfCurrent(e){if(e===this.currentUser){this.notifyAuthListeners()}}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=true;if(this.currentUser){this._currentUser._startProactiveRefresh()}}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=false;if(this.currentUser){this._currentUser._stopProactiveRefresh()}}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized){return}this.idTokenSubscription.next(this.currentUser);const n=(t=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&t!==void 0?t:null;if(this.lastNotifiedUid!==n){this.lastNotifiedUid=n;this.authStateSubscription.next(this.currentUser)}}registerStateListener(e,t,n,i){if(this._deleted){return()=>{}}const r=typeof t==="function"?t:t.next.bind(t);const s=this._isInitialized?Promise.resolve():this._initializationPromise;X(s,this,"internal-error");s.then(()=>r(this.currentUser));if(typeof t==="function"){return e.addObserver(t,n,i)}else{return e.addObserver(t)}}async directlySetCurrentUser(e){if(this.currentUser&&this.currentUser!==e){this._currentUser._stopProactiveRefresh();if(e&&this.isProactiveRefreshEnabled){e._startProactiveRefresh()}}this.currentUser=e;if(e){await this.assertedPersistence.setCurrentUser(e)}else{await this.assertedPersistence.removeCurrentUser()}}queue(e){this.operations=this.operations.then(e,e);return this.operations}get assertedPersistence(){X(this.persistenceManager,this,"internal-error");return this.persistenceManager}_logFramework(e){if(!e||this.frameworks.includes(e)){return}this.frameworks.push(e);this.frameworks.sort();this.clientVersion=st(this.config.clientPlatform,this._getFrameworks())}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const t={["X-Client-Version"]:this.clientVersion};if(this.app.options.appId){t["X-Firebase-gmpid"]=this.app.options.appId}const n=await((e=this.heartbeatServiceProvider.getImmediate({optional:true}))===null||e===void 0?void 0:e.getHeartbeatsHeader());if(n){t["X-Firebase-Client"]=n}return t}}function ct(e){return k(e)}class ut{constructor(e){this.auth=e;this.observer=null;this.addObserver=y(e=>this.observer=e)}get next(){X(this.observer,this.auth,"internal-error");return this.observer.next.bind(this.observer)}}function dt(e,t,n){const i=ct(e);X(i._canInitEmulator,i,"emulator-config-failed");X(/^https?:\/\//.test(t),i,"invalid-emulator-scheme");const r=!!(n===null||n===void 0?void 0:n.disableWarnings);const s=lt(t);const{host:o,port:a}=ht(t);const c=a===null?"":`:${a}`;i.config.emulator={url:`${s}//${o}${c}/`};i.settings.appVerificationDisabledForTesting=true;i.emulatorConfig=Object.freeze({host:o,port:a,protocol:s.replace(":",""),options:Object.freeze({disableWarnings:r})});if(!r){pt()}}function lt(e){const t=e.indexOf(":");return t<0?"":e.substr(0,t+1)}function ht(e){const t=lt(e);const n=/(\/\/)?([^?#/]+)/.exec(e.substr(t.length));if(!n){return{host:"",port:null}}const i=n[2].split("@").pop()||"";const r=/^(\[[^\]]+\])(:|$)/.exec(i);if(r){const e=r[1];return{host:e,port:ft(i.substr(e.length+1))}}else{const[e,t]=i.split(":");return{host:e,port:ft(t)}}}function ft(e){if(!e){return null}const t=Number(e);if(isNaN(t)){return null}return t}function pt(){function e(){const e=document.createElement("p");const t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.";t.position="fixed";t.width="100%";t.backgroundColor="#ffffff";t.border=".1em solid #000000";t.color="#b50000";t.bottom="0px";t.left="0px";t.margin="0px";t.zIndex="10000";t.textAlign="center";e.classList.add("firebase-emulator-warning");document.body.appendChild(e)}if(typeof console!=="undefined"&&typeof console.info==="function"){console.info("WARNING: You are using the Auth Emulator,"+" which is intended for local testing only.  Do not use with"+" production credentials.")}if(typeof window!=="undefined"&&typeof document!=="undefined"){if(document.readyState==="loading"){window.addEventListener("DOMContentLoaded",e)}else{e()}}}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class mt{constructor(e,t){this.providerId=e;this.signInMethod=t}toJSON(){return Q("not implemented")}_getIdTokenResponse(e){return Q("not implemented")}_linkToIdToken(e,t){return Q("not implemented")}_getReauthenticationResolver(e){return Q("not implemented")}}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */async function gt(e,t){return me(e,"POST","/v1/accounts:resetPassword",pe(e,t))}async function vt(e,t){return me(e,"POST","/v1/accounts:update",t)}async function It(e,t){return me(e,"POST","/v1/accounts:update",pe(e,t))}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */async function _t(e,t){return ve(e,"POST","/v1/accounts:signInWithPassword",pe(e,t))}async function yt(e,t){return me(e,"POST","/v1/accounts:sendOobCode",pe(e,t))}async function Tt(e,t){return yt(e,t)}async function Et(e,t){return yt(e,t)}async function wt(e,t){return yt(e,t)}async function kt(e,t){return yt(e,t)}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */async function bt(e,t){return ve(e,"POST","/v1/accounts:signInWithEmailLink",pe(e,t))}async function At(e,t){return ve(e,"POST","/v1/accounts:signInWithEmailLink",pe(e,t))}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class Rt extends mt{constructor(e,t,n,i=null){super("password",n);this._email=e;this._password=t;this._tenantId=i}static _fromEmailAndPassword(e,t){return new Rt(e,t,"password")}static _fromEmailAndCode(e,t,n=null){return new Rt(e,t,"emailLink",n)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t=typeof e==="string"?JSON.parse(e):e;if((t===null||t===void 0?void 0:t.email)&&(t===null||t===void 0?void 0:t.password)){if(t.signInMethod==="password"){return this._fromEmailAndPassword(t.email,t.password)}else if(t.signInMethod==="emailLink"){return this._fromEmailAndCode(t.email,t.password,t.tenantId)}}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":return _t(e,{returnSecureToken:true,email:this._email,password:this._password});case"emailLink":return bt(e,{email:this._email,oobCode:this._password});default:B(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":return vt(e,{idToken:t,returnSecureToken:true,email:this._email,password:this._password});case"emailLink":return At(e,{idToken:t,email:this._email,oobCode:this._password});default:B(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */async function St(e,t){return ve(e,"POST","/v1/accounts:signInWithIdp",pe(e,t))}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */const Nt="http://localhost";class Ot extends mt{constructor(){super(...arguments);this.pendingToken=null}static _fromParams(e){const t=new Ot(e.providerId,e.signInMethod);if(e.idToken||e.accessToken){if(e.idToken){t.idToken=e.idToken}if(e.accessToken){t.accessToken=e.accessToken}if(e.nonce&&!e.pendingToken){t.nonce=e.nonce}if(e.pendingToken){t.pendingToken=e.pendingToken}}else if(e.oauthToken&&e.oauthTokenSecret){t.accessToken=e.oauthToken;t.secret=e.oauthTokenSecret}else{B("argument-error")}return t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e==="string"?JSON.parse(e):e;const{providerId:n,signInMethod:i}=t,r=b(t,["providerId","signInMethod"]);if(!n||!i){return null}const s=new Ot(n,i);s.idToken=r.idToken||undefined;s.accessToken=r.accessToken||undefined;s.secret=r.secret;s.nonce=r.nonce;s.pendingToken=r.pendingToken||null;return s}_getIdTokenResponse(e){const t=this.buildRequest();return St(e,t)}_linkToIdToken(e,t){const n=this.buildRequest();n.idToken=t;return St(e,n)}_getReauthenticationResolver(e){const t=this.buildRequest();t.autoCreate=false;return St(e,t)}buildRequest(){const e={requestUri:Nt,returnSecureToken:true};if(this.pendingToken){e.pendingToken=this.pendingToken}else{const t={};if(this.idToken){t["id_token"]=this.idToken}if(this.accessToken){t["access_token"]=this.accessToken}if(this.secret){t["oauth_token_secret"]=this.secret}t["providerId"]=this.providerId;if(this.nonce&&!this.pendingToken){t["nonce"]=this.nonce}e.postBody=v(t)}return e}}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */async function Pt(e,t){return me(e,"POST","/v1/accounts:sendVerificationCode",pe(e,t))}async function Ct(e,t){return ve(e,"POST","/v1/accounts:signInWithPhoneNumber",pe(e,t))}async function Dt(e,t){const n=await ve(e,"POST","/v1/accounts:signInWithPhoneNumber",pe(e,t));if(n.temporaryProof){throw ye(e,"account-exists-with-different-credential",n)}return n}const Lt={["USER_NOT_FOUND"]:"user-not-found"};async function Mt(e,t){const n=Object.assign(Object.assign({},t),{operation:"REAUTH"});return ve(e,"POST","/v1/accounts:signInWithPhoneNumber",pe(e,n),Lt)}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class Ut extends mt{constructor(e){super("phone","phone");this.params=e}static _fromVerification(e,t){return new Ut({verificationId:e,verificationCode:t})}static _fromTokenResponse(e,t){return new Ut({phoneNumber:e,temporaryProof:t})}_getIdTokenResponse(e){return Ct(e,this._makeVerificationRequest())}_linkToIdToken(e,t){return Dt(e,Object.assign({idToken:t},this._makeVerificationRequest()))}_getReauthenticationResolver(e){return Mt(e,this._makeVerificationRequest())}_makeVerificationRequest(){const{temporaryProof:e,phoneNumber:t,verificationId:n,verificationCode:i}=this.params;if(e&&t){return{temporaryProof:e,phoneNumber:t}}return{sessionInfo:n,code:i}}toJSON(){const e={providerId:this.providerId};if(this.params.phoneNumber){e.phoneNumber=this.params.phoneNumber}if(this.params.temporaryProof){e.temporaryProof=this.params.temporaryProof}if(this.params.verificationCode){e.verificationCode=this.params.verificationCode}if(this.params.verificationId){e.verificationId=this.params.verificationId}return e}static fromJSON(e){if(typeof e==="string"){e=JSON.parse(e)}const{verificationId:t,verificationCode:n,phoneNumber:i,temporaryProof:r}=e;if(!n&&!t&&!i&&!r){return null}return new Ut({verificationId:t,verificationCode:n,phoneNumber:i,temporaryProof:r})}}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function Ft(e){switch(e){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function Vt(e){const t=I(_(e))["link"];const n=t?I(_(t))["deep_link_id"]:null;const i=I(_(e))["deep_link_id"];const r=i?I(_(i))["link"]:null;return r||i||n||t||e}class xt{constructor(e){var t,n,i,r,s,o;const a=I(_(e));const c=(t=a["apiKey"])!==null&&t!==void 0?t:null;const u=(n=a["oobCode"])!==null&&n!==void 0?n:null;const d=Ft((i=a["mode"])!==null&&i!==void 0?i:null);X(c&&u&&d,"argument-error");this.apiKey=c;this.operation=d;this.code=u;this.continueUrl=(r=a["continueUrl"])!==null&&r!==void 0?r:null;this.languageCode=(s=a["languageCode"])!==null&&s!==void 0?s:null;this.tenantId=(o=a["tenantId"])!==null&&o!==void 0?o:null}static parseLink(e){const t=Vt(e);try{return new xt(t)}catch(e){return null}}}function Ht(e){return xt.parseLink(e)}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class jt{constructor(){this.providerId=jt.PROVIDER_ID}static credential(e,t){return Rt._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const n=xt.parseLink(t);X(n,"argument-error");return Rt._fromEmailAndCode(e,n.code,n.tenantId)}}jt.PROVIDER_ID="password";jt.EMAIL_PASSWORD_SIGN_IN_METHOD="password";jt.EMAIL_LINK_SIGN_IN_METHOD="emailLink";
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class Wt{constructor(e){this.providerId=e;this.defaultLanguageCode=null;this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){this.customParameters=e;return this}getCustomParameters(){return this.customParameters}}
/**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class qt extends Wt{constructor(){super(...arguments);this.scopes=[]}addScope(e){if(!this.scopes.includes(e)){this.scopes.push(e)}return this}getScopes(){return[...this.scopes]}}class Gt extends qt{static credentialFromJSON(e){const t=typeof e==="string"?JSON.parse(e):e;X("providerId"in t&&"signInMethod"in t,"argument-error");return Ot._fromParams(t)}credential(e){return this._credential(Object.assign(Object.assign({},e),{nonce:e.rawNonce}))}_credential(e){X(e.idToken||e.accessToken,"argument-error");return Ot._fromParams(Object.assign(Object.assign({},e),{providerId:this.providerId,signInMethod:this.providerId}))}static credentialFromResult(e){return Gt.oauthCredentialFromTaggedObject(e)}static credentialFromError(e){return Gt.oauthCredentialFromTaggedObject(e.customData||{})}static oauthCredentialFromTaggedObject({_tokenResponse:e}){if(!e){return null}const{oauthIdToken:t,oauthAccessToken:n,oauthTokenSecret:i,pendingToken:r,nonce:s,providerId:o}=e;if(!n&&!i&&!t&&!r){return null}if(!o){return null}try{return new Gt(o)._credential({idToken:t,accessToken:n,nonce:s,pendingToken:r})}catch(e){return null}}}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class zt extends qt{constructor(){super("facebook.com")}static credential(e){return Ot._fromParams({providerId:zt.PROVIDER_ID,signInMethod:zt.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return zt.credentialFromTaggedObject(e)}static credentialFromError(e){return zt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)){return null}if(!e.oauthAccessToken){return null}try{return zt.credential(e.oauthAccessToken)}catch(e){return null}}}zt.FACEBOOK_SIGN_IN_METHOD="facebook.com";zt.PROVIDER_ID="facebook.com";
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class Bt extends qt{constructor(){super("google.com");this.addScope("profile")}static credential(e,t){return Ot._fromParams({providerId:Bt.PROVIDER_ID,signInMethod:Bt.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return Bt.credentialFromTaggedObject(e)}static credentialFromError(e){return Bt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e){return null}const{oauthIdToken:t,oauthAccessToken:n}=e;if(!t&&!n){return null}try{return Bt.credential(t,n)}catch(e){return null}}}Bt.GOOGLE_SIGN_IN_METHOD="google.com";Bt.PROVIDER_ID="google.com";
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class Kt extends qt{constructor(){super("github.com")}static credential(e){return Ot._fromParams({providerId:Kt.PROVIDER_ID,signInMethod:Kt.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Kt.credentialFromTaggedObject(e)}static credentialFromError(e){return Kt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)){return null}if(!e.oauthAccessToken){return null}try{return Kt.credential(e.oauthAccessToken)}catch(e){return null}}}Kt.GITHUB_SIGN_IN_METHOD="github.com";Kt.PROVIDER_ID="github.com";
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */const $t="http://localhost";class Jt extends mt{constructor(e,t){super(e,e);this.pendingToken=t}_getIdTokenResponse(e){const t=this.buildRequest();return St(e,t)}_linkToIdToken(e,t){const n=this.buildRequest();n.idToken=t;return St(e,n)}_getReauthenticationResolver(e){const t=this.buildRequest();t.autoCreate=false;return St(e,t)}toJSON(){return{signInMethod:this.signInMethod,providerId:this.providerId,pendingToken:this.pendingToken}}static fromJSON(e){const t=typeof e==="string"?JSON.parse(e):e;const{providerId:n,signInMethod:i,pendingToken:r}=t;if(!n||!i||!r||n!==i){return null}return new Jt(n,r)}static _create(e,t){return new Jt(e,t)}buildRequest(){return{requestUri:$t,returnSecureToken:true,pendingToken:this.pendingToken}}}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */const Yt="saml.";class Xt extends Wt{constructor(e){X(e.startsWith(Yt),"argument-error");super(e)}static credentialFromResult(e){return Xt.samlCredentialFromTaggedObject(e)}static credentialFromError(e){return Xt.samlCredentialFromTaggedObject(e.customData||{})}static credentialFromJSON(e){const t=Jt.fromJSON(e);X(t,"argument-error");return t}static samlCredentialFromTaggedObject({_tokenResponse:e}){if(!e){return null}const{pendingToken:t,providerId:n}=e;if(!t||!n){return null}try{return Jt._create(n,t)}catch(e){return null}}}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class Qt extends qt{constructor(){super("twitter.com")}static credential(e,t){return Ot._fromParams({providerId:Qt.PROVIDER_ID,signInMethod:Qt.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return Qt.credentialFromTaggedObject(e)}static credentialFromError(e){return Qt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e){return null}const{oauthAccessToken:t,oauthTokenSecret:n}=e;if(!t||!n){return null}try{return Qt.credential(t,n)}catch(e){return null}}}Qt.TWITTER_SIGN_IN_METHOD="twitter.com";Qt.PROVIDER_ID="twitter.com";
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */async function Zt(e,t){return ve(e,"POST","/v1/accounts:signUp",pe(e,t))}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class en{constructor(e){this.user=e.user;this.providerId=e.providerId;this._tokenResponse=e._tokenResponse;this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,n,i=false){const r=await je._fromIdTokenResponse(e,n,i);const s=tn(n);const o=new en({user:r,providerId:s,_tokenResponse:n,operationType:t});return o}static async _forOperation(e,t,n){await e._updateTokensIfNecessary(n,true);const i=tn(n);return new en({user:e,providerId:i,_tokenResponse:n,operationType:t})}}function tn(e){if(e.providerId){return e.providerId}if("phoneNumber"in e){return"phone"}return null}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */async function nn(e){var t;const n=ct(e);await n._initializationPromise;if((t=n.currentUser)===null||t===void 0?void 0:t.isAnonymous){return new en({user:n.currentUser,providerId:null,operationType:"signIn"})}const i=await Zt(n,{returnSecureToken:true});const r=await en._fromIdTokenResponse(n,"signIn",i,true);await n._updateCurrentUser(r.user);return r}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class rn extends d{constructor(e,t,n,i){var r;super(t.code,t.message);this.operationType=n;this.user=i;Object.setPrototypeOf(this,rn.prototype);this.customData={appName:e.name,tenantId:(r=e.tenantId)!==null&&r!==void 0?r:undefined,_serverResponse:t.customData._serverResponse,operationType:n}}static _fromErrorAndOperation(e,t,n,i){return new rn(e,t,n,i)}}function sn(e,t,n,i){const r=t==="reauthenticate"?n._getReauthenticationResolver(e):n._getIdTokenResponse(e);return r.catch(n=>{if(n.code===`auth/${"multi-factor-auth-required"}`){throw rn._fromErrorAndOperation(e,n,t,i)}throw n})}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function on(e){return new Set(e.map(({providerId:e})=>e).filter(e=>!!e))}
/**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */async function an(e,t){const n=k(e);await un(true,n,t);const{providerUserInfo:i}=await Ee(n.auth,{idToken:await n.getIdToken(),deleteProvider:[t]});const r=on(i||[]);n.providerData=n.providerData.filter(e=>r.has(e.providerId));if(!r.has("phone")){n.phoneNumber=null}await n.auth._persistUserIfCurrent(n);return n}async function cn(e,t,n=false){const i=await Oe(e,t._linkToIdToken(e.auth,await e.getIdToken()),n);return en._forOperation(e,"link",i)}async function un(e,t,n){await Le(t);const i=on(t.providerData);const r=e===false?"provider-already-linked":"no-such-provider";X(i.has(n)===e,t.auth,r)}
/**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */async function dn(e,t,n=false){const{auth:i}=e;const r="reauthenticate";try{const s=await Oe(e,sn(i,r,t,e),n);X(s.idToken,i,"internal-error");const o=Se(s.idToken);X(o,i,"internal-error");const{sub:a}=o;X(e.uid===a,i,"user-mismatch");return en._forOperation(e,r,s)}catch(e){if((e===null||e===void 0?void 0:e.code)===`auth/${"user-not-found"}`){B(i,"user-mismatch")}throw e}}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */async function ln(e,t,n=false){const i="signIn";const r=await sn(e,i,t);const s=await en._fromIdTokenResponse(e,i,r);if(!n){await e._updateCurrentUser(s.user)}return s}async function hn(e,t){return ln(ct(e),t)}async function fn(e,t){const n=k(e);await un(false,n,t.providerId);return cn(n,t)}async function pn(e,t){return dn(k(e),t)}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */async function mn(e,t){return ve(e,"POST","/v1/accounts:signInWithCustomToken",pe(e,t))}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */async function gn(e,t){const n=ct(e);const i=await mn(n,{token:t,returnSecureToken:true});const r=await en._fromIdTokenResponse(n,"signIn",i);await n._updateCurrentUser(r.user);return r}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class vn{constructor(e,t){this.factorId=e;this.uid=t.mfaEnrollmentId;this.enrollmentTime=new Date(t.enrolledAt).toUTCString();this.displayName=t.displayName}static _fromServerResponse(e,t){if("phoneInfo"in t){return In._fromServerResponse(e,t)}return B(e,"internal-error")}}class In extends vn{constructor(e){super("phone",e);this.phoneNumber=e.phoneInfo}static _fromServerResponse(e,t){return new In(t)}}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function _n(e,t,n){var i;X(((i=n.url)===null||i===void 0?void 0:i.length)>0,e,"invalid-continue-uri");X(typeof n.dynamicLinkDomain==="undefined"||n.dynamicLinkDomain.length>0,e,"invalid-dynamic-link-domain");t.continueUrl=n.url;t.dynamicLinkDomain=n.dynamicLinkDomain;t.canHandleCodeInApp=n.handleCodeInApp;if(n.iOS){X(n.iOS.bundleId.length>0,e,"missing-ios-bundle-id");t.iOSBundleId=n.iOS.bundleId}if(n.android){X(n.android.packageName.length>0,e,"missing-android-pkg-name");t.androidInstallApp=n.android.installApp;t.androidMinimumVersionCode=n.android.minimumVersion;t.androidPackageName=n.android.packageName}}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */async function yn(e,t,n){const i=k(e);const r={requestType:"PASSWORD_RESET",email:t};if(n){_n(i,r,n)}await Et(i,r)}async function Tn(e,t,n){await gt(k(e),{oobCode:t,newPassword:n})}async function En(e,t){await It(k(e),{oobCode:t})}async function wn(e,t){const n=k(e);const i=await gt(n,{oobCode:t});const r=i.requestType;X(r,n,"internal-error");switch(r){case"EMAIL_SIGNIN":break;case"VERIFY_AND_CHANGE_EMAIL":X(i.newEmail,n,"internal-error");break;case"REVERT_SECOND_FACTOR_ADDITION":X(i.mfaInfo,n,"internal-error");default:X(i.email,n,"internal-error")}let s=null;if(i.mfaInfo){s=vn._fromServerResponse(ct(n),i.mfaInfo)}return{data:{email:(i.requestType==="VERIFY_AND_CHANGE_EMAIL"?i.newEmail:i.email)||null,previousEmail:(i.requestType==="VERIFY_AND_CHANGE_EMAIL"?i.email:i.newEmail)||null,multiFactorInfo:s},operation:r}}async function kn(e,t){const{data:n}=await wn(k(e),t);return n.email}async function bn(e,t,n){const i=ct(e);const r=await Zt(i,{returnSecureToken:true,email:t,password:n});const s=await en._fromIdTokenResponse(i,"signIn",r);await i._updateCurrentUser(s.user);return s}function An(e,t,n){return hn(k(e),jt.credential(t,n))}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */async function Rn(e,t,n){const i=k(e);const r={requestType:"EMAIL_SIGNIN",email:t};X(n.handleCodeInApp,i,"argument-error");if(n){_n(i,r,n)}await wt(i,r)}function Sn(e,t){const n=xt.parseLink(t);return(n===null||n===void 0?void 0:n.operation)==="EMAIL_SIGNIN"}async function Nn(e,t,n){const i=k(e);const r=jt.credentialWithLink(t,n||re());X(r._tenantId===(i.tenantId||null),i,"tenant-id-mismatch");return hn(i,r)}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */async function On(e,t){return me(e,"POST","/v1/accounts:createAuthUri",pe(e,t))}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */async function Pn(e,t){const n=se()?re():"http://localhost";const i={identifier:t,continueUri:n};const{signinMethods:r}=await On(k(e),i);return r||[]}async function Cn(e,t){const n=k(e);const i=await e.getIdToken();const r={requestType:"VERIFY_EMAIL",idToken:i};if(t){_n(n.auth,r,t)}const{email:s}=await Tt(n.auth,r);if(s!==e.email){await e.reload()}}async function Dn(e,t,n){const i=k(e);const r=await e.getIdToken();const s={requestType:"VERIFY_AND_CHANGE_EMAIL",idToken:r,newEmail:t};if(n){_n(i.auth,s,n)}const{email:o}=await kt(i.auth,s);if(o!==e.email){await e.reload()}}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */async function Ln(e,t){return me(e,"POST","/v1/accounts:update",t)}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */async function Mn(e,{displayName:t,photoURL:n}){if(t===undefined&&n===undefined){return}const i=k(e);const r=await i.getIdToken();const s={idToken:r,displayName:t,photoUrl:n,returnSecureToken:true};const o=await Oe(i,Ln(i.auth,s));i.displayName=o.displayName||null;i.photoURL=o.photoUrl||null;const a=i.providerData.find(({providerId:e})=>e==="password");if(a){a.displayName=i.displayName;a.photoURL=i.photoURL}await i._updateTokensIfNecessary(o)}function Un(e,t){return Vn(k(e),t,null)}function Fn(e,t){return Vn(k(e),null,t)}async function Vn(e,t,n){const{auth:i}=e;const r=await e.getIdToken();const s={idToken:r,returnSecureToken:true};if(t){s.email=t}if(n){s.password=n}const o=await Oe(e,vt(i,s));await e._updateTokensIfNecessary(o,true)}
/**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function xn(e){var t,n;if(!e){return null}const{providerId:i}=e;const r=e.rawUserInfo?JSON.parse(e.rawUserInfo):{};const s=e.isNewUser||e.kind==="identitytoolkit#SignupNewUserResponse";if(!i&&(e===null||e===void 0?void 0:e.idToken)){const i=(n=(t=Se(e.idToken))===null||t===void 0?void 0:t.firebase)===null||n===void 0?void 0:n["sign_in_provider"];if(i){const e=i!=="anonymous"&&i!=="custom"?i:null;return new Hn(s,e)}}if(!i){return null}switch(i){case"facebook.com":return new Wn(s,r);case"github.com":return new qn(s,r);case"google.com":return new Gn(s,r);case"twitter.com":return new zn(s,r,e.screenName||null);case"custom":case"anonymous":return new Hn(s,null);default:return new Hn(s,i,r)}}class Hn{constructor(e,t,n={}){this.isNewUser=e;this.providerId=t;this.profile=n}}class jn extends Hn{constructor(e,t,n,i){super(e,t,n);this.username=i}}class Wn extends Hn{constructor(e,t){super(e,"facebook.com",t)}}class qn extends jn{constructor(e,t){super(e,"github.com",t,typeof(t===null||t===void 0?void 0:t.login)==="string"?t===null||t===void 0?void 0:t.login:null)}}class Gn extends Hn{constructor(e,t){super(e,"google.com",t)}}class zn extends jn{constructor(e,t,n){super(e,"twitter.com",t,n)}}function Bn(e){const{user:t,_tokenResponse:n}=e;if(t.isAnonymous&&!n){return{providerId:null,isNewUser:false,profile:null}}return xn(n)}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function Kn(e,t){return k(e).setPersistence(t)}function $n(e,t,n,i){return k(e).onIdTokenChanged(t,n,i)}function Jn(e,t,n){return k(e).beforeAuthStateChanged(t,n)}function Yn(e,t,n,i){return k(e).onAuthStateChanged(t,n,i)}function Xn(e){k(e).useDeviceLanguage()}function Qn(e,t){return k(e).updateCurrentUser(t)}function Zn(e){return k(e).signOut()}async function ei(e){return k(e).delete()}class ti{constructor(e,t){this.type=e;this.credential=t}static _fromIdtoken(e){return new ti("enroll",e)}static _fromMfaPendingCredential(e){return new ti("signin",e)}toJSON(){const e=this.type==="enroll"?"idToken":"pendingCredential";return{multiFactorSession:{[e]:this.credential}}}static fromJSON(e){var t,n;if(e===null||e===void 0?void 0:e.multiFactorSession){if((t=e.multiFactorSession)===null||t===void 0?void 0:t.pendingCredential){return ti._fromMfaPendingCredential(e.multiFactorSession.pendingCredential)}else if((n=e.multiFactorSession)===null||n===void 0?void 0:n.idToken){return ti._fromIdtoken(e.multiFactorSession.idToken)}}return null}}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class ni{constructor(e,t,n){this.session=e;this.hints=t;this.signInResolver=n}static _fromError(e,t){const n=ct(e);const i=t.customData._serverResponse;const r=(i.mfaInfo||[]).map(e=>vn._fromServerResponse(n,e));X(i.mfaPendingCredential,n,"internal-error");const s=ti._fromMfaPendingCredential(i.mfaPendingCredential);return new ni(s,r,async e=>{const r=await e._process(n,s);delete i.mfaInfo;delete i.mfaPendingCredential;const o=Object.assign(Object.assign({},i),{idToken:r.idToken,refreshToken:r.refreshToken});switch(t.operationType){case"signIn":const e=await en._fromIdTokenResponse(n,t.operationType,o);await n._updateCurrentUser(e.user);return e;case"reauthenticate":X(t.user,n,"internal-error");return en._forOperation(t.user,t.operationType,o);default:B(n,"internal-error")}})}async resolveSignIn(e){const t=e;return this.signInResolver(t)}}function ii(e,t){var n;const i=k(e);const r=t;X(t.customData.operationType,i,"argument-error");X((n=r.customData._serverResponse)===null||n===void 0?void 0:n.mfaPendingCredential,i,"argument-error");return ni._fromError(i,r)}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function ri(e,t){return me(e,"POST","/v2/accounts/mfaEnrollment:start",pe(e,t))}function si(e,t){return me(e,"POST","/v2/accounts/mfaEnrollment:finalize",pe(e,t))}function oi(e,t){return me(e,"POST","/v2/accounts/mfaEnrollment:withdraw",pe(e,t))}class ai{constructor(e){this.user=e;this.enrolledFactors=[];e._onReload(t=>{if(t.mfaInfo){this.enrolledFactors=t.mfaInfo.map(t=>vn._fromServerResponse(e.auth,t))}})}static _fromUser(e){return new ai(e)}async getSession(){return ti._fromIdtoken(await this.user.getIdToken())}async enroll(e,t){const n=e;const i=await this.getSession();const r=await Oe(this.user,n._process(this.user.auth,i,t));await this.user._updateTokensIfNecessary(r);return this.user.reload()}async unenroll(e){const t=typeof e==="string"?e:e.uid;const n=await this.user.getIdToken();const i=await Oe(this.user,oi(this.user.auth,{idToken:n,mfaEnrollmentId:t}));this.enrolledFactors=this.enrolledFactors.filter(({uid:e})=>e!==t);await this.user._updateTokensIfNecessary(i);try{await this.user.reload()}catch(e){if(e.code!==`auth/${"user-token-expired"}`){throw e}}}}const ci=new WeakMap;function ui(e){const t=k(e);if(!ci.has(t)){ci.set(t,ai._fromUser(t))}return ci.get(t)}const di="__sak";
/**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class li{constructor(e,t){this.storageRetriever=e;this.type=t}_isAvailable(){try{if(!this.storage){return Promise.resolve(false)}this.storage.setItem(di,"1");this.storage.removeItem(di);return Promise.resolve(true)}catch(e){return Promise.resolve(false)}}_set(e,t){this.storage.setItem(e,JSON.stringify(t));return Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){this.storage.removeItem(e);return Promise.resolve()}get storage(){return this.storageRetriever()}}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function hi(){const e=r();return $e(e)||et(e)}const fi=1e3;const pi=10;class mi extends li{constructor(){super(()=>window.localStorage,"LOCAL");this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t);this.listeners={};this.localCache={};this.pollTimer=null;this.safariLocalStorageNotSynced=hi()&&rt();this.fallbackToPolling=it();this._shouldAllowMigration=true}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const n=this.storage.getItem(t);const i=this.localCache[t];if(n!==i){e(t,i,n)}}}onStorageEvent(e,t=false){if(!e.key){this.forAllChangedKeys((e,t,n)=>{this.notifyListeners(e,n)});return}const n=e.key;if(t){this.detachListener()}else{this.stopPolling()}if(this.safariLocalStorageNotSynced){const i=this.storage.getItem(n);if(e.newValue!==i){if(e.newValue!==null){this.storage.setItem(n,e.newValue)}else{this.storage.removeItem(n)}}else if(this.localCache[n]===e.newValue&&!t){return}}const i=()=>{const e=this.storage.getItem(n);if(!t&&this.localCache[n]===e){return}this.notifyListeners(n,e)};const r=this.storage.getItem(n);if(nt()&&r!==e.newValue&&e.newValue!==e.oldValue){setTimeout(i,pi)}else{i()}}notifyListeners(e,t){this.localCache[e]=t;const n=this.listeners[e];if(n){for(const e of Array.from(n)){e(t?JSON.parse(t):t)}}}startPolling(){this.stopPolling();this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,n)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:n}),true)})},fi)}stopPolling(){if(this.pollTimer){clearInterval(this.pollTimer);this.pollTimer=null}}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){if(Object.keys(this.listeners).length===0){if(this.fallbackToPolling){this.startPolling()}else{this.attachListener()}}if(!this.listeners[e]){this.listeners[e]=new Set;this.localCache[e]=this.storage.getItem(e)}this.listeners[e].add(t)}_removeListener(e,t){if(this.listeners[e]){this.listeners[e].delete(t);if(this.listeners[e].size===0){delete this.listeners[e]}}if(Object.keys(this.listeners).length===0){this.detachListener();this.stopPolling()}}async _set(e,t){await super._set(e,t);this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);this.localCache[e]=JSON.stringify(t);return t}async _remove(e){await super._remove(e);delete this.localCache[e]}}mi.type="LOCAL";const gi=mi;
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class vi extends li{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){return}_removeListener(e,t){return}}vi.type="SESSION";const Ii=vi;
/**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function _i(e){return Promise.all(e.map(async e=>{try{const t=await e;return{fulfilled:true,value:t}}catch(e){return{fulfilled:false,reason:e}}}))}
/**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class yi{constructor(e){this.eventTarget=e;this.handlersMap={};this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(t=>t.isListeningto(e));if(t){return t}const n=new yi(e);this.receivers.push(n);return n}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e;const{eventId:n,eventType:i,data:r}=t.data;const s=this.handlersMap[i];if(!(s===null||s===void 0?void 0:s.size)){return}t.ports[0].postMessage({status:"ack",eventId:n,eventType:i});const o=Array.from(s).map(async e=>e(t.origin,r));const a=await _i(o);t.ports[0].postMessage({status:"done",eventId:n,eventType:i,response:a})}_subscribe(e,t){if(Object.keys(this.handlersMap).length===0){this.eventTarget.addEventListener("message",this.boundEventHandler)}if(!this.handlersMap[e]){this.handlersMap[e]=new Set}this.handlersMap[e].add(t)}_unsubscribe(e,t){if(this.handlersMap[e]&&t){this.handlersMap[e].delete(t)}if(!t||this.handlersMap[e].size===0){delete this.handlersMap[e]}if(Object.keys(this.handlersMap).length===0){this.eventTarget.removeEventListener("message",this.boundEventHandler)}}}yi.receivers=[];
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function Ti(e="",t=10){let n="";for(let e=0;e<t;e++){n+=Math.floor(Math.random()*10)}return e+n}
/**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class Ei{constructor(e){this.target=e;this.handlers=new Set}removeMessageHandler(e){if(e.messageChannel){e.messageChannel.port1.removeEventListener("message",e.onMessage);e.messageChannel.port1.close()}this.handlers.delete(e)}async _send(e,t,n=50){const i=typeof MessageChannel!=="undefined"?new MessageChannel:null;if(!i){throw new Error("connection_unavailable")}let r;let s;return new Promise((o,a)=>{const c=Ti("",20);i.port1.start();const u=setTimeout(()=>{a(new Error("unsupported_event"))},n);s={messageChannel:i,onMessage(e){const t=e;if(t.data.eventId!==c){return}switch(t.data.status){case"ack":clearTimeout(u);r=setTimeout(()=>{a(new Error("timeout"))},3e3);break;case"done":clearTimeout(r);o(t.data.response);break;default:clearTimeout(u);clearTimeout(r);a(new Error("invalid_response"));break}}};this.handlers.add(s);i.port1.addEventListener("message",s.onMessage);this.target.postMessage({eventType:e,eventId:c,data:t},[i.port2])}).finally(()=>{if(s){this.removeMessageHandler(s)}})}}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function wi(){return window}function ki(e){wi().location.href=e}
/**
   * @license
   * Copyright 2020 Google LLC.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function bi(){return typeof wi()["WorkerGlobalScope"]!=="undefined"&&typeof wi()["importScripts"]==="function"}async function Ai(){if(!(navigator===null||navigator===void 0?void 0:navigator.serviceWorker)){return null}try{const e=await navigator.serviceWorker.ready;return e.active}catch(e){return null}}function Ri(){var e;return((e=navigator===null||navigator===void 0?void 0:navigator.serviceWorker)===null||e===void 0?void 0:e.controller)||null}function Si(){return bi()?self:null}
/**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */const Ni="firebaseLocalStorageDb";const Oi=1;const Pi="firebaseLocalStorage";const Ci="fbase_key";class Di{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)});this.request.addEventListener("error",()=>{t(this.request.error)})})}}function Li(e,t){return e.transaction([Pi],t?"readwrite":"readonly").objectStore(Pi)}function Mi(){const e=indexedDB.deleteDatabase(Ni);return new Di(e).toPromise()}function Ui(){const e=indexedDB.open(Ni,Oi);return new Promise((t,n)=>{e.addEventListener("error",()=>{n(e.error)});e.addEventListener("upgradeneeded",()=>{const t=e.result;try{t.createObjectStore(Pi,{keyPath:Ci})}catch(e){n(e)}});e.addEventListener("success",async()=>{const n=e.result;if(!n.objectStoreNames.contains(Pi)){n.close();await Mi();t(await Ui())}else{t(n)}})})}async function Fi(e,t,n){const i=Li(e,true).put({[Ci]:t,value:n});return new Di(i).toPromise()}async function Vi(e,t){const n=Li(e,false).get(t);const i=await new Di(n).toPromise();return i===undefined?null:i.value}function xi(e,t){const n=Li(e,true).delete(t);return new Di(n).toPromise()}const Hi=800;const ji=3;class Wi{constructor(){this.type="LOCAL";this._shouldAllowMigration=true;this.listeners={};this.localCache={};this.pollTimer=null;this.pendingWrites=0;this.receiver=null;this.sender=null;this.serviceWorkerReceiverAvailable=false;this.activeServiceWorker=null;this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){if(this.db){return this.db}this.db=await Ui();return this.db}async _withRetries(e){let t=0;while(true){try{const t=await this._openDb();return await e(t)}catch(e){if(t++>ji){throw e}if(this.db){this.db.close();this.db=undefined}}}}async initializeServiceWorkerMessaging(){return bi()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=yi._getInstance(Si());this.receiver._subscribe("keyChanged",async(e,t)=>{const n=await this._poll();return{keyProcessed:n.includes(t.key)}});this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;this.activeServiceWorker=await Ai();if(!this.activeServiceWorker){return}this.sender=new Ei(this.activeServiceWorker);const n=await this.sender._send("ping",{},800);if(!n){return}if(((e=n[0])===null||e===void 0?void 0:e.fulfilled)&&((t=n[0])===null||t===void 0?void 0:t.value.includes("keyChanged"))){this.serviceWorkerReceiverAvailable=true}}async notifyServiceWorker(e){if(!this.sender||!this.activeServiceWorker||Ri()!==this.activeServiceWorker){return}try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch(e){}}async _isAvailable(){try{if(!indexedDB){return false}const e=await Ui();await Fi(e,di,"1");await xi(e,di);return true}catch(e){}return false}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>{await this._withRetries(n=>Fi(n,e,t));this.localCache[e]=t;return this.notifyServiceWorker(e)})}async _get(e){const t=await this._withRetries(t=>Vi(t,e));this.localCache[e]=t;return t}async _remove(e){return this._withPendingWrite(async()=>{await this._withRetries(t=>xi(t,e));delete this.localCache[e];return this.notifyServiceWorker(e)})}async _poll(){const e=await this._withRetries(e=>{const t=Li(e,false).getAll();return new Di(t).toPromise()});if(!e){return[]}if(this.pendingWrites!==0){return[]}const t=[];const n=new Set;for(const{fbase_key:i,value:r}of e){n.add(i);if(JSON.stringify(this.localCache[i])!==JSON.stringify(r)){this.notifyListeners(i,r);t.push(i)}}for(const e of Object.keys(this.localCache)){if(this.localCache[e]&&!n.has(e)){this.notifyListeners(e,null);t.push(e)}}return t}notifyListeners(e,t){this.localCache[e]=t;const n=this.listeners[e];if(n){for(const e of Array.from(n)){e(t)}}}startPolling(){this.stopPolling();this.pollTimer=setInterval(async()=>this._poll(),Hi)}stopPolling(){if(this.pollTimer){clearInterval(this.pollTimer);this.pollTimer=null}}_addListener(e,t){if(Object.keys(this.listeners).length===0){this.startPolling()}if(!this.listeners[e]){this.listeners[e]=new Set;void this._get(e)}this.listeners[e].add(t)}_removeListener(e,t){if(this.listeners[e]){this.listeners[e].delete(t);if(this.listeners[e].size===0){delete this.listeners[e]}}if(Object.keys(this.listeners).length===0){this.stopPolling()}}}Wi.type="LOCAL";const qi=Wi;
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function Gi(e,t){return me(e,"POST","/v2/accounts/mfaSignIn:start",pe(e,t))}function zi(e,t){return me(e,"POST","/v2/accounts/mfaSignIn:finalize",pe(e,t))}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */async function Bi(e){return(await me(e,"GET","/v1/recaptchaParams")).recaptchaSiteKey||""}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function Ki(){var e,t;return(t=(e=document.getElementsByTagName("head"))===null||e===void 0?void 0:e[0])!==null&&t!==void 0?t:document}function $i(e){return new Promise((t,n)=>{const i=document.createElement("script");i.setAttribute("src",e);i.onload=t;i.onerror=e=>{const t=K("internal-error");t.customData=e;n(t)};i.type="text/javascript";i.charset="UTF-8";Ki().appendChild(i)})}function Ji(e){return`__${e}${Math.floor(Math.random()*1e6)}`}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */const Yi=500;const Xi=6e4;const Qi=1e12;class Zi{constructor(e){this.auth=e;this.counter=Qi;this._widgets=new Map}render(e,t){const n=this.counter;this._widgets.set(n,new er(e,this.auth.name,t||{}));this.counter++;return n}reset(e){var t;const n=e||Qi;void((t=this._widgets.get(n))===null||t===void 0?void 0:t.delete());this._widgets.delete(n)}getResponse(e){var t;const n=e||Qi;return((t=this._widgets.get(n))===null||t===void 0?void 0:t.getResponse())||""}async execute(e){var t;const n=e||Qi;void((t=this._widgets.get(n))===null||t===void 0?void 0:t.execute());return""}}class er{constructor(e,t,n){this.params=n;this.timerId=null;this.deleted=false;this.responseToken=null;this.clickHandler=()=>{this.execute()};const i=typeof e==="string"?document.getElementById(e):e;X(i,"argument-error",{appName:t});this.container=i;this.isVisible=this.params.size!=="invisible";if(this.isVisible){this.execute()}else{this.container.addEventListener("click",this.clickHandler)}}getResponse(){this.checkIfDeleted();return this.responseToken}delete(){this.checkIfDeleted();this.deleted=true;if(this.timerId){clearTimeout(this.timerId);this.timerId=null}this.container.removeEventListener("click",this.clickHandler)}execute(){this.checkIfDeleted();if(this.timerId){return}this.timerId=window.setTimeout(()=>{this.responseToken=tr(50);const{callback:e,"expired-callback":t}=this.params;if(e){try{e(this.responseToken)}catch(e){}}this.timerId=window.setTimeout(()=>{this.timerId=null;this.responseToken=null;if(t){try{t()}catch(e){}}if(this.isVisible){this.execute()}},Xi)},Yi)}checkIfDeleted(){if(this.deleted){throw new Error("reCAPTCHA mock was already deleted!")}}}function tr(e){const t=[];const n="1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";for(let i=0;i<e;i++){t.push(n.charAt(Math.floor(Math.random()*n.length)))}return t.join("")}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */const nr=Ji("rcb");const ir=new ue(3e4,6e4);const rr="https://www.google.com/recaptcha/api.js?";class sr{constructor(){this.hostLanguage="";this.counter=0;this.librarySeparatelyLoaded=!!wi().grecaptcha}load(e,t=""){X(or(t),e,"argument-error");if(this.shouldResolveImmediately(t)){return Promise.resolve(wi().grecaptcha)}return new Promise((n,i)=>{const r=wi().setTimeout(()=>{i(K(e,"network-request-failed"))},ir.get());wi()[nr]=()=>{wi().clearTimeout(r);delete wi()[nr];const s=wi().grecaptcha;if(!s){i(K(e,"internal-error"));return}const o=s.render;s.render=(e,t)=>{const n=o(e,t);this.counter++;return n};this.hostLanguage=t;n(s)};const s=`${rr}?${v({onload:nr,render:"explicit",hl:t})}`;$i(s).catch(()=>{clearTimeout(r);i(K(e,"internal-error"))})})}clearedOneInstance(){this.counter--}shouldResolveImmediately(e){return!!wi().grecaptcha&&(e===this.hostLanguage||this.counter>0||this.librarySeparatelyLoaded)}}function or(e){return e.length<=6&&/^\s*[a-zA-Z0-9\-]*\s*$/.test(e)}class ar{async load(e){return new Zi(e)}clearedOneInstance(){}}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */const cr="recaptcha";const ur={theme:"light",type:"image"};class dr{constructor(e,t=Object.assign({},ur),n){this.parameters=t;this.type=cr;this.destroyed=false;this.widgetId=null;this.tokenChangeListeners=new Set;this.renderPromise=null;this.recaptcha=null;this.auth=ct(n);this.isInvisible=this.parameters.size==="invisible";X(typeof document!=="undefined",this.auth,"operation-not-supported-in-this-environment");const i=typeof e==="string"?document.getElementById(e):e;X(i,this.auth,"argument-error");this.container=i;this.parameters.callback=this.makeTokenCallback(this.parameters.callback);this._recaptchaLoader=this.auth.settings.appVerificationDisabledForTesting?new ar:new sr;this.validateStartingState()}async verify(){this.assertNotDestroyed();const e=await this.render();const t=this.getAssertedRecaptcha();const n=t.getResponse(e);if(n){return n}return new Promise(n=>{const i=e=>{if(!e){return}this.tokenChangeListeners.delete(i);n(e)};this.tokenChangeListeners.add(i);if(this.isInvisible){t.execute(e)}})}render(){try{this.assertNotDestroyed()}catch(e){return Promise.reject(e)}if(this.renderPromise){return this.renderPromise}this.renderPromise=this.makeRenderPromise().catch(e=>{this.renderPromise=null;throw e});return this.renderPromise}_reset(){this.assertNotDestroyed();if(this.widgetId!==null){this.getAssertedRecaptcha().reset(this.widgetId)}}clear(){this.assertNotDestroyed();this.destroyed=true;this._recaptchaLoader.clearedOneInstance();if(!this.isInvisible){this.container.childNodes.forEach(e=>{this.container.removeChild(e)})}}validateStartingState(){X(!this.parameters.sitekey,this.auth,"argument-error");X(this.isInvisible||!this.container.hasChildNodes(),this.auth,"argument-error");X(typeof document!=="undefined",this.auth,"operation-not-supported-in-this-environment")}makeTokenCallback(e){return t=>{this.tokenChangeListeners.forEach(e=>e(t));if(typeof e==="function"){e(t)}else if(typeof e==="string"){const n=wi()[e];if(typeof n==="function"){n(t)}}}}assertNotDestroyed(){X(!this.destroyed,this.auth,"internal-error")}async makeRenderPromise(){await this.init();if(!this.widgetId){let e=this.container;if(!this.isInvisible){const t=document.createElement("div");e.appendChild(t);e=t}this.widgetId=this.getAssertedRecaptcha().render(e,this.parameters)}return this.widgetId}async init(){X(se()&&!bi(),this.auth,"internal-error");await lr();this.recaptcha=await this._recaptchaLoader.load(this.auth,this.auth.languageCode||undefined);const e=await Bi(this.auth);X(e,this.auth,"internal-error");this.parameters.sitekey=e}getAssertedRecaptcha(){X(this.recaptcha,this.auth,"internal-error");return this.recaptcha}}function lr(){let e=null;return new Promise(t=>{if(document.readyState==="complete"){t();return}e=()=>t();window.addEventListener("load",e)}).catch(t=>{if(e){window.removeEventListener("load",e)}throw t})}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class hr{constructor(e,t){this.verificationId=e;this.onConfirmation=t}confirm(e){const t=Ut._fromVerification(this.verificationId,e);return this.onConfirmation(t)}}async function fr(e,t,n){const i=ct(e);const r=await gr(i,t,k(n));return new hr(r,e=>hn(i,e))}async function pr(e,t,n){const i=k(e);await un(false,i,"phone");const r=await gr(i.auth,t,k(n));return new hr(r,e=>fn(i,e))}async function mr(e,t,n){const i=k(e);const r=await gr(i.auth,t,k(n));return new hr(r,e=>pn(i,e))}async function gr(e,t,n){var i;const r=await n.verify();try{X(typeof r==="string",e,"argument-error");X(n.type===cr,e,"argument-error");let s;if(typeof t==="string"){s={phoneNumber:t}}else{s=t}if("session"in s){const t=s.session;if("phoneNumber"in s){X(t.type==="enroll",e,"internal-error");const n=await ri(e,{idToken:t.credential,phoneEnrollmentInfo:{phoneNumber:s.phoneNumber,recaptchaToken:r}});return n.phoneSessionInfo.sessionInfo}else{X(t.type==="signin",e,"internal-error");const n=((i=s.multiFactorHint)===null||i===void 0?void 0:i.uid)||s.multiFactorUid;X(n,e,"missing-multi-factor-info");const o=await Gi(e,{mfaPendingCredential:t.credential,mfaEnrollmentId:n,phoneSignInInfo:{recaptchaToken:r}});return o.phoneResponseInfo.sessionInfo}}else{const{sessionInfo:t}=await Pt(e,{phoneNumber:s.phoneNumber,recaptchaToken:r});return t}}finally{n._reset()}}async function vr(e,t){await cn(k(e),t)}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class Ir{constructor(e){this.providerId=Ir.PROVIDER_ID;this.auth=ct(e)}verifyPhoneNumber(e,t){return gr(this.auth,e,k(t))}static credential(e,t){return Ut._fromVerification(e,t)}static credentialFromResult(e){const t=e;return Ir.credentialFromTaggedObject(t)}static credentialFromError(e){return Ir.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e){return null}const{phoneNumber:t,temporaryProof:n}=e;if(t&&n){return Ut._fromTokenResponse(t,n)}return null}}Ir.PROVIDER_ID="phone";Ir.PHONE_SIGN_IN_METHOD="phone";
/**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function _r(e,t){if(t){return te(t)}X(e._popupRedirectResolver,e,"argument-error");return e._popupRedirectResolver}
/**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class yr extends mt{constructor(e){super("custom","custom");this.params=e}_getIdTokenResponse(e){return St(e,this._buildIdpRequest())}_linkToIdToken(e,t){return St(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return St(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:true,returnIdpCredential:true};if(e){t.idToken=e}return t}}function Tr(e){return ln(e.auth,new yr(e),e.bypassAuthState)}function Er(e){const{auth:t,user:n}=e;X(n,t,"internal-error");return dn(n,new yr(e),e.bypassAuthState)}async function wr(e){const{auth:t,user:n}=e;X(n,t,"internal-error");return cn(n,new yr(e),e.bypassAuthState)}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class kr{constructor(e,t,n,i,r=false){this.auth=e;this.resolver=n;this.user=i;this.bypassAuthState=r;this.pendingPromise=null;this.eventManager=null;this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth);await this.onExecution();this.eventManager.registerConsumer(this)}catch(e){this.reject(e)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:n,postBody:i,tenantId:r,error:s,type:o}=e;if(s){this.reject(s);return}const a={auth:this.auth,requestUri:t,sessionId:n,tenantId:r||undefined,postBody:i||undefined,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(o)(a))}catch(e){this.reject(e)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return Tr;case"linkViaPopup":case"linkViaRedirect":return wr;case"reauthViaPopup":case"reauthViaRedirect":return Er;default:B(this.auth,"internal-error")}}resolve(e){Z(this.pendingPromise,"Pending promise was never set");this.pendingPromise.resolve(e);this.unregisterAndCleanUp()}reject(e){Z(this.pendingPromise,"Pending promise was never set");this.pendingPromise.reject(e);this.unregisterAndCleanUp()}unregisterAndCleanUp(){if(this.eventManager){this.eventManager.unregisterConsumer(this)}this.pendingPromise=null;this.cleanUp()}}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */const br=new ue(2e3,1e4);async function Ar(e,t,n){const i=ct(e);J(e,t,Wt);const r=_r(i,n);const s=new Nr(i,"signInViaPopup",t,r);return s.executeNotNull()}async function Rr(e,t,n){const i=k(e);J(i.auth,t,Wt);const r=_r(i.auth,n);const s=new Nr(i.auth,"reauthViaPopup",t,r,i);return s.executeNotNull()}async function Sr(e,t,n){const i=k(e);J(i.auth,t,Wt);const r=_r(i.auth,n);const s=new Nr(i.auth,"linkViaPopup",t,r,i);return s.executeNotNull()}class Nr extends kr{constructor(e,t,n,i,r){super(e,t,i,r);this.provider=n;this.authWindow=null;this.pollId=null;if(Nr.currentPopupAction){Nr.currentPopupAction.cancel()}Nr.currentPopupAction=this}async executeNotNull(){const e=await this.execute();X(e,this.auth,"internal-error");return e}async onExecution(){Z(this.filter.length===1,"Popup operations only handle one event");const e=Ti();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e);this.authWindow.associatedEvent=e;this.resolver._originValidation(this.auth).catch(e=>{this.reject(e)});this.resolver._isIframeWebStorageSupported(this.auth,e=>{if(!e){this.reject(K(this.auth,"web-storage-unsupported"))}});this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(K(this.auth,"cancelled-popup-request"))}cleanUp(){if(this.authWindow){this.authWindow.close()}if(this.pollId){window.clearTimeout(this.pollId)}this.authWindow=null;this.pollId=null;Nr.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,n;if((n=(t=this.authWindow)===null||t===void 0?void 0:t.window)===null||n===void 0?void 0:n.closed){this.pollId=window.setTimeout(()=>{this.pollId=null;this.reject(K(this.auth,"popup-closed-by-user"))},2e3);return}this.pollId=window.setTimeout(e,br.get())};e()}}Nr.currentPopupAction=null;
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */const Or="pendingRedirect";const Pr=new Map;class Cr extends kr{constructor(e,t,n=false){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,undefined,n);this.eventId=null}async execute(){let e=Pr.get(this.auth._key());if(!e){try{const t=await Dr(this.resolver,this.auth);const n=t?await super.execute():null;e=()=>Promise.resolve(n)}catch(t){e=()=>Promise.reject(t)}Pr.set(this.auth._key(),e)}if(!this.bypassAuthState){Pr.set(this.auth._key(),()=>Promise.resolve(null))}return e()}async onAuthEvent(e){if(e.type==="signInViaRedirect"){return super.onAuthEvent(e)}else if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t){this.user=t;return super.onAuthEvent(e)}else{this.resolve(null)}}}async onExecution(){}cleanUp(){}}async function Dr(e,t){const n=Fr(t);const i=Ur(e);if(!await i._isAvailable()){return false}const r=await i._get(n)==="true";await i._remove(n);return r}async function Lr(e,t){return Ur(e)._set(Fr(t),"true")}function Mr(e,t){Pr.set(e._key(),t)}function Ur(e){return te(e._redirectPersistence)}function Fr(e){return Ge(Or,e.config.apiKey,e.name)}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function Vr(e,t,n){return xr(e,t,n)}async function xr(e,t,n){const i=ct(e);J(e,t,Wt);const r=_r(i,n);await Lr(r,i);return r._openRedirect(i,t,"signInViaRedirect")}function Hr(e,t,n){return jr(e,t,n)}async function jr(e,t,n){const i=k(e);J(i.auth,t,Wt);const r=_r(i.auth,n);await Lr(r,i.auth);const s=await Br(i);return r._openRedirect(i.auth,t,"reauthViaRedirect",s)}function Wr(e,t,n){return qr(e,t,n)}async function qr(e,t,n){const i=k(e);J(i.auth,t,Wt);const r=_r(i.auth,n);await un(false,i,t.providerId);await Lr(r,i.auth);const s=await Br(i);return r._openRedirect(i.auth,t,"linkViaRedirect",s)}async function Gr(e,t){await ct(e)._initializationPromise;return zr(e,t,false)}async function zr(e,t,n=false){const i=ct(e);const r=_r(i,t);const s=new Cr(i,r,n);const o=await s.execute();if(o&&!n){delete o.user._redirectEventId;await i._persistUserIfCurrent(o.user);await i._setRedirectUser(null,t)}return o}async function Br(e){const t=Ti(`${e.uid}:::`);e._redirectEventId=t;await e.auth._setRedirectUser(e);await e.auth._persistUserIfCurrent(e);return t}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */const Kr=10*60*1e3;class $r{constructor(e){this.auth=e;this.cachedEventUids=new Set;this.consumers=new Set;this.queuedRedirectEvent=null;this.hasHandledPotentialRedirect=false;this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e);if(this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)){this.sendToConsumer(this.queuedRedirectEvent,e);this.saveEventToCache(this.queuedRedirectEvent);this.queuedRedirectEvent=null}}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e)){return false}let t=false;this.consumers.forEach(n=>{if(this.isEventForConsumer(e,n)){t=true;this.sendToConsumer(e,n);this.saveEventToCache(e)}});if(this.hasHandledPotentialRedirect||!Xr(e)){return t}this.hasHandledPotentialRedirect=true;if(!t){this.queuedRedirectEvent=e;t=true}return t}sendToConsumer(e,t){var n;if(e.error&&!Yr(e)){const i=((n=e.error.code)===null||n===void 0?void 0:n.split("auth/")[1])||"internal-error";t.onError(K(this.auth,i))}else{t.onAuthEvent(e)}}isEventForConsumer(e,t){const n=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&n}hasEventBeenHandled(e){if(Date.now()-this.lastProcessedEventTime>=Kr){this.cachedEventUids.clear()}return this.cachedEventUids.has(Jr(e))}saveEventToCache(e){this.cachedEventUids.add(Jr(e));this.lastProcessedEventTime=Date.now()}}function Jr(e){return[e.type,e.eventId,e.sessionId,e.tenantId].filter(e=>e).join("-")}function Yr({type:e,error:t}){return e==="unknown"&&(t===null||t===void 0?void 0:t.code)===`auth/${"no-auth-event"}`}function Xr(e){switch(e.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return true;case"unknown":return Yr(e);default:return false}}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */async function Qr(e,t={}){return me(e,"GET","/v1/projects",t)}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */const Zr=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;const es=/^https?/;async function ts(e){if(e.config.emulator){return}const{authorizedDomains:t}=await Qr(e);for(const e of t){try{if(ns(e)){return}}catch(e){}}B(e,"unauthorized-domain")}function ns(e){const t=re();const{protocol:n,hostname:i}=new URL(t);if(e.startsWith("chrome-extension://")){const r=new URL(e);if(r.hostname===""&&i===""){return n==="chrome-extension:"&&e.replace("chrome-extension://","")===t.replace("chrome-extension://","")}return n==="chrome-extension:"&&r.hostname===i}if(!es.test(n)){return false}if(Zr.test(e)){return i===e}const r=e.replace(/\./g,"\\.");const s=new RegExp("^(.+\\."+r+"|"+r+")$","i");return s.test(i)}
/**
   * @license
   * Copyright 2020 Google LLC.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */const is=new ue(3e4,6e4);function rs(){const e=wi().___jsl;if(e===null||e===void 0?void 0:e.H){for(const t of Object.keys(e.H)){e.H[t].r=e.H[t].r||[];e.H[t].L=e.H[t].L||[];e.H[t].r=[...e.H[t].L];if(e.CP){for(let t=0;t<e.CP.length;t++){e.CP[t]=null}}}}}function ss(e){return new Promise((t,n)=>{var i,r,s;function o(){rs();gapi.load("gapi.iframes",{callback:()=>{t(gapi.iframes.getContext())},ontimeout:()=>{rs();n(K(e,"network-request-failed"))},timeout:is.get()})}if((r=(i=wi().gapi)===null||i===void 0?void 0:i.iframes)===null||r===void 0?void 0:r.Iframe){t(gapi.iframes.getContext())}else if(!!((s=wi().gapi)===null||s===void 0?void 0:s.load)){o()}else{const t=Ji("iframefcb");wi()[t]=()=>{if(!!gapi.load){o()}else{n(K(e,"network-request-failed"))}};return $i(`https://apis.google.com/js/api.js?onload=${t}`).catch(e=>n(e))}}).catch(e=>{os=null;throw e})}let os=null;function as(e){os=os||ss(e);return os}
/**
   * @license
   * Copyright 2020 Google LLC.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */const cs=new ue(5e3,15e3);const us="__/auth/iframe";const ds="emulator/auth/iframe";const ls={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"};const hs=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function fs(e){const t=e.config;X(t.authDomain,e,"auth-domain-config-required");const n=t.emulator?de(t,ds):`https://${e.config.authDomain}/${us}`;const i={apiKey:t.apiKey,appName:e.name,v:SDK_VERSION};const r=hs.get(e.config.apiHost);if(r){i.eid=r}const s=e._getFrameworks();if(s.length){i.fw=s.join(",")}return`${n}?${v(i).slice(1)}`}async function ps(e){const t=await as(e);const n=wi().gapi;X(n,e,"internal-error");return t.open({where:document.body,url:fs(e),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:ls,dontclear:true},t=>new Promise(async(n,i)=>{await t.restyle({setHideOnLeave:false});const r=K(e,"network-request-failed");const s=wi().setTimeout(()=>{i(r)},cs.get());function o(){wi().clearTimeout(s);n(t)}t.ping(o).then(o,()=>{i(r)})}))}
/**
   * @license
   * Copyright 2020 Google LLC.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */const ms={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"};const gs=500;const vs=600;const Is="_blank";const _s="http://localhost";class ys{constructor(e){this.window=e;this.associatedEvent=null}close(){if(this.window){try{this.window.close()}catch(e){}}}}function Ts(e,t,n,i=gs,s=vs){const o=Math.max((window.screen.availHeight-s)/2,0).toString();const a=Math.max((window.screen.availWidth-i)/2,0).toString();let c="";const u=Object.assign(Object.assign({},ms),{width:i.toString(),height:s.toString(),top:o,left:a});const d=r().toLowerCase();if(n){c=Je(d)?Is:n}if(Ke(d)){t=t||_s;u.scrollbars="yes"}const l=Object.entries(u).reduce((e,[t,n])=>`${e}${t}=${n},`,"");if(tt(d)&&c!=="_self"){Es(t||"",c);return new ys(null)}const h=window.open(t||"",c,l);X(h,e,"popup-blocked");try{h.focus()}catch(e){}return new ys(h)}function Es(e,t){const n=document.createElement("a");n.href=e;n.target=t;const i=document.createEvent("MouseEvent");i.initMouseEvent("click",true,true,window,1,0,0,0,0,false,false,false,false,1,null);n.dispatchEvent(i)}
/**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */const ws="__/auth/handler";const ks="emulator/auth/handler";function bs(e,t,n,i,r,s){X(e.config.authDomain,e,"auth-domain-config-required");X(e.config.apiKey,e,"invalid-api-key");const o={apiKey:e.config.apiKey,appName:e.name,authType:n,redirectUrl:i,v:SDK_VERSION,eventId:r};if(t instanceof Wt){t.setDefaultLanguage(e.languageCode);o.providerId=t.providerId||"";if(!p(t.getCustomParameters())){o.customParameters=JSON.stringify(t.getCustomParameters())}for(const[e,t]of Object.entries(s||{})){o[e]=t}}if(t instanceof qt){const e=t.getScopes().filter(e=>e!=="");if(e.length>0){o.scopes=e.join(",")}}if(e.tenantId){o.tid=e.tenantId}const a=o;for(const e of Object.keys(a)){if(a[e]===undefined){delete a[e]}}return`${As(e)}?${v(a).slice(1)}`}function As({config:e}){if(!e.emulator){return`https://${e.authDomain}/${ws}`}return de(e,ks)}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */const Rs="webStorageSupport";class Ss{constructor(){this.eventManagers={};this.iframes={};this.originValidationPromises={};this._redirectPersistence=Ii;this._completeRedirectFn=zr;this._overrideRedirectResult=Mr}async _openPopup(e,t,n,i){var r;Z((r=this.eventManagers[e._key()])===null||r===void 0?void 0:r.manager,"_initialize() not called before _openPopup()");const s=bs(e,t,n,re(),i);return Ts(e,s,Ti())}async _openRedirect(e,t,n,i){await this._originValidation(e);ki(bs(e,t,n,re(),i));return new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:e,promise:n}=this.eventManagers[t];if(e){return Promise.resolve(e)}else{Z(n,"If manager is not set, promise should be");return n}}const n=this.initAndGetManager(e);this.eventManagers[t]={promise:n};n.catch(()=>{delete this.eventManagers[t]});return n}async initAndGetManager(e){const t=await ps(e);const n=new $r(e);t.register("authEvent",t=>{X(t===null||t===void 0?void 0:t.authEvent,e,"invalid-auth-event");const i=n.onEvent(t.authEvent);return{status:i?"ACK":"ERROR"}},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER);this.eventManagers[e._key()]={manager:n};this.iframes[e._key()]=t;return n}_isIframeWebStorageSupported(e,t){const n=this.iframes[e._key()];n.send(Rs,{type:Rs},n=>{var i;const r=(i=n===null||n===void 0?void 0:n[0])===null||i===void 0?void 0:i[Rs];if(r!==undefined){t(!!r)}B(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();if(!this.originValidationPromises[t]){this.originValidationPromises[t]=ts(e)}return this.originValidationPromises[t]}get _shouldInitProactively(){return it()||$e()||et()}}const Ns=Ss;class Os{constructor(e){this.factorId=e}_process(e,t,n){switch(t.type){case"enroll":return this._finalizeEnroll(e,t.credential,n);case"signin":return this._finalizeSignIn(e,t.credential);default:return Q("unexpected MultiFactorSessionType")}}}class Ps extends Os{constructor(e){super("phone");this.credential=e}static _fromCredential(e){return new Ps(e)}_finalizeEnroll(e,t,n){return si(e,{idToken:t,displayName:n,phoneVerificationInfo:this.credential._makeVerificationRequest()})}_finalizeSignIn(e,t){return zi(e,{mfaPendingCredential:t,phoneVerificationInfo:this.credential._makeVerificationRequest()})}}class Cs{constructor(){}static assertion(e){return Ps._fromCredential(e)}}Cs.FACTOR_ID="phone";var Ds="@firebase/auth";var Ls="0.20.3";
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */class Ms{constructor(e){this.auth=e;this.internalListeners=new Map}getUid(){var e;this.assertAuthConfigured();return((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){this.assertAuthConfigured();await this.auth._initializationPromise;if(!this.auth.currentUser){return null}const t=await this.auth.currentUser.getIdToken(e);return{accessToken:t}}addAuthTokenListener(e){this.assertAuthConfigured();if(this.internalListeners.has(e)){return}const t=this.auth.onIdTokenChanged(t=>{var n;e(((n=t)===null||n===void 0?void 0:n.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t);this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);if(!t){return}this.internalListeners.delete(e);t();this.updateProactiveRefresh()}assertAuthConfigured(){X(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){if(this.internalListeners.size>0){this.auth._startProactiveRefresh()}else{this.auth._stopProactiveRefresh()}}}
/**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function Us(e){switch(e){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";default:return undefined}}function Fs(e){_registerComponent(new C("auth",(t,{options:n})=>{const i=t.getProvider("app").getImmediate();const r=t.getProvider("heartbeat");const{apiKey:s,authDomain:o}=i.options;return((t,i)=>{X(s&&!s.includes(":"),"invalid-api-key",{appName:t.name});X(!(o===null||o===void 0?void 0:o.includes(":")),"argument-error",{appName:t.name});const r={apiKey:s,authDomain:o,clientPlatform:e,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:st(e)};const a=new at(t,i,r);ie(a,n);return a})(i,r)},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,n)=>{const i=e.getProvider("auth-internal");i.initialize()}));_registerComponent(new C("auth-internal",e=>{const t=ct(e.getProvider("auth").getImmediate());return(e=>new Ms(e))(t)},"PRIVATE").setInstantiationMode("EXPLICIT"));registerVersion(Ds,Ls,Us(e));registerVersion(Ds,Ls,"esm2017")}
/**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */function Vs(e=getApp()){const t=_getProvider(e,"auth");if(t.isInitialized()){return t.getImmediate()}return ne(e,{popupRedirectResolver:Ns,persistence:[qi,gi,Ii]})}Fs("Browser");var xs={__esModule:true};xs.ActionCodeOperation=F;xs.ActionCodeURL=xt;xs.AuthCredential=mt;xs.AuthErrorCodes=q;xs.EmailAuthCredential=Rt;xs.EmailAuthProvider=jt;xs.FacebookAuthProvider=zt;xs.FactorId=D;xs.GithubAuthProvider=Kt;xs.GoogleAuthProvider=Bt;xs.OAuthCredential=Ot;xs.OAuthProvider=Gt;xs.OperationType=U;xs.PhoneAuthCredential=Ut;xs.PhoneAuthProvider=Ir;xs.PhoneMultiFactorGenerator=Cs;xs.ProviderId=L;xs.RecaptchaVerifier=dr;xs.SAMLAuthProvider=Xt;xs.SignInMethod=M;xs.TwitterAuthProvider=Qt;xs.applyActionCode=En;xs.beforeAuthStateChanged=Jn;xs.browserLocalPersistence=gi;xs.browserPopupRedirectResolver=Ns;xs.browserSessionPersistence=Ii;xs.checkActionCode=wn;xs.confirmPasswordReset=Tn;xs.connectAuthEmulator=dt;xs.createUserWithEmailAndPassword=bn;xs.debugErrorMap=H;xs.deleteUser=ei;xs.fetchSignInMethodsForEmail=Pn;xs.getAdditionalUserInfo=Bn;xs.getAuth=Vs;xs.getIdToken=be;xs.getIdTokenResult=Ae;xs.getMultiFactorResolver=ii;xs.getRedirectResult=Gr;xs.inMemoryPersistence=qe;xs.indexedDBLocalPersistence=qi;xs.initializeAuth=ne;xs.isSignInWithEmailLink=Sn;xs.linkWithCredential=fn;xs.linkWithPhoneNumber=pr;xs.linkWithPopup=Sr;xs.linkWithRedirect=Wr;xs.multiFactor=ui;xs.onAuthStateChanged=Yn;xs.onIdTokenChanged=$n;xs.parseActionCodeURL=Ht;xs.prodErrorMap=j;xs.reauthenticateWithCredential=pn;xs.reauthenticateWithPhoneNumber=mr;xs.reauthenticateWithPopup=Rr;xs.reauthenticateWithRedirect=Hr;xs.reload=Me;xs.sendEmailVerification=Cn;xs.sendPasswordResetEmail=yn;xs.sendSignInLinkToEmail=Rn;xs.setPersistence=Kn;xs.signInAnonymously=nn;xs.signInWithCredential=hn;xs.signInWithCustomToken=gn;xs.signInWithEmailAndPassword=An;xs.signInWithEmailLink=Nn;xs.signInWithPhoneNumber=fr;xs.signInWithPopup=Ar;xs.signInWithRedirect=Vr;xs.signOut=Zn;xs.unlink=an;xs.updateCurrentUser=Qn;xs.updateEmail=Un;xs.updatePassword=Fn;xs.updatePhoneNumber=vr;xs.updateProfile=Mn;xs.useDeviceLanguage=Xn;xs.verifyBeforeUpdateEmail=Dn;xs.verifyPasswordResetCode=kn;return xs});