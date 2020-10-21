<template>
  <div class="site-manage">
    <el-breadcrumb separator="/" class="content-breadcrumb">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>站点管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-dialog v-bind:title="siteFormTitle" :visible.sync="siteFormShow">
      <el-form :model="siteForm">
        <el-form-item label="活动名称" :label-width="formLabelWidth">
          <el-input v-model="siteForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="PHP版本" :label-width="formLabelWidth">
          <el-select v-model="siteForm.php" placeholder="请选择站点的PHP版本">
            <el-option label="PHP73" value="php-fpm-73"></el-option>
            <el-option label="PHP74" value="php-fpm-74"></el-option>
            <el-option label="纯静态" value="static"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="域名" :label-width="formLabelWidth">
          <el-select
              v-model="siteForm.domain"
              multiple
              filterable
              allow-create
              default-first-option
              placeholder="请填写域名">
          </el-select>
        </el-form-item>
        <el-form-item label="端口" :label-width="formLabelWidth">
          <el-select
              v-model="siteForm.port"
              multiple
              filterable
              allow-create
              default-first-option
              placeholder="请填写端口">
          </el-select>
        </el-form-item>
        <el-form-item label="默认文档" :label-width="formLabelWidth">
          <el-select
              v-model="siteForm.index"
              multiple
              filterable
              allow-create
              default-first-option
              placeholder="请填写默认文档">
          </el-select>
        </el-form-item>
        <el-form-item label="站点目录名称" :label-width="formLabelWidth">
          <el-input v-model="siteForm.root" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="站点描述" :label-width="formLabelWidth">
          <el-input v-model="siteForm.remarks" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="hideForm()">取 消</el-button>
        <el-button type="primary" @click="createSite()">确 定</el-button>
      </div>
    </el-dialog>

    <el-button type="primary" @click="showForm('创建站点')">创建</el-button>
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
import site from "../../site";
import common from "../../common";

export default {
  name: "SiteManage",
  data() {
    return {
      tableData: [],
      siteForm: {},
      siteFormShow: false, // 是否展示表单
      siteFormTitle: "", // 是否展示表单
      formLabelWidth: '120px', // 标签宽度
    }
  },
  methods: {
    handleClick(row) {
      console.log(row);
    },
    /**
     * 展示表单
     * @param title
     */
    showForm(title) {
      if (title === '创建站点') {
        this.siteForm = {
          name: "",
          php: "",
          domain: [],
          root: '',
          port: [80],
          index: ['index.html', 'index.htm', 'index.php'],
          remarks: ''
        }
      }
      this.siteFormShow = true;
      this.siteFormTitle = title
    },
    /**
     * 隐藏表单
     */
    hideForm() {
      this.siteFormShow = false;
      this.siteFormTitle = ''
    },
    /**
     * 创建站点
     */
    createSite() {
      console.log(this.siteForm);
      /**
       * 创建站点
       */
      site.createSite(
          this.siteForm.name,
          this.siteForm.domain,
          this.siteForm.root,
          this.siteForm.port,
          this.siteForm.php,
          '正常',
          this.siteForm.index,
          this.siteForm.remarks
      );
      this.$notify({
        title: '成功',
        message: '创建成功',
        type: 'success'
      });
    }
  },
  created() {
    // site.createSite('test.com',[
    //         'test.com'
    // ],'/Users/itxiao6/mnmp/site/test.com',[80],'72','正常',['index.php'],'测试站点');
    this.tableData = common.getDB().table('site_lists').value();
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