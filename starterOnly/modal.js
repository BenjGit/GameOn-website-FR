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
const modalBtn = document.querySelectorAll(".modal-btn");
const closeBtn = document.querySelectorAll(".close"); // add close btn
const formData = document.querySelectorAll(".formData");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
//close modal event
closeBtn.forEach((btn) => btn.addEventListener("click", closeModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}
// close modal form
function closeModal(){
  modalbg.style.display = "none";
}

function getAge(){
  const birthdate = document.getElementById('birthdate').value;
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

function displayError($errorMessage , $divErrorName, event){
  const errorMessage = $errorMessage;
  $divErrorName.setAttribute("data-error", errorMessage); ;
  $divErrorName.setAttribute("data-error-visible", "true");
  event.preventDefault();//empêcher l'envoi car il y a une erreur
  return; //sortir de la fonction pour empêcher le reste du code d'être éxécuté
}

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
    const radios = document.getElementsByName('location');
    const locationError = document.getElementById('locationError');
    const termsAndConditions = document.getElementById('checkbox1');
    const termsError = document.getElementById('termsError');
    const confirmation = document.querySelector('[data-success=confirmation]');

    if(firstName.length < 2 || firstName.length >50){
      const errorMessage = 'Veuillez entrer 2 caractères ou plus pour le champ du prénom.';
      firstNameError.setAttribute("data-error", errorMessage); ;
      firstNameError.setAttribute("data-error-visible", "true");
      event.preventDefault();//empêcher l'envoi car il y a une erreur
      return; //sortir de la fonction pour empêcher le reste du code d'être éxécuté
    }

    if(lastName.length < 2 || lastName.length > 50){
      const errorMessage = 'Veuillez entrer 2 caractères ou plus pour le champ du nom.';
      lastNameError.setAttribute("data-error", errorMessage); ;
      lastNameError.setAttribute("data-error-visible", "true");
      event.preventDefault();
      return;
    }

    if(!emailRegex.test(email) || email ==""){
      const errorMessage = 'Veuillez entrer une adresse email valide';
      emailError.setAttribute("data-error", errorMessage); ;
      emailError.setAttribute("data-error-visible", "true");
      event.preventDefault();
      return;
    }

    if(getAge() < 18){
      const errorMessage = 'Veuillez entrer une date de naissance valide';
      birthdateError.setAttribute("data-error", errorMessage); ;
      birthdateError.setAttribute("data-error-visible", "true");
      event.preventDefault();
      return;
    }

    let numChecked = 0;
    for (let i = 0; i < radios.length; i++){
        if(radios[i].checked){
          numChecked++
        }
    }

    if (numChecked !==1) {
      const errorMessage = 'Veuillez choisir une option';
      locationError.setAttribute("data-error", errorMessage); ;
      locationError.setAttribute("data-error-visible", "true");
      event.preventDefault();
      return;
    }

    if(!termsAndConditions.checked){
      const errorMessage = 'Vous devez vérifier que vous acceptez les termes et conditions.';
      termsError.setAttribute("data-error", errorMessage); ;
      termsError.setAttribute("data-error-visible", "true");
      event.preventDefault();
      return;
    } 
    
    confirmation.innerHTML = 'Merci ! Votre réservation a été reçue.';
    event.preventDefault();
    form.submit();
  
}
