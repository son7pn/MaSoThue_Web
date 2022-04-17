import { STATUS_FAIL } from '@/store/common/constants'
const resource = '/v1/comment'

export default ($axios) => {
  return {
    async createComment (params) {
      const data = await $axios.post(`${resource}/create`, params)
      return data !== STATUS_FAIL ? data : null
    }
  }
}
