<template>
<div>
  <v-card class="brown lighten-5">
    <v-card-title class="text-center justify-center py-6">
                <v-img
                class="mx-2"
                src="@/assets/logo2.png"
                max-height="150"
                max-width="150"
                contain
                ></v-img>
    </v-card-title>
    <v-card-subtitle class="text-center justify-center py-6">
      <v-btn text color="#c6b3a6" class="btn"
        @click="signOut">
            로그아웃
            <v-img
            class="mx-2"
            src="@/assets/rabbit.png"
            max-height="40"
            max-width="40"
            contain
        ></v-img>
      </v-btn>
    </v-card-subtitle>
    <v-tabs
      v-model="activeTab"
      background-color="brown lighten-5"
      centered
      flat
      color=black
      icons-and-text
    >
      
      <v-tab to='/friend'>
        친구 목록
        <v-img
            class="mx-2"
            src="@/assets/bear.png"
            max-height="40"
            max-width="40"
            contain
        ></v-img>
      </v-tab>

      <v-tab to='/info'>
        내 정보
        <v-img
            class="mx-2"
            src="@/assets/rabbit.png"
            max-height="47"
            max-width="47"
            contain
        ></v-img>
      </v-tab>

      <v-tab href="#tab-3">
        알림
        <v-img
            class="mx-2"
            src="@/assets/bear.png"
            max-height="40"
            max-width="40"
            contain
        ></v-img>
      </v-tab>
      <v-tab-item>
        <router-view></router-view>
      </v-tab-item>
    </v-tabs>
  </v-card>
</div>
</template>

<script>
import { mapMutations } from "vuex"

  export default {
    data () {
      return {
        activeTab:0,
      }
    },
    methods: {
    ...mapMutations(["SIGN_OUT"]),
    signOut() {
      this.SIGN_OUT()
    }
  }
  }
</script>
<style scoped>

.btn{
    font-weight: bold;
}

</style>