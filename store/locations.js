export const state = () => ({
  locations: []
})
export const getters = {}
export const actions = {
  async set({ commit }, projectId) {
    const locations = await this.$axios
      .$get(`/api/v1/projects/${projectId}/locations`)
    commit('SET', locations)
  },
  updateLocationProp({ commit }, data) {
    commit('UPDATE_LOCATION_PROP', data)
  }
}
export const mutations = {
  SET(state, val) {
    state.locations = val
  },
  UPDATE_LOCATION_PROP(state, { locIdx, key, val }) {
    state.locations[locIdx].properties[key] = val
  }
}
