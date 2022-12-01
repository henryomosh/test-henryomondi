import { createApp } from "vue";
import vue3GoogleLogin from "vue3-google-login";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";
import setupInterceptors from "@/services/setupInterceptors";
import "tw-elements";
import "tailwindcss/tailwind.css";
import "@/style/index.scss";

setupInterceptors(store);
const app = createApp(App);
app.use(router).use(store).use(vue3GoogleLogin, {
  clientId: "126999584128-8m1mn0kltkalgql8rel02664lsubhlq1.apps.googleusercontent.com"
}).mount("#main");
