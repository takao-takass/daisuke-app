FROM node:22-slim

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# k8s deployment.yamlで設定するので要らない
# ARG REACT_APP_MESSAGE_STREAM_URL
# ENV REACT_APP_MESSAGE_STREAM_URL=$REACT_APP_MESSAGE_STREAM_URL
ENV REACT_APP_MESSAGE_STREAM_URL=http://localhost:8080

RUN npm run build

RUN npm install -g serve

CMD ["serve", "-s", "build"]

EXPOSE 3000