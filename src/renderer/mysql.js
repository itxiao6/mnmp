var mysql = require('mysql');

/**
 * MySql 管理
 */
export default class {
    /**
     * 数据库列表
     * @type Array
     */
    database_lists;
    /**
     * 数据库连接
     * @type {Connection}
     */
    connection;
    /**
     * 创建MySql 实例
     * @param props
     */
    constructor(props) {
        this.connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            multipleStatements: true,//允许执行多条查询语句
        });
        this.connection.connect();//连接
    }
    /**
     * 管理连接
     */
    close() {
        this.connection.end();
    }
    /**
     * 获取数据库列表
     * @returns {Promise<unknown>}
     */
    getDatabaseLists() {
        return new Promise((resolve, reject) => {
            this.database_lists = this.query('SHOW DATABASES').then(rows => {
                let lists = [];
                rows.forEach(item => {
                    if (item.Database !== 'information_schema' && item.Database !== 'mysql' && item.Database !== 'performance_schema') {
                        lists[lists.length] = item.Database;
                    }
                });
                this.database_lists = lists;
                resolve(lists);
            });
        })
    }
    /**
     * 创建数据库
     * @param database
     * @returns {Promise<unknown>}
     */
    createDatabase(database) {
        if (database.length <= 0) {
            throw new Error('数据库名不能为空');
        }
        if (this.database_lists.some((name) => {
            return name === database;
        })) {
            throw new Error('数据库已经存在');
        }
        return this.query(`CREATE DATABASE ${database}`);
    }

    /**
     * 创建账户
     * @param account
     * @param password
     * @param database
     * @param host
     * @returns {Promise<unknown>}
     */
    createAccount(account, password, database, host = '%') {
        if (account.length <= 0) {
            throw new Error('用户名不能为空');
        }
        if (password.length <= 0) {
            throw new Error('密码不能为空');
        }
        if (database.length <= 0) {
            throw new Error('数据库名不能为空');
        }
        if (host.length <= 0) {
            throw new Error('主机名不能为空');
        }
        return this.query(`use mysql;grant select,insert,update,delete on ${database}.* to ${account}@"${host}" identified by "${password}";flush privileges;`);
    }

    /**
     * 查询
     * @param sql
     * @returns {Promise<unknown>}
     */
    query(sql) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, (err, rows, fields) => {
                if (err) {
                    return reject(err);
                }
                resolve(rows);
            });
        });
    }
}