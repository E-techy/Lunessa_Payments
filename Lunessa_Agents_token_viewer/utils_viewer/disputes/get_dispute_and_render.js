document.addEventListener("DOMContentLoaded", () => {
  const disputesTabButton = document.getElementById("your-dispute-tab");

  disputesTabButton.addEventListener("click", async () => {
    try {
      // If your token is in cookies, you can skip adding Authorization header
      // Otherwise, get it from localStorage or wherever you store it
      const token = localStorage.getItem("authToken"); // adjust if needed

      const response = await fetch("/get_your_disputes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { "Authorization": `Bearer ${token}` }),
        },
      });

      const data = await response.json();
      console.log("Disputes Response:", data);
    } catch (error) {
      console.error("Error fetching disputes:", error);
    }
  });
});