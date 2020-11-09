<template>
  <div fluid style="max-width: 1400px;">
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
    <div class="main">
      <b-container fluid class="scroll-container">
        <b-row>
          <b-col>
            <h1 class="text-center mt-2">
              Asset Scraper
            </h1>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-card
              title="Domain Info"
            >
              <b-row>
                <b-col>
                  <b-input-group prepend="Root Protocol" class="mb-2">
                    <b-form-input aria-label="Root Protocol" placeholder="Enter root protocol ex: https" />
                  </b-input-group>
                </b-col>
                <b-col>
                  <b-input-group prepend="Root Domain" class="mb-2">
                    <b-form-input aria-label="Root Domain" placeholder="Enter root domain ex: m2apartment.com" />
                  </b-input-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col>
                  Hi
                </b-col>
              </b-row>
            </b-card>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.main {
  position: fixed;
  top: 55px;
  left: 0;
  right: 0;
}
.scroll-container {
  overflow-y: scroll;
  height: 100%;
  scroll-behavior: smooth;
}
</style>
