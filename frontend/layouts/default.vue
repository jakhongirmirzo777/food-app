<template>
  <div class="layout__wrapper">
    <VCard background-color="var(--color-red)" class="layout__box">
      <NuxtLink v-if="$route.path !== '/'" to="/" class="layout__back__btn">
        <VIcon icon="arrow-left" size="16" color="var(--color-black)" />
      </NuxtLink>
      <div class="d-flex justify-center py-20">
        <NuxtLink to="/" class="layout__logo__text">
          <span>Yalla</span>
        </NuxtLink>
      </div>
      <VCard
        class="layout__body"
        radius="24px 24px 0 0"
        padding="24px 16px 0 16px"
      >
        <div>
          <div class="layout__info mb-16">
            <h1>{{ restaurantName }}</h1>
            <p>
            <span class="layout__address mb-8">
              <a class="mr-12" :href="addressMap">
                <VIcon class="mr-5" icon="location" size="14" color="#676767" />
                {{ addressText }}
              </a>
              <a :href="`tel:${phoneUrl}`">
                <VIcon class="mr-5" icon="phone" size="14" color="#676767" />
                {{ phoneText }}
              </a>
            </span>
              <span class="layout__text">Xizmat ko'rsatish bepul</span>
            </p>
          </div>
          <div v-if="$route.name !== 'order'" class="layout__tags">
            <VTag
              v-for="tag in tags"
              :key="tag.id"
              :active="tag.id === activeTagId"
              @click.native="handleTagClick(tag.id)"
            >
              {{ tag.title }}
            </VTag>
          </div>
          <ValidationObserver
            v-if="$route.name === 'index' || $route.name === 'search-slug'"
            v-slot="{ handleSubmit }"
            ref="formRef"
            class="layout__search__wrapper"
            tag="div"
          >
            <form class="layout__search" @submit.prevent="handleSubmit(onSubmit)">
              <VInput
                v-model="searchQuery"
                class="layout__search__input"
                placeholder="Qidiruv"
                vid="search"
                rules="required"
              />
              <button class="layout__search__btn" type="submit" aria-label="search">
                <VIcon icon="search" size="16" color="#4c4c4c" />
              </button>
            </form>
          </ValidationObserver>
          <Nuxt />
        </div>
        <div :style="{margin: $route.name === 'order' ? '0' : '50px 0 30px'}" class="layout__contacts">
          <h4>Aloqa</h4>
          <div class="layout__contacts__phones">
            <a :href="`tel:${OUR_CONTACT_1_LINK}`"> <VIcon class="mr-8" icon="phone" size="14" color="var(--color-red)"/> {{OUR_CONTACT_1}}</a>
            <a :href="`tel:${OUR_CONTACT_2_LINK}`"><VIcon class="mr-8"  icon="phone" size="14" color="var(--color-red)"/>  {{OUR_CONTACT_2}}</a>
            <a :href="OUR_TELEGRAM_LINK"><VIcon class="mr-8"  icon="telegram" size="14" color="var(--color-red)"/>  {{OUR_TELEGRAM_TEXT}}</a>
            <a v-if="OUR_WHATSAPP_LINK && OUR_WHATSAPP_TEXT" :href="OUR_WHATSAPP_LINK"><VIcon class="mr-8"  icon="whatsapp" size="14" color="var(--color-red)"/>  {{OUR_WHATSAPP_TEXT}}</a>
          </div>
          <p>{{OUR_BRAND_NAME_AND_CC}}</p>
        </div>
      </VCard>
    </VCard>
    <NuxtLink
      v-if="$route.name !== 'order' && !!$route.name"
      to="/order/"
      class="layout__order__btn"
    >
      Buyurtmani ko'rish
    </NuxtLink>
    <CoolLightBox
      :effect="'fade'"
      :items="images"
      :index="activeImageIndex"
      @close="$store.commit('removeImages')"
    />
  </div>
</template>

<script>
import CoolLightBox from 'vue-cool-lightbox'
import 'vue-cool-lightbox/dist/vue-cool-lightbox.min.css'
import VCard from '~/components/ui/VCard.vue'
import VIcon from '~/components/ui/VIcon.vue'
import VTag from '~/components/ui/VTag.vue'
import VInput from '~/components/ui/VInput.vue'
export default {
  name: 'DefaultLayout',
  components: { VInput, VTag, VIcon, VCard, CoolLightBox },
  data() {
    return {
      searchQuery: '',
    }
  },
  computed: {
    addressMap() {
      return this.$config.ADDRESS_MAP
    },
    addressText() {
      return this.$config.ADDRESS_TEXT
    },
    phoneText() {
      return this.$config.PHONE_NUMBER_LONG
    },
    phoneUrl() {
      return this.$config.PHONE_NUMBER_SHORT
    },
    restaurantName() {
      return this.$config.RESTAURANT_NAME
    },
    OUR_CONTACT_1() {
      return this.$config.OUR_CONTACT_1
    },
    OUR_CONTACT_1_LINK() {
      return this.$config.OUR_CONTACT_1
    },
    OUR_CONTACT_2() {
      return this.$config.OUR_CONTACT_2
    },
    OUR_CONTACT_2_LINK() {
      return this.$config.OUR_CONTACT_2
    },
    OUR_CONTACT_3() {
      return this.$config.OUR_CONTACT_3
    },
    OUR_CONTACT_3_LINK() {
      return this.$config.OUR_CONTACT_3
    },
    OUR_BRAND_NAME_AND_CC() {
      return this.$config.OUR_BRAND_NAME_AND_CC
    },
    OUR_TELEGRAM_TEXT() {
      return this.$config.OUR_TELEGRAM_TEXT
    },
    OUR_TELEGRAM_LINK() {
      return this.$config.OUR_TELEGRAM_LINK
    },
    OUR_WHATSAPP_TEXT() {
      return this.$config.OUR_WHATSAPP_TEXT
    },
    OUR_WHATSAPP_LINK() {
      return this.$config.OUR_WHATSAPP_LINK
    },
    tags() {
      return this.$store.state.tags
    },
    activeTagId() {
      return this.$store.state.activeTagId
    },
    activeImageIndex() {
      return this.$store.state.activeImageIndex
    },
    images() {
      return this.$store.state.images
    },
  },
  methods: {
    onSubmit() {
      this.$router.push(`/search/${this.searchQuery}`)
    },
    handleTagClick(tagId) {
      this.$store.dispatch('getCategories', tagId)
      this.$router.push('/')
    },
  },
}
</script>

<style scoped lang="scss">
@import '../assets/styles/layouts/default';
</style>
