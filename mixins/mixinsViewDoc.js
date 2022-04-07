// import { APP_CONFIG } from '@/utils/env'
export default {
  props: {
    zoom: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      zoomStyle: { width: 'auto' }
    }
  },
  computed: {
    widthDefaultViewImg () {
      return document.getElementById('preview_book_wrap').offsetWidth
    }
  },
  watch: {
    zoom (newVal) {
      this.zoomStyle.width = this.widthDefaultViewImg * newVal + 'px'
      // this.setPageCurr(this.scrollTopCurr)
    }
  },
  mounted () {
    this.$nextTick(() => {
      // Set style init
      this.setStyleDoc()
      window.addEventListener('resize', this.setStyleDoc)
    })
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.setStyleDoc)
  },
  methods: {

    setStyleDoc () {
      if (window.innerWidth > 991) {
        this.zoomStyle.width = window.innerWidth < 1600 ? '800px' : '1129px'
      } else {
        this.zoomStyle.width = 'auto'
      }
    }
  }
}
