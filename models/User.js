import mongoose from 'mongoose';
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Veuillez fournir une adresse e-mail!'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Veuillez fournir une adresse e-mail valide'],
      },
  password: {
    type: String,
    required: [true, 'Veuillez un mot de passe!'],
  },
});

// Avant de sauvegarder un utilisateur, hachez son mot de passe
userSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  next();
});

const User = mongoose.model('User', userSchema);

export default User;
