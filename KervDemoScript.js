function validateOrderDate(executionContext) {
    var formContext = executionContext.getFormContext();
    var orderDateField = formContext.getAttribute("Order Date");

    orderDateField.addOnChange(function () {
        var selectedDate = orderDateField.getValue();
        if (selectedDate) {
            var today = new Date();
            today.setHours(0, 0, 0, 0); // Set time to midnight to avoid time comparison issues

            if (selectedDate < today) {
                // If the selected date is less than today's date, display an error message and clear the field
                formContext.ui.setFormNotification("Order Date cannot be less than today's date.", "ERROR", "1");
                orderDateField.setValue(null);
            } else {
                // Remove any previous error notification
                formContext.ui.clearFormNotification("1");
            }
        }
    });
}
function fetchAndSetIPAddress(executionContext) {
    var formContext = executionContext.getFormContext();

    // Fetch the IP address using the ipify API
    fetch('https://api.ipify.org/?format=json')
        .then(response => response.json())
        .then(data => {
            var ipAddress = data.ip;

            // Update the field with the fetched IP address
            formContext.getAttribute("new_Ipaddress").setValue(ipAddress);
        })
        .catch(error => {
            console.error("Error fetching IP address:", error);
        });
}

