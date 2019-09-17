/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-11 21:48:59
 * @LastEditTime: 2019-09-11 21:48:59
 * @LastEditors: your name
 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/main.css'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import axios from 'axios';
Vue.prototype.axios = axios;
Vue.use(iView);
Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
