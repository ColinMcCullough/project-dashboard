<template>
  <div>
    <b-table
      :fields="fields"
      :items="items"
      responsive
      sticky-header
      outlined
    >
      <template v-slot:cell(pages)="{ item }">
        <b-form-textarea
          v-model="item.pages"
          rows="10"
        />
      </template>
    </b-table>
    <div class="d-flex justify-content-end">
      <b-btn
        variant="outline-primary-70"
        class="px-4"
        pill
        @click="onSave"
      >
        <b-icon-arrow-clockwise :animation="isBusy ? 'spin' : ''" />
        Save Changes
      </b-btn>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      items: [],
      fields: [
        { key: 'name', label: 'Location Name', sortable: true },
        { key: 'pages', label: 'Page URLs to Review', sortable: true }
      ],
      isBusy: false
    }
  },
  computed: {
    projectId () {
      return this.$store.state.locations.projectId
    }
  },
  async mounted () {
    if (this.projectId) {
      const locations = await this.$axios
        .$get(`/api/v1/projects/${this.projectId}/excessivePages`)
      this.items = locations
    }
  },
  methods: {
    async onSave () {
      await this.$axios
        .$post(`/api/v1/jobs/asset-scraper/${this.projectId}`, this.items)
    }
  }
}
</script>

<style>

</style>
