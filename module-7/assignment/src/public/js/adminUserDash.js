$(document).ready(function() {
    $('#userTable').DataTable();

    // 🟢 Edit User - Populate Modal Fields
    $(".edit-btn").on("click", function() {
        $("#editUserId").val($(this).data("id"));
        $("#editUserName").val($(this).data("name"));
        $("#editUserEmail").val($(this).data("email"));
        $("#editRole").val($(this).data("role"));
    });

    // 🔴 Delete User - Set Product ID
    $(".delete-btn").on("click", function() {
        $("#deleteUserId").val($(this).data("id"));
    });


    // 🔵 Edit Product - Send Data Correctly
    $("#editUserForm").submit(function(e) {
        e.preventDefault();
        console.log("Incoming");
    
        const data = {
            id: $("#editUserId").val(),
            name: $("#editUserName").val(),
            email: $("#editUserEmail").val(),
            role: $("#editRole").val(),
        };
       console.log(data)
        $.ajax({
            url: "/dash/user",
            type: "PUT",
            data: JSON.stringify(data),  // Convert to JSON
            contentType: "application/json",  // Tell the server we're sending JSON
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
        const data = { id: $("#deleteUserId").val() };

        $.ajax({
            url: "/dash/user",
            type: "DELETE",
            data: data,
            success: function(response) {
                if (response.msg === "success") location.reload();
            }
        });
    });
});
