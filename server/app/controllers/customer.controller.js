const Customer = require("../models/customer.model.js");

// Create and Save a new Customer
exports.create = (req, res) => {

  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const customer = new Customer({
    email: req.body.email,
    provider: req.body.provider,
  });

  Customer.create(customer, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Customer.",
      });
    else res.send(data);
  });
};

// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
  Customer.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers.",
      });
    else res.send(data);
  });
};

// Retrieve all Customers from the database.
exports.delete = (req, res) => {
  Customer.remove(req.params.customerId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.customerId}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Customer with id " + req.params.customerId,
        });
      }
    } else res.send({ message: `Customer was deleted successfully!` });
  });
};
