
FROM node:18.17.0

# Create app directory, this is in our container/in our image
WORKDIR /thelibrahouse/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
COPY prisma ./prisma/

# COPY ENV variable
COPY .env ./

COPY tsconfig.json ./


RUN yarn
RUN npx prisma generate
RUN npx prisma db push

# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

RUN yarn build

EXPOSE 8080
CMD [ "yarn", "start" ]

