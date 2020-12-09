import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {}
  },
  computed: {
    ...mapState({
      locations: state => state.locations.locations,
      projectId: state => state.locations.projectId,
      selectedLocation: state => state.locations.selectedLocation
    })
  },
  methods: {
    ...mapActions({
      setSelectedLocation: 'locations/set',
      setLocations: 'locations/init',
      updateLocationProp: 'locations/updateLocationProp',
      updateScraper: 'locations/updateScraper',
      updateTemplate: 'locations/updateTemplate',
      updateLocation: 'locations/updateLocation'
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
    updateOnIndex({ locIdx, key, val }, edited = false) {
      this.updateLocationProp({ locIdx, key, val })
      if (edited) {
        this.updateLocation({ locIdx, key: 'edited', val: true })
      }
    },
    async saveLocation (projectId, locationId, body) {
      await this.$axios
        .$put(`/api/v1/projects/${projectId}/locations/${locationId}`, body)
    },
    async saveLocations (projectId, locations) {
      await this.$axios
        .$put(`/api/v1/projects/${projectId}/locations`, locations)
    }
  }
}
