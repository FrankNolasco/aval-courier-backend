const { Router } = require("express");
const {
  login,
  ListaOrdenServicio,
  ListaColaborador,
  ListaUsuarios,
  ListaPuestoTrabajo,
  ListaMensajero,
  ListaIncidencias,
  ListaPersonas,
  ListaCiudad,
  ListaProvincias,
  ListaDistritos,
  ListaDepartamentos,
  ListarSucursales,
  InsertarPersona,
  BuscarPersona,
  InsertarTrabajador,
  InsertarUsuario,
  ListarRoles,
  BuscarTrabajador,
} = require("../controllers/api.controllers");
const {
  ListarDireccionesXPersona,
  ListarContactosXPersona,
} = require("../controllers/personaController");
const routes = Router();
routes.post("/log-in", login);
routes.post("/ordenes-de-servicio/listar", ListaOrdenServicio);
routes.post("/colaboradores/listar", ListaColaborador);
routes.post("/trabajadores/insertar",InsertarTrabajador)
routes.post("/trabajadores/buscar",BuscarTrabajador)
routes.post("/usuarios/listar", ListaUsuarios);
routes.post("/usuarios/insertar", InsertarUsuario);
routes.post("/puestos-de-trabajo/listar", ListaPuestoTrabajo);
routes.post("/mensajeros/listar", ListaMensajero);
routes.post("/incidencias/listar", ListaIncidencias);
routes.post("/personas/listar", ListaPersonas);
routes.post("/personas/buscar", BuscarPersona);
routes.post("/personas/insertar", InsertarPersona);
routes.post("/personas/direcciones/listar", ListarDireccionesXPersona);
routes.post("/personas/contacto/listar", ListarContactosXPersona);
routes.post("/ciudad/listar", ListaCiudad);
routes.post("/provincias/listar", ListaProvincias);
routes.post("/distritos/listar", ListaDistritos);
routes.post("/departamentos/listar", ListaDepartamentos);
routes.post("/sucursales/listar", ListarSucursales);
routes.post("/roles/listar",ListarRoles)
module.exports = routes;
