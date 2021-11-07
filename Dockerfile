FROM --platform=linux/amd64 node:17-alpine

WORKDIR /app
COPY . .
RUN yarn install
EXPOSE 3000
CMD ["yarn", "start"]