<template>
  <div id="bnav">
    <div class="ui grid">
      <div class="four wide column"></div>
      <div class="eight wide column">
        <a href="/posts"><h1>{{blog.title}}</h1></a>
        <p>{{blog.des}}</p>
      </div>
    </div>

    <div class="nav-setting">
      <div class="ui buttons">
        <div class="ui floating dropdown button">
          <i class="icon bars"></i>
          <div class="menu">
            <div v-if="user">
              <a class="item" href="/posts?author=<%= user._id %>">个人主页</a>
              <div class="divider"></div>
              <a class="item" href="/posts/create">发表文章</a>
              <a class="item" href="/loginout">登出</a>
            </div>
            <div v-else>
              <a class="item" href="/login">登录</a>
              <a class="item" href="/register">注册</a>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "bnav",
  data() {
    return {
      blog:{
        title:'',
        des:''
      },
      user: ''
    };
  },
};
</script>

<style lang="less" scoped>
#bnav{
  width: 150px;
  border:1px solid red;
}
</style>
