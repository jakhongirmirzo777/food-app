export const formatNumber = (num, locale = 'ru-RU') => {
  if (!num) return 0

  return Intl.NumberFormat(locale).format(num)
}
