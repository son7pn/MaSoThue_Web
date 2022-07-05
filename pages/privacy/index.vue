<template>
  <div class="page-contact pd-t-30r container">
    <div v-if="listAdvertisementHead && listAdvertisementHead.length > 0">
      <div class="mst-ads">
        <a v-for="(item, index) of listAdvertisementHead" v-show="item.isEnable" :key="index" :href="item.url" target="blank">
          <figure v-if="item.type === 1" class="aspect-ratio aspect-ratio--2-5">
            <img loading="lazy" :src="item.thumb ? cdnUrl + item.thumb : ''" alt="banner" class="img-fit">
          </figure>
          <!-- eslint-disable -->
          <p v-else v-html="item.content ? item.content : ''" class="font-size-42 color-dark"/>
        </a>
      </div>
    </div>
    <h2 class="font-sanpro-semibold primary-color-txt font-size-40 mg-b-64r display-flex-center justify-content-center full-width">
      Chính sách bảo mật - Quyền riêng tư
    </h2>
    <!--eslint-disable-->
    <client-only>
      <p class="line-height-48" v-html="contentConfig ? contentConfig : ''"/>
    </client-only>
    <!-- eslint-enable -->
    <div v-if="listAdvertisementBottom && listAdvertisementBottom.length > 0">
      <div class="mst-ads">
        <a v-for="(item, index) of listAdvertisementBottom" v-show="item.isEnable" :key="index" :href="item.url" target="blank">
          <figure v-if="item.type === 1" class="aspect-ratio aspect-ratio--2-5">
            <img loading="lazy" :src="item.thumb ? cdnUrl + item.thumb : ''" alt="banner" class="img-fit">
          </figure>
          <!-- eslint-disable -->
              <p v-else v-html="item.content ? item.content : ''" class="font-size-42 color-dark"/>
            </a>
          </div>
        </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { APP_CONFIG } from '@/utils/env'
export default {
  name: 'IndexPrivacy',
  nuxtI18n: {
    paths: {
      vi: '/quyen-rieng-tu'
    }
  },
  async asyncData ({ route, store }) {
    const dataApi = await Promise.allSettled([
      store.dispatch('common/acGetContentConfig', 'POLICY'),
      store.dispatch('common/acGetListAdvertisement')
    ])
    return { dataApi }
  },
  data () {
    return {
      cdnUrl: APP_CONFIG.cdnUrl
    }
  },
  head() {
    return {
     
      title:"Chính sách bảo mật",
     
    };
  },
  computed: {
    ...mapState('common', ['contentConfig', 'listAdvertisement']),
    listAdvertisementHead () {
      const arrayAds = []
      if (this.listAdvertisement && this.listAdvertisement.length > 0) {
        // eslint-disable-next-line array-callback-return
        this.listAdvertisement.map((item) => {
          if (item.position === 1) {
            arrayAds.push(item)
          }
        })
      }
      return arrayAds
    },
    listAdvertisementRight () {
      const arrayAds = []
      if (this.listAdvertisement && this.listAdvertisement.length > 0) {
        // eslint-disable-next-line array-callback-return
        this.listAdvertisement.map((item) => {
          if (item.position === 2) {
            arrayAds.push(item)
          }
        })
      }
      return arrayAds
    },
    listAdvertisementBottom () {
      const arrayAds = []
      if (this.listAdvertisement && this.listAdvertisement.length > 0) {
        // eslint-disable-next-line array-callback-return
        this.listAdvertisement.map((item) => {
          if (item.position === 3) {
            arrayAds.push(item)
          }
        })
      }
      return arrayAds
    }
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
