# DOC
lsof -i tcp:7755


# Build Setup

``` bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate

# Blog post


# deploy tutorial

https://github.com/RightBrainTechBD/nuxt-template-for-shared-hosting

https://jasonwatmore.com/post/2019/08/21/vue-js-simple-pagination-example

# .htaccess

RewriteEngine on
DirectoryIndex home
RewriteRule "(.*.(jpg|gif|png|svg|js|css|woff2))$" "http://127.0.0.1:3000/$1" [P,NC]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ http://127.0.0.1:3000/$1 [P,L]


# 404 Fix on production
cp .htaccess dist

# Check size folder
sudo du -sh /var/www/source/dev/DEMO_THEME/cp-diligo/

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).



THEME:  http://claricovega.theme13demo.emiprotechnologies.com/
