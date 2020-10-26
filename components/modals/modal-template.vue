<template>
  <b-modal
    id="modal-template"
    :hide-footer="true"
    size="xl"
    class="better-modal"
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
      <b-btn
        variant="transparent"
        pill
        @click="cancel"
      >
        <b-icon-x-circle-fill scale="3em" shift-v="16" variant="tertiary-1" />
      </b-btn>
    </template>
    <b-container fluid>
      <slot />
    </b-container>
  </b-modal>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: 'An explanation about the state of things.'
    }
  },
  data () {
    return {}
  },
  computed: {},
  methods: {
    onSave() {
    },
    hide() {
      this.$bvModal.hide('modal-template')
    }
  }
}
</script>

<style lang="scss">
.better-modal {
  bottom: 0;
  overflow-y: hidden;
}
.modal-dialog {
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
</style>
