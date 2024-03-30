export const state = () => ({
  activeTagId: null,
  meals: [],
  tags: [],
  categories: [],
  activeImageIndex: null,
  images: [],
})

export const mutations = {
  addMeal: (state, meal) => {
    const newMeal = {
      title: meal.title,
      mealId: meal.mealId,
      mealQuantity: meal.mealQuantity,
      price: meal.price,
      imageUrl: meal.imageUrl
    }
    const oldMealIndex = state.meals.findIndex(
      (m) => m.mealId === newMeal.mealId
    )
    if (oldMealIndex > -1) {
      state.meals.splice(oldMealIndex, 1, newMeal)
    } else {
      state.meals.push(newMeal)
    }
  },
  removeMeal(state, meal) {
    const newMeal = {
      title: meal.title,
      mealId: meal.mealId,
      mealQuantity: meal.mealQuantity,
      price: meal.price,
      imageUrl: meal.imageUrl
    }
    const oldMealIndex = state.meals.findIndex(
      (m) => m.mealId === newMeal.mealId
    )
    if (newMeal.mealQuantity > 0) {
      state.meals.splice(oldMealIndex, 1, newMeal)
    } else {
      state.meals.splice(oldMealIndex, 1)
    }
  },
  clearMeals(state) {
    state.meals = []
  },
  setTags(state, tags) {
    state.tags = tags
  },
  setActiveTagId(state, tagId) {
    state.activeTagId = tagId
  },
  setCategories(state, categories) {
    state.categories = categories
  },
  setImages(state, images) {
    state.images = images
    state.activeImageIndex = 0
  },
  removeImages(state) {
    state.images = []
    state.activeImageIndex = null
  },
}

export const actions = {
  async nuxtServerInit({ commit, dispatch }) {
    try {
      const { data } = await this.$axios.get('/tags')
      await commit('setTags', data)
      await dispatch('getCategories', data?.[0]?.id)
    } catch (err) {
      console.log(err)
    }
  },
  async getCategories({ commit }, tagId) {
    try {
      const { data } = await this.$axios.get(`/category?tagId=${tagId}`)
      await commit('setActiveTagId', tagId)
      await commit('setCategories', data)
      return Promise.resolve(data)
    } catch (err) {
      return Promise.reject(err)
    }
  },
}
