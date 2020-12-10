<template>
  <b-container fluid style="max-width: 1400px; margin-top: 160px;">
    <top-nav :show="true">
      <b-btn
        variant="outline-secondary-20"
        to="/dev/dashboard"
        size="sm"
        class="mr-2"
      >
        Dev
      </b-btn>
      <b-btn
        variant="outline-secondary-20"
        to="/queues"
        size="sm"
        class="mr-2"
      >
        Queues and Jobs
      </b-btn>
      <b-btn
        variant="outline-secondary-20"
        size="sm"
        to="/dev/asset-scraper"
      >
        Asset Scraper
      </b-btn>
      <template v-slot:secondary-nav>
        <div class="d-flex mb-0 align-items-center justify-content-between w-100">
          <b-input-group class="mr-2">
            <b-input-group-prepend class="d-flex px-2 align-items-center text-uppercase font-weight-bold">
              Sort By
            </b-input-group-prepend>
            <b-form-select v-model="sortBy" :options="sortBys" class="mr-2" />
            <!-- TODO: THE TABLE IS NOT REORDERING ON CHANGE TO THESE FIELDS -->
            <!-- <b-btn
              :variant="sortDir === 'asc' ? 'secondary-70' : 'secondary'"
              class="mr-2"
              pill
              @click="sortDir = 'asc'"
            >
              <b-icon-sort-up />
            </b-btn>
            <b-btn
              :variant="sortDir === 'desc' ? 'secondary-70' : 'secondary'"
              pill
              @click="sortDir = 'desc'"
            >
              <b-icon-sort-down-alt />
            </b-btn> -->
          </b-input-group>
          <b-input-group class="flex-grow-0">
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
              variant="error"
              pill
              @click="filter = ''"
            >
              <b-icon-x-circle />
              Clear
            </b-btn>
          </b-input-group>
          <b-pagination
            v-model="currentPage"
            :total-rows="totalRows"
            :per-page="perPage"
            pills
            class="mb-0 mx-2"
          />
          <b-input-group style="max-width: 75px;">
            <b-form-select v-model="perPage" :options="perPages" />
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
      :id="'scraper-modal'"
      title="Scraper"
    >
      <scraper-review />
    </modal-template>
    <modal-template
      id="crawl-review"
      title="Review Excessive Pages Found"
    >
      <excessive-pages />
    </modal-template>
    <modal-template
      :id="'review-modal'"
      title="Scraper"
    >
      <project-review />
    </modal-template>
    <!-- MODAL COMPONENTS END -->
    <b-card style="overflow-x: hidden;" class="my-5 border-0" no-body>
      <b-table
        :fields="fields"
        :items="projects"
        :sort-by.sync="sortBy"
        :sort-direction.sync="sortDir"
        :filter="filter"
        :per-page="perPage"
        :current-page="currentPage"
        responsive
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
  async fetch ({ store }) {
    await store.dispatch('projects/init')
  },
  data () {
    return {
      sortBy: 'estGoLive',
      perPage: 10,
      perPages: [10, 25, 50, 100],
      currentPage: 1,
      sortBys: [
        { text: 'Client Name', value: 'client' },
        { text: 'Est. Go-Live Date', value: 'estGoLive' },
        { text: 'Project Name', value: 'projectName' }
      ],
      sortDir: 'asc',
      sortDirs: ['asc', 'desc'],
      filter: '',
      fields: [
        { key: 'client', sortable: true, tdClass: 'd-none' },
        { key: 'projectName', sortable: true, tdClass: 'd-none' },
        { key: 'estGoLive', sortable: true, tdClass: 'd-none' },
        { key: 'toDisplay', tdClass: 'border-0' }
      ]
    }
  },
  computed: {
    totalRows () {
      return this.projects.length
    }
  },
  methods: {
    sortCompare (aRow, bRow) {
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
.page-link {
  border: 2px solid #82c9c9;
  color: #82c9c9;
  background-color: transparent;
}
.page-item.disabled .page-link {
  border: 2px solid #2c8181;
  color: #2c8181;
  background-color: transparent;
}
.page-item.active .page-link {
  border: 2px solid #82c9c9;
  background-color: #82c9c9;
}
</style>
