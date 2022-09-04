let cateId = localStorage.getItem("catID")
const DATA_URL = 'https://japceibal.github.io/emercado-api/cats_products/'+cateId+'.json';
let list = document.getElementById("container");
let title = document.getElementById("category");
let newList = [];
let minCost = undefined;
let maxCost = undefined;
function showTitle(data){
    title.innerHTML = `<p class="lead">Verás aquí todos los productos de la categoría ${data.catName}.</p>`;
}
function showList(data) {
    list.innerHTML = "";
    for (let dat of data){
        if (((minCost == undefined) || (minCost != undefined && parseInt(dat.cost) >= minCost)) &&
            ((maxCost == undefined) || (maxCost != undefined && parseInt(dat.cost) <= maxCost))){
            list.innerHTML += 
            `
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
    }
};

document.addEventListener("DOMContentLoaded", ()=>{
    fetch(DATA_URL)
        .then(Response => Response.json())
        .then(data => {
            showTitle(data);
            showList(data.products);
            newList = data.products;
        });
});

document.getElementById("sortDesc").addEventListener("click", ()=>{
    newList.sort(function(a, b) {
        if ( a.cost > b.cost ){ return -1; }
        if ( a.cost < b.cost ){ return 1; }
        return 0;
    });
    showList(newList)
});


document.getElementById("sortAsc").addEventListener("click", ()=>{
    newList.sort(function(a, b) {
        if ( a.cost < b.cost ){ return -1; }
        if ( a.cost > b.cost ){ return 1; }
        return 0;
    });
    showList(newList)
});

document.getElementById("sortByCount").addEventListener("click", ()=>{
    newList.sort(function(a, b) {
        if ( a.soldCount > b.soldCount ){ return -1; }
        if ( a.soldCount < b.soldCount ){ return 1; }
        return 0;
    });
    showList(newList)
});

document.getElementById("clearRangeFilter").addEventListener("click", function(){
    document.getElementById("rangeFilterCostMin").value = "";
    document.getElementById("rangeFilterCostMax").value = "";

    minCost = undefined;
    maxCost = undefined;
    showList(newList);
});

document.getElementById("rangeFilterCost").addEventListener("click", function(){
    minCost = document.getElementById("rangeFilterCostMin").value;
    maxCost = document.getElementById("rangeFilterCostMax").value;

    if ((minCost != undefined) && (minCost != "") && (parseInt(minCost)) >= 0){
        minCost = parseInt(minCost);
    }
    else{
        minCost = undefined;
    }

    if ((maxCost != undefined) && (maxCost != "") && (parseInt(maxCost)) >= 0){
        maxCost = parseInt(maxCost);
    }
    else{
        maxCost = undefined;
    }
    showList(newList)
});