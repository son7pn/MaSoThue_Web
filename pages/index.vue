<template>
  <div class="home-index full-box">
    <Banner />
    <div class="container pd-t-50r">
      <div class="row">
        <div class="col-md-9 col-12 mg-b-30r">
          <h3 class="font-sanpro-semibold primary-color-txt mg-b-20r">
            Doanh nghiệp
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
            <h3 class="font-sanpro-semibold primary-color-txt search-province">
              Tra mã số thuế trên Facebook
            </h3>
            <a href="https://www.facebook.com/masothuedotcom" target="_blank">
              <figure>
                <img src="@/assets/images/banner/image-fb.png">
              </figure>
            </a>
          </div>
          <div>
            <h3 class="font-sanpro-semibold primary-color-txt search-province">
              Tỉnh/thành phố
            </h3>
            <vueCustomScrollbar class="scroll-class none-ps-x none-ps-y">
              <ul class="row list-sort list-style-none">
                <li v-for="(item1, index1) of listProvince" :key="index1" class="cat-item align-items-center col-xs-6 col-md-12">
                  <nuxt-link :to="localePath('/tra-cuu-ma-so-thue-theo-tinh/ha-noi')" class="primary-color-txt">
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
import { mapState } from 'vuex'
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
    return store.dispatch('company/acGetListCompanyByTax', { tax: 3603865094, pageIndex: 1, pageSize: 10 })
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
      ]
    }
  },
  computed: {
    ...mapState(STORE_KEY, ['listCompany', 'totalRecordsCompany'])
  },
  mounted () {
  },
  methods: {
    // ...mapActions(STORE_KEY, ['acGetListCompanyByTax']),
    changPage (page) {
      console.log('page: ', page)
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
    border-bottom: 4px solid $primary_color;
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
