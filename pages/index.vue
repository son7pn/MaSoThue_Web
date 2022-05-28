<template>
  <div class="home-index full-box">
    <div v-if="listAdvertisementHead && listAdvertisementHead.length > 0" class="container">
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
    <Banner />
    <div class="container pd-t-50r">
      <div class="row">
        <div class="col-md-8 col-12 mg-b-30r">
          <h3 class="font-weight-medium primary-color-txt mg-b-20r border-title font-size-34">
            Tra Cứu Mã Số Thuế (Công Ty, Cá Nhân)
          </h3>
          <!-- <vueCustomScrollbar class="scroll-class none-ps-x" @ps-y-reach-end="infiniteScroll()"> -->
          <!-- <vueCustomScrollbar class="scroll-class none-ps-x none-ps-y"> -->
          <ItemInfoBusiness
            v-for="(item, index) of listCompany"
            :key="index"
            :data-source="item"
          />
          <!-- </vueCustomScrollbar> -->
          <Pagination
            :total-records="totalRecordsCompany"
            :total-page="(Math.floor(totalRecordsCompany/20) + (totalRecordsCompany % 20 == 0 ? 0 : 1 ))"
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
        <div class="col-md-4 col-12">
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
            <h3 class="font-weight-medium primary-color-txt search-province">
              Tra mã số thuế trên Facebook
            </h3>
            <a href="https://www.facebook.com/masothuedotcom" target="_blank">
              <figure>
                <img src="@/assets/images/banner/image-fb.png">
              </figure>
            </a>
          </div>
          <div>
            <h3 class="font-weight-medium primary-color-txt search-province">
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
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import vueCustomScrollbar from 'vue-custom-scrollbar'
import { STORE_KEY } from '@/store/company/constants'
import { APP_CONFIG } from '@/utils/env'
import 'vue-custom-scrollbar/dist/vueScrollbar.css'
import ItemInfoBusiness from '@/components/shared/ItemInfoBusiness.vue'
import Banner from '@/components/shared/Banner.vue'
import Pagination from '@/components/shared/Pagination.vue'
export default {
  components: {
    vueCustomScrollbar,
    ItemInfoBusiness,
    Banner,
    Pagination
  },
  async asyncData ({ route, store }) {
    const dataApi = await Promise.allSettled([
      store.dispatch('company/acGetListCompanyByTax', { keyword: '', pageIndex: route.query.page ? Number(route.query.page) : 1, pageSize: 20, type: -1 }),
      store.dispatch('common/acGetListProvince'),
      store.dispatch('common/acGetListAdvertisement')
    ])
    return { dataApi }
  },
  data () {
    return {
      cdnUrl: APP_CONFIG.cdnUrl,
      isFetchCompany: false,
      structuredData: {
        '@context': 'http://schema.org',
        '@type': 'Recipe',
        author: {
          '@type': 'Person',
          name: 'Mary Stone'
        },
        datePublished: '2022-05-10',
        description: 'Mã Số Thuế (Công ty, Cá Nhân) - MaSoThue.',
        prepTime: 'PT20M'
      }
    }
  },
  fetch () {
    if (this.isFetchCompany) {
      this.isFetchCompany = false
      return this.$store.dispatch('company/acGetListCompanyByTax', { keyword: '', pageIndex: this.$route.query.page ? Number(this.$route.query.page) : 1, pageSize: 20, type: -1 })
    }
  },
  head () {
    return {
      script: [{ type: 'application/ld+json', json: this.structuredData }]
    }
  },
  computed: {
    ...mapState(STORE_KEY, ['listCompany', 'totalRecordsCompany']),
    ...mapState('common', ['listProvince', 'listAdvertisement']),
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
  },
  methods: {
    ...mapActions(STORE_KEY, ['acGetListCompanyByTax']),
    changPage (page) {
      // this.acGetListCompanyByTax({ keyword: '', pageIndex: page.page, pageSize: 10, type: -1 })
      this.$router.push({ path: '/', query: { page: page.page } })
    },
    fetchData (newVal) {
      if (newVal) {
        setTimeout(() => {
          this.isFetchCompany = true
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

.home-index {

.search-province {
  margin-bottom: 0.842em;
  padding-bottom: 1.053em;
  position: relative;
  border-bottom: 1px solid $color_border;
  &:after {
    content: ' ';
    width: 60%;
    border-bottom: 3px solid $primary_color;
    display: block;
    position: absolute;
    bottom: -1px;
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
</style>
