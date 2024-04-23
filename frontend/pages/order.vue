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
            <Transition name="fade">
              <div v-if="!tableNumber">
                <VInput
                  v-model="userPhoneNumber"
                  v-mask="'+998(##) ###-##-##'"
                  class="mb-10"
                  placeholder="Telefon raqamingizni kiriting"
                  vid="userPhoneNumber"
                  rules="required|length:18"
                />
                <VInput
                  v-model="address"
                  class="mb-10"
                  placeholder="Manzilni kiriting"
                  vid="address"
                  rules="required"
                />
                <div class="mb-30 d-flex align-center">
                  <p class="mr-16" style="font-weight: 600; font-size: 16px">
                    To'lov turi:
                  </p>
                  <div class="d-flex align-center">
                    <div class="d-flex align-center mr-20">
                      <input
                        id="cash"
                        v-model="paymentType"
                        class="ma-0"
                        type="radio"
                        name="paymentType"
                        :value="PAYMENT_TYPE.CASH"
                        :checked="paymentType === PAYMENT_TYPE.CASH"
                        style="transform: scale(1.5)"
                      />
                      <label for="cash" class="pl-10" style="font-size: 14px">
                        Naqt pul
                      </label>
                    </div>
                    <div class="d-flex align-center">
                      <input
                        id="card"
                        v-model="paymentType"
                        class="ma-0"
                        type="radio"
                        name="paymentType"
                        :value="PAYMENT_TYPE.CARD"
                        :checked="paymentType === PAYMENT_TYPE.CARD"
                        style="transform: scale(1.5)"
                      />
                      <label for="card" class="pl-10" style="font-size: 14px">
                        Karta
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </Transition>
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
      <button
        class="order__btn"
        type="button"
        @click="$router.push(parseUrl('/', $route))"
      >
        Asosiy menuga qaytish
      </button>
    </div>
  </div>
</template>

<script>
import VIcon from '~/components/ui/VIcon.vue'
import VInput from '~/components/ui/VInput.vue'
import { parseUrl } from '~/utils/helpers'

const PAYMENT_TYPE = {
  CASH: 'CASH',
  CARD: 'CARD',
}

export default {
  components: { VInput, VIcon },
  data() {
    return {
      PAYMENT_TYPE,
      address: '',
      userPhoneNumber: '',
      hasOrdered: false,
      paymentType: PAYMENT_TYPE.CASH,
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
    tableNumber() {
      const tableNumber = this.$route.query?.tableNumber
      return tableNumber && +tableNumber > 0 ? +tableNumber : null
    },
  },
  methods: {
    parseUrl,
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
          tableNumber: this.tableNumber ? this.tableNumber : null,
          address: this.tableNumber ? null : this.address,
          userPhoneNumber: this.tableNumber
            ? null
            : this.userPhoneNumber.replace(/\D/g, ''),
          orderItems: this.orderedMeals.map((meal) => ({
            mealId: meal.mealId,
            mealQuantity: meal.mealQuantity,
          })),
          paymentType: this.tableNumber ? null : this.paymentType,
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
