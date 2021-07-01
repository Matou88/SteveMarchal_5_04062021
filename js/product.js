let teddyData;
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
let color;
let cart = [];

const fetchTeddies = async () => {
    await fetch('http://localhost:3000/api/teddies/'+ id)
    .then ((res) => res.json())
    .then ((data) => (teddyData = data));
};

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



teddyDisplay().then(handleCart);
