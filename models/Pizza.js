const { Schema, model } = require("mongoose");

// create new scheme for mongoose model
const PizzaScheme = new Schema({
  pizzaName: {
    type: String,
  },
  createdBy: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  size: {
    type: String,
    default: "Large",
  },
  toppings: [],
});

// creates model by using scheme
const Pizza = model("Pizza", PizzaScheme);

module.exports = Pizza;
