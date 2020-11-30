<template>
  <div class="d-flex w-100 justify-content-evenly p-0 bg-gray-10">
    <b-card
      class=" first-chevron w-25"
      style="flex: 0 1 25%;"
    >
      <p class="font-weight-bold mb-0">
        {{ project.clientName === null ? 'Client Name' : project.clientName }}
      </p>
      {{ project.projectName }}
      <!-- <b-badge variant="primary" class="px-3 rounded">
        est. Go-live: {{ processTime(project.estGoLive) }}
      </b-badge> -->
    </b-card>
    <b-card
      :class="[{ 'is-complete': project.discoverComplete }, ...cardClass]"
      body-class="d-flex flex-column justify-content-center align-items-center"
      style="flex: 0 1 40%;"
    >
      <div
        v-if="!project.discoverComplete"
        class="d-flex flex-column justify-content-center"
      >
        <b-badge variant="error" class="px-3 rounded mb-2">
          <b-icon-exclamation-triangle-fill
            scale="2em"
            variant="light"
            shift-h="-8"
            shift-v="8"
          />
          {{ project.locationCount }}
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
      <b-icon-check-circle-fill
        v-else
        scale="5em"
        variant="light"
        shift-h="4"
        class="mx-0"
      />
    </b-card>
    <b-card
      :class="[{ 'is-complete': project.scrapeComplete }, ...cardClass]"
      body-class="d-flex flex-column justify-content-center align-items-center"
      style="flex: 0 1 40%;"
    >
      <b-btn-group
        v-if="!project.scrapeComplete"
        size="sm"
        class="w-100 px-5"
      >
        <status-btn :text="'Crawl'" :is-disabled="project.scrapeComplete" @click="runDiscover(project.projectId)">
          <template v-slot:btn-icon>
            <b-iconstack>
              <b-icon
                :icon="crawling ? 'arrow-clockwise' : 'minecart'"
                :animation="crawling ? 'spin' : ''"
                stacked
              />
              <b-icon
                v-if="project.discoverComplete"
                icon="check-circle-fill"
                shift-h="-12"
                shift-v="12"
                stacked
                variant="success-0"
              />
            </b-iconstack>
          </template>
        </status-btn>
        <status-btn
          :text="'Scrape'"
          :is-disabled="project.scrapeComplete"
          class="ml-1"
          @click="launchModal('scraper-modal', project.projectId)"
        >
          <template v-slot:btn-icon>
            <b-iconstack>
              <b-icon icon="minecart-loaded" stacked />
              <b-icon
                v-if="project.scrapeComplete"
                icon="check-circle-fill"
                shift-h="-12"
                shift-v="12"
                stacked
                variant="success-0"
              />
            </b-iconstack>
          </template>
        </status-btn>
        <status-btn
          :text="'Review'"
          :is-disabled="project.scrapeComplete"
          class="ml-1"
          @click="launchModal('review-modal', project.projectId)"
        >
          <template v-slot:btn-icon>
            <b-icon icon="hammer" />
          </template>
        </status-btn>
      </b-btn-group>
      <b-icon-check-circle-fill
        v-else
        scale="5em"
        variant="light"
        shift-h="4"
        class="mx-0"
      />
    </b-card>
    <div class="d-flex w-20 flex-grow-0 align-items-center">
      <b-btn
        :disabled="project.scrapeComplete === false"
        class="px-5 chevron-right"
        variant="primary"
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
    async runDiscover(projectId) {
      this.crawling = true
      await this.discover(projectId)
      setTimeout(() => { this.crawling = false }, 3000)
    },
    async launchModal(modalName, projectId) {
      await this.setLocations(projectId)
      this.$bvModal.show(modalName)
    },
    onRefetch(id) {
      this.isBusy = !this.isBusy
    }
  }
}
</script>

<style lang="scss">
$complete: #82c9c9;
$alert: #db7f8f;
$disabled: #c1c1c1;
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
    background: $alert;
  }
  &.is-neutral {
    background: $disabled;
  }
  &.is-complete {
    background: $complete;
  }
}
</style>
