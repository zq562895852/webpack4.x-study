// home 入口
import Vue from 'vue';
// import $ from 'jquery';
import '../page/home/home.less';
// let dom = document.getElementById('app');
// dom.style.color = "red";
// console.log('$ :', $);
// $('#app').
import App from './app/home.vue'
new Vue({
    el:'#app',
    render: h => h(App),
    // template:'<h1>这是渲染的44444444</h1>'
})