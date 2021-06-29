let storage = JSON.parse(localStorage.getItem('cart'));

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
        let valid = document.querySelector(".valid");
        valid.innerHTML = 
            `<div class="text-center">Merci ${data.contact.firstName} ${data.contact.lastName}.
            Votre commande est effectuée et porte le numéro : ${data.orderId}</div>`;
    })
    .catch((e) => {
        console.log(e);
        console.log("Une erreur s'est produite, veuillez recommencez");
    })

}

form.onsubmit = login;