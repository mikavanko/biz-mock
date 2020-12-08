FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build



FROM nginx:stable-alpine as production-stage

ARG UPSTREAM_SERVER_HOST
ARG SERVER_LOCATION_PROXY_PASS_HOST

EXPOSE 80
RUN echo "$UPSTREAM_SERVER_HOST"
RUN echo "$SERVER_LOCATION_PROXY_PASS_HOST"

COPY config/default.conf /etc/nginx/conf.d/default.conf
RUN sed -i "s|server biz-service|server "$UPSTREAM_SERVER_HOST" |g" /etc/nginx/conf.d/default.conf
RUN sed -i "s|proxy_pass http://biz-service|proxy_pass "$SERVER_LOCATION_PROXY_PASS_HOST" |g" /etc/nginx/conf.d/default.conf
RUN echo "$(cat /etc/nginx/conf.d/default.conf)"

COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
