<template>
  <div class="d-flex w-100 justify-content-evenly mb-3">
    <b-card v-bind="project.details">
      <status-btn :text="'Refetch Project Details'">
        <template v-slot:btn-icon>
          <b-icon icon="arrow-counterclockwise" />
        </template>
      </status-btn>
    </b-card>
    <b-card v-bind="project.intake">
      <status-btn :text="'Edit Locations'">
        <template v-slot:btn-icon>
          <b-icon icon="pencil-fill" />
        </template>
      </status-btn>
      <b-icon-check-circle-fill scale="1.5em" variant="light" shift-v="-16" />
    </b-card>
    <b-card v-bind="project.links" no-body>
      <div class="d-flex flex-column" style="height: 100%; justify-content: space-evenly;">
        <b-badge variant="primary">
          Crawler
        </b-badge>
        <status-btn :text="'Run'" class="flex-grow-1" />
        <status-btn :text="'View'" class="flex-grow-1" />
      </div>
    </b-card>
    <b-card v-bind="project.assets">
      <b-btn-group size="sm" class="w-100">
        <status-btn :text="'Run'" />
        <status-btn :text="'View'" />
      </b-btn-group>
      <b-icon-exclamation-triangle-fill scale="1.5em" variant="light" shift-v="-16" />
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
            title: 'Intake',
            'sub-title': 'Location Urns and count',
            class: 'chevron-right is-complete rounded-0'
          },
          assets: {
            title: 'Scraper',
            'sub-title': 'Where we get all the info and images',
            class: 'chevron-right is-alert rounded-0'
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
$height: 170px;
$half: $height / 2;
$offsetX: 50px;
.chevron-right {
  position: relative;
  background: transparent;
  margin-right: $offsetX;
  border: none;
  height: $height;
  &::before {
    content: "";
    position: absolute;
    left: -50px;
    bottom: 0;
    width: $offsetX;
    background: white;
    height: 100%;
    border-left: $offsetX solid white;
    border-top: $half solid transparent;
    border-bottom: $half solid transparent;
  }
  &::after {
    position: absolute;
    top: 0%;
    bottom: 0%;
    right: -50px;
    border-left: $offsetX solid white;
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
