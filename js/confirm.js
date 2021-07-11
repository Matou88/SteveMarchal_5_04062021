let userName = localStorage.getItem('userName');
let userLastName = localStorage.getItem('userLastName');
let orderId = localStorage.getItem('orderID');
let total = localStorage.getItem('total');

document.getElementById("thanks").innerHTML = `
    <div class="mt-4 mb-4">
        Merci ${userName} ${userLastName} pour votre achat. <br/>
        Le numéro de commande est : ${orderId}<br/>
        Pour un montant total de ${total} €
    </div>
`;

localStorage.clear();


/**
 * Juste un innerHTML pour remplir la page en se servant des informations de la page précédente.
 * Le Prénom et Nom que l'utilisateur a rempli dans les champs, l'ID de la commande que nous a envoyé l'Api en retour
 * ainsi que la valeur total de la commande.
 * On efface ensuite le localStorage comme l'Api a reçu la commande en validant la page précédente.
 */