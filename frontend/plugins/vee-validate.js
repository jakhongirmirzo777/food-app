import Vue from 'vue'
import {
  ValidationProvider,
  ValidationObserver,
  extend,
  configure,
} from 'vee-validate'
import { required } from 'vee-validate/dist/rules'

const validation = {
  required: "Ushbu qator to'ldirilishi shart",
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

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
