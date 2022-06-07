const button1 = document.getElementById("button1");
const button2 = document.getElementById("button2");
const button3 = document.getElementById("button3");
const display = document.getElementById("output");

// GET Local Text file data
button1.addEventListener("click", getText);

function getText(e) {
  fetch("data.txt")
    .then((res) => {
      return res.text();
    })
    .then((data) => {
      console.log(data);
      output.innerHTML = data;
    })
    .catch((err) => {
      console.log(err);
    });

  e.preventDefault();
}

// Get local json file
button2.addEventListener("click", getJson);

function getJson(e) {
  fetch("posts.json")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      let output = "";

      data.map(({ title }) => {
        output += `<li>${title}</li>`;
      });
      display.innerHTML = output;
    })
    .catch((err) => {
      console.log(err);
    });

  e.preventDefault();
}

// Get API
button3.addEventListener("click", getExt);

function getExt(e) {
  fetch("https://api.github.com/users")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      let output = "";

      data.map(({ login, avatar_url }) => {
        output += `
      <li>${login}</li>
      <img src="${avatar_url}" alt="">
      `;
      });
      display.innerHTML = output;
    })
    .catch((err) => {
      console.log(err);
    });

  e.preventDefault();
}
