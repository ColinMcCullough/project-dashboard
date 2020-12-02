<template>
  <div>
    <top-nav>
      <b-btn
        style="align-items: center;"
        size="sm"
        variant="outline-secondary-20"
        @click="pauseAllQueues()"
      >
        {{ allQueuesPaused ? 'Resume all Queues' : 'Pause all Queues' }}
      </b-btn>
    </top-nav>
    <div class="main">
      <b-container fluid class="px-1 scroll-container">
        <b-row class="my-1" no-gutters>
          <b-col
            v-for="(queue, i) in queues"
            :key="`queue-${i}`"
            cols="3"
            md="4"
            sm="6"
          >
            <b-card
              header-class="d-flex justify-content-between align-items-center p-0 flex-wrap"
              bg-variant="primary-20"
              header-text-variant="primary"
              class="p-1"
              no-body
            >
              <template v-slot:header>
                <b-btn-group size="sm" class="d-flex w-100">
                  <b-btn
                    variant="primary-70"
                    class="flex-grow-1 text-uppercase mb-0 font-weight-bold"
                  >
                    <b-icon-caret-down />
                    {{ queue.name }}
                  </b-btn>
                  <b-btn
                    variant="outline-primary-70"
                    class="flex-grow-0"
                    @click="getAllJobs(queue.name)"
                  >
                    Get all Jobs
                  </b-btn>
                  <b-btn
                    variant="outline-primary-70"
                    class="flex-grow-0"
                    @click="pauseQueue(queue.name)"
                  >
                    <b-icon v-if="queue.isPaused" icon="play-fill" />
                    <b-icon v-else icon="pause-fill" />
                  </b-btn>
                </b-btn-group>
              </template>
              <b-list-group>
                <b-list-group-item
                  v-for="(status, key) in queue.statuses"
                  :key="key"
                  button
                  class="d-flex justify-content-between align-items-center p-1"
                  @click="getJobsByState(queue.name, key)"
                >
                  <span>
                    <b-icon :icon="getIconByStatus(key)" />
                    {{ key }}
                  </span>
                  <b-badge
                    :variant="status === 0 ? 'muted' : 'success'"
                    pill
                  >
                    {{ status }}
                  </b-badge>
                </b-list-group-item>
              </b-list-group>
            </b-card>
          </b-col>
        </b-row>
        <b-row no-gutters>
          <b-col>
            <redis-table />
          </b-col>
        </b-row>
      </b-container>
      <Footer />
    </div>
  </div>
</template>

<script>
import TopNav from '~/components/top-nav'
import RedisMixin from '~/mixins/redis'
import RedisTable from '~/components/redis-table'
export default {
  components: {
    RedisTable,
    TopNav
  },
  mixins: [RedisMixin],
  async fetch({ store }) {
    try {
      await store.dispatch('queue/init')
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e)
    }
  },
  data () {
    return {
      statuses: {
        waiting: 'clock',
        active: 'hourglass-split',
        completed: 'check',
        failed: 'exclamation-triangle',
        delayed: 'clock-history',
        paused: 'pause-fill'
      }
    }
  },
  methods: {
    getIconByStatus(status) {
      return this.statuses[status]
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  position: fixed;
  top: 55px;
  left: 0;
  right: 0;
}
.scroll-container {
  overflow-y: scroll;
  height: 100%;
  scroll-behavior: smooth;
}
</style>
