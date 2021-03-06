let teddyData;
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
let color;
let cart = [];
let error = document.getElementById("product");

const fetchTeddies = async () => {
    await fetch('http://localhost:3000/api/teddies/'+ id)
    .then ((res) => res.json())
    .then ((data) => (teddyData = data))
    .catch((err) => (error.innerHTML = `
        <h1 class="text-light text-center mb-4 mt-4">Aucun produit trouvé</h1>
    `));
    if(id.length != 24){
        (error.innerHTML = `
            <h1 class="text-light text-center mb-4 mt-4">Aucun produit trouvé</h1>
        `);
    }
};

/**
 * fetch pour accéder aux données.
 */

const teddyDisplay = async () => {
    await fetchTeddies();
    
    document.getElementById("title").innerHTML = teddyData.name;
    document.getElementById("photo").innerHTML = `<img src=${teddyData.imageUrl} alt="photo de ${teddyData.name}" class="col-10 mx-auto mb-4"/>`;
    document.getElementById("price").innerHTML = teddyData.price / 100 + ' €';
    document.getElementById("ref").innerHTML = "ref : " + teddyData._id;
    document.getElementById("description").innerHTML = teddyData.description;
    document.getElementById("add").innerHTML = `<button type="button" class="add-to-cart mb-4 rounded btn-lg" data-teddy="${JSON.stringify(teddyData)}">Ajouter au panier</button>`

    // Pour les couleurs ***********************
    colorChoise.innerHTML = teddyData.colors.map((color) => `<option value="${color}" class"select">${color}</option>`).join("");
};

/**
 * fonction pour créer le html en se servant des données obtenues juste avant.
 */

const handleCart = () => { 
    document.querySelector(".add-to-cart").addEventListener('click', () => {
        cart = localStorage.getItem("cart")
        if (!cart) {
            localStorage.setItem("cart", "[]")
            cart = localStorage.getItem("cart")
        }
        cart = JSON.parse(cart)
        console.log(cart);
        cart.push({
            quantity: document.getElementById("quantity").value,
            color: document.querySelector("select").value,
            data: teddyData
        })
        localStorage.setItem("cart", JSON.stringify(cart));
        alert("L'article a bien été ajouté à votre commande.")
    });
        console.log(localStorage.getItem("cart"));
    }

/**
 * Fonction servant à ajouter un article au panier.
 * Une écoute sur le clic du bouton "Ajouter au panier"
 * On ajoute au localStorage "cart", s'il n'éxite pas, alors on définit cart comme un array vide puis on ajoute
 * la quantité, la couleur et le data (pour avoir toutes le données nécessaire pour la suite).
 * On met donc à jour le localStorage "cart" puis on informe l'utilisateur que l'article a été ajouté (à l'aide d'une alert).
 */


teddyDisplay().then(handleCart);