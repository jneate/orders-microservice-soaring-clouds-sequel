FROM node:4-onbuild
#FROM node:argon

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

# Bundle app source
COPY . /usr/src/app

# Install Curl so registration script can be run
RUN apt-get update && apt-get install -y curl
COPY ./scripts/register.sh /usr/src/app

EXPOSE 8080
CMD [ "npm", "start" ]
