!function(f){function e(e){for(var n,r,t=e[0],o=e[1],u=e[2],i=0,l=[];i<t.length;i++)r=t[i],c[r]&&l.push(c[r][0]),c[r]=0;for(n in o)Object.prototype.hasOwnProperty.call(o,n)&&(f[n]=o[n]);for(s&&s(e);l.length;)l.shift()();return p.push.apply(p,u||[]),a()}function a(){for(var e,n=0;n<p.length;n++){for(var r=p[n],t=!0,o=1;o<r.length;o++){var u=r[o];0!==c[u]&&(t=!1)}t&&(p.splice(n--,1),e=i(i.s=r[0]))}return e}var r={},c={2:0},p=[];function i(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return f[e].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=f,i.c=r,i.d=function(e,n,r){i.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:r})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(n,e){if(1&e&&(n=i(n)),8&e)return n;if(4&e&&"object"==typeof n&&n&&n.__esModule)return n;var r=Object.create(null);if(i.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:n}),2&e&&"string"!=typeof n)for(var t in n)i.d(r,t,function(e){return n[e]}.bind(null,t));return r},i.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(n,"a",n),n},i.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},i.p="";var n=window.webpackJsonp=window.webpackJsonp||[],t=n.push.bind(n);n.push=e,n=n.slice();for(var o=0;o<n.length;o++)e(n[o]);var s=t;p.push([8,0]),a()}({2:function(e,n,r){},8:function(e,n,r){"use strict";r.r(n);var t=r(1),o=(r(2),{data:function(){return{list:[{id:1,key:"测试index1"},{id:2,key:"测试index2"}]}}}),u=r(0),i=Object(u.a)(o,function(){var r=this,e=r.$createElement,t=r._self._c||e;return t("div",[r._v("\n    ddsfsdaf\n    "),t("ul",r._l(r.list,function(e,n){return t("li",[r._v(r._s(e.id)+"-"+r._s(e.key))])}),0)])},[],!1,null,null,null);i.options.__file="index.vue";var l=i.exports;new t.a({el:"#myapp",render:function(e){return e(l)}})}});