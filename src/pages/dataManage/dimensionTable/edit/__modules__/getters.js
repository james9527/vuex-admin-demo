export default {
  getPageInfo (state, getters, rootState, rootGetters) {
    const {userInfo} = rootState
    return {
      ...state,
      userInfo
    }
  }
}
