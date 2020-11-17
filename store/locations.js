import { scrapeDetails } from './../mixins/asset-scraper'
export const state = () => ({
  locations: [],
  projectId: null
})
export const getters = {}

export const actions = {
  async set({ commit }, projectId) {
    try {
      const locations = await this.$axios
        .$get(`/api/v1/projects/${projectId}/locations`)
      const updatedLoc = locations.map((obj) => {
        const details = JSON.parse(JSON.stringify(scrapeDetails))
        return {
          ...obj,
          edited: 'false',
          validUrls: false,
          ...details
        }
      })
      commit('SET', { locations: updatedLoc, projectId })
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log()
    }
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
