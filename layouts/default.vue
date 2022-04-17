<template>
  <div class="wrap-page">
    <Header />
    <main class="main">
      <Main />
    </main>
    <div class="border-primary-color" />
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/layout/Header.vue'
import Main from '@/components/layout/Main.vue'
import Footer from '@/components/layout/Footer.vue'

export default {
  components: {
    Header,
    Main,
    Footer
  }
}
</script>
<style lang="scss" scoped>
.border-primary-color {
  border: 4px solid $primary_color;
  margin-top: 65px;
  margin-bottom: 48px;
}
</style>
