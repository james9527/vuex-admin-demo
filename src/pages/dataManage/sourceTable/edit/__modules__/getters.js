export default {
  getPageInfo (state, getters, rootState, rootGetters) {
    const {userInfo} = rootState
    return {
      ...state,
      userInfo
    }
  },
  getItemByIndex (state, getters) {
    let currentPage = getters.getPageInfo
    return (key, i) => {
      let list = currentPage[key] || []
      return list[i] || {}
    }
  }
}
