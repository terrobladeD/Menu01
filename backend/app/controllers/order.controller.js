const db = require("../models");
const { Op } = require('sequelize');
const websocket = require('../others/websocket');
const Order = db.order;
const Detail = db.detail;
const Dish = db.dish;

//Get all the orders and detail in a speficic date
exports.findOrdersByDate = (req, res) => {
    const dateString = req.params.date;

    // Convert the date string to a Date object
    const date = new Date(dateString);
    const nextDate = new Date(date);
    nextDate.setDate(date.getDate() + 1);

    // Find all orders with a date matching the input date
    Order.findAll({
        where: {
            date: {
                [Op.gte]: date,
                [Op.lt]: nextDate
            }
        },
        include: ["detail"]
    })
        .then((data) => {
            if (data.length > 0) {
                res.send(data);
            } else {
                res.status(200).send({
                    message: `No orders found for date: ${dateString}`
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: `Error retrieving orders for date: ${dateString}`
            });
        });
};

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
// process max: check payment
// process 2: create and save Order in the database
// process 3: create and save detail in the database
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

    req.body.details.forEach(({ quantity, dishId }) => {
        if (typeof quantity !== "number" || !Number.isInteger(quantity) || quantity <= 0) {
            res.status(404).send({
                message: "Quantity Error!"
            });
            return;
        }
        if (typeof dishId !== "number" || !Number.isInteger(dishId)) {
            res.status(404).send({
                message: "dishId Error!"
            });
            return;
        }

    });

    // 1.check the sum of quantity * current = total_price
    // make the query for each price of dish one by one,
    // after all the promises are resolved, compare the running total to the total
    Promise.all(req.body.details.map(({ dishId }) => Dish.findByPk(dishId)))
        .then(dishes => {
            const sumPrice = dishes.reduce((acc, curr, index) => acc + (curr.price_cur * req.body.details[index].quantity), 0);
            if (req.body.total_price !== sumPrice) {
                res.status(404).send({
                    message: "Total Price Mismatch Error!"
                });
                return;
            }
        });


    /* TO DO: check payment */
    /* TO DO: check payment */
    /* TO DO: check payment */

    // 2. create and save Order in the database
    //create a Order
    const order = {
        total_price: req.body.total_price,
        table_num: req.body.table_num,
        date: Date.now(),
        email: req.body.email ? req.body.email : null,
        status: 0,
        additional_info: req.body.additional_info ? req.body.additional_info : null
    };
    //save Order in the database
    Order.create(order)
        .then(orderData => {
            // console.log("id", orderData.id)
            Promise.all(req.body.details.map(({ dishId, quantity }) => {
                let detail = {
                    quantity: quantity,
                    orderId: orderData.id,
                    dishId: dishId
                }
                // console.log(detail)
                Detail.create(detail)
                    .then(() => {
                    })
                    .catch(err => {
                        res.status(404).send({
                            message:
                                "Some error occurred while creating the Detail."
                        });
                        return;
                    });

            })).then(() => {
                res.status(200).send({
                    orderId: orderData.id,
                    message: "Order successfully created"
                });
                //send the message to the front end
                websocket.broadcastMessage(JSON.stringify({ message: "New order received", orderId: orderData.id }));

            }
            )
            return
        })

        .catch(err => {
            res.status(404).send({
                message: "Some error occurred while creating the Order."
            });
            return;
        });
};