# Web Developer Test


This project was created with ReactJS and MySQL database.

The project consists of two parts - server-side and client-side. Each part should be run separately.

---

# Client-side

### `npm install`

To install missing modules.

### `npm start`

To start the application.

Open [http://localhost:3000](http://localhost:3000) to view the client side of the project in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

---

# Server-side

MySQL server has been set up locally using NodeJS.

For you to test the database connection and server yourself, you will need to set up a local server and create your own database, that will match the project's configuration.

Call your database 'mydb'.

Then to siplify things, you can use this command in your MySQL to create a table:
``CREATE TABLE `newdb`.`subscriptions` ( `id` INT NOT NULL AUTO_INCREMENT , `email` VARCHAR(320) NOT NULL UNIQUE, `provider` VARCHAR(100) NOT NULL , `date` TIMESTAMP NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB``

When that is set up, you can open *server* folder and run

### `npm install`

To install missing modules.

### `node server.js`

To start the server and connect to your database.

You should see a message like this: 

*Server is running on port 8000.
Successfully connected to the database.*

If you see an error instead, make sure your MySQL server is running.

If you are having troubles with MySQL server, try using [XAMPP](https://www.apachefriends.org/index.html)

If the messages match, you are ready to test the subscription form. Every subscription will appear in [http://localhost:3000/api](http://localhost:3000/api)

Preview: 

[<img src="https://i.gyazo.com/7f24b516071336f116c78fb62fc248d7.gif" width="500" />](https://gyazo.com/7f24b516071336f116c78fb62fc248d7)


