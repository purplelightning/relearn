<template>
  <div id="login">
    {{msg}}
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      msg:''
    }
  },
  created(){
    this.$http.get('/users/info').then(res=>{
      console.log(res.data)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
