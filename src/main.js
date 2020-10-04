import Vue from 'vue';
import App from './App.vue';
import VModal from 'vue-js-modal';
import Vuelidate from "vuelidate/src";
import VueMask from 'v-mask';
import VueFilterDateFormat from '@vuejs-community/vue-filter-date-format';
import store from "@/store";


Vue.config.productionTip = false;
Vue.use(VModal);
Vue.use(Vuelidate);
Vue.use(VueMask, {
  placeholders: {
    Я: /[\wа-яА-Я]/
  }
});
Vue.use(VueFilterDateFormat);

new Vue({
  store,
  render: h => h(App),
}).$mount('#app');
