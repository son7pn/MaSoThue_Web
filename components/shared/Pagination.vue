<template>
  <div class="paging display-flex-center justify-content-end">
    <div class="paging__main">
      <client-only>
        <!-- Paginate from plugin -->
        <Paginate
          v-if="totalPage > 1"
          :page-count="totalPage"
          :page-range="3"
          :margin-pages="1"
          :click-handler="click2Page"
        >
          <!-- <span slot="prevContent"><i class="icon-trai" /></span>
          <span slot="nextContent"><i class="icon-right-arrow-angle" /></span> -->
        </Paginate>
      </client-only>
    </div>
  </div>
</template>

<script>
import ClickOutside from 'vue-click-outside'

export default {
  name: 'Pagination',
  directives: {
    ClickOutside
  },
  props: {
    totalPage: {
      type: Number,
      default: 1
    },
    totalRecords: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      perPage: 10,
      listPerPage: [10, 20, 30, 50, 100],
      isShowPerpageDropdown: false
    }
  },
  computed: {
    currPage () {
      return Number(this.$route.query.page)
    },
    rowStart () {
      return this.currPage > 1 ? (this.currPage * this.perPage) + 1 : 1
    },
    rowEnd () {
      return (this.rowStart + this.perPage) - 1
    }
  },
  methods: {
    onChangePerPage (number) {
      if (this.perPage === number) {
        return
      }
      this.perPage = number
      this.$router.replace({ query: { ...this.$route.query, page: 1, perpage: number } })
      this.$emit('change', { page: 1, perPage: number })
      this.hidenPerPageDropDown()
    },

    toggleDropDownPerPage () {
      this.isShowPerpageDropdown = !this.isShowPerpageDropdown
    },

    hidenPerPageDropDown () {
      this.isShowPerpageDropdown = false
    },

    click2Page (page) {
      if (this.currPage === page) {
        return
      }
      // this.$router.replace({ query: { ...this.$route.query, page } })
      this.$emit('change', { page, perPage: this.perPage })
    }
  }
}
</script>

<style lang="scss" scoped>
.paging {
  margin-top: 2rem;
  padding: 0.75rem;

  >* {
    &:not(:last-child) {
      margin-right: 0.5rem;
    }
  }

  &__perpage {
    &__display {
      border: 1px solid $color_border;
      height: 35px;
      padding: 0 0.5rem;
    }

    .type-drop {
      box-shadow: 0px 0px 10px rgba($color_dark, .1);
      -webkit-box-shadow: 0px 0px 10px rgba($color_dark, .1);

      li {
        a {
          padding: 0.4rem 0.5rem;
        }
      }
    }
  }
  @media screen and ( max-width: 991px ) {
    &__perpage {
      .type-drop {
        bottom: 100%;
      }
    }
  }

  @media screen and ( max-width: 767px ) {
    display: block;

    >* {
      display: block;
      &:not(:last-child) {
        margin-right: 0;
        margin-bottom: 10px;
      }
    }

    &__perpage {
      &__display {
        width: max-content;
        margin: auto;
      }
    }
  }
}

</style>
<style lang="scss">
.paging {
  &__main {
    ul {
      li {
        list-style: none;
        display: inline-block;
        margin: 0 3px;
        a {
          text-align: center;
        }
        &:first-child, &:last-child {

          a {
            font-size: 0;
            &:before {
              content: "\e923";
              font-family: "icomoon";
              width: 100%;
              height: 100%;
              color: $secondary_color_txt;
              font-size: 0.8rem;
            }
          }
        }

        &:first-child {
          a {
            transform: rotate(180deg);
            -webkit-transform: rotate(180deg);
            transform-origin: center;
            -webkit-transform-origin: center;
          }
        }

        a {
          width: 35px;
          height: 35px;
          border: 1px solid $color_border;
          border-radius: 4px;
          display: block;
          line-height: 33px;
          color: $secondary-color-txt;

          &.active {
            border: 1px solid $primary_color;
            color: $color_light;
            pointer-events: none;
          }

          &:hover {
            color: $primary_color;
          }
        }

        &.active {

          a {
            border: 1px solid $primary_color;
            color: $color_light;
            pointer-events: none;
            background: $primary_color;
          }
        }

        @media screen and ( max-width: 767px ) {
          margin: 0 1.5px;

          a {
            width: 30px;
            height: 30px;
            line-height: 28px;
          }
        }
      }
    }
  }
}
</style>
