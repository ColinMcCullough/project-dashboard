import { scrapeDetails } from './../mixins/asset-scraper'
export const state = () => ({
  locations: [],
  projectId: null,
  selectedLocation: null
})
export const getters = {}

export const actions = {
  async init({ commit }, projectId) {
    try {
      const locations = await this.$axios
        .$get(`/api/v1/projects/${projectId}/locations`)
      const updatedLoc = locations.map((obj) => {
        const details = JSON.parse(JSON.stringify(scrapeDetails))
        return {
          ...obj,
          edited: false,
          validUrls: false,
          ...details
        }
      })
      commit('INIT', { locations: updatedLoc, projectId })
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log()
    }
  },
  set({ commit }, payload) {
    commit('SET', payload)
  },
  updateAmenity({ commit }, data) {
    commit('UPDATE_AMENITY', data)
  },
  addAmenity({ commit }, data) {
    commit('ADD_AMENITY', data)
  },
  deleteAmenity({ commit }, data) {
    commit('DELETE_AMENITY', data)
  },
  updateScraper({ commit }, data) {
    commit('UPDATE_SCRAPER_PROP', data)
  },
  updateTemplate({ commit }, data) {
    commit('UPDATE_TEMPLATE_PROP', data)
  },
  updateLocationProp({ commit }, data) {
    commit('UPDATE_LOCATION_PROP', data)
  },
  updateLocation({ commit }, data) {
    commit('UPDATE_LOCATION', data)
  }
}

export const mutations = {
  INIT(state, { locations, projectId }) {
    state.locations = locations
    state.selectedLocation = locations[0]
    state.projectId = projectId
  },
  SET (state, obj) {
    const keys = Object.keys(obj)
    // eslint-disable-next-line no-return-assign
    keys.forEach(key => state[key] = obj[key])
  },
  UPDATE_AMENITY(state, { locIdx, index, key, val }) {
    state.locations[locIdx].properties.amenities[index][key] = val
  },
  ADD_AMENITY(state, { locIdx }) {
    state.locations[locIdx].properties.amenities.push({ type: null, value: null })
  },
  DELETE_AMENITY(state, { locIdx, index }) {
    state.locations[locIdx].properties.amenities.splice(index, 1)
  },
  UPDATE_LOCATION(state, { locIdx, key, val }) {
    state.locations[locIdx][key] = val
  },
  UPDATE_LOCATION_PROP(state, { locIdx, key, val }) {
    state.locations[locIdx].properties[key] = val
  },
  UPDATE_SCRAPER_PROP(state, { locIdx, key, val }) {
    state.locations[locIdx].scrapers[key] = val
  },
  UPDATE_TEMPLATE_PROP(state, { locIdx, key, val }) {
    state.locations[locIdx].template[key] = val
  }
}
