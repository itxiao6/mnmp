<template>
  <div class="databses-manage">
    <el-breadcrumb separator="/" class="content-breadcrumb">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据库管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table
        :data="tableData"
        border
        style="width: 100%">
      <el-table-column
          fixed
          prop="name"
          label="网站名"
          width="150">
      </el-table-column>
      <el-table-column
          fixed
          prop="config"
          label="配置文件"
          width="150">
      </el-table-column>
      <el-table-column
          prop="dir"
          label="目录"
          width="150">
      </el-table-column>
      <el-table-column
          prop="port"
          label="端口"
          width="150">
      </el-table-column>
      <el-table-column
          prop="php"
          label="PHP版本">
      </el-table-column>
      <el-table-column
          prop="rewrite"
          label="重写规则">
      </el-table-column>
      <el-table-column
          prop="status"
          label="状态"
          width="150">
      </el-table-column>
      <el-table-column
          prop="remarks"
          label="备注"
          width="150">
      </el-table-column>
      <el-table-column
          fixed="right"
          label="操作"
          width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import vhost from "../../vhost";
import MySql from "../../mysql";
export default {
  name: "SiteManage",
  data() {
    return {
      tableData: [],
      MySqlConnection:null,
    };
  },
  methods: {
    handleClick(row) {
      console.log(row);
    }
  },
  created() {
    this.tableData = vhost.getLists();
    this.MySqlConnection =  new MySql();
    /**
     * 获取数据库列表
     */
    // this.MySqlConnection.getDatabaseLists().then(lists=>{
    //   // console.log(lists);
    //   /**
    //    * 创建数据库
    //    */
    //   // this.MySqlConnection.createDatabase('test').then(res=>{
    //   //   console.log(res);
    //   // });
    //
    // });
    /**
     * 创建账户
     */
    this.MySqlConnection.createAccount('test','123456','test','%').then(res=>{
      console.log(res);
    })

  }
}
</script>

<style scoped>
.content-breadcrumb {
  height: 50px;
  padding-left: 22px;
  background: white;
  margin: 22px 0;
  line-height: 48px;
}
</style>