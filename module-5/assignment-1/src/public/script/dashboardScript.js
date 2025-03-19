document.addEventListener('DOMContentLoaded', () => {
    fetch("/order-details", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if (data.length > 0) {
            const orderTable = document.getElementById("orderDetails");

            data.forEach((order, i) => {
                console.log(order.date);
                const timeDifference = Date.now() - new Date(order.date);
                const dayDifference = timeDifference / (1000 * 60 * 60 * 24);

                let status = "";
                let statusClass = "";
                if (dayDifference <= 1) {
                    status = "In-Progress";
                    statusClass = "s-yellow";
                } else if (dayDifference > 1 && dayDifference <= 2) {
                    status = "Dispatched";
                    statusClass = "s-orange";
                } else {
                    status = "Delivered";
                    statusClass = "s-green";
                }

                let productsList = order.products
                ? order.products.map(p => `${p.item} - ${p.quantity}`).join(", ")
                : "No items";

                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${i + 1}</td>
                    <td>${order.name}</td>
                    <td>${order.email}</td>
                    <td>${order.mobile}</td>
                    <td>${order.address}</td>
                    <td>${productsList}</td> 
                    <td class='${statusClass}'>${status}</td>
                    <td>
                        <button onclick="sendmail('${order.email}', '${status}')">Send mail</button>
                    </td>
                `;
                orderTable.appendChild(row);
            });
        } else {
            const orderTable = document.getElementById("orderDetails");
            const row = document.createElement("tr");
            row.innerHTML = `<td colspan="7">No Orders</td>`;
            orderTable.appendChild(row);
        }
    })
    .catch(err => console.log(err));
});

function sendmail(mail, status) {
    const mailBody = {
        mail: mail,
        status: status
    };

    fetch("/order-details/send-mail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(mailBody)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("✅ Email sent successfully!");
        } else {
            alert("❌ Email failed: " + data.error);
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("❌ Error sending email.");
    });
}
