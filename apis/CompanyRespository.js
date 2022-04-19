import { STATUS_FAIL } from '@/store/common/constants'
const resource = '/v1/article'

export default ($axios) => {
  return {
    async showCompanyByTax ({ tax, pageIndex, pageSize }) {
      const data = await $axios.get(`${resource}/search?tax=${tax}&pageIndex=${pageIndex}&pageSize=${pageSize}`)
      return data !== STATUS_FAIL ? data : null
    },
    async detaiCompanyByTax (payload) {
      const data = await $axios.get(`${resource}/getbytax/${payload}`)
      return data !== STATUS_FAIL ? data : null
    }
  }
}
