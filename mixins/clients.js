import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {}
  },
  computed: {
    ...mapState({
      clients: state => state.clients.clients,
      existingClients: state => state.clients.existingClients
    })
  },
  methods: {
    ...mapActions({
      setClients: 'clients/init',
      addClient: 'clients/add',
      onUpdate: 'clients/update',
      onDelete: 'clients/delete'
    }),
    resetClient (value, index) {
      // this.$emit('reset-client', { value, index })
      const entries = Object.entries(this.newClient())
      for (const [key, val] of entries) {
        if (key === 'clientType') {
          if (typeof value !== 'object') {
            this.onUpdate({ index, key, val: value })
          }
        } else {
          this.onUpdate({ index, key, val })
        }
      }
    }
  }
}
