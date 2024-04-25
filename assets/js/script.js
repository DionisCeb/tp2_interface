function init() {
  //Sélection d'éléments
  const formulaire = document.querySelector("#formulaire-comande");
  const checkboxSuccursale = document.querySelector("#checkboxSuccursale");
  const selectSuccursale = document.querySelector("#succursale");
  const livraisonChoix = document.querySelectorAll('input[type="radio"]');

  //la sélection est inactive par défaut (SelectSuccursale)
  selectSuccursale.disabled = true;

  // Mettre à jour les résultats lorsqu'une entrée change
  formulaire.addEventListener("change", function () {
    afficherResultats(formulaire, selectSuccursale);
  });

  // Gérer le changement de case à cocher pour la succursale
  checkboxSuccursale.addEventListener("change", function () {
    checkboxChangementClick(
      formulaire,
      checkboxSuccursale,
      selectSuccursale,
      livraisonChoix
    );
  });

  // Gérer le changement de case à cocher pour la livraisonChoix
  livraisonChoix.forEach(function (radio) {
    radio.addEventListener("change", function () {
      radioChangementClick(radio);
    });
  });

  // Mise à jour initiale au chargement de la page
  afficherResultats(formulaire, selectSuccursale);
}

//la fonction qui reçoit les valeurs saisies, les traite, les valide et les affiche dans la section des résultats
function afficherResultats(formulaire, selectSuccursale) {
  //les noms des valeurs à traiter
  const sectionsAAficher = [
    "nom",
    "email",
    "phone",
    "adresse",
    "ville",
    "code_posatal",
    "date",
    "livraison",
    "succursale",
    "canadapost",
    "fedex",
    "dhl",
  ];

  //section résultats:
  const resultatsSection = document.querySelector(".resultats");
  //les balises de span dont doivent être remplies avec les valeurs nécessaires
  const spans = resultatsSection.querySelectorAll("[data-name]");

  //règle de validation
  const validationRegles = {
    nom: /^[a-zA-Z\s]+$/,
    email: /^\S+@\S+\.\S+$/,
    phone: /^\d{10}$/,
    adresse: /\S+/,
    ville: /\S+/,
    code_posatal: /^\d{5}$/,
    date: /\S+/,
  };

  /**
  Nom: "John Doe"
  Email: "john@example.com"
  Tel: "1234567890"
  Adresse: "123 Main Street"
  Ville: "New York"
  Code Postal: "12345"
  Date: "2024-04-24" (YYYY-MM-DD)
  */

  //par défaut, la validation est correcte
  let isValid = true;

  spans.forEach(function (span) {
    //attribuer l'attribut "data-name" à la constante dataName
    const dataName = span.getAttribute("data-name");
    //s'il y a des valeurs d'attribut de nom de données dans la table sectionsAAficher
    if (sectionsAAficher.includes(dataName)) {
      const input = formulaire.querySelector(`[name=${dataName}]`);
      if (input) {
        //La valeur dans le champ
        const value = input.value;
        const validationRegle = validationRegles[dataName];
        //vérifier si la valeur correspond à la règle de validation
        // sinon, alors la classe d'erreur est ajoutée, si elle est valide, alors la classe n'est pas ajoutée
        if (validationRegle) {
          if (!value.match(validationRegle)) {
            isValid = false;
            input.classList.add("error");
          } else {
            input.classList.remove("error");
          }
        }
      }
    }
  });

  if (isValid) {
    // si toutes les valeurs sont valides
    resultatsSection.style.display = "block";
  } else {
    // /si toutes les valeurs sont invalides
    resultatsSection.style.display = "none";
  }
}

function checkboxChangementClick(
  formulaire,
  checkbox,
  selectSuccursale,
  livraisonChoix
) {
  //par default checkbox:
  const isChecked = checkbox.checked;

  //Réinitialiser l'index sélectionné de l'élément select
  selectSuccursale.selectedIndex = 0;

  // Décochez tous les boutons radio
  livraisonChoix.forEach(function (radio) {
    radio.checked = false;
  });

  // Désactivez ou activez l'élément de sélection et les boutons radio en fonction de l'état de la case à cocher
  selectSuccursale.disabled = !isChecked;
  livraisonChoix.forEach(function (radio) {
    radio.disabled = isChecked;
  });

  // Afficher les résultats
  afficherResultats(formulaire, selectSuccursale);
}

function radioChangementClick(radio) {
  // Désélectionne tous les autres boutons radio
  const livraisonChoix = document.querySelectorAll('input[type="radio"]');
  livraisonChoix.forEach(function (choix) {
    if (choix !== radio) {
      choix.checked = false;
    }
  });

  const name = radio.getAttribute("data-name");
  const isChecked = radio.checked;
  const compagnieConfirmation = document.querySelector("#compagnie_choix");

  if (isChecked) {
    compagnieConfirmation.textContent = "Par: " + name; // Afficher le nom dans la section de confirmation
    compagnieConfirmation.classList.remove("invisible");
    compagnieConfirmation.classList.add("visible");
  } else {
    compagnieConfirmation.textContent = ""; // Effacer le contenu du texte
    compagnieConfirmation.classList.remove("visible");
    compagnieConfirmation.classList.add("invisible");
  }
}

// Call the init function when the DOM is loaded
init();
