const db = require("../models");
const Dish = db.dish;

//Find all valid dishes
exports.findVaild = (req, res) => {
    Dish.findAll({
        where: {
            is_valid: true
        }
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
}
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

// Make a dish sold_out/in_stock with an id
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
            dish.is_sold_out = !dish.is_sold_out;
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


// Make a dish invalid/valid with an id
// Update the valid state of a Dish with id
exports.updateValidState = (req, res) => {
    const id = req.params.id;

    Dish.findByPk(id)
        .then(dish => {
            if (!dish) {
                return res.status(404).send({
                    message: `Cannot find Dish with id=${id}.`
                });
            }
            dish.is_valid = !dish.is_valid;
            dish.save()
                .then(() => {
                    res.send({
                        message: "Dish valid state was updated successfully."
                    });
                })
                .catch(err => {
                    res.status(500).send({
                        message: "Error updating Dish valid state with id=" + id
                    });
                });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Dish with id=" + id
            });
        });
};

// Update a dish's info with an id
exports.editDishInfo = (req, res) => {
    const id = req.params.id;

    // Build the update object dynamically
    const updateData = {};

    if (req.body.name) updateData.name = req.body.name;
    if (req.body.short_name) updateData.short_name = req.body.short_name;
    if (req.body.type) updateData.type = req.body.type;
    if (req.body.description) updateData.description = req.body.description;
    if (req.body.full_description) updateData.full_description = req.body.description;
    if (req.body.price_ori) updateData.price_ori = req.body.price_ori;
    if (req.body.price_cur) updateData.price_cur = req.body.price_cur;
    if (req.body.pict_url) {
        // Validate the pict_url format
        const urlRegex = /^http:\/\/localhost:8080\/images\/[-\w\s]+\.(png|jpg|jpeg|gif)$/i;
        if (urlRegex.test(req.body.pict_url)) {
            updateData.pict_url = req.body.pict_url;
        } else {
            return res.status(400).send({
                message: `Invalid pict_url format. The provided URL does not match the expected format.`,
            });
        }
    }
    
    // If updateData is empty, don't perform the update
    if (Object.keys(updateData).length === 0) {
        return res.send({
            message: `Request body is empty. No updates were made for dish with id=${id}.`,
        });
    }



    Dish.update(updateData, {
        where: { id: id },
    })
        .then((num) => {
            if (num == 1) {
                res.send({
                    message: "Dish was updated successfully.",
                });
            } else {
                res.send({
                    message: `Cannot update dish with id=${id}. Maybe dish was not found or request body is empty.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error updating dish with id=" + id,
            });
        });
};

// Add a new dish to the database
exports.addDish = (req, res) => {
    // Validate request
    if (!req.body.name || !req.body.short_name || !req.body.type || !req.body.pict_url) {
        return res.status(400).send({
            message: "Required fields are missing: name, short_name, type, and pict_url are required.",
        });
    }

    // Validate pict_url format
    const urlRegex = /^http:\/\/localhost:8080\/images\/[-\w\s]+\.(png|jpg|jpeg|gif)$/i;
    if (!urlRegex.test(req.body.pict_url)) {
        return res.status(400).send({
            message: `Invalid pict_url format. The provided URL does not match the expected format.`,
        });
    }

    // Create a new dish object
    const newDish = {
        name: req.body.name,
        short_name: req.body.short_name,
        description: req.body.description,
        full_description: req.body.full_description,
        price_ori: req.body.price_ori,
        price_cur: req.body.price_cur,
        is_sold_out: req.body.is_sold_out || 0,
        type: req.body.type,
        is_valid: req.body.is_valid || 1,
        pict_url: req.body.pict_url,
    };

    // Save the new dish to the database
    Dish.create(newDish)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "An error occurred while creating the dish.",
            });
        });
};


// Delete a dish from the database
exports.deleteDish = (req, res) => {
    const id = req.params.id;

    if (!id) {
        return res.status(400).send({
            message: "Id parameter is missing in the request."
        });
    }

    Dish.destroy({
        where: { id: id }
    })
    .then(num => {
        if (num === 1) {
            res.send({
                message: "Dish was deleted successfully."
            });
        } else {
            res.status(404).send({
                message: `Cannot delete dish with id=${id}. Dish was not found or has already been deleted.`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "An error occurred while deleting the dish."
        });
    });
};




