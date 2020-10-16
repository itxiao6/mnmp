
<template>
  <div id="">
    <h1>首页</h1>
  </div>
</template>

<script>
//引入 LowDB
import database from "../database";

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
  export default {
    name: 'landing-page',
    async created() {
      /**
       * 获取数据库实例
       */
      let db = new database('/Users/itxiao6/mnmp-code/src/renderer/assets/database.json');

      /**
       * 查询数据库列表
       */
      db.table('db_lists').value();

      /**
       * 插入数据
       */
      db.table('db_lists').push({ name: 'ZombiEden ZE 1#', ip: 'csgoze.cn:27050'}).write()

      /**
       * 为了更好的性能, 如果你只读而不写数据, 请使用 .value() 代替 .write()
       */
      let a = db.table('db_lists').value()

      /**
       * 条件查询
       */
      let b = db.table('db_lists').find({name:'ZombiEden ZE 1#'}).value()

      /**
       * 更新数据
       */
      db.table('db_lists').find({ name: 'ZombiEden ZE 1#' }).assign({ ip: 'csgoze.cn:27051'}).write()

      /**
       * 删除数据
       */
      db.table('db_lists').remove({ name: 'ZombiEden ZE 1#' }).write()

      console.log(a);
      console.log(b);

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