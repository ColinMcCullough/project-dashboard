export const state = () => ({
  clients: []
})

export const getters = {}

export const actions = {
  async init({ commit }, projectId) {
    const clients = await this.$axios
      .$get(`/api/v1/projects/${projectId}/clients`)
    commit('SET', clients)
  },
  add({ commit }, client) {
    commit('ADD', client)
  },
  update({ commit }, data) {
    commit('UPDATE', data)
  },
  delete({ commit }, data) {
    commit('DELETE', data)
  }
}

export const mutations = {
  SET (state, clients) {
    state.clients = clients
  },
  ADD (state, client) {
    state.clients.push(client)
  },
  UPDATE (state, { index, key, val }) {
    state.clients[index][key] = val
  },
  DELETE (state, index) {
    state.clients.splice(index, 1)
  }
}
