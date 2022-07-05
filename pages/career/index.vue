<template>
  <div class="career container">
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
    <div class="row mt-4">
      <div class="col-md-9">
        <h3 class="career__title font-weight-medium primary-color-txt border-title">
          Tra cứu mã số thuế theo ngành nghề
        </h3>
        <div class="career__list">
          <div class="career-header display-flex">
            <h4 class="code text-center mr-4">
              Mã
            </h4>
            <h4>Ngành</h4>
          </div>
          <div class="career-body">
            <div v-for="(item, index) of listBusinessType" :key="index" class="item item-career display-flex cursor-pointer font-size-18">
              <p class="code text-center mr-4">
                <nuxt-link class="primary-color-txt" :to="localePath(`/tra-cuu-theo-nganh-nghe/${item.alias}`)">
                  {{ item.id }}
                </nuxt-link>
              </p>
              <p>
                <nuxt-link class="primary-color-txt" :to="localePath(`/tra-cuu-theo-nganh-nghe/${item.alias}`)">
                  {{ item.name }}
                </nuxt-link>
              </p>
            </div>
          </div>
        </div>
        <Pagination
          :total-records="totalRecordsBusinessType"
          :total-page="(Math.floor(totalRecordsBusinessType/50) + (totalRecordsBusinessType % 50 == 0 ? 0 : 1 ))"
          @change="changPage"
        />
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
      <div class="col-md-3">
        <div v-if="listAdvertisementRight && listAdvertisementRight.length > 0" class="mst-ads">
          <a v-for="(item, index) of listAdvertisementRight" v-show="item.isEnable" :key="index" :href="item.url" target="blank">
            <figure v-if="item.type === 1" class="aspect-ratio aspect-ratio--2-5">
              <img loading="lazy" :src="item.thumb ? cdnUrl + item.thumb : ''" alt="banner" class="img-fit">
            </figure>
            <!-- eslint-disable -->
              <p v-else v-html="item.content ? item.content : ''" class="font-size-42 color-dark"/>
          </a>
        </div>
        <div class="mb-5">
          <h3 class="font-weight-medium primary-color-txt border-title">
            Tra mã số thuế trên Facebook
          </h3>
          <a href="https://www.facebook.com/masothuedotcom" target="_blank">
            <figure>
              <img src="@/assets/images/banner/image-fb.png">
            </figure>
          </a>
        </div>
        <div>
          <h3 class="font-weight-medium primary-color-txt border-title">
            Tỉnh/thành phố
          </h3>
          <vueCustomScrollbar class="scroll-class none-ps-x none-ps-y">
            <ul class="row list-sort list-style-none">
              <li v-for="(item1, index1) of listProvince" :key="index1" class="cat-item align-items-center col-xs-6 col-md-12">
                <nuxt-link :to="localePath(`/tra-cuu-doanh-nghiep/${item1.alias}-${item1.matp}`)" class="primary-color-txt font-size-18">
                  {{ item1.name }}
                </nuxt-link>
              </li>
            </ul>
          </vueCustomScrollbar>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import vueCustomScrollbar from 'vue-custom-scrollbar'
import Pagination from '@/components/shared/Pagination.vue'
import { APP_CONFIG } from '@/utils/env'

export default {
  name: 'IndexCareer',
  components: {
    Pagination,
    vueCustomScrollbar
  },
  nuxtI18n: {
    paths: {
      vi: '/tra-cuu-theo-nganh-nghe'
    }
  },

  async asyncData ({ route, store }) {
    const dataApi = await Promise.allSettled([
      store.dispatch('common/acGetListBusinessType', route.query.page ? Number(route.query.page) : 1),
      store.dispatch('common/acGetListAdvertisement'),
      store.dispatch('common/acGetDataConfig')
    ])
    return { dataApi }
  },
  data () {
    return {
      cdnUrl: APP_CONFIG.cdnUrl,
      isFetchBusinessType: false
    }
  },
  fetch () {
    if (this.isFetchBusinessType) {
      this.isFetchBusinessType = false
      return this.$store.dispatch('common/acGetListBusinessType', this.$route.query.page ? Number(this.$route.query.page) : 1)
    }
  },
  computed: {
    ...mapState('common', ['listProvince', 'listBusinessType', 'totalRecordsBusinessType', 'listAdvertisement']),
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
  watch: {
    '$route.query.page': 'fetchData'
  },
  mounted () {
    this.scrollToTop()
    if (this.listProvince && this.listProvince.length === 0) {
      this.acGetListProvince()
    }
  },
  methods: {
    ...mapActions('common', ['acGetListProvince']),
    changPage (page) {
      this.$router.push({ path: '/tra-cuu-theo-nganh-nghe', query: { page: page.page } })
    },
    fetchData (newVal) {
      if (newVal) {
        setTimeout(() => {
          this.isFetchBusinessType = true
          return this.$fetch()
        }, 200)
        setTimeout(() => {
          this.scrollToTop()
        }, 500)
      }
    },
    scrollToTop () {
      window.scrollTo(0, 0)
    }
  }
}
</script>

<style lang="scss" scoped>
  .career {
    padding-top: 1rem;
    // width: 60%;
    &__title {
      &:after {
        width: 40%;
      }
    }
    &__list {
      .career-header {
        border-bottom: 1px solid $color_border;
        padding-bottom: 0.6rem;
        margin-bottom: 0.8rem;
      }

      .code {
        width: 60px;
      }

      .career-body {
        .item {
          border-bottom: 1px solid $color_background;
          padding-bottom: 0.6rem;
          margin-bottom: 0.8rem;

          &:hover {
            color: $primary-color;
          }
        }
      }
    }
    .list-sort {
  li {
    border-bottom: 1px solid $color_border;
    position: relative;
    min-height: 1px;
    padding-right: 0.9375rem;
    padding-left: 0.9375rem;
    a {
        position: relative;
        margin-left: 2.5rem;
        padding: 0.5em 0;
        display: inline-block;
        &:before {
          color: #575560;
          content: "";
          font-family: FontAwesome;
          font-size: 1.1em;
          line-height: 1em;
          margin-left: -1.4em;
          position: absolute;
        }
      }
  }
  li:last-child {
    border-bottom: 0;
  }
  li:hover {
    a {
        color: $primary_color;
      }
  }
}
  }
.item-career {
  &:hover {
    a {
      color: $primary_color;
    }
  }
}
</style>
