module.exports = mongoose => {
    const Departement = mongoose.model(
      "departement",
      mongoose.Schema(
        {
          name: String,
          enabled: Boolean
        },
        { timestamps: true }
      )
    );
    return Departement;
  };