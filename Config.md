# Nginx 篇


sudo docker run \
-v /Users/apple/mamp/nginx/conf.d:/etc/nginx/conf.d \
-v /Users/apple/mamp/site:/usr/share/nginx/html \
-d \
--name nginx \
--network mamp \
-p 80:80 \
nginx:stable-alpine



# PHP-FPM 篇

docker run \
-v /Users/apple/mamp/site:/usr/share/nginx/html \
-d \
--name php-fpm \
--network mamp \
php:7.4-fpm-alpine



# 网络篇

docker network ls

# 172.10.0.0 ~ 172.10.255.254
docker network create  --subnet=172.10.20.30/16 mamp

docker network rm mamp