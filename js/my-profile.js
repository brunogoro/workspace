const btn = document.querySelector('#btnChanges');

btn.addEventListener('click', ()=>{
    const name1 = document.querySelector('#inputName1').value;
    localStorage.setItem('name1', name1);
    const name2 = document.querySelector('#inputName2').value;
    localStorage.setItem('name2', name2);
    const secondName1 = document.querySelector('#inputSecondname1').value;
    localStorage.setItem('secondName1', secondName1);
    const secondName2 = document.querySelector('#inputSecondname2').value;
    localStorage.setItem('secondName2', secondName2);
    const imageProfile = document.querySelector('#inputImage').value;
    localStorage.setItem('imageProfile', imageProfile);
    const number = document.querySelector('#inputNumber').value;
    localStorage.setItem('number', number);
})

document.addEventListener('DOMContentLoaded', ()=>{
    document.querySelector('#inputEmail').value = localStorage.getItem("email");
    document.querySelector('#inputName1').value = localStorage.getItem("name1");
    document.querySelector('#inputName2').value = localStorage.getItem("name2");
    document.querySelector('#inputSecondname1').value = localStorage.getItem("secondName1");
    document.querySelector('#inputSecondname2').value = localStorage.getItem("secondName2");
    document.querySelector('#inputNumber').value = localStorage.getItem("number");
})