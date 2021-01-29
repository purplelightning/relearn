<template>
  <div id="bhead">
    <div v-show="!loginFlag">
      <router-link class="tab" to="/register">注册</router-link>
      <router-link class="tab" to="/login">登录</router-link>
    </div>
    <div v-show="loginFlag">
      <el-tooltip class="item" effect="dark" :content="userName" placement="bottom">
        <img class="avatar" :src="imgSrc"/>
      </el-tooltip>
      <label>
        <input class="changeImg" type="file" @change="upImg"/>
      </label>
    </div>
    <div>

    </div>
  </div>
</template>

<script>
import bnav from 'common/bnav'
import { mapState } from 'vuex'

export default {
  name: 'bhead',
  data () {
    return {
      imgSrc: '',

    }
  },
  methods:{
    getAvatar(){
      this.$http.get('/user/avatar').then(res=>{
        this.imgSrc= 'http://localhost:2080' + res.data.logoUrl
      })
    },
    upImg(e){
      let dt = e.target.files[0]
      let data= new FormData()
      data.append('avatar', dt)
      this.$http.post('user/uploadAvatar', data).then(res=>{
        if(res.data.code === 200){
          this.getAvatar()
        }
      })
    }
  },
  watch:{
    loginFlag(){
      if(this.loginFlag){
        this.getAvatar()
      }
    }
  },
  computed:{
    ...mapState('user', [
      'loginFlag','userName'
    ]),
  },
  components:{
    bnav
  }
}
</script>

<style lang="less" scoped>
#bhead{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background: #444;
  text-align: center;
  color: #fff;
  .tab{
    float: right;
    margin-top: 10px;
    padding: 0 10px;
    height: 36px;
    line-height: 36px;
    margin-right: 15px;
    color: #fff;
    text-decoration: none;
    border:1px solid #ccc;
    border-radius: 5px;
  }
  .item{
    cursor: pointer;
  }
  .avatar{
    margin-top: 5px;
    margin-right: 10px;
    border: 1px solid #ccc;
    border-radius: 50%;
  }
  .changeImg{
    position: absolute;
    right: 0;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    opacity: 0; // 隐藏元素
    cursor: pointer;
    z-index: 100;
  }
}
</style>
