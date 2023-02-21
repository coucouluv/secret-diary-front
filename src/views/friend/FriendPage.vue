<template>
<v-app  class="brown lighten-5">
  <div>
      <v-text-field
          class = "apply"
          v-model="friendId"
          label="친구 신청"
          placeholder="아이디를 입력하세요"
          solo
          append-icon="mdi-magnify"
          @click:append="applyFriend"
      ></v-text-field>
  </div>
  <div class="list">
    <v-list three-line>
        <v-subheader
            :key="header"
        ></v-subheader>
        <template v-for="(item, index) in friends">
          <v-divider
            v-if="index != 0"
            :key="index"
            :inset="inset"
          ></v-divider>
          <v-list-item
            :key="item.name"
          >
            <v-list-item-avatar>
              <v-img v-if="item.url != null" :src="item.url"></v-img>
              <v-img v-else src= "@/assets/bear2.png"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>{{ item.name }}</v-list-item-title>
              <v-list-item-subtitle>{{ item.userId }}</v-list-item-subtitle>
              <v-list-item-subtitle>{{ item.statusMessage }}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn rounded color="brown lighten-4" dark @click="diary(item.userId, $event)">
                일기장
                <v-img
                  src="@/assets/full-heart.png"
                  max-height="40"
                  max-width="40"
                ></v-img>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </template>
      </v-list>
   </div>
</v-app >
</template>

<script>
  import Swal from 'sweetalert2';
  import { mapActions, mapGetters } from 'vuex';
  
  export default {
    data: () => ({
      divider: true,
      insert: true,
      friendId: '',
      header: "친구 목록",
      friends: {
      },
    }),
    computed: {
    ...mapGetters(["FRIEND_LIST"])
    },
    created() {
      this.initFriend();
    },
    methods: {
      ...mapActions(["GET_FRIENDS", "APPLY_FRIEND"]),
      async initFriend() {
        try {
          await this.GET_FRIENDS()
          this.friends = this.FRIEND_LIST
        } catch(error) {
          console.log(error)
          Swal.fire({
            position: 'center',
            icon: 'warning',
            width: 400,
            title: '<div style="font-size: 18px; font-family: "Spoqa Han Sans Neo", "sans-serif"; ">친구 목록 실패<div>',
            showConfirmButton: false,
            timer: 3000,
			    })   
        }
      },
      async applyFriend() {
        try {
          await this.APPLY_FRIEND(this.friendId)
          Swal.fire({
            position: 'center',
            icon: 'success',
            width: 400,
            title: '<div style="font-size: 18px; font-family: "Spoqa Han Sans Neo", "sans-serif"; ">친구 신청이 완료되었습니다.<div>',
            showConfirmButton: false,
            timer: 3000,
			    })
          this.friendId = '' 
        }catch(error) {
          console.log(error);
          Swal.fire({
            position: 'center',
            icon: 'success',
            width: 400,
            text: error.message,
            showConfirmButton: false,
            timer: 3000,
			    })
        }
      },
      diary(userId, event) {
        console.log(userId)
        this.$router.push({name: 'diarys', params: {friendId: userId}})
      }
    },
  }
</script>

<style scoped>
.list{
  padding-left: 5rem;
  padding-right: 5rem;
}
.apply{
  margin: auto;
  display: block;
  padding-top: 1rem;
  max-width: 400px;  
}
</style>