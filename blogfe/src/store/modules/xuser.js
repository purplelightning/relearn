const state = {
  loginFlag: false,
  userName: '',

}

const actions = {

}

const mutations = {
  setLoginInfo(state, obj){
    state.loginFlag = obj.flag
    state.userName = obj.name
  }
}

export default {
  namespaced: true, //命名模块，防止冲突
  state,
  actions,
  mutations,
}