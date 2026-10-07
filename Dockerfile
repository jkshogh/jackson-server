FROM node
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
CMD ["npx", "prisma generate"]
CMD ["node","src/server2.js"]