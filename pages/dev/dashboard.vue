<template>
  <b-container fluid style="max-width: 1400px; margin-top: 130px;">
    <top-nav :show="true">
      <b-btn
        variant="outline-success-0"
        to="/dev/dashboard"
        size="sm"
        class="mr-2"
      >
        Dev
      </b-btn>
      <b-btn
        variant="outline-success-0"
        to="/queues"
        size="sm"
        class="mr-2"
      >
        Queues and Jobs
      </b-btn>
      <b-btn
        variant="outline-success-0"
        size="sm"
        to="/dev/asset-scraper"
      >
        Asset Scraper
      </b-btn>
      <template v-slot:secondary-nav>
        <div class="d-flex mb-0 align-items-center justify-content-between w-100">
          <b-input-group size="sm" class="mr-2">
            <b-input-group-prepend class="d-flex px-2 align-items-center">
              Sort By
            </b-input-group-prepend>
            <b-form-select v-model="sortBy" :options="sortBys" />
            <b-form-select v-model="sortDir" :options="sortDirs" />
          </b-input-group>
          <b-input-group size="sm">
            <b-input-group-prepend class="d-flex px-2 align-items-center">
              <b-icon-search />
            </b-input-group-prepend>
            <b-form-input
              v-model.trim="filter"
              debounce="500"
              placeholder="Search"
            />
            <b-btn
              v-if="filter"
              variant="outline-success-1"
              size="sm"
              @click="filter = ''"
            >
              <b-icon-x-circle />
              Clear
            </b-btn>
          </b-input-group>
        </div>
      </template>
    </top-nav>
    <!-- MODAL COMPONENTS START -->
    <modal-template
      :id="'intake-modal'"
      title="Intake"
    >
      <!-- <intake-table /> -->
      <intake-table />
    </modal-template>
    <modal-template
      :id="'scrape-modal'"
      title="Scraper"
    >
      <project-review />
    </modal-template>
    <!-- MODAL COMPONENTS END -->
    <b-card style="overflow-x: hidden;" class="my-5">
      <b-row>
        <b-col>
          <project-header />
        </b-col>
      </b-row>
      <b-table
        :fields="fields"
        :items="projects"
        :sort-by.sync="sortBy"
        :sort-direction.sync="sortDir"
        :filter="filter"
        class="p-0 m-0 border-0 hide"
      >
        <template v-slot:cell(toDisplay)="data">
          <project-row
            v-bind="{ project: data.item }"
          />
        </template>
      </b-table>
    </b-card>
  </b-container>
</template>

<script>
import Projects from '~/mixins/projects'
export default {
  mixins: [Projects],
  async fetch({ store }) {
    await store.dispatch('projects/init')
  },
  data() {
    return {
      projectId: null,
      sortBy: 'estGoLive',
      sortBys: [
        { text: 'Client Name', value: 'client' },
        { text: 'Est. Go-Live Date', value: 'estGoLive' },
        { text: 'Project ID', value: 'projectId' }
      ],
      sortDir: 'asc',
      sortDirs: [
        { text: 'Ascending', value: 'asc' },
        { text: 'Descending', value: 'desc' }
      ],
      filter: '',
      fields: [
        { key: 'client', sortable: true, tdClass: 'd-none' },
        { key: 'projectId', sortable: true, tdClass: 'd-none' },
        { key: 'estGoLive', sortable: true, tdClass: 'd-none' },
        { key: 'toDisplay' }
      ]
    }
  },
  methods: {
    sortCompare(aRow, bRow) {
      let a, b
      if (this.sortBy) {
        a = aRow[this.sortBy]
        b = bRow[this.sortBy]
      }
      return a < b ? -1 : a > b ? 1 : 0
    }
  }
}
</script>

<style lang="scss">
.hide thead[role=rowgroup] {
  display: none;
}
</style>
