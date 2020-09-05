import Vue from 'vue';
import App from './App.vue';
import VModal from 'vue-js-modal';
import Vuelidate from "vuelidate/src";
import VueMask from 'v-mask';


Vue.config.productionTip = false;
Vue.use(VModal);
Vue.use(Vuelidate);
Vue.use(VueMask, {
  placeholders: {
    Я: /[\wа-яА-Я]/
  }
});

new Vue({
  render: h => h(App),
}).$mount('#app');
