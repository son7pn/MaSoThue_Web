<template>
  <div class="item-info-bus full-width">
    <h2 class="font-weight-medium primary-color text-uppercase mg-b-12r font-size-20">
      <nuxt-link :to="localePath({ path: `/${dataSource.tax}-${dataSource.slug}`})" class="primary-color">
        {{ dataSource.compnayName ? dataSource.compnayName : '' }}
      </nuxt-link>
    </h2>
    <div class="mg-b-8r font-size-18">
      <i class="fa fa-hashtag font-size-20" aria-hidden="true" /> Mã số thuế:
      <a class="primary-color-txt" href="javascript:;">&ensp;{{ dataSource.tax ? dataSource.tax : '0000000' }}</a>
    </div>
    <div class="mg-b-8r font-size-18">
      <i class="fa fa-user font-size-20" aria-hidden="true" /> Người đại diện:
      <nuxt-link class="primary-color text-uppercase font-italic font-size-16" :to="localePath({ path: '/tra-cuu', query: { type: 3, keyword: dataSource.director }})">
        &ensp;{{ dataSource.director ? dataSource.director : '' }}
      </nuxt-link>
    </div>
    <div class="mg-b-8r font-size-18">
      <i class="fa fa-map-marker font-size-20" aria-hidden="true" />
      <a class="primary-color-txt font-size-18" href="javascript:;">{{ dataSource.address ? dataSource.address : '...' }}</a>
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
.item-info-bus:not(:nth-last-child(1)) {
  padding: 1rem 0;
  border-bottom: 1px solid $color_border;;
}
.item-info-bus:nth-last-child(1) {
  padding-top: 1rem;
}
</style>
