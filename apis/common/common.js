import { STATUS_FAIL } from '@/store/common/constants'
const resource = 'v1/config'
export default ($axios) => {
  return {
    async showContentConfig (payload) {
      const data = await $axios.get(`${resource}/getbykey?key=${payload}`)
      return data !== STATUS_FAIL ? data : null
    },
    async showListProvince () {
      const data = await $axios.get('v1/Article/GetAllProvince')
      return data !== STATUS_FAIL ? data : null
    }
  }
}
