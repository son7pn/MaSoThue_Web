import * as types from './constants'

export default {
  setLoading ({ commit }, data) {
    commit(types.SET_LOADING, data)
  },
  // comment
  async acCreateComment ({ commit }, payload) {
    const data = await this.$apis.commentApi.createComment(payload)
    return data
  },
  async acGetListComment ({ commit }, { articleId, pageIndex, pageSize }) {
    const data = await this.$apis.commentApi.showListComment({ articleId, pageIndex, pageSize })
    data && commit(types.LIST_COMMENT, data)
  },
  async acGetContentConfig ({ commit }, params) {
    const data = await this.$apis.common.showContentConfig(params)
    data && commit(types.GET_CONTENT_CONFIG, data)
  },
  async acGetListProvince ({ commit }) {
    const data = await this.$apis.common.showListProvince()
    data && commit(types.GET_LIST_PROVINCE, data)
  },
  async acGetRateArticles ({ commit }, id) {
    const data = await this.$apis.commentApi.showRateArticles(id)
    data && commit(types.GET_RATE_ARTICLES, data)
  },
  async acGetListDistrict ({ commit }, id) {
    const data = await this.$apis.common.showListDistrict(id)
    data && commit(types.GET_LIST_DISTRICT, data)
  },
  async acGetListCommune ({ commit }, id) {
    const data = await this.$apis.common.showListCommune(id)
    data && commit(types.GET_LIST_COMMUNE, data)
  },
  async acGetListAdvertisement ({ commit }) {
    const data = await this.$apis.common.showAdvertisement()
    data && commit(types.GET_LIST_ADVERTISEMENT, data)
  }
}
