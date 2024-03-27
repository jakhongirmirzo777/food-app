<template>
  <div class="layout__wrapper">
    <VCard background-color="var(--color-red)" class="layout__box">
      <NuxtLink v-if="$route.path !== '/'" to="/" class="layout__back__btn">
        <VIcon icon="arrow-left" size="16" color="var(--color-black)" />
      </NuxtLink>
      <div class="d-flex justify-center py-20">
        <NuxtLink to="/">
          <img class="layout__logo" src="/logo.jpeg" alt="logo" />
        </NuxtLink>
      </div>
      <VCard
        class="layout__body"
        radius="24px 24px 0 0"
        padding="24px 16px 0 16px"
      >
        <div class="layout__info mb-16">
          <h1>Turka Saray</h1>
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
        <div class="layout__tags">
          <VTag
            v-for="tag in tags"
            :key="tag.id"
            :active="tag.id === search.tag"
            @click.native="search.tag = tag.id"
          >
            {{ tag.title }}
          </VTag>
        </div>
        <ValidationObserver
          v-if="$route.path === '/'"
          v-slot="{ handleSubmit }"
          ref="formRef"
          class="layout__search__wrapper"
          tag="div"
        >
          <form class="layout__search" @submit.prevent="handleSubmit(onSubmit)">
            <VInput
              v-model="search.query"
              class="layout__search__input"
              placeholder="Qidiruv"
              vid="search"
              rules="required"
            />
            <button class="layout__search__btn" type="submit">
              <VIcon icon="search" size="16" color="#4c4c4c" />
            </button>
          </form>
        </ValidationObserver>
        <Nuxt />
      </VCard>
    </VCard>
    <NuxtLink to="/" class="layout__order__btn">Buyurtmani ko'rish</NuxtLink>
  </div>
</template>

<script>
import VCard from '~/components/ui/VCard.vue'
import VIcon from '~/components/ui/VIcon.vue'
import VTag from '~/components/ui/VTag.vue'
import VInput from '~/components/ui/VInput.vue'

export default {
  name: 'DefaultLayout',
  components: { VInput, VTag, VIcon, VCard },
  data() {
    return {
      tags: [],
      search: {
        tag: '',
        query: '',
      },
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
  },
  created() {
    this.fetchTags()
  },
  methods: {
    async fetchTags() {
      const { data } = await this.$axios.get('/tags')
      this.tags = data
      this.search.tag = this.tags?.[0]?.id
    },
    onSubmit() {
      console.log('111')
    },
  },
}
</script>

<style scoped lang="scss">
@import '../assets/styles/layouts/default';
</style>
