import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'start',
    component: () => import('@/views/MainHomePage.vue'),
    beforeEnter(to, from, next) {
      if (localStorage.getItem('accessToken')) {
        next({ name: 'friend' });
      } else {
        next();
      }
    },
  },
  {
    path: '/friends',
    name: 'friend',
    component: () => import('@/views/friend/FriendPage.vue'),
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
    path: '/waiting',
    name: 'waiting',
    component: () => import('@/views/friend/WaitingFriendPage.vue'),
  },
  {
    path: '/friends/:friendId/diaries',
    name: 'diaries',
    props: true,
    component: () => import('@/views/diary/DiariesPage.vue'),
  },
  {
    path: '/friends/:friendId/diaries/:id',
    name: 'diary',
    props: true,
    component: () => import('@/views/diary/DiaryPage.vue'),
  },
  {
    path: '/diaries',
    name: 'diaryRegister',
    props: true,
    component: () => import('@/views/diary/DiaryRegisterPage.vue'),
  },
  {
    path: '/info',
    name: 'info',
    component: () => import('@/views/info/InfoPage.vue'),
  },
  {
    path: '*',
    name: 'notFound',
    component: () => import('@/views/NotFoundPage.vue'),
  },
];

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes,
});

export default router;
