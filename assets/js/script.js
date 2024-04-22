document.addEventListener("DOMContentLoaded", function () {
  const formulaire = document.querySelector("#formulaire-comande");
  const checkboxSuccursale = document.getElementById("checkboxSuccursale");
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
    handleCheckboxChange(checkboxSuccursale, selectSuccursale, livraisonChoix);
  });

  // Handle radio button change for livraisonChoix
  livraisonChoix.forEach(function (radio) {
    radio.addEventListener("change", function () {
      handleRadioChange(radio);
    });
  });

  // Initial update when page loads
  updateResults(formulaire, selectSuccursale);
});

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

  spans.forEach(function (span) {
    const dataName = span.getAttribute("data-name");
    if (sectionsToDisplay.includes(dataName)) {
      const input = formulaire.querySelector(`[name=${dataName}]`);
      if (input) {
        if (input.type === "checkbox") {
          span.textContent = input.checked ? "Oui" : "Non";
        } else if (input.tagName === "SELECT") {
          const selectedOption = input.options[input.selectedIndex];
          span.textContent = selectedOption ? selectedOption.textContent : "";
        } else {
          span.textContent = input.value;
        }
      }
    }
  });

  // Hide the <p> element containing the span with data-name="succursale" if no option is selected
  const succursaleParagraph = document.querySelector("#succursaleParagraph");
  if (selectSuccursale.selectedIndex === 0) {
    // Assuming the first option is the default empty option
    if (succursaleParagraph) {
      succursaleParagraph.classList.add("invisible");
    }
  } else {
    if (succursaleParagraph) {
      succursaleParagraph.classList.remove("invisible");
    }
  }
}

function handleCheckboxChange(checkbox, selectSuccursale, livraisonChoix) {
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
