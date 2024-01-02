const express = require('express');
const app = express();
const fs = require('fs');
const mysql = require('mysql');

const data = JSON.parse(fs.readFileSync('infos.json', 'utf8'));

app.use(express.json())

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'exo_users'
  });
  
  connection.connect(err => {
    if (err) {
      console.error('Erreur de connexion à la base de données :', err);
      return;
    }
    console.log('Connexion à la base de données réussie');
  });
  
  app.get('/utilisateurs', (req, res) => {
    connection.query('SELECT * FROM utilisateur', (err, results) => {
      if (err) {
        res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' });
        return;
      }
      res.json(results);
    });
});


function saveData() {
    fs.writeFileSync('infos.json', JSON.stringify(data, null, 2), 'utf8');
}

function addUser(utilisateur) {
    data.utilisateurs.push(utilisateur);
    saveData();
}

function printUser() {
    console.log('List of users: ');
    console.log(data.utilisateurs);
}

function updateUser(id, nouvellesInfos) {
    const utilisateur = data.utilisateurs.find(user => user.id === id);
    if (utilisateur) {
        Object.assign(utilisateur, nouvellesInfos);
        saveData();
        console.log('Updated user :', utilisateur);
    } else {
        console.log('User not found');
    }
}

function deleteUser(id) {
    const index = data.utilisateurs.findIndex(user => user.id === id);
    if (index !== -1) {
        data.utilisateurs.splice(index, 1);
        saveData();
        console.log('User deleted');
    } else {
        console.log('User not found');
    }
}

function writeComments(utilisateurId, technologieId, contenu) {
    const commentaire = {
        id: data.commentaires.length + 1,
        date_creation_commentaire: new Date().toISOString(),
        utilisateur_id: utilisateurId,
        technologieId: technologieId,
        contenu: contenu,
    };
    data.commentaires.push(commentaire);
    saveData();
    console.log('Comment added :', commentaire);
}

function printCommentsForTechnology(technologieId) {
    const commentaires = data.commentaires.filter(commentaire => commentaire.technologieId === technologieId);
    console.log('Comments for technology', technologieId);
    console.log(commentaires);
}

function printCommentsForUser(utilisateurId) {
    const commentaires = data.commentaires.filter(commentaire => commentaire.utilisateur_id === utilisateurId);
    console.log('Comments for user', utilisateurId);
    console.log(commentaires);
}

function printCommentsBeforeDate(dateLimite) {
    const commentaires = data.commentaires.filter(commentaire => commentaire.date_creation_commentaire < dateLimite);
    console.log('Comments prior to', dateLimite, ':');
    console.log(commentaires);
}

app.get('/', (req, res) => {
    res.status(200).json(data.utilisateurs);
    }
);

app.get('/commentaires', (req, res) => {
    res.status(200).json(data.commentaires);
    }
);

app.listen(3000, () => {
    console.log('Server started');
})