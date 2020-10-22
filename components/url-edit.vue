<template>
  <b-input-group>
    <b-input-group-prepend class="d-flex align-items-center pr-2 num text-tertiary">
      {{ index }}
    </b-input-group-prepend>
    <b-form-input
      :value="url"
      @input="$emit('url-update', { index, url })"
    />
    <template v-slot:append>
      <b-btn
        variant="outline-tertiary-0"
        @click="$emit('url-drop', { index })"
      >
        <b-icon-trash-fill />
      </b-btn>
    </template>
  </b-input-group>
</template>

<script>
export default {
  props: {
    index: {
      type: Number,
      required: true
    },
    url: {
      type: String,
      default: ''
    }
  }
}
</script>

<style>
.num {
  font-style: italic;
  font-weight: 700;
  font-size: 1.5em;
}
</style>
