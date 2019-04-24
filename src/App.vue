<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {

    }
  }
}
</script>

<style lang="scss">
// 引用bootstrap
// npm install bootstrap sass-loader node-sass --save
@import "~bootstrap/scss/bootstrap";

</style>
