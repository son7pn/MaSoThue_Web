import { STATUS_FAIL } from '@/store/common/constants'
const resource = 'v1/config'
export default ($axios) => {
  return {
    async showContentConfig (payload) {
      const data = await $axios.get(`${resource}/getbykey?key=${payload}`)
      return data !== STATUS_FAIL ? data : null
    },
    async showListProvince () {
      const data = await $axios.get('v1/Article/ds-tinh')
      return data !== STATUS_FAIL ? data : null
    },
    async showListDistrict (matp) {
      const data = await $axios.get(`v1/Article/ds-huyen?keyword=${matp}&pageIndex=1&pageSize=100`)
      return data !== STATUS_FAIL ? data : null
    },
    async showListCommune (id) {
      const data = await $axios.get(`v1/Article/ds-xa?keyword=${id}&pageIndex=1&pageSize=100`)
      return data !== STATUS_FAIL ? data : null
    },
    async showAdvertisement () {
      const data = await $axios.get('v1/Advs/GetListByGroup?group=ads')
      return data !== STATUS_FAIL ? data : null
    },
    async showListBusinessType (payload) {
      const data = await $axios.get(`v1/Article/BusinessType?pageIndex=${payload}&pageSize=50`)
      return data !== STATUS_FAIL ? data : null
    },
    async showDataConfig () {
      const data = await $axios.get('v1/config/GetListByGroup?group=all')
      return data !== STATUS_FAIL ? data : null
    }
  }
}
