let userName = localStorage.getItem('userName');
let userLastName = localStorage.getItem('userLastName');
let orderId = localStorage.getItem('orderID');
let total = localStorage.getItem('total');

document.getElementById("thanks").innerHTML = 
    `<div class="mt-4 mb-4">
    Merci ${userName} ${userLastName} pour votre achat. <br/>
    Le numéro de commande est : ${orderId}<br/>
    Pour un montant total de ${total} €
    </div>
    `;

localStorage.clear();