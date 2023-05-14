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
import { mapActions, mapGetters } from 'vuex';
import SystemBar from '@/components/SystemBar.vue';
import InfiniteLoading from 'vue-infinite-loading';
import { successToast, failToast } from '@/utils/toast.js';
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
        failToast(error.response.data.message);
      }
    },
    async acceptFriend(friendId) {
      try {
        await this.ACCEPT_FRIEND(friendId);
        successToast('친구가 되었습니다!');
      } catch (error) {
        failToast(error.response.data.message);
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
