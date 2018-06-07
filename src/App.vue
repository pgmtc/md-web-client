<template>
  <div id="app">
    <m-desktop />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import MDesktop from './components/MDesktop'

export default {
  name: 'App',
  components: {
    HelloWorld,
    MDesktop
  }
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
  width: 100%;
}
</style>
