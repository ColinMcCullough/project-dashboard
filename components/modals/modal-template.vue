<template>
  <b-modal
    id="modal-template"
    :hide-footer="true"
    :title="title"
    header-bg-variant="primary"
    size="xl"
    class="better-modal"
  >
    <b-container fluid >
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
  height: calc(100vh - 40px);
  max-width: 98vw;
  & .modal-content {
    height: 100%;
  }
  & .modal-title {
    color: white;
  }
  & .modal-header .close {
    color: white;
  }
}
</style>
