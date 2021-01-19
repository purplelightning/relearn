<template>
  <div id="notification">
    <div class="ui grid">
      <div class="four wide column"></div>
      <div class="eight wide column">

      <div v-if="success">
        <div class="ui success message">
          <p>{{success}}</p>
        </div>
      </div>
      <div v-if="error">
        <div class="ui error message">
          <p>{{error}}</p>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'foot',
  data () {
    return {
    }
  },
}
</script>

<style lang="less" scoped>
</style>
