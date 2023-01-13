import User from "../models/User.js";

export default function authVerification(req, res, next) {
  console.log(req.body);
  try {
    User.findOne({ email: req.body.email })
      .then((user) => {
        // si on trouve un user a partir de l'email c'est qu'il existe déjà donc on retourne un 401
        if (user) {
          res.status(401).json({ error: "Email déjà existant !" });
        } else {
          const errors = {};

          // on créer des erreurs pour le front
          if ((req.body.firstName === undefined) | (req.body.email === null)) {
            errors.firstName = "Le champ prénom ne peut pas être vide";
          }
          if ((req.body.lastName === undefined) | (req.body.email === null)) {
            errors.lastName = "Le champ nom ne peut pas être vide";
          }
          if ((req.body.email === undefined) | (req.body.email === null)) {
            errors.email = "Le champ email ne peut pas être vide";
          }
          if ((req.body.password === undefined) | (req.body.email === null)) {
            errors.password = "Le champ de mot de passe ne peut pas être vide";
          }

          // si l'objet n'est pas vide on retourne les erreurs sinon on passe au controleur
          if (!Object.keys(errors).length === 0) {
            res.status(401).json(errors);
          } else {
            next();
          }
        }
      })
      .catch((err) => res.status(500).json({ err }));
  } catch (err) {
    res.status(401).json("Requête non authentifiée !");
  }
}
