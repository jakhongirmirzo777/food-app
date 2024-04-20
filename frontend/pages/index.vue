<template>
  <div class="home__wrapper">
    <NuxtLink
      v-for="category in categories"
      :key="category.id"
      class="home__category"
      :to="parseUrl(`/category/${category.id}`, $route)"
    >
      <img :src="category.imageUrl" :alt="category.title" />
      <h1>{{ category.title }}</h1>
    </NuxtLink>
  </div>
</template>

<script>
import { parseUrl } from '~/utils/helpers'

export default {
  name: 'IndexPage',
  methods: { parseUrl },
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
