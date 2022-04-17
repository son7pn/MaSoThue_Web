.<template>
  <Modal id="modal_choose_user" class="modal-w-52 modal-perpost" @close="closeModal">
    <template #title>
      <div class="modal-head__wrap full-width">
        <h3 class="font-size-26 font-weight-semibold primary-color-txt modal-head__title">
          Thông tin người gửi
        </h3>
      </div>
    </template>
    <template #body>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label>Họ và tên *</label>
          <input v-model="form.name" class="primary-color-txt input-text full-width" type="text">
          <span v-if="!$v.form.name.required && status" class="error mg-t-5r display-block color-err font-size-14 text-left">Vui lòng nhập họ tên</span>
        </div>
        <div class="form-group">
          <label>Email *</label>
          <input v-model="form.email" class="primary-color-txt input-text full-width" type="text">
          <span v-if="!$v.form.email.required && status" class="error mg-t-5r display-block color-err font-size-16 text-left">Vui lòng nhập email</span>
          <span v-if="!$v.form.email.email && status" class="error mg-t-5r display-block color-err font-size-16 text-left">Vui lòng nhập đúng định dạng email</span>
        </div>
        <div class="form-group">
          <label>Số điện thoại</label>
          <input v-model="form.phoneNumber" class="primary-color-txt input-text full-width" type="text">
          <!-- <span v-if="!$v.form.description.required && status" class="error mg-t-5r display-block color-err font-size-14 text-left">Vui lòng nhập nội dung</span> -->
        </div>
        <div class="form-group">
          <button type="submit" class="btn bg-primary-color full-width color-light">
            Bình luận
          </button>
        </div>
      </form>
    </template>
  </Modal>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, email } from 'vuelidate/lib/validators'
import Modal from '@/components/modal/Modal'
export default {
  name: 'ModalComfirmInfoComment',
  components: {
    Modal
  },
  mixins: [validationMixin],
  data () {
    return {
      status: false,
      form: {
        name: '',
        email: '',
        phoneNumber: null
      }
    }
  },
  validations: {
    form: {
      name: {
        required
      },
      // description: {
      //   required
      // },
      email: {
        required,
        email
      }
    }
  },
  computed: {
  },
  mounted () {
  },
  methods: {
    closeModal () {
      this.$emit('closeModal')
    },
    handleSubmit () {
      if (this.$v.$invalid) {
        this.status = true
      } else {
        this.$emit('submit', this.form)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.scroll-area {
  position: relative;
  margin: 0 auto;
  height: 55.67vh;

  &.scroll-area-qa {
    height: 40vh;
  }
}
.btn {
  width: 100% !important;
  height: 3.4rem !important;
}
.list-user {
  &__title {
    margin-bottom: 1.1rem;
  }
}
 .form-group {
    margin-bottom: 1.5rem;
  }
  textarea {
    resize: none
  }
  textarea.input-text {
    min-height: 10em;
    padding: 1.858em;
  }
  .input-text {
    padding: 0.857em 1.214em;
    line-height: 1.286em;
    outline: 0;
    border: 0;
    -webkit-appearance: none;
    border-radius: 1.571em;
    border: 1px solid $color_border;
    margin-top: 0.85rem;
  }
.user-list {
  margin: -0.25rem -1rem;
  padding: 0 1rem;

  &.list-user--expert {
    margin-bottom: 1rem;
  }

  .item {
    padding: 0.5rem 0;
    &__checkbox {
      margin: 0;
    }

    &__img {
      margin-right: 0.65rem;
    }

    &__name {
      width: calc(100% - 3.25rem); // 2.6 rem avatar + space 0.65rem
    }

    &__info {
      width: calc(100% - 1.7rem);
    }
  }
}
.modal-head {
  &__title {
    margin-bottom: 0.8rem;
  }

  &__desc {
    margin-bottom: 1.25rem;

    &__choose {
      margin-bottom: 0.4rem;
    }
  }
}
.modal-footer {
  &__wrap {
    padding: 0.5rem 1rem;
  }
}
</style>
<style lang="scss">
  #modal_choose_user {
    position: fixed;
    z-index: 99999;

    .btn-close {
      position: absolute;
      top: 0.6rem;
      right: 1rem;
      padding: 0;
    }
  }
</style>
