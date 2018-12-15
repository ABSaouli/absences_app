const array = [
  {
    dateDebut: "date",
    dateFin: "date",
    nbJour: 5,
    reponse: null
  },
  {
    dateDebut: "date",
    dateFin: "date",
    nbJour: 1,
    reponse: true
  },
  {
    dateDebut: "date",
    dateFin: "date",
    nbJour: 1,
    reponse: true
  },
  {
    dateDebut: "date",
    dateFin: "date",
    nbJour: 1,
    reponse: false
  }
];

console.log(
  "sum it ",
  array.reduce(
    (accumulateur, valeurCourante) => {
      if (valeurCourante.reponse === true) {
        accumulateur.true = accumulateur.true + valeurCourante.nbJour;
      }
      if (valeurCourante.reponse === false) {
        accumulateur.false = accumulateur.false + valeurCourante.nbJour;
      }
      if (valeurCourante.reponse === null) {
        accumulateur.null = accumulateur.null + valeurCourante.nbJour;
      }
      return accumulateur;
    },
    {
      true: 0,
      false: 0,
      null: 0
    }
  )
);
