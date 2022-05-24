<template>
  <div class="banner">
    <swiper
      id="swiper-event-calendar"
      ref="carousel"
      class="swiper"
      :options="swiperOption"
    >
      <swiper-slide v-for="(item, index) of listBanner" :key="index" class="item position-rel">
        <figure class="aspect-ratio aspect-ratio--2-5">
          <img loading="lazy" :src="item.url ? cdnUrl + item.url : ''" alt="banner" class="img-fit">
        </figure>
        <div class="item__content  text-uppercase position-abs">
          <h3 class="primary-color mb-3 font-size-20">
            {{ item.name ? item.name : '' }}
          </h3>
          <!-- eslint-disable -->
          <p v-html="item.thumb ? item.thumb : ''" class="font-size-42 color-dark"/>
        </div>
      </swiper-slide>
      <div slot="pagination" class="swiper-pagination" />
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import { Swiper as SwiperClass, Navigation, Pagination, Mousewheel, Autoplay, EffectFade } from 'swiper/swiper.esm'
import { APP_CONFIG } from '@/utils/env'
SwiperClass.use([Navigation, Pagination, Mousewheel, Autoplay, EffectFade])
export default {
  components: {
    Swiper,
    SwiperSlide
  },

  data () {
    return {
      cdnUrl: APP_CONFIG.cdnUrl,
      listBanner: [],
      swiperOption: {
        observer: true,
        observeParents: true,
        parallax: true,
        direction: 'horizontal',
        slidesPerView: 1,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          dynamicBullets: false
        }
      }
    }
  },
  mounted () {
    this.nuxtServerInit()
  },
  methods: {
    async nuxtServerInit () {
      const dataBanner = await this.$axios.get('v1/Advs/GetListByPosition/0')
      // eslint-disable-next-line array-callback-return
      if (dataBanner && dataBanner.list) {
        // console.log('dataBanner: ', dataBanner)
        this.listBanner = dataBanner.list
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.banner {
  .item {
    &__content {
      z-index: 1;
      top: 25%;
      left: 20%;
      width: 38%;
      // visibility: hidden;
      opacity: 0;
      // transition: opacity 4s ease;
      -webkit-transition: opacity 3s ease-in-out;
      -moz-transition: opactiy 3s ease-in-out;
      -ms-transition: opacity 3s ease-in-out;
      -o-transition: opacity 3s ease-in-out;
      transition: opacity 3s ease-in-out;
    }
    &:hover {
      .item__content {
      // visibility: visible;
      opacity: 1;
    }
    }
  }
  .swiper-slide-active {
    .item__content {
      // visibility: visible;
      opacity: 1;
    }
  }
}
@media (max-width: 1024px) {
  .banner {
    .item__content p{
      font-size: 1.8rem;
    }
  }
}

@media (max-width: 768px) {
  .banner {
    .item__content {
      top: 18%;
      left: 18%;
      width: 40%;
      p {
        font-size: 1.5rem;
      }
    }
  }
}

@media (max-width: 567px) {
  .banner {
    .item__content {
      top: 18%;
      left: 6%;
      width: 50%;
      p {
        font-size: 1rem;
      }
    }
  }
}

@media (max-width: 425px) {
  .banner {
    .item {
      .aspect-ratio--2-5 {
        &:before {
          padding-top: 40%;
        }
      }
    }
  }
}
</style>
