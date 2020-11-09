<template>
  <div class="d-flex w-100 justify-content-evenly mb-3">
    <b-card
      class="chevron-right is-neutral w-25 rounded-0"
      style="flex: 0 1 25%;"
    >
      <p class="h4 mb-0">
        {{ project.details.client }}
        <b-btn
          size="sm"
          variant="transparent"
          @click="onRefetch(project.details.projectId)"
        >
          <b-icon-arrow-counterclockwise variant="primary-0" />
        </b-btn>
      </p>
      Project ID: {{ project.details.projectId }}
      <b-badge variant="primary-0" class="px-3 rounded">
        est. Go-live: {{ project.details.estGoLive }}
      </b-badge>
    </b-card>
    <b-card
      :class="[{ 'is-complete': project.intake.isComplete }, ...cardClass]"
      body-class="d-flex flex-column justify-content-center align-items-center"
      style="flex: 0 1 25%;"
    >
      <div
        v-if="!project.intake.isComplete"
        class="d-flex flex-column justify-content-center"
      >
        <b-badge variant="tertiary-2" class="px-3 rounded mb-2">
          <b-icon-exclamation-triangle-fill
            scale="2em"
            variant="light"
            shift-h="-8"
            shift-v="8"
          />
          4 Locations require review.
        </b-badge>
        <status-btn
          :text="'Edit Location URLs'"
          @click="$bvModal.show('intake-modal')"
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
      :class="[{ 'is-complete': project.assets.isComplete }, ...cardClass]"
      body-class="d-flex flex-column justify-content-center align-items-center"
      style="flex: 0 1 25%;"
    >
      <b-btn-group
        v-if="!project.assets.isComplete"
        size="sm"
        class="w-100"
      >
        <status-btn :text="'Crawl'" :is-disabled="!project.intake.isComplete">
          <template v-slot:btn-icon>
            <b-iconstack>
              <b-icon icon="minecart" stacked />
              <b-icon
                v-if="project.assets.isCrawled"
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
          :is-disabled="!project.intake.isComplete"
          class="ml-1"
        >
          <template v-slot:btn-icon>
            <b-iconstack>
              <b-icon icon="minecart-loaded" stacked />
              <b-icon
                v-if="project.assets.isScraped"
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
          :is-disabled="!project.intake.isComplete"
          class="ml-1"
          @click="$bvModal.show('scrape-modal')"
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
        :disabled="project.assets.isComplete === false"
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
export default {
  props: {
    project: {
      type: Object,
      default() {
        return {
          details: {
            title: 'Client Name',
            'sub-title': 'From Project 9099909'
          },
          intake: { isComplete: true },
          assets: { isComplete: true }
        }
      }
    }
  },
  data() {
    return {
      cardClass: [
        'chevron-right',
        'w-25',
        'rounded-0'
      ]
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
