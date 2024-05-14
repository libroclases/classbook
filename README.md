# classbook

# crear tabla (modelo y migración inicial)
npx sequelize-cli model:create --name User --attributes name:string,username:string,email:string,password:string
# migración
npx sequelize-cli db:migrate:undo:all --env production
npx sequelize-cli db:migrate --env production

************ DEPLOY *************
*** frontend ***
1.- chequear archivos environmets (ambos identicos excepto production)
2.- git status 
3.- git commit
4.- git push 
5.- git checkout main
6.- git merge branch
7.- git push
8.- git chechout branch
9.- cd nglibro15
10.- ng build --configuration production --aot
11.- Limpiar dist/nglibro15 local
12.- Limpiar /var/www/libroclases.cl/html remoto
13.- scp -r dist/nglibro15/* libro@libroclases.cl:/var/www/libroclases.cl/html
*** server ***
1.- cd .\backend\nodserver
2.- Verificar todas las rutas aseguradas 
3.- npm run build
4.- scp -r .\dist\* libro@libroclases.cl:/home/libro/classbook-main/backend/nodserver/dist
5.- Abrir puerto 5432 en LibroMuralla
6.- npx sequelize-cli db:migrate:undo:all --env production
7.- npx sequelize-cli db:migrate --env production
8.- scp .\csv\csv-no-id\* libro@libroclases.cl:/home/libro/classbook-main/backend/nodserver/csv/csv-no-id
9.- sudo docker exec -it dbpostgres bash 
10.- bash copy_csv_prod.sh
11.- Cerrar puerto 5432 en LibroMuralla
12.- opcional -> http://libroclases.cl:8080 (dejar cerrado puerto 8080)
*** digitalocean ***
(lista no implica orden, ejecución a discreción)
sudo docker-compose up --build -d
sudo docker system prune -a
sudo docker-compose up -d --remove-orphans
sudo docker logs nodapp
sudo docker-compose build nodapp
sudo docker exec -it dbpostgres bash




