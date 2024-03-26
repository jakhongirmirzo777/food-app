<template>
  <div class="layout__wrapper">
    <VCard background-color="var(--color-red)">
      <div class="d-flex justify-center pa-16">
        <NuxtLink to="/">
          <img class="layout__logo" src="/logo.jpeg" alt="logo" />
        </NuxtLink>
      </div>
      <VCard
        class="layout__body"
        radius="24px 24px 0 0"
        padding="24px 16px 0 16px"
      >
        <Nuxt />
      </VCard>
    </VCard>
  </div>
</template>

<script>
import VCard from '~/components/ui/VCard.vue'

export default {
  name: 'DefaultLayout',
  components: { VCard },
}
</script>

<style scoped lang="scss">
@import '../assets/styles/layouts/default.scss';
</style>
