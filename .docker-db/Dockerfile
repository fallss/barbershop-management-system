FROM alpine:latest
RUN apk add --no-cache mariadb mariadb-client bash
RUN mkdir -p /run/mysqld /var/lib/mysql && chown -R mysql:mysql /run/mysqld /var/lib/mysql
COPY run.sh /run.sh
COPY barbershop_db.sql /barbershop_db.sql
RUN chmod +x /run.sh
EXPOSE 3306
CMD ["/run.sh"]
