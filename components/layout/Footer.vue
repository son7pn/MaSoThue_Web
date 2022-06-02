<template>
  <footer class="footer container bg-color-light">
    <div class="row">
      <div class="footer-contact col-md-3 col-sm-6 col-xs-12">
        <div class="logo bg-color-light mg-b-32r">
          <a href="javascript:;" class="display-flex" rel="noopener noreferrer">
            <figure class="aspect-ratio aspect-ratio--1-1 border-rd-8 aspect-ratio--bg-transparent">
              <!-- <img loading="lazy" class="full-box" :src="@/assets/images/logo/logo-masothue.png" alt="MaSoThue"> -->
              <img loading="lazy" class="full-box" :src="logo ? cdnUrl + logo : logoDefault" alt="MaSoThue">
            </figure>
          </a>
        </div>
        <div class="footer-address">
          <div class="display-flex">
            <i class="fa fa-building font-size-20" aria-hidden="true" />
            <span class="mg-l-12r font-size-18">Công ty mã số thuế</span>
          </div>
          <div class="display-flex mg-t-24r">
            <i class="fa fa-map-marker font-size-20" aria-hidden="true" />
            <span class="mg-l-12r font-size-18">Địa chỉ công ty</span>
          </div>
          <div class="display-flex mg-t-24r">
            <i class="fa fa-envelope font-size-20" aria-hidden="true" />
            <span class="mg-l-12r font-size-18">{{ emailDefault ? emailDefault : '' }}</span>
          </div>
          <div class="display-flex mg-t-24r">
            <i class="fa fa-phone font-size-20" aria-hidden="true" />
            <span class="mg-l-12r font-size-18">{{ hotlineDefault ? hotlineDefault : '' }}</span>
          </div>
        </div>
      </div>
      <div class="item-menu col-md-3 col-sm-6 col-xs-12">
        <h4 class="font-sanpro-semibold mg-b-32r height-48 display-flex align-item-end">
          Truy cập nhanh
        </h4>
        <ul class="list-style-none">
          <li class="full-height">
            <nuxt-link :to="localePath('about')" class="display-flex primary-color-txt full-height align-items-center">
              <span class="title_menu font-size-18">Giới thiệu</span>
            </nuxt-link>
          </li>
          <li class="full-height mg-t-24r">
            <nuxt-link :to="localePath('career')" class="display-flex primary-color-txt full-height align-items-center">
              <span class="title_menu font-size-18">Mã số thuế theo ngành nghề</span>
            </nuxt-link>
          </li>
          <li class="full-height mg-t-24r">
            <nuxt-link :to="localePath('company-new')" class="display-flex primary-color-txt full-height align-items-center">
              <span class="title_menu font-size-18">Công ty mới thành lập</span>
            </nuxt-link>
          </li>
        </ul>
      </div>
      <div class="item-menu col-md-3 col-sm-6 col-xs-12">
        <h4 class="font-sanpro-semibold mg-b-32r height-48 display-flex align-item-end">
          Chính sách
        </h4>
        <ul class="list-style-none">
          <li class="full-height">
            <nuxt-link :to="localePath('privacy')" class="display-flex primary-color-txt full-height align-items-center">
              <span class="title_menu font-size-18">Quyền riêng tư</span>
            </nuxt-link>
          </li>
          <li class="full-height mg-t-24r">
            <nuxt-link :to="localePath('termsOfUse')" class="display-flex primary-color-txt full-height align-items-center">
              <span class="title_menu font-size-18">Điều khoản sử dụng</span>
            </nuxt-link>
          </li>
          <li class="full-height mg-t-24r">
            <nuxt-link :to="localePath('contact')" class="display-flex primary-color-txt full-height align-items-center">
              <span class="title_menu font-size-18">Liên hệ</span>
            </nuxt-link>
          </li>
        </ul>
      </div>
      <div class="item-menu col-md-3 col-sm-6 col-xs-12">
        <h4 class="font-sanpro-semibold mg-b-32r height-48 display-flex align-item-end">
          Nhận thông tin mới
        </h4>
        <div class="display-flex-center justify-content-between padding-5r box-send-email">
          <input
            v-model="email"
            type="email"
            class="border-none full-width"
            placeholder="Nhập email"
          >
          <button class="btn-send-mail bg-primary-color border-none">
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.4773 6.16664L6.00732 1.69664L7.18565 0.518311L13.6673 6.99998L7.18565 13.4816L6.00732 12.3033L10.4773 7.83331H0.333984V6.16664H10.4773Z"
                fill="white"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { APP_CONFIG } from '@/utils/env'
const logoDefault = require('@/assets/images/logo/logo-masothue.png')
export default {
  name: 'Footer',
  data () {
    return {
      logoDefault,
      cdnUrl: APP_CONFIG.cdnUrl,
      emailDefault: '',
      hotlineDefault: '',
      email: '',
      logo: ''
    }
  },
  computed: {
  },
  mounted () {
    this.nuxtServerInit()
  },
  methods: {
    async nuxtServerInit () {
      const dataConfig = await this.$axios.get('v1/config/GetListByGroup?group=all')
      // eslint-disable-next-line array-callback-return
      dataConfig && dataConfig.map((item) => {
        if (item.configKey === 'EMAIL') {
          this.emailDefault = item.configContent
        } else if (item.configKey === 'HOTLINE') {
          this.hotlineDefault = item.configContent
        } else if (item.configKey === 'LOGO') {
          this.logo = item.configContent
        }
      })
      // this.emailDefault =
      // this.hotlineDefault = await this.$axios.get('v1/config/getbykey?key=HOTLINE')
    }
  }
}
</script>

<style lang="scss" scoped>
.footer {
  padding-bottom: 4rem;
  .footer-contact {
    .logo {
      a {
        width: 10.8rem;
        height: 2.4rem;
      }
    }
    .footer-address {
      i {
        width: 1rem;
      }
    }
  }
  .box-send-email {
    border: 1px solid $color_border;
    border-radius: 100px;
    input {
      height: 100%;
      margin-left: 0.25rem;
      outline: 2px solid transparent;
      outline-offset: 2px;
    }
    .btn-send-mail {
      padding: 0.8rem 1rem;
      border-radius: 100%
    }
  }
  .item-menu {
    a:hover{
      color: $primary_color;
    }
  }
}
@media screen and (max-width: 575px) {
  .height-48 {
    height: 1rem;
  }
  .footer-contact {
    padding-bottom: 1rem;
  }
  .item-menu {
    padding-top: 1rem;
    border-top: 1px solid $color_border;
  }
  .item-menu:not(:last-child) {
    padding-bottom: 1rem;
  }
}
</style>
