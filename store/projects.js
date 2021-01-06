export const state = () => ({
  projects: []
})

export const getters = {}

export const actions = {
  async init({ commit }) {
    const projects = await this.$axios
      .$get('api/v1/projects')
    commit('SET', { projects })
  },
  async update({ commit }, id) {
    const project = await this.$axios
      .$get(`api/v1/projects/${id}`)
    commit('UPDATE', project)
  }
}

export const mutations = {
  SET (state, val) {
    state.projects = val.projects
  },
  UPDATE (state, payload) {
    console.log(payload)
    const i = state.projects.findIndex(project => project.id === payload.id)
    state.projects[i] = payload
  }
}
