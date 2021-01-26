<template>
  <div id="test">
    <div class="ui grid">
      <div class="four wide column">
        test
      </div>
      <el-button @click="logout">退出登录测试</el-button>
      <el-button @click="info">测试能否通过session退出登录</el-button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'test',
  data () {
    return {
      form:{
        name: '',
        password: ''
      }
    }
  },
  created(){
    
  },
  methods:{
    logout(){
      this.$http.get('user/logout').then(res=>{
        console.log(res)
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
    }
  },
}
</script>

<style scoped>
</style>
