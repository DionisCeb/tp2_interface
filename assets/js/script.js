function init() {
  const formulaire = document.querySelector("#formulaire-comande");
  const checkboxSuccursale = document.querySelector("#checkboxSuccursale");
  const selectSuccursale = document.querySelector("#succursale");
  const livraisonChoix = document.querySelectorAll('input[type="radio"]');

  // SelectSuccursale disabled by default
  selectSuccursale.disabled = true;

  // Update results when any input changes
  formulaire.addEventListener("change", function () {
    updateResults(formulaire, selectSuccursale);
  });

  // Handle checkbox change for succursale
  checkboxSuccursale.addEventListener("change", function () {
    handleCheckboxChange(
      formulaire,
      checkboxSuccursale,
      selectSuccursale,
      livraisonChoix
    );
  });

  // Handle radio button change for livraisonChoix
  livraisonChoix.forEach(function (radio) {
    radio.addEventListener("change", function () {
      handleRadioChange(radio);
    });
  });

  // Initial update when page loads
  updateResults(formulaire, selectSuccursale);
}

function updateResults(formulaire, selectSuccursale) {
  const sectionsToDisplay = [
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

  const resultatsSection = document.querySelector(".resultats");
  const spans = resultatsSection.querySelectorAll("[data-name]");

  const validationRules = {
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
  Phone: "1234567890"
  Adresse: "123 Main Street"
  Ville: "New York"
  Code Postal: "12345"
  Date: "2024-04-24" (YYYY-MM-DD)
  */

  let isValid = true;

  spans.forEach(function (span) {
    const dataName = span.getAttribute("data-name");
    if (sectionsToDisplay.includes(dataName)) {
      const input = formulaire.querySelector(`[name=${dataName}]`);
      if (input) {
        const value = input.value.trim();
        const validationRule = validationRules[dataName];
        if (validationRule && !validationRule.test(value)) {
          isValid = false;
          input.classList.add("error");
        } else {
          input.classList.remove("error");
        }
      }
    }
  });

  if (isValid) {
    // Display the results if all inputs pass validation
    resultatsSection.style.display = "block";
  } else {
    // Hide the results if any input fails validation
    resultatsSection.style.display = "none";
  }
}

function handleCheckboxChange(
  formulaire,
  checkbox,
  selectSuccursale,
  livraisonChoix
) {
  const isChecked = checkbox.checked;

  // Reset the selected index of the select element
  selectSuccursale.selectedIndex = 0;

  // Uncheck all the radio buttons
  livraisonChoix.forEach(function (radio) {
    radio.checked = false;
  });

  // Disable or enable the select element and radio buttons based on the checkbox state
  selectSuccursale.disabled = !isChecked;
  livraisonChoix.forEach(function (radio) {
    radio.disabled = isChecked;
  });

  // Update results after clearing the selections
  updateResults(formulaire, selectSuccursale);
}

function handleRadioChange(radio) {
  // Deselect all other radio buttons
  const livraisonChoix = document.querySelectorAll('input[type="radio"]');
  livraisonChoix.forEach(function (choice) {
    if (choice !== radio) {
      choice.checked = false;
    }
  });

  const name = radio.getAttribute("data-name");
  const isChecked = radio.checked;
  const compagnieConfirmation = document.querySelector(
    "#compagnieConfirmationParagraph"
  );

  if (isChecked) {
    compagnieConfirmation.textContent = "Par: " + name; // Display the name in confirmation section
    compagnieConfirmation.classList.remove("invisible");
    compagnieConfirmation.classList.add("visible");
  } else {
    compagnieConfirmation.textContent = ""; // Clear the text content
    compagnieConfirmation.classList.remove("visible");
    compagnieConfirmation.classList.add("invisible");
  }
}

// Call the init function when the DOM is loaded
document.addEventListener("DOMContentLoaded", init);
