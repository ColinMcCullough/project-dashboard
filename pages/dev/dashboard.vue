<template>
  <b-container fluid style="max-width: 1400px;">
    <top-nav />
    <!-- MODAL COMPONENT START -->
    <modal-template title="Intake">
      <intake-table />
    </modal-template>
    <!-- MODAL COMPONENT END -->
    <b-row>
      <b-col>
        <b-jumbotron v-bind="jumbotron" fluid class="mb-0">
          <b-input-group>
            <b-form-input />
            <b-btn variant="outline-muted">
              <b-icon-search />
              Filter
            </b-btn>
          </b-input-group>
        </b-jumbotron>
      </b-col>
    </b-row>
    <b-card style="overflow-x: hidden;" class="my-5">
      <b-row>
        <b-col>
          <project-header />
        </b-col>
      </b-row>
      <b-row
        v-for="(project, i) in rows"
        :key="`project-${i}`"
      >
        <b-col>
          <project-row v-bind="{ project }" />
        </b-col>
      </b-row>
    </b-card>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      jumbotron: {
        header: 'Hi there',
        'bg-variant': 'muted'
      },
      rows: [
        {
          details: {
            title: 'Client Name',
            'sub-title': 'From Project 9099909',
            class: 'chevron-right w-25 rounded-0'
          },
          intake: {
            class: 'chevron-right is-alert rounded-0',
            props: {
              isAlert: true
            }
          },
          assets: {
            'sub-title': 'Where we get all the info and images',
            class: 'chevron-right is-disabled rounded-0 text-light'
          },
          links: {
            class: 'chevron-right is-disabled rounded-0'
          }
        },
        {
          details: {
            title: 'Client Name',
            'sub-title': 'From Project 9099909',
            class: 'chevron-right w-25 rounded-0'
          },
          intake: {
            class: 'chevron-right is-complete rounded-0',
            props: {
              isAlert: false
            }
          },
          assets: {
            'sub-title': 'Where we get all the info and images',
            class: 'chevron-right is-alert rounded-0'
          },
          links: {
            class: 'chevron-right is-disabled rounded-0'
          }
        },
        {
          details: {
            title: 'Client Name',
            'sub-title': 'From Project 9099909',
            class: 'chevron-right w-25 is-disabled rounded-0'
          },
          intake: {
            class: 'chevron-right is-complete rounded-0',
            props: {
              isAlert: false
            }
          },
          assets: {
            'sub-title': 'Where we get all the info and images',
            class: 'chevron-right is-alert rounded-0'
          },
          links: {
            class: 'chevron-right is-disabled rounded-0'
          }
        }
      ]
    }
  }
}
</script>

<style>

</style>
