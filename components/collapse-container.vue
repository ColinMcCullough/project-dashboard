<template>
  <div class="accordion p-3" role="tablist">
    <b-card
      class="soft-shadow mb-3"
      no-body
    >
      <b-card-header
        role="tab"
      >
        <b-btn
          v-b-toggle="section"
          block
          variant="transparent"
          class="px-2 pt-1 pb-0 d-flex align-items-center justify-content-between"
          style=":focus {outline: none;box-shadow: none;}"
        >
          <h4 class="mb-0 text-uppercase font-weight-bold text-gray-60">
            {{ title }}
          </h4>
          <div class="flex-grow-1" />
          <span class="when-open text-secondary small text-uppercase">
            Close
            <b-icon-dash />
          </span>
          <span class="when-closed text-secondary small text-uppercase">
            Edit
            <b-icon-plus />
          </span>
        </b-btn>
      </b-card-header>
      <b-collapse
        :id="section"
        :visible="isOpen"
        role="tabpanel"
      >
        <slot />
      </b-collapse>
    </b-card>
  </div>
</template>

<script>
export default {
  mixins: [],
  props: {
    isOpen: {
      type: Boolean,
      default() {
        return 'false'
      }
    },
    section: {
      type: String,
      default() {
        return 'section'
      }
    },
    title: {
      type: String,
      default() {
        return ''
      }
    }
  },
  computed: {
  },
  methods: {
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
.collapsed > .when-open,
.not-collapsed > .when-closed {
  display: none;
}
</style>
