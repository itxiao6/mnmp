<template>
  <div class="site-manage">
    <el-breadcrumb separator="/" class="content-breadcrumb">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>站点管理</el-breadcrumb-item>
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
          prop="status"
          label="状态"
          width="150">
      </el-table-column>
      <el-table-column
          prop="dir"
          label="目录"
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
export default {
  name: "SiteManage",
  methods: {
    handleClick(row) {
      console.log(row);
    }
  },
  data() {
    return {
      tableData: [{
        name: 'www.baidu.com',
        status: '正常',
        dir:'/Users/apple/www.baidu.com',
        remarks:"测试站点"
      }]
    };
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