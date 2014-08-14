# TaskManager
* **Author**: Sergio Daniel Xalambrí
* **Twitter**: [@sergiodxa](http://twitter.com/sergiodxa "@sergiodxa")
* **Version**: 2.1.0

## English
WebApp to manage task in many projects. You can create a client, add as many project as you want to that client, create tasks for that project and assign them to an user (a team member).

### Install and use

First, you need to download the repository, you can download the [ZIP](https://github.com/sergiodxa/TaskManager/archive/master.zip "ZIP") file or clone the repository in your computer using the command:

```
git clone git@github.com:sergiodxa/TaskManager.git
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

### Database
For use this WebApp need a MySQL database, has a database with the corresponding tables and a default user in the file **task-manager-db.sql**. The default user's auth data are:

* user: *admin*
* pass: *1234*

## Español
Aplicación web para administrar tareas en varios proyectos. Puedes crear un cliente, agregar tantos proyectos como quieras a dicho cliente, crear tareas para ese proyecto y asignarlas a un usuario (un miembro del equipo).

### Instalar y usar

Primero, necesita bajar el repositorio, puede descargar el [ZIP](https://github.com/sergiodxa/TaskManager/archive/master.zip "ZIP") o clonar el repositorio en su computadora usando el comando:

```
git clone git@github.com:sergiodxa/TaskManager.git
```

Luego necesita instalar las dependencias usando el siguiente comando:

```
npm install
```

Esto va a instalar las dependecias del backend (usando npm) y frontend (usando bower) y ejecutar las tareas de bower para minificar y unir los archivos de JavaScript.

Puedes ejecutar las tareas de bower manualmente usando el siguiente comando:

```
npm run build
```

Cuando termine esto puede iniciar la aplicación web con el siguiente comando:

```
npm start
```

De forma predeterminada puede acceder a la aplicación web usando la ruta [http://localhost:3000/](http://localhost:3000/ "http://localhost:3000/").

### Base de datos
Para usar esta aplicación web necesita una base de datos MySQL, hay una base de datos con sus correspondientes tablas y un usuario por defecto en el archivo **task-manager-db.sql**. Los datos de autenticación del usuario predeterminados son:

* usuario: *admin*
* contraseña: *1234*