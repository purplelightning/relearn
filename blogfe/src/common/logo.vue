<template>
<!-- 原始input方法 -->
  <div id="logo">
    <el-tooltip class="item" effect="dark" :content="userName" placement="bottom">
      <img class="avatar" :src="imgSrc"/>
    </el-tooltip>
    <label>
      <input class="changeImg" type="file" @change="upImg"/>
    </label>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'logo',
  data () {
    return {
      imgSrc: '',
    }
  },
  created(){
    if(this.loginFlag){
      this.getAvatar()
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
  }
}
</script>

<style lang="less" scoped>
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
</style>
