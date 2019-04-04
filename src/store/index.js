import Vue from 'vue'
import Vuex from 'vuex'
import {
  FindErpInfo
} from '@api/dataManage'

const findErpInfo = new FindErpInfo(true)

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    applicationList: [
      {
        id: 'application1',
        name: 'application1',
      },
      {
        id: 'application2',
        name: 'application2'
      }
    ],
    userInfo: {}
  },
  mutations: {
    returnUserInfo (state) {
      findErpInfo.fetch({}).then(res => {
        // console.log('userInfo::: ' + JSON.stringify(res))
        state.userInfo = {
          erp: res.data.userName,
          name: res.data.realName,
          email: res.data.email,
          headImg: res.data.headImg
        }
        // state.userInfo = res.data
      })
    }
  },
  actions: {
    getUserInfo (context) {
      context.commit('returnUserInfo')
    }
  },
  getters: {
    getApplicationList (state) {
      return state.applicationList || []
    },
    getUserInfo (state) {
      // console.log(state.userInfo)
      return state.userInfo
    }
  }
});

store.dispatch('getUserInfo')

export default store;
