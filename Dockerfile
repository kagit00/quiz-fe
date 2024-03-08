FROM node:20 as build
WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install
COPY . .
RUN npm run build


FROM nginx:alpine
COPY --from=build /usr/src/app/dist/ /usr/share/nginx/html

EXPOSE 8081
CMD ["nginx", "-g", "daemon off;"]
