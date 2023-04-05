module.exports = app => {
    const dish = require("../controllers/dish.controller.js");
    const { authenticateJWT } = require('./JWT.router.js');

    var router = require("express").Router();

    // Retrieve all valid Dishes
    router.get("/", dish.findVaild);

    // Retrive all Dishes
    router.get("/all", authenticateJWT, dish.findAll);

    // Retrieve a single Dish with id
    router.get("/:id", dish.findOne);

    // Make a single dish sold out or in stock with id
    router.put("/soldout/:id", authenticateJWT, dish.updateSoldOutState);

    // Make a single dish valid or invalid with id
    router.put("/valid/:id", authenticateJWT, dish.updateValidState);

    // Update a single dish's price depreciated todo change it to edit
    router.put("/edit/:id", authenticateJWT, dish.editInfo);

    app.use('/api/dish', router);
};