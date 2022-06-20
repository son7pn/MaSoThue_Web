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
  },
  [types.GET_LIST_ADVERTISEMENT] (state, data) {
    state.listAdvertisement = data.list
  },
  [types.GET_LIST_BUSINESS_TYPE] (state, data) {
    state.listBusinessType = data.list
    state.totalRecordsBusinessType = data.totalRow
  },
  [types.GET_DATA_CONFIG] (state, data) {
    state.dataConfig = data
    data && data.map((item) => {
      if (item.configKey === 'EMAIL') {
        state.configEmail = item.configContent
      } else if (item.configKey === 'HOTLINE') {
        state.configHotline = item.configContent
      } else if (item.configKey === 'LOGO') {
        state.configLogo = item.configContent
      }
    })
  },
}
