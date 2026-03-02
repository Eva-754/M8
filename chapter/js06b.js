"use strict";
/*    JavaScript 7th Edition
      Chapter 6
      Chapter case

      Order Form Code
      Author: Eva Pathak
      Date:   03/02/2026

      Filename: js06b.js
 */

let subButton = document.getElementById("subButton");
subButton.addEventListener("click", validateName);
subButton.addEventListener("click", validateCard);
subButton.addEventListener("click", validateNumber);
subButton.addEventListener("click", validateMonth);
subButton.addEventListener("click", validateYear);
subButton.addEventListener("click", validateCVC);

function validateName() {
   let cardName = document.getElementById("cardName");
   if (cardName.validity.valueMissing) {
      cardName.setCustomValidity("Please enter the name on the card.");
   } else {
      cardName.setCustomValidity("");
   }
}

function validateCard() {
   let card = document.forms.payment.elements.credit[0];
   if (card.validity.valueMissing) {
      card.setCustomValidity("Please select your credit card type.");
   } else {
      card.setCustomValidity("");
   }
}

function validateNumber() {
   let cNum = document.getElementById("cardNumber");
   if (cNum.validity.valueMissing) {
      cNum.setCustomValidity("Please enter a credit card number.");
   } else if (cNum.validity.patternMismatch) {
      cNum.setCustomValidity("Please enter a valid credit card number.");
   } else {
      cNum.setCustomValidity("");
   }
}

function validateMonth() {
   let expMonth = document.getElementById("expMonth");
   if (expMonth.selectedIndex === 0) {
      expMonth.setCustomValidity("Please select the card's expiration month.");
   } else {
      expMonth.setCustomValidity("");
   }
}

function validateYear() {
   let expYear = document.getElementById("expYear");
   if (expYear.selectedIndex === 0) {
      expYear.setCustomValidity("Please select the card's expiration year.");
   } else {
      expYear.setCustomValidity("");
   }
}

function validateCVC() {
   let card = document.querySelector('input[name="credit"]:checked').value;
   let cvc = document.getElementById("cvc");
   if (cvc.validity.valueMissing) {
      cvc.setCustomValidity("Please enter the card's CVC code.");
   } else if (card === "amex" && !/^\d{4}$/.test(cvc.value)) {
      cvc.setCustomValidity("Please enter a 4-digit CVC code");
   } else if (card !== "amex" && !/^\d{3}$/.test(cvc.value)) {
      cvc.setCustomValidity("Please enter a 3-digit CVC code");
   } else {
      cvc.setCustomValidity("");
   }  
}



/* ------- Luhn Algorithm used for Validating Credit Card Numbers   ----- */

function luhn(idNum) {
   let string1 = "";
   let string2 = "";
   
   // Retrieve the odd-numbered digits starting from the back
   for (let i = idNum.length - 1; i >= 0; i-= 2) {
      string1 += idNum.charAt(i);
   }
   // Retrieve the even-numbered digits starting from the back and double them
   for (let i = idNum.length - 2; i >= 0; i-= 2) {
      string2 += 2*idNum.charAt(i);
   }
   
   // Return whether the sum of the digits is divisible by 10
   return sumDigits(string1 + string2) % 10 === 0;
   
   function sumDigits(numStr) {
      let digitTotal = 0;
      for (let i = 0; i < numStr.length; i++) {
         digitTotal += parseInt(numStr.charAt(i));
      }
      return digitTotal;
   }
}