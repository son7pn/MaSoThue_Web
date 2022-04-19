<template>
  <div class="page-contact pd-t-50r container">
    <h2 class="font-sanpro-semibold primary-color-txt font-size-40 mg-b-64r display-flex-center justify-content-center full-width">
      Liên hệ
    </h2>
    <div class="row">
      <div class="col-md-6 col-12">
        <h4 class="font-sanpro-semibold primary-color-txt title-comment">
          Gửi liên hệ
        </h4>
        <form @submit.prevent="handleSubmit">
          <div class="form-group row">
            <div class="col-xs-12 col-md-6">
              <label>Họ và tên *</label>
              <input v-model="form.name" class="primary-color-txt input-text full-width" type="text">
              <span v-if="!$v.form.name.required && status" class="error mg-t-5r display-block color-err font-size-14 text-left">Vui lòng nhập họ tên</span>
            </div>
            <div class="col-xs-12 col-md-6">
              <label>Email *</label>
              <input v-model="form.email" class="primary-color-txt input-text full-width" type="text">
              <span v-if="!$v.form.email.required && status" class="error mg-t-5r display-block color-err font-size-16 text-left">Vui lòng nhập email</span>
              <span v-if="!$v.form.email.email && status" class="error mg-t-5r display-block color-err font-size-16 text-left">Vui lòng nhập đúng định dạng email</span>
            </div>
          </div>
          <div class="form-group">
            <label>Nội dung *</label>
            <textarea v-model="form.description" class="primary-color-txt input-text full-width" name="mess" cols="40" rows="10" />
            <span v-if="!$v.form.description.required && status" class="error mg-t-5r display-block color-err font-size-14 text-left">Vui lòng nhập nội dung</span>
          </div>
          <div class="form-group">
            <button type="submit" class="btn bg-primary-color color-light">
              Gửi liên hệ
            </button>
          </div>
        </form>
      </div>
      <div class="col-md-6 col-12">
        <h4 class="font-sanpro-semibold primary-color-txt title-comment">
          Thông tin liên hệ
        </h4>
        <div>
          <p class="primary-color-txt mg-b-20r">
            Email: email@email.com
          </p>
          <a href="https://www.facebook.com/masothue.vn/" class="primary-color" target="_blank">Mã số thuế</a>
          <p class="font-sanpro-semibold primary-color-txt font-size-22 pd-t-48r mg-b-20r">
            Liên hệ
          </p>
          <p class="primary-color-txt mg-b-20r">
            Mọi đóng góp, vui lòng liên hệ: email@email.com
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, email } from 'vuelidate/lib/validators'
export default {
  name: 'IndexContact',
  nuxtI18n: {
    paths: {
      vi: '/lien-he'
    }
  },
  mixins: [validationMixin],
  data () {
    return {
      status: false,
      form: {
        name: '',
        email: '',
        description: ''
      }
    }
  },
  validations: {
    form: {
      name: {
        required
      },
      description: {
        required
      },
      email: {
        required,
        email
      }
    }
  },
  mounted () {
    this.scrollToTop()
  },
  methods: {
    scrollToTop () {
      window.scrollTo(0, 0)
    },
    handleSubmit () {
      if (this.$v.$invalid) {
        this.status = true
      } else {
        // console.log('form: ', this.form)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.page-contact {
  .title-comment {
    margin-bottom: 2rem;
    padding-bottom: 1.053em;
    position: relative;
    border-bottom: 1px solid $color_border;
    &:after {
      content: ' ';
      width: 20%;
      border-bottom: 3px solid $primary_color;
      display: block;
      position: absolute;
      bottom: -1px;
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
    border-radius: 0.4rem;
    border: 1px solid $color_border;
    margin-top: 0.85rem;
  }
}
</style>
