const db = require("../models");
const Departement = db.departements;

exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
    // Create a Tutorial
    const departement = new Departement({
      name: req.body.name,
      enabled: req.body.enabled ? req.body.enabled : false
    });
    // Save Tutorial in the database
    departement
      .save(departement)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the departement."
        });
      });
  };

  exports.findAll = (req, res) => {
    const name = req.query.name;
    var enabled = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};
    Departement.find(enabled)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving departements."
        });
      });
  };

  exports.findOne = (req, res) => {
    const id = req.params.id;
    Departement.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Departement with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Departement with id=" + id });
      });
  };

  exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
    const id = req.params.id;
    Departement.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Departement with id=${id}. Maybe Departement was not found!`
          });
        } else res.send({ message: "Departement was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Tutorial with id=" + id
        });
      });
  };

  exports.delete = (req, res) => {
    const id = req.params.id;
    Departement.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Departement with id=${id}. Maybe Departement was not found!`
          });
        } else {
          res.send({
            message: "Departement was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Departement with id=" + id
        });
      });
  };

  exports.findAllByEnabled = (req, res) => {
    Departement.find({ enabled: true })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Departements."
        });
      });
  };