<template>
    <v-app class="brown lighten-5">
        <v-card 
            class="mx-auto bar"
            min-width="800"
            max-width="1000"
            min-height="400"
        >
            <diary-system-bar/>
            <v-app-bar
                color="white"
                dense
            >
                <v-btn icon>
                    <font-awesome-icon icon="fa-solid fa-check" size="lg" color="#c6b3a6"/>
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn icon @click="cancel">
                    <font-awesome-icon icon="fa-solid fa-xmark" size="lg" color="#c6b3a6"/>
                </v-btn>
            </v-app-bar>
            <v-container fluid>
                <v-row dense class="bar">
                    <v-text-field
                        outlined
                        v-model="diary.title"
                        label="제목을 입력하세요."
                        :rules="[v => !!v || '제목은 필수입니다.']"
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
                    row-height="30"
                    shaped
                    v-model="diary.text"
                    label="내용을 입력하세요."
                    :rules="[v => !!v || '내용은 필수입니다.']"
                    ></v-textarea>
                </v-row>
                <v-row dense>
                    <v-file-input
                        class="input" 
                        type="file"
                        v-model="diary.url"
                        show-size
                        label="사진 입력"
                        @change="previewFile(diary.url)"
                    ></v-file-input>
                </v-row>
            </v-container>
        </v-card>
    </v-app>
</template>

<script>
import DiarySystemBar from '@/components/DiarySystemBar.vue'
export default {
    components: {
        DiarySystemBar,
    },
    data: () => ({
        diary: {
            title:'',
            text:'',
            url:''
        },
        preview: '',
        friendId: ''
    }),
    created() {
        this.friendId = this.$route.query.id
    },
    methods: {
        previewFile(file) {
        const fileData = (data) => {
          this.preview = data
        }
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.addEventListener("load", function () {
          fileData(reader.result)
        }, false);
        console.log(this.preview)
        },
        cancel() {
            this.$router.push({name: 'diaries', query: {id: this.friendId}})
        }
    }
}
</script>

<style scoped>
.bar{
    margin-top: 1rem;
}
.img{
    margin-bottom: 1rem;
}
</style>