/*
Pour créer les règles de validation Regex, j'ai utilisé ce site Web. Je voulais créer un modèle de validation aussi réaliste et valide que possible pour différents scénarios. J'avais des scénarios de validation de cartes VISA, MASTERCARD et American Express, des noms de villes, qui sont constitués d'espaces ou de "-", de numéros de téléphone, au format international, ce que je ne pouvais pas faire moi-même et j'ai utilisé cet outil:
https://zzzcode.ai/regex/generator?id=6b9545c8-f640-4139-856f-dfec2d5d80b7&mode=edit

Sous la fonction validateInput j'ai mis les valeurs des champs, vous pouvez simplement les copier et les placer dans les champs du formulaire.
*/

/**la fonction validateInput():
 *paramètres: inputName, inputValue
 *inputName - le nom de l'entrée en paramètres, pour trouver une entrée spécifique où la valeur a été saisie
 *inputValue - la valeur de l'entrée, en fonction de ce que nous ferons la validation
 *J'ai utilisé un switch case, pour décrire les cas de validation, au lieu de if else, pour une meilleure lisibilité du code
 * */

function validateInput(inputName, inputValue) {
  switch (inputName) {
    case "nom":
      return /^\s*[A-Za-z\s-]+\s*$/.test(inputValue);
    case "email":
      return /^\s*\S+@\S+\.\S+\s*$/.test(inputValue);
    case "phone":
      return /^\s*\+\d{1,3}(?:\s?\d{3}){3}\s*$/.test(inputValue);
    case "adresse":
      return /^\s*\d{1,6}\s(?:[A-Za-z]+(?:-[A-Za-z]+)?\s?){1,5}[A-Za-z]+\s*$/.test(
        inputValue
      );
    case "ville":
      return /^\s*[A-Z][a-z]+(?:-[A-Z][a-z]+)?(?:\s[A-Z][a-z]+(?:-[A-Z][a-z]+)?){0,3}\s*$/.test(
        inputValue
      );
    case "code_postal":
      return /^\s*[A-Za-z]\d[A-Za-z]\s*\d[A-Za-z]\d\s*$/.test(inputValue);
    case "date":
      return /^\s*(2024)-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])\s*$/.test(
        inputValue
      );
    case "carte_nom":
      return /^\s*[A-Za-z\s-]+\s*$/.test(inputValue);
    case "carte_nombre":
      return /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13})$/.test(
        inputValue
      );
    case "carte_expiration":
      return /^\s*((0[5-9])|(1[0-2]))\/((2[4-9])|(3[0-5]))\s*$/.test(
        inputValue
      );
    case "card_cvc":
      return /^\s*\d{3,4}\s*$/.test(inputValue);

    default:
      return true;
  }
}

/*Si vous souhaitez voir la fonctionnalité du formulaire, pour votre commodité de ne pas saisir la bonne valeur à chaque fois, vous pouvez simplement commenter les cas dans cette fonction */

/*Valeurs pour le formulaire copier-coller*/

/**Étape 1*/
/**
 * Nom complet - Maxime Lacasse-Germaine
 * Adresse - 528 Rue Pix-IX    -> (Tout d’abord, il y aura un nombre de 1 à 5 chiffres suivi de deux à 5 mots. Il est possible d'utiliser "-")
 * Courriel  - maxime.maisonneuve@gmail.com
 * Ville - Toronto   -> (D'un mot à 5. Il est possible d'utiliser "-". Chaque mot commence par une majuscule)
 * Numero de telephone - +14295678900   -> (le modèle est valable pour les codes internationaux de +1 à +999)
 * Code postal - A1B 2C3  -> (Code postal canadien, avec un espace, ou non)
 */

/**Étape 2*/
/**
 *  Date - 2024-04-25   -> (L'année n'est valable que pour 2024)
 *  L'utilisateur sélectionnera le service de livraison en sélectionnant le bouton radio approprié ou cochera la case et sélectionnera la succursale
 *
 */

/**Étape 3*/
/**
 * Le nom complet sur la carte - Maxime Lacasse-Germaine
 * Le paiement s'effectue par VISA, Mastercard ou American Express
 * Numéro de Carte - 5105105105105100  -> (sans espaces)
 * Date d'expiration  - 08/25  -> (pour les cartes valables uniquement du 05/24 au 12/35)
 * Code de sécurité - 123  ou  1234  -> (de 3 à 4 chiffres)
 */
