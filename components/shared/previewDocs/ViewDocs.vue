<template>
  <div class="viewdoc position-rel effect-transition-fast" :class="{'head-fixed': isHeadFixed}">
    <div
      class="viewdoc__body position-rel effect-transition-fast preview-docs"
      :class="{'size-init': scale === 1, 'bg-color-light': !isDarkTheme, 'bg-doc': isDarkTheme}"
    >
      <PreviewDocument
        v-if="dataSource && dataSource.path && isDocument(dataSource.path)"
        :path="dataSource.path"
        :path-view="dataSource.pathView"
        :total-page="dataSource.totalPage"
        :zoom="scale"
        :change-page="actionChangePage"
        :page-active="page"
        @scrollPage="onSetPageCurr"
      />
      <PreviewImg v-else-if="dataSource && dataSource.path" :link="cdnUrl + dataSource.path" :zoom="scale" />
      <client-only>
        <ViewDocFooter
          v-if="dataSource"
          :data-source="dataSource"
          :page="page"
          @zoom="(value) => scale = value"
          @changeTheme="(value) => isDarkTheme = value"
          @changeDisplayDoc="(value) => isDisplayDoc = value"
        />
      </client-only>
    </div>
  </div>
</template>

<script>
import PreviewDocument from './PreviewDocument.vue'
import PreviewImg from './PreviewImg.vue'
import ViewDocFooter from './ViewDocActionFooter'
import mixinsFile from '@/mixins/mixinsFile'
// import { APP_CONFIG } from '@/utils/env'

export default {
  name: 'ViewDocsPage',
  components: {
    PreviewDocument,
    PreviewImg,
    ViewDocFooter
  },
  mixins: [mixinsFile],
  props: {
    dataSource: {
      type: Object,
      default: Object
    },
    isHeadFixed: {
      type: Boolean,
      default: false
    },
    docId: {
      type: Number,
      default: 0
    },
    hasComment: {
      type: Boolean,
      default: true
    },
    hasDownload: {
      type: Boolean,
      default: true
    },
    hasShare: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      cdnUrl: 'http://elearningobj.ca52570e.sabai.vn',
      page: 1,
      scale: 1,
      actionChangePage: 1, // Support next/prev page
      isDarkTheme: true,
      isDisplayDoc: false
    }
  },
  computed: {
  },
  mounted () {
  },
  beforeDestroy () {
    // Mutation reset all data view doc
  },
  methods: {
    onSetPageCurr (page) {
      this.page = page || 1
    },
    onChangePage (page) {
      this.page = page || 1
    }
  }
}
</script>

<style lang="scss" scoped>
.disabled {
  opacity: 0.5;
}
.viewdoc {
  padding-bottom: 2rem;
  &__head {
    height: 4rem;
    z-index: 2;
    padding: 0 2.3%;

    &.bg-theme-dark {
      background: rgba($color_dark, .4);
    }
    &.bg-theme-light {
      background: rgba($color_light, .4);
    }

    // background: $primary_color_txt;
    &__left {
      i {
        margin-right: 1rem;
      }

      &:hover {
        span {
          opacity: 1;
        }
      }
    }
  }

  &__zoom {
    padding-left: 1.75rem;
    a {
      width: 1.2rem;
      height: 1.2rem;
      line-height: 1.1rem;
    }

    >* {
      &:not(:last-child) {
        margin-right: 2rem;
      }
    }
  }

  &__pagination {
    padding-right: 2rem;
    >* {
      &:not(:last-child) {
        margin-right: 1.5rem;
      }
    }

    i {
      top: 1px;
    }

    &:after {
      content: '';
      width: 2px;
      height: 2rem;
      position: absolute;
      @include center(y);
      right: 0;
      display: block;
      background: $secondary_color_txt;
    }
    &__prev {
      margin-right: 1.8rem;
    }
  }

  &__body {
    height: calc(100vh);
    padding-top: 3rem;
    // background: $primary_color_txt;
    z-index: 1;
  }
  &__info {
    margin-top: 1.7rem;
    margin-bottom: 1rem;
  }
  &__comment {
    // border-top: 1px solid $color_border;
    width: 63.8%;
  }
  &__border{
    border-top: 1px solid $color_border;
    margin-top: 1.2rem;
    margin-bottom: 1rem;
  }
  &__navbar {
    width: 32.3%;
  }

  &.show-tab {
    .viewdoc {
      &__head, &__body {
        // padding-right: 28vw;
        width: 73vw;
      }
    }
  }

  // .size-init {
  //   >img {
  //     // max-height: 90%;
  //   }
  // }

  &.head-fixed {
    .viewdoc {
      &__head {
        position: fixed;
        top: 0;
        width: 100%;
        background: transparent;
      }

      &__body {
        height: 100vh;
      }
    }
  }

  @media screen and ( min-width: 992px ) and ( max-width: 1199px ) {
    &.show-tab {
      .viewdoc {
        &__head, &__body {
          width: 65vw;
        }
      }
    }
  }
  @media screen and ( max-width: 991px ) {
    &.show-tab {
      .viewdoc {
        &__head, &__body {
          width: 100%;
        }
      }
    }
  }
  @media screen and ( min-width: 768px ) and ( max-width: 991px ) {
    &__head {
      &__left, &__right {
        width: 50%;
      }
    }
  }
  @media screen and ( max-width: 767px ) {
    .viewdoc{
      &__head {
        &__left {
          width: 40%;
        }

        &__right {
          width: 60%;
        }
      }
      &__content {
        display: block;
      }
      &__comment {
        width: 100%;
        border-bottom: 1px solid $color_border;
      }
      &__navbar {
        width: 100%;
        margin-top: 1.6rem;
      }
      &__info {
        display: block;
        &__right {
          margin-top: 1rem;
        }
      }
    }
  }

  @media screen and ( max-width: 575px ) {

    &__zoom {
      padding-left: 0.8rem;
      >* {
        &:not(:last-child) {
          margin-right: 1rem;
        }
      }
    }
    &__pagination {
      padding-right: 1rem;
      >* {
        &:not(:last-child) {
          margin-right: 0.8rem;
        }
      }
    }
  }
}
</style>
<style lang="scss">
.preview-docs {
  .custom-video {
    display: flex;
    height: 100vh;
  }
}
</style>
