const sql = require("./db.js");

const Customer = function(customer) {
  this.email = customer.email;
  this.provider = customer.provider;
};

Customer.create = (newCustomer, result) => {
  sql.query("INSERT INTO subscriptions SET ?", newCustomer, (err, res) => {
    if (err) {
      console.log("error: ", err);
      res.status(400).json({error})
      result(err, null);
      return;
    }

    console.log("created customer: ", { id: res.insertId, ...newCustomer });
    result(null, { id: res.insertId, ...newCustomer });
  });
};


Customer.getAll = result => {
  sql.query("SELECT * FROM subscriptions", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("customers: ", res);
    result(null, res);
  });
};


Customer.remove = (id, result) => {
  sql.query("DELETE FROM subscriptions WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted customer with id: ", id);
    result(null, res);
  });
};

module.exports = Customer;