<template>
	<div>
		<v-app-bar dense class="brown lighten-4">
			<v-img
				class="mx-2"
				src="@/assets/full-heart.png"
				max-height="60"
				max-width="60"
				contain
			></v-img>

			<v-spacer></v-spacer>
			<v-btn text color="white" class="btn" router-link to="/register">
				회원가입
			</v-btn>
			<v-btn text color="white" class="btn" router-link to="/signin">
				로그인
			</v-btn>
			<v-img
				class="mx-2"
				src="@/assets/bear.png"
				max-height="40"
				max-width="40"
				contain
			></v-img>
		</v-app-bar>
	</div>
</template>
<script>
export default {
	data: () => ({ value: 'recent' }),
};
</script>

<style scoped>
.btn {
	font-weight: bold;
}
</style>
