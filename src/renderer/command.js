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
    exec_command(command, out_data, exit) {
        let workerProcess = child_process.exec(command);
        // 打印正常的后台可执行程序输出
        workerProcess.stdout.on('data', function (data) {
            out_data('stdout', data);
        })
        // 打印错误的后台可执行程序输出
        workerProcess.stderr.on('data', function (data) {
            out_data('stderr', data)
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
    create(out_data, exit, service = '') {
        return this.exec_command(`${common.getDockerComposeBaseCommand()} create${service.length >= 1 ? ` ${service}` : ``}`, out_data, exit);
    },
    /**
     * 创建服务
     * @param out_data
     * @param exit
     * @param service
     */
    build(out_data, exit, service = '') {
        return this.exec_command(`${common.getDockerComposeBaseCommand()} build${service.length >= 1 ? ` ${service}` : ``}`, out_data, exit);
    },
    /**
     * 停止并删除容器
     * @param out_data
     * @param exit
     * @param service
     */
    down(out_data, exit, service = '') {
        return this.exec_command(`${common.getDockerComposeBaseCommand()} down${service.length >= 1 ? ` ${service}` : ``}`, out_data, exit)
    },
    /**
     * 创建并启动容器
     * @param out_data
     * @param exit
     * @param service
     */
    up(out_data, exit, service = '') {
        return this.exec_command(`${common.getDockerComposeBaseCommand()} up -d${service.length >= 1 ? ` ${service}` : ``}`, out_data, exit)
    },
    /**
     * 获取服务日志
     * @param out_data
     * @param exit
     * @param service
     */
    logs(out_data, exit, service = '') {
        return this.exec_command(`${common.getDockerComposeBaseCommand()} logs${service.length >= 1 ? ` ${service}` : ``}`, out_data, exit)
    },
    /**
     * 查看服务
     * @param out_data
     * @param exit
     * @param service
     */
    ps(out_data, exit, service = '') {
        return this.exec_command(`${common.getDockerComposeBaseCommand()} ps${service.length >= 1 ? ` ${service}` : ``}`, out_data, exit)
    },
    /**
     * 获取容器状态
     * @param service
     * @returns {Promise<unknown>}
     */
    getContainerStatus(service) {
        return new Promise((resolve, reject) => {
            this.ps((type, data) => {
                if (data.indexOf('Exit')!==-1) {
                    resolve('Exit');
                } else if (data.indexOf('Up')!==-1) {
                    resolve('Up');
                } else if (data.indexOf('Paused')!==-1) {
                    resolve('Paused');
                }
            }, (code) => {
                // console.log(`code:${code}`);
            }, service)
        });
    },
    /**
     * 暂停服务
     * @param out_data
     * @param exit
     * @param service
     */
    pause(out_data, exit, service = '') {
        return this.exec_command(`${common.getDockerComposeBaseCommand()} pause${service.length >= 1 ? ` ${service}` : ``}`, out_data, exit)
    },
    /**
     * 回复暂停服务
     * @param out_data
     * @param exit
     * @param service
     */
    unpause(out_data, exit, service = '') {
        return this.exec_command(`${common.getDockerComposeBaseCommand()} unpause${service.length >= 1 ? ` ${service}` : ``}`, out_data, exit)
    },
    /**
     * 重启服务
     * @param out_data
     * @param exit
     * @param service
     */
    restart(out_data, exit, service = '') {
        return this.exec_command(`${common.getDockerComposeBaseCommand()} restart${service.length >= 1 ? ` ${service}` : ``}`, out_data, exit)
    },
    /**
     * 删除服务
     * @param out_data
     * @param exit
     * @param service
     */
    rm(out_data, exit, service = '') {
        return this.exec_command(`${common.getDockerComposeBaseCommand()} rm${service.length >= 1 ? ` ${service}` : ``}`, out_data, exit)
    },
    /**
     * 启动服务
     * @param out_data
     * @param exit
     * @param service
     */
    start(out_data, exit, service = '') {
        return this.exec_command(`${common.getDockerComposeBaseCommand()} start${service.length >= 1 ? ` ${service}` : ``}`, out_data, exit)
    },
    /**
     * 停止服务
     * @param out_data
     * @param exit
     * @param service
     */
    stop(out_data, exit, service = '') {
        return this.exec_command(`${common.getDockerComposeBaseCommand()} stop${service.length >= 1 ? ` ${service}` : ``}`, out_data, exit)
    }
}