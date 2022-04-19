<template>
  <div class="detail-company">
    <h3 class="detail-company__name">
      Công ty cổ phần
    </h3>
    <div class="item-key display-flex">
      <div class="item-key__title">
        <i class="fa fa-hashtag" /><span> Mã số thuế</span>
      </div>
      1623
    </div>
    <div class="item-key display-flex">
      <div class="item-key__title">
        <i class="fa fa-map-marker" /><span> Địa chỉ</span>
      </div>
      1623
    </div>
    <div class="item-key display-flex">
      <div class="item-key__title">
        <i class="fa fa-user" /><span> Người đại diện</span>
      </div>
      1623
    </div>
    <div class="item-key display-flex">
      <div class="item-key__title">
        <i class="fa fa-phone" /><span> Điện thoại</span>
      </div>
      1623
    </div>
    <div class="item-key display-flex">
      <div class="item-key__title">
        <i class="fa fa-calendar" /><span> Ngày hoạt động</span>
      </div>
      1623
    </div>
    <div class="item-key display-flex">
      <div class="item-key__title">
        <i class="fa fa-users" /><span> Quản lý bởi</span>
      </div>
      1623
    </div>
    <div class="item-key display-flex">
      <div class="item-key__title">
        <i class="fa fa-building" /><span> Loại hình DN</span>
      </div>
      1623
    </div>
    <div class="item-key display-flex">
      <div class="item-key__title">
        <i class="fa fa-info" /><span> Tình trạng</span>
      </div>
      1623
    </div>
    <div class="item-key">
      Cập nhật mã số thuế <b>1602158758</b>  lần cuối vào <i>2022-04-18 18:30:27.</i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailCompany'

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
         margin-right: 0.4rem;
       }
     }
   }
 }
</style>
