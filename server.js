const cookieParser = require("cookie-parser");
const express = require("express");
const showAgentsTokenDetail = require("./utils/show_agents_token_detail");
const authenticateUser = require("./utils/authenticate_user");

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


// Sending the user agent details with their available tokens
app.post("/view_agent_tokens", authenticateUser, async (req, res) => {
  try {
    const { username } = req.user; // comes from middleware

    const result = await showAgentsTokenDetail(username);

    if (!result.success) {
      return res.status(404).json(result);
    }

    return res.json(result);
  } catch (error) {
    console.error("Error in /view_agent_tokens:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
});

// listening on the port url
app.listen(PORT, () => {
  console.log(
    `Server is listenting on port http://localhost:${PORT}/view_agent_tokens`
  );
});
