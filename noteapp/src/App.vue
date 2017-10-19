<template>
  <div id="app">
    <App-Header></App-Header>
    <router-view/>
  </div>
</template>

<script>
  import AppHeader from './components/Header';

  export default {
    components: {
      AppHeader,
    },
    name: 'app',

  };
</script>

<style src="./assets/css/animate.css"></style>
<style src="./assets/css/bootstrap.css"></style>
<style lang="scss">
  @import "assets/css/styles";


</style>
