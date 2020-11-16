export const state = () => ({
  location: null
})
export const getters = {}

export const actions = {
  set({ commit }, location) {
    commit('SET', location)
  }
}

export const mutations = {
  SET(state, location) {
    state.location = location
  }
}
