import * as types from './constants'

export default {
  [types.GET_LIST_COMPANY_BY_TAX] (state, data) {
    state.listCompany = data.list
    state.totalRecordsCompany = data.totalRow
  },
  [types.DETAIL_COMPANY_BY_TAX] (state, data) {
    state.detailCompanyByTax = data
  }
}
