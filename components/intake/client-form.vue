<template>
  <div>
    <div v-for="(fieldArr, i) in fields" :key="`arr-${i}`">
      <b-row>
        <b-col v-for="(field, idx) in fieldArr" :key="`${field.id}-${idx}`" class="px-1 col-sm-12 col-lg">
          <b-form-group
            v-if="dependencyMet(client, field)"
            :label="showLabel(client, field) ? field.label : ''"
            label-class="text-uppercase text-gray font-weight-bold"
            class="mr-2"
            style="flex: 1 1 auto;"
          >
            <component
              :is="field.type"
              :value="client[field.id]"
              :disabled="client.urn !== null"
              :options="typeof field.options === 'function'
                ? field.options(client, index) : field.options"
              :placeholder="field.placeholder"
              :state="field.validator(client[field.id], client)"
              @input="onUpdate({ index, key: field.id, val: $event })"
            />
            <b-form-invalid-feedback :state="field.validator(client[field.id], client)">
              {{ field.feedback }}
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>
      </b-row>
    </div>
  </div>
</template>
<script>
import States from '~/mixins/states'
import Clients from '~/mixins/clients'
export default {
  mixins: [Clients, States],
  props: {
    client: {
      type: Object,
      default() {
        return {}
      }
    },
    index: {
      type: Number,
      default() {
        return 0
      }
    }
  },
  data () {
    return {
      fields: [
        [{
          type: 'b-form-select',
          id: 'domain_type',
          options: [
            { value: null, text: 'Select Domain Strategy' },
            { value: 'SingleDomainClient', text: 'Single Domain' },
            { value: 'MultiDomainClient', text: 'Multi Domain' }
          ],
          label: 'Domain Type',
          validator: val => val !== null,
          feedback: ''
        },
        {
          type: 'b-form-input',
          label: 'Naked Domain',
          id: 'domain',
          placeholder: 'ex. mydomain.com',
          dependentOn: 'domain_type',
          validator: val => this.validNakedDomain(val),
          showIf: val => val === 'SingleDomainClient',
          feedback: 'Must be formatted as naked domain'
        }],
        [{
          type: 'b-form-select',
          options: [
            { value: null, text: 'Select Vertical' },
            { value: 'Self-Storage', text: 'Self Storage' },
            { value: 'Apartments', text: 'Multi Family' },
            { value: 'Senior-Living', text: 'Senior Living' }
          ],
          id: 'vertical',
          label: 'Vertical',
          validator: val => val !== null,
          feedback: ''
        }],
        [{
          type: 'b-form-input',
          label: 'Client Name',
          id: 'name',
          placeholder: 'ex. My Community',
          validator: (val, client) => this.validateName(val, client),
          feedback: 'Enter unique client name'
        },
        {
          type: 'b-form-input',
          label: 'Branded Name',
          id: 'branded_name',
          placeholder: 'ex. My Community 1',
          validator: val => val !== '',
          feedback: ''
        }],
        [{
          type: 'b-form-input',
          label: 'City',
          id: 'city',
          placeholder: 'ex. Portland',
          validator: val => val !== '',
          feedback: ''
        },
        {
          type: 'b-form-select',
          options: [
            { value: null, text: 'Select Country' },
            { value: 'US', text: 'United States' },
            { value: 'CA', text: 'Canada' }
          ],
          label: 'Country',
          id: 'country',
          validator: val => val !== null,
          feedback: ''
        },
        {
          type: 'b-form-select',
          label: 'State',
          options: (client, index) => this.getStates(client, index),
          id: 'state',
          validator: val => val !== null,
          feedback: ''
        }]
      ]
    }
  },
  methods: {
    validateName(val, client) {
      let valid = true
      if (client.clientType === 'new') {
        const names = this.clients.map(client => client.name)
        if (this.hasDuplicates(names) || !val) {
          valid = false
        }
      }
      return valid
    },
    hasDuplicates(arr) {
      return (new Set(arr)).size !== arr.length
    },
    validNakedDomain(str) {
      const regex = /^(?!:\/\/)*[a-zA-Z0-9][a-zA-Z0-9-_]+\.[a-zA-Z]{2,11}?$/ig
      return regex.test(str)
    },
    getStates(client, index) {
      const country = this.clients[index].country
      return country === 'US' || country === 'CA'
        ? this[country].options
        : [{ value: null, text: 'Select Country for States' }]
    },
    showLabel(client, field) {
      let val = true
      if (field.dependentOn && !this.dependencyMet(client, field)) {
        val = false
      }
      return val
    },
    dependencyMet(client, field) {
      let val = false
      if (!field.dependentOn) {
        val = true
      } else {
        const dependentValue = client[field.dependentOn]
        const dependencyMet = field.showIf(dependentValue)
        if (dependencyMet) {
          val = true
        }
      }
      return val
    }
  }
}
</script>

<style lang="scss">
.form-control:disabled {
  opacity: .7;
}
</style>
