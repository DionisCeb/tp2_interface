function avancerSection() {
  const sections = document.querySelectorAll("section");
  const currentSection = document.querySelector(".active-section");
  const currentIndex = Array.from(sections).indexOf(currentSection);
  let inputsAreValid = true;

  // Validate all inputs in the current section
  currentSection.querySelectorAll("input").forEach((input) => {
    const inputName = input.getAttribute("name");
    const inputValue = input.value;
    if (!validateInput(inputName, inputValue)) {
      inputsAreValid = false;
      input.classList.add("error");
    } else {
      input.classList.remove("error");
    }
  });

  // If all inputs are valid, proceed to the next section
  if (inputsAreValid && currentIndex < sections.length - 1) {
    currentSection.classList.remove("active-section");
    sections[currentIndex + 1].classList.add("active-section");
  }
}

function reculerSection() {
  const sections = document.querySelectorAll("section");
  const currentSection = document.querySelector(".active-section");
  const currentIndex = Array.from(sections).indexOf(currentSection);

  if (currentIndex > 0) {
    currentSection.classList.remove("active-section");
    sections[currentIndex - 1].classList.add("active-section");
  }
}

function init() {
  // Sélection d'éléments
  const formulaire = document.querySelector("#formulaire-comande");
  const checkboxSuccursale = document.querySelector("#checkboxSuccursale");
  const selectSuccursale = document.querySelector("#succursale");
  const livraisonChoix = document.querySelectorAll('input[type="radio"]');
  const boutons = document.querySelectorAll("button[data-direction]");

  //les boutons:
  boutons.forEach(function (bouton) {
    bouton.addEventListener("click", function () {
      const direction = parseInt(bouton.dataset.direction);
      if (direction > 0) {
        avancerSection();
      } else {
        reculerSection();
      }
    });
  });

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

/// Regles de la validation:
function validateInput(inputName, value) {
  switch (inputName) {
    case "nom":
      return /^[A-Z][a-z]+\s[A-Z][a-z]+$/.test(value);
    case "email":
      return /^\S+@\S+\.\S+$/.test(value);
    case "phone":
      return /^\+\d{1,3}(?:\s?\d{3}){3}$/.test(value);
    case "adresse":
      return /^\d{1,6}\s(?:[A-Za-z]+(?:-[A-Za-z]+)?\s?){1,5}[A-Za-z]+$/.test(
        value
      );
    case "ville":
      return /^[A-Z][a-z]+(?:-[A-Z][a-z]+)?(?:\s[A-Z][a-z]+(?:-[A-Z][a-z]+)?){0,3}$/.test(
        value
      );
    case "code_postal":
      return /^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/.test(value);
    case "date":
      return /^(2024)-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/.test(value);
    case "carte_nom":
      return /^[A-Z][a-z]+\s[A-Z][a-z]+$/.test(value);
    case "carte_nombre":
      return /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13})$/.test(
        value
      );
    case "carte_expiration":
      return /^((0[5-9])|(1[0-2]))\/((2[4-9])|(3[0-5]))$/.test(value);
    case "card_cvc":
      return /^\d{3,4}$/.test(value);

    default:
      return true;
  }
}

// Affichage des resultats:
function afficherResultats(formulaire, selectSuccursale) {
  const resultatsSection = document.querySelector(".resultats");
  const spans = resultatsSection.querySelectorAll("[data-name]");
  let isValid = true; // Track overall validity of all sections

  spans.forEach(function (span) {
    const dataName = span.getAttribute("data-name");
    const input = formulaire.querySelector(`[name=${dataName}]`);
    if (input) {
      const value = input.value;
      const isValidValue = validateInput(dataName, value);
      span.textContent = value;
      if (!isValidValue) {
        isValid = false; // If any input is invalid, set isValid to false
        input.classList.add("error");
      } else {
        input.classList.remove("error");
      }
    }
  });

  // Apply or remove "active-section" class based on overall validity
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
// Fonction de mise à jour de la confirmation de succursale
function updateSuccursaleConfirmation(selectElement) {
  const selectedOption =
    selectElement.options[selectElement.selectedIndex].text;
  const succursaleConfirmation = document.querySelector(
    "[data-name='succursale']"
  );

  // Mettre à jour le contenu du <span> de confirmation de succursale
  succursaleConfirmation.textContent = selectedOption;

  // Afficher ou masquer succursale_choix selon qu'une valeur est sélectionnée ou non
  const succursaleChoixText = document.querySelector("#succursale_choix");
  if (selectedOption !== "Sélectionner un magasin") {
    succursaleChoixText.style.display = "block";
  } else {
    succursaleChoixText.style.display = "none";
  }
}

// Appel de la fonction init:
init();
