// const searchInput = document.getElementById('search');
// let searchTerm = '';

fetch('http://localhost:3000/api/teddies')
    .then ((res) => res.json())
    .then ((data) => console.log(data));


// searchInput.addEventListener("input", (e) => {
//     searchTerm = e.target.value;
//     console.log(e.target.value);
// });


