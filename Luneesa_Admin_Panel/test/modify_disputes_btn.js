async function modifyDisputes({
  action,          // "modify" | "delete"
  username,        // target user
  disputeId = null,
  resolved = false,
  resolvedComment = "",
  all = false
}) {
  try {
    const response = await fetch("/admin/modify_disputes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 🔑 token auto-included if cookie, else set manually:
        "Authorization": `Bearer ${localStorage.getItem("adminToken")}`
      },
      body: JSON.stringify({
        action,
        username,
        disputeId,
        resolved,
        resolvedComment,
        all
      }),
      credentials: "include" // for cookie-based JWT
    });

    const data = await response.json();
    console.log("📌 Dispute API response:", data);

    // return result so button can handle it
    return data;
  } catch (error) {
    console.error("❌ Network/API Error:", error);
    return {
      success: false,
      error: error.message || "Network request failed"
    };
  }
}

// 🟢 Example usage on button click
document.getElementById("modifyDisputeBtn").addEventListener("click", async () => {
  const result = await modifyDisputes({
    action: "modify",
    username: "john_doe",
    disputeId: "uuid-123",
    resolved: true,
    resolvedComment: "Refund approved by admin"
  });

  // 👇 Handle UI update
  if (result.success) {
    alert("✅ Dispute updated successfully!");
  } else {
    alert("⚠️ Failed: " + result.error);
  }
});



// ✅ Success → Single Dispute Modified
// {
//   "success": true,
//   "data": {
//     "id": "676d8f2c9d2b4f39b8c7c512",
//     "username": "john_doe",
//     "disputes": [
//       {
//         "disputeId": "uuid-123",
//         "orderId": "order_987",
//         "disputeComment": "Item not delivered",
//         "resolved": true,
//         "resolvedComment": "Refund approved by admin",
//         "createdAt": "2025-09-17T23:45:12.000Z",
//         "updatedAt": "2025-09-18T01:30:00.000Z"
//       }
//     ],
//     "createdAt": "2025-09-10T10:00:00.000Z",
//     "updatedAt": "2025-09-18T01:30:00.000Z"
//   }
// }

// ✅ Success → All Disputes Modified
// {
//   "success": true,
//   "data": {
//     "id": "676d8f2c9d2b4f39b8c7c512",
//     "username": "john_doe",
//     "disputes": [
//       {
//         "disputeId": "uuid-123",
//         "orderId": "order_987",
//         "disputeComment": "Late delivery",
//         "resolved": true,
//         "resolvedComment": "Resolved in bulk update",
//         "createdAt": "2025-09-10T10:00:00.000Z",
//         "updatedAt": "2025-09-18T01:40:00.000Z"
//       },
//       {
//         "disputeId": "uuid-456",
//         "orderId": "order_654",
//         "disputeComment": "Wrong item",
//         "resolved": true,
//         "resolvedComment": "Resolved in bulk update",
//         "createdAt": "2025-09-12T14:22:00.000Z",
//         "updatedAt": "2025-09-18T01:40:00.000Z"
//       }
//     ],
//     "createdAt": "2025-09-10T10:00:00.000Z",
//     "updatedAt": "2025-09-18T01:40:00.000Z"
//   }
// }

// ✅ Success → Single Dispute Deleted
// {
//   "success": true,
//   "data": {
//     "id": "676d8f2c9d2b4f39b8c7c512",
//     "username": "john_doe",
//     "disputes": [
//       {
//         "disputeId": "uuid-999",
//         "orderId": "order_111",
//         "disputeComment": "Damaged product",
//         "resolved": false,
//         "resolvedComment": "",
//         "createdAt": "2025-09-15T08:00:00.000Z",
//         "updatedAt": "2025-09-15T08:00:00.000Z"
//       }
//     ],
//     "createdAt": "2025-09-10T10:00:00.000Z",
//     "updatedAt": "2025-09-18T01:50:00.000Z"
//   }
// }

// ✅ Success → All Disputes Deleted
// {
//   "success": true,
//   "data": {
//     "id": "676d8f2c9d2b4f39b8c7c512",
//     "username": "john_doe",
//     "disputes": [],
//     "createdAt": "2025-09-10T10:00:00.000Z",
//     "updatedAt": "2025-09-18T01:55:00.000Z"
//   }
// }

// ❌ Failure → Validation Error
// {
//   "success": false,
//   "error": "Invalid input: action must be \"modify\" or \"delete\"."
// }

// ❌ Failure → Dispute Not Found
// {
//   "success": false,
//   "error": "DisputeId uuid-999 not found for username john_doe."
// }

// ❌ Failure → Unauthorized Role
// {
//   "success": false,
//   "error": "Unauthorized: only superAdmin or payments role can modify/delete disputes."
// }

// ❌ Failure → User Has No Disputes
// {
//   "success": false,
//   "error": "No disputes found for username: john_doe"
// }

// 3️⃣ Button Handling in UI

// You can use the success flag and error field to decide UI state:

// if (result.success) {
//   showToast("✅ Dispute updated!");
//   updateDisputesTable(result.data.disputes);
// } else {
//   showToast("❌ Error: " + result.error);
// }


// 1️⃣ Input Format – Modify a Single Dispute (all = false)
// {
//   "username": "john_doe",
//   "disputeId": "uuid-123",
//   "resolved": true,
//   "resolvedComment": "Refund approved by admin",
//   "all": false
// }

// Expected Output
// {
//   "success": true,
//   "message": "Dispute updated successfully",
//   "data": {
//     "username": "john_doe",
//     "disputes": [
//       {
//         "disputeId": "uuid-123",
//         "orderId": "ORD123",
//         "disputeComment": "Payment not confirmed",
//         "resolved": true,
//         "resolvedComment": "Refund approved by admin",
//         "createdAt": "2025-09-18T10:45:00Z",
//         "updatedAt": "2025-09-18T12:30:00Z"
//       },
//       {
//         "disputeId": "uuid-456",
//         "orderId": "ORD124",
//         "disputeComment": "Refund delayed",
//         "resolved": true,
//         "resolvedComment": "Refund processed",
//         "createdAt": "2025-09-12T09:30:00Z",
//         "updatedAt": "2025-09-13T12:00:00Z"
//       }
//     ]
//   }
// }


// ✅ Only the matching disputeId is updated.
// ✅ Rest remain unchanged.

// 2️⃣ Input Format – Modify All Disputes of a User (all = true)
// {
//   "username": "john_doe",
//   "resolved": true,
//   "resolvedComment": "All disputes marked resolved by admin",
//   "all": true
// }

// Expected Output
// {
//   "success": true,
//   "message": "All disputes updated successfully",
//   "data": {
//     "username": "john_doe",
//     "disputes": [
//       {
//         "disputeId": "uuid-123",
//         "orderId": "ORD123",
//         "disputeComment": "Payment not confirmed",
//         "resolved": true,
//         "resolvedComment": "All disputes marked resolved by admin",
//         "createdAt": "2025-09-18T10:45:00Z",
//         "updatedAt": "2025-09-18T12:30:00Z"
//       },
//       {
//         "disputeId": "uuid-456",
//         "orderId": "ORD124",
//         "disputeComment": "Refund delayed",
//         "resolved": true,
//         "resolvedComment": "All disputes marked resolved by admin",
//         "createdAt": "2025-09-12T09:30:00Z",
//         "updatedAt": "2025-09-18T12:30:00Z"
//       }
//     ]
//   }
// }


// ✅ Every dispute in the username’s disputes[] gets updated.
// ✅ resolved and resolvedComment applied to all.

// 3️⃣ Failure / Error Responses

// Missing required fields:

// { "success": false, "error": "username, resolved are required fields" }


// all = false but disputeId missing:

// { "success": false, "error": "disputeId is required when all = false" }


// User not found:

// { "success": false, "error": "No disputes found for username: john_doe" }
