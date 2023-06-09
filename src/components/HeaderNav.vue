<template>
  <div>
    <v-card class="brown lighten-5">
      <v-card-title class="text-center justify-center py-6">
        <router-link to="/">
          <v-img
            class="mx-2"
            src="@/assets/logo2.png"
            max-height="150"
            max-width="150"
            contain
          ></v-img>
        </router-link>
      </v-card-title>
    </v-card>
    <v-tabs
      v-model="selectedTab"
      background-color="brown lighten-5"
      centered
      flat
      color="black"
      icons-and-text
    >
      <v-tab to="/friends">
        친구 목록
        <v-img
          class="mx-2"
          src="@/assets/bear.png"
          max-height="40"
          max-width="40"
          contain
        ></v-img>
      </v-tab>

      <v-tab to="/info">
        내 정보
        <v-img
          class="mx-2"
          src="@/assets/rabbit.png"
          max-height="47"
          max-width="47"
          contain
        ></v-img>
      </v-tab>

      <v-tab to="/waiting">
        알림
        <v-img
          class="mx-2"
          src="@/assets/bear.png"
          max-height="40"
          max-width="40"
          contain
        ></v-img>
      </v-tab>
      <v-tab @click="signOut">
        로그아웃
        <v-img
          class="mx-2"
          src="@/assets/rabbit.png"
          max-height="47"
          max-width="47"
          contain
        ></v-img>
      </v-tab>
    </v-tabs>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import Swal from 'sweetalert2';
export default {
  data() {
    return {
      selectedTab: null,
      items: [{ title: '친구 목록' }, { title: '내 정보' }, { title: '알림' }],
    };
  },
  methods: {
    ...mapMutations(['SIGN_OUT']),
    signOut() {
      Swal.fire({
        position: 'center',
        width: 700,
        title:
          '<div style="font-size: 18px; font-family: "Spoqa Han Sans Neo", "sans-serif"; ">로그아웃 하시겠습니까?<div>',
        confirmButtonText: '확인',
        cancelButtonText: '취소',
        showCancelButton: true,
        showConfirmButton: true,
        cancelButtonColor: '#c6b3a6',
        confirmButtonColor: '#c6b3a6',
      }).then(result => {
        if (result.value) {
          this.SIGN_OUT();
        }
      });
    },
    info() {
      this.$router.push({ name: 'info' });
    },
  },
};
</script>
<style scoped>
.btn {
  font-weight: bold;
}
</style>
