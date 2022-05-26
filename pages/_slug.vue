<template>
  <div class="container province">
    <div class="row mt-4">
      <div class="col-md-8 col-12 detai-company">
        <h1 class="font-weight-medium border-title primary-color-txt font-size-26 mg-b-64r">
          {{ detailCompanyByTax.tax }} - {{ detailCompanyByTax.compnayName }}
        </h1>
        <!-- <ViewDocs :data-source="dataDoc" /> -->
        <div class="row">
          <DetailCompany :data-source="detailCompanyByTax" class="col-md-9" />
        </div>
        <!--eslint-disable-->
      <client-only>
        <p v-html="detailCompanyByTax.content ? detailCompanyByTax.content : ''"/>
      </client-only>
       <div class="preview-pdf">
         <iframe v-if="detailCompanyByTax.attackName" :src="cdnUrl + detailCompanyByTax.attackName" width="100%" height="100%"></iframe>
       </div>
      <!-- eslint-enable -->
        <div class="mg-t-64r">
          <h4 class="font-sanpro-semibold primary-color-txt title-comment">
            Bình luận
          </h4>
          <RateArticles />
          <ModulesComment :list-comment-post="listComment" :article-id="detailCompanyByTax.id" />
        </div>
        <div class="mg-t-64r">
          <h4 class="font-sanpro-semibold primary-color-txt title-comment">
            Doanh nghiệp tại địa phương
          </h4>
          <!-- <vueCustomScrollbar class="scroll-class none-ps-x none-ps-y"> -->
          <ItemInfoBusiness
            v-for="(item, index) of listCompanyByProvince"
            v-show="item.tax !== taxActi"
            :key="index"
            :data-source="item"
          />
        <!-- </vueCustomScrollbar> -->
        </div>
        <div class="mg-t-64r">
          <h4 class="font-sanpro-semibold primary-color-txt title-comment">
            Doanh nghiệp mới
          </h4>
          <!-- <vueCustomScrollbar class="scroll-class none-ps-x none-ps-y"> -->
          <ItemInfoBusiness
            v-for="(item, index) of listCompanyNew"
            v-show="item.tax !== taxActi"
            :key="index"
            :data-source="item"
          />
        <!-- </vueCustomScrollbar> -->
        </div>
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
              <li v-for="(item1, index1) of listProvince" :key="index1" class="cat-item align-items-center col-xs-6 col-md-12" :class="{'activeProvince' : item1.alias === provinceAlias }">
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
// import vueCustomScrollbar from 'vue-custom-scrollbar'
// import 'vue-custom-scrollbar/dist/vueScrollbar.css'
// import ViewDocs from '@/components/shared/previewDocs/ViewDocs.vue'
import { STORE_KEY } from '@/store/company/constants'
import { APP_CONFIG } from '@/utils/env'
import ModulesComment from '@/components/shared/comment/ModulesComment.vue'
import ItemInfoBusiness from '@/components/shared/ItemInfoBusiness.vue'
import DetailCompany from '@/components/shared/DetailCompany.vue'
import RateArticles from '@/components/shared/comment/RateArticles.vue'
export default {
  components: {
    // vueCustomScrollbar,
    // ViewDocs,
    ModulesComment,
    ItemInfoBusiness,
    DetailCompany,
    RateArticles
  },
  nuxtI18n: {
    paths: {
      vi: '/:slug'
    }
  },
  asyncData ({ route, store }) {
    const tax = route.params.slug.split('-').shift()
    return store.dispatch('company/acDetailCompanyByTax', tax)
  },
  data () {
    return {
      isFetchListComment: false,
      listCompanyNew: [],
      listCompanyByProvince: [],
      cdnUrl: APP_CONFIG.cdnImageUrl
    }
  },
  // fetch () {
  //   const self = this
  //   if (self.isFetchListComment) {
  //     self.isFetchListComment = false
  //     self.$store.dispatch('common/acGetListComment', { articleId: 3333, pageIndex: 1, pageSize: 10 })
  //   }
  // },
  computed: {
    ...mapState('common', ['listComment', 'listProvince']),
    ...mapState(STORE_KEY, ['detailCompanyByTax']),
    taxActi () {
      const tax = this.$route.params.slug.split('-').shift()
      return tax
    }
  },
  watch: {
    // listComment () {
    //   setTimeout(() => {
    //     this.isFetchListComment = true
    //     return this.$fetch()
    //   }, 500)
    // }
  },
  mounted () {
    this.acGetListComment({ articleId: this.detailCompanyByTax.id, pageIndex: 1, pageSize: 10 })
    this.initDataCompany()
    this.scrollToTop()
    if (this.listProvince && this.listProvince.length === 0) {
      this.acGetListProvince()
    }
  },
  methods: {
    ...mapActions('common', ['acGetListComment', 'acGetListProvince']),
    initDataCompany () {
      this.acGetCompanyNew()
      this.acGetCompanyByProvince()
    },
    async acGetCompanyByProvince () {
      const data = await this.$apis.companyApi.showCompanyByTax({ keyword: this.detailCompanyByTax.provinceAlias, pageIndex: 1, pageSize: 10, type: 4 })
      if (data) {
        this.listCompanyByProvince = data.list
      }
    },
    async acGetCompanyNew () {
      const data = await this.$apis.companyApi.showCompanyByTax({ keyword: '', pageIndex: 1, pageSize: 10, type: 0 })
      if (data) {
        this.listCompanyNew = data.list
      }
    },
    scrollToTop () {
      window.scrollTo(0, 0)
    }
  }
}
</script>

<style lang="scss" scoped>
.scroll-class {
  max-height: 60vh;
}
.province {
  padding-top: 1rem;
}
.preview-pdf {
  margin-top: 2rem;
  height: 100vh;
}
.detai-company {
  .title-comment {
    margin-bottom: 2rem;
    padding-bottom: 1.053em;
    position: relative;
    border-bottom: 1px solid $color_border;
    &:after {
      content: ' ';
      width: 20%;
      border-bottom: 3px solid $primary_color;
      display: block;
      position: absolute;
      bottom: -1px;
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
    margin: 0 15px;
    a {
        position: relative;
        margin-left: 1.5rem;
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
</style>
