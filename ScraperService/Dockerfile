FROM node:18

WORKDIR /user/src/app

COPY . .

RUN npm install
RUN npm install -g typescript

RUN npx prisma generate
RUN npx prisma db push


RUN npm run build
RUN npm run seed
CMD npm run start