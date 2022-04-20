import actions from './actions'
import getters from './getters'
import mutations from './mutations'

export const initState = () => {
  return {
    loading: false,
    listComment: [],
    totalRecordsComment: null,
    contentConfig: {}
  }
}
const state = initState()

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
