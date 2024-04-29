function init() {
  // Sélection d'éléments
  const formulaire = document.querySelector("#formulaire-comande");
  const checkboxSuccursale = document.querySelector("#checkboxSuccursale");
  const selectSuccursale = document.querySelector("#succursale");
  const livraisonChoix = document.querySelectorAll('input[type="radio"]');

  // La sélection est inactive par défaut (selectSuccursale)
  selectSuccursale.disabled = true;

  // Mettre à jour les résultats lorsqu'une entrée change
  formulaire.addEventListener("change", function () {
    afficherResultats(formulaire, selectSuccursale);
    updateSuccursaleConfirmation(selectSuccursale);
  });

  // Gérer le changement de case à cocher pour la succursale
  checkboxSuccursale.addEventListener("change", function () {
    checkboxChangementClick(
      formulaire,
      checkboxSuccursale,
      selectSuccursale,
      livraisonChoix
    );
    updateSuccursaleConfirmation(selectSuccursale);
  });

  // Gérer le changement de case à cocher pour la livraisonChoix
  livraisonChoix.forEach(function (radio) {
    radio.addEventListener("change", function () {
      radioChangementClick(radio);
    });
  });

  // Mise à jour initiale au chargement de la page
  afficherResultats(formulaire, selectSuccursale);
  updateSuccursaleConfirmation(selectSuccursale);
}

// La fonction qui reçoit les valeurs saisies, les traite, les valide et les affiche dans la section des résultats
function afficherResultats(formulaire, selectSuccursale) {
  // Les noms des valeurs à traiter
  const sectionsAAficher = [
    "nom",
    "email",
    "phone",
    "adresse",
    "ville",
    "code_postal", // Updated attribute name
    "date",
    "livraison",
    "succursale",
    "canadapost",
    "fedex",
    "dhl",
  ];

  // Section résultats
  const resultatsSection = document.querySelector(".resultats");
  // Les balises de span dont doivent être remplies avec les valeurs nécessaires
  const spans = resultatsSection.querySelectorAll("[data-name]");

  // Par défaut, la validation est correcte
  let isValid = true;

  // Règles de validation
  const validationRegles = {
    nom: /^[a-zA-Z\s]+$/,
    email: /^\S+@\S+\.\S+$/,
    phone: /^\d{10}$/,
    adresse: /\S+/,
    ville: /\S+/,
    code_postal: /^\d{5}$/, // Updated attribute name
    date: /\S+/,
  };

  spans.forEach(function (span) {
    // Attribuer l'attribut "data-name" à la constante dataName
    const dataName = span.getAttribute("data-name");
    // S'il y a des valeurs d'attribut de nom de données dans la table sectionsAAficher
    if (sectionsAAficher.includes(dataName)) {
      const input = formulaire.querySelector(`[name=${dataName}]`);
      if (input) {
        // La valeur dans le champ
        const value = input.value;
        const validationRegle = validationRegles[dataName]; // Règle de validation spécifique pour le champ
        // Vérifier si la valeur correspond à la règle de validation
        // Sinon, alors la classe d'erreur est ajoutée, si elle est valide, alors la classe n'est pas ajoutée
        if (validationRegle) {
          if (!value.match(validationRegle)) {
            isValid = false;
            input.classList.add("error");
          } else {
            input.classList.remove("error");
          }
        }
        // Mettre à jour le contenu du span correspondant avec la valeur du champ
        span.textContent = value;
      }
    }
  });

  if (isValid) {
    // Si toutes les valeurs sont valides
    resultatsSection.style.display = "block";
  } else {
    // Si toutes les valeurs sont invalides
    resultatsSection.style.display = "none";
  }
}

function checkboxChangementClick(
  formulaire,
  checkbox,
  selectSuccursale,
  livraisonChoix
) {
  // Par défaut checkbox
  const isChecked = checkbox.checked;

  // Réinitialiser l'index sélectionné de l'élément select
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

// Fonction pour mettre à jour la confirmation de succursale
function updateSuccursaleConfirmation(selectElement) {
  const selectedOption =
    selectElement.options[selectElement.selectedIndex].text;
  const succursaleConfirmation = document.querySelector(
    "[data-name='succursale']"
  );

  // Mettre à jour le contenu du span de confirmation de succursale
  succursaleConfirmation.textContent = selectedOption;
}

// Call
init();
