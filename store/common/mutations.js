import * as types from './constants'
// import { initState } from './index'

export default {
  [types.SET_LOADING] (state, data) {
    state.loading = data
  }
}
