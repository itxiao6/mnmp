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
      return this.getHomeDirPath()+'/mnmp';
    },
    /**
     * 获取用户目录
     * @returns {string}
     */
    getHomeDirPath() {
        return os.homedir();
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