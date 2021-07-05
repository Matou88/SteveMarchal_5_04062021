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
let form = document.getElementById("form");

form.firstName.addEventListener("change", () => {
    validFirstName(this)
});

form.lastName.addEventListener("change", () => {
    validLastName(this)
});

form.address.addEventListener("change", () => {
    validAddress(this)
});

form.city.addEventListener("change", () => {
    validCity(this)
});

form.email.addEventListener("change", () => {
    validEmail(this)
});

const validFirstName = () => {
    let firstNameRegExp = new RegExp('^[a-zA-Zà-ÿ -]+$', 'g');
    let nameOk = document.getElementById('name');

    if (firstNameRegExp.test(document.getElementById('firstName').value)) {
        nameOk.innerHTML = "Prénom valide";
        nameOk.classList.remove("text-danger");
        nameOk.classList.add("text-success");
    } else {
        nameOk.innerHTML = "Prénom invalide";
        nameOk.classList.remove("text-success");
        nameOk.classList.add("text-danger");
    }
};

const validLastName = () => {
    let firstNameRegExp = new RegExp('^[a-zA-Zà-ÿ -]+$', 'g');
    let lastNameOk = document.getElementById('nameLast');

    if (firstNameRegExp.test(document.getElementById('lastName').value)) {
        lastNameOk.innerHTML = "Nom valide";
        lastNameOk.classList.remove("text-danger");
        lastNameOk.classList.add("text-success");
    } else {
        lastNameOk.innerHTML = "Nom invalide";
        lastNameOk.classList.remove("text-success");
        lastNameOk.classList.add("text-danger");
    }
};

const validAddress = () => {
    let addressRegExp = new RegExp('^[a-zA-Z0-9à-ÿ -]+$', 'g');
    let addressOk = document.getElementById('validAddress');

    if (addressRegExp.test(document.getElementById('address').value)) {
        addressOk.innerHTML = "Adresse valide";
        addressOk.classList.remove("text-danger");
        addressOk.classList.add("text-success");
    } else {
        addressOk.innerHTML = "Adresse invalide";
        addressOk.classList.remove("text-success");
        addressOk.classList.add("text-danger");
    }
};

const validCity = () => {
    let cityRegExp = new RegExp('^[a-zA-Zà-ÿ -]+$', 'g');
    let cityOk = document.getElementById('validCity');

    if (cityRegExp.test(document.getElementById('city').value)) {
        cityOk.innerHTML = "Ville valide";
        cityOk.classList.remove("text-danger");
        cityOk.classList.add("text-success");
    } else {
        cityOk.innerHTML = "Ville invalide";
        cityOk.classList.remove("text-success");
        cityOk.classList.add("text-danger");
    }
};

const validEmail = () => {
    let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g');
    let small = document.getElementById('mail');

    if (emailRegExp.test(document.getElementById('email').value)) {
        small.innerHTML = "Adresse valide";
        small.classList.remove("text-danger");
        small.classList.add("text-success");
    } else {
        small.innerHTML = "Adresse invalide";
        small.classList.remove("text-success");
        small.classList.add("text-danger");
    }
};

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

