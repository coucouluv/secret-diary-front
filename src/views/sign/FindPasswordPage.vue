<template>
  <v-app class="brown lighten-4">
    <v-container style="max-width: 450px" fill-height>
      <v-layout align-center row wrap>
        <v-flex xs12>
          <v-alert v-if="isError" type="error">
            {{ errorMsg }}
          </v-alert>
          <v-card>
            <div class="pa-10">
              <h2 class="title">너와 나의 비밀일기</h2>
              <h1 style="text-align: center" class="mb-10">비밀번호 찾기</h1>
              <form>
                <v-text-field
                  v-model="passwordRequset.userId"
                  label="아이디"
                  :rules="userIdRules"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="passwordRequset.email"
                  label="이메일"
                  :rules="emailRules"
                  required
                ></v-text-field>
                <v-btn
                  class="mb-3"
                  color="#c6b3a6"
                  depressed
                  large
                  block
                  dark
                  @click="findPassword"
                >
                  확인
                </v-btn>
              </form>
            </div>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import Swal from 'sweetalert2';
import { mapActions } from 'vuex';
import validator from '@/utils/validator.js';
export default {
  data: () => ({
    passwordRequset: {
      userId: '',
      email: '',
    },
    isError: false,
    errorMsg: '',
    userIdRules: validator.register.userId,
    emailRules: validator.register.email,
  }),

  methods: {
    ...mapActions(['PASSWORD']),
    async findPassword() {
      try {
        await this.PASSWORD(this.passwordRequset);
        Swal.fire({
          position: 'center',
          icon: 'success',
          width: 500,
          title:
            '<div style="font-size: 18px; font-family: "Spoqa Han Sans Neo", "sans-serif"; ">임시 비밀번호 발송<div>',
          text:
            this.passwordRequset.email +
            ' 로 임시 비밀번호를 발송했습니다. 해당 비밀번호를 사용하여 로그인해 주세요.',
          showConfirmButton: true,
          confirmButtonColor: '#c6b3a6',
        });
        this.$router.push({ name: 'signin' });
      } catch (error) {
        this.isError = true;
        this.errorMsg = error.response.data.message;
      }
    },
    clear() {
      (this.userId = ''),
        (this.email = ''),
        (this.isError = false),
        (this.errorMsg = '');
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
