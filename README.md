# TaskManager
* **Author**: Sergio Daniel Xalambrí
* **Twitter**: [@sergiodxa](http://twitter.com/sergiodxa "@sergiodxa")
* **Version**: 3.0.0

## English
WebApp to manage task in many projects. You can create a client, add as many project as you want to that client, create tasks for that project and assign them to an user (a team member).

### Install and use

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

### Database
For use this WebApp you need have installed MongoDB and Redis.

### Seed data
If you want to test this WebApp you can use the command:

```
npm run seed
```

This command fill the Mongo database with testing data in the collections Users, Clients and Projects, when you do this you can loggin usign the user ''admin'' and the pass ''1234''.

## Español
Aplicación web para administrar tareas en varios proyectos. Puedes crear un cliente, agregar tantos proyectos como quieras a dicho cliente, crear tareas para ese proyecto y asignarlas a un usuario (un miembro del equipo).

### Instalar y usar

Primero, necesita bajar el repositorio, puede descargar el [ZIP](https://github.com/sergiodxa/TaskManager/archive/master.zip "ZIP") o clonar el repositorio en su computadora usando el comando:

```
git clone https://github.com/sergiodxa/TaskManager.git
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
Para usar esta aplicación web necesita tener instalado MongoDB y Redis.

### Semilla de datos
If you want to test this WebApp you can use the command:
Si quieres probar esta aplicación web puedes usar el comando

```
npm run seed
```

Este comando llena la base de datos Mongo con datos de prueba en las colecciones Users, Clients y Projects, cuando hayas hecho esto pueden iniciar sesión usando el usuario ''admin'' y la contraseña ''1234''.
