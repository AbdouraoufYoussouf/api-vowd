import mongoose from 'mongoose';

const mongoURI = process.env.MONGO_URL;

const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

// Utilisez async/await pour gérer la connexion
export const connectToDatabase = async () => {
  try {
    await mongoose.connect(mongoURI, mongooseOptions);
    console.log('Connexion à la base de données établie avec succès.');
  } catch (err) {
    console.error('Erreur de connexion à la base de données :', err);
    process.exit();
  }
}



