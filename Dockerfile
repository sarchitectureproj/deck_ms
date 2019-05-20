FROM node:latest
RUN mkdir -p /opt/app 
WORKDIR /opt/app
#COPY ./myapp/package.json  ./
#WORKDIR /opt/app

COPY ./ ./
RUN npm install
ENV PORT 4005
EXPOSE   4005
CMD [ "npm", "run", "dev" ]
