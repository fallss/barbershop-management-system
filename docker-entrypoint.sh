#!/bin/bash
set -e

PORT="${PORT:-80}"

# Remove any stale apache PID file
rm -f /var/run/apache2/apache2.pid

# Set ServerName to suppress warning
if ! grep -q "ServerName localhost" /etc/apache2/apache2.conf; then
    echo "ServerName localhost" >> /etc/apache2/apache2.conf
fi

# Freshly configure port for Apache
cat <<EOF > /etc/apache2/ports.conf
# Managed by entrypoint
Listen ${PORT}
EOF

# Freshly configure VirtualHost
cat <<EOF > /etc/apache2/sites-available/000-default.conf
<VirtualHost *:${PORT}>
    ServerAdmin webmaster@localhost
    DocumentRoot /var/www/html
    <Directory /var/www/html>
        Options -Indexes +FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
    ErrorLog \${APACHE_LOG_DIR}/error.log
    CustomLog \${APACHE_LOG_DIR}/access.log combined
</VirtualHost>
EOF

echo "Starting Apache on port ${PORT}..."
exec apache2-foreground
