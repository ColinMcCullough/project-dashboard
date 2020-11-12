export const state = () => ({
  projects: []
})
export const getters = {}
export const actions = {
  async init({ commit }) {
    const projects = await this.$axios
      .$get('api/v1/projects')
    commit('SET', { projects })
  }
}
export const mutations = {
  SET(state, val) {
    state.projects = val.projects
  }
}
