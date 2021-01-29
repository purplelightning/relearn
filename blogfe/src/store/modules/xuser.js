const getSessionItem = (str) => {
  return JSON.parse(sessionStorage.getItem(str))
}

const state = {
  loginFlag: sessionStorage.getItem('loginInfo') ? getSessionItem('loginInfo').loginFlag : false,
  userName: sessionStorage.getItem('loginInfo') ? getSessionItem('loginInfo').userName : '',
}

const actions = {

}

const mutations = {
  setLoginInfo(state, obj){
    state.loginFlag = obj.flag
    state.userName = obj.name
    sessionStorage.setItem('loginInfo', JSON.stringify({
      loginFlag: obj.flag,
      userName: obj.name
      }
    ))
  }
}

export default {
  namespaced: true, //命名模块，防止冲突
  state,
  actions,
  mutations,
}