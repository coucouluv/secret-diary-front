<template>
  <v-app>
    <start-bar v-if="!checkSign()"></start-bar>
    <header-nav v-else></header-nav>
    <router-view />
  </v-app>
</template>
<script>
import StartBar from '@/components/StartBar.vue';
import HeaderNav from '@/components/HeaderNav.vue';
export default {
  name: 'App',

  components: {
    StartBar,
    HeaderNav,
  },
  data: () => ({}),
  computed: {},
  methods: {
    checkSign() {
      if (localStorage.getItem('signin')) {
        return true;
      }
      return false;
    },
  },
};
</script>
