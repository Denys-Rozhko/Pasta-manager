import { createApp } from "vue";
import App from "./App.vue";
import Modal from "./components/Modal";
import Loader from "./components/Loader";
import store from "./store";

const app = createApp(App);

app.config.productionTip = false;

app.use(store);

app.component("Loader", Loader);
app.component("Modal", Modal);

app.mount("#app");
