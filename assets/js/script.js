function avancerSection() {
  const sections = document.querySelectorAll("section");
  const currentSection = document.querySelector(".active-section");
  const currentIndex = Array.from(sections).indexOf(currentSection);

  if (currentIndex < sections.length - 1) {
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
      return /^[a-zA-Z\s]+$/.test(value);
    case "email":
      return /^\S+@\S+\.\S+$/.test(value);
    case "phone":
      return /^\d{10}$/.test(value);
    case "adresse":
      return /^[a-zA-Z\s]+$/.test(value);
    case "ville":
      return /^[a-zA-Z\s]+$/.test(value);
    case "code_postal":
      return /^[a-zA-Z\s]+$/.test(value);
    default:
      return true;
  }
}

// Affichage des resultats:
function afficherResultats(formulaire, selectSuccursale) {
  const resultatsSection = document.querySelector(".resultats");
  const spans = resultatsSection.querySelectorAll("[data-name]");

  // Validation par default
  let isValid = true;

  spans.forEach(function (span) {
    const dataName = span.getAttribute("data-name");
    const input = formulaire.querySelector(`[name=${dataName}]`);
    if (input) {
      const value = input.value;
      const isValidValue = validateInput(dataName, value);
      span.textContent = value;
      if (!isValidValue) {
        isValid = false;
        input.classList.add("error");
      } else {
        input.classList.remove("error");
      }
    }
  });

  const lastSection = document.querySelector("section:last-of-type");
  /* 
  if (isValid) {
    resultatsSection.classList.add("active-section");
    lastSection.classList.add("active-section");
  } else {
    resultatsSection.classList.remove("active-section");
    lastSection.classList.remove("active-section");
  } */
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
