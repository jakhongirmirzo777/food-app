<template>
  <div role="button" class="v-tag" :class="{ active: active }">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'VTag',
  props: {
    active: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style scoped lang="scss">
@import '../../assets/styles/ui/v-tag';
</style>
