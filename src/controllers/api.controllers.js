const ApiCtrl = {};
var mssql = require("mssql");
const {
  executeQuery,
  returnQuery,
  executeAxios,
} = require("../scripts/querys");

ApiCtrl.login = (req, res, next) => {
  const { username } = req.body;
  let request = new mssql.Request();
  request.query(`dbo.consultarUsuario ${username}`, function (err, result) {
    if (err) return next(err);
    const data = result.recordset;
    res.send(data);
  });
};

ApiCtrl.ListaOrdenServicio = (req, res, next) => {
  executeQuery("dbo.ListaOrdenServicio", res, next);
};

ApiCtrl.ListaColaborador = (req, res, next) => {
  executeQuery("dbo.ListaColaborador", res, next);
};

ApiCtrl.ListaUsuarios = (req, res, next) => {
  let request = new mssql.Request();
  request.query(`dbo.ListaUsuarios`, function (err, result) {
    if (err) return next(err);
    let data = result.recordset;
    data = data.map((el) => ({
      ...el,
      estado: el.estado === 0 ? "INACTIVO" : "ACTIVO",
    }));
    res.send(data);
  });
};

ApiCtrl.ListaPuestoTrabajo = (req, res, next) => {
  executeQuery("dbo.ListaPuestoTrabajo", res, next);
};

ApiCtrl.ListaMensajero = (req, res, next) => {
  executeQuery("dbo.ListaMensajero", res, next);
};

ApiCtrl.ListaIncidencias = (req, res, next) => {
  executeQuery("dbo.ListaIncidencias", res, next);
};

ApiCtrl.ListaPersonas = (req, res, next) => {
  executeQuery("dbo.ListaPersonas", res, next);
};

ApiCtrl.ListaCiudad = async (req, res, next) => {
  const departamentos = await executeAxios(
    "http://localhost:5000/api/departamentos/listar"
  );
  const provincias = await executeAxios(
    "http://localhost:5000/api/provincias/listar"
  );
  const distritos = await executeAxios(
    "http://localhost:5000/api/distritos/listar"
  );

  let response = [];

  response = departamentos?.map((el) => ({
    value: el.id_departamento,
    label: el.nombre_departamento,
    children: provincias
      .filter((f) => f.id_departamento === el.id_departamento)
      .map((m) => ({
        value: el.id_provincia,
        label: el.nombre_provincia,
        children: distritos.filter((f) => f.id_provincia === m.id_provincia).map(d => ({value : d.id_distrito , label : d.nombre_distrito})),
      })),
  }));
  console.log(response)
  res.send(response);
};

ApiCtrl.ListaProvincias = (req, res, next) => {
  executeQuery("dbo.ListaProvincias", res, next);
};

ApiCtrl.ListaDistritos = (req, res, next) => {
  executeQuery("dbo.ListaDistritos", res, next);
};

ApiCtrl.ListaDepartamentos = (req, res, next) => {
  executeQuery("dbo.ListaDepartamentos", res, next);
};

module.exports = ApiCtrl;
