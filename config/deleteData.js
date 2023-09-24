import 'dotenv/config';
import mongoose from 'mongoose';
import Projet from '../models/Projet.js';

async function removeAllProjetData() {
  try {
    // Connexion à la base de données MongoDB
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Supprimer toutes les données de la collection "projets"
    const result = await Projet.deleteMany({});

    console.log(`Suppression réussie : ${result.deletedCount} documents supprimés.`);
  } catch (error) {
    console.error('Erreur lors de la suppression des données :', error);
  } finally {
    // Déconnexion de la base de données
    mongoose.disconnect();
  }
}

// Appel de la fonction pour supprimer les données
removeAllProjetData();
