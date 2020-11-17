<template>
  <div class="d-flex w-100 justify-content-evenly mb-3">
    <b-card
      class="chevron-right is-neutral w-25 rounded-0"
      style="flex: 0 1 25%;"
    >
      <p class="h4 mb-0">
        {{ project.clientName === null ? 'Client Name' : project.clientName }}
        <b-btn
          size="sm"
          variant="transparent"
          pill
          @click="onRefetch(project.projectId)"
        >
          <b-icon-arrow-counterclockwise
            :animation="isBusy ? 'spin-reverse' : ''"
            variant="primary-0"
          />
        </b-btn>
      </p>
      Project ID: {{ project.projectId }}
      <b-badge variant="primary-0" class="px-3 rounded">
        est. Go-live: {{ processTime(project.estGoLive) }}
      </b-badge>
    </b-card>
    <b-card
      :class="[{ 'is-complete': project.discoverComplete }, ...cardClass]"
      body-class="d-flex flex-column justify-content-center align-items-center"
      style="flex: 0 1 25%;"
    >
      <div
        v-if="!project.discoverComplete"
        class="d-flex flex-column justify-content-center"
      >
        <b-badge variant="tertiary-2" class="px-3 rounded mb-2">
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
      style="flex: 0 1 25%;"
    >
      <b-btn-group
        v-if="!project.scrapeComplete"
        size="sm"
        class="w-100"
      >
        <status-btn :text="'Crawl'" :is-disabled="project.scrapeComplete" @click="discover(project.projectId)">
          <template v-slot:btn-icon>
            <b-iconstack>
              <b-icon icon="minecart" stacked />
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
    <div class="d-flex flex-grow-1 align-items-center">
      <b-btn
        :disabled="project.scrapeComplete === false"
        variant="primary"
        block
        pill
      >
        Go!
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
      isBusy: false,
      cardClass: [
        'chevron-right',
        'w-25',
        'rounded-0'
      ]
    }
  },
  methods: {
    async launchModal(modalName, projectId) {
      await this.setLocations(projectId)
      this.$bvModal.show(modalName)
    },
    onRefetch(id) {
      this.isBusy = !this.isBusy
    },
    crawl(id) {
      console.log(id)
    }
  }
}
</script>

<style lang="scss">
$complete: #339698;
$alert: #ff0033;
$disabled: #e8e8e8;
$height: 110px;
$half: $height / 2;
$offsetX: 50px;
.chevron-right {
  position: relative;
  background: $alert;
  margin-right: $offsetX;
  border: none;
  height: $height;
  &::before {
    content: "";
    position: absolute;
    left: -50px;
    bottom: 0;
    width: $offsetX;
    background: $alert;
    height: 100%;
    border-left: $offsetX solid $alert;
    border-top: $half solid transparent;
    border-bottom: $half solid transparent;
  }
  &::after {
    position: absolute;
    top: 0%;
    bottom: 0%;
    right: -50px;
    border-left: $offsetX solid $alert;
    border-top: $half solid transparent;
    border-bottom: $half solid transparent;
    content: "";
    z-index: 1;
  }
  &.is-neutral {
    background: $disabled;
    &::before {
      background: $disabled;
      border-left-color: $disabled;
    }
    &::after {
      border-left-color: $disabled;
    }
  }
  &.is-complete {
    background: $complete;
    &::before {
      background: $complete;
      border-left-color: $complete;
    }
    &::after {
      border-left-color: $complete;
    }
  }
}
</style>
