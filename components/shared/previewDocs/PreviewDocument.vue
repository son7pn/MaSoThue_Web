<template>
  <div class="preview-document border-rd-4 display-flex-center justify-content-center full-box">
    <!-- <client-only> -->
    <vueCustomScrollbar
      v-if="pathView"
      id="preview_book"
      class="preview-book text-center full-with"
      @ps-y-reach-end="ifiniteScroll"
      @ps-scroll-y="onScrollPage"
    >
      <div
        id="preview_book_wrap"
        ref="preview_book_wrap"
        class="preview-book__wrap margin-center effect-transition-fast"
        :class="{'zoom-init': zoom === 1}"
        :style="zoomStyle"
      >
        <template v-for="(item, index) of images">
          <div :id="`item_${index + 1}`" :key="index" class="item">
            <h2 class="item__page display-none" tabindex="0">
              {{ index + 1 }}
            </h2>
            <img
              v-lazy-load
              loading="lazy"
              class="item bg-color-light text-center item-book"
              :data-src="item"
              :alt="pathView"
            >
          </div>
        </template>
      </div>
      <!-- @ps-scroll-y="handleScroll" -->
      <!-- @scroll.passive="handleScroll" -->
    </vueCustomScrollbar>
    <p v-else class="font-size-26 color-light">
      Xem trước tài liệu hiện không khả dụng
    </p>
    <!-- </client-only> -->
  </div>
</template>

<script>
import vueCustomScrollbar from 'vue-custom-scrollbar'
import 'vue-custom-scrollbar/dist/vueScrollbar.css'
// import { APP_CONFIG } from '@/utils/env'
import { scrollTo } from '@/helpers/functions'
/**
 * Mixin set action zoom documenty:
 * props, watch: zoom
 * data: zoomStyle
 * computed: widthDefaultViewImg
 * methods - mounted nextTick run this method: setStyleDoc
 * */
import mixinsViewDoc from '@/mixins/mixinsViewDoc'

export default {
  name: 'PreviewDocument',
  components: {
    vueCustomScrollbar
  },
  mixins: [mixinsViewDoc],
  props: {
    path: {
      type: String,
      default: ''
    },
    pathView: {
      type: String,
      default: ''
    },
    totalPage: {
      type: Number,
      default: 0
    },
    fullPath: {
      type: Boolean,
      default: false
    },
    // zoom: {
    //   type: Number,
    //   default: 1
    // },
    pageActive: {
      type: Number,
      default: 1
    },
    changePage: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      cdnUrl: 'https://cdn.liber.edu.vn/uploads/large/',
      page: 0,
      images: [],
      // scrollPosition: 0,
      // lastPageOffsetTop: 0,
      // imgWidthDefault: 0,
      // imgHeightDefault: 0,
      // zoomStyle: { width: 'auto' },
      scrollTopCurr: 0,
      timeout: null
    }
  },
  computed: {
    // widthDefaultViewImg () {
    //   return document.getElementById('preview_book_wrap').offsetWidth
    // }
    // heightElmFirst () {
    //   return document.getElementById('item_1').offsetHeight + 15
    // }
  },
  watch: {
    zoom (newVal) {
      // this.zoomStyle.width = this.widthDefaultViewImg * newVal + 'px'
      this.setPageCurr(this.scrollTopCurr)
    },
    changePage (newVal) {
      // console.log('Change page: ', newVal)
      this.setScrollPage(newVal)
    }
  },
  mounted () {
    this.getBooksImages()
    this.pageActive > 1 && this.$nextTick(() => {
      // Settimeout for image item render DOM
      this.timeout = setTimeout(() => {
        this.setScrollPage(this.pageActive)
      }, 500)
    //   // Set style init
    //   this.setStyleDoc()
    //   window.addEventListener('resize', this.setStyleDoc)
    })
  },
  beforeDestroy () {
    this.images.length = 0
    this.timeout = null
    // window.removeEventListener('resize', this.setStyleDoc)
  },
  methods: {

    // setStyleDoc () {
    //   if (window.innerWidth > 991) {
    //     this.zoomStyle.width = window.innerWidth < 1600 ? '800px' : '1129px'
    //   } else {
    //     this.zoomStyle.width = 'auto'
    //   }
    // },

    getBooksImages () {
      // https://cdn.liber.edu.vn/uploads/large/202203181106113747_tieu-chuan-hoat-dong-nen-tang-1.0-1.jpg
      const self = this
      const loadingLength = 3
      for (let i = 0; i < loadingLength; i++) {
        self.page += 1
        const linkPage = self.fullPath ? `${self.pathView}-${self.page}.jpg` : `${self.cdnUrl}${self.pathView}-${self.page}.jpg`
        self.page <= self.totalPage && self.images.push(linkPage)
      }
    },

    // handleScroll (event) {
    // const currentScrollPosition = event.srcElement.scrollTop
    // console.log('evt:', this.totalPage, this.page, currentScrollPosition, this.lastPageOffsetTop)
    // if (currentScrollPosition > this.scrollPosition && this.page < this.totalPage) {
    //   console.log('evt2:', this.totalPage, this.page)
    //   this.lastPageOffsetTop = document.getElementById(`item_${this.page}`).offsetTop
    //   currentScrollPosition + 200 >= this.lastPageOffsetTop && this.getBooksImages()
    //   this.scrollPosition = currentScrollPosition
    // }
    // },

    ifiniteScroll () {
      if (this.page >= this.totalPage) {
        return
      }
      this.getBooksImages()
    },

    setScrollPage (page) {
      const pageCurPos = document.getElementById(`item_${page}`)
      const topPos = pageCurPos.offsetTop + 15
      scrollTo(document.getElementById('preview_book'), topPos, 600)
    },

    onScrollPage (evt) {
      this.setPageCurr(evt.target.scrollTop)
      this.scrollTopCurr = evt.target.scrollTop
    },

    setPageCurr (scrollTop) {
      // console.log('height: ', scrollTop, this.heightElmFirst)
      // const heightElmFirst = document.getElementById('item_1').offsetHeight + 15
      const heightElmFirst = document.getElementById('item_1').offsetHeight - 15
      // const heightElmFirst = document.getElementById('item_1').offsetHeight
      this.$emit('scrollPage', Math.ceil(scrollTop / heightElmFirst))
    }
  }
}
</script>

<style lang="scss" scoped>
.preview-document {
  min-height: 40vh;
  // background: rgba(191, 191, 191, .5);
}
#preview_book {
  max-height: calc(100vh);
  // padding-bottom: 50px;

  @media screen and ( max-width: 767px ) {
    padding-top: 1rem;
  }
}
.preview-book {
  &__wrap {
    &.zoom-init {
      max-width: 95%;
    }
  }

  .item {
    margin-bottom: 15px;
  }
}
</style>
