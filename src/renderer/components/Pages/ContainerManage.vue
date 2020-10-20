<template>
  <div class="container-manage">
    <el-breadcrumb separator="/" class="content-breadcrumb">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>容器管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table
        :data="tableData"
        border
        style="width: 100%">
      <el-table-column
          fixed
          prop="Names"
          label="名称"
          width="150">
      </el-table-column>
      <el-table-column
          prop="Image"
          label="启动命令"
          width="150">
      </el-table-column>
      <el-table-column
          prop="Command"
          label="启动命令"
          width="150">
      </el-table-column>
      <el-table-column
          prop="State"
          label="状态"
          width="150">
      </el-table-column>
      <el-table-column
          prop="Status"
          label="Status"
          width="150">
      </el-table-column>
      <el-table-column
          prop="Mounts"
          label="Mounts"
          width="150">
      </el-table-column>
      <el-table-column
          prop="created_at"
          label="创建时间"
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
// import docker from "../../docker";
import common from "../../common";

export default {
  name: "ContainerManage",
  data(){
    return {
      tableData:[]
    };
  },
  created() {
    // docker.getContainer().then(res=>{
    //   let lists = [];
    //   res.forEach(item=>{
    //     lists.push({
    //       Command:item.data.Command,
    //       HostConfig:JSON.stringify(item.data.HostConfig),
    //       Names:JSON.stringify(item.data.Names),
    //       Status:item.data.Status,
    //       Image:item.data.Image,
    //       Mounts:JSON.stringify(item.data.Mounts),
    //       State:item.data.State,
    //       created_at:common.timeToDateTime(item.data.Created)
    //     });
    //     console.log(item.data)
    //   })
    //   this.tableData = lists;
    // })
  },
  methods:{
    handleClick(row){
      console.log(row);
      // row.
    }
  }
}
</script>

<style scoped>
.el-breadcrumb{
  line-height: 49px;
}
.container-manage {
  height: 50px;
  padding-left: 22px;
  background: white;
  margin: 22px 0;
  line-height: 48px;
}
</style>