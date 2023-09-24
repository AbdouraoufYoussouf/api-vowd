import mongoose from 'mongoose';
import faker from 'faker';
import Projet from '../models/Projet.js';
import 'dotenv/config';

// Connexion à la base de données (assurez-vous que votre connexion à la base de données est configurée correctement)
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });


// Générer des données aléatoires pour un projet
const mois = faker.random.number({ min: 1, max: 12 }); // Nombre aléatoire de mois entre 1 et 12
const delai = `${mois} mois`; // Format "X mois"

const generateRandomProjet = () => {
  const projet = {
    society: faker.company.companyName(),
    siret : faker.random.number({ min: 10000000000000, max: 99999999999999 }),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    projet: faker.commerce.productName(),
    budget: faker.random.number({ min: 1000, max: 100000 }),
    delai: delai,
    message: faker.lorem.paragraph(),
    createdDate: faker.date.past().toISOString(),
    updatedDate: faker.date.future().toISOString(),
  };
  return projet;
};

// Créer et sauvegarder 10 projets aléatoires dans la base de données
async function createAndSaveRandomProjects() {
  try {
    for (let i = 0; i < 10; i++) {
      const randomProjet = generateRandomProjet();
      const newProjet = await Projet.create(randomProjet);
      console.log('Projet enregistré avec succès :', newProjet);
    }
  } catch (error) {
    console.error('Erreur lors de la création et de l\'enregistrement des projets :', error);
  } finally {
    // Déconnectez-vous de la base de données une fois terminé
    mongoose.disconnect();
  }
}

// Exécuter la fonction pour créer et sauvegarder 10 projets aléatoires
createAndSaveRandomProjects();
