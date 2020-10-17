
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
     * @param index
     * @param remarks
     */
    createSite(name,host,dir,port,php,status,index=['index.html','index.htm','index.php'],remarks=name){
        /**
         * Nginx 配置文件名
         */
        let configFile = `${common.getNginxVhostDir()}/${name}.conf`;
        let configContent = `server{\n`;
        // 端口
        if(typeof port =='object'){
            port.forEach(item=>{
                configContent += `${common.getTabChar()}listen ${item};`;
            })
        }else if(typeof port =='string' || typeof port=='bigint'){
            configContent += `${common.getTabChar()}listen ${port};`;
        }else{
            configContent += `${common.getTabChar()}listen 80;`;
        }
        // 域名
        if(typeof host =='object'){
            let sever_name = '';
            host.forEach(item=>{
                sever_name += `${item} `
            })
            configContent += `${common.getTabChar()}server_name ${sever_name};`;
        }else if(typeof host =='string' || typeof host=='bigint'){
            configContent += `${common.getTabChar()}server_name ${host};`;
        }else{
            configContent += `${common.getTabChar()}server_name localhost;`;
        }
        // 默认文档
        if(typeof index =='object'){
            let default_document = '';
            index.forEach(item=>{
                default_document += `${item} `
            })
            configContent += `${common.getTabChar()}index ${default_document};`;
        }else if(typeof index =='string' || typeof index=='bigint'){
            configContent += `${common.getTabChar()}index ${index};`;
        }else{
            configContent += `${common.getTabChar()}index localhost;`;
        }
        // 站点目录
        let rootDir = `${common.getSiteDir()}/${name}`
        // 文档目录
        configContent += `${common.getTabChar()}root ${rootDir};`;

        /**
         * 重写规则文件名
         */
        let rewriteFile = `${common.getNginxRewriteDir()}/${name}.conf`;
        // 重写规则
        configContent += `include ${rewriteFile};`;

        configContent += `}`;
        /**
         * 写入数据库
         */
        common.getDB().table('site_lists').push({
            name,
            host,
            config:configFile, // Nginx 站点配置文件
            dir,
            root:rootDir, // 站点主目录
            port,
            php,
            rewrite:rewriteFile, // Nginx 重写规则文件
            status,
            remarks
        }).write();
        /**
         * 重启Nginx
         */
    },
}