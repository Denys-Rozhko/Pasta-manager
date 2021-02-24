import Vue from "vue";
import App from "./App.vue";
import Loader from "./components/Loader";
import store from "./store";

Vue.config.productionTip = false;

Vue.component("Loader", Loader);

new Vue({
  render: h => h(App),
  store
}).$mount("#app");
