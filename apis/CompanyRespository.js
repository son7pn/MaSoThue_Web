import { STATUS_FAIL } from '@/store/common/constants'
const resource = '/v1/article'

export default ($axios) => {
  return {
    async showCompanyByTax ({ keyword, pageIndex, pageSize, type }) {
      const data = await $axios.get(`${resource}/search?keyword=${keyword}&pageIndex=${pageIndex}&pageSize=${pageSize}&type=${type}`)
      return data !== STATUS_FAIL ? data : null
    },
    async detaiCompanyByTax (payload) {
      const data = await $axios.get(`${resource}/getbytax/${payload}`)
      return data !== STATUS_FAIL ? data : null
    }
  }
}
