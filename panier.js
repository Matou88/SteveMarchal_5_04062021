let ttc = document.getElementById("ttc");
let tva = document.getElementById("tva");
let storage = JSON.parse(localStorage.getItem('cart'));
console.log(localStorage.cart);


const cartData = () => {
    let lineCart = document.getElementById('cart-line');
    let emptyCart = document.getElementById('empty-cart')

    if (storage === null){
        emptyCart.innerHTML = '<div class="text-center"><div>Panier vide</div></div>';
    } else {
        let dataCart = [];
        for (let i = 0; i < storage.length; i++) {
            
            dataCart = dataCart + `<tr>
            <td class="align-middle"><img src="${storage[i].data.imageUrl}" alt="photo de peluche ${storage[i].data.name}" class="img-thumbnail"/> ${storage[i].data.name}</td>
            <td class="align-middle text-center">${storage[i].color}</td>
            <td class="align-middle text-center">${storage[i].quantity}</td>
            <td class="align-middle text-center">${storage[i].data.price/100} €</td>
            <td class="align-middle text-center">${(storage[i].data.price/100 * storage[i].quantity)} €<td>
            </tr>`;
        }
        lineCart.innerHTML = dataCart;
    };
}

const sum = () =>{

    if (storage === null){
        console.log("zéro");
    } else {
        let sum = 0;

        for (let i = 0; i < storage.length; i++) {
        sum += (storage[i].data.price/100 * storage[i].quantity);
        }
        ttc.innerHTML = `${sum} €`;
        let taxes = (sum/120)*20;
        tva.innerHTML = `${taxes} €`;
    }
};

cartData();
sum();
