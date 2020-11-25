const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

// create new scheme for mongoose model
const PizzaSchema = new Schema(
  {
    pizzaName: {
      type: String,
    },
    createdBy: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
    size: {
      type: String,
      default: "Large",
    },
    toppings: [],
    // Relational data. Points to Comment model.
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// mongoose uses virtuals instead of helpers. Will return length of comments array.
PizzaSchema.virtual("commentCount").get(function () {
  return this.comments.length;
});

// creates model by using scheme
const Pizza = model("Pizza", PizzaSchema);

module.exports = Pizza;
