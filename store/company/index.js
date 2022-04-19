import actions from './actions'
import getters from './getters'
import mutations from './mutations'

export const initState = () => {
  return {
    listCompany: [],
    totalRecordsCompany: null,
    detailCompanyByTax: {}
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
