// Selecting all the necessary things from HTML
let dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
const box=document.querySelector(".box");
let kaif= document.querySelector(".kaif");

box.addEventListener("mouseover",()=>{
    kaif.innerHTML="<p>Made with &hearts; by Kaif Khan</p>";
});
box.addEventListener("mouseout",()=>{
    kaif.innerText="";
});

//Rate exchange fn
for (let select of dropdowns) {
    for (currCode in countryList) {
        let newOptions = document.createElement("option");
        newOptions.innerText = currCode;
        newOptions.value = currCode;
        if (select.name === "From" && currCode === "USD") {
            newOptions.selected = "selected";
        } else if (select.name === "To" && currCode === "INR") {
            newOptions.selected = "selected";
        }
        select.append(newOptions);
    }
    select.addEventListener("click", (evt) => {
        updateFlag(evt.target);
    });
}

// Flag Update fn
const updateFlag = (element) => {

    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

// Getting Exchange Rate fn
const GetExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if (amtVal === "" || amtVal < 1) {
      amtVal = 1;
      amount.value = "1";
    }
    const URL = `https://open.er-api.com/v6/latest/${fromCurr.value.toUpperCase()}`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data.rates[toCurr.value.toUpperCase()];
    let finalAmt = amtVal*rate;
     msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`;
  };

//Button for Getting Exchange Rate & for Prevent Default
btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    GetExchangeRate();
});

//When the window is loaded, latest rates to be shown
window.addEventListener("load",()=>{
    GetExchangeRate();
});