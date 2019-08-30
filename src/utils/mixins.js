import moment from 'moment'

export const fromNowFilter = {
  filters: {
    fromNow(datetime) {
      return datetime ? moment(datetime).fromNow() : '-'
    }
  }
}

export const dateTimeFilter = {
  filters: {
    dateTime(time) {
      return time ? moment(time).format('YYYY-MM-DD') : '-'
    }
  }
}

export const detailedTimeFilter = {
  filters: {
    detailedTime(time) {
      return time ? moment(time).format('YYYY-MM-DD HH:MM:SS') : '-';
    }
  }
}

export const currencyFilter = {
  filters: {
    currency(num) {
      const n = Number(num)
      return `$${n.toFixed(0).replace(/./g, (c, i, a) => {
        const currency = i && c !== '.' && (a.length - i) % 3 === 0 ? `, ${c}`.replace(/\s/g, '') : c
        return currency
      })}`
    }
  }
}

export const emptyImageFilter = {
  filters: {
    emptyImage(src) {
      return src || 'http://via.placeholder.com/300x300?text=No+Image'
    }
  }
}