import express from 'express'
import bodyParser from 'body-parser';
import cors from 'cors';// activer la prise en charge des requetes 
import helmet from 'helmet';
import hpp from 'hpp';
import mongoSanitize from 'express-mongo-sanitize';
import 'dotenv/config';
import {connectToDatabase} from './config/db.js'
import routerProjet from './routes/projetRoutes.js';
import routeUser from './routes/userRoutes.js';

const app = express();
const PORT = process.env.PORT;

// Connexion à la base des données
connectToDatabase();

// Configuration des middlweres
app.use(cors());
app.use(express.json());
// Middleware pour parser les données JSON
app.use(bodyParser.json());
// Middleware pour la protection contre les attaques de type cross-site scripting et autres injections intersites
app.use(helmet());
// Middleware pour se protéger des attaques par pollution des paramètres HTTP
app.use(hpp()); 
// Middleware pour assainir les champs inputs des injections sql
app.use(mongoSanitize()); 
// Activer la confiance dans les en-têtes proxy
app.set('trust proxy', true);
// Middleware pour limiter le nombre de requettes par utilisateur
//app.use(rateLimitMiddleware)

// Middleware pour gérer les routes des projets
app.get("/", (req, res) => {
    res.send("Bonjour Tout le monde , vous êtes sur l'api de Vowd");
  });

// app.use('/api/projets',routerProjet );
// app.use('/api/auth',routeUser );

app.listen(PORT || 5001 , () => {
    console.log(`Le serveur a démarré au port ${PORT}`)
})

export default app;