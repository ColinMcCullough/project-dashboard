<template>
  <b-card
    no-body
    border-variant="gray-60"
    style="background-color: #304a69; position: absolute; bottom: 10px; top: 10px; left: 10px; right: 10px; overflow: scroll;"
  >
    <div class="content">
      <article class="content__grid">
        <aside class="py-1">
          <location-list />
        </aside>
        <section class="main-content py-1">
          <!-- horizontal tabs start -->
          <b-tabs
            active-nav-item-class="text-light bg-secondary"
          >
            <b-tab
              v-for="(tab, index) in tabs"
              :key="`${tab.id}-${index}`"
              :title="tab.title"
            >
              <template v-slot:title>
                <div class="d-flex justify-content-start align-items-center m-0">
                  <warning :color="`#ffbd00`" class="mr-2" />
                  <!-- need to swap above line for code below when we have a value to check if data is complete -->
                  <!-- <warning v-if="!isHubReady" :color="`#ffbd00`" class="mr-2" />
                  <check v-else :color="`#52be99`" class="mr-2" /> -->
                  <!-- need icon swap -->
                  {{ tab.title }}
                </div>
              </template>
              <b-row>
                <b-col style="border: 3px solid #cbd8e1">
                  <component :is="tab.id" v-if="selectedLocation" />
                  <p v-else>
                    Select a Location
                  </p>
                </b-col>
              </b-row>
            </b-tab>
          </b-tabs>
          <!-- horizontal tabs end -->
          <b-row v-if="selectedLocation !== null">
            <b-col class="text-right mr-2 mt-2">
              <b-button
                size="md"
                :disabled="isDisabled"
                variant="primary"
                class="mx-3"
                style="min-width: 152px"
                @click="onSave"
              >
                <b-icon-arrow-clockwise v-if="isSaving" animation="spin" font-scale="1" />
                <save-icon v-else v-bind="{ size: '1.2em' }" />
                {{ isSaving ? 'Saving...' : 'Save Location' }}
              </b-button>
            </b-col>
          </b-row>
        </section>
      </article>
    </div>
  </b-card>
</template>

<script>
import LocationAmenities from '~/components/location-review/location-amenities'
import LocationAssets from '~/components/location-review/location-assets'
import LocationDetails from '~/components/location-review/location-details'
import Locations from '~/mixins/locations'
export default {
  components: {
    LocationAmenities,
    LocationAssets,
    LocationDetails
  },
  mixins: [Locations],
  props: {},
  data() {
    return {
      isSaving: false,
      location: null,
      tabs: [
        {
          id: 'location-details',
          title: 'Location Details'
        },
        {
          id: 'location-amenities',
          title: 'Location Amenities'
        },
        {
          id: 'location-assets',
          title: 'Location Assets'
        }
      ]
    }
  },
  computed: {
    isDisabled() {
      return !this.selectedLocation.edited
    }
  },
  methods: {
    async onSave() {
      this.isSaving = true
      const { locationId, properties } = this.selectedLocation
      const locIdx = this.getLocationIndex(locationId)
      await this.saveLocation(this.projectId, locationId, { properties })
      this.updateLocation({ locIdx, key: 'edited', val: false })
      this.isSaving = false
    }
  }
}
</script>

<style lang="scss">
.content {
  position: relative;
  &__grid {
    position: absolute;
    top: 10px;
    height: calc(100vh - 65px);
    width: 100%;
    display: grid;
    grid-template-columns: minmax(min-content, 300px) auto;
    overflow-y: hidden;
  }
}
.main-content {
  background: white;
  min-height: 100%;
  overflow-y: scroll;
  box-shadow: -2px 0 20px rgba(12, 35, 64, 0.5);
}
.ov-x-hidden {
  overflow-x: hidden;
}
.tab-padding ul {
  padding: 0;
  // overflow-x: scroll;
  max-width: 400px;
}
.nav-tabs {
  overflow: hidden;
  border-radius: 0 0 10px 0;
}
// .nav-tabs .nav-link {
//   color: inherit;
//   background-color: #cbd8e1;
//   border-radius: 10px 10px 0 0!important;
//   border-bottom: none;
// }
.nav-tabs .nav-item {
  margin-right: 5px;
}
</style>
