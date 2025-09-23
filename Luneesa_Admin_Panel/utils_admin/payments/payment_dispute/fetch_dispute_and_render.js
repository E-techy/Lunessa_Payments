document.addEventListener("DOMContentLoaded", () => {
    const fetchBtn = document.getElementById("dispute-fetch-btn");
    if (!fetchBtn) return;

    fetchBtn.addEventListener("click", async () => {
        const usernameInput = document.getElementById("dispute-username").value.trim();
        const resolvedSelect = document.getElementById("dispute-resolved-filter").value;

        const payload = {};
        if (usernameInput) payload.username = usernameInput;
        if (resolvedSelect === "resolved") payload.resolved = true;
        else if (resolvedSelect === "unresolved") payload.resolved = false;

        try {
            const response = await fetch("/admin/fetch_disputes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            const data = await response.json();
            console.log("Fetch Disputes Response:", data);
        } catch (err) {
            console.error("Error fetching disputes:", err);
        }
    });
});
