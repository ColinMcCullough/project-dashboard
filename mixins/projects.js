import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {}
  },
  computed: {
    ...mapState({
      projects: state => state.projects.projects
    })
  },
  methods: {
    ...mapActions({
      // updateLocProp: 'selectedLocation/UPDATE_PROP'
    })
  }
}
