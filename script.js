document.addEventListener("DOMContentLoaded", function () {
  const billInput = document.getElementById("bill-input");
  const tipButtons = document.querySelectorAll(".tip-btn:not(.custom-tip)");
  const customTipInput = document.getElementById("custom-tip");
  const peopleInput = document.getElementById("people-input");
  const peopleField = document.getElementById("people-field");
  const tipAmountDisplay = document.getElementById("tip-amount");
  const totalAmountDisplay = document.getElementById("total-amount");
  const resetButton = document.getElementById("reset-btn");
  const billContainer = document.getElementById("bill-container");
  const addNewBill = document.getElementById('add-btn');

  let bill = 0;
  let tipPercentage = 0;
  let numberOfPeople = 1;

  const calculate = () => {
    if (bill > 0 && numberOfPeople > 0) {
      const tipAmount = (bill * tipPercentage) / 100 / numberOfPeople;
      const totalAmount = bill / numberOfPeople + tipAmount;

      tipAmountDisplay.textContent = `$${tipAmount.toFixed(2)}`;
      totalAmountDisplay.textContent = `$${totalAmount.toFixed(2)}`;
      resetButton.disabled = false;
      addNewBill.disabled = false;
    } else {
      resetButton.disabled = true;
      tipAmountDisplay.textContent = "$0.00";
      totalAmountDisplay.textContent = "$0.00";
    }
  };

  const addBill = () => {
    if (bill > 0 && numberOfPeople > 0) {
      const tipAmount = (bill * tipPercentage) / 100 / numberOfPeople;
      const totalAmount = bill / numberOfPeople + tipAmount;

      const newBill = document.createElement("div");
      newBill.classList.add('bill-cart');

      newBill.innerHTML = `
                <div class="bill-cart-values total-amount">
          Total Amount
          <p>$${bill}</p>
        </div>
        <div class="bill-cart-values people-count">
          Total no of people
          <p>${numberOfPeople}</p>
        </div>
        <div class="bill-cart-values tip-per-amount">
          Tip per person
          <p>$${tipAmount}</p>
        </div>
        <div class="bill-cart-values tip-per-amount">
         Amount per person
          <p>$${totalAmount}</p>
        </div>
            `;
        billContainer.appendChild(newBill);
    }
  };

  addNewBill.addEventListener('click',()=>{
    if(bill>0 && numberOfPeople > 0){
        addBill();
        reset();
    }
  })


  billInput.addEventListener("input", function () {
    bill = parseFloat(this.value) || 0;
    calculate();
  });

  tipButtons.forEach((button) => {
    button.addEventListener("click", function () {
      tipButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");
      tipPercentage = parseFloat(this.value);
      customTipInput.value = "";
      calculate();
    });
  });

  customTipInput.addEventListener("input", function () {
    tipPercentage = parseFloat(this.value) || 0;
    tipButtons.forEach((btn) => btn.classList.remove("active"));
    calculate();
  });

  peopleInput.addEventListener("input", function () {
    numberOfPeople = parseInt(this.value) || 0;

    if (numberOfPeople <= 0) {
      peopleField.classList.add("error");
    } else {
      peopleField.classList.remove("error");
      calculate();
    }
  });

  resetButton.addEventListener("click", function () {
    bill = 0;
    tipPercentage = 0;
    numberOfPeople = 1;

    billInput.value = "";
    tipButtons.forEach((btn) => btn.classList.remove("active"));
    customTipInput.value = "";
    peopleInput.value = "1";
    peopleField.classList.remove("error");
    tipAmountDisplay.textContent = "$0.00";
    totalAmountDisplay.textContent = "$0.00";

    resetButton.disabled = true;
    addNewBill.disabled = true;
  });

  const reset = () => {
    bill = 0;
    tipPercentage = 0;
    numberOfPeople = 1;

    billInput.value = "";
    tipButtons.forEach((btn) => btn.classList.remove("active"));
    customTipInput.value = "";
    peopleInput.value = "1";
    peopleField.classList.remove("error");
    tipAmountDisplay.textContent = "$0.00";
    totalAmountDisplay.textContent = "$0.00";

    resetButton.disabled = true;
    addNewBill.disabled = true;
  }
});
