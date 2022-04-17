export default {
  data () {
    return {
      keys: { 37: 1, 38: 1, 39: 1, 40: 1 },
      supportsPassive: true
    }
  },
  computed: {
    wheelOpt () {
      return this.supportsPassive ? { passive: false } : false
    },
    wheelEvent () {
      return 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel'
    }
  },
  mounted () {
    // const scrollY = document.documentElement.style.getPropertyValue('--scroll-y')
    // const body = document.body
    // body.style.position = 'fixed'
    // body.style.top = `-${scrollY}`
    // try {
    //   window.addEventListener('test', null, Object.defineProperty({}, 'passive', {
    //     get () {
    //       console.log('Get passsive', this.supportsPassive)
    //       this.supportsPassive = true
    //     }
    //   }))
    // } catch (e) {}
    this.disabledScrolling()
  },
  beforeDestroy () {
    // // remove position save when open modal
    // const body = document.body
    // const scrollY = body.style.top
    // body.style.position = ''
    // body.style.top = ''
    // window.scrollTo(0, parseInt(scrollY || '0') * -1)
    // window.addEventListener('scroll', () => {
    //   document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`)
    // })
    this.enabledScrolling()
  },
  methods: {
    preventDefault (e) {
      e.preventDefault()
    },

    preventDefaultForScrollKeys (e) {
      if (this.keys[e.keyCode]) {
        this.preventDefault(e)
        return false
      }
    },

    disabledScrolling () {
      window.addEventListener('DOMMouseScroll', this.preventDefault, false) // older FF
      window.addEventListener(this.wheelEvent, this.preventDefault, this.wheelOpt) // modern desktop
      window.addEventListener('touchmove', this.preventDefault, this.wheelOpt) // mobile
      // window.addEventListener('keydown', this.preventDefaultForScrollKeys, false)
    },

    enabledScrolling () {
      window.removeEventListener('DOMMouseScroll', this.preventDefault, false)
      window.removeEventListener(this.wheelEvent, this.preventDefault, this.wheelOpt)
      window.removeEventListener('touchmove', this.preventDefault, this.wheelOpt)
      // window.removeEventListener('keydown', this.preventDefaultForScrollKeys, false)
    }
  }
}
