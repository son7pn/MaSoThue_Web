import Vuex from 'vuex'
import createCache from 'vuex-cache'
import common from './common'

const createStore = () => {
  return new Vuex.Store({
    modules: {
      common
    },
    plugins: [
      createCache()
    ],
    state: ({
    }),
    actions: {
    },
    mutations: {
    },
    getters: {
    }
  })
}

export default createStore
