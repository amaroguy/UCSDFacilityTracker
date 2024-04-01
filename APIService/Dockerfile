FROM node:18

WORKDIR /user/src/app

COPY . .

RUN npm install
RUN npm install -g typescript

RUN npx prisma generate
RUN npm run build

EXPOSE 3090

CMD npm run start