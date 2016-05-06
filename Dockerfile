FROM node:onbuild
MAINTAINER Rémi AUGUSTE <remi.auguste@gmail.com>

ADD ./data /
ADD ./index.js /var/nodejs/
ADD ./node_modules /var/nodejs/node_modules/
RUN ln -s /data /var/nodejs/data
WORKDIR /var/nodejs
CMD node index.js

EXPOSE 8080