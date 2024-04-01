<template>
  <div class="error__layout">
    <h1>Hech narsa topilmadi</h1>
    <button class="error__btn" type="button" @click="$router.push('/')">
      Asosiy menuga qaytish
    </button>
  </div>
</template>

<script>
export default {
  name: 'ErrorLayout',
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/layouts/error';
</style>
