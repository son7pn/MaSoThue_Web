<template>
  <div class="item-info-bus full-width">
    <h4 class="font-sanpro-semibold primary-color text-uppercase mg-b-12r font-size-20">
      <nuxt-link :to="localePath('/0202127633-cong-ty-tnhh-kinh-doanh-van-tai-va-dau-tu-dich-vu-minh-hoang')" class="primary-color">
        {{ dataSource.nameCompany ? dataSource.nameCompany : '' }}
      </nuxt-link>
    </h4>
    <div class="mg-b-8r">
      <i class="fa fa-hashtag font-size-20" aria-hidden="true" /> Mã số thuế:
      <a class="primary-color-txt" href="javascript:;">&ensp;{{ dataSource.code ? dataSource.code : '0000000' }}</a>
    </div>
    <div class="mg-b-8r">
      <i class="fa fa-user font-size-20" aria-hidden="true" /> Người đại diện:
      <a class="primary-color text-uppercase font-italic font-size-18" href="javascript:;">&ensp;{{ dataSource.representative ? dataSource.representative : '' }}</a>
    </div>
    <div class="mg-b-8r">
      <i class="fa fa-map-marker font-size-20" aria-hidden="true" />
      <a class="primary-color-txt" href="javascript:;">{{ dataSource.address ? dataSource.address : '' }}</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ItemInfoBusiness',
  props: {
    dataSource: {
      type: Object,
      default: Object
    }
  }
}
</script>

<style lang="scss" scoped>
.item-info-bus {
  h4 {
    a:hover {
      color: #014c8c;
    }
  }
  i {
    width: 17px;
  }
}
.item-info-bus:not(:nth-last-child(3)) {
  padding: 1rem 0;
  border-bottom: 1px solid $color_border;;
}
.item-info-bus:nth-last-child(3) {
  padding-top: 1rem;
}
</style>
