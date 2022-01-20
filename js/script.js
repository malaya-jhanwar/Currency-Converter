const dropList = document.querySelectorAll("form select"),
fromCurrency = document.querySelector(".from select"),
toCurrency = document.querySelector(".to select"),
getButton = document.querySelector("form button");

for (let i = 0; i < dropList.length; i++) {
    for(let currency_code in country_list){
      
        let selected = i == 0 ? currency_code == "INR" ? "selected" : "" : currency_code == "USD" ? "selected" : "";
     
        let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
       
        dropList[i].insertAdjacentHTML("beforeend", optionTag);
    }
    
}



window.addEventListener("load", ()=>{
    getExchangeRate();
});

getButton.addEventListener("click", e =>{
    e.preventDefault(); 
    getExchangeRate();
});




function getExchangeRate(){
    const amount = document.querySelector("form input");
    const exchangeRateTxt = document.querySelector("form .exchange-rate");
    let amountVal = amount.value;

    const url = `https://v6.exchangerate-api.com/v6/f93463de782ac9695ece4e95/latest/${fromCurrency.value}`;
    
    
    fetch(url).then(response => response.json()).then(result =>{
        let exchangeRate = result.conversion_rates[toCurrency.value]; 
        let totalExRate = (amountVal * exchangeRate).toFixed(4);
        exchangeRateTxt.innerText = `${amountVal} ${fromCurrency.value} = ${totalExRate} ${toCurrency.value}`;
     })
}