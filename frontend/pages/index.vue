<template>
  <div class="home__wrapper">
    <NuxtLink
      v-for="category in categories"
      :key="category.id"
      class="home__category"
      :to="`/category/${category.id}`"
    >
      <img :src="category.imageUrl" :alt="category.title" />
      <h1>{{ category.title }}</h1>
    </NuxtLink>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  computed: {
    categories() {
      return this.$store.state.categories
    },
  },
}
</script>

<style scoped lang="scss">
@import '../assets/styles/pages/home';
</style>
