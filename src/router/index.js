import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'start',
    component: () => import('@/views/MainHomePage.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/sign/RegisterPage.vue'),
  },
  {
    path: '/signin',
    name: 'signin',
    component: () => import('@/views/sign/SignInPage.vue'),
  },
  {
    path: '/signin/finduserid',
    name: 'finduserid',
    component: () => import('@/views/sign/FindUserIdPage.vue'),
  },
  {
    path: '/signin/findpassword',
    name: 'findpassword',
    component: () => import('@/views/sign/FindPasswordPage.vue'),
  },
  {
    path: '/friend',
    name: 'friend',
    component: () => import('@/views/friend/FriendPage.vue'),
  },
  {
    path: '/waiting',
    name: 'waiting',
    component: () => import('@/views/friend/WaitingFriendPage.vue'),
  },
  {
    path: '/diaries',
    name: 'diaries',
    props: true,
    component: () => import('@/views/diary/DiariesPage.vue'),
  },
  {
    path: '/diary',
    name: 'diary',
    props: true,
    component: () => import('@/views/diary/DiaryPage.vue'),
  },
  {
    path: '/diary/register',
    name: 'diaryRegister',
    props: true,
    component: () => import('@/views/diary/DiaryRegisterPage.vue'),
  },
  {
    path: '/info',
    name: 'info',
    component: () => import('@/views/info/InfoPage.vue'),
  },
];

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes,
});

export default router;
