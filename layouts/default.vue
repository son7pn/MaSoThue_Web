<template>
  <div class="wrap-page">
    <Header />
    <main class="main">
      <Main />
    </main>
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
