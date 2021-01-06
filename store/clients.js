export const state = () => ({
  clients: [],
  existingClients: []
})

export const getters = {}

export const actions = {
  async init({ commit }, projectId) {
    const clients = await this.$axios
      .$get(`/api/v1/projects/${projectId}/clients`)
    const existingClients = await this.$axios
      .$get('api/v1/hub/clients')
    commit('SET', { clients, existingClients })
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
  SET (state, { clients, existingClients }) {
    state.clients = clients
    state.existingClients = existingClients
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
