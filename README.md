# Ocdb 

This is a tool to handle the ocdb referral program.

# Installation 

Create a database named "ocdbref"

> CREATE DATABASE ocdbref

Then go in that database 

> USE ocdbref

And install the database scheme in the file database.sql

once the setup is done 

Create at the root of the directory a .env file 

with these info :

DB_USERNAME=fill
DB_PASSWORD=fill
ACCOUNT=ocdbref
ACTIVE_KEY=active_key

Then run the program with pm2

> pm2 start ocdbref.js


