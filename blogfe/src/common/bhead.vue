<template>
  <div id="bhead">
    <div v-show="!loginFlag">
      <router-link class="tab" to="/register">注册</router-link>
      <router-link class="tab" to="/login">登录</router-link>
    </div>
    <div v-show="loginFlag">
      <div class="tab">已登录：{{userName}}</div>
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
    }
  },
  computed:{
    ...mapState('user', [
      'loginFlag','userName'
    ])
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
}
</style>
