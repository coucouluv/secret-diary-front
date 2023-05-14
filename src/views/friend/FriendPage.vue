<template>
  <v-app class="brown lighten-5">
    <v-card
      class="mx-auto bar"
      min-width="600"
      max-width="800"
      min-height="400"
    >
      <system-bar />
      <div>
        <v-text-field
          class="apply"
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
          <v-subheader>{{ header }}</v-subheader>
          <template v-for="(item, index) in friends">
            <v-divider
              v-if="index != 0"
              :key="index"
              :inset="inset"
            ></v-divider>
            <v-list-item :key="item.name">
              <v-list-item-avatar>
                <v-img
                  v-if="item.image != null"
                  :src="`http://3.34.235.131/images/${item.image}`"
                ></v-img>
                <v-img v-else src="@/assets/bear2.png"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>{{ item.name }}</v-list-item-title>
                <v-list-item-subtitle>{{ item.userId }}</v-list-item-subtitle>
                <v-list-item-subtitle>{{
                  item.statusMessage
                }}</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn
                  rounded
                  color="brown lighten-4"
                  dark
                  @click="diary(item.id, $event)"
                >
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
    friendId: '',
    header: '친구 목록',
    friends: [],
    request: {
      page: 0,
      size: 9,
    },
    hasNext: true,
  }),
  computed: {
    ...mapGetters(['FRIEND_LIST']),
  },
  methods: {
    ...mapActions(['GET_FRIENDS', 'APPLY_FRIEND']),
    async initFriend($state) {
      try {
        await this.GET_FRIENDS(this.request);
        this.friends = this.friends.concat(this.FRIEND_LIST.friends);
        this.request.page++;
        if (!this.FRIEND_LIST.hasNext) {
          this.hasNext = false;
          $state.complete();
        } else {
          $state.loaded();
        }
      } catch (error) {
        failToast(error.response.data.message);
      }
    },
    async applyFriend() {
      try {
        await this.APPLY_FRIEND(this.friendId);
        successToast('친구 신청 완료!');
        this.friendId = '';
      } catch (error) {
        failToast(error.response.data.message);
      }
    },
    diary(id) {
      this.$router.push({ name: 'diaries', query: { id: id } });
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
