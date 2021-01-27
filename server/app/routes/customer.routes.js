module.exports = app => {
    const customers = require("../controllers/customer.controller.js");
  
    // Create a new Customer
    app.post("/customers", customers.create);
  
    // Retrieve all Customers
    app.get("/customers", customers.findAll);
  
    // Delete a Customer with customerId
    app.delete("/customers/:customerId", customers.delete);

  };