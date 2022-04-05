import createApi from '~/apis/Api'

export default (ctx, inject) => {
  inject('apis', createApi(ctx.$axios))
}
