!function(e){function t(t){for(var n,r,l=t[0],a=t[1],i=0,c=[];i<l.length;i++)r=l[i],Object.prototype.hasOwnProperty.call(o,r)&&o[r]&&c.push(o[r][0]),o[r]=0;for(n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n]);for(u&&u(t);c.length;)c.shift()()}var n={},o={2:0};function r(t){if(n[t])return n[t].exports;var o=n[t]={i:t,l:!1,exports:{}};return e[t].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.e=function(e){var t=[],n=o[e];if(0!==n)if(n)t.push(n[2]);else{var l=new Promise((function(t,r){n=o[e]=[t,r]}));t.push(n[2]=l);var a,i=document.createElement("script");i.charset="utf-8",i.timeout=120,r.nc&&i.setAttribute("nonce",r.nc),i.src=function(e){return r.p+""+({0:"data",1:"handler"}[e]||e)+".bundle.js"}(e);var u=new Error;a=function(t){i.onerror=i.onload=null,clearTimeout(c);var n=o[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),l=t&&t.target&&t.target.src;u.message="Loading chunk "+e+" failed.\n("+r+": "+l+")",u.name="ChunkLoadError",u.type=r,u.request=l,n[1](u)}o[e]=void 0}};var c=setTimeout((function(){a({type:"timeout",target:i})}),12e4);i.onerror=i.onload=a,document.head.appendChild(i)}return Promise.all(t)},r.m=e,r.c=n,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="dist/",r.oe=function(e){throw console.error(e),e};var l=window.webpackJsonp=window.webpackJsonp||[],a=l.push.bind(l);l.push=t,l=l.slice();for(var i=0;i<l.length;i++)t(l[i]);var u=a;r(r.s=0)}([function(e,t,n){let o=document.getElementById("covid19").getContext("2d");var r;o.font="3em Interstate sans-serif Verdana",o.color="white",o.fillStyle="whitesmoke",o.fillRect(25,15,200,180),o.strokeText("Covid-19",10,30);var l=[];function a(e){n.e(1).then(n.bind(null,3)).then(function(e){window.handlerFunctions=e.handlers;let t=window.handlerFunctions.menuHandler(this);t&&function(e){document.querySelector("#mainContainer").style.display="none",document.querySelector("#menuBody").style.display="block",document.querySelector("#menuBody").innerHTML="",document.querySelector("#menuBody").appendChild(e)}(t)}.bind(e))}function i(e){let t=e.currentTarget.value.split(","),n=document.getElementById("patients").firstElementChild,o=document.getElementById("patients").lastElementChild;for(;o&&o!==n;)o.remove(),o=document.getElementById("patients").lastElementChild;t.length>1&&r.setCenter({lat:Number(t[0]),lng:Number(t[1])}),r.setZoom(6),this.historyData[e.currentTarget.options[e.currentTarget.selectedIndex].innerHTML]&&this.historyData[e.currentTarget.options[e.currentTarget.selectedIndex].innerHTML].forEach(e=>{if(e.latlong&&""!=e.latlong){let t=document.createElement("option");t.value=e.latlong,t.setAttribute("data-place",e.address),t.innerHTML="Patient #"+e._cn6ca,document.getElementById("patients").appendChild(t)}}),c(),"block"==document.querySelector("#info").style.display&&(document.querySelector("#info").style.display="none",document.querySelector("#dropdowns").style.padding="0 0 1.5vh 0")}function u(){Function.prototype.loadJS=function(){return new Promise((e,t)=>{let n=document.createElement("script");n.type="text/javascript",n.src="data.js",n.onload=t=>e(t),n.onerror=e=>t(e),document.head.appendChild(n)})},Function.prototype.loadTemplate=function(e){let t=document.querySelector(e);return document.importNode(t.content,!0)}}function c(){if(l.length){for(let e=0;e<l.length;e++)l[e].setMap(null);l=[]}}function d(e){var t,n;n=u.loadTemplate("#infoTemplate"),t=e.currentTarget.value.split(","),c(),r.setZoom(9);for(let e=0;e<t.length;e+=2){var o=new google.maps.Marker({position:{lat:Number(t[e]),lng:Number(t[e+1])},map:r});l.push(o),r.getBounds().contains(o.getPosition())||r.setCenter(o.getPosition())}1==t.length?(document.querySelector("#info").style.display="none",document.querySelector("#dropdowns").style.padding="0 0 1.5vh 0"):(document.querySelector("#info,#place").innerHTML="",document.querySelector("#info").appendChild(n),document.getElementById("place").innerHTML=e.currentTarget.options[e.currentTarget.selectedIndex].getAttribute("data-place").trim(),document.querySelector("#info").style.display="block",document.querySelector("#dropdowns").style.padding="0")}window.initMap=()=>{r=new google.maps.Map(document.getElementById("map"),{center:{lat:11.1271,lng:78.6569},zoom:6,mapTypeId:google.maps.MapTypeId.ROADMAP})},function(){document.getElementById("patients").addEventListener("change",d.bind(this),!0),document.getElementById("states").addEventListener("change",i.bind(this),!0),Array.from(document.getElementsByTagName("li")).forEach((function(e){e.addEventListener("click",a,!0)})),u(),function(){try{n.e(0).then(n.bind(null,2)).then(e=>{this.historyData=e.default.historyData,this.states=e.default.states,this.states.forEach(e=>{let t=document.createElement("option");t.value=e.latlng,t.innerHTML=e.state,document.getElementById("states").appendChild(t)})}).catch(e=>{alert("Sorry! Our site is under maintenance. Error code:"+e)})}catch(e){console.log("We encountered an error. We'll be up soon!")}}()}()}]);