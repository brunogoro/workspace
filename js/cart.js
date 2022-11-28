const URLCarr = CART_INFO_URL + '25801' + EXT_TYPE;
let auxCost = undefined;
let subTotal = undefined;
let total = undefined;

function showInfo(info) {
    for (const item of info.articles) {
        document.querySelector('#imgProd').innerHTML += `<img src="${item.image}" style="margin-top: 0px; width: 60px; height: 40px;">`;
        document.querySelector('#nameProd').innerHTML += `<p>${item.name}</p>`;
        document.querySelector('#costProd').innerHTML += `<p>${item.currency} ${item.unitCost}</p>`;
        document.querySelector('#cantProd').value = item.count;
        document.querySelector('#currency').innerText = item.currency;
        document.querySelector('#subProd').innerText = item.unitCost;
        document.querySelector('#subProd2').innerText = item.currency + ' ' + item.unitCost;
        document.querySelector('#total').innerText = item.currency + ' ' + item.unitCost;
        auxCost = item.unitCost;
        subTotal = auxCost;
        auxCurrency = item.currency;
    }
}

function increaseCount() {
    let auxCant = document.querySelector('#cantProd').value;
    if (auxCant != 0) {
        subTotal = auxCant * auxCost;
        document.querySelector('#subProd').innerText = subTotal;
        document.querySelector('#subProd2').innerText = auxCurrency + ' ' + subTotal;
        document.querySelector('#total').innerText = auxCurrency + ' ' + subTotal;
    }
}

function checking() {
    let porcentaje = undefined;
    let premium = document.querySelector('#checkPremium');
    let express = document.querySelector('#checkExpress');
    let standar = document.querySelector('#checkStandard');
    if (premium.checked) {
        porcentaje = (subTotal * 15) / 100;
        total = subTotal + porcentaje;
        document.querySelector('#costEnvio').innerText = auxCurrency + ' ' + porcentaje;
        document.querySelector('#total').innerText = auxCurrency + ' ' + total;
    };
    if (express.checked) {
        porcentaje = (subTotal * 7) / 100;
        total = subTotal + porcentaje;
        document.querySelector('#costEnvio').innerText = auxCurrency + ' ' + porcentaje;
        document.querySelector('#total').innerText = auxCurrency + ' ' + total;
    };
    if (standar.checked) {
        porcentaje = (subTotal * 5) / 100;
        total = subTotal + porcentaje;
        document.querySelector('#costEnvio').innerText = auxCurrency + ' ' + porcentaje;
        document.querySelector('#total').innerText = auxCurrency + ' ' + total;
    }
}

function typePayment() {
    auxAccount = document.querySelector('#checkAccount');
    auxBank = document.querySelector('#checkBank');

    if (auxAccount.checked) {
        document.getElementById('numAccount').disabled = true;
        document.getElementById('numCard').disabled = false;
        document.getElementById('numVerifier').disabled = false;
        document.getElementById('date').disabled = false;
        document.getElementById('alertPago').innerText = 'Tarjeta de crédito'
    } else if (auxBank.checked) {
        document.getElementById('numCard').disabled = true;
        document.getElementById('numVerifier').disabled = true;
        document.getElementById('date').disabled = true;
        document.getElementById('numAccount').disabled = false;
        document.getElementById('alertPago').innerText = 'Transferencia bancaria'
    }
}


function modalState() {
    const check1 = document.querySelector('#checkAccount');
    const check2 = document.querySelector('#checkBank');
    const name = document.querySelector('#modalName');
    const modalFeedback = document.querySelector("#payment-feedback");
    if (check1.checked || check2.checked) {
        modalFeedback.style.display = "none";
        name.style.color = "#0a58ca";
    } else {
        modalFeedback.style.display = "inline";
        name.style.color = "#dc3545";
    }
}


function validation() {
    let forms = document.querySelectorAll('.needs-validation')
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                modalState();
                if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();
                } else {
                    document.querySelector("#alert-success").classList.add("show");
                }
                form.classList.add('was-validated')
            }, false)
        });
};
validation();

document.addEventListener('DOMContentLoaded', () => {
    fetch(URLCarr)
        .then(Response => Response.json())
        .then(data => {
            console.log(data.articles);
            showInfo(data)
            auxData = data;
        })
})