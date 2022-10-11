notes
- use nodejs 16.17 lts or higher
- make sure you hava a running and working instance of mysql

Getting started
- clone file
- dublicate the .env.example and rename it to .env
- in the .env file change the username and password from the database url to your username and password of your mysql instance
- in the .env file change the localhost to ip if its needed for docker, other method of connecting to a running instance of mysql
- in root of folder run in terminal the following commands:
	- npm i
	- npm run migrate // you will get a message just fillin init and press enter.
	- npm run compile
	- npm run seed
	- npm run start
- you can ctrl click the [server] Running on http://localhost:3000/ to open in browser


