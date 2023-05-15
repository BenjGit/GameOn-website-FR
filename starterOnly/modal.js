function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const submitBtn = document.querySelector(".btn-submit");
const modalBtn = document.querySelectorAll(".modal-btn");
const closeBtn = document.querySelectorAll(".close"); // add close btn
const formData = document.querySelectorAll(".formData");
const modalBody = document.querySelector('.modal-body');
const confirmation = document.getElementById('confirmation');
const form = document.querySelector('form');
//launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
//close modal event
closeBtn.forEach((btn) => btn.addEventListener("click", closeModal));

submitBtn.addEventListener("click", validate);

function launchModal() {
  modalbg.style.display = "block";
}
// close modal form
function closeModal(){
  modalbg.style.display = "none";
  confirmation.style.display = "none";
  //réinitialiser le bouton fermer en bouton c'est parti pour pouvoir envoyer le formulaire
  form.style.visibility = "visible";
  submitBtn.value = "C'est parti";
  submitBtn.removeEventListener("click", closeModal);
  submitBtn.addEventListener("click", validate);
}
/**
 * 
 * @param {*} birthdate année de naissance 
 * @returns {int} retourne l'age 
 */
function getAge(birthdate){
  const today = new Date();

  const yearsDiff = today.getFullYear() - birthdate.getFullYear();
  const monthsDiff = today.getMonth() - birthdate.getMonth();
  const daysDiff = today.getDate() - birthdate.getDate();

  let age = yearsDiff
  //monthsDiff < 0 revient à dire si le mois d'ajd est inférieure au mois de naissance 
  //(monthsDiff === 0 && daysDiff < 0) revient à dire si le mois d'ajd est le même que celui de naissance et que le jour d'ajd est inférieur à celui de naissance
  if(monthsDiff < 0 || (monthsDiff === 0 && daysDiff < 0))
  {
    age--;
  }
  return age;
}

/**
 * permet d'afficher un message d'erreur
 * @param {string} $errorMessage
 * choisir la balise dans laquelle afficher le message d'erreur 
 * @param {string} $divErrorName 
 */
function displayError($errorMessage , $divErrorName){
  const errorMessage = $errorMessage;
  $divErrorName.setAttribute("data-error", errorMessage); 
  $divErrorName.setAttribute("data-error-visible", "true");
}
/**
 * 
 * @param {*} event 
 * @returns //
 */
function validate(event) {
  
    const firstName = document.getElementById("first").value;
    const firstNameSpace = firstName.split(' ');
    const firstNameError = document.getElementById('firstError');
    const lastName = document.getElementById('last').value;
    const lastNameSpace = lastName.split(' ');
    const lastNameError = document.getElementById('lastError');
    const birthdate = document.getElementById('birthdate').value;
    const birthdateError = document.getElementById('birthdateError');
    const email = document.getElementById('email').value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailError = document.getElementById('emailError');
    const nbTournament =document.getElementById('quantity');
    const nbTournamentError = document.getElementById('nbTournamentError');
    const radios = document.getElementsByName('location');
    const locationError = document.getElementById('locationError');
    const termsAndConditions = document.getElementById('checkbox1');
    const termsError = document.getElementById('termsError');

    let isValid = true;
    
    // Réinitialiser l'affichage des messages d'erreur
    firstNameError.setAttribute("data-error-visible", "false");
    lastNameError.setAttribute("data-error-visible", "false");
    emailError.setAttribute("data-error-visible", "false");
    birthdateError.setAttribute("data-error-visible", "false");
    nbTournamentError.setAttribute("data-error-visible", "false");
    locationError.setAttribute("data-error-visible", "false");
    termsError.setAttribute("data-error-visible", "false");

    //vérifie si le prenom est compris entre 2 et 50 caractères ou si il n'a pas plus de deux espace ou si il ne commence ou ne fini pas par un espace
    if(firstName.length < 2 || firstName.length >50 || firstNameSpace.length > 2 || firstName.trim() !== firstName){
      displayError("Veuillez entrer 2 caractères ou plus pour le prénom", firstNameError);
      event.preventDefault();//empêcher l'envoi car il y a une erreur
      isValid = false;
    }

    if(lastName.length < 2 || lastName.length > 50 || lastNameSpace.length > 2 || lastName.trim() !== lastName){
      displayError("Veuillez entrer 2 caractères ou plus pour le nom", lastNameError);
      event.preventDefault();
      isValid = false;
    }

    if(!emailRegex.test(email) || email ==""){
      displayError('Veuillez entrer une adresse email valide', emailError);
      event.preventDefault();
      isValid = false;
    }

    if(!birthdate){
      displayError('Veuillez entrer votre date de naissance', birthdateError);
      event.preventDefault();
      isValid = false;
    }
    else if(getAge(new Date(birthdate)) < 18 ){
      displayError('Vous devez être majeur pour vous inscrire', birthdateError);
      event.preventDefault();
      isValid = false;
    }
     
    if(nbTournament.value === '')
    {
      nbTournament.defaultValue = 0;
    }
    
    else if(nbTournament.value < 0 || nbTournament.value > 99){
      displayError("Veuillez entrer un nombre entre 0 et 99", nbTournamentError);
      event.preventDefault();
      isValid = false;
    }

    let numChecked = 0;
    for (let i = 0; i < radios.length; i++){
        if(radios[i].checked){
          numChecked++
        }
    }

    if (numChecked !==1) {
      displayError('Veuillez choisir une option', locationError);
      event.preventDefault();
      isValid = false;
    }
    
    if(!termsAndConditions.checked){
      displayError('Vous devez acceptez les termes et conditions.', termsError);
      event.preventDefault();
      isValid = false;
    } 

    if (!isValid) {
      event.preventDefault();
    } else {
      form.reset();
      modalbg.style.display = "none";
      form.style.visibility= "hidden"// masquer le formulaire pour garder sa forme 
      confirmation.style.display = "flex";//afficher le message de confirmation au milieu
      submitBtn.value = "Fermer";// changer le nom du bouton submit "c'est parti" en "Fermer"
      submitBtn.removeEventListener("click", validate);//enlever la fonction validate au bouton
      submitBtn.addEventListener("click", closeModal);// ajouter la fonction closemodal au bouton fermer
      event.preventDefault();
      setTimeout(() => {
        launchModal();
      }, 200);// ajouter un léger delai avant d'afficher le message de validation
    }
    
}
