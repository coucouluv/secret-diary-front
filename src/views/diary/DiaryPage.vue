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
                <v-btn icon @click="update">
                    <font-awesome-icon icon="fa-solid fa-pen-to-square" size="lg" color="#c6b3a6"/>
                </v-btn>
                <v-btn icon @click="deleteMsg">
                    <font-awesome-icon icon="fa-solid fa-trash" size="lg" color="#c6b3a6"/>
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn icon @click="back">
                    <font-awesome-icon icon="fa-solid fa-xmark" size="lg" color="#c6b3a6"/>
                </v-btn>
            </v-app-bar>
            <v-card-subtitle>
                <font-awesome-icon icon="fa-solid fa-calendar-days" color="#c6b3a6"/>
                {{diary.saveDate}}
            </v-card-subtitle>
            <v-card-text>
                <v-row dense>
                    <div> <p class="text-h5">{{ diary.title }} </p></div>
                </v-row>
                <v-row dense class="img">
                    <v-img v-if="presignedUrl" height="400" width="250" :src="presignedUrl"></v-img>
                </v-row>
                <v-row dense>
                    <div> <p class="text-h7">{{ diary.text }} </p></div>
                </v-row>
            </v-card-text>
        </v-card>
    </v-app>
</template>

<script>
import DiarySystemBar from '@/components/DiarySystemBar.vue'
import { mapActions, mapGetters } from 'vuex';
import Swal from 'sweetalert2';
export default {
    components: {
        DiarySystemBar,
    },
    data: () => ({
        diary: {
        },
        diaryId: '',
        friendId: '',
        presignedUrl: ''
    }),
    computed: {
    ...mapGetters(["GET_DIARY", "GET_PRESIGNED"])
    },
    created() {
        this.friendId = this.$route.query.id
        this.diaryId = this.$route.query.diary
        this.presignedUrl = this.$route.query.url
        this.initdiary()
    },
    methods: {
        ...mapActions(["DIARY", "DELETE_DIARY", "DELETE"]),
        async initdiary() {
            try {
                await this.DIARY(this.diaryId)
                this.diary = this.GET_DIARY
            } catch(error) {
                console.log(error)
            }
        },
        back() {
            this.$router.push({name: 'diaries', query: {id: this.friendId}})
        },
        update() {
            this.$router.push({name: 'diaryRegister', query: {id: this.friendId}, params: {diary: this.diary}})
        },
        deleteMsg() {
            Swal.fire({
                position: 'center',
                icon: 'warning',
                width: 400,
                title: '<div style="font-size: 18px; font-family: "Spoqa Han Sans Neo", "sans-serif"; ">다이어리를 삭제하시겠습니까?<div>',
                confirmButtonText: '확인',
                cancelButtonText: '취소',
                showCancelButton: true,
                showConfirmButton: true,
                cancelButtonColor: '#c6b3a6',
                confirmButtonColor: '#c6b3a6'
            }).then((result) => {
                if(result.value) {
                    this.deleteDiary()
                }
            })
        },
        async deleteDiary() {
            try {
                await this.DELETE(this.diary.url)
                const deleteUrl = this.GET_PRESIGNED
                this.$axios.delete(deleteUrl)

                await this.DELETE_DIARY(this.diaryId)
                this.back()
            } catch(error) {
                //여기서 친구가 작성한 다이어리는 삭제 못함
                console.log(error)
            }
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