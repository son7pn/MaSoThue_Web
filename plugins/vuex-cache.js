import createVuexCache from 'vuex-cache'

export default ({ store }) => {
  const options = {
    timeout: 1 * 60 * 60 * 1000 // Equal to 1 hours in milliseconds.
  }

  const setupVuexCache = createVuexCache(options)

  window.onNuxtReady(() => setupVuexCache(store))
}
