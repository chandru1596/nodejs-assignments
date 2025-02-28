document.addEventListener("DOMContentLoaded", function () {
    const devicePrices = {
        "Samsung Galaxy S23": 70000,
        "iPhone 12 Pro": 80000,
        "iPhone 13 Pro": 90000,
        "iPhone 14": 95000,
        "iPhone 15 Pro": 120000,
        "Nothing-2": 40000,
        "Samsung S24": 110000,
        "Samsung S24 Ultra": 140000
    };

    const orderTable = document.getElementById("orderTable");
    const orderForm = document.getElementById("orderForm");

    function addNewRow() {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>
                <select class="form-control device-select" required>
                    <option selected disabled>Select a Device</option>
                    ${Object.keys(devicePrices).map(device => `<option value="${device}">${device}</option>`).join("")}
                </select>
            </td>
            <td><input type="number" class="form-control quantity" min="1" value="1" required></td>
            <td><input type="text" class="form-control rate" disabled></td>
            <td>
                <button type="button" class="btn btn-success add-item">Add</button>
                <button type="button" class="btn btn-danger delete-item" style="display:none;">Delete</button>
            </td>
        `;

        orderTable.appendChild(row);

        const deviceSelect = row.querySelector(".device-select");
        const rateInput = row.querySelector(".rate");
        const addItemBtn = row.querySelector(".add-item");
        const deleteItemBtn = row.querySelector(".delete-item");

        // Update rate field when a device is selected
        deviceSelect.addEventListener("change", function () {
            rateInput.value = devicePrices[this.value] || "";
        });

        // Handle "Add Item" button click
        addItemBtn.addEventListener("click", function () {
            if (!deviceSelect.value || !rateInput.value) {
                alert("Please select a device before adding.");
                return;
            }

            deviceSelect.disabled = true;
            addItemBtn.style.display = "none"; // Hide "Add" button
            deleteItemBtn.style.display = "inline-block"; // Show "Delete" button

            addNewRow(); // Add new row for next item
        });

        // Handle "Delete Item" button click
        deleteItemBtn.addEventListener("click", function () {
            row.remove();
        });
    }

    // Initialize first row
    addNewRow();

    // Handle form submission
    orderForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent default form submission

        const name = document.getElementById("inputName").value;
        const email = document.getElementById("inputemail").value;
        const address = document.getElementById("inputAddress").value;
        const mobile = document.getElementById("inputmobile").value;

        const products = [];
        document.querySelectorAll("#orderTable tr").forEach(row => {
            const item = row.querySelector(".device-select").value;
            const quantity = row.querySelector(".quantity").value;
            const rate = row.querySelector(".rate").value;

            if (item && quantity && rate) {
                products.push({ item, quantity, rate });
            }
        });

        if (products.length === 0) {
            alert("Please add at least one product.");
            return;
        }

        const orderData = {
            name,
            email,
            address,
            mobile,
            products
        };

        console.log("Submitting Order:", orderData);

        fetch("/user-order", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(orderData)
        })
        .then(response => response.json())
        .then(data => {
            if(data.message==='order placed Successfully'){

            alert("Order placed successfully!");
            console.log("Server Response:", data);
            orderForm.reset();
            orderTable.innerHTML = ""; // Clear table after successful submission
            addNewRow(); // Add a fresh row
            }
            else{
                console.log("Server Response:", data);
                console.log("Server Response:", data.error);

                alert(data.error)
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("Error submitting order.");
        });
    });
});
