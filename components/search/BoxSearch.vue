<template>
  <div class="box-search bg-primary-color">
    <div class="bg-color-light box-search__main border-rd-4 display-flex-center">
      <div class="box-search__select position-rel display-flex-center">
        <div class="full-width display-flex-center justify-content-between" @click="() => isShowDrop = !isShowDrop">
          <span class="pr-2"> {{ selectActive ? selectActive : 'Tìm tự động' }} </span>
          <i class="icon-down-arrow" />
        </div>
        <div v-if="isShowDrop" class="position-abs full-width bg-color-light drop-down">
          <ul class="list-style-none">
            <li v-for="(item, index) in listSelect" :key="index" @click="onSelect(item)">
              {{ item.value }}
            </li>
          </ul>
        </div>
      </div>
      <div class="box-search__input display-flex-center">
        <input placeholder="Nhập mã số thuế, CMND, tên công ty" class="border-none full-width">
        <button class="bg-primary-color border-rd-4">
          <i class="icon-search" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BoxSearch',
  data () {
    return {
      isShowDrop: false,
      selectActive: '',
      listSelect: [
        { id: 0, value: 'Mã số thuế công ty' },
        { id: 1, value: 'Mã số thuế cá nhân' },
        { id: 2, value: 'CMND, căn cước' },
        { id: 3, value: 'Tên công ty' },
        { id: 4, value: 'Giám đốc công ty' }
      ]
    }
  },
  methods: {
    onSelect (item) {
      this.selectActive = item.value
      this.isShowDrop = false
    }
  }
}
</script>

<style  lang="scss" scoped>
.box-search {
  height: 3.25rem;
  padding: 0.6rem;
  &__main {
    height: 100%;
    width: 60%;
    margin: auto;
  }
  &__select {
    width: 30%;
    border-right: 1px solid $color_border_button;
    height: 100%;
    padding-right: 0.8rem;
    padding-left: 0.6rem;
    min-width: max-content;

    .drop-down {
      box-shadow: 0px 5px 12px rgba(0, 0, 0, 0.3);
      -webkit-box-shadow: 0px 5px 12px rgba(0, 0, 0, 0.3);
      border-radius: 0 0 6px 6px;
      width: 100% !important;

      li {
        padding: 0.4rem 0.8rem;
        cursor: pointer;
        &:hover {
          background: $primary_color;
          color: $color_light;
        }
      }
    }
  }
  &__input {
    width: 70%;
    padding-left: 0.8rem;
    padding-right: 0.1rem;

    button {
      padding: 0.3rem 0.7rem;
      border: 1px solid $color_border_button;
    }
  }
}

@media (max-width: 991px) {
  .box-search {
    &__main {
      width: 65%;
    }
  }
}
@media (max-width: 768px) {
  .box-search {
    &__main {
      width: 91%;
    }
  }
}

</style>
