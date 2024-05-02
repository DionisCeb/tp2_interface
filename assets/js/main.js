// Variables
let currentIndex = 0; // Index actuel
let currentSection = undefined; // Section actuelle (initialisée à undefined)

// Éléments HTML
const formulaire = document.querySelector("#formulaire-comande"); // Formulaire
const checkboxSuccursale = document.querySelector("#checkboxSuccursale"); // Case à cocher pour succursale
const selectSuccursale = document.querySelector("#succursale"); // Sélecteur pour succursale
// Sélection d'éléments
const sections = document.querySelectorAll("section"); // Sections
const boutons = document.querySelectorAll("button[data-direction]"); // Boutons avec attribut data-direction
const livraisonChoix = document.querySelectorAll(
  'input[type="radio"][name="serviceLivraison"]' // ---> les elements <input> de type radio qui ont l'attribut name egal a "serviceLivraison"
); // Choix de livraison (boutons radio)
// Valeurs des entrées du formulaire
// Objet pour stocker les valeurs des champs du formulaire
const valeursChamps = {};

// Fonction pour collecter les valeurs des champs du formulaire
function colecteValeursChamps() {
  // Sélectionner tous les éléments input dans le formulaire
  let inputs = currentSection.querySelectorAll(
    'input:not([type="checkbox"]):not([type="radio"])' // --> éléments <input> qui ne sont ni de type checkbox ni de type radio.
  );

  // Parcourir chaque élément input
  inputs.forEach(function (input) {
    let inputName = input.name;
    let inputValue = input.value;
    // Ajouter le nom de l'input et sa valeur à l'objet valeursChamps
    valeursChamps[inputName] = inputValue;
  });

  if (currentIndex == 1) {
    if (checkboxSuccursale.isChecked) {
      // Si la case à cocher pour la livraison en succursale est cochée
      valeursChamps["livraisonMagasin"] = 1; // on indique si la livraison se fait en magasin
      valeursChamps["succursaleOption"] = selectSuccursale.selectedOption; // Option selectionnee pour la livraison en succursale
      valeursChamps["succursaleText"] =
        selectSuccursale.options[selectSuccursale.selectedIndex].text; //Texte de l'option selectionnee pour la livraison en succursale
    } else {
      // Sinon, parcourir les choix de livraison pour trouver celui sélectionné
      livraisonChoix.forEach(function (choix) {
        if (choix.checked) {
          // Si une option de livraison est sélectionnée,on ajoute le texte de cette option aux valeurs collectées
          valeursChamps["serviceLivraisonText"] = choix.value;
        }
      });
    }
  }
}

// Fonction pour valider tous les champs de la section actuelle
//Cette fonction valide tous les champs de saisie dans la section actuelle du formulaire. Elle vérifie si les champs sont remplis correctement et ajoute une classe d'erreur aux champs invalides.
//Il a une logique de validation différente pour la section 2 !
function validerChampsSection() {
  let inputsAreValid = true;

  // Valider tous les inputs dans la section actuelle
  currentSection
    .querySelectorAll('input:not([type="checkbox"]):not([type="radio"])') //// Tous les éléments <input> qui ne sont ni de type checkbox ni de type radio!!!
    .forEach((input) => {
      let inputName = input.getAttribute("name"); //le nom de l'element
      let inputValue = input.value; // la valeur de l'element
      //si la saisie est valide:
      if (!validateInput(inputName, inputValue)) {
        // Si la saisie est invalide, on marque l'element avec une classe d'erreur
        inputsAreValid = false;
        input.classList.add("error");
      } else {
        input.classList.remove("error");
      }
    });

  //ici on ajoute la logique de validation de la case a cocher pour selectionner la livrason sur la page 2
  if (currentIndex == 1) {
    if (checkboxSuccursale.checked) {
      // Si la case à cocher pour la livraison en magasin est cochée
      inputsAreValid =
        selectSuccursale.options[selectSuccursale.selectedIndex].value !== "";
    } else {
      // Sinon, si la case à cocher pour la livraison en magasin n'est pas cochée
      let serviceLivraison = currentSection.querySelector(
        'input[type="radio"][name="serviceLivraison"]:checked'
      );
      if (!serviceLivraison) {
        //!!!Si aucune option de livraison n'est sélectionnée, ls champs ne sont pas valides
        inputsAreValid = false;
      }
    }
  }
  //si tous les champs de la section actuelle du formulaire sont valides ou non
  return inputsAreValid;
}

// Fonction pour afficher une section
//Cette fonction prend un paramètre index
//Elle retire la classe "active-section" de la section actuelle, puis ajoute cette classe à la nouvelle section correspondant à l'index donné.
//Inspiré de l'exemple du cours 10
function afficherSection(index) {
  currentSection = sections[currentIndex];
  //Déseléctionne la section actuelle en lui retirant la classe "active-section"
  currentSection.classList.remove("active-section");
  // Sélectionne la nouvelle section à afficher par son index et lui ajoute la classe "active-section"
  sections[index].classList.add("active-section");

  //on affiche les résultats finale sur la dernière page
  if (index == sections.length - 1) {
    afficherResultats();
  }

  //on redéfinit la section current
  currentSection = sections[index];
  currentIndex = index;
}

// Fonction pour passer à la section suivante
function avancerSection() {
  // Valider tous les inputs dans la section actuelle
  let inputsAreValid = validerChampsSection();

  // Si tous les inputs sont valides, passer à la section suivante
  if (inputsAreValid) {
    // Mise à jour initiale lorsque la page se charge
    colecteValeursChamps();
    // Procéder à l'affichage de la page suivante
    afficherSection(currentIndex + 1);
  }
}

// Fonction pour revenir à la section précédente
function reculerSection() {
  afficherSection(currentIndex - 1);
}

// Initialisation  - Fonction de chargement de page!
function init() {
  // Boutons
  //Inspiré de l'exemple du cours 10
  boutons.forEach(function (bouton) {
    bouton.addEventListener("click", function () {
      let direction = parseInt(bouton.dataset.direction);
      if (direction > 0) {
        avancerSection();
      } else {
        reculerSection();
      }
    });
  });

  //on initialise la forme et affiche la première section
  afficherSection(currentIndex);

  // Le sélecteur est désactivé par défaut
  selectSuccursale.disabled = true;

  // // Gérer le changement de la case à cocher pour la succursale
  checkboxSuccursale.addEventListener("change", function () {
    checkboxChangementClick(this);
  });
}

// Fonction pour afficher les valeurs collectées dans la section des résultats
function afficherResultats() {
  let resultatsSection = document.querySelector(".resultats"); // Section des résultats
  let spanResultats = resultatsSection.querySelectorAll("[data-name]"); // Tous les éléments avec attribut data-name

  //on affiche le valeurs de champs selectees
  spanResultats.forEach(function (span) {
    let dataName = span.getAttribute("data-name");
    // Vérifier si le nom de l'input existe dans les valeurs collectées
    if (valeursChamps[dataName] !== undefined) {
      span.textContent = valeursChamps[dataName];
    } else {
      // Gérer le cas où le nom de l'input ne correspond à aucune valeur collectée
      span.textContent = ""; // Effacer la section des résultats pour cet input
    }
  });

  //on affiche l'option choisi du livraison
  afficherOptionLivraisonText();
}

// Fonction pour générer le texte de l'option de livraison
//Si l'option de livraison en succursale est sélectionnée, elle affiche le texte spécifiant le magasin de récupération du produit. Sinon, elle affiche le texte spécifiant le service de livraison sélectionné.
function afficherOptionLivraisonText() {
  let blockLivraison = document.querySelector("#livraison_choix");

  // Si l'option de livraison en succursale est sélectionnée
  if (valeursChamps["livraisonMagasin"] !== undefined) {
    //// Affiche le texte spécifiant le magasin
    blockLivraison.textContent =
      "Le produit est prêt à être récupéré au magasin de: " +
      valeursChamps["succursaleText"];
  } else {
    //SINON, affiche le texte spécifiant le service de livraison sélectionné
    blockLivraison.textContent =
      "Par: " + valeursChamps["serviceLivraisonText"];
  }
}

// Fonction pour gérer le changement de la case à cocher pour la succursale
function checkboxChangementClick(checkbox) {
  // État par défaut de la case à cocher
  const isChecked = checkbox.checked;
  // Réinitialiser l'index sélectionné de l'élément select
  selectSuccursale.selectedIndex = 0;

  // Désactiver ou activer l'élément select et les boutons radio en fonction de l'état de la case à cocher
  selectSuccursale.disabled = !isChecked;
  livraisonChoix.forEach(function (radio) {
    radio.disabled = isChecked;
  });
}

// Appeler la fonction d'initialisation
init();

//C'était une longue nuit :)
