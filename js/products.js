const DATA_URL = 'https://japceibal.github.io/emercado-api/cats_products/101.json';
let jsoN = document.getElementById("container");

function mostrar1(data){
    jsoN.innerHTML = `
    <div class="text-center p-4">
        <h2>Productos</h2>
        <p class="lead">Verás aquí todos los productos de la categoría ${data}</p>
    </div> 
    ` 
};

function mostrar2(data) {
    for (let dat of data){
        jsoN.innerHTML += `
        <div class="row">
            <div class="list-group">
                <div class="list-group-item list-group-item-action cursor-active">
                    <div class="row">
                        <div class="col-3">
                            <img class="img-thumbnail" src="${dat.image}">
                        </div>
                        <div class="col">
                            <div class="d-flex w-100 justify-content-between">
                                <h4 class="mb-1">${dat.name} -${dat.currency} ${dat.cost}</h4>
                                <small class="text-muted">${dat.soldCount}</small>
                            </div>
                            <p class="mb-1">${dat.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `
    }
};

async function traerDatos(){
    let data = await fetch(DATA_URL);
    data = await data.json();
    mostrar1(data.catName);
    mostrar2(data.products);
}  
traerDatos();