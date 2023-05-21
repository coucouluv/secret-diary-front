<template>
  <v-card>
    <v-card-title> 초대장 보내기 </v-card-title>
    <v-card-subtitle>
      너와 나의 비밀일기장을 같이 이용하고 싶은 친구에게 초대장을 보내세요!
    </v-card-subtitle>
    <v-card-text>
      <v-text-field
        placeholder="초대하고 싶은 사용자 이메일을 입력하세요"
        v-model="email"
        :rules="emailRules"
        required
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
import validator from '@/utils/validator.js';
export default {
  name: 'InvitationDialog',
  data: () => ({
    email: '',
    emailRules: validator.register.email,
  }),
  methods: {
    submit() {
      this.$emit('submit', this.email);
      this.clear();
    },
    hide() {
      this.$emit('hide');
      this.clear();
    },
    clear() {
      this.email = '';
    },
  },
};
</script>
