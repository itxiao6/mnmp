
import common from "./common";
const fs = require('fs');
/**
 * 站点管理
 */
export default{
    /**
     * 读取站点目录
     * @returns {string[]}
     */
    readVhostDir(){
        return fs.readdirSync(common.getNginxVhostDir());
    },
    /**
     * 获取站点列表
     * @returns {[]}
     */
    getLists(){
        return common.getDB().table('site_lists').value();
    },
    /**
     * 创建站点
     * @param name
     * @param host
     * @param dir
     * @param port
     * @param php
     * @param status
     * @param remarks
     */
    createSite(name,host,dir,port,php,status,remarks=name){
        /**
         * 创建Nginx 配置文件
         */
        let config = '';
        /**
         * 创建重写规则
         */
        let rewrite = '';
        /**
         * 写入数据库
         */
        common.getDB().table('site_lists').push({
            name,
            host,
            config,
            dir,
            port,
            php,
            rewrite,
            status,
            remarks
        }).write();
        /**
         * 重启Nginx
         */
    },
}