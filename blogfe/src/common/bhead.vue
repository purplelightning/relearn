<template>
  <div id="bhead">
    fffffffff
    <bnav></bnav>
  </div>
</template>

<script>
import bnav from 'common/bnav'

export default {
  name: 'bhead',
  data () {
    return {
    }
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
}
</style>
