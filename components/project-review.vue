<template>
  <b-card
    no-body
    class="border-0"
  >
    <div class="content">
      <article class="content__grid">
        <aside class="py-1">
          <location-list />
        </aside>
        <section class="main-content pr-4 py-1">
          <b-card no-body>
            <b-tabs card justified>
              <b-tab
                v-for="(tab, index) in tabs"
                :key="`${tab.id}-${index}`"
                :title="tab.title"
                title-item-class="bg-gray-10"
                title-link-class="p-4 text-uppercase text-muted font-weight-bold"
                style="max-height: 58vh; overflow-y: scroll;"
              >
                <component :is="tab.id" v-if="selectedLocation" />
                <b-badge v-else variant="error" class="rounded">
                  <b-icon-exclamation-triangle-fill />
                  Select a Location
                </b-badge>
              </b-tab>
            </b-tabs>
            <b-card-footer v-if="selectedLocation !== null" class="d-flex justify-content-end border-0">
              <b-btn
                :disabled="isDisabled"
                variant="outline-primary"
                class="px-3"
                pill
                @click="onSave"
              >
                <b-icon-arrow-clockwise v-if="isSaving" animation="spin" />
                <save-icon v-else v-bind="{ size: '1.2em' }" />
                {{ isSaving ? 'Saving...' : 'Save Location' }}
              </b-btn>
            </b-card-footer>
          </b-card>
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
      location: null
    }
  },
  computed: {
    tabs() {
      const vertical = this.selectedLocation ? this.selectedLocation.properties.vertical : null
      const title = {
        mf: 'Amenities',
        ss: 'Features',
        sl: 'Amenities / Care Levels'
      }
      return [
        {
          id: 'location-details',
          title: 'Details'
        },
        {
          id: 'location-amenities',
          title: title[vertical] ? title[vertical] : 'Amenities'
        },
        {
          id: 'location-assets',
          title: 'Assets'
        }
      ]
    },
    isDisabled () {
      return !this.selectedLocation.edited
    }
  },
  methods: {
    async onSave () {
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
    // height: calc(100vh - 65px);
    width: 100%;
    display: grid;
    grid-template-columns: minmax(min-content, 300px) auto;
    overflow-y: hidden;
  }
}
.main-content {
  background: white;
  height: 100%;
  overflow-y: hidden;
}
.ov-x-hidden {
  overflow-x: hidden;
}
// .tab-padding ul {
//   padding: 0;
//   max-width: 400px;
// }
// .nav-tabs {
//   overflow: hidden;
//   border-radius: 0 0 10px 0;
// }
// .nav-tabs .nav-item {
//   margin-right: 5px;
// }
.nav-tabs .nav-link.active,
.nav-tabs .nav-item.show .nav-link {
  box-shadow: inset 0 -5px 0 0 #339698;
  border-color: #fff #fff #339698;
  background-color: white;
}
</style>
