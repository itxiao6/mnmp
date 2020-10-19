const {Docker} = require('node-docker-api');

const docker = new Docker({socketPath: '/var/run/docker.sock'});

export default {
    async runDocker(
        image,
        version = 'latest',
        name = image + version,
        volumes = [],
        networks = [],
        ports = [],
        environment = []
    ) {
        return await docker.container.create({
            name: name,
            Image: `${image}:${version}`,
            Env: environment,
            ExposedPorts: ports,
            Volumes: volumes,
        });
    },
    getImages(){
        return docker.image.list();
    },
    getContainer() {
        return docker.container.list();
    },
    reloadContainer() {

    }
}