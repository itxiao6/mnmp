
<template>
  <div id="">
    <h1>首页</h1>
  </div>
</template>

<script>
  import IndexedDB from 'indexeddb-promise'
  export default {
    name: 'landing-page',
    async created() {
      const db = new IndexedDB('mamp');
      if(!db.isSupported()){
        throw new Error('本环境不支持indexeddb');
      }
      // 数据库表
      db.hasStore('database_lists').then(res=>{
        if(!res){
          // 创建表
          db.addStore('database_lists').then(res=>{
            console.log(res);
          })
        }else{
          db.set('database_lists',{id:1,name:"test",account:"test",password:"123456"});
        }
      })
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