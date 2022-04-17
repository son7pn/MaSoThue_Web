/* eslint-disable import/no-named-as-default-member */
import Vuex from 'vuex'
import createCache from 'vuex-cache'
import common from './common'
import auth from './auth'

const createStore = () => {
  return new Vuex.Store({
    modules: {
      common,
      auth
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
