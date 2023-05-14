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
              <h1 style="text-align: center" class="mb-10">로그인</h1>
              <form>
                <v-text-field
                  v-model="signInRequest.userId"
                  label="아이디"
                  :rules="userIdRules"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="signInRequest.password"
                  :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="passwordShow ? 'text' : 'password'"
                  label="비밀번호"
                  :rules="passwordRules"
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
                  @click="signin"
                >
                  로그인
                </v-btn>
              </form>
            </div>
          </v-card>
          <div class="find">
            <RouterLink to="signin/finduserid">아이디 찾기</RouterLink>
            <span class="bar"></span>
            <RouterLink to="signin/findpassword">비밀번호 찾기</RouterLink>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex';
import validator from '@/utils/validator.js';
export default {
  components: {},
  data: () => ({
    signInRequest: {
      userId: '',
      password: '',
    },
    userIdRules: validator.sign.userId,
    passwordRules: validator.sign.password,
    passwordShow: false,
    isError: false,
    errorMsg: '',
  }),

  computed: {},

  methods: {
    ...mapActions(['SIGN_IN']),
    async signin() {
      try {
        await this.SIGN_IN(this.signInRequest);
        this.$router.push({ name: 'friend' });
      } catch (error) {
        this.isError = true;
        this.errorMsg = error.response.data.message;
      }
    },
    clear() {
      (this.isError = false), (this.errorMsg = '');
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
