import { Skeleton } from '@mui/material'

// ** Custom Menu Components
import VerticalNavLink from './VerticalNavLink'
import VerticalNavSectionTitle from './VerticalNavSectionTitle'

import { useRole } from 'src/layouts/useRole'

const resolveNavItemComponent = item => {
  if (item.sectionTitle) return VerticalNavSectionTitle

  return VerticalNavLink
}

const VerticalNavItems = props => {
  // ** Props
  const { verticalNavItems } = props

  const validateRole = useRole()

  const RenderMenuItems = verticalNavItems?.map((item, index) => {
    const hasAccess = validateRole(item.role)

    const TagName = resolveNavItemComponent(item)

    return hasAccess ? <TagName {...props} key={index} item={item} /> : null
  })

  return <>{RenderMenuItems}</>
}

export default VerticalNavItems
