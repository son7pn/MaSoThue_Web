<template>
  <div class="province container">
    <div class="row mt-4">
      <div class="col-md-9">
        <h3 class="font-weight-medium primary-color-txt border-title">
          Tra cứu mã số thuế theo tỉnh, thành phố
        </h3>
        <vueCustomScrollbar class="scroll-class none-ps-x none-ps-y">
          <ul class="row list-sort list-style-none">
            <li v-for="(item1, index1) of listProvince" :key="index1" class="cat-item align-items-center col-xs-6 col-md-12">
              <nuxt-link :to="localePath('/tra-cuu-ma-so-thue-theo-tinh/ha-noi')" class="primary-color-txt font-size-18">
                {{ item1.name }}
              </nuxt-link>
            </li>
          </ul>
        </vueCustomScrollbar>
      </div>
      <div class="col-md-3">
        <div class="mb-5">
          <h3 class="font-weight-medium primary-color-txt border-title">
            Tra mã số thuế trên Facebook
          </h3>
          <a href="https://www.facebook.com/masothuedotcom" target="_blank">
            <figure>
              <img src="@/assets/images/banner/image-fb.png">
            </figure>
          </a>
        </div>
        <div>
          <h3 class="font-weight-medium primary-color-txt border-title">
            Tỉnh/thành phố
          </h3>
          <vueCustomScrollbar class="scroll-class none-ps-x none-ps-y">
            <ul class="row list-sort list-style-none">
              <li v-for="(item1, index1) of listProvince" :key="index1" class="cat-item align-items-center col-xs-6 col-md-12">
                <nuxt-link :to="localePath('/tra-cuu-ma-so-thue-theo-tinh/ha-noi')" class="primary-color-txt font-size-18">
                  {{ item1.name }}
                </nuxt-link>
              </li>
            </ul>
          </vueCustomScrollbar>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vueCustomScrollbar from 'vue-custom-scrollbar'

export default {
  name: 'IndexProvince',
  components: {
    vueCustomScrollbar
  },
  nuxtI18n: {
    paths: {
      vi: '/tra-cuu-doanh-nghiep'
    }
  },
  data () {
    return {
      listProvince: [
        {
          name: 'Hà Nội'
        },
        {
          name: 'TP Hồ Chí Minh'
        },
        {
          name: 'Hải Phòng'
        },
        {
          name: 'Thái Bình'
        },
        {
          name: 'Thanh Hóa'
        },
        {
          name: 'Đà Nẵng'
        },
        {
          name: 'Huế'
        },
        {
          name: 'Lạng Sơn'
        },
        {
          name: 'Cao Bằng'
        },
        {
          name: 'Lai Châu'
        },
        {
          name: 'Phú Thọ'
        }
      ]
    }
  }
}
</script>

<style  lang="scss" scoped>
.province {
  padding-top: 1rem;
}
.list-sort {
  li {
    border-bottom: 1px solid $color_border;
    position: relative;
    min-height: 1px;
    padding-right: 0.9375rem;
    padding-left: 0.9375rem;
    a {
      position: relative;
      margin-left: 2.7em;
      padding: 0.5em 0;
      display: inline-block;
      &:before {
        color: #575560;
        content: "";
        font-family: FontAwesome;
        font-size: 1.1em;
        line-height: 1em;
        margin-left: -1.4em;
        position: absolute;
      }
    }
  }
  li:last-child {
    border-bottom: 0;
  }
  li:hover {
    a {
        color: $primary_color;
      }
  }
}
</style>
