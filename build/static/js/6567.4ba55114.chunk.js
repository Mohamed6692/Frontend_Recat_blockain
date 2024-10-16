"use strict";(self.webpackChunkcrypto_react=self.webpackChunkcrypto_react||[]).push([[6567],{36567:(e,t,n)=>{t.SafeAppProvider=void 0;var s=n(51538);Object.defineProperty(t,"SafeAppProvider",{enumerable:!0,get:function(){return s.SafeAppProvider}})},51538:(e,t,n)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.SafeAppProvider=void 0;const s=n(69716),r=n(57890);class i extends s.EventEmitter{constructor(e,t){super(),this.submittedTxs=new Map,this.safe=e,this.sdk=t}async connect(){this.emit("connect",{chainId:this.chainId})}async disconnect(){}get chainId(){return this.safe.chainId}async request(e){const{method:t,params:n=[]}=e;switch(t){case"eth_accounts":return[this.safe.safeAddress];case"net_version":case"eth_chainId":return`0x${this.chainId.toString(16)}`;case"personal_sign":{const[e,t]=n;if(this.safe.safeAddress.toLowerCase()!==t.toLowerCase())throw new Error("The address or message hash is invalid");const s=await this.sdk.txs.signMessage(e);return("signature"in s?s.signature:void 0)||"0x"}case"eth_sign":{const[e,t]=n;if(this.safe.safeAddress.toLowerCase()!==e.toLowerCase()||!t.startsWith("0x"))throw new Error("The address or message hash is invalid");const s=await this.sdk.txs.signMessage(t);return("signature"in s?s.signature:void 0)||"0x"}case"eth_signTypedData":case"eth_signTypedData_v4":{const[e,t]=n,s="string"===typeof t?JSON.parse(t):t;if(this.safe.safeAddress.toLowerCase()!==e.toLowerCase())throw new Error("The address is invalid");const r=await this.sdk.txs.signTypedMessage(s);return("signature"in r?r.signature:void 0)||"0x"}case"eth_sendTransaction":const t={...n[0],value:n[0].value||"0",data:n[0].data||"0x"};"string"===typeof t.gas&&t.gas.startsWith("0x")&&(t.gas=parseInt(t.gas,16));const i=await this.sdk.txs.send({txs:[t],params:{safeTxGas:t.gas}});return this.submittedTxs.set(i.safeTxHash,{from:this.safe.safeAddress,hash:i.safeTxHash,gas:0,gasPrice:"0x00",nonce:0,input:t.data,value:t.value,to:t.to,blockHash:null,blockNumber:null,transactionIndex:null}),i.safeTxHash;case"eth_blockNumber":return(await this.sdk.eth.getBlockByNumber(["latest"])).number;case"eth_getBalance":return this.sdk.eth.getBalance([(0,r.getLowerCase)(n[0]),n[1]]);case"eth_getCode":return this.sdk.eth.getCode([(0,r.getLowerCase)(n[0]),n[1]]);case"eth_getTransactionCount":return this.sdk.eth.getTransactionCount([(0,r.getLowerCase)(n[0]),n[1]]);case"eth_getStorageAt":return this.sdk.eth.getStorageAt([(0,r.getLowerCase)(n[0]),n[1],n[2]]);case"eth_getBlockByNumber":return this.sdk.eth.getBlockByNumber([n[0],n[1]]);case"eth_getBlockByHash":return this.sdk.eth.getBlockByHash([n[0],n[1]]);case"eth_getTransactionByHash":let o=n[0];try{o=(await this.sdk.txs.getBySafeTxHash(o)).txHash||o}catch(s){}return this.submittedTxs.has(o)?this.submittedTxs.get(o):this.sdk.eth.getTransactionByHash([o]).then((e=>(e&&(e.hash=n[0]),e)));case"eth_getTransactionReceipt":{let e=n[0];try{e=(await this.sdk.txs.getBySafeTxHash(e)).txHash||e}catch(s){}return this.sdk.eth.getTransactionReceipt([e]).then((e=>(e&&(e.transactionHash=n[0]),e)))}case"eth_estimateGas":return this.sdk.eth.getEstimateGas(n[0]);case"eth_call":return this.sdk.eth.call([n[0],n[1]]);case"eth_getLogs":return this.sdk.eth.getPastLogs([n[0]]);case"eth_gasPrice":return this.sdk.eth.getGasPrice();case"wallet_getPermissions":return this.sdk.wallet.getPermissions();case"wallet_requestPermissions":return this.sdk.wallet.requestPermissions(n[0]);case"safe_setSettings":return this.sdk.eth.setSafeSettings([n[0]]);default:throw Error(`"${e.method}" not implemented`)}}send(e,t){e||t("Undefined request"),this.request(e).then((n=>t(null,{jsonrpc:"2.0",id:e.id,result:n}))).catch((e=>t(e,null)))}}t.SafeAppProvider=i},57890:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.getLowerCase=void 0,t.getLowerCase=function(e){return e?e.toLowerCase():e}},69716:e=>{var t,n="object"===typeof Reflect?Reflect:null,s=n&&"function"===typeof n.apply?n.apply:function(e,t,n){return Function.prototype.apply.call(e,t,n)};t=n&&"function"===typeof n.ownKeys?n.ownKeys:Object.getOwnPropertySymbols?function(e){return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e))}:function(e){return Object.getOwnPropertyNames(e)};var r=Number.isNaN||function(e){return e!==e};function i(){i.init.call(this)}e.exports=i,e.exports.once=function(e,t){return new Promise((function(n,s){function r(n){e.removeListener(t,i),s(n)}function i(){"function"===typeof e.removeListener&&e.removeListener("error",r),n([].slice.call(arguments))}v(e,t,i,{once:!0}),"error"!==t&&function(e,t,n){"function"===typeof e.on&&v(e,"error",t,n)}(e,r,{once:!0})}))},i.EventEmitter=i,i.prototype._events=void 0,i.prototype._eventsCount=0,i.prototype._maxListeners=void 0;var o=10;function a(e){if("function"!==typeof e)throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof e)}function h(e){return void 0===e._maxListeners?i.defaultMaxListeners:e._maxListeners}function u(e,t,n,s){var r,i,o,u;if(a(n),void 0===(i=e._events)?(i=e._events=Object.create(null),e._eventsCount=0):(void 0!==i.newListener&&(e.emit("newListener",t,n.listener?n.listener:n),i=e._events),o=i[t]),void 0===o)o=i[t]=n,++e._eventsCount;else if("function"===typeof o?o=i[t]=s?[n,o]:[o,n]:s?o.unshift(n):o.push(n),(r=h(e))>0&&o.length>r&&!o.warned){o.warned=!0;var c=new Error("Possible EventEmitter memory leak detected. "+o.length+" "+String(t)+" listeners added. Use emitter.setMaxListeners() to increase limit");c.name="MaxListenersExceededWarning",c.emitter=e,c.type=t,c.count=o.length,u=c,console&&console.warn&&console.warn(u)}return e}function c(){if(!this.fired)return this.target.removeListener(this.type,this.wrapFn),this.fired=!0,0===arguments.length?this.listener.call(this.target):this.listener.apply(this.target,arguments)}function f(e,t,n){var s={fired:!1,wrapFn:void 0,target:e,type:t,listener:n},r=c.bind(s);return r.listener=n,s.wrapFn=r,r}function l(e,t,n){var s=e._events;if(void 0===s)return[];var r=s[t];return void 0===r?[]:"function"===typeof r?n?[r.listener||r]:[r]:n?function(e){for(var t=new Array(e.length),n=0;n<t.length;++n)t[n]=e[n].listener||e[n];return t}(r):p(r,r.length)}function d(e){var t=this._events;if(void 0!==t){var n=t[e];if("function"===typeof n)return 1;if(void 0!==n)return n.length}return 0}function p(e,t){for(var n=new Array(t),s=0;s<t;++s)n[s]=e[s];return n}function v(e,t,n,s){if("function"===typeof e.on)s.once?e.once(t,n):e.on(t,n);else{if("function"!==typeof e.addEventListener)throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type '+typeof e);e.addEventListener(t,(function r(i){s.once&&e.removeEventListener(t,r),n(i)}))}}Object.defineProperty(i,"defaultMaxListeners",{enumerable:!0,get:function(){return o},set:function(e){if("number"!==typeof e||e<0||r(e))throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received '+e+".");o=e}}),i.init=function(){void 0!==this._events&&this._events!==Object.getPrototypeOf(this)._events||(this._events=Object.create(null),this._eventsCount=0),this._maxListeners=this._maxListeners||void 0},i.prototype.setMaxListeners=function(e){if("number"!==typeof e||e<0||r(e))throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received '+e+".");return this._maxListeners=e,this},i.prototype.getMaxListeners=function(){return h(this)},i.prototype.emit=function(e){for(var t=[],n=1;n<arguments.length;n++)t.push(arguments[n]);var r="error"===e,i=this._events;if(void 0!==i)r=r&&void 0===i.error;else if(!r)return!1;if(r){var o;if(t.length>0&&(o=t[0]),o instanceof Error)throw o;var a=new Error("Unhandled error."+(o?" ("+o.message+")":""));throw a.context=o,a}var h=i[e];if(void 0===h)return!1;if("function"===typeof h)s(h,this,t);else{var u=h.length,c=p(h,u);for(n=0;n<u;++n)s(c[n],this,t)}return!0},i.prototype.addListener=function(e,t){return u(this,e,t,!1)},i.prototype.on=i.prototype.addListener,i.prototype.prependListener=function(e,t){return u(this,e,t,!0)},i.prototype.once=function(e,t){return a(t),this.on(e,f(this,e,t)),this},i.prototype.prependOnceListener=function(e,t){return a(t),this.prependListener(e,f(this,e,t)),this},i.prototype.removeListener=function(e,t){var n,s,r,i,o;if(a(t),void 0===(s=this._events))return this;if(void 0===(n=s[e]))return this;if(n===t||n.listener===t)0===--this._eventsCount?this._events=Object.create(null):(delete s[e],s.removeListener&&this.emit("removeListener",e,n.listener||t));else if("function"!==typeof n){for(r=-1,i=n.length-1;i>=0;i--)if(n[i]===t||n[i].listener===t){o=n[i].listener,r=i;break}if(r<0)return this;0===r?n.shift():function(e,t){for(;t+1<e.length;t++)e[t]=e[t+1];e.pop()}(n,r),1===n.length&&(s[e]=n[0]),void 0!==s.removeListener&&this.emit("removeListener",e,o||t)}return this},i.prototype.off=i.prototype.removeListener,i.prototype.removeAllListeners=function(e){var t,n,s;if(void 0===(n=this._events))return this;if(void 0===n.removeListener)return 0===arguments.length?(this._events=Object.create(null),this._eventsCount=0):void 0!==n[e]&&(0===--this._eventsCount?this._events=Object.create(null):delete n[e]),this;if(0===arguments.length){var r,i=Object.keys(n);for(s=0;s<i.length;++s)"removeListener"!==(r=i[s])&&this.removeAllListeners(r);return this.removeAllListeners("removeListener"),this._events=Object.create(null),this._eventsCount=0,this}if("function"===typeof(t=n[e]))this.removeListener(e,t);else if(void 0!==t)for(s=t.length-1;s>=0;s--)this.removeListener(e,t[s]);return this},i.prototype.listeners=function(e){return l(this,e,!0)},i.prototype.rawListeners=function(e){return l(this,e,!1)},i.listenerCount=function(e,t){return"function"===typeof e.listenerCount?e.listenerCount(t):d.call(e,t)},i.prototype.listenerCount=d,i.prototype.eventNames=function(){return this._eventsCount>0?t(this._events):[]}}}]);