<template>
  <v-app class="brown lighten-4">
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
  </v-app>
</template>

<script>
import { mapActions } from 'vuex';
import validator from '@/utils/validator.js';
import { successToast, failToast } from '@/utils/toast.js';
export default {
  data: () => ({
    member: {
      userId: '',
      name: '',
      email: '',
      password: '',
    },
    userIdRules: validator.register.userId,
    nameRules: validator.register.name,
    emailRules: validator.register.email,
    passwordRules: validator.register.password,
    passwordShow: false,
  }),

  computed: {},

  methods: {
    ...mapActions(['REGISTER']),
    async register() {
      try {
        await this.REGISTER(this.member);
        successToast('회원가입 완료!');
        this.$router.push({ name: 'signin' });
      } catch (error) {
        failToast('회원가입 실패');
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
