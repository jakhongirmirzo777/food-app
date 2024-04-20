<template>
  <ValidationProvider
    :id="vid"
    v-slot="{ errors }"
    tag="div"
    :vid="vid"
    :rules="rules"
    class="v-input"
  >
    <input
      :ref="vid"
      class="v-input__input"
      :class="{ error: errors && errors.length && errors[0] }"
      type="text"
      :placeholder="placeholder"
      :value="value"
      @input="$emit('input', $event.target.value)"
    />
    <transition name="fade">
      <span v-if="errors && errors.length && errors[0]" class="v-input__error">
        {{ errors[0] }}
      </span>
    </transition>
  </ValidationProvider>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    rules: {
      type: String,
      default: '',
    },
    vid: {
      type: String,
      required: true,
    },
  },
}
</script>

<style scoped lang="scss">
@import '../../assets/styles/ui/v-input';
</style>
