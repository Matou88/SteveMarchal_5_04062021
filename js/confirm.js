function send(e) {
    e.preventDefault();
    fetch("http://localhost:3000/api/teddies", {
      method: "POST",
      headers: {
        'Accept': 'application/json', 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({firstName: document.getElementById("firstName")})
      body: JSON.stringify({lastName: document.getElementById("lastName")})
      body: JSON.stringify({address: document.getElementById("address")})
      body: JSON.stringify({city: document.getElementById("city")})
      body: JSON.stringify({email: document.getElementById("email")})
    })
    .then(function(res) {
      if (res.ok) {
          console.log(body);
        // return res.json();
      }
    })
    // .then(function(value) {
    //     document
    //       .getElementById("result")
    //       .innerText = value.postData.text;
    // });
  }
  
  document
    .getElementById("form")
    .addEventListener("submit", send);
  