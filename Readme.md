### Lunessa Payment Server README

This is the main server for the Lunessa application, dedicated to handling all payment-related processes. It manages token purchases for agents, user transactions, and administrative oversight of all financial activities. The server is built on a secure, modular architecture, ensuring all data and operations are protected.

---

### Key Features 🔐

* **Secure Payment Processing**: Utilizes **Razorpay** to facilitate safe and reliable token purchases for agents.
* **JWT Authentication**: All user and admin routes are secured with **JSON Web Tokens (JWT)**, guaranteeing that only authenticated users can access specific functionalities.
* **Comprehensive Admin Panel**: A dedicated set of administrative routes allows for granular control over the system, including managing discounts, offers, coupons, and resolving payment disputes.
* **Modular Design**: The codebase is organized into separate route handlers and utility functions, making it clean, maintainable, and scalable.
* **Dispute Management**: A built-in system allows users to raise payment disputes, which administrators can then verify and resolve, ensuring fairness and transparency.

---

### Getting Started 🚀

1.  **Clone the Repository**: Get the latest server code from the repository.
2.  **Install Dependencies**: Run `npm install` to install all required packages listed in `package.json`.
3.  **Environment Setup**: Create a `.env` file with the following variables:
    * `JWT_SECRET_KEY`: A strong, secret key for JWT signing.
    * `KEY_ID`: Your Razorpay Key ID.
    * `KEY_SECRET`: Your Razorpay Key Secret.
    * `LUNESSA_AGENT_TOKENS_BUYING_PORT`: The port number you want the server to run on (e.g., `3004`).
4.  **Run the Server**: Start the server with `node server.js` or `npm start`.

---

### API Endpoints 💻

#### Public Routes

| Endpoint | Description |
| :--- | :--- |
| `POST /base_discount` | Fetches the current base discount slab. |
| `POST /AI_models_pricing_data` | Retrieves pricing data for all available AI models. |

#### User Routes (Authentication Required)

| Endpoint | Description |
| :--- | :--- |
| `GET /buy_agent_tokens` | Renders the page for purchasing tokens. |
| `POST /view_agent_tokens` | Provides token information for a specific agent. |
| `POST /verify_coupons` | Validates a user-provided coupon code. |
| `POST /create_order` | Initiates a new payment order with Razorpay. |
| `POST /confirm_payment` | Confirms the payment and updates the user's tokens. |
| `POST /get_your_orders` | Fetches a list of the user's past orders. |
| `POST /raise_payment_dispute` | Allows users to create a new dispute. |
| `POST /get_your_disputes` | Retrieves the status of the user's disputes. |

---

#### Admin Routes (Admin Authentication Required)

| Endpoint | Description |
| :--- | :--- |
| `POST /admin/view_base_discount` | Admin view of current discount data. |
| `POST /admin/base_discount` | Admin management of discount slabs. |
| `POST /admin/offers` | Admin can manage promotional offers. |
| `POST /admin/allot_coupons` | Allots coupons to users. |
| `POST /admin/delete_coupons` | Deletes coupons from a user's account. |
| `POST /admin/AI_pricing_data` | Manages AI model pricing data. |
| `POST /admin/allot_tokens_to_agents` | Manually assigns tokens to agents. |
| `POST /admin/fetch_razorpay_orders` | Retrieves and filters Razorpay orders. |
| `POST /admin/fetch_disputes` | Fetches all pending payment disputes. |
| `POST /admin/modify_disputes` | Resolves or modifies existing disputes. |

---

### Important Notes

* **Security is paramount.** All admin actions must be performed using a **valid JWT token with admin privileges**. This token should be sent via a cookie or an authorization header.
* When resolving disputes, **always verify the user's order details** before alloting tokens or issuing refunds to prevent fraudulent activity.
* The system uses static file serving for the admin and user interfaces. The admin panel can be accessed at `/lunessa_payment_admin`, and the token purchasing page is at `/buy_agent_tokens`.