import { body } from 'express-validator'

// Middleware de validation pour la création de projet

// Expressions régulières
const matchSociety = /^[a-zA-Zéèêîàçôïùû0à-9]+(?:['-\s][a-zA-Zéèêîàçôïùû0à-9]+)*$/
const errorSociety = 'Le nom de la société ne peut contenir que des lettres et chiffres, un seul espace entre les mots, une seule apostrophe entre les mots et un seul tiret entre les mots. Ce champ doit commencer par une lettre ou un chiffre. 3 à 30 caractères sont autorisés.'

const matchSiret = /^[0-9{14,14}]+$/
const errorSiret = 'Le numéro SIRET ne peut contenir que des chiffres. 14 chiffres sont requis'

const matchFirstName = /^[a-zA-Zéèêîàçôïùû]+(?:['-\s][a-zA-Zéèêîàçôïùû]+)*$/
const errorFirstName = 'Le prénom ne peut contenir que des lettres, un seul espace entre les mots, une seule apostrophe entre les mots et un seul tiret entre les mots. Ce champ doit commencer par une lettre. 2 à 30 caractères sont autorisés.'

const matchLastName = /^[a-zA-Zéèêîàçôïùû]+(?:['-\s][a-zA-Zéèêîçàôïùû]+)*$/
const errorLastName = 'Le nom ne peut contenir que des lettres, un seul espace entre les mots, une seule apostrophe entre les mots et un seul tiret entre les mots. Ce champ doit commencer par une lettre. 2 à 30 caractères sont autorisés.'

const matchEmail = /^\w+([\.-_]?\w+)*@\w+([\.-_]?\w+)*(\.\w{2,3})+$/
const errorEmail = "L'adresse électronique n'est pas valide"

const matchProjet = /^[a-zA-Zéèêàùâûîçôëïà0-9\s.,!?()'"_-]+$/
const errorProjet = 'Le nom du projet doit etre une chaine. et peut pas contenir des caractères spéciaux'

const matchMessage = /^[a-zA-Zéèêîçôïùûà0-9]+(?:['\s\-?,:!%"@;’=°_()&$€.a-zA-Zéèêîçàôïûù0-9]+)*$/
const errorMessage = 'Le message doit contenir des caractères valides, certains caractère spéciaux sont non autorisés. 2 à 500 caractères sont autorisés'

// Utilisez les regex dans le middleware de validation
const validateProjetData = [
  // Champ obligatoire
  body('society').notEmpty().isString().matches(matchSociety).withMessage(errorSociety)
  .isLength({ min: 3, max: 30 }).withMessage('Le champ Société doit contenir entre 3 et 30 caractères'),

  // Champ obligatoire
  body('siret')
  .isNumeric().withMessage('Le champ SIRET doit être un nombre')
  .isLength({ min: 14, max: 14 }).withMessage('Le champ SIRET doit contenir entre 3 et 14 chiffres'),

  // Champ obligatoire
  body('firstName').notEmpty().isString().matches(matchFirstName).withMessage(errorFirstName)
  .isLength({ min: 2, max: 30 }).withMessage('Le champ Prénom doit contenir entre 2 et 30 caractères'),

  // Champ obligatoire
  body('lastName').notEmpty().isString().matches(matchLastName).withMessage(errorLastName)
  .isLength({ min: 2, max: 30 }).withMessage('Le champ Nom doit contenir entre 2 et 30 caractères'),

  // Champ obligatoire
  body('email').notEmpty().isEmail().matches(matchEmail).withMessage(errorEmail),

  // Champ facultatif
  body('projet').optional().isString().withMessage('Le projet est invalide'),

  // Champ facultatif
  body('budget').optional().isString().withMessage('Le budget est invalide'), 

  // Champ facultatif
  body('delai').optional().isString().withMessage('Le délai est invalide.'), 

  // Champ facultatif
  body('message')
    .optional()
    .isLength({ min: 0, max: 500 }).withMessage('Le champ Message doit contenir entre 3 et 500 caractères')
    .custom((value, { req }) => {
      if (value && value.trim() !== '' && !matchMessage.test(value)) {
        console.log(req)
        req.errors.push(errorMessage) // Ajoutez le message d'erreur à l'array d'erreurs
        return false
      }
      return true
    }),
];

export default validateProjetData





