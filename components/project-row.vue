<template>
  <div class="d-flex w-100 justify-content-evenly p-0 bg-gray-10">
    <b-card
      class=" first-chevron w-25"
      style="flex: 0 1 25%;"
    >
      <p class="font-weight-bold mb-0">
        {{ project.clientName === null ? 'Client Name' : project.clientName }}
        <b-badge variant="primary-20" class="px-2 rounded">
          <b-icon-building />
          {{ project.locationCount }}
        </b-badge>
      </p>
      <p
        v-b-popover.hover.top="`Name: ${project.projectName} - ID: ${project.projectId}`"
        class="text-gray-60 text-truncate mb-0"
      >
        {{ project.projectName }}
      </p>
      <b-badge variant="primary" class="px-3 rounded">
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
          v-if="!project.discoverComplete"
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
        <b-badge
          v-else
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
    <b-card
      :class="[{ 'is-disabled': !project.discoverComplete }, { 'is-complete': project.g5Approved }, ...cardClass]"
      body-class="d-flex flex-column justify-content-center align-items-center"
      style="flex: 0 1 35%;"
    >
      <div class="d-flex flex-column justify-content-center">
        <div class="">
          <b-badge
            :variant="project.discoverComplete ? 'error' : 'gray-30'"
            :class="{ 'text-gray-20': !project.discoverComplete }"
            class="px-3 rounded mb-2"
            @click="runDiscover(project.projectId)"
          >
            <b-icon
              v-if="!project.discoverComplete"
              :icon="crawling ? 'arrow-clockwise' : 'minecart'"
              :animation="crawling ? 'spin' : ''"
              variant="light"
            />
            <b-icon
              v-else
              icon="check-circle-fill"
              variant="light"
            />
            Crawl
          </b-badge>
          <b-badge
            :variant="formatBadge(project, 'scrapeComplete')"
            :class="{ 'text-gray-20': !project.discoverComplete }"
            class="px-3 rounded mb-2"
            @click="launchModal('scraper-modal', project.projectId)"
          >
            <b-icon
              v-if="!project.scrapeComplete"
              icon="minecart-loaded"
              variant="light"
            />
            <b-icon
              v-else
              icon="check-circle-fill"
              variant="light"
            />
            Scrape
          </b-badge>
        </div>
        <!-- REVIEW BUTTON START -->
        <status-btn
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
import GlobalFunctions from '~/mixins/global-functions'
export default {
  mixins: [Locations, GlobalFunctions, LinkDiscoverer],
  props: {
    project: {
      type: Object,
      default() {
        return {
          clientName: null,
          clientId: null,
          projectId: null,
          locationCount: null,
          discoverComplete: true,
          scrapeComplete: false
        }
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
      this.$bvModal.show(modalName)
    },
    formatBadge (project, target) {
      return project[target]
        ? 'secondary-60'
        : project.discoverComplete
          ? 'error'
          : 'gray-20'
    },
    onRefetch (id) {
      this.isBusy = !this.isBusy
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
.w-20 {
  width: 20% !important;
}
.w-35 { width: 35% !important; }
.w-40 {
  width: 40% !important;
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
  &.is-alert {
    background-color: $alert;
    // background: linear-gradient(35deg, #cc4d6a, $alert);
  }
  &.is-neutral {
    background: $disabled;
  }
  &.is-disabled {
    background: $disabled;
    opacity: 0.5;
  }
  &.is-complete {
    background: $complete;
  }
}
</style>
