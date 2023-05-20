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
        <v-btn icon @click="register">
          <font-awesome-icon
            icon="fa-solid fa-pen-to-square"
            size="lg"
            color="#c6b3a6"
          />
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn icon>
          <font-awesome-icon
            icon="fa-solid fa-magnifying-glass"
            size="lg"
            color="#c6b3a6"
          />
        </v-btn>
      </v-app-bar>
      <v-container fluid>
        <v-row dense>
          <v-col v-for="card in diaries" :key="card.title" :cols="4">
            <v-card @click="show(card.diaryId, $event)">
              <v-img
                v-if="card.image"
                :src="`http://3.34.235.131/images/${card.image}`"
                :lazy-src="`http://3.34.235.131/images/${card.image}`"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="300px"
              >
              </v-img>
              <v-img v-else height="300px" src="@/assets/bear2.png"></v-img>
              <v-card-subtitle class="pb-3">
                {{ card.title }}
              </v-card-subtitle>
            </v-card>
          </v-col>
        </v-row>
        <infinite-loading
          spinner="spiral"
          @infinite="loadDiaries"
          v-if="hasNext"
        >
        </infinite-loading>
      </v-container>
    </v-card>
  </v-app>
</template>
<script>
import SystemBar from '@/components/SystemBar.vue';
import { mapActions, mapGetters } from 'vuex';
import InfiniteLoading from 'vue-infinite-loading';
import { failToast } from '@/utils/toast.js';
export default {
  components: {
    SystemBar,
    InfiniteLoading,
  },
  data: () => ({
    diaries: [],
    request: {
      friendId: '',
      id: '',
      size: 9,
    },
    hasNext: true,
  }),
  computed: {
    ...mapGetters(['GET_DIARIES']),
  },
  created() {
    this.request.friendId = this.$route.query.id;
  },
  methods: {
    ...mapActions(['DIARIES']),
    async loadDiaries($state) {
      try {
        await this.DIARIES(this.request);
        this.diaries = this.diaries.concat(this.GET_DIARIES.diaries);
        this.request.id = this.GET_DIARIES.nextId;
        if (!this.GET_DIARIES.hasNext) {
          this.hasNext = false;
          $state.complete();
        } else {
          $state.loaded();
        }
      } catch (error) {
        failToast(error.response.data.message);
      }
    },
    register() {
      this.$router.push({
        name: 'diaryRegister',
        query: { id: this.request.friendId },
      });
    },
    show(diaryId) {
      this.$router.push({
        name: 'diary',
        query: { id: this.request.friendId, diary: diaryId },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import './scss/Diary.scss';
</style>
