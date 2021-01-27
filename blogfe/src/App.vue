<template>
  <div id="app">
    <home></home>
  </div>
</template>

<script>
import home from 'components/home'

export default {
  name: 'App',
  components:{
    home
  }
}
</script>

<style lang="less">
@import './assets/common.css';

#app {
  margin-top: 60px;
}
</style>
