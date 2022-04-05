import * as types from './constants'

export default {
  setLoading ({ commit }, data) {
    commit(types.SET_LOADING, data)
  }
}
