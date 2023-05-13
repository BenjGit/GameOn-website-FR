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
const confirmation = document.querySelector('[data-success=confirmation]');
// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
//close modal event
closeBtn.forEach((btn) => btn.addEventListener("click", closeModal));

submitBtn.addEventListener("click", (event) => validate(event));


function launchModal() {
  modalbg.style.display = "block";
}
// close modal form
function closeModal(){
  modalbg.style.display = "none";
  confirmation.style.display = "none";
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
   
    const form = document.querySelector('form');
    const firstName = document.getElementById("first").value;
    const firstNameError = document.getElementById('firstError');
    const lastName = document.getElementById('last').value;
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
    
    // Réinitialiser l'affichage des messages d'erreur
    firstNameError.setAttribute("data-error-visible", "false");
    lastNameError.setAttribute("data-error-visible", "false");
    emailError.setAttribute("data-error-visible", "false");
    birthdateError.setAttribute("data-error-visible", "false");
    nbTournamentError.setAttribute("data-error-visible", "false");
    locationError.setAttribute("data-error-visible", "false");
    termsError.setAttribute("data-error-visible", "false");

    if(firstName.length < 2 || firstName.length >50){
      displayError('Veuillez entrer 2 caractères ou plus pour le prénom.', firstNameError);
      event.preventDefault();//empêcher l'envoi car il y a une erreur
      return; //sortir de la fonction pour empêcher le reste du code d'être éxécuté
    }

    if(lastName.length < 2 || lastName.length > 50){
      displayError('Veuillez entrer 2 caractères ou plus pour le nom.', lastNameError);
      event.preventDefault();
      return;
    }

    if(!emailRegex.test(email) || email ==""){
      displayError('Veuillez entrer une adresse email valide', emailError);
      event.preventDefault();
      return
    }

    if(!birthdate){
      displayError('Veuillez entrer votre date de naissance', birthdateError);
      event.preventDefault();
      return
    }
    else if(getAge(new Date(birthdate)) < 18 ){
      displayError('Vous devez être majeur pour vous inscrire', birthdateError);
      event.preventDefault();
      return
    }
     
    if(nbTournament.value === '')
    {
      nbTournament.defaultValue = 0;
    }
    
    else if(nbTournament.value < 0 || nbTournament.value > 99){
      displayError("Veuillez entrer un nombre entre 0 et 99", nbTournamentError);
      event.preventDefault();
      return
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
      return
    }
    
    if(!termsAndConditions.checked){
      displayError('Vous devez acceptez les termes et conditions.', termsError);
      event.preventDefault();
      return
    } 

    if(form.checkValidity()){
      form.reset();
      modalbg.style.display = "none";
      confirmation.style.display = "block";
      event.preventDefault();
    }
    
}
