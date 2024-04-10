#seleccion de imagen
 FROM node:20-alpine

#espacio de trabajo
WORKDIR /app
#copia el archivo package 
COPY package*.json ./
#ejecuta las instalaciones de dependencias
RUN npm install
#copuamos los demas archivos del proyecto
COPY . ./
#ejecutamos el proyecto
CMD ["npm", "start"]