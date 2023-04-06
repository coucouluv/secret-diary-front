<template>
  <v-app class="brown lighten-5">
    <v-card
      class="mx-auto bar"
      min-width="600"
      max-width="800"
      min-height="400"
    >
      <system-bar />
      <div class="list">
        <v-list three-line>
          <v-subheader>{{ header }}</v-subheader>
          <template v-for="(item, index) in friends">
            <v-divider
              v-if="index != 0"
              :key="index"
              :inset="inset"
            ></v-divider>
            <v-list-item :key="item.name">
              <v-list-item-content>
                <v-list-item-title>{{ item.name }}</v-list-item-title>
                <v-list-item-subtitle>{{ item.userId }}</v-list-item-subtitle>
                <v-list-item-subtitle></v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn
                  rounded
                  color="brown lighten-4"
                  dark
                  @click="acceptFriend(item.userId, $event)"
                >
                  수락
                  <v-img
                    src="@/assets/full-heart.png"
                    max-height="40"
                    max-width="40"
                  ></v-img>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </template>
          <infinite-loading
            spinner="spiral"
            @infinite="initFriend"
            v-if="hasNext"
          >
          </infinite-loading>
        </v-list>
      </div>
    </v-card>
  </v-app>
</template>

<script>
import Swal from 'sweetalert2';
import { mapActions, mapGetters } from 'vuex';
import SystemBar from '@/components/SystemBar.vue';
import InfiniteLoading from 'vue-infinite-loading';

export default {
  components: {
    SystemBar,
    InfiniteLoading,
  },
  data: () => ({
    divider: true,
    insert: true,
    header: '친구 요청 목록',
    friends: [],
    request: {
      page: 0,
      size: 9,
    },
    hasNext: true,
  }),
  computed: {
    ...mapGetters(['WAITING_LIST']),
  },
  methods: {
    ...mapActions(['GET_WAITING', 'APPLY_FRIEND', 'ACCEPT_FRIEND']),
    async initFriend($state) {
      try {
        await this.GET_WAITING(this.request);
        this.friends = this.friends.concat(this.WAITING_LIST.friends);
        this.request.page++;
        if (!this.WAITING_LIST.hasNext) {
          this.hasNext = false;
          $state.complete();
        } else {
          $state.loaded();
        }
      } catch (error) {
        Swal.fire({
          position: 'center',
          icon: 'warning',
          width: 400,
          text: error.message,
          showConfirmButton: false,
          timer: 3000,
        });
      }
    },
    async applyFriend() {
      try {
        await this.APPLY_FRIEND(this.friendId);
        Swal.fire({
          position: 'center',
          icon: 'success',
          width: 400,
          title:
            '<div style="font-size: 18px; font-family: "Spoqa Han Sans Neo", "sans-serif"; ">친구 신청이 완료되었습니다.<div>',
          showConfirmButton: false,
          timer: 3000,
        });
        this.friendId = '';
      } catch (error) {
        Swal.fire({
          position: 'center',
          icon: 'warning',
          width: 400,
          text: error.message,
          showConfirmButton: false,
          timer: 3000,
        });
      }
    },
    async acceptFriend(friendId) {
      try {
        await this.ACCEPT_FRIEND(friendId);
        Swal.fire({
          position: 'center',
          icon: 'success',
          width: 400,
          title:
            '<div style="font-size: 18px; font-family: "Spoqa Han Sans Neo", "sans-serif"; ">친구가 되었습니다.\n 친구와 함께 일기를 작성해보세요!<div>',
          showConfirmButton: false,
          timer: 3000,
        });
      } catch (error) {
        Swal.fire({
          position: 'center',
          icon: 'warning',
          width: 400,
          text: error.message,
          showConfirmButton: false,
          timer: 3000,
        });
      }
    },
  },
};
</script>

<style scoped>
.list {
  padding-left: 1rem;
  padding-right: 1rem;
}
.apply {
  margin: auto;
  display: block;
  padding-top: 1rem;
  max-width: 400px;
}
.bar {
  margin-top: 1rem;
}
</style>
