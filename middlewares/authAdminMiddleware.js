import 'dotenv/config';
import jwt from 'jsonwebtoken';

export async function authAdminMiddleware(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send("Token non authentifiée !");
  }

  const token = req.headers.authorization.split(' ')[1];

  // Vérifier si le token est valide
  jwt.verify(token, process.env.JWT_AUTH_SECRET, (err, decodedToken) => {
    if (err) {
      return res.status(401).send('Token invalid');
    }

    // Vérifier si le token a expiré
    const currentTimestamp = Date.now() / 1000; // Timestamp actuel en secondes
    if (decodedToken.exp <= currentTimestamp) {
      return res.status(401).send('Le token est expiré.');
    }
    
    const {email, password} = decodedToken;

    let errors = [];

    if (email !== process.env.APP_IDENTIFIANT) {
      errors.push("L'email est invalide!");
    }

    if (password !== process.env.APP_PASSWORD) {
      errors.push("Le mot de passe est invalide!");
    }

    if (errors.length > 0) {
      return res.status(401).json(errors);
    }

    next();
  });
}

export default authAdminMiddleware;