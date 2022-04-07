<template>
  <header id="header" class="header bg-color-light">
    <div class="header-top container display-flex-center justify-content-between">
      <div class="logo bg-color-light">
        <nuxt-link :to="localePath('/')" class="display-flex">
          <figure class="aspect-ratio aspect-ratio--1-1 border-rd-8 aspect-ratio--bg-transparent">
            <img loading="lazy" class="full-box" src="@/assets/images/logo/logo-masothue.png" alt="MaSoThue">
          </figure>
        </nuxt-link>
      </div>
      <ul class="header__menu list-style-none full-height display-flex">
        <li class="full-height">
          <nuxt-link :to="localePath('/')" class="font-sanpro-semibold display-flex text-uppercase full-height primary-color-txt align-items-center">
            <span class="title_menu font-size-20">Trang chủ</span>
          </nuxt-link>
        </li>
        <li class="full-height">
          <nuxt-link :to="localePath('/')" class="font-sanpro-semibold display-flex text-uppercase full-height primary-color-txt align-items-center">
            <span class="title_menu font-size-20">Doanh nghiệp mới</span>
          </nuxt-link>
        </li>
        <li class="full-height">
          <nuxt-link :to="localePath('/')" class="font-sanpro-semibold display-flex text-uppercase full-height primary-color-txt align-items-center">
            <span class="title_menu font-size-20">Ngành nghề</span>
          </nuxt-link>
        </li>
        <li class="full-height">
          <nuxt-link :to="localePath('contact')" class="font-sanpro-semibold display-flex text-uppercase full-height primary-color-txt align-items-center">
            <span class="title_menu font-size-20">Liên hệ</span>
          </nuxt-link>
        </li>
      </ul>
    </div>
    <BoxSearch />
  </header>
</template>

<script>
import BoxSearch from '@/components/search/BoxSearch.vue'

export default {
  name: 'Header',
  components: {
    BoxSearch
  },
  data () {
    return {
    }
  },
  computed: {
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.header {
  left: 0;
  position: fixed;
  top: 0;
  width: 100vw;
  height: 7.25rem;
  z-index: 105;
  .header-top {
    height: 4rem;
  }
  .header-search {
    height: 3.25rem;
  }
  .logo {
    a {
      width: 9rem;
      height: 2.2rem;
    }
  }
  &__menu {
    >li {
      margin: 0 0.6rem;
      &.active-menu {
        >a {
          color: $primary_color;
        }
      }
      > a {
        padding: 5px 1.1rem;
      }
      &:hover {
        a {
          color: $primary_color;
        }
      }
    }
  }
}

@media (max-width: 991px) {
  .header {
    height: 8.9rem;
    .header-top {
      display: block;
      height: 5.7rem;
    .logo {
      padding: 0.4rem 0 0.8rem 0;
      a {
        margin: auto;
      }
    }
  }
    &__menu {
      height: auto !important;
      justify-content: space-around;
    }
  }
}
</style>
