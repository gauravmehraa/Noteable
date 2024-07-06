
# SecureU Assignment - Personal Notes App

This application is a user-friendly web app designed for creating, editing, and managing personal notes. With secure user authentication and session management, it ensures your data remains private. The app has a responsive UI where notes are dynamically updated and displayed. Whether you're jotting down quick reminders or detailed notes, this app provides a simple and reliable solution for all your note-taking needs.


## Features

- Registration/Login
- Create, read, update, and delete notes
- Responsive UI
- Session authentication and authorization
- Password hashing
- SQLi safe and XSS safe


## Run Locally

Clone the project

```bash
  git clone https://github.com/gauravmehraa/SecureU-Assignment
```

Go to the project directory

```bash
  cd SecureU-Assignment
```

Install dependencies

```bash
  cd frontend && npm install && cd ../backend && npm install
```

Start the server

```bash
  npm run dev
```

Start the frontend

```bash
  cd ../frontend && npm run start
```





## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT` - Specify server port

`MONGODB_URL` - MongoDB connection string

`SESSION_SECRET` - Generated Session Secret

`NODE_ENV` - `dev` or `production`


## API Reference

#### Register

```http
  POST /api/auth/register
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required**. Your name |
| `username` | `string` | **Required**. Username you want to register |
| `password` | `string` | **Required**. Password |
| `confirmPassword` | `string` | **Required**. Confirm Password Field |


#### Login

```http
  POST /api/auth/login
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username` | `string` | **Required**. Registered Username |
| `password` | `string` | **Required**. Password |

#### Logout

```http
  POST /api/auth/logout
  (No parameters)
```

#### Get Notes

```http
  GET /api/notes/
  (No parameters)
```

#### Add Note

```http
  POST /api/notes/add
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `title` | `string` | **Required**. Title of the note |
| `content` | `string` | **Required**. Note content |

#### Update/Edit Note

```http
  PATCH /api/notes/update/{id}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `noteID (URL parameter)` | `string` | **Required**. Document ID of note to be updated |
| `title` | `string` | **Required**. Updated title of the note |
| `content` | `string` | **Required**. Updated note content |


#### Delete Note

```http
  DELETE /api/notes/delete/{id}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `noteID (URL parameter)` | `string` | **Required**. Document ID of note to be deleted |

## Tech Stack

MERN Stack

**Client:** React, TailwindCSS

**Server:** Node, Express

**Database:** MongoDB

**API:** REST

**Backend Server Deployment:** AWS Elastic Beanstalk
([Deployed Link](http://secureu.eba-ad3awdfi.ap-south-1.elasticbeanstalk.com))