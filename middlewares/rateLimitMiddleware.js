// Middleware Pour limiter le nombre de requêtes effectuées par l'utilisateur
import rateLimit from "express-rate-limit";

export const rateLimitMiddleware = rateLimit({
  windowMs: 10 * 60 * 1000, 
  max: 15,
  message: JSON.stringify({
  error:'Trop de tentives de connection, réessayez dans 10 minutes',
  code: 429
  })
});

