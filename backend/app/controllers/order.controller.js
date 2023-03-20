const db = require("../models");
const Order = db.order;
const Detail = db.detail;
const Dish = db.dish;

// Get the order and its detail with a order id 
exports.findOne = (req, res) => {
    const id = req.params.id;

    Order.findByPk(id, { include: ["detail"] })
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Order with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Order with id=" + id
            });
        });
};

// Update the order status as finished with a id
exports.updateStatusState = (req, res) => {
    const id = req.params.id;

    Order.findByPk(id)
        .then(order => {
            if (!order) {
                return res.status(404).send({
                    message: `Cannot find order with id=${id}.`
                });
            }
            order.status = 1;

            order.save()
                .then(() => {
                    res.send({
                        message: "order " + id + " has successfully completed."
                    });
                })
                .catch(err => {
                    res.status(500).send({
                        message: "Error updating order status state with id=" + id
                    });
                });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Order with id=" + id
            });
        });
};

// Create and save new order
// process 0: validate inputs
// process 1: check the sum of quantity * current = total_price
// process 2: create and save Order in the database
// process 3: get the id of the created Order
// process 4: create and save detail in the database
exports.create = (req, res) => {
    // 0.Validate inputs
    if (!req.body.total_price || !req.body.table_num || !req.body.details || req.body.details.length < 1) {
        res.status(404).send({
            message: "Order Form content Error!"
        });
        return;
    }

    if (typeof req.body.total_price !== "number" || typeof req.body.table_num !== "number" || typeof req.body.email !== "string" || typeof req.body.additional_info !== "string" || !Number.isInteger(req.body.table_num)) {
        res.status(404).send({
            message: "Order Form datatype Error!"
        });
        return;
    }

    req.body.details.forEach(({ quantity,orderID }) => {
        if (typeof quantity !== "number" || !Number.isInteger(quantity) ||quantity <= 0) {
            res.status(404).send({
                message: "Quantity Error!"
            });
            return;
        }
        if (typeof orderID !== "number" || !Number.isInteger(orderID)) {
            res.status(404).send({
                message: "OrderID Error!"
            });
            return;
        }

    });

    // 1.check the sum of quantity * current = total_price

    // const a = Dish.findByPk(req.body.details[0].orderID)

    // req.body.details.forEach(({ quantity,orderID }) => {
    //     Dish.findByPk(orderID)
    //     .then(data => data.price_cur)
    //     .then(price_cur => price_cur*quantity)
    // });
    // res.send("");



};