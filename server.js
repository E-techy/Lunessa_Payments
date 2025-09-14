const cookieParser = require("cookie-parser");
const express = require("express");
const showAgentsTokenDetail = require("./utils/show_agents_token_detail");
const authenticateUser = require("./utils/authenticate_user");
const getBaseDiscountData = require("./utils/get_base_discount_data");
const authenticateAdmin = require("./utils/admin/authenticate_admin");
const handleAdminBaseDiscount = require("./utils/routes_handler/admin_base_discount");
const getAvailableOffers = require("./utils/get_available_offers");
const adminOffersHandler = require("./utils/routes_handler/admin_offers");
const verifyCoupon = require("./utils/verify_coupon");
const allotCouponsHandler = require("./utils/routes_handler/admin_allot_coupons");
const getAIModelPricingData = require("./utils/get_AI_model_pricing_data");
const adminHandleAIModelPricingData = require("./utils/routes_handler/admin_handle_AI_pricing_data");
const handleOrderCreation = require("./utils/routes_handler/handle_order_creation");
const confirmPaymentHandler = require("./utils/routes_handler/confirm_payment");
const modifyAgentUsingModelHandler = require("./utils/routes_handler/modify_agent_usingModel");
const buyAgentTokensHandler = require("./utils/routes_handler/buy_agent_tokens");
const viewAgentTokensHandler = require("./utils/routes_handler/view_agent_tokens");
const adminViewAgentsHandler = require("./utils/routes_handler/admin_view_agents");
const adminGetUserCouponsHandler = require("./utils/routes_handler/admin_get_user_coupons");




require("dotenv").config();

const JWT_SECRET_KEY= process.env.JWT_SECRET_KEY;

const RAZORPAY_KEY_ID = process.env.KEY_ID;
const RAZORPAY_KEY_SECRET = process.env.KEY_SECRET;


const Razorpay = require("razorpay");
const shortid = require("shortid");

const PORT = process.env.LUNESSA_AGENT_TOKENS_BUYING_PORT || 3004;

const app = express();

// Setting the view engine to ejs, to send dynamic file data
app.set('view engine', 'ejs');

// Middleware to parse JSON and cookies
app.use(express.json());
app.use(cookieParser());

// Setting static folder structure for sending static files in the ui 
app.use(express.static(__dirname+ "/Luneesa_Admin_Panel"));
app.use("/css_admin", express.static(__dirname + "/Luneesa_Admin_Panel/css_admin"));
app.use("/utils_admin", express.static(__dirname + "/Luneesa_Admin_Panel/utils_admin"));

// Display Admin Page
app.get("/lunessa_payment_admin", async (req, res) => {
  res.sendFile(__dirname + "/Luneesa_Admin_Panel/paymets_admin.html");
})

// Sending static files to the clients
app.use(express.static(__dirname + "/Lunessa_Buy_Tokens_Page"));

// Setting static folder structure for sending static files in the ui 

app.use(express.static(__dirname+ "/Lunessa_Agents_token_viewer"));
app.use("/css_viewer", express.static(__dirname + "/Lunessa_Agents_token_viewer/css_viewer"));
app.use("/utils_viewer", express.static(__dirname + "/Lunessa_Agents_token_viewer/utils_viewer"));

// Display all the agents 
app.get("/view_all_agents", async (req, res) => {
  res.sendFile(__dirname + "/Lunessa_Agents_token_viewer/agents_viewer.html");
})

// Agent tokens viewer Page for buying tokens
app.get("/buy_agent_tokens", authenticateUser, buyAgentTokensHandler);



// Sending the user agent details with their available tokens , all agent detials if username not specified
app.post("/view_agent_tokens", authenticateUser, viewAgentTokensHandler);

// Admin view agents
app.post("/admin/view_agents", authenticateAdmin, adminViewAgentsHandler);


// modify the status of the currently active model
app.post("/modify_agent_usingModel", authenticateUser, modifyAgentUsingModelHandler);



// route for sending the base discount slab to all users
app.post("/base_discount", async (req, res) =>{
    const baseDiscountData = await getBaseDiscountData();

    res.json(baseDiscountData);
});


// route for the admin to add or modify the base discount slab
app.post("/admin/base_discount", authenticateAdmin, async (req, res) => {
  const adminRole = req.adminRole; // ✅ provided by authenticateAdmin middleware
  await handleAdminBaseDiscount(req, res, adminRole);
});


// route for fetching the currently running offers which are applicable for the user
app.post("/offers", authenticateUser, async (req, res) => {
  const username = req.user?.username || null; // assume middleware sets req.user if logged in
  const result = await getAvailableOffers(username);

  if (!result.success) {
    return res.status(500).json(result);
  }
  res.json(result);
});


// route for the admin to create, modify and delete the offers and also get all offers 
app.post("/admin/offers", authenticateAdmin, adminOffersHandler, async (req, res) => {
   console.log("done dana done");
})


// route for verifying the coupons alloted to the users 
app.post("/verify_coupons", authenticateUser, async (req, res) => {
  try {
    const { couponCode } = req.body;

    if (!couponCode) {
      return res.status(400).json({
        success: false,
        error: "Coupon code is required",
      });
    }

    const result = await verifyCoupon({
      username: req.user.username, 
      couponCode,
    });

    return res.status(result.success ? 200 : 400).json(result);
  } catch (err) {
    console.error("❌ Route Error (/verify_coupons):", err);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
});


// route for the admin to give coupons to different users 
app.post("/admin/allot_coupons", authenticateAdmin, async (req, res) => {
  const { users, couponData } = req.body;

  const result = await allotCouponsHandler({
    adminRole: req.adminRole,
    users,
    couponData,
  });

  if (!result.success) {
    return res.status(400).json(result);
  }

  return res.status(200).json(result);
});

// route for the admin to get the coupons alloted to user using their username
app.post("/admin/get_user_coupons", authenticateAdmin, adminGetUserCouponsHandler);



// route for fetching the latest Ai models with their pricing data, 
app.post("/AI_models_pricing_data", async (req, res) => {
  try {
    // Read modelName from body or query (client can send either)
    const modelName = req.body.modelName || req.query.modelName || null;

    const result = await getAIModelPricingData({ modelName });

    if (!result.success) {
      return res.status(404).json({
        success: false,
        message: result.error || "Failed to fetch AI model pricing data.",
      });
    }

    return res.status(200).json({
      success: true,
      message: modelName
        ? `Pricing data for model '${modelName}' fetched successfully.`
        : "All AI models pricing data fetched successfully.",
      data: result.data,
    });
  } catch (error) {
    console.error("❌ Route error in /AI_models_pricing_data:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while fetching AI model pricing data.",
    });
  }
});

// handle the addition , deletion and modification of the Ai pricing data, 
app.post("/admin/AI_pricing_data", authenticateAdmin, adminHandleAIModelPricingData);



// create purchase data, with razorpay orderId
app.post("/create_order", authenticateUser, async (req, res) => {
  return handleOrderCreation(req, res, RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET );
});

// razorpay payments page redirect, 
app.post("/confirm_payment", authenticateUser, async (req, res) => {
  return confirmPaymentHandler(req, res, RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET );
});






// listening on the port url
app.listen(PORT, () => {
  console.log(
    `Server is listenting on port http://localhost:${PORT}/lunessa_payment_admin`
  );
  console.log(
    `Server is listenting on port http://localhost:${PORT}/buy_agent_tokens`
  );
  console.log(
    `Server is listenting on port http://localhost:${PORT}/view_all_agents`
  );
});
