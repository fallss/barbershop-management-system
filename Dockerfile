# Use official PHP Apache image
FROM php:8.2-apache

# Install PDO MySQL extension
RUN docker-php-ext-install pdo pdo_mysql

# Enable Apache mod_rewrite
RUN a2enmod rewrite

# Copy project files
COPY . /var/www/html/

# Exclude docker and local dev artifacts
RUN rm -rf /var/www/html/.docker-db /var/www/html/.ext

# Set file permissions for Apache
RUN chown -R www-data:www-data /var/www/html

# Support dynamic port binding (Railway, Render, Heroku use $PORT)
ENV PORT=80
EXPOSE 80

# Configure Apache port dynamically on startup
CMD ["sh", "-c", "sed -i \"s/80/${PORT:-80}/g\" /etc/apache2/ports.conf /etc/apache2/sites-available/000-default.conf && apache2-foreground"]
