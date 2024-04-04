# classbook
sudo pm2 start node app.js

npx sequelize-cli model:create --name User --attributes name:string,username:string,email:string,password:string

npx sequelize-cli db:migrate:undo:all --env production
npx sequelize-cli db:migrate --env production

scp -r .\dist\nglibro15\* libro@libroclases.cl:/var/www/libroclases.cl/html/

cp -r dist/nglibro15/* /var/www/libroclases.cl/html/

scp -r .\dist\* libro@libroclases.cl:/home/libro/dist/
