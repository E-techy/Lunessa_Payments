document.addEventListener("DOMContentLoaded", () => {
  const yourOrdersBtn = document.getElementById("your-orders-tab");

  if (yourOrdersBtn) {
    yourOrdersBtn.addEventListener("click", async () => {
      try {
        // Replace with however you're storing the token
        const token = localStorage.getItem("authToken") || "";

        const response = await fetch("/get_your_orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        const data = await response.json();
        console.log("📦 User Orders Response:", data);
      } catch (err) {
        console.error("❌ Failed to fetch user orders:", err);
      }
    });
  }
});
