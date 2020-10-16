const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
/**
 * 本地数据管理
 */
export default class database {
    adapter;
    db;

    constructor(fileName) {
        this.adapter = new FileSync(fileName)
        this.db = low(this.adapter)
        this.db.defaults({
            db_lists: [],// 数据库
            site_lists: [],// 站点
        }).write();
    }

    /**
     * 表名
     * @param tableName
     * @returns {*}
     */
    table(tableName) {
        return this.db.get(tableName);
    }

}