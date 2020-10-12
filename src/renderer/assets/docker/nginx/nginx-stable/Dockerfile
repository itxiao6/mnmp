# Base Image
FROM nginx:stable-alpine

# Label Description
LABEL maintainer="php-fpm <itxiao6@qq.com>" version="1.0" license="MIT"

# 修改镜像
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories

# 自定义操作