<template>
  <main class="main">
    <transition name="fade-transform" mode="out-in">
      <nuxt :key="key" />
    </transition>
  </main>
</template>

<script>
const config = require('./../../appsettings.json')

export default {
  name: 'Main',
  head() {
    return {
     
    }
  },
  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
