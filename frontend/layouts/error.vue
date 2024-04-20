<template>
  <div class="error__layout">
    <h1>Hech narsa topilmadi</h1>
    <button
      class="error__btn"
      type="button"
      @click="$router.push(parseUrl('/', $route))"
    >
      Asosiy menuga qaytish
    </button>
  </div>
</template>

<script>
import { parseUrl } from '~/utils/helpers'

export default {
  name: 'ErrorLayout',
  methods: { parseUrl },
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/layouts/error';
</style>
