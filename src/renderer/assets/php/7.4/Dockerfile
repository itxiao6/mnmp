# Base Image
FROM php:7.4-fpm-alpine

# Label Description
LABEL maintainer="php-fpm <itxiao6@qq.com>" version="1.0" license="MIT"

# --build-arg timezone=Asia/Shanghai
ARG timezone

ENV TIMEZONE=${timezone:-"Asia/Shanghai"}

# 修改镜像
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories
# 代理
#RUN export https_proxy=http://192.168.100.11:7890 http_proxy=http://192.168.100.11:7890 all_proxy=socks5://192.168.100.11:7891

# Install System Package
RUN apk update
# libzip-dev
RUN apk add freetype-dev
# libjpeg-turbo-dev
RUN apk add libjpeg-turbo-dev
# libpng-dev
RUN apk add libpng-dev
# libzip-dev
RUN apk add libzip-dev
# imagemagick
RUN apk add imagemagick
# libmcrypt-dev
RUN apk add libmcrypt-dev
# libpng-dev
RUN apk add libpng-dev
# libzip-dev
RUN apk add libzip-dev
# apk add autoconf
RUN apk add autoconf
# apk add gcc
RUN apk add gcc
# apk add g++
RUN apk add g++
# apk add make
RUN apk add make
# apk add imagemagick-dev
RUN apk add imagemagick-dev
# apk add rabbitmq-c-dev
RUN apk add rabbitmq-c-dev


# 配置PHP
#RUN docker-php-ext-configure gd --with-freetype --with-jpeg

# Install gd
RUN docker-php-ext-install -j$(nproc) gd && docker-php-ext-enable gd
# Install iconv
RUN docker-php-ext-install -j$(nproc) iconv && docker-php-ext-enable iconv
# Install pdo_mysql
RUN docker-php-ext-install pdo_mysql && docker-php-ext-enable pdo_mysql
# Install Redis
RUN pecl install redis && docker-php-ext-enable redis
# Install Swoole
#RUN pecl install swoole && docker-php-ext-enable swoole
# Install imagick
RUN pecl install imagick && docker-php-ext-enable imagick
# Install mcrypt
RUN pecl install mcrypt && docker-php-ext-enable mcrypt
# Install amqp
RUN pecl install amqp && docker-php-ext-enable amqp
# Install bcmath
RUN docker-php-ext-install bcmath && docker-php-ext-enable bcmath
# Install sockets
RUN docker-php-ext-install sockets && docker-php-ext-enable sockets
# Install zip
RUN docker-php-ext-install zip && docker-php-ext-enable zip

# EXPOSE Port
EXPOSE 9000