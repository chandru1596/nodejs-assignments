$(document).ready(function() {
    $('#productTable').DataTable();

    // 🟢 Edit Product - Populate Modal Fields
    $(".edit-btn").on("click", function() {
        $("#editProductId").val($(this).data("id"));
        $("#editProductID").val($(this).data("productid"));
        $("#editProductName").val($(this).data("name"));
        $("#editDescription").val($(this).data("description"));
        $("#editProductPrice").val($(this).data("price"));
    });

    // 🔴 Delete Product - Set Product ID
    $(".delete-btn").on("click", function() {
        $("#deleteProductId").val($(this).data("id"));
    });

    // 🟢 Add Product - Send Data Correctly
    $("#addProductForm").submit(function(e) {
        e.preventDefault();
        const data = {
            productId: $("#productID").val(),
            productName: $("#productName").val(),
            description: $("#description").val(),
            price: $("#productPrice").val()
        };

        $.post("/dash/product", data, function(response) {
            if (response.msg === "success") location.reload();
        });
    });

    // 🔵 Edit Product 
    $("#editProductForm").submit(function(e) {
        e.preventDefault();
        console.log("Incoming");
    
        const data = {
            id: $("#editProductId").val(),
            productId: $("#editProductID").val(),
            productName: $("#editProductName").val(),
            description: $("#editDescription").val(),
            price: $("#editProductPrice").val()
        };
       console.log(data)
        $.ajax({
            url: "/dash/product",
            type: "PUT",
            data: JSON.stringify(data),
            contentType: "application/json", 
            success: function(response) {
                console.log("Response:", response);
                if (response.msg === "success") location.reload();
            },
            error: function(xhr, status, error) {
                console.error("AJAX Error:", status, error);
            }
        });
    });

    // 🔴 Delete Product - Send Correct Data
    $("#confirmDelete").click(function() {
        const data = { id: $("#deleteProductId").val() };

        $.ajax({
            url: "/dash/product",
            type: "DELETE",
            data: data,
            success: function(response) {
                if (response.msg === "success") location.reload();
            }
        });
    });
});
