let btn = document.getElementById("btn");
let inputs = document.querySelectorAll(".control");
let value = false;

function validation(){
    for (let input of inputs){
        if (input.value.length != 0){
           value = true; 
        } else {
            value = false;
        }
    }
    return value;
}

btn.addEventListener("click", () => {
    if(validation()){
        window.location.replace("home.html");
    }else{
        let alerts = document.querySelectorAll(".form-alert");
        for (let alert of alerts) {
            alert.classList.remove("form-alert");
            alert.classList.add("form-alert-active");
        };
    };
});