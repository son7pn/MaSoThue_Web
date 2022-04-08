<template>
  <div class="page-contact pd-t-50r">
    <h2 class="font-sanpro-semibold primary-color-txt font-size-40 mg-b-64r display-flex-center justify-content-center full-width">
      Liên hệ
    </h2>
    <div class="row">
      <div class="col-md-6 col-12">
        <h4 class="font-sanpro-semibold primary-color-txt title-comment">
          Gửi liên hệ
        </h4>
      </div>
      <div class="col-md-6 col-12">
        <h4 class="font-sanpro-semibold primary-color-txt title-comment">
          Thông tin liên hệ
        </h4>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexContact',
  nuxtI18n: {
    paths: {
      vi: '/lien-he'
    }
  }
}
</script>

<style lang="scss" scoped>
.page-contact {
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
