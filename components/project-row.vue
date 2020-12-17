<template>
  <div
    :class="{ 'is-busy': isBusy }"
    class="d-flex w-100 justify-content-evenly p-0 bg-gray-10"
  >
    <b-card
      class="first-chevron py-1 px-2 w-25 d-flex justify-content-center"
      style="flex: 0 1 25%;"
      no-body
    >
      <p class="font-weight-bold mb-0 d-flex">
        <b-btn
          variant="outline-gray"
          size="sm"
          class="align-self-center py-0 px-1 mr-1"
          pill
          @click="onRefetch(project.projectId)"
        >
          <b-icon-arrow-counterclockwise :animation="isBusy ? 'spin-reverse' : ''" scale="0.75" />
        </b-btn>
        <b-badge variant="light" class="px-2 rounded align-self-center ml-2">
          <b-icon-building />
          {{ project.locationCount }} {{ project.locationCount > 1 ? 'Locations' : 'Location' }}
        </b-badge>
      </p>
      {{ project.clientName === null ? 'Client Name' : project.clientName }}
      <p
        v-b-popover.hover.top="`Name: ${project.projectName} - ID: ${project.projectId}`"
        class="text-gray-60 text-truncate mb-0"
      >
        {{ project.projectName }}
      </p>
      <b-badge variant="gray" class="px-1 rounded align-self-start">
        est. Go-live: {{ processTime(project.estGoLive) }}
      </b-badge>
    </b-card>
    <!-- START INTAKE CARD -->
    <b-card
      :class="[{ 'is-complete': project.urlsSet }, ...cardClass]"
      body-class="d-flex flex-column justify-content-center align-items-center"
      style="flex: 0 1 35%;"
    >
      <div class="d-flex flex-column justify-content-center">
        <b-badge
          v-if="project.urlsSet"
          variant="secondary-60"
          class="px-3 rounded mb-2"
        >
          <b-icon-check-circle-fill
            scale="2em"
            variant="light"
            shift-h="-8"
            shift-v="8"
          />
          Locations have URLs set.
        </b-badge>
        <b-badge
          v-else
          variant="error"
          class="px-3 rounded mb-2"
        >
          <b-icon-exclamation-triangle-fill
            scale="2em"
            variant="light"
            shift-h="-8"
            shift-v="8"
          />
          {{ project.urlsMissing }}
          Locations require review.
        </b-badge>
        <status-btn
          :text="'Edit Location URLs'"
          @click="launchModal('intake-modal', project.projectId)"
        >
          <template v-slot:btn-icon>
            <b-icon icon="pencil-fill" />
          </template>
        </status-btn>
      </div>
    </b-card>
    <!-- START RESULTS COLUMN -->
    <b-card
      :class="[{ 'is-disabled': !project.urlsSet }, { 'is-complete': project.g5Approved }, ...cardClass]"
      body-class="d-flex flex-column justify-content-center align-items-center"
      style="flex: 0 1 35%;"
    >
      <div class="d-flex flex-column justify-content-center">
        <div>
          <!-- START CRAWL BADGE -->
          <b-badge
            :variant="formatBadge(project, 'discoverComplete')"
            class="px-3 rounded mb-2"
            @click="runDiscover(project.projectId)"
          >
            <b-icon
              v-if="project.discoverComplete"
              icon="check-circle-fill"
              scale="1.8em"
              variant="light"
              shift-h="-8"
              shift-v="8"
            />
            <b-icon-stopwatch-fill
              v-else
              scale="1.8em"
              shift-h="-8"
              shift-v="8"
            />
            Crawl
          </b-badge>
          <!-- START SCRAPE BADGE -->
          <b-badge
            :variant="formatBadge(project, 'scrapeComplete')"
            class="px-3 rounded mb-2"
            @click="launchModal('scraper-modal', project.projectId)"
          >
            <!-- <span v-if="project.isScraping">
              <b-icon-three-dots
                scale="1.8em"
                shift-h="-8"
                animation="cylon"
              />
              Scraping
            </span> -->
            <span v-if="project.scrapeComplete">
              <!-- <span v-else-if="project.scrapeComplete"> -->
              <b-icon
                icon="check-circle-fill"
                scale="1.8em"
                shift-h="-8"
                shift-v="8"
              />
              Scraped
            </span>
            <span v-else>
              <b-icon-stopwatch-fill
                scale="1.8em"
                shift-h="-8"
                shift-v="8"
              />
              Scrape
            </span>
          </b-badge>
        </div>
        <!-- REVIEW BUTTON START -->
        <status-btn
          v-if="project.excessivePages"
          :text="'Review Crawl'"
          class="ml-1"
          @click="launchModal('crawl-review', project.projectId)"
        >
          <template v-slot:btn-icon>
            <b-icon-exclamation-triangle />
          </template>
        </status-btn>
        <status-btn
          v-else
          :text="'Review'"
          :is-disabled="!project.scrapeComplete"
          class="ml-1"
          @click="launchModal('review-modal', project.projectId)"
        >
          <template v-slot:btn-icon>
            <b-icon icon="hammer" />
          </template>
        </status-btn>
      </div>
    </b-card>
    <div class="d-flex w-20 flex-grow-0 align-items-center">
      <b-btn
        :disabled="!project.g5Approved"
        :variant="project.g5Approved ? 'primary' : 'gray-20'"
        class="px-5 chevron-right"
      >
        Release!
        <b-icon-arrow-right />
      </b-btn>
    </div>
  </div>
</template>

<script>
import LinkDiscoverer from '~/mixins/link-discoverer'
import Locations from '~/mixins/locations'
import Projects from '~/mixins/projects'
import GlobalFunctions from '~/mixins/global-functions'
import Clients from '~/mixins/clients'
export default {
  mixins: [Locations, Clients, Projects, GlobalFunctions, LinkDiscoverer],
  props: {
    project: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      crawling: false,
      isBusy: false,
      cardClass: [
        'is-alert',
        'chevron-right',
        'w-35',
        'rounded-0'
      ]
    }
  },
  methods: {
    async runDiscover (projectId) {
      this.crawling = true
      await this.discover(projectId)
      setTimeout(() => { this.crawling = false }, 3000)
    },
    async launchModal (modalName, projectId) {
      await this.setLocations(projectId)
      if (modalName === 'intake-modal') {
        await this.setClients(projectId)
      }
      this.$bvModal.show(modalName)
    },
    formatBadge (project, status) {
      return project[status]
        ? 'secondary-60'
        : project.urlsSet
          ? 'warning'
          : 'gray-30'
    },
    async onRefetch (id) {
      this.isBusy = true
      await this.updateProject(id)
      setTimeout(() => { this.isBusy = false }, 2000)
    }
  }
}
</script>

<style lang="scss">
$complete: #82c9c9;
$alert: #db7f8f;
$disabled: #e3e3e3;
$blue: #314a69;
$dk_blue: #102340;
$green: #1e5354;
$dk_green: #112f2f;
$height: 115px;
.w-20 { width: 20% !important; }
.w-35 { width: 35% !important; }
.w-40 { width: 40% !important; }
.is-busy {
  animation: blink-2 2s ease-in-out infinite both;
}
.first-chevron {
  border: none;
  height: $height;
  clip-path: polygon(calc(100% - 35px) 0%, 100% 50%, calc(100% - 35px) 100%, 0% 100%, 0% 0%);
  background: $disabled;
}
.chevron-right {
  border: none;
  clip-path: polygon(calc(100% - 35px) 0%, 100% 50%, calc(100% - 35px) 100%, 0% 100%, 35px 50%, 0% 0%);
  height: $height;
  &.is-alert { background-color: $alert; }
  &.is-neutral { background: $disabled; }
  &.is-disabled {
    background: $disabled;
    opacity: 0.5;
  }
  &.is-complete { background: $complete; }
}
/* ----------------------------------------------
 * Generated by Animista on 2020-12-3 8:37:42
 * Licensed under FreeBSD License.
 * See http://animista.net/license for more info.
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */
@keyframes blink-2 {
  0% { opacity: 1; }
  50% { opacity: 0.2; }
  100% { opacity: 1; }
}
</style>
