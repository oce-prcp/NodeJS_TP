const db = require('../database/database');

// CRUD UTILISATEURS

exports.addUser = async(req, res) => {
    const { nom, prenom, email, password, role } = req.body;
    const sql = 'INSERT INTO utilisateur (nom, prenom, email, password, role) VALUES (?, ?, ?, ?, ?)';
    await db.query(sql, [nom, prenom, email, password, role], (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Erreur lors de la création de l\'utilisateur' });
        return;
      }
      res.status(201).json({ message: 'Utilisateur créé avec succès', id: result.insertId });
    });
};

exports.getAllUsers = async(req, res) => {
    const sql = 'SELECT * FROM utilisateur';
    await db.query(sql, (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' });
        return;
      }
      res.json(result);
    });
};

exports.idUsers = async(req, res) => {
    const { nom, prenom, email, password, role } = req.body;
    const { id } = req.params;
    const sql = 'UPDATE utilisateur SET nom = ?, prenom = ?, email = ?, password = ?, role = ? WHERE id = ?';
    await db.query(sql, [nom, prenom, email, password, role, id], (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'utilisateur' });
        return;
      }
      res.json({ message: 'Utilisateur mis à jour avec succès' });
    });
};

exports.deleteUsers = async(req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM utilisateur WHERE id = ?';
    await db.query(sql, [id], (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Erreur lors de la suppression de l\'utilisateur' });
        return;
      }
      res.json({ message: 'Utilisateur supprimé avec succès' });
    });
};


exports.register = async(req, res)=> {
  const { email, password } = req.body 
  const result = await db.query("SELECT * FROM users WHERE email = ?", [email]);
  if(result.length > 0){
      return res.status(401).json({error : "utilisateur déjà existant"});
  }
  const hashMDP = await bcrypt.hash(password, 10);

  await db.query('INSERT INTO users (email, password) VALUES (?, ?)',
  [email, hashMDP]
  )
  const token = jwt.sign({email}, process.env.TOKEN_SECRET, {expiresIn: '1h'});
  res.json({token})
}

exports.login = async(req, res)=> {
  const { email, password } = req.body 
  const result = await db.query('select * from users where email = ?', [email])
  if(result.length == 0){
      return res.status(401).json({error: "utilisateur non existant"})
  }
  const users = result[0];
  console.log(users);
  const SamePwd = await bcrypt.compare(password, users.password)
  if(!SamePwd){
      return res.status(401).json({error: "mdp incorrect"})
  }
  const token = jwt.sign({email}, process.env.SECRET_KEY, { expiresIn : '1h'})
  res.json({token})
}