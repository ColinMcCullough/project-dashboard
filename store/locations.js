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
  updatePropArrayObject({ commit }, data) {
    commit('UPDATE_PROP_ARR_OBJ', data)
  },
  updatePropArrayIndex({ commit }, data) {
    commit('UPDATE_PROP_ARR_IDX', data)
  },
  addItem({ commit }, data) {
    commit('ADD_ITEM', data)
  },
  deletePropArrByIndex({ commit }, data) {
    commit('DELETE_PROP_ARR_BY_INDEX', data)
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
  UPDATE_PROP_ARR_OBJ(state, { locIdx, prop, index, key, val }) {
    state.locations[locIdx].properties[prop][index][key] = val
  },
  UPDATE_PROP_ARR_IDX(state, { locIdx, prop, index, val }) {
    state.locations[locIdx].properties[prop][index] = val
  },
  ADD_ITEM(state, { locIdx, prop, val }) {
    state.locations[locIdx].properties[prop].push(val)
  },
  DELETE_PROP_ARR_BY_INDEX(state, { locIdx, prop, index }) {
    state.locations[locIdx].properties[prop].splice(index, 1)
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
