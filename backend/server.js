// server.js
const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const router = require("./routes/index");

// Load environment variables
dotenv.config();

// Middlewares
app.use(cors({
    origin: "https://chatbot-ai-wine.vercel.app",
    credentials: true,
}));

app.use(bodyParser.json());

app.use('/', router);

// // middleware to parse incoming requests
app.use(express.json());

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});;
