<template>
  <div class="search container">
    <div class="row mt-4">
      <div class="col-md-8 col-12">
        <h3 class="font-weight-medium primary-color-txt border-title font-size-34">
          {{ $route.query.type == 2 ? `Tra cứu tên công ty ${$route.query.keyword}` : $route.query.type == 3 ? `Tra cứu tên người đại diện pháp luật ${$route.query.keyword}` : 'Tra cứu mã số thuế và danh sách công ty' }}
        </h3>
        <ItemInfoBusiness
          v-for="(item, index) of listCompany"
          :key="index"
          :data-source="item"
        />
        <Pagination
          :total-records="totalRecordsCompany"
          :total-page="(Math.floor(totalRecordsCompany/10) + (totalRecordsCompany % 10 == 0 ? 0 : 1 ))"
          @change="changPage"
        />
      </div>
      <div class="col-md-4 col-12">
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
              <li v-for="(item1, index1) of listProvince" :key="index1" class="cat-item align-items-center col-6">
                <nuxt-link :to="localePath(`/tra-cuu-doanh-nghiep/${item1.alias}`)" class="primary-color-txt font-size-18">
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
import { STORE_KEY } from '@/store/company/constants'
import ItemInfoBusiness from '@/components/shared/ItemInfoBusiness.vue'
import Pagination from '@/components/shared/Pagination.vue'

export default {
  name: 'Slugsearch',
  components: {
    vueCustomScrollbar,
    ItemInfoBusiness,
    Pagination
  },
  nuxtI18n: {
    paths: {
      vi: '/tra-cuu'
    }
  },
  asyncData ({ route, store }) {
    return store.dispatch('company/acGetListCompanyByTax', { keyword: route.query.keyword ? route.query.keyword : '', pageIndex: route.query.page ? Number(route.query.page) : 1, pageSize: 10, type: route.query.type ? route.query.type : 0 })
  },
  data () {
    return {
      isFetchCompany: false
    }
  },
  fetch () {
    if (this.isFetchCompany) {
      this.isFetchCompany = false
      return this.$store.dispatch('company/acGetListCompanyByTax', { keyword: this.$route.query.keyword, pageIndex: this.$route.query.page ? Number(this.$route.query.page) : 1, pageSize: 10, type: Number(this.$route.query.type) })
    }
  },
  computed: {
    ...mapState(STORE_KEY, ['listCompany', 'totalRecordsCompany']),
    ...mapState('common', ['listProvince'])
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
    ...mapActions(STORE_KEY, ['acGetListCompanyByTax']),
    ...mapActions('common', ['acGetListProvince']),
    changPage (page) {
      this.acGetListCompanyByTax({ keyword: this.$route.query.keyword, pageIndex: page.page, pageSize: 10, type: Number(this.$route.query.type) })
      this.$router.push({ path: '/tra-cuu', query: { page: page.page, keyword: this.$route.query.keyword, type: Number(this.$route.query.type) } })
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

<style  lang="scss" scoped>
.search {
  padding-top: 1rem;
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
        margin-left: 0.5rem;
        padding: 0.5em 0;
        display: inline-block;
        // &:before {
        //   color: #575560;
        //   content: "";
        //   font-family: FontAwesome;
        //   font-size: 1.1em;
        //   line-height: 1em;
        //   margin-left: -1.4em;
        //   position: absolute;
        // }
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
</style>
