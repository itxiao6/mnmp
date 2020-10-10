
import common from "./common";
import nginx from "./nginx";
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
        var site_lists = [];
        var that = this;
        this.readVhostDir().forEach(function (item) {
            /**
             * 过滤文件
             */
            if(item.split('.').slice(-1)[0] !=='conf'){
                return ;
            }
            /**
             * 读取Nginx
             */
            var content = new nginx(`${common.getNginxVhostDir()}/${item}`);
            /**
             * 拼接数据
             */
            site_lists[site_lists.length] = {
                config:`${common.getNginxVhostDir()}/${item}`,
                name:content.getSiteName(),
                dir:content.getRootDir(),
                port:content.getPort(),
                status:'正常',
                remarks:content.getRemarks(),
                php:that.replacePHPVersion(content.getPhpVersion()),
                rewrite:content.getRewrite(),
            };
        })
        return site_lists;
    },
    /**
     * 替换展示的PHP版本
     * @param php_fpm
     * @returns {string}
     */
    replacePHPVersion(php_fpm){
        if(typeof php_fpm != 'string' || php_fpm.length<=0){
            return "未知";
        }
        return php_fpm.replace('php-fpm/','').replace('fpm-','').replace('.conf','');
    }
}