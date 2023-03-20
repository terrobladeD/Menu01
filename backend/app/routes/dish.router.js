module.exports = app => {
    const dish = require("../controllers/dish.controller.js");

    var router = require("express").Router();

    // Retrieve all Dishes
    router.get("/", dish.findAll);

    // Retrieve a single Dish with id
    router.get("/:id", dish.findOne);

    // Make a single dish sold out or valid again with id
    router.put("/soldout/:id",dish.updateSoldOutState);


    app.use('/api/dish', router);
};