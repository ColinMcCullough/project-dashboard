<template>
  <b-modal
    :id="id"
    :hide-footer="true"
    size="xl"
    modal-class="better-modal"
    header-class="d-flex justify-content-between border-0"
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
          v-if="id === 'scrape-modal'"
          variant="success-1"
          pill
          class="mr-3"
          @click="onSave"
        >
          <save :size="'2em'" />
        </b-btn>
        <b-btn
          variant="transparent"
          pill
          @click="cancel"
        >
          <b-icon-x-circle-fill scale="3em" shift-v="16" variant="tertiary-1" />
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
      default: 'An explanation about the state of things.'
    },
    id: {
      type: String,
      default: 'default-modal'
    }
  },
  data () {
    return {
      saving: false
    }
  },
  computed: {},
  methods: {
    hide() {
      this.$bvModal.hide(this.id)
    },
    onSave() {
      this.saving = true
      setTimeout(() => { this.saving = false }, 3000)
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
