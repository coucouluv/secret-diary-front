<template>
  <v-app>
    <start-bar v-if="!isSignin"></start-bar>
    <header-nav v-else></header-nav>
    <router-view />
  </v-app>
</template>
<script>
import StartBar from '@/components/StartBar.vue';
import HeaderNav from '@/components/HeaderNav.vue';
import { mapState } from 'vuex';

export default {
  name: 'App',

  components: {
    StartBar,
    HeaderNav,
  },
  data: () => ({}),
  computed: {
    ...mapState(['isSignin']),
  },
  created() {},
  methods: {},
};
</script>
