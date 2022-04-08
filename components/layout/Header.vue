<template>
  <header id="header" class="header bg-color-light">
    <div class="header-top container display-flex-center justify-content-between position-rel" :class="{'showMenu': isShowDropMenu}">
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
      <button class="bt-navbar border-rd-4 position-abs cursor-pointer" @click="() => isShowDropMenu = !isShowDropMenu ">
        <i class="icon-hien-th-list-1" />
      </button>
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
      isShowDropMenu: false
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
  .bt-navbar {
      border: none;
      padding: 0.4rem 0.8rem;
      right: 0;
      top: 0.5rem;
      display: none;
    }
}

@media (max-width: 991px) {
  .header {
    height: 8.9rem;
    .header-top {
      display: block;
      height: 5.7rem;
      .logo {
        padding: 0.4rem 0 0.6rem 0;
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

@media (max-width: 768px) {
  .header {
    height: auto;
    .header-top {
      // display: block;
      height: auto;
      .logo {
        // padding: 0.4rem 0 0.6rem 0;
        a {
          margin: 0;
        }
      }
    }
    &__menu {
      display: block;
      transform-origin: top;
      max-height: 0;
      overflow: hidden;
      transition: max-height 1s ease-out;
      li {
        margin: 0;
        margin-top: 0.5rem;
      }

    }
    .bt-navbar {
      display: block;
    }
    .showMenu {
      .header__menu {
        max-height: 20rem;
        margin-bottom: 1rem;
      }
    }
  }
}
</style>
