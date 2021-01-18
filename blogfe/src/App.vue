<template>
  <div id="app">
    <img src="./assets/logo.png">
    <div class="big">lll</div>
    <router-view/>
    
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less">
#app {
  margin-top: 60px;
  .big{
    color: red;
  }
}
</style>
