<template>
  <div>
    <b-input-group>
      <b-form-input v-model.trim="url" />
      <template v-slot:append>
        <b-btn variant="success-1" @click="discover(url, 'response')">
          Discover Links
        </b-btn>
      </template>
    </b-input-group>
    <b-list-group v-if="response" class="mt-2">
      <b-list-group-item
        v-for="(link, i) in response"
        :key="`link-${i}`"
        :class="i % 2 === 0 ? 'bg-muted' : ''"
      >
        <url-edit v-bind="{ index: i, url: link }" />
      </b-list-group-item>
      <b-list-group-item class="px-0 py-0 mb-0">
        <b-btn-group class="w-100">
          <b-btn variant="success-1">
            Looks Good!
          </b-btn>
        </b-btn-group>
      </b-list-group-item>
    </b-list-group>
    {{ error }}
  </div>
</template>

<script>
import LinkDiscovererMixin from '~/mixins/link-discoverer'
export default {
  mixins: [LinkDiscovererMixin],
  data() {
    return {
      url: null,
      response: null
    }
  },
  computed: {
    isValidUrl() {
      return true
    }
  }
}
</script>

<style>

</style>
