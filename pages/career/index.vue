<template>
  <div class="career container">
    <div class="row mt-4">
      <div class="col-md-9">
        <h3 class="career__title font-sanpro-semibold primary-color-txt border-title">
          Tra cứu mã số thuế theo ngành nghề
        </h3>
        <div class="career__list">
          <div class="career-header display-flex">
            <h4 class="code text-center mr-4">
              Mã
            </h4>
            <h4>Ngành</h4>
          </div>
          <div class="career-body">
            <div v-for="(item, index) of listCareer" :key="index" class="item display-flex cursor-pointer">
              <p class="code text-center mr-4">
                {{ item.id }}
              </p>
              <p> {{ item.name }} </p>
            </div>
          </div>
        </div>
        <Pagination
          :total-records="50"
          :total-page="10"
          @change="changPage"
        />
      </div>
      <div class="col-md-3">
        <div class="mb-5">
          <h3 class="font-sanpro-semibold primary-color-txt border-title">
            Tra mã số thuế trên Facebook
          </h3>
          <a href="https://www.facebook.com/masothuedotcom" target="_blank">
            <figure>
              <img src="@/assets/images/banner/image-fb.png">
            </figure>
          </a>
        </div>
        <div>
          <h3 class="font-sanpro-semibold primary-color-txt border-title">
            Tỉnh/thành phố
          </h3>
          <vueCustomScrollbar class="scroll-class none-ps-x none-ps-y">
            <ul class="row list-sort list-style-none">
              <li v-for="(item1, index1) of listProvince" :key="index1" class="cat-item align-items-center col-xs-6 col-md-12">
                <a href="javascript:;" class="primary-color-txt">{{ item1.name }}</a>
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
import Pagination from '@/components/shared/Pagination.vue'

export default {
  name: 'IndexCareer',
  components: {
    Pagination,
    vueCustomScrollbar
  },
  nuxtI18n: {
    paths: {
      vi: '/nganh-nghe'
    }
  },

  data () {
    return {
      listCareer: [
        {
          id: 4512,
          name: 'Bán buôn máy móc, thiết bị và phụ tùng máy khác'
        },
        {
          id: 1235,
          name: 'Đại lý, môi giới, đấu giá'
        },
        {
          id: 1231,
          name: 'Bán buôn đồ dùng khác cho gia đình'
        },
        {
          id: 2356,
          name: 'Vận tải hành khách đường bộ trong nội thành, ngoại thành (trừ vận tải bằng xe buýt)'
        },
        {
          id: 4512,
          name: 'Bán buôn máy móc, thiết bị và phụ tùng máy khác'
        },
        {
          id: 1235,
          name: 'Đại lý, môi giới, đấu giá'
        },
        {
          id: 1231,
          name: 'Bán buôn đồ dùng khác cho gia đình'
        },
        {
          id: 2356,
          name: 'Vận tải hành khách đường bộ trong nội thành, ngoại thành (trừ vận tải bằng xe buýt)'
        },
        {
          id: 4512,
          name: 'Bán buôn máy móc, thiết bị và phụ tùng máy khác'
        },
        {
          id: 1235,
          name: 'Đại lý, môi giới, đấu giá'
        },
        {
          id: 1231,
          name: 'Bán buôn đồ dùng khác cho gia đình'
        },
        {
          id: 2356,
          name: 'Vận tải hành khách đường bộ trong nội thành, ngoại thành (trừ vận tải bằng xe buýt)'
        }
      ],
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
  },

  methods: {
    changPage (page) {
      console.log('page: ', page)
    }
  }
}
</script>

<style lang="scss" scoped>
  .career {
    padding-top: 1rem;
    // width: 60%;
    &__title {
      &:after {
        width: 40%;
      }
    }
    &__list {
      .career-header {
        border-bottom: 1px solid $color_border;
        padding-bottom: 0.6rem;
        margin-bottom: 0.8rem;
      }

      .code {
        width: 60px;
      }

      .career-body {
        .item {
          border-bottom: 1px solid $color_background;
          padding-bottom: 0.6rem;
          margin-bottom: 0.8rem;

          &:hover {
            color: $primary-color;
          }
        }
      }
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
  }
</style>
