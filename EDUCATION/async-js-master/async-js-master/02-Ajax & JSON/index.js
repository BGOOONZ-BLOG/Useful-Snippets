document.getElementById("button1").addEventListener("click", loadCustomer);

document.getElementById("button2").addEventListener("click", loadCustomers);

function loadCustomer(e) {
  const xhr = new XMLHttpRequest();

  xhr.open("GET", "customer.json", true);

  xhr.onload = function () {
    if (this.status === 200) {
      const customer = JSON.parse(this.responseText);

      const list = document.getElementById("customer");

      let output = `
        <tr>
        <td>${customer.id}</td>
        <td>${customer.name}</td>
        <td>${customer.company}</td>
        <td>${customer.phone}</td>
        </tr>
         `;
      list.innerHTML = output;
    }
  };
  xhr.onerror = () => {
    console.log("404, customer not found!");
  };
  xhr.send();
}

function loadCustomers(e) {
  const xhr = new XMLHttpRequest();

  xhr.open("GET", "customers.json", true);

  xhr.onload = function () {
    if (this.status === 200) {
      const customers = JSON.parse(this.responseText);

      const list = document.getElementById("customers");

      let output = "";
      customers.map((customer) => {
        output += `
        <tr>
        <td>${customer.id}</td>
        <td>${customer.name}</td>
        <td>${customer.company}</td>
        <td>${customer.phone}</td>
        </tr>
         `;
        list.innerHTML = output;
      });
    }
  };
  xhr.onerror = () => {
    console.log("404, customers not found!");
  };
  xhr.send();
}
