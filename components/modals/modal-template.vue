<template>
  <b-modal
    id="modal-template"
    :hide-footer="true"
    :title="title"
    header-bg-variant="success-1"
    size="xl"
    class="better-modal"
    no-close-on-backdrop
  >
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
