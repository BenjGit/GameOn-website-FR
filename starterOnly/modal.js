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

function validate(event) {
  // const lastName = document.getElementsById('last');
  // if (lastName.value.length < 2) {
  //   lastName.setCustomValidity('Veuillez entrer 2 caractères ou plus pour le champ du nom.');
  //   event.preventDefault();
  // } else {
  //   lastName.setCustomValidity('');
  // }

  const radios = document.getElementsByName('location');
  const checkboxMessage = document.querySelector('#checkbox-message');

  //dès qu'une case est coché enleve le message "Veuillez choisir une option"
  radios.forEach(radio => { //parcours les checkbox et regarde si un changement à été effectué
    radio.addEventListener('change', () => {
      checkboxMessage.innerHTML = ''; //si oui on vide le message "Veuillez choisir une option"
    });
  });

  let numChecked = 0;
  for (let i = 0; i < radios.length; i++){
      if(radios[i].checked){
        numChecked++
      }
  }
  if (numChecked !==1) {
    checkboxMessage.innerHTML = "Veuillez choisir une option";
    event.preventDefault();
  }
  
  
  

  const form = document.querySelector('form');

  form.addEventListener('submit', (event) => {
    const confirmation = document.querySelector('#confirmation');
    confirmation.innerHTML = "Merci ! Votre réservation a été reçue.";
    event.preventDefault();
  });
}
