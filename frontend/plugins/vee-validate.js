import Vue from 'vue'
import {
  ValidationProvider,
  ValidationObserver,
  extend,
  configure,
} from 'vee-validate'
import { required, length } from 'vee-validate/dist/rules'

const validation = {
  required: "Ushbu qator to'ldirilishi shart",
  length: "To'g'ri telefon raqam kiriting",
}

export default function ({ app }) {
  configure({
    defaultMessage: (field, values) => {
      values._field_ = field
      return validation[values._rule_]
    },
  })
}

extend('required', required)
extend('length', length)

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
