<template>
  <div class="category__wrapper">
    <h1>Qidiruv natijasi:</h1>
    <template v-if="meals && meals.length">
      <div v-for="meal in meals" :key="meal.id" class="category__item">
        <img
          :src="meal.imageUrl"
          :alt="meal.title"
          class="category__img"
          @click="openImage(meal.imageUrl)"
        />
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
    <div v-else class="not__found">
      <h1>Hech narsa topilmadi</h1>
    </div>
  </div>
</template>

<script>
import VIcon from '~/components/ui/VIcon.vue'

export default {
  components: { VIcon },
  async asyncData({ $axios, params }) {
    const { data } = await $axios.get(`/meals?title=${params.slug}`)
    return {
      meals: data,
    }
  },
  data() {
    return {
      meals: [],
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
        title: meal.title,
        mealId: meal.id,
        mealQuantity: 1,
        price: meal.price,
      })
    },
    getMealQuantity(mealId) {
      const meal = this.orderedMeals.find((meal) => meal.mealId === mealId)
      return meal ? meal.mealQuantity : 0
    },
    incrementOrder(meal) {
      const quantity = this.getMealQuantity(meal.id)
      this.$store.commit('addMeal', {
        title: meal.title,
        mealId: meal.id,
        mealQuantity: quantity + 1,
        price: meal.price,
      })
    },
    decrementOrder(meal) {
      const quantity = this.getMealQuantity(meal.id)
      this.$store.commit('removeMeal', {
        title: meal.title,
        mealId: meal.id,
        mealQuantity: quantity - 1,
        price: meal.price,
      })
    },
    openImage(imageUrl) {
      this.$store.commit('setImages', [imageUrl])
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/pages/category';
</style>
