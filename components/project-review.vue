<template>
  <b-card
    no-body
    border-variant="gray-60"
    style="position: absolute; bottom: 10px; top: 10px; left: 10px; right: 10px; overflow: scroll;"
    header-class="border-0"
  >
    <template v-slot:header>
      <b-form-group
        label="Select a Location"
        label-class="text-uppercase small font-weight-bold text-gray"
        label-cols="3"
      >
        <vue-multiselect
          v-model="location"
          :options="locations"
        >
          <template v-slot:singleLabel="{ option }">
            <tab-title :title="option.properties.name" />
          </template>
          <template v-slot:option="{ option }">
            <tab-title :title="option.properties.name" />
          </template>
        </vue-multiselect>
      </b-form-group>
    </template>
    <b-card no-body class="border-0">
      <b-tabs card>
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
          <div v-if="location" style="max-width: 800px;" class="mx-auto">
            <component :is="tab.id" :id="location.locationId" />
          </div>
          <div v-else>
            Select a Location first.
          </div>
        </b-tab>
      </b-tabs>
    </b-card>
  </b-card>
</template>

<script>
import VueMultiselect from 'vue-multiselect'
import LocationAmenities from '~/components/location-review/location-amenities'
import LocationAssets from '~/components/location-review/location-assets'
import LocationDetails from '~/components/location-review/location-details'
import Locations from '~/mixins/locations'
export default {
  components: {
    VueMultiselect,
    LocationAmenities,
    LocationAssets,
    LocationDetails
  },
  mixins: [Locations],
  props: {},
  data() {
    return {
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
  methods: {}
}
</script>

<style lang="scss">
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
