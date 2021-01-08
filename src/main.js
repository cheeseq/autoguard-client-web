import Vue from "vue";
import App from "./App.vue";
import VModal from "vue-js-modal";
import Vuelidate from "vuelidate/src";
import VueMask from "v-mask";
import VueFilterDateFormat from "@vuejs-community/vue-filter-date-format";
import store from "@/store";
import { FBAuth } from "./auth";
import { db } from "./db";

FBAuth.onAuthStateChanged(
  (user) => {
    store.commit("setUser", user);
  },
  (error) => {
    console.error(error);
  }
);

Vue.config.productionTip = false;
Vue.use(VModal);
Vue.use(Vuelidate);
Vue.use(VueMask, {
  placeholders: {
    Я: /[\wа-яА-Я]/,
  },
});
Vue.use(VueFilterDateFormat);

db.enablePersistence().then(() => {
  new Vue({
    store,
    render: (h) => h(App),
  }).$mount("#app");
});
