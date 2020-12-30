# Software-Technology-2020-team22-FastCharger

This is a project for Software-Technology cource at ECE NTUA univerisity

# The application create a database on a sql server 
- We run it on a phpmyadmin on a localhost
- For now the only 2 things that work are :
    - localhost:5000/createdb
    - localhost:5000/createUserTable

# To start the application clone the repo to your machine
- Create a settingsdbconnection.json like :
    {
    "host": "yourhost",
    "user": "yourdatabasename",
    "password": "yourdatabasecharger",
    "database" : "yourdatabasename"
    }
# OR not do the next step if the database can creat without errors
# When you create the database with yourhost:5000/createdb you have to rm "database" from json and then add it again with the created database
# install the modules :
- npm install

# run the app with 2 states prod dev . First run without nodemon and the second with that. To start the back end :
- prod : npm run prod
- dev : npm run dev

