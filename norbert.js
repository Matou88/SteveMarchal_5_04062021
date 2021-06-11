let teddiesData = [];

const fetchTeddies = async () => {
    await fetch('http://localhost:3000/api/teddies')
    .then ((res) => res.json())
    .then ((data) => (teddiesData = data));

    console.log(teddiesData);
};


const teddiesDisplay = async () => {
    await fetchTeddies();
    
    document.getElementById("title").innerHTML = teddiesData[0].name;
    document.getElementById("photo").innerHTML = `<img src=${teddiesData[0].imageUrl} alt="photo de ${teddiesData[0].name}"/>`;
    // document.getElementById("colorChoise").innerHTML = `<option value="${teddiesData[0].colors}>`
    document.getElementById("price").innerHTML = teddiesData[0].price / 100 + ' €';
    document.getElementById("ref").innerHTML = "ref : " + teddiesData[0]._id;
    document.getElementById("description").innerHTML = teddiesData[0].description;
    document.getElementById("add").innerHTML = `<button type="button" class="add-to-cart" data-id="${teddiesData[0]._id}" data-name="${teddiesData[0].name}" data-price="${teddiesData[0].price/100}">Ajouter au panier</button>`


 // Pour les couleurs ***********************
 colorChoise.innerHTML = teddiesData[0].colors.map (
    (color) =>
`
<option value="${color}">${color}</option>
`
)
.join("");
 };






teddiesDisplay();


//     product.innerHTML = teddiesData.map ( 
//         (teddy)  =>  
//     `
    
    
//         <div class="col-12 col-lg-4 mb-4">
//             <div class="card border-dark shadow h-100">
//                 <img src=${teddy.imageUrl} alt="Peluche ${teddy.name}" class="card-img-top h-75" />
//                 <div class="card-body">
//                     <div class="row">
//                         <div class="col-9">
//                             <h2>${teddy.name}<h2>
//                         </div>
//                         <div class="col-3 text-end">
//                             <h3>${teddy.price / 100} €</h3>
//                         </div>
//                     </div>
//                     <p>${teddy.description}</p>
//                 </div>
//             </div>
//         </div>
    
//     `
    
//     )
//     .join("");
//     };
    
//     teddiesDisplay();