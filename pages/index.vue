<template>
  <div class="home-index full-box">
    <Banner />
    <div class="container pd-t-50r">
      <div class="row">
        <div class="col-md-9 col-12 mg-b-30r">
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
            :total-page="(Math.floor(totalRecordsCompany/10) + (totalRecordsCompany % 10 == 0 ? 0 : 1 ))"
            @change="changPage"
          />
        </div>
        <div class="col-md-3 col-12">
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
                  <nuxt-link :to="localePath('/tra-cuu-ma-so-thue-theo-tinh/ha-noi')" class="primary-color-txt font-size-18">
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
  asyncData ({ route, store }) {
    return store.dispatch('company/acGetListCompanyByTax', { keyword: '', pageIndex: route.query.page ? Number(route.query.page) : 1, pageSize: 10, type: -1 })
  },
  data () {
    return {
      listProvince: [
        {
          name: 'Hà Nội'
        },
        {
          name: 'TP Hồ Chí Minh'
        },
        {
          name: 'Hải Phòng'
        },
        {
          name: 'Thái Bình'
        },
        {
          name: 'Thanh Hóa'
        },
        {
          name: 'Đà Nẵng'
        },
        {
          name: 'Huế'
        },
        {
          name: 'Lạng Sơn'
        },
        {
          name: 'Cao Bằng'
        },
        {
          name: 'Lai Châu'
        },
        {
          name: 'Phú Thọ'
        }
      ],
      isFetchCompany: false
    }
  },
  fetch () {
    if (this.isFetchCompany) {
      this.isFetchCompany = false
      return this.$store.dispatch('company/acGetListCompanyByTax', { keyword: '', pageIndex: this.$route.query.page ? Number(this.$route.query.page) : 1, pageSize: 10, type: -1 })
    }
  },
  computed: {
    ...mapState(STORE_KEY, ['listCompany', 'totalRecordsCompany'])
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
      this.$router.push({ path: '/', query: { page: page.page, size: 10 } })
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
  .scroll-class {
    max-height: 100vh;
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
        margin-left: 2.7em;
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
