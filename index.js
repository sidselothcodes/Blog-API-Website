import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

// In-memory data store
let posts = [
  {
    id: 1,
    title: "Exploring the Potential of Quantum Computing",
    content:
      "Quantum computing represents a significant leap forward in computational power. Unlike classical computers, which use bits to process information, quantum computers use quantum bits, or qubits, which can exist in multiple states simultaneously. This allows them to solve complex problems much faster than traditional computers. Researchers are optimistic that quantum computing will revolutionize fields such as cryptography, materials science, and drug discovery.",
    author: "Siddarth Seloth",
    
  },
  {
    id: 2,
    title: "The Future of Electric Vehicles",
    content:
      "Electric vehicles (EVs) are becoming an increasingly popular choice for consumers seeking sustainable transportation options. Advances in battery technology, charging infrastructure, and government incentives are driving the adoption of EVs. This article explores the latest trends in the EV market, the challenges that still need to be addressed, and what the future holds for electric mobility.",
    author: "Barney Stinson",
    
  },
  {
    id: 3,
    title: "The Benefits of Remote Work for Businesses",
    content:
      "Remote work has gained significant traction in recent years, especially in the wake of the global pandemic. Many businesses have discovered that allowing employees to work from home can lead to increased productivity, lower overhead costs, and higher employee satisfaction. This post delves into the benefits of remote work, strategies for effective remote team management, and the tools that can help businesses succeed in a remote work environment.",
    author: "Sheldon Cooper",
    
  },
];


let lastId = 3;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// GET all posts
app.get("/posts", (req, res) => {
  console.log(posts);
  res.json(posts);
});

// GET a specific post by id
app.get("/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ message: "Post not found" });
  res.json(post);
});

// POST a new post
app.post("/posts", (req, res) => {
  const newId = lastId += 1;
  const post = {
    id: newId,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    date: new Date(),
  };
  lastId = newId;
  posts.push(post);
  res.status(201).json(post);
});

// PATCH a post when you just want to update one parameter
app.patch("/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ message: "Post not found" });

  if (req.body.title) post.title = req.body.title;
  if (req.body.content) post.content = req.body.content;
  if (req.body.author) post.author = req.body.author;

  res.json(post);
});

// DELETE a specific post by providing the post id
app.delete("/posts/:id", (req, res) => {
  const index = posts.findIndex((p) => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Post not found" });

  posts.splice(index, 1);
  res.json({ message: "Post deleted" });
});

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
