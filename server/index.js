const express = require('express');
const {open} = require('sqlite');
const sqlite3 = require('sqlite3');
const path = require('path');
const dbPath = path.join(__dirname, 'good2give.db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors');
const PORT=process.env.PORT || 3000;
let db = null;
const app = express();
app.use(express.json());
app.use(cors());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));


const initializeDBAndServer = async () => {
    try {email
        db = await open({
            filename: dbPath,
            driver: sqlite3.Database
        });
        app.listen(PORT, () => {
            console.log(`Server Running at http://localhost:/${PORT}`);
        });
    } catch (e) {
        console.log(`DB Error: ${e.message}`);
        process.exit(1);
    };
}
initializeDBAndServer();
<<<<<<< HEAD
app.post('/signup/', async (request, response) => { 
    const {name, password, email, address,phone,usertype} = request.body;
=======

//API 1 SignUp API

app.post('/signup/', async (request, response) => { 
    const {name, password, email,address,phone,usertype} = request.body;
>>>>>>> 19eac68149d50a12d99eb9652ab7672e0d40d803
    const hashedPassword = await bcrypt.hash(password, 10);
    const selectUserQuery = `SELECT * FROM users WHERE email = '${email}';`;
    const dbUser = await db.get(selectUserQuery);
    if (dbUser === undefined) {
        const createUserQuery = `
            INSERT INTO users (name, email, password, address,phone,userType)
            VALUES ('${name}', '${email}', '${hashedPassword}', '${address}','${phone}','${usertype}');`;
        await db.run(createUserQuery);
        response.send("User created successfully");
    } else {
        response.status(400);
        response.send("User already exists");
    }
});

//API 2 login api

app.post('/login/', async (request, response) => {
    const {email, password} = request.body;
    const selectUserQuery = `SELECT * FROM users WHERE email = '${email}';`;
    const dbUser = await db.get(selectUserQuery);
    if (dbUser === undefined) {
        response.status(400);
        response.send("Invalid user");
    } else {
        const isPasswordMatched = await bcrypt.compare(password, dbUser.password);
        if (isPasswordMatched === true) {
            const payload = {email: email};
            const jwtToken = jwt.sign(payload, "assp");
            response.send({jwtToken: jwtToken});
        } else {
            response.status(400);
            response.send("Invalid password");
        }
    }
});

<<<<<<< HEAD
=======
//auth middleware

>>>>>>> 19eac68149d50a12d99eb9652ab7672e0d40d803
const authenticateToken = (request, response, next) => {
    let jwtToken;
    const authHeader = request.headers["authorization"];
    if (authHeader !== undefined) {
        jwtToken = authHeader.split(" ")[1];
    }
    if (jwtToken === undefined) {
        response.status(401);
        response.send("Invalid JWT Token");
    } else {
        jwt.verify(jwtToken, "assp", async (error, payload) => {
            if (error) {
                response.status(401);
                response.send("Invalid JWT Token");
            } else {
                next();
            }
        });
    }
};



<<<<<<< HEAD
=======


>>>>>>> 19eac68149d50a12d99eb9652ab7672e0d40d803
module.exports = app;