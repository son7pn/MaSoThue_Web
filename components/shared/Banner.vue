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
          <img :src="item.image" alt="banner" class="img-fit">
        </figure>
        <div class="item__content  text-uppercase position-abs">
          <h3 class="primary-color mb-3 font-size-20">
            {{ item.title }}
          </h3>
          <!-- eslint-disable -->
          <p v-html="item.content" class="font-size-42 color-dark"/>
        </div>
      </swiper-slide>
      <div slot="pagination" class="swiper-pagination" />
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
      listBanner: [
        {
          title: 'Tra cứu mã số thuế cá nhân',
          content: 'Hơn <b>1.7 triệu</b> doanh nghiệp trên 63 tỉnh thành',
          image: require('@/assets/images/banner/tra-cuu-ma-so-thue-slide-1-min.png')
        },
        {
          title: 'Tra cứu mã số thuế cá nhân',
          content: 'Tra cứu <b>mã số thuế cá nhân</b> nhanh chóng, tiện lợi',
          image: require('@/assets/images/banner/tra-cuu-ma-so-thue-slide-2-min.png')
        },
        {
          title: 'Tra cứu mã số thuế',
          content: 'Tra cứu trực tiếp ngay trên <b>facebook</b> & <b>zalo</b>',
          image: require('@/assets/images/banner/tra-cuu-ma-so-thue-slide-3-min.png')
        },
        {
          title: 'Tin tức',
          content: '<b>Thông tin mới nhất</b> về thuế, kế toán và doanh nghiệp',
          image: require('@/assets/images/banner/tra-cuu-ma-so-thue-slide-4-min.png')
        }
      ],
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
