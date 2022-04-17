<template>
  <div class="banner">
    <swiper
      id="swiper-event-calendar"
      ref="carousel"
      class="swiper"
      :options="swiperOption"
    >
      <swiper-slide v-for="(item, index) of 6" :key="index">
        d
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import { Swiper as SwiperClass, Navigation, Pagination, Mousewheel, Autoplay, EffectFade } from 'swiper/swiper.esm'
SwiperClass.use([Navigation, Pagination, Mousewheel, Autoplay, EffectFade])
export default {
  components: {
    Swiper,
    SwiperSlide
  },

  data () {
    return {
      swiperOption: {
        slidesPerView: 1,
        slidesPerColumn: 4,
        slidesPerColumnFill: 'row'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
// npm install --save swiper/vue
</style>
