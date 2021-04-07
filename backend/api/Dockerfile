FROM node:latest

ENV SOURCE_FOLDER /usr/local/share/app/
WORKDIR $SOURCE_FOLDER

# First, copy package.json and install packages
# This prevents having to run `npm install` again when
# no dependencies have been added
COPY package*.json $SOURCE_FOLDER
RUN npm install

# Then copy data
COPY . $SOURCE_FOLDER

ENTRYPOINT [ "npm", "start" ]
