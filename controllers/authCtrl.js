import crypto from "crypto";
import User from "../models/User.js";

const sha256Hasher = crypto.createHmac("sha256", "ANY KEY YOU WANT");

export const signUp = (req, res) => {
  // hash du password
  const hash = sha256Hasher.update(req.body.password).digest("hex");
  // création du nouveau user
  const newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hash,
  });
  // sauvegarde dans la DB puis on retourne un 201 en cas de succès

  newUser
    .save()
    .then(() => res.status(201).json({ message: "Compte crée !" }))
    .catch((err) => res.status(400).json({ err }));
};

export const signIn = (req, res) => {
  // on filtre via l'email
  User.findOne({ email: req.body.email })
    .then((user) => {
      // si on trouve rien on retourne un 401
      if (!user) {
        return res.status(401).json({ error: "Email inconnu !" });
      } else {
        // on hash le mot de passe pour pouvoir le comparer à celui de la DB
        const currentPassword = sha256Hasher
          .update(req.body.password)
          .digest("hex");

        // test des mots de passe, si ça match on retourne un objet json avec l'id et un JWT sinon on retourne un 401
        if (currentPassword === user.password) {
          return res.status(200).json({
            userId: user._id,
            token: "je suis un token JWT normalement",
          });
        } else {
          return res.status(401).json({ error: "Mot de passe incorrect !" });
        }
      }
    })
    .catch((err) => res.status(500).json({ err }));
};
