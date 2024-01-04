const db = require('../database/database');

// CRUD TECHNOLOGIES

exports.getAllTechnologies = async(req, res) => {
    const { nom_techno, date_creation, nom_createur } = req.body;
    const sql = 'INSERT INTO technologie (nom_techno, date_creation, nom_createur) VALUES (?, ?, ?)';
    await db.query(sql, [nom_techno, date_creation, nom_createur], (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Erreur lors de la création de la technologie' });
        return;
      }
      res.status(201).json({ message: 'Technologie créée avec succès', id: result.insertId });
    });
};

exports.addTechnologies = async(req, res) => {
  const role = req.body.role;
  if (role !== 'administrateur') {
    return res.status(403).json({ error: 'Vous n\'êtes pas autorisé à ajouter une technologie' });
  }
    const sql = 'SELECT * FROM technologie';
    await db.query(sql, (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Erreur lors de la récupération des technologies' });
        return;
      }
      res.json(result);
    });
};

exports.modifComment = async(req, res) => {
  const technologieId = req.params.id;
  const { nom_techno, date_creation, nom_createur, role } = req.body;

  if (role !== 'administrateur') {
    return res.status(403).json({ error: 'Vous n\'êtes pas autorisé à modifier une technologie' });
  }

  if (!nom_techno || !date_creation || !nom_createur) {
    return res.status(400).json({ error: 'Veuillez fournir toutes les informations nécessaires pour la mise à jour de la technologie' });
  }

  const sql = 'UPDATE technologie SET nom_techno = ?, date_creation = ?, nom_createur = ? WHERE id = ?';
  connection.query(sql, [nom_techno, date_creation, nom_createur, technologieId], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Erreur lors de la mise à jour de la technologie' });
    }
    res.json({ message: 'Technologie mise à jour avec succès' });
  });
};

exports.idTechnologies = async(req, res) => {
    const { nom_techno, date_creation, nom_createur } = req.body;
    const { id } = req.params;
    const sql = 'UPDATE technologie SET nom_techno = ?, date_creation = ?, nom_createur = ? WHERE id = ?';
    await db.query(sql, [nom_techno, date_creation, nom_createur, id], (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Erreur lors de la mise à jour de la technologie' });
        return;
      }
      res.json({ message: 'Technologie mise à jour avec succès' });
    });
};

exports.deleteTechnologies = async(req, res) => {
  const role = req.body.role;
  if (role !== 'administrateur') {
    return res.status(403).json({ error: 'Vous n\'êtes pas autorisé à supprimer une technologie' });
  }
    const { id } = req.params;
    const sql = 'DELETE FROM technologie WHERE id = ?';
    await db.query(sql, [id], (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Erreur lors de la suppression de la technologie' });
        return;
      }
      res.json({ message: 'Technologie supprimée avec succès' });
    });
};