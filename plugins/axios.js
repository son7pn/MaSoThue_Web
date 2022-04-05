import { APP_CONFIG } from '@/utils/env'
import { STATUS_FAIL } from '@/store/common/constants'
// import { COOKIE_AUTH } from '@/store/auth/constants'
// import AOS from 'aos'
// import 'aos/dist/aos.css' // You can also use <link> for styles

export default function ({ app, $axios, redirect, route }) {
  // const token = app.$cookies.get(COOKIE_AUTH)
  // const token = JWT.getAccessToken()
  // app.AOS = new AOS.init({ disable: "phone" }); // eslint-disable-line new-cap
  $axios.setBaseURL(APP_CONFIG.apiUrl)
  // $axios.setHeader({
  //   Authorization: `Bearer ${token}`,
  //   Accept: 'application/json',
  //   Cache: 'no-cache',
  //   common: {
  //     'X-Requested-With': 'XMLHttpRequest'
  //   }
  // })
  // $axios.setToken(token, 'Bearer')
  $axios.setHeader('Cache', 'no-cache')
  /**
  * onRequest(config)
  * onResponse(response)
  * onError(err)
  * onRequestError(err)
  * onResponseError(err)
  **/
  // $axios.onResponse((res) => {
  //   if (res && res.data && res.data.errors && res.data.status === 'failed') {
  //     const message = res.data.errors[0].message || 'Đã có lỗi xảy ra'
  //     app.$toast.error(message)
  //     if (res.data.errors[0].field === 'Acctivated') {
  //       return res.data.errors[0].field
  //     } else {
  //       return 'fail'
  //     }
  //   } else if (res && res.data && res.data.status === 'success') {
  //     return res.data.data
  //   }
  // })
  $axios.onResponse((res) => {
    if (res?.data && res.data.status === STATUS_FAIL) {
    // if (res && res.data && res.data.errors && res.data.status === 'failed') {
      const message = res.data.errors[0].message || 'Đã có lỗi xảy ra'
      app.$toast.error(message)
      // if (res.data.errors[0].field === 'Acctivated') {
      //   return res.data.errors[0].field
      // } else if (res.data.errors[0].field === 'Class' || res.data.errors[0].field === 'ClassType') {
      //   return res.data
      // } else {
      return STATUS_FAIL
      // }
    } else if (res && res.data) {
      return res.data.data
    }
  })

  $axios.onError((error) => {
    const code = error.response && error.response.status ? parseInt(error.response.status) : 0
    if (code === 401) {
      // app.$cookies.removeAll()
      redirect('/login')
      // redirect(`/login?redirect=${route.fullPath}`)
    }
  })
}
