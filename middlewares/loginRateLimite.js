import rateLimit from 'express-rate-limit';

// Middleware pour limiter le nombre de tentatives de connexion
const loginRateLimit = rateLimit({
  windowMs: 48 * 60 * 60 * 1000, // Période de 48 heures
  max: 3, // Nombre maximum de tentatives de connexion
  message: JSON.stringify({
    error: 'Trop de tentatives de connexion, réessayez dans 48 heures',
    code: 429
  })
});

export default loginRateLimit;
