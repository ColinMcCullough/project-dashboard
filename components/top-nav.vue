<template>
  <b-navbar
    variant="primary-30"
    toggleable="md"
    type="dark"
    fixed="top"
    class="primary-nav"
  >
    <b-navbar-brand to="/" class="d-flex align-items-center">
      <b-img
        src="/midnight-g5-logo.png"
        width="30"
        height="30"
        alt="g5-logo"
        title="G5 Marketing"
        class="mx-3"
      />
      <h1 class="h1-nav-brand text-primary-70 text-uppercase">
        Project Onboarding
      </h1>
    </b-navbar-brand>
    <b-navbar-nav>
      <b-badge variant="error-30" class="px-2 align-self-center mr-2 rounded">
        BETA
      </b-badge>
      <span class="text-primary-70 align-self-center">
        v.{{ version }}
      </span>
    </b-navbar-nav>
    <!-- Right aligned nav items -->
    <b-navbar-nav class="ml-auto pr-2">
      <b-btn
        link
        href="https://getg5.slack.com/archives/CR01N6NNQ"
        target="_blank"
        class="text-white bg-transparent border-0"
        size="sm"
      >
        <slack v-bind="icon" />
      </b-btn>
      <b-btn
        link
        href="https://opex.g5marketingcloud.com"
        target="_blank"
        class="text-white bg-transparent border-0 mr-2"
        size="sm"
      >
        <octopus v-bind="icon" />
      </b-btn>
      <slot />
    </b-navbar-nav>
    <div v-if="show" class="secondary-nav bg-primary-60 text-secondary-20 d-flex">
      <slot name="secondary-nav" />
      <div class="tertiary-nav bg-primary-70 px-5">
        <project-header />
      </div>
    </div>
  </b-navbar>
</template>

<script>
import { version } from '~/package.json'
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      version,
      icon: {
        size: '1.5em',
        color: '#8dc7cb'
      }
    }
  }
}
</script>

<style lang="scss">
.primary-nav {
  background: linear-gradient(65deg, transparent, #2d4663);
}
.secondary-nav {
  position: absolute;
  // box-shadow: inset 0 5px 20px rgba(10, 10, 10, 0.3);
  left: 0;
  right: 0;
  height: 100%;
  bottom: 0;
  transform: translateY(100%);
  padding: 2.5em 1.75em;
  & .custom-select {
    padding-left: 20px;
    background: transparent url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='4' height='5' viewBox='0 0 4 5'%3e%3cpath fill='%2382c9c9' d='M2 0L0 2h4zm0 5L0 3h4z'/%3e%3c/svg%3e") no-repeat right 0.75rem center/8px 10px;
    border: 2px solid #82c9c9;
    color: white;
    border-radius: 20px;
  }
  & .form-control {
    padding-left: 20px;
    border-radius: 20px;
    border: 2px solid #82c9c9;
    background: transparent;
    color: white;
    &::placeholder {
      color: #2c8181;
    }
  }
}
.tertiary-nav {
  position: absolute;
  box-shadow: 0 5px 20px rgba(10, 10, 10, 0.3);
  bottom: 0;
  left: 0;
  right: 0;
  transform: translateY(calc(100% - 1px));
  padding: 0;
}
.h1-nav-brand {
  font-size: 0.95em;
  margin-bottom: 0;
  font-weight: 700;
}
</style>
