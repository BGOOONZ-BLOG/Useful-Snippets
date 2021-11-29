const button = document.querySelector(".getJokes");
button.addEventListener("click", getJokes);

function getJokes(e) {
  const number = document.querySelector('input[type="number"]').value;

  const xhr = new XMLHttpRequest();

  xhr.open("GET", `https://api.icndb.com/jokes/random/${number}`, true);

  xhr.onload = function () {
    if (this.status === 200) {
      const response = JSON.parse(this.responseText);

      let output = "";

      if (number === "") {
        alert("Enter number of jokes first");
      } else if (response.type === "success") {
        response.value.map(({joke}) => {
          output += `<li>${joke}</li>`;
        });
      } else {
        output += "<li>Something went wrong...</li>";
      }
      document.querySelector(".jokes").innerHTML = output;
    }
  };
  xhr.send();

  e.preventDefault();
}
