document.addEventListener("DOMContentLoaded", async () => {
    try {
    const response = await fetch("/view_agent_tokens", {
        method: "POST",
        credentials: "include", // send JWT cookie
        headers: {
        "Content-Type": "application/json"
        }
    });

    const data = await response.json();
    console.log("Agent token details:", data);
    } catch (error) {
    console.error("Error fetching agent tokens:", error);
    }
});