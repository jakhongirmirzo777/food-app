<template>
  <div class="v-card" :style="cardStyle">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'VCard',
  props: {
    radius: {
      type: String,
      default: '0px',
    },
    padding: {
      type: String,
      default: '0px',
    },
    backgroundColor: {
      type: String,
      default: 'var(--color-white)',
    },
  },
  computed: {
    cardStyle() {
      return {
        borderRadius: this.radius,
        padding: this.padding,
        backgroundColor: this.backgroundColor,
      }
    },
  },
}
</script>

<style scoped lang="scss">
@import '../../assets/styles/ui/v-card';
</style>
