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
      import("@/views/sign/RegisterPage.vue")
  },
  {
    path: "/signin",
    name: "signin",
    component: () =>
      import("@/views/sign/SignInPage.vue")
  },
  {
    path: '/signin/finduserid',
    name: "finduserid",
    component: () => import('@/views/sign/FindUserIdPage.vue'),
  },
  {
    path: '/signin/findpassword',
    name: "findpassword",
    component: () => import('@/views/sign/FindPasswordPage.vue'),
  },
  {
    path: '/friend',
    name: "friend",
    component: () => import("@/views/friend/FriendPage.vue"),
  },
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
})

export default router