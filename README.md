# classbook

# crear tabla (modelo y migración inicial)
npx sequelize-cli model:create --name User --attributes name:string,username:string,email:string,password:string
# migración
npx sequelize-cli db:migrate:undo:all --env production
npx sequelize-cli db:migrate --env production

************ DEPLOY *************
*** frontend ***
1.- chequear archivos environmets (ambos identicos exceptp production)
2.- git status 
3.- git commit
4.- git push 
5.- git checkout main
6.- git merge branch
7.- git push
8.- git chechout branch
9.- cd nglibro15
10.- ng build --configuration production --aot
11.- scp -r dist/nglibro15/* /var/www/libroclases.cl/html/
*** server ***
1.- cd .\backend\nodserver
2.- npm run build
3.- scp -r .\dist\* libro@libroclases.cl:/home/libro/classbook-main/backend/nodserver/dist
4.- npx sequelize-cli db:mibrate:undo:all --env production
5.- npx sequelize-cli db:migrate --env production
*** digitalocean ***
(lista no implica orden, ejecución a discreción)
sudo docker-compose up --build -d
sudo docker logs nodapp
sudo docker-compose build nodapp
sudo docker exec -it dbpostgres bash




