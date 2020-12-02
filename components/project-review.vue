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
          <transition mode="out-in" name="fade">
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
                    <component :is="tab.id" />
                  </b-col>
                </b-row>
              </b-tab>
            </b-tabs>
            <!-- horizontal tabs end -->
          </transition>
        </section>
      </article>
    </div>
  </b-card>
</template>

<script>
import LocationDetails from '~/components/location-review/location-details'
import LocationAmenities from '~/components/location-review/location-amenities'
import LocationAssets from '~/components/location-review/location-assets'
import GooglePlaces from '~/components/location-review/google-places'
import Locations from '~/mixins/locations'
export default {
  components: {
    LocationDetails,
    LocationAmenities,
    LocationAssets,
    GooglePlaces
  },
  mixins: [Locations],
  props: {},
  data() {
    return {
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
        },
        {
          id: 'google-places',
          title: 'Google Places'
        }
      ]
    }
  },
  methods: {}
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
