FROM node:latest
RUN mkdir -p /opt/app 
WORKDIR /opt/app
#COPY ./myapp/package.json  ./
#WORKDIR /opt/app

COPY ./ ./
RUN npm install
ENV PORT 8888
EXPOSE   8888
CMD [ "npm", "run", "dev" ]
