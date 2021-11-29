document.getElementById("button").addEventListener("click", loadData);

function loadData() {
  // Create XHR Object
  const xhr = new XMLHttpRequest();

  // OPEN
  xhr.open("GET", "data.txt", true);

  // Optional - Used for spinners or Loaders
  xhr.onprogress = function () {
    console.log("READYSTATE", this.readyState);
  };

  xhr.onload = function () {
    if (this.status === 200) {
      // console.log(this.responseText);
      document.getElementById(
        "output"
      ).innerHTML = `<h1>${this.responseText}</h1>`;
    }
  };

  // xhr.onreadystatechange = function() {
  // console.log('READY STATE', xhr.readyState  )
  //   if(this.status === 200 && this.readyState=== 4) {
  //     console.log(this.responseText);
  //   }
  // }

  xhr.onerror = () => {
    console.error("Request error!");
  };

  xhr.send();
}
