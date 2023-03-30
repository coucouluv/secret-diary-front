<template>
  <v-app class="brown lighten-5">
    <v-card
      class="mx-auto bar"
      min-width="800"
      max-width="1000"
      min-height="400"
    >
      <system-bar />
      <v-app-bar color="white" dense>
        <v-btn icon @click="save">
          <font-awesome-icon
            icon="fa-solid fa-check"
            size="lg"
            color="#c6b3a6"
          />
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn icon @click="cancel">
          <font-awesome-icon
            icon="fa-solid fa-xmark"
            size="lg"
            color="#c6b3a6"
          />
        </v-btn>
      </v-app-bar>
      <v-container fluid>
        <v-alert v-if="isError" type="error">
          {{ errorMsg }}
        </v-alert>
        <v-row dense class="bar">
          <v-text-field
            outlined
            v-model="diary.title"
            maxlength="50"
            label="제목을 입력하세요."
          ></v-text-field>
        </v-row>
        <v-row dense class="img">
          <v-img v-if="preview" height="400" width="400" :src="preview"></v-img>
        </v-row>
        <v-row dense>
          <v-textarea
            outlined
            filled
            auto-grow
            rows="10"
            maxlength="500"
            row-height="30"
            shaped
            v-model="diary.text"
            label="내용을 입력하세요."
          ></v-textarea>
        </v-row>
        <v-row dense>
          <v-file-input
            class="input"
            accept="image/jpeg"
            type="file"
            v-model="url"
            show-size
            label="사진 입력"
            @change="previewFile(url)"
          ></v-file-input>
        </v-row>
      </v-container>
    </v-card>
  </v-app>
</template>

<script>
import SystemBar from '@/components/SystemBar.vue';
import { mapActions, mapGetters } from 'vuex';
import Swal from 'sweetalert2';
export default {
  components: {
    SystemBar,
  },
  data: () => ({
    diary: {
      friendUserId: '',
      title: '',
      text: '',
      url: '',
    },
    preview: '',
    url: {},
    isError: false,
    errorMsg: '',
  }),
  computed: {
    ...mapGetters(['GET_URL', 'GET_PRESIGNED']),
  },
  created() {
    this.initDiary();
    this.diary.friendUserId = this.$route.query.id;
  },
  methods: {
    ...mapActions([
      'UPLOAD',
      'SHARE',
      'UPLOAD_S3',
      'SAVE_DIARY',
      'UPDATE_DIARY',
    ]),
    initDiary() {
      if (this.$route.params.diary) {
        this.diary = this.$route.params.diary;
      }
    },
    previewFile(file) {
      const fileData = data => {
        this.preview = data;
      };
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.addEventListener(
        'load',
        function () {
          fileData(reader.result);
        },
        false,
      );
    },
    async save() {
      try {
        if (!this.diary.text || !this.diary.title) {
          this.isError = true;
          this.errorMsg = '제목과 내용은 필수입니다.';
          return;
        }
        if (this.url.name) {
          if (this.url.size >= 2000000 || this.url.type !== 'image/jpeg') {
            Swal.fire({
              position: 'center',
              icon: 'warning',
              width: 400,
              text: '이미지는 2MB 이하의 jpg 형식입니다.',
              showConfirmButton: false,
              timer: 3000,
            });
            return;
          }
          await this.UPLOAD();
          await this.$axios.put(this.GET_PRESIGNED, this.url, {
            headers: { 'Content-Type': `image/jpeg` },
          });
          this.diary.url = this.GET_URL;
        }
        if (this.diary.diaryId) {
          const request = {
            diaryId: this.diary.diaryId,
            title: this.diary.title,
            text: this.diary.text,
            url: this.diary.url,
          };
          await this.UPDATE_DIARY(request);
        } else {
          await this.SAVE_DIARY(this.diary);
        }
        Swal.fire({
          position: 'center',
          icon: 'success',
          width: 400,
          text: '다이어리 저장 완료!',
          showConfirmButton: false,
          timer: 1500,
        });
        this.$router.push({
          name: 'diaries',
          query: { id: this.diary.friendUserId },
        });
      } catch (error) {
        Swal.fire({
          position: 'center',
          icon: 'warning',
          width: 400,
          text: error.response.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    },
    cancel() {
      this.$router.push({
        name: 'diaries',
        query: { id: this.diary.friendUserId },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import './scss/Diary.scss';
</style>
