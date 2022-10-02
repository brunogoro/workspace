let ID = localStorage.getItem('prodID');
let URL_INFO_PROD = PRODUCT_INFO_URL + ID + EXT_TYPE;
let URL_COMMENTS = PRODUCT_INFO_COMMENTS_URL + ID + EXT_TYPE;
let aux = undefined;

function setProductID(id) {
    localStorage.setItem("prodID", id);
    window.location = "product-info.html"
}

function showText(data) {
    document.getElementById('title').innerHTML += ` <h2>${data.name}</h2> `
    document.getElementById('price').innerHTML += ` <p>${data.currency} ${data.cost}</p> `
    document.getElementById('description').innerHTML += ` <p>${data.description}</p> `
    document.getElementById('category').innerHTML += ` <p>${data.category}</p> `
    document.getElementById('cantSold').innerHTML += ` <p>${data.soldCount}</p> `
    for (img of data.images){
        if (img == data.images[0]){
            document.getElementById('img').innerHTML += `
            <div class="carousel-item active" data-bs-interval="0.5">
                <img src="${img}" class="d-block w-1"> 
            </div>
            `
        } else {
            document.getElementById('img').innerHTML += `
            <div class="carousel-item">
                <img src="${img}" class="d-block w-1" data-bs-interval="0.5"> 
            </div>
        `
        }
        
    }
}

function showComment(data){
    for (com of data) {
        aux = ``;
        for (let i=1; i <= 5; i++){
            if (i <= com.score) {
                 aux += `<span class="fa fa-star checked"></span>`;
            }else {
                 aux += `<span class="fa fa-star"></span>`;
            } 
         }
        document.getElementById('listComments').innerHTML += 
        `
        <li class="list-group-item">
        <strong>${com.user}</strong>-${com.dateTime} ${aux}
        <p class="text-muted">${com.description}</p>
        </li> 
        `
    }
}
function newComment(){
    var today = new Date();
    var now = ``;
    now = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
    let cantScore = document.getElementById('score-range').value;
    aux = ``;
        for (let i=1; i <= 5; i++){
            if (i <= cantScore) {
                 aux += `<span class="fa fa-star checked"></span>`;
            }else {
                 aux += `<span class="fa fa-star"></span>`;
            } 
         }
    document.getElementById('listComments').innerHTML += 
    `
        <li class="list-group-item">
        <strong>${localStorage.getItem('email')}</strong>-${now} ${aux}
        <p class="text-muted">${document.getElementById("comText").value}</p>
        </li> 
    `
    document.getElementById('score-range').value = "1";
    document.getElementById("comText").value = "";
}

function showRelated(data){
    for (const elem of data){
        document.getElementById('prodRelated').innerHTML +=
        `
        <div class="card text-center" style="width: 18rem;" onclick="setProductID(${elem.id})">
            <img class="card-img-top" src="${elem.image}" alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title">${elem.name}</h5>
            </div>
        </div>
     `
        
    }
}

document.addEventListener('DOMContentLoaded', ()=>{
    fetch(URL_INFO_PROD)
        .then(Response => Response.json())
        .then(data => {
            showText(data);
            console.log(data)
            showRelated(data.relatedProducts)
            console.log(data.relatedProducts)
        });
    fetch(URL_COMMENTS)
        .then(Response => Response.json())
        .then(data => {
            showComment(data)
        });
});