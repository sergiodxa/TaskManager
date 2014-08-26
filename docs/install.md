# Install and use

First, you need to download the repository, you can download the [ZIP](https://github.com/sergiodxa/TaskManager/archive/master.zip "ZIP") file or clone the repository in your computer using the command:

```
git clone https://github.com/sergiodxa/TaskManager.git
```

Later you need to install dependencies using the next command:

```
npm install
```

This is going to install the dependencies of the backend (with npm) and frontend (with bower) and run bower's tasks to minify and merge all the JavaScript.

You can run bowers's tasks manually using the command

```
npm run build
```

When you end this you can start the WebApp with the follow command:

```
npm start
```

By default you can access to the WebApp with the route [http://localhost:3000/](http://localhost:3000/ "http://localhost:3000/").

## Database
For use this WebApp you need have installed MongoDB and Redis.

## Seed data
If you want to test this WebApp you can use the command:

```
npm run seed
```

This command fill the Mongo database with testing data in the collections Users, Clients and Projects, after this you can login using the user ''admin'' and the password ''1234''.
