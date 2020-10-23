<template>
  <b-modal
    id="modal-template"
    :hide-footer="true"
    :title="title"
    header-bg-variant="primary"
    size="xl"
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

<style lang="scss" >
  .modal-dialog {
    & .modal-title {
      color: white;
    } & .modal-header .close {
      color: white;
    }
  }
</style>
