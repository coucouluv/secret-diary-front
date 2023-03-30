<template>
  <v-main class="brown lighten-4">
    <v-container style="max-width: 450px" fill-height>
      <v-layout align-center row wrap>
        <v-flex xs12>
          <v-card>
            <div class="pa-10">
              <h2 class="title">너와 나의 비밀일기</h2>
              <h1 style="text-align: center" class="mb-10">회원가입</h1>
              <v-form ref="form">
                <v-text-field
                  v-model="member.userId"
                  :rules="userIdRules"
                  label="아이디"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="member.name"
                  :rules="nameRules"
                  label="이름"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="member.email"
                  :rules="emailRules"
                  label="이메일"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="member.password"
                  :rules="passwordRules"
                  :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="passwordShow ? 'text' : 'password'"
                  label="비밀번호"
                  required
                  @click:append="passwordShow = !passwordShow"
                ></v-text-field>
                <v-btn
                  class="mr-4"
                  color="#c6b3a6"
                  depressed
                  large
                  block
                  dark
                  @click="register"
                >
                  회원가입
                </v-btn>
              </v-form>
            </div>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-main>
</template>

<script>
import Swal from 'sweetalert2';
import { mapActions } from 'vuex';
export default {
  data: () => ({
    member: {
      userId: '',
      name: '',
      email: '',
      password: '',
    },
    userIdRules: [
      v => !!v || '아이디를 입력하세요.',
      v =>
        /^[a-zA-Z\d_].{4,15}$/.test(v) ||
        '아이디는 4~15자의 영어,숫자,"_"로 입력하세요.',
    ],
    nameRules: [
      v => !!v || '이름을 입력하세요.',
      v =>
        /^[가-힣a-zA-Z].{2,15}$/.test(v) ||
        '이름은 2~15자의 영어 혹은 한글을 입력하세요.',
    ],
    emailRules: [
      v => !!v || '이메일을 입력하세요.',
      v => /.+@.+\..+/.test(v) || '이메일 형식에 맞게 입력하세요.',
    ],
    passwordRules: [
      v => !!v || '비밀번호를 입력하세요.',
      v =>
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d].{8,}$/.test(v) ||
        '최소 하나의 숫자, 영어를 포함하는 8자 이상의 비밀번호를 입력하세요.',
    ],
    passwordShow: false,
  }),

  computed: {},

  methods: {
    ...mapActions(['REGISTER']),
    async register() {
      try {
        await this.REGISTER(this.member);
        Swal.fire({
          position: 'center',
          icon: 'success',
          width: 350,
          title:
            '<div style="font-size: 18px; font-family: "Spoqa Han Sans Neo", "sans-serif"; ">회원가입 완료<div>',
          showConfirmButton: false,
          timer: 1500,
        });
        this.$router.push({ name: 'signin' });
      } catch (error) {
        Swal.fire({
          position: 'center',
          icon: 'warning',
          width: 350,
          title:
            '<div style="font-size: 18px; font-family: "Spoqa Han Sans Neo", "sans-serif"; ">회원가입 실패<div>',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    },
    clear() {
      this.userId = '';
      this.name = '';
      this.email = '';
      this.password = '';
    },
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
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
