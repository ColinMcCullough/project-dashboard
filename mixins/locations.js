import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {}
  },
  computed: {
    ...mapState({
      locations: state => state.locations.locations,
      projectId: state => state.locations.projectId
    })
  },
  methods: {
    ...mapActions({
      setLocations: 'locations/set',
      updateLocationProp: 'locations/updateLocationProp',
      updateLocation: 'locations/updateLocation'
    }),
    locationById(locationId) {
      return this.locations.length > 0
        ? this.locations.filter(location => location.locationId === locationId)[0]
        : {}
    },
    onUpdate({ locIdx, key, val }) {
      this.updateLocationProp({ locIdx, key, val })
      if (key !== 'url') {
        this.updateLocation({ locIdx, key: 'edited', val: true })
      }
    },
    getLocationIndex(id) {
      return this.locations
        .findIndex(location => location.locationId === id)
    },
    async saveLocation(projectId, locationId, body) {
      await this.$axios
        .$put(`/api/v1/projects/${projectId}/locations/${locationId}`, body)
    },
    async saveLocations(projectId, locations) {
      // eslint-disable-next-line no-console
      console.log(projectId)
      // eslint-disable-next-line no-console
      console.log(locations)
      await this.$axios
        .$put(`/api/v1/projects/${projectId}/locations`, locations)
    }
  }
}
