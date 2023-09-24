import moment from "moment";
import 'dotenv/config';
import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(401).send("Pas d'en-tête d'autorisation");
  }

  const decoded = Buffer.from(req.headers.authorization.split(' ')[1], 'base64').toString('utf8');
  const [email, password] = decoded.split(':');

  let errors = {};

  if (email !== process.env.APP_IDENTIFIANT) {
    errors.errorEmail = "L'email ne correspond pas!";
  }

  if (password !== process.env.APP_PASSWORD) {
    errors.errorPassword = "Le mot de passe ne correspond pas!";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(401).json({ success: false, error:errors });
  }

  // generate a new token
  const accessToken = jwt.sign({ email, password }, process.env.JWT_AUTH_SECRET, { expiresIn: moment.duration(7, 'days').asSeconds() });
  res.json({ success: true, token: accessToken, message: "Connexion réussie!" });
}
