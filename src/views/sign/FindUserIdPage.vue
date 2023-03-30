<template>
  <v-main class="brown lighten-4">
    <v-container style="max-width: 450px" fill-height>
      <v-layout align-center row wrap>
        <v-flex xs12>
          <v-alert v-if="isError" type="error">
            {{ errorMsg }}
          </v-alert>
          <v-card>
            <div class="pa-10">
              <h2 class="title">너와 나의 비밀일기</h2>
              <h1 style="text-align: center" class="mb-10">아이디 찾기</h1>
              <form>
                <v-text-field
                  v-model="email"
                  label="이메일"
                  required
                ></v-text-field>
                <v-btn
                  class="mb-3"
                  color="#c6b3a6"
                  depressed
                  large
                  block
                  dark
                  @click="findUserId"
                >
                  확인
                </v-btn>
              </form>
            </div>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-main>
</template>

<script>
import Swal from 'sweetalert2';
import { mapActions, mapGetters } from 'vuex';
export default {
  data: () => ({
    email: '',
    isError: false,
    errorMsg: '',
  }),

  computed: {
    ...mapGetters(['GET_USERID']),
  },

  methods: {
    ...mapActions(['USERID']),
    async findUserId() {
      try {
        if (!this.email) {
          this.isError = true;
          this.errorMsg = '이메일을 입력하세요.';
          return;
        }
        const params = {
          email: this.email,
        };
        await this.USERID(params);
        const id = this.GET_USERID;
        Swal.fire({
          position: 'center',
          icon: 'success',
          width: 350,
          title:
            '<div style="font-size: 18px; font-family: "Spoqa Han Sans Neo", "sans-serif"; ">아이디 찾기 완료<div>',
          text: '아이디는 ' + id + ' 입니다.',
          showConfirmButton: true,
          confirmButtonColor: '#c6b3a6',
          // timer: 1500,
        });
        this.$router.push({ name: 'signin' });
      } catch (error) {
        Swal.fire({
          position: 'center',
          icon: 'warning',
          width: 400,
          title:
            '<div style="font-size: 18px; font-family: "Spoqa Han Sans Neo", "sans-serif"; ">아이디 찾기 실패<div>',
          text: '해당 이메일을 가진 회원은 존재하지 않습니다.',
          showConfirmButton: false,
          timer: 3000,
        });
        this.clear();
      }
    },
    clear() {
      (this.email = ''), (this.isError = false), (this.errorMsg = '');
    },
  },
};
</script>

<style scoped>
.bar {
  margin-left: 8px;
  margin-right: 8px;
}
.find {
  text-align: center;
  padding-top: 1rem;
}
.title {
  text-align: center;
  color: 'light-dark';
}
</style>
