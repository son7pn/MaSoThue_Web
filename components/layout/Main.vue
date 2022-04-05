<template>
  <main class="main">
    <transition name="fade-transform" mode="out-in">
      <nuxt :key="key" />
    </transition>
  </main>
</template>

<script>
export default {
  name: 'Main',
  computed: {
    key () {
      return this.$route.path
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
