"use strict";(self.webpackChunkcrypto_react=self.webpackChunkcrypto_react||[]).push([[8013],{98013:(e,a,t)=>{t.d(a,{offchainLookup:()=>g,offchainLookupSignature:()=>w});var r=t(26354),s=t(83855),n=t(54505),o=t(81576);class c extends n.C{constructor(e){let{callbackSelector:a,cause:t,data:r,extraData:s,sender:n,urls:c}=e;super(t.shortMessage||"An error occurred while fetching for an offchain result.",{cause:t,metaMessages:[...t.metaMessages||[],t.metaMessages?.length?"":[],"Offchain Gateway Call:",c&&["  Gateway URL(s):",...c.map((e=>`    ${(0,o.ID)(e)}`))],`  Sender: ${n}`,`  Data: ${r}`,`  Callback selector: ${a}`,`  Extra data: ${s}`].flat()}),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"OffchainLookupError"})}}class l extends n.C{constructor(e){let{result:a,url:t}=e;super("Offchain gateway response is malformed. Response data must be a hex value.",{metaMessages:[`Gateway URL: ${(0,o.ID)(t)}`,`Response: ${(0,s.A)(a)}`]}),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"OffchainLookupResponseMalformedError"})}}class d extends n.C{constructor(e){let{sender:a,to:t}=e;super("Reverted sender address does not match target contract address (`to`).",{metaMessages:[`Contract address: ${t}`,`OffchainLookup sender address: ${a}`]}),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"OffchainLookupSenderMismatchError"})}}var u=t(79779),i=t(39510),f=t(10003),p=t(58418),h=t(78753);var b=t(82651),y=t(7466);const w="0x556f1830",m={name:"OffchainLookup",type:"error",inputs:[{name:"sender",type:"address"},{name:"urls",type:"string[]"},{name:"callData",type:"bytes"},{name:"callbackFunction",type:"bytes4"},{name:"extraData",type:"bytes"}]};async function g(e,a){let{blockNumber:t,blockTag:s,data:n,to:o}=a;const{args:l}=(0,i.W)({data:n,abi:[m]}),[u,y,w,g,C]=l,{ccipRead:O}=e,x=O&&"function"===typeof O?.request?O.request:k;try{if(!function(e,a){if(!(0,h.P)(e,{strict:!1}))throw new p.M({address:e});if(!(0,h.P)(a,{strict:!1}))throw new p.M({address:a});return e.toLowerCase()===a.toLowerCase()}(o,u))throw new d({sender:u,to:o});const a=await x({data:w,sender:u,urls:y}),{data:n}=await(0,r.T)(e,{blockNumber:t,blockTag:s,data:(0,b.xW)([g,(0,f.h)([{type:"bytes"},{type:"bytes"}],[a,C])]),to:o});return n}catch(L){throw new c({callbackSelector:g,cause:L,data:n,extraData:C,sender:u,urls:y})}}async function k(e){let{data:a,sender:t,urls:r}=e,n=new Error("An unknown error occurred.");for(let c=0;c<r.length;c++){const e=r[c],d=e.includes("{data}")?"GET":"POST",i="POST"===d?{data:a,sender:t}:void 0;try{const r=await fetch(e.replace("{sender}",t).replace("{data}",a),{body:JSON.stringify(i),method:d});let o;if(o=r.headers.get("Content-Type")?.startsWith("application/json")?(await r.json()).data:await r.text(),!r.ok){n=new u.Ci({body:i,details:o?.error?(0,s.A)(o.error):r.statusText,headers:r.headers,status:r.status,url:e});continue}if(!(0,y.q)(o)){n=new l({result:o,url:e});continue}return o}catch(o){n=new u.Ci({body:i,details:o.message,url:e})}}throw n}}}]);