import Vue from 'vue';
import App from './App.vue';
import VModal from 'vue-js-modal';
import Vuelidate from "vuelidate/src";


Vue.config.productionTip = false;
Vue.use(VModal);
Vue.use(Vuelidate);

new Vue({
  render: h => h(App),
}).$mount('#app');
