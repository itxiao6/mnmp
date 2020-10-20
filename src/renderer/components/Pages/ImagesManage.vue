<template>
  <div class="images-manage">
    <el-breadcrumb separator="/" class="content-breadcrumb">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>镜像管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button type="primary" @click="runImage">运行</el-button>
    <section>
      <div id="terminal"></div>
    </section>
  </div>
</template>

<script>
import command from "../../command";
import { Terminal } from 'xterm';
export default {
  name: "ImagesManage",
  data() {
    return {
      tableData: []
    }
  },
  methods: {
    runImage() {
      command.logs((type, data) => {
        var term = new Terminal();
        term.open(document.getElementById('terminal'));
        data = data.replace(/\n/g, "\r\n")
        term.write(data)
        console.log(`${type}:${data}`);
      }, (code) => {
        console.log(`退出状态码:${code}`)
      }, 'nginx');
    }
  }
}
</script>

<style scoped>
.el-breadcrumb {
  line-height: 49px;
}

.images-manage {
  height: 50px;
  padding-left: 22px;
  background: white;
  margin: 22px 0;
  line-height: 48px;
}
.box {
  width: 100%;
  height: 100%;
}
</style>