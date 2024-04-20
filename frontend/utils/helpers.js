export const parseUrl = (path, route) => {
  const tableNumber = route.query.tableNumber

  if (tableNumber) {
    return `${path}?tableNumber=${tableNumber}`
  }

  if (path === '/') return '/'

  return path + '/'
}
