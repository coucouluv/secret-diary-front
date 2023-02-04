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
                <h2 class = "title">
                    너와 나의 비밀일기</h2>
                <h1 style="text-align: center" class="mb-10">
                    로그인</h1>
                <form>
                    <v-text-field
                      v-model="signInRequest.userId"
                      label="아이디"
                      required
                    ></v-text-field>
                    <v-text-field
                      v-model="signInRequest.password"
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
    </v-main>
</template>

<script>
  import Swal from 'sweetalert2';
  import { mapActions } from 'vuex';
  // import Sign from "@/api/module/sign.js";

  export default {

    data: () => ({
      signInRequest: {
        userId: '',
        password: '',
      },
      passwordShow: false,
      isError: false,
      errorMsg: "",
    }),

    computed: {
  },

    methods: {
      ...mapActions(["SIGN_IN"]),
      async signin() {
        try {
          if(!this.signInRequest.userId || !this.signInRequest.password) {
              this.isError = true
              this.errorMsg = "아이디와 비밀번호 모두 입력하세요."
              return
          }
          await this.SIGN_IN(this.signInRequest)
          Swal.fire({
            position: 'center',
            icon: 'success',
            width: 350,
            title: '<div style="font-size: 18px; font-family: "Spoqa Han Sans Neo", "sans-serif"; ">로그인 완료<div>',
            showConfirmButton: false,
            timer: 1500,
				  });
          this.$router.push({ name: "friend" })
        } catch (error) {
          console.log(error);
          Swal.fire({
					position: 'center',
					icon: 'warning',
					width: 350,
					title: '<div style="font-size: 18px; font-family: "Spoqa Han Sans Neo", "sans-serif"; ">로그인 실패<div>',
					showConfirmButton: false,
					timer: 1500,
				  })
          this.clear()
        }
      },
      clear() {
        this.isError = false,
        this.errorMsg = ""
      },
    },
  }
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
    color: "light-dark";
  }
</style>