import Projet from '../models/Projet.js'

// Obtenir tous les projets
export async function getAllProjets() {
    try {
        const projets = await Projet.find().sort({ createdDate: -1 });
        return projets;
    } catch (error) {
        throw error;
    }
}

// Obtenir un projet par son ID
export async function getProjetById(projetId) {
    try {
        const projet = await Projet.findById(projetId);
        return projet;
    } catch (error) {
        throw error;
    }
}

// Obtenir un projet par le prénom
export async function getProjetByEmail(email) {
    try {
        const projets = await Projet.findOne({ email });
        return projets;
    } catch (error) {
        throw error;
    }
}
// Créer un nouveau projet
export async function createProjet(projetData) {
    try {
        // Créer un nouvel objet projetData avec les données du projet et les dates
        const projetToSave = {
            society: projetData.society ,
            siret: projetData.siret ,
            firstName: projetData.firstName,
            lastName: projetData.lastName,
            email: projetData.email,
            projet: projetData.projet ? projetData.projet : "N/R",
            budget: projetData.budget ? projetData.budget : "N/R",
            delai: projetData.delai ? projetData.delai : "N/R",
            message: projetData.message ? projetData.message : "N/R",
            createdDate: new Date(),
            updatedDate: new Date()
          };
          
        const newProjet = await Projet.create(projetToSave);
        return newProjet;
    } catch (error) {
        throw error;
    }
}

// Mettre à jour un projet par son email si le projet existe deja
export async function updateProjetByEmail(email, projetData, isClient = false) {
    try {
        const projetExist = await getProjetByEmail(email)
        let projetToUpdate = {};
        if (!projetExist) {
            return projetExist;
        }

        const projetId = projetExist._id;
        if (isClient) {
            projetToUpdate = {
                society: projetData.society !== "" && projetData.society !== null ? projetData.society : projetExist.society,
                siret: projetData.siret !== "" && projetData.siret !== null ? projetData.siret : projetExist.siret,
                firstName: projetExist.firstName,
                lastName: projetExist.lastName,
                email: projetExist.email,
                projet: projetData.projet !== "" && projetData.projet !== null ? projetData.projet : projetExist.projet,
                budget: projetData.budget !== "" && projetData.budget !== null ? projetData.budget : projetExist.budget,
                delai: projetData.delai !== "" && projetData.delai !== null ? projetData.delai : projetExist.delai,
                message: projetData.message !== "" && projetData.message !== null ? projetData.message : projetExist.message,
                createdDate: projetExist.createdDate,
                updatedDate: new Date()
            };
        } else {
            projetToUpdate = {
                ...projetData,
                email: projetExist.email,
                createdDate: projetExist.createdDate,
                updatedDate: new Date()
            };
        }

        const projetMaj = await Projet.findByIdAndUpdate(projetId, projetToUpdate, { new: true });
        return projetMaj;
    } catch (error) {
        throw error;
    }
}


// Supprimer un projet par son ID
export async function deleteProjetById(projetId) {
    try {
        const deletedProjet = await Projet.findByIdAndDelete(projetId);
        return deletedProjet;
    } catch (error) {
        throw error;
    }
}



