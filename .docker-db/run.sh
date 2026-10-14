#!/bin/bash
set -e

# Ensure networking is enabled
sed -i 's/skip-networking/#skip-networking/' /etc/my.cnf.d/mariadb-server.cnf

if [ ! -d "/var/lib/mysql/mysql" ]; then
    echo "Initializing MariaDB database..."
    mariadb-install-db --user=mysql --datadir=/var/lib/mysql
fi

echo "Starting MariaDB temporarily for initialization..."
mariadbd --user=mysql --datadir=/var/lib/mysql --skip-networking --socket=/run/mysqld/mysqld.sock &
pid="$!"

for i in $(seq 30 -1 0); do
    if mariadb-admin ping --socket=/run/mysqld/mysqld.sock 2>/dev/null; then
        break
    fi
    sleep 1
done

echo "Setting up database and permissions..."
mariadb -u root --socket=/run/mysqld/mysqld.sock -e "CREATE DATABASE IF NOT EXISTS barbershop; CREATE USER IF NOT EXISTS 'root'@'%' IDENTIFIED BY ''; GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' WITH GRANT OPTION; FLUSH PRIVILEGES;"
if [ -f /barbershop_db.sql ]; then
    echo "Importing schema..."
    mariadb -u root --socket=/run/mysqld/mysqld.sock barbershop < /barbershop_db.sql || true
fi

mariadb-admin --socket=/run/mysqld/mysqld.sock shutdown
wait "$pid" 2>/dev/null || true

echo "Starting MariaDB server..."
exec mariadbd --user=mysql --datadir=/var/lib/mysql --bind-address=0.0.0.0 --port=3306 --sql-mode="NO_ENGINE_SUBSTITUTION"
