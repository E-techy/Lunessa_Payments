Contributing to Lunessa Payments

Thank you for considering contributing to Lunessa Payments! 🚀
This guide will help you set up the project, understand its architecture, and contribute effectively.

📦 Tech Stack

Backend: Node.js + Express

Database: Prisma ORM (MongoDB)

Payments: Razorpay

Authentication: JWT-based (user & admin)

Frontend: EJS + Static assets (admin panel, agent viewer, token buying page)

⚙️ Project Structure
.
├── server.js                  # Main Express server
├── .env                       # Environment variables
├── utils/
│   ├── authenticate_user.js
│   ├── get_base_discount_data.js
│   ├── get_available_offers.js
│   ├── verify_coupon.js
│   ├── get_AI_model_pricing_data.js
│   ├── admin/
│   │   └── authenticate_admin.js
│   └── routes_handler/        # All route-specific handlers
│       ├── admin_base_discount.js
│       ├── admin_offers.js
│       ├── admin_allot_coupons.js
│       ├── admin_handle_AI_pricing_data.js
│       ├── handle_order_creation.js
│       ├── confirm_payment.js
│       ├── modify_agent_usingModel.js
│       ├── buy_agent_tokens.js
│       ├── view_agent_tokens.js
│       ├── admin_view_agents.js
│       ├── admin_get_user_coupons.js
│       ├── admin_delete_coupons.js
│       ├── admin_allot_tokens_to_agents.js
│       ├── admin_fetch_razorpay_orders.js
│       ├── admin_view_base_discount.js
│       ├── get_your_orders.js
│       ├── raise_payment_dispute.js
│       ├── get_your_disputes.js
│       ├── admin_fetch_disputes.js
│       ├── admin_modify_disputes.js
│       └── ...
├── Lunessa_Admin_Panel/       # Admin dashboard (static + EJS views)
├── Lunessa_Buy_Tokens_Page/   # Token purchase UI
└── Lunessa_Agents_token_viewer/ # Agent viewer UI

🔑 Environment Variables

Create a .env file in the root with:

JWT_SECRET_KEY=your_jwt_secret
KEY_ID=your_razorpay_key_id
KEY_SECRET=your_razorpay_key_secret
LUNESSA_AGENT_TOKENS_BUYING_PORT=3004

🚀 Getting Started

Clone the repo:

git clone https://github.com/your-username/lunessa-payments.git
cd lunessa-payments


Install dependencies:

npm install


Setup environment variables in .env (see above).

Run the server:

npm start


By default, it runs on http://localhost:3004

🛠️ How to Contribute
1. Fork & Branch

Fork this repo

Create a new branch:

git checkout -b feature/your-feature-name

2. Code Style Guidelines

Use ESLint & Prettier formatting (setup coming soon).

Follow existing file structure → new routes go in utils/routes_handler/.

Keep business logic in handlers, not in server.js.

3. Adding Routes

Place new route handlers inside utils/routes_handler/.

Import and wire them up in server.js.

Protect routes with the right middleware:

authenticateUser → For user-specific endpoints

authenticateAdmin → For admin-only endpoints

4. Testing

Write unit tests for handlers where possible.

Use Postman/Insomnia collections for API testing.

5. Commit Messages

Follow Conventional Commits:

feat: add Razorpay refund API handler
fix: correct JWT validation in authenticateUser
docs: update CONTRIBUTING.md

6. Pull Requests

Push changes:

git push origin feature/your-feature-name


Open a PR with:

Description of changes

Related issue (if any)

Testing steps

🧪 Example Contributions

Adding a new Razorpay integration (refunds, subscriptions).

Extending the admin panel UI.

Improving error handling & logging.

Adding unit/integration tests.

📜 License

This project is licensed under the MIT License.