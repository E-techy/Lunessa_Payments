const cookieParser = require("cookie-parser");
const express = require("express");
const showAgentsTokenDetail = require("./utils/show_agents_token_detail");
const authenticateUser = require("./utils/authenticate_user");
const getBaseDiscountData = require("./utils/get_base_discount_data");
const authenticateAdmin = require("./utils/admin/authenticate_admin");
const handleAdminBaseDiscount = require("./utils/routes_handler/admin_base_discount");
const getAvailableOffers = require("./utils/get_available_offers");
const adminOffersHandler = require("./utils/routes_handler/admin_offers");
const verifyCoupon = require("./utils/routes_handler/verify_coupon");
const allotCouponsHandler = require("./utils/routes_handler/admin_allot_coupons");


require("dotenv").config();

const JWT_SECRET_KEY= process.env.JWT_SECRET_KEY;


const Razorpay = require("razorpay");
const shortid = require("shortid");

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
  res.sendFile(__dirname + "/Lunessa_Buy_Tokens_Page/Agent_tokens_buyer.html");
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


// buy agent tokens, with offers
app.post("/offer_selection", authenticateUser, async (req, res) => {
  
})


// generate final bill
app.post("/agents_tokens_bill", authenticateUser, async (req, res) => {
  
})

// razorpay payments page redirect, 
app.post("/confirm_payment", authenticateUser, async (req, res) => {
  
})

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



// listening on the port url
app.listen(PORT, () => {
  console.log(
    `Server is listenting on port http://localhost:${PORT}/view_agent_tokens`
  );
});
