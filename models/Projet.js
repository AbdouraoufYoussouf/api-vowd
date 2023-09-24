import mongoose from "mongoose";
import validator from "validator";

const projetShema = new mongoose.Schema({
    society: {
        type: String,
        required: [true, 'Veuillez fournir votre Société'],
    },
    siret: {
        type: Number,
        validate: {
          validator: function(value) {
            // Vérifiez si la valeur est un nombre et a une longueur de 14 chiffres
            return /^[0-9]{14}$/.test(value);
          },
          message: 'Le SIRET doit être un nombre de 14 chiffres',
        },
        required: [true, 'Veuillez fournir un SIRET'],
      },
    firstName: {
        type: String,
        required: [true, 'Veuillez fournir votre prénom'],
    },
    lastName: {
        type: String,
        required: [true, 'Veuillez fournir votre nom'],
    },
    email: {
        type: String,
        required: [true, 'Veuillez fournir une adresse e-mail'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Veuillez fournir une adresse e-mail valide'],
      },
    projet: {
        type: String,
    },
    budget: {
        type: String,
    },
    delai: {
        type: String,
    },
    message: {
        type: String,
    },
    createdDate: {
        type: Date,
    },
    updatedDate: {
        type: Date,
    },
})

const Projet = mongoose.model('Projet', projetShema);
export default Projet;