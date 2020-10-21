<template>
  <el-row style="background: #f9f9f9;">
    <header>
      <h1>首页</h1>
      {{ this.type }},{{ this.platform }},{{ this.release }}

      <span>
      已运行:{{ Number(this.uptime / 60 / 60).toFixed(2) }}小时
    </span>
    </header>


    <!--    <div class="status-box">-->
    <!--      <div class="mem">-->
    <!--        <span>内存使用率</span>-->
    <!--        <el-progress type="circle" :percentage="parseInt(((this.freemem/1024/1024)/(this.totalmem/1024/1024))*100)"></el-progress>-->
    <!--        <span>{{parseInt(this.freemem/1024/1024)}}/{{parseInt(this.totalmem/1024/1024)}}</span>-->
    <!--      </div>-->
    <!--    </div>-->
    <div class="service_lists">
      <span>
        <el-button type="success" @click="startService()">启动全部</el-button>
        <el-button type="danger" @click="stopService()">停止全部</el-button>
      </span>
      <ul>
        <li v-for="(item) in serviceLists">
          <span>{{ item.nameText }}</span>
          <span>名称:{{ item.name }}</span>
          <span>状态:{{ item.status }}</span>
          <img width="20" height="20" v-bind:src="item.icon" />
          <div class="action-lists">
            <el-button type="success" v-if="item.status != 'Up'" @click="startService(item.name)">启动</el-button>
            <el-button type="danger" v-if="item.status != 'Exit'" @click="stopService(item.name)">停止</el-button>
          </div>
        </li>
      </ul>
    </div>
  </el-row>
</template>

<script>

import command from "../command";

const os = require('os')
const FileSync = require('lowdb/adapters/FileSync')

export default {
  name: 'landing-page',
  data() {
    return {
      cpu_info: {}, // CPU 信息
      network: {}, // 网卡信息
      freemem: 0,// 剩余内存
      totalmem: 0,// 内存总量
      loadavg: 0,// 负载情况
      uptime: 0,// 启动时间
      release: 0,// 操作系统
      arch: 0,// CPU架构
      platform: 0,// 平台
      type: 0,// 操作系统类型
      hostname: 0,// 主机名
      endianness: 0,// CPU的字节序
      tmpdir: 0,// 操作系统中默认的用于存放临时文件的目录
      serviceLists: [
        {
          name: 'nginx',
          status: 'Exit',
          nameText: "Nginx服务",
          icon:require('./../assets/images/ico-nginx.png')
        },
        {
          name: 'php-fpm-73',
          status: 'Exit',
          nameText: "PHP 7.3",
          icon:require('./../assets/images/ico-php.png')
        },
        {
          name: 'php-fpm-74',
          status: 'Exit',
          nameText: "PHP 7.4",
          icon:require('./../assets/images/ico-php.png')
        },
        {
          name: 'mariadb',
          status: 'Exit',
          nameText: "Mariadb DB",
          icon:require('./../assets/images/ico-mysql.png')
        },
        {
          name: 'redis',
          status: 'Exit',
          nameText: "Redis DB",
          icon:require('./../assets/images/ico-redis.png')
        },
      ]
    };
  },
  created() {
    this.updateSystemInfoInfo();
    this.updateServiceLists();
    setInterval(this.updateSystemInfoInfo, 1000);
    setInterval(this.updateServiceLists, 1000);
  },
  methods: {
    /**
     * 启动服务
     */
    startService(service) {
      command.up((type, data) => {
        // console.log(data);
      }, (code) => {
        if (code !== 0) {
          this.$notify({
            title: '警告',
            message: '启动失败',
            type: 'warning'
          });
          return
        }
        this.$notify({
          title: '成功',
          message: '启动成功',
          type: 'success'
        });
      }, service);
    },
    /**
     * 停止服务
     */
    stopService(service) {
      command.stop((type, data) => {
        // console.log(data);
      }, (code) => {
        if (code !== 0) {
          this.$notify({
            title: '警告',
            message: '停止失败',
            type: 'warning'
          });
          return
        }
        this.$notify({
          title: '成功',
          message: '停止成功',
          type: 'success'
        });
      }, service);
    },
    /**
     * 更新服务信息
     */
    updateServiceLists() {
      this.serviceLists.forEach((item, index) => {
        command.getContainerStatus(item.name).then(status => {
          this.serviceLists[index].status = status;
        });
      })
    },
    /**
     * 更新系统信息
     */
    updateSystemInfoInfo() {
      this.cpu_info.cpus = os.cpus();
      this.network = os.networkInterfaces();
      this.freemem = os.freemem();
      this.totalmem = os.totalmem();
      this.loadavg = os.loadavg();
      this.uptime = os.uptime();
      this.release = os.release();
      this.arch = os.arch();
      this.platform = os.platform();
      this.type = os.type();
      this.hostname = os.hostname();
      this.endianness = os.endianness();
      this.tmpdir = os.tmpdir();
    }
  }
}
</script>

<style scoped>
.service_lists > ul {
  margin-top: 20px;
  list-style-type: none;
  display: flex;
  flex-direction: row;
}
.service_lists > ul>li{
  display: flex;
  width: 200px;
  flex-direction: column;
  border: 1px solid #ccc;
  padding: 10px;
}

.mem {
  display: flex;
  flex-direction: column;
  height: 160px;
  width: 230px;
  align-items: center;
}

.mem > span {
  margin: 8px 0;
  text-align: center;
}

.mem > div {
  width: 120px;
  height: 120px;
}
</style>