<template>
  <div class="d-flex w-100 justify-content-evenly mb-3">
    <b-card
      v-bind="project.details"
      style="flex: 0 1 25%;"
    >
      <status-btn :text="'Refetch Project Details'">
        <template v-slot:btn-icon>
          <b-icon icon="arrow-counterclockwise" />
        </template>
      </status-btn>
    </b-card>
    <b-card
      v-bind="project.intake"
      body-class="d-flex flex-column justify-content-center align-items-center"
      style="flex: 0 1 25%;"
    >
      <div v-if="project.intake.props.isAlert" class="d-flex flex-column justify-content-center">
        <b-badge variant="tertiary-2" class="px-3 rounded mb-2">
          <b-icon-exclamation-triangle-fill scale="2em" variant="light" shift-h="-8" shift-v="8" />
          4 Locations require review.
        </b-badge>
        <status-btn
          v-b-modal.modal-template
          :text="''"
        >
          <template v-slot:btn-icon>
            <b-icon icon="pencil-fill" />
          </template>
        </status-btn>
      </div>
      <b-icon-check-circle-fill v-else scale="5em" variant="light" shift-h="4" class="mx-0" />
    </b-card>
    <b-card
      v-bind="project.assets"
      body-class="d-flex flex-column justify-content-center align-items-center"
      style="flex: 0 1 25%;"
    >
      <b-btn-group size="sm" class="w-100">
        <status-btn :text="'Crawl'">
          <template v-slot:btn-icon>
            <b-icon icon="minecart" />
          </template>
        </status-btn>
        <status-btn :text="'Scrape'">
          <template v-slot:btn-icon>
            <b-icon icon="minecart-loaded" />
          </template>
        </status-btn>
        <status-btn :text="'Review'">
          <template v-slot:btn-icon>
            <b-icon icon="hammer" />
          </template>
        </status-btn>
      </b-btn-group>
    </b-card>
    <div class="d-flex flex-grow-1 align-items-center">
      <b-btn variant="primary" block pill>
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
            'sub-title': 'From Project 9099909',
            class: 'chevron-right w-25 is-disabled rounded-0'
          },
          intake: {
            title: '',
            'sub-title': 'Location Urns and count',
            class: 'chevron-right is-complete rounded-0',
            props: {
              isAlert: true
            }
          },
          assets: {
            title: 'Scraper',
            'sub-title': 'Where we get all the info and images',
            class: 'chevron-right is-disabled rounded-0'
          },
          links: {
            class: 'chevron-right is-disabled rounded-0'
          }
        }
      }
    }
  }
}
</script>

<style lang="scss">
$complete: #339698;
$alert: #ff0033;
$disabled: #e8e8e8;
$height: 130px;
$half: $height / 2;
$offsetX: 50px;
.chevron-right {
  position: relative;
  background: #e8e8e8;
  margin-right: $offsetX;
  border: none;
  height: $height;
  &::before {
    content: "";
    position: absolute;
    left: -50px;
    bottom: 0;
    width: $offsetX;
    background: #e8e8e8;
    height: 100%;
    border-left: $offsetX solid #e8e8e8;
    border-top: $half solid transparent;
    border-bottom: $half solid transparent;
  }
  &::after {
    position: absolute;
    top: 0%;
    bottom: 0%;
    right: -50px;
    border-left: $offsetX solid #e8e8e8;
    border-top: $half solid transparent;
    border-bottom: $half solid transparent;
    content: "";
    z-index: 1;
  }
  &.is-disabled {
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
  &.is-alert {
    background: $alert;
    &::before {
      background: $alert;
      border-left-color: $alert;
    }
    &::after {
      border-left-color: $alert;
    }
  }
}
</style>
