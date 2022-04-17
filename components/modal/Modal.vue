<template>
  <div name="modal-fade">
    <div class="modal-backdrop" @click="close" />
    <div
      class="modal border-rd-12"
      :class="classParent"
      role="dialog"
      aria-labelledby="modalTitle"
      aria-describedby="modalDescription"
    >
      <header
        id="modalTitle"
        class="modal-header padding-12-20r line-height-init"
      >
        <slot name="title" />
        <div class="display-flex-center">
          <slot name="count" />
          <button
            v-if="isDisplayCloseBtn"
            type="button"
            class="btn-close secondary-color-txt"
            aria-label="Close modal"
            @click="close"
          >
            <i class="icon-thoat font-size-16" />
          </button>
        </div>
      </header>
      <section
        id="modalDescription"
        class="modal-body padding-12-20r"
      >
        <slot name="body" />
      </section>
      <footer class="modal-footer">
        <slot name="footer" />
      </footer>
    </div>
  </div>
</template>
<script>
import mixinsUnsetScrollWindow from '@/mixins/mixinsUnsetScrollWindow'
/**
 * Mounted: set position scroll
 * BeforeDestroy: Reset position scroll and scroll to it
 */
export default {
  name: 'Modal',
  mixins: [mixinsUnsetScrollWindow],
  props: {
    classParent: {
      type: String,
      default: String
    },
    isDisplayCloseBtn: {
      type: Boolean,
      default: true
    }
  },
  // mounted () {
  //   const scrollY = document.documentElement.style.getPropertyValue('--scroll-y')
  //   const body = document.body
  //   body.style.position = 'fixed'
  //   body.style.top = `-${scrollY}`
  //   window.addEventListener('scroll', () => {
  //     document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`)
  //   })
  // },
  // beforeDestroy () {
  //   const body = document.body
  //   const scrollY = body.style.top
  //   body.style.position = ''
  //   body.style.top = ''
  //   window.scrollTo(0, parseInt(scrollY || '0') * -1)
  // },
  methods: {
    close () {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
.modal-backdrop {
  z-index: 1001;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(64, 80, 94, 0.5);
  transition: opacity .5s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
}

.modal {
  z-index: 1002;
  width: 43%;
  position: fixed !important;
  @include center();
  background: $color_light;
  box-shadow: 2px 2px 20px 1px;
  // overflow-x: auto;
  display: flex;
  flex-direction: column;
}

.modal-header{
  display: flex;
}
.modal-header {
  justify-content: space-between;
}
.modal-body {
  position: relative;
  min-height: 20vh;
  // padding: 15px;
}

.btn-close {
  border: none;
  font-size: 20px;
  cursor: pointer;
  font-weight: bold;
  background: transparent;
}

.btn-green {
  color: white;
  border: none;
  padding: 10px;
  border-radius: 2px;
  background: $primary_color;
}
.modal-library {
  .modal {
    background: none;
  }
  .modal-header{
    background: $color_light;
    border-radius: 6px 6px 0 0;
  }
  .modal-body {
    padding: 0;
  }
}
.modal-newfeed {
  .modal-body {
    min-height: 40vh;
  }
}
.modal-w-520 {
  .modal {
    max-width: 520px !important;
  }
}
.modal-add-folder-exam {
  .modal-body {
    min-height: 12vh !important;
  }
}
.modal-w-88 {
  .modal {
    width: 88.75% !important;
  }
}
.modal-w-720 {
  .modal {
    width: 37.5% !important;
  }
}
.modal-w-656-75 {
  .modal {
    max-width: 656px;
    width: 75%;
  }
}
.modal-w-656 {
  .modal {
    max-width: 656px;
  }
}
.modal-w-h-520-700 {
  .modal {
    width: 520px;
    height: 75vh;
  }
}
.modal-w-70 {
  .modal {
    width: 70%;
  }
}
.modal-w-52 {
  .modal {
    width: 42.5%;
    @media (max-width: 1199px){
      width: 60%;
    }
    @media (max-width: 1024px){
      width: 80%;
    }
    @media (max-width: 768px){
      width: 90%;
    }
  }
}
.modal-w-28 {
  .modal {
    max-width: 520px;
    width: 28%;
    @media (max-width: 1199px){
      width: 35%;
    }
    @media (max-width: 1024px){
      width: 45%;
    }
    @media (max-width: 768px){
      width: 70%;
    }
  }
}
.modal-min-h13 {
  .modal-body {
    min-height: 13vh;
  }
}
.modal-h-newfeed {
  .modal {
  // @include center(x);
  // top: 13%;
  }
  // .modal-header {
  //   border-bottom: 1px solid $color_border;
  //   padding: 12px 0;
  //   margin: 0 20px;
  // }
}
.modal-notification {

  .modal {
    height: 42vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .modal-header {
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 1;
  }

  .modal-body {
    min-height: auto;
  }
}
.modal-full {
  width: 100%;
  max-width: 100% !important;
}
.modal-warning {
  .modal {
    text-align: center;
  }
  .modal-header {
    justify-content: flex-end;
  }
  .modal-body {
    min-height: 10vh;
  }
}
.modal-warning-file {
  .modal {
    width: 50rem;
  }
}
.modalBlock {
  .modal {
    background: $primary_color_txt;
    color: $color_light;
    box-shadow: 2px 2px 20px 1px rgba($color_dark, .2);
  }
}
@media screen and (max-width: 1200px){
  .modal{
    width: 60%;
  }
}
@media screen and (max-width: 1024px){
  .modal{
    width: 80%;
  }
}
@media screen and (max-width: 767px){
  .modal, .modal-w-520 .modal, .modal-w-656-75 .modal, .modal-w-656 .modal, .modal-w-h-520-700 .modal, .modal-w-70 .modal, .modal-w-88 .modal, .modal-w-720 .modal {
    width: 90%!important;
  }
}
</style>
