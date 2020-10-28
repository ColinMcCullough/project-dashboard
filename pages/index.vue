<template>
  <div class="centered">
    <top-nav>
      <b-btn
        variant="outline-success-0"
        pill
        to="/dev/dashboard"
        class="mr-2"
      >
        Dev
      </b-btn>
      <b-btn
        variant="outline-success-0"
        pill
        to="/queues"
      >
        Queues and Jobs
      </b-btn>
    </top-nav>
    <transition name="slide-fade" appear>
      <octopus :size="`5em`" :color="`#8dc7cb`" />
    </transition>
  </div>
</template>

<script>
import Octopus from '~/components/icons/octopus'
export default {
  components: {
    Octopus
  }
}
</script>

<style lang="scss">
.centered {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
