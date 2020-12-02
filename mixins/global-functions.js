
export default {
  data () {
    return {}
  },
  computed: {
  },
  methods: {
    titleCase(str) {
      return str.replace(/_/g, ' ').toLowerCase().split(' ').map((word) => {
        return (`${word.charAt(0).toUpperCase()}${word.slice(1)}`)
      }).join(' ')
    },
    processTime(val) {
      const date = new Date(val)
      return new Intl.DateTimeFormat('en-US').format(date)
    },
    validURL(string) {
      let url
      try {
        url = new URL(string)
      } catch (err) {
        return false
      }
      const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i') // fragment locator
      return !!pattern.test(string) && (url.protocol === 'http:' || url.protocol === 'https:')
    }
  }
}
