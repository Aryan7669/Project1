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

const initializeDBAndServer = async () => {
    try {
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
    }
}
initializeDBAndServer();