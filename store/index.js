export const state = () => ({
  meals: [],
})

export const mutations = {
  addMeal: (state, meal) => {
    const newMeal = {
      mealId: meal.mealId,
      mealQuantity: meal.mealQuantity,
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
      mealId: meal.mealId,
      mealQuantity: meal.mealQuantity,
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
}
