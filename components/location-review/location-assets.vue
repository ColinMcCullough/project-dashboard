<template>
  <b-container fluid class="my-3 pt-2" style="height: 100%; overflow-y: scroll;">
    <b-row>
      <b-col class="mb-2">
        <b-btn-group size="sm">
          <b-btn
            variant="primary-30"
            pill
            class="mr-2 px-3"
            @click="selectAll"
          >
            <b-icon-ui-checks-grid />
            Select All
          </b-btn>
          <b-btn
            :disabled="selected.length === 0"
            variant="error-30"
            pill
            class="mr-2 px-3"
            @click="deleteSelected"
          >
            <b-icon-trash-fill />
            Delete all Selected
          </b-btn>
          <b-btn
            variant="gray-30"
            pill
            class="mr-2"
            @click="getImagesByFolder(selectedLocation.cloudinaryFolder)"
          >
            <b-icon-arrow-clockwise :animation="isLoading ? 'spin' : null" />
            Refresh
          </b-btn>
        </b-btn-group>
      </b-col>
      <b-col class="text-left">
        <b-pagination
          v-model="currentPage"
          pills
          :total-rows="images.length"
          :per-page="perPage"
          size="sm"
        />
      </b-col>
    </b-row>
    <b-row no-gutters>
      <div
        v-for="(img, i) in imagesPerPage"
        :key="`img-${i}`"
        class="m-1"
        style="max-width: 200px;"
      >
        <b-card
          :img-src="getUrl(img.public_id)"
          overlay
          body-class="p-0"
          footer-class="p-1 d-flex flex-column align-items-start ov-x-hidden"
        >
          <div class="d-flex justify-content-between">
            <b-form-checkbox
              v-model="img.selected"
              button-variant="outline-gray-10"
              size="sm"
              button
              @change="toggleSelected(img.public_id)"
            >
              <b-icon-check-circle />
            </b-form-checkbox>
            <b-btn
              variant="outline-error-30"
              size="sm"
              class="btn-trash"
              @click="deleteImg(img.public_id)"
            >
              <b-icon-trash-fill />
            </b-btn>
          </div>
          <template v-slot:footer>
            <i class="text-muted small">
              {{ img.public_id }}
            </i>
            <p class="small mb-0">
              {{ (img.bytes / 1000).toFixed(2) }}KB
            </p>
            <strong class="text-muted small">
              {{ img.width }} x {{ img.height }}
            </strong>
          </template>
        </b-card>
      </div>
    </b-row>
    <b-row v-if="images.length < 1">
      <b-badge variant="error" class="ml-3 rounded">
        <b-icon-exclamation-triangle-fill />
        No Images to Display
      </b-badge>
    </b-row>
  </b-container>
</template>

<script>
import cloudinaryMixin from '~/mixins/cld'
import Locations from '~/mixins/locations'
export default {
  mixins: [cloudinaryMixin, Locations],
  data() {
    return {
      selected: [],
      perPage: 12,
      currentPage: 1
    }
  },
  computed: {
    imagesPerPage() {
      const start = (this.currentPage - 1) * this.perPage
      const stop = start + this.perPage
      return this.images.slice(start, stop)
    }
  },
  watch: {
    selectedLocation(location) {
      const path = location.cloudinaryFolder
      if (path) {
        this.getImagesByFolder(path)
      } else {
        this.images = []
      }
    }
  },
  created() {
    const path = this.selectedLocation.cloudinaryFolder
    if (path) {
      this.getImagesByFolder(path)
    }
  },
  methods: {
    selectAll () {
      this.images.forEach((img, i) => {
        this.images[i].selected = !this.images[i].selected
        this.toggleSelected(img.public_id)
      })
    },
    async deleteSelected () {
      for (let i = 0; i < this.selected.length; i++) {
        await this.deleteImg(this.selected[i])
      }
      this.selected = []
    },
    toggleSelected (id) {
      if (this.selected.includes(id)) {
        this.selected.splice(this.selected.findIndex(sId => sId === id), 1)
      } else {
        this.selected.push(id)
      }
    }
  }
}
</script>

<style>

</style>
