// home 入口
import Vue from 'vue';
// import $ from 'jquery';
import '../page/home/home.less';
// let dom = document.getElementById('app');
// dom.style.color = "red";
// console.log('$ :', $);
// $('#app').
import App from './app/index.vue'
new Vue({
    el:'#myapp',
    render: h => h(App),
})