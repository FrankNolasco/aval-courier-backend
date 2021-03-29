const ApiCtrl = {};
var mssql = require("mssql");
const bcrypt = require("bcrypt-nodejs");
const { executeQuery, executeAxios } = require("../scripts/querys");

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
  executeQuery("dbo.ListaOrdenesServicio", res, next);
};

ApiCtrl.ListaColaborador = (req, res, next) => {
  executeQuery("dbo.ListaTrabajadores", res, next);
};

ApiCtrl.InsertarTrabajador = (req, res, next) => {
  const { numero_documento, turno, id_puesto, id_sucursal } = req.body;
  executeQuery(
    `dbo.insertarTrabajador '${numero_documento}','${turno}','${id_puesto}','${id_sucursal}'`,
    res,
    next
  );
};

ApiCtrl.BuscarTrabajador = (req, res, next) => {
  const  { dni } = req.body
  executeQuery(`dbo.buscarTrabajador '${dni}'`,res,next)
}

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

ApiCtrl.InsertarUsuario = (req, res, next) => {
  const { Usuario, Clave, id_trabajador, Rol } = req.body;
  bcrypt.genSalt(12, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(Clave, salt, null, (err, hash) => {
      if (err) {
        return next(err);
      }
      executeQuery(
        `dbo.insertarUsuario '${Usuario}','${hash}','${id_trabajador}','${Rol}'`,
        res,
        next
      );
    });
  });
};

ApiCtrl.ListaPuestoTrabajo = (req, res, next) => {
  executeQuery("dbo.ListaPuestosTrabajo", res, next);
};

ApiCtrl.ListaMensajero = (req, res, next) => {
  executeQuery("dbo.ListaMensajeros", res, next);
};

ApiCtrl.ListaIncidencias = (req, res, next) => {
  executeQuery("dbo.ListaIncidencias", res, next);
};

ApiCtrl.ListaPersonas = (req, res, next) => {
  executeQuery("dbo.ListaPersonas", res, next);
};

ApiCtrl.BuscarPersona = (req, res, next) => {
  const { dni } = req.body;
  executeQuery(`dbo.buscarPersona '${dni}'`, res, next);
};

ApiCtrl.InsertarPersona = (req, res, next) => {
  const {
    nombre,
    numero_documento,
    RUC,
    fecha_nacimiento,
    genero,
    nacionalidad,
    distrito_nacimiento,
  } = req.body;
  executeQuery(
    `dbo.insertarPersona '${nombre}','${numero_documento}','${fecha_nacimiento}','','${genero}','${nacionalidad}','${distrito_nacimiento}','${RUC}'`,
    res,
    next
  );
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
    provincias: provincias
      .filter((f) => f.id_departamento === el.id_departamento)
      .map((m) => ({
        value: m.id_provincia,
        label: m.nombre_provincia,
        distritos: distritos
          .filter((f) => f.id_provincia === m.id_provincia)
          .map((d) => ({ value: d.id_distrito, ciudad: d.nombre_distrito })),
      })),
  }));
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

ApiCtrl.ListarSucursales = (req, res, next) => {
  executeQuery("dbo.ListarSucursales", res, next);
};

ApiCtrl.ListarRoles = (req, res, next) => {
  executeQuery("dbo.ListarRoles", res, next);
};

ApiCtrl.ListaTurnos = (req, res, next) => {
  executeQuery("dbo.listarTurnos", res, next);
}

module.exports = ApiCtrl;
