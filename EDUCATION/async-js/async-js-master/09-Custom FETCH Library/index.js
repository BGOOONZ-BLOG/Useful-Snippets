const http = new customFETCH();

const data = {
  name: "John Doe",
  username: "johndoe",
  email: "john@gmail.com",
};

// GET Request
http
  .get("https://jsonplaceholder.typicode.com/users")
  .then((data) => console.log(data))
  .catch((err) => console.log(err));

// POST Request
http
  .post("https://jsonplaceholder.typicode.com/users", data)
  .then((data) => console.log(data))
  .catch((err) => console.log(err));

// PUT Request
http
  .put("https://jsonplaceholder.typicode.com/users/2", data)
  .then((data) => console.log(data))
  .catch((err) => console.log(err));

// DELETE Request
http
  .delete("https://jsonplaceholder.typicode.com/users/2")
  .then(() => console.log(data))
  .catch((err) => console.log(err));
