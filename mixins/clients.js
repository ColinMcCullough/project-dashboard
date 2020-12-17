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
    newClient () {
      return {
        urn: null,
        name: '',
        branded_name: '',
        city: '',
        state: null,
        country: null,
        domain: '',
        domain_type: null,
        vertical: null,
        id: null,
        isAssociated: false,
        clientType: 'new'
      }
    },
    resetClient (value, index) {
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
