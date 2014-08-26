# Events

The WebApp use [Socket.io](http://socket.io/ "Socket.io") for transmit data between the Backend and Frontend.

## Backend events
This events are listened by the Backend.

### Client controller
This events are listened by the client controller
#### get clients
Get all clients in the database and emit the ''return clients'' event.

#### get clients
Recive a client id, get that client data from databasse and emit the ''return client'' event.

#### add client
Recive a new client data and save it in the database, emit the ''client added'' or ''client added failed'' event and emit ''return clients'' event.

#### edit client
Recive a client data edited and update the old data in the database, emit the ''client edited'' or ''client edited failed'' event and emit ''return clients'' event.

#### delete client
Recive a client id and delete it from the database, emit the ''client deleted'' or ''client deteled failed'' and emit ''return clients'' event.

### Project controller
#### get projects
#### get project
#### get projects by client
#### get projects without populate
#### add project
#### edit project
#### delete project

### Task controller
#### get tasks
#### get task
#### get tasks by user
#### get tasks by project
#### add task
#### edit task
#### delete task

### User controller
#### get users
#### get user
#### get user with pass
#### add user
#### edit user
#### delete user

## Frontend events
This events are listened by de Frontend.
### Clients
### Project
### Task
### User
