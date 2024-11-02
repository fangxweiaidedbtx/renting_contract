<template>
  <meauHorizontal></meauHorizontal>
  <div class="container">
    <router-view></router-view>
  </div>
</template>

<script>
import meauHorizontal from './components/menuHorizontal.vue'
export default {
  name: 'App',
  components: {
    meauHorizontal
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;
}

</style>
