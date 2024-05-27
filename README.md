# classbook

# crear tabla (modelo y migración inicial)
npx sequelize-cli model:create --name User --attributes name:string,username:string,email:string,password:string
# migración
npx sequelize-cli db:migrate:undo:all --env production
npx sequelize-cli db:migrate --env production

************ DEPLOY *************
*** frontend ***
1.- chequear archivos environmets (ambos identicos excepto production y direcciones host)
2.- Borrar mensajes por consola
3.- git status 
4.- git commit
5.- git push 
6.- git checkout main
7.- git merge branch
8.- git push
9.- git chechout branch
10.- cd nglibro15
11.- Limpiar dist/nglibro15 local
12.- Limpiar /var/www/libroclases.cl/html remoto
13.- ng build --configuration production --aot
14.- scp -r dist/nglibro15/* libro@libroclases.cl:/var/www/libroclases.cl/html
*** server ***
1.- cd .\backend\nodserver
2.- del -r dist
3.- Verificar todas las rutas aseguradas en routes/index
4.- npm run build y verificar sitio
5.- copy server/config/config.js to dist/server
6.- En digitalocean borrar app.js y directorio server
7.- En digitalocean se mantienen los archivos Dockerfile , package.json y directorio letsencrypt
8.- scp -r .\dist\* libro@libroclases.cl:/home/libro/classbook-main/backend/nodserver/dist
9.- Abrir puerto 5432 en LibroMuralla
10.- npx sequelize-cli db:migrate:undo:all --env production
11.- npx sequelize-cli db:migrate --env production
12.- bash copy-no-ids.sh
13.- scp .\csv\csv-no-id\* libro@libroclases.cl:/home/libro/classbook-main/backend/nodserver/csv/csv-no-id
14.- sudo docker exec -it dbpostgres bash 
15.- bash copy_csv_prod.sh
16.- Cerrar puerto 5432 en LibroMuralla
17.- opcional -> http://libroclases.cl:8080 (dejar cerrado puerto 8080)
*** digitalocean ***
(lista no implica orden, ejecución a discreción)
sudo docker-compose up --build -d
sudo docker system prune -a
sudo docker-compose up -d --remove-orphans
sudo docker logs nodapp
sudo docker-compose build nodapp
sudo docker exec -it dbpostgres bash



