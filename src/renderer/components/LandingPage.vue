<template>
  <div id="">
    <h1>首页</h1>
  </div>
</template>

<script>
  export default {
    name: 'landing-page',
    created() {
      var Docker = require('dockerode');
      var docker = new Docker({socketPath: '/var/run/docker.sock'});
      // promises are supported
      var auxContainer;

      docker.createContainer({
        Image: 'nginx:stable-alpine',
        AttachStdin: false,
        AttachStdout: true,
        AttachStderr: true,
        Tty: true,
        Cmd: ['/bin/bash', '-c', 'tail -f /var/log/dmesg'],
        OpenStdin: false,
        StdinOnce: false
      }).then(function(container) {
        auxContainer = container;
        return auxContainer.start();
      }).then(function(data) {
        return auxContainer.resize({
          h: process.stdout.rows,
          w: process.stdout.columns
        });
      }).then(function(data) {
        return auxContainer.stop();
      }).then(function(data) {
        return auxContainer.remove();
      }).then(function(data) {
        console.log('container removed');
      }).catch(function(err) {
        console.log(err);
      });
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