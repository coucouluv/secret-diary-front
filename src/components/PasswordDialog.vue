<template>
  <v-card>
    <v-card-title> 비밀번호 변경 </v-card-title>
    <v-card-text>
      <v-text-field
        placeholder="현재 비밀번호"
        v-model="pwdRequest.password"
        :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
        :type="passwordShow ? 'text' : 'password'"
        required
        @click:append="passwordShow = !passwordShow"
      />
    </v-card-text>
    <v-card-text>
      <v-text-field
        placeholder="새 비밀번호"
        v-model="pwdRequest.changePassword"
        :rules="passwordRules"
        :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
        :type="passwordShow ? 'text' : 'password'"
        required
        @click:append="passwordShow = !passwordShow"
      />
    </v-card-text>
    <v-card-actions class="justify-end mr-2 pb-4">
      <template>
        <v-btn color="#D7CCC8" dark rounded small @click="hide"> 닫기 </v-btn>
      </template>
      <template>
        <v-btn color="#D7CCC8" dark rounded small @click="submit"> 저장 </v-btn>
      </template>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'PasswordDialog',
  data: () => ({
    pwdRequest: {
      password: '',
      changePassword: '',
    },
    passwordShow: false,
    passwordRules: [
      v => !!v || '비밀번호를 입력하세요.',
      v =>
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d].{8,}$/.test(v) ||
        '최소 하나의 숫자, 영어를 포함하는 8자 이상의 비밀번호를 입력하세요.',
    ],
  }),
  props: {
    footerSubmit: {
      type: Boolean,
      default: true,
    },
    footerSubmitTitle: {
      type: String,
      default: '저장',
    },
  },
  methods: {
    submit() {
      this.$emit('submit', this.pwdRequest);
      this.clear();
    },
    hide() {
      this.$emit('hide');
      this.clear();
    },
    clear() {
      this.pwdRequest.password = '';
      this.pwdRequest.changePassword = '';
    },
  },
};
</script>
