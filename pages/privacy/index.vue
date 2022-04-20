<template>
  <div class="page-contact pd-t-30r container">
    <h2 class="font-sanpro-semibold primary-color-txt font-size-40 mg-b-64r display-flex-center justify-content-center full-width">
      Chính sách bảo mật - Quyền riêng tư
    </h2>
    <!--eslint-disable-->
    <client-only>
      <p class="line-height-48" v-html="contentConfig ? contentConfig : ''"/>
    </client-only>
    <!-- eslint-enable -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'IndexPrivacy',
  nuxtI18n: {
    paths: {
      vi: '/quyen-rieng-tu'
    }
  },
  asyncData ({ route, store }) {
    return store.dispatch('common/acGetContentConfig', 'POLICY')
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapState('common', ['contentConfig'])
  },
  mounted () {
    this.scrollToTop()
  },
  methods: {
    scrollToTop () {
      window.scrollTo(0, 0)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
