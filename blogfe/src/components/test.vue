<template>
  <div id="test">
    <div class="ui grid">
      <div class="four wide column">
        test
      </div>
      <el-button @click="logout">退出登录测试</el-button>
      <el-button @click="info">测试能否通过session退出登录</el-button>
      <el-button @click="change">store测试</el-button>
      <el-button @click="show">getter</el-button>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'test',
  data () {
    return {
      form:{
        name: '',
        password: ''
      },
      num: 10
    }
  },
  created(){
  },
  methods:{
    logout(){
      this.$http.get('user/logout').then(res=>{
        console.log(res)
        this.setLoginInfo({
          flag: false,
          name: ''
        })
        this.$message({
          message: res.data.msg,
          type: 'success'
        })
      })
    },
    info(){
      this.$http.get('user/info').then(res=>{
        console.log(res)
      })
    },
    change(){
      this.num+=10
      console.log(this.$store)
      // 不用map语法糖格式
      this.$store.commit('user/setLoginInfo',{
        name: 'ss'+ this.num,
        flag: true
      })
    },
    show(){
      let oo = this.$store.state.user.userName
      console.log(oo)
    },
    ...mapMutations('user',[
      'setLoginInfo'
    ])
  },
}
</script>

<style scoped>
</style>
