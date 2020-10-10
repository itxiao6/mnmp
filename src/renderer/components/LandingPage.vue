<template>
  <div id="">
    <h1>首页</h1>
  </div>
</template>

<script>
  import nginx from "../nginx";

  var child_process = require('child_process');
  export default {
    name: 'landing-page',
    created() {

      let config = new nginx('/Users/apple/Desktop/mnmp/src/renderer/assets/nginx.conf');
      let res = config.setSiteName('测试名称');
      console.log(res);
      // const build = child_process.exec('open /Users/apple/Desktop/mnmp/src/renderer/assets/start.command');
      // console.log(build);

      // var docker = new Docker({socketPath: '/var/run/docker.sock'});
      // promises are supported
      // var auxContainer;

      // docker.createContainer({
      //   Image: 'nginx:stable-alpine',
      //   AttachStdin: false,
      //   AttachStdout: true,
      //   AttachStderr: true,
      //   Tty: true,
      //   Cmd: ['/bin/bash', '-c', 'tail -f /var/log/dmesg'],
      //   OpenStdin: false,
      //   StdinOnce: false
      // }).then(function(container) {
      //   auxContainer = container;
      //   return auxContainer.start();
      // }).then(function(data) {
      //   return auxContainer.resize({
      //     h: process.stdout.rows,
      //     w: process.stdout.columns
      //   });
      // }).then(function(data) {
      //   return auxContainer.stop();
      // }).then(function(data) {
      //   return auxContainer.remove();
      // }).then(function(data) {
      //   console.log('container removed');
      // }).catch(function(err) {
      //   console.log(err);
      // });
      // docker.listImages({},(data,a,b)=>{
      //   console.log(data);
      //   console.log(a);
      //   console.log(b);
      // })
    },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      }
    }
  }
</script>

<style>

</style>