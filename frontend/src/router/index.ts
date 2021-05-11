import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/todo",
    name: "Todo",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Todo.vue"),
  },
  {
    path: "/todo/new",
    name: "AddTodo",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/todo/AddTodo.vue"),
  },
  {
    path: "/todo/edit/:id",
    name: "EditTodo",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/todo/EditTodo.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
