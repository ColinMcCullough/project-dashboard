<template>
  <b-card
    footer-class="d-flex justify-content-end border-0"
    footer-tag="footer"
    footer-bg-variant="white"
    no-body
    class="border-0"
    style="overflow-y: scroll; max-height: 80vh"
  >
    <div v-for="(card, index) in cards" :key="`${card.id}-${index}`">
      <b-card v-if="card.visible" header-tag="header" class="soft-shadow mb-3" style="height: 78vh">
        <template #header>
          <h4 class="mb-0 text-uppercase font-weight-bold text-gray-60">
            {{ card.title }}
          </h4>
        </template>
        <component
          :is="card.component"
          v-bind="{ existingClients }"
          @next-step="nextStep(index)"
          @previous-step="previousStep(index)"
        />
      </b-card>
    </div>
  </b-card>
</template>

<script>
import ClientIntake from '~/components/intake/client-intake'
import LocationIntake from '~/components/intake/location-intake'
import SaveIntake from '~/components/intake/save-intake'
import GlobalFunctions from '~/mixins/global-functions'
import Locations from '~/mixins/locations'
import Clients from '~/mixins/clients'

export default {
  components: { ClientIntake, LocationIntake, SaveIntake },
  mixins: [Locations, Clients, GlobalFunctions],
  data () {
    return {
      existingClients: [],
      // clients: [{
      //   clientType: 'new',
      //   urn: null,
      //   name: '',
      //   branded_name: '',
      //   city: '',
      //   state: null,
      //   country: null,
      //   domain: '',
      //   domain_type: null,
      //   vertical: null,
      //   id: null
      // }],
      err: '',
      showClient: true,
      showLocation: false,
      cards: [
        {
          id: 'clientInformation',
          title: 'Client Information',
          component: 'client-intake',
          visible: true
        },
        {
          id: 'locationInformation',
          title: 'Location Information',
          component: 'location-intake',
          visible: false
        },
        {
          id: 'save',
          title: 'Save, Crawl & Scrape ',
          component: 'save-intake',
          visible: false
        }
      ]
    }
  },
  computed: {

  },
  async mounted() {
    try {
      const res = await this.$axios
        .$get('api/v1/hub/clients')
      this.existingClients = res
    } catch (e) {
      this.err = e
    }
  },
  methods: {
    nextStep(currentIndex) {
      const nextIndex = currentIndex + 1
      this.cards[currentIndex].visible = !this.cards[currentIndex].visible
      this.cards[nextIndex].visible = !this.cards[nextIndex].visible
    },
    previousStep(currentIndex) {
      const prevIndex = currentIndex - 1
      this.cards[currentIndex].visible = !this.cards[currentIndex].visible
      this.cards[prevIndex].visible = !this.cards[prevIndex].visible
    }
  }
}
</script>

<style lang="scss">

</style>
