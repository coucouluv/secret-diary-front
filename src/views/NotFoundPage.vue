<template>
  <v-app class="brown lighten-5">
    <v-container class="text-center" style="padding-top: 10rem">
      <v-row align="center">
        <v-col>
          <h1>404 Page Not Found</h1>
          <p>페이지를 찾을 수 없습니다.</p>
          <v-btn to="/" plain> 홈으로 돌아가기 </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: 'NotFoundPage',
};
</script>
