const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql');

const data = JSON.parse(fs.readFileSync('infos.json', 'utf8'));

const usersRoute = require('./routes/usersRoute');

app.use(express.json())
app.use(cors())

app.use('/utilisateurs', usersRoute);

function saveData() {
    fs.writeFileSync('infos.json', JSON.stringify(data, null, 2), 'utf8');
}


// app.get('/', (req, res) => {
//     res.writeHead(200, { 'Content-Type': 'text/html' });
//     res.end('<h1> Hello welcome to my home page ! </h1>');
//     }
// );

// app.get('/utilisateurs', (req, res) => {
//     res.status(200).json(data.utilisateurs);
//     }
// );

// app.get('/commentaires', (req, res) => {
//     res.status(200).json(data.commentaires);
//     }
// );

app.listen(3000, () => {
    console.log('Server started');
})