FROM node:latest

ENV SOURCE_FOLDER /usr/local/share/app

# Copy data
COPY . $SOURCE_FOLDER
WORKDIR $SOURCE_FOLDER

RUN npm install

ENTRYPOINT [ "npm", "start" ]
