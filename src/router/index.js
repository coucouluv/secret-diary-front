import Vue from "vue"
import VueRouter from "vue-router"


Vue.use(VueRouter)


const routes = [
  {
    path: '/',
    name: "start",
    component: () => import('@/views/HomePage.vue'),
  },
  {
    path: "/register",
    name: "register",
    component: () =>
      import(/* webpackChunkName: "register" */ "../views/sign/RegisterPage.vue")
  },
  {
    path: "/signin",
    name: "signin",
    component: () => import('@/views/sign/SignInPage.vue'),
  },
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
})

export default router