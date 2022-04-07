<template>
  <vueCustomScrollbar class="full-box position-rel">
    <!-- <div class="preview-img display-flex-center justify-content-center effect-transition-fast center-xy full-box" :class="{'zoom-init': zoom === 1}" :style="styleZoom">
    <div class="preview-img__wrap position-rel full-box"> -->
    <img
      id="view_img"
      v-lazy-load
      loading="lazy"
      :data-src="link"
      :alt="alt"
      class="effect-transition-fast center-xy"
      :class="{'zoom-init': zoom === 1}"
      :style="styleZoom"
    >
    <!-- </div>
    </div> -->
  </vueCustomScrollbar>
</template>

<script>
import vueCustomScrollbar from 'vue-custom-scrollbar'
import 'vue-custom-scrollbar/dist/vueScrollbar.css'

export default {
  name: 'PreviewImg',
  components: {
    vueCustomScrollbar
  },
  props: {
    link: {
      type: String,
      default: ''
    },
    alt: {
      type: String,
      default: ''
    },
    zoom: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      styleZoom: { 'max-width': '80%', 'max-height': '90%' }
    }
  },
  computed: {
    widthDefaultViewImg () {
      // return document.getElementById('view_img').offsetWidth
      const elmWidth = document.getElementById('view_img').offsetWidth
      const perWidth = (elmWidth / window.innerWidth) * 100
      return perWidth
    }
  },
  watch: {
    zoom (newVal) {
      const width = this.widthDefaultViewImg * newVal + '%'
      // this.styleZoom = { width, 'max-width': width }
      this.styleZoom = { width, 'max-width': 'unset', 'max-height': 'unset' }
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.aspect-ratio {
  &:before {
    background: transparent;
  }
}
// #preview_img {
//   max-height: calc(100vh - 4rem);
//   max-width: 100%;
// }
.preview-img {
  &.zoom-init {
    // max-width: 80%;
  }
  &__wrap {

  }
}
img {
  max-width: unset;
  // &.zoom-init {
  //   max-width: 80%;
  // }
}
</style>
