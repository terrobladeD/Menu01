module.exports = app => {
    const dish = require("../controllers/dish.controller.js");

    var router = require("express").Router();

    // Retrieve all valid Dishes
    router.get("/", dish.findVaild);

    // Retrive all Dishes
    router.get("/all", dish.findAll);

    // Retrieve a single Dish with id
    router.get("/:id", dish.findOne);

    // Make a single dish sold out or in stock with id
    router.put("/soldout/:id", dish.updateSoldOutState);

    // Make a single dish valid or invalid with id
    router.put("/valid/:id", dish.updateValidState);

    // // todo Delete a single dish with id
    // router.delete("/:id", null);

    // todo Create a new order


    app.use('/api/dish', router);
};