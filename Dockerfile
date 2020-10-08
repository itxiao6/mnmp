# Base Image
FROM php:7.4-fpm-alpine3.12

# Label Description
LABEL maintainer="php-fpm <itxiao6@qq.com>" version="1.0" license="MIT"

# --build-arg timezone=Asia/Shanghai
ARG timezone

ENV TIMEZONE=${timezone:-"Asia/Shanghai"}

# apt-get update and install Software
RUN apk update && apk add -y \
    build-essential \
    libmagickcore-dev \
    libmagickwand-dev \
    imagemagick \
    libfreetype6-dev \
    libjpeg62-turbo-dev \
    libmcrypt-dev \
    libpng-dev \
    wget \
    librabbitmq-dev \
    libzip-dev

# install php ext
RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) gd iconv  pdo_mysql \
    && pecl install redis \
    && docker-php-ext-enable redis \
    && pecl install swoole \
    && docker-php-ext-enable swoole \
    && pecl install imagick \
    && docker-php-ext-enable imagick \
    && pecl install mcrypt \
    && docker-php-ext-enable mcrypt \
    && pecl install amqp \
    && docker-php-ext-enable amqp \
    && docker-php-ext-install bcmath \
    && docker-php-ext-enable bcmath \
    && docker-php-ext-install sockets \
    && docker-php-ext-enable sockets \
    && docker-php-ext-install zip \
    && docker-php-ext-enable zip

# EXPOSE Port
EXPOSE 9000