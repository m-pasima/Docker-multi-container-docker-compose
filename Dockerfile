FROM nginx:1.24

# Remove default config and add your own
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy static site/app content
COPY webapp/ /usr/share/nginx/html/

# Add wait-for-it.sh script to wait for backend readiness
COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

EXPOSE 80

# Wait for backend:3000 before starting Nginx
CMD ["/wait-for-it.sh", "backend:3000", "--", "nginx", "-g", "daemon off;"]


