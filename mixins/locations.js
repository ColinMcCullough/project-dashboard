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
    }),
    locationById(locationId) {
      return this.locations.length > 0
        ? this.locations.filter(location => location.locationId === locationId)[0]
        : {}
    },
    getLocationIndex(id) {
      return this.locations
        .findIndex(location => location.locationId === id)
    },
    async saveLocation(projectId, locationId, body) {
      await this.$axios
        .$put(`/api/v1/projects/${projectId}/locations/${locationId}`, body)
    }
  }
}
