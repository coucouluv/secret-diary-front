<template>
  <v-main class="brown lighten-5">
    <div class="start">
      <img alt="start" src="@/assets/start2.png" class="start-img" fill-height>
      
    </div>
  </v-main>
</template>
<script>

export default {
  name: 'Home',

  components: {
  },

  data: () => ({
  }),
};
</script>

<style scoped>
.start{
  text-align: center;
  padding-top: 2rem;
}
.start-img{
  width: 48%; 
  min-width: 450px;
}

</style>