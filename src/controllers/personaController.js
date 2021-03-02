const {
  executeQuery,
} = require("../scripts/querys");

const ListarDireccionesXPersona = (req, res, next) => {
    const { numero_documento } = req.body;
    executeQuery(`dbo.ListarDireccionesXPersona ${numero_documento}`, res, next);
};

const ListarContactosXPersona = (req, res, next) => {
  const { numero_documento } = req.body;
  executeQuery(`dbo.ListarContactosXPersona ${numero_documento}`, res, next);
};

const PersonaCtrl = {
    ListarDireccionesXPersona,
    ListarContactosXPersona
}

module.exports = PersonaCtrl