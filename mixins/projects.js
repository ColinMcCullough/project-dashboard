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
      updateProject: 'projects/update'
      // updateLocProp: 'selectedLocation/UPDATE_PROP'
    })
  }
}
