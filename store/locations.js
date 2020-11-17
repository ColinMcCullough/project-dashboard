const scrapeDetails = require('./../mixins/asset-scraper')
export const state = () => ({
  locations: [],
  projectId: null
})
export const getters = {}

export const actions = {
  async set({ commit }, projectId) {
    const locations = await this.$axios
      .$get(`/api/v1/projects/${projectId}/locations`)
    const updatedLoc = locations.map(obj => ({ ...obj, edited: 'false', validUrls: false, ...scrapeDetails }))
    commit('SET', { locations: updatedLoc, projectId })
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
  SET(state, { locations, projectId }) {
    state.locations = locations
    state.projectId = projectId
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
