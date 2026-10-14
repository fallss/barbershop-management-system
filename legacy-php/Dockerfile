# Use official PHP Apache image
FROM php:8.2-apache

# Install PDO MySQL extension
RUN docker-php-ext-install pdo pdo_mysql

# Enable Apache mod_rewrite
RUN a2enmod rewrite

# Copy entrypoint script
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Copy project files
COPY . /var/www/html/

# Exclude local dev artifacts
RUN rm -rf /var/www/html/.docker-db /var/www/html/.ext /var/www/html/docker-entrypoint.sh

# Set file permissions for Apache
RUN chown -R www-data:www-data /var/www/html

# Default port
ENV PORT=80
EXPOSE 80

ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]
