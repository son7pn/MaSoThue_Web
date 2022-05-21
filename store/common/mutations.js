import * as types from './constants'
// import { initState } from './index'

export default {
  [types.SET_LOADING] (state, data) {
    state.loading = data
  },
  [types.LIST_COMMENT] (state, data) {
    state.listComment = data.list
    state.totalRecordsComment = data.totalRow
  },
  [types.GET_CONTENT_CONFIG] (state, data) {
    state.contentConfig = data
  },
  [types.GET_LIST_PROVINCE] (state, data) {
    state.listProvince = data.list
  },
  [types.GET_RATE_ARTICLES] (state, data) {
    state.rateArticles = data
  },
  [types.GET_LIST_DISTRICT] (state, data) {
    state.dataDistrict = data
  },
  [types.GET_LIST_COMMUNE] (state, data) {
    state.dataCommune = data
  }
}
