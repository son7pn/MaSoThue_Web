<template>
  <div>
    <div v-cloak id="backToTop" class="cursor-pointer">
      <transition name="fade">
        <div v-show="scY > 300" id="pagetop" class="fixed right-0 bottom-0" @click="toTop">
          <i class="icon-mui-ten-1 border-rd-8 color-light" />
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BackToTop',
  data () {
    return {
      scTimer: 0,
      scY: 0
    }
  },
  methods: {
    toTop () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  #pagetop {
    display: block !important;
    position: fixed;
    bottom: 50px;
    right: 50px;
    z-index: 1000;
    border-radius: 100%;
    i {
      opacity: 0.6;
      background: $primary_color;
      padding: 17px;
      &:hover {
        opacity: 1;
        transition: .3s;
      }
    }
  }
  @media(max-width: 991px) {
    #pagetop {
      bottom: 70px;
      right: 32px;
    }
  }
</style>
