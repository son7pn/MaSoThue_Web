<template>
  <div class="detail-company font-size-18">
    <h3 class="detail-company__name">
      {{ dataSource.compnayName ? dataSource.compnayName : '' }}
    </h3>
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
    <div class="item-key">
      Cập nhật mã số thuế <b>{{ dataSource.tax ? dataSource.tax : '' }}</b>  lần cuối vào <i>{{ dataSource.lastModifiedDate ? $dayjs(dataSource.lastModifiedDate).format('YYYY-MM-DD HH:mm:ss') : '' }}.</i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailCompany',
  props: {
    dataSource: {
      type: Object,
      default: Object
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
