import { ROLES } from 'src/utils/constants/roles'
import CategoriesCRUD from 'src/views/categories/CategoriesCRUD'

const CategoriesPage = () => {
  return <CategoriesCRUD />
}

// Roles
CategoriesPage.getRole = () => ROLES.SUPER_ADMIN

export default CategoriesPage
