<template>
  <div>
    <b-row class="p-3">
      <b-col>
        <b-button class="rounded" :disabled="clients.length >=6" @click="onAdd">
          Add Client
          <b-icon-plus />
        </b-button>
      </b-col>
    </b-row>
    <b-row class="p-3">
      <b-col>
        <b-card-group deck>
          <b-card v-for="(client, index) in clients" :key="`client-${index}`" header-tag="header" footer-tag="footer">
            <template #header>
              <h6 class="mb-0">
                New Client
              </h6>
            </template>
            <!-- form area starts-->
            <b-form-group label="Choose a client type">
              <b-form-radio-group
                id="client-type"
                :value="client.clientType"
                :options="options"
                buttons
                button-variant="outline-primary"
                size="sm"
                name="radio-btn-outline"
                @change="resetClient($event, index)"
              />
            </b-form-group>
            <!-- new client form -->
            <div v-if="client.clientType === 'new'">
              <b-row v-for="(field, i) in fields" :key="`${field.id}-${i}`">
                <b-col>
                  <b-form-group
                    :label="showLabel(client, field) ? field.label : ''"
                    label-class="text-uppercase text-gray font-weight-bold"
                    class="mr-2"
                    style="flex: 1 1 auto;"
                  >
                    <b-form-input
                      v-if="field.type === 'input' && !field.dependentOn"
                      v-model="client[field.id]"
                      :placeholder="field.placeholder"
                    />
                    <b-form-select
                      v-if="field.type === 'select' && !field.dependentOn"
                      v-model="client[field.id]"
                      :options="field.options"
                    />
                    <b-form-select
                      v-if="field.dependentOn && dependencyMet(client, field)"
                      v-model="client[field.id]"
                      :options="field.options"
                    />
                  </b-form-group>
                </b-col>
              </b-row>
            </div>
            <!-- new client form -->
            <!-- esisting client form -->
            <div v-if="client.clientType === 'existing'">
              <vue-multiselect
                :value="client"
                :options="existingClients"
                placeholder="Search"
                track-by="urn"
                label="name"
                @select="onClientSelect($event, index)"
              >
                <template v-slot:option="{ option }">
                  <b>
                    {{ option.name }}]
                  </b>
                  <p class="text-muted small mb-0">
                    {{ option.brandedName }}
                  </p>
                  <p class="text-muted small mb-0">
                    {{ option.urn }}
                  </p>
                </template>
              </vue-multiselect>
            </div>
            <!-- esisting client form -->
            <!-- form area ends-->
            <template #footer>
              <b-button class="rounded" size="sm" variant="danger" @click="onDelete(index)">
                Remove Client
                <b-icon-dash />
              </b-button>
            </template>
          </b-card>
        </b-card-group>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import VueMultiselect from 'vue-multiselect'
export default {
  components: { VueMultiselect },
  mixins: [],
  props: {
    existingClients: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data () {
    return {
      clients: [],
      selected: null,
      options: [
        { text: 'New Client', value: 'new' },
        { text: 'Existing Client', value: 'existing' }
      ],
      fields: [
        {
          type: 'select',
          id: 'domain_type',
          options: ['SingleDomainClient', 'MultiDomainClient'],
          label: 'Domain Type'
        },
        {
          type: 'select',
          options: ['Self-Storage', 'Apartments', 'Senior-Living'],
          id: 'vertical',
          label: 'Vertical'
        },
        {
          type: 'input',
          options: ['US', 'CA'],
          label: 'Naked Domain',
          id: 'naked_domain',
          dependentOn: 'domain_type',
          showIf: val => val === 'SingleDomainClient'
        },
        {
          type: 'input',
          label: 'Client Name',
          id: 'name',
          placeholder: 'ex. My Community'
        },
        {
          type: 'input',
          label: 'Branded Name',
          id: 'branded_name',
          placeholder: 'ex. My Community 1'
        },
        {
          type: 'input',
          label: 'City',
          id: 'city',
          placeholder: 'ex. Portland'
        },
        {
          type: 'select',
          options: ['US', 'CA'],
          label: 'Country',
          id: 'country'
        },
        {
          type: 'select',
          label: 'State',
          options: ['OK', 'SK', 'OR'],
          id: 'state',
          dependentOn: 'country',
          showIf: val => val
        }
      ]
    }
  },
  computed: {
  },
  methods: {
    showLabel(client, field) {
      let val = true
      if (field.dependentOn && !this.dependencyMet(client, field)) {
        val = false
      }
      return val
    },
    dependencyMet(client, field) {
      let val = false
      const dependentValue = client[field.dependentOn]
      console.log(dependentValue)
      if (field.showIf(dependentValue)) {
        val = true
      }
      return val
    },
    resetClient(value, index) {
      const entries = Object.entries(this.newClient())
      for (const [key, val] of entries) {
        if (key === 'clientType') {
          this.clients[index][key] = value
        } else { this.clients[index][key] = val }
      }
    },
    newClient() {
      return {
        clientType: null,
        urn: null,
        name: '',
        branded_name: '',
        city: '',
        state: '',
        country: '',
        naked_domain: '',
        domain_type: '',
        vertical: ''
      }
    },
    onAdd() {
      const client = this.newClient()
      this.clients.push(client)
    },
    onClientSelect(client, index) {
      const { urn, name, brandedName } = client
      this.clients[index].urn = urn
      this.clients[index].name = name
      this.clients[index].branded_name = brandedName
      // cons t entries = client.entries
      // entries.forEach(([key, val]) => {
      //   console.log(key, val)
      // })
    },
    onDelete(index) {
      this.clients.splice(index, 1)
    }
  }
}
</script>
<style lang="scss">

</style>
