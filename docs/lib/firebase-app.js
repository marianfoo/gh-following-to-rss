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
const e=function(e){const t=[];let n=0;for(let r=0;r<e.length;r++){let s=e.charCodeAt(r);if(s<128){t[n++]=s}else if(s<2048){t[n++]=s>>6|192;t[n++]=s&63|128}else if((s&64512)===55296&&r+1<e.length&&(e.charCodeAt(r+1)&64512)===56320){s=65536+((s&1023)<<10)+(e.charCodeAt(++r)&1023);t[n++]=s>>18|240;t[n++]=s>>12&63|128;t[n++]=s>>6&63|128;t[n++]=s&63|128}else{t[n++]=s>>12|224;t[n++]=s>>6&63|128;t[n++]=s&63|128}}return t};const t=function(e){const t=[];let n=0,r=0;while(n<e.length){const s=e[n++];if(s<128){t[r++]=String.fromCharCode(s)}else if(s>191&&s<224){const i=e[n++];t[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=e[n++];const a=e[n++];const o=e[n++];const c=((s&7)<<18|(i&63)<<12|(a&63)<<6|o&63)-65536;t[r++]=String.fromCharCode(55296+(c>>10));t[r++]=String.fromCharCode(56320+(c&1023))}else{const i=e[n++];const a=e[n++];t[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|a&63)}}return t.join("")};const n={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZ"+"abcdefghijklmnopqrstuvwxyz"+"0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob==="function",encodeByteArray(e,t){if(!Array.isArray(e)){throw Error("encodeByteArray takes an array as a parameter")}this.init_();const n=t?this.byteToCharMapWebSafe_:this.byteToCharMap_;const r=[];for(let t=0;t<e.length;t+=3){const s=e[t];const i=t+1<e.length;const a=i?e[t+1]:0;const o=t+2<e.length;const c=o?e[t+2]:0;const h=s>>2;const l=(s&3)<<4|a>>4;let f=(a&15)<<2|c>>6;let u=c&63;if(!o){u=64;if(!i){f=64}}r.push(n[h],n[l],n[f],n[u])}return r.join("")},encodeString(t,n){if(this.HAS_NATIVE_SUPPORT&&!n){return btoa(t)}return this.encodeByteArray(e(t),n)},decodeString(e,n){if(this.HAS_NATIVE_SUPPORT&&!n){return atob(e)}return t(this.decodeStringToByteArray(e,n))},decodeStringToByteArray(e,t){this.init_();const n=t?this.charToByteMapWebSafe_:this.charToByteMap_;const r=[];for(let t=0;t<e.length;){const s=n[e.charAt(t++)];const i=t<e.length;const a=i?n[e.charAt(t)]:0;++t;const o=t<e.length;const c=o?n[e.charAt(t)]:64;++t;const h=t<e.length;const l=h?n[e.charAt(t)]:64;++t;if(s==null||a==null||c==null||l==null){throw Error()}const f=s<<2|a>>4;r.push(f);if(c!==64){const e=a<<4&240|c>>2;r.push(e);if(l!==64){const e=c<<6&192|l;r.push(e)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={};this.charToByteMap_={};this.byteToCharMapWebSafe_={};this.charToByteMapWebSafe_={};for(let e=0;e<this.ENCODED_VALS.length;e++){this.byteToCharMap_[e]=this.ENCODED_VALS.charAt(e);this.charToByteMap_[this.byteToCharMap_[e]]=e;this.byteToCharMapWebSafe_[e]=this.ENCODED_VALS_WEBSAFE.charAt(e);this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]]=e;if(e>=this.ENCODED_VALS_BASE.length){this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)]=e;this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)]=e}}}}};const r=function(t){const r=e(t);return n.encodeByteArray(r,true)};const s=function(e){return r(e).replace(/\./g,"")};
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
   */class i{constructor(){this.reject=()=>{};this.resolve=()=>{};this.promise=new Promise((e,t)=>{this.resolve=e;this.reject=t})}wrapCallback(e){return(t,n)=>{if(t){this.reject(t)}else{this.resolve(n)}if(typeof e==="function"){this.promise.catch(()=>{});if(e.length===1){e(t)}else{e(t,n)}}}}}function a(){return typeof indexedDB==="object"}function o(){return new Promise((e,t)=>{try{let n=true;const r="validate-browser-context-for-indexeddb-analytics-module";const s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close();if(!n){self.indexedDB.deleteDatabase(r)}e(true)};s.onupgradeneeded=()=>{n=false};s.onerror=()=>{var e;t(((e=s.error)===null||e===void 0?void 0:e.message)||"")}}catch(e){t(e)}})}
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
   */const c="FirebaseError";class h extends Error{constructor(e,t,n){super(t);this.code=e;this.customData=n;this.name=c;Object.setPrototypeOf(this,h.prototype);if(Error.captureStackTrace){Error.captureStackTrace(this,l.prototype.create)}}}class l{constructor(e,t,n){this.service=e;this.serviceName=t;this.errors=n}create(e,...t){const n=t[0]||{};const r=`${this.service}/${e}`;const s=this.errors[e];const i=s?f(s,n):"Error";const a=`${this.serviceName}: ${i} (${r}).`;const o=new h(r,a,n);return o}}function f(e,t){return e.replace(u,(e,n)=>{const r=t[n];return r!=null?String(r):`<${n}?>`})}const u=/\{\$([^}]+)}/g;function d(e,t){if(e===t){return true}const n=Object.keys(e);const r=Object.keys(t);for(const s of n){if(!r.includes(s)){return false}const n=e[s];const i=t[s];if(p(n)&&p(i)){if(!d(n,i)){return false}}else if(n!==i){return false}}for(const e of r){if(!n.includes(e)){return false}}return true}function p(e){return e!==null&&typeof e==="object"}class g{constructor(e,t,n){this.name=e;this.instanceFactory=t;this.type=n;this.multipleInstances=false;this.serviceProps={};this.instantiationMode="LAZY";this.onInstanceCreated=null}setInstantiationMode(e){this.instantiationMode=e;return this}setMultipleInstances(e){this.multipleInstances=e;return this}setServiceProps(e){this.serviceProps=e;return this}setInstanceCreatedCallback(e){this.onInstanceCreated=e;return this}}
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
   */const m="[DEFAULT]";
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
   */class b{constructor(e,t){this.name=e;this.container=t;this.component=null;this.instances=new Map;this.instancesDeferred=new Map;this.instancesOptions=new Map;this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const e=new i;this.instancesDeferred.set(t,e);if(this.isInitialized(t)||this.shouldAutoInitialize()){try{const n=this.getOrInitializeService({instanceIdentifier:t});if(n){e.resolve(n)}}catch(e){}}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const n=this.normalizeInstanceIdentifier(e===null||e===void 0?void 0:e.identifier);const r=(t=e===null||e===void 0?void 0:e.optional)!==null&&t!==void 0?t:false;if(this.isInitialized(n)||this.shouldAutoInitialize()){try{return this.getOrInitializeService({instanceIdentifier:n})}catch(e){if(r){return null}else{throw e}}}else{if(r){return null}else{throw Error(`Service ${this.name} is not available`)}}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name){throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`)}if(this.component){throw Error(`Component for ${this.name} has already been provided`)}this.component=e;if(!this.shouldAutoInitialize()){return}if(E(e)){try{this.getOrInitializeService({instanceIdentifier:m})}catch(e){}}for(const[e,t]of this.instancesDeferred.entries()){const n=this.normalizeInstanceIdentifier(e);try{const e=this.getOrInitializeService({instanceIdentifier:n});t.resolve(e)}catch(e){}}}clearInstance(e=m){this.instancesDeferred.delete(e);this.instancesOptions.delete(e);this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(e=>"INTERNAL"in e).map(e=>e.INTERNAL.delete()),...e.filter(e=>"_delete"in e).map(e=>e._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=m){return this.instances.has(e)}getOptions(e=m){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e;const n=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(n)){throw Error(`${this.name}(${n}) has already been initialized`)}if(!this.isComponentSet()){throw Error(`Component ${this.name} has not been registered yet`)}const r=this.getOrInitializeService({instanceIdentifier:n,options:t});for(const[e,t]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(e);if(n===s){t.resolve(r)}}return r}onInit(e,t){var n;const r=this.normalizeInstanceIdentifier(t);const s=(n=this.onInitCallbacks.get(r))!==null&&n!==void 0?n:new Set;s.add(e);this.onInitCallbacks.set(r,s);const i=this.instances.get(r);if(i){e(i,r)}return()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){const n=this.onInitCallbacks.get(t);if(!n){return}for(const r of n){try{r(e,t)}catch(e){}}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let n=this.instances.get(e);if(!n&&this.component){n=this.component.instanceFactory(this.container,{instanceIdentifier:v(e),options:t});this.instances.set(e,n);this.instancesOptions.set(e,t);this.invokeOnInitCallbacks(n,e);if(this.component.onInstanceCreated){try{this.component.onInstanceCreated(this.container,e,n)}catch(e){}}}return n||null}normalizeInstanceIdentifier(e=m){if(this.component){return this.component.multipleInstances?e:m}else{return e}}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function v(e){return e===m?undefined:e}function E(e){return e.instantiationMode==="EAGER"}
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
   */class _{constructor(e){this.name=e;this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet()){throw new Error(`Component ${e.name} has already been registered with ${this.name}`)}t.setComponent(e)}addOrOverwriteComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet()){this.providers.delete(e.name)}this.addComponent(e)}getProvider(e){if(this.providers.has(e)){return this.providers.get(e)}const t=new b(e,this);this.providers.set(e,t);return t}getProviders(){return Array.from(this.providers.values())}}
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
   */const w=[];var y;(function(e){e[e["DEBUG"]=0]="DEBUG";e[e["VERBOSE"]=1]="VERBOSE";e[e["INFO"]=2]="INFO";e[e["WARN"]=3]="WARN";e[e["ERROR"]=4]="ERROR";e[e["SILENT"]=5]="SILENT"})(y||(y={}));const I={debug:y.DEBUG,verbose:y.VERBOSE,info:y.INFO,warn:y.WARN,error:y.ERROR,silent:y.SILENT};const C=y.INFO;const D={[y.DEBUG]:"log",[y.VERBOSE]:"log",[y.INFO]:"info",[y.WARN]:"warn",[y.ERROR]:"error"};const S=(e,t,...n)=>{if(t<e.logLevel){return}const r=(new Date).toISOString();const s=D[t];if(s){console[s](`[${r}]  ${e.name}:`,...n)}else{throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`)}};class A{constructor(e){this.name=e;this._logLevel=C;this._logHandler=S;this._userLogHandler=null;w.push(this)}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in y)){throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``)}this._logLevel=e}setLogLevel(e){this._logLevel=typeof e==="string"?I[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!=="function"){throw new TypeError("Value assigned to `logHandler` must be a function")}this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,y.DEBUG,...e);this._logHandler(this,y.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,y.VERBOSE,...e);this._logHandler(this,y.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,y.INFO,...e);this._logHandler(this,y.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,y.WARN,...e);this._logHandler(this,y.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,y.ERROR,...e);this._logHandler(this,y.ERROR,...e)}}function O(e){w.forEach(t=>{t.setLogLevel(e)})}function L(e,t){for(const n of w){let r=null;if(t&&t.level){r=I[t.level]}if(e===null){n.userLogHandler=null}else{n.userLogHandler=(t,n,...s)=>{const i=s.map(e=>{if(e==null){return null}else if(typeof e==="string"){return e}else if(typeof e==="number"||typeof e==="boolean"){return e.toString()}else if(e instanceof Error){return e.message}else{try{return JSON.stringify(e)}catch(e){return null}}}).filter(e=>e).join(" ");if(n>=(r!==null&&r!==void 0?r:t.logLevel)){e({level:y[n].toLowerCase(),message:i,args:s,type:t.name})}}}}}const B=(e,t)=>t.some(t=>e instanceof t);let N;let T;function M(){return N||(N=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function P(){return T||(T=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const H=new WeakMap;const R=new WeakMap;const j=new WeakMap;const $=new WeakMap;const k=new WeakMap;function V(e){const t=new Promise((t,n)=>{const r=()=>{e.removeEventListener("success",s);e.removeEventListener("error",i)};const s=()=>{t(G(e.result));r()};const i=()=>{n(e.error);r()};e.addEventListener("success",s);e.addEventListener("error",i)});t.then(t=>{if(t instanceof IDBCursor){H.set(t,e)}}).catch(()=>{});k.set(t,e);return t}function F(e){if(R.has(e))return;const t=new Promise((t,n)=>{const r=()=>{e.removeEventListener("complete",s);e.removeEventListener("error",i);e.removeEventListener("abort",i)};const s=()=>{t();r()};const i=()=>{n(e.error||new DOMException("AbortError","AbortError"));r()};e.addEventListener("complete",s);e.addEventListener("error",i);e.addEventListener("abort",i)});R.set(e,t)}let z={get(e,t,n){if(e instanceof IDBTransaction){if(t==="done")return R.get(e);if(t==="objectStoreNames"){return e.objectStoreNames||j.get(e)}if(t==="store"){return n.objectStoreNames[1]?undefined:n.objectStore(n.objectStoreNames[0])}}return G(e[t])},set(e,t,n){e[t]=n;return true},has(e,t){if(e instanceof IDBTransaction&&(t==="done"||t==="store")){return true}return t in e}};function W(e){z=e(z)}function x(e){if(e===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)){return function(t,...n){const r=e.call(K(this),t,...n);j.set(r,t.sort?t.sort():[t]);return G(r)}}if(P().includes(e)){return function(...t){e.apply(K(this),t);return G(H.get(this))}}return function(...t){return G(e.apply(K(this),t))}}function U(e){if(typeof e==="function")return x(e);if(e instanceof IDBTransaction)F(e);if(B(e,M()))return new Proxy(e,z);return e}function G(e){if(e instanceof IDBRequest)return V(e);if($.has(e))return $.get(e);const t=U(e);if(t!==e){$.set(e,t);k.set(t,e)}return t}const K=e=>k.get(e);function J(e,t,{blocked:n,upgrade:r,blocking:s,terminated:i}={}){const a=indexedDB.open(e,t);const o=G(a);if(r){a.addEventListener("upgradeneeded",e=>{r(G(a.result),e.oldVersion,e.newVersion,G(a.transaction))})}if(n)a.addEventListener("blocked",()=>n());o.then(e=>{if(i)e.addEventListener("close",()=>i());if(s)e.addEventListener("versionchange",()=>s())}).catch(()=>{});return o}const Y=["get","getKey","getAll","getAllKeys","count"];const q=["put","add","delete","clear"];const X=new Map;function Z(e,t){if(!(e instanceof IDBDatabase&&!(t in e)&&typeof t==="string")){return}if(X.get(t))return X.get(t);const n=t.replace(/FromIndex$/,"");const r=t!==n;const s=q.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(s||Y.includes(n))){return}const i=async function(e,...t){const i=this.transaction(e,s?"readwrite":"readonly");let a=i.store;if(r)a=a.index(t.shift());return(await Promise.all([a[n](...t),s&&i.done]))[0]};X.set(t,i);return i}W(e=>({...e,get:(t,n,r)=>Z(t,n)||e.get(t,n,r),has:(t,n)=>!!Z(t,n)||e.has(t,n)}));
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
   */class Q{constructor(e){this.container=e}getPlatformInfoString(){const e=this.container.getProviders();return e.map(e=>{if(ee(e)){const t=e.getImmediate();return`${t.library}/${t.version}`}else{return null}}).filter(e=>e).join(" ")}}function ee(e){const t=e.getComponent();return(t===null||t===void 0?void 0:t.type)==="VERSION"}const te="https://www.gstatic.com/firebasejs/9.8.3/firebase-app.js";const ne="0.7.26";
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
   */const re=new A("https://www.gstatic.com/firebasejs/9.8.3/firebase-app.js");const se="https://www.gstatic.com/firebasejs/9.8.3/firebase-app.js-compat";const ie="@firebase/analytics-compat";const ae="@firebase/analytics";const oe="https://www.gstatic.com/firebasejs/9.8.3/firebase-app.js-check-compat";const ce="https://www.gstatic.com/firebasejs/9.8.3/firebase-app.js-check";const he="@firebase/auth";const le="@firebase/auth-compat";const fe="@firebase/database";const ue="@firebase/database-compat";const de="@firebase/functions";const pe="@firebase/functions-compat";const ge="@firebase/installations";const me="@firebase/installations-compat";const be="@firebase/messaging";const ve="@firebase/messaging-compat";const Ee="@firebase/performance";const _e="@firebase/performance-compat";const we="@firebase/remote-config";const ye="@firebase/remote-config-compat";const Ie="@firebase/storage";const Ce="@firebase/storage-compat";const De="@firebase/firestore";const Se="@firebase/firestore-compat";const Ae="firebase";const Oe="9.8.3";
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
   */const Le="[DEFAULT]";const Be={[te]:"fire-core",[se]:"fire-core-compat",[ae]:"fire-analytics",[ie]:"fire-analytics-compat",[ce]:"fire-app-check",[oe]:"fire-app-check-compat",[he]:"fire-auth",[le]:"fire-auth-compat",[fe]:"fire-rtdb",[ue]:"fire-rtdb-compat",[de]:"fire-fn",[pe]:"fire-fn-compat",[ge]:"fire-iid",[me]:"fire-iid-compat",[be]:"fire-fcm",[ve]:"fire-fcm-compat",[Ee]:"fire-perf",[_e]:"fire-perf-compat",[we]:"fire-rc",[ye]:"fire-rc-compat",[Ie]:"fire-gcs",[Ce]:"fire-gcs-compat",[De]:"fire-fst",[Se]:"fire-fst-compat","fire-js":"fire-js",[Ae]:"fire-js-all"};
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
   */const Ne=new Map;const Te=new Map;function Me(e,t){try{e.container.addComponent(t)}catch(n){re.debug(`Component ${t.name} failed to register with FirebaseApp ${e.name}`,n)}}function Pe(e,t){e.container.addOrOverwriteComponent(t)}function He(e){const t=e.name;if(Te.has(t)){re.debug(`There were multiple attempts to register component ${t}.`);return false}Te.set(t,e);for(const t of Ne.values()){Me(t,e)}return true}function Re(e,t){const n=e.container.getProvider("heartbeat").getImmediate({optional:true});if(n){void n.triggerHeartbeat()}return e.container.getProvider(t)}function je(e,t,n=Le){Re(e,t).clearInstance(n)}function $e(){Te.clear()}
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
   */const ke={["no-app"]:"No Firebase App '{$appName}' has been created - "+"call Firebase App.initializeApp()",["bad-app-name"]:"Illegal App name: '{$appName}",["duplicate-app"]:"Firebase App named '{$appName}' already exists with different options or config",["app-deleted"]:"Firebase App named '{$appName}' already deleted",["invalid-app-argument"]:"firebase.{$appName}() takes either no argument or a "+"Firebase App instance.",["invalid-log-argument"]:"First argument to `onLog` must be null or a function.",["storage-open"]:"Error thrown when opening storage. Original error: {$originalErrorMessage}.",["storage-get"]:"Error thrown when reading from storage. Original error: {$originalErrorMessage}.",["storage-set"]:"Error thrown when writing to storage. Original error: {$originalErrorMessage}.",["storage-delete"]:"Error thrown when deleting from storage. Original error: {$originalErrorMessage}."};const Ve=new l("app","Firebase",ke);
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
   */class Fe{constructor(e,t,n){this._isDeleted=false;this._options=Object.assign({},e);this._config=Object.assign({},t);this._name=t.name;this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled;this._container=n;this.container.addComponent(new g("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){this.checkDestroyed();return this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed();this._automaticDataCollectionEnabled=e}get name(){this.checkDestroyed();return this._name}get options(){this.checkDestroyed();return this._options}get config(){this.checkDestroyed();return this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted){throw Ve.create("app-deleted",{appName:this._name})}}}
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
   */const ze=Oe;function We(e,t={}){if(typeof t!=="object"){const e=t;t={name:e}}const n=Object.assign({name:Le,automaticDataCollectionEnabled:false},t);const r=n.name;if(typeof r!=="string"||!r){throw Ve.create("bad-app-name",{appName:String(r)})}const s=Ne.get(r);if(s){if(d(e,s.options)&&d(n,s.config)){return s}else{throw Ve.create("duplicate-app",{appName:r})}}const i=new _(r);for(const e of Te.values()){i.addComponent(e)}const a=new Fe(e,n,i);Ne.set(r,a);return a}function xe(e=Le){const t=Ne.get(e);if(!t){throw Ve.create("no-app",{appName:e})}return t}function Ue(){return Array.from(Ne.values())}async function Ge(e){const t=e.name;if(Ne.has(t)){Ne.delete(t);await Promise.all(e.container.getProviders().map(e=>e.delete()));e.isDeleted=true}}function Ke(e,t,n){var r;let s=(r=Be[e])!==null&&r!==void 0?r:e;if(n){s+=`-${n}`}const i=s.match(/\s|\//);const a=t.match(/\s|\//);if(i||a){const e=[`Unable to register library "${s}" with version "1.0.0":`];if(i){e.push(`library name "${s}" contains illegal characters (whitespace or "/")`)}if(i&&a){e.push("and")}if(a){e.push(`version name "1.0.0" contains illegal characters (whitespace or "/")`)}re.warn(e.join(" "));return}He(new g(`${s}-version`,()=>({library:s,version:t}),"VERSION"))}function Je(e,t){if(e!==null&&typeof e!=="function"){throw Ve.create("invalid-log-argument")}L(e,t)}function Ye(e){O(e)}
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
   */const qe="firebase-heartbeat-database";const Xe=1;const Ze="firebase-heartbeat-store";let Qe=null;function et(){if(!Qe){Qe=J(qe,Xe,{upgrade:(e,t)=>{switch(t){case 0:e.createObjectStore(Ze)}}}).catch(e=>{throw Ve.create("storage-open",{originalErrorMessage:e.message})})}return Qe}async function tt(e){var t;try{const t=await et();return t.transaction(Ze).objectStore(Ze).get(rt(e))}catch(e){throw Ve.create("storage-get",{originalErrorMessage:(t=e)===null||t===void 0?void 0:t.message})}}async function nt(e,t){var n;try{const n=await et();const r=n.transaction(Ze,"readwrite");const s=r.objectStore(Ze);await s.put(t,rt(e));return r.done}catch(e){throw Ve.create("storage-set",{originalErrorMessage:(n=e)===null||n===void 0?void 0:n.message})}}function rt(e){return`${e.name}!${e.options.appId}`}
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
   */const st=1024;const it=30*24*60*60*1e3;class at{constructor(e){this.container=e;this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new ht(t);this._heartbeatsCachePromise=this._storage.read().then(e=>{this._heartbeatsCache=e;return e})}async triggerHeartbeat(){const e=this.container.getProvider("platform-logger").getImmediate();const t=e.getPlatformInfoString();const n=ot();if(this._heartbeatsCache===null){this._heartbeatsCache=await this._heartbeatsCachePromise}if(this._heartbeatsCache.lastSentHeartbeatDate===n||this._heartbeatsCache.heartbeats.some(e=>e.date===n)){return}else{this._heartbeatsCache.heartbeats.push({date:n,agent:t})}this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(e=>{const t=new Date(e.date).valueOf();const n=Date.now();return n-t<=it});return this._storage.overwrite(this._heartbeatsCache)}async getHeartbeatsHeader(){if(this._heartbeatsCache===null){await this._heartbeatsCachePromise}if(this._heartbeatsCache===null||this._heartbeatsCache.heartbeats.length===0){return""}const e=ot();const{heartbeatsToSend:t,unsentEntries:n}=ct(this._heartbeatsCache.heartbeats);const r=s(JSON.stringify({version:2,heartbeats:t}));this._heartbeatsCache.lastSentHeartbeatDate=e;if(n.length>0){this._heartbeatsCache.heartbeats=n;await this._storage.overwrite(this._heartbeatsCache)}else{this._heartbeatsCache.heartbeats=[];void this._storage.overwrite(this._heartbeatsCache)}return r}}function ot(){const e=new Date;return e.toISOString().substring(0,10)}function ct(e,t=st){const n=[];let r=e.slice();for(const s of e){const e=n.find(e=>e.agent===s.agent);if(!e){n.push({agent:s.agent,dates:[s.date]});if(lt(n)>t){n.pop();break}}else{e.dates.push(s.date);if(lt(n)>t){e.dates.pop();break}}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}class ht{constructor(e){this.app=e;this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){if(!a()){return false}else{return o().then(()=>true).catch(()=>false)}}async read(){const e=await this._canUseIndexedDBPromise;if(!e){return{heartbeats:[]}}else{const e=await tt(this.app);return e||{heartbeats:[]}}}async overwrite(e){var t;const n=await this._canUseIndexedDBPromise;if(!n){return}else{const n=await this.read();return nt(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:n.lastSentHeartbeatDate,heartbeats:e.heartbeats})}}async add(e){var t;const n=await this._canUseIndexedDBPromise;if(!n){return}else{const n=await this.read();return nt(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:n.lastSentHeartbeatDate,heartbeats:[...n.heartbeats,...e.heartbeats]})}}}function lt(e){return s(JSON.stringify({version:2,heartbeats:e})).length}
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
   */function ft(e){He(new g("platform-logger",e=>new Q(e),"PRIVATE"));He(new g("heartbeat",e=>new at(e),"PRIVATE"));Ke(te,ne,e);Ke(te,ne,"esm2017");Ke("fire-js","")}ft("");var ut="firebase";var dt="9.8.3";
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
   */Ke(ut,dt,"cdn");var pt={__esModule:true};pt.FirebaseError=h;pt.SDK_VERSION=ze;pt._DEFAULT_ENTRY_NAME=Le;pt._addComponent=Me;pt._addOrOverwriteComponent=Pe;pt._apps=Ne;pt._clearComponents=$e;pt._components=Te;pt._getProvider=Re;pt._registerComponent=He;pt._removeServiceInstance=je;pt.deleteApp=Ge;pt.getApp=xe;pt.getApps=Ue;pt.initializeApp=We;pt.onLog=Je;pt.registerVersion=Ke;pt.setLogLevel=Ye;return pt});