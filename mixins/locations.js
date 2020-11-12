import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {}
  },
  computed: {
    ...mapState({
      locations: state => state.locations.locations
    })
  },
  methods: {
    ...mapActions({
      setLocations: 'locations/set',
      updateLocationProp: 'locations/updateLocationProp'
    })
  }
}
