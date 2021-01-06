<template>
  <b-modal
    :id="id"
    :hide-footer="true"
    size="xl"
    modal-class="better-modal"
    header-class="d-flex justify-content-between border-0 pb-0"
    no-close-on-backdrop
    hide-backdrop
  >
    <template v-slot:modal-header="{ cancel }">
      <span>
        <h2 class="text-muted text-uppercase">
          {{ title }}
        </h2>
        <p class="small">
          {{ description }}
        </p>
      </span>
      <b-button-group>
        <b-btn
          v-if="id === 'review-modal'"
          variant="secondary-60"
          class="mr-1"
          style="border-radius: 50%; width: 60px; height: 60px; transform: translate(0, -50%);"
          @click="onSave"
        >
          <b-icon-arrow-clockwise v-if="isSaving" animation="spin" font-scale="2" />
          <save-icon v-else v-bind="{ size: '2em' }" />
        </b-btn>
        <b-btn
          variant="transparent"
          style="border-radius: 50%; width: 60px; height: 60px; transform: translate(0, -50%);"
          @click="cancel"
        >
          <b-icon-x-circle-fill scale="3em" variant="error" />
        </b-btn>
      </b-button-group>
    </template>
    <slot />
  </b-modal>
</template>

<script>
import Locations from '~/mixins/locations'
export default {
  mixins: [Locations],
  props: {
    title: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      default: 'default-modal'
    }
  },
  data () {
    return {
      isSaving: false
    }
  },
  computed: {},
  methods: {
    hide() {
      this.$bvModal.hide(this.id)
    },
    async onSave() {
      this.isSaving = true
      for (let i = 0; i < this.locations.length; i++) {
        const location = this.locations[i]
        if (location.edited === true) {
          const { locationId, properties } = location
          const locIdx = this.getLocationIndex(locationId)
          await this.saveLocation(this.projectId, locationId, { properties })
          this.updateLocation({ locIdx, key: 'edited', val: false })
        }
      }
      this.isSaving = false
      this.hide()
    }
  }
}
</script>

<style lang="scss">
.better-modal {
  bottom: 0;
  overflow-y: hidden;
  & .modal-dialog {
    height: calc(100vh - 60px);
    max-width: 98vw;
    & .modal-content {
      height: 100%;
    }
    & .close {
      padding: .25rem .5rem !important;
      font-size: 3rem;
      line-height: inherit;
    }
    & .modal-title {
      color: white;
      font-weight: 800;
      font-size: 2.0rem;
    }
    & .modal-header .close {
      color: white;
    }
  }
}

</style>
