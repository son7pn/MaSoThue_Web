<template>
  <div class="container">
    <div class="detai-company pd-t-50r full-box pd-b-60r ">
      <h3 class="font-weight-medium border-title primary-color-txt mg-b-64r">
        {{ detailCompanyByTax.tax }} - {{ detailCompanyByTax.compnayName }}
      </h3>
      <!-- <ViewDocs :data-source="dataDoc" /> -->
      <div class="row">
        <DetailCompany :data-source="detailCompanyByTax" class="col-md-9" />
      </div>
      <!--eslint-disable-->
      <client-only>
        <p v-html="detailCompanyByTax.content ? detailCompanyByTax.content : ''"/>
      </client-only>
      <!-- eslint-enable -->
      <div class="mg-t-64r">
        <h4 class="font-sanpro-semibold primary-color-txt title-comment">
          Bình luận
        </h4>
        <ModulesComment :list-comment-post="listComment" :article-id="detailCompanyByTax.id" />
      </div>
      <div class="mg-t-64r">
        <h4 class="font-sanpro-semibold primary-color-txt title-comment">
          Doanh nghiệp tại địa phương
        </h4>
        <!-- <vueCustomScrollbar class="scroll-class none-ps-x none-ps-y"> -->
        <ItemInfoBusiness
          v-for="(item, index) of listCompany"
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
          v-for="(item, index) of listCompany"
          :key="index"
          :data-source="item"
        />
        <!-- </vueCustomScrollbar> -->
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
import ModulesComment from '@/components/shared/comment/ModulesComment.vue'
import ItemInfoBusiness from '@/components/shared/ItemInfoBusiness.vue'
import DetailCompany from '@/components/shared/DetailCompany.vue'
export default {
  components: {
    // vueCustomScrollbar,
    // ViewDocs,
    ModulesComment,
    ItemInfoBusiness,
    DetailCompany
  },
  nuxtI18n: {
    paths: {
      vi: '/:slug'
    }
  },
  asyncData ({ route, store }) {
    const tax = Number(route.params.slug.split('-').shift())
    return store.dispatch('company/acDetailCompanyByTax', tax)
  },
  data () {
    return {
      dataDoc: {
        avatar: null,
        countComment: 0,
        countDownload: 0,
        countLike: 0,
        countLove: 0,
        countSave: 0,
        countView: 7,
        countdisLike: 0,
        createAt: '2022-03-18T11:06:43.637',
        description: null,
        documentId: 13057,
        fileName: 'Tiêu chuẩn hoạt động nền tảng 1.0.docx',
        fileSize: 146.4,
        fileUrl: null,
        fullName: 'Sơn Phạm',
        imageUrl: null,
        isCommon: true,
        isDetele: false,
        isPublic: false,
        isSave: false,
        lessonPlanId: 0,
        logId: 1,
        name: 'Tiêu chuẩn hoạt động nền tảng 1.0.docx',
        oldPostStatusFileId: 0,
        path: '/uploads/202203181106113747_tieu-chuan-hoat-dong-nen-tang-1.0.docx',
        pathView: '202203181106113747_tieu-chuan-hoat-dong-nen-tang-1.0',
        postStatusFileId: 81951,
        postStatusID: 72605,
        postStatusSaveFileId: 0,
        posterLink: null,
        totalLike: 0,
        totalPage: 49,
        typeId: 1,
        typeName: 'Tài liệu'
      },
      listCompany: [
        {
          compnayName: 'CÔNG TY CỔ PHẦN ĐẦU TƯ VÀ THƯƠNG MẠI TỔNG HỢP XNK HÀ NỘI',
          tax: '0109956516',
          director: 'NGUYỄN NGỌC THÁI',
          address: 'Số 79, phố Hoàng Cầu, Phường Ô Chợ Dừa, Quận Đống Đa, Thành phố Hà Nội, Việt Nam'
        },
        {
          compnayName: 'CÔNG TY CỔ PHẦN ĐẦU TƯ VÀ THƯƠNG MẠI TỔNG HỢP XNK HÀ NỘI',
          tax: '0109956516',
          director: 'NGUYỄN NGỌC THÁI',
          address: 'Số 79, phố Hoàng Cầu, Phường Ô Chợ Dừa, Quận Đống Đa, Thành phố Hà Nội, Việt Nam'
        },
        {
          compnayName: 'CÔNG TY CỔ PHẦN ĐẦU TƯ VÀ THƯƠNG MẠI TỔNG HỢP XNK HÀ NỘI',
          tax: '0109956516',
          director: 'NGUYỄN NGỌC THÁI',
          address: 'Số 79, phố Hoàng Cầu, Phường Ô Chợ Dừa, Quận Đống Đa, Thành phố Hà Nội, Việt Nam'
        }
      ],
      isFetchListComment: false
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
    ...mapState('common', ['listComment']),
    ...mapState(STORE_KEY, ['detailCompanyByTax'])
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
    // console.log('router: ', this.$route)
    this.acGetListComment({ articleId: this.detailCompanyByTax.id, pageIndex: 1, pageSize: 10 })
    this.scrollToTop()
  },
  methods: {
    ...mapActions('common', ['acGetListComment']),
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
</style>
