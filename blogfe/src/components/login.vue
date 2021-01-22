<template>
  <div id="login">
    <div class="ui grid">
      <div class="four wide column"></div>
        <el-form class="ui form" label-width="80px">
          <el-form-item class="field required" label="用户名">
            <el-input placeholder="用户名" type="text" v-model="form.name" :inline="true"></el-input>
          </el-form-item>
          <el-form-item class="field required" label="密码">
            <el-input placeholder="密码" type="password" v-model="form.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="login" class="ui button fluid">登录</el-button>
          </el-form-item>
        </el-form>
    </div>
  </div>
</template>

<script>
import bhead from "common/bhead";

export default {
  name: 'login',
  data () {
    return {
      form:{
        name: '',
        password: ''
      }
    }
  },
  created(){
    this.$http.get('/user/info').then(res=>{
    })
    
  },
  methods:{
    login(){
      this.$http.post('/user/login', this.form).then(res => {
        console.log(res.data)
        if(res.data.code === 200){
          this.$router.push('/')
        }
      })
    }
  },
}
</script>

<style scoped>
.form {
  width: 400px;
}
</style>
