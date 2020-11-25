const { Pizza } = require("../models");

const pizzaController = {
  // gets all pizzas
  getAllPizza(req, res) {
    // no params passed to find all
    Pizza.find({})
      .populate({
        // populate comments instead of showing id
        path: "comments",
        // minus indicates we don't want this field from comments
        select: "-__v",
      })
      // .select -__v makes it so we don't return this field
      .select("-__v")
      // .sort will show newest items first
      .sort({ _id: -1 })
      .then((dbPizzaData) => res.json(dbPizzaData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // pass in params to find pizza by id
  getPizzaById({ params }, res) {
    // find by id where it equals params.id
    Pizza.findOne({ _id: params.id })
      .populate({
        path: "comments",
        select: "-__v",
      })
      .select("-__v")
      .then((dbPizzaData) => {
        if (!dbPizzaData) {
          res.status(404).json({ message: "No pizza found with this id" });
          return;
        }

        res.json(dbPizzaData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // creates new pizza. pass in body
  createPizza({ body }, res) {
    Pizza.create(body)
      .then((dbPizzaData) => res.json(dbPizzaData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // update by id pass in params to find id and body for update data
  updatePizza({ params, body }, res) {
    // needs {new:true} to update otherwise will display original doc
    Pizza.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then((dbPizzaData) => {
        if (!dbPizzaData) {
          res.status(404).json({ message: "No pizza found with this id" });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // delete pizza by id
  deletePizza({ params }, res) {
    Pizza.findOneAndDelete({ _id: params.id })
      .then((dbPizzaData) => {
        if (!dbPizzaData) {
          res.status(404).json({ message: "No pizza found with this id" });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
};

module.exports = pizzaController;
