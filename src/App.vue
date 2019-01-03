<template>
  <div id="app">
    <tag></tag>
    <router-view></router-view>
    <side></side>
  </div>
</template>

<script>
import side from './components/side'
import tag from './components/tag'
export default {
  name: 'app',
  components: {
    side,
    tag
  }
}
</script>

<style>
  body,html{
    margin: 0;
    height:100%;
    text-align: center;
  }
  #app{
    height:100%;
    width:1000px;
    margin: 0 auto;
    background:#E7E7E7;
    position: relative;
  }
  *{
    box-sizing: border-box;
    margin: 0;
    padding:0;
  }
</style>
