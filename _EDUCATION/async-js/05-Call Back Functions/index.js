const posts = [
  {
    title: "Building & Deploying your first Progressive Web App",
    body: "Progressive Web Apps are very much in use by some of the biggest companies like Twitter, Forbes, Alibaba, Instagram, Flipkart e.t.c and have gained popularity. Building a PWA is quite easy and simple. In this tutorial, we’re going to build a simple Progressive web app (A weight converter app). Let’s roll :)",
  },
  {
    title: "Introducing CSS Custom Properties (Variables)",
    body: "In Modern CSS, we now have a new powerful feature called Custom properties, otherwise known as CSS variables or cascading variables. Now you can declare variables directly in your CSS without having to use CSS Preprocessors.",
  },
];

// function createPost(post) {
//   setTimeout(() => {
//     posts.push(post);
//   }, 2000);
// }

// function getPosts() {
//   setTimeout(() => {
//     let output = '';
//     posts.map((post) => {
//       output += `<li>${post.title}</li>`;
//     });
//     document.body.innerHTML = output;
//   }, 1000);
// }

// createPost({title: 'post three', body: 'this is post three'})

// getPosts();

function createPost(post, callback) {
  setTimeout(() => {
    posts.push(post);
    callback();
  }, 1000);
}

function getPosts() {
  setTimeout(() => {
    let output = "";
    posts.map(({title, body}) => {
      output += `
      <li>${title}</li>
      <p>${body}</p>
      `;
    });
    document.body.innerHTML = output;
  }, 500);
}

createPost(
  {
    title:
      "Iterating through JavaScript Objects  -  5 Techniques and Performance Tests.",
    body: "Developers tend to know how to iterate through JavaScript Arrays easily but most times they tend to get confused while working with JavaScript Objects especially beginners and intermediates. In this article, I’d show you Five (5) different ways of iterating through JavaScript Objects and some performance comparison tests to show you which is faster and more efficient.",
  },
  getPosts
);
