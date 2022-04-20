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
  }
}
