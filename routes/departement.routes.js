module.exports = app => {
    const departements = require("../controllers/departement.controller");
    var router = require("express").Router();
    // Create a new Departement
    router.post("/", departements.create);
    // Retrieve all Departement
    router.get("/", departements.findAll);
    // Retrieve all published Tutorials
    router.get("/enabled", departements.findAllByEnabled);
    // Retrieve a single with id
    router.get("/:id", departements.findOne);
    // Update with id
    router.put("/:id", departements.update);
    // Delete with id
    router.delete("/:id", departements.delete);

    app.use('/api/departements', router);
};