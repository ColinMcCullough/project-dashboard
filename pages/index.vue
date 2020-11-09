<template>
  <div class="centered">
    <transition name="tilt-in-right-1" appear>
      <narwhal :size="`15em`" :color="`#8dc7cb`" />
    </transition>
  </div>
</template>

<style lang="scss">
.centered {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
