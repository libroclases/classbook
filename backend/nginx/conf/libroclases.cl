server {
        listen 80;
        listen [::]:80;

        root /usr/share/nginx/libroclases.cl/html;
        index index.html index.htm index.nginx-debian.html;

        # server_name libroclases.cl www.libroclases.cl;
        server_name localhost

        location / {
                try_files $uri $uri/ =404;
        }
}