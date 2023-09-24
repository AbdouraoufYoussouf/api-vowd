import express from 'express';
import { createProjet, deleteProjet, getAllProjets, getProjetByEmail, getProjetById, updateProjet } from '../controllers/projetController.js';
import  validateProjetData from '../middlewares/validateProjetData.js';
import authAdminMiddleware from '../middlewares/authAdminMiddleware.js';
import { rateLimitMiddleware } from '../middlewares/rateLimitMiddleware.js';

const routerProjet = express.Router();

// Liste de tous les projets
routerProjet.get('/', authAdminMiddleware, getAllProjets);

// Obtenir un projet par ID
routerProjet.get('/get',authAdminMiddleware, getProjetById);

// Créer un nouveau projet
routerProjet.post('/',validateProjetData,rateLimitMiddleware, createProjet);

// Obtenir un projet par email
routerProjet.get('/exist', getProjetByEmail);
// Mettre à jour un projet par ID
routerProjet.put('/email', updateProjet);

// Supprimer un projet par ID
routerProjet.delete('/delete',authAdminMiddleware, deleteProjet);

export default routerProjet;
