let teddiesData = [];
let cardContent = document.querySelector(".cardContent");


const fetchTeddies = async () => {
    await fetch('http://localhost:3000/api/teddies')
    .then ((res) => res.json())
    .then ((data) => (teddiesData = data));

    console.log(teddiesData);
};
/**
 * On interroge l'Api à l'aide de fettch et on rempli l'array teddiesData avec la data en réponse.
 */

const teddiesDisplay = async () => {
await fetchTeddies();

cardContent.innerHTML = teddiesData.map ( 
    (teddy)  =>  
`
    <div class="col-12 col-lg-4 mb-4">
        <div class="card bg-dark text-light border-dark shadow h-100">
            <img src=${teddy.imageUrl} alt="Peluche ${teddy.name}" class="card-img-top h-75 border-dark"/>
            <div class="card-body">
                <div class="row">
                    <div class="col-9">
                        <h2 class="card-title">${teddy.name}<h2>
                    </div>
                    <div class="col-3 text-end">
                        <h3>${teddy.price / 100} €</h3>
                    </div>
                </div>
                <p class="card-text text-justify">${teddy.description}</p>
                <a href="../html/product.html?id=${teddy._id}" class="btn fs-4 mx-auto d-block stretched-link">Voir Plus</a>
            </div>
        </div>
    </div>
`

)
.join("");
};

/**
 * On rempli le html à l'aide d'un map qui crée une boucle, chaque boucle sera une carte, on se sert des données que l'Api nous a
 * retourné avec le fetch.
 */

teddiesDisplay();