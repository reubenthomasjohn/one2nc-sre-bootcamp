# FROM nginx:latest
# RUN rm /etc/nginx/conf.d/default.conf
# COPY nginx.conf /etc/nginx/conf.d/default.conf

FROM nginx
COPY nginx.conf /etc/nginx/nginx.conf