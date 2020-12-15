import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {}
  },
  computed: {
    ...mapState({
      clients: state => state.clients.clients
    })
  },
  methods: {
    ...mapActions({
      setClients: 'clients/init',
      addClient: 'clients/add',
      onUpdate: 'clients/update',
      onDelete: 'clients/delete'
    })
  }
}
