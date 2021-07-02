let ttc = document.getElementById("ttc");
let tva = document.getElementById("tva");
let storage = JSON.parse(localStorage.getItem('cart'));


const cartData = () => {
    let lineCart = document.getElementById('cart-line');
    let emptyCart = document.getElementById('empty-cart')

    if (storage == '' || storage == NaN || storage == undefined || storage == null){
        emptyCart.innerHTML = '<div class="text-center"><div>Panier vide</div></div>';
        
    } else {
        let dataCart = [];
        for (let i = 0; i < storage.length; i++) {
            
            dataCart = dataCart + `<tr>
            <td class="align-middle text-center"><button class="delete-item" data-index="${i}" type="button"><i class="fas fa-trash-alt"></i></button></td>
            <td class="align-middle"><a href='../html/product.html?id=${storage[i].data._id}'><img src="${storage[i].data.imageUrl}" alt="photo de peluche ${storage[i].data.name}" class="img-thumbnail"/>${storage[i].data.name}</a></td>
            <td class="align-middle text-center">${storage[i].color}</td>

            <td class="align-middle text-center">
                <div class="input-group">
                    <button class="less" type="button" data-index="${i}">-</button>
                    <span type="text" data-index="${i}" class="myNumber form-control input-number">${storage[i].quantity}</span>
                    <button class="more" type="button" data-index="${i}">+</button>
                </div>  
            </td>
            <td class="align-middle text-center">${(storage[i].data.price/100 * storage[i].quantity)}€</td>
            </tr>`;
        }
        lineCart.innerHTML = dataCart;
    }
    delItem(); less(); more();
}

const sum = () =>{
    if (storage === null){
        console.log("zéro");
    } else {
        let sum = 0;

        for (let i = 0; i < storage.length; i++) {
        sum += (storage[i].data.price/100 * storage[i].quantity);
        }
        ttc.innerHTML = `${sum}€`;
        let taxes = Math.round((sum/100)*20);
        tva.innerHTML = `${taxes}€`;
        localStorage.setItem('total', sum);
    }
};

const delItem = () =>{

    document.querySelectorAll(".delete-item").forEach((button) => {
        button.addEventListener("click", () => {
            console.log(button.dataset.index)
            storage.splice(button.dataset.index,1)
            localStorage.setItem("cart", JSON.stringify(storage));
            cartData();
            sum();
        })
    })
}

const less = () =>{
    document.querySelectorAll(".less").forEach((button) => {
        button.addEventListener("click", () => {
            let value = storage[button.dataset.index].quantity;
            console.log(value);
            value--;
            console.log("moins 1 ça fait : ", value);
            storage[button.dataset.index].quantity = value;
            console.log(storage);          
            localStorage.setItem("cart", JSON.stringify(storage));
            cartData();
            sum();
        })
    })
};

const more = () =>{
    document.querySelectorAll(".more").forEach((button) => {
        button.addEventListener("click", () => {
            let value = storage[button.dataset.index].quantity;
            console.log(value);
            value++;
            console.log("plus 1 ça fait : ", value);
            storage[button.dataset.index].quantity = value;
            console.log(storage);          
            localStorage.setItem("cart", JSON.stringify(storage));
            cartData();
            sum();
        })
    })
};

cartData();
sum();


//*************************** Partie formulaire ***************************//

const order = () => {
    return storage.map((item) => item.data._id)
};

async function postData(url, data) {
    const response = await fetch(url, {
        method: "POST",
        headers:{
            'Accept': 'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    console.log(response);
    return response.json();
}

const login = async (e) => {
    e.preventDefault();

    postData("http://localhost:3000/api/teddies/order", {
        contact: {
            firstName: document.getElementById("firstName").value,
            lastName: document.getElementById("lastName").value,
            address: document.getElementById("address").value,
            city: document.getElementById("city").value,
            email: document.getElementById("email").value
        },
        products: order()
    })
    .then((data) => {
        console.log(data)
        localStorage.setItem('userName', data.contact.firstName);
        localStorage.setItem('userLastName', data.contact.lastName);
        localStorage.setItem('orderID', data.orderId);
        window.location.href = "./confirm.html";
    })
    .catch((e) => {
        console.log(e);
        alert("Une erreur s'est produite, veuillez recommencez");
    })

}

form.onsubmit = login;

