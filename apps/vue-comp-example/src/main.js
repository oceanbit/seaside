import { createApp } from "vue";
import App from "./App.vue";
import { register } from "@seaside/components/dist/compat";

const app = createApp(App);
app.mount("#app");
register();
