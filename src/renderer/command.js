import common from "./common";

const child_process = require('child_process')
/**
 * 命令操作相关的
 */
export default {
    /**
     * 执行命令
     * @param command
     * @param out_data
     * @param exit
     */
    exec_command(command,out_data,exit) {
        let workerProcess = child_process.exec(command);
        // 打印正常的后台可执行程序输出
        workerProcess.stdout.on('data', function (data) {
            out_data('stdout',data);
        })
        // 打印错误的后台可执行程序输出
        workerProcess.stderr.on('data', function (data) {
            out_data('stderr',data)
        })
        // 退出之后的输出
        workerProcess.on('close', function (code) {
            exit(code);
        })
    },
    /**
     * 创建服务
     * @param out_data
     * @param exit
     * @param service
     */
    create(out_data,exit,service = ''){
        return this.exec_command(`${common.getDockerComposeBaseCommand()} create${service.length>=1?` ${service}`:``}`,out_data,exit);
    },
    /**
     * 停止并删除容器
     * @param out_data
     * @param exit
     * @param service
     */
    down(out_data,exit,service = ''){
        return this.exec_command(`${common.getDockerComposeBaseCommand()} down${service.length>=1?` ${service}`:``}`,out_data,exit)
    },
    /**
     * 创建病启动容器
     * @param out_data
     * @param exit
     * @param service
     */
    up(out_data,exit,service = ''){
        return this.exec_command(`${common.getDockerComposeBaseCommand()} up${service.length>=1?` ${service}`:``} -d`,out_data,exit)
    },
    /**
     * 获取服务日志
     * @param out_data
     * @param exit
     * @param service
     */
    logs(out_data,exit,service = ''){
        return this.exec_command(`${common.getDockerComposeBaseCommand()} logs${service.length>=1?` ${service}`:``}`,out_data,exit)
    }
}