<template>
  <div class="detail-company font-size-18">
    <p class="detail-company__name font-size-24 font-sanpro-semibold">
      {{ dataSource.compnayName ? dataSource.compnayName : '' }}
    </p>
    <div class="item-key display-flex">
      <div class="item-key__title">
        <i class="fa fa-hashtag" /><span> Mã số thuế</span>
      </div>
      {{ dataSource.tax ? dataSource.tax : '' }}
    </div>
    <div class="item-key display-flex">
      <div class="item-key__title">
        <i class="fa fa-map-marker" /><span> Địa chỉ</span>
      </div>
      {{ dataSource.address ? dataSource.address : '...' }}
    </div>
    <div class="item-key display-flex">
      <div class="item-key__title">
        <i class="fa fa-user" /><span> Người đại diện</span>
      </div>
      {{ dataSource.director ? dataSource.director : '' }}
    </div>
    <div class="item-key display-flex">
      <div class="item-key__title">
        <i class="fa fa-phone" /><span> Điện thoại</span>
      </div>
      {{ dataSource.phone ? dataSource.phone : '' }}
    </div>
    <div class="item-key display-flex">
      <div class="item-key__title">
        <i class="fa fa-calendar" /><span> Ngày hoạt động</span>
      </div>
      {{ dataSource.foundingDate ? $dayjs(dataSource.foundingDate).format('DD/MM/YYYY') : '' }}
    </div>
    <div class="item-key display-flex">
      <div class="item-key__title">
        <i class="fa fa-usd" /><span> Vốn điều lệ (vnđ)</span>
      </div>
      {{ dataSource.capacity ? dataSource.capacity.toLocaleString('de-DE') : '' }}
    </div>
    <div class="item-key display-flex">
      <div class="item-key__title">
        <i class="fa fa-users" /><span> Quản lý bởi</span>
      </div>
      {{ dataSource.director ? dataSource.director : '' }}
    </div>
    <div class="item-key display-flex">
      <div class="item-key__title">
        <i class="fa fa-building" /><span> Loại hình DN</span>
      </div>
      {{ dataSource.businessType ? dataSource.businessType : '' }}
    </div>
    <div class="item-key display-flex">
      <div class="item-key__title">
        <i class="fa fa-info" /><span> Tình trạng</span>
      </div>
      {{ dataSource.status === 1 ? 'Đang hoạt động' : 'Ngừng hoạt động' }}
    </div>
    <div class="item-key display-flex-center-wrap justify-content-between">
      <span>Cập nhật mã số thuế <b>{{ dataSource.tax ? dataSource.tax : '' }}</b>  lần cuối vào <i>{{ dataSource.lastModifiedDate ? $dayjs(dataSource.lastModifiedDate).format('YYYY-MM-DD HH:mm:ss') : '' }}.</i></span>
      <button type="button" class="btn bg-primary-color full-width color-light" @click="downloadFile(dataSource)">
        Tải file
      </button>
    </div>
  </div>
</template>

<script>
import mixinsFile from '@/mixins/mixinsFile'
export default {
  name: 'DetailCompany',
  mixins: [mixinsFile],
  props: {
    dataSource: {
      type: Object,
      default: Object
    }
  },
  data () {
    return {
      isFetchCompany: false,
      structuredData: {
        '@context': 'http://schema.org',
        '@type': 'Article',
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': 'http://shopli.vn/goi-y-5-loai-mat-na-cho-da-dau-mun-gop-phan-hut-dau-tru-mun-ma-ban-nen-tham-khao.htm'
        },
        headline: `${this.dataSource.compnayName}`,
        image: {
          '@type': 'ImageObject',
          url: 'https://api.tracuunnt.com/uploads/logo-masothue.png',
          height: 600,
          width: 800
        },
        datePublished: '9/3/2020 11:48:18 PM',
        dateModified: '9/3/2020 11:48:18 PM',
        author: {
          '@type': 'Person',
          name: 'tracuunnt'
        },
        publisher: {
          '@type': 'Organization',
          name: `${this.dataSource.compnayName}`,
          logo: {
            '@type': 'ImageObject',
            url: 'https://api.tracuunnt.com/uploads/logo-masothue.png',
            width: 35,
            height: 34
          }
        },
        description: 'Tạm thời để tiêu đề bài viết',
        review: [{
          '@type': 'Review',
          reviewRating: {
            '@type': 'Rating',
            ratingValue: '5'
          },
          author: {
            '@type': 'Person',
            name: 'John Doe'
          },
          reviewBody: 'I really enjoyed this book. It captures the essential challenge people face as they try make sense of their lives and grow to adulthood.'
        },
        {
          '@type': 'Review',
          reviewRating: {
            '@type': 'Rating',
            ratingValue: '1'
          },
          author: {
            '@type': 'Person',
            name: 'Jane Doe'
          },
          reviewBody: "I really didn't care for this book."
        }]
      }
    }
  },
  head () {
    return {
      script: [{ type: 'application/ld+json', json: this.structuredData }]
    }
  },
  methods: {
    downloadFile (data) {
      if (!data || !data.attackName) {
        this.$toast.error('Tài liệu hiện không thể tải xuống')
        return
      }
      const nameFile = data.slug ? data.slug : 'document'
      const formatFile = data.attackName ? data.attackName.split('.')[1] : ''
      const nameDoc = nameFile + `.${formatFile}`
      this.downloadDocs(data.attackName, nameDoc)
    }
  }
}
</script>

<style lang="scss" scoped>
 .detail-company {
   &__name {
     border-bottom: 1px solid #dadbe1;
     padding-bottom: 1.2rem;
   }
   .item-key {
     border-bottom: 1px solid #dadbe1;
     padding: 0.8rem 0;
     &__title {
       width: 200px;
       i {
         margin-right: 0.2rem;
         width: 17px;
       }
     }
   }
 }
</style>
