import { validationResult } from 'express-validator';
import * as projetService from '../services/projetService.js';

// Obtenir tous les projets 
export const getAllProjets = async (req, res) => {
    try {
        const projets = await projetService.getAllProjets();
        res.status(200).json(projets);
    } catch (error) {
        console.log("projers:", error)
        res.status(500).json({ success: true, error: "Erreur lors de la récupération des projets." })
    }
}

// Obetenir un projet par son id
export const getProjetByEmail = async (req, res) => {
    const email = req.query.email;
    try {
        const projet = await projetService.getProjetByEmail(email);
        if (!projet) {
            return res.status(404).json({ error: "Projet non trouvé." })
        }
        res.status(200).json(projet);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Erreur lors de la récupération du projet." })
    }
}
// Obetenir un projet par son id
export const getProjetById = async (req, res) => {
    const projetId = req.query.projetId;
    try {
        const projet = await projetService.getProjetById(projetId);
        if (!projet) {
            return res.status(404).json({ error: "Projet non trouvé." })
        }
        res.status(200).json(projet);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Erreur lors de la récupération du projet." })
    }
}

// Creer un nouveau projet
export const createProjet = async (req, res) => {
    const projetData = req.body
    const email = projetData.email;
    // Récuperons les erreurs du validateur s'il y en a.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, error: errors.array() });
    }

    try {
        const projetExist = await projetService.getProjetByEmail(email)
        if (projetExist) {
            const projetUpdate = await projetService.updateProjetByEmail(email, projetData, true);
            console.log('projet mis à jour!')
            res.status(200).json({ success: true, data: projetUpdate, message: "Votre projet a été mis à jour!" });
        } else {
            const newProjet = await projetService.createProjet(projetData);
            res.status(200).json({ success: true, data: newProjet, message: "Votre projet a bien été sauvegarder! " });
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, error: error.errors, message: 'Erreur lors de la création du projet.' });
    }
}

// Mettre à jour un projet
export const updateProjet = async (req, res) => {
    const { email } = req.query.email;
    const projetData = req.body;
    try {
        const updatedProjet = await projetService.updateProjetByEmail(email, projetData)
        if (!updatedProjet) {
            return res.status(404).json({ error: 'Projet non trouvé.' });
        }
        res.json({ success: true, data: updateProjet, message: "Le projet a été mis à jour!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur lors de la mise à jour du projet.' });
    }
};

// Supprimer un projet par ID
export const deleteProjet = async (req, res) => {
    const projetId = req.query.projetId;
    try {
        const deletedProjet = await projetService.deleteProjetById(projetId);
        if (!deletedProjet) {
            return res.status(404).json({ error: 'Projet non trouvé.' });
        }
        res.json({ success: true, data: deletedProjet, message: `Le projet "${deletedProjet.projet}"  est bien supprimé!` });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur lors de la suppression du projet.' });
    }
};