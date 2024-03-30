import Vue from 'vue';

export default ({app}) => {
  Vue.filter('$formatMoney', (number, n = 0, x = 0) => {
    if (!number) return ''
    if (`${number}`.length < 8) return (+number).toFixed(0)
    const re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
    return Number(number).toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&.');
  })

  Vue.filter('$formatMoneyWithSpace', (price) => {
    if (!isNaN(+parseInt(price))) {
      const money = parseInt(price).toString().split('').reverse()
      const parsedMoney = []
      let everyThird = []
      money.forEach((m, i) => {
        if (i % 3 === 0) {
          parsedMoney.push(everyThird.reverse().join(''))
          everyThird = []
        }
        everyThird.push(m)
      })
      parsedMoney.push(everyThird.reverse().join(''))
      everyThird = []
      return parsedMoney.reverse().join(' ')
    }
    return ''
  })

  Vue.filter('$formatDate', (d) => {
    if (!d.length) return ''
    const parsedDate = d.substr(0, 10).split('.').reverse().join('-')
    const date = new Date(parsedDate)
    const day = date.getDate()
    const month = date.getMonth()
    const year = date.getFullYear()
    return `${day} ${app.i18n.t(`months.${month}`)} ${year}`
  })
};

