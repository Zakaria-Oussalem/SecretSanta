import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import "./main.css";
import App from "./App.vue";
import HomeView from "./views/Home.vue";
import CreateSession from "./views/CreateSession.vue";
import JoinSession from "./views/JoinSession.vue";
import Session from "./views/Session.vue";
import Attribution from "./views/Attribution.vue";

const routes = [
  {
    path: "/",
    component: HomeView,
  },
  {
    path: "/create",
    component: CreateSession,
  },
  {
    path: "/join",
    component: JoinSession,
  },
  {
    path: "/session/:session_id/:user_id",
    component: Session,
  },
  {
    path: "/attribution/:session_id/:user_id",
    component: Attribution,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App).use(router).mount("#app");
