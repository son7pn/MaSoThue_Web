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
  }
}
