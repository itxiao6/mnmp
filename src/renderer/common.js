import database from "./database";
const os = require('os')
var fs = require('fs');
/**
 * 公共方法
 */
export default {
    /**
     * docker 路径转换为主机目录
     * @param path
     * @returns {*}
     */
    dockerDirToHost(path){
        // 站点目录
        path = path.replace('!^/usr/share/nginx/html!',`${this.getWorkDir()}/site`);
        // 重写规则
        path = path.replace('!^/etc/nginx/php-fpm!',`${this.getNginxDir()}/php-fpm`);
        // 站点目录
        path = path.replace('!^/etc/nginx/conf.d!',`${this.getNginxDir()}/vhost`);
        // 数据库 配置目录
        path = path.replace('!^/etc/mysql/conf.d!',`${this.getWorkDir()}/mariadb/conf`);
        // 数据库数据目录
        path = path.replace('!^/var/lib/mysql!',`${this.getWorkDir()}/mariadb/data`);
        return path;
    },
    /**
     * 主机目录转换为docker 路径
     * @param path
     * @returns {*}
     */
    hostDirToDocker(path){
        // 站点目录
        path = path.replace(`!^${this.getWorkDir()}/site!`,'/usr/share/nginx/html');
        // 重写规则
        path = path.replace(`!^${this.getNginxDir()}/php-fpm!`,'/etc/nginx/php-fpm');
        // 站点目录
        path = path.replace(`!^${this.getNginxDir()}/vhost!`,'/etc/nginx/conf.d');
        // 数据库 配置目录
        path = path.replace(`!^${this.getWorkDir()}/mariadb/conf!`,'/etc/mysql/conf.d');
        // 数据库数据目录
        path = path.replace(`!^${this.getWorkDir()}/mariadb/data!`,'/var/lib/mysql');
        return path;
    },
    /**
     * 获取程序主目录
     * @returns {string}
     */
    getWorkDir(){
      return `${this.getHomeDirPath()}/mnmp`;
    },
    /**
     * 获取nginx 目录
     * @returns {string}
     */
    getNginxDir(){
        return `${this.getWorkDir()}/nginx`;
    },
    /**
     * 获取Nginx 站点目录
     * @returns {string}
     */
    getNginxVhostDir(){
        return `${this.getNginxDir()}/vhost`;
    },
    /**
     * 获取Nginx 重写规则目录
     * @returns {string}
     */
    getNginxRewriteDir(){
        return `${this.getNginxDir()}/rewrite`;
    },
    /**
     * 获取站点目录
     * @returns {string}
     */
    getSiteDir(){
        return `${this.getWorkDir()}/site`;
    },
    /**
     * 获取用户目录
     * @returns {string}
     */
    getHomeDirPath() {
        return os.homedir();
    },
    /**
     * 获取占位符
     * @returns {string}
     */
    getTabChar(){
        return '    ';
    },
    /**
     * 读取文件
     * @param fileName
     * @returns {Buffer}
     */
    readFile(fileName) {
        return fs.readFileSync(fileName)
    },
    /**
     * 获取本地数据库操作
     * @returns {database}
     */
    getDB(){
        return new database('/Users/itxiao6/mnmp-code/src/renderer/assets/database.json');
    }
};