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
            :rules="titleRules"
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
            :rules="textRules"
          ></v-textarea>
        </v-row>
        <v-row dense>
          <v-file-input
            class="input"
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
import validator from '@/utils/validator.js';
import { successToast, failToast } from '@/utils/toast.js';
export default {
  components: {
    SystemBar,
  },
  data: () => ({
    diary: {
      id: '',
      title: '',
      text: '',
      image: '',
    },
    friendId: '',
    preview: '',
    url: {},
    isError: false,
    errorMsg: '',
    titleRules: validator.diary.title,
    textRules: validator.diary.text,
  }),
  computed: {
    ...mapGetters(['GET_URL']),
  },
  created() {
    this.initDiary();
    this.friendId = this.$route.query.id;
  },
  methods: {
    ...mapActions(['UPLOAD', 'SAVE_DIARY', 'UPDATE_DIARY']),
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
        if (this.url.name) {
          const formData = new FormData();
          formData.append('file', this.url);
          await this.UPLOAD(formData);
          this.diary.image = this.GET_URL;
        }
        if (this.diary.id) {
          const request = {
            diaryId: this.diary.id,
            diaryRequest: {
              title: this.diary.title,
              text: this.diary.text,
              image: this.diary.image,
            },
          };
          await this.UPDATE_DIARY(request);
        } else {
          const request = {
            id: this.friendId,
            title: this.diary.title,
            text: this.diary.text,
            image: this.diary.image,
          };
          await this.SAVE_DIARY(request);
        }
        successToast('다이어리 등록 완료!');
        this.$router.push({
          name: 'diaries',
          query: { id: this.friendId },
        });
      } catch (error) {
        failToast(error.response.data.message);
      }
    },
    cancel() {
      this.$router.push({
        name: 'diaries',
        query: { id: this.friendId },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import './scss/Diary.scss';
</style>
