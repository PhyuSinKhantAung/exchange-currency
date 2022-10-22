
const inputOne = document.querySelector(".inputOne");
const inputTwo = document.querySelector(".inputTwo");
const amountTag = document.querySelector(".amount");
const resultTag = document.querySelector(".result");
const text = document.querySelector(".textCurrency");
const btnLight = document.querySelector(".btnLight");
const table = document.querySelector(".table");
const noData = document.querySelector(".noData");
const tableContainer = document.querySelector(".tableContainer")


const exchangeFunc = () => {
    const currencyOne = inputOne.value;
    const currencyTwo = inputTwo.value;
    let amountEl = amountTag.value;

    const apiURL = "https://v6.exchangerate-api.com/v6/6cdc79e6fd4939c3df803fe1/latest/USD?fbclid=IwAR3o0GDIO5jcXIzgCx4ikU9Y2sfW1oaWICyo5Z343MKENLrqfnsQC43X_x8";
        fetch(apiURL)
            .then((res) => {
                const dataPromise = res.json();
                return dataPromise;
            })
            .then((data) => {
                if (currencyOne === "USD") {
                    const rate = data.conversion_rates[currencyTwo];
                    const result = Number(amountEl) * Number(rate);
                    resultTag.value = result.toFixed("2");
                    text.innerHTML = `${Number(amountEl)} ${currencyOne} = ${result.toFixed("2")} ${currencyTwo}`
                } else {
                    const firstRate = data.conversion_rates[currencyOne];
                    const secCondition = Number(amountEl)/ Number(firstRate);
                    const secRate = data.conversion_rates[currencyTwo];
                    const finalResult = secCondition * secRate;
                    resultTag.value = finalResult.toFixed("2");
                    text.innerHTML = `${Number(amountEl)} ${currencyOne} = ${finalResult.toFixed("2")} ${currencyTwo}`
                }
                btnLight.classList.add("saveBtn");
            })
            .catch((error) => {
                console.log("I got u: " + error);
            })
}
const reverseFunc = () => {
    const currencyOne = inputOne.value;
    const currencyTwo = inputTwo.value;
    let amountEl = amountTag.value;
    let resultEl = resultTag.value;

    const apiURL = "https://v6.exchangerate-api.com/v6/6cdc79e6fd4939c3df803fe1/latest/USD?fbclid=IwAR3o0GDIO5jcXIzgCx4ikU9Y2sfW1oaWICyo5Z343MKENLrqfnsQC43X_x8";
        fetch(apiURL)
            .then((res) => {
                const dataPromise = res.json();
                return dataPromise;
            })
            .then((data) => {
                if (currencyOne === "USD") {
                    const rate = data.conversion_rates[currencyTwo];
                    const result = Number(resultEl) / Number(rate);
                    amountTag.value = result.toFixed("2");
                    text.innerHTML = `${Number(resultEl)} ${currencyTwo} = ${result.toFixed("2")} ${currencyOne}`
                } else {
                    const firstRate = data.conversion_rates[currencyTwo];
                    const secCondition = Number(resultEl)/ Number(firstRate);
                    const secRate = data.conversion_rates[currencyOne];
                    const finalResult = secCondition * secRate;
                    amountTag.value = finalResult.toFixed("2");
                    text.innerHTML = `${Number(resultEl)} ${currencyTwo} = ${finalResult.toFixed("2")} ${currencyOne}`
                }
                btnLight.classList.add("saveBtn");

            })
            .catch((error) => {
                console.log("I got u: " + error);
            })
}

let dataNum = localStorage.length + 1;
const saveDataFunc = () => {
    noData.classList.add("noDataDisplay");
    table.style.display = "inline";
    const tdDate = new Date();
    const today = tdDate.toLocaleDateString();
    table.innerHTML += `
    <tbody class="table-group-divider divider">
      <tr>
        <th scope="row">${dataNum}</th>
        <td>${today}</td>
        <td>${text.innerHTML}</td>
      </tr>
    </tbody>
    `
    console.log(table.innerHTML)
    tableContainer.append(table)
    btnLight.classList.remove("saveBtn");

    localStorage.setItem(`data${dataNum}`, table.innerHTML);
    dataNum += 1;
} 



inputOne.addEventListener("input", exchangeFunc)
inputTwo.addEventListener("input", exchangeFunc)
amountTag.addEventListener("input", exchangeFunc)
resultTag.addEventListener("input", reverseFunc)
btnLight.addEventListener("click", function(){
    if(btnLight.classList.contains("saveBtn")){
        saveDataFunc();
    }
})

// localstorage
window.addEventListener("load", () => {
    if(localStorage.length !== 0){
        for (i = 0; i < localStorage.length; i++) {
            const dataKey = localStorage.getItem(`data${i+1}`);
            table.style.display = "inline";
            noData.classList.add("noDataDisplay");
            table.innerHTML = `${dataKey}`;   
        }
    } else {
        table.style.display = "none";

    }
})



