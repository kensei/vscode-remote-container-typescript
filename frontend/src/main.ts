import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

console.log("test vue3.js");
createApp(App).use(router).mount("#app");
