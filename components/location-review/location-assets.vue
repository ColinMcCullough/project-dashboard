<template>
  <b-container fluid class="my-3 pt-2" style="height: 100%; overflow-y: scroll;">
    <b-row>
      <b-col class="mb-2">
        <b-btn-group size="sm">
          <b-btn
            variant="primary-30"
            pill
            class="mr-2 px-3"
          >
            <b-icon-ui-checks-grid />
            Select All
          </b-btn>
          <b-btn
            variant="error-30"
            pill
            class="mr-2 px-3"
          >
            <b-icon-trash-fill />
            Delete all Selected
          </b-btn>
          <b-btn
            variant="gray-30"
            pill
            class="mr-2"
            @click="getImagesByFolder('decron')"
          >
            <b-icon-arrow-clockwise />
          </b-btn>
        </b-btn-group>
      </b-col>
    </b-row>
    <b-row no-gutters>
      <b-col
        v-for="(img, i) in images"
        :key="`img-${i}`"
        :class="'mb-2'"
        lg="3"
        md="4"
      >
        <b-card
          :img-src="getUrl(img.public_id)"
          overlay
          footer-class="p-1 d-flex flex-column align-items-start ov-x-hidden"
        >
          <div class="d-flex justify-content-between">
            <b-form-checkbox
              :value="true"
              button-variant="outline-gray-10"
              size="sm"
              pill
              button
            >
              <b-icon-check-circle />
            </b-form-checkbox>
            <b-btn
              variant="outline-error-30"
              size="sm"
              pill
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
              {{ img.bytes / 1000 }}kb
            </p>
            <b-badge
              v-for="tag in img.tags"
              :key="tag"
              variant="muted"
            >
              {{ tag }}
            </b-badge>
            <strong class="text-muted small">
              {{ img.width }} x {{ img.height }}
            </strong>
          </template>
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      {{ selected }}
    </b-row>
  </b-container>
</template>

<script>
import cloudinaryMixin from '~/mixins/cld'
export default {
  mixins: [cloudinaryMixin],
  data() {
    return {
      selected: []
    }
  },
  methods: {
    toggleSelected(id) {

    }
  }
}
</script>

<style>

</style>
