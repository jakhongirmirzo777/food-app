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
            <div v-if="isOrderedMeal(meal.id)" class="d-flex align-center">
              <VIcon
                class="cursor-pointer"
                icon="minus"
                size="24"
                color="var(--color-red)"
                @click="decrementOrder(meal)"
              />
              <span class="category__count">
                {{ getMealQuantity(meal.id) }}
              </span>
              <VIcon
                class="cursor-pointer"
                icon="plus"
                size="24"
                color="var(--color-red)"
                @click="incrementOrder(meal)"
              />
            </div>
            <button
              v-else
              class="category__add__btn"
              @click="addMealToOrder(meal)"
            >
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
  computed: {
    orderedMeals() {
      return this.$store.state.meals
    },
  },
  methods: {
    isOrderedMeal(mealId) {
      return this.orderedMeals.find((meal) => meal.mealId === mealId)
    },
    addMealToOrder(meal) {
      this.$store.commit('addMeal', {
        mealId: meal.id,
        mealQuantity: 1,
      })
    },
    getMealQuantity(mealId) {
      const meal = this.orderedMeals.find((meal) => meal.mealId === mealId)
      return meal ? meal.mealQuantity : 0
    },
    incrementOrder(meal) {
      const quantity = this.getMealQuantity(meal.id)
      this.$store.commit('addMeal', {
        mealId: meal.id,
        mealQuantity: quantity + 1,
      })
    },
    decrementOrder(meal) {
      const quantity = this.getMealQuantity(meal.id)
      this.$store.commit('removeMeal', {
        mealId: meal.id,
        mealQuantity: quantity - 1,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/pages/category';
</style>
