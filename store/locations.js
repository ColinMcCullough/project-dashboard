export const state = () => ({
  locations: [],
  projectId: null
})
export const getters = {}

export const actions = {
  async set({ commit }, projectId) {
    const locations = await this.$axios
      .$get(`/api/v1/projects/${projectId}/locations`)
    const updatedLoc = locations.map(obj => ({ ...obj, edited: 'false' }))
    commit('SET', { locations: updatedLoc, projectId })
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
  }
}
