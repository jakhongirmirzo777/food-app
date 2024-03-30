import { ROLES } from 'src/utils/constants/roles'

// ** Icon imports
import TagArrowDown from 'mdi-material-ui/TagArrowDown'
import FoodForkDrink from 'mdi-material-ui/FoodForkDrink'
import Cart from 'mdi-material-ui/Cart'
import AccountMultiple from 'mdi-material-ui/AccountMultiple'
import Shape from 'mdi-material-ui/Shape'

const navigation = () => {
  return [
    {
      title: 'Buyurtmalar',
      icon: Cart,
      path: '/'
    },
    {
      title: 'Categoriyalar',
      icon: Shape,
      path: '/categories',
      role: ROLES.SUPER_ADMIN
    },
    {
      title: 'Taomlar',
      icon: FoodForkDrink,
      path: '/meals',
      role: ROLES.SUPER_ADMIN
    },
    {
      title: 'Teglar',
      icon: TagArrowDown,
      path: '/tags',
      role: ROLES.SUPER_ADMIN
    },
    {
      title: 'Adminlar',
      icon: AccountMultiple,
      path: '/admins',
      role: ROLES.SUPER_ADMIN
    }
  ]
}

export default navigation
