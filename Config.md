# Nginx 篇


sudo docker run \
-v /Users/apple/mnmp/nginx/conf.d:/etc/nginx/conf.d \
-v /Users/apple/mnmp/site:/usr/share/nginx/html \
-d \
--name nginx \
--network mnmp \
-p 80:80 \
nginx:stable-alpine



# PHP-FPM 篇

docker run \
-v /Users/apple/mnmp/site:/usr/share/nginx/html \
-d \
--name php-fpm \
--network mnmp \
php:7.4-fpm-alpine



# 网络篇

docker network ls

# 172.10.0.0 ~ 172.10.255.254
docker network create  --subnet=172.10.20.30/16 mnmp

docker network rm mnmp