<template>
  <div class="container">
    <div class="detai-company pd-t-50r full-box pd-b-60r ">
      <h3 class="font-sanpro-semibold primary-color-txt mg-b-64r">
        2100621501-006 - VĂN PHÒNG ĐẠI DIỆN CÔNG TY CỔ PHẦN XUẤT NHẬP KHẨU THƯƠNG MẠI DẦU KHÍ
      </h3>
      <!-- <ViewDocs :data-source="dataDoc" /> -->
      <div class="row">
        <DetailCompany class="col-md-9" />
      </div>

      <div class="mg-t-64r">
        <h4 class="font-sanpro-semibold primary-color-txt title-comment">
          Bình luận
        </h4>
        <ModulesComment :list-comment-post="listComment" />
      </div>
      <div class="mg-t-64r">
        <h4 class="font-sanpro-semibold primary-color-txt title-comment">
          Doanh nghiệp tại địa phương
        </h4>
        <vueCustomScrollbar class="scroll-class none-ps-x none-ps-y">
          <ItemInfoBusiness
            v-for="(item, index) of listCompany"
            :key="index"
            :data-source="item"
          />
        </vueCustomScrollbar>
      </div>
      <div class="mg-t-64r">
        <h4 class="font-sanpro-semibold primary-color-txt title-comment">
          Doanh nghiệp mới
        </h4>
        <vueCustomScrollbar class="scroll-class none-ps-x none-ps-y">
          <ItemInfoBusiness
            v-for="(item, index) of listCompany"
            :key="index"
            :data-source="item"
          />
        </vueCustomScrollbar>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import vueCustomScrollbar from 'vue-custom-scrollbar'
import 'vue-custom-scrollbar/dist/vueScrollbar.css'
// import ViewDocs from '@/components/shared/previewDocs/ViewDocs.vue'
import ModulesComment from '@/components/shared/comment/ModulesComment.vue'
import ItemInfoBusiness from '@/components/shared/ItemInfoBusiness.vue'
import DetailCompany from '@/components/shared/DetailCompany.vue'
export default {
  components: {
    vueCustomScrollbar,
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
    return store.dispatch('common/acGetListComment', { articleId: 3333, pageIndex: 1, pageSize: 10 })
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
          nameCompany: 'CÔNG TY CỔ PHẦN ĐẦU TƯ VÀ THƯƠNG MẠI TỔNG HỢP XNK HÀ NỘI',
          code: '0109956516',
          representative: 'NGUYỄN NGỌC THÁI',
          address: 'Số 79, phố Hoàng Cầu, Phường Ô Chợ Dừa, Quận Đống Đa, Thành phố Hà Nội, Việt Nam'
        },
        {
          nameCompany: 'CÔNG TY CỔ PHẦN ĐẦU TƯ VÀ THƯƠNG MẠI TỔNG HỢP XNK HÀ NỘI',
          code: '0109956516',
          representative: 'NGUYỄN NGỌC THÁI',
          address: 'Số 79, phố Hoàng Cầu, Phường Ô Chợ Dừa, Quận Đống Đa, Thành phố Hà Nội, Việt Nam'
        },
        {
          nameCompany: 'CÔNG TY CỔ PHẦN ĐẦU TƯ VÀ THƯƠNG MẠI TỔNG HỢP XNK HÀ NỘI',
          code: '0109956516',
          representative: 'NGUYỄN NGỌC THÁI',
          address: 'Số 79, phố Hoàng Cầu, Phường Ô Chợ Dừa, Quận Đống Đa, Thành phố Hà Nội, Việt Nam'
        }
      ],
      isFetchListComment: false
    }
  },
  fetch () {
    const self = this
    if (self.isFetchListComment) {
      self.isFetchListComment = false
      self.$store.dispatch('common/acGetListComment', { articleId: 3333, pageIndex: 1, pageSize: 10 })
    }
  },
  computed: {
    ...mapState('common', ['listComment'])
  },
  watch: {
    // listComment () {
    //   setTimeout(() => {
    //     this.isFetchListComment = true
    //     return this.$fetch()
    //   }, 500)
    // }
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
      border-bottom: 4px solid $primary_color;
      display: block;
      position: absolute;
      bottom: -1px;
    }
  }
}
</style>
