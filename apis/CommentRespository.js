import { STATUS_FAIL } from '@/store/common/constants'
const resource = '/v1/comment'

export default ($axios) => {
  return {
    async createComment (params) {
      const data = await $axios.post(`${resource}/create`, params)
      return data !== STATUS_FAIL ? data : null
    },
    async showListComment ({ articleId, pageIndex, pageSize }) {
      const data = await $axios.get(`${resource}/getListByArticleId?articleId=${articleId}&pageIndex=${pageIndex}&pageSize=${pageSize}`)
      return data !== STATUS_FAIL ? data : null
    },
    async showRateArticles (id) {
      const data = await $axios.get(`${resource}/rate-statistic?articleId=${id}`)
      return data !== STATUS_FAIL ? data : null
    }
  }
}
