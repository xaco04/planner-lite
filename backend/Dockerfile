FROM node:latest

WORKDIR /app

COPY package*.json ./

# Se ejecuta al construir la imagen
RUN npm install 

COPY . .

EXPOSE 3000

# Se ejecuta cuando arrancas el contenedor
CMD ["npm", "start"]