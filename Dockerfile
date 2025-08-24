# Frontend container: Nginx serving ./webapp
FROM nginx:1.24
RUN apt-get update && apt-get install -y wget netcat-traditional && rm -rf /var/lib/apt/lists/*
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY webapp/ /usr/share/nginx/html/
COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh
# 🔧 Normalize CRLF → LF and make executable
RUN sed -i 's/\r$//' /wait-for-it.sh && chmod +x /wait-for-it.sh

EXPOSE 80

CMD ["/wait-for-it.sh", "backend:3000", "nginx", "-g", "daemon off;"]





