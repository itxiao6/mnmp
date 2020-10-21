
import common from "./common";
import command from "./command";
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
                configContent += `${common.getTabChar()}listen ${item};\n`;
            })
        }else if(typeof port =='string' || typeof port=='bigint'){
            configContent += `${common.getTabChar()}listen ${port};\n`;
        }else{
            configContent += `${common.getTabChar()}listen 80;\n`;
        }
        // 域名
        if(typeof host =='object'){
            let sever_name = '';
            host.forEach(item=>{
                sever_name += `${item} `
            })
            configContent += `${common.getTabChar()}server_name ${sever_name};\n`;
        }else if(typeof host =='string' || typeof host=='bigint'){
            configContent += `${common.getTabChar()}server_name ${host};\n`;
        }else{
            configContent += `${common.getTabChar()}server_name localhost;\n`;
        }
        // 默认文档
        if(typeof index =='object'){
            let default_document = '';
            index.forEach(item=>{
                default_document += `${item} `
            })
            configContent += `${common.getTabChar()}index ${default_document};\n`;
        }else if(typeof index =='string' || typeof index=='bigint'){
            configContent += `${common.getTabChar()}index ${index};\n`;
        }else{
            configContent += `${common.getTabChar()}index localhost;\n`;
        }
        // 站点目录
        let rootDir = `${common.getSiteDir()}/${name}`
        // 目录检测
        if(!fs.existsSync(rootDir)){
            fs.mkdirSync(rootDir);
        }
        // 文档目录
        configContent += `${common.getTabChar()}root ${common.hostDirToDocker(rootDir)};\n`;
        // PHP-FPM
        if(php !== 'static'){
            configContent += `${common.getTabChar()}include php-fpm/${php}.conf;\n`;
        }
        /**
         * 重写规则文件名
         */
        let rewriteFile = `${common.getNginxRewriteDir()}/${name}.conf`;
        // 重写规则
        fs.writeFileSync(rewriteFile,'');
        // 重写规则
        configContent += `${common.getTabChar()}include ${common.hostDirToDocker(rewriteFile)};\n`;
        // 安全过滤
        configContent += `${common.getTabChar()}location ~ ^/(\.user.ini|\.htaccess|\.git|\.svn|\.project|LICENSE|README.md) {\n${common.getTabChar()}${common.getTabChar()}return 404;\n${common.getTabChar()}}\n`
        // 结束标识
        configContent += `}`;
        /**
         * 写入Nginx 站点配置
         */
        fs.writeFileSync(configFile,configContent);
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
        command.restart((type,data)=>{
            console.log(data);
        },(code)=>{
            if(code!==0){
                console.log('添加站点失败')
            }
        },'nginx')
    },
}