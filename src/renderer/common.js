const os = require('os')
var fs = require('fs');
/**
 * 公共方法
 */
export default {
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
    }
};