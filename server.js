const exports = require('express');
const app = express();
const fs = require('fs');

const data = JSON.parse(fs.readFileSync('infos.json', 'utf8'));

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





app.listen(3000, () => {
    console.log('Server started');
})