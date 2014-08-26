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
Recive a new client data and save it in the database, emit the ''client added'' o ''client added failed'' and emit ''return client''.

#### edit client

#### delete client

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
