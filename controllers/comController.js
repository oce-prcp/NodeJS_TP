const db = require('../database/database');

// CRUD COMMENTAIRES

exports.addComment = async(req, res) => {
    const { utilisateur_id, technologie_id, contenu } = req.body;
    const date_creation_commentaire = new Date().toISOString();
    const sql = 'INSERT INTO commentaire (utilisateur_id, technologie_id, contenu, date_creation_commentaire) VALUES (?, ?, ?, ?)';
    await db.query(sql, [utilisateur_id, technologie_id, contenu, date_creation_commentaire], (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Erreur lors de la création du commentaire' });
        return;
      }
      res.status(201).json({ message: 'Commentaire ajouté avec succès', id: result.insertId });
    });
};

exports.techoComment = async(req, res) => {
  const { technologieId } = req.params;
  const sql = 'SELECT * FROM commentaire WHERE technologie_id = ?';
  await db.query(sql, [technologieId], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Erreur lors de la récupération des commentaires pour cette technologie' });
      return;
    }
    res.json(result);
  });
};

exports.idComment = async(req, res) => {
  const { utilisateurId } = req.params;
  const sql = 'SELECT * FROM commentaire WHERE utilisateur_id = ?';
  await db.query(sql, [utilisateurId], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Erreur lors de la récupération des commentaires pour cet utilisateur' });
      return;
    }
    res.json(result);
  });
};

exports.dateComment = async(req, res) => {
  const { dateLimite } = req.params;
  const sql = 'SELECT * FROM commentaire WHERE date_creation_commentaire < ?';
  await db.query(sql, [dateLimite], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Erreur lors de la récupération des commentaires avant cette date' });
      return;
    }
    res.json(result);
  });
};


  
