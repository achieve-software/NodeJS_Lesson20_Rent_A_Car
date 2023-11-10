"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const express = require('express')
const app = express()

/* ------------------------------------------------------- */
// Required Modules:

// envVariables to process.env:
require('dotenv').config()
const HOST = process.env?.HOST || '127.0.0.1'
const PORT = process.env?.PORT || 8000

// asyncErrors to errorHandler:
require('express-async-errors')

/* ------------------------------------------------------- */
// Configrations:

// Connect to DB:
const { dbConnection } = require('./src/configs/dbConnection')
dbConnection()

/* ------------------------------------------------------- */
// Middlewares:

// Accept JSON:
app.use(express.json())

// Check Authentication:
app.use(require('./src/middlewares/authentication'))

// Run Logger:
app.use(require('./src/middlewares/logger'))

// res.getModelList():
app.use(require('./src/middlewares/findSearchSortPage'))

// Sending Mail (nodemailer):

const nodemailer = require('nodemailer')

// Create Test (Fake) Account:
// nodemailer.createTestAccount().then((email) => console.log(email))


// {
//     user: 'zf6tkcbceohgqytg@ethereal.email',
//     pass: '7UkGg8zZQCex4kxZjE',
//     smtp: { host: 'smtp.ethereal.email', port: 587, secure: false },
//     imap: { host: 'imap.ethereal.email', port: 993, secure: true },
//     pop3: { host: 'pop3.ethereal.email', port: 995, secure: true },
//     web: 'https://ethereal.email'
//   }


const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // false | 'tls' | 'ssl'
    auth: {
        user: 'zf6tkcbceohgqytg@ethereal.email',
        pass: '7UkGg8zZQCex4kxZjE'
    }
})
 // // SendMail:
transporter.sendMail({
    from: 'zf6tkcbceohgqytg@ethereal.email',
    to: 'qadir@clarusway.com', // 'abc@mail.com, def@mail.com'
    subject: 'Hello',
    text: 'Hello There...',
    html: '<b>Hello There</b>'
}, (error, successInfo) => {
    (error) ? console.log(error) : console.log(successInfo)
})
/* ------------------------------------------------------- */
// Routes:

// HomePath:
app.all('/', (req, res) => {
    res.send({
        error: false,
        message: 'Welcome to RENT A CAR API',
        documents: {
            swagger: '/documents/swagger',
            redoc: '/documents/redoc',
            json: '/documents/json',
        },
        user: req.user
    })
})

// Routes:
app.use(require('./src/routes'))

/* ------------------------------------------------------- */

// errorHandler:
app.use(require('./src/middlewares/errorHandler'))

// RUN SERVER:
app.listen(PORT, HOST, () => console.log(`http://${HOST}:${PORT}`))

/* ------------------------------------------------------- */
// Syncronization (must be in commentLine):
// require('./src/helpers/sync')()