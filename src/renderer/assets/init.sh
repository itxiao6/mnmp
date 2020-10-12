

# nginx rewrite
if [ ! -d "~/mnmp/nginx/rewrite" ]; then
  mkdir -p ~/mnmp/nginx/rewrite
fi

# nginx rewrite
if [ ! -d "~/mnmp/nginx/vhost" ]; then
  mkdir -p ~/mnmp/nginx/vhost
fi

# nginx php-fpm
if [ ! -d "~/mnmp/nginx/php-fpm" ]; then
  mkdir -p ~/mnmp/nginx/php-fpm
  # Copy Default PHP-FPM Config
  cp -r ./nginx/php-fpm/* ~/mnmp/nginx/php-fpm/
fi

# site dir
if [ ! -d "~/mnmp/site" ]; then
  mkdir -p ~/mnmp/site
fi


# Docker nginx
if [ ! -d "~/mnmp/docker" ]; then
  mkdir -p ~/mnmp/docker
  cp -r ./docker/* ~/mnmp/docker/
fi

# Docker command
if [ ! -d "~/mnmp/command" ]; then
  mkdir -p ~/mnmp/command
  cp ./command/* ~/mnmp/command/
fi

# MySql data
if [ ! -d "~/mnmp/mysql/data" ]; then
  mkdir -p ~/mnmp/mysql/data
fi
# MySql logs
if [ ! -d "~/mnmp/mysql/logs" ]; then
  mkdir -p ~/mnmp/mysql/logs
fi
# MySql conf
if [ ! -d "~/mnmp/mysql/conf" ]; then
  mkdir -p ~/mnmp/mysql/conf
fi
