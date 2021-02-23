# CV-app

Personal page for CV type information

Back-end runs on node.js, Express and MongoDB. </br>
Front-end runs on React and Redux </br>
Work in progress

server and client have their own dependencies. Remember to run 'npm install' in both folders.

To configure server:
Create file called config.env in the config folder, and add the following information: </br>

```
NODE_ENV=development
PORT=5000

MONGO_URI=[insert here your own MongoDB connection URI]
```

To simultaneously start both server and client in dev mode: </br>
In the server folder, run: </br>

```
npm run dev
```

To start only the server (with nodemon): </br>
In the server folder, run </br>

```
npm run server
```

To start only the client: <br>
In the <b>server</b> folder, run </br>

```
npm run client
```
