!function(f){function e(e){for(var n,t,r=e[0],o=e[1],u=e[2],i=0,l=[];i<r.length;i++)t=r[i],a[t]&&l.push(a[t][0]),a[t]=0;for(n in o)Object.prototype.hasOwnProperty.call(o,n)&&(f[n]=o[n]);for(s&&s(e);l.length;)l.shift()();return p.push.apply(p,u||[]),c()}function c(){for(var e,n=0;n<p.length;n++){for(var t=p[n],r=!0,o=1;o<t.length;o++){var u=t[o];0!==a[u]&&(r=!1)}r&&(p.splice(n--,1),e=i(i.s=t[0]))}return e}var t={},a={1:0},p=[];function i(e){if(t[e])return t[e].exports;var n=t[e]={i:e,l:!1,exports:{}};return f[e].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=f,i.c=t,i.d=function(e,n,t){i.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(n,e){if(1&e&&(n=i(n)),8&e)return n;if(4&e&&"object"==typeof n&&n&&n.__esModule)return n;var t=Object.create(null);if(i.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:n}),2&e&&"string"!=typeof n)for(var r in n)i.d(t,r,function(e){return n[e]}.bind(null,r));return t},i.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(n,"a",n),n},i.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},i.p="";var n=window.webpackJsonp=window.webpackJsonp||[],r=n.push.bind(n);n.push=e,n=n.slice();for(var o=0;o<n.length;o++)e(n[o]);var s=r;p.push([7,0]),c()}({2:function(e,n,t){},7:function(e,n,t){"use strict";t.r(n);var r=t(1),o=(t(2),{data:function(){return{list:[{id:1,key:"测试1"},{id:2,key:"测试2"}]}},methods:{goToIndex:function(){location.href="../../page/index/index.html"}}}),u=t(0),i=Object(u.a)(o,function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("div",{on:{click:function(e){t.goToIndex()}}},[t._v("去index页面")]),t._v(" "),r("ul",t._l(t.list,function(e,n){return r("li",[t._v(t._s(e.id)+"-"+t._s(e.key))])}),0)])},[],!1,null,null,null);i.options.__file="home.vue";var l=i.exports;new r.a({el:"#app",render:function(e){return e(l)}})}});