<template>
  <div class="category__wrapper">
    <h1>{{ category && category.title }}</h1>
    <template v-if="category && category.meals">
      <div v-for="meal in category.meals" :key="meal.id" class="category__item">
        <img :src="meal.imageUrl" :alt="meal.title" class="category__img" />
        <h3 class="category__title">{{ meal.title }}</h3>
        <p class="category__description">{{ meal.description }}</p>
        <div class="category__bottom">
          <div class="category__price">
            <span class="category__price__num">
              {{ meal.price | $formatMoneyWithSpace }}
            </span>
            <span class="category__price__text">SO'M</span>
          </div>
          <div>
            <button class="category__add__btn">
              <VIcon icon="plus" size="20" color="#fff" />
            </button>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import VIcon from '~/components/ui/VIcon.vue'

export default {
  components: { VIcon },
  async asyncData({ $axios, params }) {
    const { data } = await $axios.get(`/category/${params.id}`)
    return {
      category: data,
    }
  },
  data() {
    return {
      category: {
        title: '',
        description: '',
        tagId: '',
        meals: [],
      },
    }
  },
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/pages/category';
</style>
