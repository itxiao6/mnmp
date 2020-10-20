<template>
  <div id="app">
    <Left></Left>
    <div class="content-box">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Left from "./components/Common/Left";
  export default {
    name: 'mnmp',
    components:{
      Left
    }
  }
</script>

<style>
.xterm-viewport{
  display: none !important;
}
body,html,ul,li,div{
  margin: 0;
  padding: 0;
  border: none;
}
.content-box{
  margin-left: 180px;
  height: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: 0;
}
body{
  background: #f2f2f2;
  height: 100%;
}
  #app{
    height: 100%;
  }
</style>
