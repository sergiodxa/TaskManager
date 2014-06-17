# TaskManager
WebApp para controlar tareas en proyectos.

## Instalar y usar
Para empezar a usar TaskManager es necesario bajar el repositorio, instalar las dependencias y luego iniciar la aplicación, para eso se necesitan usar las siguientes líneas:
```
git clone git@github.com:sergiodxa/TaskManager.git
```
Esto baja el repositorio (también puedes bajar el repo con el zip).
```
npm install
bower install
```
Esto instala las dependencias tanto del backend usando npm como del frontend con bower (si no tenes bower previamente instalado en necesario usar primero npm install, caso contrario no importa el órden).
```
gulp minify
```
Esto ejecuta todas las tareas de minificación necesarias para poder empezar a corrar la App.
```
gulp merge
```
Esto une todos los archivos minificados en uno solo llamado main.js
```
npm start
```
Esto inicia la aplicación y listo ya funciona todo
