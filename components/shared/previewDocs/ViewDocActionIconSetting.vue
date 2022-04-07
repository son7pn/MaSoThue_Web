<template>
  <div v-click-outside="() => isOpenSetting = false" class="setting position-rel color-light display-block">
    <div class="setting__icon effect-transition-fast" @click="isOpenSetting = !isOpenSetting">
      <i class="icon-setting color-light font-size-30" />
    </div>
    <div class="setting__menu position-abs border-rd-8 effect-transition-fast" :class="{'active': isOpenSetting, 'open-zoom': isOpenViewZoom, 'open-speed': isOpenSpeed}">
      <template v-if="isDoc">
        <!-- <template v-if="!isOpenViewZoom"> -->
        <div v-show="!isOpenViewZoom" class="item theme display-flex-center justify-content-between">
          <div class="item__label">
            Chế độ xem
          </div>
          <div class="item__value display-flex-center justify-content-between">
            <span class="mr-3">
              {{ isThemeDark ? 'Tối' : 'Sáng' }}
            </span>
            <div class="switch-theme full-width bg-color-light border-rd-20 position-rel display-flex-center justify-content-between">
              <input type="checkbox" name="change_view" class="position-abs full-box opacity-0 cursor-pointer" checked @change="changeThemeViewer">
              <span class="bg-transition bg-color-light-gray position-abs border-rd-20 effect-transition-fast display-block" />
              <label
                class="view-light border-rd-20 effect-transition-fast display-flex-center justify-content-center cursor-pointer"
                :class="`${!isThemeDark ? 'bg-color-light' : 'bg-secondary-color-txt'}`"
              >
                <img src="@/assets/images/icon/sun.png" alt="Light">
              </label>
              <label
                class="view-dark border-rd-20 effect-transition-fast display-flex-center justify-content-center cursor-pointer"
                :class="`${isThemeDark ? 'bg-color-light' : 'bg-secondary-color-txt'}`"
              >
                <img src="@/assets/images/icon/moon.png" alt="Dark">
              </label>
            </div>
          </div>
        </div>
        <div v-show="!isOpenViewZoom" class="item zoom display-flex-center justify-content-between position-rel">
          <div class="item__label">
            Độ phóng to
          </div>
          <div class="item__value" @click="() => isOpenViewZoom = true">
            <div class="zoom__value display-flex-center justify-content-between cursor-pointer color-light">
              <span class="mr-3">{{ formattedZoom }} %</span>
              <span class="zoom__icon"><i class="icon-next" /></span>
            </div>
          </div>
        </div>
        <!-- </template> -->
        <!-- <template v-else> -->
        <div v-show="isOpenViewZoom" class="item">
          <div class="back text-left cursor-pointer color-light" @click="() => isOpenViewZoom = false">
            <i class="icon-previous font-size-20" /> Thu phóng
          </div>
          <ul class="zoom__menu list-style-none effect-transition-fast">
            <li
              v-for="item of zoomList"
              :key="item.value"
              class="cursor-pointer"
              :class="{'primary-color font-weight-bold': scale === item.value}"
              @click="onZoom(item)"
            >
              {{ item.name }}
            </li>
          </ul>
        </div>
        <!-- </template> -->
      </template>
      <template v-else>
        <!-- <template v-if="!isOpenSpeed"> -->
        <div v-show="!isOpenSpeed" class="item zoom display-flex-center justify-content-between position-rel" @click="() => isOpenSpeed = true">
          <div class="item__label">
            Tốc độ phát
          </div>
          <div class="item__value position-rel">
            <div class="zoom__value display-flex-center justify-content-between">
              <span class="mr-3">{{ speedList[speedIndex].name }}</span>
              <span class="zoom__icon"><i class="icon-next" /></span>
            </div>
          </div>
        </div>
        <!-- </template> -->
        <!-- <template v-else> -->
        <div v-show="isOpenSpeed" class="item">
          <div class="back text-left cursor-pointer color-light" @click="() => isOpenSpeed = false">
            <i class="icon-previous font-size-20" /> Tốc độ phát
          </div>
          <ul class="zoom__menu list-style-none effect-transition-fast">
            <li
              v-for="(item, index) of speedList"
              :key="item.value"
              class="cursor-pointer"
              :class="{'primary-color font-weight-bold': speedIndex === index}"
              @click="onChangeSpeed(item, index)"
            >
              {{ item.name }}
            </li>
          </ul>
        </div>
        <!-- </template> -->
      </template>
    </div>
  </div>
</template>

<script>
import ClickOutside from 'vue-click-outside'

export default {
  name: 'ViewDocActionIconSetting',
  directives: {
    ClickOutside
  },
  props: {
    isDoc: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      scale: 1,
      zoomList: [
        { value: 0.5, name: '50%' },
        { value: 0.75, name: '75%' },
        { value: 1, name: '100%' },
        { value: 1.25, name: '125%' },
        { value: 1.5, name: '150%' },
        { value: 2, name: '200%' }
      ],
      isOpenSetting: false,
      isOpenViewZoom: false,
      isThemeDark: true,
      speedList: [
        { value: 0.25, name: '0.25' },
        { value: 0.5, name: '0.5' },
        { value: 0.75, name: '0.75' },
        { value: 1, name: 'Bình thường' },
        { value: 1.25, name: '1.25' },
        { value: 1.5, name: '1.5' },
        { value: 1.75, name: '1.75' },
        { value: 2, name: '2' }
      ],
      speedIndex: 3,
      isOpenSpeed: false
    }
  },
  computed: {
    formattedZoom () {
      return Number(this.scale * 100)
    }
  },
  beforeDestroy () {
    this.scale = 1
  },
  methods: {
    onZoom (zoom) {
      this.scale = zoom.value
      this.$emit('zoom', zoom.value)
    },

    onViewListZoom () {
      this.isOpenViewZoom = true
    },

    changeThemeViewer (evt) {
      this.isThemeDark = evt.target.checked
      this.$emit('changeTheme', evt.target.checked)
    },

    onChangeSpeed (speed, index) {
      this.speedIndex = index
      this.$emit('speedChange', speed.value)
    },

    onClickOutsize () {
      // console.log('Click outsize: ')
      this.isOpenSetting = !this.isOpenSetting
    }
  }
}
</script>

<style lang="scss" scoped>
.back {
  padding: 0 0 0.5rem 0;
  // border-bottom: 1px solid lighten($color_light, 10);
}

.setting {
  z-index: 2;

  &__menu {
    right: -0.75rem;
    min-width: 315px;
    padding: 0.9rem;
    -webkit-transform: scale(0);
    transform: scale(0);
    -webkit-transform-origin: bottom right;
    transform-origin: bottom right;
    background: rgba($color_dark, .8);
    bottom: 110%;
    z-index: 1;

    &.active {
      -webkit-transform: scale(1);
      transform: scale(1);
      -webkit-transform-origin: bottom right;
      transform-origin: bottom right;
    }

    &.open-zoom {
      min-width: 160px;
    }
    &.open-speed {
      min-width: 180px;
    }

    .item {
      padding: 0.5rem 0;
    }
  }

  @media screen and ( min-width: 1600px ) {

    &__menu {
      min-width: 360px;

      &.open-zoom, &.open-speed {
        min-width: 210px;
      }
    }
  }
}

.zoom {
  &__menu {

    li {
      padding: 0.8rem 0.75rem;

      &:hover {
        font-weight: bold;
      }
    }
  }

  &__value {
    z-index: 1;
  }
}
.switch-theme {
    height: 1.2rem;
    width: 3rem;
    background: $secondary_color_txt;

    input {
      top: 0;
      left: 0;
      z-index: 2;

      &:checked~.bg-transition {
        transform: translateX(calc(100% + 0.6rem));
        -webkit-transform: translateX(calc(100% + 0.6rem));
      }
    }
    .bg-transition {
      top: 0;
      z-index: 0;
    }
    .bg-transition, label {
      width: 1.2rem;
      height: 1.2rem;
    }

    img {
      max-width: 1rem;
      opacity: 0.6;
    }

    label {
      z-index: 1;
    }
  }
</style>
