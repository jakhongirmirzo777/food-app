<template>
  <div class="order__wrapper">
    <div v-if="!hasOrdered">
      <h1 class="order__title">Mening buyurtmam:</h1>
      <div v-if="orderedMeals && orderedMeals.length">
        <div
          v-for="meal in orderedMeals"
          :key="meal.mealId"
          class="order__item"
        >
          <img
            class="order__item__img cursor-pointer"
            :src="meal.imageUrl"
            alt="img"
            @click="openImage(meal.imageUrl)"
          />
          <div class="order__item__box">
            <h4 class="order__item__title">{{ meal.title }}</h4>
            <div class="order__item__detail">
              <div class="order__item__info">
                <span class="amount">
                  {{ meal.price | $formatMoneyWithSpace }}
                </span>
                <span class="text">so'm</span>
              </div>
              <div class="order__item__quantity">
                <VIcon
                  class="cursor-pointer"
                  icon="minus"
                  size="20"
                  color="var(--color-red)"
                  @click="decrementOrder(meal)"
                />
                <span class="order__item__count">
                  {{ getMealQuantity(meal.mealId) }}
                </span>
                <VIcon
                  class="cursor-pointer"
                  icon="plus"
                  size="20"
                  color="var(--color-red)"
                  @click="incrementOrder(meal)"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="order__total">
          <span class="order__total__all">Ja'mi:</span>
          <div class="order__total__info">
            <span class="amount">{{ totalPrice | $formatMoneyWithSpace }}</span>
            <span class="text">so'm</span>
          </div>
        </div>
        <ValidationObserver v-slot="{ handleSubmit }" ref="formRef" tag="div">
          <form @submit.prevent="handleSubmit(onSubmit)">
            <VInput
              v-model="userPhoneNumber"
              v-mask="'+998(##) ###-##-##'"
              class="mb-10"
              placeholder="Telefon raqamingizni kiriting"
              vid="userPhoneNumber"
              rules="required"
            />
            <VInput
              v-model="address"
              class="mb-10"
              placeholder="Manzilni kiriting"
              vid="address"
              rules="required"
            />
            <button class="order__btn" type="submit">Buyurtma berish</button>
          </form>
        </ValidationObserver>
      </div>
      <div v-else class="not__found">
        <h1>Hech narsa topilmadi</h1>
      </div>
    </div>
    <div v-else>
      <h1 class="order__title text-center">Buyurtmangiz qabul qilindi</h1>
      <button class="order__btn" type="button" @click="$router.push('/')">
        Asosiy menuga qaytish
      </button>
    </div>
  </div>
</template>

<script>
import VIcon from '~/components/ui/VIcon.vue'
import VInput from '~/components/ui/VInput.vue'

export default {
  components: { VInput, VIcon },
  data() {
    return {
      address: '',
      userPhoneNumber: '',
      hasOrdered: false,
    }
  },
  computed: {
    orderedMeals() {
      return this.$store.state.meals
    },
    totalPrice() {
      return this.orderedMeals.reduce(
        (acc, meal) => acc + meal.price * meal.mealQuantity,
        0
      )
    },
  },
  methods: {
    getMealQuantity(mealId) {
      const meal = this.orderedMeals.find((meal) => meal.mealId === mealId)
      return meal ? meal.mealQuantity : 0
    },
    decrementOrder(meal) {
      const quantity = this.getMealQuantity(meal.mealId)
      this.$store.commit('removeMeal', {
        title: meal.title,
        mealId: meal.mealId,
        mealQuantity: quantity - 1,
        price: meal.price,
      })
    },
    incrementOrder(meal) {
      const quantity = this.getMealQuantity(meal.mealId)
      this.$store.commit('addMeal', {
        title: meal.title,
        mealId: meal.mealId,
        mealQuantity: quantity + 1,
        price: meal.price,
      })
    },
    async onSubmit() {
      try {
        await this.$axios.post('/orders', {
          tableNumber: 1,
          address: this.address,
          userPhoneNumber: this.userPhoneNumber.replace(/\D/g, ''),
          orderItems: this.orderedMeals.map((meal) => ({
            mealId: meal.mealId,
            mealQuantity: meal.mealQuantity,
          })),
        })
        await this.$store.commit('clearMeals')
        this.userPhoneNumber = ''
        this.address = ''
        this.hasOrdered = true
        await this.$refs.formRef?.reset()
      } catch (err) {
        console.log(err)
      }
    },
    openImage(imageUrl) {
      this.$store.commit('setImages', [imageUrl])
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/pages/order';
</style>
