<template>
  <el-col :span="12" class="navigation">
    <el-menu
        default-active="2"
        class=""
        @open="handleOpen"
        @close="handleClose"
        background-color="#3c444d"
        text-color="#fff"
        active-text-color="#ffd04b">
      <el-menu-item index="1" @click="jump_page('/')">
        <i class="el-icon-setting"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="2" @click="jump_page('/site-manage')">
        <i class="el-icon-setting"></i>
        <span slot="title">站点管理</span>
      </el-menu-item>
      <el-menu-item index="3" @click="jump_page('/databses-manage')">
        <i class="el-icon-setting"></i>
        <span slot="title">数据库管理</span>
      </el-menu-item>
      <el-menu-item index="4" @click="jump_page('/container-manage')">
        <i class="el-icon-setting"></i>
        <span slot="title">容器管理</span>
      </el-menu-item>
      <el-menu-item index="5" @click="jump_page('/images-manage')">
        <i class="el-icon-setting"></i>
        <span slot="title">镜像管理</span>
      </el-menu-item>
    </el-menu>
  </el-col>
</template>

<script>
export default {
  name: "Left",
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    /**
     * 跳转
     */
    jump_page(path) {
      this.$router.push(path);
    }
  }
}
</script>

<style scoped>
.navigation {
  width: 180px;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  background-color: #3c444d;
}

.navigation > ul {
  width: 180px;
}

.el-submenu .el-menu-item {
  min-width: auto;
}
</style>