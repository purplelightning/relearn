<template>
  <div id="home">
    <bhead></bhead>
    <div class="ui grid">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import bhead from '../common/bhead'

export default {
  name: 'home',
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
  components:{
    bhead
  }
}
</script>

<style scoped>
#home{
  border:1px solid red;
}
</style>
