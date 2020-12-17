<template>
  <div>
    <div v-for="(card, index) in cards" :key="`${card.id}-${index}`">
      <b-card
        v-if="card.visible"
        header-tag="header"
        class="soft-shadow mb-3"
        style="height: 78vh;"
      >
        <template #header>
          <h4 class="mb-0 text-uppercase font-weight-bold">
            {{ card.title }}
          </h4>
        </template>
        <component
          :is="card.component"
          @next-step="nextStep(index)"
          @previous-step="previousStep(index)"
        />
      </b-card>
    </div>
  </div>
</template>

<script>
import ClientIntake from '~/components/intake/client-intake'
import LocationIntake from '~/components/intake/location-intake'
import SaveIntake from '~/components/intake/save-intake'

export default {
  components: { ClientIntake, LocationIntake, SaveIntake },
  data () {
    return {
      err: '',
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
.soft-shadow {
  box-shadow: 0 5px 20px 0 rgba(10, 10, 10, 0.2);
  &.card {
    border-radius: 10px;
  }
}
</style>
