<template>
  <v-app class="brown lighten-5">
    <v-card class="mx-auto my-12" max-width="600px" max-height="800px">
      <v-img
        v-if="member.image"
        height="350"
        :src="`http://3.34.235.131/images/${member.image}`"
      ></v-img>
      <v-img v-else height="350" src="@/assets/bear2.png"></v-img>
      <v-card-title class="justify-center">{{ member.name }}</v-card-title>
      <v-card-text>
        <v-row>
          <div class="black--text ms-4">아이디</div>
          <div class="grey--text ms-4">
            {{ member.userId }}
          </div>
        </v-row>
        <v-row>
          <div class="black--text ms-4">이메일</div>
          <div class="grey--text ms-4">
            {{ member.email }}
          </div>
        </v-row>
        <div class="msg">{{ member.statusMessage }}</div>
      </v-card-text>

      <v-divider class="mx-4"></v-divider>

      <v-card-actions>
        <v-btn color="brown lighten-3" text @click="profile = true">
          프로필 수정
        </v-btn>
        <v-dialog max-width="500" v-model="profile">
          <profile-dialog
            @hideProfile="hideProfile"
            @submitProfile="submitProfile"
          />
        </v-dialog>
        <v-btn color="brown lighten-3" text @click="password = true">
          비밀번호 변경
        </v-btn>
        <v-dialog max-width="500" v-model="password">
          <pwd-dialog @hide="hidePwd" @submit="submitPwd" />
        </v-dialog>
      </v-card-actions>
    </v-card>
  </v-app>
</template>

<script>
import ProfileDialog from '@/components/ProfileDialog.vue';
import PwdDialog from '@/components/PasswordDialog.vue';
import { mapActions, mapGetters } from 'vuex';
import { successToast, failToast } from '@/utils/toast.js';
export default {
  components: {
    ProfileDialog,
    PwdDialog,
  },
  data: () => ({
    profile: false,
    password: false,
    member: {},
  }),
  computed: {
    ...mapGetters(['MEMBER', 'GET_URL']),
  },
  created() {
    this.showInfo();
  },
  methods: {
    ...mapActions(['UPLOAD', 'UPDATE_PWD', 'GET_MEMBER', 'UPDATE_PROFILE']),
    hidePwd() {
      this.password = false;
    },
    hideProfile() {
      this.profile = false;
    },
    async submitPwd(pwdRequest) {
      try {
        await this.UPDATE_PWD(pwdRequest);
        this.hidePwd();
        successToast('비밀번호 변경 완료!');
      } catch (error) {
        failToast(error.response.data.message);
      }
    },
    async submitProfile(profileRequest) {
      try {
        const request = {
          image: '',
          statusMessage: profileRequest.statusMessage,
        };
        if (profileRequest.image.name) {
          const formData = new FormData();
          formData.append('file', profileRequest.image);
          await this.UPLOAD(formData);
          request.image = this.GET_URL;
        }
        await this.UPDATE_PROFILE(request);
        this.hideProfile();
        successToast('프로필 변경 완료!');
        this.showInfo();
      } catch (error) {
        failToast(error.response.data.message);
      }
    },
    async showInfo() {
      try {
        await this.GET_MEMBER();
        this.member = this.MEMBER;
      } catch (error) {
        failToast(error.response.data.message);
      }
    },
  },
};
</script>

<style scoped>
.name {
  align-content: center;
  text-align: center;
}
.msg {
  padding-top: 2rem;
}
</style>
