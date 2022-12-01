import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "@/assets/css/fonts.css";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import components from "@/components/ui";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDOIu82BV8vbZCQrflYirIby0Pbbb-p0H4",
  authDomain: "fasttodo-91684.firebaseapp.com",
  projectId: "fasttodo-91684",
  storageBucket: "fasttodo-91684.appspot.com",
  messagingSenderId: "763035402524",
  appId: "1:763035402524:web:8dd779a54b11734d6f7ad9",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth, db };

const app = createApp(App);

components.forEach((component) => {
  app.component(component.name, component);
});

app.use(store).use(router).mount("#app");
