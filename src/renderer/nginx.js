import it from "element-ui/src/locale/lang/it";
import common from "./common";

const fs = require('fs')
/**
 * Nginx配置的相关操作
 */
export default class {
    /**
     * 构造方法
     * @param fileName
     */
    constructor(fileName) {
        this.fileName = fileName;
        /**
         * 更新Config 内容
         */
        this.updateConfigText();
    }
    /**
     * 更新Config 内容
     */
    updateConfigText(){
        /**
         * 读取文件流
         * @type {Buffer}
         */
        this.filePip = fs.readFileSync(this.fileName);
        /**
         * 获取文本内容
         * @type {string}
         */
        this.content = this.filePip.toString();
    }
    /**
     * 获取站点名称
     * @returns {*}
     */
    getSiteName(){
        let lists = this.content.match(/#\s+begin\s+站点名称\s.+set\s\$site_name\s+"(.*?)";\s+#\s+end\s+站点名称/i);
        if(lists && lists.length>=2){
            return lists[1].replace(/(^\s*)|(\s*$)/g,"");
        }
        return '未知';
    }
    /**
     * 修改名称
     * @param name
     */
    setSiteName(name){
        console.log(this.content.replace(
            '(#\s+begin\s+站点名称\s+.*?\s+#\send\s站点名称)',
            `# begin 站点名称\n${common.getTabChar()}$site_name "${name}";`
        ));
        return this.filePip.write(
            this.content.replace(
                '(#\s+begin\s+站点名称\s+.*?\s+#\send\s站点名称)',
                `# begin 站点名称\n${common.getTabChar()}$site_name "${name}";`
                )
        );
    }
    /**
     * 获取主目录
     * @returns {string|*}
     */
    getRootDir()
    {
        let lists = this.content.match(/root\s*?(.*?);/i);
        if(lists && lists.length>=2){
            return lists[1].replace(/(^\s*)|(\s*$)/g,"");
        }
        return '未知';
    }
    /**
     * 设置主目录
     */
    setRootDir()
    {

    }
    /**
     * 获取端口
     * @returns {*}
     */
    getPort()
    {
        let lists = this.content.match(/#\s+begin\s+端口\s.+listen\s+(.*?);\s+#\s+end\s+端口/i);
        if(lists && lists.length>=2){
            return lists[1].replace(/(^\s*)|(\s*$)/g,"");
        }
        return '未知';
    }

    /**
     * 获取PHP版本
     * @returns {*}
     */
    getPhpVersion()
    {
        let lists = this.content.match(/#\s+begin\s+加载PHP\s.+include\s+(.*?);\s+#\s+end\s+加载PHP/i);
        if(lists && lists.length>=2){
            return lists[1].replace(/(^\s*)|(\s*$)/g,"");
        }
        return '未知';
    }
    /**
     * 获取重写规则
     * @returns {*}
     */
    getRewrite()
    {
        let lists = this.content.match(/#\s+begin\s+重写规则\s.+include\s+(.*?);\s+#\s+end\s+重写规则/i);
        if(lists && lists.length>=2){
            return lists[1].replace(/(^\s*)|(\s*$)/g,"");
        }
        return '未知';
    }
    /**
     * 获取站点备注
     * @returns {*}
     */
    getRemarks()
    {
        let lists = this.content.match(/#\s+begin\s+站点备注\s.+set\s\$site_name\s+"(.*?)";\s+#\s+end\s+站点备注/i);
        if(lists && lists.length>=2){
            return lists[1].replace(/(^\s*)|(\s*$)/g,"");
        }
        return '未知';
    }

}