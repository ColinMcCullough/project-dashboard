<template>
  <b-card
    header-class="d-flex flex-wrap justify-content-between align-items-center px-0 py-1 border-0"
    no-body
    border-variant="success-0"
  >
    <template v-slot:header>
      <b-input-group
        size="sm"
        class="flex-grow-0"
        style="width: unset;"
      >
        <b-input-group-prepend class="d-flex align-items-center px-3">
          <b-icon-search variant="success-1" />
        </b-input-group-prepend>
        <b-form-input
          id="filterInput"
          :value="queueData.filter"
          type="search"
          placeholder="Type to Search"
          @input="setQueueData({ filter: $event })"
        />
        <b-input-group-append>
          <b-button
            :disabled="!queueData.filter"
            variant="outline-success-1"
            @click="setQueueData({ filter: '' })"
          >
            <b-icon-x-circle />
          </b-button>
        </b-input-group-append>
      </b-input-group>
      <div class="d-flex align-items-center">
        <b-form-select
          id="perPageSelect"
          :value="queueData.perPage"
          :options="queueData.pageOptions"
          size="sm"
          class="mr-2"
          style="width: unset; border: 2px solid #e8e8e8;"
          @change="setQueueData({ perPage: $event })"
        />
        <b-pagination
          id="pagination"
          :value="queueData.currentPage"
          :total-rows="queueData.totalRows"
          :per-page="queueData.perPage"
          pills
          class="my-0"
          @change="setQueueData({ currentPage: $event })"
        />
      </div>
      <b-btn-group size="sm">
        <b-btn
          variant="outline-success-1"
          @click="selectAllRows"
        >
          Select All
        </b-btn>
        <b-btn
          variant="outline-success-1"
          @click="clearSelected"
        >
          Clear Selected
        </b-btn>
        <span :id="!failedSelected ? 'failed-state' : 'retry-btn'">
          <b-button
            :disabled="!failedSelected"
            size="sm"
            @click="retryFailed(queueData.queueName, queueData.selected)"
          >
            Retry Selected Failed Jobs
          </b-button>
          <b-popover
            target="failed-state"
            triggers="hover"
            placement="top"
          >
            Select failed jobs
            <br>
            <span class="font-weight-bold">
              Or
            </span>
            <br>
            Unselect jobs that are not failed.
          </b-popover>
        </span>
      </b-btn-group>
    </template>
    <!-- MODAL COMPONENT START -->
    <edit-data />
    <!-- MODAL COMPONENT END -->
    <b-table
      id="queueTbl"
      ref="queueTbl"
      :items="jobs"
      :fields="queueData.fields"
      :filter="queueData.filter"
      :per-page="queueData.perPage"
      :current-page="queueData.currentPage"
      :select-mode="queueData.selectMode"
      striped
      selectable
      responsive
      head-variant="light"
      @filtered="onFiltered"
      @row-selected="onRowSelected"
    >
      <template v-slot:cell(selected)="{ rowSelected }">
        <icons-swap v-bind="{ needsCheckIcon: rowSelected, iconConfig: queueData.iconConfig }" />
      </template>
      <template v-slot:cell(_progress)="data">
        <b-progress class="mt-1" :max="100" variant="primary">
          <b-progress-bar :value="data.value" :label="`${data.value}%`" />
        </b-progress>
      </template>
      <template v-slot:cell(processedOn)="data">
        {{ processTime(data.value) }}
      </template>
      <template v-slot:cell(finishedOn)="data">
        {{ processTime(data.value) }}
      </template>
      <template v-slot:cell(actions)="row">
        <b-btn-group class="w-100 d-flex">
          <b-button
            variant="outline-secondary"
            size="sm"
            class="mr-2"
            @click="toggleDetails(getIndexById(row.item.id))"
          >
            {{ row.detailsShowing ? 'Hide' : 'Show' }} Details
          </b-button>
          <b-button
            v-b-modal.edit-data
            variant="outline-secondary"
            size="sm"
            class="mr-2"
            @click="setQueueData({ 'activeIndex': getIndexById(row.item.id) })"
          >
            Edit Data
          </b-button>
        </b-btn-group>
      </template>
      <template v-slot:row-details="row">
        <b-card>
          <b-row class="mb-2">
            <b-col cols="1">
              <b>
                Data:
              </b>
            </b-col>
            <b-col cols="11" class="text-sm-left">
              {{ row.item.data }}
            </b-col>
          </b-row>
          <b-row class="mb-2">
            <b-col cols="1">
              <b>
                Stacktrace:
              </b>
            </b-col>
            <b-col cols="11" class="text-sm-left">
              {{ row.item.stacktrace }}
            </b-col>
          </b-row>
          <b-row class="mb-2">
            <b-col cols="1">
              <b>
                Opts:
              </b>
            </b-col>
            <b-col cols="11" class="text-sm-left">
              {{ row.item.opts }}
            </b-col>
          </b-row>
          <b-row class="mb-2">
            <b-col cols="1">
              <b>
                Delay:
              </b>
            </b-col>
            <b-col cols="5" class="text-sm-left">
              {{ row.item.delay }}
            </b-col>
            <b-col cols="1">
              <b>
                Return Val:
              </b>
            </b-col>
            <b-col cols="5" class="text-sm-left">
              {{ row.item.returnvalue }}
            </b-col>
          </b-row>
        </b-card>
      </template>
    </b-table>
  </b-card>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import RedisMixin from '~/mixins/redis'
import IconsSwap from '~/components/icons-swap'
import EditData from '~/components/modals/edit-data'
export default {
  components: {
    EditData,
    IconsSwap
  },
  mixins: [RedisMixin],
  computed: {
    ...mapState({
      queueData: state => state.queue
    }),
    totalRows: {
      get() { return this.$store.state.queue.totalRows },
      set(val) { this.$store.dispatch('queue/set', { totalRows: val }) }
    },
    failedSelected() {
      return this.queueData.selected.length > 0
        ? this.queueData.selected.every(row => row.state === 'failed')
        : false
    }
  },
  watch: {
    jobs(val) {
      this.totalRows = val.length
    }
  },
  created() {
    this.setQueueData({ totalRows: this.jobs.length })
  },
  methods: {
    ...mapActions({
      setQueueData: 'queue/set',
      toggleDetails: 'queue/toggleShowDetails'
    }),
    getIndexById(id) {
      return this.jobs.findIndex(job => job.id === id)
    },
    processTime(val) {
      return new Date(val).toLocaleString()
    },
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length
      this.setQueueData({ currentPage: 1 })
    },
    onRowSelected(items) {
      this.setQueueData({ selected: items })
    },
    selectAllRows() {
      this.$refs.queueTbl.selectAllRows()
    },
    clearSelected() {
      this.$refs.queueTbl.clearSelected()
    }
  }
}
</script>

<style lang="scss">
#queueTbl .table-active,
.table.b-table > tbody > .table-active > th,
.table.b-table > tbody > .table-active > td {
  background-color: white;
}
</style>
