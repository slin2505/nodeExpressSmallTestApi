export default function signupVerification(req, res, next) {
  try {
    const errors = {};
    // on créer des erreurs pour le front
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
  } catch (err) {
    res.status(401).json({ err: err | "Requête non authentifiée !" });
  }
}
