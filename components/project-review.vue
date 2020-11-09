<template>
  <b-card
    no-body
    border-variant="success-1"
    style="position: absolute; bottom: 10px; top: 10px; left: 10px; right: 10px; overflow: scroll;"
  >
    <b-tabs vertical pills card>
      <b-tab
        v-for="(location, i) in locations"
        :key="`${location.id}-${i}`"
      >
        <template v-slot:title>
          <tab-title />
        </template>
        <!-- horizontal tabs start -->
        <b-tabs
          active-nav-item-class="text-light bg-secondary"
        >
          <b-container fluid>
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
                  <component :is="tab.id" />
                </b-col>
              </b-row>
            </b-tab>
          </b-container>
        </b-tabs>
        <!-- horizontal tabs end -->
      </b-tab>
    </b-tabs>
  </b-card>
</template>

<script>
import LocationDetails from '~/components/location-review/location-details'
import LocationAmenities from '~/components/location-review/location-amenities'
import LocationAssets from '~/components/location-review/location-assets'
export default {
  components: {
    LocationDetails,
    LocationAmenities,
    LocationAssets
  },
  data() {
    return {
      // dummy data will need to be moved to store in passed in through props
      locations: [
        { name: 'Location 1', id: 1 },
        { name: 'Location 2', id: 2 },
        { name: 'Location 3', id: 3 },
        { name: 'Location 4', id: 4 },
        { name: 'Location 5', id: 5 },
        { name: 'Location 6', id: 6 },
        { name: 'Location 7', id: 7 },
        { name: 'Location 8', id: 8 },
        { name: 'Location 9', id: 9 }
      ],
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
  }
}
</script>

<style lang="scss">
.ov-x-hidden {
  overflow-x: hidden;
}
.nav-tabs {
  overflow: hidden;
  border-bottom: none !important;
  border-radius: 0 0 10px 0;
}
.nav-tabs .nav-link {
  color: inherit;
  background-color: #cbd8e1;
  border-radius: 10px 10px 0 0!important;
  border-bottom: none;
}

.nav-tabs .nav-item {
  margin-right: 5px;
}
</style>
