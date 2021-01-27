<template>
  <div>
    <div class="ui grid">
      <div class="four wide column"></div>
        <el-form class="ui form" label-width="80px">
          <el-form-item class="field required" label="用户名">
            <el-input placeholder="用户名" type="text" v-model="form.name" :inline="true"></el-input>
          </el-form-item>
          <el-form-item class="field required" label="密码">
            <el-input placeholder="密码" type="password" v-model="form.password"></el-input>
          </el-form-item>
          <el-form-item class="field required" label="性别">
            <el-select class="ui compact selection dropdown" v-model="form.gender">
              <el-option value="m" label="男">男</el-option>
              <el-option value="f" label="女">女</el-option>
              <el-option value="x" label="保密">保密</el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item class="field required" label="头像">
            <input type="file" accept=".jpg, .jpeg, .png" @change="dAvatar"></input>
          </el-form-item> -->
          <el-form-item class="field required" label="个人简介">
            <el-input type="textarea" v-model="form.bio" rows="5"></el-input>
          </el-form-item>
          <el-button @click="submit" class="ui button fluid">注册</el-button>
        </el-form>
    </div>
  </div>
</template>
<script>

export default {
  name: "register",
  data() {
    return {
      form: {
        name: "",
        password: "",
        avatar: "",
        gender: "",
        bio: "",
      },
    };
  },
  methods: {
    submit() {
      console.log(this.form);
      this.$http.post('/user/register', this.form 
      ).then(res=>{
        console.log(res.data)
        if(res.data.code === 200){
          console.log('hhh')
          this.$router.push('/')
        }else{
          this.$msg('error',res.data.err)
        }
      })
    },
  },
};
</script>
<style lang="less" scoped>
.form {
  width: 600px;
}
</style>