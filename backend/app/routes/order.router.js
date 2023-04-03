module.exports = app => {
    const order = require("../controllers/order.controller.js");
    const { authenticateJWT } = require('./JWT.router.js');

    var router = require("express").Router();

    // Retrieve all Orders in a specific date
    router.get("/bydate/:date", order.findOrdersByDate);

    // Retrieve a single Order with id
    router.get("/:id", authenticateJWT,order.findOne);

    // Make a order finished
    router.put("/status/:id", order.updateStatusState);

    // Create a new Order
    router.post("/", order.create);


    app.use('/api/order', router);
};