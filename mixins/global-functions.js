
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
      return new Date(val).toLocaleString()
    }
  }
}
