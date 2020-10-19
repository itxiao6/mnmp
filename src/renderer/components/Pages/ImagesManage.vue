<template>
  <div class="images-manage">
    <el-breadcrumb separator="/" class="content-breadcrumb">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>镜像管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table
        :data="tableData"
        border
        style="width: 100%">
      <el-table-column
          fixed
          prop="repository"
          label="镜像"
          width="150">
      </el-table-column>
      <el-table-column
          prop="labels"
          label="镜像标签"
          width="150">
      </el-table-column>
      <el-table-column
          prop="image_id"
          label="镜像id"
          width="150">
      </el-table-column>
      <el-table-column
          prop="created_at"
          label="创建时间"
          width="150">
      </el-table-column>
      <el-table-column
          prop="size"
          label="大小">
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
import docker from "../../docker";
import common from "../../common";

export default {
  name: "ImagesManage",
  data() {
    return {
      tableData: [],
    }
  },
  created() {
    docker.getImages().then(res => {
      let images_lists = [];
      res.forEach(item => {
        images_lists[images_lists.length] = {
          repository: item.data.RepoTags,
          image_id: item.data.Id,
          labels: JSON.stringify(item.data.Labels),
          size: ((item.data.Size/1024)/1024).toFixed(2) + "M",
          created_at: common.timeToDateTime(item.data.Created)
        }
        console.log(item.data);
      })
      this.tableData = images_lists;
    });
  },
  methods: {
    handleClick(row) {
      console.log(row)
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
</style>