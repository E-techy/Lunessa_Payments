const cookieParser = require("cookie-parser");
const express = require("express");

require("dotenv").config();
const PORT = process.env.LUNESSA_AGENT_TOKENS_BUYING_PORT || 3004;

const app = express();

// Middleware to parse JSON and cookies
app.use(express.json());
app.use(cookieParser());

// Sending static files to the clients
app.use(express.static(__dirname + "/Lunessa_Buy_Tokens_Page"));

// Agent tokens viewer Page for buying tokens
app.get("/view_agent_tokens", async (req, res) => {
  // Sending the tokens viewer page
  res.sendFile(__dirname + "/Lunessa_Buy_Tokens_Page/Agent_tokens_viewer.html");
});

// listening on the port url
app.listen(PORT, () => {
  console.log(
    `Server is listenting on port http://localhost:${PORT}/view_agent_tokens`
  );
});
