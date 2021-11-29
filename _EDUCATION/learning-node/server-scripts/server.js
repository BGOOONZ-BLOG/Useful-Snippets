import http from "http";

const server = http.createServer(({method, url}, res) => {
  // console.log('headers', req.headers)
  console.log("methods", method);
  console.log("url", url);
  const user = {
    id: 1,
    name: "Leanne Graham",
    username: "Bret",
    email: "Sincere@april.biz",
    address: {
      street: "Kulas Light",
      suite: "Apt. 556",
      city: "Gwenborough",
      zipcode: "92998-3874",
      geo: {
        lat: "-37.3159",
        lng: "81.1496",
      },
    },
    phone: "1-770-736-8031 x56442",
    website: "hildegard.org",
    company: {
      name: "Romaguera-Crona",
      catchPhrase: "Multi-layered client-server neural-net",
      bs: "harness real-time e-markets",
    },
  };
  res.setHeader("content-Type", "application/json");
  res.end(JSON.stringify(user));
});

server.listen(3002);
