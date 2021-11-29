// async function myFunc() {
//     const promise = new Promise((resolve, reject) => {
//         setTimeout(() => resolve('Hello'), 1000);
//         });

//         const error = false;
//         if(!error) {
//             const res = await promise; // wait until promise is resolved
//             return res;
//         } else {
//             await Promise.reject(new Error('Something went wrong...'));
//         }
//     }

// myFunc()
//   .then(res => console.log(res))
//   .catch(err => console.log(err));

async function getUsers() {
  // await response of the fetch request
  const response = await fetch("https://jsonplaceholder.typicode.com/users");

  // proceed once fetch is resolved
  const data = await response.json();
  // proceed once the second promise is resolved
  return data;
}

getUsers().then(
  (users) =>
    (document.body.innerHTML = `
<pre><code>${JSON.stringify(users, null, 2)}</code</pre>
`)
);
