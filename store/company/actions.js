import * as types from './constants'

export default {
  async acGetListCompanyByTax ({ commit }, { keyword, pageIndex, pageSize, type }) {
    const data = await this.$apis.companyApi.showCompanyByTax({ keyword, pageIndex, pageSize, type })
    data && commit(types.GET_LIST_COMPANY_BY_TAX, data)
  },
  async acDetailCompanyByTax ({ commit }, params) {
    const data = await this.$apis.companyApi.detaiCompanyByTax(params)
    data && commit(types.DETAIL_COMPANY_BY_TAX, data)
  }
}
