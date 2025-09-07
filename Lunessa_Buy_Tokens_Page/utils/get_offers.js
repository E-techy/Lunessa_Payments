// utils/get_offers.js
document.addEventListener("DOMContentLoaded", () => {
  const calculateBtn = document.getElementById("calculateBtn");
  const offersGrid = document.getElementById("offersGrid");

  // ✅ Create offer card HTML
  function createOfferCard(offer) {
    const {
      title,
      description,
      offerCode,
      discountType,
      discountValue,
      minPurchaseAmount,
      offerType,
    } = offer;

    // Pick badge label from offerType
    const badgeLabels = {
      festival: "Festival",
      referral: "Referral",
      welcome: "Welcome",
      default: "Special",
    };
    const badgeText = badgeLabels[offerType] || badgeLabels.default;

    // Format discount string
    let discountText = "";
    if (discountType === "percentage") {
      discountText = `${discountValue}% off`;
    } else if (discountType === "flat") {
      discountText = `Flat ₹${discountValue} off`;
    }

    return `
      <div class="offer-card ${offerType}" 
           data-discount-type="${discountType}" 
           data-discount-value="${discountValue}" 
           data-min-amount="${minPurchaseAmount}">
        <div class="offer-badge">${badgeText}</div>
        <h3>${title}</h3>
        <p>${description || discountText}</p>
        <div class="offer-details">
          <span class="offer-code">${offerCode || "AUTO"}</span>
          <button class="apply-offer-btn">Apply Offer</button>
        </div>
      </div>
    `;
  }

  // ✅ Render offers
  function renderOffers(offers) {
    if (!offers || offers.length === 0) {
      offersGrid.innerHTML = `<p class="no-offers">No offers available right now.</p>`;
      return;
    }

    offersGrid.innerHTML = offers.map(createOfferCard).join("");
  }

  // ✅ Fetch offers from backend
  async function fetchOffers() {
    try {
      const response = await fetch("/offers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // 👇 If JWT token is stored in localStorage/cookie, send it here
          Authorization: `Bearer ${localStorage.getItem("authToken") || ""}`,
        },
        credentials: "include", // 👈 very important (sends cookies!)
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch offers: ${response.status}`);
      }

      const result = await response.json();
      console.log("✅ Offers:", result);

      if (result.success && result.data) {
        renderOffers(result.data);
      } else {
        offersGrid.innerHTML = `<p class="error-msg">Unable to load offers.</p>`;
      }
    } catch (error) {
      console.error("❌ Error fetching offers:", error);
      offersGrid.innerHTML = `<p class="error-msg">Something went wrong while fetching offers.</p>`;
    }
  }

  // ✅ Event: On Calculate Price button click
  calculateBtn.addEventListener("click", fetchOffers);
});
