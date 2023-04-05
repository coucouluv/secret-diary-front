<template>
  <v-card>
    <v-card-title> 프로필 변경 </v-card-title>
    <v-alert v-if="isError" type="error">
      {{ errorMsg }}
    </v-alert>
    <v-img v-if="preview" height="350" :src="preview"></v-img>
    <v-card-text>
      <v-file-input
        class="input"
        type="file"
        v-model="profile.url"
        show-size
        label="프로필 사진 입력"
        @change="previewFile(profile.url)"
      ></v-file-input>
      <v-text-field
        placeholder="상태 메세지를 입력하세요"
        v-model="profile.statusMessage"
        maxlength="100"
        required
      />
    </v-card-text>
    <v-card-actions class="justify-end mr-2 pb-4">
      <v-btn color="#D7CCC8" dark rounded small @click="hide"> 닫기 </v-btn>
      <v-btn color="#D7CCC8" dark rounded small @click="submit"> 저장 </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    profile: {
      url: '',
      statusMessage: '',
    },
    preview: '',
    isError: false,
    errorMsg: '',
  }),
  created() {
    this.clear();
  },
  methods: {
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
    submit() {
      if (this.profile.url.name) {
        if (
          this.profile.url.size >= 2000000 ||
          this.profile.url.type !== 'image/jpeg'
        ) {
          this.isError = true;
          this.errorMsg = '이미지는 2MB 이하의 jpg 형식입니다.';
          return;
        }
      }
      this.$emit('submitProfile', this.profile);
      this.clear();
    },
    hide() {
      this.$emit('hideProfile');
      this.clear();
    },
    clear() {
      this.profile.url = '';
      this.profile.statusMessage = '';
      this.preview = '';
      this.isError = false;
      this.errorMsg = '';
    },
  },
};
</script>
