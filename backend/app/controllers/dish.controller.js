const db = require("../models");
const Dish = db.dish;

//Find all dishes
exports.findAll = (req, res) => {
    Dish.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
};

// Find a single dish with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Dish.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Dish with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Dish with id=" + id
            });
        });
};

// Make a dish sold_out with an id
// Update the sold_out state of a Dish with id
exports.updateSoldOutState = (req, res) => {
    const id = req.params.id;

    Dish.findByPk(id)
        .then(dish => {
            if (!dish) {
                return res.status(404).send({
                    message: `Cannot find Dish with id=${id}.`
                });
            }
            console.log(dish.is_sold_out);
            dish.is_sold_out = !dish.is_sold_out;
            console.log(dish.is_sold_out);

            dish.save()
                .then(() => {
                    res.send({
                        message: "Dish sold_out state was updated successfully."
                    });
                })
                .catch(err => {
                    res.status(500).send({
                        message: "Error updating Dish sold_out state with id=" + id
                    });
                });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Dish with id=" + id
            });
        });
};
