<template>
  <v-app>
    <start-bar v-if="!isSignin"></start-bar>
    <header-nav v-else></header-nav>
    <router-view/>
    <start-footer/>
  </v-app>
</template>
<script>

import StartBar from '@/components/StartBar.vue'
import StartFooter from '@/components/Footer.vue'
import HeaderNav from '@/components/HeaderNav.vue'
import { mapState } from "vuex"

export default {
  name: 'App',

  components: {
    StartBar,
    StartFooter,
    HeaderNav,
  },

  data: () => ({
    hello: false
  }),
  computed: {
    ...mapState(["isSignin"]),
  
  },
};
</script>
